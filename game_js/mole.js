/*Author: Bryen Buie*/
function Mole(){

  var self = this

  this.base = new THREE.Object3D()

  var td = 300
  var td2 = td/2

  var d = 1000
  var d2 = (d/2)

  var crazy = false

  this.base.position.x = Math.random()*d-d2
  this.base.position.y = Math.random()*d-d2
  // this.base.position.z = Math.random()*d-d2

  //Shield
  this.geom = new THREE.PlaneBufferGeometry(100,100)
  this.mat = new THREE.MeshPhongMaterial({color:'pink', side: THREE.DoubleSide})

  this.mat.shininess = 0

  this.mesh = new THREE.Mesh(this.geom,this.mat)
  this.mat.opacity = 0.5
  this.mat.transparent = true
  this.mesh.name = 'cover'
  //Shield//

  this.tweenTarget = new THREE.Vector2(Math.random()*td-td2,Math.random*td-td2)

  //Enemy
  if(this.crazy){
    this.mat2 = new THREE.MeshPhongMaterial({ color:'red', side: THREE.DoubleSide})
    this.mesh2 = new THREE.Mesh(this.geom,this.mat2)
    this.mesh2.name = 'crazy'
  }
  else{
    this.mat2 = new THREE.MeshPhongMaterial({ color:'blue', side: THREE.DoubleSide})
    this.mesh2 = new THREE.Mesh(this.geom,this.mat2)
    this.mesh2.name = 'enemy'
  }
  //Enemy//

  this.mesh2.position.z = -30

  this.mesh.castShadow = true
  this.mesh.receiveShadow = true

  this.mesh2.castShadow = true
  this.mesh2.receiveShadow = true


  this.base.add(this.mesh)
  this.base.add(this.mesh2)

  this.fadeTween = new TWEEN.Tween(this.mat2)
    .to({opacity:0.0},600)
    // .onUpdate(function(){ console.log(self.mat2.opacity) })

  this.fadePositionTween = new TWEEN.Tween(this.mesh2.position)
    .to({ x:0, y:0, z:-2000}, 1000)
    .onComplete(function(){
      self.done = true
    })

  this.failFadeTween = new TWEEN.Tween(this.mesh2.position)
    .to({ x:0, y:0, z:-2000}, 1000)
    .onComplete(function(){
      self.fail = true
    })

	this.tween = new TWEEN.Tween(this.mesh2.position)
			.to({ x: this.tweenTarget.x, y: this.tweenTarget.y }, 500)
			.easing(TWEEN.Easing.Elastic.InOut)
      .onComplete(function(){
        // change the target of the tween to a random position
        self.tween.to({ x: Math.random()*td-td2, y: Math.random()*td-td2 }, 500)
      })

  this.tweenPause = new TWEEN.Tween(this.mesh2.position)
    // .onStart(function(){console.log('pause start')})
    .delay(Math.random()*1000)
    // .onComplete(function(){console.log('pause complete')})

	this.tweenBack = new TWEEN.Tween(this.mesh2.position)
			.to({x:0, y: 0}, 1000)
			.easing(TWEEN.Easing.Elastic.InOut)

  this.tween.chain(this.tweenPause)
  this.tweenPause.chain(this.tweenBack)
	this.tweenBack.chain(this.tween);

  //Crazy tweens
  this.ctween = new TWEEN.Tween(this.mesh2.position)
      .to({ x: this.tweenTarget.x, y: this.tweenTarget.y }, 200)
      .easing(TWEEN.Easing.Elastic.InOut)
      .onComplete(function(){
        // change the target of the tween to a random position
        self.ctween.to({ x: Math.random()*td-td2, y: Math.random()*td-td2 }, 200)
      })

  this.ctweenPause = new TWEEN.Tween(this.mesh2.position)
    // .onStart(function(){console.log('pause start')})
    .delay(Math.random()*100)
    // .onComplete(function(){console.log('pause complete')})

  this.ctweenBack = new TWEEN.Tween(this.mesh2.position)
      .to({x:0, y: 0}, 200)
      .easing(TWEEN.Easing.Elastic.InOut)

  this.ctween.chain(this.ctweenPause)
  this.ctweenPause.chain(this.ctweenBack)
  this.ctweenBack.chain(this.ctween);

  setTimeout(function(){
    if(self.crazy){
      self.ctween.start();
    }
    else
      self.tween.start();
  },Math.random()*500+100)

  setTimeout(function(){
    //self.mesh2.picked = true
    self.mesh2.messed = true
  },10000)

  this.getObject3D = function(){
    return this.base
  }

  this.tick = function(time){

    this.mesh.lookAt(window.camera.position)
    this.mesh2.lookAt(window.camera.position)

    if(this.mesh2.picked === true){
      if(this.crazy){
        if(this.fadeTween.started !== true){

        this.ctween.stop()
        this.ctweenPause.stop()
        this.ctweenBack.stop()

        this.mat2.transparent = true
        this.fadeTween.start()
        this.fadePositionTween.start()
        this.fadeTween.started = true

        }
      }
      else{
      if(this.fadeTween.started !== true){

        this.tween.stop()
        this.tweenPause.stop()
        this.tweenBack.stop()

        this.mat2.transparent = true
        this.fadeTween.start()
        this.fadePositionTween.start()
        this.fadeTween.started = true

      }
      }
    }
    if(this.mesh2.messed === true){

      if(this.fadeTween.started !== true){

        this.tween.stop()
        this.tweenPause.stop()
        this.tweenBack.stop()

        this.mat2.transparent = true
        this.fadeTween.start()
        this.failFadeTween.start()
        this.fadeTween.started = true

      }

    }
  }

}


