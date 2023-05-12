// Array of blog content objects
let blogContent = [
  {
    title: "Title 1",
    content: "Content 1",
  },
  {
    title: "Title 2",
    content: "Content 2",
  },
];

let currentSlide = 0;

window.onload = function () {
  document.getElementById("slideshow").innerHTML = generateSlideHTML(
    blogContent[currentSlide]
  );

  document.getElementById("prev").addEventListener("click", function () {
    changeSlide(-1);
  });

  document.getElementById("next").addEventListener("click", function () {
    changeSlide(1);
  });
};

function generateSlideHTML(slideData) {
  return "<h1>" + slideData.title + "</h1><p>" + slideData.content + "</p>";
}

function changeSlide(direction) {
  currentSlide += direction;

  if (currentSlide < 0) currentSlide = blogContent.length - 1;
  if (currentSlide >= blogContent.length) currentSlide = 0;

  document.getElementById("slideshow").innerHTML = generateSlideHTML(
    blogContent[currentSlide]
  );
}
