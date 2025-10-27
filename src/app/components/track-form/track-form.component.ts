import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { TrackService } from "../../services/track.service";

@Component({
  selector: "app-track-form",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./track-form.component.html",
  styleUrl: "./track-form.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly trackService = inject(TrackService);

  protected readonly form: FormGroup;
  protected readonly fileDescription = signal("Start by selecting a gpx file");
  protected readonly isSubmitting = signal(false);

  constructor() {
    this.form = this.fb.group({
      file: [null, [Validators.required]],
      trimStart: [0, [Validators.min(0)]],
      trimEnd: [0, [Validators.min(0)]]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const size = (file.size / 1024).toFixed(2);
      const lastModified = new Date(file.lastModified).toLocaleString();
      this.fileDescription.set(
        `Size: ${size} KB, Last Modified: ${lastModified}`
      );
      this.form.patchValue({ file });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    const formValue = this.form.value;

    try {
      await this.trackService.getTrack({
        gpx: formValue.file,
        trimStart: formValue.trimStart || 0,
        trimEnd: formValue.trimEnd || 0
      });
    } catch (error) {
      console.error("Error processing track:", error);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
