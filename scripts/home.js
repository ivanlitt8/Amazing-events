import { data } from './data.js';

let card = document.getElementById("dinamic-card");
let newData = data.events;

for (const e of data.events) {
    card.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${e.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <span class="type-event">${e.category}</span> 
            <div class="info-bottom">
                <div>$ ${e.price}</div>
                <a href="eventDetail.html?id=${e._id}" class="btn btn-primary">More info</a>
            </div>
            <span class="event-date">${e.date}</span>
        </div>
    </div>
    `
}

const botonCapturar = document.getElementById("searchButton");

botonCapturar.addEventListener("click", function (evento) {

    evento.preventDefault();

    let nameOrDescription = document.getElementById("searchEvent").value;

    nameOrDescription = nameOrDescription.toLowerCase();

    let result = newData.filter(e => e.name.toLowerCase() == nameOrDescription);

    result = result.concat(newData.filter(e => e.description.toLowerCase().includes(nameOrDescription) && !result.includes(e)));

    if (result.length > 0) {

        card.innerHTML = '';

        for (const e of result) {

            card.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${e.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <p class="card-text">${e.description}</p>
                        <span class="type-event">${e.category}</span> 
                        <div class="info-bottom">
                            <div>$ ${e.price}</div>
                            <a id="eventDetail" class="btn btn-primary">More info</a>
                        </div>
                        <span class="event-date">${e.date}</span>
                    </div>
                </div>
            ` ;
        }
    } else {
        card.innerHTML = `<h2>No se encontraron resultados para ${nameOrDescription} </h2>`
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
        for (const e of data.events) {
            if (e.category == values[i]) {
                categoryFilter.push(e)
            }
        }
    }

    newData = categoryFilter;

    if (categoryFilter.length > 0) {

        card.innerHTML = ''

        for (const e of categoryFilter) {

            card.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${e.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <p class="card-text">${e.description}</p>
                        <span class="type-event">${e.category}</span> 
                        <div class="info-bottom">
                            <div>$ ${e.price}</div>
                            <a id="eventDetail" class="btn btn-primary">More info</a>
                        </div>
                        <span class="event-date">${e.date}</span>
                    </div>
                </div>
            ` ;
        }
    } else {
        card.innerHTML = `<h2>No se encontraron resultados</h2>`
    }
});

