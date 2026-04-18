document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.generate').addEventListener('click', pushButton);
});

async function data() {
    const json = await fetch("https://mattyakyou.github.io/DankaguPhantasiaLost_data/6Key.json");
    return await json.json();
};

var a = data();


function pushButton() {
    const table = document.querySelector(".table2-tbody");
    table.innerHTML = "";

    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let which_checked = [];

    checked.forEach(box => {
        which_checked.push(box.id);
    });

    const L_diff = document.querySelector(".L_diff").value;

    a.then((jsonData) => {
        let useful_pack_song = jsonData.filter(song =>
            song.meta.chapter.includes("無料") ||
            song.meta.chapter.includes("通常") ||
            which_checked.includes(song.meta.chapter)
        );
        useful_pack_song = useful_pack_song.filter(song =>
            song.data["L"] >= L_diff
        );

        let get_random_song = useful_pack_song[Math.floor(Math.random() * useful_pack_song.length)];

        const bpmMin = get_random_song.meta["bpm_min"];
        const bpmMax = get_random_song.meta["bpm_max"];

        const bpmText = bpmMin === bpmMax
            ? bpmMin
            : `${bpmMin}～${bpmMax}`;

        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${get_random_song.meta.chapter}</td>
                <td>${get_random_song.meta.title}</td>
                <td>${get_random_song.data.E}</td>
                <td>${get_random_song.data.N}</td>
                <td>${get_random_song.data.H}</td>
                <td>${get_random_song.data.L}</td>
                <td>${bpmText}</td>
            </tr>`
        );
    });
}
