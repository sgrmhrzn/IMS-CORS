(function () {
    "use strict"
    angular
        .module("myApp")
        .controller("teachersTimeTableCtrl", function ($scope, teachersTimeTableService, $filter, $state, $stateParams) {
            getAll();

            if ($stateParams.id != null) {
                getRecordById();
            }
            $scope.Action = $stateParams.action;

            $scope.timeTables = [];
            var timeTables = [];
            //To Get All Records  

            function getAll() {
                var getData = teachersTimeTableService.getAllRecords();

                getData.then(function (prs) {
                    $scope.timeTables = prs.data;
                }, function () {
                    alert('Error in getting records');
                });
            }


        function getRecordById() {

            //console.log($stateParams);
            var getData = teachersTimeTableService.getRecordById($stateParams.id);

            getData.then(function (prs) {
                $scope.TT = prs.data;
                console.log($scope.TT);
                $scope.ID = $scope.TT.StdID;
                $scope.ClassRoom_ID = $scope.TT.ClassRoom_ID;
                $scope.DayOfTheWeek = $scope.TT.DayOfTheWeek;
                $scope.StartTime = $scope.TT.StartTime;
                $scope.EndTime = $scope.TT.EndTime;
                $scope.Lecture_ID = $scope.TT.Lecture_ID;

            }, function () {
                alert('Error in getting records');
            });
        }

        $scope.AddUpdate = function () {
            debugger;

            timeTables = {
                ClassRoom_ID: $scope.ClassRoom_ID,
                DayOfTheWeek: $scope.DayOfTheWeek,
                StartTime: $scope.StartTime,
                EndTime: $scope.EndTime,
                Lecture_ID: $scope.Lecture_ID,
            }

            //console.log(EMPLOYEE.base64);
            var getAction = $scope.Action;
            if (getAction == "Update") {
                timeTables.ID = $scope.ID;
                var getData = teachersTimeTableService.updateRecord(timeTables);
                getData.then(function (msg) {
                    alert(msg.data);
                }, function () {
                    alert('Error in updating record');
                });
            }
            else {
                var getData = teachersTimeTableService.AddRecord(timeTables);
                getData.then(function (msg) {
                    //console.log(personDetails);
                    alert(msg.data);
                }, function () {
                    alert('Error in adding record');
                });
            }
            $state.go("employee.timeTable");
        }

        $scope.delete = function (emp) {
            debugger;
            var result = confirm("Do you really want to delete " + emp.NAME + "?");
            if (result) {
                var getData = teachersTimeTableService.deleteRecord(emp);
                getData.then(function (msg) {
                    //alert(msg.data);
                }, function () {
                    alert('Error in Deleting Record');
                });
            }
        }
        })

            .controller("lectureCtrl", function ($scope, lectureService, $filter, $state, $stateParams, coursesService) {
                getAll();
                getCourses();
                getTeachers();
                if ($stateParams.id != null) {
                    getRecordById();
                }
                $scope.Action = $stateParams.action;
                $scope.lectures = [];
                var Lecture = [];
                //get Teachers
                function getTeachers() {
                    var getData = lectureService.getAllTeachers();
                    getData.then(function (T) {
                        $scope.teachers = T.data;
                    }, function () {
                        alert('error in getting teachers')
                    });
                }

                //get courses
                function getCourses() {
                    var getData = coursesService.getAllRecords();

                    getData.then(function (crs) {
                        $scope.courses = crs.data;
                    }, function () {
                        alert('error in getting courses');
                    });
                }

                //To Get All lectures  
                function getAll() {
                    var getData = lectureService.getAllRecords();

                    getData.then(function (l) {
                        $scope.lectures = l.data;
                    }, function () {
                        alert('Error in getting records');
                    });
                }

                function getRecordById() {

                    //console.log($stateParams);
                    var getData = lectureService.getRecordById($stateParams.id);

                    getData.then(function (prs) {
                        var L = prs.data;
                        //console.log($scope.profile);
                        $scope.ID = L.Lecture_ID;
                        $scope.course = L.CourseID;
                        $scope.teacher = L.TeacherID;

                    }, function () {
                        alert('Error in getting records');
                    });
                }

                $scope.AddUpdate = function () {
                    debugger;

                    Lecture = {
                        CourseID: $scope.course,
                        TeacherID: $scope.teacher,
                    }

                    //console.log(EMPLOYEE.base64);
                    var getAction = $scope.Action;
                    if (getAction == "Update") {
                        Lecture.Lecture_ID = $scope.ID;

                        var getData = lectureService.updateRecord(Lecture);
                        getData.then(function (msg) {
                            alert(msg.data);
                        }, function () {
                            alert('Error in updating record');
                        });
                    }
                    else {
                        var getData = lectureService.AddRecord(Lecture);
                        getData.then(function (msg) {
                            //console.log(personDetails);
                            alert(msg.data);
                        }, function () {
                            alert('Error in adding record');
                        });
                    }
                    $state.go("employee.lecture");
                }

                $scope.delete = function (emp) {
                    debugger;
                    var result = confirm("Do you really want to delete " + emp.NAME + "?");
                    if (result) {
                        var getData = lectureService.deleteRecord(emp);
                        getData.then(function (msg) {
                            //alert(msg.data);
                        }, function () {
                            alert('Error in Deleting Record');
                        });
                    }
                }
            })

}());