<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
					<view class="center">
						<view class="name-tel">
							<view class="name">{{row.username}}</view>
							<view class="tel">{{row.tel}}</view>
							<view class="default" v-if="row.isDefault">
								默认
							</view>
						</view>
						<view class="address">
							{{row.region}} {{row.detailed}}
						</view>
					</view>
					<view class="right">
						<view class="icon bianji" @tap.stop="edit(row)">
							<uni-icons type="compose" size="30"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isSelect:false,
				userid:'',
				addressList:[
					// {id:1,username:"大黑哥",tel:"18816881688",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:true},
					// {id:2,username:"大黑哥",tel:"15812341234",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深北小道2222号有名公寓502'},isDefault:false},
					// {id:3,username:"老大哥",tel:"18155467897",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:false},
					// {id:4,username:"王小妹",tel:"13425654895",address:{region:{"label":"广东省-深圳市-福田区","value":[18,2,1],"cityCode":"440304"},detailed:'深南大道1111号无名摩登大厦6楼A2'},isDefault:false},
				]
			};
		},
		onShow() {
			let self = this;
			console.log(this.addressList.length)
			//先从本地缓存获取用户id
			uni.getStorage({
				key:'userInfo',
				success: (e) => {
					self.userid=e.data.userid
				}							
			})
			setTimeout(()=>{
				this.$axios.post('/address/showAllAddress',{
					userid:this.userid,
				}).then(rep=>{
					if(rep.data.code == 100){
						console.log(rep.data.message);
						console.log(rep.data.data);
						self.addressList = rep.data.data
					}else{
							uni.showToast({
								icon:"error",
								title:rep.data.message
							})
						}
				})
			},300)
		},
		onLoad(e) {
			if(e.type=='select'){
				this.isSelect = true;
			}
		},
		methods:{
			edit(row){
				console.log(row.adsid)
				uni.setStorage({
					key:'address',
					data:row,
					success() {
						uni.navigateTo({
							url:"edit/edit?type=edit"
						})
					}
				});
				
			},
			add(){
				uni.navigateTo({
					url:"edit/edit?type=add"
				})
			},
			select(row){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if(!this.isSelect){
					return ;
				}
				uni.setStorage({
					key:'selectAddress',
					data:row,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
view{
	display: flex;
}
	.add{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.list{
		flex-wrap: wrap;
		.row{
			width: 96%;
			padding: 20upx 2%;
			padding-bottom: 4%;
			height: 20%;
			margin-bottom: 2%;
			border-bottom: #aaa solid 1upx;
			// .left{
			// 	width: 90upx;
			// 	flex-shrink: 0;
			// 	align-items: center;
			// 	.head{
			// 		width: 70upx;
			// 		height: 70upx;
			// 		background:linear-gradient(to right,#ccc,#aaa);
			// 		color: #fff;
			// 		justify-content: center;
			// 		align-items: center;
			// 		border-radius: 60upx;
			// 		font-size: 35upx;
			// 	}
			// }
			.center{
				width: 100%;
				flex-wrap: wrap;
				.name-tel{
					width: 100%;
					align-items: baseline;
					.name{
						font-size: 34upx;
					}
					.tel{
						margin-left: 30upx;
						font-size: 24upx;
						color: #777;
					}
					.default{

						font-size: 22upx;
						
						background-color: #f06c7a;
						color: #fff;
						padding: 0 18upx;
						border-radius: 24upx;
						margin-left: 20upx;
					}
				}
				.address{
					width: 100%;
					font-size: 24upx;
					align-items: baseline;
					color: #777;
				}
			}
			.right{
				flex-shrink: 0;
				align-items: center;
				padding-left: 1%;
				border-left: solid 1upx #aaa;
				font-size: 20upx;
				// .icon{
				// 	justify-content: center;
				// 	align-items: center;
				// 	width: 80upx;
				// 	height: 60upx;
					
				// 	font-size: 40upx;
				// 	color: #777;
				// }
			}
		}
	}
</style>
