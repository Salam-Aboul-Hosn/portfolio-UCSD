const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const commentsInputs = document.getElementsByTagName('textarea');
const textareaTag = commentsInputs[0];
const commentsInfo = document.getElementById('character-count');
const commentsMaxLength = textareaTag.getAttribute('maxlength');
const specialCharacterError = document.getElementById(
  'special-character-error'
);

const formErrors = document.getElementById('form-errors');
const forms = document.getElementsByTagName('form');
const form = forms[0];

const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

function setTheme(theme) {
  if (theme === 'dark') {
    moon.style.display = 'none';
    sun.style.display = 'block';
    document.documentElement.classList = 'dark';
    localStorage.setItem('theme', 'dark');
  } else if (theme === 'light') {
    sun.style.display = 'none';
    moon.style.display = 'block';
    document.documentElement.classList = 'light';
    localStorage.setItem('theme', 'light');
  } else {
    throw new Error('invalid theme');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const preferredTheme = localStorage.getItem('theme');
  setTheme(preferredTheme);
});

moon.addEventListener('click', (event) => {
  setTheme('dark');
});

sun.addEventListener('click', (event) => {
  setTheme('light');
});

form.addEventListener('input', (event) => {
  let form_errors = [];

  for (const elementOfForm of form.elements) {
    if (elementOfForm.checkValidity() == false) {
      form_errors.push(`${elementOfForm.validationMessage}`);
    }
  }
  formErrors.value = JSON.stringify(form_errors);
  console.log(form_errors);
});
nameInput.addEventListener('input', (event) => {
  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity('Enter your name since it is a required field');
  } else {
    nameInput.setCustomValidity('');
  }
});

email.addEventListener('input', (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Enter a valid email address with the @ sign.');
  } else {
    email.setCustomValidity('');
  }
});

textareaTag.addEventListener('input', (event) => {
  if (textareaTag.validity.valueMissing) {
    textareaTag.setCustomValidity('Must enter a comment');
  } else {
    textareaTag.setCustomValidity('');
  }
});

textareaTag.addEventListener('input', () => {
  commentsInfo.textContent = `${textareaTag.value.length}/${commentsMaxLength}`;
  commentsInfo.className =
    textareaTag.value.length < commentsMaxLength - 100
      ? ''
      : textareaTag.value.length == commentsMaxLength
      ? 'error'
      : 'warn';

  if (!/^[ -~]*$/.test(textareaTag.value)) {
    textareaTag.setCustomValidity('Please use English characters only.');
    specialCharacterError.textContent = 'Please use English characters only.';
  } else {
    specialCharacterError.textContent = '';
  }
});
