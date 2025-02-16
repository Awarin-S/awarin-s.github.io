const url = new URL(window.location.href);
const char_name = url.searchParams.get("name");

console.log(char_name);

//document.getElementById("bg").innerHTML = `<source src="../res/elements/bg/${(charData.ru.element).toLowerCase()}.webm" type="video/webm">`;

async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        const charData = data[char_name]
        console.log(charData);

        document.getElementById("bg").innerHTML = `<source src="../res/elements/bg/${(charData.ru.element).toLowerCase()}.webm" type="video/webm">`;

    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

loadJSON(`../characters/${char_name}/${char_name}.json`); // Заменить на нужный URL