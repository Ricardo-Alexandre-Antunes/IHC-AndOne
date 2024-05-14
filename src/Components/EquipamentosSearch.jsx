import { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import ProductList from '../data/Products.json'
import { EquipamentosFilterBar } from './VerticalFilterBar';
import { useParams } from 'react-router-dom';

function EquipamentosSearch() {
  console.log('ShoeSearch');
  const allProducts = ProductList.equipamentos.map(product => product);
  console.log(allProducts);

  // Get all prices
  const prices = allProducts.map(product => product.price);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([0, Math.ceil(Math.max(...prices))]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [favorites, setFavorites] = useState(
    localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
  );


  useEffect(() => {
    console.log('Product sizes:', ProductList.equipamentos.map(product => product.size));
    console.log('Selected sizes:', selectedSizes);
    // ...
}, [selectedTeams, selectedBrands, selectedSizes, selectedPrices]);
  
useEffect(() => {
  const newFilteredProducts = ProductList.equipamentos.filter(product =>
      (selectedTeams.length === 0 || selectedTeams.includes(product.team)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      (selectedSizes.length === 0 || product.size.some(size => selectedSizes.includes(size))) &&
      product.price >= selectedPrices[0] && product.price <= selectedPrices[1]
  );
  setFilteredProducts(newFilteredProducts);
}, [selectedTeams, selectedBrands, selectedSizes, selectedPrices]);
  console.log(selectedSizes);
  console.log(filteredProducts);

  return (
    <>
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
      <EquipamentosFilterBar
        className={`filter`}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedTeams={selectedTeams}
        setSelectedTeams={setSelectedTeams}
        selectedPrices={selectedPrices}
        setSelectedPrices={setSelectedPrices}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
      />
      
      <div className={`product-list`} style={{padding: '0', margin: '0', boxSizing: 'border-box' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} category={'equipamentos'} product={product} favorites={favorites} setFavorites={setFavorites}/>
        ))}
      </div>
      {/* other routes... */}
    </div>
    </>
  )
}

export default EquipamentosSearch;