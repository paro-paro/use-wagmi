import { switchNetwork } from '@wagmi/core'
import type { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'
import { computed } from 'vue-demi'

import type { UnwrapRef } from 'vue-demi'

import { useClient } from '../../client'

import type { DeepMaybeRef, MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseSwitchNetworkArgs = DeepMaybeRef<Partial<SwitchNetworkArgs>>
export type UseSwitchNetworkConfig = MutationConfig<
  SwitchNetworkResult,
  Error,
  SwitchNetworkArgs
>

export const mutationKey = (args: UseSwitchNetworkArgs) =>
  [{ entity: 'switchNetwork', ...args }] as const

const mutationFn = (args: UnwrapRef<UseSwitchNetworkArgs>) => {
  const { chainId } = args
  if (!chainId) throw new Error('chainId is required')
  return switchNetwork({ chainId })
}

export function useSwitchNetwork({
  chainId,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSwitchNetworkArgs & UseSwitchNetworkConfig = {}) {
  const client = useClient()

  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(mutationKey({ chainId }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const support = computed<boolean>(() => !!client.connector?.switchChain)
  const chains = computed(() => client.chains ?? [])
  const pendingChainId = computed(() => variables.value?.chainId)

  const switchNetwork = (chainId_?: SwitchNetworkArgs['chainId']) =>
    mutate({ chainId: chainId_ ?? chainId } as SwitchNetworkArgs)

  const switchNetworkAsync = (chainId_?: SwitchNetworkArgs['chainId']) =>
    mutateAsync({ chainId: chainId_ ?? chainId } as SwitchNetworkArgs)

  return {
    support,
    chains,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingChainId,
    reset,
    status,
    switchNetwork,
    switchNetworkAsync,
    variables,
  }
}