import '@/App.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div>
        <Navbar />
        <div className='mt-4 mx-2'>
          <div className="flex flex-col lg:flex-row justify-between gap-3 mb-5">
            <div>Column 1</div>
            <div>Column 2</div>
            <div>Column 3</div>
          </div>
          <div className="w-full">Row 2 spans all columns</div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
