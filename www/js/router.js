uver.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
      url: '/app',
      controller: 'userCtrl',
      template: '<ion-nav-view></ion-nav-view>',
      abstract: true,
  })
  .state('app.login', {
      cache: false,
      url: '/login',
      controller: 'userCtrl',
      templateUrl: 'templates/login.html'
  })
  .state('app.spedizioni', {
    cache: false,
    url: '/spedizioni',
    templateUrl: 'templates/spedizioni.html',
    controller: 'userCtrl'
  })
   .state('app.ritiri', {
    cache: false,
    url: '/ritiri',
    templateUrl: 'templates/ritiri.html',
    controller: 'userCtrl'
  })
    .state('app.ritirilx', {
    cache: false,
    url: '/ritirilx',
    templateUrl: 'templates/ritirilx.html',
    controller: 'userCtrl'
  })
    .state('app.ritira', {
    cache: false,
    url: '/ritira',
    templateUrl: 'templates/ritira.html',
    controller: 'userCtrl'
  })
    .state('app.rifiuta', {
    cache: false,
    url: '/rifiuta',
    templateUrl: 'templates/rifiuta.html',
    controller: 'userCtrl'
  })
    .state('app.view', {
    cache: false,
    url: '/view',
    templateUrl: 'templates/view.html',
    controller: 'userCtrl'
  })
    .state('app.consegna', {
    cache: false,
    url: '/consegna',
    templateUrl: 'templates/consegna.html',
    controller: 'userCtrl'
  })
    .state('app.giacenza', {
    cache: false,
    url: '/giacenza',
    templateUrl: 'templates/giacenza.html',
    controller: 'userCtrl'
  })
  .state('app.addPayment', {
    cache: false,
    url: '/addPayment',
    templateUrl: 'templates/addPayment.html',
    controller: 'userCtrl'
  })
  .state('app.listaconseff', {
    cache: false,
    url: '/listaconseff',
    templateUrl: 'templates/listaconseff.html',
    controller: 'userCtrl'
  })
    .state('app.listaconsneg', {
    cache: false,
    url: '/listaconsneg',
    templateUrl: 'templates/listaconsneg.html',
    controller: 'userCtrl'
  })
        .state('app.listaritirieff', {
    cache: false,
    url: '/listaritirieff',
    templateUrl: 'templates/listaritirieff.html',
    controller: 'userCtrl'
  })
            .state('app.listaritiriman', {
    cache: false,
    url: '/listaritiriman',
    templateUrl: 'templates/listaritiriman.html',
    controller: 'userCtrl'
  })
  .state('app.profile', {
    cache: false,
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'userCtrl'
  })
  .state('app.cancel', {
    cache: false,
    url: '/cancel',
    templateUrl: 'templates/cancel.html',
    controller: 'pickupCtrl'
  })
  .state('app.estimate', {
    cache: false,
    url: '/estimate',
    templateUrl: 'templates/estimate.html',
    controller: 'pickupCtrl'
  })
  .state('app.pickupTo', {
    cache: false,
    url: '/pickupTo',
    templateUrl: 'templates/pickupTo.html',
    controller: 'pickupCtrl'
  })
  .state('app.pickupFrom', {
    cache: false,
    url: '/pickupFrom',
    templateUrl: 'templates/pickupFrom.html',
    controller: 'pickupCtrl'
  })
  .state('app.deliverTracking', {
    cache: false,
    url: '/deliverTracking',
    templateUrl: 'templates/deliverTracking.html',
    controller: 'pickupCtrl'
  });
  $urlRouterProvider.otherwise("/app/login");
});
