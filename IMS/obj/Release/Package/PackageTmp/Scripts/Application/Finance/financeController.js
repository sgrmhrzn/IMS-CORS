app.controller("financeCntrl", function ($scope, financeService, $filter, $state, $stateParams, employeeSettingsService) {

    //List for the all the fee structure
    getAllFeeStruct();
    $scope.Action = "Add";
    $scope.EMPLOYEE = [];
    //To Get All Records  

    function getAllFeeStruct() {
       
        var getData = financeService.getAllFeeStructures();
      
        getData.then(function (prs) {
            $scope.FeeStructure = prs.data;
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
app.controller("singleFinanceCntrl", function ($scope, financeService, $filter, $state, $stateParams, employeeSettingsService) {
    $scope.requiredMessage = 'This Field is required!'
    getRecordById();
    getAllDepartment();
    var FeeStructure = [];

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
        if ($stateParams.id != null) {
            //console.log($stateParams);
            var getData = financeService.getRecordById($stateParams.id);

            getData.then(function (prs) {
                $scope.feeStr = prs.data;
                //console.log($scope.profile);

                $scope.ID = $scope.feeStr.ID;
                $scope.Class = $scope.feeStr.Class;
                $scope.Category = $scope.feeStr.Category;
                $scope.AdmissionFee = $scope.feeStr.AdmissionFee;
                $scope.MonthlyFee = $scope.feeStr.MonthlyFee;
                $scope.ExtraCurricularActivity = $scope.feeStr.ExtraCurricularActivity;
                $scope.ExamFee = $scope.feeStr.ExamFee;
                $scope.LateFeeCharge = $scope.feeStr.LateFeeCharge;
            }, function () {
                alert('Error in getting records');
            });
        }
    }

    $scope.AddUpdate = function () {
        FeeStructure = {
            Class: $scope.Class,
            Category: $scope.Category,
            AdmissionFee: $scope.AdmissionFee,
            MonthlyFee: $scope.MonthlyFee,
            ExtraCurricularActivity: $scope.ExtraCurricularActivity,
            ExamFee: $scope.ExamFee,
            LateFeeCharge: $scope.LateFeeCharge,
        }
        //console.log(EMPLOYEE.base64);
        var getAction = $scope.Action;
        if (getAction == "Update") {
            FeeStructure.ID = $scope.ID;
            var getData = financeService.updateRecord(FeeStructure);
            getData.then(function (msg) {
                alert(msg.data);
                $scope.divAddUpdate = false;
            }, function () {
                alert('Error in updating record');
            });
        }
        else {
            var getData = financeService.AddRecord(FeeStructure);
                getData.then(function (msg) {
                    //console.log(personDetails);
                    alert(msg.data);
                }, function () {
                    alert('Error in adding record');
                });
            }
        $state.go("finance.fees");
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
            var getData = financeService.deleteRecord(emp);
            getData.then(function (msg) {
                //alert(msg.data);
            }, function () {
                alert('Error in Deleting Record');
            });
        }
    }
})