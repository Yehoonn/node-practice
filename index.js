let button = document.getElementById("button");

button.addEventListener("click", () => {
  if (document.body.style.backgroundColor === "salmon") {
    document.body.style.backgroundColor = "lightgreen";
  } else {
    document.body.style.backgroundColor = "salmon";
  }
});
