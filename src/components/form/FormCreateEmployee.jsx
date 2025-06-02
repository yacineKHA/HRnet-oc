import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import departmentsList from '../../services/data/departments.json';
import statesList from '../../services/data/states.json';
import createEmployeeSchemaYup from '../../utils/createEmployeeSchemaYup';

const FormCreateEmployee = ({ onSubmit, defaultValues = {} }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(createEmployeeSchemaYup),
        defaultValues
    });

    const handleFormSubmit = (data) => {
        const employee = {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth).toISOString().split('T')[0],
        };
        onSubmit(employee);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input id="first-name" {...register('firstName')} />
                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Name</label>
                <input id="last-name" {...register('lastName')} />
                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="date-of-birth">Date of Birth</label>
                <input id="date-of-birth" type="date" {...register('dateOfBirth')} />
                {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="start-date">Start Date</label>
                <input id="start-date" type="date" {...register('startDate')} />
                {errors.startDate && <p className="error">{errors.startDate.message}</p>}
            </div>
            <fieldset className="address">
                <legend>Address</legend>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input id="street" {...register('street')} />
                    {errors.street && <p className="error">{errors.street.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input id="city" {...register('city')} />
                    {errors.city && <p className="error">{errors.city.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select id="state" {...register('state')}>
                        <option value="">-- Sélectionnez un état --</option>
                        {statesList.map((state) => (
                            <option key={state.abbreviation} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                    {errors.state && <p className="error">{errors.state.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input id="zipCode" type="text" {...register('zip')} />
                    {errors.zip && <p className="error">{errors.zip.message}</p>}
                </div>
            </fieldset>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <select id="department" {...register('department')}>
                    <option value="">-- Sélectionnez un département --</option>
                    {departmentsList.map((dpt) => (
                        <option key={dpt.label} value={dpt.value}>
                            {dpt.value}
                        </option>
                    ))}
                </select>
                {errors.department && <p className="error">{errors.department.message}</p>}
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default FormCreateEmployee;
