var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://img.omdbapi.com/?apikey=[3ba74abf]&t=Lego');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(xhr.status);
  // console.log(xhr.response);
});

xhr.send();
