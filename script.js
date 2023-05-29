const addBookBtn = document.getElementById('add-book');
const storeBook = [];
const bookContainer = document.querySelector('.books-container');
const errorMess = document.getElementById('error-message');
let getData = JSON.parse(localStorage.getItem('Books'));
// class Books {
//     constructor (title,author) {
//         this.title = title;
//         this.author = author;
//     }
// }
const bookObj = {
    title:'title',
    author:'author',
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    if(title === '' || author === ''){
        errorMess.textContent = 'Please make sure to fill both title and authors names';
    }
    else {
        const newBook = {
            title:title,
            author:author,
        }
        const book = Object.assign({},newBook);
        storeBook.push(book)
        // Adding local storage part
        const storeBookStorage = {
            books:storeBook,
        };
        localStorage.setItem('Books',JSON.stringify(storeBook));
            // book.title = title;
            // book.author = author;
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        let getData = JSON.parse(localStorage.getItem('Books'));
        showBook(storeBook,getData);
    }  
};






function showBook(storeBook,getData) {
    bookContainer.innerHTML = ``;
    if(getData !== null){
        getData.forEach((bookData,index) => {
            let addedBook = document.createElement('div');
            let bookName = `
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
        })
    }
    else {
      return ;
    }
}

function removeBook(index) {
    // bookCollection.books.splice(index, 1);
    getData.splice(index,1);
    localStorage.setItem('Books',JSON.stringify(getData));
    showBook(storeBook,getData)
     
}
addBookBtn.addEventListener('click',addBook)

//Control which section to show 
const list = document.getElementById('list')
const listAdd = document.getElementById('list-add-new')
const listContact = document.getElementById('list-contact');
//Three main section 
const mainSection = document.getElementById('main');
const addBookSection = document.getElementById('add-new');
const contactSection = document.getElementById('contact');

list.addEventListener('click',() => {
    mainSection.style.display = "block";
    addBookSection.style.display = "none";
    contactSection.style.display = "none";
})

listAdd.addEventListener('click',() => {
    addBookSection.style.display = "block";
    mainSection.style.display = "none";
    contactSection.style.display = "none";
})

listContact.addEventListener('click',() => {
    contactSection.style.display = "block"
    addBookSection.style.display = "none";
    mainSection.style.display = "none";
})

window.addEventListener('load',showBook(storeBook,getData))

// let data = localStorage.getItem("Books");
// let dataArr = JSON.parse(data);
// console.log(dataArr[0].title)

