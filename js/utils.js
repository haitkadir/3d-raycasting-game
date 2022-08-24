function normalizeAngle(angle){
    angle = (angle % (2 * Math.PI));
    if (angle < 0)
        angle = (2 * Math.PI) + angle
    return (angle);
}

function distanceBitweenPoints(x1, y1, x2, y2){
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}