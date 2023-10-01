// API call to fetch monsters
fetch('http://localhost:3000/monsters/?_limit=50')
    .then(response => response.json())
    .then(monsters => monsters.forEach(renderApiMonsters))
    .catch(error => console.log(error))

// Function to render the monsters called to the page
function renderApiMonsters(monster) {
    let h2 = document.createElement('h2')
    let h4 = document.createElement('h4')
    let p = document.createElement('p')

    h2.textContent = monster.name
    h4.textContent = `Age: ${monster.age}`
    p.textContent = `Bio: ${monster.description}`

    document.querySelector('#monster-container').appendChild(h2)
    document.querySelector('#monster-container').appendChild(h4)
    document.querySelector('#monster-container').appendChild(p)
}


// Creates "Add a Monster" form
let createMonster = document.createElement('form')
createMonster.setAttribute('id', 'create-monster-form')
document.querySelector('#create-monster').appendChild(createMonster)

//Creates name field on form
let addName = document.createElement('input')
addName.setAttribute('type', 'text')
addName.setAttribute('id', 'name-field')
addName.addEventListener('input', updateNameValue)
function updateNameValue(event) {
    addName.setAttribute('value', `${event.target.value}`)
}
addName.setAttribute('name', 'name')
addName.setAttribute('placeholder', 'name...')

//Creates age field on form
let addAge = document.createElement('input')
addAge.setAttribute('type', 'text')
addAge.setAttribute('id', 'age-field')
addAge.addEventListener('input', updateAgeValue)
function updateAgeValue(event) {
    addAge.setAttribute('value', `${event.target.value}`)
}
addAge.setAttribute('name', 'age')
addAge.setAttribute('placeholder', 'age...')

//Creates description field on form
let addDescription = document.createElement('input')
addDescription.setAttribute('type', 'text')
addDescription.setAttribute('id', 'description-field')
addDescription.addEventListener('input', updateDescriptionValue)
function updateDescriptionValue(event) {
    addDescription.setAttribute('value', `${event.target.value}`)
}
addDescription.setAttribute('name', 'description')
addDescription.setAttribute('placeholder', 'description...')

//Creates button on form
let createBtn = document.createElement('input')
createBtn.setAttribute('id', 'create-btn')
createBtn.setAttribute('type', 'submit')
createBtn.setAttribute('name', 'submit')
createBtn.setAttribute('value', 'create')

//Appends the fields to the "Add a Monster" form
createMonster.appendChild(addName)
createMonster.appendChild(addAge)
createMonster.appendChild(addDescription)
createMonster.appendChild(createBtn)

//Adds monster submitted by form to API, and if successful, renders it to the page
createMonster.addEventListener('submit', (event) => {
    event.preventDefault()
    let userMonster = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }
    fetch('http://localhost:3000/monsters/',{
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMonster),
    })
        .then(response => response.json())
        .then(renderApiMonsters)
        .catch(error => console.log(error))
})

//Load the next 50 monsters from the API
let forwardBtn = document.querySelector('#forward')
forwardBtn.addEventListener('click', fetchMoreMonsters)

function fetchMoreMonsters(){
    fetch('http://localhost:3000/monsters/?_limit=50&_page=5')
    .then(response => response.json())
    .then(monsters => monsters.forEach(renderApiMonsters))
    .catch(error => console.log(error))
}



