import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import {Query} from "@apollo/react-components";
import {Button, Pagination} from "antd";
import {inspect} from "util";
import styles from "./Courses.module.scss";

const  GET_COURSE_PAGE = gql`
    query {
  allPages (condition: {courseId: "3"} ){
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

export default class BasicHealthyLife extends React.Component<{}, {
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
            <Query query={GET_COURSE_PAGE}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div>
                            <p>{data.allPages.nodes[this.state.current -1].pageImg}</p>
                            <p>{data.allPages.nodes[this.state.current -1].pageText}</p>
                            {this.state.current === 10 && (<Button>Тест</Button>)}
                            <Pagination current={this.state.current} onChange={this.onChange}  total={100} />
                        </div>
                    );

                }}
            </Query>
        );
    }
}