/**
 * Created by li_rz on 2015/11/20.
 */
game_2048.interface = (function () {

    // ----------------------------------- 变量声明及定义 -----------------------------
    var html_map = {
        new_element: [],
        merged_element: [],
        inner_element: []
    },
        catchNew,
        catchMerged,
        catchArray,
        restartGame,
        createHTML;

    // --------------------------------- 变量声明及定义结束 ----------------------------

    // --------------------------------- DOM 方法 ---------------------------

    createHTML = function ($cover_container) {
        // debugger;
        var i,
            j,
            position = {
                x : null,
                y : null,
                value : null
            },
            html_article = [],
            merged_class = '',
            new_class = '';
        for (i = 0; i < 4; ++i) {
            for(j = 0; j < 4; ++j) {
                if (html_map.merged_element[{x : i, y : j}]) {
                    merged_class = ' cover-merged'
                }

                if (html_map.new_element[{x : i, y : j}]) {
                    new_class = ' cover-new';
                }

                if (html_map.inner_element[i][j] !== 0) {
                    position.x = (i + 1).toString();
                    position.y = (j + 1).toString();
                    position.value = html_map.inner_element[i][j].toString();
                    html_article.push('<div class="cover cover-position-' +
                                            position.y + '-' + position.x +
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
        }
    };

    // -------------------------------- DOM 方法结束 ------------------------

    // -------------------------------- 公共方法 ----------------------------


    restartGame = function () {

    };
    catchNew = function (new_coordinate) {
        if (!html_map.new_element[new_coordinate]) {
            html_map.new_element.push(new_coordinate);
        }
    };

    catchMerged = function(merged_coordinate) {
        if (!html_map.merged_element[merged_coordinate]) {
            html_map.merged_element.push(merged_coordinate);
        }
    };

    catchArray = function (coordinate, $cover_container) {
        html_map.inner_element = coordinate;

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