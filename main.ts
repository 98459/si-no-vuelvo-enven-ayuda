namespace SpriteKind {
    export const OcotEye = SpriteKind.create()
    export const Tentacle = SpriteKind.create()
    export const HitTentacle = SpriteKind.create()
    export const Display = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tentacle, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setKind(SpriteKind.HitTentacle)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (torpedoCount > 0) {
        torpedo = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . c c c c c c c c c . . . . . 
            . c b b b b b b b c 4 c . . . . 
            . c b b b b b b b c 4 4 c . . . 
            . c b b b b b b b c 4 4 c . . . 
            . c b b b b b b b c 4 c . . . . 
            . . c c c c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, thePlayer, 1, 0)
        torpedo.ax = 150
        torpedo.startEffect(effects.trail)
        torpedoCount += -1
        torpedoDisplay.say("x" + torpedoCount)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    trident = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . b b b . 
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . b . b . . . . 
        c c c e e e e e e b e b b b b b 
        . . . . . . . . . b . b . . . . 
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . . . . b b b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, thePlayer, 100, 0)
})
function reverseVelocity (sprite: Sprite) {
    if (sprite.bottom < scene.screenHeight() + 10 && sprite.y > 60) {
        sprite.vy = 10
        sprite.ay = 0 - sprite.ay
        sprite.setFlag(SpriteFlag.AutoDestroy, true)
    } else if (sprite.top > -10 && sprite.y < 60) {
        sprite.vy = -10
        sprite.ay = 0 - sprite.ay
        sprite.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
function setEyePosition () {
    octoEye.setPosition(octopus.x - 25, octopus.y - 20)
}
function makeOctoBOSS () {
    octopus = sprites.create(img`
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ....................................................................................................
        ..........................................88888888888888888.........................................
        .......................................888aaaaaaaaaaaaaaaaa888......................................
        .....................................88aaaaaaaaaaaaaaaaaaaaaaa88....................................
        ..................................888aaaaaaaaaaaaaaaaaaaaaaaaaaa888.................................
        .................................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8................................
        ...............................88aaaaaaaccccccccccaaaaaaaaaaaaaaaaaa88..............................
        ..............................8aaaaaaaaccccccccccccaaaaaaaaaaaaaaaaaaa8.............................
        .............................8aaaaaaaaccccccccccccccaaaaaaaaaaaaaaaaaaa8............................
        ...........................88aaaaaaaacccccaaaaaacccccaaaaaaaaaaaaaaaaaaa88..........................
        ..........................8aaaaaaaaaaccccaaaaaaaaccccaaaaaaaaaaaaaaaaaaaaa8.........................
        .........................8aaaaaaaaaaacccaaaaaaaaaacccaaaaaaaaaaaaaaaaaaaaaa8........................
        .........................8aaaaaaaaaaccccaaaaaaaaaacccaaaaaaaaaaaaaaaaaaaaaa8........................
        ........................8aaaaaaaaaaaccccaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaa8.......................
        .......................8aaaaaaaaaaaaccccccaacccccccccaaaaaaaaaaaaaaaaaaaaaaaa8......................
        ......................8aaaaaaaaaaaaaacccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaa8.....................
        ......................8aaaaaaaaaaaaaaaccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.....................
        .....................8aaaaaaaaaaaaaaaaaaccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8....................
        ....................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8...................
        ....................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8...................
        ....................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8...................
        ...................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8..................
        ...................cccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8..................
        ..................8cccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.................
        ..................8cccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.................
        ..................8ccccaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.................
        .................8accccaaaaaaaaaaaaccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8................
        .................8aacccaaaaaaaaaaaacccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8................
        .................8aacccaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8................
        .................8aacccaaaaaaaaaaaccccaaaccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8................
        .................8aacccaaaaaaaaaaaccccaaaccccaaaaaaaaaaaaaaccccccaaaaaaaaaaaaaaaaaa8................
        .................8accccaaaaaaaaaaacccaaaaccccaaaaaaaaaaaaacccccccccaaaaaaaaaaaaaaaa8................
        .................8cccccaaaaaaaaaaccccaaaacccaaaaaaaaaaaaacccccccccccaaaaaaaaaaaaaaa8................
        .................8ccccaaaaaaaaaaaccccaaaacccaaaaaaaaaaaaaccccaaccccccaaaaaaaaaaaaaa8................
        .................8ccccaaaaaaaaaaacccaaaaccccaaaaaaaaaaaaacccaaaaaccccaaaaaaaaaaaaaa8................
        .................8cccaaaaaaaaaaaacccccacccccaaaaaaaaaaaaacccaaaaaccccaaaaaaaaaaaaaa8................
        .................8aaaaaaaaaaaaaaaccccccccccaaaaaaaaaaaaaacccaaaaacccaaaaaaaaaaaaaaa8................
        .................8aaaaaaaaaaaaaaaacccccccccaaaaaaaaaaaaaacccaaaaacccaaaaaaaaaaaaaaa8................
        .................8aaaaaaaaaaaaaaaaaacccccaaaaaaaaaaaaaaaacccaaaaacccaaaaaaaaaaaaaaa8................
        .................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccaaaccccaaaaaaaaaaaaaaa8................
        .................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccacccccaaaaaaaaaaaaaaa8................
        .................8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccaaaaaaaaaaaaaaaa8................
        .................8aaccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccaaaaaaaaaaaaaaaaa8................
        ..................ccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccaaaaaaaaaaaaaaaa8.................
        ..................ccccccccaaaaaaaaaaaaaaaaacccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.................
        ..................cccaaccccaaaaaaaaaaaaaccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.................
        ...................8aaaccccaaaaaaaaaaaacccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8..................
        ...................8aaaacccaaaaaaaaaaaaccccccaaaccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8..................
        ....................8aaacccaaaaaaaaaaaacccaaaaaaacccaaaaaaaaaaaaaaaaaaaaaaaaaaaa8...................
        ....................8aaccccaaaacccccaaacccaaaaaaacccaaaaaaaaaaaaaaaaaaaaaaaaaaaa8...................
        ....................8aaccccaaaccccccaaacccaaaaaaaccccaaaaaaaaaaaaaaaaaaaaaaaaaaa8...................
        .....................8accccaaccccccccaaccccaaaaccccccaaaaaaaaaaaaaaaaaaaaaaaaaa8....................
        ......................8aaaaaccccccccccaccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaa8.....................
        ......................8aaaaaccccaaccccaaccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaa8.....................
        .......................8aaaacccaaaacccaaaccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaa8......................
        ........................8aaacccaaaacccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8.......................
        .........................8aacccaccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8........................
        .........................8aaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8........................
        ..........................8acccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.........................
        ...........................8ccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa........................
        ............................aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.......................
        ............................aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.....................
        ...........................aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...................
        ...........aaaaa...........aaaaaa8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.................
        ...........aaaaa...........aaaaaa.8aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8aaaaaaaaaaaaaaaaaaaaa.............
        ...........aaaaa..........aaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaa.........
        ...........aaaaa..........aaaaaa...aaaccccaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaaa......
        ...........aaaaaa.........aaaaaa...aaacccccaa8aaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaa......
        ..........3333aaaaa.......aaaaaa...aaacccccaa.aaaaaaaaaaaaaaaaaaaaa....aaaaaaaaaaaaaaaaaaaaaaa......
        ..........3333aaaaa.......aaaaa...333acccccaa.aaaaaaaaaaaaaaaaaaaaaa....aaaaaaaaaaaaaaaaaaaaaa......
        ..........3333aaaaa.......aaaaa...333acccccaa.aaaaaaaaaaaaaaaaaaaaaaa....aaaaaaaaaaaaaaaaaaaaa......
        ...........333aaaaa.......aaaaa...333accccca..aaaaaaaa.aaaaaaaaaaaaaaa.........aaaaaaaaaaa..........
        ...........333aaaaaa......aaaaa...333aacccaa..aaaaaaaa.aaaaaaaaaaaaaaaa.............................
        ............aaaaaaaa......aaaaa...333aaaaaaa..aaaaaaa333aaaaaaaaaaaaaaaa............................
        ............aaaaaaaaa.....aaaaa...aaaaaaaaaa..aaaaaaa333.aaaaaaaaaaaaaaaa...........................
        .............aaaaaaaa.....aaaaa...aaaaaaaaaa..aaaaaaa3333.aaaaaaaaaaaaaaaa..........................
        .............aaaaaaaaa....aaaaa...aaaaaaaaaa..aacccaa3333..aaaaaaaaaaaaaaaa.........................
        ..............aaaaaaaaaa..aaaaa...aaaaaaaaa...aaccccca333...aaaaaaaaaaaaaaaa........................
        ..............3333aaaaaa..aaaaa...aaaaaaaaaa...acccccca......aaaaaaaaaaaaaaa........................
        ..............33333aaaaaa.aaaaa...aaaaaaaaaa...aaccccca......aaaaaaaaaaaaaaaaaa.....................
        ..............33333aaaaaaacccaa...aaaaaaaaaa...aaaaccca.......aaaaaaaaaaaaaaaaaaaaaaa...............
        ................333aaaaaaacccaa....aaaaaaccc...aaaaccca........aaaaaaaaaaaaaaaaaaaaaaaaaa...........
        ..................aaaaaaaacccaa....aaaaaaccc...aaaaccca.........aaaaaaaaaaaaaaaaaaaaaaaaaaa.........
        ...................aaaaaaccccaaaaaaaaaaaaccca..aaaaccca..........aaaaaaaaaaaaaaaaaaaaaaaaaaa........
        .....................aaaaccccaaaaaaaaaaaaccca...aaacccc....................aaaaaaaaaaaaaaaaa........
        .........................cccaaaaaaaaaaaaacccaa..acccccc..........................aaaaaaaaaaaa.......
        ......aaaaa..............cccaaaaaaa.333aacccaa..acccccc333...........................aaaaaaaaa......
        .....aaaaaa...............aaaaaaaaa.3333acccaa..acccccc333.............................aaaaaaa......
        ....aaaaaaa...............aaaaa.....3333accccaa.aacccca333.............................aaaaaaaa.....
        ....aaaaaaa...............aaaaa......333accccaaaaaaaaaa333..............................aaaaaaa.....
        ....aaaaaaa...............aaaaa......333aaccccaaaaaaaaa..................................aaaaaa.....
        ....aaaaaa...............aaaaaa........aaaccccccaaaaaaa..................................aaaaaaa....
        ....333aa................aaaaaa.........aaacccccaaaaaaa...................................aaaaaa....
        ....333aa................aaaa333.........a333cccaaaaaaa...................................aaaaaaa...
        ....333aa...............aaaaa333.........a333aaaaaaaaa....................................aaaaaaa...
        ....333aaa..............aaaaa333..........333aaaaaaaaaa....................................aaaaaa...
        ....333aaaa............aaaaaaa.............aaaaaaaaaaaaaa..................................aaaaaa...
        ....333aaaa...........aaaaaaaa.............aaaaaaa3333aaaaa.................................aaaaaa..
        ....a333aaaa.........aaaaaaaa...............aaaaaa3333aaaaaaa...............................aaaaaa..
        .....3333cccc.......aaaaaaaaa................aaaaa3333aaaaaaaaa.............................aaaaaa..
        .....33333cccaa...aaaaaaa333.................aaaaa3333aaaaaaaaaaaa..........................aaaaaa..
        ......3333cccaaaaaaaaaaa3333.................aaaaa333aaaaaaaaaaaaaaa........................aaaaaa..
        .......333aaaaaaaaaaaaaa3333................aaaaaa333aaaaaaaaaaaaaaaaa......................aaaaaa..
        ........aaaaaaaaaaaaaaaa333................aaaaaaaa.aaaaaaaaaaaaaaaaaaa.....................aaaaaa..
        .........aaaaaaaaaaaaaaa333................aaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa...............aaaaa...
        ...........aaaaaa333aa....................aaaaaaaa......aaaaaaaaaaaaaaaaaaaaa...............aaaaa...
        .............aaa3333....................aaaacccaaa........aaaaaaaaaaaaaaaaaaa.......................
        ................3333...................aaaacccc3333...........aaaaaaaaaaaaaaa.......................
        ................333.................aaaaaaccccc3333................aaaaaaaaaa.......................
        ....................................aaaaaacccca3333.................................................
        .................................aaaaaaaaacccaa3333.................................................
        .................................aaaaaaaaacccaa.333.................................................
        .................................aaaaaaaaaaaa.......................................................
        .................................aaaaa..............................................................
        .................................aaaaa..............................................................
        ....................................................................................................
        `, SpriteKind.Enemy)
    octopus.setPosition(150, 50)
    octopus.vy = -20
    octoEye = sprites.create(img`
        ................................
        ...........fffffffffff..........
        .........ff55555555555ff........
        .......ff555555555555555ff......
        ......f5555555555555555555f.....
        .....f555555555555555555555f....
        ....f55555555555555555555555f...
        ...f5555555555555555555555555f..
        ...f5555555555555555555555555f..
        ..f555555555555555555555555555f.
        ..f555555555555555555555555555f.
        .f55555555555555555555555555555f
        .f5555555555fffffffffff55555555f
        .f5555555fffffffffffffffff55555f
        .f5555fffffffffffffffffffffff55f
        .f55ffffffffffffffffffffffffff5f
        .f55ffffffffffffffffffffffffff5f
        .f555fffffffffffffffffffffffff5f
        .f555555fffffffffffffffff555555f
        .f55555555555555555555555555555f
        .f55555555555555555555555555555f
        .f55555555555555555555555555555f
        ..f555555555555555555555555555f.
        ..f555555555555555555555555555f.
        ...f5555555555555555555555555f..
        ...f5555555555555555555555555f..
        ....f55555555555555555555555f...
        .....f555555555555555555555f....
        ......f5555555555555555555f.....
        .......ff555555555555555ff......
        .........ff55555555555ff........
        ...........fffffffffff..........
        `, SpriteKind.OcotEye)
    setEyePosition()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.OcotEye, function (sprite, otherSprite) {
    eyeHP += -1
    sprite.destroy()
    if (eyeHP == 0) {
        game.over(true)
    }
    otherSprite.image.replace(5, 4)
    pause(200)
    otherSprite.image.replace(4, 5)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    trident = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . b b b . 
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . b . b . . . . 
        c c c e e e e e e b e b b b b b 
        . . . . . . . . . b . b . . . . 
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . . . . b b b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, thePlayer, 100, 0)
    pause(200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    tentacle = sprites.create(img`
        ................
        ......aaa.......
        .....aaa........
        ...333aaa.......
        ...333aaa.......
        ...3333aa.......
        ...3333aaa......
        ...3333aaa......
        ....333aaaa.....
        ......aaaaa.....
        ......aaccc.....
        ......aacccc....
        ......aacccc....
        ......aacccc....
        ....333aaaaa....
        ....333aaaa.....
        ....333aaaa.....
        ...3333aaaa.....
        ...3333aaaa.....
        ...3333aaaa.....
        ...3333aaaa.....
        ...333aaaaa.....
        ....aaaccca.....
        ....aaaccc......
        ....accccc......
        ....accca.......
        ....accca.......
        ...aaccca.......
        ...aaccc........
        ...aaccc........
        ...aaccc........
        ...aaaaa........
        ...aaaa.........
        ...aaaa.........
        ...aaaaa........
        ....aaaaa.......
        ....aaaa33......
        ....aaaaa3......
        ....aaaaa3......
        .....aaaa3......
        .....aaaaa......
        .....aaaaa......
        .....aaaaa......
        .....aaaaa......
        .....aaaaa......
        ....aaaaa3......
        ....aaaaa3......
        ....aaaaa3......
        ....aaaaa3......
        ...aaaaaa3......
        ...aaaaaa.......
        ...aaaaaa.......
        ..aaaaaaa.......
        ..aaaaaa........
        .aaaaaaa........
        .aaaaaaa........
        aaaaaaaa........
        aaaaaaa.........
        aaaaaaa.........
        accccaa.........
        cccccaaa........
        cccccaaa........
        cccccaaaa.......
        cccccaaaa.......
        `, SpriteKind.Tentacle)
    tentacle.x = randint(0, scene.screenWidth() - 50)
    sprite.destroy()
    if (Math.percentChance(50)) {
        tentacle.top = scene.screenHeight()
        tentacle.ay = -200
    } else {
        tentacle.image.flipY()
        tentacle.bottom = 0
        tentacle.ay = 200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pulpitos.destroy(effects.coolRadial, 100)
})
let pulpitos: Sprite = null
let tentacle: Sprite = null
let octopus: Sprite = null
let octoEye: Sprite = null
let trident: Sprite = null
let torpedo: Sprite = null
let torpedoDisplay: Sprite = null
let torpedoCount = 0
let eyeHP = 0
let thePlayer: Sprite = null
thePlayer = sprites.create(img`
    .............eeee.......
    .............ebbe.......
    .............ebbe.......
    ........eeeeeeeeee......
    ......eebbbbbbbbbee.....
    .ee..ebbbbbbbbbbbbbe....
    ebbe.ebbbbbbbbbbbbbe....
    ebbbebbeeeeeeeeeebbbe...
    eeebbbebbbbbbbeddebbe...
    ebbeeebbbbbbbbeddeeee...
    ebbebbebbbbbbbeddebbe...
    eeebebbeeeeeeeeeebbbe...
    ebbe.ebbbbbbbbbbbbbe....
    .ee..ebbbbbbbbbbbbbe....
    ......eebbbbbbbbbee.....
    ........eeeeeeeee.......
    `, SpriteKind.Player)
controller.moveSprite(thePlayer)
thePlayer.z = 10
scene.setBackgroundColor(9)
effects.bubbles.startScreenEffect()
makeOctoBOSS()
info.setLife(3)
eyeHP = 10
torpedoCount = 3
torpedoDisplay = sprites.create(img`
    . c c c c c c c c c . . 
    c b b b b b b b c 4 c . 
    c b b b b b b b c 4 4 c 
    c b b b b b b b c 4 4 c 
    c b b b b b b b c 4 c . 
    . c c c c c c c c c . . 
    `, SpriteKind.Display)
torpedoDisplay.setFlag(SpriteFlag.Ghost, true)
torpedoDisplay.setPosition(10, 112)
torpedoDisplay.say("x" + torpedoCount)
game.onUpdate(function () {
    thePlayer.setImage(img`
        .............eeee.......
        .............ebbe.......
        .............ebbe.......
        ........eeeeeeeeee......
        ......eebbbbbbbbbee.....
        .ee..ebbbbbbbbbbbbbe....
        ebbe.ebbbbbbbbbbbbbe....
        ebbbebbeeeeeeeeeebbbe...
        eeebbbebbbbbbbeddebbe...
        ebbeeebbbbbbbbeddeeee...
        ebbebbebbbbbbbeddebbe...
        eeebebbeeeeeeeeeebbbe...
        ebbe.ebbbbbbbbbbbbbe....
        .ee..ebbbbbbbbbbbbbe....
        ......eebbbbbbbbbee.....
        ........eeeeeeeee.......
        `)
    if (thePlayer.vx < 0) {
        thePlayer.image.flipX()
    } else if (thePlayer.x % 0 + 2 == 0) {
        thePlayer.setImage(img`
            .............eeee.......
            .............ebbe.......
            .............ebbe.......
            ........eeeeeeeeee......
            ......eebbbbbbbbbee.....
            .ee..ebbbbbbbbbbbbbe....
            ebbe.ebbbbbbbbbbbbbe....
            ebbbebbeeeeeeeeeebbbe...
            eeebbbebbbbbbbeddebbe...
            ebbeeebbbbbbbbeddeeee...
            ebbebbebbbbbbbeddebbe...
            eeebebbeeeeeeeeeebbbe...
            ebbe.ebbbbbbbbbbbbbe....
            .ee..ebbbbbbbbbbbbbe....
            ......eebbbbbbbbbee.....
            ........eeeeeeeee.......
            `)
    }
})
game.onUpdate(function () {
    setEyePosition()
    for (let value of sprites.allOfKind(SpriteKind.Tentacle)) {
        reverseVelocity(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.HitTentacle)) {
        reverseVelocity(value)
    }
})
game.onUpdateInterval(5000, function () {
    pulpitos = sprites.create(img`
        ................................
        ................................
        ................................
        .................f..............
        ...............4ff4.............
        ..............44f444............
        ............44444444............
        ............44444444............
        ...........4444444444...........
        ...........4444444444...........
        ..........44111114444...........
        ..........411f11114444..........
        ..........41fff1114444..........
        ..........41fff1114444..........
        ..........41fff1114444..........
        ...........11f1111444...........
        ............11111444............
        ............44444444............
        ............44444444............
        ............44333344............
        ............44444434............
        ............444444444...........
        ...........44444444444..........
        .........4444.4444434444........
        .......44433..44.44.344444......
        .....444443..44...4...33444444..
        ....44333...443...44...3344443..
        ..3334......443...43.......433..
        .........44444....43............
        ........4433......44............
        .......444.......443............
        ................43..............
        `, SpriteKind.Enemy)
    pulpitos.setVelocity(0, 100)
    pulpitos.setPosition(randint(0, 120), 0)
})
game.onUpdateInterval(1500, function () {
    octopus.vy = 0 - octopus.vy
})
