<template>
	<el-card>
		<div slot="header" class="clearfix">
			<span>添加优惠券</span>
		</div>
		<el-form class="formDatas" label-width="100px" :model="postData">
			<el-form-item label="优惠券名字">
				<el-input v-model="postData.name"></el-input>
			</el-form-item>
			<el-form-item label="关联商铺">
				<!-- <el-select v-model="postData.shopId" placeholder="请选择">
				    <el-option label="生日券" value="1"></el-option>
				  </el-select> -->
				  <el-select v-model="postData.shopId" filterable remote reserve-keyword placeholder="请输入关键词"
				      :remote-method="remoteMethod"
					  :loading="loading"
					  @focus="shopfocus"
					  >
				      <el-option
				        v-for="item in shopList"
				        :key="item.id"
				        :label="item.name"
				        :value="item.id">
				      </el-option>
				    </el-select>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="postData.couponType" placeholder="请选择">
				    <el-option label="生日券" value="1"></el-option>
					<el-option label="积攒券" value="2"></el-option>
					<el-option label="拼团券" value="3"></el-option>
					<el-option label="免费领取" value="4"></el-option>
				  </el-select>
			</el-form-item>
			<el-form-item label="金额">
				<el-input-number v-model="postData.money" :min="1" label=""></el-input-number>
				元
				<!-- <el-input v-model="postData.money"></el-input> -->
			</el-form-item>
			<el-form-item label="数量">
				<el-input-number v-model="postData.num" :min="1" label=""></el-input-number>
				<!-- <el-input v-model="postData.num"></el-input> -->
			</el-form-item>
			<el-form-item label="购买支付金额">
				<el-input-number v-model="postData.payMoney" :min="0" label=""></el-input-number>
				元
				<!-- <el-input v-model="postData.payMoney"></el-input> -->
			</el-form-item>
			<el-form-item label="到期时间">
				<!-- <el-input v-model="postData.overTime"></el-input> -->
				<el-input-number v-model="postData.overTime" :min="1" label=""></el-input-number>
				小时
				<!-- <el-date-picker
				      v-model="postData.overTime"
				      type="datetime"
				      placeholder="选择日期时间"
					  >
				    </el-date-picker> -->
			</el-form-item>
			<el-form-item label="使用条件">
				<el-input v-model="postData.context" placeholder="如:满55可以使用"></el-input>
			</el-form-item>
		</el-form>
		<div class="BtnBox">
			<el-button @click="$router.back()">返回上一页</el-button>
			<el-button type="primary" @click="add">确定</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				postData: {
					name: '',  // 优惠卷名字
					shopId: '',  // 商铺id
					num: '',  // 优惠卷数量
					money: '',  // 优惠券金额
					payMoney: '',  // 用户购买优惠券价格
					overTime: '',  // 设置过期时间 按小时算
					couponType: '',  // 优惠类型
					context: ''
				},
				queryData:{
					name: '',
					id: '',
					type: '',
					pageNum: 1,
					pageSize: 10,
					lat: 0,
					lon: 0
				},
				shopList: '',
				loading: false
			}
		},
		mounted() {
			
		},
		methods: {
			shopfocus(e){
				this.postData.shopId = ''
				this.getshopList()
			},
			remoteMethod(query){
					this.loading = true
					this.queryData.name = query
					this.getshopList()
			},
			getshopList(){
				this.$request.postJson('/shop/selectShopByCon',this.queryData).then(res => {
					if (res.code == 'succes') {
						this.shopList = res.data.list
						this.loading = false
					}
				})
			},
			add() {
				if(
					!this.postData.name ||
					!this.postData.shopId ||
					!this.postData.num ||
					!this.postData.money ||
					!this.postData.overTime ||
					!this.postData.couponType ||
					!this.postData.context
				){
					this.$message.error('字段不能为空')
					return
				}
				this.$request.postJson('/discounts/addCouponByShop', this.postData).then(res => {
					if (res.code == 'succes') {
						this.$message.success('新增成功')
						setTimeout(() => {
							this.$router.back()
						}, 500)
					}
				})
			},
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

	.formDatas>>>.avatar-uploader .el-upload {
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
</style>
