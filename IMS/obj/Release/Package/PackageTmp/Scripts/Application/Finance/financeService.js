app.service("financeService", function ($http) {

    //get All Eployee
    this.getAllFeeStructures = function () {
      
        return $http.get("api/financeApi/getFeeStructures");
    };

    // get Employee By Id
    this.getRecordById = function (ID) {
        var response = $http({
            method: "GET",
            url: "api/financeApi/getFeeStr/"+ ID,
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
            url: "api/financeApi/updateFeeStructures/" + R.ID,
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
            url: "api/financeApi/addFeeStructures",
            data: JSON.stringify(R),
            dataType: "json"
        });
        return response;
    }

    //Delete Employee
    this.deleteRecord = function (person) {
        var response = $http({
            method: "POST",
            url: "api/Test/delete/"+person.person_id,
            data: JSON.stringify(person),
            dataType: "json"
            //params: {
            //    employeeId: JSON.stringify(employeeId)
           // }
        });
        return response;
    }
});