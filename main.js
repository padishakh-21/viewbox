gsap.config({trialWarn: false});
let select = s => document.querySelector(s),
		selectAll = s =>  document.querySelectorAll(s),
		toArray = s => gsap.utils.toArray(s),
		mainSVG = select('#mainSVG'),
		logo = gsap.utils.selector('.logoMask'),
		//TYPE YOUR USERNAME HERE!
		handleText = '@long_insta_name_here',
		textWidth = null,
 		particleContainer = select('.particleContainer'),
    particleArray = toArray('.particleContainer circle')


let tl = gsap.timeline({
	defaults: {
		ease: 'expo.inOut'
	}
});
const calcTextSize = () => {
	select('#handle').innerHTML = handleText;
	textWidth = select('#handle').getBBox().width;
	console.log(textWidth)
	select('#handle').innerHTML = ""
}
const blendEases = (startEase, endEase, blender) => {
    var parse = function(ease) {
            return typeof(ease) === "function" ? ease : gsap.parseEase("power4.inOut");
        },
        s = gsap.parseEase(startEase),
        e = gsap.parseEase(endEase),
        blender = parse(blender);
    return function(v) {
      var b = blender(v);
      return s(v) * (1 - b) + e(v) * b;
    };
}

	const build = () => {

	gsap.set('svg', {
		visibility: 'visible'
	})
	calcTextSize()

	const playParticles = () => {
		let spreadX = gsap.utils.random(400 - (textWidth/2), 400 + (textWidth/2));
		console.log('spreadX', spreadX)
		 gsap.set(particleArray, {
			 x: `random(${400 - (textWidth/2)}, ${400 + (textWidth/2)})`,
			 y: 260,
			 attr:{
				r:'random(0.4, 4)'      
			 },
			 opacity:1,
			 repeatRefresh: true,
			 scale:1,//'random(0.5, 1.3)',
			 transformOrigin: '50% 50%'
		 }) 

		gsap.to(particleArray, {
			duration: 'random(0.5, 4)',
		 physics2D: function () {
		 return {velocity: 'random(10, 100)',
						angle: 'random(-110, -50)',
						gravity: 'random(0, -10)'
		 }    
		 },
		//ease: 'sine.in',
		scale: 0
	 })

	}
	tl
	.add('appear')
	.from('#outer', {
		duration: 1.2,
		attr: {
			width: 0,
			height: 0,
			x: '+=44',
			y: '+=44'
		},
		ease: 'elastic(0.23, 0.14)'
	}, 'appear')
	.from('#inner', {
		duration: 1.2,
		attr: {
			width: 0,
			height: 0,
			x: '+=20.5',
			y: '+=20.5'
		},
		ease: 'elastic(0.23, 0.14)'
	}, 'appear+=0.08')
	.from('#dot', {
		duration: 1.2,
		attr: {
			r: 0
		},
		rotation: -90,
		svgOrigin: '400 300',
		ease: 'elastic(0.723, 0.84)'
	}, 'appear+=0.05')
		.add('reveal', '+=0.25')
	.to('#outlineCover', {
		opacity:0 
	}, 'reveal')
	.to(logo('#inner'), {
		attr: {
		width: `+=${textWidth}`, //'+=700',
			x: `-=${textWidth/2}`,
			},
		ease: blendEases('back.in', 'expo')
	}, 'reveal')
	.to(logo('#inner'), {
		opacity:0,
		ease: 'expo'
	}, 'reveal')
	.to(logo('#outer'), {
		attr: {
			width: `+=${textWidth}`, 
			x: `-=${textWidth/2}`,
			rx: '+=24'
		},
		strokeWidth: 6,
		ease: blendEases('back.in', 'expo')
	}, 'reveal')
	.to(logo('#dot'), {
		attr: {
			cx: `+=${textWidth/2}`,
			},
		opacity:0,
		ease: blendEases('back.in', 'expo')
	}, 'reveal')
	.to('#handle', {
		text: handleText, 
		transformOrigin: '50% 50%',
	}, 'reveal')
	.to('#handle', {
		duration: 0.25,
		opacity:1,
		ease:'expo.in'
	}, 'reveal')
	.to('#colorGrad', {
		attr: {
			cx: '-=120',
			fx: '-=120',
			r: '+=50'
		},
		ease: 'power2.inOut'
	}, 'reveal')
	.to('#blueGrad', {
		attr: {
			cx: '+=20',
			fx: '+=20',
			r: '+=10'
		},
		ease: 'power2.inOut'
	}, 'reveal')
	.add(playParticles, '-=0.2' )

}
	build();
//ScrubGSAPTimeline(tl)
mainSVG.onclick = () => tl.play(0);