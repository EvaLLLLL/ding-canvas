Page({
	data: {
		imgPath: '',
		imgWidth: 0,
		imgHeight: 0,
	},
	onLoad() {
		dd.getImageInfo({
			src: 'https://tva1.sinaimg.cn/large/008i3skNly1gpyc91aja9j30ji09y3zg.jpg',
			success: res => {
				this.setData({
					imgPath: res.path,
					imgHeight: res.height,
					imgWidth: res.width,
				})
			},
		})
	},

	onCreatePost() {
		dd.showLoading({ content: '生成打卡图片中...' })

		const { screenWidth, screenHeight } = dd.getSystemInfoSync()
		const ctx = dd.createCanvasContext('test')
		const mod = 4

		const getDrawImgData = () => {
			const drawImgHeight =
				(335 * mod * this.data.imgHeight) / this.data.imgWidth <= 240 * mod
					? 240 * mod
					: ((335 * mod) / this.data.imgWidth) * this.data.imgHeight

			if (drawImgHeight === 240 * mod) {
				return {
					drawImgHeight,
					drawImgWidth: (240 * mod / this.data.imgHeight) * this.data.imgWidth,
				}
			}

			return {
				drawImgHeight,
				drawImgWidth: 335 * mod,
			}
		}

		// 初始化画布
		this.setData({
			canvasWidth: screenWidth * mod,
			canvasHeight: screenHeight * mod,
			canvasStyle: `width:${screenWidth * mod}px;height:${screenHeight * mod}px`,
		})

		// 绘制四角圆角矩形
		const radiusRect = (left, top, width, height, r) => {
			const pi = Math.PI
			ctx.beginPath()
			ctx.arc(left + r, top + r, r, -pi, -pi / 2) // 左上
			ctx.arc(left + width - r, top + r, r, -pi / 2, 0) // 右上
			ctx.arc(left + width - r, top + height - r, r, 0, pi / 2) // 右下
			ctx.arc(left + r, top + height - r, r, pi / 2, pi) // 左下
			ctx.closePath()
		}

		// 绘制上方两角圆角矩形
		const topRadiusRect = (left, top, width, height, r) => {
			const pi = Math.PI
			ctx.beginPath()
			ctx.arc(left + r, top + r, r, -pi, -pi / 2) // 左上
			ctx.arc(left + width - r, top + r, r, -pi / 2, 0) // 右上
			ctx.lineTo(left + width, top + height) // 没圆弧的右下
			ctx.lineTo(left, top + height) // 没圆弧的左下
			ctx.closePath()
		}

		// ------------- 绘制 start ------------
		// 绘制背景
		ctx.save()
		ctx.rect(0, 0, 375 * mod, 591 * mod)
		ctx.setFillStyle('#f0f0f0')
		ctx.fill()
		ctx.restore()

		// 绘制卡片框
		ctx.save()
		radiusRect(0 + 20 * mod, 0 + 20 * mod, 335 * mod, 551 * mod, 8 * mod)
		ctx.setFillStyle('#fff')
		ctx.fill()
		ctx.restore()

		// 绘制上方大图
		ctx.save()
		topRadiusRect(0 + 20 * mod, 0 + 20 * mod, 335 * mod, 240 * mod, 8 * mod)
		ctx.clip() // 剪切图片防止变形
		ctx.drawImage(
			this.data.imgPath,
			0 + 20 * mod,
			0 + 20 * mod,
			getDrawImgData().drawImgWidth,
			getDrawImgData().drawImgHeight
		)
		ctx.restore()

		// 绘制日期大标题
		ctx.save()
		ctx.setFillStyle('#292E39')
		ctx.setFontSize(32 * mod)
		ctx.fillText('2021.02.16', 24 * mod + 20 * mod, 288 * mod + 20 * mod)
		ctx.restore()

		// 绘制日期大标题 x 2
		ctx.save()
		ctx.setFillStyle('#292E39')
		ctx.setFontSize(32 * mod)
		ctx.fillText('2021.02.16', 24 * mod + 20 * mod, 288 * mod + 20 * mod)
		ctx.restore()

		// 绘制完成的运动
		ctx.save()
		ctx.setFillStyle('#292E39')
		ctx.setFontSize(16 * mod)
		ctx.fillText('完成了', 24 * mod + 20 * mod, 340 * mod + 20 * mod)
		ctx.restore()

		// 运动名
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(24 * mod)
		ctx.fillText('乒乓球', 80 * mod + 20 * mod, 340 * mod + 20 * mod)
		ctx.restore()

		// 运动名 x 2
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(24 * mod)
		ctx.fillText('乒乓球', 80 * mod + 20 * mod, 340 * mod + 20 * mod)
		ctx.restore()

		// 共完成了
		ctx.save()
		ctx.setFillStyle('#292E39')
		ctx.setFontSize(16 * mod)
		ctx.fillText('共运动了', 24 * mod + 20 * mod, 385 * mod + 20 * mod)
		ctx.restore()

		// 分钟数
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(24 * mod)
		ctx.fillText('50', 98 * mod + 20 * mod, 385 * mod + 20 * mod)
		ctx.restore()

		// 分钟数 x 2
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(24 * mod)
		ctx.fillText('50', 98 * mod + 20 * mod, 385 * mod + 20 * mod)
		ctx.restore()

		// 分钟
		ctx.save()
		ctx.setFillStyle('#292E39')
		ctx.setFontSize(16 * mod)
		ctx.fillText('分钟', 135 * mod + 20 * mod, 385 * mod + 20 * mod)
		ctx.restore()

		// 标签圆角矩形 no.1
		ctx.save()
		radiusRect(
			24 * mod + 20 * mod,
			411 * mod + 20 * mod,
			128 * mod,
			24 * mod,
			4 * mod
		)
		ctx.setFillStyle('#FFEBE6')
		ctx.fill()
		ctx.restore()

		// 标签文字 no.1
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(14 * mod)
		ctx.fillText('# 第一届长跑大赛', 32 * mod + 20 * mod, 428 * mod + 20 * mod)
		ctx.restore()

		// 标签文字 no.1 x 2
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(14 * mod)
		ctx.fillText('# 第一届长跑大赛', 32 * mod + 20 * mod, 428 * mod + 20 * mod)
		ctx.restore()

		// 标签圆角矩形 no.2
		ctx.save()
		radiusRect(
			24 * mod + 20 * mod,
			443 * mod + 20 * mod,
			100 * mod,
			24 * mod,
			4 * mod
		)
		ctx.setFillStyle('#FFEBE6')
		ctx.fill()
		ctx.restore()

		// 标签文字 no.2
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(14 * mod)
		ctx.fillText('# 天天日常跑', 32 * mod + 20 * mod, 460 * mod + 20 * mod)
		ctx.restore()

		// 标签文字 no.1 x 2
		ctx.save()
		ctx.setFillStyle('#D2401A')
		ctx.setFontSize(14 * mod)
		ctx.fillText('# 天天日常跑', 32 * mod + 20 * mod, 460 * mod + 20 * mod)
		ctx.restore()

		// 运动编号
		ctx.save()
		ctx.setFillStyle('#585C64')
		ctx.setFontSize(14 * mod)
		ctx.fillText('运动编号：10001', 24 * mod + 20 * mod, 527 * mod + 20 * mod)
		ctx.restore()

		// ------------- 绘制 end ------------
		ctx.draw()

		// 画板设置成需要的大小以便保存
		this.setData({
			canvasWidth: 375 * mod,
			canvasHeight: 591 * mod,
			canvasStyle: `width:${375 * mod}px;height:${591 * mod}px`,
		})

		// 保存在手机上
		setTimeout(() => {
			ctx.toTempFilePath({
				success(res) {
					dd.saveImage({
						url: res.filePath,
						success: () => {
							dd.hideLoading()
							dd.showToast({
								type: 'success',
								content: '打卡图片已存入相册中',
								duration: 3000,
							})
						},
					})
				},
			})
		}, 1000)
	},
})
