import departmentsList from '../services/data/departments.json';
import statesList from '../services/data/states.json';
import Modale from '../components/modale/Modale';
import { Link } from 'react-router';
import { useState } from 'react';
import { useEmployeeStore } from '../stores';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/createEmployee.css'

const schema = yup.object().shape({
    firstName: yup.string().min(2, 'Le prénom doit contenir au moins 2 caractères.').required('Champ requis'),
    lastName: yup.string().min(2, 'Le nom doit contenir au moins 2 caractères.').required('Champ requis'),
    dateOfBirth: yup
        .date()
        .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
        })
        .required('La date de naissance est obligatoire.')
        .test('age', "L'employé doit avoir au moins 16 ans.", value => {
            if (!value) return false; // Verifie qu'il y a bien une valeur (date de naissance)
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear(); // Calcul de l'âge
            const month = today.getMonth() - birthDate.getMonth(); // calcul du mois
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--; // Si mois de l'anniv n'est pas encore passé on enlève 1 à l'âge de la personne
            }
            return age >= 16;
        }),
    startDate: yup.string().required('La date de début du contrat est obligatoire.'),
    street: yup.string().min(2, 'Le champ street doit contenir au moins 2 caractères.').required('Champ requis.'),
    city: yup.string().min(2, 'Le champ city doit contenir au moins 2 caractères.').required('Champ requis.'),
    state: yup.string().min(2, 'Le champ state doit contenir au moins 2 caractères.').required("Champ requis."),
    zip: yup.string().min(2, 'Le code postal est obligatoire.').required('Champ requis.'),
    department: yup.string().min(2, 'Le champ département doit contenir au moins 2 caractères.').required('Champ requis.'),
});

const CreateEmployee = () => {
    const [visible, setVisible] = useState(false);
    const { addEmployee } = useEmployeeStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const employee = {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth).toISOString().split('T')[0], // reformat la date en string et bon format
        };
        setVisible(true);
        addEmployee(employee);
        reset();
    };

    return (
        <div className='app-main-container'>
            <Modale visible={visible} setVisibility={setVisible} content="Employee Created!" />
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="content">
                <Link to='/employee-list'>View Current Employees</Link>
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="first-name">Prénom</label>
                        <input id="first-name" {...register('firstName')} />
                        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Nom</label>
                        <input id="last-name" {...register('lastName')} />
                        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date-of-birth">Date de naissance</label>
                        <input id="date-of-birth" type="date" {...register('dateOfBirth')} />
                        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="start-date">Date de début</label>
                        <input id="start-date" type="date" {...register('startDate')} />
                        {errors.startDate && <p className="error">{errors.startDate.message}</p>}
                    </div>
                    <fieldset className="address">
                        <legend>Adresse</legend>
                        <div className="form-group">
                            <label htmlFor="street">Rue</label>
                            <input id="street" {...register('street')} />
                            {errors.street && <p className="error">{errors.street.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Ville</label>
                            <input id="city" {...register('city')} />
                            {errors.city && <p className="error">{errors.city.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">État</label>
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
                            <label htmlFor="zipCode">Code postal</label>
                            <input id="zipCode" type="text" {...register('zip')} />
                            {errors.zip && <p className="error">{errors.zip.message}</p>}
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <label htmlFor="department">Département</label>
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
            </div>
        </div>
    );
};

export default CreateEmployee;
