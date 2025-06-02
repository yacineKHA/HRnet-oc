import { useState } from 'react';
import { useEmployeeStore } from '../stores';
import '../styles/createEmployee.css';
import Modale from 'modale-component-oc'
import FormCreateEmployee from '../components/form/FormCreateEmployee';

const CreateEmployee = () => {
    const [visible, setVisible] = useState(false);
    const { addEmployee } = useEmployeeStore();

    const handleEmployeeSubmit = (employee) => {
        setVisible(true);
        addEmployee(employee);
    };

    return (
        <div className='app-main-container'>
            <Modale visible={visible} setVisibility={setVisible} content="Employee Created!" />
            <div className="content">
                <h2>Create Employee</h2>
                <FormCreateEmployee onSubmit={handleEmployeeSubmit} />
            </div>
        </div>
    );
};

export default CreateEmployee;
