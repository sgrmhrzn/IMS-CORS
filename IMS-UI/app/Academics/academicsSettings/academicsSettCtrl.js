(function () {
    "use strict"
    angular
        .module("myApp")
        .controller("academicsSettCtrl", function ($scope, academicsSettSev, $filter, $state, $stateParams) {
            getAllBatch();
            $scope.message = "This Field is required!";

            if ($stateParams.id != undefined) {
                getByIdBatch();
            }

            $scope.Action = $stateParams.action;
            //To Get All Records  
            function getAllBatch() {

                var getData = academicsSettSev.getAllBatch();

                getData.then(function (batch) {
                    $scope.batches = batch.data;
                }, function () {
                    alert('Error in getting Batches');
                });
            }

            function getByIdBatch() {
                var getData = academicsSettSev.getBatchById($stateParams.id);
                getData.then(function (bat) {
                    var batch = bat.data;
                    console.log(batch);

                    $scope.ID = batch.ID;
                    $scope.Section = batch.Section;
                    $scope.Class = batch.Class;
                    $scope.BatchName = batch.BatchName;
                    $scope.MaxNoOfStds = batch.MaxNoOfStds;

                    $scope.divAddUpdate = true;
                },

                function () {
                    alert('Error in getting records');
                });
            }

            $scope.AddUpdate = function () {
                //console.log($scope.DEPTNAME);
                
                var batches = {
                    Section: $scope.Section,
                    Class: $scope.Class,
                    BatchName: $scope.BatchName,
                    MaxNoOfStds: $scope.MaxNoOfStds
                }

                var getAction = $scope.Action;

                if (getAction == "Update") {

                    batches.ID = $scope.ID;
                    var getData = academicsSettSev.updateBatch(batches);
                    getData.then(function (msg) {
                        getAllBatch();
                        alert(msg.data);
                        $scope.divAddUpdate = false;
                    }, function () {
                        alert('Error in updating record');
                    });
                }
                else {
                    var getData = academicsSettSev.addBatch(batches);
                    debugger;
                    getData.then(function (msg) {
                        getAllBatch();
                        //console.log(personDetails);
                        alert(msg.data);
                        $scope.divAddUpdate = false;
                    }, function () {
                        alert('Error in adding record');
                    });
                }
                $state.go('academicsSettings.batches')
                debugger;
                getAllBatch();
                //$scope.refresh();
            }

            $scope.delete = function (batch) {
                debugger;
                var result = confirm("Do you really want to delete " + batch.BatchName + "?");
                if (result) {
                    var getData = academicsSettSev.deleteBatch(batch);
                    getData.then(function (msg) {
                        getAllBatch();
                        //alert(msg.data);
                    }, function () {
                        alert('Error in Deleting Record');
                    });
                }
            }
        })

        //controller for courses
            .controller("coursesCtrl", function ($scope, coursesService, $filter, $state, $stateParams) {
                
                getAll();
                var Courses = [];
                var course;
                $scope.Action = $stateParams.action;

                if ($stateParams.id != undefined)
                {
                    getRecordById();
                }

                //To Get All Records  
                function getAll() {
                    var getData = coursesService.getAllRecords();
                    getData.then(function (crs) {
                        $scope.Courses = crs.data;
                    }, function () {
                        alert('Error in getting records');
                    });
                }

                //Single Object fetch
                function getRecordById() {
                    //console.log($stateParams.id);
                    var getData = coursesService.getRecordById($stateParams.id);

                    getData.then(function (crs) {
                        course = crs.data;
                        console.log(course.CourseName);

                        $scope.ID = course.CourseID;
                        $scope.CourseName = course.CourseName;
                        $scope.CourseLevel = course.CourseLevel;
                        $scope.CourseInstructor1 = course.CourseInstructor1;
                        $scope.CourseInstructor2 = course.CourseInstructor2;
                        $scope.CourseInstructor3 = course.CourseInstructor3;
                        $scope.ClassNo = course.ClassNo;

                    }, function () {
                        alert('Error in getting records');
                    });
                }

                $scope.AddUpdate = function () {
                    Courses = {
                        CourseName: $scope.CourseName,
                        CourseLevel: $scope.CourseLevel,
                        CourseInstructor1: $scope.CourseInstructor1,
                        CourseInstructor2: $scope.CourseInstructor2,
                        CourseInstructor3: $scope.CourseInstructor3,
                        ClassNo: $scope.ClassNo
                    }

                    var getAction = $scope.Action;
                    if (getAction == "Update") {
                        Courses.CourseID = $scope.ID;
                        var getData = coursesService.updateRecord(Courses);
                        getData.then(function (msg) {
                            alert(msg.data);
                            $scope.divAddUpdate = false;
                        }, function () {
                            alert('Error in updating record');
                        });
                    }
                    else {
                        var getData = coursesService.AddRecord(Courses);
                        getData.then(function (msg) {
                            //console.log(personDetails);
                            alert(msg.data);
                            $scope.divAddUpdate = false;
                        }, function () {
                            alert('Error in adding record');
                        });
                    }
                    //$state.go("users.search");
                }

                $scope.delete = function (course) {
                    debugger;
                    var result = confirm("Do you really want to delete " + course.CourseName + "?");
                    if (result) {
                        var getData = coursesService.deleteRecord(course);
                        getData.then(function (msg) {
                            //alert(msg.data);
                        }, function () {
                            alert('Error in Deleting Record');
                        });
                    }
                }
            })
    //controller for courses
            .controller("categoryCtrl", function ($scope, categoryService, $filter, $state, $stateParams) {

                $scope.divAddUpdate = false;

                getAll();
                $scope.Categories = [];
                var Category;

                //To Get All Records  
                function getAll() {
                    var getData = categoryService.getAllRecords();
                    getData.then(function (crs) {
                        $scope.Categories = crs.data;
                    }, function () {
                        alert('Error in getting records');
                    });
                }

                //Single Object fetch
                $scope.edit = function (cat) {
                    $scope.Action = "Update";
                    $scope.divAddUpdate = true;

                    //console.log($stateParams.id);
                    var getData = categoryService.getRecordById(cat.ID);

                    getData.then(function (crs) {
                        $scope.Category = crs.data;
                        //console.log(course.CourseName);

                        $scope.ID = cat.ID;
                        $scope.category = cat.Category;
                    }, function () {
                        alert('Error in getting records');
                    });
                }

                $scope.AddUpdate = function () {
                    Category = {
                        Category: $scope.category
                    }

                    var getAction = $scope.Action;
                    if (getAction == "Update") {
                        Category.ID = $scope.ID;
                        var getData = categoryService.updateRecord(Category);
                        getData.then(function (msg) {
                            alert(msg.data);
                            $scope.divAddUpdate = false;
                        }, function () {
                            alert('Error in updating record');
                        });
                    }
                    else {
                        var getData = categoryService.AddRecord(Category);
                        getData.then(function (msg) {
                            //console.log(personDetails);
                            alert(msg.data);
                            $scope.divAddUpdate = false;
                        }, function () {
                            alert('Error in adding record');
                        });
                    }
                    //$state.go("users.search");
                }

                $scope.delete = function (cat) {
                    debugger;
                    var result = confirm("Do you really want to delete " + cat.Category + "?");
                    if (result) {
                        var getData = categoryService.deleteRecord(cat);
                        getData.then(function (msg) {
                            //alert(msg.data);
                        }, function () {
                            alert('Error in Deleting Record');
                        });
                    }
                }
                $scope.AddUpdateDiv = function () {
                    ClearFields();
                    $scope.Action = "Add";
                    $scope.divAddUpdate = true;
                }

                function ClearFields ()
                {
                    $scope.ID = "";
                    $scope.Category = "";
                }

                $scope.cancel = function () {
                    //If DIV is visible it will be hidden and vice versa.
                    $scope.IsVisible = false;
                    $scope.divAddUpdate = false;
                }
            })
}());
