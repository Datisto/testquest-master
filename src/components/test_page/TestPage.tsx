import * as React from "react";
import {Button, Pagination, Select, Radio} from "antd";
import {ApolloError} from "apollo-client";
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";
import autobind from "autobind-decorator";

const GET_TASK = gql`
    query {
  courseById (id: "1") {
    tasksByCourseId(orderBy: TASK_NUMBER_ASC) {
      nodes {
        taskText
        taskNumber
        answerOptionsByTaskId {
          nodes {
             id
            answerOption
            answerSign
          }
        }
      }
    }
  }
}
`;

export default class TestPage extends React.Component<{}, {
    current: any
    value: any
    i: number
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            current: 1,
            value: 1,
            i: 0
        }
    }

    onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    @autobind
    private testtest() {
        this.setState({i: this.state.i +1})
    }


    public render() {
        return (
            <Query query={GET_TASK}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div>

                                <div>
                                    <span>{data.courseById.tasksByCourseId.nodes[this.state.i].taskText}</span>

                                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                                        {data.courseById.tasksByCourseId.nodes[this.state.i].answerOptionsByTaskId.nodes.map((answerQuery: any) => (
                                            <Radio value={answerQuery.id}>{answerQuery.answerSign}.{answerQuery.answerOption}</Radio>
                                        ))}
                                    </Radio.Group>
                                </div>

                            <Button onClick={() => this.testtest()}>Подтвердить</Button>
                            {/*<p>{taskQuery.taskText}</p>*/}

                            {/*{data.courseById.tasksByCourseId.nodes.map((taskQuery: any) => (*/}
                            {/*    <p>{taskQuery.answerOptionsByTaskId.nodes.map((answerQuery: any) => (*/}
                            {/*        <p>{answerQuery.answerOption}</p>*/}
                            {/*    ))}</p>*/}
                            {/*))}*/}
                        </div>
                    );

                }}
            </Query>
        );
    }
}

