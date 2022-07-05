<template>
	<view>
		<!-- <label>起点：<input v-model="keyword1"></label>
		<label>终点：<input v-model="keyword2"></label> -->
		<baidu-map :pinch-to-zoom="true" @click="getClickInfo" :center="{lng: 118.903, lat: 24.63}">
			<!--按钮 -->
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" 
			@locationSuccess="getLocation" @locationError="getError"></bm-geolocation>
			<bm-control>
				<button v-show="type == 'A' || type =='C' " @click="guide">导航到所选位置</button>
				<button v-show="type == 'B'" @click="cancel">取消</button>
			</bm-control>
			
			<bm-view class="map"></bm-view>
			
			<!-- 区域搜索 -->
			<bm-local-search :keyword="keyword2" :nearby="nearby" :auto-viewport="true" :location="location"
				v-if="type == 'A' "
			></bm-local-search>
			
			<bm-local-search :keyword="keyword2" :nearby="nearby2" :auto-viewport="true" :location="location"
				v-if="type == 'C' "
			></bm-local-search>
			
				 
			<!-- 路线规划 -->
				<bm-driving v-else-if="type == 'B' "
					:start="mycenter"
					:end="destination"
					startCity="厦门"
					endCity="厦门"
					:auto-viewport="true"
			    ></bm-driving>
		</baidu-map>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				keyword1: '厦门理工学院',
				keyword2: '宠物',
				location: {
						// 理工经纬度
						lng: 118.093, lat: 24.63,
				},
				type: 'A',
				destination:{
					lng:0 , lat:0,
				},
				nearby:{
					center: {
						// 理工经纬度
						lng: 118.093, lat: 24.63,
					},
					
					radius: 2000
				},
				nearby2:{
					center: {
						// 理工经纬度
						lng: 118.093, lat: 24.63,
					},
					
					radius: 2000
				},
				mycenter: {	
					lng:0, lat:0,
				},
				
			}
		},
		methods: {
			getClickInfo (e) {
				console.log(e.point.lng, e.point.lat);
				this.destination.lng = e.point.lng;
				this.destination.lat = e.point.lat;
			},
			
			getLocation (f){
				this.mycenter.lng = f.point.lng;
				this.mycenter.lat = f.point.lat;
				this.nearby2.center.lng = f.point.lng;
				this.nearby2.center.lat = f.point.lat;
				this.type = 'C';
				console.log( '定位坐标为:', this.mycenter.lng , this.mycenter.lat);
			},
			
			getError (){
				console.log("error");
			},
			
			guide (){
				if(this.destination.lng == 0 || this.destination.lat == 0){
					this.getError();
					uni.showToast({title:'请点击选择目的地',icon:'none'});
				}
				else if(this.mycenter.lng == 0 || this.mycenter.lat == 0){
					uni.showToast({title:'请先点击右下角按钮进行定位',icon:'none'});
				}
				else{
					this.type = 'B';
				}
			},
			
			cancel (){
				if(this.type == 'B'){
					this.type = 'C';
					this.destination.lng = 0;
					this.destination.lat = 0;
				}
				else{
					this.getError();
				}									
			},
		},
		
		
	}
</script>

<style>
.map {
  width: 100%;
  height: 500px;
}

</style>
