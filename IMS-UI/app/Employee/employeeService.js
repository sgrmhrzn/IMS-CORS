(function () {
    "use strict"

    angular
    .module("common.services")
    .service("employeeService", function ($http, appSettings, currentUser) {
        //sent url
        this.apiPath = function () {
            return appSettings.serverPath;
        }

        //get departments
        this.getAllDept = function () {
            return $http.get(appSettings.serverPath + "/api/empSettings/getDepartment", {
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
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
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
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
                url: appSettings.serverPath + "/api/employeeApi/update/" + emp.EmpID,
                data: JSON.stringify(emp),
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
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
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                dataType: "json"
            });
            return response;
        }

        //Delete Employee
        this.deleteRecord = function (emp) {
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/Test/delete/" + emp.EmpID,
                data: JSON.stringify(emp),
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                dataType: "json"
                //params: {
                //    employeeId: JSON.stringify(employeeId)
                // }
            });
            return response;
        }
    })

    .service("empAttendanceService", function ($http, appSettings, currentUser) {


        this.getAllAtt = function () {
            return $http.get(appSettings.serverPath + "/api/employeeApi/getAttendance", {
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            });
        };

        this.getStdNClass = function (Class) {
            return $http.get(appSettings.serverPath + "/api/academic/getStudentByClass/" + Class, {
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            });
        };

        // Add Employee
        this.AddRecord = function (record) {
            debugger;
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/employeeApi/addAttendance",
                data: JSON.stringify(record),
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                dataType: "json"
            });
            return response;
        }

    })
}());