window.onload = function () {
    /***
     * 当页面加载后,立即执行函数才会执行,是因为要获取body元素,
     * 给MapSnake的原型上添加一个方法,去初始化背景的相关属性
     */
    (function () {
        function MapSnake(width, height, bgColor) {
            this.width = width
            this.height = height
            this.bgColor = bgColor
        }

        //地图的初始化操作
        MapSnake.prototype.init = function () {
            let divs = document.createElement('div')
            divs.style.width = this.width + "px"
            divs.style.height = this.height + "px"
            divs.style.backgroundColor = this.bgColor
            divs.style.position = 'relative'
            divs.id = 'map-div'
            document.body.appendChild(divs) //将map添加到body中
        }
        //利用window的全局性去添加一个方法到window上,以便外部可以调用此方法
        window.MapSnake = MapSnake

    })();

    /**
     * 食物相关函数
     */
    (function () {
        var element = [];

        function Food(width, height, bgColor) {
            this.width = width
            this.height = height
            this.bgColor = bgColor
            this.x = 0
            this.y = 0
        }
        //食物的初始化操作
        Food.prototype.init = function () {
            this.remove();
            let mapDiv = document.getElementById('map-div')
            let foodDiv = document.createElement('div')
            foodDiv.style.height = this.height + "px"
            foodDiv.style.width = this.width + "px"
            foodDiv.style.backgroundColor = this.bgColor
            foodDiv.style.position = 'absolute'
            this.y = parseInt(Math.random() * (mapDiv.offsetHeight / this.height))
            this.x = parseInt(Math.random() * (mapDiv.offsetWidth / this.width))
            foodDiv.style.top = this.y * this.height + "px"
            foodDiv.style.left = this.x * this.width + "px"
            foodDiv.id = 'food-div'
            mapDiv.appendChild(foodDiv)
            element.push(foodDiv)
        }

        Food.prototype.remove = function () {
            let mapDiv = document.getElementById('map-div')
            for (let i = 0; i < element.length; i++) {
                mapDiv.removeChild(foodDiv[i])
            }
            element.slice(0)
        }

        window.Food = Food //将食物属性设置为windo的属性,便于外部使用
    })();

    (function () {
        var elements = [] //新建一个数组用来存储旧蛇的div部分,在删除方法中使用

        function Snake(width, height, dir) {
            this.width = width
            this.height = height
            this.dir = dir
            this.SnakePart = [{
                x: 3,
                y: 2,
                bgColor: '#DC7159'
            }, {
                x: 2,
                y: 2,
                bgColor: 'orange'
            }, {
                x: 1,
                y: 2,
                bgColor: 'orange'
            }]
        }
        Snake.prototype.init = function () {
            Snake.remove();
            let mapDiv = document.getElementById('map-div')
            for (let i = 0; i < this.SnakePart.length; i++) {
                let SnakeDiv = document.createElement('div')
                SnakeDiv.style.width = this.width + "px"
                SnakeDiv.style.height = this.height + "px"
                SnakeDiv.style.position = 'absolute'
                SnakeDiv.style.backgroundColor = this.SnakePart[i].bgColor
                SnakeDiv.style.left = this.SnakePart[i].x * this.height + "px"
                SnakeDiv.style.top = this.SnakePart[i].y * this.width + "px"
                mapDiv.appendChild(SnakeDiv)
                elements.push(SnakeDiv) //将蛇的部分添加到数组中,利用数组的方法进行和删除旧元素操作
            }

        }
        /**
         * 初始化使蛇向右移动
         */
        Snake.prototype.move = function () {
            for (let i = this.SnakePart.length - 1; i > 0; i--) {
                this.SnakePart[i].x = this.SnakePart[i - 1].x
                this.SnakePart[i].y = this.SnakePart[i - 1].y
            }
            switch (this.dir) {
                case 'left':
                    this.SnakePart[0].x -= 1;
                    break;
                case 'top':
                    this.SnakePart[0].y -= 1;
                    break;
                case 'right':
                    this.SnakePart[0].x += 1;
                    break;
                case 'bottom':
                    this.SnakePart[0].y += 1;
                    break;
                default:
                    this.SnakePart[0].x += 1;
                    break;
            }
        }

        /**
         * 在蛇初始化生成长度时,先进行数组的排空,目的是删除旧蛇,生成新蛇
         */
        Snake.remove = function () {
            let mapDiv = document.getElementById('map-div')
            for (let i = 0; i < elements.length; i++) {
                mapDiv.removeChild(elements[i]) //将在Map中的 存在于elements中的元素移除,但是元素还是存在与数组中
            }
            elements.splice(0) //将数组里面的元素清空
        }

        window.Snake = Snake
    })();

    /**
     * 封装Game构造函数,用于游戏的管理,食物的出现,蛇的运动,游戏规则
     */
    (function () {
        var that;

        function Game() {
            //将地图 食物 蛇的初始话设置设置成game的属性
            this.mapsnake = new MapSnake(800, 600, '#ccc')
            this.food = new Food(20, 20, 'green')
            this.snake = new Snake(20, 20)

        }
        //调用Game属性的各个init方法
        Game.prototype.init = function () {
            that = this
            this.mapsnake.init()
            this.food.init()
            this.snake.init()

        }

        //游戏的规则
        Game.prototype.rule = function () {
            var timer = setInterval(function () {
                that.snake.move();
                that.snake.init();
                if (that.snake.SnakePart[0].x < 0 || that.snake.SnakePart[0].x > that.mapsnake.width / that.snake.width - 1 || that.snake.SnakePart[0].y < 0 || that.snake.SnakePart[0].y > that.mapsnake.height / that.snake.height - 1) {
                    clearInterval(timer)
                    console.log(111);
                }
            }, 100)

            //判断蛇的位置,游戏结束条件

        }

        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 37:
                    that.snake.dir = 'left'
                    break;
                case 38:
                    that.snake.dir = 'top'
                    break;
                case 39:
                    console.log(that);
                    that.snake.dir = 'right'
                    break;
                case 40:
                    that.snake.dir = 'bottom'
                    break;
                default:
                    break;
            }
        }

        window.Game = Game
    })();

    var game = new Game();
    game.init()
    game.rule()

}