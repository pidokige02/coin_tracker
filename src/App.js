import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  //input
  const [money, setMoney] = useState(0);
  const onChange = (event) => {
      setMoney(event.target.value);
  };
  //coin
  const [coinValue, setCoinValue] = useState(0);
  const changeMoney = (event) => {
    setCoinValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={changeMoney}>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    <hr />
    <form action=''>
        <label htmlFor='input'>
          {" "}
          <strong> Write the money you have</strong>
        </label>
        <br />
        <input
          id='input'
          type='number'
          placeholder='Write the money'
          value={money}
          onChange={onChange}
        />

        <h3>You can buy {(money / coinValue).toFixed(1)} coin</h3>
      </form>
    </div>
  );
}

export default App;