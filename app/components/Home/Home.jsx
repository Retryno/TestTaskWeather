import { getWeather } from 'store/weather/actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import momet from 'moment'
import './Home.styl'

class Home extends Component {
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.dispatch(
        getWeather(position.coords.latitude, position.coords.longitude)
      )
    })
  }
  render () {
    const { weather, main, name} = this.props.myWeather
    return (
      <div className='Home'>
        {this.props.myWeatherFetching && '...loading'}
        <div className='Home_country'>{name}</div>
        <div className='Home_temp'>
          {weather &&
            <div className='Home_temp_weather'>
              {weather[0].main}
              <img src={`//openweathermap.org/img/w/${weather[0].icon}.png`} />
              {main.temp}&deg;C
              <br />
              {momet().format('dddd DD, MMMM YYYY')}
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  myWeatherFetching: state.weather.myWeatherFetching,
  myWeather: state.weather.myWeather
})

export default connect(mapStateToProps)(Home)
