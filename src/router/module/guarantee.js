import Layout from '@/views/layout'
export const guarantee = {
	path: 'guarantee',
	name: 'guarantee',
	component: Layout,
	meta: {
		title: '账单管理',
		icon: 'el-icon-s-management'
	},
	children: [
		{
			path: "withdraw",
			name: "withdraw",
			component: () => import('@/views/withdraw/index.vue'),
			meta: {
				title: '提现列表',
				icon: ''
			}
		},{
			path: "purchase",
			name: "purchase",
			component: () => import('@/views/withdraw/purchase.vue'),
			meta: {
				title: '购买列表',
				icon: ''
			}
		}
	]
}
