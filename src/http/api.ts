import { Credentials } from "../types";
import { api } from "./client";

//Auth service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

//getself service
export const self = () => api.get("/auth/self");
