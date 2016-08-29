app.service('fileUpload', ['$http','$state', function ($http,$state) {
    this.uploadFileToUrl = function(file, username,dest, uploadUrl){
        console.log(dest);
        console.log(username);
        console.log(uploadUrl);
        var fd = new FormData();
        fd.append('name',username);
        fd.append('path',dest)
        fd.append('userPhoto', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            window.location.reload();

            //$state.go('dashboard');
        })
        .error(function(){
        });
    }
}]);
