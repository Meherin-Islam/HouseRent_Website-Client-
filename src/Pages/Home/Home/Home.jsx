import React from 'react';
import Banner from '../Banner';
import AboutBuilding from './AboutBuilding';
import ApartmentLocation from './ApartmentLocation';

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


         
        
        </div>
    );
};

export default Home;