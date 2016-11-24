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
            userType: "",
            userID: "",
        }

        var removeProfile = function(){
            profile = {
                isLoggedIn: false,
                username: "",
                token: "",
                userType: "",
                userID: "",
            }
        };

        var setProfile = function (username, token, userType, userID) {
             profile = {
                username: username,
                token: token,
                isLoggedIn: true,
                userType: userType,
                userID: userID
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