(function () {
    "use strict";

    angular
    .module("myApp")
    .controller("MainCtrl", ["userAccount","currentUser","$cookies","$state","$location","$stateParams",
                                       MainCtrl]);

    function MainCtrl(userAccount, currentUser, $cookies, $state, $stateParams, $location) {
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
            return currentUser.removeProfile();
            $state.go('login');
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

            userAccount.login.loginUser(vm.userData,
                function (data) {
                    vm.message = "";
                    vm.password = "";
                    currentUser.setProfile(vm.userData.userName, data.access_token, vm.userData.userType);
                    //console.log($cookies.getObject('profileCookies'));
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