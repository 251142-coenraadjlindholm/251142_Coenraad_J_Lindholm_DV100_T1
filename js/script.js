
<<<<<<< HEAD
//Index//
//Carousel//
document.addEventListener('DOMContentLoaded', function () {
    // Make sure the ID matches your carousel!
    var carousel = $('#marsCarousel');
    $('.carousel-control-prev').click(function (e) {
        e.preventDefault();
        carousel.carousel('prev');
    });
    $('.carousel-control-next').click(function (e) {
        e.preventDefault();
        carousel.carousel('next');
    });
});

//Flights//
// document.querySelectorAll('.flight-card').forEach(card => {
document.querySelectorAll('.flight-card').forEach(card => {
    const decreaseBtn = card.querySelector('.btn-decrease');
    const increaseBtn = card.querySelector('.btn-increase');
    const counterSpan = card.querySelector('.counter');

    let count = 0;

    decreaseBtn.addEventListener('click', () => {
        if (count > 0) count--;
        counterSpan.textContent = count;
    });

    increaseBtn.addEventListener('click', () => {
        count++;
        counterSpan.textContent = count;
    });
});

// Search functionality for flight cards
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const flights = document.querySelectorAll(".flight-card");
  let visibleCount = 0;

  flights.forEach((flight) => {
    // Use optional chaining and fallback to empty strings to avoid errors
    const title = flight.querySelector("h5")?.textContent.toLowerCase() ?? "";
    const description = flight.querySelector("p.card-text-uneven, p.card-text-even")?.textContent.toLowerCase() ?? "";
    const style = flight.querySelector(".details-uneven p:nth-child(2), .mt-3 p:nth-child(2)")?.textContent.toLowerCase() ?? "";
    const tags = flight.querySelector(".details-uneven p:nth-child(3), .mt-3 p:nth-child(3)")?.textContent.toLowerCase() ?? "";
    const date = flight.querySelector(".details-uneven p:nth-child(4), .mt-3 p:nth-child(4)")?.textContent.toLowerCase() ?? "";

    // Check if query matches any field
    if (
      title.includes(query) ||
      description.includes(query) ||
      style.includes(query) ||
      tags.includes(query) ||
      date.includes(query)
    ) {
      flight.style.display = "";
      visibleCount++;
    } else {
      flight.style.display = "none";
    }
  });

  // Update result info
  const resultsInfo = document.getElementById("resultsInfo");
  if (visibleCount === 0) {
    resultsInfo.textContent = "No results found";
  } else {
    resultsInfo.textContent = `Showing 1-${visibleCount} of ${visibleCount} results`;
  }
});

// Add to Cart functionality
$(document).on('click', '.book-now-btn', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const image = $(this).data('image');
    const price = parseFloat($(this).data('price'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, image, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert(`${name} added to cart!`);
});

// Cart functionality//
document.addEventListener('DOMContentLoaded', function () {
    // Get the cart badge element//
    const cartBadge = document.querySelector('.space-cart .badge-danger');
    let cartCount = parseInt(cartBadge.textContent, 10) || 0;

// Add click event to all "Book Now" buttons//
    $(document).on('click', '.book-now-btn', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const image = $(this).data('image');
    const price = parseFloat($(this).data('price'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, image, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert(`${name} added to cart!`);
});

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.space-cart .badge').text(count);
}

$(document).ready(function() {
    updateCartBadge();
});


//Cart Page Functionality//
    
function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let $tbody = $('.cart-table tbody');
    $tbody.empty();
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        $tbody.append(`
            <tr>
                <td><img src="${item.image}" alt="${item.name}" style="width: 80px;"></td>
                <td>
                    <strong>${item.name}</strong>
                </td>
                <td>R ${item.price.toLocaleString()}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-outline-primary btn-sm btn-decrease" data-id="${item.id}">-</button>
                        <span class="mx-2 counter">${item.quantity}</span>
                        <button class="btn btn-outline-primary btn-sm btn-increase" data-id="${item.id}">+</button>
                    </div>
                </td>
                <td>R ${subtotal.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm btn-remove" data-id="${item.id}">Remove</button>
                </td>
            </tr>
        `);
    });

    $('.cart-table tfoot .font-weight-bold').last().text('R ' + total.toLocaleString());
    updateCartBadge();
}

// Quantity and Remove handlers
$(document).on('click', '.btn-increase', function() {
    let id = $(this).data('id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(i => i.id === id);
    if (item) item.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
});
$(document).on('click', '.btn-decrease', function() {
    let id = $(this).data('id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) item.quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
});
$(document).on('click', '.btn-remove', function() {
    let id = $(this).data('id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
});

// On Cart page load
$(document).ready(function() {
    if ($('.cart-table').length) {
        renderCart();
    }
    updateCartBadge();
})});

=======
    function updateDisplay() {
      document.getElementById('btn btn-outline-primary').textContent = count;
    }

    function increase() {
      count += 1;
      updateDisplay();
    }

    function decrease() {
      count -= 1;
      updateDisplay();
    }
>>>>>>> parent of fe1b500 (Added seaarch bar js and fixed errors)
