import { Outlet } from 'react-router-dom';

function Main() {

    return (<>
        <h2>Welcome to the member management system at the HMO</h2>
        <Outlet />
    </>)
}

export default Main