import { useEffect } from 'react';

export default function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // sparisce dopo 3 secondi
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='toast'>
            {message}
        </div>
    );
}
