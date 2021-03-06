/**
 * Created by HH on 2017/3/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
const redux = require('redux');
import {connect, Provider} from 'react-redux';
// import {Table } from 'react-bootstrap';
import thunk from 'redux-thunk';
// import echarts from 'echarts';
// import lineAction from '../actions/lineAction';
// import FirstPageLineReducer from '../reducers/firstPageLineReducer';
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
const FaAngleDoubleRight = require('react-icons/lib/fa/angle-double-right');
// var echarts = require('echarts/lib/echarts'); //必须
// require('echarts/lib/chart/pie'); //图表类型
// require('echarts/lib/component/title'); //标题插件


// class SidebarNav extends React.Component {
//     constructor(props){
//         super(props);
//     }


// /*<ul className='sidebar_subNav'>
//  <li><Link to='firstPage/chart' className='subNav_li' draggable="false">一层客流量</Link></li>
//  <li><Link to='firstPage/b' className='subNav_li' draggable="false">二层客流量</Link></li>
//  <li><Link to='firstPage/c' className='subNav_li' draggable="false">三层客流量</Link></li>
//  </ul>*/
//     render(){
//         return <div id='sidebar_nav'>
//             <ul>
//                 <li><Link to='firstPage/total' activeClassName="active" draggable="false"><i className='fa fa-area-chart' aria-hidden="true"></i>当前总客流 <i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
//                 <li><Link to='firstPage/firstFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>各商家客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
//                 <li><Link to='firstPage/firstFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>一层客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
//                 <li><Link to='firstPage/secondFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>二层客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
//                 <li><Link to='firstPage/thirdFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>三层客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
//             </ul>
//         </div>
//     }
// }

/*
    <li><Link href='javascript:' activeClassName="active" draggable="false"><i className='fa fa-bar-chart' aria-hidden="true"></i>商场排名<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
    <li><Link href='javascript:' activeClassName="active" draggable="false"><i className='fa fa-adjust' aria-hidden="true"></i>新老顾客<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
    <li><Link href='javascript:' activeClassName="active" draggable="false"><i className='fa fa-adjust' aria-hidden="true"></i>顾客活跃度<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>

*/

class _FirstPage extends React.Component {
// const  _FirstPage = (props)=>{
  componentWillMount() {
    scrollTo(0, 0);
    setTimeout(() => {
      const round = document.getElementsByClassName('in-round')[0];
      if (round && round.style) {
        round.style.display = 'none';
      }
    });
  }
  render() {
    return (<div id="container">
      {/* <div id='sidebar_nav'>
                    <ul>
                        <li><Link to='firstPage/total' activeClassName="active" draggable="false">当前总客流 <FaAngleDoubleRight className='fa fa-angle-double-right'/></Link></li>
                        <li><Link to='firstPage/allSellers' activeClassName="active" draggable="false"><FaAreaChart />各商家客流<FaAngleDoubleRight className='fa fa-angle-double-right'/></Link></li>
                        <li><Link to='firstPage/firstFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>一层客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
                        <li><Link to='firstPage/secondFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>二层客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
                        <li><Link to='firstPage/thirdFloor' activeClassName="active" draggable="false"><i className='fa fa-tachometer' aria-hidden="true"></i>三层客流<i className='fa fa-angle-double-right' aria-hidden='true'></i></Link></li>
                    </ul>
                </div>*/}
      {this.props.children}
    </div>);
  }
}
// let FirstPage=connect(state=>state,null)(_FirstPage);

export default _FirstPage;
