(function() {
    var app = angular.module('music-app', ['ngMaterial', 'ngResource', 'ngRoute']);

    app.controller('musicAppController', ['$resource', function($resource) {
        var musicApp = this;
        musicApp.showNewTrack = false;
        musicApp.showEditTrack = false;
        
        this.getResource = function(url) {
            return $resource(url);
        }
        this.showNewTrackForm = function(){
            musicApp.showNewTrack = true;
            console.log('show new track from button clicked');
        }
        this.hideNewTrackForm = function(){
            musicApp.showNewTrack = false;
            console.log('hide new track from button clicked');   
        }
        this.getId = function(genID){
            musicApp.genres = genID;
        }
        this.saveNewTrack = function(){
            musicApp.showNewTrack = false;
            var url = 'http://104.197.128.152:8000/v1/tracks';
            musicAppFactory = this.getResource(url);
             // <<<<< This is how do you write in track >>>>>
            newsong = new musicAppFactory();
            newsong.data = JSON.stringify({title : musicApp.trackname, rating : musicApp.rating, genres: [musicApp.genres]});
            console.log(newsong.data);
            // CHECK OUT! : bit of a confusion here regarding using newsong as a factory
            // where as if assigned to normal object musicAppFactory. save will work perfectly.
            musicAppFactory.save(newsong.data, function() {
                console.log("you are awesome!");
            });

        }
        this.search = function(){
            var url = 'http://104.197.128.152:8000/v1/tracks';
            musicAppFactory = this.getResource(url);
            // // <<<<< This is how do you search track given its title name >>>>>
            var entry = musicAppFactory.get({ title:musicApp.searchKeyword }, function() {
                console.log(entry);
                musicApp.tracks = entry.results;
            }); 

        }
        this.showEditTrackForm = function(title,rating,genres,id){
            musicApp.showEditTrack =true;
            musicApp.trackname = title;
            musicApp.rating = rating;
            musicApp.id = id;
            musicApp.genres = genres;
        }

        this.hideEditTrackForm = function(){
            musicApp.showEditTrack =false;
        }
        this.updateTrack = function(title,rating,genres,id){

            editsong = new musicAppFactory();
            editsong.data = JSON.stringify({id : id, title : title, rating : rating, genres : [genres]});
            var url = 'http://104.197.128.152:8000/v1/tracks/'+id;
            musicAppFactory = this.getResource(url);
            console.log("this is what is been sent => "+editsong.data);
            musicAppFactory.save(editsong.data, function() {
                console.log("you are reallllly awesome!");
            });
        }

        this.loadGenres =  function(){
            console.log("button is clicked!");
            var url = 'http://104.197.128.152:8000/v1/genres';
            musicAppFactory = this.getResource(url);
            var val = musicAppFactory.get(function(){
                console.log(val);
                musicApp.allGenres = val.results;
                musicApp.genresNext = val.next;
            });
        }
        this.loadMore = function(old_gen){
            console.log("load more button is clicked!");
            var url = musicApp.genresNext;
            console.log("next genres url => "+musicApp.genresNext);
            musicAppFactory = this.getResource(url);
            var val = musicAppFactory.get(function(){
                console.log("load more is successful!");
                musicApp.allGenres = old_gen;
                console.log(typeof(old_gen));
                console.log(old_gen);
                musicApp.allGenres.push.apply(musicApp.allGenres,val.results);
                // musicApp.allGenres = val.results;
//                 var x = ['a', 'b', 'c'];
// var y = ['d', 'e', 'f'];
// x.push.apply(x, y);
                musicApp.genresNext = val.next;
            });            
        }

        this.allsongs = function() {
            var url = 'http://104.197.128.152:8000/v1/tracks/:id';
            musicAppFactory = this.getResource(url);
            // var val1 = "none";

            // // <<<<< This is how do you get one track from api >>>>>
            // var entry = musicAppFactory.get({ id: 27 }, function() {
            //     console.log(entry);
            // }); // get() returns a single entry


            // <<<<< This is how do you show all data from track >>>>>

            var val = musicAppFactory.get(
                function() {
                    console.log("Val value is => ", val.results);
                    response = val;
                    musicApp.tracks = val.results;
                    musicApp.next = val.next;
                    musicApp.prev = val.previous;
                    console.log(val.next);
                });

            // // <<<<< This is how do you write in track >>>>>
            // newsong = new musicAppFactory();
            // newsong.data = JSON.stringify({title : "the minion song99", rating : 5, genres: [29]});
            // console.log(newsong.data);
            // // CHECK OUT! : bit of a confusion here regarding using newsong as a factory
            // // where as if assigned to normal object musicAppFactory. save will work perfectly.
            // musicAppFactory.save(newsong.data, function() {
            //     console.log("you are awesome!");
            // });

            // 
            // // <<<<< This is how do you search track given its title name >>>>>
            // var entry = musicAppFactory.get({ title:'the minion song99' }, function() {
            //     console.log(entry);
            // }); 


        }

        this.nextTrack = function() {
            var url = musicApp.next;
            musicAppFactory = this.getResource(url);
            var val = musicAppFactory.get(
                function() {
                    console.log("Val value is => ", val.results);
                    musicApp.tracks = val.results;
                    musicApp.next = val.next;
                    musicApp.prev = val.previous;
                });
        }
        this.prevTrack = function() {
            var url = musicApp.prev;
            musicAppFactory = this.getResource(url);
            var val = musicAppFactory.get(
                function() {
                    console.log("Val value is => ", val.results);
                    musicApp.tracks = val.results;
                    musicApp.next = val.next;
                    musicApp.prev = val.previous;
                });
        }
        this.addNewTrack = function() {
            var url = 'http://104.197.128.152:8000/v1/tracks/:id';
            musicAppFactory = this.getResource(url);
            newsong = new musicAppFactory();
            newsong.data = JSON.stringify({ title: "the minion song990", rating: 5, genres: [29] });
            console.log(newsong.data);
            musicAppFactory.save(newsong.data, function() {
                console.log("you are awesome!");
            });

        }
        this.dummy = function() {
            console.log("dummy is working");
        }




    }]); //closing controller
    app.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    });
})();

// todoApp.factory('todoFactory', function($resource) {
//   return $resource('/todo/:todoId', 

//     { update: { method: 'PUT' }}
//   );
// });
