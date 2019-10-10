import numpy as np
import torch
import argparse
import os
import math
import torch
from torch import LongTensor
from torch.autograd import Variable
import torch.nn as nn
import torch.nn.functional as F
from models import Mlp


def train(data, label, num_classes, hidden_sizes, epochs = 100, batch_size=64, lr = 1e-3, weight_decay=0):

    """

    :param data: Numpy array of shape (N, F)
    :param label: numpy array of shape (N, )
    :param num_classes: The number of classes to differentiate between
    :param hidden_sizes: number of entries is number of hidden layers
            each entry in this list indicate the size of that hidden layer.
            applies to all networks
    :param batch_size (int): Minibatch size for SGD.
    :param lr (float): Learning rate (used for both policy and value learning).
    :param weight_decay: Parameter for L2 regularization.
    :return: None
    """

    N = data.shape[0]
    input_dim = data.shape[1]

    # Our classifier
    predictor = Mlp(input_dim, num_classes, hidden_sizes=hidden_sizes)

    #Adam optimizer
    optimizer = torch.optim.Adam(predictor.parameters(), lr=lr,weight_decay=weight_decay)

    #CrossEntropy loss function
    criteria = nn.CrossEntropyLoss()

    Tdata = torch.from_numpy(data)
    Tlabel = torch.LongTensor(label)

    #Shuffle the data
    perm = np.arange(N)
    np.random.shuffle(perm)
    perm = LongTensor(perm)
    Tdata, Tlabel = Tdata[perm], Tlabel[perm]

    #Split the training set and validation set
    divide = int(data.shape[0] * 0.8)
    train_data, train_label = Tdata[:divide], Tlabel[:divide]
    val_data, val_label = Tdata[divide:], Tlabel[divide:]


    optim_train_iter_num = int(math.ceil(train_data.shape[0] / batch_size))
    optim_val_iter_num = int(math.ceil(val_data.shape[0] / batch_size))


    #We employ early stopping as a form of regularization to prevent overfitting
    num_increase=0
    consecutive_steps = 5
    prev_loss = 0


    for epoch in range(epochs):
        train_loss = 0

        # Reshuffle the training set every epoch
        perm = np.arange(train_data.shape[0])
        np.random.shuffle(perm)
        perm = LongTensor(perm)

        train_data, train_label = train_data[perm], train_label[perm]

        Total_number = train_data.shape[0]
        Corr_counter = 0

        for iter in range(optim_train_iter_num):
            ind = slice(iter * batch_size, min((iter+1)*batch_size, data.shape[0]))
            batch_data, batch_label = train_data[ind], train_label[ind]
            batch_data = Variable(batch_data.float())
            batch_label = Variable(batch_label)

            prediction = predictor(batch_data)
            loss = criteria(prediction, batch_label)

            predictor.zero_grad()
            loss.backward()
            optimizer.step()

            train_loss += loss.detach()

            index = torch.argmax(prediction, dim=1)
            for i in range(index.shape[0]):
                if index[i] == batch_label[i]:
                    Corr_counter += 1

        train_accuracy = Corr_counter/Total_number

        Total_number = val_data.shape[0]
        Corr_counter = 0

        val_loss = 0
        for iter in range(optim_val_iter_num):
            ind = slice(iter*batch_size, min((iter+1) * batch_size, data.shape[0]))
            data_v, label_v = val_data[ind], val_label[ind]
            data_v = Variable(data_v.float())
            label_v = Variable(label_v)

            prediction = predictor(data_v)

            loss = criteria(prediction, label_v)
            val_loss += loss.detach()

            index = torch.argmax(prediction, dim=1)
            for i in range(index.shape[0]):
                if index[i] == label_v[i]:
                    Corr_counter += 1

        val_accuracy = Corr_counter/Total_number

        if val_loss > prev_loss:
            prev_loss = val_loss
            num_increase += 1
        else:
            num_increase = 0

        train_loss = train_loss.numpy()
        val_loss = val_loss.numpy()

        print("Epoch %s: training loss=%.2f, validation loss=%.2f, training accuracy=%.2f, validation accuracy=%.2f" % (epoch, train_loss, val_loss, train_accuracy, val_accuracy))

        if num_increase >= consecutive_steps:
            break

    if not os.path.exists("./model"):
        os.mkdir("./model")

    torch.save(predictor.state_dict(), "./model/disease_predict_model.pth")

    return



if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data_dir", "-d", type=str)
    parser.add_argument("--data_name", "-n", type=str)
    parser.add_argument("--label_name", "-l", type=str)
    parser.add_argument("--num_classes", type=int)
    parser.add_argument("--hidden_size", type=int, default=128)
    parser.add_argument("--epochs", "-e", type=int, default=100)
    parser.add_argument("--batch_size", type=int, default=64)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--weight_decay", type=float, default=0)
    args = parser.parse_args()

    data_path = args.data_dir + args.data_name + ".npy"
    label_path = args.data_dir + args.label_name + ".npy"

    data = np.load(data_path)
    label = np.load(label_path)

    hidden_sizes = (args.hidden_size, args.hidden_size)

    train(data, label, args.num_classes, hidden_sizes, epochs=args.epochs, lr=args.lr, weight_decay=args.weight_decay)