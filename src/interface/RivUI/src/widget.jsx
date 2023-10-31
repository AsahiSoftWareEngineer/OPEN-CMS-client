import React from "react";
import "../style/widget.css";
import "../style/editor.css"
import {CaretDown, CaretLeft, Eye, EyeSlash, Info, CaretRight, Check} from "react-bootstrap-icons"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,LinearScale, PointElement, LineElement, } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import {line_chart_options, make_uuid, none_pie_data, pie_chart_options} from "../src/options"
import { Link } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { compile } from "./compiler";





export const is_undefined = (value) => {
    return value? value: null
}

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <>
        <button 
        onDragStart={(e) => {this.props.onDragStart(e)}}
        onDragEnd={(e) => {this.props.onDragEnd(e)}}
        draggable={this.props.draggable}
        className={`${is_undefined(this.props.className)} riv-ui-button`}
        id={is_undefined(this.props.id)} 
        onClick={() => {this.props.onClick?this.props.onClick():""}}>
            {this.props.children}
        </button>
        </>
        )
        
    }
}

export class FloatButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<>
        <button className={`${this.props.className} riv-ui`}>
            {this.props.children}
        </button>
        </>)
    }
}


export class Toggle extends React.Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-toggle`}>
            <div className={`background ${this.props.state?"active":"unactive"}`}></div>
            <button onClick={(e) => this.props.onChange(e)}className={`switch ${this.props.state?"active":"unactive"}`}>{this.props.icon}</button>
        </div>
        </>)
    }
}


export class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_composition: false
        }
    }

    render = () => {
        return (<>
        <input 
        className={`${this.props.className} riv-ui-input-text`} 
        placeholder={this.props.placeholder}
        value={this.props.value} 
        id={this.props.id}
        readOnly={this.props.is_editable? false : this.props.is_editable}
        onChange={(e) => {this.props.onChange(e)}}
        onKeyDown={(e) => {
            if(e.key == 'Enter' && !this.state.is_composition){
                this.props.onCommit(e);
            }
        }}
        onCompositionStart={() => {this.setState({is_composition: true})}}
        onCompositionEnd={() => {this.setState({is_composition: false})}}
        />
        </>)
    }
}


export class TitleInterface extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-custom`}>
            <div className="title">{this.props.title ? this.props.title : ""}</div>
            <div className="widget">
                {this.props.element}
            </div>
        </div>
        </>)
    }
}
export class HiddenButtonInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_hidden: true,
            is_composition: false,
        }
    }

    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-custom-hidden`}>
            <div className="widget">
                <input type={this.state.is_hidden? "password": "text"}
                 value={this.props.value} 
                 onChange={(e) => {this.props.onChange(e)}}
                 onCompositionStart={() => {this.setState({is_composition: true})}}
                 onCompositionEnd={() => {this.setState({is_composition: false})}}
                 onKeyDown={(e) => {
                     if(e.key == "Enter" && !this.state.is_composition){
                         this.props.onCommit()
                     }
                 }}
                 />
                 <button onClick={() => {this.setState({is_hidden: !this.state.is_hidden})}}>
                     {this.state.is_hidden?<Eye/>: <EyeSlash/>}
                 </button>
            </div>

        </div>
        </>)
    }
}


export class NavigationButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {//Change <a> to <Link/> tag
        return (<>
        <Link onClick={() => this.props.onClick?this.props.onClick(): ""} to={this.props.link? this.props.link:""} className={`${this.props.className} riv-ui-link-button`} target={this.props.target?this.props.target: ""}>
        {this.props.children}
        </Link> 
        </>)
    }
}

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open: false,
        }
    }

    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-dropdown`}>
            <div className={"header"}>
                <span className="display"> {this.props.value?this.props.value.text: ""}</span>
                <button onClick={() => {this.setState({is_open: !this.state.is_open})}} className={`dropdown-toggle ${this.state.is_open?"open":"close"}`}><CaretDown/></button>
               </div>
            {this.state.is_open? (<>
                <div className={"body"}>
                <ul>
                    {this.props.items.map((item) => {
                        return (<>
                        <li>
                            <button onClick={() => {
                                this.props.onChange(item)
                                this.setState({is_open: false})
                                }}>
                                <span>{item.text}</span>
                            </button>
                        </li>
                        </>)
                    })}
                </ul>
            </div>
            </>):(<></>)}
        </div>
        </>)
    }
}



export class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<>
        <div className={`${this.props.loading} riv-ui-loading`}>
            <span className="spiner"></span>
        </div>
        </>)
    }
}






export class NavigationList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.menu
        }
    }

    onSelect = (target) => {
        const switched_items = this.state.items.map((item) => { 
            item.is_selected = false;
            if(target.id === item.id) {
                item.is_selected = !item.is_selected;
            }
            return item;
        })
        this.setState({itmes: switched_items})
    }


    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-menu`}>
            <div className="header"></div>
            <div className="body">
                <ul>
                    {this.props.menu.map((item) => {
                        return (<>
                        <li>
                        <Link className={item.is_selected? "focused": "unfocused"} to={item.link} onClick={(e) =>{ 
                            this.onSelect(item);
                            this.props.onSelect ? this.props.onSelect(item): ""
                            }}>
                            <span className="icon">{item.icon}</span>
                            <span className="name">{item.name}</span>
                        </Link>
                        </li>
                        </>)
                    })}
                </ul>
                {this.props.children}
            </div>
        </div>
        </>)
    }
}



export class FloatingButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<>
        <button className={`${this.props.className} riv-ui-floating-button`} onClick={() => {this.props.onClick()}}>
            {this.props.children}
        </button>
        </>)
    }
}




export class PieChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-pie-chart`}>
            <div className="header">
                <p className="display">
                    <span className="primary-text">{this.props.primaryText}</span>
                    <span className="figure">{this.props.value}</span>
                    <span className="secondary-text">{this.props.secondaryText}</span>
                </p>
                <button className="info">
                    <Info/>
                </button>
            </div>
            <div className="body">
                <div className="chart-area">
                      <Pie options={pie_chart_options} data={this.props.data.labels?this.props.data:none_pie_data}/>
                </div>
            </div>
        </div>
        </>)
    }
}


export class CalendarSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            calendar: [],
            target: new Date(),
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
        }
    }

    componentDidMount = () => {
        this.mountCalendar()
    }

    select = (id) => {
        const calendar = this.state.calendar
        const selected_items = []
        for(let i = 0; i < calendar.length; i++) {
            const weekly_array = calendar[i]
            for(let j = 0; j < weekly_array.length; j++){
                if(weekly_array[j].is_selected){
                    selected_items.push(weekly_array[j])
                }
            }
        }

    
        for (let i = 0; i < calendar.length; i++){
            const weekly_array = calendar[i]
            for(let j = 0; j < weekly_array.length; j++){
                console.log((weekly_array[j]))
                if(weekly_array[j].id === id){
                    if(selected_items.length > 1 && selected_items[0].date < weekly_array[j].date && weekly_array[j].date < selected_items[1].date){
                        selected_items[0].is_selected = false;
                        if(weekly_array[j].id == selected_items[0].id){
                            weekly_array[j] = selected_items[0]
                        }
                    } else if(selected_items.length > 1&& selected_items[0].date > weekly_array[j].date){
                        selected_items[0].is_selected = false;
                        if(weekly_array[j].id == selected_items[0].id){
                            weekly_array[j] = selected_items[0]
                        }
                    } else if(selected_items.length > 1 && selected_items[1].date < weekly_array[j].date){
                        selected_items[1].is_selected = false;
                        if(weekly_array[j].id == selected_items[1].id){
                            weekly_array[j] = selected_items[1]
                        }
                    } 
                    weekly_array[j].is_selected = !weekly_array[j].is_selected
                }
            }
           calendar[i] = weekly_array
        }
        this.setState({calendar: calendar})
    }
    
    mountCalendar = () => {
        const today = new Date()
        let count = 0;
        const year = this.state.year
        const month = this.state.month
        const week = this.state.week
        const start_day_of_week = new Date(year, month, 1).getDay()
        const end_date = new Date(year, month+1, 0).getDate()
        const last_month_end_date = new Date(year, month, 0).getDate()
        const row = Math.ceil((start_day_of_week+end_date) / week.length)
        const monthly_array = []
        for (let i = 0; i < row; i++) {
            const weekly_array = []
            for(let j = 0; j < week.length; j++){
                if(i === 0 && j < start_day_of_week){
                    weekly_array.push({id: make_uuid(), date: last_month_end_date - start_day_of_week + j + 1, is_selected: false, is_today: false, is_over:true})
                } else if (count >= end_date){
                    count++;
                    weekly_array.push({id: make_uuid(),date: count - end_date, is_selected: false, is_today: false, is_over: true})
                } else {
                    count++
                    if(year == today.getFullYear()
                    && month == (today.getMonth()+1)
                    && count == today.getDate()){
                        weekly_array.push({id:make_uuid(), date: count, is_selected: false, is_today:true, is_over: false})
                    } else {
                        weekly_array.push({id:make_uuid(), date: count, is_selected: false, is_today: false, is_over: false})
                    }
                }
            }
            monthly_array.push(weekly_array)
        }
        this.setState({calendar: monthly_array})
    }

    onNext = () => {
        if(this.state.month == 12){
            this.setState({year: this.state.year + 1, month: 1,})
        } else {
            this.setState({month: this.state.month + 1, })
        }
    }
    onPrevious = () => {
        if(this.state.month == 1){
            this.setState({year: this.state.year - 1, month: 12, })
        } else {
            this.setState({month: this.state.month - 1,})
        }
    }


    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-calendar`}>
            <div className={"header"}>
                <span>{this.state.year}/{this.state.month}</span>
                <div className="prev-next-button">
                    <button onClick={async () => {
                        await this.onPrevious()
                        await this.mountCalendar()
                    }}><CaretLeft/></button>
                    <button onClick={async () => {
                        await this.onNext()
                        await this.mountCalendar()
                        }}><CaretRight/></button>
                </div>
            </div>
            <div className="body">
                <table>
                    <thead>
                        <tr>
                            {this.state.week.map((date) => {
                                return <td>{date}</td>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.calendar.map((week) => {
                            return(<>
                            <tr>
                                {week.map((date) => {
                                    return (<>
                                     <td>
                                         <button onClick={() =>{this.select(date.id)}} className={`
                                         ${date.is_selected? "selected"
                                          :date.is_today? "today"
                                          :date.is_over? "over"
                                          :undefined}
                                         date-button`}>  {date.date}</button>
                                        </td>
                                    </>)
                                   
                                })}
                            </tr>
                            </>)
                            
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>)
    }
}


export class RectangleLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-rectangle-line-chart`}>
            <div className="header">
                <p className="display">
                     <span className="primary-text">{this.props.primaryText}</span>
                     <span className="secondary-text">{this.props.secondaryText}</span>
                </p>
                <button className="info">
                    <Info/>
                </button>
            </div>
            <div className="body">
                <div className="chart-area">
                    <Line options={line_chart_options} data={this.props.data}/>
                </div>
            </div>
        </div>
        </>)
    }
}

export class SquareLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className={`${this.props.className} riv-ui-square-line-chart`}>
        <div className="header">
                <p className="display">
                     <span className="primary-text">{this.props.primaryText}</span>
                     <span className="secondary-text">{this.props.secondaryText}</span>
                </p>
                <button className="info">
                    <Info/>
                </button>
            </div>
            <div className="body">
                <div className="chart-area">
                    <Line options={line_chart_options} data={this.props.data}/>
                </div>
            </div>
        </div>
        </>)
    }
}


export class Checkbox extends React.Component{
    constructor(props){
        super(props);
    }

    render = () => {
        return (<>
        <button onClick={(e) => {this.props.onChange(e)}} className={`${this.props.is_checked? "checked":"unchecked" } riv-ui-checkbox`}>
            {this.props.is_checked? (<>
            <Check/>
            </>):(<></>)}
        </button>
        </>)
    }
}


export class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_preview: false,
            parsed: ""
        }
    }

    contentChange = (content) => {
        this.props.onChange(content)
    }
    render = () => {
        console.log(this.props)
        return (<>
        <div className="riv-ui-rich-text-editor">
            <div className="header">
                <Button className="toggle" onClick={() => {this.setState({ is_preview: !this.state.is_preview });}}>{this.state.is_preview?<>プレビューモード</>:<>編集モード</>}</Button>
            </div>
            <div className="body">
                {this.state.is_preview?<>
                <div className="preview">
                <Markdown
                children={this.props.content}
                components={{
                  code(props) {
                    const {children, className, node, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        children={String(children).replace(/\n$/, '')}
                        style={dark}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
  />

                </div>
                </>:<>
                <div className="line-bar">
                    {this.props.content.split("\n").map((value, i) => {
                        return <span>{i+1}</span>
                    })}
                </div>
                <div className="text-editor"  style={{height: `${this.props.content.split("\n").length * 22}px`}}>
                    <div className="text-view" dangerouslySetInnerHTML={{__html: compile(this.props.content?this.props.content:"")}}>
                        
                    </div>
                    <textarea
                    style={{height: `${this.props.content.split("\n").length * 22}px`}}
                    value={this.props.content}
                    onChange={(e) => {this.contentChange(e.target.value)}}
                    />
                </div>
                </>}
            </div>
        </div>
        </>)
    }
}