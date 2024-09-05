// script.js
document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
  
    // Function to fetch exchange rate and convert
    const convertCurrency = async () => {
      const amount = amountInput.value;
      const from = fromCurrency.value;
      const to = toCurrency.value;
  
      if (!amount || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
      }
  
      try {
        // Fetch exchange rates from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
  
        if (response.ok && data) {
          const rate = data.rates[to];
          if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
          } else {
            resultDiv.textContent = 'Currency not supported.';
          }
        } else {
          resultDiv.textContent = 'Error fetching exchange rate.';
        }
      } catch (error) {
        resultDiv.textContent = 'Unable to fetch exchange rate. Try again later.';
        console.error('Error fetching data:', error);
      }
    };
  
    // Event listener for button click
    convertButton.addEventListener('click', convertCurrency);
  });
  