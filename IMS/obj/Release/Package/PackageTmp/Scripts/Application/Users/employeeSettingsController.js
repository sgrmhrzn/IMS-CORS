﻿app.controller("employeeSettingsCntrl", function ($scope, employeeSettingsService, $filter, $state, $stateParams) {
    $scope.divAddUpdate = false;
    $scope.detailViewDiv = false;
    getAllDept();
    

    //To Get All Records  
    function getAllDept() {
       
        var getData = employeeSettingsService.getAllDept();
      
        getData.then(function (dept) {
            $scope.DEPARTMENT = dept.data;
        },function () {
            alert('Error in getting Departments');
        });
    }

    $scope.editDept = function (dept) {
        debugger;
        $scope.divAddUpdate = true;

        var getData = employeeSettingsService.getDeptById(dept.ID);
        getData.then(function (DEP) {
            $scope.DEPARTMENT = DEP.data;

            $scope.ID = dept.ID;
            $scope.DEPTNAME = dept.DEPTNAME;

            $scope.Action = "Update";
            $scope.divAddUpdate = true;
        },

        function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdateDept = function ()
    {
        console.log($scope.DEPTNAME);
        var DEPARTMENT = {
            DEPTNAME: $scope.DEPTNAME
        }
        
        var getAction = $scope.Action;

        if (getAction == "Update") {
            DEPARTMENT.ID = $scope.ID;
            var getData = employeeSettingsService.updateDepartment(DEPARTMENT);
            getData.then(function (msg) {
                getAllDept();
                alert(msg.data);
                $scope.divAddUpdate = false;
            }, function () {
                alert('Error in updating record');
            });
        }
        else {
            var getData = employeeSettingsService.AddDeptRecord(DEPARTMENT);
            debugger;
                getData.then(function (msg) {
                    getAllDept();
                    //console.log(personDetails);
                    alert(msg.data);
                    $scope.divAddUpdate = false;
                }, function () {
                    alert('Error in adding record');
                });
        }
        debugger;
        getAllDept();
        //$scope.refresh();
    }

    //$scope.apply(function () {
    //    debugger;
    //    // update goes here
    //    GetAllEmployee();
    //});


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

    $scope.deleteDept = function (dept)
    {
        debugger;
        var result = confirm("Do you really want to delete " + dept.DEPTNAME + "?");
        if (result) {
            var getData = employeeSettingsService.deleteDeptRecord(dept);
            getData.then(function (msg) {
                getAllDept();
                //alert(msg.data);
            }, function () {
                alert('Error in Deleting Record');
            });
        }
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
