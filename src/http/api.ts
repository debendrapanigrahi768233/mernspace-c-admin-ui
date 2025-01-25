import { CreateTenantData, CreateUserData, Credentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
// export const CATALOG_SERVICE = '/api/catalog'

//Auth service----------------------------->
export const login = (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);

//getself endpoint
export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);

//logout endpoint
export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

//Get users
export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);

//Get tenants
export const getTenants = () => api.get(`${AUTH_SERVICE}/tenants`);

//Create User
export const createUser = (user: CreateUserData) =>
  api.post(`${AUTH_SERVICE}/users`, user);

//Update User
export const updateUser = (user: CreateUserData, id: string) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);

//Create tenant
export const createTenant = (tenant: CreateTenantData) =>
  api.post(`${AUTH_SERVICE}/tenants`, tenant);
