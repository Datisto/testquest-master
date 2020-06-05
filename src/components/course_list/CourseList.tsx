import * as React from "react";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import {Query} from "@apollo/react-components";
import {ApolloError} from "apollo-client";
import {Button} from "antd";
import {gql} from "apollo-boost";
import styles from "./CourseList.module.scss";
import "./CourseList.scss";
import Profile from "../profile/Profile";
import autobind from "autobind-decorator";
import {appHistory} from "../../App";
import {url} from "inspector";

const GET_COURSE = gql`
    query {
        allCourses {
             nodes {
                  courseNumber
                  courseName
                  courseAnnotation
              }
        }
    }
`;

export default class CourseList extends React.Component<{}, {
    visible: boolean
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            visible: false
        }
    }

    @autobind
    private showModal() {
        this.setState({visible: true});
    };

    @autobind
    private handleCancel() {
        this.setState({visible: false});
    };

    handleExit = () => {
        localStorage.setItem('email', "");
        localStorage.setItem('gender', "");
        localStorage.setItem('usr_id', "");
        localStorage.setItem('chcd', "");
        localStorage.setItem('password', "");
        localStorage.setItem('fullName', "");
        localStorage.setItem('groupName', "");

        appHistory.push('/authorization');
        window.location.reload();
    };

    @autobind
    private openCourse1() {
        appHistory.push("/security-basics");
        window.location.reload();
    }

    @autobind
    private openCourse2() {
        appHistory.push("/anti-terror");
        window.location.reload();
    }

    @autobind
    private openCourse3() {
        appHistory.push("/basic-health");
        window.location.reload();
    }

    @autobind
    private openCourse4() {
        appHistory.push("/basic-aid");
        window.location.reload();
    }

    @autobind
    private openCourse5() {
        appHistory.push("/workplace-safety");
        window.location.reload();
    }

    public render() {
        if (localStorage.getItem('email') !== "") {
            return (
                <Query query={GET_COURSE}>
                    {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                        if (loading) return <span>"загрузка"</span>
                        if (error) return <span>'Ошибочка ${error.message}'</span>;
                        console.log(data);
                        console.log(localStorage.getItem('chcd'))

                        return (
                            <div className={styles.courseListPage}>
                                <div className={styles.courseListHeader}>
                                    <span/>
                                    <div className={styles.courseListHeaderBlock}>
                                        <div className={styles.courseListHeaderUserInfo}>
                                            <span>Группа:&nbsp;{localStorage.getItem('groupName')}</span>
                                            <span className={styles.courseListHeaderVerticalSeparator}/>
                                            <span>{localStorage.getItem('fullName')}</span>
                                        </div>
                                        <span className={styles.courseListHeaderSeparator}/>
                                        <div className={styles.courseListHeaderUserInfo}>
                                            <Button className="profileButton" onClick={this.showModal}>Профиль</Button>
                                            <Profile isVisible={this.state.visible} onClose={this.handleCancel}/>
                                            <span className={styles.courseListHeaderVerticalSeparator}/>
                                            <Button className="exitButton" onClick={() => this.handleExit()}><span className={styles.courseListHeaderImg}><img src="/static/svg/exit_red.svg" alt=""/></span></Button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.courseListMenu}>
                                    <Button className="courseButton6" onClick={() => this.openCourse5()}>
                                        <div className={styles.courseListMenuCourse}>
                                            <span className={styles.courseListMenuTitle}>1.&nbsp;{data.allCourses.nodes[5].courseName}</span>
                                            <span className={styles.courseListMenuText}>{data.allCourses.nodes[5].courseAnnotation}</span>
                                        </div>
                                    </Button>
                                    <Button className="courseButton1" onClick={() => this.openCourse1()}>
                                        <div className={styles.courseListMenuCourse}>
                                            <span className={styles.courseListMenuTitle}>2.&nbsp;{data.allCourses.nodes[0].courseName}</span>
                                            <span className={styles.courseListMenuText}>{data.allCourses.nodes[0].courseAnnotation}</span>
                                        </div>
                                    </Button>
                                    <Button className="courseButton2" onClick={() => this.openCourse2()}>
                                        <div className={styles.courseListMenuCourse}>
                                            <span className={styles.courseListMenuTitle}>3.courseNumber}.&nbsp;{data.allCourses.nodes[1].courseName}</span>
                                            <span className={styles.courseListMenuText}>{data.allCourses.nodes[1].courseAnnotation}</span>
                                        </div>
                                    </Button>
                                    <Button className="courseButton3" onClick={() => this.openCourse3()}>
                                        <div className={styles.courseListMenuCourse}>
                                            <span className={styles.courseListMenuTitle}>4.&nbsp;{data.allCourses.nodes[2].courseName}</span>
                                            <span className={styles.courseListMenuText}>{data.allCourses.nodes[2].courseAnnotation}</span>
                                        </div>
                                    </Button>
                                    <Button className="courseButton4" onClick={() => this.openCourse4()}>
                                        <div className={styles.courseListMenuCourse}>
                                            <span className={styles.courseListMenuTitle}>5.&nbsp;{data.allCourses.nodes[3].courseName}</span>
                                            <span className={styles.courseListMenuText}>{data.allCourses.nodes[3].courseAnnotation}</span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                </Query>
            );
        } else {
            appHistory.push("/authorization");
            window.location.reload()
        }
    }
}
