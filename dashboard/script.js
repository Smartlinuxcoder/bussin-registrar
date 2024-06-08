
function checkLoggedIn() {
  const sessionToken = getCookie('sessiontoken');
  if (!sessionToken) {
    window.location.href = '/login';
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

fuction registerdomain(domain) {
  const sessionToken = getCookie('sessiontoken');
  const parts = domain.split('.');
  const name = parts[0];
  const tld = parts[1];
}

function checkArguments() {
  const currentUrl = window.location.href;

  // Create a new URL object
  const url = new URL(currentUrl);

  // Get the search parameters from the URL
  const searchParams = url.searchParams;

  // Check if there are any search parameters (i.e., GET parameters)
  if (searchParams.toString()) {
    registerdomain(searchParams.get('domain'));

  }
}

checkLoggedIn();
