(function() {
  'use strict';
  angular.module('organizer.controllers').controller('EventsCtrl', EventsCtrl);

  EventsCtrl.$inject = [
    '$scope',
    '$state',
    'localStorageService'
  ];

  function EventsCtrl($scope, $state, localStorageService) {
    var vm = this;
    
  }

})();
