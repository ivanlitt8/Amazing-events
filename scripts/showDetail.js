import { fetchPosts } from "./apiFetch.js";

let card = document.getElementById("dinamic-card");
let postsData

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


async function getData() {
    try {
        postsData = await fetchPosts();
        let events = postsData.events;
        let event = events.find((e) => e._id == id);

        if (event != undefined) {
            card.innerHTML +=
                `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${event.image}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <div class="card-data">
                                    <p class="price">$${event.price}</p>
                                    <p class="card-date"><small>${event.date}<small></p>
                                    <p><small>${event.category}</small></p> 
                                </div>
                                <hr>
                                <p class="card-text">${event.description}</p>
                                <hr>
                                <div class="card-info">
                                    <p><i class="fa-solid fa-location-dot"></i> ${event.place}</p>
                                    <p><i class="fa-solid fa-compress"></i> ${event.capacity}</p>
                                    <p><i class="fa-solid fa-person"></i> ${event.assistance}</p>
                                </div>
                                <div class="btn-container">
                                    <button type="button" class="btn btn-primary"><b>BUY NOW<b></button>
                                    <button type="button" class="btn btn-primary"><a href="index.html"><b>CANCEL<b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            `
        }
    } catch (error) {
        console.error(error);
    }
}

getData()
