<template>
  <div
    class="lvmdp-detail min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
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
        Back to Electrical Dashboard
      </button>
      <h1
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
      >
        LVMDP {{ lvmdpId }} - Detail
      </h1>
      <p class="text-gray-400">{{ plantName }} - Detailed Panel Information</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div
          class="inline-block w-12 h-12 rounded-full border-4 border-gray-600 border-t-yellow-400 animate-spin mb-4"
        ></div>
        <p class="text-gray-400">Loading LVMDP data...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-8">
      <!-- Key Metrics -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Real-Time Parameters
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Voltage -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Line-to-Line Voltage</div>
            <div class="text-3xl font-bold text-blue-400 mb-2">
              {{ Math.round(lvmdpData?.voltage || 0) }} V
            </div>
            <div class="text-xs text-gray-500">Phase Voltage</div>
          </div>

          <!-- Current -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Average Current</div>
            <div class="text-3xl font-bold text-cyan-400 mb-2">
              {{ Math.round(lvmdpData?.current || 0) }} A
            </div>
            <div class="text-xs text-gray-500">Phase Current</div>
          </div>

          <!-- Power Factor -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Power Factor (cos φ)</div>
            <div class="text-3xl font-bold text-green-400 mb-2">
              {{ (lvmdpData?.cosPhi || 0).toFixed(2) }}
            </div>
            <div class="text-xs text-gray-500">Efficiency Index</div>
          </div>

          <!-- Frequency -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Frequency</div>
            <div class="text-3xl font-bold text-purple-400 mb-2">
              {{ lvmdpData?.frequency || 0 }} Hz
            </div>
            <div class="text-xs text-gray-500">Grid Frequency</div>
          </div>
        </div>
      </section>

      <!-- Power Information -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Power Analysis</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Power Triangle -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Power Components
            </h3>
            <div class="space-y-4">
              <!-- Real Power -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-400">Real Power (kW)</span>
                  <span class="text-xl font-bold text-cyan-400"
                    >{{ Math.round(lvmdpData?.powerKw || 0) }} kW</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-3">
                  <div
                    class="bg-cyan-500 h-3 rounded-lg"
                    style="width: 45%"
                  ></div>
                </div>
              </div>

              <!-- Apparent Power -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-400">Apparent Power (kVA)</span>
                  <span class="text-xl font-bold text-blue-400"
                    >{{
                      Math.round(lvmdpData?.apparentPowerKva || 0)
                    }}
                    kVA</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-3">
                  <div
                    class="bg-blue-500 h-3 rounded-lg"
                    style="width: 55%"
                  ></div>
                </div>
              </div>

              <!-- Reactive Power -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-400">Reactive Power (kVAR)</span>
                  <span class="text-xl font-bold text-orange-400"
                    >{{
                      Math.round(lvmdpData?.reactivePowerKvar || 0)
                    }}
                    kVAR</span
                  >
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-3">
                  <div
                    class="bg-orange-500 h-3 rounded-lg"
                    style="width: 30%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Energy Metrics -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">Energy Metrics</h3>
            <div class="space-y-4">
              <!-- Accumulated Energy -->
              <div>
                <p class="text-sm text-gray-400 mb-1">Accumulated Energy</p>
                <p class="text-2xl font-bold text-green-400">
                  {{
                    ((lvmdpData?.accumulatedEnergy || 0) / 1000000).toFixed(2)
                  }}
                  MWh
                </p>
                <p class="text-xs text-gray-500 mt-1">Lifetime consumption</p>
              </div>

              <!-- Daily Estimate -->
              <div>
                <p class="text-sm text-gray-400 mb-1">Estimated Daily Energy</p>
                <p class="text-2xl font-bold text-cyan-400">
                  {{ Math.round((lvmdpData?.powerKw || 0) * 24) }} kWh
                </p>
                <p class="text-xs text-gray-500 mt-1">Based on current load</p>
              </div>

              <!-- Monthly Estimate -->
              <div>
                <p class="text-sm text-gray-400 mb-1">Estimated Monthly Cost</p>
                <p class="text-2xl font-bold text-orange-400">
                  IDR
                  {{
                    Math.round(
                      (lvmdpData?.powerKw || 0) * 24 * 30 * 1500
                    ).toLocaleString("id-ID")
                  }}
                </p>
                <p class="text-xs text-gray-500 mt-1">At IDR 1,500/kWh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Status & Alerts -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Status & Alerts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Panel Status -->
          <div
            class="bg-gradient-to-br from-green-900 to-green-800 border border-green-500 rounded-lg p-6"
          >
            <div class="flex items-center mb-3">
              <div
                class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"
              ></div>
              <h3 class="text-lg font-bold text-green-300">Panel Status</h3>
            </div>
            <p class="text-sm text-green-200">All systems operational</p>
            <p class="text-xs text-green-400 mt-2">
              Last sync: {{ formatTime(lvmdpData?.timestamp) }}
            </p>
          </div>

          <!-- Voltage Status -->
          <div
            class="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-500 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-blue-300 mb-3">Voltage Status</h3>
            <p class="text-sm text-blue-200">
              {{
                (lvmdpData?.voltage || 0) > 375 &&
                (lvmdpData?.voltage || 0) < 405
                  ? "Within normal range"
                  : "Check configuration"
              }}
            </p>
            <p class="text-xs text-blue-400 mt-2">Normal: 380V ±5%</p>
          </div>
        </div>
      </section>

      <!-- Last Update -->
      <div
        class="text-right text-sm text-gray-500 py-4 border-t border-gray-700"
      >
        Last update: {{ formatTime(lvmdpData?.timestamp) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { PlantId, LvmdpData } from "@/types/dashboard";
import { getLvmdpData } from "@/services/electricalService";
import { getPlantConfig } from "@/config/plantConfig";

const router = useRouter();
const route = useRoute();
const plantId = computed(() => (route.params.plantId as PlantId) || "CIKUPA");
const lvmdpId = computed(() => parseInt(route.params.lvmdpId as string) || 1);
const plantName = computed(() => getPlantConfig(plantId.value).name);

const lvmdpData = ref<LvmdpData | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    lvmdpData.value = await getLvmdpData(plantId.value, lvmdpId.value as any);
  } catch (err) {
    console.error("Error loading LVMDP data:", err);
  } finally {
    loading.value = false;
  }
});

function goBack() {
  router.push({
    name: "electrical",
    params: { plantId: plantId.value },
  });
}

function formatTime(isoString?: string): string {
  if (!isoString) return "Never";
  const date = new Date(isoString);
  return date.toLocaleTimeString("id-ID");
}
</script>

<style scoped>
.lvmdp-detail {
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
