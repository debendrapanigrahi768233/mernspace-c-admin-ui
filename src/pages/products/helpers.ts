import { ImageField, Product } from "../../types";

export const makeFormData = (data: Product) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "image") {
      console.log("value", value);
      formData.append(key, (value as ImageField).file);
    } else if (key === "priceConfiguration" || key === "attributes") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value as string);
    }
  });
  return formData;
};

export const capitalizeFirst = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
