(function() {
  'use strict';
  angular.module('organizer.controllers').controller('CreateEventCtrl', CreateEventCtrl);

  CreateEventCtrl.$inject = [
    '$scope',
    '$state',
    'localStorageService'
  ];

})();

function CreateEventCtrl($scope, $state, localStorageService) {

  var vm = this;
  vm.location = '';
  vm.onAddressSelection = onAddressSelection;

  function onAddressSelection(location) {

console.log(location);
    vm.location = location.formatted_address;
    var lat = location.geometry.location.lat();
    var lng = location.geometry.location.lng();
  }

}
