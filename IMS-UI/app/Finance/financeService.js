(function () {
    "use strict"

    angular
    .module("common.services")
        .service("financeService", function ($http, appSettings, currentUser) {

            //get All Eployee
            this.getAllFeeStructures = function () {

                return $http.get(appSettings.serverPath + "/api/financeApi/getFeeStructures");
            };

            // get Employee By Id
            this.getRecordById = function (ID) {
                var response = $http({
                    method: "GET",
                    url: appSettings.serverPath + "/api/financeApi/getFeeStr/" + ID,
                    params: {
                        id: ID
                    }
                });
                return response;
            }

            // Update Employee 
            this.updateRecord = function (R) {
                var response = $http({
                    method: "post",
                    url: appSettings.serverPath + "/api/financeApi/updateFeeStructures/" + R.ID,
                    data: JSON.stringify(R),
                    dataType: "json"
                });
                return response;
            }

            // Add Employee
            this.AddRecord = function (R) {
                debugger;
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/financeApi/addFeeStructures",
                    data: JSON.stringify(R),
                    dataType: "json"
                });
                return response;
            }

            //Delete Employee
            this.deleteRecord = function (person) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/Test/delete/" + person.person_id,
                    data: JSON.stringify(person),
                    dataType: "json"
                    //params: {
                    //    employeeId: JSON.stringify(employeeId)
                    // }
                });
                return response;
            }
        })
}());