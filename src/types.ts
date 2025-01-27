export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  tenant: Tenant | null;
};

export type CreateUserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  tenantId: number;
};

export type Tenant = {
  id: number;
  name: string;
  address: string;
};

export type CreateTenantData = {
  name: string;
  address: string;
};

export type FieldData = {
  name: string[];
  value?: string;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "aditional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export type ProductAttribute = {
  name: string;
  value: string | boolean | number; // Can store boolean, string, or number depending on the attribute type
  _id: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: Category;
  isPublish: boolean;
  createdAt: string;
  image?: string;
  priceConfiguration: PriceConfiguration;
  attributes: ProductAttribute[];
};

export type ImageField = { file: File };
export type CreateProductData = Product & { image: ImageField };
