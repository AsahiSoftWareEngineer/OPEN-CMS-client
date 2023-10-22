import React from "react";
import { Pen, Plus } from "react-bootstrap-icons";
import { Button, FloatingButton, HiddenButtonInput, NavigationButton } from "../../interface/RivUI/src/widget";
import { parse_url } from "../../module/common";
import "../../styles/components/table.css";

export class AppTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="app-table-component table-component">
            <table className="table-style">
                <thead>
                    <tr>
                        <td><p className="title">全てのアプリケーション</p></td>
                    </tr>
                    <tr>
                        <td><p className="name">アプリ名</p></td>
                        <td><p className="name">APIキー</p></td>
                    </tr>
                </thead>
                <tbody>
                   {this.props.items.map((value) => {
                       return (<>
                       <tr>
                           <td><p className="name">{value.name}</p></td>
                           <td><p className="value"><HiddenButtonInput className={"api-hidden"} value={value.api_key}/></p></td>
                           <td></td>
                           <td><NavigationButton
                           link={`/app/url/${value.id}`}><Pen/> 編集する</NavigationButton></td>
                       </tr>
                       </>)
                   })}
                </tbody>
            </table>
            <FloatingButton onClick={() => {this.props.createNewApp()}} className="url-addition">
                <Plus/>
            </FloatingButton>
        </div>
        </>)
    }
}

export class UrlTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app_id: ""
        }
    }
    
    componentDidMount = () => {
        this.setState({app_id: parse_url(window.location.pathname, 3)})
    }
    render = () => {
        return (<>
         <div className="url-table-component table-component">
            <table className="table-style">
                <thead>
                    <tr>
                        <td><p className="title">URLを管理</p></td>
                    </tr>
                    <tr>
                        <td><p className="name">URL</p></td>
                        <td><p className="name">説明</p></td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item) => {
                        return (<>
                        <tr>
                            <td><p className="name">/{item.url}</p></td>
                            <td><p className="name">{item.name}</p></td>
                            <td></td>
                            <td><NavigationButton link={`/app/page/edit/${item.id}`}><Pen/>編集する</NavigationButton></td>
                        </tr>
                        </>)
                    })}
                </tbody>
            </table>
            <FloatingButton onClick={() => {
                window.location.href = `/app/page/create/${this.state.app_id}`
            }} className="url-addition">
                <Plus/>
            </FloatingButton>
        </div>
        </>)
    }
}