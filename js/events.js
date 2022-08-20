function keyPressed(){
    if (keyCode == UP_ARROW || keyCode == 87){
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW || keyCode == 83){
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW || keyCode == 68){
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW || keyCode == 65){
        player.turnDirection = -1;
    }
}

function keyReleased(){
    if (keyCode == UP_ARROW || keyCode == 87){
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW || keyCode == 83){
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW || keyCode == 68){
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW || keyCode == 65){
        player.turnDirection = 0;
    }
}