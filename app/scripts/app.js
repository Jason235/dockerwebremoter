'use strict';

window.DockerApp = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'oc.lazyLoad',
    'DockerDirectives',
    'DockerServices'
]);

window.DockerApp.constant('DockerProxyAddress', 'http://192.168.0.105:6543');

window.DockerApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    // global configs go here
  });
}]);

window.DockerApp.config(['$controllerProvider', function($controllerProvider) {
  $controllerProvider.allowGlobals();
}]);

window.DockerApp.factory('settings', ['$rootScope', function($rootScope) {
  var settings = {
    layout: {
      pageSidebarClosed: false,
      pageBodySolid: false,
      PageAutoScrollOnLoad: 1000
    },
    layoutImgPath: '1',
    layoutCssPath: '2'
  };

  $rootScope.settings = settings;

  return settings;

}]);


window.DockerApp.controller('AppController', ['$scope', function($scope) {
  $scope.$on('$viewContentLoaded', function() {
    // TODO:
  });
}]);

window.DockerApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

window.DockerApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

window.DockerApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000);
    });
}]);

/* Setup Layout Part - Footer */
window.DockerApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

window.DockerApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");  
    
    $stateProvider
      // Dashboard
      .state('dashboard', {
        url: '/dashboard.html',
        templateUrl: 'views/dashboard.html',            
        data: {pageTitle: 'Dashboard'}
      })
      // Info
      .state('info', {
          url: "/info.html",
          data: {pageTitle: 'Info'},
          views: {
            'LazyLoadView': {
              templateUrl: 'views/info.html',
              controller: 'InfoController',
            }
          },
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'app',
                insertBefore: '#ng_load_plugins_before',
                files: [
                  'scripts/controllers/InfoController.js'
                ]
              });
            }]
          }
      })
      // Images
      .state('images', {
        url: '/images.html',
        data: {pageTitle: 'Images'},
        views: {
          'LazyLoadView': {
              templateUrl: 'views/images.html',
              controller: 'ImagesController'
          }
        },
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'app',
                insertBefore: '#ng_load_plugins_before',
                files: [
                  'scripts/controllers/ImagesController.js'
                ]
              });
          }]
        }
      })
      // remote image
      .state('remoteimages',{
        url: '/remoteimages.html',
        data: {pageTitle: 'Remote Images'},
        views: {
          'LazyLoadView': {
            templateUrl: 'views/remoteimages.html',
            controller: 'RemoteImagesController'
          }
        },
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'app',
              insertBefore: '#ng_load_plugins_before',
              files: [
                'scripts/controllers/RemoteImagesController.js'
              ]
            });
          }]
        }
      });
}]);

window.DockerApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);

