var $imgs = $('.carousel .img-ct li')
var $imgCt = $('.img-ct')
var $imgCon = $('.img-ct li img')
var $pre = $('.carousel .pre')
var $next = $('.carousel .next')
var $bullet = $('.carousel .bullet li')

var imgCount = $imgs.length
var imgWidth = $imgCon.width()
var index = 0
var isAnimate = false

$imgCt.append($imgs.first().clone())
$imgCt.prepend($imgs.last().clone())
$imgCt.width((imgCount + 2)*imgWidth)
$imgCt.css({left: -imgWidth})

setInterval(function(){
  nextImg(1)
}, 2000)

$pre.on('click', function(){
  preImg(1)
  
})

$next.on('click', function(){
  nextImg(1)
})

$bullet.on('click', function(){
  if($(this).index() > index) {
    nextImg($(this).index()-index)
  }else if($(this).index() < index){
    preImg(index-$(this).index())
  }
  
})

function preImg(len) {
  if(isAnimate) {return}
  isAnimate = true
  $imgCt.animate({
    left: '+=' + imgWidth * len
  }, function(){
    index -= len
    if(index < 0) {
      index = 3
      $imgCt.css({left: -imgWidth*4})
    }
    setBullet()
    isAnimate = false
  })
}

function nextImg(len) {
  if(isAnimate) {return}
  isAnimate = true
  $imgCt.animate({
    left: '-=' + imgWidth * len
  }, function(){
    index += len
    if(index === imgCount) {
      index = 0
      $imgCt.css({left: -imgWidth})
    }
    setBullet()
    isAnimate = false
  })
}

function setBullet(){
 $bullet.removeClass('active').eq(index).addClass('active')
}