<template>
	<view class="listContainer">
		<swiper :indicator-dots="true" indicator-active-color="#e43a3d" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in noPlayingList.subjects" :key="index">
				<view class="swiper-item">
					<image :src="item.images.large" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="wrap">
			<view class="title">{{noPlayingList.title}}</view>
			<scroll-view class="scroll-wrap" :scroll-x="true" style="border: 1px solid red;" scroll-left="120">
				<view v-for="(it,idx) in noPlayingList.subjects" :key="idx" class="slider">
					<image :src="it.images.small" mode=""></image>
					<view>{{it.title}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			this.$store.dispatch('getCity')
		},
		computed:{
			...mapState({
				noPlayingList: state => state.noPlayingList
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.listContainer{
		swiper{
			height: 420rpx;
			image{
				width: 100%;
			}
		}
		.wrap{
			.title{
				
			}
			.scroll-wrap{
				white-space: nowrap;
				height: 360rpx;
				.slider{
					width: 350rpx;
					height: 300rpx;
					display: inline-block;
					image{
						width: 340rpx;
					}
				}
			}
		}
		
	}
</style>
