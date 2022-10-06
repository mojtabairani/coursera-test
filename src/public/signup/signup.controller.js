(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','$timeout','$state'];
function SignupController(MenuService,$timeout,$state) {
  var $ctrl = this;
  $ctrl.items = null;  
  $ctrl.menuShowFlag = null;  
  $ctrl.menuFullName='';
  
  $ctrl.menuno ='';
  $ctrl.firstName ='';
  $ctrl.lastName ='';
  $ctrl.email ='';
  $ctrl.phone ='';
  $ctrl.completed = false;
  $ctrl.index = '-1';
  
  $ctrl.clearDisplayMsg = function(){
	$ctrl.menuShowFlag = null;
  };
  
  $ctrl.onChangeMenuNo = function(){
	if($ctrl.menuno == ""){
		$ctrl.menuShowFlag = null;					
	}else{	  
		$ctrl.short_name = $ctrl.menuno.replace(/[0-9]/g, '').toUpperCase();
		var filteredItemList = MenuService.getMenuItems($ctrl.short_name);
		filteredItemList.then(function(response){		
			$ctrl.items = response.menu_items;			
			if($ctrl.items.length ==0 ){
				$ctrl.menuShowFlag = 'false';			
			}else{				
				$ctrl.index = -1;				
				for(var i=0 ;i< $ctrl.items.length ; i++ ){						
					if($ctrl.items[i].short_name.toUpperCase() == $ctrl.menuno.toUpperCase() ){
						$ctrl.menuFullName = $ctrl.items[i].name;
						$ctrl.index = i;
					}
				}				
				if($ctrl.index != -1){					
					$ctrl.menuShowFlag = 'true';
				}else{					
					$ctrl.menuShowFlag = 'false';
				}
			}		
		});
	}		
  }
  
  $ctrl.someFunction = function(menuno) {	
	$state.go('public.menuitems',{category: menuno});		
	$timeout(function(){
		var $target = $('#' + $ctrl.menuno.toUpperCase());		
		var scrollPos = $target[0].offsetTop;
		$("body,html").animate({scrollTop: scrollPos}, "slow");		
	},1000);
  };	
	
  $ctrl.submit = function () {	    		
	if(MenuService.getUserInfo() !== undefined && $ctrl.completed){
		alert('User Already SignedUp');
		return false;
	}
	
	$ctrl.completed = true;		
	MenuService.setUserInfo({
		'firstName' : $ctrl.firstName,
		'lastName' : $ctrl.lastName,
		'email' : $ctrl.email,
		'phone' : $ctrl.phone,
		'menuno' : $ctrl.menuno,
		'completed' : $ctrl.completed,
		'menudetails' :$ctrl.items[$ctrl.index]
	});
	
	var registrationMessage = "User is Successfully Registered.";
	registrationMessage = registrationMessage + "\nFirst Name : -" +  $ctrl.firstName;
	registrationMessage = registrationMessage + "\nLast Name : -" +  $ctrl.lastName;
	registrationMessage = registrationMessage + "\nEmail ID : -" +  $ctrl.email;
	registrationMessage = registrationMessage + "\nPhone Number : -" +  $ctrl.phone;
	registrationMessage = registrationMessage + "\nMenu Number : -" +  $ctrl.menuno;
	
	
	$timeout(function(){		
		alert(registrationMessage);
		if($ctrl.menuShowFlag == "true"){
			$ctrl.someFunction($ctrl.menuno.replace(/[0-9]/g, '').toUpperCase());
		}
	},500);
  };
  
}


})();
