import Layout from '@/views/layout'
export const guarantee = {
	path: 'guarantee',
	name: 'guarantee',
	component: Layout,
	meta: {
		title: '提现管理',
		icon: 'el-icon-s-management'
	},
	children: [
		{
			path: "withdraw",
			name: "withdraw",
			component: () => import('@/views/withdraw/index.vue'),
			meta: {
				title: '提现',
				icon: ''
			}
		}
	]
}
