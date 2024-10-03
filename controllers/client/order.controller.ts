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
