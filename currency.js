export default async function handler(req, res) {
  const { from, to, amount, date } = req.query;

  try {
    // Decide endpoint based on whether "date" is provided
    const endpoint = date
      ? `https://api.currencybeacon.com/v1/historical?api_key=${process.env.CURRENCYBEACON_KEY}&date=${date}&base=${from}&symbols=${to}`
      : `https://api.currencybeacon.com/v1/convert?api_key=${process.env.CURRENCYBEACON_KEY}&from=${from}&to=${to}&amount=${amount}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`CurrencyBeacon error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}