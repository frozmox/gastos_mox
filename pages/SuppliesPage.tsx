import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import { SupplyItem } from '../types';
import { useData } from '../context/DataContext';

const SuppliesPage = () => {
    const { supplies, addSupply, updateSupply, deleteSupply } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SupplyItem | null>(null);

    const [formData, setFormData] = useState<Partial<SupplyItem>>({
        name: '', sub: '', cat: 'Suministros', qty: '', qtyClass: 'blue', status: 'En Stock', statusColor: 'green', icon: 'inventory', iconColor: 'gray'
    });

    const handleOpenModal = (item?: SupplyItem) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({
                name: '', sub: '', cat: 'Suministros', qty: '', qtyClass: 'blue', status: 'En Stock', statusColor: 'green', icon: 'inventory', iconColor: 'gray'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: SupplyItem = {
            id: editingItem ? editingItem.id : Date.now().toString(),
            name: formData.name || 'Nuevo Item',
            sub: formData.sub || '',
            cat: formData.cat || 'General',
            qty: formData.qty || '1',
            qtyClass: formData.qtyClass || 'blue',
            status: formData.status || 'En Stock',
            statusColor: formData.status === 'Bajo' ? 'yellow' : 'green',
            icon: formData.icon || 'inventory',
            iconColor: formData.iconColor || 'blue'
        };

        if (editingItem) {
            updateSupply(newItem);
        } else {
            addSupply(newItem);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        deleteSupply(id);
    };

    const handleEdit = (e: React.MouseEvent, item: SupplyItem) => {
        e.preventDefault();
        e.stopPropagation();
        handleOpenModal(item);
    };

    const handleMarkUsed = (e: React.MouseEvent, item: SupplyItem) => {
        e.preventDefault();
        e.stopPropagation();
        const updated = { ...item, status: 'Usado', statusColor: 'red', qty: '0' };
        updateSupply(updated);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <TopBar title="Suministros y Sobrantes">
                     <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span className="text-sm font-medium">Agregar Item</span>
                    </button>
                </TopBar>
                
                <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark">
                    <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Inventario Sobrante</h3>
                                <p className="text-sm text-gray-500 mt-1">Administra las cantidades restantes de eventos recientes.</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-4 w-1/3">Nombre del Producto</th>
                                        <th className="px-6 py-4">Categoría</th>
                                        <th className="px-6 py-4 text-center">Cantidad Restante</th>
                                        <th className="px-6 py-4 text-center">Estado</th>
                                        <th className="px-6 py-4 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {supplies.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-${item.iconColor}-100 dark:bg-${item.iconColor}-900/30 flex items-center justify-center text-${item.iconColor}-600 dark:text-${item.iconColor}-400 flex-shrink-0`}>
                                                        <span className="material-symbols-outlined">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white text-base">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.sub}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                    {item.cat}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full bg-${item.qtyClass}-50 text-${item.qtyClass}-700 dark:bg-${item.qtyClass}-900/30 dark:text-${item.qtyClass}-300 font-bold border border-${item.qtyClass}-100 dark:border-${item.qtyClass}-800`}>
                                                    {item.qty}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${item.statusColor}-100 text-${item.statusColor}-800 dark:bg-${item.statusColor}-900/30 dark:text-${item.statusColor}-400`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full bg-${item.statusColor}-500`}></span>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => handleEdit(e, item)} 
                                                        className="p-1.5 text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" 
                                                        title="Actualizar Cantidad"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">edit</span>
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => handleMarkUsed(e, item)} 
                                                        className="p-1.5 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" 
                                                        title="Marcar como Usado"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => handleDelete(e, item.id)} 
                                                        className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" 
                                                        title="Eliminar Item"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {supplies.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay suministros disponibles.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingItem ? "Editar Suministro" : "Agregar Nuevo Suministro"}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Producto</label>
                            <input 
                                required
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                                value={formData.name || ''}
                                onChange={e => setFormData({...formData, name: e.target.value})}
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
                                    <option value="Bebidas">Bebidas</option>
                                    <option value="Alcohol">Alcohol</option>
                                    <option value="Suministros">Suministros</option>
                                    <option value="Descartables">Descartables</option>
                                    <option value="Proteínas">Proteínas</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detalle/Sub</label>
                                <input 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.sub || ''}
                                    onChange={e => setFormData({...formData, sub: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cantidad</label>
                                <input 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.qty || ''}
                                    onChange={e => setFormData({...formData, qty: e.target.value})}
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                                <select 
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 outline-none"
                                    value={formData.status || 'En Stock'}
                                    onChange={e => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="En Stock">En Stock</option>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Agotado">Agotado</option>
                                </select>
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
                                {editingItem ? 'Guardar Cambios' : 'Agregar Item'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </main>
        </div>
    );
};

export default SuppliesPage;