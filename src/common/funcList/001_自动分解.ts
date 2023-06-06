import { Script } from "@/system/script";
import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from "@/interface/IFunc";

const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;
export class Func001 implements IFuncOrigin {
	id = 1;
	name = '自动分解';
	desc = '自动分解装备（优秀、精良、稀有）';
	operator: IFuncOperatorOrigin[] = [{
		// 主界面，点击背包
		desc: [
			1280, 720,
			[
				[right, 1220, 27, 0xf4e8d4],
				[right, 1220, 203, 0xfcf0e0],
				[right, 1118, 222, 0xe2b46e],
				[right, 1128, 214, 0xfceacb],
				[left, 288, 662, 0xffe9cf],
				[left, 364, 666, 0xffe5c6],
				[right, 934, 29, 0xde4538],
			]
		],
		oper: [
			[center, 1280, 720, 1094, 189, 1133, 230, 1000],
		]
	}, {
		// 背包界面点击分解按钮
		desc: [
			1280, 720,
			[
				[left, 115, 80, 0xf1b76d],
				[right, 1165, 96, 0xf3d282],
				[right, 1170, 76, 0xcb5049],
				[left, 136, 645, 0xfaf2e1],
				[right, 944, 636, 0xfaf2e1],
				[right, 1063, 639, 0xff9f41],
				[right, 1228, 191, 0xf3bd49],
			]
		],
		oper: [
			[center, 1280, 720, 1016, 607, 1124, 642, 1000],
		]
	}, {
		// 分解界面点击批量分解
		desc: [
			1280, 720,
			[
				[left, 111, 85, 0xf1b76d],
				[right, 1230, 216, 0xf5cb5a],
				[right, 1229, 321, 0xe9d1c3],
				[left, 108, 602, 0xfaf2e1],
				[center, 437, 619, 0xffa950],
			]
		],
		oper: [
			[center, 1280, 720, 332, 594, 442, 627, 5000],
		]
	}];
}

export default new Func001();