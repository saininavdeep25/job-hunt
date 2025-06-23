import React, { useEffect } from 'react'; // Use import for React
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== 'Recruiter') {
            navigate("/");
        }
    }, [user, navigate]); // Add user and navigate to dependency array

    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRoute;
