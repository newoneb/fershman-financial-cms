const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  
  return {
    entry: './assets/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[contenthash].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './pages/markets.html',
        filename: 'pages/markets.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './pages/analysis.html',
        filename: 'pages/analysis.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './pages/policy.html',
        filename: 'pages/policy.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './pages/opinion.html',
        filename: 'pages/opinion.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './pages/about.html',
        filename: 'pages/about.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './articles/article-template.html',
        filename: 'articles/article-template.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './articles/global-markets-rally.html',
        filename: 'articles/global-markets-rally.html',
        minify: !isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './articles/tech-sector-valuation-reset.html',
        filename: 'articles/tech-sector-valuation-reset.html',
        minify: !isDevelopment
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash].css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'assets/images', 
            to: 'assets/images' 
          },
          {
            from: 'README.html',
            to: 'README.html'
          }
        ]
      }),
      new DotenvWebpackPlugin({
        systemvars: true // Load all system environment variables as well
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: true,
      port: 9000,
      hot: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    }
  };
};
