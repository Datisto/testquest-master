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
import {appHistory} from "../../App";

const GET_TASK = gql`
query {
  courseById (id: "11") {
    tasksByCourseId(orderBy: TASK_NUMBER_ASC) {
      nodes {
        id
        courseId
        taskText
        taskNumber
        answerOptionsByTaskId(orderBy: ANSWER_OPTION_ASC) {
          nodes {
            id
            answerOption
            answerText
          }
        }
      }
    }
  }
}
`;

const ADD_RESULT = gql`
    mutation addResult ($userId: BigInt!, $answerId: BigInt!, $courseId: BigInt!, $groupName: String!, $taskNumber: Int!) {
        createUserAnswer (
            input: {
                userAnswer: {
                    userId: $userId
                    answerId: $answerId
                    courseId: $courseId
                    groupName: $groupName
                    taskNumber: $taskNumber
                }
            }
        ) {
            userAnswer {
                id
            }
        }
    }
`;

const ADD_FINISH = gql`
    mutation addFinish ($courseId: BigInt!, $userId: BigInt! ) {
      createUserCourseResult (
        input: {
          userCourseResult: {
            courseId: $courseId
            userId: $userId
          }
        }
      ) {
        userCourseResult {
          id
        }
      }
    }
`;

interface IPWSProps {
    form?: any
}

class ProgrammerWorkplaceSafetyTest extends React.Component<IPWSProps, {
    value: any,
    i: number,
    arrAnswer: any[],
    arrLength: number,
    visible: boolean
}>{
    public constructor (props: IPWSProps) {
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
                createResult({ variables: { userId: localStorage.getItem('usrId'), answerId: values.answerId, courseId: this.state.arrAnswer[this.state.i].courseId, groupName: localStorage.getItem('groupName'), taskNumber: this.state.arrAnswer[this.state.i].taskNumber }});
                if (this.state.i !== (this.state.arrLength - 1)) {
                    this.setState({i: this.state.i + 1});
                }
            }
        });
    }

    @autobind
    private postFinish(createFinish: any) {
        createFinish({ variables: { userId: localStorage.getItem('usrId'), courseId: this.state.arrAnswer[this.state.i].courseId} });
        appHistory.push('/');
        window.location.reload();
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
                                        {(this.state.i === (data.courseById.tasksByCourseId.nodes.length - 1)) ? (
                                            <Mutation mutation={ADD_FINISH}>
                                                {(createFinish: any) => (
                                                    <Button className={"testPageButton"} type="primary" onClick={() => {this.postFinish(createFinish); this.postResult(createResult)}}>Закончить текст</Button>
                                                )}
                                            </Mutation>
                                        ) : (
                                            <Button className={"testPageButton"} type="primary" onClick={() => this.postResult(createResult)}>Отправить ответ</Button>
                                        )}
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

const WrappedProgrammerWorkplaceSafetyTest = Form.create({ name: 'test-page' })(ProgrammerWorkplaceSafetyTest);
export default WrappedProgrammerWorkplaceSafetyTest;

