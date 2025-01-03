function getFormData() {

  const data = {
    isbn: document.getElementById("isbn").value,
    title: document.getElementById("title").value,
    subtitle: document.getElementById("subtitle").value,
    author: document.getElementById("author").value,
    published: document.getElementById("published").value,
    publisher: document.getElementById("publisher").value,
    pages: document.getElementById("pages").value,
    description: document.getElementById("description").value,
    website: document.getElementById("website").value
  };

  return data;
}
