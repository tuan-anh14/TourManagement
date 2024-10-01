import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import { Json } from "sequelize/types/utils";

//[GET] /cart
export const index = async (req: Request, res: Response) => {
  res.render("client/pages/cart/index.pug", {
    pageTitle: "Giỏ hàng",
  });
};

//[GET] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
  const tours = req.body;

  for (const tour of tours) {
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    (tour as any).info = infoTour;

    // (tour as any).image = JSON.parse((infoTour as any).images[0]);

    (tour as any).price_special =
      (infoTour as any).price * (1 - (infoTour as any).discount / 100);

    (tour as any).total =
      (tour as any).price_special * (tour as any).quantity;
  }

  res.json({
    tours: tours,
  });
};
