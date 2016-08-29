app.controller('kcenter', function($scope,$rootScope, $state, $http, authUser){
	
    $rootScope.imgurl = "/uploads/user/"+authUser.getUsername()+".jpg";

	setInterval(function(){
		var cardWidth = $('.kc-card-single').width();
		$('.kc-card-single').css("height", cardWidth);
	}, 100);


    $http.get('api/listUsers/'+authUser.getUsername()).then(function(response){
        $scope.imgurl = "/uploads/user/"+response.data.email+".jpg";
    });

    $scope.kcenter1 = function(){
        if(authUser.isLoggedIn()){
            $state.go('Identify_The_Right_Creative');
        }
        else
            alert("Login to access this.")
    }
    $scope.kcenter2 = function(){
        if(authUser.isLoggedIn()){
            $state.go('Identify_The_Right_Client');
        }
        else
            alert("Login to access this.")
    }
    $scope.kcenter3 = function(){
        if(authUser.isLoggedIn()){
            $state.go('Business_Basics');
        }
        else
            alert("Login to access this.")
    }
    $scope.kcenter5 = function(){
        if(authUser.isLoggedIn()){
            $state.go('Protect_Your_Work');
        }
        else
            alert("Login to access this.");
    }
    $scope.kcenter6 = function(){
        if(authUser.isLoggedIn()){
            $state.go('Conduct_A_Business_Transaction');
        }
        else
            alert("Login to access this.")
    }


  //   for(var i=1;i<7;i++){
  //   	$('.kc-card-single'+i).mouseenter(function(){
		// 	$('.kc-card-single-after'+i).animate({height:'toggle'},50);
		// }).mouseleave(function(){
		// 	$('.kc-card-single-after'+i).animate({height:'toggle'},50);
		// });	
  //   }

    $('.kc-card-single1').mouseenter(function(){
        $('.kc-card-single-after1').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after1').animate({height:'toggle'},50);
    }); 
    $('.kc-card-single2').mouseenter(function(){
        $('.kc-card-single-after2').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after2').animate({height:'toggle'},50);
    }); 
    $('.kc-card-single3').mouseenter(function(){
        $('.kc-card-single-after3').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after3').animate({height:'toggle'},50);
    }); 
    $('.kc-card-single4').mouseenter(function(){
        $('.kc-card-single-after4').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after4').animate({height:'toggle'},50);
    }); 
    $('.kc-card-single5').mouseenter(function(){
        $('.kc-card-single-after5').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after5').animate({height:'toggle'},50);
    }); 
    $('.kc-card-single6').mouseenter(function(){
        $('.kc-card-single-after6').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after6').animate({height:'toggle'},50);
    }); 

	$('.kc-card-single-b-1').mouseenter(function(){
		$('.kc-card-single-after15').fadeIn();
	}).mouseleave(function(){
		$('.kc-card-single-after15').fadeOut();
	});
	$('.kc-card-single-b-2').mouseenter(function(){
		$('.kc-card-single-after16').fadeIn();
	}).mouseleave(function(){
		$('.kc-card-single-after16').fadeOut();
	});

     $('.contactus-popup').hide();   
    $scope.togglePopupContact = function(){
        $('.contactus-popup').toggle();
        $('.login-curtain').toggle();
    }
});