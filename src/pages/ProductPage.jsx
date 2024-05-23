import React from 'react';
import MyNavbar from '/src/components/MyNavbar';
import Product from '/src/components/Product';
import MyFooter from '/src/components/MyFooter';

function ProductPage() {
    return (
        <>
            <MyNavbar />
            <Product />
            <MyFooter />
        </>
    );
}

export default ProductPage;