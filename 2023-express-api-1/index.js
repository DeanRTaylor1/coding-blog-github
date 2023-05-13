// Array of blog content objects
const colorsArr = ["red", "yellow", "green"];

let blogContent = [
  {
    title: "Building an express api",
    content: [{ type: "text", content: "2023 edition part 1" }],
    image: "",
    class: "title-slide",
  },
  {
    title: "Getting Started",
    content: [
      {
        type: "text",
        content: `
        In light of the frequent updates to TypeScript, JavaScript, Node.js, and a myriad of other tools, I thought it would be useful to walk through the current best practices for implementing a RESTful API in Node.js with Express and TypeScript. As we progress, I'll aim to explain the steps succinctly and clearly.

        The first step in our journey is to set up the project. For this task, I'll be using Yarn as my package manager, primarily because it's what I've been using in my latest projects. However, if you're more familiar with npm or pnpm, feel free to use those instead - the commands should be practically identical. Let's get started by running the following commands in your project's root directory:`,
      },
      {
        type: "code",
        content: `
        yarn init
yarn add --dev typescript
npx eslint --init
      `,
        language: "bash",
      },
    ],
    image: "",
    class: "even-slide",
  },
  {
    title: "Setting up Linting",
    content: [
      {
        type: "text",
        content: `
      In this guide, we will set up linting by adding the following configuration to an .eslintrc.js file:

      The module.exports object is a special construct in Node.js, which exports the configuration for ESLint.

The env key defines the environments your code will run in. These environments, such as browser or Node.js, bring with them certain pre-defined global variables. For example, es2021: true signifies that ES2021 global variables and syntax should be recognized.

The extends key allows us to extend a base configuration file or shareable configuration. In this case, it's extending "eslint:recommended", which includes ESLint's recommended rules, and "plugin:@typescript-eslint/recommended", which provides a recommended set of rules for TypeScript.

The parser key tells ESLint to use the "@typescript-eslint/parser", which converts TypeScript into an Abstract Syntax Tree (AST) that ESLint can understand.

The root: true key indicates that this is the root configuration file, and ESLint should not look further up the directory tree for any other configuration files.

The ignorePatterns key is an array of file patterns that ESLint should ignore during linting.

Finally, the plugins and rules keys specify the ESLint plugins to use and the custom rules to apply, respectively. In this case, we are using the "@typescript-eslint" plugin and have no custom rules defined.
      
      `,
      },
      {
        type: "code",
        content: `
        module.exports = {
          env: {
            browser: true,
            es2021: true,
            node: true,
            jest: true,
          },
          extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
          overrides: [],
          parser: "@typescript-eslint/parser",
          parserOptions: {
            ecmaVersion: "latest",
          },
          root: true,
          ignorePatterns: [".eslintrc.js", ".js"],
          plugins: ["@typescript-eslint"],
          rules: {},
        };
        
          `,
        language: "javascript",
      },
    ],
    image: "",
    class: "odd-slide",
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

const getSlideClass = (currentSlide) => {
  if (currentSlide === 0) {
    return "title-slide";
  }
  if (currentSlide % 2 === 0) {
    return "even-slide";
  }
  return "odd-slide";
};

function generateSlideHTML(slideData) {
  const generator = new HTMLGenerator();
  let { mainContainer, contentContainer } = generator.createSlideContainer(
    getSlideClass(currentSlide),
    slideData.title
  );

  for (let i = 0; i < slideData.content.length; i++) {
    if (slideData.content[i].type === "text") {
      let item = generator.generateTextContent(slideData.content[i].content);
      generator.appendChild(contentContainer, item);
    } else if (slideData.content[i].type === "code") {
      let item = generator.generateCodeContent(
        slideData.content[i].content,
        slideData.content[i].language
      );
      generator.appendChild(contentContainer, item);
    }
  }

  return mainContainer.outerHTML;
}

class HTMLGenerator {
  createHTMLElement(type) {
    return document.createElement(type);
  }

  setTextContent(element, text) {
    element.textContent = text;
  }

  setClass(element, className) {
    element.className = className;
  }

  appendChild(parent, child) {
    parent.appendChild(child);
  }

  createWindowControls() {
    let windowControls = this.createHTMLElement("div");
    this.setClass(windowControls, "window-controls");
    let spanArr = [];
    for (let i = 0; i < 3; i++) {
      let span = this.createHTMLElement("span");
      this.setClass(span, `control-circle ${colorsArr[i]}`);
      this.appendChild(windowControls, span);
      spanArr.push(span);
    }

    return windowControls;
  }

  createSlideContainer(className, titleText) {
    let mainContainer = this.createHTMLElement("div");
    this.setClass(mainContainer, className);

    let title = this.createHTMLElement("h1");
    this.setTextContent(title, titleText);
    this.appendChild(mainContainer, title);

    let contentContainer = this.createHTMLElement("div");
    this.setClass(contentContainer, "container");
    this.appendChild(mainContainer, contentContainer);

    return { mainContainer, contentContainer };
  }

  generateTextContent(text) {
    let item = this.createHTMLElement("div");
    this.setClass(item, "text-content");

    let lines = text.split("\n").filter((line) => line.trim() !== "");
    for (let line of lines) {
      let p = this.createHTMLElement("p");
      this.setTextContent(p, line);
      this.appendChild(item, p);
    }

    return item;
  }

  generateCodeContent(code, language) {
    console.log(code, language);
    let item = this.createHTMLElement("div");
    this.setClass(item, "embossed-container");
    let windowControls = this.createWindowControls();
    this.appendChild(item, windowControls);

    let pre = this.createHTMLElement("pre");
    let codeElement = this.createHTMLElement("code");
    this.setClass(codeElement, `language-${language}`);
    this.setTextContent(codeElement, code);

    this.appendChild(pre, codeElement);
    this.appendChild(item, pre);

    return item;
  }
}

function changeSlide(direction) {
  let content = document.getElementById("content");
  let oldClass = getSlideClass(currentSlide);

  if (direction === 1) {
    content.className = oldClass + " slide-out-left";
  } else {
    content.className = oldClass + " slide-out-right";
  }

  currentSlide += direction;

  if (currentSlide < 0) currentSlide = blogContent.length - 1;
  if (currentSlide >= blogContent.length) currentSlide = 0;

  setTimeout(() => {
    let newClass = getSlideClass(currentSlide);
    let newContentHTML = generateSlideHTML(blogContent[currentSlide]);
    console.log(newContentHTML);

    content.innerHTML = newContentHTML;
    Prism.highlightAll();
    if (direction === 1) {
      content.className = newClass + " slide-in-right";
    } else {
      content.className = newClass + " slide-in-left";
    }
  }, 250); // Wait for the 'slide out' animation to finish
}
