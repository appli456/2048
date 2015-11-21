/**
 * Created by li_rz on 2015/11/20.
 */
var game_2048 = (function () {
    'use strict';

    var initGame = function ($cover_container) {
        game_2048.shell.initModule($cover_container)
    };
    return {
        initGame: initGame
    }
}());


$(document).ready(function () {
    var $cover_container = $('.cover-contain');
    game_2048.initGame($cover_container);
});