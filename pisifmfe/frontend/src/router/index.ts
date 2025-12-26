// frontend\src\router\index.ts
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../stores/auth";
import Landing from "../views/landing.vue";
import Login from "../views/login.vue";
import NewDashboardLayout from "../layouts/newDashboardLayout.vue";
import UtilityConsumption from "../views/utility/utilityConsumption.vue";

// New Dashboard Imports
const GlobalDashboard = () =>
  import("../views/dashboards/global/GlobalDashboard.vue");
const PlantDashboard = () =>
  import("../views/dashboards/plant/PlantDashboard.vue");
const ElectricalDashboard = () =>
  import("../views/dashboards/electrical/ElectricalDashboard.vue");
const UtilitiesDashboard = () =>
  import("../views/dashboards/utilities/UtilitiesDashboard.vue");
const ProductionDashboard = () =>
  import("../views/dashboards/production/ProductionDashboard.vue");
const LVMDPDetail = () => import("../views/details/lvmdp/LVMDPDetail.vue");
const MachineDetail = () =>
  import("../views/details/machine/MachineDetail.vue");
const UtilityDetail = () =>
  import("../views/details/utilities/UtilityDetail.vue");
const LvmdpDailyReport = () =>
  import("../views/dailyReport/lvmdp/lvmdpDailyReport.vue");

// Daily Report pages
const ProductionPC39DailyReport = () =>
  import("../views/dailyReport/production/productionPC39DailyReport.vue");
const ProductionPC14DailyReport = () =>
  import("../views/dailyReport/production/productionPC14DailyReport.vue");
const ProductionFCPDailyReport = () =>
  import("../views/dailyReport/production/productionFCPDailyReport.vue");
const ProductionTWS56DailyReport = () =>
  import("../views/dailyReport/production/productionTWS56DailyReport.vue");
const ProductionTWS72DailyReport = () =>
  import("../views/dailyReport/production/productionTWS72DailyReport.vue");
const ProductionCOPACKDailyReport = () =>
  import("../views/dailyReport/production/productionCOPACKDailyReport.vue");
const ProductionCassavaInhouseDailyReport = () =>
  import(
    "../views/dailyReport/production/productionCassavaInhouseDailyReport.vue"
  );
const ProductionTortilaDailyReport = () =>
  import("../views/dailyReport/production/productionTortilaDailyReport.vue");
const ProductionPackingPouchDailyReport = () =>
  import(
    "../views/dailyReport/production/productionPackingPouchDailyReport.vue"
  );
const ProductionVacuumFryerDailyReport = () =>
  import(
    "../views/dailyReport/production/productionVacuumFryerDailyReport.vue"
  );
const WeigherPC14DailyReport = () =>
  import("../views/dailyReport/weigher/weigherPC14DailyReport.vue");
const WeigherPC39DailyReport = () =>
  import("../views/dailyReport/weigher/weigherPC39DailyReport.vue");
const WeigherCassavaInhouseDailyReport = () =>
  import("../views/dailyReport/weigher/weigherCassavaInhouseDailyReport.vue");
const WeigherCassavaCopackDailyReport = () =>
  import("../views/dailyReport/weigher/weigherCassavaCopackDailyReport.vue");
const WeigherTortilaDailyReport = () =>
  import("../views/dailyReport/weigher/weigherTortilaDailyReport.vue");
const WeigherFCPDailyReport = () =>
  import("../views/dailyReport/weigher/weigherFCPDailyReport.vue");
const WeigherTWS56DailyReport = () =>
  import("../views/dailyReport/weigher/weigherTWS56DailyReport.vue");
const WeigherTWS72DailyReport = () =>
  import("../views/dailyReport/weigher/weigherTWS72DailyReport.vue");
const WeigherPackingPouchDailyReport = () =>
  import("../views/dailyReport/weigher/weigherPackingPouchDailyReport.vue");

const BagmakerPC14DailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerPC14DailyReport.vue");
const BagmakerPC39DailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerPC39DailyReport.vue");
const BagmakerCassavaInhouseDailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerCassavaInhouseDailyReport.vue");
const BagmakerCassavaCopackDailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerCassavaCopackDailyReport.vue");
const BagmakerTortilaDailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerTortilaDailyReport.vue");
const BagmakerFCPDailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerFCPDailyReport.vue");
const BagmakerTWS56DailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerTWS56DailyReport.vue");
const BagmakerTWS72DailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerTWS72DailyReport.vue");
const BagmakerPackingPouchDailyReport = () =>
  import("../views/dailyReport/bagmaker/bagmakerPackingPouchDailyReport.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "landing", component: Landing },
    { path: "/login", name: "login", component: Login },
    {
      path: "/app",
      component: NewDashboardLayout,
      meta: { requiresAuth: true },
      children: [
        // Global Dashboard - Default route after login
        {
          path: "",
          redirect: "global",
        },
        {
          path: "global",
          name: "globalDashboard",
          component: GlobalDashboard,
        },
        // Plant-level routes with dynamic plant ID
        {
          path: "plant/:plantId",
          name: "plantDashboard",
          component: PlantDashboard,
        },
        {
          path: "plant/:plantId/electrical",
          name: "electrical",
          component: ElectricalDashboard,
        },
        {
          path: "plant/:plantId/electrical/lvmdp/:lvmdpId",
          name: "lvmdpDetail",
          component: LVMDPDetail,
        },
        {
          path: "plant/:plantId/production",
          name: "production",
          component: ProductionDashboard,
        },
        {
          path: "plant/:plantId/machine/:machineId",
          name: "machineDetail",
          component: MachineDetail,
        },
        {
          path: "plant/:plantId/utilities",
          name: "utilities",
          component: UtilitiesDashboard,
        },
        {
          path: "plant/:plantId/utilities/:utilityType",
          name: "utilityDetail",
          component: UtilityDetail,
        },

        // LVMDP daily report route
        {
          path: "daily-report",
          name: "dailyReport",
          component: LvmdpDailyReport,
          meta: { requiresUser: true },
        },

        // Utility Consumption routes (User only)
        {
          path: "utility/pc14",
          name: "utilityPC14",
          component: UtilityConsumption,
          props: { machineName: "PC 14" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/pc39",
          name: "utilityPC39",
          component: UtilityConsumption,
          props: { machineName: "PC 39" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/cassava-inhouse",
          name: "utilityCassavaInhouse",
          component: UtilityConsumption,
          props: { machineName: "Cassava Inhouse" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/cassava-copack",
          name: "utilityCassavaCopack",
          component: UtilityConsumption,
          props: { machineName: "Cassava Copack" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/tortila",
          name: "utilityTortila",
          component: UtilityConsumption,
          props: { machineName: "Tortila" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/fcp",
          name: "utilityFCP",
          component: UtilityConsumption,
          props: { machineName: "FCP" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/tws56",
          name: "utilityTWS56",
          component: UtilityConsumption,
          props: { machineName: "TWS 5.6" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/tws72",
          name: "utilityTWS72",
          component: UtilityConsumption,
          props: { machineName: "TWS 7.2" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/packing-pouch",
          name: "utilityPackingPouch",
          component: UtilityConsumption,
          props: { machineName: "Packing Pouch (Promina Puff)" },
          meta: { requiresUser: true },
        },
        {
          path: "utility/vacuum-fryer",
          name: "utilityVacuumFryer",
          component: UtilityConsumption,
          props: { machineName: "Vacuum Fryer 1" },
          meta: { requiresUser: true },
        },

        // Daily Report routes - Production
        {
          path: "daily-report/production/pc39",
          name: "dailyReportPC39",
          component: ProductionPC39DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/pc14",
          name: "dailyReportPC14",
          component: ProductionPC14DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/fcp",
          name: "dailyReportFCP",
          component: ProductionFCPDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/tws56",
          name: "dailyReportTWS56",
          component: ProductionTWS56DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/tws72",
          name: "dailyReportTWS72",
          component: ProductionTWS72DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/copack",
          name: "dailyReportCOPACK",
          component: ProductionCOPACKDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/cassava-inhouse",
          name: "dailyReportCassavaInhouse",
          component: ProductionCassavaInhouseDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/tortila",
          name: "dailyReportTortila",
          component: ProductionTortilaDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/packing-pouch",
          name: "dailyReportPackingPouch",
          component: ProductionPackingPouchDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/production/vacuum-fryer",
          name: "dailyReportVacuumFryer",
          component: ProductionVacuumFryerDailyReport,
          meta: { requiresUser: true },
        },

        // Daily Report routes - Packing Weigher
        {
          path: "daily-report/weigher/weigher-pc14",
          name: "dailyReportWeigherPC14",
          component: WeigherPC14DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-pc39",
          name: "dailyReportWeigherPC39",
          component: WeigherPC39DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-cassava-inhouse",
          name: "dailyReportWeigherCassavaInhouse",
          component: WeigherCassavaInhouseDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-cassava-copack",
          name: "dailyReportWeigherCassavaCopack",
          component: WeigherCassavaCopackDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-tortila",
          name: "dailyReportWeigherTortila",
          component: WeigherTortilaDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-fcp",
          name: "dailyReportWeigherFCP",
          component: WeigherFCPDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-tws56",
          name: "dailyReportWeigherTWS56",
          component: WeigherTWS56DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-tws72",
          name: "dailyReportWeigherTWS72",
          component: WeigherTWS72DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/weigher/weigher-packing-pouch",
          name: "dailyReportWeigherPackingPouch",
          component: WeigherPackingPouchDailyReport,
          meta: { requiresUser: true },
        },

        // Daily Report routes - Packing BagMaker
        {
          path: "daily-report/bagmaker/bagmaker-pc14",
          name: "dailyReportBagmakerPC14",
          component: BagmakerPC14DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-pc39",
          name: "dailyReportBagmakerPC39",
          component: BagmakerPC39DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-cassava-inhouse",
          name: "dailyReportBagmakerCassavaInhouse",
          component: BagmakerCassavaInhouseDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-cassava-copack",
          name: "dailyReportBagmakerCassavaCopack",
          component: BagmakerCassavaCopackDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-tortila",
          name: "dailyReportBagmakerTortila",
          component: BagmakerTortilaDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-fcp",
          name: "dailyReportBagmakerFCP",
          component: BagmakerFCPDailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-tws56",
          name: "dailyReportBagmakerTWS56",
          component: BagmakerTWS56DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-tws72",
          name: "dailyReportBagmakerTWS72",
          component: BagmakerTWS72DailyReport,
          meta: { requiresUser: true },
        },
        {
          path: "daily-report/bagmaker/bagmaker-packing-pouch",
          name: "dailyReportBagmakerPackingPouch",
          component: BagmakerPackingPouchDailyReport,
          meta: { requiresUser: true },
        },
      ],
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const { isAuthenticated, canAccessDailyReport, initAuth } = useAuth();

  // Initialize auth from localStorage
  initAuth();

  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      // Redirect to login if not authenticated
      next({ name: "login", query: { redirect: to.fullPath } });
      return;
    }
  }

  // Check if route requires user role (for daily reports, weigher, bagmaker)
  if (to.matched.some((record) => record.meta.requiresUser)) {
    if (!isAuthenticated.value) {
      next({ name: "login", query: { redirect: to.fullPath } });
      return;
    }

    if (!canAccessDailyReport()) {
      // Guest cannot access restricted features
      const routePath = to.path;
      let message = "⚠️ Akses Ditolak\n\n";

      if (routePath.includes("daily-report")) {
        message += "Silakan login sebagai User untuk akses penuh.";
      } else if (
        routePath.includes("weigher") ||
        routePath.includes("bagmaker")
      ) {
        message += "Silakan login sebagai User untuk akses penuh.";
      } else {
        message += "Silakan login sebagai User untuk akses penuh.";
      }

      alert(message);
      next({ name: "lvmdp1" });
      return;
    }
  }

  next();
});

export default router;
