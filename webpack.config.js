const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = ({ mode }) => {
  mode = mode ?? 'development';
  return {
    mode: mode,
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'scripts.min.js',
      clean: true,
      assetModuleFilename: "img/[name][ext]",
    },

    // module: {
    //   rules: [

    //     {
    //       test: /\.scss$/,
    //       use: ['style-loader', 'css-loader', 'sass-loader']
    //     },

    //   ],

    // },
    // devtool: false,
    plugins: [

      // new CopyWebpackPlugin({
      //   patterns: [
      //     { from: 'src/img', to: 'img' },
      //   ],
      // }),
      new HtmlWebpackPlugin({
        title: 'Forkio App',
        filename: 'index.html',
        template: './src/index.html'
      }),

      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        deleteOriginalAssets: true,
        outputPath: 'img',
        pngquant: ({ quality: '95-100' }),
        plugins: [
          // Add any specific imagemin plugins you require
          // (e.g., imagemin-mozjpeg for JPEG optimization)
        ],
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000, // The port where BrowserSync will run
        server: { baseDir: ['dist'] }, // The directory to serve
        files: ['dist/**/*'], // Files to watch for changes
      }),
    ],
    devServer: {
      watchFiles: path.join(__dirname, 'src'),
      hot: true,
      port: 3000,
      open: true,
      compress: true,
      historyApiFallback: true,
    },
  }
}