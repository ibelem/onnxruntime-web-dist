import { InferenceSession as InferenceSession } from './inference-session.js';
import { TrainingSession as TrainingSessionInterface, TrainingSessionCreateOptions } from './training-session.js';
type SessionOptions = InferenceSession.SessionOptions;
export declare class TrainingSession implements TrainingSessionInterface {
    private constructor();
    private handler;
    get inputNames(): readonly string[];
    get outputNames(): readonly string[];
    static create(_trainingOptions: TrainingSessionCreateOptions, _sessionOptions?: SessionOptions): Promise<TrainingSession>;
    loadParametersBuffer(_array: Uint8Array, _trainableOnly: boolean): Promise<void>;
    getContiguousParameters(_trainableOnly: boolean): Promise<Uint8Array>;
    runTrainStep(feeds: InferenceSession.OnnxValueMapType, options?: InferenceSession.RunOptions | undefined): Promise<InferenceSession.OnnxValueMapType>;
    runTrainStep(feeds: InferenceSession.OnnxValueMapType, fetches: InferenceSession.FetchesType, options?: InferenceSession.RunOptions | undefined): Promise<InferenceSession.OnnxValueMapType>;
    release(): Promise<void>;
}
export {};
//# sourceMappingURL=training-session-impl.d.ts.map