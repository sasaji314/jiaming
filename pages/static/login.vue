<template>
	<view>
		<!-- 图片资源 -->
        <view class="logo">
			<view class="img">
				<image mode="widthFix" src="../../static/cat.png"></image>
			</view>
		</view>
		<!-- 账号密码输入框 -->
		<view class="form">
			<view class="username">
				<input placeholder="请输入用户名" v-model="username" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="password" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doLogin">登 录</view>
			<view class="res">
				<view @tap="toPage('register')">用户注册</view>
				<view @tap="toPage('resetpasswd')">忘记密码</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				password:'',
			}
		},
		onShow() {
			
		},
		onLoad() {
			
		}, 
		methods: {
			toPage(page){
				uni.hideKeyboard()
				uni.navigateTo({
					url: page
				});
			},
			doLogin(){
				uni.hideKeyboard();
				//验证手机号码
				// if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
				// 	uni.showToast({title: '请填写正确手机号码',icon:"none"});
				// 	return false; 
				// }
				uni.showLoading({
					title: '提交中...'
				})
				//模板示例比对本地储存的用户信息，实际使用中请替换为上传服务器比对。
				setTimeout(()=>{
					if( this.username.trim().length === 0 || this.password.trim().length === 0 ){
						uni.showToast({
							title:"用户名或密码为空",
							icon:"error"
						})
					}
					else{
							this.$axios.post('/user/login',{
							username:this.username,
							password:this.password,
							}).then(rep=>{
								if(rep.data.code == 100){
									console.log(rep.data.message);
									let userdata={"userid":rep.data.data.userid,"username":rep.data.data.username,"privilege":rep.data.data.privilege,"tel":rep.data.data.tel,"age":rep.data.data.age,"sex":rep.data.data.sex,"location":rep.data.data.location}
									console.log(userdata)
									//存储用户信息到本地
									uni.setStorage({
										key:"userInfo",
										data:userdata,
										success() {
											//显示登录成功信息
											uni.showToast({
												icon:"success",
												title:rep.data.message
											})
											//跳转到tabBar
											uni.switchTab({url: '../index/index'});
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
						}
				},500)
			}
		}
	}
</script>
<style lang="scss">
	@import "../../static/css/login.scss";
	
	.form {
		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			color: rgba($color: #ffffff, $alpha: 0.8);
		}
	}
	.oauth{
		@media all and (max-height:150vw){
			display: none;
		}
		position: absolute;
		bottom: 50upx;
		width: 100%;
		.text{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba($color: #ffffff, $alpha: 0.8);
			font-size: 28upx;
		}
		.list{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20upx 0;
			.icon{
				font-size:80upx;
				margin: 0 30upx;
			}
		}
	}
</style>