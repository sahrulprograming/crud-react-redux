import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
});
export const addProducts = createAsyncThunk("products/addProducts", async ({ title, price }) => {
    const response = await axios.post("http://localhost:5000/products", {
        title,
        price
    });
    return response.data;
});
export const updateProducts = createAsyncThunk("products/updateProducts", async ({ id, title, price }) => {
    const response = await axios.patch(`http://localhost:5000/products/${id}`, {
        title,
        price
    });
    return response.data;
});
export const deleteProducts = createAsyncThunk("products/deleteProducts", async (id) => {
    await await axios.delete(`http://localhost:5000/products/${id}`);
    return id;
});

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
});

const productSlice = createSlice({
    name: 'product',
    initialState: productEntity.getInitialState(),
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            productEntity.setAll(state, action.payload);
        },
        [addProducts.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload);
        },
        [updateProducts.fulfilled]: (state, action) => {
            productEntity.updateOne(state, { id: action.payload.id, uodates: action.pyload });
        },
        [deleteProducts.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload);
        },
    }
})

export const productSelectors = productEntity.getSelectors(state => state.product)

export default productSlice.reducer;