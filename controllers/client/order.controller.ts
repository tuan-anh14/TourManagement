import { Request, Response } from "express";
import Order from "../../models/order.model";
import { or } from "sequelize";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

//[POST] /order
export const order = async (req: Request, res: Response) => {
  const data = req.body;

  // Lưu data vào bảng order
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  };

  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id;

  const code = generateOrderCode(orderId);

  await Order.update(
    {
      code: code,
    },
    {
      where: {
        id: orderId,
      },
    }
  );

  // Lưu data vào bảng orders_item
  for (const item of data.cart) {
    const dataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity,
    };

    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    (dataItem as any).price = (infoTour as any).price;
    (dataItem as any).discount = (infoTour as any).discount;
    (dataItem as any).timeStart = (infoTour as any).timeStart;

    await OrderItem.create(dataItem);
  }

  res.json({
    code: 200,
    message: "Đặt hàng thành công !",
    orderCode: code,
  });
};

//[GET] /success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;

  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false,
    },
    raw: true,
  });

  const ordersItem = await OrderItem.findAll({
    where: {
      orderId: (order as any)["id"],
    },
    raw: true,
  });

  for (const item of ordersItem) {
    (item as any)["price_special"] =
      (item as any)["price"] * (1 - (item as any)["discount"] / 100);

    const tourInfo = await Tour.findOne({
      where: {
        id: (item as any)["tourId"],
      },
      raw: true,
    });

    (item as any)["title"] = (tourInfo as any)["title"];
    (item as any)["slug"] = (tourInfo as any)["slug"];
    // (item as any)["image"] = JSON.parse((tourInfo as any)["image"])[0];
    (item as any)["total"] = (item as any)["price_special"] * (item as any)["quantity"];
  }

  (order as any)["total_price"] = ordersItem.reduce((sum, item) => sum + (item as any)["total"], 0);

  res.render("client/pages/order/success.pug", {
    pageTitle: "Đặt hàng thành công !",
    order: order,
    ordersItem: ordersItem
  });
};

