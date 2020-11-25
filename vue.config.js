module.exports = {
	lintOnSave: false,
	devServer: {
		port: 9527,
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		// proxy: {
		// 	'/upload': {
		// 		target: 'https://chenzhouhuang.utools.club/upload/uEditorConfig', //接口域名
		// 		changeOrigin: true, //是否跨域
		// 		ws: true, //是否代理 websockets
		// 		secure: false, //是否https接口
		// 		pathRewrite: { //路径重置
		// 			'^/upload': ''
		// 		}
		// 	}
		// }

	},
}
