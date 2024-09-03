import { FC, useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import fetchTokenPrices from '../../api';
import { TokenPrice } from '../../types';
import CustomSelect from '../CustomSelect/CustomSelect';
import styles from './Form.module.scss';

const Form: FC = () => {
  const [currencies, setCurrencies] = useState<TokenPrice[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const prices: TokenPrice[] = await fetchTokenPrices();
        setCurrencies(prices);
      } catch (err) {
        setError('Error retrieving data');
      }
    };
    getCurrencies();
  }, []);

  const handleConversion = async () => {
    if (!fromCurrency || !toCurrency || amount === '') {
      setError('Please select currencies and enter amount');
      setConversionRate(null);
      return;
    }

    setIsLoading(true);

    try {
      const fromPrice = currencies.find(
        price => price.currency === fromCurrency
      )?.price;
      const toPrice = currencies.find(
        price => price.currency === toCurrency
      )?.price;

      if (fromPrice === undefined || toPrice === undefined) {
        setError('The selected currency has no price');
        setConversionRate(null);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = (Number(amount) * fromPrice) / toPrice;
      setConversionRate(result);
      setError('');
    } catch (err) {
      setError('Error converting currencies');
      setConversionRate(null);
    }
    setIsLoading(false);
  };

  const getIconUrl = (currency: string) =>
    `https://raw.githubusercontent.com/Switcheo/token-icons/a2b9fa5b400f7aabc3ab25cef82db8f1ae8e79a2/tokens/${currency}.svg`;

  const currencyOptions = currencies.map(({ currency }) => ({
    value: currency,
    label: currency,
    iconUrl: getIconUrl(currency),
  }));

  return (
    <div className={styles.formContainer}>
      <h2>Currency Converter</h2>
      <div className={styles.selectContainer}>
        <CustomSelect
          options={currencyOptions}
          value={fromCurrency}
          onChange={setFromCurrency}
          placeholder="From"
        />
        <CustomSelect
          options={currencyOptions}
          value={toCurrency}
          onChange={setToCurrency}
          placeholder="To"
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className={styles.input}
          min="0"
        />
      </div>
      <button
        onClick={handleConversion}
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span>Converting...</span>
            <ClipLoader
              color="#fff"
              size={20}
              cssOverride={{ marginLeft: '10px' }}
            />
          </>
        ) : (
          'Convert'
        )}
      </button>
      {conversionRate !== null && (
        <div className={styles.result}>
          <p>
            {amount} {fromCurrency} = {conversionRate.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Form;
