(function () {
    "use strict"

    angular
    .module("common.services")
        .service("teachersTimeTableService", function ($http, appSettings, currentUser) {
            
            //get All Eployee
            this.getAllRecords = function () {
                return $http.get(appSettings.serverPath + "/api/employeeApi/timeTable", {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                });
            };

            //get Employee By Id
            this.getRecordById = function (ID) {
                var response = $http({
                    method: "GET",
                    url: appSettings.serverPath + "/api/employeeApi/timeTable/" + ID,
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                    params: {
                        id: ID
                    }
                });
                return response;
            }

            //Update Employee 
            this.updateRecord = function (r) {
                var response = $http({
                    method: "post",
                    url: appSettings.serverPath + "/api/employeeApi/timeTableUpdate",
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                    data: JSON.stringify(r),
                    dataType: "json"
                });
                return response;
            }

            //Add Employee
            this.AddRecord = function (record) {
                debugger;
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/employeeApi/timeTableAdd",
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                    data: JSON.stringify(record),
                    dataType: "json"
                });
                return response;
            }

            //Delete Employee
            this.deleteRecord = function (t) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/employeeApi/timeTableDelete/" + t.ID,
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                    data: JSON.stringify(t),
                    dataType: "json"
                    //params: {
                    //    employeeId: JSON.stringify(employeeId)
                    // }
                });
                return response;
            }
        })

    .service("lectureService", function ($http, appSettings, currentUser) {

        //get All Teachers
        this.getAllTeachers = function () {
            return $http.get(appSettings.serverPath + "/api/academics/getTeachers",
                {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                });
        };


        //get All Eployee
        this.getAllRecords = function () {
            return $http.get(appSettings.serverPath + "/api/academics/getLecture",
                {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                });
        };

        //get Employee By Id
        this.getRecordById = function (ID) {
            var response = $http({
                method: "GET",
                url: appSettings.serverPath + "/api/academics/getLecture/" + ID,
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                params: {
                    id: ID
                }
            });
            return response;
        }

        //Update Employee 
        this.updateRecord = function (r) {
            var response = $http({
                method: "post",
                url: appSettings.serverPath + "/api/academics/updateLecture",
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                data: JSON.stringify(r),
                dataType: "json"
            });
            return response;
        }

        //Add Employee
        this.AddRecord = function (record) {
            debugger;
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/academics/addLecture",
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                data: JSON.stringify(record),
                dataType: "json"
            });
            return response;
        }

        //Delete Employee
        this.deleteRecord = function (t) {
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/academics/deleteLecture/" + t.ID,
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                data: JSON.stringify(t),
                dataType: "json"
                //params: {
                //    employeeId: JSON.stringify(employeeId)
                // }
            });
            return response;
        }
    })
}());