document.querySelector("#create-toast").addEventListener("click", function () {
  document
    .querySelector("#toast-container")
    .classList.remove("top-0", "end-0", "bottom-0", "start-0");

  var content =
    document.querySelector("input[name=content]").value != ""
      ? document.querySelector("input[name=content]").value
      : "Lorem ipsum dolor sit amet";

  var type =
    document.querySelector("select[name=type]").value != ""
      ? document.querySelector("select[name=type]").value
      : "success";

  var position =
    document.querySelector("select[name=position]").value != ""
      ? document.querySelector("select[name=position]").value.split(",")
      : ["top-0", "end-0"];

  showToast(content, type, position);
});
