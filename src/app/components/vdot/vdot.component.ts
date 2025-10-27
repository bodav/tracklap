import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrackService } from "../../services/track.service";
import { VdotService } from "../../services/vdot.service";

@Component({
  selector: "app-vdot",
  imports: [CommonModule],
  templateUrl: "./vdot.component.html",
  styleUrl: "./vdot.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VdotComponent {
  private readonly trackService = inject(TrackService);
  private readonly vdotService = inject(VdotService);

  protected readonly track = this.trackService.track;

  protected readonly vdotData = computed(() => {
    const currentTrack = this.track();
    if (!currentTrack) return null;

    const summary = currentTrack.sum;
    const durationParts = summary.duration.split(":");
    const durationInMs =
      (parseInt(durationParts[0]) * 3600 +
        parseInt(durationParts[1]) * 60 +
        parseInt(durationParts[2])) *
      1000;

    return this.vdotService.calculateVdot(summary.totalDistance, durationInMs);
  });
}
