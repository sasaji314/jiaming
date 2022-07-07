<template>
	<view>
		<view>
			<uni-row class="top">
				<view>{{shop.shopname}}</view>
			</uni-row>
			<uni-row class="detail">
				<uni-col :span="12" :offset="12">
					<view>地址:{{shop.shopaddress}}</view>
				</uni-col>
			</uni-row>
			<uni-row class="detail">
				<uni-col :span="12" :offset="12">
					<view>电话:{{shop.tel}}</view>
				</uni-col>
			</uni-row>
		</view>
		<!-- 搜索 -->
		<view class="search">
			<uni-search-bar @confirm="search" :focus="true" @blur="blur" @focus="focus" @input="input"
							@cancel="cancel" @clear="clear" bgColor="aliceblue" clearButton="auto" cancelButton="none">
			</uni-search-bar>
		</view>
		
		<view class="goods">
			<text class="allgoods">全部商品</text>
		<!--商品列表 -->
			<view class="goods-list">
				<view class="product-list">
					<view class="product" v-for="(goods) in goodsList" :key="goods.goods_id" @tap="toGoods(goods)">
						<image mode="widthFix" :src="goods.img"></image>
						<view class="name">{{goods.goodsname}}</view>
						<view class="info">
							<view class="price">￥{{goods.goodsprice}}</view>
						</view>
					</view>
				</view>
				<view class="loading-text">{{loadingText}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[
					// { goods_id: 0, img: '/static/img/goods/p1.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 1, img: '/static/img/goods/p2.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥169', slogan:'1235人付款' },
					// { goods_id: 2, img: '/static/img/goods/p3.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 3, img: '/static/img/goods/p4.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 4, img: '/static/img/goods/p5.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥170', slogan:'1235人付款' },
					// { goods_id: 5, img: '/static/img/goods/p6.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 6, img: '/static/img/goods/p7.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 7, img: '/static/img/goods/p8.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 8, img: '/static/img/goods/p9.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					// { goods_id: 9, img: '/static/img/goods/p10.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' }
				],
				loadingText:"正在加载...",
				
				shop:{
						// shopname: 'JM宠物商店' ,
						// shopaddress: '福建省厦门市集美区天马路114514号' ,
						// tel: '11451414251',
					},
			}
		},
		onLoad(e) {
			let self = this;
			console.log("传来的商店id："+e.shopid); //打印出上个页面传递的参数。
			//显示商店
			this.$axios.post('/shops/showShop',{
				shopid:e.shopid
			}).then(rep=>{
				if(rep.data.code == 100){
					console.log(rep.data.message);
					self.shop = rep.data.data
				}else{
						uni.showToast({
							icon:"error",
							title:rep.data.message
						})
					}
			})
			
			//显示商品
			this.$axios.post('/goods/showShopgoods',{
				shopid:e.shopid
			}).then(rep=>{
				if(rep.data.code == 100){
					console.log(rep.data.message);
					self.goodsList = rep.data.data
				}else{
						uni.showToast({
							icon:"error",
							title:rep.data.message
						})
					}
			})
		},
		methods: {
			//搜索相关
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
			
			//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
			onReachBottom(){
				uni.showToast({title: '触发上拉加载'});
				let len = this.goodsList.length;
				if(len>=40){
					this.loadingText="到底了";
					return false;
				}else{
					this.loadingText="正在加载...";
				}
				// let end_goods_id = this.goodsList[len-1].goods_id;
				// for(let i=1;i<=10;i++){
				// 	let goods_id = end_goods_id+i;
				// 	let p = { goods_id: goods_id, img: '/static/img/goods/p'+(goods_id%10==0?10:goods_id%10)+'.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' };
				// 	this.goodsList.push(p);
				// }
			},
		}
	}
</script>

<style lang="scss">
.top{
	padding-top: 5%;
	padding-left: 5%;
	font-size: 30px;
}

.detail{
	padding-top: 3%;
	font-size: 16px;
}

.search{
	padding-left: 3%;
	padding-right: 3%;
	padding-top: 1%;
}

.goods{
	
}

.allgoods{
	padding-left: 10%;
	font-weight: 600;
	font-size: 20px;
}

.goods-list{
		padding-top: 2%;
		.loading-text{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 15px;
		}
		.product-list{
			width: 92%;
			padding: 0 4% 3vw 4%; 
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product{
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0,0,0,0.1);
				image{
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}
				.name{
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
					
					.price{
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan{
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
			
		}
	}
</style>
