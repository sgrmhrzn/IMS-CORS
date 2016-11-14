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
             .state('employee', {
                 url: '/employee',
                 templateUrl: 'templates/employee/Index.html',
                 controller: 'employeeCntrl'
             })
    .state('employee.detailAsRoot', {
        url: '^/profile/:id',
        views: {
            '@': {
                templateUrl: 'templates/employee/profile.html',
                controller: 'singleEmployeeCntrl'
            }
        },
    }).state('employee.add', {
        url: '^/employee/:action',
        views: {
            '@': {
                templateUrl: 'templates/employee/addUpdate.html',
                controller: 'singleEmployeeCntrl'
            }
        },
    }).state('employee.Update', {
        url: '^/update?id&action',
        views: {
            '@': {
                templateUrl: 'templates/employee/addUpdate.html',
                controller: 'singleEmployeeCntrl'
            }
        },
    }).state('employee.search', {
        url: '^/search',
        views: {
            '@': {
                templateUrl: 'templates/employee/Search.html',
                controller: 'employeeCntrl',
            }
        },
    }).state('employee.settings', {
        url: '^/settings',
        views: {
            '@': {
                templateUrl: 'templates/employee/EMPsettings.html',
                controller: 'employeeSettingsCntrl',
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