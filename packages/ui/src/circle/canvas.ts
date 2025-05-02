export function adaptor(ctx: UniApp.CanvasContext & Record<string, number>): UniApp.CanvasContext {
  return Object.assign(ctx, {
    setStrokeStyle(val: string) {
      ctx.strokeStyle = val
    },
    setLineWidth(val: number) {
      ctx.lineWidth = val
    },
    setLineCap(val: 'butt' | 'round' | 'square') {
      ctx.lineCap = val
    },
    setFillStyle(val: string) {
      ctx.fillStyle = val
    },
    // setFontSize(val: number) {
    //   ctx.font = String(val)
    // },
    // setGlobalAlpha(val: number) {
    //   ctx.globalAlpha = val
    // },
    // setLineJoin(val: 'bevel' | 'round' | 'miter') {
    //   ctx.lineJoin = val
    // },
    // setTextAlign(val: 'left' | 'center' | 'right') {
    //   ctx.textAlign = val
    // },
    // setMiterLimit(val: number) {
    //   ctx.miterLimit = val
    // },
    // setShadow(offsetX: number, offsetY: number, blur: number, color: string) {
    //   ctx.shadowOffsetX = offsetX
    //   ctx.shadowOffsetY = offsetY
    //   ctx.shadowBlur = blur
    //   ctx.shadowColor = color
    // },
    // setTextBaseline(val: 'top' | 'bottom' | 'middle' | 'normal') {
    //   ctx.textBaseline = val
    // },
    // createCircularGradient() {},
    draw() {},
  })
}
