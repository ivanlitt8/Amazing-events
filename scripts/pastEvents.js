import { fetchPosts } from './apiFetch.js'
import { generateCardHTML } from './generateCard.js'

let card = document.getElementById("dinamic-card");

let newData = []

async function getData() {
    let postsData = JSON.parse(localStorage.getItem('postsData'));

    if (!postsData) {
        try {
            postsData = await fetchPosts();
            localStorage.setItem('postsData', JSON.stringify(postsData));
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const currentDate = postsData.currentDate

    for (const e of postsData.events) {
        if (e.date < currentDate) {
            newData.push(e);
        }
    }

    for (const e of newData) {
        card.innerHTML += generateCardHTML(e);
    }
}

getData();

const botonCapturar = document.getElementById("searchButton");

botonCapturar.addEventListener("click", function (evento) {

    evento.preventDefault();

    let nameOrDescription = document.getElementById("searchEvent").value;

    nameOrDescription = nameOrDescription.toLowerCase();

    let result = newData.filter(e => e.name.toLowerCase() == nameOrDescription);

    result = result.concat(newData.filter(e => e.description.toLowerCase().includes(nameOrDescription) && !result.includes(e)));

    newData = result;

    if (result.length > 0) {

        card.innerHTML = '';

        for (const e of result) {
            card.innerHTML += generateCardHTML(e);
        }

    } else {
        card.innerHTML = `<h2>No se encontraron resultados para "${nameOrDescription}" </h2>`
    }

});


const botonCategoria = document.getElementById("filterButton");

botonCategoria.addEventListener("click", function (evento) {
    evento.preventDefault();

    let checkboxes = document.querySelectorAll('input[name="category"]:checked')

    let values = [];

    for (let i = 0; i < checkboxes.length; i++) {
        values.push(checkboxes[i].value);
    }

    let categoryFilter = []

    for (let i = 0; i < values.length; i++) {
        for (const e of newData) {
            if (e.category == values[i]) {
                categoryFilter.push(e)
            }
        }
    }

    newData = categoryFilter;

    if (categoryFilter.length > 0) {

        card.innerHTML = ''

        for (const e of postsData.events) {
            card.innerHTML += generateCardHTML(e);
        }
    } else {
        card.innerHTML = `<h2>No se encontraron resultados</h2>`
    }
});