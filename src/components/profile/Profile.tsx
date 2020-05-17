import * as React from "react";
import "./Profile.scss";
import styles from "./Profile.module.scss";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import autobind from "autobind-decorator";
import {appHistory} from "../../App";

export default class Profile extends React.Component<any, any> {
    @autobind private openLink() {
        appHistory.push("/teacher-panel");
        window.location.reload();
    }

    public render() {
        const { isVisible, onClose } = this.props;

        return (
            <Modal
                title={localStorage.getItem('fullName')}
                visible={ isVisible }
                onCancel={ onClose }
                footer={[<Button className="profileButtonInModal" key="submit" type="primary" onClick={onClose}>Закрыть</Button>]}
                className={"profileTitle"}
            >
                <div className={styles.profilePage}><span style={{fontWeight: "bolder"}}>Пол:&nbsp;</span>{localStorage.getItem('gender')}</div>
                <div className={styles.profilePage}><span style={{fontWeight: "bolder"}}>Группа:&nbsp;</span>{localStorage.getItem('groupName')}</div>
                <div className={styles.profilePage}><span style={{fontWeight: "bolder"}}>E-mail:&nbsp;</span>{localStorage.getItem('email')}</div>
                {(localStorage.getItem('chcd') !== null) ? (
                    <Button className="profileLinkButton" onClick={() => this.openLink()}>Панель преподавателя</Button>
                ) : null}
            </Modal>
        );
    }
}