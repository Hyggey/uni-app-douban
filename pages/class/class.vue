<template>
	<view class="classBox">
		<!-- 不用这个方法了，垃圾，他需要给定一个高度，由于各个手机屏幕高度不定，不好 -->
		<!-- <scroll-view class="scroll" scroll-y="true" @scrolltolower="scrolltolower"> -->
		<scroll-view class="scroll" scroll-y="true">
			<view class="wrap" v-for="(item,index) in moveList" :key="index" @click="toDetails(item.id)">
				<view class="left">
					<image :src="item.images.small" alt="">
				</view>
				<view class="right">
					<view class="right_top">
						<view>{{item.title}}</view>
						<view>{{item.rating.average || '暂无评分'}}</view>
					</view>
					<view class="txt">{{item.title}}</view>
					<view class="txt">{{item.genres.join()}}</view>
					<view class="name">
						<view>演员：</view>
						<view class="name_item" v-for="(it,idx) in item.casts" :key="idx">{{it.name}}</view>
					</view>
				</view>
			</view>
			<view v-show="isshow" style="text-align: center;font-size: 36rpx;">已经到底了</view>
		</scroll-view>
	</view>
</template>

<script>
	import {comingSoon,newMovies,top250,getInTheaters} from '../../pages/apis/index.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				start:0,   // 请求数据，从多少开始请求
				moveList:[],  // 请求到电影列表
				isshow:false,  // 是否显示，"已经到底"
				typeNum:-1   // top250，即将上映的电影...的来源标识符
			}
		},
		onLoad(option) {
			console.log(option.index)
			this.typeNum = option.index
			uni.showLoading({
			    title: '加载中'
			})
			this.getClassData(this.typeNum)({
				city: this.city,
				start: '0',
				count:'10'
			}).then(res =>{
				let [err,data] = res;
				this.moveList = data.data.subjects
				uni.hideLoading()
				console.log(this.moveList)
			})
		},
		// 上拉加载更多，需要在pages.json文件里配置   "onReachBottomDistance": 100
		onReachBottom(){
			if(!this.isshow){
				this.start+=10;
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				console.log(this.start)
				this.getClassData(this.typeNum)({
					city: this.city,
					start: this.start,
					count:'10'
				}).then(res =>{
					let [err,data] = res;
					let subjects = data.data.subjects
					// 判断少于10条数据时，停止请求接口，因为我每次请求的是10条数据，最后一次少于10条，肯定就没有数据了。
					if(subjects.length < 10){
						console.log(111)
						this.isshow = true
						this.moveList = this.moveList.concat(subjects)
						uni.hideLoading()
					}
					// 每次拼接10条数据
					this.moveList = this.moveList.concat(subjects)
					uni.hideLoading()
				})
			}else{
				uni.hideLoading()
			}
		},
		computed:{
			...mapState({
				city: state => state.city
			})
		},
		methods: {
			// 滚动条滚动到底部事件，滑动加载,废弃了，用上面的，这个有局限性，设置一个高度不好
			// scrolltolower(){
			// 	if(!this.isshow){
			// 		this.start+=10;
			// 		uni.showLoading({
			// 		    title: '加载中',
			// 			mask:true
			// 		})
			// 		console.log(this.start)
			// 		this.getClassData(this.typeNum)({
			// 			city: this.city,
			// 			start: this.start,
			// 			count:'10'
			// 		}).then(res =>{
			// 			let [err,data] = res;
			// 			let subjects = data.data.subjects
			// 			// 判断没有数据，停止请求接口
			// 			if(subjects.length == 0){
			// 				console.log(111)
			// 				this.isshow = true
			// 			}
			// 			// 每次拼接10条数据
			// 			this.moveList = this.moveList.concat(subjects)
			// 			uni.hideLoading()
			// 		})
			// 	}else{
			// 		uni.hideLoading()
			// 	}
			// },
			// 判断是即将上映的电影，还是top250...
			getClassData(state){
				if(state == 3){
					return getInTheaters
				}else{
					let fnList = [comingSoon,newMovies,top250]
					return fnList[state]
				}
			},
			// 跳转到页面详情事件
			toDetails(id){
				uni.navigateTo({
					url: '../details/details?id='+ id,
				});
			}
		}
	}
</script>

<style lang="scss">
	.classBox{
		.scroll{
			// height: 1250rpx;
			.wrap{
				display: flex;
				justify-content: space-between;
				padding: 20rpx 30rpx;
				border-bottom: 1px solid #ccc;
				.left{
					margin-right: 15rpx;
					image{
						width: 240rpx;
						height: 300rpx;
					}
				}
				.right{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.right_top{
						display: flex;
						justify-content: space-between;
						view:first-child{
							font-size: 40rpx;
							font-weight: 600;
						}
						view:last-child{
							background: #e43a3d;
							color: #FFFFFF;
							border-radius: 15rpx;
							padding: 4rpx 10rpx;
							// width: 40rpx;
							text-align: center;
							font-size: 28rpx;
							line-height: 52rpx;
						}
					}
					.txt{
						color: #666;
					}
					.name{
						display: flex;
						.name_item{
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
