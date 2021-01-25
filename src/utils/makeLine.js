export default function makeLine(arr) {
	return arr.reduce((previous, { x, y }, i) => {
		const next = i < arr.length - 1 ? arr[i + 1] : null;
		let path = "";
		const prefix = i === 0 ? `M${x} ${y}` : "";
		if (next && next.x === x) {
			// straight
			path = `L${next.x} ${next.y}`;
		} else if (next) {
			// curve
			const diff = next.y - y;
			const cx1 = x;
			const cy1 = y + diff / 2;
			const cx2 = next.x;
			const cy2 = next.y - diff / 2;
			path = `C${cx1} ${cy1}, ${cx2} ${cy2}, ${next.x} ${next.y}`;
		}

		return `${previous}${prefix}${path}`;
	}, "");
}