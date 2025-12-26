<template>
  <div class="app-sidebar" :class="{ 'sidebar-open': isOpen }">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold text-lg"
        >
          Pi
        </div>
        <span class="logo-text">PISIFM</span>
      </div>
      <button @click="closeSidebar" class="close-btn lg:hidden">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Global Dashboard Link -->
    <div class="sidebar-section" v-if="!isPlantLevel">
      <button
        @click="goToGlobal"
        class="sidebar-item w-full"
        :class="{ 'sidebar-item-active': isGlobalActive }"
      >
        <svg
          class="sidebar-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4v4"
          ></path>
        </svg>
        <span>Global Dashboard</span>
      </button>
    </div>

    <!-- Plant Selection (at Global Level) -->
    <div v-if="!isPlantLevel" class="sidebar-section">
      <h3 class="sidebar-section-title">All Plants</h3>
      <button
        v-for="plant in plants"
        :key="plant.id"
        @click="selectPlant(plant.id)"
        class="sidebar-item"
        :class="{ 'sidebar-item-active': currentPlantId === plant.id }"
      >
        <svg
          class="sidebar-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m4-4h1m-1 4h1m-1-9h.01M9 16h.01"
          ></path>
        </svg>
        <span>{{ plant.name }}</span>
      </button>
    </div>

    <!-- Plant-Level Navigation -->
    <div v-if="isPlantLevel" class="sidebar-section">
      <!-- Back to Global -->
      <button @click="goToGlobal" class="back-button w-full">
        <svg
          class="sidebar-icon"
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
        <span>← Back to Global</span>
      </button>

      <!-- Plant Dashboard -->
      <button
        @click="goToPlantDashboard"
        class="sidebar-item"
        :class="{ 'sidebar-item-active': isPlantDashboardActive }"
      >
        <svg
          class="sidebar-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4v4"
          ></path>
        </svg>
        <span>{{ currentPlantName }}</span>
      </button>

      <!-- Energy and Utilities -->
      <div class="sidebar-menu-group">
        <button
          @click="toggleEnergyMenu"
          class="sidebar-item sidebar-menu-toggle"
          :class="{ 'sidebar-item-active': isEnergyExpanded }"
        >
          <svg
            class="sidebar-icon"
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
          <span>Energy & Utilities</span>
          <svg
            class="sidebar-chevron"
            :class="{ 'chevron-expanded': isEnergyExpanded }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </button>

        <!-- Energy Submenu -->
        <div v-if="isEnergyExpanded" class="sidebar-submenu">
          <!-- Electricity -->
          <div class="sidebar-menu-group">
            <button
              @click="toggleElectricityMenu"
              class="sidebar-item sidebar-submenu-item"
              :class="{ 'sidebar-item-active': isElectricityActive }"
            >
              <span class="submenu-bullet">⚡</span>
              <span>Electricity</span>
              <svg
                class="sidebar-chevron"
                :class="{ 'chevron-expanded': isElectricityExpanded }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </button>

            <div v-if="isElectricityExpanded" class="sidebar-submenu-2">
              <button
                @click="goToElectrical"
                class="sidebar-item sidebar-submenu-item-2"
                :class="{ 'sidebar-item-active': isElectricalActive }"
              >
                <span>Dashboard</span>
              </button>
              <button
                v-for="lvmdp in [1, 2, 3, 4]"
                :key="lvmdp"
                @click="goToLvmdp(lvmdp)"
                class="sidebar-item sidebar-submenu-item-2"
                :class="{ 'sidebar-item-active': isLvmdpActive(lvmdp) }"
              >
                <span>LVMDP {{ lvmdp }}</span>
              </button>
            </div>
          </div>

          <!-- Other Utilities -->
          <button
            @click="goToUtilities('steam')"
            class="sidebar-item sidebar-submenu-item"
            :class="{ 'sidebar-item-active': isUtilityActive('steam') }"
          >
            <span class="submenu-bullet">🔥</span>
            <span>Steam</span>
          </button>

          <button
            @click="goToUtilities('water')"
            class="sidebar-item sidebar-submenu-item"
            :class="{ 'sidebar-item-active': isUtilityActive('water') }"
          >
            <span class="submenu-bullet">💧</span>
            <span>Water</span>
          </button>

          <button
            @click="goToUtilities('compressed_air')"
            class="sidebar-item sidebar-submenu-item"
            :class="{
              'sidebar-item-active': isUtilityActive('compressed_air'),
            }"
          >
            <span class="submenu-bullet">💨</span>
            <span>Compressed Air</span>
          </button>

          <button
            @click="goToUtilities('nitrogen')"
            class="sidebar-item sidebar-submenu-item"
            :class="{ 'sidebar-item-active': isUtilityActive('nitrogen') }"
          >
            <span class="submenu-bullet">🔷</span>
            <span>Nitrogen</span>
          </button>

          <button
            @click="goToUtilities('gas')"
            class="sidebar-item sidebar-submenu-item"
            :class="{ 'sidebar-item-active': isUtilityActive('gas') }"
          >
            <span class="submenu-bullet">🚀</span>
            <span>Gas</span>
          </button>
        </div>
      </div>

      <!-- Production Lines -->
      <div class="sidebar-menu-group">
        <button
          @click="toggleProductionMenu"
          class="sidebar-item sidebar-menu-toggle"
          :class="{ 'sidebar-item-active': isProductionExpanded }"
        >
          <svg
            class="sidebar-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477A6 6 0 0015 12a6 6 0 00-.953-2.954m12.338 3.5a6 6 0 100-11.192.75.75 0 111.089.89c.36-.043.72-.062 1.083-.062a6 6 0 010 12z"
            ></path>
          </svg>
          <span>Production Lines</span>
          <svg
            class="sidebar-chevron"
            :class="{ 'chevron-expanded': isProductionExpanded }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </button>

        <!-- Production Submenu -->
        <div v-if="isProductionExpanded" class="sidebar-submenu">
          <button
            @click="goToProduction"
            class="sidebar-item sidebar-submenu-item"
            :class="{ 'sidebar-item-active': isProductionDashboardActive }"
          >
            <span>Dashboard</span>
          </button>
          <button
            v-for="machine in machines"
            :key="machine.id"
            @click="goToMachine(machine.id)"
            class="sidebar-item sidebar-submenu-item"
            :class="{ 'sidebar-item-active': isMachineActive(machine.id) }"
          >
            <span class="text-xs">{{ machine.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="sidebar-divider"></div>

    <!-- User Section -->
    <div class="sidebar-section sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">{{ getInitials }}</div>
        <div class="user-details">
          <p class="user-name">{{ username }}</p>
          <p class="user-role">{{ userRole }}</p>
        </div>
      </div>
      <button @click="handleLogout" class="sidebar-item logout-btn">
        <svg
          class="sidebar-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "@/stores/auth";
import { getAllPlants, getPlantConfig } from "@/config/plantConfig";
import type { PlantId } from "@/types/dashboard";

const router = useRouter();
const route = useRoute();
const { logout, username, userRole } = useAuth();

const isOpen = ref(true);
const isEnergyExpanded = ref(false);
const isElectricityExpanded = ref(false);
const isProductionExpanded = ref(false);

const plants = computed(() => getAllPlants());
const currentPlantId = computed(
  () => (route.params.plantId as PlantId) || null
);
const currentPlantName = computed(() => {
  if (!currentPlantId.value) return "";
  return getPlantConfig(currentPlantId.value).name;
});
const machines = computed(() => {
  if (!currentPlantId.value) return [];
  return getPlantConfig(currentPlantId.value).machines.production;
});

const isPlantLevel = computed(() => !!currentPlantId.value);
const isGlobalActive = computed(() => route.name === "globalDashboard");
const isPlantDashboardActive = computed(() => route.name === "plantDashboard");
const isElectricalActive = computed(() => route.name === "electrical");
const isProductionDashboardActive = computed(() => route.name === "production");

const getInitials = computed(() => {
  return (username.value || "U").substring(0, 1).toUpperCase();
});

function closeSidebar() {
  isOpen.value = false;
}

function goToGlobal() {
  router.push({ name: "globalDashboard" });
  isOpen.value = false;
}

function selectPlant(plantId: PlantId) {
  router.push({ name: "plantDashboard", params: { plantId } });
  isOpen.value = false;
}

function goToPlantDashboard() {
  if (currentPlantId.value) {
    router.push({
      name: "plantDashboard",
      params: { plantId: currentPlantId.value },
    });
  }
}

function toggleEnergyMenu() {
  isEnergyExpanded.value = !isEnergyExpanded.value;
}

function toggleElectricityMenu() {
  isElectricityExpanded.value = !isElectricityExpanded.value;
}

function toggleProductionMenu() {
  isProductionExpanded.value = !isProductionExpanded.value;
}

function goToElectrical() {
  if (currentPlantId.value) {
    router.push({
      name: "electrical",
      params: { plantId: currentPlantId.value },
    });
  }
}

function goToLvmdp(lvmdpId: number) {
  if (currentPlantId.value) {
    router.push({
      name: "lvmdpDetail",
      params: { plantId: currentPlantId.value, lvmdpId: String(lvmdpId) },
    });
  }
}

function goToUtilities(utility: string) {
  if (currentPlantId.value) {
    router.push({
      name: "utilities",
      params: { plantId: currentPlantId.value },
      query: { utility },
    });
  }
}

function goToProduction() {
  if (currentPlantId.value) {
    router.push({
      name: "production",
      params: { plantId: currentPlantId.value },
    });
  }
}

function goToMachine(machineId: string) {
  if (currentPlantId.value) {
    router.push({
      name: "machineDetail",
      params: { plantId: currentPlantId.value, machineId },
    });
  }
}

function isElectricityActive(): boolean {
  return route.name === "electrical" || route.name === "lvmdpDetail";
}

function isLvmdpActive(lvmdpId: number): boolean {
  return (
    route.name === "lvmdpDetail" &&
    parseInt(route.params.lvmdpId as string) === lvmdpId
  );
}

function isUtilityActive(utility: string): boolean {
  return route.name === "utilities" && route.query.utility === utility;
}

function isMachineActive(machineId: string): boolean {
  return route.name === "machineDetail" && route.params.machineId === machineId;
}

function handleLogout() {
  logout();
  window.location.href = "/";
}
</script>

<style scoped>
.app-sidebar {
  @apply fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 to-slate-900 border-r border-gray-800 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0;
  overflow-y: auto;
}

.app-sidebar.sidebar-open {
  @apply translate-x-0;
}

@media (max-width: 1024px) {
  .app-sidebar {
    @apply -translate-x-full;
  }

  .app-sidebar.sidebar-open {
    @apply translate-x-0;
  }
}

.sidebar-header {
  @apply flex items-center justify-between p-4 border-b border-gray-800;
}

.logo {
  @apply flex items-center space-x-3;
}

.logo-text {
  @apply text-xl font-bold text-white;
}

.close-btn {
  @apply p-2 hover:bg-gray-800 rounded-lg transition-colors;
}

.sidebar-section {
  @apply p-4 space-y-2;
}

.sidebar-section-title {
  @apply text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2;
}

.sidebar-item {
  @apply w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-400 transition-all duration-200 cursor-pointer hover:text-gray-300;
}

.sidebar-item-active {
  @apply bg-gray-700 text-white rounded-lg hover:bg-gray-600 hover:text-gray-100 transition-all duration-200;
}

.sidebar-icon {
  @apply w-5 h-5 flex-shrink-0;
}

.sidebar-menu-toggle {
  @apply justify-between;
}

.sidebar-chevron {
  @apply w-4 h-4 flex-shrink-0 transform transition-transform;
}

.back-button {
  @apply flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium;
}

.chevron-expanded {
  @apply rotate-180;
}

.sidebar-menu-group {
  @apply space-y-2;
}

.sidebar-submenu {
  @apply pl-2 space-y-1 border-l border-gray-700 ml-2;
}

.sidebar-submenu-item {
  @apply !pl-4 !py-1.5 text-xs text-gray-400 hover:text-gray-300;
}

.sidebar-submenu-item-2 {
  @apply !pl-8 !py-1.5 text-xs text-gray-400 hover:text-gray-300;
}

.sidebar-submenu-item.sidebar-item-active {
  @apply bg-gray-700 text-white hover:bg-gray-600;
}

.sidebar-submenu-item-2.sidebar-item-active {
  @apply bg-gray-700 text-white hover:bg-gray-600;
}

.submenu-bullet {
  @apply inline-block mr-2;
}

.sidebar-divider {
  @apply my-4 border-t border-gray-800;
}

.sidebar-footer {
  @apply mt-auto border-t border-gray-800 space-y-2;
}

.user-info {
  @apply flex items-center space-x-3 mb-3;
}

.user-avatar {
  @apply w-10 h-10 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center font-bold text-sm;
}

.user-details {
  @apply flex-1 min-w-0;
}

.user-name {
  @apply text-sm font-semibold text-white truncate;
}

.user-role {
  @apply text-xs text-gray-400 capitalize;
}

.logout-btn {
  @apply text-red-400 hover:bg-red-900/20 hover:text-red-300;
}
</style>
