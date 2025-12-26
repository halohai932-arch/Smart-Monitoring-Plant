/**
 * Dashboard Types - Comprehensive type definitions for all dashboard features
 */

// ==================== Plant Types ====================
export type PlantId = "CIKOKOL" | "SEMARANG" | "CIKUPA" | "AGRO";

export interface PlantInfo {
  id: PlantId;
  name: string;
  code: number;
  location: string;
  capacity: number; // kVA
  machines: number;
  lvmdps: number;
}

// ==================== LVMDP Types ====================
export interface LvmdpData {
  id: number;
  plantId: PlantId;
  powerKw: number;
  apparentPowerKva: number;
  reactivePowerKvar: number;
  cosPhi: number;
  voltage: number;
  current: number;
  frequency: number;
  accumulatedEnergy: number;
  timestamp: string;
}

export interface LvmdpSummary {
  lvmdpId: number;
  utilization: number; // percentage
  powerKw: number;
  apparentPowerKva: number;
  status: "normal" | "warning" | "critical";
}

// ==================== Electrical Dashboard ====================
export interface ElectricalDashboardData {
  plantId: PlantId;
  totalCapacity: number; // kVA
  currentUtilization: number; // %
  totalPower: number; // kW
  totalApparentPower: number; // kVA
  lvmdps: LvmdpSummary[];
  lastUpdate: string;
}

// ==================== Machine Types ====================
export interface MachineInfo {
  id: string;
  name: string;
  plantId: PlantId;
  type: "production" | "utility";
}

export interface MachineData {
  machineId: string;
  plantId: PlantId;
  powerUsage: number; // kW
  energyConsumption: number; // kWh
  uptime: number; // %
  status: "running" | "idle" | "stopped" | "error";
  lastUpdate: string;
}

// ==================== Shift Types ====================
export interface ShiftData {
  shiftNumber: 1 | 2 | 3;
  status: "active" | "completed" | "upcoming";
  startTime: string;
  endTime: string;
  production: number;
  efficiency: number;
}

// ==================== Utilities Types ====================
export type UtilityType =
  | "electricity"
  | "steam"
  | "water"
  | "compressed_air"
  | "nitrogen"
  | "gas";

export interface UtilityData {
  id: string;
  plantId: PlantId;
  type: UtilityType;
  consumption: number;
  unit: string;
  cost: number;
  efficiency: number;
  status: "normal" | "warning" | "critical";
  lastUpdate: string;
}

export interface UtilitySummary {
  type: UtilityType;
  totalConsumption: number;
  totalCost: number;
  averageEfficiency: number;
}

// ==================== Alarm Types ====================
export interface Alarm {
  id: string;
  plantId: PlantId;
  severity: "info" | "warning" | "critical";
  message: string;
  source: string;
  timestamp: string;
  resolved: boolean;
}

// ==================== Corporate Overview ====================
export interface CorporateOverview {
  totalPower: number; // kW across all plants
  totalCapacity: number; // kVA
  utilizationRate: number; // %
  activeAlarms: number;
  plants: PlantSummary[];
  lastUpdate: string;
}

export interface PlantSummary {
  plantId: PlantId;
  plantName: string;
  power: number; // kW
  capacity: number; // kVA
  utilization: number; // %
  machines: number;
  alarms: number;
}

// ==================== Production Dashboard ====================
export interface ProductionMetrics {
  machineId: string;
  plantId: PlantId;
  production: number;
  efficiency: number;
  oee: number; // Overall Equipment Effectiveness
  uptime: number; // %
  status: "running" | "idle" | "stopped" | "error";
  lastHourProduction: number;
}

// ==================== Performance Types ====================
export interface PerformanceMetric {
  label: string;
  value: number;
  unit: string;
  target: number;
  status: "good" | "warning" | "critical";
}

// ==================== Real-time Socket Data ====================
export interface RealtimeUpdate {
  type: "lvmdp" | "machine" | "alarm" | "utility";
  plantId: PlantId;
  data: any;
  timestamp: string;
}
