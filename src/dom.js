import { el, setChildren, mount } from "redom";
import mastercard from "./assets/images/mastercard.png";
import visa from "./assets/images/visa.png";
import "bootstrap/dist/css/bootstrap.min.css";

export function createForm() {
  const body = document.getElementsByTagName("body")[0];
  body.classList.add("p-4");
  const form = el("form");

  const container = el("div", {
    className: "form-row align-items-end mb-3",
  });

  const wrapperInput1 = el("div", {
    className: "col-auto",
  });

  const labelNumberCard = el("label", "Номер карты", {
    for: "numberCard",
  });

  const inputNumberCard = el("input", {
    className: "form-control mb-2",
    id: "numberCard",
    placeholder: "Номер карты",
    required: true,
  });

  const icon1 = el("img", {
    style: "height:25px;width:35px; align-self:center;display:none",
    src: mastercard,
  });
  const icon2 = el("img", {
    style: "height:25px;width:35px; align-self:center;display:none",
    src: visa,
  });

  mount(labelNumberCard, inputNumberCard);
  mount(wrapperInput1, labelNumberCard);
  mount(wrapperInput1, labelNumberCard);
  mount(container, wrapperInput1);
  mount(container, icon1);
  mount(container, icon2);

  const wrapperInput2 = el("div", {
    className: "col-auto",
  });

  const labelDataEnd = el("label", "Дата окончания действия", {
    for: "dataEnd",
  });

  const inputDataEnd = el("input", {
    className: "form-control mb-2",
    id: "dataEnd",
    placeholder: "MM/ГГ",
    required: true,
  });

  mount(labelDataEnd, inputDataEnd);
  mount(wrapperInput2, labelDataEnd);
  mount(container, wrapperInput2);

  const wrapperInput3 = el("div", {
    className: "col-auto",
  });
  const labelCvc = el("label", "CVV/CVC", {
    for: "labelCvc",
  });

  const inputCvc = el("input", {
    className: "form-control mb-2",
    id: "cvc",
    placeholder: "CVV/CVC",
    required: true,
  });
  mount(labelCvc, inputCvc);
  mount(wrapperInput3, labelCvc);
  mount(container, wrapperInput3);

  const wrapperInput4 = el("div", {
    className: "col-auto",
  });
  const labelEmail = el("label", "Email", {
    for: "inputEmail",
  });

  const inputEmail = el("input", {
    className: "form-control mb-2",
    type: "email",
    id: "inputEmail",
    placeholder: "Email",
    required: true,
  });
  mount(labelEmail, inputEmail);
  mount(wrapperInput4, labelEmail);
  mount(container, wrapperInput4);

  const buttonwrapper = el("div");
  const button = el("button", "Оплатить", {
    type: "submit",
    className: "btn btn-primary mb-2",
    disabled: true,
  });
  mount(buttonwrapper, button);
  setChildren(form, container, buttonwrapper);
  setChildren(window.document.body, form);

  return {
    form,
    container,
    inputNumberCard,
    inputDataEnd,
    inputCvc,
    inputEmail,
    icon1,
    icon2,
    button,
  };
}
createForm();
