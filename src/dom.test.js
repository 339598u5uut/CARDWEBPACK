import { createForm } from "./dom.js";

describe("Функция createForm должна", () => {
  test("вернуть DOM-элемент, в котором содержится строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, Email", () => {
    const funс = createForm();
    expect(funс.form instanceof HTMLFormElement).toBeTruthy();
    expect(funс.form).toHaveLength(5); //тут 4 инпута и button
    expect(funс.inputNumberCard).toHaveProperty("placeholder", "Номер карты");
    expect(funс.inputDataEnd).toHaveProperty("placeholder", "MM/ГГ");
    expect(funс.inputCvc).toHaveProperty("placeholder", "CVV/CVC");
    expect(funс.inputEmail).toHaveProperty("placeholder", "Email");
  });
});
