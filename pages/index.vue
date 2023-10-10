<template>

    <section class="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 mx-4 w-full max-w-screen-xl">
        <Card title="Bienvenido a la práctica uno de ADIU 👋" class="col-span-2">
            <p>
                En esta práctica, nos adentraremos en el mundo de la visualización de datos con el uso de la
                librería Highcharts. El objetivo principal es aprender cómo representar información de manera
                efectiva y atractiva.
            </p>
            <p>
                Para esta exploración, hemos seleccionado la API de Ergast, una fuente de datos completa
                relacionada con la Fórmula 1. Esta API nos proporciona una amplia variedad de información, desde
                resultados de carreras hasta detalles sobre pilotos y equipos, clasificaciones, calendarios de
                eventos y más.
                Es importante mencionar que en este proyecto hacemos uso de Tailwind CSS, una herramienta que
                simplifica el desarrollo de interfaces de usuario y ayuda a crear visualizaciones atractivas y
                funcionales.
                Además, hemos implementado un sistema de Integración Continua y Despliegue Continuo (CI/CD) para
                automatizar pruebas y la implementación de código, lo que agiliza el proceso de desarrollo y
                garantiza una entrega confiable.
            </p>
            <p>
                Te invitamos a unirte a nosotros en esta exploración donde utilizamos Highcharts, Tailwind CSS y
                prácticas de CI/CD para analizar datos relacionados con la Fórmula 1 y crear visualizaciones
                efectivas.<span class="font-bold"> ¡Empecemos!</span>
            </p>
        </Card>

        <Card class="col-span-2">
            <label for="seasons" class="block mb-2 text-sm font-medium text-gray-900">Seleccionar temporada</label>
            <select id="seasons" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                <option selected value="current">Actual</option>
            </select>
        </Card>

        <Card title="Nacionalidad de todos los pilotos 🌍">
            <div id="container-pie-drivers"></div>
        </Card>

        <Card title="Carreras ganadas por pilotos 🏆">
            <div id="container-bars-wins"></div>
        </Card>

        <Card class="col-span-2" title="Evolución de los pilotos 📈">
            <div id="container-chart-evolution"></div>
        </Card>
    </section>    
</template>