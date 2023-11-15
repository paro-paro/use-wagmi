'use client'

import {
  type Config,
  type GetBalanceErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
  getBalanceQueryKey,
} from '@wagmi/core/query'
import type { GetBalanceQueryFnData } from '@wagmi/core/query'
import { computed, unref } from 'vue'

import type { ConfigParameter, QueryParameter, DeepMaybeRef } from '../types.js'
import { useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { cloneDeepUnref } from '../utils/cloneDeepUnref.js'

import type { UseQueryReturnType } from '@tanstack/vue-query'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = DeepMaybeRef<
  Evaluate<
    GetBalanceOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetBalanceQueryFnData,
        GetBalanceErrorType,
        selectData,
        GetBalanceQueryKey<config>
      >
  >
>

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceErrorType>

/** https://beta.wagmi.sh/react/api/hooks/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(parameters: UseBalanceParameters<config, selectData> = {}) {
  const { address, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const { queryFn } = getBalanceQueryOptions(config)
  const queryKey = computed(() => {
    const options = cloneDeepUnref({
      ...parameters,
      chainId,
    })
    return getBalanceQueryKey<config>(options)
  })

  const enabled = computed(() => {
    return Boolean(unref(address) && (unref(query)?.enabled ?? true))
  })

  return useQuery({
    ...query,
    queryKey,
    queryFn,
    enabled,
  }) as UseBalanceReturnType<selectData>
}
