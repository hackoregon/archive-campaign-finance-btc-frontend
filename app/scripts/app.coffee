'use strict'

angular.module('frontendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  # 'd3'
])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/who',
        templateUrl: 'views/who.html'
        controller: 'WhoCtrl'
      .when '/what',
        templateUrl: 'views/what.html'
        controller: 'WhatCtrl'
      .when '/when',
        templateUrl: 'views/when.html'
        controller: 'WhenCtrl'
      .when '/where',
        templateUrl: 'views/where.html'
        controller: 'WhereCtrl'
      .when '/mainviz',
        templateUrl: 'views/mainviz.html'
        controller: 'MainvizCtrl'
      .otherwise
        redirectTo: '/'
