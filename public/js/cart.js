
// // // // working on creating a fetch request method to send animal data to be added in the card table
const cartHandler = async (event) => {
    console.log(event.target.getAttribute("data-id"));
    if(event.target.hasAttribute("data-id")){
        const animalId = event.target.getAttribute("data-id");
        const response = await fetch('/api/cart/basket', {
            method: 'POST',
            body: JSON.stringify({id: animalId}),
            headers: {
                'Content-Type' : 'application/json',
            },
        });
        if(response.ok){
            document.location.replace('/basket');
        }else{
            alert(response.statusText);
        }
    }
}


document.querySelector('.boxes').addEventListener('click', cartHandler);