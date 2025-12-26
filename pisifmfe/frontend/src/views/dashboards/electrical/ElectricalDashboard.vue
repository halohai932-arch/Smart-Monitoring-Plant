<template>
  <div
    class="electrical-dashboard min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
  >
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <button
          @click="goToPlant"
          class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to {{ plantName }}
        </button>
        <h1
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          Electrical Dashboard
        </h1>
        <p class="text-gray-400">{{ plantName }} - LVMDP Overview</p>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="!lvmdp1.isConnected"
      class="flex items-center justify-center h-96"
    >
      <div class="text-center">
        <div
          class="inline-block w-12 h-12 rounded-full border-4 border-gray-600 border-t-yellow-400 animate-spin mb-4"
        ></div>
        <p class="text-gray-400">Connecting to LVMDP panels...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-8">
      <!-- Plant Capacity Utilization -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Plant Capacity Utilization
        </h2>
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-8"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Visualization -->
            <div class="flex items-center justify-center">
              <div class="relative w-48 h-48">
                <!-- Outer circle -->
                <svg
                  class="w-full h-full transform -rotate-90"
                  viewBox="0 0 200 200"
                >
                  <!-- Background circle -->
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#374151"
                    stroke-width="20"
                  />
                  <!-- Progress circle -->
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    :stroke="getUtilizationColor(totalUtilization)"
                    stroke-width="20"
                    stroke-dasharray="565"
                    :stroke-dashoffset="565 - (565 * totalUtilization) / 100"
                    stroke-linecap="round"
                    class="transition-all duration-500"
                  />
                </svg>
                <!-- Center text -->
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div
                    class="text-4xl font-bold"
                    :class="getUtilizationColorClass(totalUtilization)"
                  >
                    {{ Math.round(totalUtilization) }}%
                  </div>
                  <div class="text-xs text-gray-400 mt-1">Utilization</div>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="space-y-4">
              <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <p class="text-gray-400 text-sm mb-1">Total Capacity</p>
                <p class="text-2xl font-bold text-blue-400">5540 kVA</p>
              </div>

              <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <p class="text-gray-400 text-sm mb-1">Current Output</p>
                <p class="text-2xl font-bold text-cyan-400">
                  {{
                    Math.round(
                      lvmdpPanels.reduce(
                        (sum, p) => sum + p.apparentPowerKva,
                        0
                      )
                    )
                  }}
                  kVA
                </p>
              </div>

              <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <p class="text-gray-400 text-sm mb-1">Real Power</p>
                <p class="text-2xl font-bold text-green-400">
                  {{
                    Math.round(
                      lvmdpPanels.reduce((sum, p) => sum + p.powerKw, 0)
                    )
                  }}
                  kW
                </p>
              </div>

              <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <p class="text-gray-400 text-sm mb-1">Available Capacity</p>
                <p class="text-2xl font-bold text-green-400">
                  {{
                    Math.round(
                      5540 -
                        lvmdpPanels.reduce(
                          (sum, p) => sum + p.apparentPowerKva,
                          0
                        )
                    )
                  }}
                  kVA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LVMDP Summary Cards -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">LVMDP Panels</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            v-for="lvmdp in lvmdpPanels"
            :key="lvmdp.id"
            @click="goToLvmdpDetail(lvmdp.id)"
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:translate-y-[-2px]"
          >
            <!-- Header -->
            <div class="mb-4">
              <h3
                class="text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors"
              >
                LVMDP {{ lvmdp.id }}
              </h3>
              <p class="text-xs text-gray-500">Panel {{ lvmdp.id }} of 4</p>
            </div>

            <!-- Status Badge -->
            <div class="mb-4">
              <span
                class="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-green-900/30 text-green-300 border border-green-500':
                    lvmdp.status === 'normal',
                  'bg-yellow-900/30 text-yellow-300 border border-yellow-500':
                    lvmdp.status === 'warning',
                  'bg-red-900/30 text-red-300 border border-red-500':
                    lvmdp.status === 'critical',
                }"
              >
                {{ lvmdp.status.toUpperCase() }}
              </span>
            </div>

            <!-- Power Info -->
            <div class="space-y-3">
              <!-- Utilization -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Utilization</span>
                  <span
                    class="text-sm font-bold"
                    :class="getUtilizationColorClass(lvmdp.utilization)"
                  >
                    {{ Math.round(lvmdp.utilization) }}%
                  </span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div
                    class="h-2 rounded-full transition-all"
                    :class="
                      lvmdp.utilization >= 90
                        ? 'bg-red-500'
                        : lvmdp.utilization >= 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    "
                    :style="{ width: lvmdp.utilization + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Power -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <p class="text-xs text-gray-500">Real Power</p>
                  <p class="text-lg font-bold text-cyan-400">
                    {{ Math.round(lvmdp.powerKw) }} kW
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Apparent Power</p>
                  <p class="text-lg font-bold text-blue-400">
                    {{ Math.round(lvmdp.apparentPowerKva) }} kVA
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Arrow -->
            <div
              class="mt-4 flex items-center text-cyan-400 text-xs font-semibold"
            >
              View Details
              <svg
                class="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </section>

      <!-- Load Distribution -->
      <section v-if="lvmdpPanels.length">
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Load Distribution</h2>
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
        >
          <div class="space-y-4">
            <div
              v-for="lvmdp in lvmdpPanels"
              :key="lvmdp.id"
              class="flex items-end space-x-4"
            >
              <!-- Bar -->
              <div class="flex-1">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-semibold text-gray-300"
                    >LVMDP {{ lvmdp.id }}</span
                  >
                  <span class="text-sm text-gray-500"
                    >{{ Math.round(lvmdp.utilization) }}%</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-8 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    :style="{ width: lvmdp.utilization + '%' }"
                  ></div>
                </div>
              </div>
              <div class="text-right whitespace-nowrap">
                <p class="text-sm font-bold text-cyan-400">
                  {{ Math.round(lvmdp.apparentPowerKva) }} kVA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { PlantId } from "@/types/dashboard";
import { getPlantConfig } from "@/config/plantConfig";
import { useLvmdpLive } from "@/composables/useLvmdpLive";

const router = useRouter();
const route = useRoute();
const plantId = computed(() => (route.params.plantId as PlantId) || "CIKUPA");
const plantName = computed(() => getPlantConfig(plantId.value).name);

// Real-time LVMDP data for all 4 panels
const lvmdp1 = useLvmdpLive(1);
const lvmdp2 = useLvmdpLive(2);
const lvmdp3 = useLvmdpLive(3);
const lvmdp4 = useLvmdpLive(4);

// Get all LVMDP data in array
const lvmdpPanels = computed(() => [
  {
    id: 1,
    utilization: lvmdp1.apparentPower.value
      ? (lvmdp1.apparentPower.value / 1385) * 100
      : 0,
    powerKw: lvmdp1.power.value ?? 0,
    apparentPowerKva: lvmdp1.apparentPower.value ?? 0,
    status: getLvmdpStatus(lvmdp1.apparentPower.value ?? 0),
  },
  {
    id: 2,
    utilization: lvmdp2.apparentPower.value
      ? (lvmdp2.apparentPower.value / 1385) * 100
      : 0,
    powerKw: lvmdp2.power.value ?? 0,
    apparentPowerKva: lvmdp2.apparentPower.value ?? 0,
    status: getLvmdpStatus(lvmdp2.apparentPower.value ?? 0),
  },
  {
    id: 3,
    utilization: lvmdp3.apparentPower.value
      ? (lvmdp3.apparentPower.value / 1385) * 100
      : 0,
    powerKw: lvmdp3.power.value ?? 0,
    apparentPowerKva: lvmdp3.apparentPower.value ?? 0,
    status: getLvmdpStatus(lvmdp3.apparentPower.value ?? 0),
  },
  {
    id: 4,
    utilization: lvmdp4.apparentPower.value
      ? (lvmdp4.apparentPower.value / 1385) * 100
      : 0,
    powerKw: lvmdp4.power.value ?? 0,
    apparentPowerKva: lvmdp4.apparentPower.value ?? 0,
    status: getLvmdpStatus(lvmdp4.apparentPower.value ?? 0),
  },
]);

// Overall utilization
const totalUtilization = computed(() => {
  const total = lvmdpPanels.value.reduce((sum, p) => sum + p.powerKw, 0);
  return (total / 5540) * 100;
});

function getLvmdpStatus(kva: number): "normal" | "warning" | "critical" {
  const utilization = (kva / 1385) * 100;
  if (utilization >= 90) return "critical";
  if (utilization >= 75) return "warning";
  return "normal";
}

function goToPlant() {
  router.push({ name: "plantDashboard", params: { plantId: plantId.value } });
}

function goToLvmdpDetail(lvmdpId: number) {
  router.push({
    name: "lvmdpDetail",
    params: { plantId: plantId.value, lvmdpId },
  });
}

function getUtilizationColor(utilization: number): string {
  if (utilization >= 90) return "#ef4444"; // red
  if (utilization >= 75) return "#eab308"; // yellow
  return "#22c55e"; // green
}

function getUtilizationColorClass(utilization: number): string {
  if (utilization >= 90) return "text-red-400";
  if (utilization >= 75) return "text-yellow-400";
  return "text-green-400";
}
</script>

<style scoped>
.electrical-dashboard {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
