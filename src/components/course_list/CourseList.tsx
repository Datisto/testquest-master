import * as React from "react";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import {Query} from "@apollo/react-components";
import {ApolloError} from "apollo-client";
import {Button} from "antd";
import {gql} from "apollo-boost";
import styles from "./CourseList.module.scss";

const GET_COURSE = gql`
    query {
        allCourses {
             nodes {
              id
              courseName
              courseNumber
              }
        }
    }
`;

export default class CourseList extends React.Component<{}, {

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <div className={styles.courseListPage}>
                <div className={styles.courseListHeader}>
                    <span/>
                    <div className={styles.courseListHeaderBlock}>
                        <div className={styles.courseListHeaderUserInfo}>
                            <span>Группа 321</span>
                            <span className={styles.courseListHeaderVerticalSeparator}/>
                            <span>Егоров Антон Павлович</span>
                        </div>
                        <span className={styles.courseListHeaderSeparator}/>
                        <div className={styles.courseListHeaderUserInfo}>
                            <Link>Профиль</Link>
                            <span className={styles.courseListHeaderVerticalSeparator}/>
                            <span className={styles.courseListHeaderImg}><img src="/static/svg/exit_red.svg" alt=""/></span>
                        </div>
                    </div>
                </div>
                <div className={styles.courseListMenu}>
                    <div className={styles.courseListMenuCourse}>
                        <span style={{alignSelf: "center", marginLeft: "10px", fontFamily: "Roboto", fontSize: "16px", fontWeight: "normal", lineHeight: "1", color: "white"}}>1. ОСНОВЫ БЕЗОПАСНОСТИ ЖИЗНЕДЕЯТЕЛЬНОСТИ</span>
                        <span style={{alignSelf: "start", marginLeft: "10px", fontFamily: "Roboto", fontSize: "15px", fontWeight: "normal", lineHeight: "1", color: "white"}}>
                            Изучая курс «Основы безопасности жизнедеятельности», вы узнаете ответы на вопросы о том, как уберечься от опасностей в различных жизненных ситуациях, сможете найти правильное решение для сохранения и укрепления здоровья. Данный курс призван помочь вам систематизировать свои знания, полученные на занятиях ОБЖ, по вопросам обеспечения личной безопасности в повседневной жизни, более детально познакомиться с организационными основами борьбы с терроризмом и наркобизнесом в РФ.
                        </span>
                    </div>
                    <span/>
                    <div className={styles.courseListMenuCourse}>
                        <span style={{alignSelf: "center", marginLeft: "10px", fontFamily: "Roboto", fontSize: "16px", fontWeight: "normal", lineHeight: "1", color: "white"}}>1. ОСНОВЫ БЕЗОПАСНОСТИ ЖИЗНЕДЕЯТЕЛЬНОСТИ</span>
                        <span style={{alignSelf: "start", marginLeft: "10px", fontFamily: "Roboto", fontSize: "15px", fontWeight: "normal", lineHeight: "1", color: "white"}}>
                            Изучая курс «Основы безопасности жизнедеятельности», вы узнаете ответы на вопросы о том, как уберечься от опасностей в различных жизненных ситуациях, сможете найти правильное решение для сохранения и укрепления здоровья. Данный курс призван помочь вам систематизировать свои знания, полученные на занятиях ОБЖ, по вопросам обеспечения личной безопасности в повседневной жизни, более детально познакомиться с организационными основами борьбы с терроризмом и наркобизнесом в РФ.
                        </span>
                    </div>
                    <span/>
                    <div className={styles.courseListMenuCourse}>
                        <span style={{alignSelf: "center", marginLeft: "10px", fontFamily: "Roboto", fontSize: "16px", fontWeight: "normal", lineHeight: "1", color: "white"}}>1. ОСНОВЫ БЕЗОПАСНОСТИ ЖИЗНЕДЕЯТЕЛЬНОСТИ</span>
                        <span style={{alignSelf: "start", marginLeft: "10px", fontFamily: "Roboto", fontSize: "15px", fontWeight: "normal", lineHeight: "1", color: "white"}}>
                            Изучая курс «Основы безопасности жизнедеятельности», вы узнаете ответы на вопросы о том, как уберечься от опасностей в различных жизненных ситуациях, сможете найти правильное решение для сохранения и укрепления здоровья. Данный курс призван помочь вам систематизировать свои знания, полученные на занятиях ОБЖ, по вопросам обеспечения личной безопасности в повседневной жизни, более детально познакомиться с организационными основами борьбы с терроризмом и наркобизнесом в РФ.
                        </span>
                    </div>
                    <span/>
                    <div className={styles.courseListMenuCourse}>
                        <span style={{alignSelf: "center", marginLeft: "10px", fontFamily: "Roboto", fontSize: "16px", fontWeight: "normal", lineHeight: "1", color: "white"}}>1. ОСНОВЫ БЕЗОПАСНОСТИ ЖИЗНЕДЕЯТЕЛЬНОСТИ</span>
                        <span style={{alignSelf: "start", marginLeft: "10px", fontFamily: "Roboto", fontSize: "15px", fontWeight: "normal", lineHeight: "1", color: "white"}}>
                            Изучая курс «Основы безопасности жизнедеятельности», вы узнаете ответы на вопросы о том, как уберечься от опасностей в различных жизненных ситуациях, сможете найти правильное решение для сохранения и укрепления здоровья. Данный курс призван помочь вам систематизировать свои знания, полученные на занятиях ОБЖ, по вопросам обеспечения личной безопасности в повседневной жизни, более детально познакомиться с организационными основами борьбы с терроризмом и наркобизнесом в РФ.
                        </span>
                    </div>
                    <span/>
                    <div className={styles.courseListMenuCourse}>
                        <span style={{alignSelf: "center", marginLeft: "10px", fontFamily: "Roboto", fontSize: "16px", fontWeight: "normal", lineHeight: "1", color: "white"}}>1. ОСНОВЫ БЕЗОПАСНОСТИ ЖИЗНЕДЕЯТЕЛЬНОСТИ</span>
                        <span style={{alignSelf: "start", marginLeft: "10px", fontFamily: "Roboto", fontSize: "15px", fontWeight: "normal", lineHeight: "1", color: "white"}}>
                            Изучая курс «Основы безопасности жизнедеятельности», вы узнаете ответы на вопросы о том, как уберечься от опасностей в различных жизненных ситуациях, сможете найти правильное решение для сохранения и укрепления здоровья. Данный курс призван помочь вам систематизировать свои знания, полученные на занятиях ОБЖ, по вопросам обеспечения личной безопасности в повседневной жизни, более детально познакомиться с организационными основами борьбы с терроризмом и наркобизнесом в РФ.
                        </span>
                    </div>
                </div>
            </div>
            // <Query query={GET_COURSE}>
            //     {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
            //         if (loading) return <span>"загрузка"</span>
            //         if (error) return <span>'Ошибочка ${error.message}'</span>;
            //         console.log(data);
            //
            //         return (
            //             <div>
            //                 {data.allCourses.nodes.map((courseQuery: any) => (
            //                     <Button type="primary" key={courseQuery.id}>
            //                         {courseQuery.courseName}
            //                     </Button>
            //                 ))}
            //             </div>
            //         )
            //
            //     }}
            // </Query>
        );
    }
}
