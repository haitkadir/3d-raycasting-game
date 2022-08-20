function draw() {
    update();
    grid.render();
    for(ray of rays){
        ray.render();
    }
    player.render();
}