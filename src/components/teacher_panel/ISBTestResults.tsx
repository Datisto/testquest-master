import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import { Query } from "react-apollo";
import {Button, Pagination} from "antd";

const GET_USER_ANSWER = gql`
query {
    allUserAnswers(condition: {courseId: "1"}, orderBy: GROUP_NAME_ASC) {
        nodes {
            courseId
            groupName
            usrByUserId {
                id
                fullName
                userAnswersByUserId(condition: {courseId: "1"}, orderBy: TASK_NUMBER_ASC) {
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

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <Query query={GET_USER_ANSWER}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);
                    const usrMap = new Map();

                    data.allUserAnswers.nodes.forEach((ans: any) => {
                        usrMap.set(ans.usrByUserId.id, ans);
                    });

                    return (
                        <div>
                            {[...usrMap.values()].map((userAnswer: any) => (
                                <div>
                                    <span>{userAnswer.courseId}</span>
                                    <span>{userAnswer.groupName}</span>
                                    <span>{userAnswer.usrByUserId.fullName}</span>
                                    {userAnswer.usrByUserId.userAnswersByUserId.nodes.map((userAnswerById: any) => (
                                       <div>
                                        <span>{userAnswerById.taskNumber}</span>
                                        <span style={(userAnswerById.answerOptionByAnswerId.answerCorrect) ? {color: "green"} : {color: "red"}}>{userAnswerById.answerOptionByAnswerId.answerOption}</span>
                                        <span>{userAnswerById.answerOptionByAnswerId.answerCorrect}</span>
                                       </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    );

                }}
            </Query>
        )
    }
};