import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/* 业务组件 */
import TopBar from './components/common/topBar'; // 导航
import HomePage from './components/home_page'; // 首页
import DetailPage from './components/detail/detail_page'; // 明细页面
import OrderDetail from './components/detail/order_detail'; // 账单明细
import ClearingDetail from './components/detail/clearing_detail'; // 结算明细
import ClearingPage from './components/clearing/clearing_page'; // 结算页面

// 加载样式
require('normalize.css');
require('./sass/main.scss');

// font-awesome 图标
require('font-awesome-webpack');

/**
 * 根组件
 */
class App extends Component {
	render() {
		return (
			<div>
				<TopBar />
				{ this.props.children }
			</div>
		);
	}
}

render(
	<Router history={ hashHistory }>
		<Route path='/' component={ App }>
			<IndexRoute component={ HomePage }/>
			<Route path='/detail' component={ DetailPage }>
				<IndexRoute component={ OrderDetail }/>
				<Route path='/detail/clearing' component={ ClearingDetail }/>
			</Route>
			<Route path='/clearing' component={ ClearingPage }/> 
		</Route>
	</Router>,
	document.getElementById('main')
)