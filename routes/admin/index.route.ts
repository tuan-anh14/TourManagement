import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/config";
import { dashboardRoutes } from "./dashboard.route";
import { tourRoutes } from "./tour.route";

const adminRoutes = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use(PATH_ADMIN + "/categories", categoryRoutes);

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

  app.use(PATH_ADMIN + "/tours", tourRoutes);

};

export default adminRoutes;
