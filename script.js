/* eslint-disable no-unused-vars */
const addBookBtn = document.getElementById('add-book');
const storeBook = JSON.parse(localStorage.getItem('Books')) || [];
const bookContainer = document.querySelector('.books-container');
const errorMess = document.getElementById('error-message');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function showBook() {
  bookContainer.innerHTML = '';
  storeBook.forEach((bookData, index) => {
    const addedBook = document.createElement('div');
    const bookName = `
      <div class="books d-flex justify-content-between align-items-center p-3">
        <div class="title-author">
          <span>"${bookData.title}"</span>
          <span> by ${bookData.author}</span>
        </div>
        <button class="btn remove-btn" onclick="removeBook(${index})">Remove</button>
      </div>
    `;
    addedBook.innerHTML = bookName;
    bookContainer.appendChild(addedBook);
  });
}

function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (title === '' || author === '') {
    errorMess.textContent = 'Please make sure to fill both title and author names';
  } else {
    const book = new Books(title, author);
    storeBook.push(book);
    localStorage.setItem('Books', JSON.stringify(storeBook));
    titleInput.value = '';
    authorInput.value = '';
    showBook();
  }
}

function removeBook(index) {
  storeBook.splice(index, 1);
  localStorage.setItem('Books', JSON.stringify(storeBook));
  showBook();
}

addBookBtn.addEventListener('click', addBook);

// Control which section to show
const list = document.getElementById('list');
const listAdd = document.getElementById('list-add-new');
const listContact = document.getElementById('list-contact');
// Three main sections
const mainSection = document.getElementById('main');
const addBookSection = document.getElementById('add-new');
const contactSection = document.getElementById('contact');

list.addEventListener('click', () => {
  mainSection.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
});

listAdd.addEventListener('click', () => {
  addBookSection.style.display = 'block';
  mainSection.style.display = 'none';
  contactSection.style.display = 'none';
});

listContact.addEventListener('click', () => {
  contactSection.style.display = 'block';
  addBookSection.style.display = 'none';
  mainSection.style.display = 'none';
});

showBook();
