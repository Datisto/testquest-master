import * as React from "react";
import {Button} from "antd";
import autobind from "autobind-decorator";
import {appHistory} from "../../App";
import styles from "./TeacherPanel.module.scss";
import "./TeacherPanel.scss";

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
    private att() {
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

        if (this.state.valueCh !== "") {
            return (
                <div className={styles.pageTeacherPanel}>
                    <div className={styles.teacherPanel}>
                        <span className={styles.teacherPanelHeader}>Результаты тестов по курсам:</span>
                        <Button className="resultButton" type="primary" onClick={() => this.lsb()}>Основы комплексной безопасности</Button>
                        <Button className="resultButton" type="primary" onClick={() => this.att()}><div style={{display: "flex", flexDirection: "column"}}><span>Основы противодействия терроризму и</span><span>экстремизму в Российской Федерации</span></div></Button>
                        <Button className="resultButton" type="primary" onClick={() => this.bhl()}>Основы здорового образа жизни</Button>
                        <Button className="resultButton" type="primary" onClick={() => this.bfa()}><div style={{display: "flex", flexDirection: "column"}}><span>Основы медицинских знаний</span><span>и оказания первой помощи</span></div></Button>
                        <Button className="resultButton" type="primary" onClick={() => this.sdf()}>Основы обороны государства</Button>
                    </div>
                </div>
            )
        } else {
            appHistory.push("/");
            window.location.reload();
        }
    }
};