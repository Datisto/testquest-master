import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import {Query} from "@apollo/react-components";

const GET_USR = gql`
    query {
        usrById(id: "2") { 
              id
              email
              fullName
              groupId
              gender
              groupByGroupId {
                groupName
              }
        }
    }
`;

export default class Profile extends React.Component<{}, {

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <Query query={GET_USR}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                    return (
                        <div>
                                    <p>{data.usrById.email}</p>
                                    <p>{data.usrById.fullName}</p>
                                    <p>{data.usrById.gender? "Мужской" : "Женский"}</p>
                                    <p>{data.usrById.groupByGroupId.groupName}</p>
                        </div>
                    )

                }}
            </Query>
        );
    }
}