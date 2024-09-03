import { TokenPrice } from './types';
import prices from './prices.json';

type TokenPrices = TokenPrice[];

const fetchTokenPrices = async (): Promise<TokenPrices> => {
  return new Promise(resolve => resolve(prices));
};

export default fetchTokenPrices;
