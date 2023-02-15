export default class CanvasRecorder extends EventTarget {

    static VIDEO_READY = 'video.ready';
    static DEFAULT_VIDEO_OPTIONS = {type: 'video/mp4'}

    #chunks;
    #recorder;

    constructor( ) {
        super( );
        
    }

    #produceVideo(chunks, options) {
        if(!options) options = CanvasRecorder.DEFAULT_VIDEO_OPTIONS;
        const blob = new Blob(chunks, options);
        const url = URL.createObjectURL(blob);
        this.dispatchEvent(new CustsomEvent(CanvasRecorder.VIDEO_READY, {detail: url}));
    }

    record(canvas, frame_rate = 60, video_options) {
        this.#chunks = [];
        if(this.#recorder instanceof MediaRecorder) this.stop( );
        this.#recorder = new MediaRecorder(canvas.captureStream(frame_rate));
        mr.ondataavailable = function(e) {chunks.push(e.data)};
        mr.onstop = event => this.#produceVideo(this.#chunks, options);
        mr.start( );
    }

    stop( ) {
        mr.stop( );
    }

}