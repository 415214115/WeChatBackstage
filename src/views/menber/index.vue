<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>用户列表</span>
			<!-- <el-button type="text" style="float: right;margin-top: -10px;" @click="excelTXList">导出列表</el-button> -->
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="姓名">
				<el-input v-model="queryData.name" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item label="电话">
				<el-input v-model="queryData.phone" placeholder="电话"></el-input>
			</el-form-item>
			<el-form-item label="开始时间">
				<el-date-picker
				      v-model="queryData.beginTime"
				      type="date"
				      placeholder="选择日期"
				      format="yyyy 年 MM 月 dd 日"
				      value-format="timestamp">
				    </el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-date-picker
				      v-model="queryData.endTime"
				      type="date"
				      placeholder="选择日期"
				      format="yyyy 年 MM 月 dd 日"
				      value-format="timestamp">
				    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryDataGetShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="pageData.list" border style="width: 100%">
			<el-table-column prop="img" label="头像">
				<template slot-scope="scope">
				<el-image class="userimg" :src="scope.row.img" fit="cover"></el-image>
			  </template>
			</el-table-column>
			<el-table-column prop="name" label="昵称"></el-table-column>
			<el-table-column prop="realName" label="用户"></el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column prop="bankNum" label="银行卡"></el-table-column>
			<el-table-column prop="createTime" label="注册时间"></el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				pageData: '',
				queryData: {
					name: '',
					phone: '',
					beginTime: '',
					endTime: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				}
			}
		},
		mounted() {
			this.getPageData()
		},

		methods: {
			paginaClick(val) {
				this.queryData.pageNum = val
				this.getPageData()
			},
			queryDataGetShopList() {
				this.queryData.pageNum = 1
				this.getPageData()
			},
			getPageData() {
				this.$request.postJson('/back/type/selectUserList', this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
					}
				})
			},
			// submitWithdraw(item) {
			// 	this.$confirm('确认打款', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(() => {
			// 		this.$request.postJson('/user/isOk', {
			// 			id: item.id
			// 		}).then(res => {
			// 			if (res.code == 'succes') {
			// 				this.$message.success('操作成功')
			// 				this.getPageData()
			// 			}
			// 		})
			// 	})
			// },
			// excelTXList() {
			// 	// 导出
			// 	if (this.pageData && this.pageData.list.length > 0) {
			// 		this.$request.download('/excel/excelTXList', {
			// 			type: this.queryData.type,
			// 		}).then(res => {
			// 			// if (res.code == 'succes') {
			// 				console.log(res)
			// 			const blob = res;
			// 			const reader = new FileReader();
			// 			reader.readAsDataURL(blob);
			// 			reader.onload = (e) => {
			// 				const a = document.createElement('a');
			// 				a.download = Date.parse(new Date()) + '.xlsx';
			// 				// 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
			// 				a.href = e.target.result;
			// 				document.body.appendChild(a);
			// 				a.click();
			// 				document.body.removeChild(a);
			// 				this.$message.success('操作成功')
			// 				// this.getPageData()
			// 			}
			// 		}).catch(e=>{
			// 			this.$message.error('下载失败')
			// 		})
			// 	} else {
			// 		this.$message.error('没有可导出的数据')
			// 	}
			// }
		}
	}
</script>

<style scoped="scoped">
	.bannerImage {
		width: 50px;
		height: 50px;
		border-radius: 5px;
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

	.look {
		color: #8c939d;
		font-size: 12px;
		margin-left: 10px;
	}

	.cardImg {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.userimg{
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
</style>
