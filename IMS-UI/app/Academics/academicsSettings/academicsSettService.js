(function () {
    "use strict"

    angular
    .module("common.services")
        .service("academicsSettSev", function ($http, appSettings, currentUser) {

            //get All Eployee
            this.getAllBatch = function () {
                return $http.get(appSettings.serverPath + "/api/academics/getBatch");
            };

            // get Employee By Id
            this.getBatchById = function (id) {
                var response = $http({
                    method: "GET",
                    url: appSettings.serverPath + "/api/academics/getBatch/" + id,
                    params: {
                        id: id
                    }
                });
                return response;
            }

            // Update Employee 
            this.updateBatch = function (batch) {
                var response = $http({
                    method: "post",
                    url: appSettings.serverPath + "/api/academics/updateBatch",
                    data: JSON.stringify(batch),
                    dataType: "json",
                });
                return response;
            }

            // Add Employee
            this.addBatch = function (record) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/academics/addBatch",
                    data: JSON.stringify(record),
                    dataType: "json"
                });
                return response;
            }

            //Delete Employee
            this.deleteBatch = function (person) {
                var response = $http({
                    method: "POST",
                    url: appSettings.serverPath + "/api/academics/deleteBatch",
                    data: JSON.stringify(person),
                    dataType: "json"
                    //params: {
                    //    employeeId: JSON.stringify(employeeId)
                    // }
                });
                return response;
            }
        })


        //service for course
    .service("coursesService", function ($http, appSettings, currentUser) {

        //get All Eployee
        this.getAllRecords = function () {
            return $http.get(appSettings.serverPath + "/api/academics/getCourse");
        };

        // get Employee By Id
        this.getRecordById = function (ID) {
            var response = $http({
                method: "GET",
                url: appSettings.serverPath + "/api/academics/getCourse/" + ID,
                params: {
                    id: ID
                }
            });
            return response;
        }

        // Update Employee 
        this.updateRecord = function (record) {
            var response = $http({
                method: "post",
                url: appSettings.serverPath + "/api/academics/updateCourse",
                data: JSON.stringify(record),
                dataType: "json"
            });
            return response;
        }

        // Add Employee
        this.AddRecord = function (record) {
            debugger;
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/academics/addCourse",
                data: JSON.stringify(record),
                dataType: "json"
            });
            return response;
        }

        //Delete Employee
        this.deleteRecord = function (record) {
            var response = $http({
                method: "POST",
                url: appSettings.serverPath + "/api/academics/deleteCourse",
                data: JSON.stringify(record),
                dataType: "json"
                //params: {
                //    employeeId: JSON.stringify(employeeId)
                // }
            });
            return response;
        }
    })
}());