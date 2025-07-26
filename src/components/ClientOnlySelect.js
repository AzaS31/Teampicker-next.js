'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';


const ClientOnlySelect = ({ styles = {}, ...props }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const customStyles = {
        ...styles,
        control: (provided) => ({
            ...provided,
            backgroundColor: '#ffffffff',
            color: '#fff',
            borderColor: '#444',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1f1f1f',
            color: '#fff',
            zIndex: 9999,
            maxHeight: '160px',
            overflowY: 'auto',
            position: 'absolute',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#333' : '#1f1f1f',
            color: '#fff',
            cursor: 'pointer',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#333',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
    };

    return isClient ? (
        <Select
            {...props}
            styles={customStyles}
            menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
            isClearable={false}
        />
    ) : null;
};

export default ClientOnlySelect;
