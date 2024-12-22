interface TrackPoint {
  lat: number;
  lon: number;
  time: Date;
  ele: number;
  power: number;
  hr: number;
  cad: number;
}

interface GPXTrack {
  name: string;
  type: string;
  time?: Date;
  trackPoints: TrackPoint[];
}

function readGPXFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

async function parseGPXFile(file: File): Promise<GPXTrack> {
  const gpxString = await readGPXFile(file);
  return parseGPX(gpxString);
}

function parseGPX(gpxString: string): GPXTrack {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(gpxString, "application/xml");

  const timeString = xmlDoc.getElementsByTagName("time")[0]?.textContent || undefined;
  const time = timeString ? new Date(timeString) : undefined;
  const name = xmlDoc.getElementsByTagName("name")[0]?.textContent || "";
  const type = xmlDoc.getElementsByTagName("type")[0]?.textContent || "";

  const trackPoints: TrackPoint[] = [];
  const trkpts = xmlDoc.getElementsByTagName("trkpt");

  for (let i = 0; i < trkpts.length; i++) {
    const trkpt = trkpts[i];
    const lat = parseFloat(trkpt.getAttribute("lat") || "0");
    const lon = parseFloat(trkpt.getAttribute("lon") || "0");
    const timeString =
      trkpt.getElementsByTagName("time")[0]?.textContent || null;
    const time = timeString ? new Date(timeString) : new Date(0);
    const ele = parseFloat(
      trkpt.getElementsByTagName("ele")[0].textContent || "0"
    );
    const extensions = trkpt.getElementsByTagName("extensions")[0];
    const power = parseFloat(
      extensions.getElementsByTagName("power")[0].textContent || "0"
    );
    const tpex = extensions.getElementsByTagName(
      "gpxtpx:TrackPointExtension"
    )[0];
    const hr = parseFloat(
      tpex.getElementsByTagName("gpxtpx:hr")[0].textContent || "0"
    );
    const cad = parseFloat(
      tpex.getElementsByTagName("gpxtpx:cad")[0].textContent || "0"
    );

    trackPoints.push({ lat, lon, time, ele, power, hr, cad });
  }

  return {
    name,
    type,
    time,
    trackPoints
  };
}

export { parseGPXFile };
export type { GPXTrack, TrackPoint };
