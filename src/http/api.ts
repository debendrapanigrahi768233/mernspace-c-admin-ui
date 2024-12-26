import { CreateTenantData, CreateUserData, Credentials } from "../types";
import { api } from "./client";

//Auth service----------------------------->
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

//getself endpoint
export const self = () => api.get("/auth/self");

//logout endpoint
export const logout = () => api.post("/auth/logout");

//Get users
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

//Get tenants
export const getTenants = () => api.get("/tenants");

//Create User
export const createUser = (user: CreateUserData) => api.post("/users", user);

//Create tenant
export const createTenant = (tenant: CreateTenantData) =>
  api.post("/tenants", tenant);
