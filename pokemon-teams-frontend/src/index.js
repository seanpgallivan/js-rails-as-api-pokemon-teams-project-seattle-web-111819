const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => getAllTrainers())

const getAllTrainers = () => fetch(`${BASE_URL}/trainers`).then(r => r.json()).then(j => displayAllTrainers(j))

const displayAllTrainers = j => j.forEach(trainer => displayTrainer(trainer))

const displayTrainer = trainer => document.querySelector('main').appendChild(makeTrainerCard(trainer))

const makeTrainerCard = trainer => {
    let div = document.createElement('div')
    div.className = "card"
    let p = document.createElement('p')
    p.innerText = trainer.name
    let addButton = document.createElement('button')
    addButton.innerText = "Add Pokemon"
    addButton.onclick = () => addPokemon(trainer.id, div)
    let ul = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let releaseButton = document.createElement('button')
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton.onclick = () => {releasePokemon(pokemon.id, div)}
        li.appendChild(releaseButton)
        ul.appendChild(li)
    })
    div.appendChild(p)
    div.appendChild(addButton)
    div.appendChild(ul)
    return div
}

const addPokemon = (id, div) => {
    fetch(`${BASE_URL}/pokemons`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({trainer_id: id})
    }).then(r => r.json()).then(() => replaceTrainerCard(id, div))
}

const releasePokemon = (id, div) => {
    fetch(`${BASE_URL}/pokemons/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({pokemon_id: id})
    }).then(r => r.json()).then(j => replaceTrainerCard(j.trainer, div))
}

const replaceTrainerCard = (id, div) => {
    fetch(`${BASE_URL}/trainers/${id}`).then(r => r.json()).then(j => div.replaceWith(makeTrainerCard(j)))
}