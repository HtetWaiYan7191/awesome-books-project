const addBookBtn = document.getElementById('add-book');
const storeBook = [];
const bookContainer = document.querySelector('.books-container');
const errorMess = document.getElementById('error-message');
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
        const storeBookStorage = {
            books:storeBook,
        };
        localStorage.setItem('Books',JSON.stringify(storeBook));
            // book.title = title;
            // book.author = author;
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        showBook(storeBook);
    }  
}


function showBook(storeBook) {
    bookContainer.innerHTML = ``;
    storeBook.forEach(book => {
        let addedBook = document.createElement('div');
        let data = `
        <div class="books d-flex justify-content-between align-items-center p-3">
        <div class="title-author">
            <span>"${book.title}"</span>
            <span> by ${book.author}</span>
        </div>
        
        <button class="btn remove-btn">Remove</button>
    </div>
        `;
        addedBook.innerHTML = data;
        bookContainer.appendChild(addedBook);
        const removeBookBtn = document.querySelectorAll('.remove-btn');
        removeBookBtn.forEach((btn) => {
            btn.addEventListener('click',(e) => {
                e.target.parentNode.remove();
                let removeTitle = e.target.parentNode.firstElementChild.firstElementChild.textContent;
                // storeBook.pop();
                let data = localStorage.getItem("Books");
                let dataArr = JSON.parse(data);
                console.log(dataArr)
                newArr = dataArr.filter(element =>  {
                    element.title != removeTitle ;
                })
                console.log(newArr)
            });
        })
    });
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

// let data = localStorage.getItem("Books");
// let dataArr = JSON.parse(data);
// console.log(dataArr[0].title)

