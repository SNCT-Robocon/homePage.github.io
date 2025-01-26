window.addEventListener('load',function(){
    document.getElementById('mainScreen').style.display = 'none';
})

document.getElementById('uzuka').addEventListener('animationend', () => {
    document.getElementById('firstScreen').style.animation = 'hideFirstScreen forwards 2s';
    setTimeout(function(){
        document.getElementById('mainScreen').style.display = 'initial';
        document.getElementById('mainScreen').style.animation = 'showMain forwards 2s';
    },2000);
})