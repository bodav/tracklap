interface TrackPoint {
  lat: number;
  lon: number;
  time?: string;
}

interface GPXData {
  name: string;
  type: string;
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

async function parse(file: File): Promise<GPXData> {
  const gpxString = await readGPXFile(file);
  return parseGPX(gpxString);
}

function parseGPX(gpxString: string): GPXData {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(gpxString, "application/xml");

  const name = xmlDoc.getElementsByTagName("name")[0]?.textContent || "";
  const type = xmlDoc.getElementsByTagName("type")[0]?.textContent || "";

  const trackPoints: TrackPoint[] = [];
  const trkpts = xmlDoc.getElementsByTagName("trkpt");

  for (let i = 0; i < trkpts.length; i++) {
    const trkpt = trkpts[i];
    const lat = parseFloat(trkpt.getAttribute("lat") || "0");
    const lon = parseFloat(trkpt.getAttribute("lon") || "0");
    const time = trkpt.getElementsByTagName("time")[0]?.textContent || undefined;

    trackPoints.push({ lat, lon, time });
  }

  return {
    name,
    type,
    trackPoints,
  };
}
