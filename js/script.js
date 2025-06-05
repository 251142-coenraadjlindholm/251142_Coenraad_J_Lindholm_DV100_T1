
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

// Cart functionality//
document.addEventListener('DOMContentLoaded', function () {
    // Get the cart badge element//
    const cartBadge = document.querySelector('.space-cart .badge-danger');
    let cartCount = parseInt(cartBadge.textContent, 10) || 0;

    // Add click event to all "Book Now" buttons//
    document.querySelectorAll('.btn-danger').forEach(function(btn) {
        if (btn.textContent.trim().toLowerCase() === 'book now') {
            btn.addEventListener('click', function () {
                cartCount++;
                cartBadge.textContent = cartCount;
            });
        }
    });

    // Optional: Show a message when the cart icon is clicked//
    const cartIcon = document.querySelector('.space-cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            alert('View your cart (feature coming soon)!');
        });
   }
});

// Link to cart page
// document.addEventListener('DOMContentLoaded', function () {
//     // Make the cart icon link to the cart page
//     const cart = document.querySelector('.space-cart');
//     if (cart) {
//         cart.addEventListener('click', function (e) {
//             // Only prevent default if it's not already an <a> with the correct href
//             if (!cart.getAttribute('href')) {
//                 e.preventDefault();
//                 window.location.href = 'pages/cart.html'; // Adjust path if needed
//             }
//         });
//     }
// });

//Cart Page Functionality//
    
    // Simple quantity controls (static demo)//
    document.querySelectorAll('.btn-increase').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var counter = btn.parentElement.querySelector('.counter');
            var value = parseInt(counter.textContent, 10);
            counter.textContent = value + 1;
        });
    });
    document.querySelectorAll('.btn-decrease').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var counter = btn.parentElement.querySelector('.counter');
            var value = parseInt(counter.textContent, 10);
            if (value > 1) counter.textContent = value - 1;
        });
    });
    // Remove row//
    document.querySelectorAll('.btn-danger').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = btn.closest('tr');
            if(row) row.remove();
        });
    });
    // Update total price//
    function updateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(function(item) {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.counter').textContent, 10);
            total += price * quantity;
        });
        document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);
    }
    