const textEditor = document.getElementById('text-editor');
const clearButton = document.getElementById('clear-button');

const STORAGE_KEY = 'text-editor-content';


function loadText() {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (savedText) {
      textEditor.value = savedText;
    }
}

function saveText() {
  localStorage.setItem(STORAGE_KEY, textEditor.value);
}

function clearText() {
  textEditor.value = '';
  saveText();
}


textEditor.addEventListener('input', saveText);
clearButton.addEventListener('click', clearText);

loadText();
