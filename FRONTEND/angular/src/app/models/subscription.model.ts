import { Pay } from "./pay.model";

export class Subscription {
    id: number;
    subscription_type: string;
    start_date: Date;
    end_date: Date;
    state: boolean;
    customer_id?: number;
    plan_id?: number;
    pays: Pay[]
}
