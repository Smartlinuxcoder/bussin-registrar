
function checkLoggedIn() {
    const sessionToken = getCookie('sessiontoken');
    if (sessionToken) {
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
      window.location.href = '/login';
    }
  }
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  checkLoggedIn();