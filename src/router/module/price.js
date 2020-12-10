import Layout from '@/views/layout'
export const price = {
	path: 'menber',
	name: 'menber',
	component: Layout,
	meta: {
		title: '用户管理',
		icon: 'el-icon-monitor'
	},
	children: [
		{
			path: "users",
			name: "users",
			component: () => import('@/views/menber/index.vue'),
			meta: {
				title: '用户列表',
				icon: ''
			}
		}
	]
}
