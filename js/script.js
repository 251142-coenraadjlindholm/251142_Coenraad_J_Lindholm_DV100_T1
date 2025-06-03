let count = 0;

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

   document.getElementById("searchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("searchInput").value.toLowerCase().trim();
        const flights = document.querySelectorAll(".flight-card");
        let visibleCount = 0;

        flights.forEach((flight) => {
          // Collect searchable text from title, description, style, tags, date
          const title = flight.querySelector("h5").textContent.toLowerCase();
          const description = flight.querySelector("p.card-text-uneven, p.card-text-even").textContent.toLowerCase();
          const style = flight.querySelector(".details-uneven p:nth-child(2), .mt-3 p:nth-child(2)").textContent.toLowerCase();
          const tags = flight.querySelector(".details-uneven p:nth-child(3), .mt-3 p:nth-child(3)").textContent.toLowerCase();
          const date = flight.querySelector(".details-uneven p:nth-child(4), .mt-3 p:nth-child(4)").textContent.toLowerCase();

          // Check if query is found in any of these fields
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

        // Update results info text
        const resultsInfo = document.getElementById("resultsInfo");
        if (visibleCount === 0) {
          resultsInfo.textContent = "No results found";
        } else {
          resultsInfo.textContent = `Showing 1-${visibleCount} of ${visibleCount} results`;
        }
      });