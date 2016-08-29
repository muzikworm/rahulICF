app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('home', {
			url : '/',
			templateUrl : '/templates/home.html',
			controller : 'homeCtrl'
		})
		.state('about', {
			url : '/about',
			templateUrl : '/templates/about.html',
			controller : 'homeCtrl'
		})
        .state('request', {
            url : '/request',
            templateUrl : '/templates/request.html',
            controller : 'homeCtrl'
        })
        .state('privacy', {
            url : '/privacy',
            templateUrl : '/templates/privacy.html',
            controller : 'homeCtrl'
        })
        .state('tnc', {
            url : '/tnc',
            templateUrl : '/templates/tnc.html',
            controller : 'homeCtrl'
        })
		.state('login', {
			url : '/login',
			templateUrl : '/templates/login.html',
			controller : 'loginCtrl'
		})
		.state('signup', {
			url : '/signup',
			templateUrl : '/templates/signup.html',
			controller : 'signupCtrl'
		})
		.state('header', {
			url : '/header',
			templateUrl : '/templates/header.html',
			controller : 'headerCtrl'
		})
        .state('footer', {
            url : '/footer',
            templateUrl : '/templates/footer.html',
        })
        .state('header_sec', {
            url : '/header_sec',
            templateUrl : '/templates/header_sec.html',
        })
		.state('dashboard', {
			url : '/dashboard',
			templateUrl : '/templates/dashboard.html',
			controller : 'dashboardCtrl'
		})
		.state('category', {
			url : '/category/:categoryid',
			templateUrl : '/templates/contracts/category.html',
			controller : 'contractCtrl'
		})
		.state('form', {
			url : '/form',
			templateUrl : '/templates/form.html'
		})
		.state('contract1', {
			url : '/contract/1',
			templateUrl : '/templates/contracts/contract1.html',
			controller : 'contractCtrl'
		})
		.state('contract2', {
			url : '/contract/2',
			templateUrl : '/templates/contracts/contract2.html',
			controller : 'contractCtrl'
		})
		
        .state('profile', {
			url : '/profile/:email',
			templateUrl : '/templates/profile.html',
			controller : 'profileCtrl'
		})
        .state('settings',{
            url : '/settings',
            templateUrl : '/templates/settings.html',
            controller : 'settingsCtrl' 
        })
        
        .state('photoUpload',{
            url : '/photoupload',
            templateUrl : '/templates/photoUpload.html',
            controller : 'uploadCtrl'
        })
        .state('contractDetails',{
            url : '/contractDetails',
            templateUrl : '/templates/contracts/contractDetails.html',
            controller : 'contractDetailsCtrl' 
        })
        .state('contractReview',{
            url : '/contractReview/:contractId',
            templateUrl : '/templates/contracts/contractReview.html',
            controller : 'contractReviewCtrl' 
        })
        .state('invoice',{
            url : '/invoice/:contractId',
            templateUrl : '/templates/invoice.html',
            controller : 'invoiceCtrl' 
        })
        .state('auditTrail',{
            url : '/auditTrail/:contractId',
            templateUrl : '/templates/auditTrail.html',
            controller : 'auditTrailCtrl' 
        })
        .state('signContract',{
            url : '/signContract/:contractId',
            templateUrl : '/templates/contracts/signContract.html',
            controller : 'signContractCtrl' 
        })
        .state('forum',{
            url : '/forum',
            templateUrl : '/templates/forum/forum.html',
            controller : 'forumCtrl' 
        })
        .state('question',{
            url : '/forum/question/:title',
            templateUrl : '/templates/forum/question.html',
            controller : 'QuestionCtrl'
        })
        .state('test',{
            url : '/test',
            templateUrl : '/templates/test.html',
            controller : 'testCtrl'
        })
        .state('test2',{
            url : '/test2',
            templateUrl : '/templates/test2.html'
        })
        .state('kcenter',{
            url : '/knowledgeCenter',
            templateUrl : '/templates/knowledge_center/knowledge_center.html',
            controller : 'kcenter'
        })
        .state('Identify_The_Right_Creative',{
            url : '/knowledgeCenter/Identify_The_Right_Creative',
            templateUrl : '/templates/knowledge_center/Identify_The_Right_Creative.html',
            controller : 'kcenterinfo'
        })
        .state('Industry_Work_Standards',{
            url : '/knowledgeCenter/Industry_Work_Standards',
            templateUrl : '/templates/knowledge_center/Industry_Work_Standards.html',
            controller : 'kcenterinfo'
        })
        .state('Conduct_A_Business_Transaction',{
            url : '/knowledgeCenter/Conduct_A_Business_Transaction',
            templateUrl : '/templates/knowledge_center/Conduct_A_Business_Transaction.html',
            controller : 'kcenterinfo'
        })
        .state('Identify_The_Right_Client',{
            url : '/knowledgeCenter/Identify_The_Right_Client',
            templateUrl : '/templates/knowledge_center/Identify_The_Right_Client.html',
            controller : 'kcenterinfo'
        })
        .state('Protect_Your_Work',{
            url : '/knowledgeCenter/Protect_Your_Work',
            templateUrl : '/templates/knowledge_center/Protect_Your_Work.html',
            controller : 'kcenterinfo'
        })
        .state('Business_Basics',{
            url : '/knowledgeCenter/Business_Basics',
            templateUrl : '/templates/knowledge_center/Business_Basics.html',
            controller : 'kcenterinfo'
        })
        .state('preparing_for_pro_league',{
            url : '/knowledgeCenter/preparing_for_pro_league',
            templateUrl : '/templates/knowledge_center/preparing_for_pro_league.html',
            controller : 'kcenterinfo'
        })
        .state('contract_essentials',{
            url : '/knowledgeCenter/contract_essentials',
            templateUrl : '/templates/knowledge_center/contract_essentials.html',
            controller : 'kcenterinfo'
        })
        .state('work_time',{
            url : '/knowledgeCenter/work_time',
            templateUrl : '/templates/knowledge_center/work_time.html',
            controller : 'kcenterinfo'
        })
        .state('copyright_your_work',{
            url : '/knowledgeCenter/copyright_your_work',
            templateUrl : '/templates/knowledge_center/copyright_your_work.html',
            controller : 'kcenterinfo'
        })
        .state('patent_your_invention',{
            url : '/knowledgeCenter/patent_your_invention',
            templateUrl : '/templates/knowledge_center/patent_your_invention.html',
            controller : 'kcenterinfo'
        })
        .state('trademark_your_brand',{
            url : '/knowledgeCenter/trademark_your_brand',
            templateUrl : '/templates/knowledge_center/trademark_your_brand.html',
            controller : 'kcenterinfo'
        })
        .state('prevention_and_cure',{
            url : '/knowledgeCenter/prevention_and_cure',
            templateUrl : '/templates/knowledge_center/prevention_and_cure.html',
            controller : 'kcenterinfo'
        })
        .state('reset_password',{
            url : '/reset_password/:token',
            templateUrl : '/templates/reset_password.html',
            controller : 'headerCtrl'
        })
        .state('password_reset',{
            url : '/password_reset',
            templateUrl : '/templates/password_reset.html',
            controller : 'headerCtrl'
        })

});