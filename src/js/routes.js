'use strict';
app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/users');
  $stateProvider
    .state('users', {
      url:'/users',
      templateUrl:'../src/partials/usersList.html'
    })
    .state('new', {
      url:'/new',
      templateUrl:'partials/newUser.html'
    })
    .state('profile', {
      url:'/:id',
      templateUrl:'partials/userProfile.html'
    })
    .state('edit', {
      url:'/edit/:id',
      templateUrl:'partials/editUser.html'
    });
});
