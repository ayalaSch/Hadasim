import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function createMember(member) {
    const [result] = await pool.query(
        `insert into members
        values (?,?,?,?,?,?,?)`,
        [member.id, member.firstName, member.lastName, member.adress, member.phone, member.mobile, member.birthDate]
    )
    return result.insertId;
}

async function createCoronaPatient(patient) {
    const [result] = await pool.query(
        `insert into coronaPatients
        values (?,?,?)`,
        [patient.id, patient.confirmed, patient.recovery]
    )
    return result.insertId;
}
async function createVaccine(vaccine) {
    const [result] = await pool.query(
        `insert into vaccines
        values (?,?,?,?,?,?,?,?,?)`,
        [vaccine.id, vaccine.manufacture1, vaccine.given1, vaccine.manufacture2, vaccine.given2,
        vaccine.manufacture3, vaccine.given3, vaccine.manufacture4, vaccine.given4]
    )
    return result.insertId;
}

async function getMembers() {
    const [rows] = await pool.query("select ID, LastName, FirstName from members")
    return rows
}
//, vaccines, coronaPatients
async function getMember(id) {
    const [rows] = await pool.query("select * from members where id=?", id)
    return rows[0]
}
async function getCoronaPatient(id) {
    const [rows] = await pool.query("select * from coronaPatients where id=?", id)
    return rows[0]
}
async function getVaccine(id) {
    const [rows] = await pool.query("select * from vaccines where id=?", id)
    return rows[0]
}


async function updateMember(member) {
    const [result] = await pool.query(
        'update members set FirstName=?, LastName=?,Adress=?,Mobile=?,Phone=?,BirthDate=? where id=?',
        [member.firstName, member.lastName, member.adress, member.phone, member.mobile, member.birthDate, member.id]
    )
    return result;
}
async function updateVaccine(vaccine) {
    const [result] = await pool.query(
        `update vaccines set manufacturer1=?, given1=?,manufacturer2=?,given2=?,
         manufacturer3=?,given3=?,manufacturer4=?,given4=? where id=?`,
        [vaccine.manufacture1, vaccine.given1, vaccine.manufacture2, vaccine.given2,
        vaccine.manufacture3, vaccine.given3, vaccine.manufacture4, vaccine.given4, vaccine.id]
    )
    return result
}
async function updateCoronaPatient(patient) {
    const [result] = await pool.query(
        'update coronaPatients set Confirmed=?, Recovery=? where id=?',
        [patient.confirmed, patient.recovery, patient.id]
    )
    return result
}
async function deleteMember(id) {
    const [result] = await pool.query(
        'delete from members where ID=?', id)
    return result;
}
async function deleteCoronaPatient(id) {
    const [result] = await pool.query(
        'delete from coronaPatients where ID=?', id)
    return result;
}
async function deleteVaccine(id) {
    const [result] = await pool.query(
        'delete from vaccines where ID=?', id)
    return result;
}

async function getNotVaccinated()
{
    const [result]=await pool.query(
        'select count(*) from vaccines where given1 is null'
    )
    return result[0];
}

export {
    createMember, getMembers, getMember, updateMember, deleteMember,
    createVaccine, getVaccine, updateVaccine, deleteVaccine,
    createCoronaPatient, getCoronaPatient, updateCoronaPatient, deleteCoronaPatient,
    getNotVaccinated
}