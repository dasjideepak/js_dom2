let id = 0;

let bookInput = document.querySelector(".add-book");
let hideAll = document.querySelector("#hide");
let addBookForm = document.querySelector("#add-book");
let search = document.querySelector(".search")
let ul = document.querySelector("ul");

// Array of Books 
let allBooks = JSON.parse(localStorage.getItem('bookly')) || [];

// Add Book
function addBook(event) {
    event.preventDefault();
    if(bookInput.value.length > 0) {
        let newBook = {
            bookName: bookInput.value,
            id: id++
        }
        bookInput.value = "";
        allBooks.push(newBook); // update sst
        createUI(allBooks);
    }
}

// Display Books
function createUI(books) {
    let booksUI = books.map(book => {
        return `<li>
        <label data-id = ${book.id} class = "name subname">${book.bookName}</label>
        <span data-id = ${book.id} class="delete">Delete</span>
        </li>`
    })
    ul.innerHTML = booksUI.join("");
    localStorage.setItem('bookly', JSON.stringify(allBooks));
}

// Delete Book
function deleteBook(event) {
    if(event.target.classList.contains("delete")) {
        let id = event.target.dataset.id;
        allBooks = allBooks.filter(book => book.id != id);
        createUI(allBooks);
    }
    localStorage.setItem('bookly', JSON.stringify(allBooks));
}

// Hide Show All Books
function hideShowBook(event) {
    if (hide.checked) {
        return createUI([]);
    } else {
        return createUI(allBooks);
    }
}    

// Search Book
function searchBook(event){
    let filteredBooks = allBooks.filter(book => {
        return book.bookName.toLowerCase().includes(event.target.value.toLowerCase());
    });
        createUI(filteredBooks);
    }

// Adding Event Listeners
addBookForm.addEventListener('submit', addBook);
ul.addEventListener('click', deleteBook);
hideAll.addEventListener('click', hideShowBook);
search.addEventListener('keyup', searchBook)