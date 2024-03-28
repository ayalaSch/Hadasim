import { getMembers, getMember, deleteMember, createMember, updateMember } from '../service/database.js'
import { createVaccine, getVaccine, updateVaccine, deleteVaccine } from '../service/database.js';
import { createCoronaPatient, getCoronaPatient, updateCoronaPatient, deleteCoronaPatient } from '../service/database.js';

const merge = (...objects) =>
    objects.reduce((acc, cur) => ({ ...acc, ...cur }));
const today_date = new Date().toISOString().slice(0, 10)
const numbersOnly = (inputString) => /^\d{9}$/.test(inputString);
const numbersOnlyMobile = (inputString) => /^\d{10}$/.test(inputString);

export default class MemberController {

    async createMember(req, res) {
        try {
            const newMember = req.body;
            const member = {
                id: newMember.id,
                firstName: newMember.firstName,
                lastName: newMember.lastName,
                adress: newMember.adress,
                phone: newMember.phone,
                mobile: newMember.mobile,
                birthDate: newMember.birthDate
            }
            const vaccine = {
                id: newMember.id,
                manufacture1: newMember.vaccineManufacture1 || null,
                given1: newMember.vaccineDate1 || null,
                manufacture2: newMember.vaccineManufacture2 || null,
                given2: newMember.vaccineDate2 || null,
                manufacture3: newMember.vaccineManufacture3 || null,
                given3: newMember.vaccineDate3 || null,
                manufacture4: newMember.vaccineManufacture4 || null,
                given4: newMember.vaccineDate4 || null
            }
            const patient = {
                id: newMember.id,
                confirmed: newMember.confirmed || null,
                recovery: newMember.recovery || null
            }
            res.header("Access-Control-Allow-Origin", "*")

            //validating input - dates, strings and numbers
            if (new Date(newMember.birthDate) > today_date || new Date(newMember.recovery) > today_date || new Date(newMember.vaccineDate4) > today_date
                || new Date(newMember.birthDate) > new Date(newMember.confirmed) || new Date(newMember.confirmed) > new Date(newMember.recovery)
                || new Date(newMember.vaccineDate1) > new Date(newMember.vaccineDate2) || new Date(newMember.vaccineDate2) > new Date(newMember.vaccineDate3)
                || new Date(newMember.vaccineDate3) > new Date(newMember.vaccineDate4) || new Date(newMember.birthDate) > new Date(newMember.vaccineDate1)
                || newMember.adress.length < 2 || newMember.firstNamelength < 2 || newMember.lastNamelength < 2
                || !numbersOnly(newMember.id) || !numbersOnly(newMember.phone) || !numbersOnlyMobile(newMember.mobile)) {
                return res.status(400).end('input is incorrect');
            }
            await createMember(member);
            await createCoronaPatient(patient);
            await createVaccine(vaccine)
            return res.json(member)
        } catch (err) {
            return res.status(500).end("err")
        }
    }

    async getAllMembers(req, res) {
        try {
            const members = await getMembers();
            res.header("Access-Control-Allow-Origin", "*")
            res.send(members);
        } catch (err) {
            return res.status(500).end("err")
        }
    }

    async getMember(req, res) {
        try {
            const id = req.params.id;
            const member = await getMember(id);
            const vaccine = await getVaccine(id);
            const patient = await getCoronaPatient(id);
            res.header("Access-Control-Allow-Origin", "*")
            res.send(merge(member, vaccine, patient))
        } catch (err) {
            return res.status(404).end("err")
        }
    }

    async updateMember(req, res) {
        try {
            const id = req.params.id;
            const newMember = req.body;
            const member = {
                id: id,
                firstName: newMember.firstName,
                lastName: newMember.lastName,
                adress: newMember.adress,
                phone: newMember.phone,
                mobile: newMember.mobile,
                birthDate: newMember.birthDate
            }
            const vaccine = {
                id: id,
                manufacture1: newMember.vaccineManufacture1 || null,
                given1: newMember.vaccineDate1 || null,
                manufacture2: newMember.vaccineManufacture2 || null,
                given2: newMember.vaccineDate2 || null,
                manufacture3: newMember.vaccineManufacture3 || null,
                given3: newMember.vaccineDate3 || null,
                manufacture4: newMember.vaccineManufacture4 || null,
                given4: newMember.vaccineDate4 || null
            }
            const patient = {
                id: id,
                confirmed: newMember.confirmed || null,
                recovery: newMember.recovery || null
            }
            res.header("Access-Control-Allow-Origin", "*")
            //validating input - dates, strings and numbers
            if (new Date(newMember.birthDate) > today_date || new Date(newMember.recovery) > today_date || new Date(newMember.vaccineDate4) > today_date
                || new Date(newMember.birthDate) > new Date(newMember.confirmed) || new Date(newMember.confirmed) > new Date(newMember.recovery)
                || new Date(newMember.vaccineDate1) > new Date(newMember.vaccineDate2) || new Date(newMember.vaccineDate2) > new Date(newMember.vaccineDate3)
                || new Date(newMember.vaccineDate3) > new Date(newMember.vaccineDate4) || new Date(newMember.birthDate) > new Date(newMember.vaccineDate1)
                || newMember.adress.length < 2 || newMember.firstNamelength < 2 || newMember.lastNamelength < 2
                || !numbersOnly(newMember.phone) || !numbersOnlyMobile(newMember.mobile)) {
                return res.status(400).end('input is incorrect');
            }
            const result = await updateMember(member)
            let result2, result3;
            if (result.affectedRows > 0) {
                result2 = await updateVaccine(vaccine);
                result3 = await updateCoronaPatient(patient)
            } else return res.status(404).end('no member found');
            res.send(result, result2, result3)
        } catch (err) {
            return res.status(500).end("err")
        }
    }

    async deleteMember(req, res) {
        try {
            const id = req.params.id;
            const result = await deleteMember(id)
            if (result.affectedRows > 0) {
                await deleteVaccine(id);
                await deleteCoronaPatient(id);
            } else return res.status(404).end('no member found');
            res.header("Access-Control-Allow-Origin", "*")
            res.send()
        } catch (err) {
            return res.status(500).end("err")
        }
    }
}
