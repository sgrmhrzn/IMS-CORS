(function () {
    "use strict"

    angular
    .module("common.services")
        .factory("academicResource",
                    ["$resource", "appSettings", "currentUser",
                                        academicResource])

    function academicResource($resource, appSettings, currentUser) {
        return {
            add: $resource(appSettings.serverPath + "/api/academicsSett/addCourse", null,
                {
                    'add': {
                        method: 'POST',
                        headers: { 'Content-Type' : 'application/json; charset=UTF-8'}
                       
                    }
                }),
            get: $resource(appSettings.serverPath + "/api/values/get", null,
                {
                    'get': {
                        headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                        //'save': { 
                        //    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                        //},
                        //'update': {
                        //    method:'PUT',
                        //    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                        //}
                    }

                }),
        }
    }
}());