import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import * as React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../rematch";
const { useEffect } = React;
interface IUser {
  key: number;
  name: string;
}
const Home = React.memo(() => {
  const { list, dispatch } = useStore("list");
  useEffect(() => {
    dispatch.list.getList();
  }, []);

  const columns: Array<ColumnProps<IUser>> = [
    {
      title: "市场",
      dataIndex: "marketName",
      key: "marketName",
      width:200
    },
    {
      title: "币种",
      dataIndex: "quoteAssetName",
      key: "quoteAssetName",
      width:200,
      render:(value,item)=>{
        return(
          <Link to={`/detail?quoteAssetName=${value}`} style={{color:'red'}}>{value}</Link>
        )
      }
    },
    {
      title: "最新价",
      dataIndex: "close",
      key: "close",
      width:200,

    },
    {
      title: "24h涨跌",
      dataIndex: "prevClose",
      key: "prevClose",
      width:200,

    },
    {
      title: "24h最高价",
      dataIndex: "high",
      key: "high",
      width:200,

    },
    {
      title: "24h最低价",
      dataIndex: "low",
      key: "low",
      width:200,

    },
    {
      title: "24h成交量",
      dataIndex: "volume",
      key: "volume"
    }
  ];
  return (
      <Table
        columns={columns}
        dataSource={list}
        rowKey="uuid"
        size="small"
        pagination={false}
        scroll={{ y: 700 }}
      />
  );
});

export default Home;
