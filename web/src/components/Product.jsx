import axios from 'axios'
import {useQuery} from 'react-query'

const getProducts = ()=>{
    return axios.get('http://localhost:8080/products')
}

export function Product(){
    const {data: products, isLoading, isError} = useQuery(['products'],getProducts)

    if(isLoading){
        return <div>Loading...</div>
    } else if(isError){
        return <div>Error Loading data</div>
    }

    return <table className='table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th className='text-end'>Price</th>
            </tr>
        </thead>
        <tbody>
            {products.data.map(product => 
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td className='text-end'>{product.price}</td>
                </tr>
            )}
        </tbody>
    </table>
}