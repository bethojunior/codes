class ElementProperty {

    /**
     * Tira a visibilidade do elemento da tela dependedo a condição
     * @param elements
     * @param invisible
     */
    visibleElements(elements, visible = true) {
        const _that = this;
        elements.map(elementName => {
            _that.getElement(elementName, element => {
                element.style.display = (visible) ?  "block" : "none";
            })
        })

    }

    /**
     * retorna elementos in array
     * @param name
     * @returns array
     */
    getElements(name) {
        const option = name.substring(0, 1);

        name = name.substring(1, name.length);

        switch (option) {
            case "#" : {
                let element = document.getElementById(name);
                if (element === null)
                    return [];
                return [element];
            }

            case "." : {
                let elements = document.getElementsByClassName(name);
                return Object.keys(elements).map(index => elements[index]);
            }

            default : {
                return [];
            }
        }
    }

    /**
     * retorna o elemento
     * @param name
     * @param callback
     */
    getElement(name, callback) {
        this.getElements(name).map(callback);
    }

    /**
     * Adicionar eventos no elemento
     * @param description
     * @param event
     * @param callback
     */
    addEventInElement(description, event, callback) {
        this.getElements(description).map(element => {
            element[event] = callback;
        })

    }

}

const elementProperty = new ElementProperty();

class Modal {

    constructor(reference) {
        elementProperty.getElement(reference, element => {
            this.element = element;

            this.element.onclick = () => {
                this.close();
            };

            for (let i = 0; i < element.childNodes.length; i++) {
                element.childNodes[i].onclick = (e) => {
                    e.stopPropagation();
                };
            }
        });

    }

    open() {
        this.element.classList.add('show');
    }

    close() {
        if (this.element.classList.contains('show')) {
            this.element.classList.remove('show');
        }
    }

}

class Mask {

    static setMaskPhone(name) {
        $(name).mask(function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        }, {
            onKeyPress: function (val, e, field, options) {
                field.mask(function (val) {
                    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
                }.apply({}, arguments), options);
            }
        });
    }


    static digitsToTheLeft(amount, text) {
        return ("00" + text).slice(-amount);
    }

    /**
     *
     * @param value {Number}
     * @returns {string}
     */
    static maskMoney(value) {

        let number = value.toFixed(4).split(".");

        number = parseFloat(`${number[0]}.${number[1].slice(0, 2)}`);

        number = number.toFixed(2).split('.');
        number[0] = number[0].split(/(?=(?:...)*$)/).join('.');
        return number.join(',');
    }

    static setMaskCpf(name) {
        $(name).mask('000.000.000-00', {reverse: true});
    }


    /**
     *
     * @param nameElement {String}
     */
    static setMoneyField(nameElement) {
        const elementProperty = new ElementProperty();

        elementProperty.getElement(nameElement, element => {
            element.type = 'tel';
            element.value = '0,00';
            element.setAttribute("max-value", "100000");
        });

        elementProperty.addEventInElement(nameElement, "onclick", function () {
            this.selectionStart = this.selectionEnd = this.value.toString().length;
        });

        elementProperty.addEventInElement(nameElement, "onkeyup", function (event) {

            const maxValue = parseFloat(this.getAttribute("max-value"));

            const valueText = this.value.replace(/\./g, "").replace(/\,/g, ".");

            let digit = 10;

            if (!valueText.includes(".")) {
                digit = 0.01;
            }
            if (event.keyCode === 8) {
                digit = 0.1;
            }
                /*if ([13, 229].includes(event.keyCode)) {
                digit = 1;
            }*/
            const newValue = parseFloat(valueText) * digit;

            const value = newValue > maxValue ? maxValue : newValue;

            if (isNaN(value))
                return;

            const valueInArray = value.toFixed(2).toString().replace(/\./g, ",").split(",");

            const valueRest = valueInArray[1];

            const valueInteger = valueInArray[0];

            let newValueFormat = "";

            valueInteger.split("").reverse().map((number, index) => {
                if (index !== 0 && index % 3 === 0) {
                    newValueFormat = "." + newValueFormat;
                }

                newValueFormat = number + newValueFormat;
            });

            newValueFormat = newValueFormat + "," + valueRest;

            this.value = newValueFormat;

        });
    }

    /**
     *
     * @param elementName {String}
     * @param value {number}
     */
    static setMaxValue(elementName, value) {
        const elementProperty = new ElementProperty();

        elementProperty.getElement(elementName, element => {
            element.setAttribute("max-value", value)
        })
    }

    /**
     * retorna o valor sem mascara
     * @param value {String}
     * @returns {number}
     */
    static removeMaskMoney(value) {
        return parseFloat(value.replace(/\./g, "").replace(/\,/g, "."));
    }
}

class Session {

    static get(name) {
        if (localStorage.getItem(name) === null) {
            return [];
        }
        return JSON.parse(localStorage.getItem(name));
    }

    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }

    static delete(name) {
        localStorage.removeItem(name);
    }

    static setAttribute(nameStorage, property, newValue) {

        const data = Session.get(nameStorage);

        if (Array.isArray(data)) {
            Session.set(nameStorage, data.map(object => {
                object[property] = newValue;
                return object;
            }));
            return;
        }

        data[property] = newValue;

        Session.set(nameStorage, data);
    }

    static getValueInSession(id,attribute){
        const session = Session.get(id);

        if(Array.isArray(session))
            return session.map(item => {
                return item[attribute];
            });

        return session[attribute];

    }

}

class readScroll{
    static scrollBottom(reference){
        return new Promise(resolve => {
            elementProperty.addEventInElement(reference, "onscroll", function () {
                if (this.scrollHeight - this.scrollTop === this.clientHeight) {
                    resolve(true);
                }
            }); 
        });
    };
}

function getByUrl(position = 0 , after = 0 , before = 0) {
    let url = window.location.href;
    url = url.toString();
    let length = (url.split("/").length - 1);
    url = url.split("/");
    let path =  url[length - 1] + '/' + url[length];
    path = path.split("?");
    path = path[position];
    return path.substr(after , before);
}