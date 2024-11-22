import 'react-toastify/dist/ReactToastify.css';

import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { PageProps } from '@/types';

export default function Toast() {
    const page = usePage<PageProps>();

    useEffect(() => {
        const toasts = page.props.auth.toasts || [];
        if (toasts.length > 0) {
            toasts.forEach((item) => {
                switch (item.type) {
                    case 'success':
                        toast.success(item.text);
                        break;
                    case 'error':
                        toast.error(item.text);
                        break;
                    case 'warning':
                        toast.warning(item.text);
                        break;
                    case 'info':
                        toast.info(item.text);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [page.props.auth.toasts]);

    return (
        <ToastContainer
            position={'bottom-right'}
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            draggable
            theme={'colored'}
        />
    );
}
