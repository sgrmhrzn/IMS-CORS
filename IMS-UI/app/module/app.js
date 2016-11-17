"use strict";

(function () {
    var app = angular.module("myApp", ["common.services", "ngCookies", "ui.router", "ImageCropper", "ngMessages"])
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

                //users
        .state('users', {
            controller: 'usersCntrl'
        }).state('users.add', {
            url: '^/users/:action',
            views: {
                '@': {
                    templateUrl: 'templates/users/userAddUpdate.html',
                    controller: 'singleUserCntrl',
                }
            },
        }).state('users.search', {
            url: '^/userSearch',
            views: {
                '@': {
                    templateUrl: 'templates/users/userSearch.html',
                    controller: 'userCntrl',
                }
            },
        }).state('users.Update', {
            url: '^/user?id&action',
            views: {
                '@': {
                    templateUrl: 'templates/users/userAddUpdate.html',
                    controller: 'singleUserCntrl'
                }
            },
        })

     //students
        .state('students', {
            controller: 'studentCntrl'
        }).state('students.add', {
            url: '^/students/:action',
            views: {
                '@': {
                    templateUrl: 'templates/academics/students/studentAddUpdate.html',
                    controller: 'singleStudentCntrl',
                }
            },
        }).state('students.search', {
            url: '^/studentSearch',
            views: {
                '@': {
                    templateUrl: 'templates/academics/students/studentSearch.html',
                    controller: 'studentCntrl',
                }
            },
        }).state('students.Update', {
            url: '^/studentUpdate?id&action',
            views: {
                '@': {
                    templateUrl: 'templates/academics/students/studentAddUpdate.html',
                    controller: 'singleStudentCntrl'
                }
            },
        }).state('students.detailAsRoot', {
            url: '^/profile/student/:id',
            views: {
                '@': {
                    templateUrl: 'templates/academics/students/studentProfile.html',
                    controller: 'singleStudentCntrl'
                }
            },
        })


        //finance
        .state('finance', {
            controller: 'financeCntrl'
        }).state('finance.fees', {
            url: '^/fees',
            views: {
                '@': {
                    templateUrl: 'templates/Finance/feeStructure.html',
                    controller: 'financeCntrl',
                }
            },
        }).state('finance.fees.create', {
            url: '^/fees/:action',
            views: {
                '@': {
                    templateUrl: 'templates/Finance/feeStructuresAddUpdate.html',
                    controller: 'singleFinanceCntrl',
                }
            },
        })
        .state('finance.fees.update', {
            url: '^/feesUpdate?id&action',
            views: {
                '@': {
                    templateUrl: 'templates/Finance/feeStructuresAddUpdate.html',
                    controller: 'singleFinanceCntrl'
                }
            },
        })

    //Attendence
        .state('attendance', {
            controller: 'attendanceCntrl'
        }).state('attendance.add', {
            url: '^/attendance/:action',
            views: {
                '@': {
                    templateUrl: 'templates/academics/attendance/attendanceSearch.html',
                    controller: 'attendanceCntrl',
                }
            },
        })

            //academics Settings
             //.state('academicsSettings', {
             //    controller: 'academicsSettCtrl'
             //})
                .state('batches', {
                 url: '^/batches',
                 views: {
                     '@': {
                         templateUrl: 'templates/Academics/academicSett/batch/batchSearch.html',
                         controller: 'academicsSettCtrl',
                     }
                 },
             }).state('batches.addUpdate', {
                 url: '^/batch?id&action',
                 views: {
                     '@': {
                         templateUrl: 'templates/Academics/academicSett/batch/batchAddUpdate.html',
                         controller: 'academicsSettCtrl',
                     }
                 },
             })
        //.state('batches.update', {
        //    url: '^/batch?id&action',
        //    views: {
        //        '@': {
        //            templateUrl: 'templates/Academics/academicSett/batch/batchAddUpdate.html',
        //            controller: 'academicsSettCtrl'
        //        }
        //    },
        //})

            //academics Settings
             .state('courses', {
                 url: '^/courses',
                 views: {
                     '@': {
                         templateUrl: 'templates/Academics/academicSett/Courses/courseSearch.html',
                         controller: 'coursesCtrl',
                     }
                 },
             })
                .state('courses.add', {
                 url: '^/courses/:action',
                 views: {
                     '@': {
                         templateUrl: 'templates/Academics/academicSett/Courses/courseAddUpdate.html',
                         controller: 'coursesCtrl',
                     }
                 },
             })
        .state('courses.update', {
            url: '^/courses?id&action',
            views: {
                '@': {
                    templateUrl: 'templates/Academics/academicSett/Courses/courseAddUpdate.html',
                    controller: 'coursesCtrl'
                }
            },
        })
        }]).filter('splitNumber', function () {
            return function (string) {
                var matches = string.match(/\d+|[a-z]+/ig);
                return matches[1];
            };
        }).filter('splitString', function () {
            return function (string) {
                var matches = string.match(/\d+|[a-z]+/ig);
                return matches[0];
            };
        });
})();