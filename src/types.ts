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
    _id: string;
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio" | string; // Add other widget types if applicable
  defaultValue: string;
  availableOptions: string[];
  _id: string;
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface ProductAttribute {
  name: string;
  value: string | boolean | number; // Can store boolean, string, or number depending on the attribute type
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category;
  isPublish: boolean;
  createdAt: string;
  image?: string;
}
