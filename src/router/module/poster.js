import Layout from '@/views/layout'
export const poster = {
	path: 'poster',
	name: 'poster',
	component: Layout,
	meta: {
		title: '配置管理',
		icon: 'el-icon-folder-opened'
	},
	children: [
		{
			path: "posters",
			name: "posters",
			component: () => import('@/views/poster/posters/index.vue'),
			meta: {
				title: '海报配置',
				icon: ''
			}
		},
		{
			path: "profit",
			name: "profit",
			component: () => import('@/views/poster/profit/index.vue'),
			meta: {
				title: '分润配置',
				icon: ''
			}
		}
		// {
		// 	path: "newslist",
		// 	name: "newslist",
		// 	component: () => import('@/views/news/newsList/index.vue'),
		// 	meta: {
		// 		title: '文章',
		// 		icon: ''
		// 	}
		// },
		// {
		// 	path: "newsdetail",
		// 	name: "newsdetail",
		// 	component: () => import('@/views/news/newsDetail/index.vue'),
		// 	hidden: true,
		// 	meta: {
		// 		title: '文章详情',
		// 		icon: ''
		// 	}
		// },
		// {
		// 	path: "addnews",
		// 	name: "addnews",
		// 	component: () => import('@/views/news/addNews/index.vue'),
		// 	hidden: true,
		// 	meta: {
		// 		title: '添加文章',
		// 		icon: ''
		// 	}
		// }
	]
}