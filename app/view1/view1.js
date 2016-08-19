'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

    $scope.movie = 'Spirited Away';
    $scope.title = "JLW";
    $scope.animated = ["Spirited Away","Tokyo Godfathers","Paprika","Akira", "Fantastic Mr. Fox", "Finding Nemo", "Castle in the Sky", "The Lion King"];
    $scope.mindBending = ["Eternal Sunshine of the Spotless Mind","Clockwork Orange", "Inception", "Fight Club", "Black Swan", "Moon"];
    $scope.comingOfAge = ["Harold and Maude","Mean Girls","American Pie", "Stand By Me", "The Breakfast Club", "Almost Famous", "Frances Ha"];
    $scope.classics = ["Casablanca", "A Farewell To Arms","Do the right thing","The Graduate","Bonnie and Clyde", "Pulp Fiction", "Who\'s Afraid of Virginia Woolf", "The Wizard of Oz", "Annie Hall"];
$scope.randomMovie = function(genre){
    $scope.item = genre[Math.floor(Math.random()*genre.length)];
    $scope.movie = $scope.item;
    $scope.getMovieInfo();
};
    if (window.innerWidth > 800 ) {
        $scope.yt = {
            width: '100%' ,
            height: Math.round((((window.innerWidth)*.66)/16)*9),
            videoid: "RS0KyTZ3Ie4",
        };
    } else {
        $scope.yt = {
            width: '100%',
            height: Math.round(((window.innerWidth) / 16) * 9),
            videoid: "RS0KyTZ3Ie4",
        }
    }

    $scope.getMovieInfo = function() {
        $scope.movieObj = {title: '', actors : '', year : '', genre : '', plot : '', writer: '', director: '', poster: ''};
        var formattedMovie = $scope.movie.replace(/ /g, '+');
        $http({
            method: 'GET',
            url: 'http://www.omdbapi.com/?t=' + formattedMovie + '&y=&plot=full&r=json'
        }).then(function successCallback(response) {
            $scope.title = response.data.Title;
            $scope.movieObj.title = response.data.Title;
            $scope.movieObj.actors = response.data.Actors;
            $scope.movieObj.year = response.data.Year;
            $scope.movieObj.genre = response.data.Genre;
            $scope.movieObj.writer = response.data.Writer;
            $scope.movieObj.director = response.data.Director;
            $scope.movieObj.poster = response.data.Poster;
            $scope.movieObj.plot = response.data.Plot;

        }, function errorCallback(response) {
            console.log("ERROR + " + response)
        });

        $http({
            method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q='+formattedMovie +'official+trailer'+'&key=AIzaSyAkVZUCQphe9UlFeSxMcnPVrcmf6Z691Qk'
        }).then(function successCallback(response) {
            $scope.yt.videoid = response.data.items["0"].id.videoId;
        }, function errorCallback(response) {
            console.log("ERROR + " + response)
        });

    }

}]);