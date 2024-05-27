export type IdType = `${string}-${string}-${string}-${string}-${string}`;

export interface DataType {
    id: IdType;
    name: string;
    cost: number;
}

export interface DataFormType {
    expenses: DataType[];
    incomes: DataType[];
}
