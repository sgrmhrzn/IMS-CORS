app.service("studentService", function ($http) {

    //get departments
    //get All Eployee
    this.getAllDept = function () {

        return $http.get("api/empSettings/getDepartment");
    };

    //get All Eployee
    this.getAllRecords = function () {
      
        return $http.get("api/studentsApi");
    };

    // get Employee By Id
    this.getRecordById = function (ID) {
        var response = $http({
            method: "GET",
            url: "/api/studentsApi",
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
            url: "api/studentsApi/update/" + emp.ID,
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
            url: "api/studentsApi/add",
            data: JSON.stringify(record),
            dataType: "json"
        });
        return response;
    }

    //Delete Employee
    this.deleteRecord = function (person) {
        var response = $http({
            method: "POST",
            url: "api/studentsApi/delete/" + person.person_id,
            data: JSON.stringify(person),
            dataType: "json"
            //params: {
            //    employeeId: JSON.stringify(employeeId)
           // }
        });
        return response;
    }
});