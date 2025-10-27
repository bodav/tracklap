# TrackLap - Angular 20 + DaisyUI + Chart.js

A modern GPX running data analysis application built with Angular 20, DaisyUI, and Chart.js.

## Features

- **GPX File Upload**: Upload and analyze your Strava GPX running files
- **Speed Analysis**: Visualize speed over distance with outlier detection and smoothing
- **VDOT Calculator**: Calculate your VDOT score and training paces
- **Segment Analysis**: Detailed breakdown of your run segments
- **Modern UI**: Beautiful interface using DaisyUI components

## Tech Stack

- **Angular 20**: Modern Angular with standalone components and signals
- **DaisyUI**: Tailwind CSS component library
- **Chart.js**: Interactive charts for data visualization
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js >= 24.0.0 (or use with `--legacy-peer-deps`)
- npm >= 8.0.0

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm start
```

Navigate to `http://localhost:4200/`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── chart/          # Chart visualization component
│   │   ├── navbar/         # Navigation bar
│   │   ├── summary/        # Run summary stats
│   │   ├── track-form/     # GPX file upload form
│   │   └── vdot/           # VDOT calculator component
│   ├── services/
│   │   ├── chart.service.ts      # Chart data processing
│   │   ├── parser.service.ts     # GPX file parsing
│   │   ├── segment.service.ts    # Segment calculations
│   │   ├── track.service.ts      # Track management
│   │   └── vdot.service.ts       # VDOT calculations
│   └── app.component.ts    # Root component
└── index.css              # Global styles
```

## Features in Detail

### Outlier Detection

The chart service includes three outlier detection methods:

- **IQR (Interquartile Range)**: Conservative, good for GPS data
- **Z-Score**: For normally distributed data
- **Percentile**: Most aggressive, removes specific percentiles

### Data Smoothing

Speed data is smoothed using a rolling average window to reduce GPS noise.

### VDOT Training Zones

Automatically calculates training paces for:

- Easy
- Marathon
- Threshold
- Interval
- VO2 Max
- Repetition
- Sprint

## License

See LICENSE.md

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
