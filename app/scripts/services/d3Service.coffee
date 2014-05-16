#TODO - inject d3 as a service

# 'use strict'

# angular.module("d3", [])
#     .factory "d3Service", [
#         "$document"
#         "$window"
#         "$q"
#         "$rootScope"
#         ($document, $window, $q, $rootScope) ->
#             debugger
#             d = $q.defer()
#             d3service = d3: ->
#                 d.promise
            
#             onScriptLoad = ->
#                 # Load client in the browser
#                 $rootScope.$apply ->
#                     d.resolve $window.d3
#                     return
#                 return
            
#             # Create a script tag with d3 as the source
#             # and call our onScriptLoad callback when it
#             # has been loaded
#             scriptTag = $document[0].createElement("script")
#             scriptTag.type = "text/javascript"
#             scriptTag.async = true
#             scriptTag.src = "http://d3js.org/d3.v3.min.js"
#             scriptTag.onreadystatechange = ->
#               onScriptLoad() if @readyState is "complete"
#               return

#             scriptTag.onload = onScriptLoad
#             s = $document[0].getElementsByTagName("body")[0]
#             s.appendChild scriptTag
#             return d3service
#         ]

