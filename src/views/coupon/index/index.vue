<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>优惠券</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('/coupon/addcoupon')">新增优惠券</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="店铺名称">
				<el-select v-model="queryData.id" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod"
				 :loading="loading" @focus="shopfocus">
					<el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="优惠券名称">
				<el-input v-model="queryData.name" placeholder="店铺名称"></el-input>
			</el-form-item> -->
			<el-form-item label="优惠券类型">
				<el-select v-model="queryData.type" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option label="生日券" value="1"></el-option>
					<el-option label="积攒券" value="2"></el-option>
					<el-option label="拼团券" value="3"></el-option>
					<el-option label="免费领取" value="4"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryDataGetShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="couponType" label="类型">
				<template slot-scope="scope">
					{{ scope.row.couponType==1?'生日券':scope.row.couponType==2?'积攒券':scope.row.couponType==3?'拼团券':scope.row.couponType==4?'免费领取':'' }}
				</template>
			</el-table-column>
			<el-table-column prop="money" label="金额">
				<template slot-scope="scope">
					{{ scope.row.money }} 元
				</template>
			</el-table-column>
			<el-table-column prop="payMoney" label="购买支付金额">
				<template slot-scope="scope">
					{{ scope.row.payMoney }} 元
				</template>
			</el-table-column>
			<el-table-column prop="num" label="数量"></el-table-column>
			<el-table-column prop="context" label="使用条件"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion :totalNum="pageTotal" @paginaClick="paginaClick"></paginaTion>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				dialogForm: {},
				dialogVisible: false,
				queryData: {
					id: '',
					name: '',
					type: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				loading: false,
				shopList: '',
				pageTotal: 0
			}
		},
		mounted() {
			this.getcouponlist()
		},
		watch: {

		},
		methods: {
			paginaClick(val) {
				this.queryData.pageNum = val
				this.getcouponlist()
			},
			queryDataGetShopList() {
				this.queryData.pageNum = 1
				this.getcouponlist()
			},
			getcouponlist() {
				this.$request.postJson('/discounts/selectCouponByShop', this.queryData).then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data.list
						this.pageTotal = res.data.total
					}
				})
			},
			shopfocus(e) {
				this.getshopList('')
			},
			remoteMethod(query) {
				this.loading = true
				this.getshopList(query)
			},
			getshopList(keywords) {
				this.$request.postJson('/shop/selectShopByCon', {
					name: keywords,
					id: '',
					type: '',
					pageNum: 1,
					pageSize: 10
				}).then(res => {
					if (res.code == 'succes') {
						this.shopList = res.data.list
						this.loading = false
					}
				})
			},
			deleteRow(id) {
				this.$confirm('此操作将永久删除该优惠券, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					this.$request.postJson('/discounts/delCouponByShop', {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							if (this.queryData.pageNum > 1) {
								this.queryData.pageNum = Math.ceil((this.pageTotal - 1) / $globalData.pageSize)
							}
							this.$message.success('删除成功')
							this.getcouponlist()
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
</style>
