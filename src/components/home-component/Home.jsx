import React, { } from 'react';
import Banner from '../Banner-component/Banner';
import CustomerFav from './displayProduct-component/CustomersFav';


const Home = () => {
    return ( 
        <div>
            <Banner />
            <CustomerFav />
        </div>
     );
}
 
export default Home;