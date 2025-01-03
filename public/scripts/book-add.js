function createBook() {
  let content;
  let type;
  let position;

  const data = getFormData();
  fetch(`/api/books`, {
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
        content = "book: saved.";
        type = "success";
        position = ["top-0", "end-0"];
        showToast(content, type, position);
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
