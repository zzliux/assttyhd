export type globalRootType = {
    running: boolean;
    runningTime: number;
    pauseTime: number;
    define_run_time: number;
    define_pause_time: number;
    currentNotifyDate: Date;
    notifyTime: number;
}

export const globalRoot: globalRootType = {
    running: false,
    runningTime: new Date().getTime(),
    pauseTime: 0,
    define_run_time: 0,
    define_pause_time: 0,
    currentNotifyDate: new Date(),
    notifyTime: 0
}