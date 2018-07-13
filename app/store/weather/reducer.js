import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
  myWeatherFetching: false,
  myWeather: {}
})

export default (state = initialState, action = {}) => {
  const obj = {
    [types.GET_WEATHER]: () => state.merge({
      myWeatherFetching: true
    }),
    [types.GET_WEATHER_SUCCESS]: () => state.merge({
      myWeather: action.payload.myWeather,
      myWeatherFetching: false
    }),
    [types.GET_WEATHER_ERROR]: () => state.merge({
      myWeatherFetching: false,
      myWeather: {}
    })
  }
  const a = obj[action.type]
  return a ? a() : state
}
