import { data } from './data.js';

let card = document.getElementById("dinamic-card");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let events = data.events;

let event = events.find((e) => e._id == id);

if (event != undefined) {
    card.innerHTML +=
        `
    <div id="cardDetail" class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-6">
                <img src="${event.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <span class="type-event">${event.category}</span> 
                    <span class="event-date">${event.date}</span>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text">Ubication: ${event.place}</p>
                    <p class="card-text">Capacity: ${event.capacity}</p>
                    <p class="card-text">Assistance: ${event.assistance}</p>
                    <div>Value: $${event.price}</div>
                </div>
            </div>
        </div>
    </div>
    `
}


