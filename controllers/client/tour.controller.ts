import { Request, Response } from "express";

import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

//[GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;

  /*
  SELECT tours.*, price * (1 - discount/100) AS price_special
  FROM tours
  JOIN tours_categories ON tours.id = tours_categories.tour_id
  JOIN categories ON tours_categories.category_id = categories.id
  WHERE
  categories.slug   
  = 'du-lich-trong-nuoc'
  AND categories.deleted = false
  AND categories.status = 'active'
  AND tours.deleted = false
  AND tours.status = 'active';
  */

  const tours = await sequelize.query(
    `
      SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
      FROM tours
      JOIN tours_categories ON tours.id = tours_categories.tour_id
      JOIN categories ON tours_categories.category_id = categories.id
      WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
    `,
    {
      type: QueryTypes.SELECT,
    }
  );

  tours.forEach((item) => {
    if ((item as any).images) {
      const images = JSON.parse((item as any).images);
      (item as any).image = images[0];
    }

    (item as any).price_special = parseFloat((item as any).price_special);
  });

  console.log(tours);

  res.render("client/pages/tours/index.pug", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};
