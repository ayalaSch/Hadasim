import { useState, useEffect } from "react";

function VaccinesInfo() {
    const [notVaccinated, setNotVaccinated] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/vaccines')
            .then((response) => response.json())
            .then((data) => setNotVaccinated(data))
    }, [])
    return (
        <><h3>number of not vaccinated members: {notVaccinated}</h3></>
    )
}
export default VaccinesInfo