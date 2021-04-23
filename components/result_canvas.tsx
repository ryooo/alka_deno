import React, { useEffect, useMemo, CSSProperties } from 'react'

export function ResultCanvas(resultId) {
  const style = useMemo(() => {
    const css: CSSProperties = {
      position: "absolute",
      margin: "auto",
      width: "800px",
      height: "800px",
      zIndex: 1,
      pointerEvents: "none",
    }
    return css
  })
  return (
    <canvas id="result_canvas" style={style}></canvas>
  )
}

export const showConfetti = () => {
  const TWO_PI = Math.PI * 2
  const HALF_PI = Math.PI * 0.5

  // canvas settings
  const viewWidth = 800
  const viewHeight = 800
  const drawingCanvas = document.getElementById("result_canvas")
  const timeStep = (1 / 60)

  const Point = function (x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  const Particle = function (p0, p1, p2, p3) {
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3

    this.time = 0
    this.duration = 3 + Math.random() * 2
    this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16)

    this.w = 10
    this.h = 8

    this.complete = false
  }

  Particle.prototype = {
    update: function () {
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
    },
    draw: function () {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.r)
      ctx.scale(1, this.sy)

      ctx.fillStyle = this.color
      ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h)

      ctx.restore()
    }
  }

  const CircleMark = function (x, y) {
    this.x = x
    this.y = y

    this.startRadius = 124

    this.time = 0
    this.enLarge = 0.2
    this.largeStop = 1.2
    this.enSmall = 1.7
    this.scale = 0
    this.alpha = 1

    this.complete = false
  }

  CircleMark.prototype = {
    reset: function () {
      this.time = 0
      this.scale = 0
      this.alpha = 1
      this.complete = false
    },
    update: function () {
      this.time = Math.min(this.enSmall, this.time + timeStep)
      if (this.time < this.enLarge) {
        this.scale = Ease.outCubic(this.time, 0, 1, this.enLarge)
      } else if (this.time < this.largeStop) {
        this.scale = 1
      } else {
        this.alpha = 1 - Ease.outCubic(this.time - this.largeStop, 0, 1, this.enSmall - this.largeStop)
        this.scale = 1 - (Ease.outCubic(this.time - this.largeStop, 0, 1, this.enSmall - this.largeStop) * 0.1)
      }

      this.complete = this.time === this.enSmall
    },
    draw: function () {
      ctx.fillStyle = "rgba(" + [214, 51, 105, this.alpha] + ")"
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.startRadius * this.scale, 0, TWO_PI, true)
      ctx.arc(this.x, this.y, this.startRadius * this.scale * 0.8, 0, TWO_PI, false)
      ctx.fill()
    }
  }
  function createCircleMark() {
    circleMark = new CircleMark(viewWidth * 0.5, viewHeight * 0.5)
  }

  let circleMark
  let particles = []
  let ctx

  function initDrawingCanvas() {
    drawingCanvas.width = viewWidth
    drawingCanvas.height = viewHeight
    ctx = drawingCanvas.getContext('2d')

    createCircleMark()
    createParticles()
  }

  function createParticles() {
    for (var i = 0; i < 128; i++) {
      var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5)
      var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight)
      var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight)
      var p3 = new Point(Math.random() * viewWidth, viewHeight + 64)

      particles.push(new Particle(p0, p1, p2, p3))
    }
  }

  function update() {
    particles.forEach(function (p) {
      p.update()
    })
    circleMark.update()
  }

  function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight)

    particles.forEach(function (p) {
      p.draw()
    })
    circleMark.draw()
  }

  function loop() {
    update()
    draw()

    if (checkParticlesComplete()) {
      // reset
    }

    requestAnimationFrame(loop)
  }

  function checkParticlesComplete() {
    for (var i = 0; i < particles.length; i++) {
      if (particles[i].complete === false) return false
    }
    return true
  }

  // math and stuff

  /**
   * easing equations from http://gizma.com/easing/
   * t = current time
   * b = start value
   * c = delta value
   * d = duration
   */
  var Ease = {
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

  function cubeBezier(p0, c0, c1, p1, t) {
    var p = new Point()
    var nt = (1 - t)

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y

    return p
  }
  initDrawingCanvas()
  requestAnimationFrame(loop)
}