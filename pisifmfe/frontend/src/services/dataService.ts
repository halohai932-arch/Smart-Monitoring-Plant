/**
 * Data Service - Fetches corporate overview and aggregated data
 */

import type {
  PlantId,
  CorporateOverview,
  PlantSummary,
} from "@/types/dashboard";
import { getPlantConfig } from "@/config/plantConfig";

/**
 * Generate dummy corporate overview for all plants
 */
export async function getCorporateOverview(): Promise<CorporateOverview> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  const plantIds: PlantId[] = ["CIKOKOL", "SEMARANG", "CIKUPA", "AGRO"];
  const plants: PlantSummary[] = plantIds.map((plantId) => {
    const config = getPlantConfig(plantId);

    // Simulate power data - varies by plant and time
    const baseUtilization = Math.random() * 60 + 20; // 20-80%
    const power = (config.capacity * baseUtilization) / 100;
    const utilization = baseUtilization + (Math.random() * 10 - 5); // Add variation

    return {
      plantId,
      plantName: config.name,
      power: Math.round(power),
      capacity: config.capacity,
      utilization: Math.min(100, Math.max(0, utilization)),
      machines: config.machines.production.length,
      alarms: Math.floor(Math.random() * 5), // 0-4 alarms per plant
    };
  });

  const totalPower = plants.reduce((sum, p) => sum + p.power, 0);
  const totalCapacity = plants.reduce((sum, p) => sum + p.capacity, 0);
  const totalAlarms = plants.reduce((sum, p) => sum + p.alarms, 0);

  return {
    totalPower,
    totalCapacity,
    utilizationRate: (totalPower / totalCapacity) * 100,
    activeAlarms: totalAlarms,
    plants,
    lastUpdate: new Date().toISOString(),
  };
}

/**
 * Get plant summary
 */
export async function getPlantSummary(plantId: PlantId): Promise<PlantSummary> {
  const overview = await getCorporateOverview();
  const plant = overview.plants.find((p) => p.plantId === plantId);

  if (!plant) {
    throw new Error(`Plant ${plantId} not found`);
  }

  return plant;
}

/**
 * Get all plants overview
 */
export async function getAllPlantsSummary(): Promise<PlantSummary[]> {
  const overview = await getCorporateOverview();
  return overview.plants;
}
