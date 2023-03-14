import { fetchPosts } from './apiFetch.js';

let postsData;
let newData
let card = document.getElementById("dinamic-card");

async function getData() {
    try {
        postsData = await fetchPosts();
        newData = postsData.events;

        for (const e of postsData.events) {
            card.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${e.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-tittle">${e.name}</h5>
                    <div class="card-data">
                        <p class="price">$${e.price}</p>
                        <p class="card-date"><small>${e.date}<small></p>
                        <p><small>${e.category}</small></p> 
                     </div>
                    <hr>
                    <p class="card-description">${e.description}</p>
                    <div class="info-bottom">
                        <a href="eventDetail.html?id=${e._id}" class="btn btn-primary">MORE INFO <i class="fa-solid fa-angle-right"></i></a>
                    </div>
                </div>
            </div>
        `
        }
    } catch (error) {
        console.error(error);
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

            card.innerHTML += `
            <div class="card" style="width: 18rem;">
            <img src="${e.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-tittle">${e.name}</h5>
                <div class="card-data">
                    <p class="price">$${e.price}</p>
                    <p class="card-date"><small>${e.date}<small></p>
                    <p><small>${e.category}</small></p> 
                 </div>
                <hr>
                <p class="card-description">${e.description}</p>
                <div class="info-bottom">
                    <a href="eventDetail.html?id=${e._id}" class="btn btn-primary">MORE INFO <i class="fa-solid fa-angle-right"></i></a>
                </div>
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


    newData = categoryFilter;

    console.log(newData)

    if (categoryFilter.length > 0) {

        card.innerHTML = ''

        for (const e of categoryFilter) {

            card.innerHTML += `
            <div class="card" style="width: 18rem;">
            <img src="${e.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-tittle">${e.name}</h5>
                <div class="card-data">
                    <p class="price">$${e.price}</p>
                    <p class="card-date"><small>${e.date}<small></p>
                    <p><small>${e.category}</small></p> 
                 </div>
                <hr>
                <p class="card-description">${e.description}</p>
                <div class="info-bottom">
                    <a href="eventDetail.html?id=${e._id}" class="btn btn-primary">MORE INFO <i class="fa-solid fa-angle-right"></i></a>
                </div>
            </div>
        </div>
            ` ;
        }
    } else {
        card.innerHTML = `<h2>No se encontraron resultados</h2>`
    }
});
