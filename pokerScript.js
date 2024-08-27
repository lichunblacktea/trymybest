  // Poker Matrix Initialization
  const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  let selectedHands = [];

  // Get table elements by ID
  const tableBody = document.querySelector('#pokerMatrix tbody');
  const selectionArea = document.getElementById('selectionArea');
  const submitButton = document.getElementById('submitButton');

  // Populate the first row with rank labels
  const headerRow = tableBody.querySelector('tr');
  ranks.forEach(rank => {
    const td = document.createElement('td');
    td.textContent = rank;
    headerRow.appendChild(td);
  });

  // Store cells for easy access
  const cells = {};

  // Populate the matrix
  ranks.forEach((rowRank, i) => {
    const tr = document.createElement('tr');
    
    // Add the rank label at the start of each row
    const rowHeader = document.createElement('td');
    rowHeader.textContent = i === 0 ? `${rowRank}${rowRank}` : `${ranks[0]}${rowRank}o`; // Handle the first column
    tr.appendChild(rowHeader);

    // Fill the row with hand combinations
    ranks.forEach((colRank, j) => {
      const td = document.createElement('td');
      let hand = '';

      if (i === j) {
        hand = `${rowRank}${colRank}`;
        td.className = 'pair';
      } else if (i < j) {
        hand = `${rowRank}${colRank}s`;
        td.className = 'suited';
      } else {
        hand = `${colRank}${rowRank}o`;
        td.className = 'offsuit';
      }

      td.textContent = hand;
      td.setAttribute('data-hand', hand); // Set data-hand attribute for easy querying
      cells[hand] = td; // Store reference to the cell

      // Add click event to select/deselect the hand
      td.addEventListener('click', () => {
        toggleHandSelection(hand);
      });

      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });

  function toggleHandSelection(hand) {
    const td = cells[hand];
    if (td.classList.contains('selected')) {
      td.classList.remove('selected');
      selectedHands = selectedHands.filter(h => h !== hand);
    } else {
      td.classList.add('selected');
      selectedHands.push(hand);
    }
    updateSelectionArea();
  }

  function updateSelectionArea() {
    selectionArea.value = selectedHands.join(', ');
  }

  // Handle submit button click
  submitButton.addEventListener('click', () => {
    submitSelection();
  });

  // Handle "Enter" key press in the textarea
  selectionArea.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent new line in the textarea
      submitSelection();
    }
  });

  function submitSelection() {
    const hands = selectionArea.value.split(',').map(hand => hand.trim());
    highlightHands(hands);
  }

  function highlightHands(hands) {
    // Clear previous selections by resetting all cells to default background
    Object.values(cells).forEach(td => {
      td.className = ''; // Clear all classes except 'selected'
      td.style = '';
    });

    selectedHands = []; // Reset selectedHands array

    // Highlight new selections
    hands.forEach(hand => {
      if (cells[hand]) {
        cells[hand].classList.add('selected');
        selectedHands.push(hand);
      }
    });
    updateSelectionArea(); // Update the textarea to reflect the current selection
  }
