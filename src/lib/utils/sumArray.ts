export const sumArray = (array: number[]) => {
	let sum = 0;
	for (const item of array) {
		sum += item;
	}
	return sum;
};
