app.controller('QuestionCtrl', function($scope, $rootScope, $state, $http, $stateParams, authUser){
    
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


	$http.get('/api/forum/listQuestions/'+$stateParams.title).success(function(response){
		$scope.questionData = response;

        $rootScope.askedby = $scope.questionData.askedby;
        // $scope.questions = [];
		// $scope.questions.push($scope.questionData);

        $rootScope.askedbyImg = 'uploads/user/'+$rootScope.askedby+".jpg";

	});
	   
   $scope.questionSingle = function(id, title){
        $rootScope.id = id;
        $state.go('question', {title:title});

    }
    
    // setInterval(function(){ alert("Hello"); }, 3000);

    $http.get('/api/forum/listQuestions').success(function(response){
        $scope.questions = response;
        var flagU = true;
        var flagD = true;
        var flagU2 = false;
        var flagD2 = false;
        $scope.vote = function(id, vote){

            if (authUser.isLoggedIn() == false) {
                alert("Login to vote!")
            }

            else{
                for(var i=0;i<$scope.questions.length;i++){

                if($scope.questions[i]._id===id){
                    var upvotes= [];
                    upvotes = $scope.questions[i].upvotedBy;

                    var downvotes= [];
                    downvotes = $scope.questions[i].downvotedBy;

                    // console.log(upvotes);
                    // console.log(downvotes.length);

                    if(vote === "upvote"){

                        $('.btn-vote-up').css({"background":"#14646d", "color":"#fff"});

                        setInterval(function(){
                            $('.btn-vote-up').css({"background":"#fff", "color":"#14646d"});
                        }, 1000);

                        for(var x=0;x<=upvotes.length;x++){
                            if(upvotes[x]===$scope.username){
                                // console.log(upvotes[x]);
                                // console.log("Already Upvoted");

                                voteData ={
                                    _id : $scope.questions[i]._id,
                                    byUser:$scope.username
                                }

                                $http.post('/api/forum/downvotes2', voteData).success(function(response){
                                    
                                });
                                $http.get('/api/forum/listQuestions/'+$stateParams.title).success(function(response){
                                    $scope.questionData = response;
                                });
                                break;
                            }
                            else{
                                // console.log("Upvoted");
                                voteData = {
                                    _id : $scope.questions[i]._id,
                                    byUser: $scope.username
                                }

                                $http.post('/api/forum/upvotes', voteData).success(function(response){
                                    
                                });
                                // console.log(flagU);
                                
                                if(flagD){
                                    voteData = {
                                        _id : $scope.questions[i]._id,
                                        byUser: $scope.username
                                    }

                                    $http.post('/api/forum/downvotes2', voteData).success(function(response){
                                    
                                    });
                                }

                                $http.get('/api/forum/listQuestions/'+$stateParams.title).success(function(response){
                                    $scope.questionData = response;
                                    console.log($scope.questionData);
                                });
                                break;
                            }
                        }

                        
                    }

                    else{
                        $('.btn-vote-down').css({"background":"#14646d", "color":"#fff"});

                        setInterval(function(){
                            $('.btn-vote-down').css({"background":"#fff", "color":"#14646d"});
                        }, 1000);

                        for(var y=0;y<=downvotes.length;y++){
                            if(downvotes[y]===$scope.username){
                                // console.log("Already Downvoted");

                                voteData ={
                                    _id : $scope.questions[i]._id,
                                    byUser:$scope.username
                                }

                                $http.post('/api/forum/upvotes2', voteData).success(function(response){
                                    
                                });
                                $http.get('/api/forum/listQuestions/'+$stateParams.title).success(function(response){
                                    $scope.questionData = response;
                                    console.log($scope.questionData);
                                });
                                break;
                            }
                            else
                                // console.log("Downvoted");

                                voteData = {
                                    _id : $scope.questions[i]._id,
                                    byUser: $scope.username
                                }
                                $http.post('/api/forum/downvotes', voteData).success(function(response){
                                    
                                });
                                // console.log(flagD);
                                if(flagU){
                                    voteData = {
                                        _id : $scope.questions[i]._id,
                                        byUser: $scope.username
                                    }

                                    $http.post('/api/forum/upvotes2', voteData).success(function(response){
                                    
                                    });
                                }
                                

                                $http.get('/api/forum/listQuestions/'+$stateParams.title).success(function(response){
                                    $scope.questionData = response;
                                    console.log($scope.questionData);
                                });
                                break;

                        }
                    }

                }
            }
            }

        };

    });
    $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
        $scope.answers = response.data;
            $scope.voteAns = function(id, vote){
            if (authUser.isLoggedIn() == false) {
                alert("Login to vote!")
            }
            else{
                var canvote = true;
            }

            if(vote === "upvote"){
                var canupvote = true;
            }
            else{
                var candownvote = true;
            }

            var flag = true;
            if(canvote && canupvote){
               
                for(var i=0;i<$scope.answers.length;i++){
                    if($scope.answers[i]._id === id){
                        upvotedBy = $scope.answers[i].upvotedBy;
                        for(var j=0;j<upvotedBy.length;j++){
                            if(upvotedBy[j] === authUser.getUsername()){
                                console.log(upvotedBy);
                                downvotedBy = $scope.answers[i].downvotedBy;
                                console.log(downvotedBy);
                                for(var k=0;k<downvotedBy.length;k++){
                                    if(downvotedBy[k] === authUser.getUsername()){
                                        downvoteData = {
                                            _id : $scope.answers[i]._id,
                                            downvotedBy : authUser.getUsername()
                                        }
                                        $http.post('/api/forum/ansdownvotes2', downvoteData).then(function(response){

                                        });
                                        $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
                                            $scope.answers = response.data;
                                            console.log($scope.answers);
                                        });
                                    }
                                }
                                flag = false;
                                break;
                            }
                        }
                        if(flag){

                            upvoteData = {
                                _id : $scope.answers[i]._id,
                                upvotedBy : authUser.getUsername()
                            }
                            $http.post('/api/forum/ansupvotes', upvoteData).then(function(response){

                            });
                            $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
                                $scope.answers = response.data;
                            });
                        }
                        break;              
                    }
                }
            }

            else if(canvote && candownvote){
                for(var i=0;i<$scope.answers.length;i++){
                    if($scope.answers[i]._id === id){
                        downvotedBy = $scope.answers[i].downvotedBy;
                        for(var j=0;j<downvotedBy.length;j++){
                            if(downvotedBy[j] === authUser.getUsername()){
                                upvotedBy = $scope.answers[i].downvotedBy;
                                for(var k=0;k<downvotedBy.length;k++){
                                    if(upvotedBy[k] === authUser.getUsername()){
                                        upvoteData = {
                                            _id : $scope.answers[i]._id,
                                            upvotedBy : authUser.getUsername()
                                        }
                                        $http.post('/api/forum/ansupvotes2', upvoteData).then(function(response){

                                        });
                                        $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
                                            $scope.answers = response.data;
                                        });
                                    }
                                }
                                flag = false;
                                break;
                            }
                        }
                        if(flag){
                            downvoteData = {
                                _id : $scope.answers[i]._id,
                                downvotedBy : authUser.getUsername()
                            }
                            $http.post('/api/forum/ansdownvotes', downvoteData).then(function(response){

                            });
                            $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
                                $scope.answers = response.data;
                            });
                        }
                        break;              
                    }
                }

            }

        }
        
    }); 
    
	$scope.writeAnswer = function(id){

        if (authUser.isLoggedIn() == false) {
            alert("Login to vote!")
        }
        else{
            $http.get('api/listUsers/'+authUser.getUsername()).then(function(response){
                $scope.name = response.data.fname;
                
                answerData = {
                    title : $stateParams.title,
                    answer: $scope.answerField,
                    answerBy: $scope.name,
                    answerByEmail : authUser.getUsername(),
                    date : new Date()
                }

                console.log(answerData);            
                $http.post('/api/forum/postAnswer', answerData).success(function(response){
                });

                $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
                    $scope.answers = response.data;
                });
            }); 
        }
    }
    $scope.deleteAnswer = function(id){
        
        $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
            $scope.answers = response.data;
            for(var i =0;i<$scope.answers.length;i++){
                if($scope.answers[i].answerByEmail === authUser.getUsername()){
                    $scope.cannotdelete = true;
                    $http.get('/api/delete/answer/'+id).then(function(response){
                    });
                }
                else{
                    $scope.cannotdelete = false;
                    break;
                }
            }
            $http.get('/api/forum/listAnswers/'+$stateParams.title).then(function(response){
                $scope.answers = response.data;
            }); 
        }); 
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
            $(  '.limit-error').css("display","block");
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