(function () {
    "use strict"
    angular
        .module("common.services")
        .service("employeeSettingsService", function ($http, appSettings ) {

            //get All Eployee
            this.getAllDept = function () {

                return $http.get(appSettings.serverPath + "/api/academics/getDepartment");
            };

            // get Employee By Id
            this.getDeptById = function (ID) {
                var response = $http({
                    method: "GET",
                    url: appSettings.serverPath + "/api/academics/getDepById",
                    params: {
                        id: JSON.stringify(ID)
                    }
                });
                return response;
            }

            // Update Employee 
            this.updateDepartment = function (dept) {
                var response = $http({
                    method: "post",
                    url: appSettings.serverPath + "/api/academics/updateDept/",
                    data: JSON.stringify(dept),
                    dataType: "json"
                });
                return response;
            }

            // Add Employee
            this.AddDeptRecord = function (record) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/academics/addDepartment",
                    data: JSON.stringify(record),
                    dataType: "json"
                });
                return response;
            }

            //Delete Employee
            this.deleteDeptRecord = function (person) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/academics/deleteDept",
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