import React, { useMemo, CSSProperties } from 'react'

export function ResultCanvas() {
  return useMemo(() => {
    const style: CSSProperties = {
      position: "absolute",
      margin: "auto",
      width: "800px",
      height: "800px",
      zIndex: 1,
      pointerEvents: "none",
    }
    return (
      <canvas id="result_canvas" style={style}></canvas>
    )
  }, [])
}

/**
 * easing equations from http://gizma.com/easing/
 * t = current time
 * b = start value
 * c = delta value
 * d = duration
 */
const Ease = {
  inCubic: function (t, b, c, d) {
    t /= d
    return c * t * t * t + b
  },
  outCubic: function (t, b, c, d) {
    t /= d
    t--
    return c * (t * t * t + 1) + b
  },
  inOutCubic: function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t * t + b
    t -= 2
    return c / 2 * (t * t * t + 2) + b
  },
  inBack: function (t, b, c, d, s) {
    s = s || 1.70158
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  }
}

const cubeBezier = function (p0, c0, c1, p1, t) {
  var p = new Point()
  var nt = (1 - t)
  p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x
  p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y
  return p
}

const TWO_PI = Math.PI * 2
const HALF_PI = Math.PI * 0.5
const Point = function (x, y) {
  this.x = x || 0
  this.y = y || 0
}
// canvas settings
const viewWidth = 800
const viewHeight = 800
const timeStep = (1 / 60)

class CanvasHandler {
  ctx: any
  objects: any
  constructor() {
    const drawingCanvas = document.getElementById("result_canvas")
    drawingCanvas.width = viewWidth
    drawingCanvas.height = viewHeight
    this.ctx = drawingCanvas.getContext('2d')
    this.objects = []
    const loop = () => {
      // update phase
      this.objects.forEach((obj) => {
        obj.update()
      })

      // draw phase
      this.ctx.clearRect(0, 0, viewWidth, viewHeight)
      this.objects.forEach((obj) => {
        obj.draw()
      })

      // clean phase
      this.objects = this.objects.filter((obj) => {
        return obj.complete === false
      })
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
  addObject(obj) {
    obj.setContext(this.ctx)
    this.objects.push(obj)
  }
}

let canvasHandler = null
export const canvasShow = (args) => {
  if (!canvasHandler) canvasHandler = new CanvasHandler()
  if (!Array.isArray(args)) args = [args]
  for (var argsI = 0; argsI < args.length; argsI++) {
    const opt = Array.isArray(args[argsI]) ? args[argsI][1] : {}
    switch (Array.isArray(args[argsI]) ? args[argsI][0] : args[argsI]) {
      case "NgMark":
        canvasHandler.addObject(new NgMark(viewWidth * 0.5, viewHeight * 0.5))
        break
      case "OkMark":
        canvasHandler.addObject(new OkMark(viewWidth * 0.5, viewHeight * 0.5))
        break
      case "Particles":
        for (var i = 0; i < 128; i++) {
          var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5)
          var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight)
          var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight)
          var p3 = new Point(Math.random() * viewWidth, viewHeight + 64)
          canvasHandler.addObject(new Particle(p0, p1, p2, p3))
        }
        break
      default:
    }
  }
}

class CanvasObjectBase {
  ctx: any
  complete: boolean
  constructor() { this.complete = false }
  setContext(ctx) { this.ctx = ctx }
  update() { }
  draw() { }
}

class NgMark extends CanvasObjectBase {
  x: number
  y: number
  time: number
  enLarge: number
  largeStop: number
  enSmall: number
  scale: number
  alpha: number
  se = new Audio("/se/ng.mp3")
  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
    this.time = 0
    this.enLarge = 0.2
    this.largeStop = 0.5
    this.enSmall = 0.8
    this.scale = 0
    this.alpha = 1
  }
  update() {
    this.time = Math.min(this.enSmall, this.time + timeStep)
    if (this.time < this.enLarge) {
      this.alpha = Ease.inCubic(this.time, 0, 1, this.enLarge)
      this.scale = Ease.inCubic(this.time, 0, 1, this.enLarge) * 0.2 + 0.8
    } else if (this.time < this.largeStop) {
      this.alpha = 1
      this.scale = 1
      this.se.play()
    } else {
      this.alpha = 1 - Ease.outCubic(this.time - this.largeStop, 0, 1, this.enSmall - this.largeStop)
      this.scale = 1 - (Ease.outCubic(this.time - this.largeStop, 0, 1, this.enSmall - this.largeStop) * 0.1)
    }
    this.complete = (this.time === this.enSmall)
  }
  draw() {
    this.ctx.lineWidth = 15
    this.ctx.strokeStyle = "rgba(" + [214, 51, 105, this.alpha] + ")"
    this.ctx.beginPath()
    this.ctx.moveTo(this.x - 100 * this.scale, this.y - 100 * this.scale)
    this.ctx.lineTo(this.x + 100 * this.scale, this.y + 100 * this.scale)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.beginPath()
    this.ctx.moveTo(this.x + 100 * this.scale, this.y - 100 * this.scale)
    this.ctx.lineTo(this.x - 100 * this.scale, this.y + 100 * this.scale)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}

class OkMark extends CanvasObjectBase {
  x: number
  y: number
  startRadius: number
  time: number
  enLarge: number
  largeStop: number
  enSmall: number
  scale: number
  alpha: number
  se = new Audio("/se/ok.mp3")
  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
    this.startRadius = 124
    this.time = 0
    this.enLarge = 0.2
    this.largeStop = 1.2
    this.enSmall = 1.7
    this.scale = 0
    this.alpha = 1
  }
  update() {
    this.time = Math.min(this.enSmall, this.time + timeStep)
    if (this.time < this.enLarge) {
      this.scale = Ease.outCubic(this.time, 0, 1, this.enLarge)
    } else if (this.time < this.largeStop) {
      this.se.play()
      this.scale = 1
    } else {
      this.alpha = 1 - Ease.outCubic(this.time - this.largeStop, 0, 1, this.enSmall - this.largeStop)
      this.scale = 1 - (Ease.outCubic(this.time - this.largeStop, 0, 1, this.enSmall - this.largeStop) * 0.1)
    }
    this.complete = this.time === this.enSmall
  }
  draw() {
    this.ctx.fillStyle = "rgba(" + [214, 51, 105, this.alpha] + ")"
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.startRadius * this.scale, 0, TWO_PI, true)
    this.ctx.arc(this.x, this.y, this.startRadius * this.scale * 0.8, 0, TWO_PI, false)
    this.ctx.fill()
  }
}

class Particle extends CanvasObjectBase {
  x: number
  y: number
  p0: number
  p1: number
  p2: number
  p3: number
  w: number
  h: number
  time: number
  duration: number
  color: string
  r: number
  sy: number
  constructor(p0, p1, p2, p3) {
    super()
    this.x = 0
    this.y = 0
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.time = 0
    this.w = 10
    this.h = 8
    this.duration = 3 + Math.random() * 2
    this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16)
  }
  update() {
    this.time = Math.min(this.duration, this.time + timeStep)

    var f = Ease.outCubic(this.time, 0, 1, this.duration)
    var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f)

    var dx = p.x - this.x
    var dy = p.y - this.y
    this.r = Math.atan2(dy, dx) + HALF_PI
    this.sy = Math.sin(Math.PI * f * 10)
    this.x = p.x
    this.y = p.y
    this.complete = this.time === this.duration
  }
  draw() {
    this.ctx.save()
    this.ctx.translate(this.x, this.y)
    this.ctx.rotate(this.r)
    this.ctx.scale(1, this.sy)
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h)
    this.ctx.restore()
  }
}
