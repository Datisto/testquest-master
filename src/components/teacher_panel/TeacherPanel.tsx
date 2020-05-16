import * as React from "react";
import {Button} from "antd";
import autobind from "autobind-decorator";
import {appHistory} from "../../App";

export default class TeacherPanel extends React.Component<{}, {
    valueCh: any
}>{
    public constructor (props: any) {
        super (props);
        this.state = {
            valueCh: localStorage.getItem('chcd')
        }
    }

    @autobind
    private lsb() {
        appHistory.push("/isb-test-results");
        window.location.reload();
    }
    @autobind
    private at() {
        appHistory.push("/at-test-results");
        window.location.reload();
    }
    @autobind
    private bhl() {
        appHistory.push("/bhl-test-results");
        window.location.reload();
    }
    @autobind
    private bfa() {
        appHistory.push("/bfa-test-results");
        window.location.reload();
    }
    @autobind
    private sdf() {
        appHistory.push("/sdf-test-results");
        window.location.reload();
    }

    public render() {
        if (this.state.valueCh != null) {
            return (
                <div>
                    {console.log(localStorage.getItem('usr_role'))}
                    <span>Результаты тестов по курсам:</span>
                    <Button onClick={() => this.lsb()}>Основы комплексной безопасности</Button>
                    <Button onClick={() => this.at()}>Основы противодействия терроризму и экстремизму в Российской
                        Федерации</Button>
                    <Button onClick={() => this.bhl()}>Основы здорового образа жизни</Button>
                    <Button onClick={() => this.bfa()}>Основы медицинских знаний и оказание первой помощи</Button>
                    <Button onClick={() => this.sdf()}>Основы обороны государства</Button>
                </div>
            )
        } else {
            appHistory.push("/");
            window.location.reload();
        }
    }
};