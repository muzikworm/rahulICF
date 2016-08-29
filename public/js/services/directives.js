app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                //alert("change");
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                
            });
        }
    };
}]);

app.directive('changeFunc', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.changeFunc);
      element.bind('change', onChangeFunc);
    }
  };
});

app.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                // console.log("src",ngSrc);
                $http.get(ngSrc).success(function(res){
                    //alert('image exist');
                }).error(function(){
                    //alert('image not exist');
                    element.attr('src', 'public/img/placeholder.png'); // set default image
                });
            });
        }
    };
});

