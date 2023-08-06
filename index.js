const canvas = document.querySelector("canvas")
const scoreEl = document.querySelector("#score")

const c = canvas.getContext("2d")
c.font = "50px PacmanFont"
canvas.width = innerWidth
canvas.height = innerHeight

const boundaries = []
const pellets = []
const ghosts = [
  new Ghost({
    position : {
      x : Boundary.width * 6 + Boundary.width/2,
      y : Boundary.height * 3 + Boundary.height/2
  },
  velocity : {
      x : Ghost.speed,
      y : 0
  },
  color : "purple"
  }),
  new Ghost({
    position : {
      x : Boundary.width * 8 + Boundary.width/2,
      y : Boundary.height * 9 + Boundary.height/2
  },
  velocity : {
      x : Ghost.speed,
      y : 0
  },
  color : "green"
  }),
  new Ghost({
    position : {
      x : Boundary.width * 6 + Boundary.width/2,
      y : Boundary.height * 9 + Boundary.height/2
  },
  velocity : {
      x : Ghost.speed,
      y : 0
  },
  color : "pink"
  })
]

const powerUps = []

const player = new Player({
    position : {
        x : Boundary.width + Boundary.width/2,
        y : Boundary.height + Boundary.height/2
    },
    velocity : {
        x : 0,
        y : 0
    }
})

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]  

function createImage(src){
    image = new Image()
    image.src = src

    return image
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '-':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/pipeHorizontal.png')
            })
          )
          break
        case '|':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/pipeVertical.png')
            })
          )
          break
        case '1':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/pipeCorner1.png')
            })
          )
          break
        case '2':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/pipeCorner2.png')
            })
          )
          break
        case '3':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/pipeCorner3.png')
            })
          )
          break
        case '4':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/pipeCorner4.png')
            })
          )
          break
        case 'b':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('./assets/block.png')
            })
          )
          break
        case '[':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/capLeft.png')
            })
          )
          break
        case ']':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/capRight.png')
            })
          )
          break
        case '_':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/capBottom.png')
            })
          )
          break
        case '^':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/capTop.png')
            })
          )
          break
        case '+':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/pipeCross.png')
            })
          )
          break
        case '5':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/pipeConnectorTop.png')
            })
          )
          break
        case '6':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/pipeConnectorRight.png')
            })
          )
          break
        case '7':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/pipeConnectorBottom.png')
            })
          )
          break
        case '8':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('./assets/pipeConnectorLeft.png')
            })
          )
          break
        case '.':
        pellets.push(
            new Pellet({
            position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2
            }
            })
        )
        break
        case 'p':
        powerUps.push(
            new powerUp({
            position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2
            }
            })
        )
        break
      }
    })
  })

function circleCollidesWithRectangle({
    circle,
    rectangle
}){
    const padding = Boundary.width/2 - player.radius -1
    return (
    circle.position.y - circle.radius + circle.velocity.y  <=
    rectangle.position.y + rectangle.height + padding &&

    circle.position.x - circle.radius + circle.velocity.x <=
    rectangle.position.x + rectangle.width + padding &&

    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&

    circle.position.x + circle.radius + + circle.velocity.x >= rectangle.position.x - padding)
}

let score = 0
let animationId

function animate(){
  animationId = requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)

  if(pellets.length === 0){
    cancelAnimationFrame(animationId)
  }

  for(i = powerUps.length - 1; 0 <= i; i--){
    const powerUp = powerUps[i]
    
    powerUp.draw()

    if(
      Math.hypot( 
      powerUp.position.x - player.position.x,
      powerUp.position.y - player.position.y) < 

      powerUp.radius + player.radius){
        powerUps.splice(i, 1)

        ghosts.forEach(ghost => {
          ghost.isScared = true

          setTimeout(() => {
            ghost.isScared = false
          }, 3000)
        })
        
      }
  }

  for(i = pellets.length - 1; 0 <= i; i--){
      const pellet = pellets[i]
      
      pellet.draw()

      if(
          Math.hypot( 
          pellet.position.x - player.position.x,
          pellet.position.y - player.position.y) < 

          pellet.radius + player.radius){
              pellets.splice(i, 1)
              score += 10
              scoreEl.innerHTML = score
          }
  }

  boundaries.forEach((boundary) => {
      boundary.draw()

      if(circleCollidesWithRectangle({
          circle : player,
          rectangle : boundary
      })){
              player.velocity.x = 0
              player.velocity.y = 0
          }
  })
  
  player.update()

  if(keys.w.pressed && lastKey === "w"){
      for(let i = 0; i < boundaries.length; i++){
          if(circleCollidesWithRectangle({
              circle : {
                  ...player,
                  velocity : {
                      x : 0,
                      y : -5
                  }
              },
              rectangle : boundaries[i]
          })){
              player.velocity.y = 0
              break
          }else{
              player.velocity.y = -5
          }
      }
          }else if(keys.a.pressed && lastKey === "a"){
              for(let i = 0; i < boundaries.length; i++){
                  if(circleCollidesWithRectangle({
                      circle : {
                          ...player,
                          velocity : {
                              x : -5,
                              y : 0
                          }
                      },
                      rectangle : boundaries[i]
                  })){
                      player.velocity.x = 0
                      break
                  }else{
                      player.velocity.x = -5
                  }
              }
  }else if(keys.s.pressed && lastKey === "s"){
      for(let i = 0; i < boundaries.length; i++){
          if(circleCollidesWithRectangle({
              circle : {
                  ...player,
                  velocity : {
                      x : 0,
                      y : 5
                  }
              },
              rectangle : boundaries[i]
          })){
              player.velocity.y = 0
              break
          }else{
              player.velocity.y = 5
          }
      }
  }else if(keys.d.pressed && lastKey === "d"){
      for(let i = 0; i < boundaries.length; i++){
          if(circleCollidesWithRectangle({
              circle : {
                  ...player,
                  velocity : {
                      x : 5,
                      y : 0
                  }
              },
              rectangle : boundaries[i]
          })){
              player.velocity.x = 0
              break
          }else{
              player.velocity.x = 5
          }
      }
  }

  if(player.velocity.x === 5) player.rotation = Math.PI * 2
  if(player.velocity.x === -5) player.rotation = Math.PI
  if(player.velocity.y === 5) player.rotation = Math.PI * 0.5
  if(player.velocity.y === -5) player.rotation = Math.PI * 1.5


  ghosts.forEach((ghost, i) => {
    ghost.update()

    const collisions = []
    
    boundaries.forEach(boundary => {
      
      if(!collisions.includes("right") &&
        circleCollidesWithRectangle({
        circle : {
            ...ghost ,
              velocity : {
                x : Ghost.speed,
                y : 0
            }
        },
        rectangle : boundary
      })
    ){
      collisions.push("right")
    }

      if(!collisions.includes("left") &&
        circleCollidesWithRectangle({
        circle : {
            ...ghost ,
              velocity : {
                x : -Ghost.speed,
                y : 0
            }
        },
        rectangle : boundary
      })
    ){
      collisions.push("left")
    }

      if(!collisions.includes("up") &&
        circleCollidesWithRectangle({
        circle : {
            ...ghost ,
              velocity : {
                x : 0,
                y : -Ghost.speed
            }
        },
        rectangle : boundary
      })
    ){
      collisions.push("up")
    }

      if(!collisions.includes("down") &&
        circleCollidesWithRectangle({
        circle : {
            ...ghost ,
              velocity : {
                x : 0,
                y : Ghost.speed
            }
        },
        rectangle : boundary
      })
    ){
      collisions.push("down")
    }

    })

    if (collisions.length > ghost.prevCollisions.length){
      ghost.prevCollisions = collisions
    }

    if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){

      if(ghost.velocity.x > 0) ghost.prevCollisions.push("right")
      else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left")
      else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up")
      else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down")

      const pathways = ghost.prevCollisions.filter(collision => {
        return !collisions.includes(collision)
      })

      const direction = pathways[Math.floor(Math.random() * pathways.length)]

      switch (direction){
        case "right":
          ghost.velocity.x = Ghost.speed
          ghost.velocity.y = 0
          break

        case "left":
          ghost.velocity.x = -Ghost.speed
          ghost.velocity.y = 0
          break

        case "up":
          ghost.velocity.x = 0
          ghost.velocity.y = -Ghost.speed
          break

        case "down":
          ghost.velocity.x = 0
          ghost.velocity.y = Ghost.speed
          break
        }

        ghost.prevCollisions = []
    }

    if(
      Math.hypot( 
      ghost.position.x - player.position.x,
      ghost.position.y - player.position.y) < 

      ghost.radius + ghost.radius){
          if(!ghost.isScared){
            cancelAnimationFrame(animationId)
          }else{
            ghosts.splice(i, 1)
            score += 100
          }
      }
  })
}

animate()