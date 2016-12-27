(function() {
  'use strict';

  angular.module('organizer.services').factory('CreateEventCtrl', CreateEventCtrl);

  AuthSvc.$inject = [
    '$http',
    '$q',
    'AppConfig',
    'DefaultSvc'
  ];

  function CreateEventCtrl($http, $q, AppConfig, DefaultSvc) {

    var createEvent = {
      createEvent: createEvent,
      newEvent: newEvent
    };

    return authSvc;

    function newEvent(params) {
      var def = $q.defer();
      $http({
        url: AppConfig.apiUrl + 'newEvent',
        method: "POST",
        data: params
      }).success(function(response) {
        def.resolve(response);
      }).error(function(error) {
        def.reject(error);
      });
      return def.promise;

    }
  }

})();
