// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildNodesHotThreads (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [nodes.hot_threads](https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-hot-threads.html) request
   *
   * @param {list} node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {time} interval - The interval for the second sampling of threads
   * @param {number} snapshots - Number of samples of thread stacktrace (default: 10)
   * @param {number} threads - Specify the number of threads to provide information for (default: 3)
   * @param {boolean} ignore_idle_threads - Don't show threads that are in known-idle places, such as waiting on a socket select or pulling from an empty task queue (default: true)
   * @param {enum} type - The type to sample (default: cpu)
   * @param {time} timeout - Explicit operation timeout
   */

  const acceptedQuerystring = [
    'interval',
    'snapshots',
    'threads',
    'ignore_idle_threads',
    'type',
    'timeout',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    ignoreIdleThreads: 'ignore_idle_threads',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function nodesHotThreads (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // check required parameters
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, nodeId, node_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((node_id || nodeId) != null) {
      path = '/' + '_cluster' + '/' + 'nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hotthreads'
    } else if ((node_id || nodeId) != null) {
      path = '/' + '_cluster' + '/' + 'nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hot_threads'
    } else if ((node_id || nodeId) != null) {
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hot_threads'
    } else if ((node_id || nodeId) != null) {
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'hotthreads'
    } else {
      path = '/' + '_nodes' + '/' + 'hot_threads'
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildNodesHotThreads
