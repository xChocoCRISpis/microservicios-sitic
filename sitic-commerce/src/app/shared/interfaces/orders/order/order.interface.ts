export interface Order {
    id: number,
    total_Price: number,
    status?:string,
    created_At:Date,
    updated_At:Date,
}