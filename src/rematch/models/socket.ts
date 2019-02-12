export const socket = {
  effects: {
    async initSocket(payload: number, rootState: number) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment(payload);
    }

  },
  reducers: {
    increment(state: number, payload: number) {
      return state + payload;
    }
  },
  state: {
    url:'stream.binance.cloud:9443/ws/bnbbtc@depth20' 
  } // initial state
};
