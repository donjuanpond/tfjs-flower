const tf = require('@tensorflow/tfjs-node-gpu');

const kernel_size = [3, 3]
const pool_size= [2, 2]
const first_filters = 16
const second_filters = 32
const third_filters = 64
const dropout_conv = 0.3
const dropout_dense = 0.3

const model = tf.sequential();
model.add(tf.layers.conv2d({
  inputShape: [96, 96, 3],
  filters: first_filters,
  kernelSize: kernel_size,
  activation: 'relu',
}));
model.add(tf.layers.conv2d({
  filters: first_filters,
  kernelSize: kernel_size,
  activation: 'relu',
}));
model.add(tf.layers.maxPooling2d({poolSize: pool_size}));
model.add(tf.layers.dropout({rate: dropout_conv}));

model.add(tf.layers.conv2d({
  filters: second_filters,
  kernelSize: kernel_size,
  activation: 'relu',
}));
model.add(tf.layers.conv2d({
  filters: second_filters,
  kernelSize: kernel_size,
  activation: 'relu',
}));
model.add(tf.layers.conv2d({
  filters: second_filters,
  kernelSize: kernel_size,
  activation: 'relu',
}));
model.add(tf.layers.maxPooling2d({poolSize: pool_size}));
model.add(tf.layers.dropout({rate: dropout_conv}));

model.add(tf.layers.conv2d({
  filters: third_filters,
  kernelSize: kernel_size,
  activation: 'relu',
}));

model.add(tf.layers.maxPooling2d({poolSize: pool_size}));
model.add(tf.layers.dropout({rate: dropout_conv}));

model.add(tf.layers.flatten());

model.add(tf.layers.dense({units: 64, activation: 'relu'}));
model.add(tf.layers.dropout({rate: dropout_dense}));
model.add(tf.layers.dense({units: 5, activation: 'softmax'}));

const optimizer = tf.train.adam(0.0001);
model.compile({
  optimizer: optimizer,
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy','precision'],
});

module.exports = model;
