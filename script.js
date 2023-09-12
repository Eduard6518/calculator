for (let button of document.querySelectorAll("button")) {
    switch (button.textContent) {
        // if button's text == "=", eval expression and
        case "=":
            button.addEventListener("click", function() {
                try {
                    var result = eval(
                        document.querySelector("input").value
                            .replaceAll(" % ", " / 100")
                            .replaceAll("mod", "%")
                            .replaceAll("π", " Math.PI ")
                            .replaceAll(/√(\d+)/g, "Math.sqrt($1)")
                            .replaceAll("×", "*")
                            .replaceAll("÷", " / ")
                            .replaceAll("^", "**")
                        );
                } catch {
                    document.querySelector("input").placeholder += result
                }

                if (typeof(result) == "number") {
                    document.querySelector("input").value = result
                } else {
                    document.querySelector("input").placeholder += result
                    document.querySelector("input").value = "";
                }
            });

            break;
        
        // if button's text is "←", remove last symbol
        case "←":
            button.addEventListener("click", function() {
                if (document.querySelector("input").value.length > 0) {
                    if (document.querySelector("input").value.endsWith(" mod ")) {
                        return document.querySelector("input").value = document.querySelector("input").value.slice(0, -5);
                    }

                    return document.querySelector("input").value = document.querySelector("input").value.slice(0, -1);
                } else { return }
            });

            break;
        
        // if button's text is not the one I checked, add him to input
        default:
            button.addEventListener("click", function() {
                document.querySelector("input").value += button.textContent;
            });
    }
    
}