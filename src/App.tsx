import '@/App.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import RouteCard from './components/RouteCard';
import SummaryCard from './components/SummaryCard';
import SegmentsCard from './components/SegmentsCard';
import ChartCard from './components/ChartCard';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div>
        <Navbar />
        <div className='mt-8 mx-8'>
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-5">
            <div className='w-full'>
              <RouteCard />
            </div>
            <div className='w-full'>
              <SummaryCard />
            </div>
            <div className='w-full'>
              <SegmentsCard />
            </div>
          </div>
          <div className="w-full">
            <ChartCard />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
