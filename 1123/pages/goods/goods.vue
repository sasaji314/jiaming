<template>
	<view>
		<!-- 底部菜单 -->
		<uni-goods-nav class="goods-carts" :fill="true" :options="options" :button-group="ButtonGroup" @click="onClick"
		@buttonClick="buttonClick" />
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title" style="font-size: 50px;">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index)" :key="index">{{item}}</view>
					</view>
					<view class="length" v-if="selectSpec!=null">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian">-</view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="goodsData.number" />
							</view>
							<view class="add"  @tap.stop="add">
								<view class="icon jia">+</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideSpec">完成</view></view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<!-- <swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in swiperList" @tap="showBigImg(swiper.img,swiperList.img)" :key="swiper.id">
					<image :src="swiper.img" ></image>
				</swiper-item>
			</swiper> -->
			
			<!-- <view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view> -->
			<image :src="swiperList[0].img" @tap="showBigImg(swiperList[0].img)" ></image>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goodsData.price}}</view>
			<view class="title">
				{{goodsData.name}}
			</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="text">服务</view>
				<view class="content">正品保证 七天无理由退换</view>
			</view>
			
			<view class="row">
				<view class="text">配送</view>
				<view class="content">现在下单预计后天即可送达</view>
			</view>
			<view class="row" @tap="showSpec(false)">
				<view class="text">选择</view>
				<view class="content">
					<view>选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
					
				</view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
			<view class="row">
				<view class="text">参数</view>
				<view class="content">生产日期：2022.2.2 厂家地址:福建省厦门市</view>
			</view>
		</view>
		<!-- 占位 -->
		<view style="height: 50px;"></view>
		<!-- 评价 -->
		<!-- <view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view> -->
		<!-- 详情 -->
		<!-- <view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content"><rich-text :nodes="descriptionStr"></rich-text></view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [
				{ id: 1, img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg' },
				{ id: 2, img: 'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg' },
				{ id: 3, img: 'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg' },
				{ id: 4, img: 'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg' }
			],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{
				id:1,
				name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
				price:"127.00",
				number:1,
				// service:[
				// 	{name:"正品保证",description:"此商品官方保证为正品"},
				// 	{name:"极速退款",description:"此商品享受退货极速退款服务"},
				// 	{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				// ],
				spec:["XS","S","M","L","XL","XXL"],
				// comment:{
				// 	number:102,
				// 	userface:'../../static/img/face.jpg',
				// 	username:'大黑哥',
				// 	content:'很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
				// }
			},
			selectSpec:null,//选中规格
			isKeep:false,//收藏
			//商品描述html
			descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>',
			//底部导航
			options: [{
					icon: 'shop',
					text: '店铺',
			}, {
					icon: 'cart',
					text: '购物车',
			}],
			ButtonGroup: [{
				text: '加入购物车',
				backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
				color: '#fff'
			},
			{
				text: '立即购买',
				backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
				color: '#fff'
			}
			],
		};
	},
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.cid); //打印出上个页面传递的参数。
	},
	// onReady(){
	// 	this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	// },
	// onPageScroll(e) {
	// 	//锚点切换
	// 	this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
	// 	//导航栏渐变
	// 	let tmpY = 375;
	// 	e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
	// 	this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
	// 	this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
	// 	//切换层级
	// 	this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
	// 	this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	// },
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	// onReachBottom() {
	// 	uni.showToast({ title: '触发上拉加载' });
	// },
	mounted () {
		
	},
	methods: {
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//点击购物车/店铺
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`
			})
			if(e.content.text == "购物车"){
				uni.navigateTo({
					url:'../car/car',
				})
			}
		},
		//点击购买/加入购物车按钮
		buttonClick(e) {
			console.log(e.content.text);
		},
		// 加入购物车
		joinCart(){
			if(this.selectSpec==null){
				return this.showSpec(()=>{
					uni.showToast({title: "已加入购物车"});
				});
			}
			uni.showToast({title: "已加入购物车"});
		},
		//立即购买
		buy(){
			if(this.selectSpec==null){
				return this.showSpec(()=>{
					this.toConfirmation();
				});
			}
			this.toConfirmation();
		},
		//跳转确认订单页面
		// toConfirmation(){
		// 	let tmpList=[];
		// 	let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
		// 	tmpList.push(goods);
		// 	uni.setStorage({
		// 		key:'buylist',
		// 		data:tmpList,
		// 		success: () => {
		// 			uni.navigateTo({
		// 				url:'../order/confirmation'
		// 			})
		// 		}
		// 	})
		// },
		//选择规格
		setSelectSpec(index){
			this.selectSpec = index;
		},
		//减少数量
		sub(){
			if(this.goodsData.number<=1){
				return;
			}
			this.goodsData.number--;
		},
		//增加数量
		add(){
			this.goodsData.number++;
		},
		//跳转锚点
		// toAnchor(index){
		// 	this.selectAnchor = index;
		// 	uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		// },
		//计算锚点高度
		// calcAnchor(){
		// 	this.anchorlist=[
		// 		{name:'主图',top:0},
		// 		{name:'评价',top:0},
		// 		{name:'详情',top:0}
		// 	]
		// 	let commentsView = uni.createSelectorQuery().select("#comments");
		// 	commentsView.boundingClientRect((data) => {
		// 		let statusbarHeight = 0;
		// 		//APP内还要计算状态栏高度
		// 		// #ifdef APP-PLUS
		// 			statusbarHeight = plus.navigator.getStatusbarHeight()
		// 		// #endif
		// 		let headerHeight = uni.upx2px(100);
		// 		this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
		// 		this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				
		// 	}).exec();
		// },
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			setTimeout(() => {
				this.serviceClass = 'none';
			}, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;
		},
		specCallback(){
			return;
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调

			this.selectSpec&&this.specCallback&&this.specCallback();
			this.specCallback = false;
			setTimeout(() => {
				this.specClass = 'none';
			}, 200);
		},
		discard() {
			//丢弃
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
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}

.icon {
	font-size: 26upx;
}


.swiper-box {
	position: relative;
	width: 100%;
	height: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	swiper {
		width: 100%;
		height: 100vw;
		swiper-item {
			image {
				position: absolute;
				width: 100%;
				height: 100vw;
			}
		}
	}
	image {
		position: absolute;
		width: 100%;
		height: 100vw;
	}
	
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.info-box {
	width: 92%;
	padding: 20upx 4%;
	background-color: #fff;
	margin-bottom: 20upx;
}

.goods-info {
	.price {
		font-size: 46upx;
		font-weight: 600;
		color: #f47925;
	}
	.title {
		font-size: 15px;
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;
			.serviceitem{
				margin-right: 10upx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {
					background-color: #f6f6f6;
					padding: 5upx 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;
					&.on{
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				color: #ccc;
			}
		}
	}
}

.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26px;
		color: #999;
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 92%;
	padding: 0 4%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80upx;
		margin-left: -4%;
		.box {
			width: 80upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
		}
	}
	.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.joinCart {
			background-color: #f0b46c;
		}
		.buy {
			background-color: #f06c7a;
		}
	}
}
.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: none;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: -70%;
		width: 92%;
		padding: 0 4%;
		height: 70%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.2s linear both;
		}
		
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	&.service {
		.row {
			margin: 30upx 0;
			.title {
				font-size: 30upx;
				margin: 10upx 0;
			}
			.description {
				font-size: 28upx;
				color: #999;
			}
		}
	}
	&.spec {
		.title {
			font-size: 30upx;
			margin: 30upx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28upx;
				padding: 5upx 20upx;
				border-radius: 8upx;
				margin: 0 30upx 20upx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3upx 18upx;
					border: solid 1upx #f47925;
				}
			}
		}
		.length{
			margin-top: 30upx;
			border-top: solid 1upx #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			.text{
				font-size: 30upx;
			}
			.number{
				display: flex;
				justify-content: center;
				align-items: center;
				.input{
					width: 80upx;
					height: 60upx;
					margin: 0 10upx;
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					input{
						width: 80upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 26upx;
					}
				}
				
				.sub ,.add{
					width: 60upx;
					height: 60upx;
					background-color: #f3f3f3;
					border-radius: 5upx;
					.icon{
						font-size: 30upx;
						width: 60upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
		
	}
}

.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		
	}
</style>
