app.service("employeeSettingsService", function ($http) {

    //get All Eployee
    this.getAllDept = function () {
      
        return $http.get("api/empSettings/getDepartment");
    };

    // get Employee By Id
    this.getDeptById = function (ID) {
        var response = $http({
            method: "GET",
            url: "api/empSettings/getDepById",
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
            url: "api/empSettings/updateDept/",
            data: JSON.stringify(dept),
            dataType: "json"
        });
        return response;
    }

    // Add Employee
    this.AddDeptRecord = function (record) {
        var response = $http({
            method: "POST",
            url: "api/empSettings/addDepartment",
            data: JSON.stringify(record),
            dataType: "json"
        });
        return response;
    }

    //Delete Employee
    this.deleteDeptRecord = function (person) {
        var response = $http({
            method: "POST",
            url: "api/empSettings/deleteDept",
            data: JSON.stringify(person),
            dataType: "json"
            //params: {
            //    employeeId: JSON.stringify(employeeId)
           // }
        });
        return response;
    }
});