

(function () {
    'use strict';

    angular.module('organizer.directives', []).directive('blankDirective', blankDirective);

    blankDirective.$inject = ['$http', '$q'];

    function blankDirective($http, $q) {

    }
})();
