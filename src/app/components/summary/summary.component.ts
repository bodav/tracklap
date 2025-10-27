import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrackService } from "../../services/track.service";

@Component({
  selector: "app-summary",
  imports: [CommonModule],
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
  private readonly trackService = inject(TrackService);

  protected readonly track = this.trackService.track;

  protected readonly summary = computed(() => {
    const currentTrack = this.track();
    return currentTrack?.sum;
  });
}
