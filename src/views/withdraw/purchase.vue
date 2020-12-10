<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>购买列表</span>
			<el-button type="text" style="float: right;margin-top: -10px;" @click="exportcoupon">导出列表</el-button>
		</div>
		<el-form :inline="true" :model="queryData" class="demo-form-inline">
			<el-form-item label="店铺名称">
				<el-input v-model="queryData.name" placeholder="店铺名称"></el-input>
			</el-form-item>
			<el-form-item label="代金券类型">
				<el-select v-model="queryData.type" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option label="生日券" value="1"></el-option>
					<el-option label="积攒券" value="2"></el-option>
					<el-option label="拼团券" value="3"></el-option>
					<el-option label="免费券" value="4"></el-option>
				</el-select>
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
			<el-table-column prop="shopName" label="所属店铺"></el-table-column>
			<el-table-column prop="name" label="优惠券名字"></el-table-column>
			<el-table-column prop="code" label="优惠券码"></el-table-column>
			<el-table-column prop="money" label="优惠券金额">
				<template slot-scope="scope">
					{{ scope.row.money?scope.row.money:0 }}元
				</template>
			</el-table-column>
			<el-table-column prop="payMoney" label="购买支付金额">
				<template slot-scope="scope">
					{{ scope.row.payMoney?scope.row.payMoney:0 }}元
				</template>
			</el-table-column>
			<el-table-column prop="beginTime" label="购买时间"></el-table-column>
			<el-table-column prop="endTime" label="到期时间"></el-table-column>
		</el-table>
		<paginaTion :totalNum="pageData.total" @paginaClick="paginaClick"></paginaTion>
		
		<el-dialog title="导出列表" :visible.sync="dialogVisible">
			<el-form :model="dialogForm">
				<el-form-item label="店铺名称" label-width="100px">
					<el-select v-model="dialogForm.id" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod"
					 :loading="loading" @focus="shopfocus">
						<el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="代金券类型" label-width="100px">
					<el-select v-model="dialogForm.type" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option label="生日券" value="1"></el-option>
						<el-option label="积攒券" value="2"></el-option>
						<el-option label="拼团券" value="3"></el-option>
						<el-option label="免费券" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="开始时间" label-width="100px">
					<el-date-picker v-model="dialogForm.beginTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间" label-width="100px">
					<el-date-picker v-model="dialogForm.endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="excelTXList">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				pageData: '',
				dialogForm: {
					id: '',
					type: '',
					beginTime: '',
					endTime: ''
				},
				dialogVisible: false,
				loading: false,
				shopList: '',
				queryData: {
					name: '',
					type: '',
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
		watch: {
			dialogVisible(newData) {
				if (!newData) {
					this.dialogForm.id = ''
					this.dialogForm.type = ''
					this.dialogForm.beginTime = ''
					this.dialogForm.endTime = ''
				}
			}
		},
		methods: {
			exportcoupon() {
				this.dialogVisible = true
			},
			paginaClick(val) {
				this.queryData.pageNum = val
				this.getPageData()
			},
			queryDataGetShopList() {
				this.queryData.pageNum = 1
				this.getPageData()
			},
			getPageData() {
				this.$request.postJson('/back/type/selectBackList', this.queryData).then(res => {
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
			excelTXList() {
				// 导出
				if(!this.dialogForm.id){
					this.$message.error('请选择店铺')
					return
				}
				if(!this.dialogForm.beginTime || !this.dialogForm.endTime){
					this.$message.error('请选择时间')
					return
				}
				if (this.pageData && this.pageData.list.length > 0) {
					this.$request.download('/excel/excelBackList', this.dialogForm).then(res => {
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
						// console.log()
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
