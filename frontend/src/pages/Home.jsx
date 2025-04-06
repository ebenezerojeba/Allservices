import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopArtisans'
import Banner from '../components/Banner'
import ArtisanRecruitment from '../components/ArtisanRecruitment'
import StatsDashboard from '../components/StatsDashboard'
import TopArtisans from '../components/TopArtisans'

const Home = () => {
  return (
    <div>
        <Header />
        <SpecialityMenu />
        <TopArtisans  />
        <Banner />
        <ArtisanRecruitment />
        <StatsDashboard />
    </div>
  )
}

export default Home