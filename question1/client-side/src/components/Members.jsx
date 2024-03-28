import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddMember from "./AddMember";
import VaccinesInfo from "./VaccinesInfo";

function Members() {
    const [members, setMembers] = useState([])
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!add)
            fetch(`http://localhost:3000/members`)
                .then((response) => response.json())
                .then((data) => setMembers(data))
    }, [add])

    function showMore(id) {
        navigate(`${id}/details`)
    }

    return (
        <>
            <button onClick={() => setAdd(true)} style={{ visibility: add ? "hidden" : "visible", padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Add Member</button>
            {add && <AddMember setAddState={setAdd} />}
            <br />
            <VaccinesInfo />
            <span style={{ marginTop: '10px', display: 'block' }}>Click on a member for more information</span>
            {members.map((value, index) => (
                <div key={index} onClick={() => showMore(value.ID)} style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease-in-out' }}>
                    <span style={{ marginRight: '10px' }}>{value.ID}</span>
                    <span style={{ marginRight: '10px' }}>{value.LastName}</span>
                    <span>{value.FirstName}</span>
                </div>
            ))}
        </>)
}

export default Members