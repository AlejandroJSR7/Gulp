(function(){
    function nombrar(nombre) {
        return nombre;
    }
    function saludar(nombre) {
        console.info(nombre, ', un saludo desde DOPodcast');
    }
    saludar(nombrar('Alejandro'));
    console.log("Good bye");
})();