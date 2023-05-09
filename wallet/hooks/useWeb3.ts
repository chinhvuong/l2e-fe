import {
    ConnectorNames,
    WalletConnectorNotFoundError,
    WalletSwitchChainError,
} from '../types'
import { connectorLocalStorageKey } from '../config'
import { useCallback } from 'react'
import {
    ConnectorNotFoundError,
    SwitchChainError,
    SwitchChainNotSupportedError,
    useAccount,
    useConnect,
    useDisconnect,
    useNetwork,
    useSwitchNetwork,
} from 'wagmi'

const useWeb3 = () => {
    const { connectAsync, connectors } = useConnect()
    const { disconnectAsync } = useDisconnect()
    const account = useAccount()
    const network = useNetwork()
    const switchNetwork = useSwitchNetwork()

    const connect = useCallback(
        async (connectorID: ConnectorNames) => {
            const findConnector = connectors.find((c) => c.id === connectorID)
            try {
                const connected = await connectAsync({
                    connector: findConnector,
                })
                return connected
            } catch (error) {
                window?.localStorage?.removeItem(connectorLocalStorageKey)
                if (error instanceof ConnectorNotFoundError) {
                    throw new WalletConnectorNotFoundError()
                }
                if (
                    error instanceof SwitchChainNotSupportedError ||
                    error instanceof SwitchChainError
                ) {
                    throw new WalletSwitchChainError('SWITCH_NETWORK_ERROR')
                }
            }
            return undefined
        },
        [connectors, connectAsync],
    )

    const disconnect = useCallback(async () => {
        try {
            await disconnectAsync()
        } catch (error) {
            console.error(error)
        }
    }, [disconnectAsync])

    return {
        connect,

        connectAsync,
        disconnectAsync,
        ...network,
        ...switchNetwork,
        ...account,
        disconnect,
    }
}

export default useWeb3
