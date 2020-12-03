import Layout from '@/views/layout'
export const homePage = {
	path: 'homepage',
	name: 'homepage',
	component: Layout,
	meta: {
		title: '首页管理',
		icon: 'el-icon-s-flag'
	},
	children: [
		{
			path: "banner",
			name: "banner",
			component: () => import('@/views/homePage/banner/index.vue'),
			meta: {
				title: '首页轮播图管理',
				icon: ''
			}
		},
		// {
		// 	path: "UEditorTest",
		// 	name: "UEditorTest",
		// 	component: () => import('@/views/homePage/UEditorTest/index.vue'),
		// 	meta: {
		// 		title: 'UEditor编辑器测试',
		// 		icon: ''
		// 	}
		// },
	]
}