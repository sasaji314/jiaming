<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收件人
				</view>
				<view class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="username" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					所在地区
				</view>
				<view class="input" @tap="chooseCity">
					{{region.label}}
				</view>
				
			</view>
			<view class="row">
				<view class="nominal">
					详细地址
				</view>
				<view class="input">
					<textarea v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch">
					<switch color="#f06c7a" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
			<view class="row" v-if="editType=='edit'" @tap="del">
				<view class="del">
					删除收货地址
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
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
				editType:'edit',
				userid:'',
				id:'',
				username:'',
				tel:'',
				detailed:'',
				isDefault:false,
				changeDefault:'',
				cityPickerValue: [0, 0, 0],
				themeColor: '#007AFF',
				region:{label:"请点击选择地址",value:[],cityCode:""}
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
			isDefaultChange(e){
				this.isDefault = e.detail.value;
			},
			del(){
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: (res)=>{
						if (res.confirm) {
							console.log(this.userid);
							console.log(this.id);
							this.$axios.post('/address/del',{
								userid:this.userid,
								adsid:this.id
							}).then(rep=>{
								if(rep.data.code == 100){
									console.log(rep.data.message);
									console.log(rep.data.data);
									this.addressList = rep.data.data
									//跳转到地址
									uni.navigateTo({
										url:'../address'
									})
								}else{
										uni.showToast({
											icon:"error",
											title:rep.data.message
										})
									}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			save(){
				let data={"username":this.username,"tel":this.tel,"address":{"region":this.region,"detailed":this.detailed},"isDefault":this.isDefault}
				if(this.editType=='edit'){
					data.id = this.id
					console.log( '地址id：'+this.id+'\n' )
				}
				if(!data.username){
					uni.showToast({title:'请输入收件人姓名',icon:'none'});
					return ;
				}
				if(!data.tel){
					uni.showToast({title:'请输入收件人电话号码',icon:'none'});
					return ;
				}
				if(this.editType=='add')
				{
					if(data.address.region.value.length==0){
						uni.showToast({title:'请选择收件地址',icon:'none'});
						return ;
					}
				}
				if(!data.address.detailed){
					uni.showToast({title:'请输入收件人详细地址',icon:'none'});
					return ;
				}
				// if(data.address.region.value.length==0){
				// 	uni.showToast({title:'请选择收件地址',icon:'none'});
				// 	return ;
				// }
				uni.showLoading({
					title:'正在提交'
				})
				
				//实际应用中请提交ajax,模板定时器模拟提交效果
				setTimeout(()=>{
					
					if(this.isDefault === true )
					{
						this.changeDefault = 1;
						console.log("修改isDefault的值："+this.changeDefault+"\n")
					}
					else
					{
						this.changeDefault = 0;
						console.log("修改isDefault的值："+this.changeDefault+"\n")
					}
					
					if( this.editType=='edit' ){
						console.log("这是编辑")
						
						console.log("用户id："+this.userid+'\n'
						+"地址id："+this.id+'\n'
						+"姓名："+this.username+"\n"
						+"电话号码："+this.tel+"\n"
						+"所在地区 label："+this.region.label+"\n"
						+"所在地区 cityCode："+this.region.cityCode+"\n"
						+"所在地区 value："+this.region.value+"\n"
						+"详细地址："+this.detailed+"\n"
						+"默认地址："+this.changeDefault+"\n")
						
						this.$axios.post('/address/edit',{
							userid:this.userid,
							adsid:this.id,
							username:this.username,
							tel:this.tel,
							region:this.region.label,
							detailed:this.detailed,
							isDefault:this.changeDefault,
						}).then(rep=>{
							if(rep.data.code == 100){
								console.log(rep.data.message);
								uni.showToast({
									icon:"success",
									title:rep.data.message
								})
								// uni.navigateTo({
								// 	url:'../address'
								// })
								// let data = {"userid":this.userid,"id":rep.data.data.adsid,"username":this.username,"tel":this.tel,"address":{"region":this.region,"detailed":this.detailed},"isDefault":this.isDefault}
								// uni.setStorage({
								// 	key:'saveAddress',
								// 	data:data,
								// 	success() {
								// 		uni.showToast({
								// 			icon:"success",
								// 			title:rep.data.message
								// 		})
								// 		uni.navigateTo({
								// 			url:'../address'
								// 		})
								// 	}
								// })
							}else{
									uni.showToast({
										icon:"error",
										title:rep.data.message
									})
								}
						})	
					}
					else{
						console.log("这是新增")
						// uni.navigateTo({
						// 	url:'../address'
						// })
						console.log("用户id："+this.userid+'\n'
						+"姓名："+this.username+"\n"
						+"电话号码："+this.tel+"\n"
						+"所在地区 label："+this.region.label+"\n"
						+"所在地区 cityCode："+this.region.cityCode+"\n"
						+"所在地区 value："+this.region.value+"\n"
						+"详细地址："+this.detailed+"\n"
						+"默认地址："+this.changeDefault+"\n")
						
						this.$axios.post('/address/add',{
							userid:this.userid,
							username:this.username,
							tel:this.tel,
							region:this.region.label,
							detailed:this.detailed,
							isDefault:this.changeDefault,
						}).then(rep=>{
							if(rep.data.code == 100){
								console.log(rep.data.message);
								uni.showToast({
									icon:"success",
									title:rep.data.message
								})
								uni.navigateTo({
									url:'../address'
								})
								// let data = {"userid":this.userid,"id":rep.data.data.adsid,"username":this.username,"tel":this.tel,"address":{"region":this.region,"detailed":this.detailed},"isDefault":this.isDefault}
								// uni.setStorage({
								// 	key:'saveAddress',
								// 	data:data,
								// 	success() {
								// 		uni.showToast({
								// 			icon:"success",
								// 			title:rep.data.message
								// 		})
								// 		uni.navigateTo({
								// 			url:'../address'
								// 		})
								// 	}
								// })
							}else{
									uni.showToast({
										icon:"error",
										title:rep.data.message
									})
								}
						})	
						
					}
					// uni.setStorage({
					// 	key:'saveAddress',
					// 	data:data,
					// 	success() {
					// 		uni.hideLoading();
					// 		uni.navigateTo({
					// 			url:'../address'
					// 		})
					// 	}
					// })
				},300)
				
				
			}
		},
		onLoad(e) {
			//获取传递过来的参数
			this.editType = e.type;
			if(e.type=='edit'){
				uni.getStorage({
					key:'address',
					success: (e) => {
						this.id = e.data.adsid;
						console.log("地址id:"+this.id)
						this.username = e.data.username;
						this.tel = e.data.tel;
						this.detailed = e.data.detailed;
						this.isDefault = e.data.isDefault;
						this.cityPickerValue = e.data.region.value;
						this.region.label = e.data.region;
					}
				})
			}
			
			//先从本地缓存获取用户id
			uni.getStorage({
				key:'userInfo',
				success: (e) => {
					this.userid=e.data.userid
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
		}
	}
	
</style>
