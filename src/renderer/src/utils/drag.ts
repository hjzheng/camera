class Drag {
  private pageX: number = 0
  private pageY: number = 0
  private ele: HTMLElement | null = null
  private isDrag: boolean =  false
  
  constructor(ele?: HTMLElement) {
    this.ele = ele || document.body
  }

  mousemove(e: MouseEvent) {
    if (this.isDrag) {
      let dx = Math.round(this.pageX - e.pageX)
      let dy = Math.round(this.pageY - e.pageY)
      // @ts-ignore
      window.api.drag({x: dx, y: dy})
    }
  }

  mousedown(e: MouseEvent) {
    this.isDrag = true
    this.pageX = e.clientX
    this.pageY = e.clientY
   
    let mousemove = this.mousemove.bind(this)
    this.ele?.addEventListener('mousemove', mousemove, false)
    
    this.ele?.addEventListener('mouseup', () => {
      this.ele?.removeEventListener('mousemove', mousemove, false)
      this.isDrag = false
    }, {once: true})
    
    this.ele?.addEventListener('mouseout', () => {
      this.ele?.removeEventListener('mousemove', mousemove, false)
      this.isDrag = false
    }, {once: true})
  }

  run() {
    let mousedown = this.mousedown.bind(this)
    this.ele?.addEventListener('mousedown', mousedown, false)
  }
}

export const useDrag = (ele?: HTMLElement) => {
  const drag = new Drag(ele)
  return drag
}