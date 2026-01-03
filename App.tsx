import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import SuppliesPage from './pages/SuppliesPage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/supplies" element={<SuppliesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </Router>
        </DataProvider>
    );
};

export default App;