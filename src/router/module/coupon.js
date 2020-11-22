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
		// {
		// 	path: "coupontype",
		// 	name: "coupontype",
		// 	component: () => import('@/views/coupon/couponType/index.vue'),
		// 	meta: {
		// 		title: '优惠券类型',
		// 		icon: ''
		// 	}
		// },
		{
			path: "couponlist",
			name: "couponlist",
			component: () => import('@/views/coupon/index/index.vue'),
			meta: {
				title: '优惠券',
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
