

import React from 'react';
import ReactDOM from 'react-dom';
import redux from 'redux';
import {connect,Provider} from 'react-redux';
import Immutable from 'immutable';
import FrstPageAction from '../../actions/firstPageAction';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';

class _Chart extends React.Component {

    static propTypes = {
        numInit: React.PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state={
            myChartLine:"",       //chart实例对象line
            timer:"",           //定时器
            param:'hour',       //不同时间阀值参数
            chartNum:'',     //显示当前人数
            chartTime:'',     //显示当前时间
            chartTitle:'',    //显示当前标题
            yesterday:Immutable.fromJS({}),     //昨天的信息
            test:1,
            resizeHandler:null,
            timerTime:1000*2
        }
    }
    
    componentWillMount(){
        console.log('componentWillMount');
        // debugger;
        
        this.props.numInit();

    }
    componentDidMount(){
        let domLine = ReactDOM.findDOMNode(this.refs.chartLine);
        // let domPie = ReactDOM.findDOMNode(this.refs.chartPie);
        // this.state.myChart = echarts.init(dom);
        // this.props.init(this.state.myChart,this.state.param);
        // this.state.timer = setInterval(this.start,2000);
        this.state.myChartLine = echarts.init(domLine);
        this.state.myChartLine.showLoading();   //显是遮罩

        //定时刷新
        this.state.timer = setInterval(this.fetchData,this.state.timerTime)
        window.addEventListener('resize',this.resizeFun);

    }
    resizeFun =()=>{
        if(this.state.resizeHandler){
                clearTimeout(this.state.resizeHandler);
            }
            if(this.state.myChartLine){
                this.state.resizeHandler = setTimeout(function () {
                   this.state.myChartLine.resize();
                   // this.state.myChartPie.resize();
                }.bind(this), 100)
            }
    }
    fetchData = ()=>{
        this.props.fetch()
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
        this.state.myChartLine.dispose()   //销毁实例
        clearInterval(this.state.timer);
        window.removeEventListener('resize',this.resizeFun);
    }

    componentDidUpdate(){
        if(this.props.line.getIn(['xAxis','data'])){
            this.state.myChartLine.setOption(this.props.line.toJS());
            this.state.myChartLine.hideLoading();
            //debugger
        }
        console.log('componentDidUpdate')
        // console.log(this.props)
    }
    // shouldComponentUpdate(){
    //     return true;
    // }
    componentWillUpdate(nextProps,nextState){
        // debugger
        let fd=nextProps.line.toJS();
        if(nextProps.line.getIn(['series',0,'data'])){
            // debugger
            // let sa=nextProps.line.getIn(['series',0,'data']);
            this.state.chartNum=nextProps.line.getIn(['series',0,'data'])[nextProps.line.getIn(['series',0,'data']).length - 1];
            this.state.chartTime=nextProps.line.getIn(['xAxis','data'])[nextProps.line.getIn(['xAxis','data']).length - 1];
            this.state.chartTitle=nextProps.line.getIn(['title','text']);
            this.state.yesterday=nextProps.line.getIn(['xAxis','yesterday']);
        }
    }
    componentWillReceiveProps(nextProps,nextState){
        // debugger;
   
        
        console.log('componentWillReceiveProps '+new Date().getTime())

     

    }

    render(){
        // console.log('firstPageChart:'+this.state.test++ +',render,'+new Date().getTime())

        // let rows=
        // debugger


        return <div className='chartWrapper'>
            {/*<div className='chartMessage'>
                <p>当前人数：{this.state.chartNum}</p><p>昨日平均客流：2132</p><p>昨日高峰时段：16:30-21:00</p>
            </div>*/}
            <div className='topMessage'>
                <div className='message message1'><div>
                    <p>当前人数：{this.state.chartNum}  { this.state.yesterday.get('increase')+''=='true'?<span className='up'>&nbsp;↑</span> :<span className='down'>&nbsp;↓</span>} </p>
                    <p>昨日此时人数：{this.state.yesterday.get('num')}</p>
                </div></div>
                <div className='message message2'><div>
                    <p>昨日高峰客流：{this.state.yesterday.get('most')}</p>
                    <p>昨日平均客流：{this.state.yesterday.get('avg')}</p>
                </div></div>
                <div className='message message3'><div>
                    <p>昨日高峰时段：{this.state.yesterday.get('timeSection')}</p>
                </div></div>
            </div>


            <div className='panel'>
                <div className='panelHead'>
                    {this.state.chartTitle}</div>
                <div className='panelBody'>
                    <div ref="chartLine" className="chartLine" ></div>
                    <p>
                        当前实时客流数据
                    </p>
                    <table className="firstTable">
                        <thead>
                            <tr><th>时间</th><th>8:00</th><th>9:00</th><th>10:00</th><th>11:00</th><th>12:00</th><th>13:00</th><th>14:00</th><th>15:00</th><th>16:00</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>客流量</td><td>654</td><td>754</td><td>654</td><td>654</td><td>754</td><td>654</td><td>654</td><td>754</td><td>654</td></tr>
                            <tr><td>其他实时数据</td><td>654</td><td>754</td><td>654</td><td>654</td><td>754</td><td>654</td><td>654</td><td>754</td><td>654</td></tr>

                        </tbody>
                    </table>
                </div>
            </div>
            {/*
            <div className="panel">
                <div className='panelHead'>适宜度</div>
                <div className='panelBody'>
                <div ref="chartPie" className="chartPie"></div>
                    </div>
            </div>
            */}
        </div>
    }

}

/*const mapStateToProps = (state)=>{
    console.log(state);
    debugger
    console.log(state.get('line'));
    console.log(state.get('a'));
    var aadsaf = state.toJS();
    return state.toJS();
}*/

// const mapStateToProps = state => {
//     debugger
//     // let fdsa=state.get('a');
//     // let a=fdsa.toJS();
//     let ppppeee=state.toJS();
//     return ppppeee;
// };
const mapStateToProps = state => ({
        line:state.getIn(['a','line'])
        // pie:state.getIn(['a','pie'])
})
let Chart = connect(mapStateToProps,FrstPageAction)(_Chart);

// connect(state => ({
//   stuff: state.get('stuff'),
//   otherStuff: state.get('otherStuff')
// })


export default Chart;