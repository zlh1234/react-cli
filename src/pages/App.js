import React, { PureComponent } from 'react';
import List from '@components/List/List';
import User from '@components/User/User';
import { Button, Spin } from 'antd';
import { withRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { addFn, reFn, asyncFn } from '@redux/index.redux';
import { connect } from 'react-redux';
@withRouter
@connect(
	(state) => ({ data: state.indexRedux }),
	{ addFn, reFn, asyncFn }
)
class App extends PureComponent {
	constructor(props) {
		super(props);
	}
	handleAddClick = () => {
		this.props.addFn(2);
	};
	handleReClick = () => {
		this.props.reFn(2);
	};
	handleAsyncClick = () => {
		this.props.asyncFn(2);
	};
	render() {
		return (
			<div>
				<Button onClick={this.handleAddClick}>增加</Button>
				<Button onClick={this.handleReClick}>减少</Button>
				<Button onClick={this.handleAsyncClick}>两秒后增加</Button>
				<p>redux数据：{this.props.data.num}</p>
				<Link to='/'>首页</Link>-<Link to='/user'>用户</Link>
				<a href='javascript:;'>123</a>
				<Switch>
					<Route exact path='/' component={List} />
					<Route path='/user' component={User} />
					<Redirect to='/' />
				</Switch>
			</div>
		);
	}
}
export default App;
