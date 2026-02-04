import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/AuthGuardPage.tsx"),
  {
    path: "login",
    file: "routes/LoginPage.tsx"
  },
  {
    path: "signup",
    file: "routes/SignUpPage.tsx",
  },
  {
    path: "dashboard",
    file: "routes/DashboardPage.tsx"
  },
] satisfies RouteConfig;