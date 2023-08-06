class Player {
    constructor({position, velocity}) {
        this.position = position,
        this.velocity = velocity,
        this.radius = 15
        this.radians = 0.75
        this.openRate = 0.1
        this.rotation = 0
    }

    draw(){
        c.save()
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y)
        c.beginPath()
        c.arc(this.position.x,
            this.position.y,
            this.radius,
            this.radians,
            Math.PI*2 - this.radians)

        c.lineTo(this.position.x, this.position.y)
        c.fillStyle = "yellow"
        c.fill()
        c.closePath
        c.restore()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.radians < 0 || this.radians > 0.75){
            this.openRate = -this.openRate
        }

        this.radians += this.openRate
    }
}

