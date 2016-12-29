angular.module('organizer.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'AuthCtrl',
      controllerAs: 'vm',
      cache: true
    })
    .state('checkcode', {
      url: '/checkcode',
      templateUrl: 'templates/checkcode.html',
      controller: 'CheckCtrl',
      controllerAs: 'vm',
      cache: true
    })
    .state('menu', {
      cache: false,
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl',
    })
    .state('menu.events', {
      url: '/events',
      views: {
        'menu-content': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl',
          controllerAs: 'vm',
        }
      },
    })

  .state('menu.createEvent', {
    url: '/createEvent',
    views: {
      'menu-content': {
        templateUrl: 'templates/create.event.html',
        controller: 'CreateEventCtrl',
        controllerAs: 'vm',
      }
    },
  })

  .state('menu.calendar', {
    url: '/calendar',
    views: {
      'menu-content': {
        templateUrl: 'templates/calendar.html',
        controller: 'calendarCtrl',
        controllerAs: 'vm',
      }
    },
  })


  $urlRouterProvider.otherwise('/login')

});
