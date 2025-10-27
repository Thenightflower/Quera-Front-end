class WordSearch {
  constructor(grid) {
    // Store the grid (2D array) of letters where the word search happens
    this.grid = grid;
    this.numRows = grid.length;
    this.numCols = grid[0].length;
  }

  find(word) {
    const grid = this.grid;
    const numRows = this.numRows;
    const numCols = this.numCols;
    const wordLength = word.length;

    // Search Left to Right in rows
    for (let r = 0; r < numRows; r++) {
      const rowStr = grid[r].join("");
      let index = rowStr.indexOf(word);
      if (index >= 0) {
        // Found word
        const positions = [];
        for (let i = 0; i < wordLength; i++) {
          positions.push([r, index + i]);
        }
        return positions;
      }
    }

    // Search Right to Left in rows
    for (let r = 0; r < numRows; r++) {
      const rowReversed = grid[r].slice().reverse();
      const rowStrRev = rowReversed.join("");
      let index = rowStrRev.indexOf(word);
      if (index >= 0) {
        const positions = [];
        for (let i = 0; i < wordLength; i++) {
          positions.push([r, numCols - 1 - (index + i)]);
        }
        return positions;
      }
    }

    // Search Top to Bottom in columns
    for (let c = 0; c < numCols; c++) {
      let colStr = "";
      for (let r = 0; r < numRows; r++) {
        colStr += grid[r][c];
      }
      let index = colStr.indexOf(word);
      if (index >= 0) {
        const positions = [];
        for (let i = 0; i < wordLength; i++) {
          positions.push([index + i, c]);
        }
        return positions;
      }
    }

    // Search Bottom to Top in columns
    for (let c = 0; c < numCols; c++) {
      let colStrRev = "";
      for (let r = numRows - 1; r >= 0; r--) {
        colStrRev += grid[r][c];
      }
      let index = colStrRev.indexOf(word);
      if (index >= 0) {
        const positions = [];
        for (let i = 0; i < wordLength; i++) {
          positions.push([numRows - 1 - (index + i), c]);
        }
        return positions;
      }
    }

    // Word not found
    return null;
  }
}

function updateGrid() {
  const gridInput = document.getElementById("grid-input").value;
  // Split into lines
  const lines = gridInput.trim().split("\n");
  // Create grid
  const grid = lines.map((line) => line.trim().split(""));
  // Store grid for later use
  window.currentGrid = grid;
  // Get the word-grid div
  const wordGrid = document.getElementById("word-grid");
  // Clear previous content
  wordGrid.innerHTML = "";
  // Get number of columns
  const numCols = grid[0].length;
  // Set grid-template-columns
  wordGrid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  // Create grid elements
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = document.createElement("div");
      cell.textContent = grid[r][c];
      cell.setAttribute("data-row", r);
      cell.setAttribute("data-col", c);
      wordGrid.appendChild(cell);
    }
  }
  // Hide matrix-input section, show game section
  document.getElementById("matrix-input").style.display = "none";
  document.getElementById("game").style.display = "block";
}

function findWord() {
  const word = document.getElementById("word-input").value.trim();
  // Clear previous highlights
  const highlightedCells = document.querySelectorAll("#word-grid .highlight");
  highlightedCells.forEach((cell) => cell.classList.remove("highlight"));
  // Check if word is empty
  if (word === "") {
    document.getElementById("result").textContent =
      "Please enter a word to find.";
    return;
  }
  // Create WordSearch instance
  const wordSearch = new WordSearch(window.currentGrid);
  const positions = wordSearch.find(word);
  const resultDiv = document.getElementById("result");
  if (positions) {
    // Word found
    resultDiv.textContent = `Result for "${word}": Found`;
    // Highlight positions
    positions.forEach((pos) => {
      const [r, c] = pos;
      const selector = `#word-grid div[data-row='${r}'][data-col='${c}']`;
      const cell = document.querySelector(selector);
      if (cell) {
        cell.classList.add("highlight");
      }
    });
  } else {
    // Word not found
    resultDiv.textContent = `Result for "${word}": Not found`;
  }
}
