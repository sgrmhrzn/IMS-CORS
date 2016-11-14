(function () {
    "use strict"
    angular
        .module("myApp")
        .controller("studentCntrl", function ($scope, studentService, $filter, $state, $stateParams, employeeSettingsService) {
            getAll();
            $scope.Action = "Add";
            $scope.Student = [];
            //To Get All Records  

            function getAll() {

                var getData = studentService.getAllRecords();

                getData.then(function (prs) {
                    $scope.Student = prs.data;
                    //$scope.profile = $scope.Student[$stateParams.id];

                }, function () {
                    alert('Error in getting records');
                });
            }

            $scope.AddUpdateDiv = function () {
                ClearFields();
                $scope.Action = "Add";
                $scope.divAddUpdate = true;
            }

            $scope.cancel = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = false;
                $scope.divAddUpdate = false;
                $scope.detailViewDiv = false;
            }

            function ClearFields() {
                $scope.ID = "";
                $scope.NAME = "";
                $scope.ADDRESS = "";
                $scope.PHONE_NO = "";
                $scope.MOBILE_NO = "";
                $scope.EMAIL = "";
                $scope.DESIGNATION = "";
                $scope.ACCESS_LEVEL = "";
                $scope.PERMANENT_ADDRESS = "";
                $scope.TEMP_ADDRESS = "";
                $scope.DOB = "";
                $scope.TEACHER_OR_NONTEACHER = "";
                $scope.NATIONAL_ID_NO = "";
                $scope.MARITAL_STATUS = "";
                $scope.GENDER = "";
                $scope.QUALIFICATION = "";
                $scope.DEPTID = "";
            }


        })
    .controller("singleStudentCntrl", function ($scope, studentService, $filter, $state, $stateParams, employeeSettingsService) {
        $scope.guardianDetailDiv = false;
        $scope.viewMoreBtn = true;
        getRecordById();
        getAllDepartment();
        var Student = [];

        $scope.viewMore = function () {
            $scope.viewLessBtn = true;
            $scope.guardianDetailDiv = true;
            $scope.viewMoreBtn = false;
        }

        $scope.viewLess = function () {
            $scope.viewLessBtn = false;
            $scope.viewMoreBtn = true;
            $scope.guardianDetailDiv = false;
        }

        $scope.Action = $stateParams.action;

        function getRecordById() {
            //image cropper start
            $scope.imageCropStep = 1;
            $scope.fileChanged = function (e) {

                var files = e.target.files;

                var fileReader = new FileReader();
                fileReader.readAsDataURL(files[0]);

                fileReader.onload = function (e) {
                    $scope.imgSrc = this.result;
                    $scope.$apply();
                };
            }

            $scope.clear = function () {
                $scope.imageCropStep = 1;
                delete $scope.imgSrc;
                delete $scope.result;
                delete $scope.resultBlob;
            };
            //end of image cropper

            //var employeeID = $filter('splitNumber')($stateParams.id);

            //console.log($stateParams);
            var getData = studentService.getRecordById($stateParams.id);

            getData.then(function (prs) {
                $scope.profile = prs.data;
                //console.log($scope.profile);

                $scope.ID = $scope.profile.StdID;
                $scope.NAME = $scope.profile.NAME;
                $scope.GENDER = $scope.profile.GENDER;
                $scope.DOB = new Date($filter('date')($scope.profile.DOB, "yyyy-MM-dd"));
                $scope.NATIONALITY = $scope.profile.NATIONALITY;
                $scope.ADDRESS = $scope.profile.ADDRESS;
                $scope.PHONENO = $scope.profile.PHONENO;
                $scope.CLASS = $scope.profile.CLASS;
                $scope.ENROLLEDYEAR = new Date($filter('date')($scope.profile.ENROLLEDYEAR, "yyyy-MM-dd"));
                $scope.Category = $scope.profile.Category;

                $scope.GUARDIAN_FIRSTNAME = $scope.profile.studentDetails.First_NAME;
                $scope.GUARDIAN_LASTNAME = $scope.profile.studentDetails.Last_Name;
                $scope.GUARDIAN_Relation = $scope.profile.studentDetails.Relation;
                $scope.GUARDIAN_PHONE = $scope.profile.studentDetails.GUARDIAN_PHONE_NO;
                $scope.GUARDIAN_MOBILE = $scope.profile.studentDetails.MOBILE_NO;
                $scope.GUARDIAN_EMAIL = $scope.profile.studentDetails.Email;
                $scope.GUARDIAN_DOB = new Date($filter('date')($scope.profile.studentDetails.DOB, "yyyy-MM-dd"));
                $scope.GUARDIAN_Education = $scope.profile.studentDetails.Education;
                $scope.GUARDIAN_Occupation = $scope.profile.studentDetails.Occupation;
                $scope.GUARDIAN_Income = $scope.profile.studentDetails.Income;
                $scope.GUARDIAN_AddLine1 = $scope.profile.studentDetails.AddLine1;
                $scope.GUARDIAN_AddLine2 = $scope.profile.studentDetails.AddLine2;
                $scope.GUARDIAN_State = $scope.profile.studentDetails.State;
                $scope.GUARDIAN_Country = $scope.profile.studentDetails.Country;
                console.log($scope.GUARDIAN_FIRSTNAME);
            }, function () {
                alert('Error in getting records');
            });
        }

        $scope.AddUpdate = function () {
            debugger;
            var dateBirth = $filter('date')($scope.DOB, "yyyy-MM-dd");
            var enrolledDate = $filter('date')($scope.ENROLLEDYEAR, "yyyy-MM-dd");
            var guardianDOB = $filter('date')($scope.GUARDIAN_DOB, "yyyy-MM-dd");
            Student = {
                NAME: $scope.NAME,
                PHONENO: $scope.PHONENO,
                DOB: dateBirth,
                CLASS: $scope.CLASS,
                ADDRESS: $scope.ADDRESS,
                GENDER: $scope.GENDER,
                NATIONALITY: $scope.NATIONALITY,
                ENROLLEDYEAR: enrolledDate,
                Category: $scope.Category,
                base64: (($scope.result != null) ? $scope.result : 'null'),
                studentDetails: {
                    GUARDIAN_PHONE_NO: $scope.GUARDIAN_PHONE,
                    MOBILE_NO: $scope.GUARDIAN_MOBILE,
                    First_NAME: $scope.GUARDIAN_FIRSTNAME,
                    Last_Name: $scope.GUARDIAN_LASTNAME,
                    Relation: $scope.GUARDIAN_Relation,
                    DOB: guardianDOB,
                    Education: $scope.GUARDIAN_Education,
                    Occupation: $scope.GUARDIAN_Occupation,
                    Income: $scope.GUARDIAN_Income,
                    Email: $scope.GUARDIAN_EMAIL,
                    AddLine1: $scope.GUARDIAN_AddLine1,
                    AddLine2: $scope.GUARDIAN_AddLine2,
                    State: $scope.GUARDIAN_State,
                    Country: $scope.GUARDIAN_Country
                }
            }
            //console.log(EMPLOYEE.base64);
            var getAction = $scope.Action;
            if (getAction == "Update") {
                Student.StdID = $scope.ID;
                var getData = studentService.updateRecord(Student);
                getData.then(function (msg) {
                    alert(msg.data);
                }, function () {
                    alert('Error in updating record');
                });
            }
            else {
                var getData = studentService.AddRecord(Student);
                getData.then(function (msg) {
                    //console.log(personDetails);
                    alert(msg.data);
                }, function () {
                    alert('Error in adding record');
                });
            }
            $state.go("students.search");
        }

        //drop down departments
        function getAllDepartment() {
            var getData = employeeSettingsService.getAllDept();
            getData.then(function (prs) {
                $scope.DEPARTMENT = prs.data;
            }, function () {
                alert('Error in getting records');
            });
        }

        $scope.delete = function (emp) {
            debugger;
            var result = confirm("Do you really want to delete " + emp.NAME + "?");
            if (result) {
                var getData = studentService.deleteRecord(emp);
                getData.then(function (msg) {
                    //alert(msg.data);
                }, function () {
                    alert('Error in Deleting Record');
                });
            }
        }
    })

    .controller("attendanceCntrl", function ($scope, attendenceService, $filter, $state, $stateParams) {
        getAll();
        $scope.Action = "Add";
        $scope.StdAttend = [];

        $scope.getStudents = function () {
            var getData = attendenceService.getStdNClass($scope.CLASS);
            getData.then(function (prs) {
                $scope.stdClass = prs.data;
                //$scope.profile = $scope.Student[$stateParams.id];

            }, function () {
                alert('Error in getting students');
            });
        }
        //To Get All Records  
        function getAll() {
            var getData = attendenceService.getAllAtt();

            getData.then(function (prs) {
                $scope.StdAttend = prs.data;
                //$scope.profile = $scope.Student[$stateParams.id];

            }, function () {
                alert('Error in getting records');
            });
        }

        $scope.AddUpdate = function () {
            debugger;
            dateNow = new Date();
            var dateOfAttendance = $filter('date')(dateNow, "yyyy-MM-dd");
            var time = $filter('date')(dateNow, "HH:mm:ss");

            StdAttend = {
                StdID: $scope.StdID,
                DateOfAttendance: dateOfAttendance,
                TIME: time,
                STATUS: $scope.STATUS
            }
            //console.log(EMPLOYEE.base64);
            var getAction = $scope.Action;
            var getData = attendenceService.AddRecord(StdAttend);
            getData.then(function (msg) {
                //console.log(personDetails);
                alert(msg.data);
            }, function () {
                alert('Error in adding record');
            });
        }

        $scope.AddUpdateDiv = function () {
            ClearFields();
            $scope.Action = "Add";
            $scope.divAddUpdate = true;
        }

        $scope.cancel = function () {
            //If DIV is visible it will be hidden and vice versa.
            $scope.IsVisible = false;
            $scope.divAddUpdate = false;
            $scope.detailViewDiv = false;
        }
    })
}());