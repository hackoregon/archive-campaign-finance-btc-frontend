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
        templateUrl: 'views/home.html'
        controller: 'MainCtrl'
      .when '/browse/:raceLevel?',
        templateUrl: 'views/browse.html'
        controller: 'BrowseCtrl'

      # possibly deprecated
      .when '/contributions/:campaignId',
        templateUrl: 'views/contributions.html'
        controller: 'ContributionsCtrl'
      .when '/spend/:campaignId/:contributorId?',
        templateUrl: 'views/spend.html'
        controller: 'SpendCtrl'
      .when '/where/:campaignId/:raceLevel?',
        templateUrl: 'views/where.html'
        controller: 'WhereCtrl'
      .when '/worth/:campaignId/:contributorId?',
        templateUrl: 'views/worth.html'
        controller: 'WorthCtrl'
      .when '/calculate',
        templateUrl: 'views/calculate.html'
        controller: 'CalculateCtrl'

      # Nav Bar
      .when '/about',
        templateUrl: 'views/about.html'
        controller: 'AboutCtrl'
      .when '/sandbox',
        templateUrl: 'views/sandbox.html'
        controller: 'SandboxCtrl'
      .when '/register',
        templateUrl: 'views/register.html'
        controller: 'RegisterCtrl'
      .when '/hack_pac',
        templateUrl: 'views/hack_pac.html'
        controller: 'HackPacCtrl'
      .when '/contact',
        templateUrl: 'views/contact.html'
        controller: 'ContactCtrl'
      .otherwise
        redirectTo: '/'
