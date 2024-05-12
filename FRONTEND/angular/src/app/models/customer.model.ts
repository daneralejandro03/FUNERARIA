import { Subscription } from "./subscription.model";

export class Customer {
    id: number;
    name: string;
    email: string;
    identificationCard: string;
    address: string;
    phone_number: string;
    subscriptions?: Subscription[]
}
