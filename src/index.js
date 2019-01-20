import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//组件
import App from './pages/App';
//store
import store from './store/store';
//常量
import '@static/style/reset.css';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import s from './index.less';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<LocaleProvider locale={zh_CN}>
				<div className={s.a}>
					<App />
				</div>
			</LocaleProvider>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);
