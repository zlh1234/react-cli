//快速排序
export const quickSort = (arr, sort = 'asc') => {
	if (arr.length <= 1) return arr;
	//取数组的中间下标
	let pointIndex = Math.floor(arr.length / 2);
	//获取数组中间的值
	let point = arr.splice(pointIndex, 1)[0];
	//循环
	let aLeft = [];
	let aRight = [];
	arr.forEach((v) => {
		let bool;
		switch (sort) {
			case 'asc':
				bool = v.cSort < point.cSort;
				break;
			case 'desc':
				bool = v.cSort > point.cSort;
				break;
			default:
				bool = v.cSort < point.cSort;
				break;
		}
		if (bool) {
			aLeft.push(v);
		} else {
			aRight.push(v);
		}
	});
	return quickSort(aLeft).concat([point], quickSort(aRight));
};
