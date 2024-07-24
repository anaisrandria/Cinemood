// INITIALISATION VARIABLES INTERACTION AVEC LE DOM

let button = document.getElementById('button');
let image = document.getElementById('image');
let filmId = document.getElementById('filmid');
let filmTitle = document.getElementById('title');
let buttonLink = document.getElementById('button-link');
let filmYear = document.getElementById('year');
let filmDuration = document.getElementById('duration');
let filmReleaseDate = document.getElementById('release-date');
let averageNote = document.getElementById('average-note');
let filmSynopsis = document.getElementById('synopsis');
let filmGenre = document.getElementById('genre');
let backgroundImage = document.getElementById('background-image');
let youtubePoster = document.getElementById('youtube-poster');
let youtubeButton = document.getElementById('youtube-button');
let mainCast = document.getElementById('main-cast');
let director = document.getElementById('director');
let tableauGenre = [];
let affichageGenre = ''


// TABLEAU DE PARAMETRAGE (PAR EXCLUSION) DES GENRES PAR MOOD

let moodObject = {
  "happy": [80, 99, 18, 36, 27, 10770, 53, 10752, 37],
  "sad": [28, 80, 99, 10751, 14, 36, 27, 10402, 9648, 10770, 53, 10752, 37],
  "goofy": [28, 80, 99, 18, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37],
  "in-love": [28, 80, 99, 18, 10751, 36, 27, 9648, 10770, 53, 10752, 37],
  "nerdy": [16, 35, 18, 10751, 27, 10402, 10749, 10770, 10752, 37],
  "angry": [16, 14, 36, 27, 10402, 9648, 10749, 878, 10770],
  "surpise-me": [10770]
}

// FONCTION PRINCIPALE - CHANGEMENT DE  FILM RANDOM 

const changeFilm = async () => {

  document.querySelectorAll('.genre-paragraph').forEach(el => el.remove());

  let id_film = await getRandomFilm();
  let requestString = `https://api.themoviedb.org/3/movie/${id_film}?language=fr-FR`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhZTE2YjkwZWMxYzk0ZDYwZWY4YTE1M2NiODY2MyIsIm5iZiI6MTcyMTA1MTk4OS4yMTkyMzYsInN1YiI6IjY2OTUyYTVmZTkyYWI0ZDMyMGJhY2FkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nZFMjmWuNpcTBkHSgnKCrePtpiRctjIFaUQ5nIR9XY'
    }
  };

  // Récupération des infos par film via l'API 

  let data = await fetch(requestString, options);
  let response = await data.json();
  console.log(`response:`, response);

  let dataVideo = await fetch(`https://api.themoviedb.org/3/movie/${id_film}/videos?language=en-US`, options);
  let responseVideo = await dataVideo.json();
  console.log(`responseVideo:`, responseVideo);
  console.log(`responseVideo.results:`, responseVideo.results);

  let dataCredits = await fetch(`https://api.themoviedb.org/3/movie/${id_film}/credits?language=en-US`, options);
  let responseCredits = await dataCredits.json();
  console.log(`responseCredits:`, responseCredits);

  // Récupérer les acteurs principaux

  let actorsList = [];

  for (let i=0; i <= 3; i++) {
    console.log("responseCredits is:", responseCredits.cast[i].name);
    actorsList.push(responseCredits.cast[i].name);
  }

  // Récupérer les réalisateurs du film

  let directorsList = [];

  for (let i=0; i < responseCredits.crew.length; i++) {
    if (responseCredits.crew[i].job == 'Director' && responseCredits.crew[i].known_for_department == 'Directing') {
      directorsList.push(responseCredits.crew[i].name);
    }
  }
  console.log('Total directors:', directorsList);

  // Récupérer le lien du trailer

  let trailers = [];
  let youtube_link = "https://www.youtube.com/watch?v=";

  responseVideo.results.forEach(video => {
    if (video.type == 'Trailer') {
      youtube_link += video.key;
      trailers.push(video)
      console.log('Video result is:', video.type, video.key, youtube_link);
    }
  })
  
  // Affichage des genres avec création dynamique des paragraphes

    response.genres.forEach(genre => {
      let genreElement = document.createElement('p');
      genreElement.textContent = genre.name;
      genreElement.classList.add('genre-paragraph');
      filmGenre.appendChild(genreElement);
    })


  // Envoi dynamique des infos au DOM
  
  image.src = `https://image.tmdb.org/t/p/w500${response.poster_path}`;
  youtubePoster.href = youtube_link+trailers[0].key;
  youtubeButton.href = youtube_link+trailers[0].key;
  backgroundImage.style = `background-image: url(https://image.tmdb.org/t/p/original${response.backdrop_path})`;
  filmTitle.innerHTML = `<b>${response.title}</b> (${response.release_date.substr(0, 4)})`;
  filmDuration.innerHTML = `<b>Durée</b> : ${response.runtime} min`;
  filmReleaseDate.innerHTML = `<b>Date de sortie</b> : ${response.release_date}`;
  averageNote.innerHTML = `<b>Note</b> : ${response.vote_average.toFixed(1)}/10`;
  filmSynopsis.innerHTML = `${response.overview}`;
  buttonLink.href = `https://www.themoviedb.org/movie/${response.id}/watch`;
  mainCast.innerHTML = `<b>Avec</b> : ${actorsList.join(`, `)}`;
  director.innerHTML = `<b>Réalisé par</b> : ${directorsList.join(`, `)}`;

}

// FONCTION SECONDAIRE - FILTRE LES RESULTATS PAR GENRE EN FONCTION DU MOOD

const FilmDataListByMood = async (pagenbr) => {
  let mood = window.location.search.replace("?", "");
  console.log(mood);
  let with_genres = ''
  let without_genres = ''
  let requestString = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=200&watch_region=FR&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy';
  console.log(mood in moodObject);
  if (mood in moodObject) {
    tabe_genres = moodObject[mood]
    //with_genres = `&with_genres=${tabe_genres.join("%2C")}`
    without_genres = `&without_genres=${tabe_genres.join("%2C")}`
    requestString = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pagenbr}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=200&watch_region=FR&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy${with_genres}${without_genres}`;
  }

  console.log(requestString);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhZTE2YjkwZWMxYzk0ZDYwZWY4YTE1M2NiODY2MyIsIm5iZiI6MTcyMTA1MTk4OS4yMTkyMzYsInN1YiI6IjY2OTUyYTVmZTkyYWI0ZDMyMGJhY2FkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nZFMjmWuNpcTBkHSgnKCrePtpiRctjIFaUQ5nIR9XY'
    }
  };

  let data = await fetch(requestString, options);
  console.log(data)
  let response = await data.json();
  return (response);

}


// FONCTION SECONDAIRE - Random sur le nombre de pages de résultats, limité à 500 pages

const getRandomFilm = async () => {
  let randnbr = 101;
  let responseNbPage = await FilmDataListByMood(1);
 
  if (responseNbPage.total_pages > 500) {
    randnbr = Math.floor(Math.random() * 499) + 1;
  }
  else {
    randnbr = Math.floor(Math.random() * responseNbPage.total_pages) + 1;
  }
  let responseListPage = await FilmDataListByMood(randnbr);
  let randnbrFilm = Math.floor(Math.random() * responseListPage.results.length);
  console.log(responseListPage.results[randnbrFilm]);
  return (responseListPage.results[randnbrFilm].id);
}

// CHARGEMENT D'UNE PAGE AVEC INFOS AU PREMIER CHARGEMENT
changeFilm();

// LANCEMENT DE LA FONCTION CHANGEFILM() AU CLIC
button.addEventListener('click', changeFilm);

