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
                    <h3 className='unselectable pt-2' onClick={(event) => {
                if (event.target.type !== 'checkbox') {
                    setBrandOpen(!brandOpen);
                }
                }}>Marca <FontAwesomeIcon icon={brandOpen ? faChevronUp : faChevronDown} /></h3>
                    {brandOpen && (brands || []).map(brand => (
                        <div key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                            <input
                                type="checkbox"
                                id={brand}
                                name="brand"
                                value={brand}
                                checked={selectedBrands.includes(brand)}
                                onChange={handleBrandChange}
                                className='unselectable'
                            />
                            <label htmlFor={brand} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{brand}</label>
                        </div>
                    ))}
                </div>
                <div className="accordion pt-2">
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
                        <div className='pt-2'></div>
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
                    <h3 className='unselectable pt-2' onClick={(event) => {
                if (event.target.type !== 'checkbox') {
                    setSizeOpen(!sizeOpen);
                }
                }}>Tamanhos <FontAwesomeIcon icon={sizeOpen ? faChevronUp : faChevronDown} /></h3>
                    {sizeOpen && (sizes || []).map(size => (
                        <div key={size} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }} >
                        <input
                            type="checkbox"
                            id={`size-${size}`}
                            name="size"
                            value={size}
                            checked={selectedSizes.includes(size)}
                            onChange={handleSizeChange}
                            className='unselectable'
                        />
                        <label htmlFor={`size-${size}`} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{size}</label>
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
        <div className='container' >
        <div className={`filter-bar`}>
            <h2 className='unselectable'>Filtros</h2>
            <div className="accordion">
                <h3 className='unselectable pt-2' onClick={brandOpenChange}>Marca <FontAwesomeIcon icon={brandOpen ? faChevronUp : faChevronDown} /></h3>
                {brandOpen && (brands || []).map(brand => (
                    <div key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                        <input
                            type="checkbox"
                            id={brand}
                            name="brand"
                            value={brand}
                            checked={selectedBrands.includes(brand)}
                            onChange={handleBrandChange}
                            className='unselectable'
                        />
                        <label htmlFor={brand} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }}>{brand}</label>
                    </div>
                ))}
            </div>
            <div className="accordion">
                <h3 className='unselectable pt-2' onClick={teamOpenChange}>Equipas <FontAwesomeIcon icon={teamOpen ? faChevronUp : faChevronDown} /></h3>
                {teamOpen && (teams || []).map(team => (
                    <div key={team} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                    <input
                        type="checkbox"
                        id={`team-${team}`}
                        name="team"
                        value={team}
                        checked={selectedTeams.includes(team)}
                        onChange={handleTeamChange}
                        className='unselectable'
                    />
                    <label htmlFor={`team-${team}`} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }}>{team}</label>
                    </div>
                ))}
            </div>
            <div className="accordion">
                <h3 className='unselectable pt-2' onClick={priceOpenChange}>Preço <FontAwesomeIcon icon={priceOpen ? faChevronUp : faChevronDown} /></h3>
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
                        <div className='pt-2'></div>
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
                <h3 className='unselectable pt-2' onClick={sizeOpenChange}>Tamanhos <FontAwesomeIcon icon={sizeOpen ? faChevronUp : faChevronDown} /></h3>
                {sizeOpen && (sizes || []).map(size => (
                    <div key={size} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                    <input
                        type="checkbox"
                        id={`size-${size}`}
                        name="size"
                        value={size}
                        checked={selectedSizes.includes(size)}
                        onChange={handleSizeChange}
                        className='unselectable'
                    />
                    <label htmlFor={`size-${size}`} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }}>{size}</label>
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
                    <h3>Marcas</h3>
                    {brands.map(brand => (
                        <div key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                            <label style={{ paddingLeft: 5, fontSize: '18px' }}>
                                <input style={{ marginRight: 5 }} 
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
                    <h3 className='pt-2'>Categorias</h3>
                    {categories.map(category => (
                        <div key={category} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                            <label style={{ textTransform: 'capitalize', paddingLeft: 5, fontSize: '18px' }}>
                                <input style={{ marginRight: 5 }}
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

                <div className="filter-section pt-2">
                    <h3>Preço</h3>
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
                    <div className='pt-2'></div>
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

const MaterialFilterBar = ({selectedBrands, setSelectedBrands, selectedPrices, setSelectedPrices, selectedType, setSelectedType}) => {
        const [brandOpen, setBrandOpen] = useState(true); // Set initial state to true
        const [priceOpen, setPriceOpen] = useState(true);
        const [typeOpen, setTypeOpen] = useState(true);

        const brands = [...new Set(Object.values(ProductList.material).flat().map(product => product.brand))];
        const type = [...new Set(Object.values(ProductList.material).flat().map(product => product.type))];

        const handleBrandChange = (event) => {
            event.stopPropagation();
          
            const brand = event.target.value;
            if (selectedBrands.includes(brand)) {
              setSelectedBrands(selectedBrands.filter(b => b !== brand));
            } else {
              setSelectedBrands([...selectedBrands, brand]);
            }
        };

        const handleTypeChange = (event) => {
            event.stopPropagation();
          
            const type = event.target.value;
            if (selectedType.includes(type)) {
              setSelectedType(selectedType.filter(b => b !== type));
            } else {
              setSelectedType([...selectedType, type]);
            }
        };

        return (
            <div className='container' >
                <div className={`filter-bar`}>
                    <h2 className='unselectable'>Filtros</h2>
                    <div className="accordion">
                        <h3 className='unselectable pt-2' onClick={(event) => {
                    if (event.target.type !== 'checkbox') {
                        setBrandOpen(!brandOpen);
                    }
                    }}>Marca <FontAwesomeIcon icon={brandOpen ? faChevronUp : faChevronDown} /></h3>
                        {brandOpen && (brands || []).map(brand => (
                            <div key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                                <input
                                    type="checkbox"
                                    id={brand}
                                    name="brand"
                                    value={brand}
                                    checked={selectedBrands.includes(brand)}
                                    onChange={handleBrandChange}
                                    className='unselectable'
                                />
                                <label htmlFor={brand} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{brand}</label>
                            </div>
                        ))}
                    </div>
                    <div className="accordion">
                        <h3 className='unselectable pt-2' onClick={(event) => {
                    if (event.target.type !== 'checkbox') {
                        setTypeOpen(!typeOpen);
                    }
                    }}>Tipo <FontAwesomeIcon icon={typeOpen ? faChevronUp : faChevronDown} /></h3>
                        {typeOpen && (type || []).map(type => (
                            <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                                <input
                                    type="checkbox"
                                    id={type}
                                    name="brand"
                                    value={type}
                                    checked={selectedType.includes(type)}
                                    onChange={handleTypeChange}
                                    className='unselectable'
                                />
                                <label htmlFor={type} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{type}</label>
                            </div>
                        ))}
                    </div>
                    <div className="accordion pt-2">
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
                            <div className='pt-2'></div>
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
                </div>
            </div>
        );
    };

    const AcessoriosFilterBar = ({selectedBrands, setSelectedBrands, selectedPrices, setSelectedPrices, selectedType, setSelectedType, selectedSizes, setSelectedSizes}) => {
        const [brandOpen, setBrandOpen] = useState(true); // Set initial state to true
        const [priceOpen, setPriceOpen] = useState(true);
        const [typeOpen, setTypeOpen] = useState(true);
        const [sizeOpen, setSizeOpen] = useState(true); // Set initial state to true

        const brands = [...new Set(Object.values(ProductList.acessorios).flat().map(product => product.brand))];
        const type = [...new Set(Object.values(ProductList.acessorios).flat().map(product => product.type))];
        const sizes = ["35-38","39-42","43-45","46-48", "Tamanho unico"]

        const handleBrandChange = (event) => {
            event.stopPropagation();
          
            const brand = event.target.value;
            if (selectedBrands.includes(brand)) {
              setSelectedBrands(selectedBrands.filter(b => b !== brand));
            } else {
              setSelectedBrands([...selectedBrands, brand]);
            }
        };

        const handleTypeChange = (event) => {
            event.stopPropagation();
          
            const type = event.target.value;
            if (selectedType.includes(type)) {
              setSelectedType(selectedType.filter(b => b !== type));
            } else {
              setSelectedType([...selectedType, type]);
            }
        };

        const handleSizeChange = (event) => {
            event.stopPropagation();
          
            const size = String(event.target.value);
            setSelectedSizes(prevSizes => prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]);
            };

        return (
            <div className='container' >
                <div className={`filter-bar`}>
                    <h2 className='unselectable'>Filtros</h2>
                    <div className="accordion">
                        <h3 className='unselectable pt-2' onClick={(event) => {
                    if (event.target.type !== 'checkbox') {
                        setBrandOpen(!brandOpen);
                    }
                    }}>Marca <FontAwesomeIcon icon={brandOpen ? faChevronUp : faChevronDown} /></h3>
                        {brandOpen && (brands || []).map(brand => (
                            <div key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                                <input
                                    type="checkbox"
                                    id={brand}
                                    name="brand"
                                    value={brand}
                                    checked={selectedBrands.includes(brand)}
                                    onChange={handleBrandChange}
                                    className='unselectable'
                                />
                                <label htmlFor={brand} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{brand}</label>
                            </div>
                        ))}
                    </div>

                    <div className="accordion">
                    <h3 className='unselectable pt-2' onClick={(event) => {
                if (event.target.type !== 'checkbox') {
                    setSizeOpen(!sizeOpen);
                }
                }}>Tamanhos <FontAwesomeIcon icon={sizeOpen ? faChevronUp : faChevronDown} /></h3>
                    {sizeOpen && (sizes || []).map(size => (
                        <div key={size} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }} >
                        <input
                            type="checkbox"
                            id={`size-${size}`}
                            name="size"
                            value={size}
                            checked={selectedSizes.includes(size)}
                            onChange={handleSizeChange}
                            className='unselectable'
                        />
                        <label htmlFor={`size-${size}`} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{size}</label>
                        </div>
                    ))}
                </div>

                    <div className="accordion">
                        <h3 className='unselectable pt-2' onClick={(event) => {
                    if (event.target.type !== 'checkbox') {
                        setTypeOpen(!typeOpen);
                    }
                    }}>Tipo <FontAwesomeIcon icon={typeOpen ? faChevronUp : faChevronDown} /></h3>
                        {typeOpen && (type || []).map(type => (
                            <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                                <input
                                    type="checkbox"
                                    id={type}
                                    name="brand"
                                    value={type}
                                    checked={selectedType.includes(type)}
                                    onChange={handleTypeChange}
                                    className='unselectable'
                                />
                                <label htmlFor={type} className='unselectable' style={{ paddingLeft: 5, fontSize: '18px' }} >{type}</label>
                            </div>
                        ))}
                    </div>
                    <div className="accordion pt-2">
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
                            <div className='pt-2'></div>
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
                </div>
            </div>
        );
    };

export {ShoeFilterBar, EquipamentosFilterBar, SearchFilterBar, MaterialFilterBar, AcessoriosFilterBar};