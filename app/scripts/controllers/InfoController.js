'use strict';

angular.module('app',[]).controller('InfoController',
	['$scope',
	 'Version',
	 'Info',
	 function($scope, Version, Info) {
	 	Metronic.blockUI({
	 		target: '#versionblock',
	 		animate: true
	 	});

		Version.get({}, function(version){
	 		$scope.Version = version;
	 		Metronic.unblockUI('#versionblock');
	 	}, function() {
	 		alert("Request version error");
	 		Metronic.unblockUI('#versionblock');
	 	});

	 	Metronic.blockUI({
	 		target: '#infoblock',
	 		animate: true
	 	});

		Info.get({}, function(info){
			$scope.Info = info;
			Metronic.unblockUI('#infoblock');
		}, function(){
			alert("Request Info error");
			Metronic.unblockUI('#infoblock');
		});

	 }]);
