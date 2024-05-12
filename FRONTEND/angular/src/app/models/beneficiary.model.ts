import { Owner } from "./owner.model";

export class Beneficiary {
    id: number;
    identificationCard: string;
    beneficiary_status: string;
    address: string;
    phone_number: string;
    name: string;
    email: string;
    owner?: Owner; 
}
