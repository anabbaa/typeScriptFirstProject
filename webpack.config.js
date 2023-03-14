const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
//resolve allows to build an absolute path to a certain folder
/*
to add webpack webpack webpack-cli webpack-dev-server typescript ts.loader
be sure to turn source map in configure ts file to true this helps us to debug our code and webpack 
support it as well 
-ou do not need src directory do not forget to add no .js in importing
-publickpath is only for webpack dev server to understand where is the ouput file
- developtool teels webpack there is sourcemap already which it should be extract and basically 
wireup correctly to the bundle it generates
-mode development for debugging 
-bundle file will be saved in memory even if i delete it
*/
