import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import 'rc-slider/assets/index.css';
import './VerticalFilterBar.css';
import ProductList from '../data/Products.json';

const ShoeFilterBar = ({ selectedBrands, setSelectedBrands, selectedPrices, setSelectedPrices, selectedSizes, setSelectedSizes}) => {
    const [brandOpen, setBrandOpen] = useState(true); // Set initial state to true
    const [sizeOpen, setSizeOpen] = useState(true); // Set initial state to true
    const [priceOpen, setPriceOpen] = useState(true);
    
    const brands = ['Nike', 'Adidas', 'Reebok', 'Converse', 'New Balance', 'Under Armour']; // Define your brands here
    const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];; // Define your sizes here
    
    const handleBrandChange = (event) => {
        event.stopPropagation();
      
        const brand = event.target.value;
        if (selectedBrands.includes(brand)) {
          setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
          setSelectedBrands([...selectedBrands, brand]);
        }
    };
    
      const handleSizeChange = (event) => {
        event.stopPropagation();
      
        const size = Number(event.target.value);
        setSelectedSizes(prevSizes => prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]);
        };
    return (
        <div className='container'>
            <div className={`filter-bar`}>
                <h2 className='unselectable'>Filtros</h2>
                <div className="accordion">
                    <h3 className='unselectable' onClick={(event) => {
                if (event.target.type !== 'checkbox') {
                    setBrandOpen(!brandOpen);
                }
                }}>Marca <FontAwesomeIcon icon={brandOpen ? faChevronUp : faChevronDown} /></h3>
                    {brandOpen && (brands || []).map(brand => (
                        <div key={brand}>
                            <input
                                type="checkbox"
                                id={brand}
                                name="brand"
                                value={brand}
                                checked={selectedBrands.includes(brand)}
                                onChange={handleBrandChange}
                                className='unselectable'
                            />
                            <label htmlFor={brand} className='unselectable'>{brand}</label>
                        </div>
                    ))}
                </div>
                <div className="accordion">
                    <h3 className='unselectable' onClick={(event) => {
                if (event.target.type !== 'number' && event.target.type !== 'text') {
                    setPriceOpen(!priceOpen);
                }
                }}>Preço <FontAwesomeIcon icon={priceOpen ? faChevronUp : faChevronDown} /></h3>
                    {priceOpen && (
                        <div>
                        <input
                            className="small-input"
                            type="number"
                            min={0}
                            value={selectedPrices[0] === 0 ? '0' : selectedPrices[0]}
                            onChange={event => {
                                const value = event.target.value;
                                setSelectedPrices([value === '' ? '0' : (value.startsWith('0') && value.length > 1 ? value.slice(1) : value), selectedPrices[1]]);
                            }}
                        />
                        <input
                            className="small-input"
                            type="number"
                            value={selectedPrices[1] === Infinity ? 'Infinity' : selectedPrices[1] === 0 ? '0' : selectedPrices[1]}
                            onChange={event => {
                                const value = event.target.value;
                                if (value === 'Infinity' || value === '') {
                                    setSelectedPrices([selectedPrices[0], Infinity]);
                                } else {
                                    setSelectedPrices([selectedPrices[0], value === '' ? '0' : (value.startsWith('0') && value.length > 1 ? value.slice(1) : value)]);
                                }
                            }}
                        />
                        </div>
                    )}
                </div>
                <div className="accordion">
                    <h3 className='unselectable' onClick={(event) => {
                if (event.target.type !== 'checkbox') {
                    setSizeOpen(!sizeOpen);
                }
                }}>Tamanhos <FontAwesomeIcon icon={sizeOpen ? faChevronUp : faChevronDown} /></h3>
                    {sizeOpen && (sizes || []).map(size => (
                        <div key={size}>
                        <input
                            type="checkbox"
                            id={`size-${size}`}
                            name="size"
                            value={size}
                            checked={selectedSizes.includes(size)}
                            onChange={handleSizeChange}
                            className='unselectable'
                        />
                        <label htmlFor={`size-${size}`} className='unselectable'>{size}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EquipamentosFilterBar = ({ selectedBrands, setSelectedBrands, selectedTeams, setSelectedTeams, selectedSizes, setSelectedSizes, selectedPrices, setSelectedPrices }) => {
    const brands = [...new Set(Object.values(ProductList.equipamentos).flat().map(product => product.brand))];
    const teams = [...new Set(Object.values(ProductList.equipamentos).flat().map(product => product.team))];
    const sizes = ['S', 'M', 'L', 'XL'];

    const [brandOpen, setBrandOpen] = useState(true); // Set initial state to true
    const [sizeOpen, setSizeOpen] = useState(true); // Set initial state to true
    const [teamOpen, setTeamOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);

    const sizeOpenChange = () => {
        setSizeOpen(!sizeOpen);
    };

    const priceOpenChange = () => {
        setPriceOpen(!priceOpen);
    };

    const teamOpenChange = () => {
        setTeamOpen(!teamOpen);
    };

    const brandOpenChange = () => {
        setBrandOpen(!brandOpen);
    };

    const handleBrandChange = (event) => {
        event.stopPropagation();
      
        const brand = event.target.value;
        if (selectedBrands.includes(brand)) {
          setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
          setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleSizeChange = (event) => {
        event.stopPropagation();
      
        const size = event.target.value;
        setSelectedSizes(prevSizes => prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]);
    };

    const handleTeamChange = (event) => {
        const team = event.target.value;
        if (selectedTeams.includes(team)) {
            setSelectedTeams(selectedTeams.filter(b => b !== team));
          } else {
            setSelectedTeams([...selectedTeams, team]);
          }
    };

    return (
        <div className='container'>
        <div className={`filter-bar`}>
            <h2 className='unselectable'>Filtros</h2>
            <div className="accordion">
                <h3 className='unselectable' onClick={brandOpenChange}>Marca <FontAwesomeIcon icon={brandOpen ? faChevronUp : faChevronDown} /></h3>
                {brandOpen && (brands || []).map(brand => (
                    <div key={brand}>
                        <input
                            type="checkbox"
                            id={brand}
                            name="brand"
                            value={brand}
                            checked={selectedBrands.includes(brand)}
                            onChange={handleBrandChange}
                            className='unselectable'
                        />
                        <label htmlFor={brand} className='unselectable'>{brand}</label>
                    </div>
                ))}
            </div>
            <div className="accordion">
                <h3 className='unselectable' onClick={teamOpenChange}>Equipas <FontAwesomeIcon icon={teamOpen ? faChevronUp : faChevronDown} /></h3>
                {teamOpen && (teams || []).map(team => (
                    <div key={team}>
                    <input
                        type="checkbox"
                        id={`team-${team}`}
                        name="team"
                        value={team}
                        checked={selectedTeams.includes(team)}
                        onChange={handleTeamChange}
                        className='unselectable'
                    />
                    <label htmlFor={`team-${team}`} className='unselectable'>{team}</label>
                    </div>
                ))}
            </div>
            <div className="accordion">
                <h3 className='unselectable' onClick={priceOpenChange}>Preço <FontAwesomeIcon icon={priceOpen ? faChevronUp : faChevronDown} /></h3>
                {priceOpen && (
                    <div>
                        <input
                            className="small-input"
                            type="number"
                            min={0}
                            value={selectedPrices[0] === 0 ? '0' : selectedPrices[0]}
                            onChange={event => {
                                const value = event.target.value;
                                setSelectedPrices([value === '' ? '0' : (value.startsWith('0') && value.length > 1 ? value.slice(1) : value), selectedPrices[1]]);
                            }}
                        />
                        <input
                            className="small-input"
                            type="number"
                            value={selectedPrices[1] === Infinity ? 'Infinity' : selectedPrices[1] === 0 ? '0' : selectedPrices[1]}
                            onChange={event => {
                                const value = event.target.value;
                                if (value === 'Infinity' || value === '') {
                                    setSelectedPrices([selectedPrices[0], Infinity]);
                                } else {
                                    setSelectedPrices([selectedPrices[0], value === '' ? '0' : (value.startsWith('0') && value.length > 1 ? value.slice(1) : value)]);
                                }
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="accordion">
                <h3 className='unselectable' onClick={sizeOpenChange}>Tamanhos <FontAwesomeIcon icon={sizeOpen ? faChevronUp : faChevronDown} /></h3>
                {sizeOpen && (sizes || []).map(size => (
                    <div key={size}>
                    <input
                        type="checkbox"
                        id={`size-${size}`}
                        name="size"
                        value={size}
                        checked={selectedSizes.includes(size)}
                        onChange={handleSizeChange}
                        className='unselectable'
                    />
                    <label htmlFor={`size-${size}`} className='unselectable'>{size}</label>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

const SearchFilterBar = ({ selectedBrands, setSelectedBrands, selectedCategories, setSelectedCategories, selectedPrices, setSelectedPrices }) => {
    console.log(typeof selectedBrands);
    console.log(selectedBrands);
    console.log(selectedCategories);
    console.log(selectedPrices);
    // Extract all unique brands, categories, and price ranges from the ProductList
    const brands = [...new Set(Object.values(ProductList).flat().map(product => product.brand))];
    const categories = Object.keys(ProductList);


    // Create a function to handle changes in the selected brands, categories, and price range
    const handleFilterChange = (filter, setFilter) => event => {
        const value = event.target.value;
        setFilter(filter.includes(value) ? filter.filter(f => f !== value) : [...filter, value]);
    };

    // Render the filter bar and the filtered products
    return (
        <div>
            {/* Render the filter bar */}
            <div className="filter-bar">
                <div className="filter-section">
                    <h3>Brands</h3>
                    {brands.map(brand => (
                        <div key={brand}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    value={brand} 
                                    checked={selectedBrands.includes(brand)} 
                                    onChange={handleFilterChange(selectedBrands, setSelectedBrands)}
                                />
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Categories</h3>
                    {categories.map(category => (
                        <div key={category}>
                            <label style={{ textTransform: 'capitalize' }}>
                                <input 
                                    type="checkbox" 
                                    value={category} 
                                    checked={selectedCategories.includes(category)} 
                                    onChange={handleFilterChange(selectedCategories, setSelectedCategories)}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Price</h3>
                    <input
                        className="small-input"
                        type="number"
                        min={0}
                        value={selectedPrices[0] === 0 ? '0' : selectedPrices[0]}
                        onChange={event => {
                            const value = event.target.value;
                            setSelectedPrices([value === '' ? '0' : (value.startsWith('0') && value.length > 1 ? value.slice(1) : value), selectedPrices[1]]);
                        }}
                    />
                    <input
                        className="small-input"
                        type="number"
                        value={selectedPrices[1] === Infinity ? 'Infinity' : selectedPrices[1] === 0 ? '0' : selectedPrices[1]}
                        onChange={event => {
                            const value = event.target.value;
                            if (value === 'Infinity' || value === '') {
                                setSelectedPrices([selectedPrices[0], Infinity]);
                            } else {
                                setSelectedPrices([selectedPrices[0], value === '' ? '0' : (value.startsWith('0') && value.length > 1 ? value.slice(1) : value)]);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export {ShoeFilterBar, EquipamentosFilterBar, SearchFilterBar};