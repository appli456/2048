/**
 * Created by li_rz on 2015/11/20.
 */
game_2048.interface = (function () {

    // ----------------------------------- 变量声明及定义 -----------------------------
    var html_map = {
        new_element: [],
        merged_element: null,
        inner_element: []
    },
        catchNew,
        catchMerged,
        catchArray,
        restartGame,
        findObjectElement,
        ifWin,
        ifDie,
        createHTML;

    // --------------------------------- 变量声明及定义结束 ----------------------------

    // --------------------------------- DOM 方法 ---------------------------

    /**
     * @name findObjectElement
     * @param element_array - html_map.merged_element or html_map.new_element
     * @param search_object - 寻找是否该坐标为合并坐标
     * @direction 寻找合并坐标，添加类
     * @return true - 找到
     *         false - 未找到
     */
    findObjectElement = function (element_array, search_object) {
        var i,
            j,
            counter = 0;
        if (!(search_object instanceof Object)) {
            return false;
        }
        for (i = 0; i < element_array.length; ++i) {
            for (j in element_array[i]) {
                if (element_array[i].hasOwnProperty(j)) {
                    if (element_array[i][j] === search_object[j]) {
                        ++counter;
                    }
                }
            }
            if (counter === 2) {
                return true;
            }
            counter = 0;
        }

        return false;
    } ;

    ifWin = function () {

        var i,
            j;
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (html_map.inner_element[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    };

    ifDie = function () {

        var i,
            j;

        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (html_map.inner_element[i][j] === 0) {
                    return false;
                }
            }
        }

        for (i = 0; i < 4; ++i) {
            for (j = 1; j < 3; ++j) {
                if (html_map.inner_element[i][j] === html_map.inner_element[i][j - 1]) {
                    return false;
                }

                if (html_map.inner_element[i][j] === html_map.inner_element[i][j + 1]) {
                    return false;
                }
            }
        }

        for (j = 0; j < 4; ++j) {
            for (i = 1; i < 3; ++i) {
                if (html_map.inner_element[i][j] === html_map.inner_element[i - 1][j]) {
                    return false;
                }

                if (html_map.inner_element[i][j] === html_map.inner_element[i + 1][j]) {
                    return false;
                }
            }
        }

        return true;
    };

    createHTML = function ($cover_container) {
        // debugger;
        var i,
            j,
            position = {
                x : null,
                y : null,
                value : null
            },
            use_object,
            html_article = [],
            merged_class = '',
            new_class = '';
        console.log('总数组', html_map.merged_element);

        for (i = 0; i < 4; ++i) {
            for(j = 0; j < 4; ++j) {
                // console.log('元素', html_map.merged_element.indexOf({x : j, y : i}));
                use_object = {
                    x: j,
                    y: i
                };

                if (html_map.merged_element && findObjectElement(html_map.merged_element, use_object)) {
                    merged_class = ' cover-merged'
                }


                if (html_map.new_element && findObjectElement(html_map.new_element, use_object)) {
                    new_class = ' cover-new';
                }

                if (html_map.inner_element[i][j] !== 0) {
                    position.x = (j + 1).toString();
                    position.y = (i + 1).toString();
                    position.value = html_map.inner_element[i][j].toString();
                    html_article.push('<div class="cover cover-position-' +
                                            position.x + '-' + position.y +
                                            ' cover-' + position.value + merged_class + new_class +
                                        '">' +
                                        '<div class="cover-inner">' + position.value + '</div>' +
                                        '</div>');
                    merged_class = '';
                    new_class = '';
                }
            }
        }

        if (html_article.length) {
            console.log(html_article.join(''));
            $cover_container.html(html_article.join(''));
            html_map.new_element = [];
            html_map.merged_element = [];
        }
    };

    // -------------------------------- DOM 方法结束 ------------------------

    // -------------------------------- 公共方法 ----------------------------


    restartGame = function () {

    };


    catchNew = function (new_coordinate) {

        if (!new_coordinate.isArray) {
            html_map.new_element.push(new_coordinate);
        }
        else {
            html_map.new_element = new_coordinate.slice();
        }
    };

    catchMerged = function(merged_coordinate) {
        html_map.merged_element = merged_coordinate.slice();
        // html_map.merged_element.push(merged_coordinate);
    };

    catchArray = function (coordinate, $cover_container) {
        html_map.inner_element = coordinate;

        var $game_message = $('.game-message');
        if (ifWin()) {
            console.log(ifWin);
            $game_message.addClass('game-over');
            $game_message.find('p').html('你赢了');
        }

        if (ifDie()) {
            $game_message.addClass('game-over');
            $game_message.find('p').html('你输了');
        }
        console.log(html_map);
        createHTML($cover_container);
    };



    // ------------------------------ 公共方法结束 --------------------------

    return {
        catchNew : catchNew,
        catchMerged : catchMerged,
        catchArray : catchArray,
        createHTML : createHTML,
        restartGame: restartGame
    }

}());