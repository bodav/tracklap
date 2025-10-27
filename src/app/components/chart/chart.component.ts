import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration } from "chart.js";
import { TrackService } from "../../services/track.service";
import { ChartService, ChartData } from "../../services/chart.service";

@Component({
  selector: "app-chart",
  imports: [CommonModule, BaseChartDirective],
  templateUrl: "./chart.component.html",
  styleUrl: "./chart.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  private readonly trackService = inject(TrackService);
  private readonly chartService = inject(ChartService);

  protected readonly track = this.trackService.track;

  protected readonly chartData = computed(() => {
    const currentTrack = this.track();
    if (!currentTrack) return [];
    return this.chartService.getChartData(currentTrack.sum, {
      removeOutliers: true,
      outlierMethod: "iqr",
      smoothingWindow: 5
    });
  });

  protected readonly lineChartData = computed<ChartConfiguration["data"]>(
    () => {
      const data = this.chartData();
      return {
        datasets: [
          {
            data: data.map((d: ChartData) => ({
              x: parseFloat(d.distance) / 1000,
              y: d.speed
            })),
            label: "Speed (m/s)",
            borderColor: "#ff6b35",
            backgroundColor: "rgba(255, 107, 53, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
      };
    }
  );

  protected readonly lineChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: "index",
        intersect: false
      }
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Distance (km)",
          font: {
            weight: "bold"
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Speed (m/s)",
          font: {
            weight: "bold"
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)"
        },
        beginAtZero: false
      }
    },
    interaction: {
      mode: "index",
      intersect: false
    }
  };
}
