import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/layouts'

const Home = () => {
    return (
       <Layout>
           <Jumbotron className="text-center" style={{margin: '5rem', background: '#fff'}}>
               <h1>Welcome to Admin Dashboard</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus modi possimus assumenda et, minus quisquam nam doloremque. Numquam, eveniet accusantium qui ratione ut quas! Maiores?</p>
           </Jumbotron>
       </Layout>
    )
}

export default Home
