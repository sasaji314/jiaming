<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="box" hover-class="hoverclass">
			ceshi
			
		</view>
		
		<image  class="test" :src="swiperList[0].img" @tap="showBigImg(swiperList[0].img)" ></image>
		<!-- <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
						@cancel="cancel" @clear="clear">
		</uni-search-bar>
 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				swiperList: [
					{ id: 1, img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg' },
					{ id: 2, img: 'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg' },
					{ id: 3, img: 'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg' },
					{ id: 4, img: 'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg' }
				],
			}
		},
		onLoad() {

		},
		methods: {
			toUser(){
				uni.navigateTo({
					url:'../user/user'
				})
			},
			
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					itle: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			
			showBigImg(srclist){
				uni.previewImage({
					current:'',
					urls: [srclist],
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				});
				console.log(srclist);
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.test{
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
		}
	}
	.box{
		border: 1px red solid;
	}
	.hoverclass {
		background-color: aqua;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
