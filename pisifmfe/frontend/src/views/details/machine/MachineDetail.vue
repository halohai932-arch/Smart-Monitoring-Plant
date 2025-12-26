<template>
  <div
    class="machine-detail min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
  >
    <!-- Header -->
    <div class="mb-8">
      <button
        @click="goBack"
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
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        {{ machineName }}
      </h1>
      <p class="text-gray-400">{{ plantName }} - Production Line Details</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div
          class="inline-block w-12 h-12 rounded-full border-4 border-gray-600 border-t-green-400 animate-spin mb-4"
        ></div>
        <p class="text-gray-400">Loading machine data...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-8">
      <!-- Key Performance Indicators -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Performance Metrics
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Status -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Status</div>
            <div class="flex items-center mb-2">
              <div
                class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"
              ></div>
              <span class="text-2xl font-bold text-green-400">Running</span>
            </div>
            <div class="text-xs text-gray-500">Production Active</div>
          </div>

          <!-- Production Rate -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Production Rate</div>
            <div class="text-3xl font-bold text-cyan-400 mb-2">
              {{ (Math.random() * 100 + 200) | 0 }}
              <span class="text-lg text-gray-400">units/h</span>
            </div>
            <div class="text-xs text-gray-500">Current throughput</div>
          </div>

          <!-- Power Consumption -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Power Consumption</div>
            <div class="text-3xl font-bold text-yellow-400 mb-2">
              {{ (Math.random() * 50 + 20) | 0 }}
              <span class="text-lg text-gray-400">kW</span>
            </div>
            <div class="text-xs text-gray-500">Real-time usage</div>
          </div>

          <!-- Efficiency -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Efficiency</div>
            <div class="text-3xl font-bold text-green-400 mb-2">
              {{ (Math.random() * 20 + 75) | 0 }}%
            </div>
            <div class="text-xs text-gray-500">Operating efficiency</div>
          </div>
        </div>
      </section>

      <!-- Production Details -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Production Details
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Shift Performance -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Shift Performance
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400"
                    >Shift 1 (07:01-14:30)</span
                  >
                  <span class="text-sm font-bold text-cyan-400"
                    >1,250 units</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-3">
                  <div
                    class="bg-cyan-500 h-3 rounded-lg"
                    style="width: 78%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400"
                    >Shift 2 (14:31-22:00)</span
                  >
                  <span class="text-sm font-bold text-blue-400"
                    >1,420 units</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-3">
                  <div
                    class="bg-blue-500 h-3 rounded-lg"
                    style="width: 88%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400"
                    >Shift 3 (22:01-07:00)</span
                  >
                  <span class="text-sm font-bold text-green-400"
                    >980 units</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-3">
                  <div
                    class="bg-green-500 h-3 rounded-lg"
                    style="width: 61%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Daily Statistics -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Daily Statistics
            </h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-400 mb-1">Total Daily Production</p>
                <p class="text-2xl font-bold text-cyan-400">3,650 units</p>
                <p class="text-xs text-gray-500 mt-1">Today's total output</p>
              </div>

              <div>
                <p class="text-sm text-gray-400 mb-1">Daily Target</p>
                <p class="text-2xl font-bold text-green-400">3,500 units</p>
                <p class="text-xs text-gray-500 mt-1">
                  Target achievement: 104%
                </p>
              </div>

              <div>
                <p class="text-sm text-gray-400 mb-1">Downtime</p>
                <p class="text-2xl font-bold text-orange-400">45 min</p>
                <p class="text-xs text-gray-500 mt-1">
                  Maintenance & changeover
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Energy Consumption -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Energy Consumption
        </h2>
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Today -->
            <div>
              <p class="text-sm text-gray-400 mb-2">Today</p>
              <p class="text-3xl font-bold text-cyan-400 mb-1">285 kWh</p>
              <p class="text-xs text-gray-500">9.5 kWh/h avg</p>
            </div>

            <!-- This Week -->
            <div>
              <p class="text-sm text-gray-400 mb-2">This Week</p>
              <p class="text-3xl font-bold text-blue-400 mb-1">1,995 kWh</p>
              <p class="text-xs text-gray-500">285 kWh/day avg</p>
            </div>

            <!-- This Month -->
            <div>
              <p class="text-sm text-gray-400 mb-2">This Month</p>
              <p class="text-3xl font-bold text-green-400 mb-1">8,550 kWh</p>
              <p class="text-xs text-gray-500">285 kWh/day avg</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Alarms & Maintenance -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Status & Maintenance
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Active Alarms -->
          <div
            class="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-500 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-blue-300 mb-3">
              Status Information
            </h3>
            <ul class="space-y-2">
              <li class="text-sm text-blue-200">
                ✓ Temperature: 45°C (Normal)
              </li>
              <li class="text-sm text-blue-200">
                ✓ Vibration: 2.1 mm/s (Normal)
              </li>
              <li class="text-sm text-blue-200">
                ✓ Pressure: 6.2 bar (Normal)
              </li>
              <li class="text-sm text-green-300 font-semibold">
                All systems healthy
              </li>
            </ul>
          </div>

          <!-- Maintenance Schedule -->
          <div
            class="bg-gradient-to-br from-purple-900 to-purple-800 border border-purple-500 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-purple-300 mb-3">
              Next Maintenance
            </h3>
            <p class="text-sm text-purple-200 mb-3">
              Scheduled maintenance: 12 days
            </p>
            <ul class="space-y-2 text-sm text-purple-200">
              <li>• Oil change: Day 8</li>
              <li>• Filter replacement: Day 12</li>
              <li>• Bearing inspection: Day 15</li>
            </ul>
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
import { getPlantConfig, getMachine } from "@/config/plantConfig";

const router = useRouter();
const route = useRoute();
const plantId = computed(() => (route.params.plantId as PlantId) || "CIKUPA");
const machineId = computed(() => (route.params.machineId as string) || "");
const plantName = computed(() => getPlantConfig(plantId.value).name);
const machineName = computed(() => {
  const machine = getMachine(plantId.value, machineId.value);
  return machine?.name || "Unknown Machine";
});

const loading = ref(false);

onMounted(() => {
  // Load machine data if needed
  loading.value = false;
});

function goBack() {
  router.push({
    name: "plantDashboard",
    params: { plantId: plantId.value },
  });
}
</script>

<style scoped>
.machine-detail {
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
