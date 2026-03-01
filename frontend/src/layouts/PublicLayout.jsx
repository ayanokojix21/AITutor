import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="public-layout min-h-screen">
            <Outlet />
        </div>
    );
};

export default PublicLayout;
