'use strict';

angular.module('app',[]).controller('RemoteImagesController',
	['$scope',
	 'SearchImages',
	 function($scope, SearchImages) {
	 	$scope.OnSearch = function() {
	 		Metronic.blockUI({
		 		target: '#imagesblock',
		 		animate: true
		 	});
		 	SearchImages.query({term: $scope.SearchText}, function(images){
		 		$scope.Images = images;
		 		Metronic.unblockUI('#imagesblock');
		 	}, function() {
		 		alert("Request Images error");
		 		Metronic.unblockUI('#imagesblock');
		 	});
	 	};


	 	/*
	 	$scope.IsAll = false;

	 	$scope.OnChnageAll = function() {
			$scope.IsAll = !$scope.IsAll;
			$scope.LoadData();
	 	};

	 	$scope.OnImageDetail = function(imageid) {
	 		alert(imageid);
	 	};

	 	$scope.LoadData = function() {
		 	Metronic.blockUI({
		 		target: '#imagesblock',
		 		animate: true
		 	});
		 	Images.query({all: $scope.IsAll}, function(images){
		 		$scope.Images = images;
		 		Metronic.unblockUI('#imagesblock');
		 	}, function() {
		 		alert("Request Images error");
		 		Metronic.unblockUI('#imagesblock');
		 	});
		};

		$scope.LoadData();
		*/
	}]);