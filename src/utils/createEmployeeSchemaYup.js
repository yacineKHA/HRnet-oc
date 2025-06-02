import * as yup from 'yup';
import { getAge } from '../utils/utilsFonctions';

const createEmployeeSchemaYup = yup.object().shape({
    firstName: yup.string().min(2, 'Le prénom doit contenir au moins 2 caractères.').required('Champ requis'),
    lastName: yup.string().min(2, 'Le nom doit contenir au moins 2 caractères.').required('Champ requis'),
    dateOfBirth: yup
        .date()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .required('La date de naissance est obligatoire.')
        .test('age', "L'employé doit avoir au moins 16 ans.", value => {
            if (!value) return false;
            return getAge(value) >= 16;
        }),
    startDate: yup.string().required('La date de début du contrat est obligatoire.'),
    street: yup.string().min(2, 'Le champ street doit contenir au moins 2 caractères.').required('Champ requis.'),
    city: yup.string().min(2, 'Le champ city doit contenir au moins 2 caractères.').required('Champ requis.'),
    state: yup.string().min(2, 'Le champ state doit contenir au moins 2 caractères.').required("Champ requis."),
    zip: yup.string().min(2, 'Le code postal est obligatoire.').required('Champ requis.'),
    department: yup.string().min(2, 'Le champ département doit contenir au moins 2 caractères.').required('Champ requis.'),
});

export default createEmployeeSchemaYup;
