//const edadPermitida = 18; 

function valida(input){
    const tipoDeInput = input.dateSet.tipo;
    if( validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

}

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

const validadores = {
    nacimiento: (input) => validacionNacimiento(input),
}

function validacionNacimiento(input){// se crea la funcion
    const fechaCliente = new Date(input.value) //se crea la constante de la fecha que se va a recoger con los parametros new Date(input.value)
    let mensaje = ""; // se crea una varieble let en "blanco" para luego rellenar cuando se cumpla la condicion 
    if (!mayorDeEdad(fechaCliente)){ // se crea una condicion que cuando no cumpla los parametros de la funcion mayorDeEdad muestre el mensaje
        mensaje = "Debes tener por lo menos 18 años"
    }
    input.setCustomValidity(mensaje);// se muestra un input con el mensaje previamente ya descrito  
}

function mayorDeEdad(fecha){// esta funcion es para saber si es mayor de edad
    const fechaActual = new Date() //con esta constante se saca la fecha del dia actual
    const diferenciaFechas = new Date( // y aqui se crea la constante que va a sumarle 18 años a la fecha para poder saber si cumpel con la fecgha requeridqa 
        fecha.getUTCFullYear() + 18, //edadPermitida,
        fecha.getUTCMonth(),
        fecha.getUTCDate(),
    );
    return diferenciaFechas <= fechaActual //aqui se dice que devuelva si la fechaDiferencia es menor que fecha actual si no no da el valor.
}