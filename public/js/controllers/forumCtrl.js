app.controller('forumCtrl', function($scope, $rootScope, $window, $state, $http, $stateParams, authUser){
	
	$rootScope.imgurl = "/uploads/user/"+authUser.getUsername()+".jpg";
	
	$scope.questionCategory = [
		{cat : 'Industry Practices', value : false, key: 'category1'},

		{cat : 'Payment', value : false, key: 'category2'},

		{cat : 'Process', value : false, key: 'category3'},

		{cat : 'Review', value : false, key: 'category4'},

		{cat : 'Legal', value : false, key: 'category5'},

		{cat : 'IPR', value : false, key: 'category6'},

		{cat : 'Copyright', value : false, key: 'category7'},

		{cat : 'Collaboration', value : false, key: 'category8'}
	];

	$scope.allCategory = function(){

		$window.location.reload();
		
	}

	$scope.gotoCategory = function(cat){

		$scope.catName = cat;
		$scope.catCheck = false;

		for(var x=0;x<$scope.questionCategory.length;x++){

			if($scope.questionCategory[x].cat === cat){
				$http.get('/api/forum/listQuestions/category/'+$scope.questionCategory[x].key).success(function(response){
					$scope.categories = response;
					$scope.catCheck = true;

					// console.log($scope.categories.length);
				});
			}
		}

	}
	var count= 0;
	var title = [];
	$scope.c = [];

	$scope.title = function(answers){
		$.ajax({
			url:answers,  
			dataType: 'json',
			async : false,
			success:function(data) {
				// console.log(data.length);
				$scope.c.push(data.length); 
			}
		});
	}


	$http.get('api/listUsers/'+authUser.getUsername()).then(function(response){
		$rootScope.name = response.data.fname;
		$scope.imgurl = "/uploads/user/"+response.data.email+".jpg";
	});

	$http.get('/api/forum/listQuestions').success(function(response){
		$scope.questions = response;
	});

	$scope.addQuery = function(){
		forumData = {
			askedby : $rootScope.name,
			askedbyEmail : authUser.getUsername(),
			title : $scope.questionTitle,
			question : $scope.questionDetail,
			category1: $scope.questionCategory[0].value,
			category2: $scope.questionCategory[1].value,
			category3: $scope.questionCategory[2].value,
			category4: $scope.questionCategory[3].value,
			category5: $scope.questionCategory[4].value,
			category6: $scope.questionCategory[5].value,
			category7: $scope.questionCategory[6].value,
			category8: $scope.questionCategory[7].value,
			answers : '/api/forum/listAnswers/'+$scope.questionTitle,
            date : new Date()
		}
		console.log(forumData);

		$http.post('/api/forum', forumData).success(function(response){
			if(response == "success"){
				$state.go('forum');
			}
		});


		$http.get('api/forum/listQuestions').success(function(response){
			$scope.questions = response;
		});

		$('.add-query-popup').hide();
	}

	$scope.questionSingle = function(id, title){
			$rootScope.id = id;
			$state.go('question', {title:title});

	}

	var count = 0;
	$scope.showForumResult = function(stringLen){
		
		
		if(stringLen.length>1){
			$('.forum-search-result').show();
		}
	
		else
			$('.forum-search-result').hide();
			
	}

	$scope.addQueryPopup = function(){

		if(authUser.isLoggedIn() == false){
			alert("Login to ask question.");
		}
		else
			$(".add-query-popup").toggle();
	}

	$('.limit-error').css({"display":"none", "font-weight":"500"});
	$scope.limitChar = function(text){
		if(text.length > 100){
			$('.limit-error').css("display","block");
		}
		else
			$('.limit-error').css("display","none");
	}

	 $('.contactus-popup').hide();   
    $scope.togglePopupContact = function(){
        $('.contactus-popup').toggle();
        $('.login-curtain').toggle();
    }

});

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(questions){
            if(questions.title.toLowerCase().indexOf(searchString) !== -1){
            result.push(questions);
        }
        });
        return result;
    };
});