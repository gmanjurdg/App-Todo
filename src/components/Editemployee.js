import React, { Fragment, useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory, Link } from "react-router-dom";
export const Editemployee = (route) => {
    let history = useHistory();
    const { employees, editEmployee } = useContext(GlobalContext);
    const [selectedUser, setSeletedUser] = useState({ id: null, name: '', designation: '', location: '' });
    const currentUserId = route.match.params.id;
    useEffect(() => {
        const employeeId = currentUserId;
        const selectedUser = employees.find(emp => emp.id === parseInt(employeeId));
        setSeletedUser(selectedUser);
        // eslint-disable-next-line
    }, []);
    const onSubmit = e => {
        e.preventDefault();
            fetch("https://jsonplaceholder.typicode.com/users/"+selectedUser.id,{
                method:"PUT",
                body:JSON.stringify(selectedUser)
            })
            .then(response=>response.json())
            .then(data=>{
                if(data){
                    editEmployee(selectedUser);
                    history.push('/');
                }
            })
    }
    const handleOnChange = (userKey, value) => setSeletedUser({ ...selectedUser, [userKey]: value })
    if (!selectedUser || !selectedUser.id) {
        return <div>Data Not Found</div>
    }
    return (
        <Fragment>
            <div className="w-full max-w-sm container mt-20 mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Name 
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={selectedUser.name} onChange={(e) => handleOnChange('name', e.target.value)} type="text" placeholder="Enter name" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                            User Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={selectedUser.location} onChange={(e) => handleOnChange('location', e.target.value)} type="text" placeholder="Enter location" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="designation">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={selectedUser.designation} onChange={(e) => handleOnChange('designation', e.target.value)} type="text" placeholder="Enter designation" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
                            Edit User
                        </button>
                    </div>
                    <div className="block mt-5 bg-red-400 w-full text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline text-center"><Link to='/'>Cancel</Link></div>
                </form>
            </div>
        </Fragment>
    )
}