var app = angular.module("myApp", ['ngRoute', 'ngSanitize']);
app.config(function ($routeProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'users.html',
            controller: 'usersController'
        })
        .when('/:pagename', {
            templateUrl: 'userdetail.html',
            controller: 'detailController'
        });
});


app.service('UsersService', function ($http) {
    
    // path = 'https://randomuser.me/api/?results=500&nat=us,fr,gb&seed=foobar';
    path = 'http://localhost:3000/results=500&seed=keys';
    // path = 'http://localhost:3000/results=500';

    this.getUsers = function () {
        return $http.get(path)
            .then(function (response) {
                this.users = response.data.results;
                console.log(this.users);
                return this.users
            });
    }
});

app.controller('usersController', function ($scope, UsersService) {
    UsersService.getUsers().then(function (data) {
        for (i = 0; i < data.length; i++) {
            data[i].id = i;
            data[i].fullname = cap(data[i].name.first) + " " + cap(data[i].name.last);
        }
        $scope.users = data;
    });

});
function cap(text) {
    if (text != null)
        text = text.toLowerCase();
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}
app.filter('capitalize', function () {
    return function (text, scope) {
        if (text != null)
            text = text.toLowerCase();
        return text.substring(0, 1).toUpperCase() + text.substring(1);
    }
});

app.filter('gender', function () {
    return function (users, gender) {
        if (!gender) {
            return users;
        }
        var arr = [];
        angular.forEach(users, function (v) {
            if (v.gender === gender) {
                arr.push(v);
            }
        })
        console.log(arr);
        return arr;
    }
});


app.controller('detailController', function ($scope, UsersService) {
    var pathArr = window.location.href.split('/');
    var user_num = pathArr[pathArr.length - 1];
    console.log(user_num);
    $scope.user_num = user_num;
    UsersService.getUsers().then(function (data) {
        for (i = 0; i < data.length; i++) {
            data[i].id = i;
            data[i].fullname = cap(data[i].name.first) + " " + cap(data[i].name.last);
            $scope.users = data;
        }
        console.log(data[user_num]);
        $scope.user_name = data[user_num].fullname;
        $scope.user_age = data[user_num].dob.age;
        $scope.user_address = data[user_num].location.street;
        $scope.user_phone = data[user_num].phone;
        $scope.user_email = data[user_num].email;
        $scope.user_image = data[user_num].picture.large;
    });

});