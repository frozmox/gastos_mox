import React, { useState, useRef, useEffect } from 'react';

interface TopBarProps {
    title: string;
    children?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, children }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (hasUnread && !showNotifications) {
            setHasUnread(false);
        }
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 md:h-20 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 z-10 flex-shrink-0 relative">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                    <span className="material-icons-outlined">menu</span>
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                {children}
                
                {/* Notification Area */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={toggleNotifications}
                        className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors relative focus:outline-none"
                    >
                        <span className="material-icons-outlined">notifications</span>
                        {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                    </button>
                    
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-card-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 origin-top-right transition-all">
                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
                                <span className="text-xs text-primary cursor-pointer hover:underline">Marcar leídas</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 flex-shrink-0">
                                            <span className="material-symbols-outlined text-sm">warning</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Stock Bajo</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pisco Quebranta se está agotando (1.5 Botellas).</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Hace 2 horas</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <span className="material-symbols-outlined text-sm">receipt</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Nueva Transacción</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Nuevo gasto agregado: Carbón (5kg).</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Hace 5 horas</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 flex-shrink-0">
                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Sistema Actualizado</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Respaldo completado exitosamente.</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Hace 1 día</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
                                <button className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">Ver todas</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;