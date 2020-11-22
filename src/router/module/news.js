import Layout from '@/views/layout'
export const news = {
	path: 'news',
	name: 'news',
	component: Layout,
	meta: {
		title: '文章管理',
		icon: 'el-icon-folder-opened'
	},
	children: [
		{
			path: "newstype",
			name: "newstype",
			component: () => import('@/views/news/newsType/index.vue'),
			meta: {
				title: '文章类型',
				icon: ''
			}
		},
		{
			path: "newslist",
			name: "newslist",
			component: () => import('@/views/news/newsList/index.vue'),
			meta: {
				title: '文章',
				icon: ''
			}
		},
		{
			path: "newsdetail",
			name: "newsdetail",
			component: () => import('@/views/news/newsDetail/index.vue'),
			hidden: true,
			meta: {
				title: '文章详情',
				icon: ''
			}
		},
		{
			path: "addnews",
			name: "addnews",
			component: () => import('@/views/news/addNews/index.vue'),
			hidden: true,
			meta: {
				title: '添加文章',
				icon: ''
			}
		}
	]
}