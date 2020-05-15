import * as React from "react";
import "./Profile.scss";
import styles from "./Profile.module.scss";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";

export default class Profile extends React.Component<any, any> {
    public render() {
        const { isVisible, onClose } = this.props;

        return (
            <Modal
                title={localStorage.getItem('fullName')}
                visible={ isVisible }
                onCancel={ onClose }
                footer={[<Button className={"newsButtonInModal"} key="submit" type="primary" onClick={onClose}>Закрыть</Button>]}
                className={"profileTitle"}
            >
                <div className={styles.profilePage}><span style={{fontWeight: "bolder"}}>Пол:&nbsp;</span>{localStorage.getItem('gender')}</div>
                <div className={styles.profilePage}><span style={{fontWeight: "bolder"}}>Группа:&nbsp;</span>{localStorage.getItem('groupName')}</div>
                <div className={styles.profilePage}><span style={{fontWeight: "bolder"}}>E-mail:&nbsp;</span>{localStorage.getItem('email')}</div>
            </Modal>
        );
    }
}