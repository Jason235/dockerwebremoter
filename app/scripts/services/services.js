'use strict';

/**
连接Docker Prox的 angular service
**/

var DockerServices = angular.module('DockerServices', ['ngResource']);

DockerServices.factory('Version',
	['$resource',
	 'DockerProxyAddress',
	 function ($resource, DockerProxyAddress) {
	 	return $resource(DockerProxyAddress + '/version', {}, {
            get: {method: 'GET'}
        });
	 }]);

DockerServices.factory('Info',
	['$resource',
	 'DockerProxyAddress',
	 function ($resource, DockerProxyAddress) {
	 	return $resource(DockerProxyAddress + '/info', {}, {
            get: {method: 'GET'}
        });
	}]);

DockerServices.factory('Images',
	['$resource',
	 'DockerProxyAddress',
	 function ($resource, DockerProxyAddress) {
	 	return $resource(DockerProxyAddress + '/images/json', {}, {
	 		query: {method: 'GET', isArray: true}
	 	});
	}]);

DockerServices.factory('SearchImages',
	['$resource',
	 'DockerProxyAddress',
	 function ($resource, DockerProxyAddress) {
	 	return $resource(DockerProxyAddress + '/images/search', {}, {
	 		query: {method: 'GET', isArray: true}
	 	});
	}]);