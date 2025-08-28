const CHANGE_TYPE = {
  UP: "UP",
  DOWN: "DOWN",
};
const ERROR_TYPE = {
  NOT_FOUND: "NOT_FOUND",
  NOT_POSSIBLE: "NOT_POSSIBLE",
  INVALID_INPUT: "INVALID_INPUT",
};
let numbers = [4, 6, 10, 23, 0, 24, 30, 2];

const numbersContainer = document.getElementById('numbers-container');

const itemInput = document.getElementById('item-input');
const countInput = document.getElementById('count-input');
const submitBtn = document.getElementById('submit-btn');
const errorContainer = document.getElementById('error-container');

function renderNumbers() {
  numbersContainer.innerHTML = numbers.map(number => (`<span>${number}</span>`)).join('');

}

function showError(type) {
  errorContainer.innerHTML = `<p id="error">${type}</p>`;
}

function clearError() {
  errorContainer.innerHTML = '';
}

function moveItem(item, count, type) {
  const index = numbers.indexOf(item);

  if (index === -1) {
    showError(ERROR_TYPE.NOT_FOUND);
    return false;
  }

  let newIndex;
  if (type === CHANGE_TYPE.UP) {
    newIndex = index + count;
  } else {
    newIndex = index - count;
  }

  if (newIndex < 0 || newIndex >= numbers.length) {
    showError(ERROR_TYPE.NOT_POSSIBLE);
    return false;
  }

  numbers.splice(index, 1);
  numbers.splice(newIndex, 0, item);
  return true;
}

submitBtn.addEventListener('click', () => {
  clearError();

  const itemValue = parseInt(itemInput.value);
  const countValue = parseInt(countInput.value);
  const typeValue = document.querySelector('input[name="type"]:checked').value;

  if (isNaN(itemValue) || isNaN(countValue)) {
    showError(ERROR_TYPE.INVALID_INPUT);
    return;
  }

  const moved = moveItem(itemValue, countValue, typeValue);
  if (moved) {
    renderNumbers();
  }
});

renderNumbers();
