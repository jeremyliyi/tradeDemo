import * as _ from 'lodash'
import Socket from "../../utils/socket";
interface IState {
  url: string;
  readyState: string;
  Socket: any;
  dataList: any[];
}
export const socket = {
  effects: {
    async initSocket(payload: number, rootState: any) {
      this.changeStatus("0");
      Socket.init({
        url: rootState.socket.url,
        onOpen: () => {
          this.changeStatus("1");
        },
        onMessage:_.throttle((datas)=>{
          this.changeDataList(datas);
        },300),
        onClose: () => {
          this.changeStatus("3");
        },
        onDead: () => {
          const instance = Socket.instance;
          this.changeStatus((instance as WebSocket).readyState);
        },
        onError: () => {
          this.changeStatus("400");
        },
        onNotSupportSocket: () => {
          console.error(`browser does not supports WebSocket`);
        }
      }).connect();
    },
    async closeSocket(payload: number, rootState: any) {
      Socket.close();
    }
  },
  reducers: {
    changeStatus(state: IState, payload: string) {
      return {
        ...state,
        readyState: payload
      };
    },
    changeDataList(state: IState, payload: object) {
      const { dataList } = state;
      dataList.push(payload);
      if (dataList.length > 10) {
        dataList.splice(0, 1);
      }
      return {
        ...state,
        dataList
      };
    }
  },
  state: {
    url: "ws://localhost:3000/ws/bnbbtc@depth20",
    readyState: "999",
    Socket,
    dataList: []
  } as IState // initial state
};
