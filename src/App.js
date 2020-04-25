import React from 'react';

//Import components
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './images/image.png';
import Particles from 'react-particles-js';

//particles
const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
};

class App extends React.Component {

    //create a state
    state = {
        data: {},
        country: ''
    }

    //Fetch api data
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        //fetch data
        const fetchedData = await fetchData(country);

        //set data
        this.setState({data: fetchedData, country: country})
    }

    render() {
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                <Particles className="particles" params={particlesOptions} />
            </div>
        )
    }
}

export default App;