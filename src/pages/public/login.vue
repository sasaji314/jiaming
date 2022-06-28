<template>
	<view class="uni-padding-wrap uni-common-mt">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">姓名</view>
				<input class="uni-input" v-model="username" placeholder="请输入姓名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" password="true" v-model="password" name="password" placeholder="请输入密码" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		methods: {
			formSubmit:function(e){
				//去除所有空格
				// console.log(this.username.replace(/[, ]/g,'').length)
				
				//前端输入框判空
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
									uni.showToast({
										icon:"success",
										title:rep.data.message
									})
								}else{
									uni.showToast({
										icon:"error",
										title:rep.data.message
									})
								}
							})	
				} 
			},
			formReset: function(e) {
				this.username=''
				this.password=''
			}
		}
	}
</script>

<style>

</style>
