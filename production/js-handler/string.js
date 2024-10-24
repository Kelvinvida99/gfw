
// 25/10/2023 marco molina removi la palabra export
function capitalizeFirstLetter(string) { 

 return string.charAt(0).toUpperCase() + string.slice(1); 

}

//esta funcion corta el texto
function cutText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
}

// esta función se utiliza para para crear párrafos resolver problemas de tener todo el texto
// en una sola línea
function formatParra(text, charactersPerLine, maxLines) {
    // Initialize variables
    let formattedText = '';
    let currentLine = '';
    let lines = 0;
    let charactersInLine = 0;

    // Iterate through each character in the input text
    for (const char of text) {
        // Check if the maximum number of lines has been reached
        if (lines >= maxLines) {
            formattedText += '...';
            break;
        }

        // Add the character to the current line
        currentLine += char;
        charactersInLine++;

        // Check if the desired characters per line is reached
        if (charactersInLine >= charactersPerLine) {
            formattedText += currentLine + '\n';

            // Reset the current line and character count
            currentLine = '';
            charactersInLine = 0;

            // Increment the line count
            lines++;
        }
    }

    // Add the last line to the result
    if (currentLine.length > 0) {
        formattedText += currentLine;
    }

    return formattedText;
}


//Esta es una funcion crear parrafos, con un chacho maximo y un alto maximo

// 25/10/2023 marco molina
//remover los caracteres especiales
function removeSpecialCharacters(string) {
    // Utilizamos una expresión regular para eliminar caracteres especiales y espacios
    //^ significa NO, es decir reemplaza todo los caracteres no se encuentren con esos parametros
    //g significa que debe hacerlo en cada coincidencia
    return  string != undefined || string != "" ?  string.replace(/[^a-zA-Z0-9]/g, '') : "";
}




//convert '123-456-7890' or '2345678904' > (123) 456-7890

function formatPhone(number) {
  // Limpiar el número de caracteres no numéricos
  const cleanedNumber = number.replace(/\D/g, '');

  if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) {
    return 'Número no válido';
  }

  const hasCountryCode = cleanedNumber.length === 11 && cleanedNumber[0] === '1';
  const startIndex = hasCountryCode ? 1 : 0;

  const formattedNumber = `(${cleanedNumber.slice(startIndex, startIndex + 3)}) ${cleanedNumber.slice(startIndex + 3, startIndex + 6)}-${cleanedNumber.slice(startIndex + 6)}`;

  return formattedNumber;
}



module.exports = {
  capitalizeFirstLetter:	 capitalizeFirstLetter,
  cutText:	               cutText,
  removeSpecialCharacters: removeSpecialCharacters,
  formatParra:             formatParra,
  formatPhone:             formatPhone,
}
