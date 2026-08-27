import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJunctions, initialIncidents, initialCctvCameras } from '../data/mockData';

const TrafficContext = createContext(null);

export const TrafficProvider = ({ children }) => {
  const [junctions, setJunctions] = useState(initialJunctions);
  const [selectedJunctionId, setSelectedJunctionId] = useState('j4');
  const [incidents, setIncidents] = useState(initialIncidents);
  const [cctvCameras, setCctvCameras] = useState(initialCctvCameras);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  // Real-time Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  // KPIs State
  const [kpis, setKpis] = useState({
    avgFlow: 72,
    activeSignals: '16 / 24',
    totalVehicles: 12458,
    incidentsCount: 3,
    fuelSaved: 128,
    emissionReduced: 320
  });

  // Live ticking clock & periodic subtle data updates
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const simulationTimer = setInterval(() => {
      // Tick countdowns on junctions
      setJunctions(prev => prev.map(j => {
        let newCountdown = j.countdown - 1;
        if (newCountdown <= 0) {
          newCountdown = j.greenTime;
        }
        // Subtle random vehicle count variation (+/- 2)
        const vehicleDelta = Math.floor(Math.random() * 5) - 2;
        const newVehicleCount = Math.max(80, j.vehicleCount + vehicleDelta);

        return {
          ...j,
          countdown: newCountdown,
          vehicleCount: newVehicleCount
        };
      }));
    }, 1000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(simulationTimer);
    };
  }, []);

  // Toast Notification System
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-4), { id, message, type }]); // Keep last 5 max
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Get currently selected junction object
  const selectedJunction = junctions.find(j => j.id === selectedJunctionId) || junctions[0];

  // Action: Select Junction
  const selectJunction = (id) => {
    setSelectedJunctionId(id);
  };

  // Action: Apply AI Recommendation on Junction
  const applyRecommendation = (junctionId) => {
    const target = junctions.find(j => j.id === junctionId);
    if (!target) return;

    setJunctions(prev => prev.map(j => {
      if (j.id === junctionId) {
        const newGreen = j.recommendedGreen || (j.greenTime + 5);
        const newDensity = Math.max(30, j.density - 18);
        const newStatus = newDensity > 80 ? 'critical' : newDensity > 60 ? 'high' : newDensity > 30 ? 'moderate' : 'low';
        return {
          ...j,
          greenTime: newGreen,
          density: newDensity,
          status: newStatus,
          recommendation: `Signal optimized! Green time increased to ${newGreen}s. Density reduced to ${newDensity}%.`
        };
      }
      return j;
    }));

    // Update global flow KPI
    setKpis(prev => ({
      ...prev,
      avgFlow: Math.min(94, prev.avgFlow + 3),
      fuelSaved: prev.fuelSaved + 4,
      emissionReduced: prev.emissionReduced + 8
    }));

    addToast(`AI Recommendation Applied to ${target.code} (${target.name})! Green signal set to ${target.recommendedGreen || target.greenTime + 5}s.`, 'success');
  };

  // Action: Manual Override Signal Timings
  const manualOverride = (junctionId, newGreen, newYellow, newRed) => {
    const target = junctions.find(j => j.id === junctionId);
    if (!target) return;

    setJunctions(prev => prev.map(j => {
      if (j.id === junctionId) {
        return {
          ...j,
          greenTime: parseInt(newGreen, 10),
          yellowTime: parseInt(newYellow, 10),
          redTime: parseInt(newRed, 10),
          recommendation: `Manual Override active: G:${newGreen}s Y:${newYellow}s R:${newRed}s`
        };
      }
      return j;
    }));

    addToast(`Manual Signal Override applied to ${target.code} (${target.name}).`, 'warning');
  };

  // Action: Global Optimize All Signals
  const optimizeAllSignals = () => {
    setJunctions(prev => prev.map(j => {
      const optGreen = Math.min(50, j.greenTime + 5);
      const optDensity = Math.max(25, j.density - 15);
      return {
        ...j,
        greenTime: optGreen,
        density: optDensity,
        status: optDensity > 80 ? 'critical' : optDensity > 60 ? 'high' : optDensity > 30 ? 'moderate' : 'low',
        recommendation: `Adaptive AI balance active across corridor.`
      };
    }));

    setKpis(prev => ({
      ...prev,
      avgFlow: 88,
      fuelSaved: prev.fuelSaved + 15
    }));

    addToast('DeepTraffic AI Engine optimized signal timings across all Sakoli junctions!', 'success');
  };

  // Action: Simulate Emergency (Requirement #19)
  const simulateEmergency = () => {
    setIsEmergencyActive(true);
    const emergencyInfo = {
      incidentId: 'TRF-9999',
      type: 'Major Accident',
      location: 'Main Road (Junction 4)',
      affectedJunctionId: 'j4',
      responseTeam: 'Unit TR-07 (Emergency Rapid Response)',
      eta: '04 min',
      aiRecommendation: 'Activate Green Corridor on Main Rd. Reroute general traffic through Bypass Road (Junction 9).'
    };
    setEmergencyData(emergencyInfo);

    // Update Junction 4 to emergency critical state
    setJunctions(prev => prev.map(j => {
      if (j.id === 'j4') {
        return {
          ...j,
          density: 98,
          status: 'critical',
          greenTime: 60,
          recommendation: '🚨 EMERGENCY PRIORITY GREEN WAVE ACTIVE ON MAIN ROAD'
        };
      }
      if (j.id === 'j9') {
        return {
          ...j,
          recommendation: 'Bypass corridor receiving diverted traffic from Main Rd.'
        };
      }
      return j;
    }));

    // Add Emergency Incident
    const newEmergencyIncident = {
      id: 'TRF-9999',
      type: 'Major Accident (Emergency)',
      location: 'Main Road (Junction 4)',
      severity: 'Critical',
      reportedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignedTeam: 'Unit TR-07',
      status: 'DISPATCHED',
      description: 'Severe multi-lane blockage. Emergency corridor established.'
    };

    setIncidents(prev => [newEmergencyIncident, ...prev]);
    setSelectedJunctionId('j4');

    setKpis(prev => ({
      ...prev,
      incidentsCount: prev.incidentsCount + 1
    }));

    addToast('🚨 EMERGENCY SIMULATION ACTIVATED! Unit TR-07 dispatched to Junction 4.', 'emergency');
  };

  // Action: Resolve Emergency
  const resolveEmergency = () => {
    setIsEmergencyActive(false);
    setEmergencyData(null);

    // Reset Junction 4 state
    setJunctions(prev => prev.map(j => {
      if (j.id === 'j4') {
        return {
          ...j,
          density: 55,
          status: 'moderate',
          greenTime: 35,
          recommendation: 'Post-emergency traffic flow restored to normal adaptive mode.'
        };
      }
      return j;
    }));

    // Mark emergency incident as resolved
    setIncidents(prev => prev.map(inc => {
      if (inc.id === 'TRF-9999') {
        return { ...inc, status: 'Resolved' };
      }
      return inc;
    }));

    setKpis(prev => ({
      ...prev,
      incidentsCount: Math.max(3, prev.incidentsCount - 1)
    }));

    addToast('Emergency situation resolved. Traffic flow back to normal adaptive operation.', 'success');
  };

  // Action: Report New Incident
  const reportIncident = (incidentData) => {
    const newId = `TRF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInc = {
      id: newId,
      type: incidentData.type || 'General Incident',
      location: incidentData.location || 'Sakoli Central',
      severity: incidentData.severity || 'Medium',
      reportedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignedTeam: incidentData.assignedTeam || 'Unit TR-01',
      status: 'Assigned',
      description: incidentData.description || 'Logged via Officer Control Center'
    };

    setIncidents(prev => [newInc, ...prev]);
    setKpis(prev => ({ ...prev, incidentsCount: prev.incidentsCount + 1 }));
    addToast(`New Incident ${newId} (${newInc.type}) reported at ${newInc.location}.`, 'warning');
  };

  return (
    <TrafficContext.Provider value={{
      junctions,
      selectedJunctionId,
      selectedJunction,
      selectJunction,
      incidents,
      cctvCameras,
      isEmergencyActive,
      emergencyData,
      toasts,
      kpis,
      currentTime,
      addToast,
      removeToast,
      applyRecommendation,
      manualOverride,
      optimizeAllSignals,
      simulateEmergency,
      resolveEmergency,
      reportIncident
    }}>
      {children}
    </TrafficContext.Provider>
  );
};

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};
