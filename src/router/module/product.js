import Layout from '@/views/layout'
export const product = {
	path: 'product',
	name: 'product',
	component: Layout,
	meta: {
		title: '审核管理',
		icon: 'el-icon-s-custom'
	},
	children: [
		{
			path: "card",
			name: "card",
			component: () => import('@/views/audit/card.vue'),
			meta: {
				title: '身份证审核',
				icon: ''
			}
		},
		{
			path: "version",
			name: "version",
			component: () => import('@/views/audit/accumulate.vue'),
			meta: {
				title: '积攒管理',
				icon: ''
			}
		}
	]
}