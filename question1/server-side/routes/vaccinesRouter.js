import express from "express";
import VaccineController from "../controllers/vaccineController.js";
const vaccineRouter = express.Router();
let vaccineController = new VaccineController();
vaccineRouter.get('/', vaccineController.getCountOfNotVaccinatedMembers)
export {
    vaccineRouter
}