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
      controller: 'loginController',
      templateUrl: 'app/login/login.html'
  })
  .state('app.spedizioni', {
    cache: true,
    url: '/spedizioni',
    templateUrl: 'app/spedizioni/spedizioni.html',
    controller: 'spedizioniCtrl'
  })
   .state('app.ritiri', {
    cache: false,
    url: '/ritiri',
    templateUrl: 'app/ritri/ritiri.html',
    controller: 'ritriCtrl'
  })
    .state('app.ritirilx', {
    cache: false,
    url: '/ritirilx/:retriId',
    templateUrl: 'app/ritri/ritirilx.html',
    controller: 'ritirilxCtrl'
  })
    .state('app.ritira', {
    cache: false,
    url: '/ritira',
    templateUrl: 'app/ritri/ritira.html',
    controller: 'mancatiritiriCtrl'
  })
    .state('app.rifiuta', {
    cache: false,
    url: '/rifiuta',
    templateUrl: 'app/ritri/rifiuta.html',
    controller: 'ritirieffappCtrl'
  })
    .state('app.view', {
    cache: false,
    url: '/view/:spedizioniId',
    templateUrl: 'app/spedizioni/view.html',
    controller: 'spedizioniDetailsCtrl'
  })
    .state('app.consegna', {
    cache: true,
    url: '/consegna',
    templateUrl: 'app/spedizioni/consegna.html',
    controller: 'consegnaCtrl'
  })
    .state('app.giacenza', {
    cache: true,
    url: '/giacenza',
    templateUrl: 'app/spedizioni/giacenza.html',
    controller: 'giacenzaCtrl'
  })
  .state('app.addPayment', {
    cache: false,
    url: '/addPayment',
    templateUrl: 'templates/addPayment.html',
    controller: 'userCtrl'
  })
  /*.state('app.listaconseff', {
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
  })*/
  .state('app.profile', {
    cache: false,
    url: '/profile',
    templateUrl: 'app/profile/profile.html',
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
