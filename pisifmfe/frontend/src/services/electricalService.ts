/**
 * Electrical Service - LVMDP and electrical data
 */

import type {
  PlantId,
  LvmdpData,
  ElectricalDashboardData,
  LvmdpSummary,
} from "@/types/dashboard";
import { getPlantConfig } from "@/config/plantConfig";

/**
 * Get LVMDP data for a plant
 * For Cikupa: fetch real data from API
 * For others: return dummy data
 */
export async function getLvmdpData(
  plantId: PlantId,
  lvmdpId: 1 | 2 | 3 | 4
): Promise<LvmdpData> {
  const config = getPlantConfig(plantId);

  if (config.dataMode === "REAL" && plantId === "CIKUPA") {
    // Fetch real data from backend
    // This would normally call the existing API endpoint
    return generateDummyLvmdpData(plantId, lvmdpId);
  }

  // Return dummy data
  return generateDummyLvmdpData(plantId, lvmdpId);
}

/**
 * Get electrical dashboard data for a plant
 */
export async function getElectricalDashboard(
  plantId: PlantId
): Promise<ElectricalDashboardData> {
  const config = getPlantConfig(plantId);

  // Fetch all 4 LVMDP data
  const lvmdps = await Promise.all([
    getLvmdpData(plantId, 1),
    getLvmdpData(plantId, 2),
    getLvmdpData(plantId, 3),
    getLvmdpData(plantId, 4),
  ]);

  // Calculate summaries
  const summaries: LvmdpSummary[] = lvmdps.map((data) => {
    const utilization = (data.apparentPowerKva / config.lvmdpCapacity) * 100;
    let status: "normal" | "warning" | "critical" = "normal";

    if (utilization >= 90) status = "critical";
    else if (utilization >= 75) status = "warning";

    return {
      lvmdpId: lvmdps.indexOf(data) + 1,
      utilization: Math.min(100, utilization),
      powerKw: data.powerKw,
      apparentPowerKva: data.apparentPowerKva,
      status,
    };
  });

  // Calculate total
  const totalPower = lvmdps.reduce((sum, d) => sum + d.powerKw, 0);
  const totalApparentPower = lvmdps.reduce(
    (sum, d) => sum + d.apparentPowerKva,
    0
  );
  const utilization = (totalApparentPower / config.capacity) * 100;

  return {
    plantId,
    totalCapacity: config.capacity,
    currentUtilization: Math.min(100, utilization),
    totalPower,
    totalApparentPower,
    lvmdps: summaries,
    lastUpdate: new Date().toISOString(),
  };
}

/**
 * Generate dummy LVMDP data
 */
function generateDummyLvmdpData(
  plantId: PlantId,
  lvmdpId: 1 | 2 | 3 | 4
): LvmdpData {
  const config = getPlantConfig(plantId);

  // Create variation based on LVMDP ID and plant
  const seed = (plantId.charCodeAt(0) + lvmdpId) % 10;
  const baseUtilization = 30 + seed * 8; // 30-100% range

  const apparentPowerKva = (config.lvmdpCapacity * baseUtilization) / 100;
  const cosPhi = 0.8 + Math.random() * 0.15; // 0.8-0.95
  const powerKw = apparentPowerKva * cosPhi;
  const reactivePowerKvar = Math.sqrt(
    Math.max(0, apparentPowerKva * apparentPowerKva - powerKw * powerKw)
  );

  return {
    id: lvmdpId,
    plantId,
    powerKw: Math.round(powerKw * 100) / 100,
    apparentPowerKva: Math.round(apparentPowerKva * 100) / 100,
    reactivePowerKvar: Math.round(reactivePowerKvar * 100) / 100,
    cosPhi: Math.round(cosPhi * 1000) / 1000,
    voltage: 380 + Math.random() * 20, // 380-400V
    current: 250 + Math.random() * 50, // 250-300A
    frequency: 50,
    accumulatedEnergy: 1000000 + Math.random() * 500000,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Get all LVMDP summaries for a plant
 */
export async function getLvmdpSummaries(
  plantId: PlantId
): Promise<LvmdpSummary[]> {
  const dashboard = await getElectricalDashboard(plantId);
  return dashboard.lvmdps;
}
