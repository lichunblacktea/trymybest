document.addEventListener("DOMContentLoaded", function() {
  const heroButtonsDiv = document.getElementById('heroButtonsDiv');
  const phaseButtonsDiv = document.getElementById('phaseButtonsDiv');
  const opponentButtonsDiv = document.getElementById('opponentButtonsDiv');
  const resultTableBody = document.getElementById('resultTableBody');
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

  let data = [];

  // Async function to fetch data from the API
  async function fetchdata() {
      try {
          const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=CyCibHlvNZIOFPEU7sRMb_lV54YOMcfKTNF_rBQfkD4Cs2QS0u8T7Y-tqbs-U4r29zTxqmQakgOnULxtJL8xfwO0qBH7CG9um5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPbMEXUZCJDXm1bpmGFkHHYHgr7z07ns053KlHJEYLRNwf4FXWtMTFfmKZcWEXy12r6jddCWpO8r_bI07UkuYmQ3Kd7jNsvDfA&lib=MI3tAZzqMHFdtA1zn-DIoXzZ71MQqIO1v');
          
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          data = await response.json();
          generateButtons(); // Call generateButtons after data is fetched
  
      } catch (error) {
          console.error('Error:', error);
      }
  }

  function generateButtons() {
      if (data.length === 0) {
          console.warn('Data is not available yet.');
          return;
      }

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
                  //clearMatrixHighlights();

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
              clearMatrixHighlights(pokerMatrix);

              if (filteredData.length > 0) {
                  filteredData[0].Result.forEach((result) => {
                      const color = actionColors[result.Action] || "#FFFFFF"; // Default to white if action is not in color mapping

                      highlightMatrix(result.Range, pokerMatrix, color);

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
          
          hands.forEach(hand => {
              if (hand) {
                  const cell = matrix.querySelector(`td[data-hand*='${hand}']`);
                  if (cell) {
                    
                      cell.style.backgroundColor = color;
                  } else {
                      console.warn(`Cell for hand ${hand} not found`);
                  }
              }
          });
      }

      createHeroButtons(); // Initialize the hero buttons
  }

  fetchdata(); // Fetch data from the API
});
