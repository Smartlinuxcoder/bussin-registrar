document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('input.input');
    const checkButton = document.querySelector('button.is-primary');
  
    checkButton.addEventListener('click', () => {
      const domain = inputField.value;
      if (domain) {
        checkButton.classList.add("is-loading");
      } else {
        alert('Please enter a domain.');
      }
    });
  });
  