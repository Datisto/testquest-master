import * as React from "react";
import { Button } from 'antd';

export default class Authorization extends React.Component<{}, {

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <div>
                <input placeholder="Почта" />
                <input placeholder="пароль" />
                <Button type="primary">Вход</Button>
            </div>
        );
    }
}