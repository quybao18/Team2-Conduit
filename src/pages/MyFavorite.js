import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyFavorite() {
    return (
        <div>
            <Header />
            <div className="row mt-5 ms-5 me-5">
                <h3 className='mt-5'>My Favorite</h3>
            </div>
            <Footer />
        </div>
    )
}

export default MyFavorite