import { useContext } from 'react';
import { AppContext } from './AppContext';
import { DataFormType, IdType } from '../type';

interface useAppType {
    state: DataFormType;
    addExpense: (data: { name: string; cost: number }) => void;
    deleteExpense: (id: IdType) => void;
    addIncome: (data: { name: string; cost: number }) => void;
    deleteIncome: (id: IdType) => void;
    updateData: (form: DataFormType) => void;
}

export const useApp: () => useAppType = () => {
    return useContext(AppContext) as useAppType;
};
