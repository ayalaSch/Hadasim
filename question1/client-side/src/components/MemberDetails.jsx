import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

function MemberDetails() {
    const [member, setMember] = useState()
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false);
    const [vaccines, setVaccines] = useState([null, null, null, null])

    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit
    } = useForm();

    const merge = (...objects) =>
        objects.reduce((acc, cur) => ({ ...acc, ...cur }));//helps to be able to slice birthDate

    useEffect(() => {
        if (!update)
            fetch(`http://localhost:3000/members/${id}`)
                .then((response) => {
                    if (response.ok)
                        return response.json()
                    else if (response.status === 404) {
                        alert('error 404')
                    } else {
                        alert('some other error: ' + response.status)
                    }
                }).then((data) => {
                    setMember(merge(data, { BirthDate: data.BirthDate.slice(0, 10), }));
                    setVaccines([data.given1, data.given2, data.given3, data.given4]);
                    setLoading(false)
                })
    }, [update])

    async function handleDelete(id) {
        try {
            await fetch(`http://localhost:3000/members/${id}`, { method: 'DELETE' })
        } catch (error) {
            alert('An error occured, please try again.')
        }
        navigate('/members')
    }

    async function handleUpdate(data) {
        try {
            const updatedMember = {
                id: id,
                firstName: data.FirstName,
                lastName: data.LastName,
                adress: data.Adress,
                phone: data.Phone,
                mobile: data.Mobile,
                birthDate: member.BirthDate,
                confirmed: member.Confirmed ? member.Confirmed.slice(0, 10) : data.ConfirmedDate,
                recovery: member.Recovery ? member.Recovery.slice(0, 10) : data.RecoveryDate,
                vaccineManufacture1: member.manufacturer1 ? member.manufacturer1 : data.vaccination1manufacture,
                vaccineDate1: member.given1 ? member.given1.slice(0, 10) : data.vaccination1Date,
                vaccineManufacture2: member.manufacturer2 ? member.manufacturer2 : data.vaccination2manufacture,
                vaccineDate2: member.given2 ? member.given2.slice(0, 10) : data.vaccination2Date,
                vaccineManufacture3: member.manufacturer3 ? member.manufacturer3 : data.vaccination3manufacture,
                vaccineDate3: member.given3 ? member.given3.slice(0, 10) : data.vaccination3Date,
                vaccineManufacture4: member.manufacturer4 ? member.manufacturer4 : data.vaccination4manufacture,
                vaccineDate4: member.given4 ? member.given4.slice(0, 10) : data.vaccination4Date
            }
            //validating dates
            if (updatedMember.birthDate > updatedMember.confirmed || updatedMember.confirmed > updatedMember.recovery
                || updatedMember.vaccineDate1 > updatedMember.vaccineDate2 || updatedMember.vaccineDate2 > updatedMember.vaccineDate3
                || updatedMember.vaccineDate3 > updatedMember.vaccineDate4 || updatedMember.birthDate > updatedMember.vaccineDate1) {
                alert('input is incorrect'); return
            }
            await fetch(`http://localhost:3000/members/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedMember),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(response => {
                if (response.ok)
                    return response.json()
                else if (response.status === 404) {
                    alert('error 404')
                } else {
                    alert('some other error: ' + response.status)
                }
            }).then(() => { setUpdate(false) })
        } catch (error) {
            alert('An error occured, please try again.')
        }
    }

    if (loading)
        return (<h3>loading</h3>)
    if (update)
        return (
            <>
                <form onSubmit={handleSubmit(handleUpdate)} >
                    <h2>member information:</h2>
                    <input type="text" name="ID" pattern="[0-9]*" defaultValue={member.ID} disabled /> <br />
                    <input type="text" name="LastName" {...register("LastName")} minLength="2" defaultValue={member.LastName} required /> <br />
                    <input type="text" name="FirstName" {...register("FirstName")} minLength="2" defaultValue={member.FirstName} required /> <br />
                    <input type="text" name="Adress" {...register("Adress")} minLength="2" defaultValue={member.Adress} required /> <br />
                    <input type="text" name="Phone" {...register("Phone")} pattern="[0-9]*" minLength="9" defaultValue={member.Phone} required /> <br />
                    <input type="text" name="Mobile" {...register("Mobile")} pattern="[0-9]*" minLength="10" defaultValue={member.Mobile} required /> <br />
                    <span>birth date:</span> <br />
                    <input type="date" name="BirthDate" value={member.BirthDate} disabled /> <br />
                    <h3>corona information:</h3>
                    <span>confirmed positive and recovery date</span> <br />
                    {member.Confirmed ?
                        <input type="date" name="ConfirmedDate" placeholder="Enter confirmed positive date" value={member.Confirmed.slice(0, 10)} disabled={true} />
                        : <input type="date" name="ConfirmedDate"{...register("ConfirmedDate")} max={new Date().toISOString().split('T')[0]} defaultValue={null} placeholder="Enter confirmed positive date" />
                    }<br />
                    {member.Recovery ?
                        <input type="date" name="RecoveryDate" placeholder="Enter recovery date" value={member.Recovery.slice(0, 10)} disabled={true} />
                        : <input type="date" name="RecoveryDate"{...register("RecoveryDate")} max={new Date().toISOString().split('T')[0]} placeholder="Enter recovery date" />
                    }<br />

                    <h3>vaccines information:</h3>
                    <span>manufacture of vaccine and date of vaccination</span> <br />
                    <input type="text" name="vaccination1manufacture" {...register("vaccination1manufacture")} placeholder="Enter manufacture of first vaccination"
                        disabled={vaccines[0]} defaultValue={vaccines[0] ? member.manufacturer1 : ""} onBlur={() => setVaccines([true, null, null, null])} /> <br />
                    <input type="date" name="vaccination1Date"{...register("vaccination1Date")} placeholder="Enter first vaccination date"
                        value={member.given1 ? member.given1.slice(0, 10) : null} max={new Date().toISOString().split('T')[0]} disabled={vaccines[0] == null || member.given1 != null} /> <br />

                    <input type="text" name="vaccination2manufacture" {...register("vaccination2manufacture")} placeholder="Enter manufacture of second vaccination"
                        disabled={vaccines[1] || vaccines[0] == null} defaultValue={vaccines[1] ? member.manufacturer2 : ""} onBlur={() => setVaccines([true, true, null, null])} /> <br />
                    <input type="date" name="vaccination2Date"{...register("vaccination2Date")} placeholder="Enter second vaccination date"
                        value={member.given2 ? member.given2.slice(0, 10) : null} max={new Date().toISOString().split('T')[0]} disabled={vaccines[1] == null || member.given2 != null} /> <br />

                    <input type="text" name="vaccination3manufacture" {...register("vaccination3manufacture")} placeholder="Enter manufacture of third vaccination"
                        disabled={vaccines[2] || vaccines[1] == null} defaultValue={vaccines[2] ? member.manufacturer3 : ""} onBlur={() => setVaccines([true, true, true, null])} /> <br />
                    <input type="date" name="vaccination3Date"{...register("vaccination3Date")} placeholder="Enter third vaccination date"
                        value={member.given3 ? member.given3.slice(0, 10) : null} max={new Date().toISOString().split('T')[0]} disabled={vaccines[2] == null || member.given3 != null} /> <br />

                    <input type="text" name="vaccination4manufacture" {...register("vaccination4manufacture")} placeholder="Enter manufacture of fourth vaccination"
                        disabled={vaccines[3] || vaccines[2] == null} defaultValue={vaccines[3] ? member.manufacturer4 : ""} /> <br />
                    <input type="date" name="vaccination4Date"{...register("vaccination4Date")} placeholder="Enter fourth vaccination date"
                        value={member.given4 ? member.given4.slice(0, 10) : null} max={new Date().toISOString().split('T')[0]} disabled={vaccines[3] == null || member.given4 != null} /> <br />

                    <button type="submit" style={{ margin: '20px' }}>save changes</button>
                </form>
                <button onClick={() => setUpdate(false)}>cancle</button>
            </>
        )
    return (
        <>
            <Link to="/members" style={{ textDecoration: 'none', color: 'blue' }}>Return to All Members</Link>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h2>Member Details</h2>
                <p>ID Number: {member.ID}</p>
                <p>Last Name: {member.LastName}</p>
                <p>First Name: {member.FirstName}</p>
                <p>Address: {member.Adress}</p>
                <p>Mobile: {member.Mobile}</p>
                <p>Phone: {member.Phone}</p>
                <p>Birth Date: {member.BirthDate}</p>
                {member.Confirmed &&
                    <>
                        <p>Confirmed Date: {member.Confirmed.slice(0, 10)}</p>
                        <p>Recovery Date: {member.Recovery.slice(0, 10)}</p>
                    </>
                }
                {member.manufacturer1 &&
                    <>
                        <h3>Vaccine Details</h3>
                        <p>First Vaccine Manufacturer: {member.manufacturer1}</p>
                        <p>Date Given: {member.given1.slice(0, 10)}</p>
                        {member.manufacturer2 &&
                            <>
                                <p>Second Vaccine Manufacturer: {member.manufacturer2}</p>
                                <p>Date Given: {member.given2.slice(0, 10)}</p>
                            </>
                        }
                        {member.manufacturer3 &&
                            <>
                                <p>Third Vaccine Manufacturer: {member.manufacturer3}</p>
                                <p>Date Given: {member.given3.slice(0, 10)}</p>
                            </>
                        }
                        {member.manufacturer4 &&
                            <>
                                <p>Fourth Vaccine Manufacturer: {member.manufacturer4}</p>
                                <p>Date Given: {member.given4.slice(0, 10)}</p>
                            </>
                        }
                    </>
                }
            </div>
            <button onClick={() => setUpdate(true)} style={{ marginRight: '10px' }}>Update Member</button>
            <button onClick={() => handleDelete(member.ID)} style={{ color: 'red' }}>Delete Member</button>
        </>
    )
}

export default MemberDetails