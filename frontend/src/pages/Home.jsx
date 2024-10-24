import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import ArtisanRecruitment from '../components/ArtisanRecruitment'

const Home = () => {
  return (
    <div>
        <Header />
        <SpecialityMenu />
        <TopDoctors  />
        <Banner />
        <ArtisanRecruitment />
    </div>
  )
}

export default Home