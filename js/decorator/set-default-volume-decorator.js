class SetDefaultVolumeDecorator extends Decorator {

    // can be decorated any time
    async decorate(prismPlayer) {
        const isFirstLoad = !prismPlayer.loaded;

        // get defaultVolume (volume that user can see in popup.html)
        const settings = await chrome.storage.sync.get(['defaultVolume']);
        const defaultVolume = parseFloat(settings['defaultVolume']);

        // 1.0 : userVolume = maxVolume : adjustedVolume
        const maxVolume = await prismPlayer.getMaxVolume(); // wait until loaded
        if (isFirstLoad) {
            await sleep(100); // fix volume slider bug
        }
        let adjustedVolume = maxVolume * defaultVolume;
        if (!isNaN(adjustedVolume)) {
            const video = prismPlayer.query('video');
            video.volume = adjustedVolume;
        }
    }

    async clear() {
        return true;
    }
}
