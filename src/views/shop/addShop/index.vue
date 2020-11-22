<template>
	<el-card>
		<div class="dialogContent">
			<el-form label-width="100px" :model="dialogForm">
				<el-form-item label="店铺名称">
					<el-input v-model="dialogForm.name"></el-input>
				</el-form-item>
				<el-form-item label="店铺标题">
					<el-input v-model="dialogForm.title"></el-input>
				</el-form-item>
				<el-form-item label="店铺类型">
					<el-select v-model="dialogForm.type" placeholder="请选择">
					    <el-option v-for="item in shopTypeList" :key="item.id"
					      :label="item.name"
					      :value="item.id"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="dialogForm.address"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="dialogForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="店铺LOGO">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
					 :http-request="upLoadLogo">
						<img v-if="dialogForm.imgs" :src="dialogForm.imgs" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="店铺封面">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
					 :http-request="upLoadFm">
						<img v-if="dialogForm.log" :src="dialogForm.log" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="店铺轮播图">
					<div class="imagesList">
						<div class="imagesListItem" v-for="item in shopImageList" :key="item[0]">
							<el-image class="bannerImage " :src="item[1]" fit="cover"></el-image>
							<i class="el-icon-remove-outline imgIcon" @click="deleteImg(item[0])"></i>
							<!-- <i class="el-icon-remove-outline imgIcon"></i> -->
						</div>
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						 :http-request="upLoadBanner">
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="BtnBox">
			<el-button @click="$router.back()">返回上一页</el-button>
			<el-button type="primary" @click="add">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				dialogForm: {
					name: '', // 店铺名称
					title: '', // 店铺标题
					imgs: '', // 店铺图片
					log: '', // 店铺展示首页图 不能为空
					address: '' ,// 店铺地址
					phone: '' ,// 店铺电话
					type: '' ,// 店铺类型
					imgList: [] // 店铺轮播图
				},
				shopTypeList: '',
				shopImageList: new Map()
			}
		},
		mounted() {
			this.getShopType()
		},
		methods:{
			add(){
				this.dialogForm.imgList = [...this.shopImageList.values()]
				if(
					!this.dialogForm.name || 
					!this.dialogForm.title || 
					!this.dialogForm.address || 
					!this.dialogForm.phone || 
					!this.dialogForm.type
				){
					this.$message.error('参数不能为空')
					return
				}
				if(
					!this.dialogForm.imgs || 
					!this.dialogForm.log || 
					this.dialogForm.imgList.length < 1
				){
					this.$message.error('必须上传图片')
					return
				}
				this.$request.postJson('/shop/addShop', this.dialogForm).then(res => {
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						setTimeout(()=>{
							this.$router.back()
						},300)
					}
				})
			},
			getShopType(){
				this.$request.get('/back/type/getShopType').then(res => {
					if (res.code == 'succes') {
						this.shopTypeList = res.data
					}
				})
			},
			upLoadLogo(file){
				// logo
				this.upLoadFile(file, (url)=>{
					this.dialogForm.imgs = url
				})
			},
			upLoadFm(file){
				// 封面
				this.upLoadFile(file, (url)=>{
					this.dialogForm.log = url
				})
			},
			upLoadBanner(file){
				// 轮播图
				let File = file.file 
				this.upLoadFile(file, (url)=>{
					this.shopImageList.set(File.lastModified, url)
					this.$forceUpdate()
				})
			},
			upLoadFile(file, callBack){
				let File = file.file
				let formData = new FormData()
				formData.append('fileList', File)
				this.$request.uploading('/upload/one/upLoadImg', formData).then(res => {
					if (res.code == 'succes') {
						callBack(res.data)
					}
				})
			},
			deleteImg(id){
				// 删除
				this.shopImageList.delete(id)
				this.$forceUpdate()
			}
		}
	}
</script>

<style scoped="scoped">
	.bannerImage {
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
	.imagesListItem,.bannerImage {
		width: 100px;
		height: 100px;
		border-radius: 5px;
		position: relative;
	}
	.imagesList {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
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
	.imagesListItem {
		margin-right: 20px;
	}
	.dialogContent>>>.avatar-uploader .el-upload {
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
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
	.BtnBox {
		text-align: center;
		margin-top: 20px;
	}
</style>
