import * as React from "react";
import {Button, Radio, Input, notification} from 'antd';
import {gql, ApolloError} from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Form } from '@ant-design/compatible';
import { Select } from 'antd';
import autobind from "autobind-decorator";
import styles from "./User.module.scss";
import {appHistory} from "../../App";


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

const ADD_USR = gql`
    mutation addUser ($fullName: String!, $email: String!, $password: String!, $groupId: BigInt!, $gender: Boolean!, $role: Boolean!) {
        createUsr (
            input: {
                usr: {
                    fullName: $fullName
                    email: $email
                    password: $password
                    groupId: $groupId
                    gender: $gender
                    role: $role
                }
            }
        ) {
            usr {
                id
            }
        }
    }
`;

interface IRegistrationProps {
    form?: any
}

const { Option } = Select;

class Registration extends React.Component<IRegistrationProps, {
    value: boolean,
    textErrorFirst: string,
    textErrorSecond: string,
    arrUsr: any[]
}>{
    public constructor (props: IRegistrationProps) {
        super (props);
        this.state = {
            value: true,
            textErrorFirst: "",
            textErrorSecond: "",
            arrUsr: []
        }
    }

    @autobind
    private handleChange(value: any) {
        console.log(`selected ${value}`);
    }

    openNotification = () => {
        notification.open({
            message: 'Успешная регистрация!',
            description: 'Вы были успешно зарегистрированы и можете войти под своими учетными даными',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 6,
        });
    };

    handleSubmit = (createUsr: any) => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                createUsr({ variables: { fullName: values.fullName, email: values.email, password: values.password, groupId: values.groupId, gender: values.gender, role: false}});
                this.props.form.resetFields();
                this.openAuth();
                this.openNotification();
            } else {
                this.setState({textErrorFirst: "Ошибка! Данный email уже используется,"})
                this.setState({textErrorSecond: "пожалуйста, введите другой email"})
            }
        });
    };

    onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    validatorEmail = (rule: any, str: string, callback: any) => {
        if (str === "") callback('Пожалуйста, заполните поле!');
        else if (!/^([a-z0-9_.-]+\.)*[a-z0-9_.-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,20}$/.test(str)) callback('Разрешены только буквы русского алфавита. Пожалуйста, проверьте введёные данные.');
        callback()
    };

    openAuth = () => {
        appHistory.push("/authorization");
        window.location.reload()
    };

    public render(): React.ReactNode {
        const { getFieldDecorator } = this.props.form;

        return (
            <Query query={GET_GROUPS}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return  <span>"загрузка"</span>
                    if (error) return  <span>'Ошибочка ${error.message}'</span>;
                    if (!this.state.arrUsr) {
                        this.setState({arrUsr: data.allUsrs.nodes})
                    }
                    console.log(data);

                    return (
                        <div className={styles.userPage}>
                            <Mutation mutation={ADD_USR}>
                                {(createUsr: any) => (
                                    <Form className={styles.regForm}>
                                        <div className={styles.registrationSection}>
                                            <div>
                                                <div style={{marginTop: "0px"}} className={styles.userTitle}>Введите ваше ФИО:</div>
                                                <Form.Item className={"regCheck"}>
                                                    {getFieldDecorator('fullName', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Пожалуйста, заполните поле'
                                                        }],
                                                    })(<Input className={"userInput"} placeholder="Фамилия Имя Отчество"/>)}
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <div className={styles.userTitle}>Введите ваш email:</div>
                                                <Form.Item>
                                                    {getFieldDecorator('email', {
                                                        rules: [{
                                                            required: true,
                                                            validator: this.validatorEmail
                                                        }],
                                                    })(<Input className={"userInput"} placeholder="example@gmail.com"/>)}
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <div className={styles.userTitle}>Введите ваш пароль:</div>
                                                <Form.Item>
                                                    {getFieldDecorator('password', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Пожалуйста, заполните поле'
                                                        }],
                                                    })(<Input className={"userInput"} placeholder="Пароль"/>)}
                                                </Form.Item>
                                            </div>
                                            <div className={styles.regRadioBlock}>
                                                <div className={styles.userTitle}>Укажите ваш пол:</div>
                                                <Form.Item>
                                                    {getFieldDecorator('gender')(
                                                        <Radio.Group className={styles.regRadioGroup} onChange={this.onChange} value={this.state.value}>
                                                            <Radio className={styles.regRadioButton} value={true}>мужской</Radio>
                                                            <Radio className={styles.regRadioButton} value={false}>женский</Radio>
                                                        </Radio.Group>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <div className={styles.userTitle}>Выберете вашу группу:</div>
                                                <Form.Item>
                                                    {getFieldDecorator('groupId')(
                                                        <Select className="regSelect" onChange={this.handleChange}>
                                                            {data.allGroups.nodes.map((groupsQuery: any) => (
                                                                <Option value={groupsQuery.id}>{groupsQuery.groupName}</Option>
                                                            ))}
                                                        </Select>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className={styles.authorizationLinks}>
                                                <span>Уже зарегистрированы?</span>
                                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <Button className="regLinkButton" style={{marginTop: "3px"}} onClick={() => this.openAuth()}>Авторизоваться</Button>
                                            </div>
                                            <Button className={"userButton"} style={{marginTop: "5px"}} type="primary" onClick={() => {this.handleSubmit(createUsr)}}>Зарегистрироваться</Button>
                                            <div className={styles.textError}>
                                                <span>{this.state.textErrorFirst}</span>
                                                <span>{this.state.textErrorSecond}</span>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Mutation>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

const WrappedRegistration = Form.create({ name: 'test-page' })(Registration);
export default WrappedRegistration;
