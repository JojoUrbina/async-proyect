const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCitDUxNdUdyt-HqVx992PEQ&part=snippet%2Cid&order=date&maxResults=8";

const content = null||document.getElementById("content");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b40b7b6ab4msh9ccf1c3a7b373d5p1671fdjsn4ed3e014ae2f",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
// al inicio de la solicitud nos envio un codigo con fetch, eneste caso para utilizar la metodologia async y await
//se borro y se creo una nueva funcion llamada fetch data, una forma que ya hemos hecho en el curso

async function fetchData(urlApi) {
  //misma funcion ya hecha anterior mente
  const response = await fetch(urlApi, options); //se toma el parametro de la api y el objeto "options" con las configuraciones previas
  const data = await response.json(); // se espera a response , luego se transforma a json y returna el objeto ya en formato json
  return data; //retorna los datos ya en formato json
}
//enlace sobre las funciones autoejecutadas https://keepcoding.io/blog/funciones-autoejecutables-en-javascript/

(async () => {
  //este tipo de funcion se utiliza principalmente para funciones asincronas
  try {
    const videos = await fetchData(API);
    //console.log(videos.items); // con items me muestra todos los objetos del api ya que es un objeto que dentro de item tiene arrays de objetos
    //GENERAR TEMPLATE string(buscar conceptos, no quedo muy claro)
    //se utiliza map para recorrer por cada objeto del api y mostrar los datos especificos 
    let view = `
    ${videos.items.map((video) => `
    <div class="group relative">
        <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
            </h3>
        </div>
    </div>
    `).slice(0,4).join(" ")}
    `;//el metodo array slice es para recorrer desde el 0 hasta la posicion 4 , sin traer el 4
    //el metodo join, es para agregar espacio o algo entre cada array, jormanurbina=jorman urbina
    //importante , arriba de content en ese div se le agrego un id content para modificarlo
   content.innerHTML=view;//se le indica que le vaya metiendo los templates creados a content(dom)
  } catch (error) {
    console.log(error)// para practicar , hacer muestra del error para el usuario
  }
})();
//tener en cuenta que se corrigieron 3 errores
/* se agrego defer al scrip en meta del html para que lo lea al ultimo teniendo en cuenta que al leer main no a leido el resto
del html,
se corrigio el nombre thumbnails, fue error de tipeo, se mostro en consola como type error
*/
