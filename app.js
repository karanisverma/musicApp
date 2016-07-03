(function() {
    var app = angular.module('music-app', ['ngMaterial', 'ngResource', 'ngRoute']);
    // app.controller(){}
    app.controller('trackController', ['$resource', function($resource) {
        var track = this;
        track.showNewTrack = false;
        track.showEditTrack = false;
        
        this.getResource = function(url) {
            return $resource(url);
        }
        this.showNewTrackForm = function(){
            track.showNewTrack = true;
            console.log('show new track from button clicked');
        }
        this.hideNewTrackForm = function(){
            track.showNewTrack = false;
            console.log('hide new track from button clicked');   
        }
        this.getId = function(genID){
            track.genres = genID;
        }
        this.saveNewTrack = function(){
            track.showNewTrack = false;
            var url = 'http://104.197.128.152:8000/v1/tracks';
            trackFactory = this.getResource(url);
             // <<<<< This is how do you write in track >>>>>
            newsong = new trackFactory();
            newsong.data = JSON.stringify({title : track.trackname, rating : track.rating, genres: [track.genres]});
            console.log(newsong.data);
            // CHECK OUT! : bit of a confusion here regarding using newsong as a factory
            // where as if assigned to normal object trackFactory. save will work perfectly.
            trackFactory.save(newsong.data, function() {
                console.log("you are awesome!");
            });

        }
        this.search = function(){
            var url = 'http://104.197.128.152:8000/v1/tracks';
            trackFactory = this.getResource(url);
            // // <<<<< This is how do you search track given its title name >>>>>
            var entry = trackFactory.get({ title:track.searchKeyword }, function() {
                console.log(entry);
                track.tracks = entry.results;
            }); 

        }
        this.showEditTrackForm = function(title,rating,genres,id){
            track.showEditTrack =true;
            track.trackname = title;
            track.rating = rating;
            track.id = id;
            track.genres = genres;
        }

        this.hideEditTrackForm = function(){
            track.showEditTrack =false;
        }
        this.updateTrack = function(title,rating,genres,id){

            editsong = new trackFactory();
            editsong.data = JSON.stringify({id : id, title : title, rating : rating, genres : [genres]});
            var url = 'http://104.197.128.152:8000/v1/tracks/'+id;
            trackFactory = this.getResource(url);
            console.log("this is what is been sent => "+editsong.data);
            trackFactory.save(editsong.data, function() {
                console.log("you are reallllly awesome!");
            });
        }

        this.loadGenres =  function(){
            console.log("button is clicked!");
            var url = 'http://104.197.128.152:8000/v1/genres';
            trackFactory = this.getResource(url);
            var val = trackFactory.get(function(){
                console.log(val);
                track.allGenres = val.results;
                track.genresNext = val.next;
            });
        }
        this.loadMore = function(old_gen){
            console.log("load more button is clicked!");
            var url = track.genresNext;
            console.log("next genres url => "+track.genresNext);
            trackFactory = this.getResource(url);
            var val = trackFactory.get(function(){
                console.log("load more is successful!");
                track.allGenres = old_gen;
                console.log(typeof(old_gen));
                console.log(old_gen);
                track.allGenres.push.apply(track.allGenres,val.results);
                // track.allGenres = val.results;
//                 var x = ['a', 'b', 'c'];
// var y = ['d', 'e', 'f'];
// x.push.apply(x, y);
                track.genresNext = val.next;
            });            
        }

        this.allsongs = function() {
            var url = 'http://104.197.128.152:8000/v1/tracks/:id';
            trackFactory = this.getResource(url);
            // var val1 = "none";

            // // <<<<< This is how do you get one track from api >>>>>
            // var entry = trackFactory.get({ id: 27 }, function() {
            //     console.log(entry);
            // }); // get() returns a single entry


            // <<<<< This is how do you show all data from track >>>>>

            var val = trackFactory.get(
                function() {
                    console.log("Val value is => ", val.results);
                    response = val;
                    track.tracks = val.results;
                    track.next = val.next;
                    track.prev = val.previous;
                    console.log(val.next);
                });

            // // <<<<< This is how do you write in track >>>>>
            // newsong = new trackFactory();
            // newsong.data = JSON.stringify({title : "the minion song99", rating : 5, genres: [29]});
            // console.log(newsong.data);
            // // CHECK OUT! : bit of a confusion here regarding using newsong as a factory
            // // where as if assigned to normal object trackFactory. save will work perfectly.
            // trackFactory.save(newsong.data, function() {
            //     console.log("you are awesome!");
            // });

            // 
            // // <<<<< This is how do you search track given its title name >>>>>
            // var entry = trackFactory.get({ title:'the minion song99' }, function() {
            //     console.log(entry);
            // }); 


        }

        this.nextTrack = function() {
            var url = track.next;
            trackFactory = this.getResource(url);
            var val = trackFactory.get(
                function() {
                    console.log("Val value is => ", val.results);
                    track.tracks = val.results;
                    track.next = val.next;
                    track.prev = val.previous;
                });
        }
        this.prevTrack = function() {
            var url = track.prev;
            trackFactory = this.getResource(url);
            var val = trackFactory.get(
                function() {
                    console.log("Val value is => ", val.results);
                    track.tracks = val.results;
                    track.next = val.next;
                    track.prev = val.previous;
                });
        }
        this.addNewTrack = function() {
            var url = 'http://104.197.128.152:8000/v1/tracks/:id';
            trackFactory = this.getResource(url);
            newsong = new trackFactory();
            newsong.data = JSON.stringify({ title: "the minion song990", rating: 5, genres: [29] });
            console.log(newsong.data);
            trackFactory.save(newsong.data, function() {
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
