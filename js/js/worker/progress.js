function progress() {
    postMessage({});
    setTimeout(progress, 950);
}

progress();