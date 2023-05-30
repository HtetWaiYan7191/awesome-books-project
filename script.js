/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class BookManager {
  constructor() {
    this.storeBook = JSON.parse(localStorage.getItem('Books')) || [];
    this.bookContainer = document.querySelector('.books-container');
    this.errorMess = document.getElementById('error-message');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addBookBtn = document.getElementById('add-book');
    this.listBtn = document.getElementById('list');
    this.listAddBtn = document.getElementById('list-add-new');
    this.listContactBtn = document.getElementById('list-contact');
    this.mainSection = document.getElementById('main');
    this.addBookSection = document.getElementById('add-new');
    this.contactSection = document.getElementById('contact');

    this.addBookBtn.addEventListener('click', this.addBook.bind(this));
    this.listBtn.addEventListener('click', this.showMainSection.bind(this));
    this.listAddBtn.addEventListener('click', this.showAddBookSection.bind(this));
    this.listContactBtn.addEventListener('click', this.showContactSection.bind(this));

    this.showBook();
  }

  showBook() {
    this.bookContainer.innerHTML = '';
    this.storeBook.forEach((bookData, index) => {
      const addedBook = document.createElement('div');
      const bookName = `
        <div class="books d-flex justify-content-between align-items-center p-3">
          <div class="title-author">
            <span>"${bookData.title}"</span>
            <span> by ${bookData.author}</span>
          </div>
          <button class="btn remove-btn" onclick="bookManager.removeBook(${index})">Remove</button>
        </div>
      `;
      addedBook.innerHTML = bookName;
      this.bookContainer.appendChild(addedBook);
    });
  }

  addBook() {
    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();
    if (title === '' || author === '') {
      this.errorMess.textContent = 'Please make sure to fill both title and author names';
    } else {
      const book = new Book(title, author);
      this.storeBook.push(book);
      localStorage.setItem('Books', JSON.stringify(this.storeBook));
      this.titleInput.value = '';
      this.authorInput.value = '';
      this.showBook();
    }
  }

  removeBook(index) {
    this.storeBook.splice(index, 1);
    localStorage.setItem('Books', JSON.stringify(this.storeBook));
    this.showBook();
  }

  showMainSection() {
    this.mainSection.style.display = 'block';
    this.addBookSection.style.display = 'none';
    this.contactSection.style.display = 'none';
  }

  showAddBookSection() {
    this.addBookSection.style.display = 'block';
    this.mainSection.style.display = 'none';
    this.contactSection.style.display = 'none';
  }

  showContactSection() {
    this.contactSection.style.display = 'block';
    this.addBookSection.style.display = 'none';
    this.mainSection.style.display = 'none';
  }
}

const bookManager = new BookManager();
