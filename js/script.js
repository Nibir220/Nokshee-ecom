let cart = [];

// Load existing cart from localStorage if available
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  updateCartCount();
}

// Add event listeners to Add to Cart buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      const existingProduct = cart.find(p => p.name === name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showMessage(`product added to cart!`);

    });
  });
});

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.innerText = count;
  }
}

function showMessage(message) {
  const msgBox = document.getElementById('message-box');
  msgBox.innerText = message;
  msgBox.classList.remove('hidden');
  msgBox.classList.add('show');

  setTimeout(() => {
    msgBox.classList.remove('show');
    setTimeout(() => msgBox.classList.add('hidden'), 300);
  }, 2000);
}




function loadComponent(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => console.error('Error loading component:', error));
}

// Load header and footer
loadComponent('header', 'components/header.html');
loadComponent('footer', 'components/footer.html');