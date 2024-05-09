import { create } from 'zustand';

export interface FormType {
    id: number;
    content: string;
    isChecked: boolean;
}

interface TodoType {
    todo: [] | FormType[];
}

interface TodoStore extends TodoType {
    createTodo: (form: FormType) => void;
    updateTodo: (form: FormType) => void;
    deleteTodo: (id: number) => void;
    checkTodo: (id: number) => void;
}

const useTodo = create<TodoStore>((set) => ({
    todo: [],

    createTodo: (form) => set((state) => ({ todo: [...state.todo, form] })),

    updateTodo: (form) =>
        set((state) => ({
            todo: state.todo.map((item) => {
                if (item.id === form.id) {
                    return {
                        ...item,
                        content: form.content,
                    };
                }
                return item;
            }),
        })),

    deleteTodo: (id) =>
        set((state) => ({
            todo: state.todo.filter((item) => item.id !== id),
        })),

    checkTodo: (id) =>
        set((state) => ({
            todo: state.todo.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        isChecked: !item.isChecked,
                    };
                }
                return item;
            }),
        })),
}));

export default useTodo;
