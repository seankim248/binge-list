var $cardList = document.querySelector('.card-list');

function renderPage1Movies() {
  var xhr = new XMLHttpRequest();
  var page1Url = 'https://api.themoviedb.org/3/movie/popular?api_key=ae82140c9c251d2fcd2c3ce9711b3299&language=en-US&page=1';
  xhr.open('GET', page1Url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var movies = xhr.response.results;
    for (var i = 0; i < movies.length; i++) {
      var movieCard = renderMovieCard(movies[i]);
      $cardList.append(movieCard);
    }
  });
  xhr.send();
}

function renderMovieCard(obj) {
  var outerDiv = document.createElement('div');
  outerDiv.className = 'card-component';

  var middleDiv = document.createElement('div');
  middleDiv.className = 'row';
  outerDiv.appendChild(middleDiv);

  var innerDiv = document.createElement('div');
  innerDiv.className = 'column-full';
  middleDiv.appendChild(innerDiv);

  var poster = document.createElement('img');

  poster.setAttribute('src', 'https://image.tmdb.org/t/p/original' + obj.poster_path);
  innerDiv.appendChild(poster);

  var middleDiv2 = document.createElement('div');
  middleDiv2.className = 'row';
  outerDiv.appendChild(middleDiv2);

  var innerDiv2 = document.createElement('div');
  innerDiv2.className = 'column-three-fourth';
  middleDiv2.appendChild(innerDiv2);

  var title = document.createElement('h2');
  title.textContent = obj.original_title;
  title.className = 'title';
  innerDiv2.appendChild(title);

  var innerDiv3 = document.createElement('div');
  innerDiv3.className = 'column-one-fourth';
  middleDiv2.appendChild(innerDiv3);

  var ratingBlock = document.createElement('div');
  ratingBlock.className = 'rating-block';
  innerDiv3.appendChild(ratingBlock);

  var rating = document.createElement('h2');
  rating.textContent = obj.vote_average;
  if (obj.vote_average < 10) rating.className = 'green';
  if (obj.vote_average < 8.5) rating.className = 'yellow';
  if (obj.vote_average < 5) rating.className = 'red';
  ratingBlock.appendChild(rating);

  var innerDiv4 = document.createElement('p');
  innerDiv4.className = 'movie-info';
  innerDiv4.textContent = 'See Description';
  outerDiv.appendChild(innerDiv4);

  return outerDiv;
}

renderPage1Movies();
