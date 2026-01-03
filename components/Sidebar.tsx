import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const linkClass = (path: string) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(path) 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

    return (
        <aside className="hidden md:flex flex-col w-64 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-700 h-full flex-shrink-0">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="bg-primary text-white p-2 rounded-lg">
                    <span className="material-icons-outlined text-xl">account_balance_wallet</span>
                </div>
                <h1 className="font-bold text-xl text-gray-800 dark:text-white">Spendly</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link to="/" className={linkClass('/')}>
                    <span className="material-icons-outlined">dashboard</span>
                    Resumen
                </Link>
                <Link to="/transactions" className={linkClass('/transactions')}>
                    <span className="material-icons-outlined">receipt_long</span>
                    Transacciones
                </Link>
                <Link to="/supplies" className={linkClass('/supplies')}>
                    <span className="material-icons-outlined">inventory_2</span>
                    Suministros
                </Link>
                <Link to="/settings" className={linkClass('/settings')}>
                    <span className="material-icons-outlined">settings</span>
                    Configuración
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <img alt="User Avatar" className="w-10 h-10 rounded-full object-cover" src="https://picsum.photos/id/64/200/200"/>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Gerente de Finanzas</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;