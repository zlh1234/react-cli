//通用常量
const TIME_SPAN = { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 }; //默认的时间差值

/**
 * 将Number时间戳或Date日期格式格式化成字符串格式，字符串如：yyyy-mm-dd hh:ii:ss
 * @param time 时间戳或Date日期格式
 * @param format 格式化的格式，默认yyyy-mm-dd hh:ii:ss
 * @returns {string} 返回格式化后的格式
 */
export function formatDate(time, fms) {
	if (
		time === undefined ||
		time === null ||
		(!(time instanceof Date) && typeof time !== 'number')
	)
		return '--';
	let _date = time instanceof Date ? time : new Date(time);
	fms = fms || 'yyyy-mm-dd hh:ii:ss';
	if (/(y+)/i.test(fms)) {
		fms = fms.replace(
			RegExp.$1,
			_date
				.getFullYear()
				.toString()
				.substr(4 - RegExp.$1.length)
		);
	}
	let o = {
		'm+': _date.getMonth() + 1,
		'd+': _date.getDate(),
		'h+': _date.getHours(),
		'i+': _date.getMinutes(),
		's+': _date.getSeconds()
	};
	for (let key in o) {
		if (new RegExp(`(${key})`, 'i').test(fms)) {
			fms = fms.replace(
				RegExp.$1,
				RegExp.$1.length === 1
					? o[key]
					: ('00' + o[key]).substr(o[key].toString().length)
			);
		}
	}
	return fms;
}

/**
 * 将yyyy-mm-dd hh:ii:ss格式的时间转换成时间戳
 * @param timeStr 时间字符串，yyyy-mm-dd hh:ii:ss格式
 * timeSpan    增加指定时间,默认{year: 0, month: 0, day: 0,hour: 0, minute: 0, second: 0}
 * @returns {时间戳}
 */
export function formatTimestamp(
	timeStr,
	timeSpan = { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 },
	fms = false
) {
	if (timeStr instanceof Date) timeStr = formatDate(timeStr);
	let _data = formatToDate(timeStr, timeSpan);
	return _data instanceof Date ? formatDate(_data.valueOf(), fms) : '';
}

/**
 * 将yyyy-mm-dd hh:ii:ss格式的时间转换成Date格式
 * @param timeStr  yyyy-hh-dd hh:ii:ss格式
 * @param timespan 增加指定时间,默认{year: 0, month: 0, day: 0,hour: 0, minute: 0, second: 0}
 * @returns {Date}日期格式
 */
export function formatToDate(timeStr, timeSpan) {
	if (timeStr === '' || timeStr === undefined || timeStr === null) return '';
	const reg = /^(\d{4})\-(\d{1,2})\-(\d{1,2})(?:\s(\d{2})){0,1}(?:\:(\d{2})){0,1}(?:\:(\d{2})){0,1}$/;
	if (!reg.test(timeStr)) return new Date();
	let arr = timeStr.match(reg);
	timeSpan = timeSpan ? { TIME_SPAN, ...timeSpan } : TIME_SPAN;
	let year = parseInt(arr[1]) + timeSpan.year;
	let month = parseInt(arr[2]) + timeSpan.month;
	let day = parseInt(arr[3]) + timeSpan.day;
	let hour = (arr[4] ? parseInt(arr[4]) : 0) + timeSpan.hour;
	let minute = (arr[5] ? parseInt(arr[5]) : 0) + timeSpan.minute;
	let second = (arr[6] ? parseInt(arr[6]) : 0) + timeSpan.second;
	return new Date(year, month - 1, day, hour, minute, second);
}
