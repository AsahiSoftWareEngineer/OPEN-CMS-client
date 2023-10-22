import React from "react";
import { Button, HiddenButtonInput, Loading, TitleInterface } from "../interface/RivUI/src/widget";
import {login} from "../module/http"
import "../styles/app/login.css"


export class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            is_waiting: false
        }
    }

    commitLogin = async () => {
        this.setState({is_waiting: true});
        const request = await login(this.state.username, this.state.password)
        if(request.response == 200){
            window.location.href = "/"
        } else {
            window.alert("Error: パスワードもしくはメールアドレスが間違っています")
        }

    }

    render = () => {
        return (<>
        <div className="login-view">
            <div className="login-widget">
                <h2>ログイン</h2>
                <TitleInterface className="login-interface" title="ユーザーネーム"
                element={<>
                <input type="text" className="riv-ui-input-text" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}} />
                </>}
                />

                <TitleInterface className="login-interface" title="パスワード"
                element={<>
                <HiddenButtonInput value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                </>}
                />
                <Button onClick={() => {this.commitLogin()}} className="login-button">
                    {this.state.is_waiting?(<>
                    <Loading/>
                    </>):(<>ログイン</>)}
                </Button>

                
            </div>
        </div>
        </>)
    }
}