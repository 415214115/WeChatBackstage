<template>
	<el-card class="el-card">
		<div slot="header" class="clearfix">
			<span>分润管理</span>
		</div>
		<el-form class="formDatas" label-width="150px" :model="postData">
			<el-form-item :label="postData.name">
				<el-input-number v-model="postData.value" :min="1" label=""></el-input-number>
				<!-- <el-input v-model="postData.value" maxlength="12"></el-input> -->
			</el-form-item>
		</el-form>
		<div class="BtnBox">
			<!-- <el-button @click="$router.back()">返回上一页</el-button> -->
			<el-button type="primary" @click="add">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				postData:{}
			}
		},
		mounted() {
			this.getBanben()
		},
		methods: {
			getBanben(){
				this.$request.get('/back/type/getFenrun').then(res=>{
					if(res.code == 'succes'){
						this.postData = res.data
						console.log(res)
					}
				})
			},
			add(){
				this.$request.postJson('/back/type/updateVersionList', this.postData).then(res=>{
					if(res.code == 'succes'){
						this.$message.success('更新成功')
						this.getBanben()
					}
				})
			},
			// uploadFile(file){
			// 	this.upload(file, 'file')
			// },
			// uploadFileCode(file){
			// 	this.upload(file, 'code')
			// },
			// upload(file, type){
			// 	let Files = file.file
			// 	let formData = new FormData()
			// 	formData.append('fileList', Files)
			// 	this.$request.uploading('/upload/one/upLoadImg', formData).then(res => {
			// 		if (res.code == 'succes') {
			// 			if(type == 'code'){
			// 				this.postData.erma = res.data
			// 			} else {
			// 				this.postData.img = res.data
			// 			}
						
			// 		}
			// 	})
			// }
			// shopfocus(e){
			// 	this.postData.shopId = ''
			// 	this.getshopList()
			// },
			// remoteMethod(query){
			// 		this.loading = true
			// 		this.queryData.name = query
			// 		this.getshopList()
			// },
			// getshopList(){
			// 	this.$request.postJson('/shop/selectShopByCon',this.queryData).then(res => {
			// 		if (res.code == 'succes') {
			// 			this.shopList = res.data.list
			// 			this.loading = false
			// 		}
			// 	})
			// },
			// add() {
			// 	if(
			// 		!this.postData.name ||
			// 		!this.postData.shopId ||
			// 		!this.postData.num ||
			// 		!this.postData.money ||
			// 		!this.postData.overTime ||
			// 		!this.postData.couponType ||
			// 		!this.postData.context
			// 	){
			// 		this.$message.error('字段不能为空')
			// 		return
			// 	}
			// 	this.$request.postJson('/discounts/addCouponByShop', this.postData).then(res => {
			// 		if (res.code == 'succes') {
			// 			this.$message.success('新增成功')
			// 			setTimeout(() => {
			// 				this.$router.back()
			// 			}, 500)
			// 		}
			// 	})
			// },
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

	.el-card>>>.avatar-uploader .el-upload {
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
	.formDatas>>>.el-form-item .el-input {
	    max-width: 215px !important;
		width: auto;
	}
	 .avatar-uploader .el-upload {
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
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>
