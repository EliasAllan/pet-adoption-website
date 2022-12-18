const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const first_name = document.querySelector('#first-name').value;
    const last_name = document.querySelector('#last-name').value;
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value;
    const phone = document.querySelector('#telephone').value;
  
  
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