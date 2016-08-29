app.controller('signContractCtrl', function($scope, $state, $http, contractShare, authUser, fileUpload){
    // Header Stuff
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

    $scope.forum = function(){
        $state.go('forum');
    }
    $scope.profileSelf = function(){
        $state.go('profile', {email: authUser.getUsername()});
    }
    $scope.kcenter = function(){
        $state.go('kcenter');
    }
    id = $state.params.contractId;
    $scope.imgUrl = '/uploads/contracts/' + id+".jpg"
    console.log($scope.imgUrl);
    // Header Stuff End

    $http.post('/api/firstView',{'_id':id}).success(function(res){
        console.log("The Acceptor has seen the contract")
    });


    $http.get('/api/listcontracts/id/'+id).success(function(response){
        
        var details = response;
        console.log(details);
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
            html2canvas(document.getElementById('content'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("contract.pdf");
                }
            });
        };
        $scope.sign = function(){
            data = {
                '_id':id,
                'acceptorSignature' : $scope.acceptorSignature
            }
            console.log($scope.acceptorSignature)
            $http.post('/api/sign',data).success(function(res){
                if (res.status=="success") {
                    alert("contract succesfully signed");
                }
            });
        }
    });
});