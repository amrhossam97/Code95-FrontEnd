import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "./Spinner"
const Home = React.lazy(() => import("./components/Home/Home"));
const Graph = React.lazy(() => import("./components/Graph/Graph"));

export default function Routes() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/graph" exact component={Graph} />
        </Switch>
      </Suspense>
    );
  }