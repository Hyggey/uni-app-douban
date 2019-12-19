<template>
	<view class="listContainer">
		<swiper :indicator-dots="true" indicator-active-color="#e43a3d" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in noPlayingList.subjects" :key="index">
				<view class="swiper-item">
					<image :src="item.images.large" mode="widthFix" @click="toDetails(item.id)"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="wrap">
			<view class="title">{{noPlayingList.title}}<text @click="toClass(3)">更多></text></view>
			<scroll-view class="scroll-wrap" :scroll-x="true">
				<view v-for="(it,idx) in noPlayingList.subjects" :key="idx" class="slider">
					<image :src="it.images.small" mode="" @click="toDetails(it.id)"></image>
					<view class="title2">{{it.title}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="wrap" v-for="(item,index) in moveList" :key="index">
			<view class="title">{{item.title}}<text @click="toClass(index)">更多></text></view>
			<scroll-view class="scroll-wrap" :scroll-x="true">
				<view v-for="(it,idx) in item.subjects" :key="idx" class="slider">
					<image :src="it.images.small" mode="" @click="toDetails(it.id)"></image>
					<view class="title2">{{it.title}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {comingSoon,newMovies,top250} from '../../pages/apis/index.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				moveList:[]
			}
		},
		onReady() {
			// this.$store.dispatch('getCity')
			this.pageInit()
		},
		computed:{
			...mapState({
				city:state => state.city,
				noPlayingList: state => state.noPlayingList
			})
		},
		methods: {
			// 一起调用一个接口，目的是只触发一个loading
			pageInit(){
				uni.showLoading({
				    title: '加载中'
				})
				Promise.all([
					this._comingSoon(),
					this._newMovies(),
					this._top250()
				]).then(res =>{
					uni.hideLoading()
					let rel = [];
					res.map((item) =>{
						rel.push(item[1].data)
					})
					this.moveList = rel
				})
			},
			toDetails(id){
				uni.navigateTo({
					url: '../details/details?id='+ id,
				});
			},
			toClass(index){
				uni.navigateTo({
					url: '../class/class?index='+ index,
				});
			},
			_comingSoon(){
				// return 一个promise对象出来
				return comingSoon({
					start:'0',
					count:'8',
					city: this.city
				})
			},
			_newMovies(){
				return newMovies({
					start:'0',
					count:'8',
					city: this.city
				})
			},
			_top250(){
				return top250({
					start:'0',
					count:'8',
					city: this.city
				})
			},
		}
	}
</script>

<style lang="scss">
	.listContainer{
		background: #053B6C;
		swiper{
			height: 420rpx;
			image{
				width: 100%;
			}
		} 
		.wrap{
			.title{
				display: flex;
				justify-content: space-between;
				padding: 0 20rpx;
				color: #FFFFFF;
				font-size: 36rpx;
				margin: 15rpx 0;
			}
			.scroll-wrap{
				white-space: nowrap;
				height: 460rpx;
				.slider{
					width: 340rpx;
					height: 460rpx;
					display: inline-block;
					padding-right: 15rpx;
					&:last-child{
						padding-right: 0;
					}
					image{
						width: 100%;
						height: 400rpx;
					}
					.title2{
						text-align: center;
						color: #fff;
					}
				}
			}
		}
		
	}
</style>
