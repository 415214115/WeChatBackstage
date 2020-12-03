<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>提现管理</span>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="date" label="用户"></el-table-column>
			<el-table-column prop="date" label="姓名"></el-table-column>
			<el-table-column prop="date" label="电话"></el-table-column>
			<el-table-column prop="date" label="银行卡"></el-table-column>
			<el-table-column prop="date" label="开户行"></el-table-column>
			<el-table-column prop="date" label="是否打款"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button type="text">确认打款</el-button>
				</template>
			</el-table-column>
		</el-table>
		<paginaTion></paginaTion>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{}],
				
			}
		},
		mounted() {
			
		},
		
		methods: {
			
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
	.look{
		color: #8c939d;
		font-size: 12px;
		margin-left: 10px;
	}
	.cardImg{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
</style>
