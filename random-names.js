const randomName = ['Beautiful', 'Master', 'Super Loutre', 'Sunshine', 'Nono', 'Cuty Pie', 'Super Castor', 'Butter Cup', 'Handsome', 'Muffin', 'Pumpkin', 'Kwazy Cupcake', 'Little Schtroumpf', 'Little One', 'to the Stongest', 'Petite Chose Mignonne', 'You']

function getRandomName() {
    return randomName[Math.floor(Math.random() * randomName.length)];

}

function displayRandomName() {
    document.getElementById('randomname').innerHTML = `Hello <span><em>${getRandomName()}</em></span> !`;
}

displayRandomName()