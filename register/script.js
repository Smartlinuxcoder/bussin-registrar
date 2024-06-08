document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('https://auth.smartlinux.xyz/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.status === 201) {
        // Automatically log in the user after registration
        return fetch('https://auth.smartlinux.xyz/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, site: 'registrar.3feds.lol' })
        })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Login failed after registration');
          }
        })
        .then(data => {
          const expiryDate = new Date();
          expiryDate.setMinutes(expiryDate.getMinutes() + 10);
          document.cookie = `sessiontoken=${data.hash}; expires=${expiryDate.toUTCString()}; path=/`;
          alert('Registration and login successful');
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error logging in after registration');
        });
      } else {
        throw new Error('Registration failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error registering user');
    });
  });
  
