import React from "react";
import Navbar from "/src/components/MyNavbar";
import MyFooter from "/src/components/MyFooter";
import SearchSearch from "/src/components/SearchSearch";


function SearchPage() {
    return (
        <>
            <div className="parent-container">
                <div className="navbar">
                    <Navbar activeID={1}/>
                </div>
                <div className="shoe-search" style={{ minHeight: '55vh' }}>
                    <SearchSearch />
                </div>
                <div className="footer">
                    <MyFooter />
                </div>
            </div>
        </>
    );
}

export default SearchPage;