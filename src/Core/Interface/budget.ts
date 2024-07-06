import { LimitType } from "../Enums/LimitType";

export interface Budget {
    name: string;
    amountSpent: number;
    limitAmount: number;
    limitType: LimitType;
    id: number;
}