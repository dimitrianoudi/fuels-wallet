import { Provider } from 'fuels';

const providers: {
  [key: string]: Provider;
} = {};

export const getGasConfig = async (provider: Provider) => {
  const chain = await provider.getChain();
  const gasPrice = await provider.getLatestGasPrice();
  const txParameters = chain.consensusParameters.txParameters;
  const feeParameters = chain.consensusParameters.feeParameters;

  return {
    gasLimit: txParameters.maxGasPerTx.div(2),
    gasPrice,
    gasPriceFactor: feeParameters.gasPriceFactor,
  };
};

export const createProvider = async (url: string) => {
  if (providers[url]) {
    return providers[url];
  }
  providers[url] = new Provider(url);
  return providers[url];
};
