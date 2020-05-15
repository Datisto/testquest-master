import * as React from "react";
import {ApolloError, gql} from "apollo-boost";
import {Button, Input, notification} from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Form } from '@ant-design/compatible';
import styles from "./User.module.scss";
import "./User.scss";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import {appHistory} from "../../App";

const GET_USER = gql`
    query {
        allUsrs {
            nodes {
                id
                email
                fullName
                password
                gender
                groupId
                groupByGroupId {
                    groupName
                }
            }
        }
    }
`;

interface IRegistrationProps {
    form?: any
}

class Authorization extends React.Component<IRegistrationProps, {
    arrUsr: any[],
    test: string,
    textErrorFirst: string,
    textErrorSecond: string
}>{
    public constructor(props: IRegistrationProps) {
        super(props);
        this.state = {
            arrUsr: [],
            test: "",
            textErrorFirst: "",
            textErrorSecond: ""
        }
    }

    openNotification = () => {
        notification.open({
            message: 'Успешная регистрация!',
            description: 'Вы были успешно зарегистрированы и можете войти под своими учетными даными',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            duration: 6,
        });
    };

    handleSubmit = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // this.props.form.resetFields();
            }

            const userDate = this.state.arrUsr.find(v => (v.email === values.email) && (v.password === values.password));
            if (userDate) {
                localStorage.setItem('email', values.email);
                localStorage.setItem('usr_id', userDate.id);
                localStorage.setItem('password', values.password);
                localStorage.setItem('fullName', userDate.fullName);
                localStorage.setItem('groupName', userDate.groupByGroupId.groupName);

                if(userDate.gender) {
                    localStorage.setItem('gender', "Мужской");
                } else {
                    localStorage.setItem('gender', "Женский");
                }

                appHistory.push('/');
                window.location.reload();
                this.openNotification();
            } else {
                this.setState({textErrorFirst: "Ошибка! Пользователь не найден,"})
                this.setState({textErrorSecond: "или учетные данные некорректны"})

                localStorage.setItem('email', "");
                localStorage.setItem('gender', "");
                localStorage.setItem('usr_id', "");
                localStorage.setItem('password', "");
                localStorage.setItem('fullName', "");
                localStorage.setItem('groupName', "");
            }

        });
    };

    validatorEmail = (rule: any, str: string, callback: any) => {
        if (str === "") callback('Пожалуйста, заполните поле!');
        else if (!/^([a-z0-9_.-]+\.)*[a-z0-9_.-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,20}$/.test(str)) callback('Разрешены только буквы русского алфавита. Пожалуйста, проверьте введёные данные.');
        callback()
    };

    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Query query={GET_USER}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>"загрузка"</span>;
                    if (error) return <span>'Ошибочка ${error.message}'</span>;
                    if(!this.state.arrUsr.length) {
                        this.setState({arrUsr: data.allUsrs.nodes})
                    }
                    return (
                        <div className={styles.userPage}>
                            <Form className={styles.authForm}>
                                <div className={styles.authorizationSection}>
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
                                            })(<Input className={"userInput"} type="password" placeholder="Пароль"/>)}
                                        </Form.Item>
                                    </div>
                                    <span className={styles.userSeparator}/>
                                    <Button className={"userButton"} style={{marginTop: "20px"}} key="submit" type="primary" onClick={() => {this.handleSubmit()}}>Войти</Button>
                                    <div className={styles.textError}>
                                        <span>{this.state.textErrorFirst}</span>
                                        <span>{this.state.textErrorSecond}</span>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

const WrappedAuthorization = Form.create({ name: 'registration' })(Authorization);
export default WrappedAuthorization;