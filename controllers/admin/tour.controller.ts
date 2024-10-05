import { Request, Response } from "express";

import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate";

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

  console.log(tours);

  res.render("admin/pages/tours/index.pug", {
    pageTitle: "Danh mục tour",
    tours: tours,
  });
};

//[GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false,
      status: "active",
    },
    raw: true,
  });

  res.render("admin/pages/tours/create.pug", {
    pageTitle: "Thêm mới tour",
    categories: categories,
  });
};

//[POST] /admin/tours/create
export const createPost = async (req: Request, res: Response) => {
  const countTour = await Tour.count();
  const code = generateTourCode(countTour + 1);

  if (req.body.position == "") {
    req.body.position = countTour + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const dataTour = {
    title: req.body.title,
    code: code,
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: req.body.position,
    status: req.body.status,
  };

  console.log(dataTour)
  res.send("OK");
};
