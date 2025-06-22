// @ts-nocheck
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

import path from 'path'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function setEnvDefaults({ mode }) {
  const DEV_PORT = 8000
  const defaults = {
    DEV_PORT,
    API_URL: 'http://localhost:9990',
    // Checks if you are using render.com and sets the public path appropriately
    APP_URL: process.env.RENDER_EXTERNAL_URL || `https://localhost:${DEV_PORT}`,
    BUILD_MODE: mode || 'production',
  }

  Object.keys(defaults).forEach((key) => {
    if (!process.env[key]) {
      process.env[key] = defaults[key]
    }
  })

  return process.env
}

/**
 * @param {{types: boolean}} arg
 * @param {{mode: 'production'|'development'}} argv
 * */
export default ({ types = true }, { mode }) => {
  setEnvDefaults({ mode })

  let publicPath = mode === 'development' ? `https://localhost:${process.env.DEV_PORT}/` : process.env.APP_URL

  console.log(`
    ***********************
    
    APP_URL: ${process.env.APP_URL}
    API_URL: ${process.env.API_URL}
    
    # Used for setting location of built files
    publicPath: ${publicPath}
    
    ***********************
  `)

  const typeChecking = types
    ? [
        {
          test: /\.js?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    : []

  const serviceWorker =
    mode === 'production'
      ? [
          new WorkboxPlugin.InjectManifest({
            swSrc: path.resolve(__dirname, '/service-worker.js'),
          }),
        ]
      : []

  return {
    entry: path.resolve(__dirname, './src/app-enter.js'),
    output: {
      filename: 'app-enter.js',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
      publicPath,
    },
    devServer: {
      https: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      https: true,
      historyApiFallback: true,
      port: process.env.DEV_PORT,
      // For mobile tethering
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        //comment out below line to disable type checking
        ...typeChecking,
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: './styles/fonts/[name][ext]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')],
      }),
      new webpack.DefinePlugin(
        Object.keys(process.env).reduce((acc, key) => {
          acc[`process.env.${key}`] = JSON.stringify(process.env[key])
          return acc
        }, {})
      ),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      ...serviceWorker,
      new CopyWebpackPlugin({
        patterns: [
          'manifest.json',
          {
            from: path.resolve(__dirname, './src/images'),
            to: path.resolve(__dirname, './dist/images'),
          },
        ],
      }),
      new CompressionPlugin(),
    ],
  }
}
