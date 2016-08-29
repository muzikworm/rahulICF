//--------------------Directive----------------------
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

//------------------------Controller--------------------
app.controller('uploadCtrl', function($scope, authUser,fileUpload){   
    $scope.username = authUser.getUsername();
    
    $scope.uploadFile = function(){
        var file = $scope.userPhoto;
        console.log("File is",file);
        var uploadUrl = "/api/photo";
        fileUpload.uploadFileToUrl(file,$scope.username, uploadUrl);
    };
  
});