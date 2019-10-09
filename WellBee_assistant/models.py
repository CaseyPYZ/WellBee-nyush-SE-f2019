import numpy as np
import torch
import torch.nn as nn
from torch.nn import functional as F


def fanin_init(tensor):
    ## used to initialize hidden layers in MLP
    size = tensor.size()
    if len(size) == 2:
        fan_in = size[0]
    elif len(size) > 2:
        fan_in = np.prod(size[1:])
    else:
        raise Exception("Shape must be have dimension at least 2.")
    bound = 1. / np.sqrt(fan_in)
    return tensor.data.uniform_(-bound, bound)

class Mlp(nn.Module):
    def __init__(
            self,
            input_size,
            output_size,
            hidden_sizes,
            hidden_activation=F.relu,
            hidden_init=fanin_init,
            b_init_value=0.1,
    ):
        super().__init__()

        self.input_size = input_size
        self.output_size = output_size
        self.hidden_activation = hidden_activation
        ## here we use ModuleList so that the layers in it can be
        ## detected by .parameters() call
        self.hidden_layers = nn.ModuleList()
        in_size = input_size

        ## initialize each hidden layer
        for i, next_size in enumerate(hidden_sizes):
            fc_layer = nn.Linear(in_size, next_size)
            in_size = next_size
            hidden_init(fc_layer.weight)
            fc_layer.bias.data.fill_(b_init_value)
            self.hidden_layers.append(fc_layer)

        self.last_layer = nn.Linear(in_size, output_size)

    def forward(self, input):
        h = input
        for i, fc_layer in enumerate(self.hidden_layers):
            h = fc_layer(h)
            h = self.hidden_activation(h)

        h = self.last_layer(h)

        output = F.softmax(h, dim=1)
        return output
