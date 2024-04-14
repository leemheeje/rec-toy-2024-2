import {createContext} from 'react'

interface LayoutContextProps {
  addDialog: (params?) => void
}

const LayoutContext = createContext<LayoutContextProps>({
  addDialog: () => {}
})

export {LayoutContext}
