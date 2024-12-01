import { Credentials } from "../types";
import { api } from "./client";

//Auth service----------------------------->
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

//getself endpoint
export const self = () => api.get("/auth/self");

//logout endpoint
export const logout = () => api.post("/auth/logout");

//Get users
export const getUsers = () => api.get("/users");
