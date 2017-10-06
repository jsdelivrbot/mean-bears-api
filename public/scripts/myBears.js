var app = angular.module('bearApp',[]);
app.controller('bearTableController', function($scope, $http) {
    $scope.data = [];
    var request = $http.get('api/bears');
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
});
