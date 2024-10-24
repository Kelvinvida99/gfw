




///format data
export function barsimple(data) {
	try {

		let result = [];

		for (let index = 0; index < 5; index++) {
			let item = data[index];

			if (item != undefined) {
				result.push({ label: data[index].x, borderRadius: 0, borderWidth: 2, color: "red", value: [{ x: data[index].x, y: data[index].y }] })
			}

		}

		return result;



	} catch (err) { console.log('err', err) }
}/*createAllChart*/



///format data
export function piesimple(data) {
	try {

		let total = data.reduce((sum, item) => sum + parseFloat(item.y), 0);

		let colors = ['red', 'blue', 'green','yellow', 'gray'];

		

		let label = [];
		let color = [];
		let value = [];


		for (let index = 0; index < 5; index++) {
			let item = data[index];

			if (item != undefined) {
				label.push(data[index].y);
				color.push(colors[index]);
				value.push((parseFloat(data[index].y) / total * 100).toFixed(2));
			}

		}

		let result = {
			label: label,
			color: color,
			value: value
		}

		return result;



	} catch (err) { console.log('err', err) }
}/*createAllChart*/





