import mockedCountries from '../mock-data/countries.json';
import { Country } from './types';

export const searchByCountryName = (name: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const countries = (mockedCountries as Country[])
        .filter((ctry) =>
          ctry.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      resolve(countries);
    });
  });
};
