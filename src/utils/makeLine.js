export default function makeLine(arr) {
	return arr.reduce((previous, { x, y }, i) => {
		const next = i < arr.length - 1 ? arr[i + 1] : null;
		const prefix = i === 0 ? `M${x} ${y}` : "";
		const path = next ? `L${next.x} ${next.y}` : "";
		return `${previous}${prefix}${path}`;
	}, "");
}