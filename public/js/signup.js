
// signup event handler to send form data by post method
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const first_name = document.querySelector('#inputFirstName').value;
    const last_name = document.querySelector('#inputLastName').value;
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value;
    const phone = document.querySelector('#inputTelephone').value;
  
  
    if (first_name && last_name && email && password && phone) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, email, phone, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);