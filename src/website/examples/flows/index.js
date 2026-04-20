import { OnboardingAuthFlow } from "./OnboardingAuthFlow";
import { DashboardTableFlow } from "./DashboardTableFlow";
import { SettingsThemeFlow } from "./SettingsThemeFlow";
import { NotificationsInboxFlow } from "./NotificationsInboxFlow";
import { CheckoutFlow } from "./CheckoutFlow";
import { SchedulingFlow } from "./SchedulingFlow";
import { TeamAdminFlow } from "./TeamAdminFlow";
import { CommandCenterFlow } from "./CommandCenterFlow";

export const EXAMPLE_FLOWS = [
  {
    id: "onboarding-auth",
    label: "Onboarding + Auth",
    title: "Onboarding y autenticación",
    description: "Registro, login y validaciones del inicio de producto.",
    Component: OnboardingAuthFlow,
  },
  {
    id: "dashboard-table",
    label: "Dashboard + Tabla",
    title: "Dashboard operativo con tabla",
    description: "Filtros, tabla, estados y paginación en un panel real.",
    Component: DashboardTableFlow,
  },
  {
    id: "settings-theme",
    label: "Settings + Theme",
    title: "Pantalla de ajustes y tema",
    description: "Preferencias reales de UI con confirmaciones y guardado.",
    Component: SettingsThemeFlow,
  },
  {
    id: "notifications-inbox",
    label: "Notificaciones",
    title: "Inbox de notificaciones de producto",
    description: "Alertas reales, estado vacío y acciones de seguimiento.",
    Component: NotificationsInboxFlow,
  },
  {
    id: "checkout-payment",
    label: "Checkout",
    title: "Checkout y pago",
    description: "Flujo de pago con pasos, validación y confirmación.",
    Component: CheckoutFlow,
  },
  {
    id: "scheduling",
    label: "Scheduling",
    title: "Agendado y disponibilidad",
    description: "Date/Time picker + duración + estado sin disponibilidad.",
    Component: SchedulingFlow,
  },
  {
    id: "team-admin",
    label: "Team Admin",
    title: "Administración de equipo",
    description: "Miembros, roles, acciones y panel lateral de permisos.",
    Component: TeamAdminFlow,
  },
  {
    id: "command-center",
    label: "Command Center",
    title: "Centro de comandos",
    description: "Paleta de comandos, atajos y feedback de acciones.",
    Component: CommandCenterFlow,
  },
];
