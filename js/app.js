import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");// este querySelectorAll funciona para llamar a todo los "input" en este caso

inputs.forEach((input) => {// con for Each se puede llamar a cada uno de los arrays que tenga un avariable asi se reutiliza el codigo
    input.addEventListener("blur", (input) => {
        valida(input.target);
        console.log(valida(input.target));
    });
});
