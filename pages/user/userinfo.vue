<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					头像
				</view>
				<view class="right"><view class="tis">
				<image  mode="widthFix"src="../../static/cat.png"></image>
				</view><view class="icon xiangyou"></view></view>
			</view>
			<view class="row">
				<view class="nominal">
					姓名：
				</view>
				<view class="input">
					<input placeholder="请输入名字" type="text" v-model="username" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码：
				</view>
				<view class="input">
					<input placeholder="请输入电话号码" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					年龄：
				</view>
				<view class="input">
					<input placeholder="请输入年龄" type="text" v-model="age" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					所在地区：
				</view>
				<view class="input" @tap="chooseCity">
					{{region.label}}
				</view>
				
			</view>
			<view class="row">
				<view class="nominal">
					性别：
			    </view>
			    <view class="uni-px-5">
					<uni-data-checkbox v-model="radio" :localdata="sex"></uni-data-checkbox>
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存信息
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				userid:'',
				username:'',
				tel:'',
				age:'',
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
				region:{label:"请点击选择地址",value:[],cityCode:""},
				radio:0,
				sex:[{
					text:'男',
					value:0
				},
				{
					text:'女',
					value:1
				}],
				sexlabel:''
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
			save(){
				console.log(this.radio)
				if( this.radio === 0 )
				{
					this.sexlabel = '男'
					console.log("性别："+this.sexlabel)
				}
				else
				{
					this.sexlabel = '女'
					console.log("性别："+this.sexlabel)
				}
				let data={ "userid":this.userid,"username":this.username,"tel":this.tel,"age":this.age,"region":this.region.label,"sex":this.sexlabel}
				console.log(data)
				
				if(!data.username){
					uni.showToast({title:'请输入姓名',icon:'none'});
					return ;
				}
				if(!data.tel){
					uni.showToast({title:'请输入电话号码',icon:'none'});
					return ;
				}
				if(!data.age){
					uni.showToast({title:'请输入年龄',icon:'none'});
					return ;
				}
				if(data.region === "请点击选择地址" ){
					uni.showToast({title:'请选择地址',icon:'none'});
					return ;
				}
				//下面对后端进行交互 进行修改
				setTimeout(()=>{
					this.$axios.post('/user/edit',{
					userid:this.userid,
					username:this.username,
					tel:this.tel,
					age:this.age,
					sex:this.sexlabel,
					location:this.region.label
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
									//显示更新成功信息
									uni.showToast({
										icon:"success",
										title:rep.data.message
									})
									//跳转到 设置 页面
									uni.navigateTo({url: 'setting'});
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
				// if(!data.name){
				// 	uni.showToast({title:'请输入姓名',icon:'none'});
				// 	return ;
				// }
				// if(!data.tel){
				// 	uni.showToast({title:'请输入电话号码',icon:'none'});
				// 	return ;
				// }
				// if(!data.address.detailed){
				// 	uni.showToast({title:'请输入个人简介',icon:'none'});
				// 	return ;
				// }
				// if(data.address.region.value.length==0){
				// 	uni.showToast({title:'请选择地址',icon:'none'});
				// 	return ;
				// }
				// uni.showLoading({
				// 	title:'正在提交'
				// })
				//实际应用中请提交ajax,模板定时器模拟提交效果
				// setTimeout(()=>{
				// 	uni.setStorage({
				// 		key:'saveAddress',
				// 		data:data,
				// 		success() {
				// 			uni.hideLoading();
				// 			uni.navigateBack();
				// 		}
				// 	})
				// },300)
				
				
			}
		},
		onLoad(e) {
			//获取本地的参数
			uni.getStorage({
				key:'userInfo',
				success: (e) => {
					console.log(e.data)
					this.userid = e.data.userid;
					this.username = e.data.username;
					this.tel = e.data.tel;
					this.age = e.data.age;
					// this.sex.text = e.data.sex;
					this.region.label = e.data.location
					// this.detailed = e.data.address.detailed;
					// this.cityPickerValue = e.data.address.region.value;
					// this.region = e.data.address.region;
					if( e.data.sex === '男' )
					{
						this.radio = 0
					}
					else
					{
						this.radio = 1
					}
				}
			})
		
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>
<style lang="scss">

	.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
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
	.content{
		display: flex;
		flex-wrap: wrap;
		view{
			display: flex;
		}
		.row{
			width: 94%;
			margin: 0 3%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.input{
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.del{
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #f06c7a;
				background-color: rgba(255,0,0,0.05);
				border-bottom: solid 1upx #eee;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
			}
		}
	}
	
</style>
