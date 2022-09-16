import "babel-polyfill";
import { isValid, getCreditCardNameByNumber } from "creditcard.js";
import IMask from "imask";
import "bootstrap/dist/css/bootstrap.min.css";
import { createForm } from "./dom.js";

let formValidation = createForm();
const masknumberCard = {
  mask: "0000 0000 0000 0000 00",
};
const maskNumber = IMask(formValidation.inputNumberCard, masknumberCard);
maskNumber.updateValue();

const maskDataEnd = {
  mask: "00/00",
};
const maskData = IMask(formValidation.inputDataEnd, maskDataEnd);
maskData.updateValue();

const maskNumberCvc = {
  mask: "000",
};
const maskCvc = IMask(formValidation.inputCvc, maskNumberCvc);
maskCvc.updateValue();

function showError(input) {
  input.classList.add("is-invalid");
}

export const validationMap = {
  numberCard(value) {
    const isNumberValid = isValid(value);
    if (!isNumberValid) {
      showError(formValidation.inputNumberCard);
    }
    if (getCreditCardNameByNumber(value) === "Mastercard") {
      formValidation.icon1.style.display = "block";
    }
    if (getCreditCardNameByNumber(value) === "Visa") {
      formValidation.icon2.style.display = "block";
    }
    return isNumberValid;
  },
  dataEnd(value) {
    const a = value[0];
    const b = value[1];
    const c = value[3];
    const d = value[4];

    const month = a + b;
    const year = Number(`20${c}${d}`);
    const date = new Date();
    let currentMonth = date.getMonth() + 1;
    if (currentMonth < 10) currentMonth = `0${currentMonth}`;
    const currentYear = date.getFullYear();
    if (
      month > "12" ||
      month < "01" ||
      year < currentYear ||
      (month <= currentMonth && year <= currentYear) ||
      formValidation.inputDataEnd.value.length < 5
    ) {
      showError(formValidation.inputDataEnd);
      return (value = false);
    }
    return (value = true);
  },
  cvc(value) {
    if (value.length < 3 || value.length > 3 || !Number(value)) {
      showError(formValidation.inputCvc);
      return (value = false);
    }
    return (value = true);
  },
  inputEmail(value) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!value.match(pattern)) {
      showError(formValidation.inputEmail);
      return (value = false);
    }
    return (value = true);
  },
};

export const inputs = document.querySelectorAll(".form-control");
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validationMap[input.id](input.value);
    const validArr = [];
    inputs.forEach((inp) => {
      validArr.push(inp.value !== "" && !inp.classList.contains("is-invalid"));
      if (!validArr.includes(false)) {
        formValidation.button.removeAttribute("disabled");
      } else {
        formValidation.button.setAttribute("disabled", true);
      }
    });
  });
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focus", () => {
      inputs[i].classList.remove("is-invalid");
    });
  }
});
