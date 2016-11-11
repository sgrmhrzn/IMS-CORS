(function () {
    "use strict";

    angular
    .module("myApp")
    .controller("academicCtrl", ["userAccount", "currentUser", "$cookies", "$state", "$location", "$stateParams","academicResource",
                                       academicCtrl]);

    function academicCtrl(userAccount, currentUser, $cookies, $state, $stateParams, $location,academicResource) {
        var vm = this;
        vm.currentUserName = currentUser.getProfile().username;
        vm.userType = currentUser.getProfile().userType;
        //console.log(currentUser.getProfile());
        if (currentUser.getProfile().token == '') {
            $state.go('login');
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

        vm.courseData = {
            CourseName:'',
            CourseLevel:'',
            CourseInstructor1: '',
            CourseInstructor2: '',
            CourseInstructor3: '',
            ClassNo: ''
        };

        vm.addUpdate = function () {
            var data = vm.courseData;
            var newAdd = new academicResource.add.add(
                {
                    course: data
                });
            newAdd.$save();
        }

    }
})();