function errorPopup(){
  var article = document.createElement('article');
      article.className = 'message is-danger container';
    
      // Create the message header
      var header = document.createElement('div');
      header.className = 'message-header';
      
      var p = document.createElement('p');
      p.textContent = 'Wrong credentials';
      
      var button = document.createElement('button');
      button.className = 'delete';
      button.setAttribute('aria-label', 'delete');
    
      // Append the paragraph and button to the header
      header.appendChild(p);
      header.appendChild(button);
    
      // Create the message body
      var body = document.createElement('div');
      body.className = 'message-body';
      body.textContent = 'Wrong username or password, try again.';
    
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
        errorPopup();
      }
    })
    .catch(error => {
      errorPopup();
    });
  });
  