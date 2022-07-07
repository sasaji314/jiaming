<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="video" v-for="video in videoList"
				:key="video.video_id"
			>
				<uni-card :title="video.title" :sub-title="video.subtitle" :extra="video.extra"  >
					<video :id="video.video_id" :src="video.src"
						@error="videoErrorCallback" ></video>
				</uni-card>       
            </view>
           <!-- <view>
           	<uni-card title="宠物视频" sub-title="副标题" extra="额外信息"  >
           		<video id="myVideo" src="https://cdn.pixabay.com/vimeo/166221773/Cute%20Cat%20-%203092.mp4?width=1280&expiry=1656906870&hash=1b1468660acb772eeb2d1220de9f3e7b03a61d4d"
           		    @error="videoErrorCallback" ></video>
           	</uni-card>

           </view> -->

        </view>
    </view>
</template>



<script>
export default {
    data() {
        return {
            videoList:[
				{
					video_id: '1',
					title: '猫猫视频', 
					subtitle: '副标题', 
					extra: '额外信息',
					src: 'https://cdn.pixabay.com/vimeo/197914397/Lion%20-%206970.mp4?width=640&expiry=1657162434&hash=009cdbbaa887a0b078fce6f983da5d8c15dc71ee',
				},
				{
					video_id: '2',
					title: '猫猫视频2', 
					subtitle: '副标题', 
					extra: '额外信息',
					src: 'https://cdn.pixabay.com/vimeo/514139134/Cat%20-%2065438.mp4?width=1280&expiry=1657162464&hash=07bce7dc5e75a70c46da690d8fb9453e45a5c043',
				},
				{
					video_id: '3',
					title: '猫猫视频3', 
					subtitle: '副标题', 
					extra: '额外信息',
					src: 'https://cdn.pixabay.com/vimeo/166221773/Cute%20Cat%20-%203092.mp4?width=640&expiry=1657162485&hash=d47a4597a291d45f78382557a274cf89f565b04c',
				},
			],

		}	
    },
    onReady: function(res) {
        // #ifndef MP-ALIPAY
        this.videoContext = uni.createVideoContext('myVideo')
        // #endif
    },
    methods: {

        videoErrorCallback: function(e) {
            uni.showModal({
                content: e.target.errMsg,
                showCancel: false
            })
        },

    }
}
</script>


<style>
.video{
	justify-content: center;
}
</style>