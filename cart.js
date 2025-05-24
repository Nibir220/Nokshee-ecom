document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartBtn = document.getElementById("empty-cart");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      emptyCartBtn.style.display = "none";
      return;
    }

    let html = '<div class="product-grid">';
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      html += `
        <div class="product-card">
          <img src="${item.image}" alt="${item.name}" />
          <h4>${item.name}</h4>
          <p>Qty: ${item.quantity}</p>
          <p>$${subtotal.toFixed(2)}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    html += `</div><h3>Total: $${total.toFixed(2)}</h3>`;
    cartItemsContainer.innerHTML = html;
    emptyCartBtn.style.display = "block";
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  emptyCartBtn.addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  });

  renderCart();
});
