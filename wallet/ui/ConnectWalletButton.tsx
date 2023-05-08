import { useConnect } from 'wagmi'

const ConnectWalletButton = () => {
    const { connect, connectors, isLoading, pendingConnector } = useConnect()

    return (
        <>
            {connectors.map((x) => (
                <button
                    key={x.name}
                    className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer"
                    onClick={() => connect({ connector: x })}
                >
                    Connect Wallet
                    {isLoading && x.id === pendingConnector?.id && ' …'}
                </button>
            ))}
        </>
    )
}

export default ConnectWalletButton
