var $cardList = document.querySelector('.card-list');

function renderPage1Movies() {
  var xhr = new XMLHttpRequest();
  var page1Url = 'https://api.themoviedb.org/3/movie/popular?api_key=ae82140c9c251d2fcd2c3ce9711b3299&language=en-US&page=1';
  xhr.open('GET', page1Url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var movies = xhr.response.results;
    for (var i = 0; i < movies.length; i++) {
      var poster = document.createElement('img');
      poster.setAttribute('src', 'https://image.tmdb.org/t/p/original' + movies[i].poster_path);
      $cardList.appendChild(poster);
    }
  });

  xhr.send();
}

renderPage1Movies();
