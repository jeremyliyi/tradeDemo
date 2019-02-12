export const count = {
  effects: {
    async incrementAsync(payload:number, rootState:number) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment(payload);
    }
  },
  reducers: {
    increment(state:number, payload:number) {
      return state + payload;
    }
  },
  state: 0 // initial state
};
