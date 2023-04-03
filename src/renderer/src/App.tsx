// import { Button } from "antd"
import { useEffect } from "react"
import { Camera } from "./components/Camera"

function App(): JSX.Element {

  useEffect(() => {

    const callback = (e) => {
      e.preventDefault()
      window.api.showContextMenu()
    }

    window.addEventListener('contextmenu', callback, false)

    return () => {
      window.removeEventListener('contextmenu', callback, false)
    }
  }, [])

  return (<Camera />)
}

export default App
