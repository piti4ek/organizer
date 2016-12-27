(function() {
  'use strict';

  angular.module('organizer.services').factory('AuthSvc', AuthSvc);

  AuthSvc.$inject = [
    '$http',
    '$q',
    'AppConfig',
    'DefaultSvc'
  ];

  function AuthSvc($http, $q, AppConfig, DefaultSvc) {

    var authSvc = {
      verifyPhone: verifyPhone,
      checkCode: checkCode,
      authToken: authToken
    };

    return authSvc;

    function verifyPhone(params) {
      var def = $q.defer();
      $http({
        url: AppConfig.apiUrl + 'verifyPhone',
        method: "POST",
        data: params
      }).success(function(response) {
        def.resolve(response);
      }).error(function(error) {
        def.reject(error);
      });
      return def.promise;

    }

    function checkCode(params) {
      var def = $q.defer();
      $http({
        url: AppConfig.apiUrl + 'checkCode',
        method: "POST",
        data: params
      }).success(function(response) {
        def.resolve(response);
      }).error(function(error) {
        def.reject(error);
      });
      return def.promise;

    }

    function authToken(params) {
      var def = $q.defer();
      $http({
        url: AppConfig.apiUrl + 'authToken',
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
