import numpy as np
import os

fake_data = np.zeros((900, 20))

fake_data[:300, :] = np.random.normal(2, 1, (300, 20))
fake_data[300:600, :] = np.random.randn(300, 20)
fake_data[600:, :] = np.random.normal(-2, 1, (300, 20))

fake_label = np.zeros(900)
fake_label[300:600] = np.ones(300)
fake_label[600:] = 2*np.ones(300)

if not os.path.exists("./data"):
    os.mkdir("./data")

np.save("./data/sample_fake_data", fake_data)
np.save("./data/sample_fake_label", fake_label)