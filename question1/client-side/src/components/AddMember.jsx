import { useState } from 'react';
import { useForm } from 'react-hook-form';

function AddMember(props) {
    const [confirmed, setConfirmed] = useState(null)
    const [vaccines, setVaccines] = useState([null, null, null, null])
    const {
        register,
        handleSubmit
    } = useForm();

    async function handleAdd(data) {
        try {
            const newMember = {
                id: data.ID,
                firstName: data.FirstName,
                lastName: data.LastName,
                adress: data.Adress,
                phone: data.Phone,
                mobile: data.Mobile,
                birthDate: data.BirthDate,
                confirmed: data.ConfirmedDate,
                recovery: data.RecoveryDate,
                vaccineManufacture1: data.vaccination1manufacture,
                vaccineDate1: data.vaccination1Date,
                vaccineManufacture2: data.vaccination2manufacture,
                vaccineDate2: data.vaccination2Date,
                vaccineManufacture3: data.vaccination3manufacture,
                vaccineDate3: data.vaccination3Date,
                vaccineManufacture4: data.vaccination4manufacture,
                vaccineDate4: data.vaccination4Date
            }
            //validating dates
            if (data.birthDate > data.ConfirmedDate || data.ConfirmedDate > data.RecoveryDate
                || data.vaccination1Date > data.vaccination2Date || data.vaccination2Date > data.vaccination3Date
                || data.vaccination3Date > data.vaccination4Date || data.birthDate > data.vaccination1Date) {
                alert('input is incorrect'); return
            }
            await fetch("http://localhost:3000/members", {
                method: "POST",
                body: JSON.stringify(newMember),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then((response) => {
                if (response.ok)
                    return response.json()
                else if (response.status === 404) {
                    alert('error 404')
                } else {
                    alert('some other error: ' + response.status)
                }
            })
            props.setAddState(false);
        } catch (error) { alert(error) }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleAdd)} style={{ marginBottom: '20px' }} >
                <h2>member information:</h2>
                <input type="text" name="ID" {...register("ID")} pattern="[0-9]*" placeholder="Enter ID" minLength="9" required /> <br />
                <input type="text" name="LastName" {...register("LastName")} placeholder="Enter Last Name" minLength="2" required /> <br />
                <input type="text" name="FirstName" {...register("FirstName")} placeholder="Enter First Name" minLength="2" required /> <br />
                <input type="text" name="Adress" {...register("Adress")} placeholder="Enter Adress" minLength="2" required /> <br />
                <input type="text" name="Phone" {...register("Phone")} pattern="[0-9]*" placeholder="Enter phone number" minLength="9" required /> <br />
                <input type="text" name="Mobile" {...register("Mobile")} pattern="[0-9]*" placeholder="Enter mobile number" minLength="10" required /> <br />
                <span>birth date:</span> <br />
                <input type="date" name="BirthDate"{...register("BirthDate")} placeholder="Enter birth date" max={new Date().toISOString().split('T')[0]} required /> <br />

                <h3>corona information:</h3>
                <span>confirmed positive and recovery date</span> <br />
                <input type="date" name="ConfirmedDate"{...register("ConfirmedDate")} placeholder="Enter confirmed positive date" max={new Date().toISOString().split('T')[0]} onChange={(e) => setConfirmed(e)} /> <br />
                <input type="date" name="RecoveryDate"{...register("RecoveryDate")} placeholder="Enter recovery date" max={new Date().toISOString().split('T')[0]} disabled={confirmed == null} min={confirmed} /> <br />

                <h3>vaccines information:</h3>
                <span>manufacture of vaccine and date of vaccination</span> <br />
                <input type="text" name="vaccination1manufacture" {...register("vaccination1manufacture")} placeholder="Enter manufacture of first vaccination"
                    onChange={() => setVaccines([true, null, null, null])} /> <br />
                <input type="date" name="vaccination1Date"{...register("vaccination1Date")} placeholder="Enter first vaccination date" max={new Date().toISOString().split('T')[0]} disabled={vaccines[0] == null} min={confirmed} /> <br />

                <input type="text" name="vaccination2manufacture" {...register("vaccination2manufacture")} placeholder="Enter manufacture of second vaccination"
                    disabled={vaccines[0] == null} onChange={() => setVaccines([true, true, null, null])} /> <br />
                <input type="date" name="vaccination2Date"{...register("vaccination2Date")} placeholder="Enter second vaccination date" max={new Date().toISOString().split('T')[0]} disabled={vaccines[1] == null} min={confirmed} /> <br />

                <input type="text" name="vaccination3manufacture" {...register("vaccination3manufacture")} placeholder="Enter manufacture of third vaccination"
                    disabled={vaccines[1] == null} onChange={() => setVaccines([true, true, true, null])} /> <br />
                <input type="date" name="vaccination3Date"{...register("vaccination3Date")} placeholder="Enter third vaccination date" max={new Date().toISOString().split('T')[0]} disabled={vaccines[2] == null} min={confirmed} /> <br />

                <input type="text" name="vaccination4manufacture" {...register("vaccination4manufacture")} placeholder="Enter manufacture of fourth vaccination"
                    disabled={vaccines[2] == null} /> <br />
                <input type="date" name="vaccination4Date"{...register("vaccination4Date")} placeholder="Enter fourth vaccination date" max={new Date().toISOString().split('T')[0]} disabled={vaccines[3] == null} min={confirmed} /> <br />

                <button type="submit">Send</button>
            </form>
            <button onClick={() => props.setAddState(false)} style={{ marginBottom: '20px' }}>cancle</button>
        </>)
}
export default AddMember