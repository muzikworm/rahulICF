app.controller('contractDetailsCtrl', function($scope, $state,contractShare, authUser,$http){
    $scope.loggedOut = false;
    if(authUser.isLoggedIn() == false){
        $scope.loggedOut = true;
    }   
    $scope.dropdownMenu = function(){
        $('.dropdownMenu').fadeToggle();
    }
    $scope.dashboard = function(){
        $state.go('dashboard');
    }
    $scope.logout = function(){
        authUser.logout();
        $state.go('home');
    }
    $scope.profile = function(){
        $state.go('profile');
    }
    $scope.profileSelf = function(){
        $state.go('profile', {email: authUser.getUsername()});
    }
    
    $scope.settings = function(){
        $state.go('settings');
    }

    $scope.forum = function(){
        $state.go('forum');
    }

    $scope.kcenter = function(){
        $state.go('kcenter');
    }
    $scope.request = function(){
        $state.go('request');
    }

    $scope.goHome = function(){
        $state.go('home');
    }
    $scope.goAbout = function(){
        $state.go('about');
    }
    $scope.hidden = false;
    
    $scope.togglePopup = function () {
        $scope.hidden = $scope.hidden ? false : true;
        // $('body').toggleClass('blurred');

        if($scope.hidden2 == true){
            $scope.hidden2 = $scope.hidden2 ? false : true;
        }
    };
    $scope.togglePopup2 = function () {
        $scope.hidden2 = $scope.hidden2 ? false : true;
        // $('body').toggleClass('blurred');

        if($scope.hidden == true){
            $scope.hidden = $scope.hidden ? false : true;
        }
    };

    $scope.login = function(){
        loginData = {
            email : $scope.email,
            password : $scope.password
        };

        $http.post('/api/login', loginData).success(function(response){
            if(response == "success"){
                authUser.setUsername($scope.email);
                $state.go('forum');
            }
            else {
                alert("Incorrect Email or Password");
            }
        });
    };
    $scope.signup = function(){
        signupData = {
            fname : $scope.fname,
            lname : $scope.lname,
            // username : $scope.username,
            email : $scope.email,
            password : $scope.password,
            verifed : false
        }

        $http.post('/api/signup', signupData).success(function(response){
            if(response == "success"){
                $state.go('forum');
            }
        });
    }

    $scope.fbLogin = function(){
        FB.login(function(response){
            if(response.status === 'connected'){
                FB.api(
                    '/me',
                    'GET',
                    {'fields':'id,first_name,last_name,email'},
                    function(response) {
                        // console.log(response);
                        signupData = {
                            fname : response.first_name,
                            lname : response.last_name,
                            // username : response.id,
                            email : response.email,
                            password : response.id,
                            verifed : false
                        };

                        loginData = {
                            email : response.email,
                            password : response.id
                        };
        
                        $http.post('/api/login', loginData).success(function(response){
                            if(response == "success"){
                                authUser.setUsername(loginData.email);
                                $state.go('forum');
                            }
                            else {
                                $http.post('/api/signup', signupData).success(function(response){
                                    if(response == "success"){
                                        $state.go('forum');
                                    }
                                });
                            }
                        });
                    }
                );
                FB.api(
                    '/751246094927006/picture',
                    'GET',
                    {},
                    function(response) {
                        // console.log(response.data.url);
                        $rootScope.imgUrlFb = response.data.url
                    }
                );
            }
            else{
                FB.login();
            }
        });

    }

    $scope.$on('event:google-plus-signin-success', function (event,authResult) {
            var response = authResult.wc;

            signupData = {
                fname : response.Za,
                lname : response.Na,
                // username : response.Ka,
                email : response.hg,
                password : response.Ka,
                verifed : false
            };

            loginData = {
                username : response.hg,
                password : response.Ka
            };

            console.log(signupData);
            console.log(loginData);
            $http.post('/api/login', loginData).success(function(response){
                if(response == "success"){
                    authUser.setUsername(loginData.email);
                    $state.go('forum');
                }
                else {
                    $http.post('/api/signup', signupData).success(function(response){
                        if(response == "success"){
                            $state.go('forum');
                        }
                    });
                }
            });
    });

    $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
        console.log(authResult);
    });
    
    /*$scope.dayDiff = function(firstDate,secondDate){
      var date2 = new Date(secondDate);
      var date1 = new Date(firstDate);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
      $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return($scope.dayDifference);
    }*/
    $http.get('/api/profile/'+authUser.getUsername()).success(function(response){
        
        $scope.profileData = response;
        $scope.offererEmail = $scope.profileData.email;
        
    
    });

  
    details = contractShare.getDetails();
    console.log("DETAILS: ",details);
    $scope.userType = details.userType;
    $scope.place = details.place;
    $scope.contractDate = details.contractDate;
    $scope.endDate = details.endDate;
    $scope.startDate = details.startDate;
    $scope.freelancer = details.freelancer;
    $scope.freelanceOwnership = details.freelanceOwnership;
    $scope.client = details.client;
    $scope.clientOwnership = details.clientOwnership; 
    $scope.fee = details.fee;
    $scope.feeType = details.feeType;   
    $scope.description = details.description;
    $scope.workSubject = details.workSubject;
    $scope.currency = details.currency;
    $scope.duration = details.paymentDays;
    $scope.invoiceDays = details.invoiceDays;
    
    if (details.freelanceCompany == 'Null') {
        $scope.fCompany = '';
    }
    else{
        $scope.fCompany = ', of ' + details.freelanceCompany;
    }
    if (details.freelanceOwnership == 'Independantly') {
        $scope.fOwnership = ', an individual';
    }
    else if (details.freelanceOwnership == 'Through a Company') {
        $scope.fOwnership = ', a company';
    }
    if (details.clientCompany == 'Null') {
        $scope.cCompany = '';
        }
        else{
            $scope.cCompany = ', of ' + details.clientCompany;
        }
    if (details.clientOwnership == 'Independantly') {
        $scope.cOwnership = ', an individual';
    }
     else if (details.clientOwnership == 'Through a Company') {
        $scope.cOwnership = ', a company';
    }

    if (details.client == 'Null') {
        $scope.client = '';
        $scope.clientLocal = details.clientCompany;
    }
    else
        $scope.clientLocal = details.client;
    if (details.freelancer == 'Null') {
        $scope.freelancer = '';
    }
    console.log("companies: ",details.clientCompany,details.freelanceCompany)



    //------------ setting offerer and acceptor-----------


    if ($scope.userType == 'Creative') {
        $scope.offererCompany = details.freelanceCompany;
        $scope.acceptorCompany =  details.clientCompany;
 
        if (details.freelanceCompany == 'Null') 
            $scope.offerer = details.freelancer;
        else
            $scope.offerer = details.freelanceCompany;

        if (details.clientCompany == 'Null') 
            $scope.acceptor = details.client;
        else
            $scope.acceptor = details.clientCompany;
    }
    else{
        $scope.offererCompany = details.clientCompany;
        $scope.acceptorCompany =  details.freelanceCompany;

        if (details.freelanceCompany == 'Null') 
            $scope.acceptor = details.freelancer;
        else
            $scope.acceptor = details.freelanceCompany;

        if (details.clientCompany == 'Null') 
            $scope.offerer = details.client;
        else
            $scope.offerer = details.clientCompany;
    }
    //------------------------------------------------------
    console.log("companies: ",$scope.offererCompany,$scope.acceptorCompany)
    $scope.owner = [
        { 'option' : "owned by the Client" },
        { 'option' : "owned by the Freelancer"}
    ];
    $scope.terminator = [
        { 'option' : "Either party" },
        { 'option' : "Only the client"},
        { 'option' : "Only the freelancer"}
    ];
    $scope.choice = [
        { 'option' : "agrees to indemnify" },
        { 'option' : "will not indemnify"}
    ]; 
    $scope.expenses =   [
        {'option' : 'The Client will not reimburse any personal/ travel costs incurred by the Designer.'},
        {'option' : 'The Client will reimburse any personal/ travel costs incurred by the Designer.'},
        {'option' : 'The Client will reimburse only predecided personal/ travel costs incurred by the Designer.'}
    ];  

    //console.log("Position",$scope.position);

    $scope.redirect = function(){
        $state.go('contract1');
    }    
    $scope.save = function(){
        
        if ($scope.offererSignature != undefined || $scope.offererSignature != 'Null'){ 
            $scope.signDate = new Date();
            $http.get('/api/getip').success(function(res){
                $scope.offererIp = res.ip;
            })
        }
               
        contract1Data = {
            place : $scope.place,
            contractDate : new Date(),
            startDate : $scope.startDate,
            endDate: $scope.endDate,
            client : $scope.clientLocal,
            clientCompany : details.clientCompany,
            clientOwnership : details.clientOwnership,
            offererSignature : $scope.offererSignature,
            offererSignatureDate : $scope.signDate,
            offererIp : $scope.offererIp,
            offererEmail : $scope.offererEmail,
            freelancer : $scope.freelancer,
            freelanceCompany : details.freelanceCompany,
            freelanceOwnership : details.freelanceOwnership,
            workSubject: $scope.workSubject,
            description : $scope.description,
            iterations : details.iterations,
            iterationFee : details.iterationFee,
            fee : details.fee,
            feeType : details.feeType,
            proratedType : details.proratedType,
            advancePayment : details.advancePayment,
            milestone : details.milestone,
            latePayment : details.latePayment,
            expenses : $scope.expense.option,
            currency : $scope.currency,
            username : authUser.getUsername(),    
            owernship : $scope.ownership.option,
            termination : $scope.termination.option,
            agreement : $scope.agreement.option,
            agreement2 : $scope.agreement2.option,
            expenses : $scope.expense.option,
            terminationDays : $scope.terminationDays,
            paymentDays : $scope.duration,
            invoiceDays : $scope.invoiceDays,
            acceptorEmail :$scope.acceptorEmail,
            isSigned : true,
            offererCompany : $scope.offererCompany,
            acceptorCompany : $scope.acceptorCompany,
            offerer : $scope.offerer,
            acceptor : $scope.acceptor,
            addendum : $scope.addendum
        }
        // console.log("Contract DATA", contract1Data)
        
        $http.post('/api/contract', contract1Data).success(function(response){
            if(response.status == "success"){
                alert(response.status);
                $scope.id = response.id
                $state.go('contractReview',{contractId : $scope.id});
            }
        }) 
        .error(function(err){
            console.log("There is an error",err);
        });

    }
    
});