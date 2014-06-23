class MoveableRect
  constructor: (@height = 40, @width = 40, @color = 'black', @x = 0) ->
    @$el = $('<div></div>').css
      height: @height + 'px'
      width: @width + 'px'
      backgroundColor: @color
      marginLeft: @x
      position: 'absolute'
      bottom: 0
    $('body').append @$el

  move: (@x, duration = 0) ->
    if @x > window.innerWidth-@width
      @x = 0
    else if @x < 0
      @x = window.innerWidth-@width
    @$el.animate
      'margin-left': @x + 'px'
    , duration

class Player extends MoveableRect
  constructor: () ->
    super 40, 10, 'orange'
    @speed = 1
    $('body').keyup (e) =>
      @speed = 1
    $('body').keydown (e) =>
      @speed++
      if e.keyCode == 37
        @move @x-@speed
      else if e.keyCode == 39
        @move @x+@speed

class Car extends MoveableRect
  constructor: (@maxDist = 90, @duration = 2000, args...) ->
    super(args...)
    setInterval () =>
      newX = Math.floor(Math.random()*@maxDist)
      if Math.random() < 0.5
        newX -= @x
      else
        newX += @x
      @move newX, @duration
    , @duration


class DrunkenDriver extends Car
  constructor: () ->
    super window.innerWidth, 2000, 50, 70, 'red', 90

class TeleportingTaxi extends Car
  constructor: () ->
    super window.innerWidth/5, 500, 40, 50, 'yellow', 90

class PickyPolice extends Car
  constructor: () ->
    super window.innerWidth/10, 2000, 25, 30, 'green', 90


class Game
  constructor: () ->
    @player = new Player
    @drunkenDriver = new DrunkenDriver
    @teleportingTaxi = new TeleportingTaxi
    @PickyPolice = new PickyPolice

$ () ->
  new Game
