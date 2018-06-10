export function shuffle(array: any[]): any[] {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Determine if this browser supports emoji.
 * https://gist.github.com/mathisonian/7885295
 */
export function emojiEnabled() {
    let context;
    let smile;
    if (!document.createElement('canvas').getContext) {
        return;  
    } 
    context = document.createElement('canvas').getContext('2d');
    if (typeof context!.fillText !== 'function') {
        return;
    }
    smile = String.fromCharCode(55357) + String.fromCharCode(56835);
    context!.textBaseline = "top";
    context!.font = "32px Arial";
    context!.fillText(smile, 0, 0);
    return context!.getImageData(16, 16, 1, 1).data[0] !== 0;
}