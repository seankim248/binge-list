/* global movies */

var $cardList = document.querySelector('.card-list');
var $genres = document.querySelector('.genres');
var $input = document.querySelector('input[type="search"]');

renderPopularMovies();

$input.addEventListener('search', function () {
  var highlightBtn = document.querySelector('.highlight');
  if (highlightBtn) highlightBtn.className = '';
  removeAllChildren($cardList);
  searchMovie($input.value);
});

$genres.addEventListener('click', function (e) {
  var highlightBtn = document.querySelector('.highlight');
  if (highlightBtn) highlightBtn.className = '';
  e.target.className = 'highlight';
  removeAllChildren($cardList);
  if (e.target.outerText === 'Popular') {
    return renderPopularMovies();
  }
  renderMovieList(generateUrl(e.target.getAttribute('data-genre-id')));
});

$cardList.addEventListener('click', function (e) {
  if (e.target.nodeName === 'P') {
    var overlayElement = e.target.closest('.card-component').querySelector('.overlay');
    if (e.target.textContent === 'See Description') {
      e.target.textContent = 'Close Description';
      e.target.closest('.card-container').className = 'card-container column-two-fifth';
      overlayElement.className = 'overlay active transition-delay';
    } else if (e.target.textContent === 'Close Description') {
      e.target.textContent = 'See Description';
      e.target.closest('.card-container').className = 'card-container column-fifth';
      overlayElement.className = 'overlay hidden';
    }
  }
  if (e.target.nodeName === 'I') {
    if (e.target.className === 'fas fa-plus') {
      e.target.className = 'fas fa-check';
      var posterData = e.target.closest('.card-component').querySelector('img').getAttribute('src');
      var overviewData = e.target.closest('.card-component').querySelector('h5').textContent;
      var titleData = e.target.closest('.row').querySelector('h2').textContent;
      var ratingData = e.target.previousSibling.querySelector('h2').textContent;
      var movieId = e.target.closest('.card-component').getAttribute('data-id');
      var movieObj = {
        id: movieId,
        poster_path: posterData,
        overview: overviewData,
        original_title: titleData,
        vote_average: ratingData
      };
      movies.push(movieObj);
    } else {
      e.target.className = 'fas fa-plus';
    }
  }
});

function searchMovie(title) {
  renderMovieList('https://api.themoviedb.org/3/search/movie?api_key=ae82140c9c251d2fcd2c3ce9711b3299&language=en-US&query=' + title + '&page=1&include_adult=false');
}

function generateUrl(id) {
  return 'https://api.themoviedb.org/3/discover/movie?api_key=ae82140c9c251d2fcd2c3ce9711b3299&with_genres=' + id;
}

function renderPopularMovies() {
  renderMovieList('https://api.themoviedb.org/3/movie/popular?api_key=ae82140c9c251d2fcd2c3ce9711b3299&language=en-US&page=1');
}

function renderMovieList(url) {
  var xhr = new XMLHttpRequest();
  var page1Url = url;
  xhr.open('GET', page1Url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var movieList = xhr.response.results;
    for (var i = 0; i < movieList.length; i++) {
      var movieCard = renderMovieCard(movieList[i]);
      $cardList.append(movieCard);
    }
  });
  xhr.send();
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

function checkMovieAdded(obj) {
  for (var i = 0; i < movies.length; i++) {
    if (parseInt(movies[i].id) === obj.id) {
      return true;
    }
  }
  return false;
}

function renderMovieCard(obj) {
  var cardContainer = document.createElement('div');
  cardContainer.className = 'card-container column-fifth';

  var outerDiv = document.createElement('div');
  outerDiv.className = 'card-component';
  outerDiv.setAttribute('data-id', obj.id);
  cardContainer.appendChild(outerDiv);

  var middleDiv = document.createElement('div');
  middleDiv.className = 'row';
  outerDiv.appendChild(middleDiv);

  var innerDiv = document.createElement('div');
  innerDiv.className = 'column-full relative';
  middleDiv.appendChild(innerDiv);

  var poster = document.createElement('img');
  poster.className = 'poster-data';
  if (!obj.poster_path) {
    poster.setAttribute('src', '../images/dark-placeholder.png');
  } else {
    poster.setAttribute('src', 'https://image.tmdb.org/t/p/original' + obj.poster_path);
  }
  innerDiv.appendChild(poster);

  var overlay = document.createElement('div');
  overlay.className = 'overlay hidden';
  innerDiv.appendChild(overlay);

  var overview = document.createElement('h5');
  overview.textContent = obj.overview;
  overview.className = 'overview';
  overlay.appendChild(overview);

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
  innerDiv3.className = 'column-one-fourth display-flex';
  middleDiv2.appendChild(innerDiv3);

  var ratingBlock = document.createElement('div');
  ratingBlock.className = 'rating-block';
  innerDiv3.appendChild(ratingBlock);

  if (checkMovieAdded(obj)) {
    var checkIcon = document.createElement('i');
    checkIcon.className = 'fas fa-check';
    innerDiv3.appendChild(checkIcon);
  } else {
    var addIcon = document.createElement('i');
    addIcon.className = 'fas fa-plus';
    innerDiv3.appendChild(addIcon);
  }

  var rating = document.createElement('h2');
  rating.textContent = obj.vote_average;
  if (obj.vote_average < 10) rating.className = 'green';
  if (obj.vote_average < 8.5) rating.className = 'yellow';
  if (obj.vote_average < 5) rating.className = 'red';
  rating.classList.add('rating-data');
  ratingBlock.appendChild(rating);

  var innerDiv4 = document.createElement('p');
  innerDiv4.className = 'movie-description';
  innerDiv4.textContent = 'See Description';
  outerDiv.appendChild(innerDiv4);

  return cardContainer;
}
