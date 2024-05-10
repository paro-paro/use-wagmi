import { useMutation } from '@tanstack/vue-query'
import { type Connector, type DisconnectErrorType } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'

import { type Ref, computed } from 'vue-demi'
import type { ConfigParameter, MaybeRefDeep } from '../types.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<context = unknown> = Evaluate<
  MaybeRefDeep<ConfigParameter> & {
    mutation?:
      | UseMutationParameters<
          DisconnectData,
          DisconnectErrorType,
          DisconnectVariables,
          context
        >
      | undefined
  }
>

export type UseDisconnectReturnType<context = unknown> = Evaluate<
  UseMutationReturnType<
    DisconnectData,
    DisconnectErrorType,
    DisconnectVariables,
    context
  > & {
    connectors: Ref<readonly Connector[]>
    disconnect: DisconnectMutate<context>
    disconnectAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = {},
): UseDisconnectReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = disconnectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    connectors: computed(() =>
      useConnections({ config }).value.map(
        (connection) => connection.connector,
      ),
    ),
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
