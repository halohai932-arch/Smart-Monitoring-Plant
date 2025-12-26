<template>
  <div class="dashboard-layout">
    <!-- Dashboard Sidebar -->
    <DashboardSidebar />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Mobile Header -->
      <header class="mobile-header lg:hidden">
        <button @click="toggleSidebar" class="hamburger">
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
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div class="flex-1"></div>
      </header>

      <!-- Page Content -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardSidebar from "@/components/dashboards/DashboardSidebar.vue";
import { ref } from "vue";

const toggleSidebar = () => {
  // This would be handled by the sidebar component
};
</script>

<style scoped>
.dashboard-layout {
  @apply flex min-h-screen bg-slate-900;
}

.main-content {
  @apply flex-1 lg:ml-64 overflow-y-auto;
}

.mobile-header {
  @apply sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center z-40;
}

.hamburger {
  @apply p-2 hover:bg-gray-800 rounded-lg transition-colors;
}
</style>
