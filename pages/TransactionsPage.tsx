import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import { Transaction } from '../types';
import { useData } from '../context/DataContext';

const TransactionsPage = () => {
    const { transactions, addTransaction, updateTransaction, deleteTransaction } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Transaction | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Transaction>>({
        desc: '', cat: 'Suministros', sub: '', qty: '', price: '', total: '', status: 'Pagado', icon: 'local_offer', color: 'gray'
    });

    const filtered = transactions.filter(t => t.desc.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalAmount = transactions.reduce((acc, curr) => {
         const val = parseFloat(curr.total.replace(/[^\d.-]/g, ''));
         return acc + (isNaN(val) ? 0 : val);
    }, 0);

    const handleOpenModal = (item?: Transaction) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({
                desc: '', cat: 'Suministros', sub: '', qty: '1', price: '', total: '', status: 'Pagado', icon: 'local_offer', color: 'gray'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple validation/defaults
        const newItem: Transaction = {
            id: editingItem ? editingItem.id : Date.now().toString(),
            desc: formData.desc || 'Nuevo Item',
            cat: formData.cat || 'General',
            sub: formData.sub || '',
            qty: formData.qty || '1',
            price: formData.price?.includes('S/') ? formData.price : `S/ ${formData.price || '0.00'}`,
            total: formData.total?.includes('S/') ? formData.total : `S/ ${formData.total || '0.00'}`,
            status: (formData.status as 'Pagado' | 'Pendiente') || 'Pagado',
            icon: formData.icon || 'local_offer',
            color: formData.color || 'blue',
            isDiscount: formData.isDiscount,
            isSpecial: formData.isSpecial
        };

        if (editingItem) {
            updateTransaction(newItem);
        } else {
            addTransaction(newItem);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        // Removed confirm dialog to ensure immediate action for validation
        deleteTransaction(id);
    };

    const handleEdit = (e: React.MouseEvent, item: Transaction) => {
        e.preventDefault();
        e.stopPropagation();
        handleOpenModal(item);
    };

    const handleExport = () => {
        const headers = ["Descripción", "Categoría", "Sub-Categoría", "Cant", "Precio", "Total", "Estado"];
        const csvContent = [
            headers.join(','),
            ...filtered.map(row => [
                `"${row.desc.replace(/"/g, '""')}"`,
                `"${row.cat}"`,
                `"${row.sub}"`,
                `"${row.qty}"`,
                `"${row.price}"`,
                `"${row.total}"`,
                `"${row.status}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `exportacion_transacciones_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <TopBar title="Transacciones" />
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark">
                    <div className="max-w-full mx-auto space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="relative w-full md:w-auto">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">search</span>
                                <input 
                                    className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all" 
                                    placeholder="Buscar item..." 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
                                <button type="button" onClick={handleExport} className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Exportar
                                </button>
                                <button type="button" onClick={() => handleOpenModal()} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Agregar Gasto
                                </button>
                            </div>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            <th className="px-6 py-4">Descripción del Item</th>
                                            <th className="px-6 py-4 text-center">Cant</th>
                                            <th className="px-6 py-4 text-right">Precio Unit.</th>
                                            <th className="px-6 py-4 text-right">Total</th>
                                            <th className="px-6 py-4 text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                        {filtered.map((tx) => (
                                            <tr key={tx.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors 
                                                ${tx.isDiscount ? 'bg-red-50/50 dark:bg-red-900/10' : ''} 
                                                ${tx.isSpecial ? 'font-semibold bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    <div>{tx.desc}</div>
                                                    <div className="text-xs text-gray-500">{tx.cat} - {tx.sub}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{tx.qty}</td>
                                                <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400">{tx.price}</td>
                                                <td className={`px-6 py-4 text-right font-semibold ${tx.isDiscount ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{tx.total}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button 
                                                            type="button"
                                                            onClick={(e) => handleEdit(e, tx)} 
                                                            className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            title="Editar"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={(e) => handleDelete(e, tx.id)} 
                                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                                            title="Eliminar"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filtered.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                                    No se encontraron transacciones.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot className="bg-gray-50 dark:bg-gray-800/50 border-t-2 border-gray-200 dark:border-gray-600">
                                        <tr>
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white text-right" colSpan={3}>TOTAL</td>
                                            <td className="px-6 py-4 font-bold text-primary dark:text-blue-400 text-right text-lg">S/ {totalAmount.toFixed(2)}</td>
                                            <td className="px-6 py-4"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingItem ? "Editar Transacción" : "Agregar Nuevo Gasto"}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                            <input 
                                required
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                                value={formData.desc || ''}
                                onChange={e => setFormData({...formData, desc: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                                <select 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.cat || 'Suministros'}
                                    onChange={e => setFormData({...formData, cat: e.target.value})}
                                >
                                    <option value="Proteínas">Proteínas</option>
                                    <option value="Verduras">Verduras</option>
                                    <option value="Condimentos">Condimentos</option>
                                    <option value="Suministros">Suministros</option>
                                    <option value="Eventos">Eventos</option>
                                    <option value="Bebidas">Bebidas</option>
                                    <option value="Servicio">Servicio</option>
                                    <option value="Descuento">Descuento</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sub-Categoría</label>
                                <input 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.sub || ''}
                                    onChange={e => setFormData({...formData, sub: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cant</label>
                                <input 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.qty || ''}
                                    onChange={e => setFormData({...formData, qty: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio</label>
                                <input 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.price || ''}
                                    onChange={e => setFormData({...formData, price: e.target.value})}
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total</label>
                                <input 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.total || ''}
                                    onChange={e => setFormData({...formData, total: e.target.value})}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button 
                                type="button" 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 mr-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-sm font-medium"
                            >
                                {editingItem ? 'Guardar Cambios' : 'Agregar Gasto'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </main>
        </div>
    );
};

export default TransactionsPage;