import React, { useContext } from 'react';

const RadioGroupContext = React.createContext();

const useRadioGroup = () => useContext(RadioGroupContext);

export { RadioGroupContext, useRadioGroup };
