app.controller("userCntrl", function ($scope, usersService, $filter, $state, $stateParams, employeeSettingsService) {
    getAll();
    $scope.Users = [];
    //To Get All Records  

    function getAll() {
       
        var getData = usersService.getAllRecords();
      
        getData.then(function (prs) {
            $scope.Users = prs.data;
            //$scope.profile = $scope.EMPLOYEE[$stateParams.id];
            
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
app.controller("singleUserCntrl", function ($scope, usersService, $filter, $state, $stateParams) {
    getRecordById();
    var Users = [];

    String.prototype.padLeft = function padLeft(length, leadingChar) {
        if (leadingChar === undefined) leadingChar = "0";
        return this.length < length ? (leadingChar + this).padLeft(length, leadingChar) : this;
    };

    $scope.Action = $stateParams.action;

    function getRecordById() {

        console.log($stateParams.id);
        var getData = usersService.getRecordById($stateParams.id);

        getData.then(function (prs) {
            $scope.profile = prs.data;
            console.log($scope.profile.NAME);

            $scope.ID = $scope.profile.UserID;
            $scope.NAME = $scope.profile.NAME;
            $scope.UserName = $scope.profile.UserName;
            $scope.AccessRole = $scope.profile.AccessRole;
            $scope.UserPassword = $scope.profile.UserPassword;
            $scope.Status = $scope.profile.Status;
            $scope.userPrefix = $filter('splitString')($scope.profile.MasterID);
            $scope.employeeID = $filter('splitNumber')($scope.profile.MasterID);
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdate = function () {
        Users = {
            NAME: $scope.NAME,
            UserName: $scope.UserName,
            AccessRole: $scope.AccessRole,
            UserPassword: $scope.UserPassword,
            Status: $scope.Status,
            MasterID: $scope.userPrefix + $scope.employeeID.padLeft(4)
        }

        var getAction = $scope.Action;
        if (getAction == "Update") {
            Users.UserID = $scope.ID;
            var getData = usersService.updateRecord(Users);
            getData.then(function (msg) {
                alert(msg.data);
                $scope.divAddUpdate = false;
            }, function () {
                alert('Error in updating record');
            });
        }
        else {
            var getData = usersService.AddRecord(Users);
                getData.then(function (msg) {
                    //console.log(personDetails);
                    alert(msg.data);
                    $scope.divAddUpdate = false;
                }, function () {
                    alert('Error in adding record');
                });
            }
        $state.go("users.search");
    }

    $scope.delete = function (emp) {
        debugger;
        var result = confirm("Do you really want to delete " + emp.NAME + "?");
        if (result) {
            var getData = usersService.deleteRecord(emp);
            getData.then(function (msg) {
                //alert(msg.data);
            }, function () {
                alert('Error in Deleting Record');
            });
        }
    }
})