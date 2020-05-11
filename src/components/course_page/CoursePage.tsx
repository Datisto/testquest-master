import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import {Query} from "@apollo/react-components";
import {Button} from "antd";

const  GET_COURSEPAGE = gql`
    query {
        pageByCourseIdAndPageNumber(courseId: "1", pageNumber: 1 ) { 
              courseId
              pageNumber
              pageText
              pageImg
        }
    }

`;

export default class CoursePage extends React.Component<{}, {

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <Query query={GET_COURSEPAGE}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div>
                            <p>{data.pageByCourseIdAndPageNumber.pageImg}</p>
                            <p>{data.pageByCourseIdAndPageNumber.pageText}</p>
                            <Button>{data.pageByCourseIdAndPageNumber.pageNumber - 1}</Button>
                            <p>{data.pageByCourseIdAndPageNumber.pageNumber}</p>
                            <Button>{data.pageByCourseIdAndPageNumber.pageNumber + 1}</Button>
                        </div>
                    )

                }}
            </Query>
        );
    }
}