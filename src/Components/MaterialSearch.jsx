import { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import ProductList from '../data/Products.json'
import { MaterialFilterBar } from './VerticalFilterBar';

function MaterialSearch() {
  console.log('ShoeSearch');
  const allProducts = ProductList.material.map(product => product);
  console.log(allProducts);

  // Get all prices
  const prices = allProducts.map(product => product.price);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([0, Math.ceil(Math.max(...prices))]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [favorites, setFavorites] = useState(
    localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
  );


  useEffect(() => {
    // ...
}, [selectedBrands, selectedPrices]);
  
useEffect(() => {
  const newFilteredProducts = ProductList.material.filter(product =>
      (selectedType.length === 0 || selectedType.includes(product.type)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      product.price >= selectedPrices[0] && product.price <= selectedPrices[1]
  );
  setFilteredProducts(newFilteredProducts);
}, [selectedType, selectedBrands, selectedPrices]);
  console.log(filteredProducts);

  return (
    <>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', height: '100%', alignItems: 'start' }}>
      <MaterialFilterBar
        className={`filter`}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedPrices={selectedPrices}
        setSelectedPrices={setSelectedPrices}
      />
      
      <div className={`product-list`} style={{padding: '0', margin: '0', boxSizing: 'border-box' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} category={'material'} product={product} favorites={favorites} setFavorites={setFavorites}/>
        ))}
      </div>
      {/* other routes... */}
    </div>
    </>
  )
}

export default MaterialSearch;