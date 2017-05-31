// Generated by CoffeeScript 1.12.6
(function() {
  var GraphClient, m, merge, minify,
    hasProp = {}.hasOwnProperty;

  m = require('mithril');


  /**
   * Merges the properties of multiple objects together.
   * @param {...Object} sources - One or more objects to merge.
   * @returns {Object} - The merged result as a new object.
   */

  merge = function(sources) {
    var i, key, len, source, target, value;
    target = {};
    for (i = 0, len = arguments.length; i < len; i++) {
      source = arguments[i];
      for (key in source) {
        if (!hasProp.call(source, key)) continue;
        value = source[key];
        target[key] = value;
      }
    }
    return target;
  };


  /**
   * Minifies a GraphQL query by removing carriage 
   * returns that are followed by tabs or spaces.
   * @param {String} query - A GraphQL query.
   * @returns {String} - The minified GraphQL query.
   */

  minify = function(query) {
    return query.replace(/[\r\n][\t\s]+/g, ' ');
  };

  GraphClient = (function() {

    /**
     * Creates a new GraphClient.
     * @class
     * @param {object} options - Default options to be used with m.request.
     * @param {string} options.url - The URL of the GraphQL endpoint.
     */
    function GraphClient(options1) {
      this.options = options1;
    }


    /**
     * Sends a GraphQL query using HTTP GET.
     * @param {String} query - A GraphQL query.
     * @param {Object} [variables=null] - Variables for the GraphQL query.
     * @returns {Promise} - A promise resolving the response data.
     */

    GraphClient.prototype.get = function(query, variables) {
      if (variables == null) {
        variables = null;
      }
      return this.request(query, 'GET', JSON.stringify(variables));
    };


    /**
     * Sends a GraphQL query using HTTP POST.
     * @param {String} query - A GraphQL query.
     * @param {Object} [variables=null] - Variables for the GraphQL query.
     * @returns {Promise} - A promise resolving the response data.
     */

    GraphClient.prototype.post = function(query, variables) {
      if (variables == null) {
        variables = null;
      }
      return this.request(query, 'POST', variables);
    };


    /**
     * Sends a GraphQL query.
     * @param {String} query - A GraphQL query.
     * @param {String} method - The HTTP method to use.
     * @param {Object} variables - Variables for the GraphQL query.
     * @returns {Promise} - A promise resolving the response data.
     */

    GraphClient.prototype.request = function(query, method, variables) {
      var options;
      options = merge(this.options, {
        data: {
          query: minify(query),
          variables: variables
        },
        method: method
      });
      return m.request(options);
    };

    return GraphClient;

  })();

  module.exports = GraphClient;

}).call(this);
