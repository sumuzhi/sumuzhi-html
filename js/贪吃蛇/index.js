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
        MapSnake.prototype.init = function () {
            let divs = document.createElement('div')
            divs.style.width = this.width + "px"
            divs.style.height = this.height + "px"
            divs.style.backgroundColor = this.bgColor
            divs.style.position = 'relative'
            divs.id = 'map-div'
            document.body.appendChild(divs)
        }
        //利用window的全局性去添加一个方法到window上,以便外部可以调用此方法
        window.MapSnake = MapSnake

    })();
    (function () {
        function Food(width, height, bgColor) {
            this.width = width
            this.height = height
            this.bgColor = bgColor
            this.x = 0
            this.y = 0
        }
        Food.prototype.init = function () {
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
            mapDiv.appendChild(foodDiv)
            foodDiv.id = 'food-div'
        }
        window.Food = Food
    })()

    var mapsnake = new MapSnake(800, 600, '#ccc')
    mapsnake.init()
    
    var food = new Food(20, 20, 'green')
    food.init()
}