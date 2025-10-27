import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TrackFormComponent } from "./components/track-form/track-form.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { ChartComponent } from "./components/chart/chart.component";
import { VdotComponent } from "./components/vdot/vdot.component";

@Component({
  selector: "app-root",
  imports: [
    NavbarComponent,
    TrackFormComponent,
    SummaryComponent,
    ChartComponent,
    VdotComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "tracklap";
}
