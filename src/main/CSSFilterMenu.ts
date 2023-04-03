import { Menu, MenuItem } from "electron"

const FILTERS = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'grayscale',
    value: 'grayscale(1)',
  },
  {
    label: 'sepia',
    value: 'sepia(1)',
  },
  {
    label: 'contrast',
    value: 'contrast(3)',
  },
  {
    label: 'saturate',
    value: 'saturate(4)',
  },
  {
    label: 'hue-rotate',
    value: 'hue-rotate(90deg)',
  },
  {
    label: 'blur',
    value: 'blur(5px)',
  },
  {
    label: 'tint',
    value: 'sepia(1) hue-rotate(200deg)',
  },
  {
    label: 'invert',
    value: 'invert(0.8)',
  },
  {
    label: 'opacity',
    value: 'opacity(0.5)',
  },
  {
    label: 'inkwell',
    value: 'grayscale(1) brightness(0.45) contrast(1.05)',
  },
  {
    label: 'brightness',
    value: 'brightness(0.5)',
  },
  {
    label: 'combo',
    value: 'contrast(1.4) saturate(1.8) sepia(.6)',
  }
]

const createCSSFilterMenu = (win, filterValue) => {

  const click = (value) => {
    win.webContents.send('setFilter', value)
  }

  const filterMenuItems: any[] = FILTERS.map(f => {
    return {
      label: f.label,
      type: 'radio',
      checked: f.value === filterValue,
      click: () => click(f.value),
    }
  })

  filterMenuItems.unshift({
    label: '选择滤镜',
  })

  const contextMenu = Menu.buildFromTemplate(filterMenuItems)
  
  return contextMenu
}

export { createCSSFilterMenu }