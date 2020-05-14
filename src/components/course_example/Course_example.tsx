import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import { Button } from 'antd';
import {Query} from "@apollo/react-components";

const GET_COURSE = gql`
    query {
        courseById(id: "1") {
    id
    courseName
    courseNumber
    courseAnnotation
  }
    }
`;

export default class Course_example extends React.Component<{}, {

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <Query query={GET_COURSE}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div>
                            <p>{data.courseById.courseName}</p>
                            <p>{data.courseById.courseNumber}</p>
                            <p>{data.courseById.courseAnnotation}</p>
                            <Button href={data.courseById}>Начать</Button>
                        </div>
                    )

                }}
                </Query>
        );
    }
}