import Layout from '@/views/layout'
export const coupon = {
	path: 'coupon',
	name: 'coupon',
	component: Layout,
	meta: {
		title: '优惠券管理',
		icon: 'el-icon-menu'
	},
	children: [
		{
			path: "couponsetting",
			name: "couponsetting",
			component: () => import('@/views/coupon/couponsetting/index.vue'),
			meta: {
				title: '优惠券配置',
				icon: ''
			}
		},
		{
			path: "couponlist",
			name: "couponlist",
			component: () => import('@/views/coupon/index/index.vue'),
			meta: {
				title: '代金券订单',
				icon: ''
			}
		},
		{
			path: "record",
			name: "record",
			component: () => import('@/views/coupon/record/index.vue'),
			meta: {
				title: '领取/购买记录',
				icon: ''
			}
		},
		{
			path: "addcoupon",
			name: "addcoupon",
			component: () => import('@/views/coupon/addCoupon/index.vue'),
			hidden: true,
			meta: {
				title: '新增优惠券',
				icon: ''
			}
		}
	]
}
