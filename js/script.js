//Index//
// Carousel controls
document.addEventListener('DOMContentLoaded', function () {
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

// Quantity controls and Book Now for each flight card
document.querySelectorAll('.flight-card').forEach(card => {
    const decreaseBtn = card.querySelector('.btn-decrease');
    const increaseBtn = card.querySelector('.btn-increase');
    const counterSpan = card.querySelector('.counter');
    const bookBtn = card.querySelector('.book-now-btn');

    decreaseBtn.addEventListener('click', () => {
        let count = parseInt(counterSpan.textContent, 10);
        if (count > 1) count--;
        counterSpan.textContent = count;
    });

    increaseBtn.addEventListener('click', () => {
        let count = parseInt(counterSpan.textContent, 10);
        count++;
        counterSpan.textContent = count;
    });

    bookBtn.addEventListener('click', function() {
        const id = bookBtn.getAttribute('data-id');
        const name = bookBtn.getAttribute('data-name');
        const image = bookBtn.getAttribute('data-image');
        const price = parseFloat(bookBtn.getAttribute('data-price'));
        // Always get the current count from the counter span
        const count = parseInt(counterSpan.textContent, 10);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += count;
        } else {
            cart.push({ id, name, image, price, quantity: count });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        counterSpan.textContent = 1; // Reset counter after adding to cart
        renderCartModal();
        $('#cartModal').modal('show');
    });
});

// Update cart badge
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.space-cart .badge-danger').textContent = count;
}

// Search functionality for flight cards
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const flights = document.querySelectorAll(".flight-card");
  let visibleCount = 0;

  flights.forEach((flight) => {
    const title = flight.querySelector("h5")?.textContent.toLowerCase() ?? "";
    const description = flight.querySelector("p.card-text-uneven, p.card-text-even")?.textContent.toLowerCase() ?? "";
    const style = flight.querySelector(".details-uneven p:nth-child(2), .mt-3 p:nth-child(2)")?.textContent.toLowerCase() ?? "";
    const tags = flight.querySelector(".details-uneven p:nth-child(3), .mt-3 p:nth-child(3)")?.textContent.toLowerCase() ?? "";
    const date = flight.querySelector(".details-uneven p:nth-child(4), .mt-3 p:nth-child(4)")?.textContent.toLowerCase() ?? "";

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

  const resultsInfo = document.getElementById("resultsInfo");
  if (visibleCount === 0) {
    resultsInfo.textContent = "No results found";
  } else {
    resultsInfo.textContent = `Showing 1-${visibleCount} of ${visibleCount} results`;
  }
});

// Filter flights by price < 50000 and search query
document.getElementById('filterBtn').addEventListener('click', function () {
    console.log('Filter button clicked');
    const queryInput = document.getElementById("searchInput");
    const query = queryInput ? queryInput.value.toLowerCase().trim() : "";
    const cards = Array.from(document.querySelectorAll('.flight-card'));
    let visibleCount = 0;

    cards.forEach(card => {
        const price = parseFloat(card.querySelector('.book-now-btn').getAttribute('data-price'));
        const title = card.querySelector("h5, .card-title-uneven, .card-title-even")?.textContent.toLowerCase() ?? "";
        const description = card.querySelector("p.card-text-uneven, p.card-text-even")?.textContent.toLowerCase() ?? "";
        const style = card.querySelector(".details-uneven p:nth-child(2), .details-even p:nth-child(2)")?.textContent.toLowerCase() ?? "";
        const tags = card.querySelector(".details-uneven p:nth-child(3), .details-even p:nth-child(3)")?.textContent.toLowerCase() ?? "";
        const date = card.querySelector(".details-uneven p:nth-child(4), .details-even p:nth-child(4)")?.textContent.toLowerCase() ?? "";

        // Combine search and filter: must match search AND price < 50000
        const matchesSearch = (
            !query ||
            title.includes(query) ||
            description.includes(query) ||
            style.includes(query) ||
            tags.includes(query) ||
            date.includes(query)
        );
        const matchesFilter = price < 50000;

        if (matchesSearch && matchesFilter) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update results info
    const resultsInfo = document.getElementById("resultsInfo");
    resultsInfo.textContent = visibleCount === 0
        ? "No results found"
        : `Showing 1-${visibleCount} of ${cards.length} results`;
});

// --- Modal Cart Logic (unchanged) ---
function renderCartModal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let $tbody = $('#cartModal .cart-table tbody');
    let total = 0;
    $tbody.empty();

    if (cart.length === 0) {
        $tbody.append('<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>');
        $('#cartModalTotal').text('R 0.00');
        return;
    }

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        $tbody.append(`
            <tr>
                <td><img src="${item.image}" alt="${item.name}" style="width: 60px;"></td>
                <td>${item.name}</td>
                <td>R ${item.price.toLocaleString()}</td>
                <td>${item.quantity}</td>
                <td>R ${subtotal.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm btn-remove-modal" data-id="${item.id}">Remove</button>
                </td>
            </tr>
        `);
    });

    $('#cartModalTotal').text('R ' + total.toLocaleString());
}

// Show modal and render cart when cart icon is clicked
$(document).on('click', '.space-cart', function() {
    renderCartModal();
});

// Remove item from modal
$(document).on('click', '.btn-remove-modal', function() {
    let id = $(this).data('id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartModal();
    updateCartBadge();
});