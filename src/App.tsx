import "@/App.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import TrackFormCard from "@/components/TrackFormCard";
import SummaryCard from "@/components/SummaryCard";
import ChartCard from "@/components/ChartCard";
import { TrackProvider } from "@/components/TrackProvider";
import TrackDisplay from "@/components/TrackDisplay";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TrackProvider>
        <div>
          <Navbar />
          <div className="mt-8 mx-8">
            <div className="flex flex-col lg:flex-row justify-between gap-10 mb-5">
              <div className="w-full">
                <TrackFormCard />
              </div>
              <TrackDisplay>
                <div className="w-full">
                  <SummaryCard />
                </div>
              </TrackDisplay>
            </div>
            <div className="w-full">
              <TrackDisplay>
                <ChartCard />
              </TrackDisplay>
            </div>
          </div>
        </div>
      </TrackProvider>
    </ThemeProvider>
  );
}

export default App;
