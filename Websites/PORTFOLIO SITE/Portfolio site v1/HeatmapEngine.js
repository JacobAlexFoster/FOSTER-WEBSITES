function renderAllHeatmaps(subjects) {
    const container = document.getElementById("all-heatmaps");

    subjects.forEach(subjectId => {
        const block = document.createElement("div");
        block.className = "heatmap-block";

        block.innerHTML = `
            <div class="heatmap-title">${formatTitle(subjectId)}</div>
            <div class="heatmap-grid" id="heatmap_${subjectId}"></div>
        `;

        container.appendChild(block);
        renderHeatmap(subjectId);
    });
}

function formatTitle(id) {
    return id
        .replace("_quiz_1", "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

function renderHeatmap(quizId) {
    const container = document.getElementById(`heatmap_${quizId}`);
    container.innerHTML = "";

    const key = `quiz_stats_${quizId}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];

    const counts = {};
    history.forEach(ts => {
        const day = new Date(ts).toISOString().split("T")[0];
        counts[day] = (counts[day] || 0) + 1;
    });

    const today = new Date();
    const days = [];

    for (let i = 364; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        days.push(d);
    }

    days.forEach(date => {
        const iso = date.toISOString().split("T")[0];
        const count = counts[iso] || 0;

        let level = "";
        if (count >= 4) level = "level-4";
        else if (count === 3) level = "level-3";
        else if (count === 2) level = "level-2";
        else if (count === 1) level = "level-1";

        const div = document.createElement("div");
        div.className = `day ${level}`;
        div.title = `${iso} — ${count} completions`;

        container.appendChild(div);
    });
}
