const table = document.querySelector("tbody");

async function data() {
    const json = await fetch("https://mattyakyou.github.io/ArcaeaData/data.json");
    return await json.json();
};

var a = data();

a.then((jsonData) => {
    jsonData.forEach(row => {

        const bpmMin = row.meta["bpm_min"];
        const bpmMax = row.meta["bpm_max"];

        const bpmText = bpmMin === bpmMax
            ? bpmMin
            : `${bpmMin}～${bpmMax}`;

        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${row.meta.title}</td>
                <td>${row.data.Past.const}</td>
                <td>${row.data.Present.const}</td>
                <td>${row.data.Future.const}</td>
                <td>${row.data.Eternal.const}</td>
                <td>${row.data.Beyond.const}</td>
                <td>${bpmText}</td>
            </tr>`
        );
    });
});

