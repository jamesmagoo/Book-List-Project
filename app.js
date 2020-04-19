// Book Constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor (Functionality)
function UI(){} //Empty function

// Add Book to List Method
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">X</a></td>
    `;

    list.appendChild(row);

    console.log(row);
}

// Error Method
UI.prototype.showAlert = function(message, className){
    //Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent and insert into DOM
    const container = document.querySelector('.container');
    // Must load element you want to insert before to use 'insertBEfore' method
    const form = document.querySelector('#book-form');
    // Insert
    container.insertBefore(div, form);
    // Dissapear Alert after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}

// Delete Book Method
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners

document.getElementById('book-form').addEventListener('submit',
function(e){
    // Get Form Values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate Book Object
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate

    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add Book to List
        ui.addBookToList(book);

        // Show success alert
        ui.showAlert('Book Added', 'success')

        // Clear Fields

        ui.clearFields();
    }

    e.preventDefault();
})

// Listen for delete

document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();
})