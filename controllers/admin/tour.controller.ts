import { Request, Response } from "express";

import Tour from "../../models/tour.model";

//[GET] /admin/tours
export const index = async (req: Request, res: Response) => {
  // select * from categories where deleted = false
  const tours = await Tour.findAll({
    where: {
      deleted: false,
    },
    raw: true,
  });

  tours.forEach((item) => {
    // if((item as any)["images"]){
    //     const images = JSON.parse((item as any)["images"])
    //     (item as any)["image"] = images[0]
    // }
    (item as any)["price_special"] =
      (item as any)["price"] * (1 - (item as any)["discount"] / 100);
  });

  console.log(tours)

  res.render("admin/pages/tours/index.pug", {
    pageTitle: "Danh mục tour",
    tours: tours,
  });
};
