import { AxiosRequestConfig, Method } from 'axios';
import React from 'react';
import { request } from '../request';

export const useFetch = (callback: () => void): [string, boolean, () => void, React.Dispatch<React.SetStateAction<string>>] => {
    const [error, setError] = React.useState('');
    const [loaded, setLoaded] = React.useState(false);

    const fetch = async () => {
        try {
            await callback()
        } catch (e: any) {
            setError(e.message)
        }
        finally {
            setLoaded(true)
        }
    }

    return [error, loaded, fetch, setError]

}


