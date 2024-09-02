document.addEventListener("DOMContentLoaded", function() {
    const heroButtonsDiv = document.getElementById('heroButtonsDiv');
    const phaseButtonsDiv = document.getElementById('phaseButtonsDiv');
    const opponentButtonsDiv = document.getElementById('opponentButtonsDiv');
    const resultTableBody = document.getElementById('resultTableBody').querySelector('tbody');
    let selectedHero = null;
    let selectedPhase = null;
    let selectedOpponent = null;
  
    const actionColors = {
      "Open Raise/2 bet": "#4CAF50",
      "Open Raise/2 bet bluff": "#d9ead3",
      "Limp": "#ffe599",
      "3 bet value": "#0b5394",
      "3 bet bluff": "#64B5F6",
      "Call": "#ffe599",
      "Fold": "#BCBCBC",
      "4 bet value": "#f44336",
      "4 bet bluff": "#f4cccc"
    };
  
    // Example dataset
    const data = [
      {
        Hero: 'Hero1',
        Phase: 'Phase1',
        Opponent: 'Opponent1',
        Result: [
          { Action: 'Open Raise/2 bet', Range: 'AK, AQ' },
          { Action: '3 bet value', Range: 'QQ, JJ' }
        ]
      },
      // Add more dataset objects here...
    ];
  
    function generateButtons() {
      const heroes = [...new Set(data.map((d) => d.Hero))];
  
      function createHeroButtons() {
        heroButtonsDiv.innerHTML = ""; // Clear existing buttons
  
        heroes.forEach((hero, index) => {
          const button = document.createElement("button");
          button.textContent = hero;
          button.addEventListener("click", () => {
            opponentButtonsDiv.innerHTML = ""; // Clear existing buttons
            phaseButtonsDiv.innerHTML = ""; // Clear existing buttons
            selectedPhase = "";
            clearMatrixHighlights();
  
            filterPhases(hero);
            selectHero(hero, button);
          });
          heroButtonsDiv.appendChild(button);
          if (index < heroes.length - 1) {
            heroButtonsDiv.appendChild(document.createTextNode("   "));
          }
        });
      }
  
      function filterPhases(selectedHero) {
        const filteredPhases = [...new Set(
          data.filter((d) => d.Hero === selectedHero).map((d) => d.Phase)
        )];
        createPhaseButtons(filteredPhases);
      }
  
      function createPhaseButtons(phases) {
        phaseButtonsDiv.innerHTML = ""; // Clear existing buttons
  
        phases.forEach((phase, index) => {
          const button = document.createElement("button");
          button.textContent = phase;
          button.addEventListener("click", () => {
            filterOpponent(phase);
            selectPhase(phase, button);
          });
          phaseButtonsDiv.appendChild(button);
          if (index < phases.length - 1) {
            phaseButtonsDiv.appendChild(document.createTextNode("   "));
          }
        });
      }
  
      function filterOpponent(selectedPhase) {
        const filteredOpponent = [...new Set(
          data
            .filter((d) => d.Hero === selectedHero && d.Phase === selectedPhase)
            .map((d) => d.Opponent)
        )];
        createOpponentButtons(filteredOpponent);
      }
  
      function createOpponentButtons(opponents) {
        opponentButtonsDiv.innerHTML = ""; // Clear existing buttons
  
        opponents.forEach((opponent, index) => {
          const button = document.createElement("button");
          button.textContent = opponent;
          button.addEventListener("click", () => {
            selectOpponent(opponent, button);
          });
          opponentButtonsDiv.appendChild(button);
          if (index < opponents.length - 1) {
            opponentButtonsDiv.appendChild(document.createTextNode("   "));
          }
        });
      }
  
      function selectHero(hero, button) {
        selectedHero = hero;
        filterResults();
        updateButtonStyles("hero", button);
      }
  
      function selectPhase(phase, button) {
        selectedPhase = phase;
        filterResults();
        updateButtonStyles("phase", button);
      }
  
      function selectOpponent(opponent, button) {
        selectedOpponent = opponent;
        filterResults();
        updateButtonStyles("opponent", button);
      }
  
      function updateButtonStyles(type, selectedButton) {
        const container = document.getElementById(`${type}ButtonsDiv`);
        container.querySelectorAll("button").forEach((button) => {
          button.classList.toggle("lightup", button === selectedButton);
        });
      }
  
      function filterResults() {
        resultTableBody.innerHTML = "";
        if (selectedHero && selectedPhase && selectedOpponent) {
          const filteredData = data.filter(
            (d) =>
              d.Hero === selectedHero &&
              d.Phase === selectedPhase &&
              d.Opponent === selectedOpponent
          );
  
          const pokerMatrix = document.getElementById("pokerMatrix").getElementsByTagName('tbody')[0];
          // Clear existing highlights
          clearMatrixHighlights(pokerMatrix);
  
          if (filteredData.length > 0) {
            filteredData[0].Result.forEach((result) => {
              const color = actionColors[result.Action] || "#FFFFFF"; // Default to white if action is not in color mapping
  
              // Highlight corresponding cells in the matrix
              highlightMatrix(result.Range, pokerMatrix, color);
  
              // Add results to the result table
              const row = document.createElement("tr");
              const actionCell = document.createElement("td");
              const rangeCell = document.createElement("td");
              actionCell.textContent = result.Action;
              rangeCell.textContent = result.Range;
              row.appendChild(actionCell);
              row.appendChild(rangeCell);
              resultTableBody.appendChild(row);
            });
          } else {
            const row = document.createElement("tr");
            const noDataCell = document.createElement("td");
            noDataCell.colSpan = 2;
            noDataCell.textContent = "No results found";
            row.appendChild(noDataCell);
            resultTableBody.appendChild(row);
          }
        }
      }
  
      function clearMatrixHighlights(matrix) {
        const cells = matrix.getElementsByTagName('td');
        for (let cell of cells) {
          cell.style.backgroundColor = ""; // Reset the background color
        }
      }
  
      function highlightMatrix(range, matrix, color) {
        const hands = range.split(',').map(hand => hand.trim()); // Split range by commas and trim spaces
  
        console.log("Highlighting hands:", hands);
        
        hands.forEach(hand => {
          if (hand) {
            // Use a more flexible selector in case the data format has slight variations
            const cell = matrix.querySelector(`td[data-hand*='${hand}']`);
            if (cell) {
              console.log(`Highlighting cell for hand: ${hand}`);
              cell.style.backgroundColor = color;
            } else {
              console.warn(`Cell for hand ${hand} not found`);
            }
          }
        });
      }
  
      // Initialize the buttons
      createHeroButtons();
    }
  
    // Initialize the buttons
    generateButtons();
  });
  