<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>文章</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('/news/addnews')">新增文章</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="文章标题">
				<el-input v-model="queryData.name" placeholder="输入关键字"></el-input>
			</el-form-item>
			<el-form-item label="文章类型">
				<el-select v-model="queryData.type" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="queryDataGetShopList">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="title" label="文章标题"></el-table-column>
			<el-table-column  label="文章缩略图">
				<template slot-scope="scope">
					<el-image class="bannerImage" :src="scope.row.cover" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="$router.push(`/news/newsdetail?id=${scope.row.id}`)" type="text">查看</el-button>
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
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
				queryData: {
					name: '',
					type: '',
					pageNum: 1,
					pageSize: $globalData.pageSize
				},
				typelist: '',
				pageTotal: 0
			}
		},
		mounted() {
			this.getpagelist()
			this.getNewsList()
		},
		watch: {
		},
		methods: {
			getpagelist(){
				this.$request.get('/back/type/getInformationType').then(res=>{
					if (res.code == 'succes') {
						this.typelist = res.data
					}
				})
			},
			paginaClick(val){
				this.queryData.pageNum = val
				this.getNewsList()
			},
			queryDataGetShopList(){
				this.queryData.pageNum = 1
				this.getNewsList()
			},
			addBanner(){
				this.dialogVisible = true
			},
			getNewsList(){
				this.$request.postJson('/back/type/selectInformation', this.queryData).then( res => {
					if (res.code == 'succes') {
						this.tableData = res.data.list
						this.pageTotal = res.data.total
					}
				})
			},
			deleteBanner(id){
				this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson('/back/type/delInformation', {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							if(this.queryData.pageNum > 1){
								this.queryData.pageNum = Math.ceil((this.pageTotal - 1) / $globalData.pageSize)
							}
							this.$message.success('删除成功')
							this.getNewsList()
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
