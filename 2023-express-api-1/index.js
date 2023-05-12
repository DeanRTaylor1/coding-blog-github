// Array of blog content objects
let blogContent = [
  {
    title: "Building an express api",
    content: "2023 edition part 1",
    class: "title-slide",
  },
  {
    title: "Title 2",
    content: "Content 2",
    class: "slide",
  },
];

let currentSlide = 0;

window.onload = function () {
  console.log(blogContent[currentSlide]);
  document.getElementById("content").innerHTML = generateSlideHTML(
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
  return (
    `<div class="${slideData.class}">` +
    "<h1>" +
    slideData.title +
    "</h1><p>" +
    slideData.content +
    "</p></div>"
  );
}

function changeSlide(direction) {
  let content = document.getElementById("content");
  let oldClass = blogContent[currentSlide].class;

  if (direction === 1) {
    content.className = oldClass + " slide-out-left";
  } else {
    content.className = oldClass + " slide-out-right";
  }

  currentSlide += direction;

  if (currentSlide < 0) currentSlide = blogContent.length - 1;
  if (currentSlide >= blogContent.length) currentSlide = 0;

  setTimeout(() => {
    let newClass = blogContent[currentSlide].class;
    let newContentHTML = generateSlideHTML(blogContent[currentSlide]);

    content.innerHTML = newContentHTML;
    if (direction === 1) {
      content.className = newClass + " slide-in-right";
    } else {
      content.className = newClass + " slide-in-left";
    }
  }, 250); // Wait for the 'slide out' animation to finish
}
