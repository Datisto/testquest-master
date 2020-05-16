import React from 'react';
import styles from "./App.module.scss";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { client } from "./index";
import Registration from "./components/user/Registration";
import Test from "./components/test/Test";
import Course_example from "./components/course_example/Course_example";
import IntegratedSecurityBasics from "./components/courses/IntegratedSecurityBasics";
import AntiTerror from "./components/courses/AntiTerror";
import BasicHealthyLife from "./components/courses/BasicHealthyLife";
import BasicFirstAid from "./components/courses/BasicFirstAid";
import StateDefenseFundamentals from "./components/courses/StateDefenseFundamentals";
import Profile from "./components/profile/Profile";
import ISBTestResults from "./components/teacher_panel/ISBTestResults";
import ATTestResults from "./components/teacher_panel/ATTestResults";
import BFATestResults from "./components/teacher_panel/BFATestResults";
import BHLTestResults from "./components/teacher_panel/BHLTestResults";
import SDFTestResults from "./components/teacher_panel/SDFTestResults";

import {createBrowserHistory} from 'history';
import InputQuestion from "./components/inputquestion/InputQuestion";
import CourseList from './components/course_list/CourseList';
import WrappedAuthorization from "./components/user/Authorization";
import WrappedIntegratedSecurityBasicsTest from "./components/test_page/IntegratedSecurityBasicsTest";
import WrappedAntiTerrorTest from "./components/test_page/AntiTerrorTest";
import WrappedBasicFirstAidTest from "./components/test_page/BasicFirstAidTest";
import WrappedBasicHealthyLifeTest from "./components/test_page/BasicHealthyLifeTest";
import WrappedStateDefenseFundamentalsTest from "./components/test_page/StateDefenseFundamentalsTest";
import TeacherPanel from "./components/teacher_panel/TeacherPanel";

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
              <Route path="/security-basics/test">
                <WrappedIntegratedSecurityBasicsTest/>
              </Route>
              <Route path="/anti-terror/test">
              <WrappedAntiTerrorTest/>
            </Route>
              <Route path="/basic-aid/test">
              <WrappedBasicFirstAidTest/>
            </Route>
              <Route path="/basic-health/test">
              <WrappedBasicHealthyLifeTest/>
            </Route>
              <Route path="/state-defense/test">
              <WrappedStateDefenseFundamentalsTest/>
            </Route>
              <Route path="/at-test-results">
              <ATTestResults/>
            </Route>
              <Route path="/bfa-test-results">
              <BFATestResults/>
            </Route>
              <Route path="/bhl-test-results">
                <BHLTestResults/>
              </Route>
              <Route path="/sdf-test-results">
                <SDFTestResults/>
              </Route>
              <Route path="/course-example">
                <Course_example/>
              </Route>
              <Route path="/teacher-panel">
                <TeacherPanel/>
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
              <Route path="/isb-test-results">
                <ISBTestResults/>
              </Route>
              <Route path="/security-basics">
                <IntegratedSecurityBasics/>
              </Route>
              <Route path="/anti-terror">
                <AntiTerror/>
              </Route>
              <Route path="/basic-health">
                <BasicHealthyLife/>
              </Route>
              <Route path="/basic-aid">
                <BasicFirstAid/>
              </Route>
              <Route path="/state-defense">
                <StateDefenseFundamentals/>
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