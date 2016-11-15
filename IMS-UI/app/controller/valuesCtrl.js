(function () {
    "use strict";

    angular
    .module("myApp")
    .controller("valuesCtrl", ["valuesResource", valuesCtrl]);

    function valuesCtrl(valuesResource, currentUser) {
        var vm = this;

        valuesResource.query(function (data) {
            vm.values = data;
            console.log(vm.values);
        });
    }
})();