const setEditModal = (isbn) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/api/books/${isbn}`, false);
  xhttp.send();
  const book = JSON.parse(xhttp.responseText).data;

  const {
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website
  } = book;
  // filling information about the book in the form inside the modal
  document.getElementById("isbn").value = isbn;
  document.getElementById("title").value = title;
  document.getElementById("subtitle").value = subtitle;
  document.getElementById("author").value = author;
  document.getElementById("published").value = published;
  document.getElementById("publisher").value = publisher;
  document.getElementById("pages").value = pages;
  document.getElementById("description").value = description;
  document.getElementById("website").value = website;
  // setting up the action url for the book
  document.getElementById("editForm").action = `/api/books/${isbn}`;
};

const save = () => {
  document.forms[0].submit();
}

const deleteBook = (isbn) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `/api/books/${isbn}`, false);
  xhttp.send();

  location.reload();
};

const loadBooks = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/api/books", false);
  xhttp.send();
  const books = JSON.parse(xhttp.responseText).data;

  for (let book of books) {
    const x = `
          <div class="col-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                      <div>Author: ${book.author}</div>
                      <div>Publisher: ${book.publisher}</div>
                      <div>Number Of Pages: ${book.pages}</div>

                      <hr>

                      <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#editBookModal" 
                        onClick="setEditModal(${book.isbn})"
                      >Edit</button>
                  </div>
              </div>
          </div>
      `;

    document.getElementById("books").innerHTML =
      document.getElementById("books").innerHTML + x;
  }
};

loadBooks();
