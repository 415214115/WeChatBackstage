import Layout from '@/views/layout'
export const shop = {
	path: 'shop',
	name: 'shop',
	component: Layout,
	meta: {
		title: '店铺管理',
		icon: 'el-icon-monitor'
	},
	children: [
		{
			path: "shoptype",
			name: "shoptype",
			component: () => import('@/views/shop/shopType/index.vue'),
			meta: {
				title: '店铺分类',
				icon: ''
			}
		},
		{
			path: "shopindex",
			name: "shopindex",
			component: () => import('@/views/shop/index/index.vue'),
			meta: {
				title: '店铺管理',
				icon: ''
			}
		},
		{
			path: "addShop",
			name: "addShop",
			component: () => import('@/views/shop/addShop/index.vue'),
			hidden: true,
			meta: {
				title: '添加店铺',
				icon: ''
			}
		}
	]
}
