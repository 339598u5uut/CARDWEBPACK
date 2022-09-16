import { validationMap, inputs, createForm } from "./index.js";

const testsMap = {
  numberCard() {
    describe("Валидация номера карты пропускает корректный номер карты", () => {
      test("содержит только цифры", () => {
        expect(validationMap.numberCard("4111111111100031")).toBe(true);
        expect(validationMap.numberCard("4111111,111000d-")).toBe(false);
      });
      test("не пропускает строку с недостаточным количеством цифр", () => {
        expect(validationMap.numberCard("411111")).toBe(false);
      });
      test("не пропускает строку со слишком большим количеством цифр", () => {
        expect(
          validationMap.numberCard(
            "411111111110003111111111111111111111111111111111111111111111111"
          )
        ).toBe(false);
      });
    });
  },
  dataEnd() {
    test("Дата окончания действия карты содержит корректные значения месяц/год", () => {
      expect(validationMap.dataEnd("29/24")).toBe(false);
      expect(validationMap.dataEnd("01/10")).toBe(false);
    });
  },
  cvc() {
    describe("Валидация CVC", () => {
      test("пропускает строку с тремя цифровыми символами", () => {
        expect(validationMap.cvc("411")).toBe(true);
      });
      test("не пропускает строки с 1-2 цифровыми символами", () => {
        expect(validationMap.cvc("4")).toBe(false);
        expect(validationMap.cvc("41")).toBe(false);
      });
      test("не пропускает строки с 4+ цифровыми символами", () => {
        expect(validationMap.cvc("4111")).toBe(false);
        expect(validationMap.cvc("41111")).toBe(false);
      });
      test("не пропускает строки с тремя нецифровыми символами(латиница, кириллица и знаки препинания)", () => {
        expect(validationMap.cvc("41d")).toBe(false);
        expect(validationMap.cvc("41в")).toBe(false);
        expect(validationMap.cvc("41,")).toBe(false);
      });
    });
  },
  inputEmail() {
    describe("Валидация Email", () => {
      test("содержит @ и .", () => {
        expect(validationMap.inputEmail("11@mail.ru")).toBe(true);
        expect(validationMap.inputEmail("11.mail.ru")).toBe(false);
        expect(validationMap.inputEmail("11@mail")).toBe(false);
      });
    });
  },
};

inputs.forEach((input) => {
  testsMap[input.id]();
});
