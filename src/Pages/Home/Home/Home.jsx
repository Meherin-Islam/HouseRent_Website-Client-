import React from 'react';
import Banner from '../Banner';
import AboutBuilding from './AboutBuilding';

const Home = () => {
    return (
        <div>
          
         <section className='py-8'>
         <Banner></Banner>
         </section>
         <section>
            <AboutBuilding></AboutBuilding>
         </section>
          
         
        
        </div>
    );
};

export default Home;