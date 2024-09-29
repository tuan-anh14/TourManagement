import { Request, Response } from "express";

import Tour from "../../models/tour.model";

//[GET] /tours
export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
        deleted: false,
        status: "active"
    },
    raw: true,
  });

  console.log(tours);
  res.render("client/pages/tours/index.pug", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};
