import React from 'react';
import Banner from '../Banner';
import AboutBuilding from './AboutBuilding';
import ApartmentLocation from './ApartmentLocation';
import Coupons from './Coupons';

const Home = () => {
    return (
        <div>
          
         <section className='py-8'>
         <Banner></Banner>
         </section>
         <section>
            <AboutBuilding></AboutBuilding>
         </section>
          <section>
          <ApartmentLocation></ApartmentLocation>
          </section>
          <section>
            <Coupons></Coupons>
          </section>


         
        
        </div>
    );
};

export default Home;