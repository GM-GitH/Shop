window.addEventListener("scroll", function () {
  progressScroll();
});

const progressScroll = () => {
  let scroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scroll / height) * 100;
  document.getElementsByClassName("loading")[0].style.width = progress + "%";
};
const hamburguesa = document.querySelector("#hamburger");
const options = document.querySelectorAll(".nav__menu__a");

options.forEach((option) =>
  option.addEventListener("click", () => {
    hamburguesa.checked = false;
  })
);

document.querySelector(".btn__scroll_up").addEventListener("click", () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 200);
});

const regularExpressionEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // expresión regular email
const button = document.getElementById("submit-btn");
const form = document.querySelector("form");
const urlJSONPlaceholder = "https://jsonplaceholder.typicode.com/posts";
const sendValues = async (url) => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  try {
    if (response.ok) {
      let json = await response.json();
      console.log(json);
      return json;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = (e) => {
  const emailValue = document.getElementById("email").value;
  button.disabled = false;
  regularExpressionEmail.exec(emailValue) // si email coincide con la expresión regular...
    ? (button.disabled = true) // el botón pasa a estar inhabilitado
    : window.alert("Introduce un email válido"); // alert
  e.preventDefault();
  sendValues(urlJSONPlaceholder);
  form.reset();
};
form.addEventListener("submit", handleSubmit);
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");
let totalScreen = document.getElementsByClassName("loading")[0].style.width;
setTimeout(() => {
  if (!sessionStorage.getItem("closed_modal") && !localStorage.getItem("closed_modal")) {
    popup.classList.add("visible");
  }
}, 5000);

window.onscroll = function () {
  const longitud = Math.round((100 * window.scrollY) / (document.body.clientHeight - window.innerHeight));
  totalScreen = `${longitud}%`;
  if (longitud == 25) {
    if (!sessionStorage.getItem("closed_modal") && !localStorage.getItem("closed_modal")) {
      popup.classList.add("visible");
    }
  }
};

close.addEventListener("click", () => {
  popup.classList.add("noVisible");
  sessionStorage.setItem("closed_modal", "1");
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    popup.classList.add("noVisible");
    sessionStorage.setItem("closed_modal", "1");
  }
});

popup.addEventListener("click", (e) => {
  if (e.target.className == "popup-wrapper visible") {
    popup.classList.add("noVisible");
    sessionStorage.setItem("closed_modal", "1");
  }
});

const buttonEmail = document.getElementById("button-email");
const formPopup = document.getElementById("form-popup");
const validEmail = async (url) => {
  const emailValue = document.getElementById("email-popup").value;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: emailValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  try {
    if (response.ok) {
      let json = await response.json();
      console.log(json);
      return json;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSubmitEmail = (e) => {
  const emailValue = document.getElementById("email-popup").value;
  if (regularExpressionEmail.exec(emailValue)) {
    popup.classList.add("noVisible");
    window.alert("Successfully subscribed!");
    sessionStorage.setItem("closed_modal", "1");
  }
  e.preventDefault();
  validEmail(urlJSONPlaceholder);
  formPopup.reset();
};
formPopup.addEventListener("submit", () => {
  handleSubmitEmail();
  localStorage.setItem("closed_modal", "1");
});
formPopup.reset();

/* Conversor de monedas */
const moneyURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
let euro;
let pounds;

// llamada a la API
const callApiMoney = async (url) => {
  const response = await fetch(url, {
    method: "GET",
  });

  try {
    if (response.ok) {
      let json = await response.json();
      euro = json.usd["eur"];
      pounds = json.usd["gbp"];
      return euro, pounds;
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("priceBasic").innerHTML = "$" + 0;
document.getElementById("priceProfessional").innerHTML = "$" + 20;
document.getElementById("pricePremium").innerHTML = "$" + 60;

let selector = document.querySelector(".pricing__currency__select");

callApiMoney(moneyURL);
selector.addEventListener("change", () => {
  let index = selector.selectedIndex;
  if (index === 0) {
    document.getElementById("priceBasic").innerHTML = "£" + Math.round(0 * pounds);
    document.getElementById("priceProfessional").innerHTML = "£" + Math.round(20 * pounds);
    document.getElementById("pricePremium").innerHTML = "£" + Math.round(60 * pounds);
  } else if (index === 1) {
    document.getElementById("priceBasic").innerHTML = Math.round(0 * euro) + "€";
    document.getElementById("priceProfessional").innerHTML = Math.round(20 * euro) + "€";
    document.getElementById("pricePremium").innerHTML = Math.round(60 * euro) + "€";
  } else if (index === 2) {
    document.getElementById("priceBasic").innerHTML = "$" + 0;
    document.getElementById("priceProfessional").innerHTML = "$" + 20;
    document.getElementById("pricePremium").innerHTML = "$" + 60;
  }
});

const slider = document.querySelectorAll("#slider");
const botones = document.querySelectorAll(".slide__btn__container");
const botonesChildren = botones[0].children;
const boton1 = botonesChildren[0];
const boton2 = botonesChildren[1];
const boton3 = botonesChildren[2];
const boton4 = botonesChildren[3];
const arrayBotones = [boton1, boton2, boton3, boton4];
const sliderChildren = slider[0].children;
const image1 = sliderChildren[0];
const image2 = sliderChildren[1];
const image3 = sliderChildren[2];
const image4 = sliderChildren[3];
const arrayImages = [image1, image2, image3, image4];
const arrowRight = document.querySelector("#arrow-right");
const arrowLeft = document.querySelector("#arrow-left");
let indice = 0;

arrowRight.addEventListener("click", () => {
  arrayImages[indice].classList.remove("slide__img--active");
  arrayBotones[indice].classList.remove("slide__btn--active");
  indice++;
  if (indice > arrayImages.length - 1) {
    indice = 0;
  }
  arrayImages[indice].classList.add("slide__img--active");
  arrayBotones[indice].classList.add("slide__btn--active");
});

arrowLeft.addEventListener("click", () => {
  arrayImages[indice].classList.remove("slide__img--active");
  arrayBotones[indice].classList.remove("slide__btn--active");
  indice--;
  if (indice < 0) {
    indice = arrayImages.length - 1;
    boton1.classList.remove("slide__btn--active");
  }
  arrayImages[indice].classList.add("slide__img--active");
  arrayBotones[indice].classList.add("slide__btn--active");
});

let i = 0;
setInterval(function () {
  arrayImages[i].classList.remove("slide__img--active");
  arrayBotones[i].classList.remove("slide__btn--active");
  i++;
  if (i > arrayImages.length - 1) {
    i = 0;
  }
  arrayImages[i].classList.add("slide__img--active");
  arrayBotones[i].classList.add("slide__btn--active");
}, 3200);

arrayBotones.forEach((button) => {
  button.addEventListener("click", () => {
    arrayImages[indice].classList.remove("slide__img--active");
    arrayBotones[indice].classList.remove("slide__btn--active");
    indice++;
    if (indice > arrayImages.length - 1) {
      indice = 0;
    }
    arrayImages[indice].classList.add("slide__img--active");
    arrayBotones[indice].classList.add("slide__btn--active");
  });
});
