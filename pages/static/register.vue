<template>
	<view>
		<view class="logo">
			<view class="img">
				<image mode="widthFix" src="../../static/cat.png"></image>
			</view>
		</view>
		<view class="form re">
			<view class="username">
				<!-- <view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view> -->
				<input placeholder="请输入用户名" v-model="username" placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
				<!-- 	<view class="code">
						<input placeholder="请输入验证码" v-model="code" placeholder-style="color: rgba(255,255,255,0.8);"/>
					</view> -->
			<view class="password">
				<input placeholder="请输入密码" v-model="password" password=true placeholder-style="color: rgba(255,255,255,0.8);"/>
			</view>
			<view class="btn" @tap="doReg">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
		</view>
		<view class="page-footer">
			<view class="page-footer-title"> ————	第三方账户登录 ———— </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:'',
				privilege:1,
			}
		},
		methods: {
			//1-用户 2-会员 3-商家 4-管理员 默认注册为用户
			doReg(){
					uni.hideKeyboard()
							//模板示例部分验证规则
							// if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
							// 	uni.showToast({title: '请填写正确手机号码',icon:"none"});
							// 	return false; 
							// } 
							// //示例验证码，实际使用中应为请求服务器比对验证码是否正确。
							// if(this.code!=1234){ 
							// 	uni.showToast({title: '验证码不正确',icon:"none"});
							// 	return false; 
							// }
					console.log(this.username.trim().length)
					console.log(this.privilege)
					uni.showLoading({
						title: '提交中...'
					})
					//模板示例把用户注册信息储存在本地，实际使用中请替换为上传服务器。
					setTimeout(()=>{
						if( this.username.trim().length === 0 || this.password.trim().length === 0 ){
							uni.showToast({
								title:"用户名或密码为空",
								icon:"error"
							})
						}
						else{
								this.$axios.post('/user/register',{
								username:this.username,
								password:this.password,
								privilege:this.privilege
								}).then(rep=>{
									if(rep.data.code == 100){
										console.log(rep.data.message);
										uni.showToast({
											icon:"success",
											title:rep.data.message
										})
										uni.redirectTo({url: 'index'});
										uni.navigateBack();
									}else{
											uni.showToast({
												icon:"error",
												title:rep.data.message
											})
										}
								})
								uni.navigate({url: 'login'});
								uni.navigateBack();
							}
					},500)
			},
			toLogin(){ 
				uni.hideKeyboard()
				uni.redirectTo({url: 'login'});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/css/login.scss";
	
	.page-footer{
			padding: 19px;
			text-align: center;
	}
	
	.page-footer-title{
		display: inline-block;
		padding: 0 22px;
		font-size: 16px;
		height: 48px;
		line-height: 48px;
		color: #ffffff;
		// box-sizing: border-box;
		// border-bottom: 1px solid #D8D8D8;
	}
</style>
