AOS.init({
duration:1000,
once:true
});

gsap.from(".navbar",{
y:-80,
opacity:0,
duration:1
});

gsap.from(".hero h1",{
y:50,
opacity:0,
duration:1,
delay:0.5
});

gsap.from(".hero p",{
y:50,
opacity:0,
duration:1,
delay:0.8
});