app.controller('kcenterinfo', function($scope,$rootScope, $state, $http, authUser){
	
    
    $http.get('api/listUsers/'+authUser.getUsername()).then(function(response){
        $scope.imgurl = "/uploads/user/"+response.data.email+".jpg";
    });

    $rootScope.imgurl = "/uploads/user/"+authUser.getUsername()+".jpg";

    $scope.togglePopup = function(){
    	$('.feedback-popup').toggle();
    	$('.login-curtain').toggle();
    }

    $http.get('/api/listUsers/'+authUser.getUsername()).then(function(response){

    	$scope.email = response.data.email;
    });

	$scope.feedback = function(){
		feedbackData = {
			name : $scope.username,
			email : $scope.email,
			feedback : $scope.feedbackmsg
		};
		$http.post('/api/feedback', feedbackData).success(function(response){
			if(response == "success"){
				$state.reload();
			}
			else {
				alert("Incorrect Username or Password");
			}
		});
	};

	setInterval(function(){
		var cardWidth = $('.kc-card-single').width();
		$('.kc-card-single').css("height", cardWidth);
	}, 100);

	$scope.kcenter1 = function(){
        if(authUser.isLoggedIn()){
            $state.go('preparing_for_pro_league');
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
    $scope.kcenter4 = function(){
        if(authUser.isLoggedIn()){
            $state.go('copyright_your_work');
        }
        else
            alert("Login to access this.")
    }
    $scope.kcenter5 = function(){
        if(authUser.isLoggedIn()){
            $state.go('patent_your_invention');
        }
        else
            alert("Login to access this.")
    }
    $scope.kcenter6 = function(){
        if(authUser.isLoggedIn()){
            $state.go('trademark_your_brand');
        }
        else
            alert("Login to access this.")
    }
    $scope.kcenter7 = function(){
        if(authUser.isLoggedIn()){
            $state.go('prevention_and_cure');
        }
        else
            alert("Login to access this.")
    }


    $('.kc-card-single7').mouseenter(function(){
        $('.kc-card-single-after7').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after7').animate({height:'toggle'},50);
    });
    $('.kc-card-single8').mouseenter(function(){
        $('.kc-card-single-after8').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after8').animate({height:'toggle'},50);
    });
    $('.kc-card-single9').mouseenter(function(){
        $('.kc-card-single-after9').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after9').animate({height:'toggle'},50);
    });
    $('.kc-card-single10').mouseenter(function(){
        $('.kc-card-single-after10').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after10').animate({height:'toggle'},50);
    });
    $('.kc-card-single11').mouseenter(function(){
        $('.kc-card-single-after11').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after11').animate({height:'toggle'},50);
    });
    $('.kc-card-single12').mouseenter(function(){
        $('.kc-card-single-after12').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after12').animate({height:'toggle'},50);
    });
    $('.kc-card-single13').mouseenter(function(){
        $('.kc-card-single-after13').animate({height:'toggle'},50);
    }).mouseleave(function(){
        $('.kc-card-single-after13').animate({height:'toggle'},50);
    });

	$('.keypoint-ex1').hide();
	$('.keypoint-ex2').hide();
	$('.keypoint-ex3').hide();
	$('.keypoint-ex4').hide();
	$('.keypoint-ex5').hide();
	$('.keypoint-ex6').hide();
	$scope.showEx1 = function(){
		$('.keypoint-ex1').slideToggle();
	}
	$scope.showEx2 = function(){
		$('.keypoint-ex2').slideToggle();
	}
	$scope.showEx3 = function(){
		$('.keypoint-ex3').slideToggle();
	}
	$scope.showEx4 = function(){
		$('.keypoint-ex4').slideToggle();
	}
	$scope.showEx5 = function(){
		$('.keypoint-ex5').slideToggle();
	}
	$scope.showEx6 = function(){
		$('.keypoint-ex6').slideToggle();
	}


     $('.contactus-popup').hide();   
    $scope.togglePopupContact = function(){
        $('.contactus-popup').toggle();
        $('.login-curtain').toggle();
    }
});