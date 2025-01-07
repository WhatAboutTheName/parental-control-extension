const template = document.createElement('template');

template.innerHTML = `
    <style>

        .container_toggle-button {
            min-width: 100%;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .button_toggle-button {
            background-color: #d2d2d2;
            min-width: 80px;
            min-height: 40px;
            border-radius: 100px;
            cursor: pointer;
            position: relative;
            transition: 0.2s;
        }

        .button_toggle-button::before {
            position: absolute;
            content: '';
            background-color: #ffffff;
            min-width: 30px;
            min-height: 30px;
            border-radius: 100px;
            margin: 5px;
            transition: 0.2s;
        }

        input:checked + .button_toggle-button {
            background-color: #5d6cff;
        }

        input:checked + .button_toggle-button::before {
            transform: translateX(40px);
        }

        input {
            display: none;
        }

    </style>

    <label class="container_toggle-button">
        <input type="checkbox" id="check_toggle-button">
        <span class="button_toggle-button"></span>
    </label>
`;

class ToggleButton extends HTMLElement {
    static formAssociated = true;
    _checkbox = null;
    checked = false;

    constructor() {
        super();
        this._internals = this.attachInternals();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._checkbox = this.shadowRoot.querySelector('#check_toggle-button');
        this._checkbox.checked = this.getAttribute('checked');
        this._internals.setFormValue(this._checkbox.checked ? 'on' : null);
        this.checked = this._checkbox.checked;
    }

    connectedCallback() {
        this.addEventListener('click', this._onClick.bind(this));
        this._checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    _syncCheckedValue(isNewChecked) {
        this._internals.setFormValue(isNewChecked ? 'on' : null);
        this._internals.ariaChecked = isNewChecked;
        this.checked = isNewChecked;
    }

    _onClick() {
        const isNewValue = !this._checkbox.checked;
        this._checkbox.checked = isNewValue;
        this._syncCheckedValue(isNewValue);
    }

    get checked() {
        return this._checkbox.hasAttribute('checked');
    }

    set checked(_) {
        this._checkbox.setAttribute('checked');
    }
}

customElements.define('toggle-button', ToggleButton);
