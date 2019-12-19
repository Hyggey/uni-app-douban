<template>
	<view class="focusContainer" v-if="noPlayingList.subjects">
		<image :src="noPlayingList.subjects[4].images.small" mode=""></image>
		<button class="start" @click="toList">立即体验</button>
	</view>
</template>

<script>
	import {getInTheaters} from '../../pages/apis/index.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			this.$store.dispatch('getCity')
			// setTimeout(() =>{
			// 	getInTheaters({
			// 		start:'0',
			// 		count:"8",
			// 		city: this.$store.state.city
			// 	}).then(res =>{
			// 		let [err,data] = res
			// 		console.log(data)
			// 	})
			// },5000)
			// getInTheaters({
			// 	start:'0',
			// 	count:"8",
			// 	city: this.$store.state.city
			// }).then(res =>{
			// 	let [err,data] = res
			// 	console.log(data)
			// })
		},
		computed:{
			...mapState({
				city:'city',
				noPlayingList: state => state.noPlayingList
			})
		},
		methods: {
			toList(){
				uni.navigateTo({
					url:'../list/list'
				})
			}
		}
	}
</script>

<style lang="scss">
	.focusContainer{
		height: 100vh;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.start{
			position: absolute;
			bottom: 45rpx;
			left: 50%;
			margin-left: -92rpx;
			opacity: .7;
		}
	}
</style>
