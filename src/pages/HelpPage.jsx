import React from "react";
import Navbar from "/src/components/MyNavbar";
import Footer from "/src/components/MyFooter";

function HelpPage() {
  return (
    <>
        <Navbar />
        <div className="text-center" style={{ minHeight: '55vh' }}>
            <h1 className="p-4">Help Page</h1>
            <h5>This site is self explanatory!!!</h5>
            <img src="https://images2.minutemediacdn.com/image/upload/c_crop,w_2544,h_1431,x_0,y_0/c_fill,w_1080,ar_16:9,f_auto,q_auto,g_auto/images%2FvoltaxMediaLibrary%2Fmmsport%2Fthebiglead_en_international_web%2F01hdz390g7hchcaedy7s.png" alt="help" />
        </div>
        <Footer />
    </>
  );
}

export default HelpPage;