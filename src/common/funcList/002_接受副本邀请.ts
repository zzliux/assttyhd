import { Script } from "@/system/script";
import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from "@/interface/IFunc";

const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;
export class Func002 implements IFuncOrigin {
	id = 2;
	name = '接受副本邀请';
	desc = '接受副本邀请';
	operator: IFuncOperatorOrigin[] = [{
		desc: [
			1280, 720,
			[
				[right, 1052, 168, 0xcb5049],
				[right, 1054, 135, 0xcb5049],
				[left, 444, 541, 0xff9f41],
				[left, 337, 558, 0xfaf4e4],
				[center, 633, 544, 0xfaf4e4],
				[right, 775, 547, 0x5fa1f4],
				[right, 936, 551, 0xfaf4e4],
			]
		],
		oper: [
			[center, 1280, 720, 739, 513, 851, 549, 1000],
		]
	}];
}

export default new Func002();