var formulario = document.getElementById('formulario');
var inputs = document.querySelectorAll('#formulario input');
var area = document.querySelectorAll('#formulario textarea');
var opcion = document.querySelectorAll('#formulario select');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, 
    descripcion:/^[a-zA-ZÀ-ÿ0-9\s]{4,500}$/,
    opcion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}

const campos = {
    nombre: false,
	email: false,
	telefono: false,
    descripcion: false,
    opcion: false,
}

function validarFormulario(e){
   switch (e.target.name){
       case "nombre":
        validarcampo(expresiones.nombre, e.target, "nombre")
       break;
       case "telefono":
        validarcampo(expresiones.telefono, e.target, "telefono")
       break;
       case "email":
        validarcampo(expresiones.email, e.target, "email")
       break;
       case "descripcion":
        validarcampo(expresiones.descripcion, e.target, "descripcion")
       break;
       case "opcion":
        validarcampo(expresiones.opcion, e.target, "opcion")
       break;
   }
   
}

function validarcampo (expresion, input, campo){ 
     if(expresion.test(input.value)){
         document.getElementById(campo).classList.remove("error")
         document.querySelector(`#grupo_${campo} .msj`).classList.remove("valida")
         document.getElementById(campo).classList.add("correcto")
         campos[campo] = true;
         document.getElementById('mensaje-error').classList.remove('mensaje-error-activo');
     } else{
         document.getElementById(campo).classList.remove("correcto")
         document.getElementById(campo).classList.add("error")
         document.querySelector(`#grupo_${campo} .msj`).classList.add("valida")
         campos[campo] = false;
         document.getElementById('mensaje-error').classList.remove('mensaje-error-activo');
     } 
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

area.forEach((textarea) => {
	textarea.addEventListener('keyup', validarFormulario);
    textarea.addEventListener('blur', validarFormulario);
});

opcion.forEach((select) => {
	select.addEventListener('keyup', validarFormulario);
    select.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

    if(campos.nombre && campos.telefono && campos.email && campos.descripcion && campos.opcion){
        formulario.reset();

        document.getElementById('mensaje-exito').classList.add('mensaje-exito-activo');
        document.getElementById('btn').classList.add('btn')
		setTimeout(() => {
			document.getElementById('mensaje-exito').classList.remove('mensaje-exito-activo');
            document.getElementById('btn').classList.add('btn');
		}, 5000);

        document.getElementById('mensaje-error').classList.remove('mensaje-error-activo');

        document.querySelectorAll('.correcto').forEach((icono) => {
			icono.classList.remove('correcto');
        });
    } else{
		document.getElementById('mensaje-error').classList.add('mensaje-error-activo');
	}

});