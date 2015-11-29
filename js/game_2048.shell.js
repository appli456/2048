/**
 * Created by li_rz on 2015/11/20.
 */

game_2048.shell = (function () {

    // ------------------------------------ 变量定义与声明 ----------------------------------------

    var jQueryMap = {
            $cover_container : null
    },
        coordinate = {
        pre_map: [],
        new_map: []
    },
        event_queue = [],
        joinEvent,
        startCalculate,
        initCoordinate,
        initModule;

    // ------------------------------------ 结束变量与声明 ----------------------------------------

    // ------------------------------------ DOM ---------------------------------


    initCoordinate = function () {
        var i,
            j;
        coordinate.new_map = [];
        for (i = 0; i < 4; ++i) {
            coordinate.new_map.push([]);
            for (j = 0; j < 4; ++j) {
                coordinate.new_map[i].push(0);
            }
        }

        console.log(coordinate.new_map);
    };


    startCalculate = function () {
        // debugger;
        while(event_queue.length) {
            coordinate.pre_map = coordinate.new_map;
            coordinate.new_map = game_2048.calculate.receiveEvent(event_queue[0], coordinate.new_map);
            game_2048.interface.catchArray(coordinate.new_map, jQueryMap.$cover_container);
            event_queue.shift();
        }
    };
    // ---------------------------------- DOM 结束 -------------------------------

    // ------------------------------------ 公共方法 -----------------------------------------

    joinEvent = function (emit_event) {
        // debugger;
        // 问题待解决
        if (!event_queue[emit_event]) {
            event_queue.push(emit_event);
        }
        // 事件进队开始处理
        startCalculate();
    };


    initModule = function($cover_container) {
        console.log($cover_container);
        initCoordinate();
        jQueryMap.$cover_container = $cover_container;
        game_2048.keyboard.initModule();
        coordinate.new_map = game_2048.calculate.randomNewElement(coordinate.new_map, true);
        game_2048.interface.catchArray(coordinate.new_map, $cover_container);
        console.log(coordinate.new_map);
    };

    // ------------------------------------ 公共方法结束 -------------------------------------
    return {
        initModule: initModule,
        joinEvent: joinEvent
    }
}());