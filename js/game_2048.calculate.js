/**
 * Created by li_rz on 2015/11/20.
 */
game_2048.calculate = (function() {
    // ------------------------------------- 变量定义 -----------------------------------

    var coordinate = {
        map : [],
        avail : []
    },
        availInsert,
        mergeElement,
        moveElement,
        receiveEvent,
        randomNewElement;

    // ------------------------------------ 结束变量定义 ---------------------------------

    // ------------------------------------ DOM 方法 ------------------------------------

    availInsert = function (coordinate_map) {
        var i,
            j;
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if ( !coordinate_map[i][j]) {
                    coordinate.avail.push({x : i, y : j});
                }
            }
        }
    };

    mergeElement = function(emit_event, coordinate_map) {
        var i,
            j,
            k,
            grid_queue = [];
        // debugger;
        if (emit_event.event === 'restart') {

            // 重启游戏
        }
        // debugger;
        switch(emit_event.data) {

            // UP
            case 0:
                for (j = 0; j < 4; ++j) {
                    for (i = 0; i < 3; ++i) {
                        if (coordinate_map[i][j] !== 0) {
                            if (coordinate_map[i][j] === coordinate_map[i + 1][j]) {
                                coordinate_map[i][j] = coordinate_map[i][j] << 1;
                                grid_queue.push({
                                    x : i,
                                    y : j
                                });


                                for (k = i + 1; k < 3; ++k) {
                                    coordinate_map[k][j] = coordinate_map[k + 1][j];
                                }
                                coordinate_map[k][j] = 0;
                            }
                        }
                    }
                }

                game_2048.interface.catchMerged(grid_queue);
                grid_queue = [];
                // 合并坐标发送至interface
                break;
            // Right
            case 1:
                for (i = 0; i < 4; ++i) {
                    for (j = 3; j > 0 ; --j) {
                        if (coordinate_map[i][j] !== 0) {
                            if (coordinate_map[i][j] === coordinate_map[i][j - 1]) {
                                coordinate_map[i][j] = coordinate_map[i][j] << 1;
                                grid_queue.push({
                                    x: i,
                                    y: j
                                });

                                for (k = j - 1; k > 0; --k) {
                                    coordinate_map[i][k] = coordinate_map[i][k - 1];
                                }
                                coordinate_map[i][k] = 0;
                            }
                        }
                    }
                }

                game_2048.interface.catchMerged(grid_queue);
                grid_queue = [];
                break;

            // Down
            case 2:
                for (j = 0; j < 4; ++j) {
                    for (i = 3; i > 0; --i) {
                        if (coordinate_map[i][j] !== 0) {
                            if (coordinate_map[i][j] === coordinate_map[i - 1][j]) {
                                coordinate_map[i][j] = coordinate_map[i][j] << 1;
                                grid_queue.push({
                                    x : i,
                                    y : j
                                });

                                // debugger;
                                for (k = i - 1; k > 0; --k) {
                                    coordinate_map[k][j] = coordinate_map[k - 1][j];
                                }
                                coordinate_map[k][j] = 0;
                            }
                        }
                    }
                }

                game_2048.interface.catchMerged(grid_queue);
                grid_queue = [];
                break;

            // Left
            case 3:
                for (i = 0; i < 4; ++i) {
                    for (j = 0; j < 3 ; ++j) {
                        if (coordinate_map[i][j] !== 0) {
                            if (coordinate_map[i][j] === coordinate_map[i][j + 1]) {
                                coordinate_map[i][j] = coordinate_map[i][j] << 1;
                                grid_queue.push({
                                    x: i,
                                    y: j
                                });

                                for (k = j + 1; k < 3; ++k) {
                                    coordinate_map[i][k] = coordinate_map[i][k + 1];
                                }
                                coordinate_map[i][k] = 0;
                            }
                        }
                    }
                }

                game_2048.interface.catchMerged(grid_queue);
                grid_queue = [];
                break;

            default:
                break;
        }

        coordinate.map = coordinate_map;

        console.log('merged:', coordinate_map);
    };


    moveElement = function(emit_event, coordinate_map) {
        var i,
            j,
            k;
        //debugger;
        console.log(emit_event);

        // debugger;
        if (emit_event.event === 'restart') {

            // 重启游戏
        }
        switch(emit_event.data) {

            // UP
            case 0:
                for (j = 0; j < 4; ++j) {
                    k = 0;
                    for (i = 0; i < 4; ++i) {
                        if (coordinate_map[i][j]) {
                            if (k !== i) {
                                coordinate_map[k][j] = coordinate_map[i][j];
                                coordinate_map[i][j] = 0;
                            }
                            ++k;
                        }
                    }
                }
                break;

            // Right
            case 1:
                for (i = 0; i < 4; ++i) {
                    k = 3;
                    for (j = 3; j >= 0 ; --j) {
                        if (coordinate_map[i][j]) {
                            if (k !== j) {
                                coordinate_map[i][k] = coordinate_map[i][j];
                                coordinate_map[i][j] = 0;
                            }
                            --k;
                        }
                    }
                }
                break;

            // Down
            case 2:
                for (j = 0; j < 4; ++j) {
                    k = 3;
                    for (i = 3; i >= 0; --i) {
                        if (coordinate_map[i][j]) {
                            if (k !== i) {
                                coordinate_map[k][j] = coordinate_map[i][j];
                                coordinate_map[i][j] = 0;
                            }
                            --k;
                        }
                    }
                }
                break;

            // Left
            case 3:
                for (i = 0; i < 4; ++i) {
                    k = 0;
                    for (j = 0; j < 4; ++j) {
                        if (coordinate_map[i][j]) {
                            if (k !== j) {
                                coordinate_map[i][k] = coordinate_map[i][j];
                                // 添加移动坐标，发射至interface
                                coordinate_map[i][j] = 0;
                            }
                            ++k;
                        }
                    }
                }
                break;
            default:
                break;
        }
        console.log('Move:', coordinate_map);
        coordinate.map = coordinate_map;
    };

    // ---------------------------------- 结束DOM 方法 ----------------------------------

    // ---------------------------------- 公共方法 --------------------------------------



    randomNewElement = function (coordinate_map, if_start) {
        var i,
            if_four,
            new_num = 1,
            insert_num,
            insert_position;
        //debugger;
        availInsert(coordinate_map);

        // 一开始
        if (if_start) {
            new_num = 2;
        }


        for (i = 0; i < new_num; ++i) {
            if_four = Math.random() > 0.9;
            insert_num = Math.floor(Math.random() * coordinate.avail.length);
            insert_position = coordinate.avail[insert_num];
            if (if_four) {
                coordinate_map[insert_position.x][insert_position.y] = 4;
            }
            else {
                coordinate_map[insert_position.x][insert_position.y] = 2;
            }

            // 发送数据，确认新增坐标
            game_2048.interface.catchNew(insert_position);
            coordinate.avail.splice(insert_num, 1);
        }
        coordinate.avail = [];
        return coordinate_map;
    };

    receiveEvent = function (emit_event, coordinate_map) {
        if (emit_event.data === 4) {
            // 发射至interface
            return;
        }

        coordinate.map = coordinate_map;
        moveElement(emit_event, coordinate.map);
        mergeElement(emit_event, coordinate.map);
        coordinate.map = randomNewElement(coordinate.map, false);
        console.log('Array', coordinate.map);
        return coordinate.map;
    };

    // --------------------------------- 结束公共方法 -----------------------------------

    return {
        randomNewElement: randomNewElement,
        receiveEvent: receiveEvent,
    }
}());
