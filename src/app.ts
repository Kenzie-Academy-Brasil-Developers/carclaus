import express, { Application as iApplication, json } from "express";
import { createSales, deleteItem, deleteList, readSales, readSomeSale, updateSomeSale } from "./logic";
import { ensureListExists } from "./middlewares";

const app: iApplication = express();
app.use(json());

app.post("/purchaseList", createSales);
app.get("/purchaseList", readSales);
app.get("/purchaseList/:id/", ensureListExists, readSomeSale);
app.patch("/purchaseList/:id/:noun", updateSomeSale);
app.delete("/purchaseList/:id/", ensureListExists, deleteList);
app.delete("/purchaseList/:id/:noun", ensureListExists, deleteItem);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));