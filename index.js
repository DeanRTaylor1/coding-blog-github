const pastelColors = [
  "#FFD1DC", // Pink
  "#D1FFD4", // Mint Green
  "#FFFFD1", // Light Yellow
  "#D1D4FF", // Lavender
  "#FFD1D1", // Light Coral
  "#D1F6FF", // Baby Blue
  "#FCE4D6", // Peach
  "#D4D1FF", // Periwinkle
  "#D1FFFE", // Aqua
  "#E8D2FC", // Mauve
];

const blogPosts = [
  {
    title: "Building an express api - basic setup",
    readTime: "10 min",
    prerequisites:
      "JavaScript, Node.js, Express, TypeScript, classes, Lintin, ESLint, Prettier, Yarn, npm, pnpm",
    url: "2023-express-api-1/index.html",
    color: "#FED9B7",
  },
  {
    title: "Building an express api - API Design",
    readTime: "15 min",
    prerequisites: "JavaScript, Node.js, Express, JWT",
    color: "#B5EAD7",
  },
  {
    title: "Building an express api - adding auth routes",
    readTime: "15 min",
    prerequisites: "JavaScript, Node.js, Express, JWT",
    color: pastelColors[0],
  },
];

window.onload = function () {
  const blogList = document.getElementById("blog-list");
  blogPosts.forEach((post, i) => {
    blogList.innerHTML += `
      <a href="${window.location.href + post.url}">    
      <div class="blog-card" style="background-color: ${
        pastelColors[i % pastelColors.length]
      }; position: relative;">
          <i class="fa fa-arrow-up-right-dots fa-3x;" style="position: absolute; top: 12px; right: 12px; font-size: 28px;"></i>
          <h2 class="blog-title">${post.title}</h2>
          <div>
          <p class="prerequisites">Prerequisites: ${post.prerequisites}</p>
          <p class="read-time">Estimated Read Time: ${post.readTime}</p>
          </div>
      </div></a>
        `;
  });
};
