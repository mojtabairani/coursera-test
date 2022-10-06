(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['userInfoDetails','$timeout'];
function InfoController(userInfoDetails,$timeout) {
  var $ctrl = this;    
  if(userInfoDetails != undefined){
	  $ctrl.userInfo = userInfoDetails;	
  }	
}
})();
