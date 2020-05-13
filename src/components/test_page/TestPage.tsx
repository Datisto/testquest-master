import * as React from "react";
import {Button, Select} from "antd";
import {ApolloError} from "apollo-client";
import {Query} from "@apollo/react-components";

export default class TestPage extends React.Component<{}, {

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
            <div></div>
        );
    }
}

