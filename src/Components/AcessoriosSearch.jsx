import React from "react";
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import ProductList from '../data/Products.json'
import { AcessoriosFilterBar } from './VerticalFilterBar';
import { useParams } from 'react-router-dom';

function AcessoriosSearch() {
    const allProducts = ProductList.acessorios.map(product => product);
    console.log(allProducts);

    // Get all prices
    const prices = allProducts.map(product => product.price);
    const { searchTerm: urlSearchTerm } = useParams();
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([0, Math.max(...prices)]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [favorites, setFavorites] = useState(
        localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    );

    useEffect(() => {
        if (urlSearchTerm !== searchTerm) {
          setSearchTerm(urlSearchTerm);
        }
      }, [urlSearchTerm]);
      
      useEffect(() => {
        const newFilteredProducts = ProductList.acessorios.filter(product =>
          (selectedType.length === 0 || selectedType.includes(product.type)) &&
          (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
          product.price >= selectedPrices[0] && product.price <= selectedPrices[1] &&
          (selectedSizes.length === 0 || (product.size && selectedSizes.some(selectedSize => 
            product.size.includes(selectedSize)))) &&
          (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProducts(newFilteredProducts);
    }, [searchTerm, selectedBrands, selectedPrices, selectedSizes, selectedType]);
      console.log(selectedSizes);
    
    return (
        <>
            {searchTerm && <h2 style={{ fontSize: '2em', textAlign: "center" }}>Searching for: {searchTerm}</h2>}
            <div className="result-count" style={{ 
            textAlign: 'center', 
            fontSize: '20px', 
            color: '#333', 
            padding: '10px',  
            borderRadius: '5px', 
            margin: '10px 0' 
            }}>
            Resultados: {filteredProducts.length}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', height: '100%', alignItems: 'start' }}>
                <AcessoriosFilterBar
                    className={`filter`}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedPrices={selectedPrices}
                    setSelectedPrices={setSelectedPrices}
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />
                
                <div className={`product-list`} style={{padding: '0', margin: '0', boxSizing: 'border-box' }}>
                    {filteredProducts.map(product => (
                    <ProductCard category={'acessorios'} key={product.id} product={product} favorites={favorites} setFavorites={setFavorites}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AcessoriosSearch;