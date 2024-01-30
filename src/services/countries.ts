import { countriesAndCapitals } from "./data";
type CapitalMap = {
  [capital: string]: { country: string; weight: number };
};

export const loadCountriesAndCapitals = (): CapitalMap => {
  const storedData = localStorage.getItem("countriesAndCapitals");

  if (!storedData) {
    const countries = Object.keys(countriesAndCapitals);

    return countries.reduce<CapitalMap>((acc, country) => {
      const capital = countriesAndCapitals[country].toLowerCase();

      acc[capital] = { country, weight: 1 };

      return acc;
    }, {});
  }

  return JSON.parse(storedData);
};

const saveCountriesAndCapitals = (map: CapitalMap) => {
  return localStorage.setItem("countriesAndCapitals", JSON.stringify(map));
};

export const getRandomCountry = () => {
  const data = loadCountriesAndCapitals();

  const totalProbability = Object.values(data)
    .map((v) => v.weight)
    .reduce((acc, number) => acc + number, 0);

  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const [, { country, weight }] of Object.entries(data)) {
    cumulativeProbability += weight;
    if (random <= cumulativeProbability) {
      return country;
    }
  }
};

export const answerCapital = (map: CapitalMap, capital: string): boolean => {
  const country = map[capital];

  return !!country;
};

export const answerCapitalAndStoreWeight = (
  country: string,
  capital: string,
): boolean => {
  const map = loadCountriesAndCapitals();

  const correct = answerCapital(map, capital);

  const foundCountry = Object.values(map).find((v) => v.country === country);

  if (!foundCountry) {
    throw Error(`something wrong with ${country}`);
  }

  if (correct) {
    foundCountry.weight--;
  } else {
    foundCountry.weight++;
  }

  saveCountriesAndCapitals(map);

  return correct;
};
