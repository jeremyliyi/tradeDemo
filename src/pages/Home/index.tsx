import * as React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../rematch";
const { useState, useEffect } = React;

const Home = React.memo(() => {

  const [count, setCount] = useState(0);
  const { count:storeCount, dispatch } = useStore('count') ;

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);



  return (
    <div>
      <p>You clicked {storeCount} times store</p>
      <p>You clicked {count} times state</p>

      <button
        onClick={() => {
          dispatch.count.increment(1);
          setCount(count + 1);
        }}
      >
        加1
      </button>

      <button
        onClick={() => {
          console.log(dispatch.count);
          dispatch.count.incrementAsync(1);
        }}
      >
        异步加
      </button>

      <Link to="/detail">去详情页</Link>
    </div>
  );
});

export default Home;
