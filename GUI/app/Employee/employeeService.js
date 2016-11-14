(function () {
    "use strict"

    angular
    .module("common.services")
    .service("employeeService", function ($http, appSettings, currentUser) {
        //get departments
        //get All Eployee
        this.getAllDept = function () {
            return $http.get(appSettings.serverPath + "/api/empSettings/getDepartment", {
                headers: { 'Authorization': 'Bearer' + currentUser.getProfile().token }
            });
        };

        //get All Eployee
        this.getAllRecords = function () {
            return $http.get(appSettings.serverPath + "/api/employeeApi", {
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            });
        };

        // get Employee By Id
        this.getRecordById = function (ID) {
            var response = $http({
                method: "GET",
                url: appSettings.serverPath + "/api/employeeApi",
                params: {
                    id: ID
                }
            });
            return response;
        }

        // Update Employee 
        this.updateRecord = function (emp) {
            var response = $http({
                method: "post",
                url: appSettings.serverPath + "/api/employeeApi/update/" + emp.ID,
                data: JSON.stringify(emp),
                dataType: "json"
            });
            return response;
        }

        // Add Employee
        this.AddRecord = function (record) {
            debugger;
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/employeeApi/add",
                data: JSON.stringify(record),
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