import 'babel-polyfill';
import { el, setChildren, mount } from 'redom';
import { isValid, getCreditCardNameByNumber } from 'creditcard.js';
import IMask from 'imask';
import mastercard from './assets/images/mastercard.png';
import visa from './assets/images/visa.png';
import 'bootstrap/dist/css/bootstrap.min.css';

el('form', el('div', el('div'), el('div'), el('div'), el('div')), el('div'));

const body = document.getElementsByTagName('body')[0];
body.classList.add('p-4');

const form = el('form');
const container = el('div', {
    className: 'form-row align-items-end mb-3',
});

const wrapperInput1 = el('div', {
    className: 'col-auto',
});

const labelNumberCard = el('label', 'Номер карты', {
    for: 'numberCard',

});

const inputNumberCard = el('input', {
    className: 'form-control mb-2',
    id: 'numberCard',
    placeholder: '0000 0000 0000 0000',
    required: true,
});
const icon1 = el('img', {
    style: 'height:25px;width:35px; align-self:center;display:none',
    src: mastercard,
});
const icon2 = el('img', {
    style: 'height:25px;width:35px; align-self:center;display:none',
    src: visa,
});

mount(labelNumberCard, inputNumberCard);
mount(wrapperInput1, labelNumberCard);
mount(container, wrapperInput1);
mount(container, icon1);
mount(container, icon2);

const wrapperInput2 = el('div', {
    className: 'col-auto',
});

const labelDataEnd = el('label', 'Дата окончания действия', {
    for: 'dataEnd',
});

const inputDataEnd = el('input', {
    className: 'form-control mb-2',
    id: 'dataEnd',
    placeholder: 'MM/ГГ',
    required: true,
});

mount(labelDataEnd, inputDataEnd);
mount(wrapperInput2, labelDataEnd);
mount(container, wrapperInput2);

const wrapperInput3 = el('div', {
    className: 'col-auto',
});
const labelCvc = el('label', 'CVC/CVV', {
    for: 'labelCvc',
});

const inputCvc = el('input', {
    className: 'form-control mb-2',
    id: 'cvc',
    placeholder: 'CVC/CVV',
    required: true,
});
mount(labelCvc, inputCvc);
mount(wrapperInput3, labelCvc);
mount(container, wrapperInput3);

const wrapperInput4 = el('div', {
    className: 'col-auto',
});
const labelEmail = el('label', 'Email', {
    for: 'inputEmail',
});

const inputEmail = el('input', {
    className: 'form-control mb-2',
    type: 'email',
    id: 'inputEmail',
    placeholder: 'Email',
    required: true,
});
mount(labelEmail, inputEmail);
mount(wrapperInput4, labelEmail);
mount(container, wrapperInput4);

const buttonwrapper = el('div');
const button = el('button', 'Оплатить', {
    type: 'submit',
    className: 'btn btn-primary mb-2',
    disabled: true,
});
mount(buttonwrapper, button);

setChildren(form, container, buttonwrapper);
setChildren(window.document.body, form);

const masknumberCard = {
    mask: '0000 0000 0000 0000 00',
};
const maskNumber = IMask(inputNumberCard, masknumberCard);
maskNumber.updateValue();

const maskDataEnd = {
    mask: '00/00',
};
const maskData = IMask(inputDataEnd, maskDataEnd);
maskData.updateValue();

const maskNumberCvc = {
    mask: '000',
};
const maskCvc = IMask(inputCvc, maskNumberCvc);
maskCvc.updateValue();

function showError(input) {
    input.classList.add('is-invalid');
}

const validationMap = {
    numberCard() {
        if (!isValid(inputNumberCard.value)) {
            showError(inputNumberCard);
        }
        if (getCreditCardNameByNumber(inputNumberCard.value) === 'Mastercard') {
            icon1.style.display = 'block';
        }
        if (getCreditCardNameByNumber(inputNumberCard.value) === 'Visa') {
            icon2.style.display = 'block';
        }
    },
    dataEnd() {
        const a = inputDataEnd.value[0];
        const b = inputDataEnd.value[1];
        const c = inputDataEnd.value[3];
        const d = inputDataEnd.value[4];

        const month = a + b;
        const year = Number(`20${c}${d}`);
        const date = new Date();
        let currentMonth = date.getMonth() + 1;
        if (currentMonth < 10) currentMonth = `0${currentMonth}`;
        const currentYear = date.getFullYear();
        if (month > '12' || month < '01' || year < currentYear) {
            showError(inputDataEnd);
        }
        if (month <= currentMonth && year <= currentYear) {
            showError(inputDataEnd);
        }
        if (inputDataEnd.value.length < 5) {
            showError(inputDataEnd);
        }
    },
    cvc() {
        if (inputCvc.value.length < 3) {
            showError(inputCvc);
        }
    },
    inputEmail() {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!inputEmail.value.match(pattern)) {
            showError(inputEmail);
        }
    },
};

const inputs = document.querySelectorAll('.form-control');
inputs.forEach((input) => {
    input.addEventListener('blur', () => {
        validationMap[input.id]();
        const validArr = [];
        inputs.forEach((inp) => {
            validArr.push(inp.value !== '' && !inp.classList.contains('is-invalid'));
            if (!validArr.includes(false)) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });
    });
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', () => {
            inputs[i].classList.remove('is-invalid');
        });
    }
});
