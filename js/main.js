let mainColor = localStorage.getItem("main-color");
if (mainColor != null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document
    .querySelectorAll(".settings-content .option-box ul li ")
    .forEach((li) => {
      li.classList.remove("active");
      if (li.dataset.color === mainColor) {
        li.classList.add("active");
      }
    });
}

let colorList = document.querySelectorAll(
  ".settings-content .option-box ul li "
);
colorList.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    activeHandle(e);

    localStorage.setItem("main-color", e.target.dataset.color);
  });
});

let backgroundoption = true;
let intervalBg;

let checkBgOptionLocalStorage = localStorage.getItem("bgOption");

if (checkBgOptionLocalStorage !== null) {
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
    if (checkBgOptionLocalStorage == "true") {
      backgroundoption = true;
      document.querySelector(".random-background .yes").classList.add("active");
    } else {
      backgroundoption = false;
      document.querySelector(".random-background .no").classList.add("active");
    }
  });
}

let backgroundSpan = document.querySelectorAll(".random-background span");

backgroundSpan.forEach((span) => {
  span.addEventListener("click", function (e) {
    activeHandle(e);

    if (e.target.dataset.background == "yes") {
      backgroundoption = true;
      makeRandomImg();
      localStorage.setItem("bgOption", true);
    } else {
      localStorage.setItem("bgOption", false);
      backgroundoption = false;
      clearInterval(intervalBg);
    }
  });
});

let settingIcon = document.querySelector(".gearIcon i");
let settingBox = document.querySelector(".settings-box");
settingIcon.onclick = function () {
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};

let landingPage = document.querySelector(".landing-page");
let images = [
  "bg-1.jpg",
  "bg-2.jpg",
  "bg-3.jpg",
  "bg-4.jpg",
  "bg-5.jpg",
  "bg-6.jpg",
];

function makeRandomImg() {
  if (backgroundoption == true) {
    intervalBg = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * images.length);
      landingPage.style.backgroundImage = `url(img/${images[randomNumber]}`;
    }, 5000);
  }
}

makeRandomImg();

let timeline = document.querySelector(".timeline");
let timelineLeft = document.querySelectorAll(".left");
let timelineRight = document.querySelectorAll(".right");

let skills = document.querySelector(".skills");

window.onscroll = function () {
  let scrolling = window.scrollY;
  let spacingOutDiv = skills.offsetTop;
  let divHeight = skills.offsetHeight;
  let pageHeight = window.innerHeight;

  if (scrolling >= spacingOutDiv + divHeight - pageHeight) {
    document
      .querySelectorAll(".skill-box .skill-progress span")
      .forEach((span) => {
        span.style.width = span.dataset.progress;
      });
  }

  if (window.scrollY >= timeline.offsetTop - 500) {
    timelineLeft.forEach((e) => {
      e.classList.add("move");
    });

    timelineRight.forEach((e) => {
      e.classList.add("move");
    });
  }
};

let imagesGallery = document.querySelectorAll(".gallery .img-box img");
imagesGallery.forEach((img) => {
  img.addEventListener("click", (element) => {
    console.log(element.target.src);

    let mainDiv = document.createElement("div");
    mainDiv.className = "light-box-container";

    let imgBox = document.createElement("div");
    imgBox.className = "imgBox";

    let img = document.createElement("img");
    img.src = element.target.src;
    imgBox.appendChild(img);
    mainDiv.appendChild(imgBox);

    document.body.appendChild(mainDiv);

    if (element.target.alt.length > 0) {
      let imgtitle = document.createElement("h3");
      imgtitle.className = "img-title";
      let imgtitleTxt = document.createTextNode(element.target.alt);
      imgtitle.appendChild(imgtitleTxt);

      imgBox.prepend(imgtitle);
    }

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    let closeBtnTxt = document.createTextNode("X");
    closeBtn.appendChild(closeBtnTxt);
    imgBox.appendChild(closeBtn);
  });
});

document.addEventListener("click", (ele) => {
  if (ele.target.className === "close-btn") {
    document.querySelector(".light-box-container").remove();
  }
});

let allLinks = document.querySelectorAll(".landing-page .links a");
let bullets = document.querySelectorAll(".bullets-box .bullet");

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

scrollToSection(allLinks);
scrollToSection(bullets);

let showBullets = document.querySelectorAll(".show-bullets span");

let displayBulletsLocalStorage = localStorage.getItem("display-bullets");

if (displayBulletsLocalStorage !== null) {
  if (displayBulletsLocalStorage == "block") {
    document.querySelector(".bullets-box").style.display = "block";

    showBullets.forEach((span) => {
      span.classList.remove("active");
      if (span.dataset.bullet == "yes") {
        span.classList.add("active");
      }
    });
  } else {
    document.querySelector(".bullets-box").style.display = "none  ";
    showBullets.forEach((span) => {
      span.classList.remove("active");
      if (span.dataset.bullet == "no") {
        span.classList.add("active");
      }
    });
  }
}

showBullets.forEach((span) => {
  span.addEventListener("click", function (e) {
    activeHandle(e);
    if (e.target.dataset.bullet == "yes") {
      document.querySelector(".bullets-box").style.display = "block";
      localStorage.setItem("display-bullets", "block");
    } else {
      document.querySelector(".bullets-box").style.display = "none";
      localStorage.setItem("display-bullets", "none");
    }
  });
});

function activeHandle(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}

document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("bgOption");
  localStorage.removeItem("display-bullets");
  localStorage.removeItem("main-color");
  window.location.reload();
};

let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu.classList.toggle("active-menu");
  links.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleMenu.classList.toggle("active-menu");
      links.classList.toggle("open");
    }
  }
});

let nav = document.querySelector(".nav-bar");

var headroom = new Headroom(nav, {
  tolerance: 5,
  offset: 100,
});
// initialise
headroom.init();


$(document).ready(function () {
  $('.loader').fadeOut(1000,function(){
    $('.loadingPage').fadeOut(1000)
    $('body').css('overflow','auto')
  })
});

new WOW().init();