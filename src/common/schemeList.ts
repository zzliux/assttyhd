import funcList from './funcListIndex';
import commonConfigArr from './commonConfig';
import { IScheme } from '@/interface/IScheme';
import { merge } from './tool';

const SchemeList: IScheme[] = [
  {
    id: 1,
    schemeName: '批量分解',
    star: true,
    list: [1],
    config: {
      '1': {
        sleepAfter: '1800,3600',
      }
    }
  }, {
    id: 2,
    schemeName: '接受副本邀请',
    star: true,
    list: [2],
  },
  // , {
  //     id: 101,
  //     groupName: '活动',
  //     schemeName: '银之绮都_妖塔燃战',
  //     star: true,
  //     list: [0, 1, 2, 3, 128]
  // }
  // , {
  //     id: 102,
  //     groupName: '活动',
  //     schemeName: '夏日游园会_消消乐',
  //     star: true,
  //     list: [0, 3, 129, 130],
  //     commonConfig: { multiColorSimilar: 95 }
  // }
  // 完整demo
  // , {
  //     id: 2,
  //     schemeName: '组队队长',
  //     star: false,
  //     list: [0, ], // funcList中的id集合
  //     config: { // 方案中的配置，如返回空的话使用默认配置
  //         '1': { // key为功能的ID（1表示准备）
  //             enabled: false,
  //             position: '五人-左1'
  //         }
  //     },
  //     commonConfig: { // 通用参数
  //         clickDelay: 200, // 点击后固定延时
  //         clickDelayRandom: 1000, // 点击后延时随机数
  //         // 等
  //     }
  // }
];

let commonConfig = {};
for (let i = 0; i < commonConfigArr.length; i++) {
  for (let j = 0; j < commonConfigArr[i].config.length; j++) {
    let item = commonConfigArr[i].config[j];
    commonConfig[item.name] = item.default;
  }
}
let allConfig = {};
for (let i = 0; i < funcList.length; i++) {
  let configs = funcList[i].config;
  if (configs) {
    allConfig[funcList[i].id] = {};
    for (let config of configs) {
      config.config.forEach((item) => {
        allConfig[funcList[i].id][item.name] = item.default;
      });
    }
  }
}

// 内置方案列表
const innerSchemeListName = {};

SchemeList.forEach((item, id) => {
  innerSchemeListName[item.schemeName] = true;
  let thisConfig = {};
  item.list.forEach((funcId) => {
    if (allConfig[funcId]) {
      thisConfig[funcId] = allConfig[funcId];
    }
  });
  SchemeList[id] = merge(
    {},
    {
      id: id + 1,
      schemeName: '未命名',
      inner: true,
      star: false,
      list: [],
      config: thisConfig,
      commonConfig: commonConfig,
    },
    item
  );
});

export const schemeNameMap = innerSchemeListName;
export default SchemeList;
