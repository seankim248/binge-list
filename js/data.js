/* exported movies */
var movies = [];

var previousMoviesJSON = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', function (e) {
  var moviesJSON = JSON.stringify(movies);
  localStorage.setItem('javascript-local-storage', moviesJSON);
});

if (previousMoviesJSON !== null) {
  movies = JSON.parse(previousMoviesJSON);
}
