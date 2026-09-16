import { module } from "@prisma/composer";
import webService from "./src/service.ts";

export default module("fragrance", ({ provision }) => {
	provision(webService);
});
