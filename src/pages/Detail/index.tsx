import { Alert, Button, Card } from "antd";
import * as React from "react";
import { mapSocketState } from "../../constants/";
import { useStore } from "../../rematch";
const { useEffect } = React;

const Detail = React.memo(() => {
  const { socket, dispatch } = useStore("socket");
  const { readyState, dataList } = socket;
  const SocketState = mapSocketState[readyState];
  useEffect(() => {
    dispatch.socket.initSocket();
    return ()=>{
      dispatch.socket.closeSocket()
    }
  }, []);
  return (
    <div>
      <Alert
        message={`SOCKET 状态：${SocketState}`}
        type={SocketState === "OPEN" ? "success" : "error"}
      />
      <Card>
        {SocketState === "OPEN" ? (
          <Button onClick={()=>dispatch.socket.closeSocket()}>点击关闭</Button>
        ) : (
          <Button onClick={()=>dispatch.socket.initSocket()}>点击连接</Button>
        )}
      </Card>
      <Card title="数据流:">{JSON.stringify(dataList)}</Card>
    </div>
  );
});

export default Detail;
