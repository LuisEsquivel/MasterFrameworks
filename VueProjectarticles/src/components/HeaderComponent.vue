

<template>
        <header id="header">
            <div class="center">
                <!-- LOGO -->
                <div id="logo">
                <!--    <img src="../src/assets/images/vue.png" class="app-logo" alt="Logotipo" /> -->
                    <span id="brand">
                        <strong>Curso</strong>Vue
                    </span>
                </div>
                
                <!-- MENU -->
                <nav id="menu">
                    <ul>
                        <li>
                            <router-link to="/home" active-class="active">Inicio</router-link>
                        </li>
                        <li>
                            <router-link to="/blog" active-class="active">Blog</router-link>
                        </li>
                        <li>
                            <router-link to="/formulario" active-class="active">Formulario</router-link>
                        </li>
                        <li>
                            <router-link to="/pelicuals" active-class="active">Péliculas</router-link>
                        </li>
                        <li>
                            <router-link to="/pagina" active-class="active">Pagina</router-link>
                        </li>                            
                    </ul>
                </nav>

                <!--LIMPIAR FLOTADOS-->
                <div class="clearfix"></div>
            </div>
        </header>
</template>


<script>
export default {
    name : 'Header'
}
</script>