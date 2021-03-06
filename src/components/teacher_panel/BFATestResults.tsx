import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import { Query } from "react-apollo";
import {Button, Pagination} from "antd";
import styles from "./TeacherPanel.module.scss";

const GET_USER_ANSWER = gql`
query {
    allUserAnswers(condition: {courseId: "4"}, orderBy: GROUP_NAME_ASC) {
        nodes {
            courseId
            groupName
            usrByUserId {
                id
                fullName
                userAnswersByUserId(condition: {courseId: "4"}, orderBy: TASK_NUMBER_ASC) {
                    nodes{
                        taskNumber
                        answerOptionByAnswerId {
                            answerOption
                            answerCorrect
                        }
                    }
                }
            }
        }
    }
}
`;


export default class ISBTestResults extends React.Component<{}, {
    krok: any
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            krok: localStorage.getItem('chcd')
        }
    }

    public render() {
        if (this.state.krok !== "") {
            return (
                <Query query={GET_USER_ANSWER}>
                    {({loading, error, data}: { loading: boolean, error?: ApolloError, data: any }) => {
                        if (loading) return <span>"загрузка"</span>;
                        if (error) return <span>'Ошибочка ${error.message}'</span>;
                        console.log(data);
                        const usrMap = new Map();

                        data.allUserAnswers.nodes.forEach((ans: any) => {
                            usrMap.set(ans.usrByUserId.id, ans);
                        });

                        return (
                            <div className={styles.pageResult}>
                                <span className={styles.resultHeader} style={{marginTop: "10vh", color: "#656565"}}>РЕЗУЛЬТАТЫ ТЕСТА ПО КУРСУ:</span>
                                <span className={styles.resultHeader} style={{fontWeight: "normal"}}>ОСНОВЫ МЕДИЦИНСКИХ ЗНАНИЙ</span>
                                <span className={styles.resultHeader} style={{fontWeight: "normal"}}>И ОКАЗАНИЯ ПЕРВОЙ ПОМОЩИ</span>
                                <span className={styles.resultSeparator}/>
                                <div className={styles.resultList}>
                                    {[...usrMap.values()].map((userAnswer: any) => (
                                        <div className={styles.userNotation}>
                                            <span>{userAnswer.groupName}</span>
                                            <span style={{display: "flex", justifyContent: "center"}}>|</span>
                                            <span>{userAnswer.usrByUserId.fullName}</span>
                                            <span style={{display: "flex", justifyContent: "center"}}>|</span>
                                            <div className={styles.userResult}>
                                                {userAnswer.usrByUserId.userAnswersByUserId.nodes.map((userAnswerById: any) => (
                                                    <div>
                                                        <span>{userAnswerById.taskNumber}.</span>
                                                        <span style={(userAnswerById.answerOptionByAnswerId.answerCorrect) ? {color: "green"} : {color: "red"}}>
                                                            {userAnswerById.answerOptionByAnswerId.answerOption}&nbsp;&nbsp;
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );

                    }}
                </Query>
            )
        }
    }
};