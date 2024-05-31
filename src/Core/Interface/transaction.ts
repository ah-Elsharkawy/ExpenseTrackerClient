export interface Transaction {
    id: number;
    amount: number;
    categoryId: number;
    type: number;
    date: Date;
    description: string;
}
