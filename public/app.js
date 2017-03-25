angular.module("sentimently", [
  "sentimently.home",
  'sentimently.tone',
  'sentimently.render',
  "ui.router"
])
.run([
  "$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }
])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: './templates/home.html',
        controller: 'HomeController'
      })
      .state('tweet', {
        url: '/tweet',
        templateUrl: './templates/tweet.html',
        controller: 'HomeController'
      })
      .state('user', {
        url: '/user',
        templateUrl: './templates/user.html',
        controller: 'HomeController'
      })
      .state('archive', {
        url: '/archive',
        templateUrl: './templates/archive.html',
        controller: 'HomeController'
      })
  })
