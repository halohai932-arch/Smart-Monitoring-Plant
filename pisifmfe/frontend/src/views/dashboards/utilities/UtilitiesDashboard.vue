<template>
  <div
    class="utilities-dashboard min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
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
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500"
      >
        Energy & Utilities
      </h1>
      <p class="text-gray-400">
        {{ plantName }} - Comprehensive Utility Management
      </p>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Utility Overview -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Utility Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Electricity -->
          <button
            @click="selectUtility('electricity')"
            :class="
              selectedUtility === 'electricity'
                ? 'border-yellow-400'
                : 'border-gray-700 hover:border-yellow-400'
            "
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-yellow-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.343 15.657a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM5.343 5.343a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-yellow-400 transition-colors"
                >
                  Electricity
                </h3>
                <p class="text-xs text-gray-500">Power consumption</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Daily</span>
                <span class="text-yellow-400 font-bold">2,450 kWh</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Cost</span>
                <span class="text-yellow-400 font-bold">IDR 3.68M</span>
              </div>
            </div>
          </button>

          <!-- Steam -->
          <button
            @click="selectUtility('steam')"
            :class="
              selectedUtility === 'steam'
                ? 'border-orange-400'
                : 'border-gray-700 hover:border-orange-400'
            "
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-orange-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-orange-400 transition-colors"
                >
                  Steam
                </h3>
                <p class="text-xs text-gray-500">Heat supply</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Daily</span>
                <span class="text-orange-400 font-bold">156 ton</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Cost</span>
                <span class="text-orange-400 font-bold">IDR 1.56M</span>
              </div>
            </div>
          </button>

          <!-- Water -->
          <button
            @click="selectUtility('water')"
            :class="
              selectedUtility === 'water'
                ? 'border-blue-400'
                : 'border-gray-700 hover:border-blue-400'
            "
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors"
                >
                  Water
                </h3>
                <p class="text-xs text-gray-500">Water supply</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Daily</span>
                <span class="text-blue-400 font-bold">425 m³</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Cost</span>
                <span class="text-blue-400 font-bold">IDR 1.28M</span>
              </div>
            </div>
          </button>

          <!-- Compressed Air -->
          <button
            @click="selectUtility('compressed_air')"
            :class="
              selectedUtility === 'compressed_air'
                ? 'border-cyan-400'
                : 'border-gray-700 hover:border-cyan-400'
            "
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors"
                >
                  Compressed Air
                </h3>
                <p class="text-xs text-gray-500">Pneumatic supply</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Daily</span>
                <span class="text-cyan-400 font-bold">850 m³</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Cost</span>
                <span class="text-cyan-400 font-bold">IDR 680K</span>
              </div>
            </div>
          </button>

          <!-- Nitrogen -->
          <button
            @click="selectUtility('nitrogen')"
            :class="
              selectedUtility === 'nitrogen'
                ? 'border-purple-400'
                : 'border-gray-700 hover:border-purple-400'
            "
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-purple-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm10 8a1 1 0 00-1 1v1h-1a2 2 0 00-2 2v2a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H18a1 1 0 001-1v-2a2 2 0 00-2-2h-1v-1a1 1 0 00-1-1h-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-purple-400 transition-colors"
                >
                  Nitrogen
                </h3>
                <p class="text-xs text-gray-500">Inert gas supply</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Daily</span>
                <span class="text-purple-400 font-bold">320 m³</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Cost</span>
                <span class="text-purple-400 font-bold">IDR 480K</span>
              </div>
            </div>
          </button>

          <!-- Gas -->
          <button
            @click="selectUtility('gas')"
            :class="
              selectedUtility === 'gas'
                ? 'border-red-400'
                : 'border-gray-700 hover:border-red-400'
            "
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-red-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M8.433 7.418c.155.03.299.076.438.114a.75.75 0 00.896-.72v-.906a.75.75 0 00-.896-.72 24.694 24.694 0 00-1.439-.45 2.068 2.068 0 00-.737 3.332 2.05 2.05 0 00.738-.332z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-red-400 transition-colors"
                >
                  Gas
                </h3>
                <p class="text-xs text-gray-500">Fuel/LPG supply</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Daily</span>
                <span class="text-red-400 font-bold">580 kg</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Cost</span>
                <span class="text-red-400 font-bold">IDR 1.16M</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      <!-- Detailed View for Selected Utility -->
      <section
        v-if="selectedUtility"
        class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-8"
      >
        <h2 class="text-2xl font-bold text-gray-100 mb-6">
          {{ getUtilityName(selectedUtility) }} - Detailed Analysis
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Consumption Trends -->
          <div>
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Consumption Trends
            </h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-400 mb-1">Daily Average (7 days)</p>
                <p class="text-2xl font-bold text-cyan-400">
                  {{ getUtilityValue(selectedUtility) }}
                </p>
                <p class="text-xs text-gray-500">Consistent utilization</p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-1">Peak Usage</p>
                <p class="text-2xl font-bold text-orange-400">
                  +15% above average
                </p>
                <p class="text-xs text-gray-500">
                  During peak production hours
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-1">Off-Peak Usage</p>
                <p class="text-2xl font-bold text-green-400">
                  -25% below average
                </p>
                <p class="text-xs text-gray-500">During idle hours</p>
              </div>
            </div>
          </div>

          <!-- Cost Analysis -->
          <div>
            <h3 class="text-lg font-bold text-gray-100 mb-4">Cost Analysis</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-400 mb-1">Daily Cost</p>
                <p class="text-2xl font-bold text-green-400">
                  {{ getUtilityCost(selectedUtility) }}
                </p>
                <p class="text-xs text-gray-500">
                  Based on current consumption
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-1">Monthly Estimate</p>
                <p class="text-2xl font-bold text-blue-400">
                  {{ getMonthlyEstimate(selectedUtility) }}
                </p>
                <p class="text-xs text-gray-500">30 days at current rate</p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-1">Efficiency Index</p>
                <p class="text-2xl font-bold text-yellow-400">92%</p>
                <p class="text-xs text-gray-500">vs plant target of 95%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { PlantId, UtilityType } from "@/types/dashboard";
import { getPlantConfig } from "@/config/plantConfig";

const router = useRouter();
const route = useRoute();
const plantId = computed(() => (route.params.plantId as PlantId) || "CIKUPA");
const plantName = computed(() => getPlantConfig(plantId.value).name);

const selectedUtility = ref<UtilityType | null>(
  (route.query.utility as UtilityType) || "electricity"
);

function selectUtility(utility: UtilityType) {
  selectedUtility.value = utility;
}

function goBack() {
  router.push({
    name: "plantDashboard",
    params: { plantId: plantId.value },
  });
}

function getUtilityName(utility: UtilityType): string {
  const names: Record<UtilityType, string> = {
    electricity: "Electricity",
    steam: "Steam",
    water: "Water",
    compressed_air: "Compressed Air",
    nitrogen: "Nitrogen",
    gas: "Gas",
  };
  return names[utility];
}

function getUtilityValue(utility: UtilityType): string {
  const values: Record<UtilityType, string> = {
    electricity: "2,450 kWh",
    steam: "156 ton",
    water: "425 m³",
    compressed_air: "850 m³",
    nitrogen: "320 m³",
    gas: "580 kg",
  };
  return values[utility];
}

function getUtilityCost(utility: UtilityType): string {
  const costs: Record<UtilityType, string> = {
    electricity: "IDR 3.68M",
    steam: "IDR 1.56M",
    water: "IDR 1.28M",
    compressed_air: "IDR 680K",
    nitrogen: "IDR 480K",
    gas: "IDR 1.16M",
  };
  return costs[utility];
}

function getMonthlyEstimate(utility: UtilityType): string {
  const estimates: Record<UtilityType, string> = {
    electricity: "IDR 110.4M",
    steam: "IDR 46.8M",
    water: "IDR 38.4M",
    compressed_air: "IDR 20.4M",
    nitrogen: "IDR 14.4M",
    gas: "IDR 34.8M",
  };
  return estimates[utility];
}
</script>

<style scoped>
.utilities-dashboard {
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
