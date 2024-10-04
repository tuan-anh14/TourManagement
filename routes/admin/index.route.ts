import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/config";
import { dashboardRoutes } from "./dashboard.route";

const adminRoutes = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use(PATH_ADMIN + "/categories", categoryRoutes);

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
};

export default adminRoutes;
