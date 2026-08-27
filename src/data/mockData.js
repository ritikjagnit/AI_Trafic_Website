// Mock Data for Sakoli Traffic Operations Center

export const initialJunctions = [
  {
    id: 'j4',
    code: 'Junction 4',
    name: 'Main Road',
    density: 95,
    vehicleCount: 420,
    currentPhase: '2 / 4',
    phaseName: 'Main Rd Northbound',
    greenTime: 35,
    yellowTime: 5,
    redTime: 40,
    countdown: 23,
    status: 'critical',
    recommendation: 'Increase green time on Main Road by 15% to reduce congestion.',
    recommendedGreen: 45,
    location: 'CentralSakoli Crossing',
    mapX: 400,
    mapY: 280,
    vehiclesPerMin: 84,
    avgSpeed: '14 km/h'
  },
  {
    id: 'j7',
    code: 'Junction 7',
    name: 'Market Road',
    density: 82,
    vehicleCount: 310,
    currentPhase: '1 / 4',
    phaseName: 'Market Eastbound',
    greenTime: 30,
    yellowTime: 4,
    redTime: 45,
    countdown: 14,
    status: 'high',
    recommendation: 'Extend Eastbound signal timing during peak market hours.',
    recommendedGreen: 38,
    location: 'Market Square Corridor',
    mapX: 620,
    mapY: 180,
    vehiclesPerMin: 68,
    avgSpeed: '21 km/h'
  },
  {
    id: 'j2',
    code: 'Junction 2',
    name: 'Station Road',
    density: 76,
    vehicleCount: 285,
    currentPhase: '3 / 4',
    phaseName: 'Station Southbound',
    greenTime: 25,
    yellowTime: 4,
    redTime: 35,
    countdown: 18,
    status: 'high',
    recommendation: 'Prioritize bus corridor lanes to clear station traffic backlog.',
    recommendedGreen: 32,
    location: 'Railway Station Plaza',
    mapX: 220,
    mapY: 280,
    vehiclesPerMin: 59,
    avgSpeed: '24 km/h'
  },
  {
    id: 'j1',
    code: 'Junction 1',
    name: 'College Road',
    density: 65,
    vehicleCount: 210,
    currentPhase: '2 / 4',
    phaseName: 'College Rd North',
    greenTime: 28,
    yellowTime: 3,
    redTime: 30,
    countdown: 11,
    status: 'moderate',
    recommendation: 'Maintain standard adaptive loop timing for balanced flow.',
    recommendedGreen: 28,
    location: 'University Avenue',
    mapX: 400,
    mapY: 120,
    vehiclesPerMin: 45,
    avgSpeed: '32 km/h'
  },
  {
    id: 'j9',
    code: 'Junction 9',
    name: 'Bypass Road',
    density: 45,
    vehicleCount: 155,
    currentPhase: '4 / 4',
    phaseName: 'Bypass Westbound',
    greenTime: 40,
    yellowTime: 5,
    redTime: 25,
    countdown: 31,
    status: 'low',
    recommendation: 'Optimal flow detected. Reroute corridor available for heavy loads.',
    recommendedGreen: 35,
    location: 'Outer Highway Interchange',
    mapX: 400,
    mapY: 460,
    vehiclesPerMin: 34,
    avgSpeed: '48 km/h'
  }
];

export const initialIncidents = [
  {
    id: 'TRF-1024',
    type: 'Accident',
    location: 'Main Road (Junction 4)',
    severity: 'High',
    reportedTime: '10:14 AM',
    assignedTeam: 'Unit TR-04',
    status: 'In Progress',
    description: 'Minor two-vehicle collision blocking right lane.'
  },
  {
    id: 'TRF-1025',
    type: 'Traffic Congestion',
    location: 'Market Road (Junction 7)',
    severity: 'Medium',
    reportedTime: '09:45 AM',
    assignedTeam: 'Unit TR-02',
    status: 'Monitoring',
    description: 'Vendor spillover causing slowdown in Eastbound lane.'
  },
  {
    id: 'TRF-1026',
    type: 'Signal Failure',
    location: 'Station Road (Junction 2)',
    severity: 'Critical',
    reportedTime: '08:30 AM',
    assignedTeam: 'Tech Crew B',
    status: 'Under Repair',
    description: 'Pedestrian signal controller relay failure replaced.'
  }
];

export const initialCctvCameras = [
  {
    id: 'CAM-01',
    name: 'Camera 01',
    location: 'Main Road (Junction 4)',
    status: 'LIVE',
    trafficState: 'Critical (95%)',
    fps: 30,
    vehiclesDetected: 42,
    speedAvg: '14 km/h',
    badgeColor: 'red'
  },
  {
    id: 'CAM-02',
    name: 'Camera 02',
    location: 'Market Road (Junction 7)',
    status: 'LIVE',
    trafficState: 'Heavy (82%)',
    fps: 30,
    vehiclesDetected: 31,
    speedAvg: '21 km/h',
    badgeColor: 'orange'
  },
  {
    id: 'CAM-03',
    name: 'Camera 03',
    location: 'Station Road (Junction 2)',
    status: 'LIVE',
    trafficState: 'Heavy (76%)',
    fps: 29,
    vehiclesDetected: 28,
    speedAvg: '24 km/h',
    badgeColor: 'orange'
  },
  {
    id: 'CAM-04',
    name: 'Camera 04',
    location: 'College Road (Junction 1)',
    status: 'LIVE',
    trafficState: 'Moderate (65%)',
    fps: 30,
    vehiclesDetected: 21,
    speedAvg: '32 km/h',
    badgeColor: 'yellow'
  }
];

export const hourlyTrafficData = [
  { time: '12 AM', today: 18, yesterday: 22 },
  { time: '3 AM', today: 12, yesterday: 15 },
  { time: '6 AM', today: 42, yesterday: 38 },
  { time: '9 AM', today: 88, yesterday: 82 },
  { time: '12 PM', today: 72, yesterday: 74 },
  { time: '3 PM', today: 79, yesterday: 76 },
  { time: '6 PM', today: 94, yesterday: 91 },
  { time: '9 PM', today: 56, yesterday: 60 },
];

export const trafficDensityDistribution = [
  { name: 'Low (0-30%)', value: 28, color: '#10b981' },
  { name: 'Moderate (31-60%)', value: 44, color: '#f59e0b' },
  { name: 'High (61-80%)', value: 20, color: '#f97316' },
  { name: 'Very High (81-100%)', value: 8, color: '#ef4444' },
];

export const vehicleCategoryStats = {
  total: 12458,
  cars: 7840,
  bikes: 3921,
  buses: 412,
  trucks: 285
};

export const sampleVehicleList = [
  { id: 'FLOW-8801', plate: 'MH-36-AB-1204', type: 'Car', speed: '34 km/h', junction: 'Junction 4', status: 'In Transit', timestamp: '10:39:12' },
  { id: 'FLOW-8802', plate: 'MH-36-C-9912', type: 'Bike', speed: '42 km/h', junction: 'Junction 1', status: 'In Transit', timestamp: '10:39:10' },
  { id: 'FLOW-8803', plate: 'MH-36-BUS-44', type: 'Bus', speed: '22 km/h', junction: 'Junction 2', status: 'At Stop', timestamp: '10:39:08' },
  { id: 'FLOW-8804', plate: 'MH-36-TR-881', type: 'Truck', speed: '18 km/h', junction: 'Junction 9', status: 'Rerouted', timestamp: '10:39:05' },
  { id: 'FLOW-8805', plate: 'MH-36-XY-5050', type: 'Car', speed: '12 km/h', junction: 'Junction 4', status: 'Congested', timestamp: '10:39:01' },
  { id: 'FLOW-8806', plate: 'MH-36-BK-1102', type: 'Bike', speed: '38 km/h', junction: 'Junction 7', status: 'In Transit', timestamp: '10:38:58' },
  { id: 'FLOW-8807', plate: 'MH-36-CAR-77', type: 'Car', speed: '45 km/h', junction: 'Junction 9', status: 'In Transit', timestamp: '10:38:55' },
];

export const availableReports = [
  {
    id: 'rep-01',
    title: 'Daily Traffic Density & Peak Hour Analysis',
    date: '2026-08-25',
    category: 'Daily Traffic Report',
    size: '2.4 MB',
    summary: 'Comprehensive analysis of peak hours (8 AM - 10 AM, 5 PM - 8 PM) showing 12% reduced delay at Junction 4.'
  },
  {
    id: 'rep-02',
    title: 'Weekly Junction Performance Summary',
    date: '2026-08-24',
    category: 'Weekly Traffic Report',
    size: '4.8 MB',
    summary: 'Weekly evaluation of signal timing efficiencies across Sakoli central perimeter.'
  },
  {
    id: 'rep-03',
    title: 'Incident Response & Emergency Rerouting Audit',
    date: '2026-08-22',
    category: 'Incident Report',
    size: '1.9 MB',
    summary: 'Audit of emergency vehicle response times averaging 4.2 minutes post AI signal green-wave deployment.'
  },
  {
    id: 'rep-04',
    title: 'AI Signal Adaptive Control Optimization Log',
    date: '2026-08-20',
    category: 'Signal Optimization Report',
    size: '3.1 MB',
    summary: 'DeepTraffic v2.1 algorithm metrics showing 18% improvement in average vehicle throughput.'
  },
  {
    id: 'rep-05',
    title: 'Carbon Footprint & Fuel Conservation Metrics',
    date: '2026-08-18',
    category: 'Environmental Impact Report',
    size: '1.5 MB',
    summary: 'Quantification of 128 L fuel saved and 320 kg CO2 emissions reduced daily.'
  }
];
