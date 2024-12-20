import '@/App.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import TrackFormCard from '@/components/TrackFormCard';
import SummaryCard from '@/components/SummaryCard';
import SegmentsCard from '@/components/SegmentsCard';
import ChartCard from '@/components/ChartCard';
import { TrackProvider } from '@/components/TrackProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TrackProvider>
        <div>
          <Navbar />
          <div className='mt-8 mx-8'>
            <div className="flex flex-col lg:flex-row justify-between gap-10 mb-5">
              <div className='w-full'>
                <TrackFormCard />
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
      </TrackProvider>
    </ThemeProvider>
  )
}

export default App
