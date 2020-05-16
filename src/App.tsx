import React from 'react';
import styles from "./App.module.scss";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { client } from "./index";
import Registration from "./components/user/Registration";
import Test from "./components/test/Test";
import Course_example from "./components/course_example/Course_example";
import IntegratedSecurityBasics from "./components/courses/IntegratedSecurityBasics";
import Profile from "./components/profile/Profile";

import {createBrowserHistory} from 'history';
import InputQuestion from "./components/inputquestion/InputQuestion";
import CourseList from './components/course_list/CourseList';
import WrappedAuthorization from "./components/user/Authorization";
import WrappedTestPage from "./components/test_page/TestPage";

class AppHeaderInner extends React.Component<{}, {
  mode?: string
}> {
  public constructor(props: any) {
    super(props);
    this.state = {
      mode: 'all'
    };
  }

  public render(): React.ReactNode {
    return (
        <>
          {/*<div><Link to="/">main</Link></div>*/}
          {/*<div><Link to="/authorization">authorization</Link></div>*/}
          {/*<div><Link to="/registration">registration</Link></div>*/}
          {/*<div><Link to="/input">test_input</Link></div>*/}
          {/*<div><Link to="/course">course</Link></div>*/}
          {/*<div><Link to="/coursePage">course_page</Link></div>*/}
          {/*<div><Link to="/test">test</Link></div>*/}
          {/*<div><Link to="/profile">profile</Link></div>*/}
        </>
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
              <Route path="/test-page">
                <WrappedTestPage/>
              </Route>
              <Route path="/course_example">
                <Course_example/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/test">
                <Test/>
              </Route>
              <Route path="/authorization">
                <WrappedAuthorization/>
              </Route>
              <Route path="/input">
                <InputQuestion/>
              </Route>
              <Route path="/security-basics">
                <IntegratedSecurityBasics/>
              </Route>
              <Route path="/">
                <CourseList/>
              </Route>
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
  );
};

export default App;