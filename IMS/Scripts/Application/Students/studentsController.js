app.controller("studentCntrl", function ($scope, studentService, $filter, $state, $stateParams, employeeSettingsService) {
    getAll();
    $scope.Action = "Add";
    $scope.Student = [];
    //To Get All Records  

    function getAll() {
       
        var getData = studentService.getAllRecords();
      
        getData.then(function (prs) {
            $scope.Student = prs.data;
            //$scope.profile = $scope.Student[$stateParams.id];
            
        },function () {
            alert('Error in getting records');
        });
    }
    
    $scope.AddUpdateDiv=function()
    {
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
app.controller("singleStudentCntrl", function ($scope, studentService, $filter, $state, $stateParams, employeeSettingsService) {
    getRecordById();
    getAllDepartment();
    var Student = [];

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
            console.log($scope.profile);

            $scope.ID = $scope.profile.ID;
            $scope.NAME = $scope.profile.NAME;
            $scope.ADDRESS = $scope.profile.ADDRESS;
            $scope.PHONE_NO = $scope.profile.PHONE_NO;
            $scope.MOBILE_NO = $scope.profile.MOBILE_NO;
            $scope.EMAIL = $scope.profile.EMAIL;
            $scope.DESIGNATION = $scope.profile.DESIGNATION;
            $scope.PERMANENT_ADDRESS = $scope.profile.PERMANENT_ADDRESS;
            $scope.TEMP_ADDRESS = $scope.profile.TEMP_ADDRESS;
            $scope.DOB = new Date($filter('date')($scope.profile.DOB, "yyyy-MM-dd"));
            $scope.TEACHER_OR_NONTEACHER = $scope.profile.TEACHER_OR_NONTEACHER;
            $scope.NATIONAL_ID_NO = $scope.profile.NATIONAL_ID_NO;
            $scope.MARITAL_STATUS = $scope.profile.MARITAL_STATUS;
            $scope.GENDER = $scope.profile.GENDER;
            $scope.QUALIFICATION = $scope.profile.QUALIFICATION;
            $scope.DEPTID = $scope.profile.departments.DEPTID;
            $scope.JoiningDate = new Date($filter('date')($scope.profile.JoiningDate, "yyyy-MM-dd"));

        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdate = function () {
        var dateBirth = $filter('date')($scope.DOB, "yyyy-MM-dd");
        var joinDate = $filter('date')($scope.JoiningDate, "yyyy-MM-dd");
        EMPLOYEE = {
            NAME: $scope.NAME,
            PHONE_NO: $scope.PHONE_NO,
            MOBILE_NO: $scope.MOBILE_NO,
            EMAIL: $scope.EMAIL,
            DESIGNATION: $scope.DESIGNATION,
            PERMANENT_ADDRESS: $scope.PERMANENT_ADDRESS,
            TEMP_ADDRESS: $scope.TEMP_ADDRESS,
            DOB: dateBirth,
            TEACHER_OR_NONTEACHER: $scope.TEACHER_OR_NONTEACHER,
            NATIONAL_ID_NO: $scope.NATIONAL_ID_NO,
            MARITAL_STATUS: $scope.MARITAL_STATUS,
            GENDER: $scope.GENDER,
            QUALIFICATION: $scope.QUALIFICATION,
            DEPTID: $scope.DEPTID,
            JoiningDate: joinDate,
            base64: (($scope.result != null) ? $scope.result : 'null')
        }
        //console.log(EMPLOYEE.base64);
        var getAction = $scope.Action;
        if (getAction == "Update") {
            EMPLOYEE.ID = $scope.ID;
            var getData = studentService.updateRecord(EMPLOYEE);
            getData.then(function (msg) {
                alert(msg.data);
                $scope.divAddUpdate = false;
            }, function () {
                alert('Error in updating record');
            });
        }
        else {
            var getData = studentService.AddRecord(EMPLOYEE);
                getData.then(function (msg) {
                    //console.log(personDetails);
                    alert(msg.data);
                    $scope.divAddUpdate = false;
                }, function () {
                    alert('Error in adding record');
                });
            }
        $state.go("employee.search");
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