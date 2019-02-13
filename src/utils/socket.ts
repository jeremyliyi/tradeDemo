// import getUUID from "@/utils/uuid";

// const protocol = location.protocol;
let supportSocket = true;
export type ISocketInstance = null | WebSocket;
if (!(window as any).WebSocket) {
  supportSocket = false;
}
export interface Iinit {
  url: string;
  onOpen(data:any): void;
  onClose(data:any): void;
  onError(data:any): void;
  onDead(data:any): void;
  onMessage(data:any): void;
  onNotSupportSocket(data:any): void;
}

export default {
  // 实例
  instance: null as ISocketInstance,

  param: {
    url: null,
  },
  reconnectTime: 0,
  maxReconnectTime: 100,
  dead: false,
  // 是否支持websocket
  supportSocket,
  setParam(object: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (!!object[key]) {
          this.param[key] = object[key];
        }
      }
    }
  },

  onOpen: null,
  onClose: null,
  onError: null,
  onMessage: null,
  onNotSupportSocket: null,
  /**
   * 初始化websocket
   * @param {初始化参数} param0
   */
  init({
    url,
    onOpen,
    onClose,
    onError,
    onDead,
    onMessage,
    onNotSupportSocket
  }: Iinit) {
    const param = {
      url,
    };
    this.setParam(param);
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onError = onError;
    this.onMessage = onMessage;
    this.onDead = onDead;
    this.onNotSupportSocket = onNotSupportSocket;
    return this;
  },

  /**
   * 链接消息
   */
  connect() {
    try {
      if (!supportSocket) {
        console.log("This browser does not supports WebSocket");
        this.onNotSupportSocket && this.onNotSupportSocket();
        return;
      }

      this.reconnectTime += 1;

      if (!!this.instance) {
        console.log("已存在socket实例");
        const socketStatus = this.instance.readyState;
        if (socketStatus === 3) {
          console.log("socket已关闭，准备重连");
          if (this.maxReconnectTime < this.reconnectTime) {
            console.log("已达到重连次数上线", this.maxReconnectTime);
            this.dead = true;
            this.onDead && this.onDead();
            return;
          }
        } else {
          console.log("socket已连接中", socketStatus);
          return;
        }
      } else {
        if (this.maxReconnectTime < this.reconnectTime) {
          console.log("已达到重连次数上线", this.maxReconnectTime);
          this.dead = true;
          this.onDead && this.onDead();
          return;
        }
      }

      let socket:ISocketInstance;
      const { url } = this.param;
      socket = new WebSocket(
        `${url}`
      );
      this.instance = socket;
      socket.onopen = e => {
        console.log("open", e, socket);
        this.onOpen && this.onOpen(e);
      };
      socket.onclose = () => {
        console.log("close");
        socket = null;
        this.onClose && this.onClose();
      };
      socket.onmessage = res => {
        if (!res) {
          return;
        }
        const { data } = res;
        this.onMessage && this.onMessage(data);
      };
      socket.onerror = error => {
        console.log("error", error);
        this.instance = null;
        this.onError && this.onError();
      };
      return socket;
    } catch (error) {
      debugger
      console.log(error);
      return ;
    }
  },

  /**
   * 发送消息
   * @param {object} packet 消息内容体
   */
  send(packet: any) {
    const socket = this.instance;
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify(packet));
    } else if (socket && socket.readyState === 0) {
      setTimeout(function() {
        this.send(packet);
      }, 1000);
    } else {
      console.warn("message not send, message=" + JSON.stringify(packet));
    }
  },

  /**
   * 关闭消息
   */
  close() {
    const socket = this.instance;
    this.dead = true;
    socket.close();
    this.onDead && this.onDead();
  }
};
