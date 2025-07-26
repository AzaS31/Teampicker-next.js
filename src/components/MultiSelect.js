'use client';

import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, value, onChange, placeholder }) => {
    return (
        <Select
            isMulti
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            noOptionsMessage={() => 'No available options'}
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: '#ccc',
                    minHeight: '38px',
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#e0e0e0',
                }),
            }}
        />
    );
};

export default MultiSelect;
