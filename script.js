// const url = 'https://api.adviceslip.com/advice';

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         let adviceElement = document.createElement('p');
//         adviceElement.innerHTML = `Conseil du jour : ${data.slip.advice}`;
//         document.body.appendChild(adviceElement);
//     });

let button = document.getElementById('button');
let image = document.getElementById('image');
let filmId = document.getElementById('filmid');
let filmTitle = document.getElementById('title');
let moodObject = {
  "happy": [80, 99, 18, 36, 10770, 53, 10752, 37],
  "sad": [28, 80, 99, 10751, 14, 36, 27, 10402, 9648, 10770, 53, 10752, 37],
  "goofy": [28, 80, 99, 18, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37],
  "in-love": [28, 80, 99, 18, 10751, 36, 27, 9648, 10770, 53, 10752, 37],
  "nerdy": [16, 35, 18, 10751, 27, 10402, 10749, 10770, 10752, 37],
  "angry": [16, 14, 36, 27, 10402, 9648, 10749, 878, 10770],
  "surpise-me": [10770]
}


const changeFilm = async () => {
  //let randomNumber = Math.ceil(Math.random() * 1000) + 1;
  //let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  //let mod = window.location.search.replace("?", "");
  //console.log(mod);

  let id_film = await getRandomFilm();
  let requestString = `https://api.themoviedb.org/3/movie/${id_film}?language=en-US`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhZTE2YjkwZWMxYzk0ZDYwZWY4YTE1M2NiODY2MyIsIm5iZiI6MTcyMTA1MTk4OS4yMTkyMzYsInN1YiI6IjY2OTUyYTVmZTkyYWI0ZDMyMGJhY2FkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nZFMjmWuNpcTBkHSgnKCrePtpiRctjIFaUQ5nIR9XY'
    }
  };

  let data = await fetch(requestString, options);

  let response = await data.json();
  console.log(response);

  image.src = `https://image.tmdb.org/t/p/w500/${response.poster_path}`;
  filmId.textContent = `#${response.id}`;
  filmTitle.textContent = response.title;
}

const FilmDataListByMood = async (pagenbr) => {
  //let randomNumber = Math.ceil(Math.random() * 1000) + 1;
  //let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  let mood = window.location.search.replace("?", "");
  console.log(mood);
  let with_genres = ''
  let without_genres = ''
  /* tabe_genres = [28,16,35,10751,14]
  with_genres = `&with_genres=${tabe_genres.join("%2C")}` */
  let requestString = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=200&watch_region=FR&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy';
  console.log(mood in moodObject);
  if (mood in moodObject) {
    tabe_genres = moodObject[mood]
    //with_genres = `&with_genres=${tabe_genres.join("%2C")}`
    without_genres = `&without_genres=${tabe_genres.join("%2C")}`
    requestString = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pagenbr}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=200&watch_region=FR&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy${with_genres}${without_genres}`;
  }
  //without_genres = `&without_genres=${tabe_genres.join("%2C")}`

  //let requestString = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pagenbr}&sort_by=popularity.desc${with_genres}${without_genres}`;
  console.log(requestString);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhZTE2YjkwZWMxYzk0ZDYwZWY4YTE1M2NiODY2MyIsIm5iZiI6MTcyMTA1MTk4OS4yMTkyMzYsInN1YiI6IjY2OTUyYTVmZTkyYWI0ZDMyMGJhY2FkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nZFMjmWuNpcTBkHSgnKCrePtpiRctjIFaUQ5nIR9XY'
    }
  };

  let data = await fetch(requestString, options);
  let response = await data.json();
  return (response);
}

const getRandomFilm = async () => {
  let randnbr = 101;
  let responseNbPage = await FilmDataListByMood(1);
  console.log(responseNbPage);
  console.log(responseNbPage.total_pages);
  if (responseNbPage.total_pages > 500) {
    randnbr = Math.floor(Math.random() * 499) + 1;
  }
  else {
    randnbr = Math.floor(Math.random() * responseNbPage.total_pages) + 1;
  }
  /* console.log(randnbr); */
  let responseListPage = await FilmDataListByMood(randnbr);
  let randnbrFilm = Math.floor(Math.random() * responseListPage.results.length);
  console.log(randnbrFilm);
  console.log(responseListPage.results[randnbrFilm]);
  //console.log(responseListPage.results[randnbrFilm].id);
  return (responseListPage.results[randnbrFilm].id);
}

changeFilm();
button.addEventListener('click', changeFilm);
//getRandomFilm();

