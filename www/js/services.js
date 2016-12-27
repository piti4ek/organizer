(function() {
  'use strict';

  angular.module('organizer.services', []).factory('DefaultSvc', DefaultSvc);

  DefaultSvc.$inject = [
    '$http',
    '$q',
    'AppConfig',
    '$httpParamSerializerJQLike',
    '$cordovaPushV5'
  ];

  function DefaultSvc($http, $q, AppConfig, $httpParamSerializerJQLike, $cordovaPushV5) {
    // console.log($cordovaPushV5);
    var defaultService = {
      httpRequest: httpRequest,
      deviceRegistration: deviceRegistration
    };
    return defaultService;

    function httpRequest(params) {
      // showLoading();
      var def = $q.defer();
      var method = params.method ? params.method : 'GET';

      var requestOptions = {
        method: method,
        url: AppConfig.apiUrl + params.url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      if (params.data) {
        requestOptions.data = $httpParamSerializerJQLike(params.data);
      }
      if (params.withoutAccessToken) {
        requestOptions.headers['x-access-token'] = localStorageService.get('token');
      }

      if (method == 'POST') {
        requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      }

      if (params.params) {
        requestOptions.params = params.params;
      }

      $http(requestOptions)
        .success(function(response) {
          //hideLoading();
          def.resolve(response);
        })
        .error(function(error) {
          def.reject(error);
        });

      return def.promise;
    }

    function deviceRegistration() {
      console.log('device registration in process');
      //registration device token with $cordovaPushV5 plugin
      document.addEventListener("deviceready", function() {
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();
        var deviceInformation = ionic.Platform.device();

        var options = {
          android: {
            senderID: "988668220653" // 988668220653
          },
          ios: {
            senderID: "988668220653", //      988668220653
            alert: "true",
            badge: "true",
            sound: "true"
          },
          windows: {}
        };



        // initialize
        $cordovaPushV5.initialize(options).then(function(res) {

          $cordovaPushV5.onNotification();
          $cordovaPushV5.onError();

          // register to get registrationId
          $cordovaPushV5.register().then(function(result) {

            console.log("Register success " + result);

            var registrationOptions = {};

            registrationOptions.deviceHash = deviceInformation.uuid;
            registrationOptions.type = deviceInformation.model;
            //check platform
            if (isIOS) {
              registrationOptions.deviceToken = result;
              registrationOptions.os = 'ios';
            }
            if (isAndroid) {
              registrationOptions.deviceToken = result;
              registrationOptions.os = 'android';
            }

            console.log(registrationOptions);
            return registrationOptions;


            //device reg on server

          }).catch(function(err) {
            alert(err);
          });
        }).catch(function(err) {
          alert(err);
        });
      }, false);
    }

  }
})();
