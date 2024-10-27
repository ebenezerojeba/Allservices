import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import ArtisanRecruitment from '../components/ArtisanRecruitment'
import StatsDashboard from '../components/StatsDashboard'

const Home = () => {
  return (
    <div>
        <Header />
        <SpecialityMenu />
        <TopDoctors  />
        <Banner />
        <ArtisanRecruitment />
        <StatsDashboard />
    </div>
  )
}

export default Home