<template>
	<el-card class="rditors">
		<div slot="header" class="clearfix">
			<span>添加文章</span>
		</div>
		<el-form class="formDatas" label-width="80px" :model="postData">
			<el-form-item label="标题">
				<el-input v-model="postData.title"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="postData.type" placeholder="请选择">
				    <el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
				  </el-select>
			</el-form-item>
			<el-form-item label="封面图">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :http-request="uploadFile">
					<img v-if="postData.cover" :src="postData.cover" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="内容">
				<div class="editor">
					<vue-ueditor-wrap v-model="postData.context" :config="myConfig"></vue-ueditor-wrap>
				</div>
			</el-form-item>
		</el-form>
		<div class="BtnBox">
			<el-button @click="$router.back()">返回上一页</el-button>
			<el-button type="primary" @click="add">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'
	export default {
		components:{
			VueUeditorWrap
		},
		data() {
			return {
				postData: {
					title: '',
					context: '',
					cover: '',
					type: ''
				},
				myConfig: {
				 //禁用编辑器
				  readonly: false,
				  // 编辑器不自动被内容撑高
				  autoHeightEnabled: false,
				  // 初始容器高度
				  initialFrameHeight: 420,
				  // 初始容器宽度
				  initialFrameWidth: '100%',
				  // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
				  // serverUrl: 'https://chenzhouhuang.utools.club/ueditorConfig',
				  serverUrl: 'http://47.114.59.188/coupon/ueditorConfig',
				  // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
				  UEDITOR_HOME_URL: '/UEditor/'
				},
				typelist: []
			}
		},
		mounted() {
			this.getpagelist()
		},
		methods: {
			getpagelist(){
				this.$request.get('/back/type/getInformationType').then(res=>{
					if (res.code == 'succes') {
						this.typelist = res.data
					}
				})
			},
			uploadFile(file) {
				let Files = file.file
				let formData = new FormData()
				formData.append('fileList', Files)
				this.$request.uploading('/upload/one/upLoadImg', formData).then(res => {
					if (res.code == 'succes') {
						this.postData.cover = res.data
					}
				})
			},
			add() {
				this.$request.postJson('/back/type/addInformation', this.postData).then(res => {
					if (res.code == 'succes') {
						this.$message.success('新增成功')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					}
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.bannerImage,
	.imagesListItem {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		position: relative;
	}

	.formDatas>>>.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.avatar {
		width: 50px;
		height: 50px;
		display: block;
	}

	.imagesList {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}

	.imagesListItem {
		margin-right: 20px;
	}

	.BtnBox {
		text-align: center;
		margin-top: 20px;
	}

	.imgIcon {
		position: absolute;
		color: #FFFFFF;
		background: red;
		border-radius: 100%;
		top: -5px;
		right: -5px;
		cursor: pointer;
	}
	.rditors>>>.el-form-item__content{
		line-height: 22px ;
	}
</style>
