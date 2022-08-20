
const   MAP_ROWS = 6;
const   MAP_COLS = 14;
const   TILE_SIZE = 64;
const   WIN_WIDTH = MAP_COLS * TILE_SIZE;
const   WIN_HEIGHT = MAP_ROWS * TILE_SIZE;

const   FOV_ANGLE = 60 * (Math.PI / 180);
const   WALL_STRIP_WIDTH = 1;
const   NUM_RAYS = (WIN_WIDTH / WALL_STRIP_WIDTH);

// ----- Map Class
class   Map{
    constructor(){
        this.grid = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,1,0,0,0,0,0,1,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
    }
    hasWallAt(x, y){
        let exactX = Math.floor(x / TILE_SIZE);
        let exactY = Math.floor(y / TILE_SIZE);
        if ((x < 0 || x > WIN_WIDTH) || (y < 0 || y > WIN_HEIGHT))
            return true;
        return this.grid[exactY][exactX] != 0 ? true : false; 
    }
    render(){
        for(let i=0; i<MAP_ROWS;i++){
            for(let j=0; j<MAP_COLS; j++){
                let tileX = j * TILE_SIZE;
                let tileY = i * TILE_SIZE;
                let tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                stroke("#000");
                fill(tileColor);
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

// --- Player Class
class Player{
    constructor(){
        this.x = WIN_WIDTH / 2;
        this.y = WIN_HEIGHT / 2;
        this.redius = 12;
        this.turnDirection = 0;
        this.walkDirection = 0;
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 2.0;
        this.rotationSpeed = 2 * (Math.PI / 180);
    }
    update(){
        this.rotationAngle += this.turnDirection * this.rotationSpeed;// for rotation
        
        let moveSteps = (this.walkDirection * this.moveSpeed);
        let newX = this.x + (Math.cos(this.rotationAngle) * moveSteps);
        let newY = this.y + (Math.sin(this.rotationAngle) * moveSteps);
        if (!grid.hasWallAt(newX, newY)){
            this.x = newX;
            this.y = newY;
        }
    }
    render(){
        noStroke();
        fill('red');
        circle(this.x, this.y, this.redius);
        stroke('red');
        line(
            this.x,
            this.y,
            this.x + (Math.cos(this.rotationAngle) * 60),
            this.y + (Math.sin(this.rotationAngle) * 60)
            );
        }
    }
    
// ----- Ray Class
class Ray{
    constructor(rayAngle){
        this.rayAngle = rayAngle;
    }
    render(){
        stroke('rgba(255, 0, 0, 0.5)');
        line(
            player.x,
            player.y,
            player.x + (Math.cos(this.rayAngle) * 100),
            player.y + (Math.sin(this.rayAngle) * 100),

        );
    }
} 
let grid = new Map();
let player = new Player();
let rays = [];
function setup() {
    createCanvas(WIN_WIDTH, WIN_HEIGHT);
}

