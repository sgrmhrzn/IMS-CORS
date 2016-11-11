(function () {
    "use strict"

    angular
    .module("common.services")
        .factory("valuesResource",
                    ["$resource", "appSettings","currentUser",
                                        valuesResource])

    function valuesResource($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "/api/values/get", null,
        {
            'get': {
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            },
            //'save': { 
            //    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            //},
            //'update': {
            //    method:'PUT',
            //    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            //}
        })

    }
}());