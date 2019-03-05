import { TIME_INTERVAL } from '@constant/operationType';
//表格枚举显示
export function renderTypeName(typeArr = [], value = '') {
	if (!typeArr.length || value === '') return '--';
	const currentArr = typeArr.filter((item) => {
		return item.value === value;
	});
	if (!currentArr.length) return '--';
	return currentArr[0].text;
}
/**
 * 生成URL参数
 * @param menus         搜索列表
 * @returns {{keyword: {}, filter: {}, filterName: Array}}
 */
export function getUrlSearch(menus = [], operations = []) {
	let searchStr = window.location.search;
	let searchResult = {
		keyword: {},
		filter: {},
		filterName: [],
		others: {},
		othersName: [],
		orderSort: {}
	};
	if (searchStr.startsWith('?')) {
		let arr = searchStr.substr(1).split('&');
		arr.forEach((item) => {
			let itemArr = item.split('=');
			let findArr = menus.find((v) => v.value === itemArr[0]);
			let findOther = operations.find((v) => {
				if (v.type === TIME_INTERVAL) {
					return (
						v.startValue === itemArr[0] || v.endValue === itemArr[0]
					);
				}
				return v.value === itemArr[0];
			});
			if (findArr) {
				searchResult.keyword.field = itemArr[0];
				if (itemArr[1])
					searchResult.keyword.keyword = decodeURIComponent(
						itemArr[1]
					);
			} else if (findOther) {
				searchResult.others[itemArr[0]] = itemArr[1];
				searchResult.othersName.push(itemArr[0]);
			} else if (itemArr[0] === 'orderBy') {
				searchResult.orderSort.orderBy = itemArr[1];
			} else if (itemArr[0] === 'orderType') {
				searchResult.orderSort.orderType = itemArr[1];
			} else {
				searchResult.filter[itemArr[0]] = itemArr[1];
				searchResult.filterName.push(itemArr[0]);
			}
		});
	}
	return searchResult;
}
/**
 * 获取URL参数列表
 * @param menus                 搜索列表
 * @param operations            操作列表
 * @param search                参数字符串
 * @returns {{keyword: string, filter: string}}
 */
export function getKeywordParamsStr(menus = [], operations = [], search) {
	let paramsStr = {
		keyword: '',
		filter: '',
		others: ''
	};
	if (!menus.length) return paramsStr;
	if (!search) return paramsStr;
	if (search.startsWith('?')) {
		let arr = search.substr(1).split('&');
		let filters = [];
		let others = [];
		arr.forEach((item) => {
			let itemArr = item.split('=');
			let findArr = menus.find((v) => v.value === itemArr[0]);
			let findOther = operations.find((v) => {
				if (v.type === TIME_INTERVAL) {
					return (
						v.startValue === itemArr[0] || v.endValue === itemArr[0]
					);
				}
				return v.value === itemArr[0];
			});
			findArr
				? (paramsStr.keyword = item)
				: findOther
				? others.push(item)
				: filters.push(item);
		});
		paramsStr.others = others.join('&');
		paramsStr.filter = filters.join('&');
	}
	return paramsStr;
}

export function searchToObj(searchStr) {
	const result = {};
	if (!searchStr) return result;
	if (searchStr.startsWith('?')) searchStr = searchStr.substr(1);
	let searchArr = searchStr.split('&');
	searchArr.forEach((item) => {
		let itemArr = item.split('=');
		result[itemArr[0]] = itemArr[1];
	});
	return result;
}

export function objToSearch(obj) {
	let arr = [];
	for (let [key, value] of Object.entries(obj)) {
		arr.push(`${key}=${value}`);
	}
	return arr.join('&');
}

//获取两个对象的交集
export function intersectObject(obj1 = {}, obj2 = {}) {
	let arr1 = [],
		arr2 = [];
	for (let key of Object.keys(obj1)) {
		arr1.push(key);
	}
	for (let key of Object.keys(obj2)) {
		arr2.push(key);
	}
	return intersectArray(arr1, arr2);
}
//获取两个数组的交集
export function intersectArray(arr1 = [], arr2 = []) {
	let a = new Set(arr1);
	let b = new Set(arr2);
	let intersectionSet = new Set([...a].filter((v) => b.has(v)));
	return [...intersectionSet];
}

export function paramsToSearch(...params) {
	var array = params.filter((v) => !!v);
	return array.join('&');
}

/**
 * 截取指定长度的字符串
 * @param {String} str           字符串
 * @param {Number} len           最大长度
 * @returns {String} 截取后的字符串
 */
export function cutstr(str, len) {
	let str_length = 0;
	let str_len = 0;
	let str_cut = new String();
	str_len = str.length;
	for (let i = 0; i < str_len; i++) {
		let a = str.charAt(i);
		str_length++;
		if (escape(a).length > 4) {
			//中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if (str_length >= len) {
			str_cut = str_cut.concat('...');
			return str_cut;
		}
	}
	//如果给定字符串小于指定长度，则返回源字符串；
	if (str_length <= len) {
		return str;
	}
}

//过滤空值
export function filterEmptyValue(value) {
	if (!value) return '--';
	return value;
}

/**
 * 计算是否是闰年
 * @param {Number} year 年份 例2019
 */
export function isLeapYear(year) {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		return true;
	}
	return false;
}

/**
 * 获取前几个月份
 * @param {Number} n 要获取月份的个数
 * @return {Array} dataList 日期数组
 */
export function getTime(n) {
	let year = new Date().getFullYear();
	let month = new Date().getMonth() + 1;
	let day = new Date().getDate();
	let dataList = [];
	for (let i = 0; i < n; i++) {
		let m = month - i < 1 ? 12 + (month - i) : month - i;
		let y = month - i < 1 ? year - 1 : year;
		let d = this.days(m, day, y);
		let dataText = this.props.day
			? {
					value: y + '年' + m + '月',
					text: y + '-' + m + '-1/' + y + '-' + m + '-' + d
			  }
			: {
					value: y + '年' + m + '月',
					text: y + '-' + m
			  };
		dataList.push(dataText);
	}
	return dataList;
}

/**
 * 格式化金额
 * @param {Number} money 金额
 * @return {String} 格式化后的字符串
 */
export function moneyFormat(money) {
	if (money === 0) return `￥0.00`;
	if (!money) return '--';
	let priceFloor = Math.floor(Math.ceil(Math.round(money * 100))) / 100;
	if (money > 0) {
		return `￥${priceFloor.toFixed(2)}`;
	} else {
		return `-￥${priceFloor.toFixed(2) * -1}`;
	}
}

/**
 * 剩余时间数
 * @param {Number} secondTime 时间戳差值(秒)
 * @return {String} time 字符串
 */
export function secondToDate(secondTime) {
	var time = secondTime;
	if (null !== time && '' !== time) {
		if (time > 60 && time < 60 * 60) {
			time =
				parseInt(time / 60.0) +
				'分钟' +
				parseInt(parseFloat(time / 60.0));
		} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
			time =
				parseInt(time / 3600.0) +
				'小时' +
				parseInt(
					(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
				) +
				'分钟';
		} else if (time >= 60 * 60 * 24) {
			time =
				parseInt(time / 3600.0 / 24) +
				'天' +
				parseInt(
					(parseFloat(time / 3600.0 / 24) -
						parseInt(time / 3600.0 / 24)) *
						24
				) +
				'小时' +
				parseInt(
					(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
				) +
				'分钟';
		}
	}
	return time;
}
/**
 * 格式化注册时间
 * @param  {Number} times 时间戳差值(秒)
 * @return {String} 字符串
 */
export function timeFilter(times) {
	if (times <= 30) return '刚刚';
	if (30 < times && times < 60) return `${times}秒前`;
	if (60 <= times && times < 3600)
		return `${parseInt(times / 60)}分${times % 60}秒前`;
	if (3600 <= times && times < 86400)
		return `${parseInt(times / 3600)}小时${parseInt(
			(times % 3600) / 60
		)}分前`;
	if (86400 <= times && times < 2592000)
		return `${parseInt(times / 86400)}天前`;
	if (2592000 <= times && times < 31104000)
		return `${parseInt(times / 2592000)}月前`;
	if (31104000 <= times)
		return `${parseInt(times / 31104000)}年${parseInt(
			(times % 31104000) / 2592000
		)}月前`;
}
/**
 * 是否为空对象
 * @param {Object} obj 对象
 * @return {Boolena} true-空 false-有元素
 */
export function isEmpty(obj) {
	return Object.keys(obj).length ? false : true;
}
/**
 * 判断两个对象是否相等（深度比较）
 * @param obj1          对象1
 * @param obj2          对象2
 * @returns {boolean}
 */
export function isEqual(obj1, obj2) {
	//判断数据类型是否一致
	let type_1 = Object.prototype.toString.call(obj1);
	let type_2 = Object.prototype.toString.call(obj2);
	if (type_1 !== type_2) return obj1 === obj2;
	//判断是否都是对象类型
	if (!(obj1 instanceof Object) || !(obj2 instanceof Object))
		return obj1 === obj2;
	//长度是否相等
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
	for (let k in obj1) {
		//对象深度遍历
		if (obj1[k] instanceof Object && obj2[k] instanceof Object) {
			if (!isEqual(obj1[k], obj2[k])) return false;
		} else if (obj1[k] !== obj2[k]) {
			return false;
		}
	}
	return true;
}
