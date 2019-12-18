import Vue from 'vue'
import Vuex from 'vuex'
import bmap from '../static/js/bmap-wx.min.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		city:''
	},
	mutations:{
		
	},
	actions:{
		getCity(context){
			// 检测用户是否授权
			uni.authorize({
				scope:'scope.userLocation',
				success() {
					// 新建百度地图对象 
					var BMap = new bmap.BMapWX({ 
						ak: 'KuMdsfWrePh3cKASnxYhFOc33k819fzP' 
					});
					// 使用百度地图的话,这一步都不需要了
					uni.getLocation({
					    type: 'wgs84',
					    success: function (res) {
					        console.log('当前位置的经度：' + res.longitude);
					        console.log('当前位置的纬度：' + res.latitude);
							// 发起regeocoding检索请求 
							BMap.regeocoding({ 
								// location: res.latitude+','+res.longitude,
								success(res){
									context.state.city = res.originalData.result.addressComponent.city
								}
							});
					    }
					});
				},
				fail(res) {
					console.log(res)
					uni.showToast({
						title: res.errMsg
					})
				}
			})
		}
	}
})

export default store