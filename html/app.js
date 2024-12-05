document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const output = document.getElementById('output');
    output.innerHTML = "Cargando...";

    try {
        const zip = new JSZip();
        const content = await zip.loadAsync(file);

        output.innerHTML = "<h2>Contenido del ZIP:</h2>";
        for (const filename in content.files) {
            const fileContent = await content.files[filename].async('string');
            const fileElement = document.createElement('div');
            fileElement.textContent = `Archivo: ${filename}, Contenido: ${fileContent}`;
            output.appendChild(fileElement);
        }
    } catch (error) {
        output.innerHTML = "Error al descomprimir el archivo.";
        console.error(error);
    }
});
