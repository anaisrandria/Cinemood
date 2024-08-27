// Random name sur la homepage

// const randomName = ['Beautiful', 'Super Loutre', 'Sunshine', 'Nono', 'Cuty Pie', 'Super Castor', 'Butter Cup', 'Handsome', 'Muffin', 'Pumpkin', 'Kwazy Cupcake', 'Little Schtroumpf', 'Little One', 'Master', 'Petite Chose Mignonne', 'You']
const randomName = ['Super Loutre', 'Cuty Pie', 'Super Castor', 'Butter Cup', 'Muffin', 'Pumpkin', 'Kwazy Cupcake', 'Little Schtroumpf','Petite Chose Mignonne']

function getRandomName() {
    return randomName[Math.floor(Math.random() * randomName.length)];

}

function displayRandomName() {
    document.getElementById('randomname').innerHTML = `Bonjour <span><em>${getRandomName()}</em></span> !`;
}

displayRandomName()
