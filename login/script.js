document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const site = "registrar.3feds.lol"; // Replace with your site name
    
    fetch('https://auth.smartlinux.xyz/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, site })
    })
    .then(response => response.json())
    .then(data => {
      if (data.hash) {
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 10);
        document.cookie = `sessiontoken=${data.hash}; expires=${expiryDate.toUTCString()}; path=/`;
        window.location.href = '/dashboard';
      } else {
        alert('Login failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error logging in');
    });
  });
  