import router from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { PanelProvider } from './contexts/PanelContext'
import './App.css'

function App() {
 
  return (
    <>
    <PanelProvider>
        <RouterProvider router={router} />
    </PanelProvider>
     
    </>
  )
}

export default App
