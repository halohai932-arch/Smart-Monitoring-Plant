<template>
  <div
    class="utility-detail min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
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
        Back to Utilities
      </button>
      <h1
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500"
      >
        {{ utilityName }} Details
      </h1>
      <p class="text-gray-400">
        {{ plantName }} - {{ utilityName }} Consumption Analysis
      </p>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Overview -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Current Status</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Current Usage -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Current Usage</div>
            <div class="text-3xl font-bold text-cyan-400 mb-2">
              {{ getCurrentUsage() }}
            </div>
            <div class="text-xs text-gray-500">Real-time consumption</div>
          </div>

          <!-- Daily Average -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Daily Average</div>
            <div class="text-3xl font-bold text-blue-400 mb-2">
              {{ getDailyAverage() }}
            </div>
            <div class="text-xs text-gray-500">7-day rolling average</div>
          </div>

          <!-- Daily Cost -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Daily Cost</div>
            <div class="text-3xl font-bold text-green-400 mb-2">
              {{ getDailyCost() }}
            </div>
            <div class="text-xs text-gray-500">Based on current rate</div>
          </div>
        </div>
      </section>

      <!-- Consumption Trends -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Consumption Trends
        </h2>
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Hourly Breakdown -->
            <div>
              <h3 class="text-lg font-bold text-gray-100 mb-4">
                Hourly Breakdown (Today)
              </h3>
              <div class="space-y-2">
                <div
                  v-for="hour in 8"
                  :key="hour"
                  class="flex items-center space-x-3"
                >
                  <div class="w-12 text-sm text-gray-500">
                    {{ (hour + 6) % 24 }}:00
                  </div>
                  <div
                    class="flex-1 bg-gray-700 rounded-lg h-8 overflow-hidden"
                  >
                    <div
                      class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      :style="{ width: 50 + Math.random() * 40 + '%' }"
                    ></div>
                  </div>
                  <div
                    class="w-16 text-right text-sm text-cyan-400 font-semibold"
                  >
                    {{ (Math.random() * 100 + 50) | 0 }} {{ getUnit() }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Weekly Comparison -->
            <div>
              <h3 class="text-lg font-bold text-gray-100 mb-4">
                Weekly Comparison
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(day, index) in [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun',
                  ]"
                  :key="day"
                  class="flex items-center space-x-3"
                >
                  <div class="w-12 text-sm text-gray-500">{{ day }}</div>
                  <div
                    class="flex-1 bg-gray-700 rounded-lg h-8 overflow-hidden"
                  >
                    <div
                      class="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all"
                      :style="{ width: 40 + Math.random() * 50 + '%' }"
                    ></div>
                  </div>
                  <div
                    class="w-24 text-right text-sm text-violet-400 font-semibold"
                  >
                    {{ (Math.random() * 200 + 350) | 0 }} {{ getUnit() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Efficiency Metrics -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Efficiency Metrics
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Target vs Actual -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Target vs Actual
            </h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-400 mb-2">This Month Target</p>
                <p class="text-2xl font-bold text-blue-400">
                  8,200 {{ getUnit() }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-2">Current Consumption</p>
                <p class="text-2xl font-bold text-cyan-400">
                  7,850 {{ getUnit() }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-2">Achievement Rate</p>
                <p class="text-2xl font-bold text-green-400">95.7%</p>
              </div>
            </div>
          </div>

          <!-- Efficiency Score -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Efficiency Score
            </h3>
            <div class="flex items-center justify-center py-4">
              <div class="relative w-32 h-32">
                <svg
                  class="w-full h-full transform -rotate-90"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#374151"
                    stroke-width="15"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#06b6d4"
                    stroke-width="15"
                    stroke-dasharray="565"
                    stroke-dashoffset="85"
                    stroke-linecap="round"
                  />
                </svg>
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div class="text-3xl font-bold text-cyan-400">92%</div>
                  <div class="text-xs text-gray-400">Efficiency</div>
                </div>
              </div>
            </div>
            <p class="text-center text-sm text-gray-400 mt-4">
              Target: 95% | Status: On Track
            </p>
          </div>
        </div>
      </section>

      <!-- Cost Analysis -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Cost Analysis</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <p class="text-sm text-gray-400 mb-2">Daily Cost</p>
            <p class="text-2xl font-bold text-green-400">
              {{ getDailyCost() }}
            </p>
            <p class="text-xs text-gray-500 mt-2">Estimated</p>
          </div>

          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <p class="text-sm text-gray-400 mb-2">Monthly Estimate</p>
            <p class="text-2xl font-bold text-blue-400">
              {{ getMonthlyEstimate() }}
            </p>
            <p class="text-xs text-gray-500 mt-2">30 days calculation</p>
          </div>

          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <p class="text-sm text-gray-400 mb-2">Yearly Budget</p>
            <p class="text-2xl font-bold text-orange-400">
              {{ getYearlyEstimate() }}
            </p>
            <p class="text-xs text-gray-500 mt-2">Projected annually</p>
          </div>
        </div>
      </section>

      <!-- Improvement Recommendations -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Improvement Recommendations
        </h2>
        <div class="space-y-3">
          <div
            class="bg-blue-900/20 border border-blue-500 rounded-lg p-4 flex items-start"
          >
            <svg
              class="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <p class="font-semibold text-blue-300">
                Optimize Peak Hour Usage
              </p>
              <p class="text-sm text-blue-200 mt-1">
                Consider shifting some operations to off-peak hours to reduce
                consumption by ~5%
              </p>
            </div>
          </div>

          <div
            class="bg-cyan-900/20 border border-cyan-500 rounded-lg p-4 flex items-start"
          >
            <svg
              class="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <p class="font-semibold text-cyan-300">
                Maintenance Schedule Review
              </p>
              <p class="text-sm text-cyan-200 mt-1">
                Regular maintenance can improve efficiency by ensuring optimal
                system performance
              </p>
            </div>
          </div>

          <div
            class="bg-green-900/20 border border-green-500 rounded-lg p-4 flex items-start"
          >
            <svg
              class="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <p class="font-semibold text-green-300">
                Equipment Upgrade Assessment
              </p>
              <p class="text-sm text-green-200 mt-1">
                Evaluate modern equipment alternatives that could reduce
                consumption by 10-15%
              </p>
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
import type { PlantId } from "@/types/dashboard";
import { getPlantConfig } from "@/config/plantConfig";

const router = useRouter();
const route = useRoute();
const plantId = computed(() => (route.params.plantId as PlantId) || "CIKUPA");
const utilityType = computed(
  () => (route.params.utilityType as string) || "electricity"
);
const plantName = computed(() => getPlantConfig(plantId.value).name);

const utilityData: Record<
  string,
  { name: string; unit: string; current: string; daily: string; cost: string }
> = {
  electricity: {
    name: "Electricity",
    unit: "kWh",
    current: "2,450 kWh",
    daily: "2,450 kWh",
    cost: "IDR 3.68M",
  },
  steam: {
    name: "Steam",
    unit: "ton",
    current: "156 ton",
    daily: "156 ton",
    cost: "IDR 1.56M",
  },
  water: {
    name: "Water",
    unit: "m³",
    current: "425 m³",
    daily: "425 m³",
    cost: "IDR 1.28M",
  },
  compressed_air: {
    name: "Compressed Air",
    unit: "m³",
    current: "850 m³",
    daily: "850 m³",
    cost: "IDR 680K",
  },
  nitrogen: {
    name: "Nitrogen",
    unit: "m³",
    current: "320 m³",
    daily: "320 m³",
    cost: "IDR 480K",
  },
  gas: {
    name: "Gas",
    unit: "kg",
    current: "580 kg",
    daily: "580 kg",
    cost: "IDR 1.16M",
  },
};

const utilityName = computed(
  () => utilityData[utilityType.value]?.name || "Utility"
);

function goBack() {
  router.push({
    name: "utilities",
    params: { plantId: plantId.value },
  });
}

function getCurrentUsage(): string {
  return utilityData[utilityType.value]?.current || "";
}

function getDailyAverage(): string {
  return utilityData[utilityType.value]?.daily || "";
}

function getDailyCost(): string {
  return utilityData[utilityType.value]?.cost || "";
}

function getUnit(): string {
  return utilityData[utilityType.value]?.unit || "";
}

function getMonthlyEstimate(): string {
  const daily = getDailyCost();
  const costMap: Record<string, string> = {
    "IDR 3.68M": "IDR 110.4M",
    "IDR 1.56M": "IDR 46.8M",
    "IDR 1.28M": "IDR 38.4M",
    "IDR 680K": "IDR 20.4M",
    "IDR 480K": "IDR 14.4M",
    "IDR 1.16M": "IDR 34.8M",
  };
  return costMap[daily] || daily;
}

function getYearlyEstimate(): string {
  const monthly = getMonthlyEstimate();
  const yearlyMap: Record<string, string> = {
    "IDR 110.4M": "IDR 1.32B",
    "IDR 46.8M": "IDR 561.6M",
    "IDR 38.4M": "IDR 460.8M",
    "IDR 20.4M": "IDR 244.8M",
    "IDR 14.4M": "IDR 172.8M",
    "IDR 34.8M": "IDR 417.6M",
  };
  return yearlyMap[monthly] || monthly;
}
</script>

<style scoped>
.utility-detail {
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
