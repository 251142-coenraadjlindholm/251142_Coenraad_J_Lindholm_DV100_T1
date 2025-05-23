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