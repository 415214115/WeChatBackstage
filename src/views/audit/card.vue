<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>身份证审核</span>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<!-- <el-form-item label="店铺名称">
				<el-input v-model="queryData.name" placeholder="店铺名称"></el-input>
			</el-form-item> -->
			<el-form-item label="审核类型">
				<el-select v-model="queryData.status" placeholder="请选择">
					<el-option label="审核中" value="1"></el-option>
					<el-option label="通过" value="2"></el-option>
					<el-option label="驳回" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryDataGetShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="pageData.list" border style="width: 100%">
			<el-table-column prop="name" label="用户"></el-table-column>
			<el-table-column prop="idCard" label="身份证号码"></el-table-column>
			<el-table-column prop="date" label="身份证正面">
				<template slot-scope="scope">
					<div class="cardImg">
						<el-image class="bannerImage" :src="scope.row.img?scope.row.img:$globalData.defaultImg" :preview-src-list="[scope.row.img]"
						 fit="cover"></el-image>
						<span class="look">点击图片查看大图</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="date" label="身份证反面">
				<template slot-scope="scope">
					<div class="cardImg">
						<el-image class="bannerImage" :src="scope.row.backImg?scope.row.backImg:$globalData.defaultImg" :preview-src-list="[scope.row.backImg]"
						 fit="cover"></el-image>
						<span class="look">点击图片查看大图</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button type="text" :disabled="queryData.status=='1'?false:true" @click="pass(scope.row)">审核通过</el-button>
					<el-button type="text" :disabled="queryData.status=='1'?false:true" @click="notPass(scope.row)">审核不通过</el-button>
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
					status: '1',
					type: '1',
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
				this.$request.postJson('/discounts/selectSHAuditList', this.queryData).then(res => {
					if (res.code == 'succes') {
						this.pageData = res.data
					}
				})
			},
			notPass(item) {
				// 审核不通过
				this.$prompt('请输入不通过原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\s*\S+?/,
					inputErrorMessage: '不能为空',
				}).then(({
					value
				}) => {
					this.$request.postJson('/discounts/senHeAuditCoupons', {
						status: '3',
						id: item.id,
						message: value
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('操作成功')
							this.getPageData()
						}
					})
				})
			},
			pass(item) {
				// 审核通过
				this.$confirm('确认通过', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson('/discounts/senHeAuditCoupons', {
						status: '2',
						id: item.id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('操作成功')
							this.getPageData()
						}
					})
				})
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
