import React from 'react';
import ReactDOM from 'react-dom';
import redux from 'redux';
import {connect,Provider} from 'react-redux';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';


import sellersAction from '../actions/sellersAction';

class _Chart extends React.Component {

    static propTypes = {
        params: React.PropTypes.object.isRequired,   //商店id，这里为数字
        // singleSellerLineChartInit: React.PropTypes.func.isRequired,
        b: React.PropTypes.object.isRequired       //包含lineAndBar和table的数据
    };
    constructor(props){
        super(props);
        this.state={
					singleSellerCustomerFlowChart:'',    //顾客流动图表
        	// singleSellerLineOption:'',    //option参数
          singleSellerRadarChart:'',      //总体评价图表
          singleSellerStayBarChart:'',    //驻店时长图表
          singleSellerOldOrNewChart:'',   //新老顾客图表
          singleSellerTimeSectionChart:'',  //各时间段占比图表
          singleSellerDeepVisitChart:'',    //深访率图表
          singleSellerCycleAndActiveChart:'',  //来访周期和活跃度图表
        	time:'day',
          id:'',   //商家id
          name:''   //商家名
        }

    }

    componentDidMount(){
    	this.state.id = this.props.params.id  //获取该商店id
      this.props.singleSellerCustomerFlowInit(this.state.id,this.state.time);
      this.props.singleSellerRadar(this.state.id,this.state.time); //总评价雷达图
      this.props.singleSellerStayBar(this.state.id,this.state.time); //总评价雷达图
      this.props.singleSellerOldOrNew(this.state.id,this.state.time); //总评价雷达图
      this.props.singleSellerTimeSection(this.state.id,this.state.time); //总评价雷达图
      this.props.singleSellerDeepVisit(this.state.id,this.state.time); //总评价雷达图
      this.props.singleSellerCycleAndActive(this.state.id,this.state.time); //总评价雷达图




      //获取dom
      let singleSellerCustomerFlowChart = ReactDOM.findDOMNode(this.refs.singleSellerCustomerFlowChart);
      let singleSellerRadarChart = ReactDOM.findDOMNode(this.refs.singleSellerRadarChart);
      let singleSellerStayBarChart = ReactDOM.findDOMNode(this.refs.singleSellerStayBarChart);
      let singleSellerOldOrNewChart = ReactDOM.findDOMNode(this.refs.singleSellerOldOrNewChart);
      let singleSellerTimeSectionChart = ReactDOM.findDOMNode(this.refs.singleSellerTimeSectionChart);
      let singleSellerDeepVisitChart = ReactDOM.findDOMNode(this.refs.singleSellerDeepVisitChart);
      let singleSellerCycleAndActiveChart = ReactDOM.findDOMNode(this.refs.singleSellerCycleAndActiveChart);



      //初始化echarts 存入state
      this.state.singleSellerCustomerFlowChart = echarts.init(singleSellerCustomerFlowChart);
      this.state.singleSellerRadarChart = echarts.init(singleSellerRadarChart);
      this.state.singleSellerStayBarChart = echarts.init(singleSellerStayBarChart);
      this.state.singleSellerOldOrNewChart = echarts.init(singleSellerOldOrNewChart);
      this.state.singleSellerTimeSectionChart = echarts.init(singleSellerTimeSectionChart);
      this.state.singleSellerDeepVisitChart = echarts.init(singleSellerDeepVisitChart);
      this.state.singleSellerCycleAndActiveChart = echarts.init(singleSellerCycleAndActiveChart);

    }
		componentWillReceiveProps(){
      // debugger
      //echarts渲染数据    setOption
      this.state.singleSellerCustomerFlowChart.setOption(this.props.b.customerFlow);
      this.state.singleSellerRadarChart.setOption(this.props.b.radar);
      this.state.singleSellerStayBarChart.setOption(this.props.b.stayBar);
      this.state.singleSellerOldOrNewChart.setOption(this.props.b.OldOrNew);
      this.state.singleSellerTimeSectionChart.setOption(this.props.b.timeSection);
      this.state.singleSellerDeepVisitChart.setOption(this.props.b.deepVisit);
      this.state.singleSellerCycleAndActiveChart.setOption(this.props.b.cycleAndActive);





      //对应的名字写入
      // this.setState({
      //   name:this.props.b.lineAndLine.name
      // })

		}
		componentWillUnmount(){
      //切换路由销毁echarts实例
      this.state.singleSellerCustomerFlowChart.dispose();
      this.state.singleSellerRadarChart.dispose();
      this.state.singleSellerStayBarChart.dispose();
      this.state.singleSellerOldOrNewChart.dispose();
      this.state.singleSellerTimeSectionChart.dispose();
      this.state.singleSellerDeepVisitChart.dispose();
      this.state.singleSellerCycleAndActiveChart.dispose();


		}
    //更改时间参数，存入state
		adjusting = (e)=>{
					 //点击当前项返回   点击到的可能是a或li
           let node=e.target;
           if(node.tagName == 'A'){
              node=ReactDOM.findDOMNode(e.target).parentNode;
           }
           if(node.className === 'active'){
               return;
           }
           switch(e.target.innerText){
               case "时":
                   this.state.time = 'hour';
                   this.props.singleSellerCustomerFlowInit(this.state.id,this.state.time);
                   this.props.singleSellerRadar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerStayBar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerOldOrNew(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerTimeSection(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerDeepVisit(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerCycleAndActive(this.state.id,this.state.time); //总评价雷达图
                   break;
               case "日":
                   this.state.time = 'day';
                   this.props.singleSellerCustomerFlowInit(this.state.id,this.state.time);
                   this.props.singleSellerRadar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerStayBar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerOldOrNew(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerTimeSection(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerDeepVisit(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerCycleAndActive(this.state.id,this.state.time); //总评价雷达图
                   break;
               case "周":
                   this.state.time = 'week';
                   this.props.singleSellerCustomerFlowInit(this.state.id,this.state.time);
                   this.props.singleSellerRadar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerStayBar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerOldOrNew(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerTimeSection(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerDeepVisit(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerCycleAndActive(this.state.id,this.state.time); //总评价雷达图
                   break;
               case "月":
                   this.state.time = 'month';
                   this.props.singleSellerCustomerFlowInit(this.state.id,this.state.time);
                   this.props.singleSellerRadar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerStayBar(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerOldOrNew(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerTimeSection(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerDeepVisit(this.state.id,this.state.time); //总评价雷达图
                   this.props.singleSellerCycleAndActive(this.state.id,this.state.time); //总评价雷达图
                   break;
           }
		}
    render(){

    	return <div className="panelWrapper">
              <p>{this.state.name}</p>

    					<ul ref="adjustingBar" className="adjustingBar">
                   <span>时间参数&nbsp;&nbsp;&nbsp;&nbsp;</span>
                   <li className={this.state.time=='hour'?'active':''} onClick={this.adjusting}><a>时</a></li>
                   <li className={this.state.time=='day'?'active':''} onClick={this.adjusting}><a>日</a></li>
                   <li className={this.state.time=='week'?'active':''} onClick={this.adjusting}><a>周</a></li>
                   <li className={this.state.time=='month'?'active':''} onClick={this.adjusting}><a>月</a></li>
                   <div className='chartMessage'>
                   </div>
               </ul>

    		<div className="panel">
    			<div className="panelHead">顾客流动</div>
    			<div className="panelBody">
    				<div className="singleSellerCustomerFlowChart" ref="singleSellerCustomerFlowChart"></div>
    			</div>
    		</div>

        <div className="panel halfPanel_1">
          <div className="panelHead">总体评价(雷达图)</div>
          <div className="panelBody">
            <div className="singleSellerRadarChart" ref="singleSellerRadarChart"></div>
          </div>
        </div>
        <div className="panel halfPanel_2">
          <div className="panelHead">驻店时长(柱状图)</div>
          <div className="panelBody">
            <div className="singleSellerStayBarChart" ref="singleSellerStayBarChart"></div>
          </div>
        </div>
        <div className="panel halfPanel_3">
          <div className="panelHead">新老顾客量+率(层叠柱状图？饼图)</div>
          <div className="panelBody">
            <div className="singleSellerOldOrNewChart" ref="singleSellerOldOrNewChart"></div>
          </div>
        </div>
        <div className="panel halfPanel_4">
          <div className="panelHead">各时间段占比(柱状图)</div>
          <div className="panelBody">
            <div className="singleSellerTimeSectionChart" ref="singleSellerTimeSectionChart"></div>
          </div>
        </div>
        <div className="panel halfPanel_3">
          <div className="panelHead">深访率(柱状图)or--</div>
          <div className="panelBody">
            <div className="singleSellerDeepVisitChart" ref="singleSellerDeepVisitChart"></div>
          </div>
        </div>
        <div className="panel halfPanel_4">
          <div className="panelHead">来访周期(竖向 柱状图)+活跃度(饼图)</div>
          <div className="panelBody">
            <div className="singleSellerCycleAndActiveChart" ref="singleSellerCycleAndActiveChart"></div>
          </div>
        </div>
    	</div>
    }
}
/*
        <div className="panel ">
          <div className="panelHead">存留分析(跳出率和新增率)</div>
          <div className="panelBody">
            <div className="singleSellerLineChart" ref="singleSellerLineChart-----"></div>
          </div>
        </div>
        
*/
let Chart=connect(state=>state,sellersAction)(_Chart);

export default Chart;