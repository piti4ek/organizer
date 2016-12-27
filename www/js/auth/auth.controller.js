(function() {
  'use strict';
  angular.module('organizer.controllers').controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = [
    '$scope',
    '$state',
    'AuthSvc',
    'DefaultSvc',
    'localStorageService'
  ];

  function AuthCtrl($scope, $state, AuthSvc, DefaultSvc, localStorageService) {

    var vm = this;
    vm.verifyPhone = verifyPhone;
    vm.phoneNumber = '';
    vm.init = init;

    function init() {
      if (localStorageService.get('authData')) {
        $state.go('checkcode');
      }
    }

    function verifyPhone() {

      if (!vm.phoneNumber) {
        return false;
      }
      var params = {
        phoneNumber: vm.phoneNumber
      };


      AuthSvc.verifyPhone(params).then(function(response) {

        if (!response) {
          return false;
        }

        if (response.description.status == 'OK') {
          var verifyCode = response.description.code ? response.description.code : false;
          var phoneNumber = vm.phoneNumber;

          if (!verifyCode) {
            return false;
          }

          var authData = {
            verifyCode: verifyCode,
            phoneNumber: phoneNumber
          };
          localStorageService.set('authData', authData);
          $state.go('checkcode');
        } else {
          return false;
        }

      }).catch(function(err) {
        console.log(err);
      });

    }

  }

})();
