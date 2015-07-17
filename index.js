'use strict'

var _       = require('lodash'),
    Promise = require('bluebird'),
    feeds   = require('./feed/feeds'),
    Example = require('./example'),
    example = new Example()

  return new Promise(function(resolve, reject) {
    resolve(_.toArray(feeds))
  })
  .each(function(feed) {
    return example.feedImport(feed.url)
  })
  .then(function() {
    console.log('Complete')
  })
