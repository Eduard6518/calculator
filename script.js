const input = {
    INPUT: document.querySelector("#container > input"),

    write(text) {
        this.INPUT.value += text;
    },

    clear() {
        this.INPUT.value = '';
    },

    evaluate() {
        let expression = this.INPUT.value
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/\^/g, '**')
            .replace(/π/g, '3.14')
            .replace(/%/g, ' / 100')
            .replace(/mod/g, '%')
            .replace(/√(\d+)/g, (_, expression) => Math.sqrt(eval(expression)))
            .replace(/√\(([^)]+)\)/g, (_, expression) => Math.sqrt(eval(expression)));
        try {
            let value = eval(expression);

            if ([NaN, Infinity, undefined].includes(value)) {
                input.placeholder(value);
                input.clear();
            } else {
                return this.INPUT.value = value;
            }
        } catch (error) {
            this.clear();

            // To Write Second Part Of An Error

            // example:
            // -- TypeError: reason
            // error.split(':')[1]
            // -- reason
            this.placeholder(error.split(': ')[1]);

            return 0;
        }
    },

    placeholder(text) {
        this.INPUT.setAttribute('placeholder', text);
    }
};

document.querySelectorAll('#container > button').forEach(button => {
    button.addEventListener('click', () => {   
        let INPUT = document.querySelector("#container > input");


        if (button.textContent === '=') {
            INPUT.setAttribute("placeholder", "");

            input.evaluate();
        } else if (button.textContent == "AC") {
            input.clear();
            INPUT.setAttribute("placeholder", "");
        } else if ( button.textContent == "←") {
            if (INPUT.value.endsWith(" mod ")) {
                INPUT.value = INPUT.value.slice(0, -5);
            } else if (INPUT.value.endsWith(" ")) {
                INPUT.value = INPUT.value.slice(0, -3);
            } else {
                INPUT.value = INPUT.value.slice(0, -1);
            }
        } else {
            input.write(button.textContent);
            input.placeholder("");
        }
    });
});

window.addEventListener('keydown', event => {
    let key = event.key;
    
    if (key == "Enter") {
        input.evaluate();
    }
});