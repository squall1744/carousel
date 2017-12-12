function Carousel($cs) {
  this.$imgCt = $cs.find('.img-ct')
  this.$imgCon = $cs.find('.img-ct li')
  this.$pre = $cs.find('.pre')
  this.$next = $cs.find('.next')
  this.$bullet = $cs.find('.bullet li')
  this.count = this.$imgCon.length
   
  this.index = 0
  this.isAnimate = false
}

Carousel.prototype.init = function() {
  var _this = this
  this.$first = this.$imgCon.first()
  this.$last = this.$imgCon.last()
  this.$imgCt.append(this.$first.clone())
  this.$imgCt.prepend(this.$last.clone())
  this.width = this.$imgCt.width(this.$imgCon.width() * (this.count+2))
  this.$imgCt.css({
    left: -this.$imgCon.width()
  })
  this.bind()
  this.bullet()
  setInterval(function(){
    _this.next(1)
  }, 2000)
}

Carousel.prototype.bind = function() {
  var _this = this
  this.$pre.on('click', function() {
    _this.pre(1)
  })
  
  this.$next.on('click', function() {
    _this.next(1)
  })
  
}

Carousel.prototype.pre = function(num) {
  var _this = this
  if(_this.isAnimate) return
  _this.isAnimate = true
  _this.$imgCt.animate({
    left: '+=' + _this.$imgCon.width() * num
  }, function() {
    _this.isAnimate = false
    _this.index -= num
    _this.setBullet()
    if(_this.index < 0){
      _this.index = _this.count-1
      _this.$imgCt.css({
        left: -_this.$imgCon.width() * (_this.index+1)
      })
      _this.setBullet()
    }
  })
}


Carousel.prototype.next = function(num) {
  var _this = this
  if(_this.isAnimate) return
  _this.isAnimate = true
  _this.$imgCt.animate({
    left: '-=' + _this.$imgCon.width() * num
  }, function() {
    _this.isAnimate = false
    _this.index += num
    _this.setBullet()
    if(_this.index === _this.count){
      _this.index = 0
      _this.$imgCt.css({
        left: -_this.$imgCon.width()
      })
      _this.setBullet()
    }
  })
}

Carousel.prototype.bullet = function() {
  var _this = this
  _this.$bullet.on('click', function(){
    if($(this).index()- _this.index > 0){
      _this.next($(this).index()- _this.index)
    }else{
      _this.pre(_this.index - $(this).index())
    }
  })
}


Carousel.prototype.setBullet = function() {
  this.$bullet.removeClass('active').eq(this.index).addClass('active')
}

var carouselStart = (function(){
  return {
    init: function($cs) {
      $cs.each(function(index, node) {
        new Carousel($(node)).init()
      })
    }
  }
})()

carouselStart.init($('.carousel'))
