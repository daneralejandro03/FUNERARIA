import { Beneficiary } from "./beneficiary.model";

export class Owner {
    id: number;
    identificationCard: string;
    address: string;
    phone_number: string;
    name: string;
    contract_status: string;
    email: string;
    beneficiaries?:Beneficiary[] 
}
