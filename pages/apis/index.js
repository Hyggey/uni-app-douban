// https://douban-api.uieee.com/v2/movie/in_theaters
export const getInTheaters=params=>(
	// 第一种写法,使用promise,简易写法
	// new Promise((resolve,reject) =>{
	// 	resolve('text')
	// })
	// 第一种写法得完整版本  ?为什么不用写return new Promise...,因为上面用的是params=>(),直接就执行了,如果是params=>{},则需要return
	// new Promise((resolve,reject) =>{
	// 	uni.request({
	// 		url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
	// 		method: 'GET',
	// 		data: params,
	// 		header:{
	// 			"content-type":'JSON'
	// 		}
	// 	}),
	// 	success(res =>{
	// 		resolve(res)
	// 	})
			
	// })
	// 第二种写法,直接使用uni得请求方式,不用写success,fail,自动返回一个promise
	uni.request({
		url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
		method: 'GET',
		data: params,
		header:{
			"content-type":'JSON'
		}
	})
)