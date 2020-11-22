<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>店铺管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="add">新增店铺</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="店铺名称">
				<el-input v-model="queryData.name" placeholder="店铺名称"></el-input>
			</el-form-item>
			<el-form-item label="店铺类型">
				<el-select v-model="queryData.type" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
				    <el-option v-for="item in shopTypeList" :key="item.id"
				      :label="item.name"
				      :value="item.id"></el-option>
				  </el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryDataGetShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="店铺名称"></el-table-column>
			<el-table-column prop="title" label="店铺标题"></el-table-column>
			<el-table-column label="封面图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.log" fit="cover"></el-image>
				</template>
			</el-table-column>
			<!-- <el-table-column  label="店铺类型">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.image" fit="cover"></el-image>
				</template>
			</el-table-column> -->
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <paginaTion :totalNum="pageTotal" @paginaClick="paginaClick"></paginaTion> -->
		<el-pagination @current-change="paginaClick" :current-page="1"
		  :page-size="$globalData.pageSize" :layout="layouts" :page-count="pagecount">
		</el-pagination>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				layouts: 'total, prev, pager, next, jumper',
				tableData: [],
				queryData: {
					name: '',
					id: '',
					type: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				shopTypeList: '',
				pagecount: 0
			}
		},
		mounted() {
			this.getShopList()
			this.getShopType()
		},
		methods: {
			add() {
				// 新增店铺
				this.$router.push('/shop/addShop')
			},
			queryDataGetShopList(){
				// 查询
				this.queryData.pageNum = 1
				this.getShopList()
			},
			paginaClick(val){
				console.log(val)
				this.queryData.pageNum = val
				this.getShopList()
			},
			getShopList() {
				this.$request.postJson('/shop/selectShopByCon',this.queryData).then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data.list
						this.pagecount = res.data.pages
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
			deleteRow(id) {
				this.$confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.queryData.pageNum > 1 && this.tableData.length == 1){
						this.queryData.pageNum -= 1
					}
					this.$request.postJson('/shop/delShop', {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('删除成功')
							this.getShopList()
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
	.el-pagination {
		text-align: right;
		margin-top: 20px;
	}
</style>
