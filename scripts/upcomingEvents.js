import { data } from './data.js';

let card = document.getElementById("dinamic-card");

let date = data.currentDate;
const newData = []

for (const e of data.events) {
    if (e.date > date) {
        newData.push(e);
    }
}

for (let i = 0; i < newData.length; i++) {
    card.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${newData[i].image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${newData[i].name}</h5>
                    <p class="card-text">${newData[i].description}</p>
                    <span class="type-event">${newData[i].category}</span> 
                    <div class="info-bottom">
                        <div>$ ${newData[i].price}</div>
                            <a href="event.html" class="btn btn-primary">More info</a>
                        </div>
                    <span class="event-date">${newData[i].date}</span>
                </div>
            </div>
        `
}

// const botonCapturar = document.getElementById("searchButton");

// botonCapturar.addEventListener("click", function (evento) {

//     evento.preventDefault();

//     let nameOrDescription = document.getElementById("searchEvent").value;

//     nameOrDescription = nameOrDescription.toLowerCase();

//     let result = [];

//     let addedEventIds = new Set();

//     for (let event of newData) {
//         if ((event.name.toLowerCase().includes(nameOrDescription) || event.description.toLowerCase().includes(nameOrDescription)) && !addedEventIds.has(event.id)) {
//             result.push(event);
//             addedEventIds.add(event.id);
//         }
//     }

//     if (result.length > 0) {
//         card.innerHTML = ''

//         for (const e of result) {

//             card.innerHTML += `
//                 <div class="card" style="width: 18rem;">
//                     <img src="${e.image}" class="card-img-top" alt="...">
//                     <div class="card-body">
//                         <h5 class="card-title">${e.name}</h5>
//                         <p class="card-text">${e.description}</p>
//                         <span class="type-event">${e.category}</span> 
//                         <div class="info-bottom">
//                             <div>$ ${e.price}</div>
//                             <a href="event.html" class="btn btn-primary">Buy now</a>
//                         </div>
//                         <span class="event-date">${e.date}</span>
//                     </div>
//                 </div>
//             ` ;
//         }
//     } else {
//         card.innerHTML = `<h2>No se encontraron resultados para ${nameOrDescription} </h2>`
//     }

// });

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
                            <a id="eventDetail" class="btn btn-primary">More info</a>                        </div>
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
        for (const e of newData) {
            if (e.category == values[i]) {
                categoryFilter.push(e)
            }
        }
    }

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
                            <a id="eventDetail" class="btn btn-primary">More info</a>                        </div>
                        <span class="event-date">${e.date}</span>
                    </div>
                </div>
            ` ;
        }
    } else {
        card.innerHTML = `<h2>No se encontraron resultados</h2>`
    }
});