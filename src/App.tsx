import React from 'react';
import styles from "./App.module.scss";
import {BrowserRouter as Router, HashRouter, Route, Switch, withRouter} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {client} from "./index";
import Registration from "./components/user/Registration";
import IntegratedSecurityBasics from "./components/courses/IntegratedSecurityBasics";
import AntiTerror from "./components/courses/AntiTerror";
import BasicHealthyLife from "./components/courses/BasicHealthyLife";
import BasicFirstAid from "./components/courses/BasicFirstAid";
import StateDefenseFundamentals from "./components/courses/StateDefenseFundamentals";
import ISBTestResults from "./components/teacher_panel/ISBTestResults";
import ATTestResults from "./components/teacher_panel/ATTestResults";
import BFATestResults from "./components/teacher_panel/BFATestResults";
import BHLTestResults from "./components/teacher_panel/BHLTestResults";
import SDFTestResults from "./components/teacher_panel/SDFTestResults";

import {createBrowserHistory} from 'history';
import CourseList from './components/course_list/CourseList';
import WrappedAuthorization from "./components/user/Authorization";
import WrappedIntegratedSecurityBasicsTest from "./components/test_page/IntegratedSecurityBasicsTest";
import WrappedAntiTerrorTest from "./components/test_page/AntiTerrorTest";
import WrappedBasicFirstAidTest from "./components/test_page/BasicFirstAidTest";
import WrappedBasicHealthyLifeTest from "./components/test_page/BasicHealthyLifeTest";
import WrappedStateDefenseFundamentalsTest from "./components/test_page/StateDefenseFundamentalsTest";
import TeacherPanel from "./components/teacher_panel/TeacherPanel";
import ProgrammerWorkplaceSafety from "./components/courses/ProgrammerWorkplaceSafety";
import ProgrammerWorkplaceSafetyTest from "./components/test_page/ProgrammerWorkplaceSafetyTest";
import WrappedProgrammerWorkplaceSafetyTest from './components/test_page/ProgrammerWorkplaceSafetyTest';
import WSTestResults from "./components/teacher_panel/WSTestResults";

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
        <></>
    );
  };
}

const AppHeader = withRouter(AppHeaderInner);

export const appHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
      <HashRouter history={appHistory}>
        <ApolloProvider client={client}>
          <div className={styles.appHeader}>
            <AppHeader/>
            <Switch>
              {/*-------------------------*/}
              <Route path="/workplace-safety/test">
                <WrappedProgrammerWorkplaceSafetyTest/>
              </Route>
              <Route path="/security-basics/test">
                <WrappedIntegratedSecurityBasicsTest/>
              </Route>
              <Route path="/anti-terror/test">
                <WrappedAntiTerrorTest/>
              </Route>
              <Route path="/basic-health/test">
                <WrappedBasicHealthyLifeTest/>
              </Route>
              <Route path="/basic-aid/test">
                <WrappedBasicFirstAidTest/>
              </Route>
              <Route path="/state-defense/test">
                <WrappedStateDefenseFundamentalsTest/>
              </Route>
              {/*-------------------------*/}
              <Route path="/workplace-safety">
                <ProgrammerWorkplaceSafety/>
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
              {/*-------------------------*/}
              <Route path="/teacher-panel">
                <TeacherPanel/>
              </Route>
              <Route path="/pws-test-results">
                <WSTestResults/>
              </Route>
              <Route path="/isb-test-results">
                <ISBTestResults/>
              </Route>
              <Route path="/at-test-results">
                <ATTestResults/>
              </Route>
              <Route path="/bhl-test-results">
                <BHLTestResults/>
              </Route>
                <Route path="/bfa-test-results">
                <BFATestResults/>
              </Route>
              <Route path="/sdf-test-results">
                <SDFTestResults/>
              </Route>
              {/*-------------------------*/}
              <Route path="/registration">
                <Registration/>
              </Route>
              <Route path="/authorization">
                <WrappedAuthorization/>
              </Route>
              <Route path="/">
                <CourseList/>
              </Route>
            </Switch>
          </div>
        </ApolloProvider>
      </HashRouter>
  );
};

export default App;