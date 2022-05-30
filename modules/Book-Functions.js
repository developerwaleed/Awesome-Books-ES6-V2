export class BookStore {
    constructor() {
        this.objBooks = JSON.parse(localStorage.getItem('bookstore')) || [];
    }

    addBook(title, author) {
        this.objBooks.push({ title, author });
        this.populateLocalStorage();
        this.displayBooks();
    }

    displayBooks() {
        let listOfBooks = '<table class="table table-striped table-sm table-hover">';
        this.objBooks.forEach((book, index) => {
            listOfBooks += `
      <tr>
      <td>${book.title} by ${book.author}</td>
      <td class="d-flex justify-content-end"><button class="btn-delete" id=${index}>Remove</button></td>
      </tr>
        `;
        });
        listOfBooks += '</table>';
        document.querySelector('.list-books').innerHTML = listOfBooks;
        this.registerDeletebuttons();
    }

    registerDeletebuttons() {
        if (this.objBooks.length > 0) {
            const deleteButtons = document.querySelectorAll('.btn-delete');
            deleteButtons.forEach((button) => button.addEventListener('click', this.deleteBook.bind(this)));
        }
    }

    deleteBook(book) {
        this.objBooks.splice(book.target.id, 1);
        this.populateLocalStorage();
        this.displayBooks();
    }
    populateLocalStorage() {
        const data = JSON.stringify(this.objBooks);
        localStorage.setItem('bookstore', data);
    }
}
