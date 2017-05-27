m = require('mithril')

###*
# Merges the properties of multiple objects together.
# @param {...Object} sources - One or more objects to merge.
# @returns {Object} - The merged result as a new object.
###
merge = (sources) ->
    target = {}
    
    for source in arguments
        for own key, value of source
            target[key] = value
    
    target

###*
# Minifies a GraphQL query by removing carriage 
# returns that are followed by tabs or spaces.
# @param {String} query - A GraphQL query.
# @returns {String} - The minified GraphQL query.
###
minify = (query) ->
    query.replace(/[\r\n][\t\s]+/g, ' ')

class GraphClient
    ###*
    # Creates a new GraphClient.
    # @class
    # @param {object} options - Default options to be used with m.request.
    # @param {string} options.url - The URL of the GraphQL endpoint.
    ###
    constructor: (@options) ->

    ###*
    # Sends a GraphQL query using HTTP GET.
    # @param {String} query - A GraphQL query.
    # @param {Object} [variables=null] - Variables for the GraphQL query.
    # @returns {Promise} - A promise resolving the response data.
    ###
    get: (query, variables = null) ->
        @request(query, 'GET', JSON.stringify(variables))
    
    ###*
    # Sends a GraphQL query using HTTP POST.
    # @param {String} query - A GraphQL query.
    # @param {Object} [variables=null] - Variables for the GraphQL query.
    # @returns {Promise} - A promise resolving the response data.
    ###
    post: (query, variables = null) ->
        @request(query, 'POST', variables)
        
    ###*
    # Sends a GraphQL query.
    # @param {String} query - A GraphQL query.
    # @param {String} method - The HTTP method to use.
    # @param {Object} variables - Variables for the GraphQL query.
    # @returns {Promise} - A promise resolving the response data.
    ###
    request: (query, method, variables) ->
        options = merge(@options, {
            data: { 
                query: minify(query)
                variables: variables
            }
            method: method
        })
        
        m.request(options)

module.exports = {
    GraphClient
}
