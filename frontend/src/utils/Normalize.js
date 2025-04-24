// utils/normalize.js

export const normalizeImageName = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD") // chuyển ký tự có dấu thành ký tự thường + dấu
      .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu
      .replace(/[^a-z0-9\s-]/g, "") // loại bỏ ký tự đặc biệt
      .trim() // loại bỏ khoảng trắng đầu/cuối
      .replace(/\s+/g, "-"); // thay khoảng trắng bằng dấu gạch ngang
  };
  