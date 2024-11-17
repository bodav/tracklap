import './App.css';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Navbar />
        <h1>Hello, World!</h1>
      </div>
    </ThemeProvider>
  )
}

export default App
