import { LimitType } from "../Enums/LimitType"

export interface UserCategory{
    categoryId:number | undefined,
    amount:number | undefined,
    limitType:LimitType|undefined
  }