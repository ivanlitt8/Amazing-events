import { fetchPosts } from "./apiFetch.js";

let card = document.getElementById("dinamic-card");

let date
let postsData
let newData = []

async function getData() {
    try {
        postsData = await fetchPosts();
        date = postsData.currentDate;

        for (const e of postsData.events) {
            if (e.date > date) {
                newData.push(e);
            }
        }
        for (let i = 0; i < newData.length; i++) {
            card.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${newData[i].image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-tittle">${newData[i].name}</h5>
                    <div class="card-data">
                        <p class="price">$${newData[i].price}</p>
                        <p class="card-date"><small>${newData[i].date}<small></p>
                        <p><small>${newData[i].category}</small></p> 
                    </div>
                    <hr>
                    <p class="card-description">${newData[i].description}</p>
                    <div class="info-bottom">
                        <a href="eventDetail.html?id=${newData[i]._id}" class="btn btn-primary">MORE INFO</a>
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

            card.innerHTML +=
                `
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
                            <a href="eventDetail.html?id=${e._id}" class="btn btn-primary">MORE INFO</a>
                        </div>
                    </div>
                </div>
            ` ;
        }
    } else {
        card.innerHTML = `
        
        <h2>No se encontraron resultados para ${nameOrDescription} </h2>`
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

        for (const e of categoryFilter) {

            card.innerHTML +=
                `
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
                        <a href="eventDetail.html?id=${e._id}" class="btn btn-primary">MORE INFO</a>
                    </div>
                </div>
            </div>
            ` ;
        }
    } else {
        card.innerHTML = `<h2>No se encontraron resultados</h2>`
    }
});