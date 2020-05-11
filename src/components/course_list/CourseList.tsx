import * as React from "react";
import {Query} from "@apollo/react-components";
import {ApolloError} from "apollo-client";
import {Button} from "antd";
import {gql} from "apollo-boost";

const GET_COURSE = gql`
    query {
        allCourses {
             nodes {
              id
              courseName
              courseNumber
              }
        }
    }
`;

export default class CourseList extends React.Component<{}, {

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
                            {data.allCourses.nodes.map((courseQuery: any) => (
                                <Button type="primary" key={courseQuery.id}>
                                    {courseQuery.courseName}
                                </Button>
                            ))}
                        </div>
                    )

                }}
            </Query>
        );
    }
}
