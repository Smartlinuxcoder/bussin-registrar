function errorPopup(){
  var article = document.createElement('article');
      article.className = 'message is-danger container';
    
      // Create the message header
      var header = document.createElement('div');
      header.className = 'message-header';
      
      var p = document.createElement('p');
      p.textContent = 'Unable to register';
      
      var button = document.createElement('button');
      button.className = 'delete';
      button.setAttribute('aria-label', 'delete');
    
      // Append the paragraph and button to the header
      header.appendChild(p);
      header.appendChild(button);
    
      // Create the message body
      var body = document.createElement('div');
      body.className = 'message-body';
      body.textContent = 'Username taken, try again.';
    
      // Append the header and body to the article
      article.appendChild(header);
      article.appendChild(body);
    
      // Append the article to the end of the body
      document.body.appendChild(article);
    
      // Add event listener to the delete button to remove the article
      button.addEventListener('click', function() {
        article.remove();
      });
}



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
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error logging in after registration');
        });
      } else {
        errorPopup();
      }
    })
    .catch(error => {
      errorPopup();
    });
  });
  
