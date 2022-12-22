// working on creating a fetch request method to send animal data to be added in the card table
const cartHandler = async (event) => {
    event.preventDefault();

    console.dir(event.target); // was able to read animal id and will start working on creating fetch request.
}


document
  .querySelector('.Sign-Button')
  .addEventListener('click', cartHandler);