import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteProducts, getProducts, productSelectors } from '../features/productSlice';

const ShowProduct = () => {
    const { title, price } = useSelector(state => state.product)
    const dispatch = useDispatch();
    const products = useSelector(productSelectors.selectAll)

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
    return (
        <div className="box mt-5">
            <Link to={"add"} className="button is-success">Add New</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>TITLE</th>
                        <th>PRICE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`update/${product.id}`} className="button is-info is-small">Update</Link>
                                <button onClick={() => dispatch(deleteProducts(product.id))} className="button is-danger is-small">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowProduct