(function () {
    "use strict"

    angular
    .module("common.services")
        .service("studentService", function ($http, appSettings, currentUser) {

            //get departments
            //get All Eployee
            this.getAllDept = function () {

                return $http.get(appSettings.serverPath + "/api/empSettings/getDepartment",
                    {
                        headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                    });

            };

            //get All Eployee
            this.getAllRecords = function () {
                return $http.get(appSettings.serverPath + "/api/studentsApi/getAll");
            };

            // get Employee By Id
            this.getRecordById = function (ID) {
                var response = $http({
                    method: "GET",
                    url: appSettings.serverPath + "/api/studentsApi",
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
                    url: appSettings.serverPath + "/api/studentsApi/update/" + emp.ID,
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
                    url: appSettings.serverPath + "/api/studentsApi/add",
                    data: JSON.stringify(record),
                    dataType: "json"
                });
                return response;
            }

            //Delete Employee
            this.deleteRecord = function (person) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/studentsApi/delete/" + person.person_id,
                    data: JSON.stringify(person),
                    dataType: "json"
                    //params: {
                    //    employeeId: JSON.stringify(employeeId)
                    // }
                });
                return response;
            }
        })
    .service("attendenceService", function ($http, appSettings, currentUser) {


        this.getAllAtt = function () {

            return $http.get(appSettings.serverPath + "/api/academic/attendance");
        };

        this.getStdNClass = function (Class) {
            return $http.get(appSettings.serverPath + "/api/academic/getStudentByClass/" + Class)
        };

        // Add Employee
        this.AddRecord = function (record) {
            debugger;
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/academic/attendance/add",
                data: JSON.stringify(record),
                dataType: "json"
            });
            return response;
        }

    })
}());