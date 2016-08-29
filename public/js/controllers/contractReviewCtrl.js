app.controller('contractReviewCtrl', function($scope, $state, $http, contractShare, authUser, fileUpload){
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
    
    $scope.settings = function(){
        $state.go('settings');
    }
    $scope.profileSelf = function(){
        $state.go('profile', {email: authUser.getUsername()});
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

    //------------------------ Branding upload ctrl-------------------   
    id = $state.params.contractId;
    $scope.brandingToggle = false;
    if (id) {
        $scope.imgUrl = "/uploads/contracts/" + id + ".jpg";
        $scope.brandingToggle = true;
        // console.log($scope.imgUrl);
    }

    $scope.uploadFile = function(){
            var file = $scope.userPhoto;
            console.log("File is",file);
            var uploadUrl = "/api/photo";
            fileUpload.uploadFileToUrl(file,id,'./public/uploads/contracts/',uploadUrl);
    };

//--------------- End of branding upload control----------------------------


    $http.get('/api/listcontracts/id/'+id).success(function(response){
        
        var details = response;
        // console.log(details);
        $scope.termination = details.termination;
        $scope.ownership = details.ownership;
        $scope.agreement = details.agreement;
        $scope.agreement2 = details.agreement2;
        $scope.terminationDays = details.terminationDays;
        $scope.place = details.place;
        $scope.contractDate = details.contractDate;
        $scope.endDate = details.endDate;
        $scope.startDate = details.startDate;
        $scope.freelancer = details.freelancer;
        $scope.freelanceCompany = details.freelanceCompany;
        $scope.freelanceTitle = details.freelanceTitle;
        $scope.freelanceOwnership = details.freelanceOwnership;
        $scope.client = details.client;
        $scope.clientCompany = details.clientCompany;
        $scope.clientOwnership = details.clientOwnership; 
        $scope.country = details.country;
        $scope.description = details.description;
        $scope.workSubject = details.workSubject;
        $scope.fee = parseInt(details.fee);
        $scope.advancePayment = parseInt(details.advancePayment);
        $scope.latePayment = details.latePayment;
        $scope.expenses = details.expenses;
        $scope.currency = details.currency;
        $scope.duration = details.paymentDays;
        $scope.acceptor = details.acceptor;
        $scope.acceptorEmail = details.acceptorEmail;
        $scope.acceptorSignature = details.acceptorSignature;
        $scope.acceptorSignatureDate = details.acceptorSignatureDate;
        $scope.offerer = details.offerer;
        $scope.offererEmail = details.offererEmail;
        $scope.offererSignature = details.offererSignature;
        $scope.offererSignatureDate = details.offererSignatureDate;
        $scope.addendum = details.addendum;

        
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
            console.log($scope.fOwnership);
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
        }
        if (details.freelancer == 'Null') {
            $scope.freelancer = '';
        }

        if (details.client == 'Null') {
            $scope.client = '';
        }
        if (details.freelancer == 'Null') {
            $scope.freelancer = '';
        }

        if ($scope.offererEmail == 'Null') {
            $scope.offererEmail = undefined;
        }
         if ($scope.acceptorEmail == 'Null') {
            $scope.acceptorEmail = undefined;
        }
            $scope.offererCompany = details.offererCompany;
            $scope.acceptorCompany =  details.acceptorCompany;

        $scope.savePdf = function(){
                html2canvas(document.getElementById('pdf'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("contract_"+$scope.offerer+"_"+$scope.acceptor+".pdf");
                }
            });
        }

        $scope.invoice = function(){
            $state.go('invoice',{contractId : id});
        }

        $scope.mail = function(){
            console.log("In mail");
            mailData = {
                '_id': id, 
                'contract' : $scope.contract,
                'sender'   : $scope.offerer,
                'destId'   : $scope.acceptorEmail
            }
            $http.post('/api/invitation', mailData).success(function(response){
                
            });

        }
    });
});