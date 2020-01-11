const BASE_URL = "http://localhost:3000"

// DOM Loaded Chain:
document.addEventListener("DOMContentLoaded", () => getAllTrainers())
const getAllTrainers = () => fetch(`${BASE_URL}/trainers`).then(r => r.json()).then(j => displayAllTrainers(j))
const displayAllTrainers = allTrainers => allTrainers.forEach(trainer => displayTrainer(trainer))
const displayTrainer = trainer => document.querySelector('main').appendChild(makeTrainerCard(trainer))

// Helper Function:
const makeTrainerCard = trainer => {
    let div = document.createElement('div')
    div.className = "card"
    div.id = trainer.id
    let p = document.createElement('p')
    p.innerText = trainer.name
    let addButton = document.createElement('button')
    addButton.innerText = "Add Pokemon"
    addButton.onclick = e => addPokemon(e.target.parentNode)
    let ul = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.id = pokemon.id
        let releaseButton = document.createElement('button')
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton.onclick = e => releasePokemon(e.target.parentNode)
        li.appendChild(releaseButton)
        ul.appendChild(li)
    })
    div.appendChild(p)
    div.appendChild(addButton)
    div.appendChild(ul)
    return div
}

// Event Listener Functions:
const addPokemon = (div) => {
    fetch(`${BASE_URL}/pokemons`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({trainer_id: div.id})
    }).then(r => r.json()).then(() => replaceTrainerCard(div))
}
const releasePokemon = (li) => {
    fetch(`${BASE_URL}/pokemons/${li.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({pokemon_id: li.id})
    }).then(r => r.json()).then(j => replaceTrainerCard(li.parentNode.parentNode))
}

// Event Listener Helper Function:
const replaceTrainerCard = (div) => {
    fetch(`${BASE_URL}/trainers/${div.id}`).then(r => r.json()).then(j => div.replaceWith(makeTrainerCard(j)))
}