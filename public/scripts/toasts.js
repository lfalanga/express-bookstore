function showToast(content, type, position) {
  let delay = 3000;
  position.forEach((el) => {
    document.querySelector("#toast-container").classList.add(el);
  });
  let html = `<div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true"><div class="d-flex"><div class="toast-body h6 p-3 m-0">${content}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>`;
  var toast = htmlToElement(html);
  let toastContainer = document.querySelector("#toast-container");
  toastContainer.appendChild(toast);
  var toast = new bootstrap.Toast(toast, { delay: delay, animation: true });
  toast.show();
  setTimeout(() => toast.dispose(), delay + 3000);
}

function htmlToElement(html) {
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}
