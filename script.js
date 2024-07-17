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


const changeFilm = async () => {
    //let randomNumber = Math.ceil(Math.random() * 1000) + 1;
    //let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    let mod = window.location.search.replace("?", "");
    //console.log(mod);
    
    let id_film =   await getRandomFilm();
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
    filmTitle.textContent = response.original_title;
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
  let requestString ='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  console.log(mood == "comfy");
  if (mood == "comfy")
  {
    tabe_genres = [28,16,35,10751,14]
    with_genres = `&with_genres=${tabe_genres.join("%2C")}`
    requestString = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pagenbr}&sort_by=popularity.desc${with_genres}${without_genres}`;
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
  let responseNbPage = await FilmDataListByMood(1);
  console.log(responseNbPage);
  console.log(responseNbPage.total_pages);
  randnbr = Math.floor(Math.random() * responseNbPage.total_pages) + 1; 
  /* console.log(randnbr); */
  let responseListPage = await FilmDataListByMood(randnbr);
  let randnbrFilm = Math.floor(Math.random() * responseListPage.results.length); 
  console.log(randnbrFilm);
  console.log(responseListPage.results[randnbrFilm]);
  console.log(responseListPage.results[randnbrFilm].id);
  return (responseListPage.results[randnbrFilm].id);
}

changeFilm();
button.addEventListener('click', changeFilm);
//getRandomFilm();

