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

import {createBrowserHistory} from 'history';
import InputQuestion from "./components/inputquestion/InputQuestion";
import CourseList from './components/course_list/CourseList';

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
              <Route path="/course">
                <Course/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/test">
                <Test/>
              </Route>
              <Route path="/authorization">
                <Authorization/>
              </Route>
              <Route path="/input">
                <InputQuestion/>
              </Route>
              <Route path="/course-page">
                <CoursePage/>
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