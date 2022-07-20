const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
    static width = 40
    static height = 40
    constructor({position, image}){
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x,
             this.position.y)
        }
}

class Player {
    constructor ({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15

    }

    draw (){
        context.beginPath()
        context.arc(this.position.x, this.position.y,this.radius, 0 , Math.PI *2  )
        context.fillStyle = 'Yellow'
        context.fill()
        context.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y    
    }


}
class Pellet {
    constructor ({position, velocity}){
        this.position = position
        this.radius = 3

    }

    draw (){
        context.beginPath()
        context.arc(this.position.x, this.position.y,this.radius, 0 , Math.PI *2  )
        context.fillStyle = 'Red'
        context.fill()
        context.closePath()
    }
}
const pellets = []
const boundaries = [ ]

const player = new Player ({
    position: {
        x:Boundary.width + 20,
        y:Boundary.height + 20
    },

    velocity: {
        x:0, 
        y:0
    }
})


const keys = {
    w:{
        pressed: false
    },

    a:{
        pressed: false
    },

    s:{
        pressed: false
    },

    d:{
        pressed: false
    }

}

let lastKey = ' '



const map = [['1','-','-','-','-','-','2',],
            ['|',' ','.','.','.','.','|',],
            ['|','.','a','.','a','.','|',],
            ['|','.','.','.','.','.','|',],
            ['|','.','a','.','a','.','|',],
            ['|','.','.','.','.','.','|',],
            ['4','-','-','-','-','-','3',]]


function imageCreator (src){
    const image = new Image()
    image.src = src
    return image
}
 map.forEach((row, i )=> {
    row.forEach ((symbol, j) => {
        switch (symbol){
            case '-':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator('./pacman_assets/pipeHorizontal.png')
                    })
                )

            break
            case '|':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator ('./pacman_assets/pipeVertical.png')
                    })
                )
            break
            case '1':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator ('./pacman_assets/pipeCorner1.png')
                    })
                )
            break
            case '2':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator ('./pacman_assets/pipeCorner2.png')
                    })
                )
            break
            case '3':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator ('./pacman_assets/pipeCorner3.png')
                    })
                )
            break
            case '4':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator ('./pacman_assets/pipeCorner4.png')
                    })
                )
            break
            case 'a':
                boundaries.push(
                    new Boundary (
                        {position: {
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        },
                        image: imageCreator ('./pacman_assets/block.png')
                    })
                )
            break
            case '.':
                pellets.push(
                    new Pellet (
                        {position: {
                            x:Boundary.width/2 + Boundary.width* j,
                            y:Boundary.height/2 + Boundary.height * i
                        },
                    })
                )
            break
        }
    })
})

function pacmanCollidesWithBorder ({
    circle,
    rectangle
}) {
    return (
        circle.position.y - circle.radius + circle.velocity.y 
        <= 
        rectangle.position.y + rectangle.height && 
        circle.position.x + circle.radius + circle.velocity.x
            >= 
            rectangle.position.x && 
        circle.position.y + circle.radius + circle.velocity.y 
            >= 
            rectangle.position.y && 
        circle.position.x - circle.radius + circle.velocity.x 
            <= 
        rectangle.position.x + rectangle.width
    )    

}


function animate (){
    requestAnimationFrame(animate)
    context.clearRect(0,0,canvas.width,canvas.height)
    
    if (keys.w.pressed && lastKey === 'w') {
        for (let i =0; i< boundaries.length; i++){
          const boundary = boundaries[i]  
        
        if (pacmanCollidesWithBorder({
            circle:{...player,velocity:{
                x:0,
                y:-5
            }
        },
            rectangle: boundary
        })
        ) {
            player.velocity.y = 0
            break
        }  else {
            player.velocity.y = -5
        }  
    }

}   else if (keys.a.pressed && lastKey === 'a'){
        
    for (let i =0; i< boundaries.length; i++){
        const boundary = boundaries[i]  
      
      if (pacmanCollidesWithBorder({
          circle:{...player,velocity:{
              x:-5,
              y:0
          }
      },
          rectangle: boundary
      })
      ) {
          player.velocity.x = 0
          break
      }  else {
          player.velocity.x = -5
      }  

    }
        
}   else if (keys.s.pressed && lastKey === 's'){
    for (let i =0; i< boundaries.length; i++){
        const boundary = boundaries[i]  
      
      if (pacmanCollidesWithBorder({
          circle:{...player,velocity:{
              x:0,
              y:5
          }
      },
          rectangle: boundary
      })
      ) {
          player.velocity.y = 0
          break
      }  else {
          player.velocity.y = 5
      }  

    }

}   else if (keys.d.pressed && lastKey === 'd'){
    for (let i =0; i< boundaries.length; i++){
        const boundary = boundaries[i]  
      
      if (pacmanCollidesWithBorder({
          circle:{...player,velocity:{
              x:5,
              y:0
          }
      },
          rectangle: boundary
      })
      ) {
          player.velocity.x = 0
          break
      }  else {
          player.velocity.x = 5
      }  

    }

}   
    
    
 for (let i = pellets.length -1; 0<i; i--){
    const pellet = pellets[i]
    pellet.draw()
    if (Math.hypot(pellet.position.x - player.position.x, 
        pellet.position.y - player.position.y) 
        <= pellet.radius + player.radius) {
            pellets.splice(i,1)
        }   
}


boundaries.forEach (boundary => { 
    boundary.draw()
        if (pacmanCollidesWithBorder({
            circle:player,
            rectangle: boundary
        })) {
            player.velocity.x = 0
            player.velocity.y = 0
        }    
})
 player.update()   
}


animate()

addEventListener('keydown', ({key}) => {
    
    switch (key) {
        case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
    }
    switch (key) {
        case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break
    }
    switch (key) {
        case 's':
        keys.s.pressed = true
        lastKey = 's'
        break
    }
    switch (key) {
        case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
    }

})

addEventListener('keyup', ({key}) => {
    
    switch (key) {
        case 'w':
            keys.w.pressed = false
        break
    }
    switch (key) {
        case 'a':
            keys.a.pressed = false
        break
    }
    switch (key) {
        case 's':
            keys.s.pressed = false
        break
    }
    switch (key) {
        case 'd':
            keys.d.pressed = false
        break
    }

})














