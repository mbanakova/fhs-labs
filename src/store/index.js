import { createStore } from 'vuex'

export default createStore({
  state: {
    temperatureList: []
  },
  mutations: {
    addTemperature(state, data) {
      state.temperatureList.push(data)
    },
    fetchTemperatureList(state, data) {
      state.temperatureList = data
    },
    clearAll(state) {
      state.temperatureList = []
    }
  },
  actions: {
    async addTemperature(context, data) {
      const response = await fetch('https://fhslabs-vue-default-rtdb.firebaseio.com/temperature.json', {
        method: 'POST',
        body: JSON.stringify(data)
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      context.commit("addTemperature", data)
    },
    async fetchTemperatureList(context) {
      const response = await fetch('https://fhslabs-vue-default-rtdb.firebaseio.com/temperature.json')

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      const list = []
      let i = 0;
      for (const key in responseData) {

        const item = {
          index: i,
          id: responseData[key].id,
          temperature: responseData[key].temperature,
        }
        list.push(item)
        i++;
      }
      context.commit("fetchTemperatureList", list)
    },
    async updateList(context, data) {
      const response = await fetch('https://fhslabs-vue-default-rtdb.firebaseio.com/temperature.json', {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      context.commit("fetchTemperatureList", data)
    },
    async clearAll(context, data) {
      const response = await fetch('https://fhslabs-vue-default-rtdb.firebaseio.com/temperature.json', {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      context.commit("clearAll", data)
    },
  },
  getters: {
    getTemperatureList(state) {
      return state.temperatureList;
    }
  }
})
