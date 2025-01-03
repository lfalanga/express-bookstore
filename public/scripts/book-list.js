fetchBookList();

function setEditModal(isbn) {
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
    website,
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
}

function updateBook() {
  let content;
  let type;
  let position;

  const data = getFormData();
  fetch(`/api/books/${data.isbn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // console.log("[success:]", data);
        content = "book: updated.";
        type = "success";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
        fetchBookList();
        hideModal();
      } else {
        // console.log("[error:]", data);
        content = data.error;
        type = "warning";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
      }
    })
    .catch((error) => {
      // console.error("[error]:", error);
      content = error.error;
      type = "danger";
      position = ["top-0", "end-0"];
      showToast(content, type, position);
    });
}

function deleteBook(isbn) {
  fetch(`/api/books/${isbn}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // console.log("[success:]", data);
        content = "book: deleted.";
        type = "success";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
        fetchBookList();
      } else {
        // console.log("[error:]", data);
        content = data.error;
        type = "warning";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
      }
    })
    .catch((error) => {
      // console.error("[error]:", error);
      content = error.error;
      type = "danger";
      position = ["top-0", "end-0"];
      showToast(content, type, position);
    });
}

function loadBooks(books) {
  resetBookList();

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
    document.getElementById("books").innerHTML += x;
  }
}

function resetBookList() {
  document.getElementById("books").innerHTML = "";
}

async function fetchBookList() {
  fetch(`/api/books`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // console.log("[success:]", data);
        content = "book list: loaded.";
        type = "success";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
        loadBooks(data.data);
      } else {
        // console.log("[error:]", data);
        content = data.error;
        type = "warning";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
      }
    })
    .catch((error) => {
      // console.error("[error]:", error);
      content = error.error;
      type = "danger";
      position = ["top-0", "end-0"];
      showToast(content, type, position);
    });
}

function hideModal() {
  let myModalEl = document.getElementById("editBookModal");
  let modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}
