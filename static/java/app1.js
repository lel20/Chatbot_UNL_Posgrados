$(function () {
    initMenu();
    initBanner();
    initFotoChange();
});

function getCategoriasMenu(callback){
    var lista = sessionStorage.getItem('categorias_menu');
    lista = lista ? JSON.parse(lista) : [];

    if (lista.length == 0){
        $.get(url_env + '/categoria/lista-menu', function(res){
            console.log(JSON.stringify(res));
            if (res.statusstr = "ok"){
                lista = res.response;
                sessionStorage.setItem('categorias_menu', JSON.stringify(lista));
                return callback(lista);
            }
        });
    }

    return callback(lista);
};

// Limpia cache para recargar en el menú
function reloadMenu(){
    sessionStorage.removeItem('categorias_menu');
};

function initMenu(){
    getCategoriasMenu(function(lista){
        var id_cat_act = typeof(id_categoria_activa) != 'undefined' ? (id_categoria_activa)*1 : 0;
        $.each(lista, function(i, cat){
            var css = (cat.id == id_cat_act ? 'active' : '');
            var li_nav = '<li class="'+css+'"><a href="'+url_env+'/categoria/detalle/'+cat.id+'">'+cat.nombre+'</a></li>';
            var li_sid = '<li><a href="'+url_env+'/categoria/detalle/'+cat.id+'"><i class="fas fa-check"></i> '+cat.nombre+'</a></li>';
            $('#nav-mobile, #mobile-demo').append(li_nav);
            $('#slide-out').append(li_sid);
        });
    })
};

function initBanner(){
    $('#bannerNav').load(url_env + '/banner/lista/content', function(res){
        console.log('cargadp...');
        $(this).slider();
    });
};

function initFotoChange(){
    $('#lnk-cambiar-foto').click(function(){
        $('#modal-loader').load(url_env + '/user/editar/modal-foto', function(){});
    });
}