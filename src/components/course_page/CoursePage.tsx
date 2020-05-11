import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import {Query} from "@apollo/react-components";
import {Button, Pagination} from "antd";

const  GET_COURSEPAGE = gql`
    query {
  allCourses {
    nodes {
      id
      courseName
      courseNumber
      courseAnnotation
    }
  }
}
`;

export default class CoursePage extends React.Component<{}, {
    current: any
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            current: 1
        }
    }

    onChange = (page: any) => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    public render() {
        return (
            <Query query={GET_COURSEPAGE}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div>
                            <p>{data.allCourses.nodes[this.state.current -1].courseNumber}</p>
                            <p>{data.allCourses.nodes[this.state.current -1].courseName}</p>
                            <p>{data.allCourses.nodes[this.state.current -1].courseAnnotation}</p>
                            <Pagination current={this.state.current} onChange={this.onChange}  total={100} />
                            {this.state.current === 10 && (<Button>Тест</Button>)}
                        </div>
                    );

                }}
            </Query>
        );
    }
}