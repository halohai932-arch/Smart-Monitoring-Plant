<template>
  <div
    class="plant-dashboard min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
  >
    <!-- Header with Back Button -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <button
          @click="goToGlobalDashboard"
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
          Back to Global Dashboard
        </button>
        <h1
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          {{ plantName }}
        </h1>
        <p class="text-gray-400">Plant Dashboard & Operations Summary</p>
      </div>
      <button
        @click="refreshData"
        class="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors"
      >
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div
          class="inline-block w-12 h-12 rounded-full border-4 border-gray-600 border-t-cyan-400 animate-spin mb-4"
        ></div>
        <p class="text-gray-400">Loading plant data...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-8">
      <!-- At A Glance KPIs -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">At A Glance</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Power Usage -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Current Power Usage</div>
            <div class="text-3xl font-bold text-cyan-400 mb-2">
              {{ Math.round(plantSummary?.power || 0) }}
              <span class="text-lg text-gray-400">kW</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500"
                >Capacity: {{ plantSummary?.capacity }} kVA</span
              >
              <span
                class="text-xs font-bold px-2 py-1 rounded"
                :class="
                  (plantSummary?.utilization || 0) >= 90
                    ? 'bg-red-900 text-red-300'
                    : (plantSummary?.utilization || 0) >= 75
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-green-900 text-green-300'
                "
              >
                {{ Math.round(plantSummary?.utilization || 0) }}%
              </span>
            </div>
          </div>

          <!-- Production Lines -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Production Lines</div>
            <div class="text-3xl font-bold text-blue-400">
              {{ plantSummary?.machines || 0 }}
            </div>
            <p class="text-xs text-gray-500 mt-2">Available machines</p>
          </div>

          <!-- Active Shift -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Current Shift</div>
            <div class="text-3xl font-bold text-green-400">
              Shift {{ currentShift }}
            </div>
            <p class="text-xs text-gray-500 mt-2">{{ shiftTime }}</p>
          </div>

          <!-- Active Alarms -->
          <div
            class="border rounded-lg p-6 transition-colors"
            :class="
              (plantSummary?.alarms || 0) > 0
                ? 'bg-gradient-to-br from-red-900 to-red-800 border-red-500'
                : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
            "
          >
            <div class="text-gray-400 text-sm mb-2">Active Alarms</div>
            <div
              class="text-3xl font-bold"
              :class="
                (plantSummary?.alarms || 0) > 0
                  ? 'text-red-400'
                  : 'text-green-400'
              "
            >
              {{ plantSummary?.alarms || 0 }}
            </div>
            <p class="text-xs text-gray-500 mt-2">Attention required</p>
          </div>
        </div>
      </section>

      <!-- Utility Consumption -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Utility Consumption
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            @click="goToUtility('electricity')"
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-yellow-400 transition-all hover:shadow-lg hover:shadow-yellow-500/20"
          >
            <div class="flex items-center mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-3"
              >
                <svg
                  class="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.343 15.657a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM5.343 5.343a1 1 0 01 1.414-1.414l.707.707a1 1 0 01-1.414 1.414l-.707-.707z"
                  ></path>
                </svg>
              </div>
              <h3
                class="text-lg font-bold text-gray-100 group-hover:text-yellow-400 transition-colors"
              >
                Electricity
              </h3>
            </div>
            <p class="text-2xl font-bold text-yellow-400 mb-2">2,450 kWh</p>
            <p class="text-sm text-gray-500">Daily consumption</p>
          </button>

          <button
            @click="goToUtility('steam')"
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-500/20"
          >
            <div class="flex items-center mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mr-3"
              >
                <svg
                  class="w-6 h-6 text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 2a.5.5 0 00-.5.5v15a.5.5 0 001 0v-.836l.293.292a.5.5 0 101.414-1.414L4.5 14.086v-3.672l.707.707a.5.5 0 101.414-1.414l-2-2a.5.5 0 00-.707 0l-2 2a.5.5 0 101.414 1.414l.707-.707v3.672l.707.707a.5.5 0 101.414-1.414l-.293-.292v.836a.5.5 0 11-1 0v-15a.5.5 0 00-.5-.5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3
                class="text-lg font-bold text-gray-100 group-hover:text-orange-400 transition-colors"
              >
                Steam
              </h3>
            </div>
            <p class="text-2xl font-bold text-orange-400 mb-2">156 ton</p>
            <p class="text-sm text-gray-500">Daily consumption</p>
          </button>

          <button
            @click="goToUtility('water')"
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-400 transition-all hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div class="flex items-center mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3"
              >
                <svg
                  class="w-6 h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 11-2 0 1 1 0 012 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3
                class="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors"
              >
                Water
              </h3>
            </div>
            <p class="text-2xl font-bold text-blue-400 mb-2">425 m³</p>
            <p class="text-sm text-gray-500">Daily consumption</p>
          </button>
        </div>
      </section>

      <!-- Shift Performance -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Shift Performance</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="shift in [1, 2, 3]"
            :key="shift"
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-bold text-gray-100">Shift {{ shift }}</h3>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="
                  shift === currentShift
                    ? 'bg-green-900 text-green-300'
                    : shift < currentShift
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-blue-900 text-blue-300'
                "
              >
                {{
                  shift === currentShift
                    ? "Active"
                    : shift < currentShift
                    ? "Completed"
                    : "Upcoming"
                }}
              </span>
            </div>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-400 mb-1">Production Target</p>
                <p class="text-xl font-bold text-cyan-400">
                  {{ 450 + shift * 50 }} units
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-400 mb-1">Efficiency</p>
                <div class="flex items-center">
                  <p class="text-lg font-bold text-green-400 mr-2">
                    {{ (85 + Math.random() * 10) | 0 }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Production Lines -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Production Lines</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            v-for="machine in machines"
            :key="machine.id"
            @click="goToMachine(machine.id, machine.name)"
            class="text-left group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:translate-y-[-2px]"
          >
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors"
                >
                  {{ machine.name }}
                </h3>
                <p class="text-xs text-gray-500">{{ machine.category }}</p>
              </div>
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="
                  Math.random() > 0.3
                    ? 'bg-green-900/30 border border-green-500'
                    : 'bg-gray-700 border border-gray-600'
                "
              >
                <div
                  class="w-2 h-2 rounded-full"
                  :class="Math.random() > 0.3 ? 'bg-green-400' : 'bg-gray-500'"
                ></div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500">Output</span>
                <span class="text-cyan-400 font-semibold"
                  >{{ (Math.random() * 100 + 200) | 0 }} units/hr</span
                >
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500">Power</span>
                <span class="text-blue-400 font-semibold"
                  >{{ (Math.random() * 50 + 20) | 0 }} kW</span
                >
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500">Efficiency</span>
                <span class="text-green-400 font-semibold"
                  >{{ (Math.random() * 20 + 75) | 0 }}%</span
                >
              </div>
            </div>

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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { PlantId, PlantSummary } from "@/types/dashboard";
import { getPlantSummary } from "@/services/dataService";
import { getPlantConfig } from "@/config/plantConfig";

const router = useRouter();
const route = useRoute();
const plantId = computed(() => (route.params.plantId as PlantId) || "CIKUPA");
const plantName = computed(() => getPlantConfig(plantId.value).name);
const machines = computed(() => {
  const config = getPlantConfig(plantId.value);
  return config.machines.production;
});

const plantSummary = ref<PlantSummary | null>(null);
const loading = ref(true);
const currentShift = ref(1);
const shiftTime = ref("");

onMounted(async () => {
  await refreshData();
  updateShiftInfo();
  setInterval(updateShiftInfo, 60000);
});

async function refreshData() {
  try {
    loading.value = true;
    plantSummary.value = await getPlantSummary(plantId.value);
  } catch (err) {
    console.error("Error loading plant data:", err);
  } finally {
    loading.value = false;
  }
}

function updateShiftInfo() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const shift1Start = 7 * 60 + 1;
  const shift1End = 14 * 60 + 30;
  const shift2Start = 14 * 60 + 31;
  const shift2End = 22 * 60;

  if (totalMinutes >= shift1Start && totalMinutes <= shift1End) {
    currentShift.value = 1;
    shiftTime.value = "07:01 - 14:30";
  } else if (totalMinutes >= shift2Start && totalMinutes <= shift2End) {
    currentShift.value = 2;
    shiftTime.value = "14:31 - 22:00";
  } else {
    currentShift.value = 3;
    shiftTime.value = "22:01 - 07:00";
  }
}

function goToGlobalDashboard() {
  router.push({ name: "globalDashboard" });
}

function goToUtility(utilityType: string) {
  router.push({
    name: "utilities",
    params: { plantId: plantId.value },
    query: { utility: utilityType },
  });
}

function goToMachine(machineId: string, machineName: string) {
  router.push({
    name: "machineDetail",
    params: { plantId: plantId.value, machineId },
  });
}
</script>

<style scoped>
.plant-dashboard {
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
