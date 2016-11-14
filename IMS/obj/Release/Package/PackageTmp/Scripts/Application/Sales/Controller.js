app.controller("salesCntrl", function ($scope, salesService, dateFilter) {
    $scope.divSales = false;
    GetAllSales();
    //To Get All Records  
    function GetAllSales() {
        $scope.loading = true;
        var getData = salesService.getSales();
        
        getData.then(function (emp) {
            $scope.sales = emp.data;
            console.log(emp.date);
            //emp.newDate = new Date(emp.date);
            $scope.loading = false;
        }, function () {
            alert('Error in getting records');
        });
    }

    function ClearFields() {
        $scope.employeeId = "";
        $scope.employeeName = "";
        $scope.employeeEmail = "";
        $scope.employeeAge = "";
    }


    $scope.dateStart = "";
    $scope.dateEnd = "";
    $scope.searchDescription = undefined;

    $scope.submit = function () {
        $scope.loading = true;
        $scope.searchDescription = $scope.filter.description;

        var start = $scope.FromDate;
        var end = $scope.ToDate;

        var parsed_start_date = Date.parse(start);
        var parse_end_date = Date.parse(end);

        var start_date = '/Date(' + parsed_start_date + ')/';
        var end_date = '/Date(' + parse_end_date + ')/';

        $scope.dateStart = start_date;
        $scope.dateEnd = end_date;
        //var date2 = $scope.q;
        //    console.log(date2);

        $scope.loading = false;
    }

    //get total
    $scope.sales = [];
    $scope.getTotal = function () {
        var total = 0;
        console.log($scope.sales.lenght);
        for (var i = 0; i < $scope.sales.lenght; i++) {
            var sales = $scope.sale[i];
            total += sales.total_price ;
        }
        return total;
    }

});