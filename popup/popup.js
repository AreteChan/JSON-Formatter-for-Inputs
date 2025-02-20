import { isJSON, formatJSON } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('jsonInput');

  textarea.addEventListener('input', () => {
    const value = textarea.value.trim();

    if (isJSON(value)) {
      const formattedJSON = formatJSON(value);
      textarea.value = formattedJSON;
    }
  });
});