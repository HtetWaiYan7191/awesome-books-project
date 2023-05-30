/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const bookContainer = document.querySelector('.books-container');
const addBookBtn = document.getElementById('add-book');
const errorMess = document.getElementById('error-message');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookManager {
  constructor() {
    this.books = this.getFromLocalStorage();
  }

  addBook(title, author) {
    const book = new Books(title, author);
    this.books.push(book);
    this.saveToLocalStorage();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('Books', JSON.stringify(this.books));
  }

  getFromLocalStorage() {
    const storeBook = JSON.parse(localStorage.getItem('Books')) || [];
    return storeBook;
  }
}

const bookCollection = new BookManager();

function showBook() {
  bookContainer.innerHTML = '';
  bookCollection.getFromLocalStorage().forEach((bookData, index) => {
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
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
    showBook();
  }
}

function removeBook(index) {
  bookCollection.removeBook(index);
  showBook();
}

addBookBtn.addEventListener('click', addBook);

showBook();

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