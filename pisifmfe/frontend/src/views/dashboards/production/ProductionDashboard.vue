<template>
  <div
    class="production-dashboard min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
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
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
      >
        Production Dashboard
      </h1>
      <p class="text-gray-400">
        {{ plantName }} - Production Performance Overview
      </p>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Overall Performance KPIs -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Overall Performance
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Production -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Total Daily Production</div>
            <div class="text-3xl font-bold text-green-400 mb-2">
              12,450
              <span class="text-lg text-gray-400">units</span>
            </div>
            <div class="text-xs text-gray-500">vs Target: 12,000 units</div>
          </div>

          <!-- Overall OEE -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Overall OEE</div>
            <div class="text-3xl font-bold text-blue-400 mb-2">85.3%</div>
            <div class="text-xs text-gray-500">
              Availability · Performance · Quality
            </div>
          </div>

          <!-- Running Lines -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">
              Active Production Lines
            </div>
            <div class="text-3xl font-bold text-cyan-400 mb-2">
              {{ machines.length }}
            </div>
            <div class="text-xs text-gray-500">
              of {{ machines.length }} available
            </div>
          </div>

          <!-- Production Efficiency -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <div class="text-gray-400 text-sm mb-2">Average Efficiency</div>
            <div class="text-3xl font-bold text-orange-400 mb-2">88%</div>
            <div class="text-xs text-gray-500">Target: 90%</div>
          </div>
        </div>
      </section>

      <!-- Production Line Performance -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Production Line Performance
        </h2>
        <div class="space-y-4">
          <button
            v-for="(machine, index) in machines"
            :key="machine.id"
            @click="goToMachine(machine.id, machine.name)"
            class="w-full text-left group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <!-- Machine Name & Status -->
              <div class="md:col-span-1">
                <h3
                  class="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors"
                >
                  {{ machine.name }}
                </h3>
                <div class="flex items-center mt-2">
                  <div
                    class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"
                  ></div>
                  <p class="text-xs text-green-400">Running</p>
                </div>
              </div>

              <!-- Production -->
              <div>
                <p class="text-xs text-gray-500 mb-1">Daily Production</p>
                <p class="text-lg font-bold text-cyan-400">
                  {{ 800 + index * 150 }} units
                </p>
              </div>

              <!-- OEE Progress -->
              <div>
                <p class="text-xs text-gray-500 mb-1">OEE</p>
                <div class="flex items-center space-x-2">
                  <div class="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                      :style="{ width: 80 + Math.random() * 15 + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-bold text-green-400"
                    >{{ 80 + Math.round(Math.random() * 15) }}%</span
                  >
                </div>
              </div>

              <!-- Power Usage -->
              <div>
                <p class="text-xs text-gray-500 mb-1">Power Usage</p>
                <p class="text-lg font-bold text-yellow-400">
                  {{ (15 + Math.random() * 30) | 0 }} kW
                </p>
              </div>

              <!-- Arrow -->
              <div class="flex justify-end">
                <svg
                  class="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform"
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
      </section>

      <!-- Production Summary by Shift -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Shift Performance Summary
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Shift 1 (07:01-14:30)
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-400">Production</p>
                <p class="text-2xl font-bold text-cyan-400">4,250 units</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Efficiency</p>
                <p class="text-2xl font-bold text-green-400">88%</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Target Achievement</p>
                <p class="text-2xl font-bold text-blue-400">106%</p>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Shift 2 (14:31-22:00)
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-400">Production</p>
                <p class="text-2xl font-bold text-cyan-400">4,680 units</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Efficiency</p>
                <p class="text-2xl font-bold text-green-400">89%</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Target Achievement</p>
                <p class="text-2xl font-bold text-blue-400">117%</p>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Shift 3 (22:01-07:00)
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-400">Production</p>
                <p class="text-2xl font-bold text-cyan-400">3,520 units</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Efficiency</p>
                <p class="text-2xl font-bold text-green-400">81%</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Target Achievement</p>
                <p class="text-2xl font-bold text-blue-400">88%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quality & Downtime -->
      <section>
        <h2 class="text-2xl font-bold text-gray-100 mb-4">
          Quality & Downtime Analysis
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Quality Metrics -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Quality Metrics
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Yield Rate</span>
                  <span class="text-sm font-bold text-green-400">98.5%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-2">
                  <div
                    class="bg-green-500 h-2 rounded-lg"
                    style="width: 98.5%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Defect Rate</span>
                  <span class="text-sm font-bold text-blue-400">1.5%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-lg"
                    style="width: 1.5%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Rework Rate</span>
                  <span class="text-sm font-bold text-cyan-400">0.3%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-2">
                  <div
                    class="bg-cyan-500 h-2 rounded-lg"
                    style="width: 0.3%"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Downtime Breakdown -->
          <div
            class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6"
          >
            <h3 class="text-lg font-bold text-gray-100 mb-4">
              Downtime Breakdown (Today)
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Planned Maintenance</span>
                  <span class="text-sm font-bold text-yellow-400">30 min</span>
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-2">
                  <div
                    class="bg-yellow-500 h-2 rounded-lg"
                    style="width: 50%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Unplanned Breakdown</span>
                  <span class="text-sm font-bold text-orange-400">15 min</span>
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-2">
                  <div
                    class="bg-orange-500 h-2 rounded-lg"
                    style="width: 25%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-400">Changeover</span>
                  <span class="text-sm font-bold text-blue-400">15 min</span>
                </div>
                <div class="w-full bg-gray-700 rounded-lg h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-lg"
                    style="width: 25%"
                  ></div>
                </div>
              </div>

              <p class="text-xs text-gray-500 mt-4">
                Total Downtime: 60 minutes (3% of operating time)
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
const plantName = computed(() => getPlantConfig(plantId.value).name);
const machines = computed(
  () => getPlantConfig(plantId.value).machines.production
);

function goBack() {
  router.push({
    name: "plantDashboard",
    params: { plantId: plantId.value },
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
.production-dashboard {
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
