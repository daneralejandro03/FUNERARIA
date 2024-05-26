import { Subscription } from "./subscription.model";

export class Customer {
    id: number;
    address: string;
    phone_number: string;
    user_id: string
    subscriptions?: Subscription[]
}
