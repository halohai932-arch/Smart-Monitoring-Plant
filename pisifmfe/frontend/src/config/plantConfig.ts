/**
 * Plant Configuration - Complete plant setup with machines, LVMDPs, and utilities
 */

import type { PlantId } from "@/types/dashboard";

export interface PlantConfig {
  id: PlantId;
  name: string;
  code: number;
  location: string;
  capacity: number; // kVA
  lvmdpCapacity: number; // Per LVMDP kVA
  dataMode: "REAL" | "DUMMY"; // REAL for Cikupa, DUMMY for others
  machines: {
    production: Machine[];
    utility: Machine[];
  };
}

export interface Machine {
  id: string;
  name: string;
  category: string;
  type: "production" | "utility";
}

// ==================== PLANT CONFIGURATIONS ====================

const CIKOKOL_MACHINES: Machine[] = [
  {
    id: "baked-corn-puff",
    name: "Baked Corn Puff",
    category: "Snack",
    type: "production",
  },
  {
    id: "pc14",
    name: "Potato Chips Line PC14",
    category: "Snack",
    type: "production",
  },
  {
    id: "cassava-inhouse",
    name: "Cassava Inhouse",
    category: "Cassava",
    type: "production",
  },
  {
    id: "cassava-copack",
    name: "Cassava Copack",
    category: "Cassava",
    type: "production",
  },
  { id: "tempe", name: "Tempe", category: "Specialty", type: "production" },
  {
    id: "batch-fryer",
    name: "Batch Fryer",
    category: "Frying",
    type: "production",
  },
  {
    id: "continuous-fryer",
    name: "Continuous Fryer",
    category: "Frying",
    type: "production",
  },
];

const SEMARANG_MACHINES: Machine[] = [
  { id: "pc14", name: "PC 14", category: "Snack", type: "production" },
  { id: "pc32", name: "PC 32", category: "Snack", type: "production" },
  {
    id: "cassava-inhouse",
    name: "Cassava Inhouse",
    category: "Cassava",
    type: "production",
  },
  {
    id: "cassava-copack",
    name: "Cassava Copack",
    category: "Cassava",
    type: "production",
  },
  { id: "tempe", name: "Tempe", category: "Specialty", type: "production" },
  { id: "tortila", name: "Tortila", category: "Specialty", type: "production" },
  { id: "fcp", name: "FCP", category: "Specialty", type: "production" },
  {
    id: "extrude-pellet",
    name: "Extrude Pellet",
    category: "Pellet",
    type: "production",
  },
  {
    id: "sheeted-e250",
    name: "Sheeted Pellet E250",
    category: "Pellet",
    type: "production",
  },
  {
    id: "sheeted-e500-1",
    name: "Sheeted Pellet E500 1",
    category: "Pellet",
    type: "production",
  },
  {
    id: "sheeted-e500-2",
    name: "Sheeted Pellet E500 2",
    category: "Pellet",
    type: "production",
  },
  {
    id: "batch-fryer",
    name: "Batch Fryer",
    category: "Frying",
    type: "production",
  },
  {
    id: "continuous-fryer",
    name: "Continuous Fryer",
    category: "Frying",
    type: "production",
  },
];

const CIKUPA_MACHINES: Machine[] = [
  { id: "pc14", name: "PC 14", category: "Snack", type: "production" },
  { id: "pc39", name: "PC 39", category: "Snack", type: "production" },
  {
    id: "cassava-inhouse",
    name: "Cassava Inhouse",
    category: "Cassava",
    type: "production",
  },
  {
    id: "cassava-copack",
    name: "Cassava Copack",
    category: "Cassava",
    type: "production",
  },
  { id: "tortila", name: "Tortila", category: "Specialty", type: "production" },
  { id: "fcp", name: "FCP", category: "Specialty", type: "production" },
  { id: "tws56", name: "TWS 5.6", category: "Specialty", type: "production" },
  { id: "tws72", name: "TWS 7.2", category: "Specialty", type: "production" },
  {
    id: "packing-pouch",
    name: "Packing Pouch Promina Puff",
    category: "Packing",
    type: "production",
  },
  {
    id: "vacuum-fryer",
    name: "Vacuum Fryer 1",
    category: "Frying",
    type: "production",
  },
];

const AGRO_MACHINES: Machine[] = [
  {
    id: "baked-corn-puff",
    name: "Baked Corn Puff",
    category: "Snack",
    type: "production",
  },
  {
    id: "pc14",
    name: "Potato Chips Line PC14",
    category: "Snack",
    type: "production",
  },
  {
    id: "cassava-inhouse",
    name: "Cassava Inhouse",
    category: "Cassava",
    type: "production",
  },
  {
    id: "cassava-copack",
    name: "Cassava Copack",
    category: "Cassava",
    type: "production",
  },
  { id: "tempe", name: "Tempe", category: "Specialty", type: "production" },
  {
    id: "batch-fryer",
    name: "Batch Fryer",
    category: "Frying",
    type: "production",
  },
  {
    id: "continuous-fryer",
    name: "Continuous Fryer",
    category: "Frying",
    type: "production",
  },
];

export const PLANT_CONFIGS: Record<PlantId, PlantConfig> = {
  CIKOKOL: {
    id: "CIKOKOL",
    name: "Plant Cikokol",
    code: 1402,
    location: "Cikokol, Tangerang",
    capacity: 5540, // kVA
    lvmdpCapacity: 1385, // 5540 / 4
    dataMode: "DUMMY",
    machines: {
      production: CIKOKOL_MACHINES,
      utility: [],
    },
  },

  SEMARANG: {
    id: "SEMARANG",
    name: "Plant Semarang",
    code: 1403,
    location: "Semarang, Jawa Tengah",
    capacity: 5540, // kVA
    lvmdpCapacity: 1385,
    dataMode: "DUMMY",
    machines: {
      production: SEMARANG_MACHINES,
      utility: [],
    },
  },

  CIKUPA: {
    id: "CIKUPA",
    name: "Plant Cikupa",
    code: 1405,
    location: "Cikupa, Bogor",
    capacity: 5540, // kVA
    lvmdpCapacity: 1385,
    dataMode: "REAL", // REAL DATA
    machines: {
      production: CIKUPA_MACHINES,
      utility: [],
    },
  },

  AGRO: {
    id: "AGRO",
    name: "Plant Agro",
    code: 1400,
    location: "Lampung, Sumatera",
    capacity: 5540, // kVA
    lvmdpCapacity: 1385,
    dataMode: "DUMMY",
    machines: {
      production: AGRO_MACHINES,
      utility: [],
    },
  },
};

/**
 * Get plant configuration by ID
 */
export function getPlantConfig(plantId: PlantId): PlantConfig {
  return PLANT_CONFIGS[plantId];
}

/**
 * Get all plants
 */
export function getAllPlants(): PlantConfig[] {
  return Object.values(PLANT_CONFIGS);
}

/**
 * Get all production machines for a plant
 */
export function getPlantMachines(plantId: PlantId): Machine[] {
  const config = PLANT_CONFIGS[plantId];
  return [...config.machines.production, ...config.machines.utility];
}

/**
 * Get a specific machine
 */
export function getMachine(
  plantId: PlantId,
  machineId: string
): Machine | undefined {
  const config = PLANT_CONFIGS[plantId];
  const all = [...config.machines.production, ...config.machines.utility];
  return all.find((m) => m.id === machineId);
}
