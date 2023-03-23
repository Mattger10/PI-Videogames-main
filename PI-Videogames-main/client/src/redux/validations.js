export default function validation(input){
    //Defino un objeto al cual le vamos a pasar todos los errores que detectemos
    let errors = {};

    //Valido 
    if(!input.name){
        errors.name = "Se requiere un nombre";
    }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
        errors.name = "Solo se acepta letras, números, guiones y paréntesis"
    }else if(input.name.length > 20){
        errors.name = "El nombre ha excedido los 20 caracteres permitidos";
    }
    if(!input.description){
        errors.description = "Se requiere un descripción";
    }else if(input.description.length > 100){
        errors.description = "La descripción tiene un máximo de 100 caracteres";
    }
    if(!input.released){
        errors.released = "La fecha es requerida";
    }
    if(!input.rating){
        errors.rating = "El rating es requerido";
    }else if(input.rating >= 5 || input.rating <= 0){
        errors.rating = "La calificación debe ser entre 0 a 5";
    }
    if(!input.image){
        errors.image = "La URL de la imagen es obligatoria";
    }
    if(!input.platforms){
        errors.platforms = "Se requiere al menos una plataforma";
    }
    return errors;
}