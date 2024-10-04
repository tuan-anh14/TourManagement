import { Request, Response } from "express";

import Category from "../../models/category.model";

//[GET] /admin/categories
export const index = async (req: Request, res: Response) => {
  // select * from categories where deleted = false
  const categories = await Category.findAll({
    where: {
      deleted: false,
    },
    raw: true,
  });

  res.render("admin/pages/categories/index.pug", {
    pageTitle: "Danh mục tour",
    categories: categories
  });
};
