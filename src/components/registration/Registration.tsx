import * as React from "react";
import {Button, Radio} from 'antd';
import {gql, ApolloError} from "apollo-boost";
import { Query } from "react-apollo";
import { Select } from 'antd';
import autobind from "autobind-decorator";


const GET_GROUPS = gql`
    query {
        allGroups {
             nodes {
                 id
                 groupName
                 sysName
              }
        }
    }
`;

const { Option } = Select;

export default class Registration extends React.Component<{}, {
    value: boolean
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            value: true
        }
    }

    @autobind
    private handleChange(value: any) {
        console.log(`selected ${value}`);
    }

    onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    public render(): React.ReactNode {
        return (
            <Query query={GET_GROUPS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return  <span>"загрузка"</span>
                    if (error) return  <span>'Ошибочка ${error.message}'</span>;
                    console.log(data);

                return (
                    <div>
                <input placeholder="ФИО"/>
                <input placeholder="Почта"/>
                <input placeholder="Пароль"/>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio value={true}>Мужской</Radio>
                    <Radio value={false}>Женский</Radio>
                </Radio.Group>

                <div>
                    <Select  style={{ width: 120 }} onChange={this.handleChange}>
                    {data.allGroups.nodes.map((groupsQuery: any) => (
                        <Option value={groupsQuery.sysName}>{groupsQuery.groupName}</Option>
                    ))}
                    </Select>
                </div>
                        <Button type="primary">Зарегистрировать</Button>
                    </div>
                        );
                }}
            </Query>
        );
    }
}
