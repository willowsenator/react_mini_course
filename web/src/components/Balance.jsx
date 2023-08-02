import { useEffect, useState } from "react"
const {ethereum} = window
import {ethers} from 'ethers'
import {Web3Provider} from '@ethersproject/providers'

export function Balance(){
    const [account, setAccount]  = useState(null)
    const [balance, setBalance] = useState(null)
    
    useEffect(()=>{
        ethereum && ethereum.request({method: 'eth_requestAccounts'}).then(accounts =>{
            setAccount(accounts[0])
        })
        ethereum.on('accountsChange', (changedAccount)=>{
            setAccount(changedAccount)
        })
    },[])

    useEffect(()=>{
        const provider = new Web3Provider(ethereum)
        provider.getBalance(account).then(balance => {
            setBalance(ethers.formatEther(balance.toHexString()))
        })
    }, [account])

    if(!ethereum){
        return <div>Install an EVM Wallet</div>
    }
    return <div>
        <h1>{account ? account : 'Loading Account...'}</h1>
        <h2>{balance ? balance + ' ETH': 'Loading Balance...'}</h2>
        </div>
}