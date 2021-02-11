export default function makeLine(arr) {
	return arr.reduce((previous, { x, y, index }, i) => {
		const next = i < arr.length - 1 ? arr[i + 1] : null;
		const pre = i === 0 ? `M${x} ${y}` : "";
		let path = "";

		if (next && next.x !== x) {
			// console.log(i, index, x, next.x);
			const x2 = next.index === 0 ? x : next.x;
			const y2 = next.index === 0 ? next.y : y;
			path = `L${x} ${y}L${x2} ${y2}`;
		} else {
			path = `L${x} ${y}`;
		}

		return `${previous}${pre}${path}`;
	}, "");
}