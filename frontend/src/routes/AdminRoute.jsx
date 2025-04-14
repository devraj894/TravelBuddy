import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <p className='text-center'>
                <span className="loading loading-ring loading-lg"></span>
            </p>)
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default AdminRoute;

