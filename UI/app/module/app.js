"use strict";

(function () {
    var app = angular.module("myApp", ["common.services", "ngCookies", "ui.router"])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'index.html',
                    controller: 'homeCtrl as vm'
                })
                .state('account', {
                    url: '/account',
                })
            .state('login', {
                url: '^/login',
                views: {
                    '@': {
                        templateUrl: '/templates/account/login.html',
                        controller: 'MainCtrl as vm'
                    }
                },
            })
            .state('courses', {
                url: '/course',
                views: {
                    '@': {
                        templateUrl: '/templates/Academics/courses/courseSearch.html',
                        controller: 'academicCtrl as vm'
                    }
                }
            })
            .state('courses.addUpdate', {
                url: '^/course/:action',
                views: {
                    '@': {
                        templateUrl: '/templates/Academics/courses/courseAddUpdate.html',
                        controller: 'academicCtrl as vm'
                    }
                },
            })
        }])
  //      .config(['$urlRouterProvider',
  //function ($urlRouterProvider) {

  //    $urlRouterProvider.otherwise('/');
  //}
  //      ]);
})();