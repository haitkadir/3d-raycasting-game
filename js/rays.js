function castAllRays(){
    let columnId = 0;
    let rayAngle = (player.rotationAngle - (FOV_ANGLE / 2));

    rays = [];
    // for(let i = 0; i < NUM_RAYS; i++){
    for(let i = 0; i < 1; i++){
        let ray = new Ray(rayAngle);
        rays.push(ray);
        rayAngle += (FOV_ANGLE / NUM_RAYS);
        columnId++;
    }
}