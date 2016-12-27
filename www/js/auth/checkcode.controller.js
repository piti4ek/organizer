(function() {
  'use strict';
  angular.module('organizer.controllers').controller('CheckCtrl', CheckCtrl);

  CheckCtrl.$inject = [
    '$scope',
    '$state',
    'AuthSvc',
    'localStorageService'
  ];

  function CheckCtrl($scope, $state, AuthSvc, localStorageService) {
    var vm = this;
    vm.checkCode = checkCode;
    vm.code = '';

    function checkCode() {

      if (!localStorageService.get('authData')) {
        console.log('empty auth data');
        return false;
      }

      var authData = localStorageService.get('authData');


      var phoneNumber = authData.phoneNumber ? authData.phoneNumber : '';
      var deviceToken = '123456789';
      var checkCode = vm.code ? vm.code : 0;

      if (!phoneNumber || !checkCode || !deviceToken) {
        console.log('missing data');
        return false;
      }

      var checkData = {
        phoneNumber: phoneNumber,
        deviceToken: deviceToken,
        code: checkCode
      };

      AuthSvc.checkCode(checkData).then(function(response) {

        if (response.description.status == 'OK') {
          var token = response.description.auth_token ? response.description.auth_token : false;
          if (!token) {
            console.log('no token');
            return false;
          }
          localStorageService.set('token', token);
          $state.go('menu.events');
        }

      }).catch(function(err) {
        console.log(err);
      });
    }
  }

})();
