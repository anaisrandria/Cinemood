const randomName = ['Monsoon Lollipop', 'Cherry Star', 'Zephyr Dancer', 'Bonnie Cuddle', 'Hazel Dancer', 'Crystal Cinnamon', 'Autumn Cinnamon', 'Midnight Lotus', 'Sunshine Afternoon', 'Mistral Aura', 'Twilight Music', 'Misty Bluegrass', 'Walnut Burst', 'Sherbet Forest', 'Snow Muffin', 'Fizzy Twilight', 'Crescent Fruit', 'Sunbeam Bluegrass', 'Cloudy Ember', 'Velvet Stripes']

function getRandomName() {
    return randomName[Math.ceil(Math.random() * randomName.length)];

}

function displayRandomName() {
    document.getElementById('randomname').textContent = `Hello ${getRandomName()}!`;
}

displayRandomName()