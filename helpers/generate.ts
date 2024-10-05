// Generate Mã đơn hàng
export const generateOrderCode = (number: number): string => {
  const code = `OD${String(number).padStart(8, "0")}`;

  return code;
};

// Generate Tour Code
export const generateTourCode = (number: number): string => {
  const code = `TOUR${String(number).padStart(6, "0")}`;
  return code;
};
