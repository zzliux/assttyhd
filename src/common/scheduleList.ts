/**
 * TODO 使用system/Schedule的Job作为ScheduleDefaultList的元素
 */

import { JobOptions } from "@/system/Schedule";

const ScheduleDefaultList: JobOptions[] = [
  {
    id: 1,
    name: '接受副本邀请',
    desc: '自动分解',
    checked: false,
    lastRunTime: null,
    nextDate: null,
    repeatMode: 2,
    interval: '10',
    level: '10',
    config: {
      scheme: '批量分解',
    }
  }
];

export default ScheduleDefaultList;