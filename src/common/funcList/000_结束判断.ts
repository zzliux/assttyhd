import { Script } from '@/system/script';
import { IFuncOrigin } from '@/interface/IFunc';

export class Func000 implements IFuncOrigin {
	id = 0;
	name = '结束判断';
	desc = '配置停止或切换方案的条件';
	config = [{
		desc: '长时间未执行功能停止脚本',
		config: [{
			name: 'jspd_enabled_longtime_nodo',
			desc: '是否启用',
			type: 'switch',
			default: true,
		}, {
			name: 'jspd_times_longtime_nodo',
			desc: '多少分钟后停止脚本',
			type: 'integer',
			default: 30,
		}]
	}, {
		desc: '运行时间判断',
		config: [{
			name: 'jspd_enabled_zjsj',
			desc: '是否启用',
			type: 'switch',
			default: false,
		}, {
			name: 'jspd_times_zjsj',
			desc: '执行时间(min)',
			type: 'integer',
			default: 30,
		}, {
			name: 'jspd_txpl_zjsj',
			desc: '提醒频率(s)',
			type: 'integer',
			default: 60
		}]
	}, {
		desc: '脚本停止后结束应用，需配置关联应用，本功能需root',
		config: [{
			name: 'stop_with_launched_app_exit',
			desc: '是否启用',
			type: 'switch',
			default: false,
		}]
	}, {
		desc: '结束当前方案后切换方案',
		config: [{
			name: 'scheme_switch_enabled',
			desc: '是否启用',
			type: 'switch',
			default: false,
		}, {
			name: 'next_scheme',
			desc: '下一个方案',
			type: 'scheme',
			default: '通用准备退出',
		}]
	}, {
		desc: '临时暂停',
		config: [{
			name: 'pause_enabled',
			desc: '是否启用',
			type: 'switch',
			default: false,
		}, {
			name: 'define_run_time',
			type: 'text',
			desc: '运行时间，单位分钟，逗号分隔，启动时取区间随机数作为运行时间，休息完成后重新获取随机数',
			default: '10,30',
		}, {
			name: 'define_pause_time',
			type: 'text',
			desc: '暂停休息时间，单位分钟，逗号分隔，启动时取区间随机数作为休息时间，休息完成后重新获取随机数',
			default: '2,7',
		}]
	}];
	operatorFunc(thisScript: Script, _thisOperator): boolean {
		let thisconf = thisScript.scheme.config['0'];

		// 长时间未执行任何功能后停止脚本
		if (thisconf.jspd_enabled_longtime_nodo) {
			let now = new Date();
			if (now.getTime() - thisScript.currentDate.getTime() > +thisconf.jspd_times_longtime_nodo * 60000) {
				thisScript.myToast(`因长时间(${cvtTime((now.getTime() - thisScript.currentDate.getTime()) / 1000)})未执行任何操作，脚本停止`);
				stopOrReRun();
				return true;
			}
		}

		if (thisconf.jspd_enabled_zjsj) { // 执行时间
			let currentNotifyDate = thisScript.global.currentNotifyDate;
			if (!currentNotifyDate) {
				thisScript.myToast(`脚本将于${cvtTime(+thisconf.jspd_times_zjsj * 60)}后停止`);
				currentNotifyDate = new Date();
				thisScript.global.currentNotifyDate = currentNotifyDate;
			}
			let now = new Date();
			if (now.getTime() - currentNotifyDate.getTime() > +thisconf.jspd_txpl_zjsj * 1000) {
				let leftSec = (+thisconf.jspd_times_zjsj * 60000 + thisScript.runDate.getTime() - now.getTime()) / 1000;
				thisScript.global.currentNotifyDate = new Date();
				thisScript.myToast(`脚本将于${cvtTime(leftSec)}后停止`);
			}
			if (thisScript.runDate.getTime() + +thisconf.jspd_times_zjsj * 60000 < now.getTime()) {
				stopOrReRun();
				return true;
			}
		}

		if (thisconf.pause_enabled) {
			if (thisScript.global.running === undefined) {
				thisScript.global.running = true;
				const pairRunning = String(thisconf.define_run_time).split(',');
				const pairPause = String(thisconf.define_pause_time).split(',');
				thisScript.global.define_run_time = Math.floor(random(+pairRunning[0] * 1000 * 60, +pairRunning[1] * 1000 * 60));
				thisScript.global.define_pause_time = Math.floor(random(+pairPause[0] * 1000 * 60, +pairPause[1] * 1000 * 60));
				thisScript.global.runningTime = new Date().getTime() + thisScript.global.define_run_time;
				thisScript.global.pauseTime = thisScript.global.runningTime + thisScript.global.define_pause_time;
			}
			if (thisScript.global.running) {
				if (new Date().getTime() >= thisScript.global.runningTime) {
					thisScript.global.running = false;
					thisScript.myToast('脚本暂停');
					return true;
				}
				if (!thisScript.global.notifyTime) {
					thisScript.global.notifyTime = new Date().getTime();
				}
				if (new Date().getTime() - thisScript.global.notifyTime > 10000) {
					thisScript.global.notifyTime = new Date().getTime();
					thisScript.myToast(`将于${cvtTime((thisScript.global.runningTime - new Date().getTime()) / 1000)}后暂停${cvtTime(thisScript.global.define_pause_time / 1000)}`);
				}
			} else {
				if (new Date().getTime() >= thisScript.global.pauseTime) {
					thisScript.global.running = undefined;
					return true;
				}
				if (new Date().getTime() - thisScript.global.notifyTime > 10000) {
					thisScript.global.notifyTime = new Date().getTime();
					thisScript.myToast(`将于${cvtTime((thisScript.global.pauseTime - new Date().getTime()) / 1000)}后恢复执行`);
				}
				sleep(Math.max(thisScript.global.define_pause_time / 10, 5000));
				return true;
			}
		}

		function stopOrReRun() {
			if (thisconf.scheme_switch_enabled) {
				thisScript.setCurrentScheme(thisconf.next_scheme as string);
				thisScript.myToast(`切换方案为[${thisconf.next_scheme}]`);
				thisScript.rerun();
			} else {
				thisScript.doPush(thisScript, { text: `[${thisScript.schemeHistory.map(item => item.schemeName).join('、')}]已停止，请查看。`, before() { thisScript.myToast('脚本即将停止，正在上传数据'); } });
				// 停止脚本时关闭应用
				if (thisconf.stop_with_launched_app_exit) {
					thisScript.stopRelatedApp();
				}
				thisScript.stop();
			}
		}

		function cvtTime(s) {
			if (s > 3600) {
				return ((s / 3600).toFixed(2)) + '小时';
			} else if (s > 60) {
				return ((s / 60).toFixed(2)) + '分钟';
			} else {
				return ((s).toFixed(2)) + '秒';
			}
		}
	}
}

export default new Func000();
