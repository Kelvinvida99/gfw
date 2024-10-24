



export function randomInt(max) {

	var realMax = 10000

	if(max != undefined){ realMax = max }

  	return Math.floor(Math.random() * realMax);
}


//console.log( cashFormat("1000.02", true) ); // Will print "$3,001"
export function cashFormat(value, addZeros) {
    // Check if the value is a number or text and convert it to a number
    var numericValue = isNaN(value) ? parseFloat(value.replace(/[^0-9.-]/g, '')) : parseFloat(value);

    // Check if the value is valid
    if (isNaN(numericValue)) {
        return "Invalid input. Please enter a number or a valid format.";
    }

    // Format the value as dollars
    var formattedValue = numericValue.toFixed(addZeros ? 2 : 0);
    formattedValue = "$" + formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedValue;
}


