/**
 * 首页
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

// 业务组件
import OrderLabel from './common/orderLabel'; // 账单标签
import * as home_api from './api/home'; // 首页接口
import commonData from './api/common'; // 公共参数

// 订单类型
const consumptionType = commonData.consumptionType;

// 用户信息
const userInfo = commonData.userInfo;

/**
 * 首页头部
 */
class TopPart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalAmount: 0
		}
	}

	componentDidMount() {
		// home_api.getTotalAmount({
		// 	success: (data) => {
		// 		this.setState({
		// 			totalAmount: data
		// 		});
		// 	},
		// 	error: () => {
		// 		console.log("获取最近订单失败！");
		// 	}
		// });
		this.props.getTotalAmount();
	}

	render() {
		return (
			<div className="index-top">
				<p className="total-val">￥{ this.state.totalAmount }</p>
				<p className="total-title">未结算金额</p>
				<Link className="chargeUp-btn" to="/detail">记 账</Link>
			</div>
		);
	}
}

/**
 * 首页最近账单列表
 */
class LatelyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			latelyList: []
		}
	}

	componentDidMount() {
		// 初始化最近账单
		// home_api.getLatelyList({
		// 	success: (data) => {
		// 		this.setState({
		// 			latelyList: data
		// 		});
		// 	},
		// 	error: () => {
		// 		console.log("获取最近订单失败！");
		// 	}
		// });
		this.props.getLatelyList();
	}

	// 拼接账单列表
	pushLateList() {
		let lateList = [];
		let keyId = 0;
		this.state.latelyList.map(val => {
			let user = userInfo[val.userId];
			lateList.push(
				<li key={ 'latelyLi_' + keyId++ } className="lately-item">
					<div className="item-right">
						<p className="item-name">{ consumptionType[val.type] }</p>
						<em className="item-price">￥{ val.price }</em>
					</div>
					<img className="item-photo" src={ user.photo } alt={ user.name } />
					<p className="user-name">{ user.name }</p>
					<OrderLabel labels={ val.labels } />
				</li>
			);
		});
		return lateList;
	}

	render() {
		return (
			<ul className="index-lately-list container clearfix">
				{ this.pushLateList() }
			</ul>
		);
	}
}

/**
 * 首页组件
 */
export default class HomePage extends Component {
	render() {
		return (
			<div>
				<TopPart getTotalAmount={ this.props.getTotalAmount } />
				<p className="list-title container">
					<span>最近账单</span>
					<Link className="list-more" to="/detail">更多账单 >></Link>
				</p>
				<LatelyDetail getLatelyList={ this.props.getLatelyList }/>
				<div className="home-copyright">
					<p>本站仅供天居园3201内部使用</p>
					<p>禁止他人使用</p>
				</div>
			</div>
		);
	}
}

LatelyDetail.propTypes = {
	getTotalAmount: PropTypes.func.isRequired, 
	getLatelyList: PropTypes.func.isRequired
}