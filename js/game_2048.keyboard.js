/**
 * Created by li_rz on 2015/11/20.
 */
game_2048.keyboard = (function () {

    // ------------------------------------- 变量定义 ------------------------------
    var key_map = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3  // A
    },
        bindKeyBoardEvent,
        initModule;
    // ------------------------------------ 变量定义结束 ----------------------------

    // ------------------------------------ 事件定义 -----------------------------

    bindKeyBoardEvent = function () {
        $(document).on('keydown', function (event) {
            var modifiers = event.altKey ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey,
                map = key_map[event.which];
                console.log(map);
            if (!modifiers) {
                if (map !== undefined) {
                    event.preventDefault();
                    game_2048.shell.joinEvent({
                        event : 'move',
                        data : map
                    });
                }
            }

            if (!modifiers && event.which === 82) {
                game_2048.shell.joinEvent({
                    event : 'restart',
                    data : 4
                });
            }

        });
    };
    // ------------------------------------- 事件定义结束 ---------------------------



    initModule = function () {
        bindKeyBoardEvent();
    };


    return {
        initModule : initModule
    }
} ());