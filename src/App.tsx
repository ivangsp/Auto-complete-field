import React, { useState } from 'react';
import { AutoCompleteField } from './components/AutoCompleteField';
import { searchByCountryName } from './utils/helper';
import { Country } from './utils/types';
import './App.css';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const handleOnsearch = async (name: string) => {
    try {
      const result = await searchByCountryName(name);
      setCountries(result as Country[]);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="appWrapper">
      <div className="appWrapperInner">
        <AutoCompleteField
          id="country"
          label="Search country by Name:"
          data={countries}
          onSearch={handleOnsearch}
        />
      </div>
    </div>
  );
}

export default App;
