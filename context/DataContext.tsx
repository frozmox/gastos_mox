import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, SupplyItem } from '../types';

interface DataContextType {
    transactions: Transaction[];
    supplies: SupplyItem[];
    addTransaction: (t: Transaction) => void;
    updateTransaction: (t: Transaction) => void;
    deleteTransaction: (id: string) => void;
    addSupply: (s: SupplyItem) => void;
    updateSupply: (s: SupplyItem) => void;
    deleteSupply: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
    { id: 't1', desc: 'Vinagre Florida 625', cat: 'Condimentos', sub: 'Despensa', qty: '1 unid', price: 'S/ 3.70', total: 'S/ 3.70', status: 'Pagado', icon: 'kitchen', color: 'gray' },
    { id: 't2', desc: 'Mini burger Bonbeef', cat: 'Proteínas', sub: 'Carne', qty: '2 unid', price: 'S/ 38.50', total: 'S/ 77.00', status: 'Pagado', icon: 'lunch_dining', color: 'red' },
    { id: 't3', desc: 'Lechuga crespa 250 g', cat: 'Verduras', sub: 'Fresco', qty: '1 unid', price: 'S/ 3.80', total: 'S/ 3.80', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't4', desc: 'Lechuga americana empacada', cat: 'Verduras', sub: 'Fresco', qty: '1 unid', price: 'S/ 2.19', total: 'S/ 2.19', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't5', desc: 'Pimiento', cat: 'Verduras', sub: 'Fresco', qty: '1.214 kg', price: 'S/ 10.00/kg', total: 'S/ 12.14', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't6', desc: 'Huevos pardos x15', cat: 'Proteínas', sub: 'Lácteos', qty: '1 unid', price: 'S/ 10.99', total: 'S/ 10.99', status: 'Pagado', icon: 'egg', color: 'orange' },
    { id: 't7', desc: 'Tomate cherry 250 g', cat: 'Verduras', sub: 'Fresco', qty: '1 unid', price: 'S/ 6.49', total: 'S/ 6.49', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't8', desc: 'Mostaza (95 g)', cat: 'Condimentos', sub: 'Despensa', qty: '1 unid', price: 'S/ 3.90', total: 'S/ 3.90', status: 'Pagado', icon: 'kitchen', color: 'yellow' },
    { id: 't9', desc: 'Palitos anticucho/brocheta 50 unid', cat: 'Suministros', sub: 'Herramientas', qty: '1 unid', price: 'S/ 6.90', total: 'S/ 6.90', status: 'Pagado', icon: 'inventory', color: 'gray' },
    { id: 't10', desc: 'Platos bagazo 15 cm', cat: 'Suministros', sub: 'Descartables', qty: '1 unid', price: 'S/ 4.99', total: 'S/ 4.99', status: 'Pagado', icon: 'inventory', color: 'gray' },
    { id: 't11', desc: 'Perejil', cat: 'Verduras', sub: 'Fresco', qty: '1 unid', price: 'S/ 1.19', total: 'S/ 1.19', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't12', desc: 'Apio', cat: 'Verduras', sub: 'Fresco', qty: '1 unid', price: 'S/ 4.99', total: 'S/ 4.99', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't13', desc: 'Papel toalla (50 m)', cat: 'Suministros', sub: 'Limpieza', qty: '1 unid', price: 'S/ 5.90', total: 'S/ 5.90', status: 'Pagado', icon: 'cleaning_services', color: 'blue' },
    { id: 't14', desc: 'Papas cocktail', cat: 'Verduras', sub: 'Fresco', qty: '2.912 kg', price: 'S/ 3.90/kg', total: 'S/ 11.35', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't15', desc: 'Limón', cat: 'Verduras', sub: 'Fresco', qty: '1.148 kg', price: 'S/ 3.19/kg', total: 'S/ 3.66', status: 'Pagado', icon: 'spa', color: 'green' },
    { id: 't16', desc: 'Pollo pechuga (Pech. Esp. Light)', cat: 'Proteínas', sub: 'Aves', qty: '4.052 kg', price: 'S/ 18.90/kg', total: 'S/ 76.55', status: 'Pagado', icon: 'restaurant', color: 'red' },
    { id: 't17', desc: 'Vino Intipalka Quebranta', cat: 'Bebidas', sub: 'Alcohol', qty: '4 unid', price: 'S/ 35.90', total: 'S/ 143.60', status: 'Pagado', icon: 'wine_bar', color: 'purple' },
    { id: 't18', desc: 'Sprite 3 L', cat: 'Bebidas', sub: 'Gaseosa', qty: '1 unid', price: 'S/ 6.70', total: 'S/ 6.70', status: 'Pagado', icon: 'local_drink', color: 'yellow' },
    { id: 't19', desc: 'Queso fundido Laive 12 tajadas', cat: 'Proteínas', sub: 'Lácteos', qty: '1 unid', price: 'S/ 12.90', total: 'S/ 12.90', status: 'Pagado', icon: 'egg', color: 'orange' },
    { id: 't20', desc: 'Agua San Mateo sin gas 2.5 L', cat: 'Bebidas', sub: 'Agua', qty: '2 unid', price: 'S/ 3.50', total: 'S/ 7.00', status: 'Pagado', icon: 'water_drop', color: 'blue' },
    { id: 't21', desc: 'Petit pan (Pan petipán x600)', cat: 'Proteínas', sub: 'Panadería', qty: '3 unid', price: 'S/ 4.50', total: 'S/ 13.50', status: 'Pagado', icon: 'bakery_dining', color: 'orange' },
    { id: 't22', desc: 'Schweppes 1.5 L', cat: 'Bebidas', sub: 'Gaseosa', qty: '2 unid', price: 'S/ 6.60', total: 'S/ 13.20', status: 'Pagado', icon: 'local_drink', color: 'yellow' },
    { id: 't23', desc: 'Chimichurri', cat: 'Condimentos', sub: 'Salsa', qty: '1 unid', price: 'S/ 8.70', total: 'S/ 8.70', status: 'Pagado', icon: 'ramen_dining', color: 'orange' },
    { id: 't24', desc: 'Salsa picante (TT 250)', cat: 'Condimentos', sub: 'Salsa', qty: '1 unid', price: 'S/ 8.70', total: 'S/ 8.70', status: 'Pagado', icon: 'ramen_dining', color: 'red' },
    { id: 't25', desc: 'Ají de la casa', cat: 'Condimentos', sub: 'Salsa', qty: '1 unid', price: 'S/ 8.70', total: 'S/ 8.70', status: 'Pagado', icon: 'ramen_dining', color: 'orange' },
    { id: 't26', desc: 'Bebida/Jugo naranja', cat: 'Bebidas', sub: 'Jugo', qty: '2 unid', price: 'S/ 5.50', total: 'S/ 11.00', status: 'Pagado', icon: 'local_bar', color: 'orange' },
    { id: 't27', desc: 'Ají parrillero', cat: 'Condimentos', sub: 'Salsa', qty: '1 unid', price: 'S/ 8.70', total: 'S/ 8.70', status: 'Pagado', icon: 'ramen_dining', color: 'red' },
    { id: 't28', desc: 'Coca Cola 3 L', cat: 'Bebidas', sub: 'Gaseosa', qty: '1 unid', price: 'S/ 12.40', total: 'S/ 12.40', status: 'Pagado', icon: 'local_drink', color: 'red' },
    { id: 't29', desc: 'Fanta/Kola Inglesa 3 L', cat: 'Bebidas', sub: 'Gaseosa', qty: '1 unid', price: 'S/ 6.70', total: 'S/ 6.70', status: 'Pagado', icon: 'local_drink', color: 'orange' },
    { id: 't30', desc: 'Descuento Tottus', cat: 'Descuento', sub: 'Cupón', qty: '-', price: '-', total: '-S/ 4.20', status: 'Pagado', icon: 'local_offer', color: 'red', isDiscount: true },
    { id: 't31', desc: 'Hielo Repshop 3.5 kg', cat: 'Suministros', sub: 'Hielo', qty: '2 unid', price: 'S/ 7.90', total: 'S/ 15.80', status: 'Pagado', icon: 'ac_unit', color: 'blue' },
    { id: 't32', desc: 'Envío Repshop', cat: 'Servicio', sub: 'Delivery', qty: '1', price: 'S/ 8.90', total: 'S/ 8.90', status: 'Pagado', icon: 'local_shipping', color: 'gray' },
    { id: 't33', desc: 'Recargo por no llegar al mínimo', cat: 'Servicio', sub: 'Tarifa', qty: '1', price: 'S/ 1.90', total: 'S/ 1.90', status: 'Pagado', icon: 'attach_money', color: 'gray' },
    { id: 't34', desc: 'Deco- Lentes', cat: 'Eventos', sub: 'Fiesta', qty: '4 unid', price: 'S/ 2.50', total: 'S/ 10.00', status: 'Pagado', icon: 'celebration', color: 'purple', isSpecial: true },
    { id: 't35', desc: 'Deco - “Feliz año nuevo”', cat: 'Eventos', sub: 'Fiesta', qty: '1 unid', price: 'S/ 5.00', total: 'S/ 5.00', status: 'Pagado', icon: 'celebration', color: 'purple', isSpecial: true },
    { id: 't36', desc: 'Deco - Adorno amarillo', cat: 'Eventos', sub: 'Fiesta', qty: '2 unid', price: 'S/ 4.00', total: 'S/ 8.00', status: 'Pagado', icon: 'celebration', color: 'yellow', isSpecial: true },
    { id: 't37', desc: 'Deco - Collares', cat: 'Eventos', sub: 'Fiesta', qty: '6 unid', price: 'S/ 1.00', total: 'S/ 6.00', status: 'Pagado', icon: 'celebration', color: 'purple', isSpecial: true },
    { id: 't38', desc: 'Bebidas - Vino', cat: 'Bebidas', sub: 'Alcohol', qty: '3 unid', price: 'S/ 13.00', total: 'S/ 39.00', status: 'Pagado', icon: 'wine_bar', color: 'purple' },
    { id: 't39', desc: 'Bebidas - Jarabe Goma', cat: 'Bebidas', sub: 'Mezclador', qty: '1 unid', price: 'S/ 10.00', total: 'S/ 10.00', status: 'Pagado', icon: 'local_bar', color: 'gray' },
    { id: 't40', desc: 'OPERACIONES - Carbón', cat: 'Suministros', sub: 'Combustible', qty: '5 kg', price: 'S/ 5.00/kg', total: 'S/ 25.00', status: 'Pagado', icon: 'local_fire_department', color: 'gray' },
];

const initialSupplies: SupplyItem[] = [
    { id: 's1', name: 'Inca Kola 3L', sub: 'Exp: 12/2024', cat: 'Bebidas', qty: '3 Botellas', qtyClass: 'blue', status: 'En Stock', statusColor: 'green', icon: 'local_drink', iconColor: 'yellow' },
    { id: 's2', name: 'Pisco Quebranta', sub: 'Botella abierta', cat: 'Alcohol', qty: '1.5 Botellas', qtyClass: 'orange', status: 'Bajo', statusColor: 'yellow', icon: 'liquor', iconColor: 'purple' },
    { id: 's3', name: 'Hielo 3.5kg', sub: 'Congelador 1', cat: 'Suministros', qty: '2 Bolsas', qtyClass: 'blue', status: 'En Stock', statusColor: 'green', icon: 'ac_unit', iconColor: 'cyan' },
    { id: 's4', name: 'Vasos Descartables', sub: 'Estante A2', cat: 'Descartables', qty: '45 Unidades', qtyClass: 'blue', status: 'En Stock', statusColor: 'green', icon: 'local_cafe', iconColor: 'gray' },
    { id: 's5', name: 'Servilletas', sub: 'Paquete grande', cat: 'Suministros', qty: '2 Paquetes', qtyClass: 'blue', status: 'En Stock', statusColor: 'green', icon: 'cleaning_services', iconColor: 'gray' },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [supplies, setSupplies] = useState<SupplyItem[]>(initialSupplies);

    const addTransaction = (t: Transaction) => setTransactions(prev => [t, ...prev]);
    const updateTransaction = (t: Transaction) => setTransactions(prev => prev.map(item => item.id === t.id ? t : item));
    const deleteTransaction = (id: string) => setTransactions(prev => prev.filter(item => item.id !== id));

    const addSupply = (s: SupplyItem) => setSupplies(prev => [s, ...prev]);
    const updateSupply = (s: SupplyItem) => setSupplies(prev => prev.map(item => item.id === s.id ? s : item));
    const deleteSupply = (id: string) => setSupplies(prev => prev.filter(item => item.id !== id));

    return (
        <DataContext.Provider value={{ 
            transactions, supplies, 
            addTransaction, updateTransaction, deleteTransaction, 
            addSupply, updateSupply, deleteSupply 
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};