import { useEffect, useState } from "react"
const {ethereum} = window
import {ethers} from 'ethers'
import {Web3Provider} from '@ethersproject/providers'
import {useForm} from 'react-hook-form'

export function Balance(){
    const [account, setAccount]  = useState(null)
    const [balance, setBalance] = useState(null)
    const [ok, setOk] = useState(null)
    const [ko, setKo] = useState(null)
    const {register, handleSubmit} = useForm()

    const resetVariables = ()=>{
        setOk(null)
        setKo(null)
    }

    
    useEffect(()=>{
        try{
            ethereum && ethereum.request({method: 'eth_requestAccounts'}).then(accounts =>{
                setAccount(accounts[0])
            })
            ethereum.on('accountsChange', (changedAccount)=>{
                setAccount(changedAccount)
            })
        } catch(err){
            const {message} = err
            setKo(message)
        }
    },[])
    useEffect(()=>{
        try{
            resetVariables()
            const provider = new Web3Provider(ethereum)
            provider.getBalance(account).then(balance => {
                setBalance(ethers.formatEther(balance.toHexString()))
            })
        } catch(err){
            const {message} = err
            setKo(message)
        }
    }, [account])

    const submit = async(data) => {
        try{
            resetVariables()
            const params = {
                from: account,
                to: data.account,
                value: ethers.parseEther(data.amount)
            }
            const txHash = await ethereum.request({method: 'eth_sendTransaction', params: [params]})
            setOk("Successful transaction with hash: " + txHash)
        } catch(err){
            const {message} = err;
            setKo(message)
        }
    }

    if(!ethereum){
        return <div>Install an EVM Wallet</div>
    }
    return <div>
        <p><strong>Account: </strong>{account ? account : 'Loading Account...'}</p>
        <p><strong>Balance: </strong>{balance ? balance + ' ETH':  'Loading Balance...'}</p>
        
        <form className="form-inline" onSubmit={handleSubmit(submit)}>
            <div className="form-group mb-3">
                <label htmlFor="account">Account:</label>
                <input id="account" className="form-control" {...register("account")}></input>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="amount">Amount:</label>
                <input id="amount" className="form-control" {...register("amount")}></input>
            </div>
            <button type="submit" class="btn btn-primary mb-3">Send</button>
        </form>
        {ok && <div className="alert alert-success mt-3">{ok}</div>}
        {ko && <div className="alert alert-danger mt-3">{ko}</div>}
        </div>
}