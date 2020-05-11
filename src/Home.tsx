import * as React from "react";

export default class Home extends React.Component<{}, {

}>{
    public constructor (props: any) {
        super (props);
    }

    public render() {
        return (
            <div>
                <span>Домашняя страница</span>
            </div>
        );
    }
}