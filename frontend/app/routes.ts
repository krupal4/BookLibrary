import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  {
    path: "login",
    file: "routes/LoginPage.tsx"
  },
  {
    path: "signup",
    file: "routes/SignUpPage.tsx"
  },
  {
    path: "books",
    file: "routes/BooksPage.tsx"
  }
] satisfies RouteConfig;