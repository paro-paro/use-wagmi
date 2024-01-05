export const functions = [
  /* plugin */
  'UseWagmiPlugin',

  /* hooks */
  'useAccount',
  'useAccountEffect',
  'useBalance',
  'useBlock',
  'useBlockNumber',
  'useBlockTransactionCount',
  'useChainId',
  'useClient',
  'useConfig',
  'useConnect',
  'useConnections',
  'useConnectors',
  'useConnectorClient',
  'useDisconnect',
  'useEnsAddress',
  'useEnsAvatar',
  'useEnsName',
  'useEnsResolver',
  'useEstimateFeesPerGas',
  'useFeeData',
  'useEstimateGas',
  'useEstimateMaxPriorityFeePerGas',
  'useFeeHistory',
  'useGasPrice',
  'useInfiniteReadContracts',
  'useContractInfiniteReads',
  'usePublicClient',
  'useReadContract',
  'useContractRead',
  'useReadContracts',
  'useContractReads',
  'useReconnect',
  'useSendTransaction',
  'useSignMessage',
  'useSignTypedData',
  'useSimulateContract',
  'useSwitchAccount',
  'useSwitchChain',
  'useToken',
  'useTransaction',
  'useTransactionCount',
  'useVerifyMessage',
  'useVerifyTypedData',
  'useWalletClient',
  'useWaitForTransactionReceipt',
  'useWatchBlocks',
  'useWatchBlockNumber',
  'useWatchContractEvent',
  'useWatchPendingTransactions',
  'useWriteContract',
  'useContractWrite',

  /* @wagmi/core */
  // Config
  'createConfig',
  // Connector
  'createConnector',
  // Storage
  'createStorage',
  'noopStorage',
  // Transports
  'custom',
  'fallback',
  'http',
  'webSocket',
  'unstable_connector',
  // Utilities
  'cookieStorage',
  'cookieToInitialState',
  'deepEqual',
  'deserialize',
  'normalizeChainId',
  'parseCookie',
  'serialize',
]
