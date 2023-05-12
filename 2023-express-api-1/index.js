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
    title: "Title 2",
    content: [
      { type: "text", content: "Content 2" },
      {
        type: "code",
        content: `
        import express, { Express } from "express";
import dotenv from "dotenv";
import { AppConfig } from "./lib/types/types";

export class App {
  private app: Express;
  constructor(config: AppConfig) {
    dotenv.config();
    this.app = express();
    if (config.port) {
      this.app.set("port", config.port);
    }
  }

  public getExpressApp(): Express {
    return this.app;
  }
}

(() => {
  dotenv.config();
  if (!process.env.DEV_PORT) {
    throw new Error("Missing environment variables");
  }
  const app = new App({ port: "3000" });
  app.getExpressApp().listen(() => {
    console.log("Listening on port " + app.getExpressApp().get("port"));
  });
})();

      `,
      },
    ],
    image: "",
    class: "even-slide",
  },
  {
    title: "Title 3",
    content: [
      { type: "text", content: "Content 2" },
      {
        type: "code",
        content: `
            export class App {
              private app: Express;
              constructor() {
                this.app = express();
                this.setupApiRoutes();
            }
            
              public getExpressApp(): Express {
                return this.app;
              }
            
              private setupApiRoutes() {
                const apiRouter = Router();
            
                apiRouter.use("/users", (req: Request, res: Response) => {
                  console.log("users");
                  res.send("Success");
                });
            
                return apiRouter;
              }
            
              public start(port: string) {
                this.app.listen(port, () => {
                  console.log(
                    colors.BgCyan + "Server is running on port " + port + colors.Reset
                  );
                });
              }
            }
          `,
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
      let item = generator.generateCodeContent(slideData.content[i].content);
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
    this.setTextContent(item, text);
    return item;
  }

  generateCodeContent(code) {
    let item = this.createHTMLElement("div");
    this.setClass(item, "embossed-container");
    let windowControls = this.createWindowControls();
    this.appendChild(item, windowControls);

    let pre = this.createHTMLElement("pre");
    let codeElement = this.createHTMLElement("code");
    this.setClass(codeElement, "language-typescript");
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
