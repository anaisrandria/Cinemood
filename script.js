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
    console.log(mod);
    
    let id_film =   101;
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
changeFilm()
button.addEventListener('click', changeFilm);
