<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>店铺类型管理</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addBanner">新增店铺类型</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="类型名称"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button @click="deleteBanner(scope.row.id)" type="text">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="添加店铺类型" :visible.sync="dialogVisible" width="30%">
			<div class="dialogContent">
				<el-form label-width="80px" :model="dialogForm">
					<el-form-item label="类型名称">
				    <el-input v-model="dialogForm.name"></el-input>
				  </el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addType">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				dialogForm: {
					name: ''
				},
				dialogVisible: false
			}
		},
		mounted() {
			this.getBannerData()
		},
		watch: {
			dialogVisible(){
				this.dialogForm.name = ''
			}
		},
		methods: {
			addBanner(){
				this.dialogVisible = true
			},
			getBannerData(){
				this.$request.get('/back/type/getShopType').then(res => {
					if (res.code == 'succes') {
						this.tableData = res.data
					}
				})
			},
			addType(){
				if(!this.dialogForm.name){
					this.$message.error('名称不能为空')
					return
				}
				this.$request.postJson('/back/type/addShopType',this.dialogForm).then(res=>{
					if (res.code == 'succes') {
						this.$message.success('添加成功')
						this.dialogVisible = false
						this.getBannerData()
					}
				})
			},
			deleteBanner(id){
				this.$confirm('确定要删除该条数据吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$request.postJson('/back/type/delShopType', {
						id: id
					}).then(res => {
						if (res.code == 'succes') {
							this.$message.success('删除成功')
							this.getBannerData()
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
