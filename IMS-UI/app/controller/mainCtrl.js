(function () {
    "use strict";

    angular
    .module("myApp")
    .controller("MainCtrl", ["userAccount","currentUser","$cookies","$state","$location","$stateParams","$filter","$window","usersService",
                                       MainCtrl]);

    function MainCtrl(userAccount, currentUser, $cookies, $state, $stateParams, $location, $filter, $window, usersService) {
        var vm = this;
        vm.loading = false;

        if (currentUser.getProfile().token != '') {
            $state.go('home');
        }

        vm.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };

        vm.logout = function () {
            $cookies.remove("profileCookies");
            $state.go('login');
            return currentUser.removeProfile();

        };

        vm.message = '';

        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;

            userAccount.registration.registerUser(vm.userData,
                function (data) {
                    vm.confirmPassword = "";
                    vm.message = "Registration successful";
                    vm.login();
                },
                function (response) {
                    vm.isLoggedIn = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;

                    //validation errors
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        }


        vm.login = function () {
            vm.loading = true;
            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            String.prototype.padLeft = function padLeft(length, leadingChar) {
                if (leadingChar === undefined) leadingChar = "0";
                return this.length < length ? (leadingChar + this).padLeft(length, leadingChar) : this;
            };

            userAccount.login.loginUser(vm.userData,
                function (data) {
                    vm.message = "";
                    vm.password = "";
                    currentUser.setProfile(vm.userData.userName, data.access_token, $filter('splitString')(data.MasterID), $filter('splitNumber')(data.MasterID));
                    //console.log($cookies.getObject('profileCookies'));
                    
                    $window.location.reload();
                    $state.go('home');
                    vm.loading = false;
                },
                function (response) {
                    vm.password = "";
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;

                    if (response.data.error) {
                        vm.message += response.data.error;
                    }
                });
        }
    }
})();