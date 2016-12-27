angular.module('organizer', [
    'ionic',
    'organizer.controllers',
    'organizer.routes',
    'organizer.services',
    'ngCordova',
    'LocalStorageModule',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap'
])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });

        });
