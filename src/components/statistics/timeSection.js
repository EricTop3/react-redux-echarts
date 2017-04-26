import React from 'react';
import ReactDOM from 'react-dom';
import redux from 'redux';
import {connect,Provider} from 'react-redux';
import Immutable from 'immutable';
import Calendar from '../calendar';
import statisticsAction from '../../actions/statisticsAction';
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





class _timeSection extends React.Component {
	constructor(props){
		super(props);
		this.state={
			statisticsTimeSectionInit:'',
			resizeHandler:'',
			time:''
		}
	}
	componentDidMount(){
		this.state.time=this.props.time;
    this.props.statisticsTimeSectionInit(this.state.time);
   
    let statisticsTimeSectionChart = ReactDOM.findDOMNode(this.refs.statisticsTimeSectionChart);
	  this.state.statisticsTimeSectionChart = echarts.init(statisticsTimeSectionChart);
    this.state.statisticsTimeSectionChart.showLoading();
    window.addEventListener('resize',this.resizeFun);
	}
	resizeFun=()=>{
		if(this.state.resizeHandler){
              clearTimeout(this.state.resizeHandler);
          }
    this.state.resizeHandler = setTimeout(()=>{
       this.state.statisticsTimeSectionChart.resize();
    }, 100)
	}
	componentWillUpdate(nextProps){
		console.log('-=componentWillUpdate')
		if(this.state.time!=nextProps.time){
			this.state.time=nextProps.time
			this.props.statisticsTimeSectionInit(this.state.time);
		}
	}
	componentDidUpdate(){
		console.log('-=componentDidUpdate')
		this.state.statisticsTimeSectionChart.setOption(this.props.timeSection.toJS());
		this.state.statisticsTimeSectionChart.hideLoading();
	}
	componentWillUnmount(){
      //切换路由销毁echarts实例
      this.state.statisticsTimeSectionChart.dispose();
      this.props.stateDefault();
      window.removeEventListener('resize',this.resizeFun);
	}
	render(){
		return	<div>
				<div className="panel">
		    			<div className="panelHead">各时间段峰值</div>
		    			<div className="panelBody">
		    				<div className="statisticsTimeSectionChart" ref="statisticsTimeSectionChart"></div>
		          </div>
  				</div>
  				<div className='panel'>
  		    				<div className="panelHead">顾客客流量</div>
  					    			<div className="panelBody">
  					    				<table className="Table">
              				<thead>
              					<tr><th>排名</th><th>商店名称</th><th>平均客流</th><th>环比增幅</th></tr>
              				</thead>
              				<tbody>
              				</tbody>
              			</table>
  								</div>
      			</div>
			</div>
	}
}




const mapStateToProps = (state)=>{
  return {
    // customerNum:state.getIn(['c','customerNum']),
    // radar:state.getIn(['b','radar']),
    // stayBar:state.getIn(['b','stayBar']),
    // OldOrNew:state.getIn(['b','OldOrNew']),
    timeSection:state.getIn(['c','timeSection'])
    // deepVisit:state.getIn(['b','deepVisit']),
    // cycleAndActive:state.getIn(['b','cycleAndActive'])
    }
}

let timeSection=connect(mapStateToProps,statisticsAction)(_timeSection);

export default timeSection;