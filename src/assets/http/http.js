/**
 * http配置
 */
// 引入axios
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

Vue.prototype._global = {
	httpStack: [] // 请求栈
};

// http请求拦截器
axios.interceptors.request.use(config => {

	if (!config.notQs) {
		config.method === 'post' ? config.data = qs.stringify({
			...config.data
		}) : config.params = {
			...config.params
		};
	}

	return config

}, error => {

	return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
	unloadHttp(data.config.httpId)
	return data.data

}, error => {
	// 请求超时会在此捕获 
	// axios cancelToken 中断的请求也在此捕获axios.isCancel(error)


	if (axios.isCancel(error)) {
		// 手动中断请求
	} else {
		unloadHttp(error.config.httpId)
	}

	if (error.request.readyState == 4 && error.request.status == 0) {
		error.response = {
			code: 209,
			message: '请求超时'
		}
	} else {
		error.response = {
			code: error.response.status,
			message: '状态码' + error.response.status
		}
	}

	return Promise.reject(error)
})

class http {
	rq(obj) {
		return createHttp(obj)
	}
}

// 创建请求
function createHttp({
	url,
	method = 'get',
	cancelToken = axios.CancelToken.source(),
	data = {},
	timeout = 10000,
	notQs = false,
	httpId = createUnid(),
	onUploadProgress = () => {},
	headers = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
} = {}) {

	method = method.toLowerCase();

	loadHttp({
		url: url,
		method: method,
		cancelToken: cancelToken,
		httpId
	})

	return axios({
			url,
			method,
			cancelToken: cancelToken.token,
			[(method == 'put' || method == 'post' || method == 'patch') ? 'data' : 'params']: data,
			timeout,
			notQs,
			httpId,
			headers
		})
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(err => {
			return Promise.resolve(err)
		})
}

Vue.prototype.$axios = axios
Vue.prototype.$http = new http()

function loadHttp(obj) { // 装填请求
	Vue.prototype._global.httpStack.push(obj)
}

function unloadHttp(id) { // 卸载请求
	for (let i = 0, len = Vue.prototype._global.httpStack.length; i < len; i++) {
		if (Vue.prototype._global.httpStack[i].httpId === id) {
			Vue.prototype._global.httpStack.splice(i, 1)
			return
		}
	}
}

function createUnid() {
	let unid = 'xyxyxy'.replace(/[xy]/g, c => {
		return (c == 'x' ? String.fromCharCode(Math.floor(Math.random() * 8 + 49)) : String.fromCharCode(Math.floor(Math.random() * 25 + 97)))
	});
	return unid
}

export default new http()