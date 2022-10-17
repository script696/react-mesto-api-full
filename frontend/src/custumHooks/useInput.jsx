import React, { useState } from 'react';
import useValidation from './useValidation';

const useInput = (initialVal, validations) => {
    const [val, setVal] = useState(initialVal);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(val, validations);

    const resetInput = () => {
        setVal('');
        setIsDirty(false);
    };

    const onChange = (e) => {
        setVal(e.target.value);
    };
    const onBlur = (e) => {
        setIsDirty(true);
    };
    return { val, setVal, resetInput, isDirty, onChange, onBlur, ...valid };
};

export default useInput;
