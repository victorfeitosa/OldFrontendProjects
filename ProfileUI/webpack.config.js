const path = require('path');
module.exports = {
  entry: path.join(__dirname, 'public/app'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist').toString(),
  },
  module: {
    rules: [{
      test: /.js$/,
      include: [
        path.resolve(__dirname, 'app'),
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }],
  },
  resolve: {
    extensions: ['.json', '.js', '.css', '.scss'],
  },
  devtool: 'source-map',
};
