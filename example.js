'use strict'

var _       = require('lodash'), // utility functions
    Promise = require('bluebird'), // Promise module
    request = Promise.promisifyAll(require('request')) // Http request module plus promisification

var ITEMS_TO_DELETE = []; // Global

function Example(options) {
  // On creation code (options)
}

var deleteItem = function(item) {
  // delete item here
  // faked delete request
  return new Promise(function(resolve, reject) {
    resolve(item)
  })
  .then(function(item) {
    console.log('deleting item ' + item.id)
  })
}

var saveSlug = function(slug) {
  // save slug here
  // faked save slug request
  return new Promise(function(resolve, reject) {
    resolve(slug)
  })
  .then(function(slug) {
    console.log('saving slug ' + slug)
  })
}

Example.prototype.feedImport = function feedImport(feed_url) {
  return request.getAsync(feed_url)
    .spread(function(response, body) {
      var items = JSON.parse(body).items;
      return items
    })
    .each(function(item) {
      if (item.title === 'Amazing Jesus') {
        ITEMS_TO_DELETE.push(item)
      }

      return new Promise(function(resolve, reject) {
        //resolve finishes promise block and returns the parameter
        resolve(item.slug.split('-')) // item.slug.split == string to Array
      })
      .each(function(slug) {
        return saveSlug(slug)
      })
    })
    .then(function() {
      return ITEMS_TO_DELETE
    })
    .each(function(item) {
      return deleteItem(item)
    })
    .catch(function(error) {
      console.error('Oh no something went wrong here ' + error)
    })
    .finally(function() {
      //clear any globals used
      ITEMS_TO_DELETE = []
    })
}

module.exports = Example; // Export our module (function) with it's functions
