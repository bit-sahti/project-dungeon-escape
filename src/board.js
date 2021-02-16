class Board {
    constructor(columns, rows, partsWidth, partsHeight) {
        this.reference = document.querySelector('canvas');
        this.context = this.reference.getContext('2d');
        this.totalWidth = rows * partsWidth;
        this.totalHeight = columns * partsHeight;
        this.columns = columns;
        this.rows = rows;
        this.partsWidth = partsWidth;
        this.partsHeight = partsHeight;
        this.map = [];
    }

    
    build() {
        for (let i = 0; i < this.rows; i++) {
            this.map.push([]);
            
            for(let j = 0; j < this.columns; j++) {
                this.map[i].push({x: j * this.partsWidth, y: i * this.partsHeight, coordinates: {x: j, y: i}})
            }
        } 
    }
    
    drawMap() {
        this.reference.setAttribute('width', `${this.totalWidth}`);
        this.reference.setAttribute('height', `${this.totalHeight}`);
    
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                this.context.beginPath()
                this.context.strokeRect(j * this.partsWidth, i * this.partsHeight, this.partsWidth, this.partsHeight)
                this.context.closePath()
            }
        } 
    }

    drawPlayer(player, width, height) {
        const x = this.map[player.x][player.y].x;
        const y = this.map[player.x][player.y].y;
        const centeringFactor = (this.partsWidth - width )/ 2;
        // console.log(calc)
        this.context.fillStyle = 'red'
        this.context.beginPath()
        this.context.fillRect(x + centeringFactor, y + centeringFactor, width, height)
        this.context.closePath()

        // let i = 0
        // for (let i = 0; i < 2; i++) {
            // setInterval(() => {
            //     i++
            //     this.context.clearRect(x + centeringFactor, y + centeringFactor, width, height)
            //     this.context.beginPath()
            //     this.context.fillRect(x + (i * 100) + centeringFactor, y + (i * 100) + centeringFactor, width, height)
            //     this.context.closePath()
            // }, 1000)
        // }
    }
}

class Player {
    constructor(x, y, health, strenght) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.strenght = strenght;
    }
}

let dungeon = new Board(5, 5, 100, 100)
dungeon.build()
dungeon.drawMap()

let player = new Player(0, 0, 20, 7)

dungeon.drawPlayer(player, 50, 50)

console.log(player)
// console.log(dungeon.map[4][0].x);

// console.log(document)

console.log(dungeon.reference.offsetTop)

dungeon.reference.addEventListener('click', event => {
    console.log(event.pageX, event.pageY)
})