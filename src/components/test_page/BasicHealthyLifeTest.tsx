import * as React from "react";
import {Button, Radio} from "antd";
import { Form } from '@ant-design/compatible';
import {ApolloError} from "apollo-client";
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";
import autobind from "autobind-decorator";
import styles from "./TestPage.module.scss";
import "./TestPage.scss";
import { Mutation } from "react-apollo";
import Profile from "../profile/Profile";
import {appHistory} from "../../App";

const GET_TASK = gql`
query {
  courseById (id: "3") {
    tasksByCourseId(orderBy: TASK_NUMBER_ASC) {
      nodes {
        courseId
        taskText
        taskNumber
        answerOptionsByTaskId(orderBy: ANSWER_OPTION_ASC) {
          nodes {
            id
            answerOption
            answerText
            taskId
          }
        }
      }
    }
  }
}
`;

const ADD_RESULT = gql`
    mutation ($userId: BigInt!, $answerId: BigInt!, $courseId: BigInt!, $groupName: String!, $taskNumber: Int!, $taskId: BigInt!) {
        createUserAnswer (
            input: {
                userAnswer: {
                    userId: $userId
                    answerId: $answerId
                    courseId: $courseId
                    groupName: $groupName
                    taskNumber: $taskNumber
                    taskId: $taskId
                }
            }
        ) {
            userAnswer {
                id
            }
        }
    }
`;

interface ITestPageProps {
    form?: any
}

class BasicHealthyLifeTest extends React.Component<ITestPageProps, {
    value: any,
    i: number,
    arrAnswer: any[],
    arrLength: number,
    visible: boolean
}>{
    public constructor (props: ITestPageProps) {
        super (props);
        this.state = {
            value: 1,
            i: 0,
            arrAnswer: [],
            arrLength: 0,
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

    onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    @autobind
    private postResult(createResult: any) {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                if ((this.state.i >= 0) && (this.state.i < (this.state.arrLength - 1))) {
                    createResult({ variables: { userId: localStorage.getItem('usr_id'), answerId: values.answerId, courseId: this.state.arrAnswer[this.state.i].courseId, groupName: localStorage.getItem('groupName'), taskNumber: this.state.arrAnswer[this.state.i].taskNumber, taskId: this.state.arrAnswer[this.state.i].taskId } });
                    this.setState({i: this.state.i + 1});
                }
                else if (this.state.i === (this.state.arrLength - 1)) {
                    createResult({ variables: { userId: localStorage.getItem('usr_id'), answerId: values.answerId, courseId: this.state.arrAnswer[this.state.i].courseId, groupName: localStorage.getItem('groupName'), taskNumber: this.state.arrAnswer[this.state.i].taskNumber, taskId: this.state.arrAnswer[this.state.i].taskId } });
                    appHistory.push('/');
                }
            }
        });
    }


    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Query query={GET_TASK}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    if (!this.state.arrLength) {
                        this.setState({arrLength: data.courseById.tasksByCourseId.nodes.length});
                        this.setState({arrAnswer: data.courseById.tasksByCourseId.nodes})
                    }
                    console.log(this.state.arrLength);
                    console.log(data);

                    return (
                        <div className={styles.testPage}>
                            <Mutation mutation={ADD_RESULT}>
                                {(createResult: any) => (
                                    <Form className={styles.testForm}>
                                        <span className={styles.testPageNumber}>Вопрос: {this.state.i + 1}/{this.state.arrLength}</span>
                                        <span style={{margin: "5px 0 15px 0"}} className={styles.testPageSeparator}/>
                                        <span className={styles.testHeader}>{data.courseById.tasksByCourseId.nodes[this.state.i].taskText}</span>
                                        <Form.Item>
                                            {getFieldDecorator('answerId')(
                                                <Radio.Group className={styles.testRadio} onChange={this.onChange} value={this.state.value}>
                                                    {data.courseById.tasksByCourseId.nodes[this.state.i].answerOptionsByTaskId.nodes.map((answerQuery: any) => (
                                                        <Radio className={styles.testRadioAnswer} value={answerQuery.id}><span style={{fontWeight: "bolder"}}>{answerQuery.answerOption}.</span>&nbsp;{answerQuery.answerText}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                        <span style={{margin: "5px 0 22px 0"}} className={styles.testPageSeparator}/>
                                        <Button className={"testPageButton"} type="primary" onClick={() => this.postResult(createResult)}>{(this.state.i === (data.courseById.tasksByCourseId.nodes.length - 1)) ? ("Закончить текст") : ("Отправить ответ")}</Button>
                                        {/*<Button onClick={this.showModal}>Профиль</Button>*/}
                                        {/*<Profile isVisible={this.state.visible} onClose={this.handleCancel}/>*/}
                                    </Form>
                                )}
                            </Mutation>
                        </div>
                    );

                }}
            </Query>
        );
    }
}

const WrappedBasicHealthyLifeTest = Form.create({ name: 'test-page' })(BasicHealthyLifeTest);
export default WrappedBasicHealthyLifeTest;

