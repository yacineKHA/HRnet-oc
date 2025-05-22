import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from 'react-router';
import { useEmployeeStore } from '../stores';
import { useEffect, useState } from 'react';
import '../styles/employeeList.css'
import fakeEmployeesList from '../mock/fakesEmployees.json'


const EmployeeList = () => {
    const [search, setSearch] = useState('');
    const [employeeList, setEmployeeList] = useState([]);

    // Recup des données du store
    const { employees } = useEmployeeStore();
    console.info("liste employee: ", employees)

    const columns = [
        { name: 'First Name', selector: row => row.firstName, sortable: true },
        { name: 'Last Name', selector: row => row.lastName, sortable: true },
        { name: 'Start Date', selector: row => row.startDate, sortable: true },
        { name: 'Department', selector: row => row.department, sortable: true },
        { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true },
        { name: 'Street', selector: row => row.street, sortable: true },
        { name: 'City', selector: row => row.city, sortable: true },
        { name: 'State', selector: row => row.state, sortable: true },
        { name: 'Zip Code', selector: row => row.zip, sortable: true },
    ];

    useEffect(()=> {
        setEmployeeList(employees)
    }, [])

    // Filtre les données du store
    const filteredData = employeeList.filter(row =>
        Object.values(row)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="table-container">
            <h2>Current Employees</h2>
            <div className='search-container'>
                <input
                    type="search"
                    placeholder="Rechercher"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button onClick={()=>setEmployeeList(fakeEmployeesList)}>
                    Activate fake employee
                </button>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                highlightOnHover
                defaultSortFieldId={1}
            />
        </div>
    );
};

export default EmployeeList;
