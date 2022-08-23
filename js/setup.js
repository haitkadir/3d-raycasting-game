
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
        this.rotationAngle = normalizeAngle(this.rotationAngle);
        
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
        this.rayAngle = normalizeAngle(rayAngle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;

        this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
        this.isRayFicingUp = !this.isRayFacingDown;
        this.isRayFicingRight = this.rayAngle < 0.5 *Math.PI || this.rayAngle > 1.5 * Math.PI;
        this.isRayFicingLeft = !this.isRayFicingRight;
    }

    cast(columnId){
        let xintercept, yintercept;
        let xstep, ystep;

        // Horizontal ray-grind intersection
        yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        yintercept += this.isRayFacingDown ? TILE_SIZE : 0;
        xintercept = ((player.y - yintercept) / tan(this.rayAngle))
        // xstep and ystep mains how much I will inceriment to get next intersection points
        ystep = TILE_SIZE;
        ystep *= this.isRayFicingUp ? -1 : 1;
        xstep = TILE_SIZE / Math.tan(this.rayAngle);
        xstep  *= (this.isRayFicingLeft && xstep > 0) ? -1 : 1;
        xstep  *= (this.isRayFicingRight && xstep < 0) ? -1 : 1;
    }

    render(){
        let Hy = (Math.floor(player.y / TILE_SIZE) * TILE_SIZE);
        let HOpp = (player.y - Hy);
        let Hx = player.x + (HOpp / Math.tan(this.rayAngle));

        let Vx = (Math.floor(player.x / TILE_SIZE) * TILE_SIZE);
        let VAdj = (player.x - Vx);
        let Vy = player.y + (Math.tan(this.rayAngle) * VAdj);

        stroke('rgba(255, 0, 0, 0.5)');
        line(
            player.x,
            player.y,
            player.x + (Math.cos(this.rayAngle) * 40),
            player.y + (Math.sin(this.rayAngle) * 40),
        );
        noStroke();
        fill('blue');
        circle(Hx, Hy, 10);
        fill('green');
        circle(Vx, Vy, 10);
    }
}
let grid = new Map();
let player = new Player();
let rays = [];

function setup() {
    createCanvas(WIN_WIDTH, WIN_HEIGHT);
}
