'use strict';

window.DockerApp.filter('idstringbreak', function(){
	return function(inputstring) {
		if (angular.isUndefined(inputstring)) {
			return inputstring;
		} else {
			if(inputstring.length > 28){
				var temp = "";
				while(inputstring.length > 28){
					temp += inputstring.substr(0, 28) + '\n';
					inputstring = inputstring.substr(28, inputstring.length - 28);
				}
				temp += inputstring;
				return temp;
			}
		}
	};
});

window.DockerApp.filter('stringommitted', function(){
	return function(inputstring, showlength) {
		if (angular.isUndefined(inputstring)) {
			return inputstring;
		}
		if(angular.isNumber(showlength)) {
			if(inputstring.length > showlength) {
				return inputstring.substr(0, showlength) + '...';
			} else {
				return inputstring;
			}
		}
		else if(angular.isUndefined(showlength)) {
			return inputstring;
		} else {
			return inputstring;
		}
	};
});

window.DockerApp.filter('createdate', function(){
	return function(inputdate) {
		return inputdate * 1000;
	};
});

window.DockerApp.filter('filterstoresize', function(){
	return function(inputdata) {
		return (inputdata / 1024 / 1024).toFixed(2) + " M";
	};
});