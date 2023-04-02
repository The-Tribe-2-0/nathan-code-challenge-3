const filmsUL = document.querySelector('#films');

// Remove the placeholder li element
const placeholder = filmsUL.querySelector('.placeholder');
if (placeholder) {
  placeholder.remove();
}

// Make a GET request to retrieve the film data
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
    // Create a list item element for each movie and add it to the filmsUL element
    data.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = movie.title;
      li.classList.add('film', 'item');
      filmsUL.appendChild(li);

      // Add an event listener to display movie details when clicked
      li.addEventListener('click', () => {
        const movieDetails = document.querySelector('#movie-details');
        movieDetails.innerHTML = `
          <h2>${movie.title}</h2>
          <img src="${movie.poster}" alt="${movie.title} poster">
          <p>Available Tickets: <span id="available-tickets">${movie.tickets_sold}</span></p>
          <p>Run Time: <span id="run-time">${movie.runtime} minutes</span></p>
          <p>Show Time: <span id="show-time">${movie.showtime}</span></p>
        `;
      });
    });
  })
  .catch(error => console.error(error));

const buyButton = document.querySelector('#buy-ticket');
const availableTickets = document.querySelector('#available-tickets');

let numTicketsAvailable = 27; 
// Initialize number of tickets available

buyButton.addEventListener('click', () => {
  if (numTicketsAvailable > 0) {
    numTicketsAvailable--;
    availableTickets.textContent = numTicketsAvailable;
    alert('Ticket purchased successfully!');
  } else {
    alert('Sold out.');
  }
});
