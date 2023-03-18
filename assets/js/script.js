function ReadMore() {
  let points = document.getElementById("points");
  let readMore = document.getElementById("readMore");
  let buttonReadMore = document.getElementById("buttonReadMore");

  if (points.style.display == "none") {
    points.style.display = "inline";
    readMore.style.display = "none";
    buttonReadMore.innerHTML = "Ler mais";
  } else {
    points.style.display = "none";
    readMore.style.display = "inline";
    buttonReadMore.innerHTML = "Ler menos";
  }
}
