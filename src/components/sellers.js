/**
 * Created by HH on 2017/3/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import redux from 'redux';
import {connect,Provider} from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, Link ,Redirect} from 'react-router';
import sellersAction from '../actions/sellersAction';


class _SidebarNav extends React.Component {
    constructor(props){
        super(props);
        this.change=this.change.bind(this);
        this.state={
            sellers:[]
        }
    }
    componentWillMount(){
        this.props.sellersInit();
    }
    componentWillUpdate(){
        console.log('componentWillUpdate..');
    }
    componentDidMount(){
        console.log('componentDidMount...')
        this.props.sellersInit();
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps..');
        //debugger;
        /*获取商家名称，要是一个数组或对象*/
        //debugger;
        //this.state.sellers=this.props.b.sellers;
        /**
         * 有一个bug，或者是和别的路由相同接口引起的。this.props.b.sellers是 []
         */
         // debugger;
        this.setState({
            sellers:this.props.b.sellers
        })
        // console.log('输出sellers：')
        // console.log(this.props.b.sellers)
        // console.log(this.state.sellers)
        // this.state.sellers=['111','222','333','113','美宜佳','麦克风'];
    }
    change(){
        let text=ReactDOM.findDOMNode(this.refs.searchText).value;
        // if(text === ' ') return;  //输入中文时有空格
        let rows=[];
        // rows.seller=[];
        // rows.id=[];
        console.log(this.props.b.sellers);
        this.props.b.sellers.forEach(function(seller){

            //seller是数值，不能indexOf，要转成string
            if(seller.seller.indexOf(text.trim()) === -1) return;
            rows.push(seller);
        });
        this.setState({
            sellers:rows
        })


    }

    render(){
        //const usersdom = this.props.sellers.map(seller=><li>{seller.name}</li>);
        let rows=[];
        let routeData='sellers/';
        rows.push(<li key="all"><Link to='sellers/total' activeClassName="active" draggable="false">全部商家<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>);
        if(this.state.sellers){
            this.state.sellers.forEach(function(seller,index){
                routeData+=seller.id;
                rows.push(<li key={seller.id}><Link to={routeData} activeClassName="active" draggable="false">{seller.seller}<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>);
                routeData='sellers/';
            })
        }
        //return <ul className="sidebar_nav">

        //    {usersdom}
        //</ul>
        return <div id='sidebar_nav'>
            <ul>
                <li key="search">
                    <input type="text" ref="searchText" placeholder="搜索商家" onChange={this.change}/><i className="fa fa-search" aria-hidden="true"></i>
                </li>
                {rows}
            </ul>
        </div>
    }
}
let SidebarNav=connect(state=>state,sellersAction)(_SidebarNav);

let Sellers=React.createClass({
    render(){
        return <div id="container">
            <SidebarNav />
            {this.props.children}
        </div>;
    }
})

export default Sellers;
