import React from 'react';
import styles from "./App.module.scss";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { client } from "./index";
import Registration from "./components/registration/Registration";
import Authorization from "./components/athorization/Authorization";
import TestPage from "./components/test_page/TestPage";
import Test from "./components/test/Test";
import Course from "./components/course/Course";
import CoursePage from "./components/course_page/CoursePage";
import Profile from "./components/profile/Profile";
import Home from './Home';

import {createBrowserHistory} from 'history';
import InputQuestion from "./components/inputquestion/InputQuestion";

class AppHeaderInner extends React.Component<{location: any}, {
  mode?: string
}> {
  public constructor(props: {}) {
    // @ts-ignore
    super(props);
    this.state = {
      mode: 'all'
    };
  }

  public render(): React.ReactNode {
    const {location} = this.props;

    return (
        <div>
          <div><Link to="/">main</Link></div>
          <div><Link to="/authorization">authorization</Link></div>
          <div><Link to="/registration">registration</Link></div>
            <div><Link to="/input">test_input</Link></div>
            <div><Link to="/course">course</Link></div>
            <div><Link to="/coursePage">course_page</Link></div>
            <div><Link to="/test">test</Link></div>
            <div><Link to="/profile">profile</Link></div>
        </div>
    );
  };
}

const AppHeader = withRouter(AppHeaderInner);

export const appHistory = createBrowserHistory();
// export const {router, params, location, routes} = (window as any).props;

const App: React.FC = () => {
  return (
      <Router history={appHistory}>
        <ApolloProvider client={client}>
          <div className={styles.appHeader}>
            <AppHeader/>
            <Switch>
              <Route path="/registration">
                <Registration/>
              </Route>
                <Route path="/Course">
                <Course/>
              </Route>
                <Route path="/CoursePage">
                <CoursePage/>
              </Route>
                <Route path="/Profile">
                <Profile/>
              </Route>
              <Route path="/Test">
                <Test/>
              </Route>
              <Route path="/authorization">
                <Authorization/>
              </Route>
                <Route path="/input">
                    <InputQuestion/>
                </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
  );
};

export default App;