import { ReactNode, createContext, useReducer } from 'react';
import { IdType, DataFormType, DataType } from '../type';

export const AppContext = createContext({});

const data: DataFormType = {
    expenses: [],
    incomes: [],
};

type CreateAction = DataType;
type DeleteAction = IdType;
type SetAction = number;
type UpdateAction = {
    incomes: DataType[];
    expenses: DataType[];
};

interface Action {
    type: 'ADD_EXPENSE' | 'DELETE_EXPENSE' | 'ADD_INCOMES' | 'DELETE_INCOMES' | 'UPDATE_DATA';
    payload: CreateAction | DeleteAction | SetAction | UpdateAction;
}

const reducer = (state: DataFormType, action: Action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload as CreateAction],
            };
        case 'DELETE_EXPENSE': {
            return {
                ...state,
                expenses: state.expenses.filter((item) => item.id !== (action.payload as DeleteAction)),
            };
        }
        case 'ADD_INCOMES':
            return {
                ...state,
                incomes: [...state.incomes, action.payload as CreateAction],
            };
        case 'DELETE_INCOMES': {
            return {
                ...state,
                incomes: state.incomes.filter((item) => item.id !== (action.payload as DeleteAction)),
            };
        }
        case 'UPDATE_DATA': {
            return {
                ...(action.payload as UpdateAction),
            };
        }
        default:
            return state;
    }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch]: [DataFormType, React.Dispatch<Action>] = useReducer(reducer, data);

    const addExpense = ({ name, cost }: { name: string; cost: number }) => {
        dispatch({
            type: 'ADD_EXPENSE',
            payload: {
                id: crypto.randomUUID(),
                name: name,
                cost: cost,
            },
        });
    };
    const deleteExpense = (id: IdType) => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id,
        });
    };
    const addIncome = ({ name, cost }: { name: string; cost: number }) => {
        dispatch({
            type: 'ADD_INCOMES',
            payload: {
                id: crypto.randomUUID(),
                name: name,
                cost: cost,
            },
        });
    };
    const deleteIncome = (id: IdType) => {
        dispatch({
            type: 'DELETE_INCOMES',
            payload: id,
        });
    };
    const updateData = (form: UpdateAction) => {
        dispatch({
            type: 'UPDATE_DATA',
            payload: {
                expenses: form.expenses,
                incomes: form.incomes,
            },
        });
    };

    return (
        <AppContext.Provider value={{ state, addExpense, deleteExpense, addIncome, deleteIncome, updateData }}>
            {children}
        </AppContext.Provider>
    );
};
