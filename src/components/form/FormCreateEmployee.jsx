import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './formCreateEmployee.css';

const FormCreateEmployee = ({}) => {

    const schema = yup.object().shape({
        firstName: yup.string().min(2, 'Minimum 2 caractères').required('Champ requis'),
        lastName: yup.string().min(2, 'Minimum 2 caractères').required('Champ requis'),
    });

    return (
        <form>
            <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="date-of-birth">Date of Birth</label>
                <input id="date-of-birth" type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="start-date">Start Date</label>
                <input id="start-date" type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <fieldset className="address">
                <legend>Address</legend>

                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                        id="street"
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    >
                        {
                            statesList.map((state) => (
                                <option key={state.abbreviation}
                                    value={state.name}
                                >
                                    {state.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                        id="zipCode"
                        type="number"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </div>
            </fieldset>
            <label htmlFor="department">Department</label>
            <select name="department" id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >
                {
                    departmentsList.map((dpt) => (
                        <option key={dpt.label}
                            value={dpt.value}
                        >
                            {dpt.value}
                        </option>
                    ))
                }
            </select>
        </form>
    )
}

export default FormCreateEmployee;