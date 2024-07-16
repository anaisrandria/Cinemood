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
let pokeNumber = document.getElementById('number');
let pokeName = document.getElementById('name');


const changePokemon = async () => {
    let randomNumber = Math.ceil(Math.random() * 1000) + 1;
    let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

    let data = await fetch(requestString);

    let response = await data.json();
    console.log(response);

    image.src = response.sprites.front_default;
    pokeNumber.textContent = `#${response.id}`;
    pokeName.textContent = response.name;
}
changePokemon()
button.addEventListener('click', changePokemon);
