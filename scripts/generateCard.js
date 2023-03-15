export function generateCardHTML(eventData) {
    return `
      <div class="card" style="width: 18rem;">
        <img src="${eventData.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-tittle">${eventData.name}</h5>
          <div class="card-data">
            <p class="price">$${eventData.price}</p>
            <p class="card-date"><small>${eventData.date}<small></p>
            <p><small>${eventData.category}</small></p> 
          </div>
          <hr>
          <p class="card-description">${eventData.description}</p>
          <div class="info-bottom">
            <a href="eventDetail.html?id=${eventData._id}" class="btn btn-primary">MORE INFO <i class="fa-solid fa-angle-right"></i></a>
          </div>
        </div>
      </div>
    `;
}