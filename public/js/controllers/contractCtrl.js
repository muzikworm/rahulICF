app.controller('contractCtrl', function ($scope, $state, $http, $stateParams, authUser, contractShare) {
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

    
    $('.help-icon1').mouseenter(function(){
        $('.help-text1').fadeIn();
    }).mouseleave(function(){
        $('.help-text1').fadeOut();x
    });

    $('.help-icon2').mouseenter(function(){
        $('.help-text2').fadeIn();
    }).mouseleave(function(){
        $('.help-text2').fadeOut();x
    });

    $('.help-icon3').mouseenter(function(){
        $('.help-text3').fadeIn();
    }).mouseleave(function(){
        $('.help-text3').fadeOut();x
    });
    $('.help-icon4').mouseenter(function(){
        $('.help-text4').fadeIn();
    }).mouseleave(function(){
        $('.help-text4').fadeOut();x
    });
    $('.help-icon5').mouseenter(function(){
        $('.help-text5').fadeIn();
    }).mouseleave(function(){
        $('.help-text5').fadeOut();x
    });
    $('.help-icon6').mouseenter(function(){
        $('.help-text6').fadeIn();
    }).mouseleave(function(){
        $('.help-text6').fadeOut();x
    });
    $('.help-icon7').mouseenter(function(){
        $('.help-text7').fadeIn();
    }).mouseleave(function(){
        $('.help-text7').fadeOut();x
    });
    $('.help-icon8').mouseenter(function(){
        $('.help-text8').fadeIn();
    }).mouseleave(function(){
        $('.help-text8').fadeOut();x
    });
    $('.help-icon9').mouseenter(function(){
        $('.help-text9').fadeIn();
    }).mouseleave(function(){
        $('.help-text9').fadeOut();x
    });
    $('.help-icon10').mouseenter(function(){
        $('.help-text10').fadeIn();
    }).mouseleave(function(){
        $('.help-text10').fadeOut();x
    });
    $('.help-icon11').mouseenter(function(){
        $('.help-text11').fadeIn();
    }).mouseleave(function(){
        $('.help-text11').fadeOut();x
    });
    $('.help-icon12').mouseenter(function(){
        $('.help-text12').fadeIn();
    }).mouseleave(function(){
        $('.help-text12').fadeOut();x
    });
    $('.help-icon13').mouseenter(function(){
        $('.help-icon13').fadeIn();
    }).mouseleave(function(){
        $('.help-icon13').fadeOut();x
    });
    $('.help-icon14').mouseenter(function(){
        $('.help-icon14').fadeIn();
    }).mouseleave(function(){
        $('.help-text14').fadeOut();x
    });
    $('.help-icon15').mouseenter(function(){
        $('.help-text15').fadeIn();
    }).mouseleave(function(){
        $('.help-text15').fadeOut();x
    });

    $scope.milestone = { point: [], fee: [] };

        $scope.proratedtype = [
        {'option' : 'Per Hour'},
        {'option' : 'Per Day'},
        {'option' : 'Per Week'},
        {'option' : 'Per Month'}

    ];

    $scope.acceptorType = [
        {'option' : 'an Individual'},
        {'option' : 'a Company'}

    ];
    $scope.offererType = [
        {'option' : 'Independently'},
        {'option' : 'Through a Company'}

    ]

    $scope.feetype =[
        {'option' : 'a Flat Fee'},
        {'option' : 'a Pro-Rated Charge'},
        {'option' : 'in Milestones'}
    ];

    $scope.usertype = [
        {'option' : 'Creative' },
        {'option' : 'Hiring a creative'}
    ]

    $scope.iterationoption = [
        {'option' : 'will be'},
        {'option' : 'will not be'}
    ]
    $scope.taxOption = [
        {'option' : 'includes'},
        {'option' : 'doesn not includes'}
    ]

    $scope.terminationOption = [
        {'option' : 'for the time worked.'},
        {'option' : 'a flat fee.'}
    ]
    
    /*$scope.countrytype = [
        
          { 'option' : "Australia"},
          { 'option' :  "Brazil" }, 
          { 'option' :  "Canada" },
          { 'option' :  "Czech Republic" },
          { 'option' :  "Denmark" },
          { 'option' :  "Hong Kong" },
          { 'option' :  "Hungary" }, 
          { 'option' :  "Israel" },
          { 'option' :  "India" },
          { 'option' :  "Japan" },
          { 'option' :  "Malaysian" },
          { 'option' :  "Mexico" },
          { 'option' :  "Norway" },
          { 'option' :  "New Zealand" },
          { 'option' :  "Philippine" },
          { 'option' :  "Poland" },
          { 'option' :  "Singapore" },
          { 'option' :  "Sweden" },
          { 'option' :  "Switzerland" },
          { 'option' :  "Taiwan" },
          { 'option' :  "Thailand" },
          { 'option' :  "USA" }
    ];*/

    $scope.currtype = [
        
          { 'option' : "AUD"},
          { 'option' :  "BRL" }, 
          { 'option' :  "CAD" },
          { 'option' :  "CZK" },
          { 'option' :  "DKK" },
          { 'option' :  "EUR" },
          { 'option' :  "HKD" },
          { 'option' :  "HUF" }, 
          { 'option' :  "ILS" },
          { 'option' :  "INR" },
          { 'option' :  "JPY" },
          { 'option' :  "MYR" },
          { 'option' :  "MXN" },
          { 'option' :  "NOK" },
          { 'option' :  "NZD" },
          { 'option' :  "PHP" },
          { 'option' :  "PLN" },
          { 'option' :  "GBP" },
          { 'option' :  "SGD" },
          { 'option' :  "SEK" },
          { 'option' :  "CHF" },
          { 'option' :  "TWD" },
          { 'option' :  "THB" },
          { 'option' :  "TRY" },
          { 'option' :  "USD" }
    ];



    $http.get('/api/profile/'+authUser.getUsername()).success(function(response){
        $scope.profileData = response;
    });

    $scope.contractCategories = [
        {
            categoryid : 1,
            categoryName : "category1"
        },
        {
            categoryid : 2,
            categoryName : "category2"
        },
        {
            categoryid : 3,
            categoryName : "category3"
        }
    ];

    $scope.categoryid = parseInt($stateParams.categoryid);
 
    if($scope.categoryid === 1){
        $state.go('contract1');
    }
    else if ($scope.categoryid === 2) {
        $state.go('contract2');
    }
    else if ($scope.categoryid === 3) {
        $state.go('contract3');
    }

    $scope.userChange =function(){
        if ($scope.userType.option == 'Creative') {
            $scope.freelancer = $scope.profileData.fname + ' ' + $scope.profileData.lname;
            $scope.client = undefined;
            $scope.clientCompany = "Null";
            $scope.freelanceCompany = "Null";
            $scope.clientOwnership = $scope.acceptorType[0];
            $scope.freelanceOwnership = $scope.offererType[0];
            $scope.invoiceDays = undefined;
            $scope.clientEmail = 'Null';

        }
        else if($scope.userType.option == 'Hiring a creative'){
            $scope.client = $scope.profileData.fname + ' ' + $scope.profileData.lname;
            $scope.freelancer = undefined;
            $scope.freelanceCompany = "Null";
            $scope.clientOwnership = $scope.offererType[0];
            $scope.freelanceOwnership = $scope.acceptorType[0];
            $scope.clientCompany - "Null";
            $scope.invoiceDays = 0;
            $scope.clientEmail = $scope.profileData.email;
            $scope.freelanceEmail = 'Null';
        }
        
        $scope.workSubject = undefined;
        $scope.description = undefined;
        $scope.fee = undefined;
        $scope.advancePayment = undefined;
        $scope.milestone = { point: [], fee: [] };
        $scope.iterationOption = $scope.iterationoption[0];
        $scope.iterations = undefined;
        $scope.iterationFee = undefined;
        $scope.paymentDays = undefined;
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.place = undefined;

    }

    $scope.freelanceCompanyChange = function () {
        if ($scope.freelanceOwnership.option == 'Independently') {
            $scope.freelanceCompany = "Null";
            $scope.freelanceTitle = "Null";
        } 
        else if ($scope.freelanceOwnership.option == 'Through a Company') {
            $scope.freelanceCompany = $scope.profileData.cname;
        }
        else if ($scope.freelanceOwnership.option == 'an Individual') {
            $scope.freelanceCompany = "Null";
            $scope.freelancer = undefined;
        }
        else{
            $scope.freelanceCompany = undefined;
            $scope.freelancer = "Null"
        }
    };
    
    $scope.clientCompanyChange = function () {
        if ($scope.clientOwnership.option == 'Independently') {
            $scope.clientCompany = "Null";
        } 
        else if ($scope.clientOwnership.option == 'Through a Company') {
            $scope.clientCompany = $scope.profileData.cname;

        }
        else if ($scope.clientOwnership.option == 'an Individual') {
            $scope.client = undefined;
            $scope.clientCompany = "Null"
        }
        else {
            $scope.clientCompany = undefined;
            $scope.client = "Null"
        }
    };

    $scope.iterationsChange = function(){
        if($scope.iterationOption.option == "will not be"){
             $scope.iterationFee = 0;
             $scope.iterations = 0;   
        }
        else{
             $scope.iterationFee = undefined;
             $scope.iterations = undefined;   
        }
    }
    $scope.addMilestone = function(){
    
        $scope.milestone.point.push('');
        $scope.milestone.fee.push('');

    }
    $scope.feeChange = function(){
        if ($scope.feeType.option == "a Flat Fee") {
            $scope.advancePayment = undefined;
            /*$scope.milestone.forEach(function(){
                $scope.milestone.fee = 0;
                $scope.milestone.point = "Null";
            });*/
            $scope.milestone = { point: [], fee: [] };
        }
        else if($scope.feeType.option == 'a Pro-Rated Charge'){
            $scope.advancePayment = 0;
            $scope.milestone = { point: [], fee: [] };
        }  
        else{
            $scope.milestone = { point: [], fee: [] };
            $scope.advancePayment = 0;   
        }
        console.log($scope.milestoneFee,$scope.milestonePoint,$scope.advancePayment);
    }
    $scope.save = function(){
        contract1Data = {
            userType : $scope.userType.option,
            place : $scope.place,
            contractDate : new Date(),
            startDate : $scope.startDate,
            endDate: $scope.endDate,
            client : $scope.client,
            clientCompany : $scope.clientCompany,
            clientOwnership : $scope.clientOwnership.option,
            freelancer : $scope.freelancer,
            freelanceCompany : $scope.freelanceCompany,
            freelanceTitle : $scope.freelanceTitle,
            freelanceOwnership : $scope.freelanceOwnership.option,
            workSubject: $scope.workSubject,
            description : $scope.description,
            iterations : $scope.iterations,
            iterationFee : $scope.iterationFee,
            fee : $scope.fee,
            clientEmail : $scope.clientEmail,
            freelanceEmail : $scope.freelanceEmail,
            //milestoneFee : $scope.milestoneFee,
            //milestonePoint : $scope.milestonePoint,
            milestone : $scope.milestone,
            invoiceDays : $scope.invoiceDays,
            feeType : $scope.feeType.option,
            proratedType : $scope.proratedType.option,
            advancePayment : $scope.advancePayment,
            latePayment : $scope.latePayment,
            paymentDays :$scope.paymentDays,
            currency : $scope.currency.option,
            username : authUser.getUsername(),
            paymentDays : $scope.paymentDays,
            terminationFee : $scope.terminationFee   
        }
        contractShare.setDetails(contract1Data);
        $state.go('contractDetails');
    }
});