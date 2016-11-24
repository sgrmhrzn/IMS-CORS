"use strict";

(function () {
    var app = angular.module("myApp", ["common.services", "ngCookies", "ui.router", "ImageCropper", "ngMessages"])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/dashboard');

            $stateProvider
                .state('home', {
                    url: '/dashboard',
                    views: {
                        '@': {
                            templateUrl: 'templates/dashBoard.html',
                            controller: 'homeCtrl as vm'
                        }
                    }
                })

                //main layout
                .state('home.layout', {
                    url: '^/',
                    views: {
                        '@': {
                            templateUrl: 'index.html',
                            controller: 'homeCtrl as vm'
                        }
                    }
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
    }).state('employee.attendance', {
        url: '^/attendance',
        views: {
            '@': {
                templateUrl: 'templates/employee/attendance/empAttendance.html',
                controller: 'employeeAttendanceCntrl',
            }
        },
    })
   .state('employee.timeTable', {
       url: '^/timeTable',
       views: {
           '@': {
               templateUrl: 'templates/employee/teachers/timeTableSearch.html',
               controller: 'teachersTimeTableCtrl',
           }
       },
   })
                .state('employee.timeTable.addUpdate', {
                    url: '^/timeTable?id&action',
                    views: {
                        '@': {
                            templateUrl: 'templates/employee/teachers/timeTableAddUpdate.html',
                            controller: 'teachersTimeTableCtrl',
                        }
                    },
                })
                .state('employee.lecture', {
                    url: '^/lectures',
                    views: {
                        '@': {
                            templateUrl: 'templates/employee/teachers/lectureSearch.html',
                            controller: 'lectureCtrl',
                        }
                    },
                })
                .state('employee.lecture.addUpdate', {
                    url: '^/lectures?id&action',
                    views: {
                        '@': {
                            templateUrl: 'templates/employee/teachers/lectureAddUpdate.html',
                            controller: 'lectureCtrl',
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
                //Attendence
        .state('students.attendance', {
            url: '^/attendance/:action',
            views: {
                '@': {
                    templateUrl: 'templates/academics/attendance/attendanceSearch.html',
                    controller: 'attendanceCntrl',
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
             }).state('category', {
                 url: '^/category',
                 views: {
                     '@': {
                         templateUrl: 'templates/Academics/academicSett/Category/Category.html',
                         controller: 'categoryCtrl',
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
                    controller: 'coursesCtrl',
                }
            },
        })

            //current user
                  .state('currentUser', {
                      url: '^/currentUser',
                      views: {
                          '@': {
                              templateUrl: 'templates/account/currentProfile.html',
                              controller: 'homeCtrl as vm'
                          }
                      },
                  })
        .state('currentUser.Update', {
            url: '^/currentUser/:action',
            views: {
                '@': {
                    templateUrl: 'templates/account/currentUserUpdate.html',
                    controller: 'homeCtrl as vm'
                }
            },
        })
        }])

        .filter('splitNumber', function () {
            return function (string) {
                var matches = string.match(/\d+|[a-z]+/ig);
                return matches[1];
            };
        })


        .filter('splitString', function () {
            return function (string) {
                var matches = string.match(/\d+|[a-z]+/ig);
                return matches[0];
            };
        });
})();