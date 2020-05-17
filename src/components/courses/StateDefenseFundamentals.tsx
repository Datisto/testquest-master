import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import {Query} from "@apollo/react-components";
import {Button, Pagination} from "antd";
import {inspect} from "util";
import styles from "./Courses.module.scss";
import autobind from "autobind-decorator";
import {appHistory} from "../../App";

const  GET_COURSE_PAGE = gql`
    query {
  allPages (condition: {courseId: "5"} ){
    nodes {
      id
      courseId
      pageNumber
      pageText
      pageImg
      pageTitle
    }
  }
}
`;

const GET_COURSE_RESULT = gql`
query {
  allUserCourseResults {
    nodes {
      courseId
      userId
    }
  }
}
`;

export default class StateDefenseFundamentals extends React.Component<{}, {
    current: any,
    currentCourseId: number,
    currentIndex: number
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            current: 1,
            currentCourseId: 0,
            currentIndex: -2
        }
    }

    onChange = (page: any) => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    @autobind
    private openTest() {
        if (this.state.currentIndex < 0) {
            appHistory.push("/state-defense/test");
            window.location.reload();
        } else {
            appHistory.push("/");
            window.location.reload();
        }
    }

    public render() {
        return (
            <Query query={GET_COURSE_PAGE}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div className={styles.pageCourse}>
                            <div className={styles.courseBlock}>
                                <span className={styles.courseImg}><img src={data.allPages.nodes[this.state.current -1].pageImg} alt=""/></span>
                                <span className={styles.courseSeparator}/>
                                <span className={styles.pageHeader}>{data.allPages.nodes[this.state.current -1].pageTitle}</span>
                                <div className={styles.pageText}>{data.allPages.nodes[this.state.current -1].pageText}</div>
                                <Query query={GET_COURSE_RESULT}>
                                    {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                                        if (loading) return <span>"загрузка"</span>;
                                        if (error) return <span>'Ошибочка ${error.message}'</span>;
                                        if (this.state.currentIndex === -2) {
                                            this.setState({currentIndex: data.allUserCourseResults.nodes.findIndex((v: any) => (v.courseId === this.state.currentCourseId) && (v.userId === localStorage.getItem('usrId')))});
                                        }
                                        console.log(this.state.currentIndex);
                                        console.log(data);

                                        return (
                                            <div className={styles.courseButtonBlock}>
                                                {(this.state.current === 5) ?
                                                    (
                                                        <Button type={"primary"} className="courseButton" onClick={() => this.openTest()}>{(this.state.currentIndex < 0) ? "Начать тест" : "Вернуться на главную"}</Button>
                                                    ) : null
                                                }
                                            </div>
                                        );
                                    }}
                                </Query>
                                <span className={styles.courseSeparator}/>
                                <Pagination className={styles.pagePaginator} current={this.state.current} onChange={this.onChange} total={50} />
                            </div>
                        </div>
                    );

                }}
            </Query>
        );
    }
}