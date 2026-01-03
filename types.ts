export interface Transaction {
    id: string;
    desc: string;
    cat: string;
    sub: string;
    qty: string;
    price: string;
    total: string;
    status: 'Pagado' | 'Pendiente';
    icon: string;
    color: string;
    statusColor?: string;
    isDiscount?: boolean;
    isSpecial?: boolean;
}

export interface SupplyItem {
    id: string;
    name: string;
    sub: string;
    cat: string;
    qty: string;
    qtyClass: string;
    status: string;
    statusColor: string;
    icon: string;
    iconColor: string;
}

export interface ChartData {
    name: string;
    value: number;
    color: string;
}