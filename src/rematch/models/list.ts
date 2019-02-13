import uuid from '../../utils/uuid'
import { getList } from "../service";
export const list = {
  effects: {
    async getList() {
      const res = await getList();
      const data = res.data.map((item:any)=>{
        return {
          ...item,
          uuid:uuid()
        }
      })
      this.changeList(data);
    }
  },
  reducers: {
    changeList(state:any,payload: any,) {
      return payload;
    }
  },
  state: [] // initial state
};
