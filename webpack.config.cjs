const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// css plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = ({ mode }) => {
  mode = mode ?? 'development';
  return {
    mode: mode,
    entry: {
      main: [
        path.resolve(__dirname, 'src/js/index.js'), 
        path.resolve(__dirname, 'src/style.css'),   
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'scripts.min.js',
      clean: true,
      assetModuleFilename: "img/[name][ext]",
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    devtool: false,
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/img', to: 'img' },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.min.css', // Output CSS file name
      }),
      new HtmlWebpackPlugin({
        title: 'Forkio App',
        filename: 'index.html',
        template: './src/index.html',
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
  };
};
