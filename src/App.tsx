import * as React from "react";
import  { Route,Switch } from "react-router-dom";
import Detail from './pages/Detail'
import Home from './pages/Home'
class APP extends React.Component<object, object> {
  public render() {
    return (
      <div className="hello">
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/detail" component={Detail} />
        </Switch>
      </div>
    );
  }
}

export default APP;
