import { Beneficiary } from "./beneficiary.model";

export class Owner {
    id: number;
    contract_status: string;
    customer_id: number;
    beneficiaries?:Beneficiary[] 
}
