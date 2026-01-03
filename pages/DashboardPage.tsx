import React, { useMemo, useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useData } from '../context/DataContext';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280', '#EC4899'];

const DashboardPage = () => {
    const { transactions } = useData();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCategory, setFilterCategory] = useState('Todas');
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 6;

    // Helper to parse amount string to number
    const parseAmount = (val: any) => {
        if (typeof val !== 'string') return 0;
        const num = parseFloat(val.replace(/[^\d.-]/g, ''));
        return isNaN(num) ? 0 : num;
    };

    // Close filter menu on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Calculate chart data: Total Expenses per Category
    const chartData = useMemo(() => {
        const categoryTotals: { [key: string]: number } = {};
        let grandTotal = 0;

        transactions.forEach(t => {
            const amount = parseAmount(t.total);
            if (amount > 0) {
                categoryTotals[t.cat] = (categoryTotals[t.cat] || 0) + amount;
                grandTotal += amount;
            }
        });

        const data = Object.keys(categoryTotals).map((cat, index) => ({
            name: cat,
            value: parseFloat(categoryTotals[cat].toFixed(2)),
            color: COLORS[index % COLORS.length],
            percentage: ((categoryTotals[cat] / grandTotal) * 100).toFixed(1)
        }));

        return data.sort((a, b) => b.value - a.value);
    }, [transactions]);


    // Calculate total Expenses
    const totalExpenses = transactions.reduce((acc, curr) => {
        return acc + parseAmount(curr.total);
    }, 0);

    const itemsPurchased = transactions.length;

    // Find Top Category by expense
    const topCategoryItem = chartData.length > 0 ? chartData[0] : { name: 'N/A', percentage: 0 };
    const topCategory = topCategoryItem.name;
    const topCategoryPercent = topCategoryItem.percentage;

    // Filter Logic for Table
    const filteredTransactions = useMemo(() => {
        if (filterCategory === 'Todas') return transactions;
        return transactions.filter(t => t.cat === filterCategory);
    }, [transactions, filterCategory]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    
    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterCategory]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleFilterSelect = (category: string) => {
        setFilterCategory(category);
        setIsFilterMenuOpen(false);
    };

    const handleExport = () => {
         const headers = ["Descripción", "Categoría", "Sub-Categoría", "Cant", "Precio", "Total", "Estado"];
            const csvContent = [
                headers.join(','),
                ...filteredTransactions.map(row => [
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
                link.setAttribute('download', `transacciones_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
    }

    // Get unique categories for filter dropdown
    const categories = ['Todas', ...Array.from(new Set(transactions.map(t => t.cat)))];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <TopBar title="Resumen de Gastos" />
                <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Summary Cards */}
                        <div className="bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Gastos Totales</p>
                                    <h3 className="text-4xl lg:text-5xl font-extrabold mt-4 text-gray-900 dark:text-white tracking-tight">
                                        S/ {totalExpenses.toFixed(2)}
                                    </h3>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 rounded-xl">
                                    <span className="material-icons-outlined text-4xl">payments</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Items Comprados</p>
                                    <h3 className="text-4xl lg:text-5xl font-extrabold mt-4 text-gray-900 dark:text-white tracking-tight">{itemsPurchased}</h3>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                    <span className="material-icons-outlined text-4xl">shopping_bag</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-2">
                                <div className="overflow-hidden">
                                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Categoría Top</p>
                                    <h3 className="text-3xl lg:text-4xl font-bold mt-4 text-gray-900 dark:text-white truncate tracking-tight" title={topCategory}>{topCategory}</h3>
                                </div>
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl flex-shrink-0 ml-4">
                                    <span className="material-icons-outlined text-4xl">restaurant_menu</span>
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-base font-medium text-gray-500 dark:text-gray-400">{topCategoryPercent}% del gasto total</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Chart Section */}
                        <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-3xl text-gray-800 dark:text-white mb-2">Desglose por Categoría</h3>
                            <p className="text-base text-gray-500 mb-6">Distribución de gastos (en Soles) por categoría.</p>
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                                <div className="relative w-full md:w-1/2 h-72 flex justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                formatter={(value: any) => `S/ ${Number(value).toFixed(2)}`}
                                                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F1F5F9' }}
                                                itemStyle={{ color: '#F1F5F9' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full md:w-1/2 space-y-4 max-h-72 overflow-y-auto pr-2">
                                    {chartData.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                                                <span className="text-gray-700 dark:text-gray-200 font-medium truncate max-w-[120px]" title={item.name}>{item.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block font-bold text-gray-900 dark:text-white">S/ {item.value.toFixed(2)}</span>
                                                <span className="text-xs text-gray-500">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary Grid */}
                        <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                            <div className="text-center p-8 bg-blue-50 dark:bg-blue-900/10 rounded-xl mb-6">
                                <h3 className="font-bold text-3xl text-gray-800 dark:text-white mb-2">Resumen de Hoy</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300">Todos los gastos registrados para el evento.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <span className="block text-5xl font-extrabold text-primary mb-2">{itemsPurchased}</span>
                                    <span className="text-lg text-gray-500 font-medium">Items</span>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <span className="block text-5xl font-extrabold text-accent-green mb-2">{chartData.length}</span>
                                    <span className="text-lg text-gray-500 font-medium">Categorías</span>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <span className="block text-5xl font-extrabold text-yellow-500 mb-2">S/ {(totalExpenses / (itemsPurchased || 1)).toFixed(2)}</span>
                                    <span className="text-lg text-gray-500 font-medium">Costo Prom.</span>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <span className="block text-5xl font-extrabold text-red-500 mb-2">100%</span>
                                    <span className="text-lg text-gray-500 font-medium">Registrado</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden overflow-visible">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="font-bold text-3xl text-gray-800 dark:text-white">Transacciones Recientes</h3>
                            <div className="flex gap-2 relative" ref={filterRef}>
                                <button 
                                    onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors flex items-center gap-2 ${
                                        filterCategory !== 'Todas' 
                                            ? 'bg-primary/10 border-primary text-primary font-medium' 
                                            : 'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <span>{filterCategory === 'Todas' ? 'Filtrar' : filterCategory}</span>
                                    <span className="material-icons-outlined text-sm">{isFilterMenuOpen ? 'expand_less' : 'expand_more'}</span>
                                </button>
                                
                                {isFilterMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                                        <div className="py-1 max-h-60 overflow-y-auto">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => handleFilterSelect(cat)}
                                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                                        filterCategory === cat 
                                                            ? 'bg-primary/10 text-primary font-medium' 
                                                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button 
                                    onClick={handleExport}
                                    className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-1"
                                >
                                    <span className="material-icons-outlined text-sm">download</span> Exportar
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase font-bold text-xs tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Descripción</th>
                                        <th className="px-6 py-4">Categoría</th>
                                        <th className="px-6 py-4 text-center">Cantidad</th>
                                        <th className="px-6 py-4 text-right">Precio Unit.</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                        <th className="px-6 py-4 text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-base">
                                    {currentItems.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded bg-${row.color}-100 dark:bg-${row.color}-900/30 flex items-center justify-center text-${row.color}-600 dark:text-${row.color}-400`}>
                                                        <span className="material-icons-outlined text-sm">{row.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{row.desc}</p>
                                                        <p className="text-xs text-gray-500">{String(row.sub)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{row.cat}</td>
                                            <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">{row.qty}</td>
                                            <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-300">{row.price}</td>
                                            <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">{row.total}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    row.status === 'Pagado' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentItems.length === 0 && (
                                         <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No hay transacciones para mostrar.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> de <span className="font-medium">{filteredTransactions.length}</span> resultados
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Anterior
                                </button>
                                <button 
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;