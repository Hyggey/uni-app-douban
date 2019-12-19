<template>
	<view class="detailsBox">
		<image class="repeat_img" :src="details.images.small" mode=""></image>
		<view class="shade">
			<image class="repeat_img" :src="details.images.small" mode=""></image>
			<view class="nav">
				<view>{{details.title}}</view>
				<view class="rating" v-if="details.rating">评分：{{details.rating.average}}分</view>
				<view class="content">
					<view v-if="details.summary">摘要</view>
					<view>{{details.summary}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {details} from '../../pages/apis/index.js'
	export default {
		data() {
			return {
				details:{}
			}
		},
		// {id: "22265687"}
		onLoad(option) {
			uni.showLoading({
			    title: '加载中'
			})
			console.log(option)
			details(option.id).then(res =>{
				let [err,data] = res
				this.details = data.data
				uni.hideLoading()
				console.log(this.details)
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.detailsBox{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.repeat_img{
			width: 100%;
			height: 100%;
		}
		.shade{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			background: rgba(255,255,255,0.7);
			text-align: center;
			overflow-y: scroll;
			image{
				width: 640rpx;
				height: 800rpx;
				margin-top: 40rpx;
			}
			.nav{
				padding: 0 60rpx;
				.rating{
					text-align: left;
				}
				.content{
					text-align: left;
					view:first-child{
						margin: 15rpx 0;
						font-size: 40rpx;
						font-weight: bold;
					}
					view:last-child{
						text-indent: 32rpx;
					}
				}
			}
		}
	}
</style>
