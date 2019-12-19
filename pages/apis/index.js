// https://douban-api.uieee.com/v2/movie/in_theaters
const baseUrl = 'https://douban-api.uieee.com'
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
		url: `${baseUrl}/v2/movie/in_theaters`,
		method: 'GET',
		data: params,
		header:{
			"content-type":'JSON'
		}
	})
)

// 即将上映得电影
export const comingSoon=params=>(
	uni.request({
		url: `${baseUrl}/v2/movie/coming_soon`,
		method: 'GET',
		data: params,
		header:{
			"content-type":'JSON'
		}
	})
)

// 豆瓣新片榜
export const newMovies=params=>(
	uni.request({
		url: `${baseUrl}/v2/movie/new_movies`,
		method: 'GET',
		data: params,
		header:{
			"content-type":'JSON'
		}
	})
)

// 豆瓣top250电影榜
export const top250=params=>(
	uni.request({
		url: `${baseUrl}/v2/movie/top250`,
		method: 'GET',
		data: params,
		header:{
			"content-type":'JSON'
		}
	})
)

// 电影详情
export const details=id=>(
	uni.request({
		url: `${baseUrl}/v2/movie/subject/${id}`,
		method: 'GET',
		header:{
			"content-type":'JSON'
		}
	})
)
	