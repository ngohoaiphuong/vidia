const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')
const typescript = require('./loaders/typescript')
const worker = require('./loaders/worker')
const webpack = require('webpack')

environment.loaders.prepend('typescript', typescript)
environment.loaders.prepend('erb', erb)
environment.loaders.prepend('worker', worker)

environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
    Rails: ['@rails/ujs']
  })
)
module.exports = environment
