var app = angular.module("myApp", ['ngMessages', 'ui.router', 'ImageCropper'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'templates/home/Index.html',
            controller: 'HomeController'
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
        url: '^/userUpdate?id&action',
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
          //  .state('students.detailAsRoot', {
        //    url: '^/profile/student/:id',
        //    views: {
        //        '@': {
        //            templateUrl: 'templates/students/studentProfile.html',
        //            controller: 'singleStudentCntrl'
        //        }
        //    },
    //})


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
        //.state('finance.fees.create', {
        //    url: '^/fees/:action',
        //    views: {
        //        '@': {
        //            templateUrl: 'templates/Finance/feeStructuresAddUpdate.html',
        //            controller: 'singleFinanceCntrl',
        //        }
        //    },
        //})
        //.state('finance.fees.update', {
        //    url: '^/feesUpdate?id&action',
        //    views: {
        //        '@': {
        //            templateUrl: 'templates/Finance/feeStructuresAddUpdate.html',
        //            controller: 'singleFinanceCntrl'
        //        }
        //    },
        //})
}])
.config(['$urlRouterProvider',
  function($urlRouterProvider) {

      $urlRouterProvider.otherwise('/');
  }
])


.filter('sumOfValue', function () {
    return function (data, key) {
        //debugger;
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;
        var sum = 0;

        angular.forEach(data, function (v, k) {
            sum = sum + parseInt(v[key]);
        });
        return sum;
    }
}).filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {
        if (angular.isUndefined(data) && angular.isUndefined(key1) && angular.isUndefined(key2))
            return 0;

        var sum = 0;
        angular.forEach(data, function (v, k) {
            sum = sum + (parseInt(v[key1]) * parseInt(v[key2]));
        });
        return sum;
    }
}).filter('dateRange', function () {
    return function (sales, fromDate, toDate) {

        var filtered = [];
        //here you will have your desired input
        //var from_date = Date.parse(fromDate);
        //var to_date = Date.parse(toDate);
        //var fdate = '/Date(' + from_date + ')/';
        //var tdate = '/Date(' + to_date + ')/';

        //console.log(sales);

        angular.forEach(sales, function (obj) {
            var receivedDate = obj.date;
            console.log(receivedDate);
            if (receivedDate >= fromDate && receivedDate <= toDate) {
                filtered.push(obj);
            }
        });
        return filtered;
    };
}).filter('splitNumber', function(){
    return function(string){
        var matches = string.match(/\d+|[a-z]+/ig);
        return matches[1];
    };
}).filter('splitString', function(){
    return function(string){
        var matches = string.match(/\d+|[a-z]+/ig);
        return matches[0];
    };
});


