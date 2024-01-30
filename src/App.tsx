import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import {
  answerCapitalAndStoreWeight,
  getRandomCountry,
  loadCountriesAndCapitals,
} from "./services/countries";

function App() {
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");

  useEffect(() => {
    nextCountry();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCapital(event.target.value);
  };

  function nextCountry() {
    const randomCountry = getRandomCountry();

    if (!randomCountry) {
      throw Error("no country");
    }

    setCountry(randomCountry);
  }

  const handleClick = () => {
    console.log(capital);

    const correct = answerCapitalAndStoreWeight(country, capital);
    if (correct) {
      alert("too good!");
    } else {
      alert("ritenta!");
    }

    nextCountry();
  };

  const handleDebug = () => {
    console.log(loadCountriesAndCapitals());
  };

  return (
    <>
      <h1>Ciao Pace's daughter!</h1>
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          flexDirection: "column",
        }}
      >
        <div>{country}</div>
        <input type="text" value={capital} onChange={handleInputChange} />
        <button onClick={handleClick}>give your answer!</button>
      </div>
      <button onClick={handleDebug}>debug</button>
    </>
  );
}

export default App;
