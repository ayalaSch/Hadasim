import { getNotVaccinated } from "../service/database.js";

export default class VaccineController {

    async getCountOfNotVaccinatedMembers(req, res) {

        try {
            const result = await getNotVaccinated()
            res.header("Access-Control-Allow-Origin", "*")
            return res.json(result['count(*)'])
        } catch (err) {
            return res.status(500).end("err")
        }
    }
}