import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const SettingsPage = () => {
    // Basic state for theme toggle to show interactivity
    const [theme, setTheme] = useState('system');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'light') {
            root.classList.remove('dark');
        } else {
             // System logic is simplified here; generally you'd check matchMedia
             // For this demo, we assume 'dark' is default as per initial HTML
             root.classList.add('dark');
        }
    }, [theme]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <TopBar title="Configuración" />
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <aside className="w-full lg:w-64 flex-shrink-0">
                                <nav className="space-y-1">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-l-4 border-primary text-primary font-medium rounded-r-lg shadow-sm transition-all text-left">
                                        <span className="material-symbols-outlined">person</span>
                                        General y Perfil
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all text-left">
                                        <span className="material-symbols-outlined">category</span>
                                        Categorías
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all text-left">
                                        <span className="material-symbols-outlined">notifications</span>
                                        Notificaciones
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all text-left">
                                        <span className="material-symbols-outlined">shield</span>
                                        Seguridad
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all text-left">
                                        <span className="material-symbols-outlined">group</span>
                                        Equipo
                                    </button>
                                </nav>
                                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                                        <div className="text-sm">
                                            <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">¿Necesitas ayuda?</p>
                                            <p className="text-blue-600 dark:text-blue-300">Revisa nuestra documentación para configuración avanzada.</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <div className="flex-1 space-y-6">
                                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Información del Perfil</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Actualiza la información de tu perfil y correo electrónico.</p>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="flex items-center gap-6">
                                            <img alt="Avatar Actual" className="w-20 h-20 rounded-full border-4 border-gray-100 dark:border-gray-700 object-cover" src="https://picsum.photos/id/64/200/200"/>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Foto de Perfil</h4>
                                                <div className="flex gap-3">
                                                    <button onClick={() => alert('Cambiar Foto')} className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cambiar</button>
                                                    <button onClick={() => alert('Eliminar Foto')} className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                                                <input className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm" type="text" defaultValue="Admin"/>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
                                                <input className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm" type="text" defaultValue="User"/>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
                                                <div className="relative">
                                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">mail</span>
                                                    <input className="w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm" type="email" defaultValue="admin@spendly.com"/>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biografía</label>
                                                <textarea className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm" placeholder="Breve descripción de tu perfil..." rows={3}></textarea>
                                                <p className="mt-1 text-xs text-gray-500">Breve descripción para tu perfil.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                        <button onClick={() => alert('Perfil Guardado!')} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Guardar Perfil</button>
                                    </div>
                                </div>
                                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preferencias de la Aplicación</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Administra tu idioma, moneda y configuración regional.</p>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idioma</label>
                                                <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm">
                                                    <option>Español (ES)</option>
                                                    <option>Inglés (US)</option>
                                                    <option>Portugués (BR)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Moneda</label>
                                                <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm">
                                                    <option>SOL (Nuevo Sol)</option>
                                                    <option>USD (Dólar)</option>
                                                    <option>EUR (Euro)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zona Horaria</label>
                                                <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm">
                                                    <option>Lima (GMT-5)</option>
                                                    <option>New York (GMT-5)</option>
                                                    <option>London (GMT+0)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Formato de Fecha</label>
                                                <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm">
                                                    <option>DD/MM/YYYY</option>
                                                    <option>MM/DD/YYYY</option>
                                                    <option>YYYY-MM-DD</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tema</h4>
                                            <div className="flex items-center gap-4">
                                                <label className={`relative flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                                    <input 
                                                        className="text-primary focus:ring-primary" 
                                                        name="theme" 
                                                        type="radio" 
                                                        checked={theme === 'system'}
                                                        onChange={() => setTheme('system')}
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Sistema</span>
                                                </label>
                                                <label className={`relative flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                                    <input 
                                                        className="text-primary focus:ring-primary" 
                                                        name="theme" 
                                                        type="radio"
                                                        checked={theme === 'light'}
                                                        onChange={() => setTheme('light')}
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Claro</span>
                                                </label>
                                                <label className={`relative flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                                    <input 
                                                        className="text-primary focus:ring-primary" 
                                                        name="theme" 
                                                        type="radio"
                                                        checked={theme === 'dark'}
                                                        onChange={() => setTheme('dark')}
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Oscuro</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                        <button onClick={() => alert('Preferencias Restablecidas!')} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm">Restablecer</button>
                                        <button onClick={() => alert('Preferencias Guardadas!')} className="ml-3 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Guardar Preferencias</button>
                                    </div>
                                </div>
                                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className="p-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notificaciones por Correo</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recibe correos sobre nuevas funciones y resúmenes semanales.</p>
                                        </div>
                                        <label className="inline-flex relative items-center cursor-pointer">
                                            <input defaultChecked className="sr-only peer" type="checkbox" onChange={() => alert('Configuración de notificaciones cambiada!')} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;