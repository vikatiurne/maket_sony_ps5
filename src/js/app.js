import * as flsFunction from "./modules/function.js";

flsFunction.isWebp();

// счетчик на корзине
const btns = document.querySelectorAll(".btn-basket");
const count = document.querySelector(".basket_qty");
let num = 0;
for (let btn of btns) {
  btn.addEventListener("click", () => {
    count.classList.add("basket_on");
    num++;
    count.innerHTML = num;
  });
}
const cleanBasket = document.querySelector(".basket");
cleanBasket.addEventListener("click", () => {
  count.classList.remove("basket_on");
  num = 0;
});

// inbox медиа замена элементов местами

if (document.documentElement.clientWidth < 1250) {
  const pult = document.querySelector(".pult");
  const clon = pult.cloneNode(true);
  let placePaste = document.querySelector(".inbox-item2");
  placePaste.append(clon);
  pult.remove();
}
if (document.documentElement.clientWidth < 915) {
  const controller = document.querySelector(".controller");
  const clon2 = controller.cloneNode(true);
  let placePaste2 = document.querySelector(".inbox-item1");
  placePaste2.append(clon2);
  controller.remove();
  const cons = document.querySelector(".inbox-elems");
  const consName = cons.nextSibling.nextSibling;
  const clone3 = consName.cloneNode(true);
  cons.append(clone3);
  consName.remove();
}

// feature
const buttons = document.querySelectorAll(".block_btn-item");
const content = document.querySelectorAll(".block__content-item");
for (let button of buttons) {
  button.addEventListener("click", () => {
    for (let button of buttons) {
      button.classList.remove("block_btn-item--active");
    }
    button.classList.toggle("block_btn-item--active");
    for (let item of content) {
      item.style.display = "none";
    }
    let attr = button.getAttribute("data-button");
    let pair = document.querySelector(`#${attr}`);
    pair.style.display = "grid";
  });
}

// brand
// порог наблюдения за целью(1 полностью видна)
let options = {
  threshold: [1],
};
// наблюдатель
const callback = (entry) => {
  const anim = document.querySelector(".brand__name");
  entry.forEach((el) => {
    if (el.isIntersecting) {
      anim.classList.add("brand__name_show");
    } else {
      anim.classList.remove("brand__name_show");
    }
  });
};
let observer = new IntersectionObserver(callback, options);
// цель наблюдателя
let target = document.querySelector(".brand__logo");
observer.observe(target);

// top перенос строки в title
let title = document.querySelector(".title");
if (document.documentElement.clientWidth < 768) {
  title.innerHTML = "Sony </br> PlayStation 5";
}
if (document.documentElement.clientWidth < 520) {
  title.innerHTML = "Sony PS5";
}

// burger
const menu = document.querySelector(".menu");
if (document.documentElement.clientWidth < 1100) {
  menu.classList.add("menu__open");
  menu.classList.remove("menu");
}
if (document.documentElement.clientWidth < 576) {
  menu.classList.add("menu");
  menu.classList.remove("menu__open");
}
const burger = document.querySelector(".menu__burger");
const owerlay = document.querySelector("#owerlay");
const menuOpen = document.querySelector(".menu__open-burger");
const page = document.body;
const toggleMobile = () => {
  burger.classList.toggle("menu__cross");
  burger.classList.toggle("menu__burger");
  menu.classList.toggle("menu__open-burger");
  menu.classList.toggle("menu");
  owerlay.classList.toggle("owerlay");
  page.classList.toggle("tiurne");
};

burger.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobile();
});

window.addEventListener("click", () => {
  if (page.classList.contains("tiurne")) toggleMobile();
});
menuOpen.addEventListener("click", (event) => {
  event.stopPropagation();
});
