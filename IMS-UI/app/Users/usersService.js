(function () {
    "use strict"

    angular
    .module("common.services")
        .service("usersService", function ($http, appSettings, currentUser) {

        //get All Eployee
        this.getAllRecords = function () {

            return $http.get(appSettings.serverPath + "/api/usersApi");
        };

        // get Employee By Id
        this.getRecordById = function (ID) {
            var response = $http({
                method: "GET",
                url: appSettings.serverPath + "/api/usersApi",
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
                url: appSettings.serverPath + "/api/usersApi/update/" + emp.ID,
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
                url: appSettings.serverPath + "/api/usersApi/add",
                data: JSON.stringify(record),
                dataType: "json"
            });
            return response;
        }

        //Delete Employee
        this.deleteRecord = function (person) {
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/usersApi/delete/" + person.person_id,
                data: JSON.stringify(person),
                dataType: "json"
                //params: {
                //    employeeId: JSON.stringify(employeeId)
                // }
            });
            return response;
        }

        //update by master ID to by users
        this.updateByMasterID = function (user) {
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/usersApi/updateByMasterID",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }
    })
}());