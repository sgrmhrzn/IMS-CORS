(function () {
    "use strict"

    angular
    .module("common.services")
        .factory("currentUser",
                ["$cookies", currentUser])

    function currentUser($cookies){
        var profile = {
            isLoggedIn: false,
            username: "",
            token: "",
            userType: ""
        }

        var removeProfile = function(){
            profile = {
                isLoggedIn: false,
                username: "",
                token: "",
                userType: ""
            }
        };

        var setProfile = function (username, token, userType) {
             profile = {
                username: username,
                token: token,
                isLoggedIn: true,
                userType: userType
            }
            $cookies.putObject('profileCookies', profile)
        };
        var getProfile = function () {
            return ($cookies.getObject('profileCookies') != undefined)? $cookies.getObject('profileCookies'):profile;
        }

        return{
            setProfile: setProfile,
            getProfile: getProfile,
            removeProfile: removeProfile
        }
        
    }
}());