<template>
  <div
    class="global-dashboard min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
  >
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <h1
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Global Dashboard
        </h1>
        <button
          @click="logout"
          class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
      <p class="text-gray-400">Corporate Overview - All Plants</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div
          class="inline-block w-12 h-12 rounded-full border-4 border-gray-600 border-t-cyan-400 animate-spin mb-4"
        ></div>
        <p class="text-gray-400">Loading corporate data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6"
    >
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Corporate KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Total Power -->
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
        >
          <div class="text-gray-400 text-sm mb-2">Total Power Output</div>
          <div class="text-3xl font-bold text-cyan-400 mb-2">
            {{ Math.round(corporateData?.totalPower || 0) }}
            <span class="text-lg text-gray-400">kW</span>
          </div>
          <div class="text-xs text-gray-500">Across all plants</div>
        </div>

        <!-- Total Capacity -->
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
        >
          <div class="text-gray-400 text-sm mb-2">Total Capacity</div>
          <div class="text-3xl font-bold text-blue-400 mb-2">
            {{ (corporateData?.totalCapacity || 0).toLocaleString() }}
            <span class="text-lg text-gray-400">kVA</span>
          </div>
          <div class="text-xs text-gray-500">Installed capacity</div>
        </div>

        <!-- Utilization -->
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
        >
          <div class="text-gray-400 text-sm mb-2">Overall Utilization</div>
          <div class="text-3xl font-bold text-green-400 mb-2">
            {{ Math.round(corporateData?.utilizationRate || 0) }}%
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2 mt-3">
            <div
              class="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all"
              :style="{
                width: Math.min(100, corporateData?.utilizationRate || 0) + '%',
              }"
            ></div>
          </div>
        </div>

        <!-- Active Alarms -->
        <div
          class="bg-gradient-to-br border rounded-lg p-6 transition-colors"
          :class="
            (corporateData?.activeAlarms || 0) > 0
              ? 'from-red-900 to-red-800 border-red-500 hover:border-red-400'
              : 'from-gray-800 to-gray-900 border-gray-700 hover:border-green-500'
          "
        >
          <div class="text-gray-400 text-sm mb-2">Active Alarms</div>
          <div
            class="text-3xl font-bold mb-2"
            :class="
              (corporateData?.activeAlarms || 0) > 0
                ? 'text-red-400'
                : 'text-green-400'
            "
          >
            {{ corporateData?.activeAlarms || 0 }}
          </div>
          <div class="text-xs text-gray-500">Requires attention</div>
        </div>
      </div>

      <!-- Plants Grid -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Plant Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            v-for="plant in corporateData?.plants || []"
            :key="plant.plantId"
            @click="selectPlant(plant.plantId)"
            class="text-left group"
          >
            <div
              class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-400 transition-all h-full hover:shadow-lg hover:shadow-cyan-500/20 hover:translate-y-[-2px]"
            >
              <!-- Plant Header -->
              <div class="mb-4">
                <h3
                  class="text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors"
                >
                  {{ plant.plantName }}
                </h3>
                <p class="text-sm text-gray-500">
                  Plant Code: {{ getPlantCode(plant.plantId) }}
                </p>
              </div>

              <!-- Power Info -->
              <div class="space-y-3">
                <!-- Power Utilization -->
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm text-gray-400">Power Utilization</span>
                    <span class="text-sm font-bold text-cyan-400"
                      >{{ Math.round(plant.utilization) }}%</span
                    >
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all"
                      :class="
                        plant.utilization >= 90
                          ? 'bg-red-500'
                          : plant.utilization >= 75
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      "
                      :style="{ width: plant.utilization + '%' }"
                    ></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ plant.power }} / {{ plant.capacity }} kVA
                  </div>
                </div>

                <!-- Machines -->
                <div>
                  <span class="text-sm text-gray-400">Production Lines</span>
                  <p class="text-xl font-bold text-blue-400 mt-1">
                    {{ plant.machines }}
                  </p>
                </div>

                <!-- Alarms -->
                <div>
                  <span class="text-sm text-gray-400">Active Alarms</span>
                  <p
                    class="text-xl font-bold"
                    :class="
                      plant.alarms > 0 ? 'text-red-400' : 'text-green-400'
                    "
                  >
                    {{ plant.alarms }}
                  </p>
                </div>
              </div>

              <!-- Action Arrow -->
              <div
                class="mt-4 flex items-center text-cyan-400 text-sm font-semibold"
              >
                View Details
                <svg
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
            </div>
          </button>
        </div>
      </div>

      <!-- Last Update -->
      <div
        class="text-right text-sm text-gray-500 py-4 border-t border-gray-700"
      >
        Last update: {{ formatTime(corporateData?.lastUpdate) }}
        <button
          @click="refreshData"
          class="ml-4 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import type { CorporateOverview, PlantId } from "@/types/dashboard";
import { getCorporateOverview } from "@/services/dataService";
import { getPlantConfig } from "@/config/plantConfig";

const router = useRouter();
const { logout: authLogout, userRole } = useAuth();

const corporateData = ref<CorporateOverview | null>(null);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  await refreshData();
});

async function refreshData() {
  try {
    loading.value = true;
    error.value = "";
    corporateData.value = await getCorporateOverview();
  } catch (err) {
    error.value = `Failed to load data: ${err}`;
    console.error("Error loading corporate data:", err);
  } finally {
    loading.value = false;
  }
}

function selectPlant(plantId: PlantId) {
  router.push({ name: "plantDashboard", params: { plantId } });
}

function getPlantCode(plantId: PlantId): string {
  return String(getPlantConfig(plantId).code);
}

function formatTime(isoString?: string): string {
  if (!isoString) return "Never";
  const date = new Date(isoString);
  return date.toLocaleTimeString("id-ID");
}

function logout() {
  authLogout();
  router.push({ name: "login" });
}
</script>

<style scoped>
.global-dashboard {
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
