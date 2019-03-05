import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';
const http = axios.create({
	withCredentials: false, //是否携带cookies
	timeout: 30000
});

//application/x-www-form-urlencoded
http.defaults.headers.post['Content-Type'] = 'application/json';
http.defaults.headers.get['Content-Type'] = 'application/json';

//请求拦截器
http.interceptors.request.use(
	function(req) {
		//在请求发出之前进行一些操作
		const { method } = req;
		let _time = Date.parse(new Date()) / 1000; //10位时间戳
		//判断post还是get 分别对data和params做出操作
		if (method === 'post') {
			let reqData = qs.parse(req.data);
			req.data = {
				...reqData,
				_time: _time
			};
		} else if (method === 'get') {
			req.params = {
				...req.params,
				_time: _time
			};
		}
		req.url = `/api/admin/index/${req.url}`;
		// req.url = `/admin/index/${req.url}`;
		return req;
	},
	function(err) {
		console.log(err);
		return Promise.reject(err);
	}
);

//响应拦截器
http.interceptors.response.use(
	function(res) {
		//在这里对返回的数据进行处理
		const { status } = res;
		if ((status >= 200 && status <= 300) || status === 304) {
			if (res.data.code === 400) {
				notification.error({ message: res.data.msg });
				return {
					code: 400,
					msg: res.data.msg
				};
			} else if (res.data.code === 401) {
				notification.error({ message: res.data.msg });
				setTimeout(() => {
					const { pathname } = location;
					if (pathname !== '/login') {
						window.location.href = '/login';
					}
				}, 1500);
				return {
					code: 401,
					msg: res.data.msg
				};
			} else {
				return res.data;
			}
		} else {
			notification.error({
				message: '请求出错',
				description: `发生未知错误,错误码${status}`
			});
			return {
				code: 400,
				msg: '服务器错误'
			};
		}
	},
	function(err) {
		notification.error({
			message: '请求出错',
			description: `${err}`
		});
		return Promise.reject(err);
	}
);

export default http;
