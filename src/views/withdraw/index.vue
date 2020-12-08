<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>提现管理</span>
			<el-button type="text" style="float: right;margin-top: -10px;" @click="excelTXList">导出列表</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<!-- <el-form-item label="店铺名称">
				<el-input v-model="queryData.name" placeholder="店铺名称"></el-input>
			</el-form-item> -->
			<el-form-item label="是否打款">
				<el-select v-model="queryData.type" placeholder="请选择">
					<el-option label="未打款" value="1"></el-option>
					<el-option label="已打款" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryDataGetShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="pageData.list" border style="width: 100%">
			<el-table-column prop="userName" label="用户"></el-table-column>
			<el-table-column prop="realName" label="姓名"></el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column prop="bankNum" label="银行卡"></el-table-column>
			<el-table-column prop="bankName" label="开户行"></el-table-column>
			<el-table-column prop="date" label="是否打款">
				<template slot-scope="scope">
					{{ scope.row.status == 1?'未打款':'已打款' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button type="text" @click="submitWithdraw(scope.row)" :disabled="scope.row.status==1?false:true">确认打款</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				pageData: '',
				tableData: [{}],
				queryData: {
					type: '1',
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
				this.$request.postJson('/user/selectUserWithdraw', this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
					}
				})
			},
			submitWithdraw(item) {
				this.$confirm('确认打款', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson('/user/isOk', {
						id: item.id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('操作成功')
							this.getPageData()
						}
					})
				})
			},
			excelTXList() {
				// 导出
				if (this.pageData && this.pageData.list.length > 0) {
					this.$request.download('/excel/excelTXList', {
						type: this.queryData.type,
					}).then(res => {
						// if (res.code == 'succes') {
							console.log(res)
						const blob = res;
						const reader = new FileReader();
						reader.readAsDataURL(blob);
						reader.onload = (e) => {
							const a = document.createElement('a');
							a.download = Date.parse(new Date()) + '.xlsx';
							// 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
							a.href = e.target.result;
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
							this.$message.success('操作成功')
							// this.getPageData()
						}
					}).catch(e=>{
						this.$message.error('下载失败')
					})
				} else {
					this.$message.error('没有可导出的数据')
				}
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
</style>
