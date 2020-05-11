import * as React from "react";
import {gql} from "apollo-boost";
import { Mutation } from "react-apollo";
import {Form, Input, Button} from "antd";
import { FormCreateKostyl } from "../../utils";


const ADD_QUEST = gql`
mutation Addquest ($courseId: BigInt!, $taskNumber: Int!, $taskText: String!) {
    createTask (
        input: {
            task: {
                courseId: $courseId
                taskNumber: $taskNumber
                taskText: $taskText
        }
    }
) {
        task {
            id
            courseId
            taskNumber
            taskText
        }
    }

}
`;

interface IQuestAddProps {
    form?: any
}

 class InputQuestion extends React.Component<IQuestAddProps, {
    test: string
}>{
    public constructor (props: IQuestAddProps) {
        super(props);
        this.state = {
            test: ""
        }
    }


    handleSubmit = (createTask: any) => {
        this.props.form.validateFields((err:any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                createTask({ variables: { courseId: values.courseId, taskNumber: Number(values.taskNumber), taskText: values.taskText } });
                this.props.form.resetFields();
            }
        });
    };

    public render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Mutation mutation={ADD_QUEST}>
                {(createTask: any, {}) => (
                    <Form>
                        <Form.Item>
                            {getFieldDecorator('courseId', {
                                rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                            })(
                               <Input placeholder="ід курса"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('taskNumber', {
                                rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                            })(
                        <Input placeholder="номер тесту"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('taskText', {
                                rules: [{ required: true, message: 'Пожалуйста, заполните поле!' }],
                            })(
                        <Input placeholder="текст тесту" />
                            )}
                        </Form.Item>
                        <Button onClick={() => {this.handleSubmit(createTask)}}>добавити</Button>
                    </Form>
                )}
            </Mutation>
        );
    }

}

export default Form.create()(InputQuestion) as unknown as React.ComponentClass<FormCreateKostyl<InputQuestion>>;