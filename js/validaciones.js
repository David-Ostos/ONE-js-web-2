const edadPermitida = 18; 

export function valida(input){ // esta funcion se creo para validar si se los campos estan correctos de no ser asi notifica 
    const tipoDeInput = input.dataset.tipo; // con esta constante guardamos el valor del input de las diferentes etiquetas de date, en este caso "tipo" 
    if( validadores[tipoDeInput]){ // en esta condicion se cumple si el tipo de input esta en validadores dentro del arrays
        validadores[tipoDeInput](input)
    }

    console.log(input.parentElement)
    if (input.validity.valid) { //esta condindicion se utiliza para validar si los valores son correctos
        input.parentElement.classList.remove("input-container--invalid");// si el input es valido se remueve la clase
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container--invalid"); // si no cumple con los valores se agrega la clase
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = { // se abre el arreglo para agregar los emnsajes de error dependiendo del tipo de input
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio" // es una propiedad de validity donde se verifica si esta vacio o no el campo 
    },
    email: { 
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es valido (Ejemplo@dominio.com) " // igual proviene de validity donde se verifica si el correo es true o false
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        patternMismatch: "Debe contener 6 caracteres maximo 12, una letra mayuscula, un numero y no puede poseer caracteres especiales." // igual pero para el patron en el caso de la contrasella que se utilizo un  metodo regexd
    },
    nacimiento: {
        valueMissing:"Este campo no puede estar vacio",
        customError: "Debes tener por lo menos 18 años" }// se verifica que el setCustomValidity sea correcto de lo contrario muestra el mensaje.
}

const validadores = {
    nacimiento: (input) => validacionNacimiento(input),
   
}

function mostrarMensajeDeError(tipoDeInput, input){ //con la funcion tipo de input se busca el data-type del elemento, y el input para saber su contenido
    let mensaje = "";// se pone el mensaje en blanco
    tipoDeError.forEach( error => { //aqui utilizamos este atributo para poder buscar en tipoDeError, y ver si el hay un error ys i lo hay agrega el mensaje que corrsponda
        if (input.validity[error]){/* aqui se agrega la condicional para crear el validador 
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);*/
            mensaje = mensajesDeError[tipoDeInput][error]; //se utiliza la funcion mensajeDeError, para poder obtener los mensajes dependiendo del que sea requerido
        }
    })
    return mensaje

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
        fecha.getUTCFullYear() + edadPermitida,
        fecha.getUTCMonth(),
        fecha.getUTCDate(),
    );
    return diferenciaFechas <= fechaActual //aqui se dice que devuelva si la fechaDiferencia es menor que fecha actual si no no da el valor.
}