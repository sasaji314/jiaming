<template>
	<view>
		<view class="main">
			<view class="title">开通vip</view>
			<view class="detail">现在加入即可享受查看商品和商店详情等服务</view>
			
			<view class="info">
				
				<uni-row class="demo-uni-row">
					<uni-col :span="8">
						<view class="left">
							<view class="LT">
								<text style="color: gainsboro;">超值优惠\n</text>
								<text style="font-size: 250%;">12\n</text>
								<text style="color: gainsboro;">个月</text>
							</view>
							<view class="LM">
								<text style="border-top: goldenrod solid 1px;color: gainsboro;">10元 / 月\n</text>
								<text style="color: goldenrod;">节省%67\n</text>
							</view>
							<view class="LB">
								<text style="border-top: goldenrod solid 1px;font-size: 150%;">￥120</text>
							</view>
						</view>
					</uni-col>
					<uni-col :span="8">
						<view class="mid">
							<view class="MT">
								<text style="color: gainsboro;">超值优惠\n</text>
								<text style="font-size: 250%;">6\n</text>
								<text style="color: gainsboro;">个月</text>
							</view>
							<view class="MM">
								<text style="border-top: goldenrod solid 1px;color: gainsboro;">15元 / 月\n</text>
								<text style="color: goldenrod;">节省%50\n</text>
							</view>
							<view class="MB">
								<text style="border-top: goldenrod solid 1px;font-size: 150%;">￥90</text>
							</view>
						</view>
					</uni-col>
					<uni-col :span="8">
						<view class="right">
							<view class="RT">
								<text style="color: gainsboro;">超值优惠\n</text>
								<text style="font-size: 250%;">1\n</text>
								<text style="color: gainsboro;">个月</text>
							</view>
							<view class="RM">
								<text style="border-top: goldenrod solid 1px;color: gainsboro;">30元 / 月\n\n</text>
							</view>
							<view class="RB">
								<text style="border-top: goldenrod solid 1px;font-size: 150%;">￥30</text>
							</view>
						</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="button">
				<button type="primary" @click="upGrade" style="background-color: #EB4621;">确认开通</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:'',
			}
		},
		methods: {
			upGrade(){
				console.log(this.userid)
				setTimeout(()=>{
					this.$axios.post('/user/upgrade',{
					userid:this.userid,
					}).then(rep=>{
						if(rep.data.code == 100){
							console.log(rep.data.message);
							let userdata={"userid":rep.data.data.userid,"username":rep.data.data.username,"privilege":rep.data.data.privilege,"tel":rep.data.data.tel,"age":rep.data.data.age,"sex":rep.data.data.sex,"location":rep.data.data.location}
							//存储用户信息到本地
							uni.setStorage({
								key:"userInfo",
								data:userdata,
								success() {
									//显示升级成功信息
									uni.showToast({
										icon:"success",
										title:rep.data.message
									})
									//跳转到tabBar
									uni.switchTab({url: 'user'});
									uni.navigateBack();
								}
							})
						}else{
								uni.showToast({
									icon:"error",
									title:rep.data.message
								})
							}
					})
				},300)
			},
			onLoad(){
				uni.getStorage({
					key:'userInfo',
					success: (e) => {
						console.log(e.data)
						this.userid = e.data.userid
					}						
				})
			},
		}
	}
</script>

<style>
	page{position: relative;background-color: black;}
	.main{
		width: 92%;
		margin: 8% 4% 0 4%;
		padding: 2% 0 10% 0;
		background-color: #fff;
		text-align: center;
		border-radius: 25px;
		
	}
	
	.title{
		margin-top: 5%;
		margin-bottom: 10%;
		
		font-size: 200%;
		color:goldenrod;
	}
	.detail{
		margin-top: 5%;
		padding-top: 5%;
		font-size: 100%;
	}
	
	.info{
		padding-top:25% ;
	}
	
	.LM{
		padding-top: 10%;	
	}
	.LB{
		padding-top: 10%;
	}
	.MM{
		padding-top: 10%;	
	}
	.MB{
		padding-top: 10%;
	}
	.RM{
		padding-top: 10%;	
	}
	.RB{
		padding-top: 10%;
	}
	
	.button{
		padding: 10% 10% 0 10%;
		border-radius: 25px;
	}
</style>
