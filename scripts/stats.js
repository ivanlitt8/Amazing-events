import { fetchPosts } from "./apiFetch.js";

let postsData;
let events;
let date;

let pastEvents = [];
let upcomingEvents = [];

const tableBody1 = document.getElementById("table-body1");
const tableBody2 = document.getElementById("table-body2");

async function getData() {
    try {
        postsData = JSON.parse(localStorage.getItem('postsData'));

        if (!postsData) {
            postsData = await fetchPosts();
            localStorage.setItem('postsData', JSON.stringify(postsData));
        }

        events = postsData.events;
        date = postsData.currentDate;

        events.forEach(e => {
            if (e.date < date) {
                pastEvents.push(e)
            } else {
                upcomingEvents.push(e)
            }
        });

        sortEvents(pastEvents);
        sortEvents(upcomingEvents);

        highestPercentageAudience();
        lowerPercentageAudience();
        greaterCapacity();

        printResult(getFinalStats(getRevenue(upcomingEvents), getAttendance(upcomingEvents)), tableBody1);
        printResult(getFinalStats(getRevenue(pastEvents), getAttendance(pastEvents)), tableBody2);


    } catch (error) {
        console.error(error);
    }
}

getData();

//Busca el evento con mayor porcentaje de asistencia
function highestPercentageAudience() {
    let maxPercentage = 0;
    let nameMaxAudience = "";
    for (const e of events) {
        if (e.assistance != undefined) {
            let percentage = (e.assistance / e.capacity) * 100

            if (percentage > maxPercentage) {
                maxPercentage = percentage
                nameMaxAudience = e.name
            }
        }
    }

    // Obtener referencia 
    const firstTd = document.getElementById("first-td");

    // Ejecutar función para obtener el resultado
    const resultado = nameMaxAudience;

    // Asignar resultado al td
    firstTd.textContent = resultado;

    return ("El evento " + nameMaxAudience + " es el que tiene el máximo porcentaje de asistencia con: " + maxPercentage + "%")
}

//Busca el evento con menor porcentaje de asistencia
function lowerPercentageAudience() {
    let minPercentage = 100;
    let nameMinAudience = "";
    for (const e of events) {
        if (e.assistance != undefined) {
            let percentage = (e.assistance / e.capacity) * 100

            if (percentage < minPercentage) {
                minPercentage = percentage
                nameMinAudience = e.name
            }
        }
    }

    // Obtener referencia 
    const secondTd = document.getElementById("second-td");

    // Ejecutar función para obtener el resultado
    const resultado = nameMinAudience;

    // Asignar resultado al td
    secondTd.textContent = resultado;

    return ("El evento " + nameMinAudience + " es el que tiene el mínimo porcentaje de asistencia con: " + minPercentage + "%")
}

// Busca el evento con mayor capacidad
function greaterCapacity() {
    let maxCapacity = 0;
    let nameMaxCap = "";
    for (const e of events) {
        if (e.capacity != undefined) {
            if (e.capacity > maxCapacity) {
                maxCapacity = e.capacity;
                nameMaxCap = e.name;
            }
        }
    }

    // Obtener referencia 
    const thirthTd = document.getElementById("thirth-td");

    // Ejecutar función para obtener el resultado
    const resultado = nameMaxCap;

    // Asignar resultado al td
    thirthTd.textContent = resultado;

    return ("El evento " + nameMaxCap + " es el que tiene maxima capacidad con: " + maxCapacity);

}

// Ordeno los eventos por categoria
function sortEvents(events) {
    events.sort(function (a, b) {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    });

    return events
}

// Funcion para obtener ganancia por categoria
function getRevenue(events) {
    const revenue = events.reduce(function (acumulador, event) {
        if (event.assistance === undefined) {
            acumulador[event.category] = (acumulador[event.category] || 0) + (event.price * event.estimate);
        } else {
            acumulador[event.category] = (acumulador[event.category] || 0) + (event.price * event.assistance);
        }
        return acumulador;
    }, {});

    return revenue;

}

// Funcion para obtener el porcentaje por categoria
function getAttendance(events) {
    const upcomingEventsAttendance = events.reduce(function (acumulador, event) {
        const attendance = event.assistance || event.estimate || 0;
        const capacity = event.capacity || 0;
        acumulador[event.category] = {
            attendance: (acumulador[event.category]?.attendance || 0) + attendance,
            capacity: (acumulador[event.category]?.capacity || 0) + capacity
        };
        acumulador[event.category].percent = ((acumulador[event.category].attendance / acumulador[event.category].capacity) * 100 || 0).toFixed(2);
        return acumulador;
    }, {});

    return upcomingEventsAttendance
}

function getFinalStats(revenue, attendance) {
    const result = {};
    for (const category in revenue) {
        if (attendance.hasOwnProperty(category)) {
            result[category] = {
                revenue: revenue[category],
                percent: attendance[category].percent
            };
        }
    }

    // const tableBody = document.getElementById("table-body");

    // for (const e in result) {
    //     const porcent = result[e].percent;
    //     const revenue = result[e].revenue;
    //     const row = document.createElement("tr");
    //     row.innerHTML = `<td>${e}</td><td>${revenue}</td><td>${porcent}</td>`;
    //     tableBody.appendChild(row);
    // }

    return result;
}

function printResult(result, tableBody) {

    for (const e in result) {
        const porcent = result[e].percent;
        const revenue = result[e].revenue;
        const row = document.createElement("tr");
        row.innerHTML = `<td>${e}</td><td>${revenue}</td><td>${porcent}</td>`;
        tableBody.appendChild(row);
    }
}


