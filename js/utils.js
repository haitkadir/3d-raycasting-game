function normalizeAngle(angle){
    angle = (angle % (2 * Math.PI));
    if (angle < 0)
        angle = (2 * Math.PI) + angle
    return (angle);
}
