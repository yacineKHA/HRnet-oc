import { create } from 'zustand';

const useEmployeeStore = create((set) => ({
    // État initial
    formData: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        department: ''
    },

    employees: [], // Liste employés

    // Actions
    setField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value }
        })),

    addEmployee: (employee) =>
        set((state) => ({
            employees: [...state.employees, employee]
        })),

    submitForm: () => {
        const state = useEmployeeStore.getState();
        console.log("Employee created:", state.formData);
    },

    resetForm: () =>
        set({
            formData: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                startDate: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                department: ''
            },
        })
}));

export default useEmployeeStore;