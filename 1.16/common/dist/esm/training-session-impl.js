// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export class TrainingSession {
    constructor(handler) {
        this.handler = handler;
    }
    get inputNames() {
        return this.handler.inputNames;
    }
    get outputNames() {
        return this.handler.outputNames;
    }
    static async create(_trainingOptions, _sessionOptions) {
        throw new Error('Method not implemented');
    }
    async loadParametersBuffer(_array, _trainableOnly) {
        throw new Error('Method not implemented.');
    }
    async getContiguousParameters(_trainableOnly) {
        throw new Error('Method not implemented.');
    }
    async runTrainStep(_feeds, _fetches, _options) {
        throw new Error('Method not implemented.');
    }
    async release() {
        return this.handler.dispose();
    }
}
//# sourceMappingURL=training-session-impl.js.map