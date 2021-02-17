class Board {
    constructor(columns, rows, parcialWidth, parcialHeight) {
        this.reference = document.querySelector('canvas');
        this.context = this.reference.getContext('2d');
        this.totalWidth = rows * parcialWidth;
        this.totalHeight = columns * parcialHeight;
        this.columns = columns;
        this.rows = rows;
        this.parcialWidth = parcialWidth;
        this.parcialHeight = parcialHeight;
        this.map = [];
    }

    
    build() {
        for (let i = 0; i < this.rows; i++) {
            this.map.push([]);
            
            for(let j = 0; j < this.columns; j++) {
                this.map[i].push({x: j * this.parcialWidth, y: i * this.parcialHeight, coordinates: {x: j, y: i}})
            }
        } 
    }
    
    drawMap() {
        this.reference.setAttribute('width', `${this.totalWidth}`);
        this.reference.setAttribute('height', `${this.totalHeight}`);
    
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                this.context.beginPath()
                this.context.strokeRect(j * this.parcialWidth, i * this.parcialHeight, this.parcialWidth, this.parcialHeight)
                this.context.closePath()
            }
        } 
    }

    drawComponent(component) {
        const x = this.map[component.y][component.x].x;
        const y = this.map[component.y][component.x].y;
        const xCenteringFactor = (this.parcialWidth - component.width ) / 2;
        const yCenteringFactor = (this.parcialHeight - component.height) / 2

        // console.log(calc)
        this.context.fillStyle = 'red'
        this.context.beginPath()
        this.context.fillRect(x + xCenteringFactor, y + yCenteringFactor, component.width, component.height)
        this.context.closePath()
    }

    rollDice() {
        const result = Math.floor(Math.random() * 6 + 1);
        document.getElementById('dice-result').innerHTML = result;

        return result;
    }

    move (component, x, y, movements) {
        // let 
        // if()

        component.x = x;
        component.y = y;
        

        this.drawAll(component)
    }

    drawAll(component) {
        this.context.clearRect(0, 0, this.totalWidth, this.totalHeight);
        this.drawMap();
        this.drawComponent(component);
    }
}

class Player {
    constructor(x, y, health, strenght) {
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.health = health;
        this.strenght = strenght;
    }
}

let dungeon = new Board(5, 5, 100, 100)
dungeon.build()
dungeon.drawMap()

let player = new Player(4, 3, 20, 7)

dungeon.drawComponent(player)


let diceButton = document.querySelector('.dice button')
diceButton.addEventListener('click', () => {
    const movements = dungeon.rollDice();

    dungeon.reference.addEventListener('click', event => {
        let leftCoordinate = dungeon.reference.offsetLeft + dungeon.reference.clientLeft;
        let topCoordinate = dungeon.reference.offsetTop + dungeon.reference.clientTop;
    
        let clickedElementX = Math.floor((event.pageX - leftCoordinate) / dungeon.parcialWidth);
        let clickedElementY = Math.floor((event.pageY - topCoordinate) / dungeon.parcialHeight);

        
    
        dungeon.move(player, clickedElementX, clickedElementY, movements)
    
        // console.log(dungeon.map)
        // console.log(dungeon.rollDice());
        
        // console.log(event.pageX, event.pageY)
    })
})



