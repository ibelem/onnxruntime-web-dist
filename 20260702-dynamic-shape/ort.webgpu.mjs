/*!
 * ONNX Runtime Web v1.28.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common/dist/esm/backend-impl.js
var backends, backendsSortedByPriority, registerBackend, tryResolveAndInitializeBackend, resolveBackendAndExecutionProviders;
var init_backend_impl = __esm({
  "common/dist/esm/backend-impl.js"() {
    "use strict";
    backends = /* @__PURE__ */ new Map();
    backendsSortedByPriority = [];
    registerBackend = (name, backend, priority) => {
      if (backend && typeof backend.init === "function" && typeof backend.createInferenceSessionHandler === "function") {
        const currentBackend = backends.get(name);
        if (currentBackend === void 0) {
          backends.set(name, { backend, priority });
        } else if (currentBackend.priority > priority) {
          return;
        } else if (currentBackend.priority === priority) {
          if (currentBackend.backend !== backend) {
            throw new Error(`cannot register backend "${name}" using priority ${priority}`);
          }
        }
        if (priority >= 0) {
          const i = backendsSortedByPriority.indexOf(name);
          if (i !== -1) {
            backendsSortedByPriority.splice(i, 1);
          }
          for (let i2 = 0; i2 < backendsSortedByPriority.length; i2++) {
            if (backends.get(backendsSortedByPriority[i2]).priority <= priority) {
              backendsSortedByPriority.splice(i2, 0, name);
              return;
            }
          }
          backendsSortedByPriority.push(name);
        }
        return;
      }
      throw new TypeError("not a valid backend");
    };
    tryResolveAndInitializeBackend = async (backendName) => {
      const backendInfo = backends.get(backendName);
      if (!backendInfo) {
        return "backend not found.";
      }
      if (backendInfo.initialized) {
        return backendInfo.backend;
      } else if (backendInfo.aborted) {
        return backendInfo.error;
      } else {
        const isInitializing = !!backendInfo.initPromise;
        try {
          if (!isInitializing) {
            backendInfo.initPromise = backendInfo.backend.init(backendName);
          }
          await backendInfo.initPromise;
          backendInfo.initialized = true;
          return backendInfo.backend;
        } catch (e) {
          if (!isInitializing) {
            backendInfo.error = `${e}`;
            backendInfo.aborted = true;
          }
          return backendInfo.error;
        } finally {
          delete backendInfo.initPromise;
        }
      }
    };
    resolveBackendAndExecutionProviders = async (options) => {
      const eps = options.executionProviders || [];
      const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
      const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
      let backend;
      const errors = [];
      const availableBackendNames = /* @__PURE__ */ new Set();
      for (const backendName of backendNames) {
        const resolveResult = await tryResolveAndInitializeBackend(backendName);
        if (typeof resolveResult === "string") {
          errors.push({ name: backendName, err: resolveResult });
        } else {
          if (!backend) {
            backend = resolveResult;
          }
          if (backend === resolveResult) {
            availableBackendNames.add(backendName);
          }
        }
      }
      if (!backend) {
        throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
      }
      for (const { name, err } of errors) {
        if (backendHints.includes(name)) {
          console.warn(`removing requested execution provider "${name}" from session options because it is not available: ${err}`);
        }
      }
      const filteredEps = eps.filter((i) => availableBackendNames.has(typeof i === "string" ? i : i.name));
      return [
        backend,
        new Proxy(options, {
          get: (target, prop) => {
            if (prop === "executionProviders") {
              return filteredEps;
            }
            return Reflect.get(target, prop);
          }
        })
      ];
    };
  }
});

// common/dist/esm/backend.js
var init_backend = __esm({
  "common/dist/esm/backend.js"() {
    "use strict";
    init_backend_impl();
  }
});

// common/dist/esm/version.js
var version;
var init_version = __esm({
  "common/dist/esm/version.js"() {
    "use strict";
    version = "1.28.0";
  }
});

// common/dist/esm/env-impl.js
var logLevelValue, env;
var init_env_impl = __esm({
  "common/dist/esm/env-impl.js"() {
    "use strict";
    init_version();
    logLevelValue = "warning";
    env = {
      wasm: {},
      webgl: {},
      webgpu: {},
      versions: { common: version },
      set logLevel(value) {
        if (value === void 0) {
          return;
        }
        if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
          throw new Error(`Unsupported logging level: ${value}`);
        }
        logLevelValue = value;
      },
      get logLevel() {
        return logLevelValue;
      }
    };
    Object.defineProperty(env, "logLevel", { enumerable: true });
  }
});

// common/dist/esm/env.js
var env2;
var init_env = __esm({
  "common/dist/esm/env.js"() {
    "use strict";
    init_env_impl();
    env2 = env;
  }
});

// common/dist/esm/tensor-conversion-impl.js
var tensorToDataURL, tensorToImageData;
var init_tensor_conversion_impl = __esm({
  "common/dist/esm/tensor-conversion-impl.js"() {
    "use strict";
    tensorToDataURL = (tensor, options) => {
      const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
      canvas.width = tensor.dims[3];
      canvas.height = tensor.dims[2];
      const pixels2DContext = canvas.getContext("2d");
      if (pixels2DContext != null) {
        let width;
        let height;
        if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
          width = tensor.dims[2];
          height = tensor.dims[3];
        } else {
          width = tensor.dims[3];
          height = tensor.dims[2];
        }
        const inputformat = options?.format !== void 0 ? options.format : "RGB";
        const norm = options?.norm;
        let normMean;
        let normBias;
        if (norm === void 0 || norm.mean === void 0) {
          normMean = [255, 255, 255, 255];
        } else {
          if (typeof norm.mean === "number") {
            normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
          } else {
            normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
            if (norm.mean[3] !== void 0) {
              normMean[3] = norm.mean[3];
            }
          }
        }
        if (norm === void 0 || norm.bias === void 0) {
          normBias = [0, 0, 0, 0];
        } else {
          if (typeof norm.bias === "number") {
            normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
          } else {
            normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
            if (norm.bias[3] !== void 0) {
              normBias[3] = norm.bias[3];
            }
          }
        }
        const stride = height * width;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGBA") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
          aTensorPointer = stride * 3;
        } else if (inputformat === "RGB") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
        } else if (inputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        }
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            const R = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
            const G = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
            const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
            const A = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
            pixels2DContext.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";
            pixels2DContext.fillRect(j, i, 1, 1);
          }
        }
        if ("toDataURL" in canvas) {
          return canvas.toDataURL();
        } else {
          throw new Error("toDataURL is not supported");
        }
      } else {
        throw new Error("Can not access image data");
      }
    };
    tensorToImageData = (tensor, options) => {
      const pixels2DContext = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
      let image;
      if (pixels2DContext != null) {
        let width;
        let height;
        let channels;
        if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
          width = tensor.dims[2];
          height = tensor.dims[1];
          channels = tensor.dims[3];
        } else {
          width = tensor.dims[3];
          height = tensor.dims[2];
          channels = tensor.dims[1];
        }
        const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
        const norm = options?.norm;
        let normMean;
        let normBias;
        if (norm === void 0 || norm.mean === void 0) {
          normMean = [255, 255, 255, 255];
        } else {
          if (typeof norm.mean === "number") {
            normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
          } else {
            normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
            if (norm.mean[3] !== void 0) {
              normMean[3] = norm.mean[3];
            }
          }
        }
        if (norm === void 0 || norm.bias === void 0) {
          normBias = [0, 0, 0, 0];
        } else {
          if (typeof norm.bias === "number") {
            normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
          } else {
            normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
            if (norm.bias[3] !== void 0) {
              normBias[3] = norm.bias[3];
            }
          }
        }
        const stride = height * width;
        if (options !== void 0) {
          if (options.format !== void 0 && channels === 4 && options.format !== "RGBA" || channels === 3 && options.format !== "RGB" && options.format !== "BGR") {
            throw new Error("Tensor format doesn't match input tensor dims");
          }
        }
        const step = 4;
        let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGBA") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
          aTensorPointer = stride * 3;
        } else if (inputformat === "RGB") {
          rTensorPointer = 0;
          gTensorPointer = stride;
          bTensorPointer = stride * 2;
        } else if (inputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        }
        image = pixels2DContext.createImageData(width, height);
        for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
          image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
          image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
          image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
          image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
        }
      } else {
        throw new Error("Can not access image data");
      }
      return image;
    };
  }
});

// common/dist/esm/tensor-factory-impl.js
var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromMLTensor, tensorFromPinnedBuffer;
var init_tensor_factory_impl = __esm({
  "common/dist/esm/tensor-factory-impl.js"() {
    "use strict";
    init_tensor_impl();
    bufferToTensor = (buffer, options) => {
      if (buffer === void 0) {
        throw new Error("Image buffer must be defined");
      }
      if (options.height === void 0 || options.width === void 0) {
        throw new Error("Image height and width must be defined");
      }
      if (options.tensorLayout === "NHWC") {
        throw new Error("NHWC Tensor layout is not supported yet");
      }
      const { height, width } = options;
      const norm = options.norm ?? { mean: 255, bias: 0 };
      let normMean;
      let normBias;
      if (typeof norm.mean === "number") {
        normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
      } else {
        normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
      }
      if (typeof norm.bias === "number") {
        normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
      } else {
        normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
      }
      const inputformat = options.format !== void 0 ? options.format : "RGBA";
      const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
      const stride = height * width;
      const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
      let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
      let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
      if (inputformat === "RGB") {
        step = 3;
        rImagePointer = 0;
        gImagePointer = 1;
        bImagePointer = 2;
        aImagePointer = -1;
      }
      if (outputformat === "RGBA") {
        aTensorPointer = stride * 3;
      } else if (outputformat === "RBG") {
        rTensorPointer = 0;
        bTensorPointer = stride;
        gTensorPointer = stride * 2;
      } else if (outputformat === "BGR") {
        bTensorPointer = 0;
        gTensorPointer = stride;
        rTensorPointer = stride * 2;
      }
      for (let i = 0; i < stride; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
        float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
        float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
        float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
        if (aTensorPointer !== -1 && aImagePointer !== -1) {
          float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
        }
      }
      const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
      return outputTensor;
    };
    tensorFromImage = async (image, options) => {
      const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
      const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
      const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
      const isString = typeof image === "string";
      let data;
      let bufferToTensorOptions = options ?? {};
      const createCanvas = () => {
        if (typeof document !== "undefined") {
          return document.createElement("canvas");
        } else if (typeof OffscreenCanvas !== "undefined") {
          return new OffscreenCanvas(1, 1);
        } else {
          throw new Error("Canvas is not supported");
        }
      };
      const createCanvasContext = (canvas) => {
        if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
          return canvas.getContext("2d");
        } else if (canvas instanceof OffscreenCanvas) {
          return canvas.getContext("2d");
        } else {
          return null;
        }
      };
      if (isHTMLImageEle) {
        const canvas = createCanvas();
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = createCanvasContext(canvas);
        if (pixels2DContext != null) {
          let height = image.height;
          let width = image.width;
          if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
            height = options.resizedHeight;
            width = options.resizedWidth;
          }
          if (options !== void 0) {
            bufferToTensorOptions = options;
            if (options.tensorFormat !== void 0) {
              throw new Error("Image input config format must be RGBA for HTMLImageElement");
            } else {
              bufferToTensorOptions.tensorFormat = "RGBA";
            }
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
          } else {
            bufferToTensorOptions.tensorFormat = "RGBA";
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
          }
          pixels2DContext.drawImage(image, 0, 0);
          data = pixels2DContext.getImageData(0, 0, width, height).data;
        } else {
          throw new Error("Can not access image data");
        }
      } else if (isImageDataEle) {
        let height;
        let width;
        if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
          height = options.resizedHeight;
          width = options.resizedWidth;
        } else {
          height = image.height;
          width = image.width;
        }
        if (options !== void 0) {
          bufferToTensorOptions = options;
        }
        bufferToTensorOptions.format = "RGBA";
        bufferToTensorOptions.height = height;
        bufferToTensorOptions.width = width;
        if (options !== void 0) {
          const tempCanvas = createCanvas();
          tempCanvas.width = width;
          tempCanvas.height = height;
          const pixels2DContext = createCanvasContext(tempCanvas);
          if (pixels2DContext != null) {
            pixels2DContext.putImageData(image, 0, 0);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
          } else {
            throw new Error("Can not access image data");
          }
        } else {
          data = image.data;
        }
      } else if (isImageBitmap) {
        if (options === void 0) {
          throw new Error("Please provide image config with format for Imagebitmap");
        }
        const canvas = createCanvas();
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = createCanvasContext(canvas);
        if (pixels2DContext != null) {
          const height = image.height;
          const width = image.width;
          pixels2DContext.drawImage(image, 0, 0, width, height);
          data = pixels2DContext.getImageData(0, 0, width, height).data;
          bufferToTensorOptions.height = height;
          bufferToTensorOptions.width = width;
          return bufferToTensor(data, bufferToTensorOptions);
        } else {
          throw new Error("Can not access image data");
        }
      } else if (isString) {
        return new Promise((resolve, reject) => {
          const canvas = createCanvas();
          const context = createCanvasContext(canvas);
          if (!image || !context) {
            return reject();
          }
          const newImage = new Image();
          newImage.crossOrigin = "Anonymous";
          newImage.src = image;
          newImage.onload = () => {
            canvas.width = newImage.width;
            canvas.height = newImage.height;
            context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            const img = context.getImageData(0, 0, canvas.width, canvas.height);
            bufferToTensorOptions.height = canvas.height;
            bufferToTensorOptions.width = canvas.width;
            resolve(bufferToTensor(img.data, bufferToTensorOptions));
          };
        });
      } else {
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
      if (data !== void 0) {
        return bufferToTensor(data, bufferToTensorOptions);
      } else {
        throw new Error("Input data provided is not supported - aborted tensor creation");
      }
    };
    tensorFromTexture = (texture, options) => {
      const { width, height, download, dispose } = options;
      const dims = [1, height, width, 4];
      return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
    };
    tensorFromGpuBuffer = (gpuBuffer, options) => {
      const { dataType, dims, download, dispose } = options;
      return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
    };
    tensorFromMLTensor = (mlTensor, options) => {
      const { dataType, dims, download, dispose } = options;
      return new Tensor({ location: "ml-tensor", type: dataType ?? "float32", mlTensor, dims, download, dispose });
    };
    tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
  }
});

// common/dist/esm/tensor-impl-type-mapping.js
var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isTypedArrayChecked, checkTypedArray;
var init_tensor_impl_type_mapping = __esm({
  "common/dist/esm/tensor-impl-type-mapping.js"() {
    "use strict";
    NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
      ["float32", Float32Array],
      ["uint8", Uint8Array],
      ["int8", Int8Array],
      ["uint16", Uint16Array],
      ["int16", Int16Array],
      ["int32", Int32Array],
      ["bool", Uint8Array],
      ["float64", Float64Array],
      ["uint32", Uint32Array],
      ["int4", Uint8Array],
      ["uint4", Uint8Array]
    ]);
    NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
      [Float32Array, "float32"],
      [Uint8Array, "uint8"],
      [Int8Array, "int8"],
      [Uint16Array, "uint16"],
      [Int16Array, "int16"],
      [Int32Array, "int32"],
      [Float64Array, "float64"],
      [Uint32Array, "uint32"]
    ]);
    isTypedArrayChecked = false;
    checkTypedArray = () => {
      if (!isTypedArrayChecked) {
        isTypedArrayChecked = true;
        const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && BigInt64Array.from;
        const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && BigUint64Array.from;
        const Float16Array2 = globalThis.Float16Array;
        const isFloat16ArrayAvailable = typeof Float16Array2 !== "undefined" && Float16Array2.from;
        if (isBigInt64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
        }
        if (isBigUint64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
        }
        if (isFloat16ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array2);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array2, "float16");
        } else {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Uint16Array);
        }
      }
    };
  }
});

// common/dist/esm/tensor-utils-impl.js
var calculateSize, tensorReshape;
var init_tensor_utils_impl = __esm({
  "common/dist/esm/tensor-utils-impl.js"() {
    "use strict";
    init_tensor_impl();
    calculateSize = (dims) => {
      let size = 1;
      for (let i = 0; i < dims.length; i++) {
        const dim = dims[i];
        if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
          throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
        }
        if (dim < 0) {
          throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
        }
        size *= dim;
      }
      return size;
    };
    tensorReshape = (tensor, dims) => {
      switch (tensor.location) {
        case "cpu":
          return new Tensor(tensor.type, tensor.data, dims);
        case "cpu-pinned":
          return new Tensor({
            location: "cpu-pinned",
            data: tensor.data,
            type: tensor.type,
            dims
          });
        case "texture":
          return new Tensor({
            location: "texture",
            texture: tensor.texture,
            type: tensor.type,
            dims
          });
        case "gpu-buffer":
          return new Tensor({
            location: "gpu-buffer",
            gpuBuffer: tensor.gpuBuffer,
            type: tensor.type,
            dims
          });
        case "ml-tensor":
          return new Tensor({
            location: "ml-tensor",
            mlTensor: tensor.mlTensor,
            type: tensor.type,
            dims
          });
        default:
          throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
      }
    };
  }
});

// common/dist/esm/tensor-impl.js
var Tensor;
var init_tensor_impl = __esm({
  "common/dist/esm/tensor-impl.js"() {
    "use strict";
    init_tensor_conversion_impl();
    init_tensor_factory_impl();
    init_tensor_impl_type_mapping();
    init_tensor_utils_impl();
    Tensor = class {
      /**
       * implementation.
       */
      constructor(arg0, arg1, arg2) {
        checkTypedArray();
        let type;
        let dims;
        if (typeof arg0 === "object" && "location" in arg0) {
          this.dataLocation = arg0.location;
          type = arg0.type;
          dims = arg0.dims;
          switch (arg0.location) {
            case "cpu-pinned": {
              const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
              if (!expectedTypedArrayConstructor) {
                throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
              }
              if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
                throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
              }
              this.cpuData = arg0.data;
              break;
            }
            case "texture": {
              if (type !== "float32") {
                throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
              }
              this.gpuTextureData = arg0.texture;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            case "gpu-buffer": {
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
              }
              this.gpuBufferData = arg0.gpuBuffer;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            case "ml-tensor": {
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                throw new TypeError(`unsupported type "${type}" to create tensor from MLTensor`);
              }
              this.mlTensorData = arg0.mlTensor;
              this.downloader = arg0.download;
              this.disposer = arg0.dispose;
              break;
            }
            default:
              throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
          }
        } else {
          let data;
          let maybeDims;
          if (typeof arg0 === "string") {
            type = arg0;
            maybeDims = arg2;
            if (arg0 === "string") {
              if (!Array.isArray(arg1)) {
                throw new TypeError("A string tensor's data must be a string array.");
              }
              data = arg1;
            } else {
              const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
              if (typedArrayConstructor === void 0) {
                throw new TypeError(`Unsupported tensor type: ${arg0}.`);
              }
              if (Array.isArray(arg1)) {
                if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
                  throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
                } else if (arg0 === "uint64" || arg0 === "int64") {
                  data = typedArrayConstructor.from(arg1, BigInt);
                } else {
                  data = typedArrayConstructor.from(arg1);
                }
              } else if (arg1 instanceof typedArrayConstructor) {
                data = arg1;
              } else if (arg1 instanceof Uint8ClampedArray) {
                if (arg0 === "uint8") {
                  data = Uint8Array.from(arg1);
                } else {
                  throw new TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);
                }
              } else if (arg0 === "float16" && arg1 instanceof Uint16Array && typedArrayConstructor !== Uint16Array) {
                data = new globalThis.Float16Array(arg1.buffer, arg1.byteOffset, arg1.length);
              } else {
                throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
              }
            }
          } else {
            maybeDims = arg1;
            if (Array.isArray(arg0)) {
              if (arg0.length === 0) {
                throw new TypeError("Tensor type cannot be inferred from an empty array.");
              }
              const firstElementType = typeof arg0[0];
              if (firstElementType === "string") {
                type = "string";
                data = arg0;
              } else if (firstElementType === "boolean") {
                type = "bool";
                data = Uint8Array.from(arg0);
              } else {
                throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
              }
            } else if (arg0 instanceof Uint8ClampedArray) {
              type = "uint8";
              data = Uint8Array.from(arg0);
            } else {
              const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
              if (mappedType === void 0) {
                throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
              }
              type = mappedType;
              data = arg0;
            }
          }
          if (maybeDims === void 0) {
            maybeDims = [data.length];
          } else if (!Array.isArray(maybeDims)) {
            throw new TypeError("A tensor's dims must be a number array");
          }
          dims = maybeDims;
          this.cpuData = data;
          this.dataLocation = "cpu";
        }
        const size = calculateSize(dims);
        if (this.cpuData && size !== this.cpuData.length) {
          if ((type === "uint4" || type === "int4") && Math.ceil(size / 2) === this.cpuData.length) {
          } else {
            throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
          }
        }
        this.type = type;
        this.dims = dims;
        this.size = size;
      }
      // #endregion
      // #region factory
      static async fromImage(image, options) {
        return tensorFromImage(image, options);
      }
      static fromTexture(texture, options) {
        return tensorFromTexture(texture, options);
      }
      static fromGpuBuffer(gpuBuffer, options) {
        return tensorFromGpuBuffer(gpuBuffer, options);
      }
      static fromMLTensor(mlTensor, options) {
        return tensorFromMLTensor(mlTensor, options);
      }
      static fromPinnedBuffer(type, buffer, dims) {
        return tensorFromPinnedBuffer(type, buffer, dims);
      }
      // #endregion
      // #region conversions
      toDataURL(options) {
        return tensorToDataURL(this, options);
      }
      toImageData(options) {
        return tensorToImageData(this, options);
      }
      // #endregion
      // #region properties
      get data() {
        this.ensureValid();
        if (!this.cpuData) {
          throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
        }
        return this.cpuData;
      }
      get location() {
        return this.dataLocation;
      }
      get texture() {
        this.ensureValid();
        if (!this.gpuTextureData) {
          throw new Error("The data is not stored as a WebGL texture.");
        }
        return this.gpuTextureData;
      }
      get gpuBuffer() {
        this.ensureValid();
        if (!this.gpuBufferData) {
          throw new Error("The data is not stored as a WebGPU buffer.");
        }
        return this.gpuBufferData;
      }
      get mlTensor() {
        this.ensureValid();
        if (!this.mlTensorData) {
          throw new Error("The data is not stored as a WebNN MLTensor.");
        }
        return this.mlTensorData;
      }
      // #endregion
      // #region methods
      async getData(releaseData) {
        this.ensureValid();
        switch (this.dataLocation) {
          case "cpu":
          case "cpu-pinned":
            return this.data;
          case "texture":
          case "gpu-buffer":
          case "ml-tensor": {
            if (!this.downloader) {
              throw new Error("The current tensor is not created with a specified data downloader.");
            }
            if (this.isDownloading) {
              throw new Error("The current tensor is being downloaded.");
            }
            try {
              this.isDownloading = true;
              const data = await this.downloader();
              this.downloader = void 0;
              this.dataLocation = "cpu";
              this.cpuData = data;
              if (releaseData && this.disposer) {
                this.disposer();
                this.disposer = void 0;
              }
              return data;
            } finally {
              this.isDownloading = false;
            }
          }
          default:
            throw new Error(`cannot get data from location: ${this.dataLocation}`);
        }
      }
      dispose() {
        if (this.isDownloading) {
          throw new Error("The current tensor is being downloaded.");
        }
        if (this.disposer) {
          this.disposer();
          this.disposer = void 0;
        }
        this.cpuData = void 0;
        this.gpuTextureData = void 0;
        this.gpuBufferData = void 0;
        this.mlTensorData = void 0;
        this.downloader = void 0;
        this.isDownloading = void 0;
        this.dataLocation = "none";
      }
      // #endregion
      // #region tensor utilities
      ensureValid() {
        if (this.dataLocation === "none") {
          throw new Error("The tensor is disposed.");
        }
      }
      reshape(dims) {
        this.ensureValid();
        if (this.downloader || this.disposer) {
          throw new Error("Cannot reshape a tensor that owns GPU resource.");
        }
        return tensorReshape(this, dims);
      }
    };
  }
});

// common/dist/esm/tensor.js
var Tensor2;
var init_tensor = __esm({
  "common/dist/esm/tensor.js"() {
    "use strict";
    init_tensor_impl();
    Tensor2 = Tensor;
  }
});

// common/dist/esm/trace.js
var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END, TRACE_EVENT_BEGIN, TRACE_EVENT_END;
var init_trace = __esm({
  "common/dist/esm/trace.js"() {
    "use strict";
    init_env_impl();
    TRACE = (deviceType, label) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      console.timeStamp(`${deviceType}::ORT::${label}`);
    };
    TRACE_FUNC = (msg, extraMsg) => {
      const stack = new Error().stack?.split(/\r\n|\r|\n/g) || [];
      let hasTraceFunc = false;
      for (let i = 0; i < stack.length; i++) {
        if (hasTraceFunc && !stack[i].includes("TRACE_FUNC")) {
          let label = `FUNC_${msg}::${stack[i].trim().split(" ")[1]}`;
          if (extraMsg) {
            label += `::${extraMsg}`;
          }
          TRACE("CPU", label);
          return;
        }
        if (stack[i].includes("TRACE_FUNC")) {
          hasTraceFunc = true;
        }
      }
    };
    TRACE_FUNC_BEGIN = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      TRACE_FUNC("BEGIN", extraMsg);
    };
    TRACE_FUNC_END = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      TRACE_FUNC("END", extraMsg);
    };
    TRACE_EVENT_BEGIN = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      console.time(`ORT::${extraMsg}`);
    };
    TRACE_EVENT_END = (extraMsg) => {
      if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
        return;
      }
      console.timeEnd(`ORT::${extraMsg}`);
    };
  }
});

// common/dist/esm/inference-session-impl.js
var InferenceSession;
var init_inference_session_impl = __esm({
  "common/dist/esm/inference-session-impl.js"() {
    "use strict";
    init_backend_impl();
    init_tensor();
    init_trace();
    InferenceSession = class _InferenceSession {
      constructor(handler) {
        this.handler = handler;
      }
      async run(feeds, arg1, arg2) {
        TRACE_FUNC_BEGIN();
        TRACE_EVENT_BEGIN("InferenceSession.run");
        const fetches = {};
        let options = {};
        if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
          throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
        }
        let isFetchesEmpty = true;
        if (typeof arg1 === "object") {
          if (arg1 === null) {
            throw new TypeError("Unexpected argument[1]: cannot be null.");
          }
          if (arg1 instanceof Tensor2) {
            throw new TypeError("'fetches' cannot be a Tensor");
          }
          if (Array.isArray(arg1)) {
            if (arg1.length === 0) {
              throw new TypeError("'fetches' cannot be an empty array.");
            }
            isFetchesEmpty = false;
            for (const name of arg1) {
              if (typeof name !== "string") {
                throw new TypeError("'fetches' must be a string array or an object.");
              }
              if (this.outputNames.indexOf(name) === -1) {
                throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
              }
              fetches[name] = null;
            }
            if (typeof arg2 === "object" && arg2 !== null) {
              options = arg2;
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else {
            let isFetches = false;
            const arg1Keys = Object.getOwnPropertyNames(arg1);
            for (const name of this.outputNames) {
              if (arg1Keys.indexOf(name) !== -1) {
                const v = arg1[name];
                if (v === null || v instanceof Tensor2) {
                  isFetches = true;
                  isFetchesEmpty = false;
                  fetches[name] = v;
                }
              }
            }
            if (isFetches) {
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              options = arg1;
            }
          }
        } else if (typeof arg1 !== "undefined") {
          throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
        }
        for (const name of this.inputNames) {
          if (typeof feeds[name] === "undefined") {
            throw new Error(`input '${name}' is missing in 'feeds'.`);
          }
        }
        if (isFetchesEmpty) {
          for (const name of this.outputNames) {
            fetches[name] = null;
          }
        }
        const results = await this.handler.run(feeds, fetches, options);
        const returnValue = {};
        for (const key in results) {
          if (Object.hasOwnProperty.call(results, key)) {
            const result = results[key];
            if (result instanceof Tensor2) {
              returnValue[key] = result;
            } else {
              returnValue[key] = new Tensor2(result.type, result.data, result.dims);
            }
          }
        }
        TRACE_EVENT_END("InferenceSession.run");
        TRACE_FUNC_END();
        return returnValue;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(arg0, arg1, arg2, arg3) {
        TRACE_FUNC_BEGIN();
        TRACE_EVENT_BEGIN("InferenceSession.create");
        let filePathOrUint8Array;
        let options = {};
        if (typeof arg0 === "string") {
          filePathOrUint8Array = arg0;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
        } else if (arg0 instanceof Uint8Array) {
          filePathOrUint8Array = arg0;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
        } else if (arg0 instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && arg0 instanceof SharedArrayBuffer) {
          const buffer = arg0;
          let byteOffset = 0;
          let byteLength = arg0.byteLength;
          if (typeof arg1 === "object" && arg1 !== null) {
            options = arg1;
          } else if (typeof arg1 === "number") {
            byteOffset = arg1;
            if (!Number.isSafeInteger(byteOffset)) {
              throw new RangeError("'byteOffset' must be an integer.");
            }
            if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
              throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
            }
            byteLength = arg0.byteLength - byteOffset;
            if (typeof arg2 === "number") {
              byteLength = arg2;
              if (!Number.isSafeInteger(byteLength)) {
                throw new RangeError("'byteLength' must be an integer.");
              }
              if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
              }
              if (typeof arg3 === "object" && arg3 !== null) {
                options = arg3;
              } else if (typeof arg3 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else if (typeof arg2 !== "undefined") {
              throw new TypeError("'byteLength' must be a number.");
            }
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("'options' must be an object.");
          }
          filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
        } else {
          throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
        }
        const [backend, optionsWithValidatedEPs] = await resolveBackendAndExecutionProviders(options);
        const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, optionsWithValidatedEPs);
        TRACE_EVENT_END("InferenceSession.create");
        TRACE_FUNC_END();
        return new _InferenceSession(handler);
      }
      startProfiling() {
        this.handler.startProfiling();
      }
      endProfiling() {
        this.handler.endProfiling();
      }
      get inputNames() {
        return this.handler.inputNames;
      }
      get outputNames() {
        return this.handler.outputNames;
      }
      get inputMetadata() {
        return this.handler.inputMetadata;
      }
      get outputMetadata() {
        return this.handler.outputMetadata;
      }
    };
  }
});

// common/dist/esm/inference-session.js
var InferenceSession2;
var init_inference_session = __esm({
  "common/dist/esm/inference-session.js"() {
    "use strict";
    init_inference_session_impl();
    InferenceSession2 = InferenceSession;
  }
});

// common/dist/esm/tensor-conversion.js
var init_tensor_conversion = __esm({
  "common/dist/esm/tensor-conversion.js"() {
    "use strict";
  }
});

// common/dist/esm/tensor-factory.js
var init_tensor_factory = __esm({
  "common/dist/esm/tensor-factory.js"() {
    "use strict";
  }
});

// common/dist/esm/onnx-model.js
var init_onnx_model = __esm({
  "common/dist/esm/onnx-model.js"() {
    "use strict";
  }
});

// common/dist/esm/onnx-value.js
var init_onnx_value = __esm({
  "common/dist/esm/onnx-value.js"() {
    "use strict";
  }
});

// common/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  InferenceSession: () => InferenceSession2,
  TRACE: () => TRACE,
  TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
  TRACE_EVENT_END: () => TRACE_EVENT_END,
  TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
  TRACE_FUNC_END: () => TRACE_FUNC_END,
  Tensor: () => Tensor2,
  env: () => env2,
  registerBackend: () => registerBackend
});
var init_esm = __esm({
  "common/dist/esm/index.js"() {
    "use strict";
    init_backend();
    init_env();
    init_inference_session();
    init_tensor();
    init_tensor_conversion();
    init_tensor_factory();
    init_trace();
    init_onnx_model();
    init_onnx_value();
  }
});

// web/lib/wasm/wasm-utils-env.ts
var isNode;
var init_wasm_utils_env = __esm({
  "web/lib/wasm/wasm-utils-env.ts"() {
    "use strict";
    isNode = false;
  }
});

// web/lib/wasm/proxy-worker/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
var WORKER_NAME, isProxyWorker, main_default;
var init_main = __esm({
  "web/lib/wasm/proxy-worker/main.ts"() {
    "use strict";
    init_wasm_core_impl();
    init_wasm_factory();
    init_wasm_utils_import();
    WORKER_NAME = "ort-wasm-proxy-worker";
    isProxyWorker = globalThis.self?.name === WORKER_NAME;
    if (isProxyWorker) {
      self.onmessage = (ev) => {
        const { type, in: message } = ev.data;
        try {
          switch (type) {
            case "init-wasm":
              initializeWebAssembly(message.wasm).then(
                () => {
                  initRuntime(message).then(
                    () => {
                      postMessage({ type });
                    },
                    (err) => {
                      postMessage({ type, err });
                    }
                  );
                },
                (err) => {
                  postMessage({ type, err });
                }
              );
              break;
            case "init-ep": {
              const { epName, env: env3 } = message;
              initEp(env3, epName).then(
                () => {
                  postMessage({ type });
                },
                (err) => {
                  postMessage({ type, err });
                }
              );
              break;
            }
            case "copy-from": {
              const { buffer } = message;
              const bufferData = copyFromExternalBuffer(buffer);
              postMessage({ type, out: bufferData });
              break;
            }
            case "create": {
              const { model, options } = message;
              createSession(model, options).then(
                (sessionMetadata) => {
                  postMessage({ type, out: sessionMetadata });
                },
                (err) => {
                  postMessage({ type, err });
                }
              );
              break;
            }
            case "release":
              releaseSession(message);
              postMessage({ type });
              break;
            case "run": {
              const { sessionId, inputIndices, inputs, outputIndices, options } = message;
              run(sessionId, inputIndices, inputs, outputIndices, new Array(outputIndices.length).fill(null), options).then(
                (outputs) => {
                  if (outputs.some((o) => o[3] !== "cpu")) {
                    postMessage({ type, err: "Proxy does not support non-cpu tensor location." });
                  } else {
                    postMessage(
                      { type, out: outputs },
                      extractTransferableBuffers([...inputs, ...outputs])
                    );
                  }
                },
                (err) => {
                  postMessage({ type, err });
                }
              );
              break;
            }
            case "end-profiling":
              endProfiling(message);
              postMessage({ type });
              break;
            default:
          }
        } catch (err) {
          postMessage({ type, err });
        }
      };
    }
    main_default = isProxyWorker ? null : (urlOverride) => new Worker(urlOverride ?? scriptSrc, { type: true ? "module" : "classic", name: WORKER_NAME });
  }
});

// web/lib/wasm/wasm-utils-import.ts
var origin, isEsmImportMetaUrlHardcodedAsFileUri, getScriptSrc, scriptSrc, inferWasmPathPrefixFromScriptSrc, isSameOrigin, normalizeUrl, fallbackUrl, preload, dynamicImportDefault, createProxyWorker, importProxyWorker, embeddedWasmModule, importWasmModule;
var init_wasm_utils_import = __esm({
  "web/lib/wasm/wasm-utils-import.ts"() {
    "use strict";
    init_wasm_utils_env();
    origin = isNode || typeof location === "undefined" ? void 0 : location.origin;
    isEsmImportMetaUrlHardcodedAsFileUri = import.meta.url > "file:" && import.meta.url < "file;";
    getScriptSrc = () => {
      if (isNode) {
        return void 0;
      }
      if (true) {
        if (isEsmImportMetaUrlHardcodedAsFileUri) {
          const URL2 = URL;
          return new URL(new URL2("ort.webgpu.mjs", import.meta.url).href, origin).href;
        }
        return import.meta.url;
      }
      return typeof document !== "undefined" ? document.currentScript?.src : (
        // use `self.location.href` if available
        typeof self !== "undefined" ? self.location?.href : void 0
      );
    };
    scriptSrc = getScriptSrc();
    inferWasmPathPrefixFromScriptSrc = () => {
      if (scriptSrc && !scriptSrc.startsWith("blob:")) {
        return scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
      }
      return void 0;
    };
    isSameOrigin = (filename, prefixOverride) => {
      try {
        const baseUrl = prefixOverride ?? scriptSrc;
        const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
        return url.origin === origin;
      } catch {
        return false;
      }
    };
    normalizeUrl = (filename, prefixOverride) => {
      const baseUrl = prefixOverride ?? scriptSrc;
      try {
        const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
        return url.href;
      } catch {
        return void 0;
      }
    };
    fallbackUrl = (filename, prefixOverride) => `${prefixOverride ?? "./"}${filename}`;
    preload = async (absoluteUrl) => {
      const response = await fetch(absoluteUrl, { credentials: "same-origin" });
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    };
    dynamicImportDefault = async (url) => (await import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      url
    )).default;
    createProxyWorker = // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    false ? void 0 : (init_main(), __toCommonJS(main_exports)).default;
    importProxyWorker = async () => {
      if (!scriptSrc) {
        throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
      }
      if (isSameOrigin(scriptSrc)) {
        return [void 0, createProxyWorker()];
      }
      const url = await preload(scriptSrc);
      return [url, createProxyWorker(url)];
    };
    embeddedWasmModule = false ? (
      // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      (false ? null : false ? null : true ? null : null).default
    ) : void 0;
    importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded, isWasmOverridden) => {
      let useEmbeddedModule = embeddedWasmModule && !(urlOverride || prefixOverride);
      if (useEmbeddedModule) {
        if (!scriptSrc) {
          if (isWasmOverridden && !isMultiThreaded) {
            useEmbeddedModule = true;
          } else {
            throw new Error("cannot determine the script source URL.");
          }
        } else {
          useEmbeddedModule = isSameOrigin(scriptSrc) || isWasmOverridden && !isMultiThreaded;
        }
      }
      if (useEmbeddedModule) {
        return [void 0, embeddedWasmModule];
      } else {
        const wasmModuleFilename = false ? "ort-wasm-simd-threaded.jsep.mjs" : false ? "ort-wasm-simd-threaded.jspi.mjs" : true ? "ort-wasm-simd-threaded.asyncify.mjs" : "ort-wasm-simd-threaded.mjs";
        const wasmModuleUrl = urlOverride ?? normalizeUrl(wasmModuleFilename, prefixOverride);
        const needPreload = !isNode && isMultiThreaded && wasmModuleUrl && !isSameOrigin(wasmModuleUrl, prefixOverride);
        const url = needPreload ? await preload(wasmModuleUrl) : wasmModuleUrl ?? fallbackUrl(wasmModuleFilename, prefixOverride);
        return [needPreload ? url : void 0, await dynamicImportDefault(url)];
      }
    };
  }
});

// web/lib/wasm/wasm-factory.ts
var wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, isRelaxedSimdSupported, initializeWebAssembly, getInstance;
var init_wasm_factory = __esm({
  "web/lib/wasm/wasm-factory.ts"() {
    "use strict";
    init_wasm_utils_import();
    initialized = false;
    initializing = false;
    aborted = false;
    isMultiThreadSupported = () => {
      if (typeof SharedArrayBuffer === "undefined") {
        return false;
      }
      try {
        if (typeof MessageChannel !== "undefined") {
          new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
        }
        return WebAssembly.validate(
          new Uint8Array([
            0,
            97,
            115,
            109,
            1,
            0,
            0,
            0,
            1,
            4,
            1,
            96,
            0,
            0,
            3,
            2,
            1,
            0,
            5,
            4,
            1,
            3,
            1,
            1,
            10,
            11,
            1,
            9,
            0,
            65,
            0,
            254,
            16,
            2,
            0,
            26,
            11
          ])
        );
      } catch {
        return false;
      }
    };
    isSimdSupported = () => {
      try {
        return WebAssembly.validate(
          new Uint8Array([
            0,
            97,
            115,
            109,
            1,
            0,
            0,
            0,
            1,
            4,
            1,
            96,
            0,
            0,
            3,
            2,
            1,
            0,
            10,
            30,
            1,
            28,
            0,
            65,
            0,
            253,
            15,
            253,
            12,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            253,
            186,
            1,
            26,
            11
          ])
        );
      } catch {
        return false;
      }
    };
    isRelaxedSimdSupported = () => {
      try {
        return WebAssembly.validate(
          new Uint8Array([
            0,
            97,
            115,
            109,
            1,
            0,
            0,
            0,
            1,
            5,
            1,
            96,
            0,
            1,
            123,
            3,
            2,
            1,
            0,
            10,
            19,
            1,
            17,
            0,
            65,
            1,
            253,
            15,
            65,
            2,
            253,
            15,
            65,
            3,
            253,
            15,
            253,
            147,
            2,
            11
          ])
        );
      } catch {
        return false;
      }
    };
    initializeWebAssembly = async (flags) => {
      if (initialized) {
        return Promise.resolve();
      }
      if (initializing) {
        throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
      }
      if (aborted) {
        throw new Error("previous call to 'initializeWebAssembly()' failed.");
      }
      initializing = true;
      const timeout = flags.initTimeout;
      let numThreads = flags.numThreads;
      if (flags.simd === false) {
      } else if (flags.simd === "relaxed") {
        if (!isRelaxedSimdSupported()) {
          throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
        }
      } else if (!isSimdSupported()) {
        throw new Error("WebAssembly SIMD is not supported in the current environment.");
      }
      if (false) {
        if (!("Suspending" in WebAssembly)) {
          throw new Error("WebAssembly JSPI is not supported in the current environment.");
        }
      }
      const multiThreadSupported = isMultiThreadSupported();
      if (numThreads > 1 && !multiThreadSupported) {
        if (typeof self !== "undefined" && !self.crossOriginIsolated) {
          console.warn(
            "env.wasm.numThreads is set to " + numThreads + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."
          );
        }
        console.warn(
          "WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."
        );
        flags.numThreads = numThreads = 1;
      }
      const wasmPaths = flags.wasmPaths;
      const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;
      const mjsPathOverrideFlag = wasmPaths?.mjs;
      const mjsPathOverride = mjsPathOverrideFlag?.href ?? mjsPathOverrideFlag;
      const wasmPathOverrideFlag = wasmPaths?.wasm;
      const wasmPathOverride = wasmPathOverrideFlag?.href ?? wasmPathOverrideFlag;
      const wasmBinaryOverride = flags.wasmBinary;
      const [objectUrl, ortWasmFactory] = await importWasmModule(
        mjsPathOverride,
        wasmPrefixOverride,
        numThreads > 1,
        !!wasmBinaryOverride || !!wasmPathOverride
      );
      let isTimeout = false;
      const tasks = [];
      if (timeout > 0) {
        tasks.push(
          new Promise((resolve) => {
            setTimeout(() => {
              isTimeout = true;
              resolve();
            }, timeout);
          })
        );
      }
      tasks.push(
        new Promise((resolve, reject) => {
          const config = {
            /**
             * The number of threads. WebAssembly will create (Module.numThreads - 1) workers. If it is 1, no worker will be
             * created.
             */
            numThreads
          };
          if (wasmBinaryOverride) {
            config.wasmBinary = wasmBinaryOverride;
            config.locateFile = (fileName) => fileName;
          } else if (wasmPathOverride || wasmPrefixOverride) {
            config.locateFile = (fileName) => wasmPathOverride ?? wasmPrefixOverride + fileName;
          } else if (mjsPathOverride && mjsPathOverride.indexOf("blob:") !== 0) {
            config.locateFile = (fileName) => new URL(fileName, mjsPathOverride).href;
          } else if (objectUrl) {
            const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
            if (inferredWasmPathPrefix) {
              config.locateFile = (fileName) => inferredWasmPathPrefix + fileName;
            }
          }
          ortWasmFactory(config).then(
            // wasm module initialized successfully
            (module) => {
              initializing = false;
              initialized = true;
              wasm = module;
              resolve();
              if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
              }
            },
            // wasm module failed to initialize
            (what) => {
              initializing = false;
              aborted = true;
              reject(what);
            }
          );
        })
      );
      await Promise.race(tasks);
      if (isTimeout) {
        throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);
      }
    };
    getInstance = () => {
      if (initialized && wasm) {
        return wasm;
      }
      throw new Error("WebAssembly is not initialized yet.");
    };
  }
});

// web/lib/wasm/wasm-utils.ts
var allocWasmString, iterateExtraOptions, checkLastError;
var init_wasm_utils = __esm({
  "web/lib/wasm/wasm-utils.ts"() {
    "use strict";
    init_wasm_factory();
    allocWasmString = (data, allocs) => {
      const wasm2 = getInstance();
      const dataLength = wasm2.lengthBytesUTF8(data) + 1;
      const dataOffset = wasm2._malloc(dataLength);
      wasm2.stringToUTF8(data, dataOffset, dataLength);
      allocs.push(dataOffset);
      return dataOffset;
    };
    iterateExtraOptions = (options, prefix, seen, handler) => {
      if (typeof options == "object" && options !== null) {
        if (seen.has(options)) {
          throw new Error("Circular reference in options");
        } else {
          seen.add(options);
        }
      }
      Object.entries(options).forEach(([key, value]) => {
        const name = prefix ? prefix + key : key;
        if (typeof value === "object") {
          iterateExtraOptions(value, name + ".", seen, handler);
        } else if (typeof value === "string" || typeof value === "number") {
          handler(name, value.toString());
        } else if (typeof value === "boolean") {
          handler(name, value ? "1" : "0");
        } else {
          throw new Error(`Can't handle extra config type: ${typeof value}`);
        }
      });
    };
    checkLastError = (message) => {
      const wasm2 = getInstance();
      const stack = wasm2.stackSave();
      try {
        const ptrSize = wasm2.PTR_SIZE;
        const paramsOffset = wasm2.stackAlloc(2 * ptrSize);
        wasm2._OrtGetLastError(paramsOffset, paramsOffset + ptrSize);
        const errorCode = Number(wasm2.getValue(paramsOffset, ptrSize === 4 ? "i32" : "i64"));
        const errorMessagePointer = wasm2.getValue(paramsOffset + ptrSize, "*");
        const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";
        throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);
      } finally {
        wasm2.stackRestore(stack);
      }
    };
  }
});

// web/lib/wasm/run-options.ts
var setRunOptions;
var init_run_options = __esm({
  "web/lib/wasm/run-options.ts"() {
    "use strict";
    init_wasm_factory();
    init_wasm_utils();
    setRunOptions = (options) => {
      const wasm2 = getInstance();
      let runOptionsHandle = 0;
      const allocs = [];
      const runOptions = options || {};
      try {
        if (options?.logSeverityLevel === void 0) {
          runOptions.logSeverityLevel = 2;
        } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {
          throw new Error(`log severity level is not valid: ${options.logSeverityLevel}`);
        }
        if (options?.logVerbosityLevel === void 0) {
          runOptions.logVerbosityLevel = 0;
        } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {
          throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);
        }
        if (options?.terminate === void 0) {
          runOptions.terminate = false;
        }
        let tagDataOffset = 0;
        if (options?.tag !== void 0) {
          tagDataOffset = allocWasmString(options.tag, allocs);
        }
        runOptionsHandle = wasm2._OrtCreateRunOptions(
          runOptions.logSeverityLevel,
          runOptions.logVerbosityLevel,
          !!runOptions.terminate,
          tagDataOffset
        );
        if (runOptionsHandle === 0) {
          checkLastError("Can't create run options.");
        }
        if (options?.extra !== void 0) {
          iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
            const keyDataOffset = allocWasmString(key, allocs);
            const valueDataOffset = allocWasmString(value, allocs);
            if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
              checkLastError(`Can't set a run config entry: ${key} - ${value}.`);
            }
          });
        }
        return [runOptionsHandle, allocs];
      } catch (e) {
        if (runOptionsHandle !== 0) {
          wasm2._OrtReleaseRunOptions(runOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
        throw e;
      }
    };
  }
});

// web/lib/wasm/session-options.ts
var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, appendSessionConfig, appendEpOption, serializeWebNNFreeDimensionBounds, setExecutionProviders, setSessionOptions;
var init_session_options = __esm({
  "web/lib/wasm/session-options.ts"() {
    "use strict";
    init_wasm_factory();
    init_wasm_utils();
    getGraphOptimzationLevel = (graphOptimizationLevel) => {
      switch (graphOptimizationLevel) {
        case "disabled":
          return 0;
        case "basic":
          return 1;
        case "extended":
          return 2;
        case "layout":
          return 3;
        case "all":
          return 99;
        default:
          throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);
      }
    };
    getExecutionMode = (executionMode) => {
      switch (executionMode) {
        case "sequential":
          return 0;
        case "parallel":
          return 1;
        default:
          throw new Error(`unsupported execution mode: ${executionMode}`);
      }
    };
    appendDefaultOptions = (options) => {
      if (!options.extra) {
        options.extra = {};
      }
      if (!options.extra.session) {
        options.extra.session = {};
      }
      const session = options.extra.session;
      if (!session.use_ort_model_bytes_directly) {
        session.use_ort_model_bytes_directly = "1";
      }
      if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {
        options.enableMemPattern = false;
      }
    };
    appendSessionConfig = (sessionOptionsHandle, key, value, allocs) => {
      const keyDataOffset = allocWasmString(key, allocs);
      const valueDataOffset = allocWasmString(value, allocs);
      if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
        checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
      }
    };
    appendEpOption = (epOptions, key, value, allocs) => {
      const keyDataOffset = allocWasmString(key, allocs);
      const valueDataOffset = allocWasmString(value, allocs);
      epOptions.push([keyDataOffset, valueDataOffset]);
    };
    serializeWebNNFreeDimensionBounds = (bounds) => {
      if (!bounds) {
        return "";
      }
      const serializedEntries = [];
      for (const [name, bound] of Object.entries(bounds)) {
        if (!name) {
          throw new Error("WebNN freeDimensionBounds dimension name must not be empty.");
        }
        if (name.includes(":") || name.includes(";")) {
          throw new Error(`WebNN freeDimensionBounds dimension name must not include ':' or ';': ${name}`);
        }
        const minSize = bound?.minSize ?? 1;
        const maxSize = bound?.maxSize;
        if (!Number.isInteger(minSize) || minSize < 1) {
          throw new Error(`WebNN freeDimensionBounds minSize must be an integer >= 1 for dimension: ${name}`);
        }
        if (!Number.isInteger(maxSize) || maxSize < 1) {
          throw new Error(`WebNN freeDimensionBounds maxSize must be an integer >= 1 for dimension: ${name}`);
        }
        if (maxSize < minSize) {
          throw new Error(`WebNN freeDimensionBounds maxSize must be >= minSize for dimension: ${name}`);
        }
        serializedEntries.push(`${name}:${minSize}:${maxSize}`);
      }
      return serializedEntries.join(";");
    };
    setExecutionProviders = async (sessionOptionsHandle, sessionOptions, allocs) => {
      const executionProviders = sessionOptions.executionProviders;
      for (const ep of executionProviders) {
        let epName = typeof ep === "string" ? ep : ep.name;
        const epOptions = [];
        switch (epName) {
          case "webnn":
            epName = "WEBNN";
            appendSessionConfig(sessionOptionsHandle, "session.disable_quant_qdq", "1", allocs);
            appendSessionConfig(sessionOptionsHandle, "session.disable_qdq_constant_folding", "1", allocs);
            if (typeof ep !== "string") {
              const webnnOptions = ep;
              const deviceType = webnnOptions?.deviceType;
              const freeDimensionBounds = webnnOptions?.freeDimensionBounds;
              if (deviceType) {
                appendSessionConfig(sessionOptionsHandle, "deviceType", deviceType, allocs);
              }
              if (freeDimensionBounds) {
                const serializedBounds = serializeWebNNFreeDimensionBounds(freeDimensionBounds);
                if (serializedBounds) {
                  appendEpOption(epOptions, "FreeDimensionBounds", serializedBounds, allocs);
                }
              }
              const enableCausalLM = webnnOptions?.enableCausalLM;
              if (enableCausalLM) {
                appendEpOption(epOptions, "enableCausalLM", "true", allocs);
              }
            }
            break;
          case "webgpu":
            if (true) {
              epName = "WebGPU";
              let customDevice;
              if (typeof ep !== "string") {
                const webgpuOptions = ep;
                if (webgpuOptions.device) {
                  if (typeof GPUDevice !== "undefined" && webgpuOptions.device instanceof GPUDevice) {
                    customDevice = webgpuOptions.device;
                  } else {
                    throw new Error("Invalid GPU device set in WebGPU EP options.");
                  }
                }
                const { enableGraphCapture } = sessionOptions;
                if (typeof enableGraphCapture === "boolean" && enableGraphCapture) {
                  appendEpOption(epOptions, "enableGraphCapture", "1", allocs);
                }
                if (typeof webgpuOptions.preferredLayout === "string") {
                  appendEpOption(epOptions, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                }
                if (webgpuOptions.forceCpuNodeNames) {
                  const names = Array.isArray(webgpuOptions.forceCpuNodeNames) ? webgpuOptions.forceCpuNodeNames : [webgpuOptions.forceCpuNodeNames];
                  appendEpOption(epOptions, "forceCpuNodeNames", names.join("\n"), allocs);
                }
                if (webgpuOptions.validationMode) {
                  appendEpOption(epOptions, "validationMode", webgpuOptions.validationMode, allocs);
                }
                for (const key of [
                  "storageBufferCacheMode",
                  "uniformBufferCacheMode",
                  "queryResolveBufferCacheMode",
                  "defaultBufferCacheMode"
                ]) {
                  const mode = webgpuOptions[key];
                  if (mode) {
                    if (mode !== "disabled" && mode !== "lazyRelease" && mode !== "simple" && mode !== "bucket") {
                      throw new Error(`${key} must be one of 'disabled', 'lazyRelease', 'simple' or 'bucket': ${mode}`);
                    }
                    appendEpOption(epOptions, key, mode, allocs);
                  }
                }
              }
              const info = getInstance().webgpuRegisterDevice(customDevice);
              if (info) {
                const [deviceId, instanceHandle, deviceHandle] = info;
                appendEpOption(epOptions, "deviceId", deviceId.toString(), allocs);
                appendEpOption(epOptions, "webgpuInstance", instanceHandle.toString(), allocs);
                appendEpOption(epOptions, "webgpuDevice", deviceHandle.toString(), allocs);
              }
            } else {
              epName = "JS";
              if (typeof ep !== "string") {
                const webgpuOptions = ep;
                if (webgpuOptions?.preferredLayout) {
                  if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                    throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                  }
                  appendSessionConfig(sessionOptionsHandle, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                }
              }
            }
            break;
          case "wasm":
          case "cpu":
            continue;
          default:
            throw new Error(`not supported execution provider: ${epName}`);
        }
        const epNameDataOffset = allocWasmString(epName, allocs);
        const epOptionsCount = epOptions.length;
        let keysOffset = 0;
        let valuesOffset = 0;
        if (epOptionsCount > 0) {
          keysOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
          allocs.push(keysOffset);
          valuesOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
          allocs.push(valuesOffset);
          for (let i = 0; i < epOptionsCount; i++) {
            getInstance().setValue(keysOffset + i * getInstance().PTR_SIZE, epOptions[i][0], "*");
            getInstance().setValue(valuesOffset + i * getInstance().PTR_SIZE, epOptions[i][1], "*");
          }
        }
        if (await getInstance()._OrtAppendExecutionProvider(
          sessionOptionsHandle,
          epNameDataOffset,
          keysOffset,
          valuesOffset,
          epOptionsCount
        ) !== 0) {
          checkLastError(`Can't append execution provider: ${epName}.`);
        }
      }
    };
    setSessionOptions = async (options) => {
      const wasm2 = getInstance();
      let sessionOptionsHandle = 0;
      const allocs = [];
      const sessionOptions = options || {};
      appendDefaultOptions(sessionOptions);
      try {
        const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");
        const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");
        const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;
        const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;
        if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {
          throw new Error(`log severity level is not valid: ${logSeverityLevel}`);
        }
        const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;
        if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {
          throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);
        }
        const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;
        sessionOptionsHandle = wasm2._OrtCreateSessionOptions(
          graphOptimizationLevel,
          !!sessionOptions.enableCpuMemArena,
          !!sessionOptions.enableMemPattern,
          executionMode,
          !!sessionOptions.enableProfiling,
          0,
          logIdDataOffset,
          logSeverityLevel,
          logVerbosityLevel,
          optimizedModelFilePathOffset
        );
        if (sessionOptionsHandle === 0) {
          checkLastError("Can't create session options.");
        }
        if (sessionOptions.executionProviders) {
          await setExecutionProviders(sessionOptionsHandle, sessionOptions, allocs);
        }
        if (sessionOptions.enableGraphCapture !== void 0) {
          if (typeof sessionOptions.enableGraphCapture !== "boolean") {
            throw new Error(`enableGraphCapture must be a boolean value: ${sessionOptions.enableGraphCapture}`);
          }
          appendSessionConfig(
            sessionOptionsHandle,
            "enableGraphCapture",
            sessionOptions.enableGraphCapture.toString(),
            allocs
          );
        }
        if (sessionOptions.freeDimensionOverrides) {
          for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {
            if (typeof name !== "string") {
              throw new Error(`free dimension override name must be a string: ${name}`);
            }
            if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
              throw new Error(`free dimension override value must be a non-negative integer: ${value}`);
            }
            const nameOffset = allocWasmString(name, allocs);
            if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {
              checkLastError(`Can't set a free dimension override: ${name} - ${value}.`);
            }
          }
        }
        if (sessionOptions.extra !== void 0) {
          iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
            appendSessionConfig(sessionOptionsHandle, key, value, allocs);
          });
        }
        return [sessionOptionsHandle, allocs];
      } catch (e) {
        if (sessionOptionsHandle !== 0) {
          if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
            checkLastError("Can't release session options.");
          }
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
        throw e;
      }
    };
  }
});

// web/lib/wasm/wasm-common.ts
var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, calculateTensorSizeInBytes, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, isMLTensorSupportedType, dataLocationStringToEnum;
var init_wasm_common = __esm({
  "web/lib/wasm/wasm-common.ts"() {
    "use strict";
    tensorDataTypeStringToEnum = (type) => {
      switch (type) {
        case "int8":
          return 3 /* int8 */;
        case "uint8":
          return 2 /* uint8 */;
        case "bool":
          return 9 /* bool */;
        case "int16":
          return 5 /* int16 */;
        case "uint16":
          return 4 /* uint16 */;
        case "int32":
          return 6 /* int32 */;
        case "uint32":
          return 12 /* uint32 */;
        case "float16":
          return 10 /* float16 */;
        case "float32":
          return 1 /* float */;
        case "float64":
          return 11 /* double */;
        case "string":
          return 8 /* string */;
        case "int64":
          return 7 /* int64 */;
        case "uint64":
          return 13 /* uint64 */;
        case "int4":
          return 22 /* int4 */;
        case "uint4":
          return 21 /* uint4 */;
        default:
          throw new Error(`unsupported data type: ${type}`);
      }
    };
    tensorDataTypeEnumToString = (typeProto) => {
      switch (typeProto) {
        case 3 /* int8 */:
          return "int8";
        case 2 /* uint8 */:
          return "uint8";
        case 9 /* bool */:
          return "bool";
        case 5 /* int16 */:
          return "int16";
        case 4 /* uint16 */:
          return "uint16";
        case 6 /* int32 */:
          return "int32";
        case 12 /* uint32 */:
          return "uint32";
        case 10 /* float16 */:
          return "float16";
        case 1 /* float */:
          return "float32";
        case 11 /* double */:
          return "float64";
        case 8 /* string */:
          return "string";
        case 7 /* int64 */:
          return "int64";
        case 13 /* uint64 */:
          return "uint64";
        case 22 /* int4 */:
          return "int4";
        case 21 /* uint4 */:
          return "uint4";
        default:
          throw new Error(`unsupported data type: ${typeProto}`);
      }
    };
    calculateTensorSizeInBytes = (dateType, dimsOrSize) => {
      const elementSize = [
        -1,
        // undefined = 0
        4,
        // float = 1
        1,
        // uint8 = 2
        1,
        // int8 = 3
        2,
        // uint16 = 4
        2,
        // int16 = 5
        4,
        // int32 = 6
        8,
        // int64 = 7
        -1,
        // string = 8
        1,
        // bool = 9
        2,
        // float16 = 10
        8,
        // double = 11
        4,
        // uint32 = 12
        8,
        // uint64 = 13
        -1,
        // complex64 = 14
        -1,
        // complex128 = 15
        -1,
        // bfloat16 = 16
        -1,
        // FLOAT8E4M3FN = 17
        -1,
        // FLOAT8E4M3FNUZ = 18
        -1,
        // FLOAT8E5M2 = 19
        -1,
        // FLOAT8E5M2FNUZ = 20
        0.5,
        // uint4 = 21
        0.5
        // int4 = 22
      ][dateType];
      const size = typeof dimsOrSize === "number" ? dimsOrSize : dimsOrSize.reduce((a, b) => a * b, 1);
      return elementSize > 0 ? Math.ceil(size * elementSize) : void 0;
    };
    tensorTypeToTypedArrayConstructor = (type) => {
      switch (type) {
        case "float16":
          return typeof Float16Array !== "undefined" ? Float16Array : Uint16Array;
        case "float32":
          return Float32Array;
        case "uint8":
          return Uint8Array;
        case "int8":
          return Int8Array;
        case "uint16":
          return Uint16Array;
        case "int16":
          return Int16Array;
        case "int32":
          return Int32Array;
        case "bool":
          return Uint8Array;
        case "float64":
          return Float64Array;
        case "uint32":
          return Uint32Array;
        case "int64":
          return BigInt64Array;
        case "uint64":
          return BigUint64Array;
        default:
          throw new Error(`unsupported type: ${type}`);
      }
    };
    logLevelStringToEnum = (logLevel) => {
      switch (logLevel) {
        case "verbose":
          return 0;
        case "info":
          return 1;
        case "warning":
          return 2;
        case "error":
          return 3;
        case "fatal":
          return 4;
        default:
          throw new Error(`unsupported logging level: ${logLevel}`);
      }
    };
    isGpuBufferSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
    isMLTensorSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint64" || type === "int8" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
    dataLocationStringToEnum = (location2) => {
      switch (location2) {
        case "none":
          return 0;
        case "cpu":
          return 1;
        case "cpu-pinned":
          return 2;
        case "texture":
          return 3;
        case "gpu-buffer":
          return 4;
        case "ml-tensor":
          return 5;
        default:
          throw new Error(`unsupported data location: ${location2}`);
      }
    };
  }
});

// web/lib/wasm/wasm-utils-load-file.ts
var loadFile;
var init_wasm_utils_load_file = __esm({
  "web/lib/wasm/wasm-utils-load-file.ts"() {
    "use strict";
    init_wasm_utils_env();
    loadFile = async (file) => {
      if (typeof file === "string") {
        if (isNode) {
          try {
            const { readFile } = __require("node:fs/promises");
            return new Uint8Array(await readFile(file));
          } catch (e) {
            if (e.code === "ERR_FS_FILE_TOO_LARGE") {
              const { createReadStream } = __require("node:fs");
              const stream = createReadStream(file);
              const chunks = [];
              for await (const chunk of stream) {
                chunks.push(chunk);
              }
              return new Uint8Array(Buffer.concat(chunks));
            }
            throw e;
          }
        } else {
          const response = await fetch(file);
          if (!response.ok) {
            throw new Error(`failed to load external data file: ${file}`);
          }
          const contentLengthHeader = response.headers.get("Content-Length");
          const fileSize = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
          if (fileSize < 1073741824) {
            return new Uint8Array(await response.arrayBuffer());
          } else {
            if (!response.body) {
              throw new Error(`failed to load external data file: ${file}, no response body.`);
            }
            const reader = response.body.getReader();
            let buffer;
            try {
              buffer = new ArrayBuffer(fileSize);
            } catch (e) {
              if (e instanceof RangeError) {
                const pages = Math.ceil(fileSize / 65536);
                buffer = new WebAssembly.Memory({ initial: pages, maximum: pages }).buffer;
              } else {
                throw e;
              }
            }
            let offset = 0;
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              const chunkSize = value.byteLength;
              const chunk = new Uint8Array(buffer, offset, chunkSize);
              chunk.set(value);
              offset += chunkSize;
            }
            return new Uint8Array(buffer, 0, fileSize);
          }
        }
      } else if (file instanceof Blob) {
        return new Uint8Array(await file.arrayBuffer());
      } else if (file instanceof Uint8Array) {
        return file;
      } else {
        return new Uint8Array(file);
      }
    };
  }
});

// web/lib/wasm/jsep/tensor-view.ts
var createView;
var init_tensor_view = __esm({
  "web/lib/wasm/jsep/tensor-view.ts"() {
    "use strict";
    init_wasm_common();
    createView = (dataBuffer, type) => new (tensorTypeToTypedArrayConstructor(type))(dataBuffer);
  }
});

// web/lib/wasm/jsep/log.ts
var logLevelPrefix, doLog, configLogLevel, debug, configureLogger, LOG, LOG_DEBUG;
var init_log = __esm({
  "web/lib/wasm/jsep/log.ts"() {
    "use strict";
    init_wasm_common();
    logLevelPrefix = ["V", "I", "W", "E", "F"];
    doLog = (level, message) => {
      console.log(`[${logLevelPrefix[level]},${(/* @__PURE__ */ new Date()).toISOString()}]${message}`);
    };
    configureLogger = ($configLogLevel, $debug) => {
      configLogLevel = $configLogLevel;
      debug = $debug;
    };
    LOG = (logLevel, msg) => {
      const messageLevel = logLevelStringToEnum(logLevel);
      const configLevel = logLevelStringToEnum(configLogLevel);
      if (messageLevel >= configLevel) {
        doLog(messageLevel, typeof msg === "function" ? msg() : msg);
      }
    };
    LOG_DEBUG = (...args) => {
      if (debug) {
        LOG(...args);
      }
    };
  }
});

// web/lib/wasm/jsep/webnn/tensor-manager.ts
var webnnDataTypeToSize, convertDataToInt32, convertInt32ToData, tensorGuid, createNewTensorId, webnnDataTypeToFallback, calculateByteLength, TensorWrapper, TensorIdTracker, TensorManagerImpl, createTensorManager;
var init_tensor_manager = __esm({
  "web/lib/wasm/jsep/webnn/tensor-manager.ts"() {
    "use strict";
    init_wasm_common();
    init_log();
    webnnDataTypeToSize = /* @__PURE__ */ new Map([
      ["float32", 32],
      ["float16", 16],
      ["int32", 32],
      ["uint32", 32],
      ["int64", 64],
      ["uint64", 64],
      ["int8", 8],
      ["uint8", 8],
      ["int4", 4],
      ["uint4", 4]
    ]);
    convertDataToInt32 = (data, dataType) => {
      if (dataType === "int32") {
        return data;
      }
      const dataTypeSize = webnnDataTypeToSize.get(dataType);
      if (!dataTypeSize) {
        throw new Error(`WebNN backend does not support data type: ${dataType}`);
      }
      const bytesPerElement = dataTypeSize / 8;
      if (data.byteLength % bytesPerElement !== 0) {
        throw new Error(`Invalid Uint8Array length - must be a multiple of ${bytesPerElement}.`);
      }
      const numElements = data.byteLength / bytesPerElement;
      const originalArray = new (tensorTypeToTypedArrayConstructor(dataType))(
        data.buffer,
        data.byteOffset,
        numElements
      );
      switch (dataType) {
        case "int64":
        case "uint64": {
          const int32Array = new Int32Array(numElements);
          for (let i = 0; i < numElements; i++) {
            const value = originalArray[i];
            if (value > 2147483647n || value < -2147483648n) {
              throw new Error(`Can not convert int64 data to int32 - value out of range.`);
            }
            int32Array[i] = Number(value);
          }
          return new Uint8Array(int32Array.buffer);
        }
        case "int8":
        case "uint8":
        case "uint32": {
          if (dataType === "uint32") {
            if (originalArray.some((value) => value > 2147483647)) {
              throw new Error(`Can not convert uint32 data to int32 - value out of range.`);
            }
          }
          const int32Array = Int32Array.from(originalArray, Number);
          return new Uint8Array(int32Array.buffer);
        }
        default:
          throw new Error(`Unsupported data conversion from ${dataType} to 'int32'`);
      }
    };
    convertInt32ToData = (data, dataType) => {
      if (dataType === "int32") {
        return data;
      }
      if (data.byteLength % 4 !== 0) {
        throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
      }
      const numElements = data.byteLength / 4;
      const int32Array = new Int32Array(data.buffer, data.byteOffset, numElements);
      switch (dataType) {
        case "int64": {
          const bigInt64Array = BigInt64Array.from(int32Array, BigInt);
          return new Uint8Array(bigInt64Array.buffer);
        }
        case "uint64": {
          if (int32Array.some((value) => value < 0)) {
            throw new Error("Can not convert int32 data to uin64 - negative value found.");
          }
          const bigUint64Array = BigUint64Array.from(int32Array, BigInt);
          return new Uint8Array(bigUint64Array.buffer);
        }
        case "int8": {
          if (int32Array.some((value) => value < -128 || value > 127)) {
            throw new Error("Can not convert int32 data to int8 - value out of range.");
          }
          const int8Array = Int8Array.from(int32Array, Number);
          return new Uint8Array(int8Array.buffer);
        }
        case "uint8": {
          if (int32Array.some((value) => value < 0 || value > 255)) {
            throw new Error("Can not convert int32 data to uint8 - value out of range.");
          }
          return Uint8Array.from(int32Array, Number);
        }
        case "uint32": {
          if (int32Array.some((value) => value < 0)) {
            throw new Error("Can not convert int32 data to uint32 - negative value found.");
          }
          const uint32Array = Uint32Array.from(int32Array, Number);
          return new Uint8Array(uint32Array.buffer);
        }
        default:
          throw new Error(`Unsupported data conversion from 'int32' to ${dataType}`);
      }
    };
    tensorGuid = 1;
    createNewTensorId = () => tensorGuid++;
    webnnDataTypeToFallback = /* @__PURE__ */ new Map([
      ["int8", "int32"],
      ["uint8", "int32"],
      ["uint32", "int32"],
      ["int64", "int32"]
    ]);
    calculateByteLength = (dataType, shape) => {
      const dataTypeSize = webnnDataTypeToSize.get(dataType);
      if (!dataTypeSize) {
        throw new Error(`WebNN backend does not support data type: ${dataType}`);
      }
      return shape.length > 0 ? Math.ceil(shape.reduce((a, b) => a * b) * dataTypeSize / 8) : 0;
    };
    TensorWrapper = class {
      constructor(descriptor) {
        // This flag is used to indicate whether the data has been converted to fallback data type.
        this.isDataConverted = false;
        const { sessionId, context, tensor, dataType, shape, fallbackDataType } = descriptor;
        this.sessionId = sessionId;
        this.mlContext = context;
        this.mlTensor = tensor;
        this.dataType = dataType;
        this.tensorShape = shape;
        this.fallbackDataType = fallbackDataType;
      }
      get tensor() {
        return this.mlTensor;
      }
      get type() {
        return this.dataType;
      }
      get fallbackType() {
        return this.fallbackDataType;
      }
      get shape() {
        return this.tensorShape;
      }
      get byteLength() {
        return calculateByteLength(this.dataType, this.tensorShape);
      }
      destroy() {
        LOG_DEBUG("verbose", () => "[WebNN] TensorWrapper.destroy");
        this.mlTensor.destroy();
      }
      write(data) {
        this.mlContext.writeTensor(this.mlTensor, data);
      }
      async read(dstBuffer) {
        if (this.fallbackDataType) {
          const data = await this.mlContext.readTensor(this.mlTensor);
          const originalData = convertInt32ToData(new Uint8Array(data), this.dataType);
          if (dstBuffer) {
            const targetBuffer = dstBuffer instanceof ArrayBuffer ? new Uint8Array(dstBuffer) : new Uint8Array(dstBuffer.buffer, dstBuffer.byteOffset, dstBuffer.byteLength);
            targetBuffer.set(originalData);
            return void 0;
          } else {
            return new Uint8Array(originalData).buffer;
          }
        } else {
          return dstBuffer ? this.mlContext.readTensor(this.mlTensor, dstBuffer) : this.mlContext.readTensor(this.mlTensor);
        }
      }
      canReuseTensor(context, dataType, shape) {
        return this.mlContext === context && this.dataType === dataType && this.tensorShape.length === shape.length && this.tensorShape.every((v, i) => v === shape[i]);
      }
      setIsDataConverted(isConverted) {
        this.isDataConverted = isConverted;
      }
    };
    TensorIdTracker = class {
      constructor(tensorManager, wrapper) {
        this.tensorManager = tensorManager;
        this.wrapper = wrapper;
      }
      get tensorWrapper() {
        return this.wrapper;
      }
      releaseTensor() {
        if (this.tensorWrapper) {
          this.tensorManager.releaseTensor(this.tensorWrapper);
          this.wrapper = void 0;
        }
      }
      async ensureTensor(sessionId, dataType, shape, copyOld) {
        const context = this.tensorManager.getMLContext(sessionId);
        const opLimits = this.tensorManager.getMLOpSupportLimits(sessionId);
        let fallbackDataType;
        if (!opLimits?.input.dataTypes.includes(dataType)) {
          fallbackDataType = webnnDataTypeToFallback.get(dataType);
          if (!fallbackDataType || opLimits?.input.dataTypes.includes(fallbackDataType)) {
            throw new Error(`WebNN backend does not support data type: ${dataType}`);
          }
          LOG_DEBUG(
            "verbose",
            () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${dataType} to ${fallbackDataType}`
          );
        }
        if (this.wrapper) {
          if (this.wrapper.canReuseTensor(context, dataType, shape)) {
            return this.wrapper.tensor;
          } else {
            if (copyOld) {
              if (this.wrapper.byteLength !== calculateByteLength(dataType, shape)) {
                throw new Error("Unable to copy data to tensor with different size.");
              }
              this.activeUpload = new Uint8Array(await this.wrapper.read());
            }
            this.tensorManager.releaseTensor(this.wrapper);
          }
        }
        const usage = typeof MLTensorUsage == "undefined" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
        this.wrapper = await this.tensorManager.getCachedTensor(
          sessionId,
          dataType,
          shape,
          usage,
          true,
          true,
          fallbackDataType
        );
        if (copyOld && this.activeUpload) {
          this.wrapper.write(this.activeUpload);
          this.activeUpload = void 0;
        }
        return this.wrapper.tensor;
      }
      upload(data) {
        let newData = data;
        if (this.wrapper) {
          if (this.wrapper.fallbackType) {
            if (this.wrapper.fallbackType === "int32") {
              newData = convertDataToInt32(data, this.wrapper.type);
              this.wrapper.setIsDataConverted(true);
            } else {
              throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
            }
          }
          if (data.byteLength === this.wrapper.byteLength) {
            this.wrapper.write(newData);
            return;
          } else {
            LOG_DEBUG("verbose", () => "Data size does not match tensor size. Releasing tensor.");
            this.releaseTensor();
          }
        }
        if (this.activeUpload) {
          this.activeUpload.set(newData);
        } else {
          this.activeUpload = new Uint8Array(newData);
        }
      }
      async download(dstBuffer) {
        if (this.activeUpload) {
          const dstData = this.wrapper?.isDataConverted ? convertInt32ToData(this.activeUpload, this.wrapper?.type) : this.activeUpload;
          if (dstBuffer) {
            if (dstBuffer instanceof ArrayBuffer) {
              new Uint8Array(dstBuffer).set(dstData);
            } else {
              new Uint8Array(dstBuffer.buffer, dstBuffer.byteOffset, dstBuffer.byteLength).set(dstData);
            }
            return;
          } else {
            return dstData.buffer;
          }
        }
        if (!this.wrapper) {
          throw new Error("Tensor has not been created.");
        }
        if (!dstBuffer) {
          return this.wrapper.read();
        }
        return this.wrapper.read(dstBuffer);
      }
    };
    TensorManagerImpl = class {
      constructor(backend) {
        this.backend = backend;
        this.tensorTrackersById = /* @__PURE__ */ new Map();
        this.freeTensors = [];
        this.externalTensors = /* @__PURE__ */ new Set();
      }
      getMLContext(sessionId) {
        const context = this.backend.getMLContext(sessionId);
        if (!context) {
          throw new Error("MLContext not found for session.");
        }
        return context;
      }
      getMLOpSupportLimits(sessionId) {
        return this.backend.getMLOpSupportLimits(sessionId);
      }
      reserveTensorId() {
        const tensorId = createNewTensorId();
        this.tensorTrackersById.set(tensorId, new TensorIdTracker(this));
        return tensorId;
      }
      releaseTensorId(tensorId) {
        const tensorTracker = this.tensorTrackersById.get(tensorId);
        if (!tensorTracker) {
          return;
        }
        this.tensorTrackersById.delete(tensorId);
        if (tensorTracker.tensorWrapper) {
          this.releaseTensor(tensorTracker.tensorWrapper);
        }
      }
      async ensureTensor(sessionId, tensorId, dataType, shape, copyOld) {
        LOG_DEBUG(
          "verbose",
          () => `[WebNN] TensorManager.ensureTensor {tensorId: ${tensorId}, dataType: ${dataType}, shape: ${shape}, copyOld: ${copyOld}}`
        );
        const tensor = this.tensorTrackersById.get(tensorId);
        if (!tensor) {
          throw new Error("Tensor not found.");
        }
        return tensor.ensureTensor(sessionId, dataType, shape, copyOld);
      }
      upload(tensorId, data) {
        const tensor = this.tensorTrackersById.get(tensorId);
        if (!tensor) {
          throw new Error("Tensor not found.");
        }
        tensor.upload(data);
      }
      async download(tensorId, dstBuffer) {
        LOG_DEBUG(
          "verbose",
          () => `[WebNN] TensorManager.download {tensorId: ${tensorId}, dstBuffer: ${dstBuffer?.byteLength}}`
        );
        const tensorTracker = this.tensorTrackersById.get(tensorId);
        if (!tensorTracker) {
          throw new Error("Tensor not found.");
        }
        return tensorTracker.download(dstBuffer);
      }
      releaseTensorsForSession(sessionId) {
        for (const tensor of this.freeTensors) {
          if (tensor.sessionId === sessionId) {
            tensor.destroy();
          }
        }
        this.freeTensors = this.freeTensors.filter((tensor) => tensor.sessionId !== sessionId);
      }
      registerTensor(sessionId, mlTensor, dataType, shape) {
        const context = this.getMLContext(sessionId);
        const tensorId = createNewTensorId();
        const wrapper = new TensorWrapper({
          sessionId,
          context,
          tensor: mlTensor,
          dataType,
          shape
        });
        this.tensorTrackersById.set(tensorId, new TensorIdTracker(this, wrapper));
        this.externalTensors.add(wrapper);
        return tensorId;
      }
      /**
       * Get or create an MLTensor with the given data type and shape.
       */
      async getCachedTensor(sessionId, dataType, shape, usage, writable, readable, fallbackDataType) {
        const context = this.getMLContext(sessionId);
        for (const [index, tensor2] of this.freeTensors.entries()) {
          if (tensor2.canReuseTensor(context, dataType, shape)) {
            LOG_DEBUG(
              "verbose",
              () => `[WebNN] Reusing tensor {dataType: ${dataType}, ${fallbackDataType ? `fallbackDataType: ${fallbackDataType},` : ""} shape: ${shape}`
            );
            const wrapper = this.freeTensors.splice(index, 1)[0];
            wrapper.sessionId = sessionId;
            return wrapper;
          }
        }
        LOG_DEBUG(
          "verbose",
          () => `[WebNN] MLContext.createTensor {dataType: ${dataType}, ${fallbackDataType ? `fallbackDataType: ${fallbackDataType},` : ""} shape: ${shape}}`
        );
        const tensor = await context.createTensor({
          dataType: fallbackDataType ?? dataType,
          // If fallback data type is provided, use it.
          shape,
          dimensions: shape,
          usage,
          writable,
          readable
        });
        return new TensorWrapper({ sessionId, context, tensor, dataType, shape, fallbackDataType });
      }
      /**
       * Release tensor for reuse unless external.
       */
      releaseTensor(tensorWrapper) {
        if (this.externalTensors.has(tensorWrapper)) {
          this.externalTensors.delete(tensorWrapper);
        }
        this.freeTensors.push(tensorWrapper);
      }
    };
    createTensorManager = (...args) => new TensorManagerImpl(...args);
  }
});

// web/lib/wasm/jsep/backend-webnn.ts
var backend_webnn_exports = {};
__export(backend_webnn_exports, {
  WebNNBackend: () => WebNNBackend
});
var onnxDataTypeToWebnnDataType, compareMLContextOptions, WebNNBackend;
var init_backend_webnn = __esm({
  "web/lib/wasm/jsep/backend-webnn.ts"() {
    "use strict";
    init_wasm_common();
    init_wasm_factory();
    init_tensor_view();
    init_tensor_manager();
    init_log();
    onnxDataTypeToWebnnDataType = /* @__PURE__ */ new Map([
      [1 /* float */, "float32"],
      [10 /* float16 */, "float16"],
      [6 /* int32 */, "int32"],
      [12 /* uint32 */, "uint32"],
      [7 /* int64 */, "int64"],
      [13 /* uint64 */, "uint64"],
      [22 /* int4 */, "int4"],
      [21 /* uint4 */, "uint4"],
      [3 /* int8 */, "int8"],
      [2 /* uint8 */, "uint8"],
      [9 /* bool */, "uint8"]
    ]);
    compareMLContextOptions = (a, b) => {
      if (a === b) {
        return true;
      }
      if (a === void 0 || b === void 0) {
        return false;
      }
      const aKeys = Object.keys(a).sort();
      const bKeys = Object.keys(b).sort();
      return aKeys.length === bKeys.length && aKeys.every((key, index) => key === bKeys[index] && a[key] === b[key]);
    };
    WebNNBackend = class {
      constructor(env3) {
        /**
         * Tensor managers for each session.
         */
        this.tensorManager = createTensorManager(this);
        /**
         * Maps from session id to MLContexts.
         */
        this.mlContextBySessionId = /* @__PURE__ */ new Map();
        /**
         * Maps from MLContext to session ids.
         */
        this.sessionIdsByMLContext = /* @__PURE__ */ new Map();
        /**
         * Cache of MLContexts.
         */
        this.mlContextCache = [];
        /**
         * Maps from session id to list of graph inputs.
         */
        this.sessionGraphInputs = /* @__PURE__ */ new Map();
        /**
         * Maps from session id to list of graph outputs.
         */
        this.sessionGraphOutputs = /* @__PURE__ */ new Map();
        /**
         * Temporary graph inputs for the current session.
         * These inputs will be registered when the session is created.
         */
        this.temporaryGraphInputs = [];
        /**
         * Temporary graph outputs for the current session.
         * These outputs will be registered when the session is created.
         */
        this.temporaryGraphOutputs = [];
        /**
         * Temporary tensors for the current session.
         */
        this.temporarySessionTensorIds = /* @__PURE__ */ new Map();
        /**
         * Maps from session id to MLOpSupportLimits.
         */
        this.mlOpSupportLimitsBySessionId = /* @__PURE__ */ new Map();
        configureLogger(env3.logLevel, !!env3.debug);
      }
      get currentSessionId() {
        if (this.activeSessionId === void 0) {
          throw new Error("No active session");
        }
        return this.activeSessionId;
      }
      onRunStart(sessionId) {
        LOG_DEBUG("verbose", () => `[WebNN] onRunStart {sessionId: ${sessionId}}`);
        this.activeSessionId = sessionId;
      }
      onRunEnd(sessionId) {
        LOG_DEBUG("verbose", () => `[WebNN] onRunEnd {sessionId: ${sessionId}}`);
        const tensorIds = this.temporarySessionTensorIds.get(sessionId);
        if (!tensorIds) {
          return;
        }
        for (const tensorId of tensorIds) {
          LOG_DEBUG("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${tensorId}}`);
          this.tensorManager.releaseTensorId(tensorId);
        }
        this.temporarySessionTensorIds.delete(sessionId);
        this.activeSessionId = void 0;
      }
      async createMLContext(optionsOrDevice) {
        if (optionsOrDevice instanceof GPUDevice) {
          const mlContextIndex2 = this.mlContextCache.findIndex((entry) => entry.gpuDevice === optionsOrDevice);
          if (mlContextIndex2 !== -1) {
            return this.mlContextCache[mlContextIndex2].mlContext;
          } else {
            const mlContext = await navigator.ml.createContext(optionsOrDevice);
            this.mlContextCache.push({ gpuDevice: optionsOrDevice, mlContext });
            return mlContext;
          }
        } else if (optionsOrDevice === void 0) {
          const mlContextIndex2 = this.mlContextCache.findIndex(
            (entry) => entry.options === void 0 && entry.gpuDevice === void 0
          );
          if (mlContextIndex2 !== -1) {
            return this.mlContextCache[mlContextIndex2].mlContext;
          } else {
            const mlContext = await navigator.ml.createContext();
            this.mlContextCache.push({ mlContext });
            return mlContext;
          }
        }
        const mlContextIndex = this.mlContextCache.findIndex(
          (entry) => compareMLContextOptions(entry.options, optionsOrDevice)
        );
        if (mlContextIndex !== -1) {
          return this.mlContextCache[mlContextIndex].mlContext;
        } else {
          const mlContext = await navigator.ml.createContext(optionsOrDevice);
          this.mlContextCache.push({ options: optionsOrDevice, mlContext });
          return mlContext;
        }
      }
      registerMLContext(sessionId, mlContext) {
        this.mlContextBySessionId.set(sessionId, mlContext);
        let sessionIds = this.sessionIdsByMLContext.get(mlContext);
        if (!sessionIds) {
          sessionIds = /* @__PURE__ */ new Set();
          this.sessionIdsByMLContext.set(mlContext, sessionIds);
        }
        sessionIds.add(sessionId);
        if (!this.mlOpSupportLimitsBySessionId.has(sessionId)) {
          this.mlOpSupportLimitsBySessionId.set(sessionId, mlContext.opSupportLimits());
        }
        if (this.temporaryGraphInputs.length > 0) {
          this.sessionGraphInputs.set(sessionId, this.temporaryGraphInputs);
          this.temporaryGraphInputs = [];
        }
        if (this.temporaryGraphOutputs.length > 0) {
          this.sessionGraphOutputs.set(sessionId, this.temporaryGraphOutputs);
          this.temporaryGraphOutputs = [];
        }
      }
      onReleaseSession(sessionId) {
        this.sessionGraphInputs.delete(sessionId);
        this.sessionGraphOutputs.delete(sessionId);
        const mlContext = this.mlContextBySessionId.get(sessionId);
        if (!mlContext) {
          return;
        }
        this.tensorManager.releaseTensorsForSession(sessionId);
        this.mlContextBySessionId.delete(sessionId);
        this.mlOpSupportLimitsBySessionId.delete(sessionId);
        const sessionIds = this.sessionIdsByMLContext.get(mlContext);
        sessionIds.delete(sessionId);
        if (sessionIds.size === 0) {
          this.sessionIdsByMLContext.delete(mlContext);
          const mlContextIndex = this.mlContextCache.findIndex((entry) => entry.mlContext === mlContext);
          if (mlContextIndex !== -1) {
            this.mlContextCache.splice(mlContextIndex, 1);
          }
        }
      }
      getMLContext(sessionId) {
        return this.mlContextBySessionId.get(sessionId);
      }
      getMLOpSupportLimits(sessionId) {
        return this.mlOpSupportLimitsBySessionId.get(sessionId);
      }
      reserveTensorId() {
        return this.tensorManager.reserveTensorId();
      }
      releaseTensorId(tensorId) {
        LOG_DEBUG("verbose", () => `[WebNN] releaseTensorId {tensorId: ${tensorId}}`);
        this.tensorManager.releaseTensorId(tensorId);
      }
      async ensureTensor(sessionId, tensorId, onnxDataType, dimensions, copyOld) {
        const webnnDataType = onnxDataTypeToWebnnDataType.get(onnxDataType);
        if (!webnnDataType) {
          throw new Error(`Unsupported ONNX data type: ${onnxDataType}`);
        }
        return this.tensorManager.ensureTensor(
          sessionId ?? this.currentSessionId,
          tensorId,
          webnnDataType,
          dimensions,
          copyOld
        );
      }
      async createTemporaryTensor(sessionId, onnxDataType, shape) {
        LOG_DEBUG("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${onnxDataType}, shape: ${shape}}`);
        const dataType = onnxDataTypeToWebnnDataType.get(onnxDataType);
        if (!dataType) {
          throw new Error(`Unsupported ONNX data type: ${onnxDataType}`);
        }
        const tensorId = this.tensorManager.reserveTensorId();
        await this.tensorManager.ensureTensor(sessionId, tensorId, dataType, shape, false);
        const tensorIds = this.temporarySessionTensorIds.get(sessionId);
        if (!tensorIds) {
          this.temporarySessionTensorIds.set(sessionId, [tensorId]);
        } else {
          tensorIds.push(tensorId);
        }
        return tensorId;
      }
      uploadTensor(tensorId, data) {
        const wasm2 = getInstance();
        if (!wasm2.shouldTransferToMLTensor) {
          throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
        }
        LOG_DEBUG("verbose", () => `[WebNN] uploadTensor {tensorId: ${tensorId}, data: ${data.byteLength}}`);
        this.tensorManager.upload(tensorId, data);
      }
      async downloadTensor(tensorId, dstBuffer) {
        return this.tensorManager.download(tensorId, dstBuffer);
      }
      createMLTensorDownloader(tensorId, type) {
        return async () => {
          const data = await this.tensorManager.download(tensorId);
          return createView(data, type);
        };
      }
      registerMLTensor(sessionId, tensor, onnxDataType, dimensions) {
        const webnnDataType = onnxDataTypeToWebnnDataType.get(onnxDataType);
        if (!webnnDataType) {
          throw new Error(`Unsupported ONNX data type: ${onnxDataType}`);
        }
        const id = this.tensorManager.registerTensor(sessionId, tensor, webnnDataType, dimensions);
        LOG_DEBUG(
          "verbose",
          () => `[WebNN] registerMLTensor {tensor: ${tensor}, dataType: ${webnnDataType}, dimensions: ${dimensions}} -> {tensorId: ${id}}`
        );
        return id;
      }
      // Register a WebNN Constant operand from external data.
      registerMLConstant(externalFilePath, dataOffset, dataLength, builder, desc, mountedFiles, shouldConvertInt64ToInt32 = false) {
        if (!mountedFiles) {
          throw new Error("External mounted files are not available.");
        }
        let filePath = externalFilePath;
        if (externalFilePath.startsWith("./")) {
          filePath = externalFilePath.substring(2);
        }
        const fileData = mountedFiles.get(filePath);
        if (!fileData) {
          throw new Error(`File with name ${filePath} not found in preloaded files.`);
        }
        if (dataOffset + dataLength > fileData.byteLength) {
          throw new Error("Out of bounds: data offset and length exceed the external file data size.");
        }
        const buffer = fileData.slice(dataOffset, dataOffset + dataLength).buffer;
        let bufferView;
        switch (desc.dataType) {
          case "float32":
            bufferView = new Float32Array(buffer);
            break;
          case "float16":
            bufferView = typeof Float16Array !== "undefined" ? new Float16Array(buffer) : new Uint16Array(buffer);
            break;
          case "int32":
            bufferView = new Int32Array(buffer);
            break;
          case "uint32":
            bufferView = new Uint32Array(buffer);
            break;
          case "int64":
            if (shouldConvertInt64ToInt32) {
              const int32Buffer = convertDataToInt32(new Uint8Array(buffer), "int64");
              bufferView = new Int32Array(int32Buffer.buffer);
              desc.dataType = "int32";
            } else {
              bufferView = new BigInt64Array(buffer);
            }
            break;
          case "uint64":
            bufferView = new BigUint64Array(buffer);
            break;
          case "int8":
            bufferView = new Int8Array(buffer);
            break;
          case "int4":
          case "uint4":
          case "uint8":
            bufferView = new Uint8Array(buffer);
            break;
          default:
            throw new Error(`Unsupported data type: ${desc.dataType} in creating WebNN Constant from external data.`);
        }
        LOG_DEBUG(
          "verbose",
          () => `[WebNN] registerMLConstant {dataType: ${desc.dataType}, shape: ${desc.shape}}} ${shouldConvertInt64ToInt32 ? "(Note: it was int64 data type and registered to int32 as workaround)" : ""}`
        );
        return builder.constant(desc, bufferView);
      }
      registerGraphInput(inputName) {
        this.temporaryGraphInputs.push(inputName);
      }
      registerGraphOutput(outputName) {
        this.temporaryGraphOutputs.push(outputName);
      }
      isGraphInput(sessionId, inputName) {
        const inputNames = this.sessionGraphInputs.get(sessionId);
        if (!inputNames) {
          return false;
        }
        return inputNames.includes(inputName);
      }
      isGraphOutput(sessionId, outputName) {
        const outputNames = this.sessionGraphOutputs.get(sessionId);
        if (!outputNames) {
          return false;
        }
        return outputNames.includes(outputName);
      }
      isGraphInputOutputTypeSupported(sessionId, type, isInput = true) {
        const dataType = onnxDataTypeToWebnnDataType.get(tensorDataTypeStringToEnum(type));
        const opLimits = this.mlOpSupportLimitsBySessionId.get(sessionId);
        if (typeof dataType === "undefined") {
          return false;
        }
        if (isInput) {
          return !!opLimits?.input.dataTypes.includes(dataType);
        } else {
          return !!opLimits?.output.dataTypes.includes(dataType);
        }
      }
      flush() {
      }
    };
  }
});

// web/lib/wasm/wasm-core-impl.ts
var initOrt, initRuntime, initEp, activeSessions, getSessionInputOutputCount, getSessionInputOutputMetadata, copyFromExternalBuffer, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling, extractTransferableBuffers;
var init_wasm_core_impl = __esm({
  "web/lib/wasm/wasm-core-impl.ts"() {
    "use strict";
    init_esm();
    init_run_options();
    init_session_options();
    init_wasm_common();
    init_wasm_factory();
    init_wasm_utils();
    init_wasm_utils_load_file();
    initOrt = (numThreads, loggingLevel) => {
      const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
      if (errorCode !== 0) {
        checkLastError("Can't initialize onnxruntime.");
      }
    };
    initRuntime = async (env3) => {
      initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
    };
    initEp = async (env3, epName) => {
      getInstance().asyncInit?.();
      let webgpuAdapter = env3.webgpu.adapter;
      if (epName === "webgpu") {
        if (typeof navigator === "undefined" || !navigator.gpu) {
          throw new Error("WebGPU is not supported in current environment");
        }
        if (!webgpuAdapter) {
          const powerPreference = env3.webgpu.powerPreference;
          if (powerPreference !== void 0 && powerPreference !== "low-power" && powerPreference !== "high-performance") {
            throw new Error(`Invalid powerPreference setting: "${powerPreference}"`);
          }
          const forceFallbackAdapter = env3.webgpu.forceFallbackAdapter;
          if (forceFallbackAdapter !== void 0 && typeof forceFallbackAdapter !== "boolean") {
            throw new Error(`Invalid forceFallbackAdapter setting: "${forceFallbackAdapter}"`);
          }
          webgpuAdapter = await navigator.gpu.requestAdapter({ powerPreference, forceFallbackAdapter });
          if (!webgpuAdapter) {
            throw new Error(
              'Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.'
            );
          }
        } else {
          if (typeof webgpuAdapter.limits !== "object" || typeof webgpuAdapter.features !== "object" || typeof webgpuAdapter.requestDevice !== "function") {
            throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
          }
        }
      }
      if (epName === "webnn") {
        if (typeof navigator === "undefined" || !navigator.ml) {
          throw new Error("WebNN is not supported in current environment");
        }
      }
      if (false) {
        const initJsep = null.init;
        if (epName === "webgpu") {
          await initJsep("webgpu", getInstance(), env3, webgpuAdapter);
        }
        if (epName === "webnn") {
          await initJsep("webnn", getInstance(), env3);
        }
      } else {
        if (epName === "webgpu") {
          getInstance().webgpuInit((device) => {
            env3.webgpu.device = device;
          });
        }
        if (epName === "webnn") {
          const backend = new (init_backend_webnn(), __toCommonJS(backend_webnn_exports)).WebNNBackend(env3);
          getInstance().webnnInit([
            backend,
            // webnnReserveTensorId
            () => backend.reserveTensorId(),
            // webnnReleaseTensorId,
            (tensorId) => backend.releaseTensorId(tensorId),
            // webnnEnsureTensor
            async (sessionId, tensorId, onnxDataType, shape, copyOld) => backend.ensureTensor(sessionId, tensorId, onnxDataType, shape, copyOld),
            // webnnUploadTensor
            (tensorId, data) => {
              backend.uploadTensor(tensorId, data);
            },
            // webnnDownloadTensor
            async (tensorId, dstBuffer) => backend.downloadTensor(tensorId, dstBuffer),
            // webnnRegisterMLContext
            (sessionId, mlContext) => backend.registerMLContext(sessionId, mlContext),
            // webnnEnableTraceEvent
            !!env3.trace
          ]);
        }
      }
    };
    activeSessions = /* @__PURE__ */ new Map();
    getSessionInputOutputCount = (sessionHandle) => {
      const wasm2 = getInstance();
      const stack = wasm2.stackSave();
      try {
        const ptrSize = wasm2.PTR_SIZE;
        const dataOffset = wasm2.stackAlloc(2 * ptrSize);
        const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + ptrSize);
        if (errorCode !== 0) {
          checkLastError("Can't get session input/output count.");
        }
        const type = ptrSize === 4 ? "i32" : "i64";
        return [Number(wasm2.getValue(dataOffset, type)), Number(wasm2.getValue(dataOffset + ptrSize, type))];
      } finally {
        wasm2.stackRestore(stack);
      }
    };
    getSessionInputOutputMetadata = (sessionHandle, index) => {
      const wasm2 = getInstance();
      const stack = wasm2.stackSave();
      let metadataOffset = 0;
      try {
        const ptrSize = wasm2.PTR_SIZE;
        const dataOffset = wasm2.stackAlloc(2 * ptrSize);
        const errorCode = wasm2._OrtGetInputOutputMetadata(sessionHandle, index, dataOffset, dataOffset + ptrSize);
        if (errorCode !== 0) {
          checkLastError("Can't get session input/output metadata.");
        }
        const nameOffset = Number(wasm2.getValue(dataOffset, "*"));
        metadataOffset = Number(wasm2.getValue(dataOffset + ptrSize, "*"));
        const elementType = wasm2.HEAP32[metadataOffset / 4];
        if (elementType === 0) {
          return [nameOffset, 0];
        }
        const dimsCount = wasm2.HEAPU32[metadataOffset / 4 + 1];
        const dims = [];
        for (let i = 0; i < dimsCount; i++) {
          const symbolicDimNameOffset = Number(wasm2.getValue(metadataOffset + 8 + i * ptrSize, "*"));
          dims.push(
            symbolicDimNameOffset !== 0 ? wasm2.UTF8ToString(symbolicDimNameOffset) : Number(wasm2.getValue(metadataOffset + 8 + (i + dimsCount) * ptrSize, "*"))
          );
        }
        return [nameOffset, elementType, dims];
      } finally {
        wasm2.stackRestore(stack);
        if (metadataOffset !== 0) {
          wasm2._OrtFree(metadataOffset);
        }
      }
    };
    copyFromExternalBuffer = (model) => {
      const wasm2 = getInstance();
      const modelDataOffset = wasm2._malloc(model.byteLength);
      if (modelDataOffset === 0) {
        throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
      }
      wasm2.HEAPU8.set(model, modelDataOffset);
      return [modelDataOffset, model.byteLength];
    };
    createSession = async (modelData, options) => {
      let modelDataOffset, modelDataLength;
      const wasm2 = getInstance();
      if (Array.isArray(modelData)) {
        [modelDataOffset, modelDataLength] = modelData;
      } else if (modelData.buffer === wasm2.HEAPU8.buffer) {
        [modelDataOffset, modelDataLength] = [modelData.byteOffset, modelData.byteLength];
      } else {
        [modelDataOffset, modelDataLength] = copyFromExternalBuffer(modelData);
      }
      let sessionHandle = 0;
      let sessionOptionsHandle = 0;
      let ioBindingHandle = 0;
      let allocs = [];
      const inputNamesUTF8Encoded = [];
      const outputNamesUTF8Encoded = [];
      try {
        [sessionOptionsHandle, allocs] = await setSessionOptions(options);
        if (options?.externalData && wasm2.mountExternalData) {
          const loadingPromises = [];
          for (const file of options.externalData) {
            const path = typeof file === "string" ? file : file.path;
            loadingPromises.push(
              loadFile(typeof file === "string" ? file : file.data).then((data) => {
                wasm2.mountExternalData(path, data);
              })
            );
          }
          await Promise.all(loadingPromises);
        }
        for (const provider of options?.executionProviders ?? []) {
          const providerName = typeof provider === "string" ? provider : provider.name;
          if (providerName === "webnn") {
            wasm2.shouldTransferToMLTensor = false;
            if (typeof provider !== "string") {
              const webnnOptions = provider;
              const context = webnnOptions?.context;
              const gpuDevice = webnnOptions?.gpuDevice;
              const deviceType = webnnOptions?.deviceType;
              const powerPreference = webnnOptions?.powerPreference;
              if (context) {
                wasm2.currentContext = context;
              } else if (gpuDevice) {
                wasm2.currentContext = await wasm2.webnnCreateMLContext(gpuDevice);
              } else {
                wasm2.currentContext = await wasm2.webnnCreateMLContext({ deviceType, powerPreference });
              }
            } else {
              wasm2.currentContext = await wasm2.webnnCreateMLContext();
            }
            break;
          }
        }
        sessionHandle = await wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
        wasm2.webgpuOnCreateSession?.(sessionHandle);
        if (sessionHandle === 0) {
          checkLastError("Can't create a session.");
        }
        wasm2.jsepOnCreateSession?.();
        if (wasm2.currentContext) {
          wasm2.webnnRegisterMLContext(sessionHandle, wasm2.currentContext);
          wasm2.currentContext = void 0;
          wasm2.shouldTransferToMLTensor = true;
        }
        const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
        const enableGraphCapture = !!options?.enableGraphCapture;
        const inputNames = [];
        const outputNames = [];
        const inputMetadata = [];
        const outputMetadata = [];
        const outputPreferredLocations = [];
        for (let i = 0; i < inputCount; i++) {
          const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i);
          if (nameOffset === 0) {
            checkLastError("Can't get an input name.");
          }
          inputNamesUTF8Encoded.push(nameOffset);
          const name = wasm2.UTF8ToString(nameOffset);
          inputNames.push(name);
          inputMetadata.push(
            elementType === 0 ? { name, isTensor: false } : { name, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
          );
        }
        for (let i = 0; i < outputCount; i++) {
          const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i + inputCount);
          if (nameOffset === 0) {
            checkLastError("Can't get an output name.");
          }
          outputNamesUTF8Encoded.push(nameOffset);
          const nameString = wasm2.UTF8ToString(nameOffset);
          outputNames.push(nameString);
          outputMetadata.push(
            elementType === 0 ? { name: nameString, isTensor: false } : { name: nameString, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
          );
          if (true) {
            if (enableGraphCapture && options?.preferredOutputLocation === void 0) {
              outputPreferredLocations.push("gpu-buffer");
              continue;
            }
            const location2 = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
            const isGraphOutput = wasm2.webnnIsGraphOutput;
            if (location2 === "cpu" && isGraphOutput && isGraphOutput(sessionHandle, nameString)) {
              outputPreferredLocations.push("ml-tensor-cpu-output");
              continue;
            }
            if (location2 !== "cpu" && location2 !== "cpu-pinned" && location2 !== "gpu-buffer" && location2 !== "ml-tensor") {
              throw new Error(`Not supported preferred output location: ${location2}.`);
            }
            if (enableGraphCapture && location2 !== "gpu-buffer") {
              throw new Error(
                `Not supported preferred output location: ${location2}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`
              );
            }
            outputPreferredLocations.push(location2);
          }
        }
        let bindingState = null;
        if (outputPreferredLocations.some((l) => l === "gpu-buffer" || l === "ml-tensor" || l === "ml-tensor-cpu-output")) {
          ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);
          if (ioBindingHandle === 0) {
            checkLastError("Can't create IO binding.");
          }
          bindingState = {
            handle: ioBindingHandle,
            outputPreferredLocations,
            outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => l === "ml-tensor-cpu-output" ? "ml-tensor" : l).map((l) => dataLocationStringToEnum(l))
          };
        }
        activeSessions.set(sessionHandle, [
          sessionHandle,
          inputNamesUTF8Encoded,
          outputNamesUTF8Encoded,
          bindingState,
          enableGraphCapture,
          false
        ]);
        return [sessionHandle, inputNames, outputNames, inputMetadata, outputMetadata];
      } catch (e) {
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        if (ioBindingHandle !== 0) {
          if (wasm2._OrtReleaseBinding(ioBindingHandle) !== 0) {
            checkLastError("Can't release IO binding.");
          }
        }
        if (sessionHandle !== 0) {
          if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
            checkLastError("Can't release session.");
          }
        }
        throw e;
      } finally {
        wasm2._free(modelDataOffset);
        if (sessionOptionsHandle !== 0) {
          if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
            checkLastError("Can't release session options.");
          }
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
        wasm2.unmountExternalData?.();
      }
    };
    releaseSession = (sessionId) => {
      const wasm2 = getInstance();
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`cannot release session. invalid session id: ${sessionId}`);
      }
      const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState, enableGraphCapture] = session;
      if (ioBindingState) {
        if (enableGraphCapture) {
          if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
            checkLastError("Can't clear bound outputs.");
          }
        }
        if (wasm2._OrtReleaseBinding(ioBindingState.handle) !== 0) {
          checkLastError("Can't release IO binding.");
        }
      }
      wasm2.jsepOnReleaseSession?.(sessionId);
      wasm2.webnnOnReleaseSession?.(sessionId);
      wasm2.webgpuOnReleaseSession?.(sessionId);
      inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
      outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
      if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
        checkLastError("Can't release session.");
      }
      activeSessions.delete(sessionId);
    };
    prepareInputOutputTensor = async (tensor, tensorHandles, allocs, sessionId, tensorNameUTF8Encoded, index, enableGraphCapture = false) => {
      if (!tensor) {
        tensorHandles.push(0);
        return;
      }
      const wasm2 = getInstance();
      const ptrSize = wasm2.PTR_SIZE;
      const dataType = tensor[0];
      const dims = tensor[1];
      const location2 = tensor[3];
      let actualLocation = location2;
      let rawData;
      let dataByteLength;
      if (dataType === "string" && (location2 === "gpu-buffer" || location2 === "ml-tensor")) {
        throw new Error("String tensor is not supported on GPU.");
      }
      if (enableGraphCapture && location2 !== "gpu-buffer") {
        throw new Error(
          `External buffer must be provided for input/output index ${index} when enableGraphCapture is true.`
        );
      }
      if (location2 === "gpu-buffer") {
        const gpuBuffer = tensor[2].gpuBuffer;
        dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
        if (true) {
          const registerBuffer = wasm2.webgpuRegisterBuffer;
          if (!registerBuffer) {
            throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
          }
          rawData = registerBuffer(gpuBuffer, sessionId);
        } else {
          const registerBuffer = wasm2.jsepRegisterBuffer;
          if (!registerBuffer) {
            throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
          }
          rawData = registerBuffer(sessionId, index, gpuBuffer, dataByteLength);
        }
      } else if (location2 === "ml-tensor") {
        const mlTensor = tensor[2].mlTensor;
        dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
        const registerMLTensor = wasm2.webnnRegisterMLTensor;
        if (!registerMLTensor) {
          throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
        }
        rawData = registerMLTensor(sessionId, mlTensor, tensorDataTypeStringToEnum(dataType), dims);
      } else {
        const data = tensor[2];
        if (Array.isArray(data)) {
          dataByteLength = ptrSize * data.length;
          rawData = wasm2._malloc(dataByteLength);
          allocs.push(rawData);
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i] !== "string") {
              throw new TypeError(`tensor data at index ${i} is not a string`);
            }
            wasm2.setValue(rawData + i * ptrSize, allocWasmString(data[i], allocs), "*");
          }
        } else {
          const isGraphInput = wasm2.webnnIsGraphInput;
          const isGraphOutput = wasm2.webnnIsGraphOutput;
          if (dataType !== "string" && isGraphInput && isGraphOutput) {
            const tensorName = wasm2.UTF8ToString(tensorNameUTF8Encoded);
            if (isGraphInput(sessionId, tensorName) || isGraphOutput(sessionId, tensorName)) {
              const dataTypeEnum = tensorDataTypeStringToEnum(dataType);
              dataByteLength = calculateTensorSizeInBytes(dataTypeEnum, dims);
              actualLocation = "ml-tensor";
              const createTemporaryTensor = wasm2.webnnCreateTemporaryTensor;
              const uploadTensor = wasm2.webnnUploadTensor;
              if (!createTemporaryTensor || !uploadTensor) {
                throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
              }
              const tensorId = await createTemporaryTensor(sessionId, dataTypeEnum, dims);
              uploadTensor(tensorId, new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
              rawData = tensorId;
            } else {
              dataByteLength = data.byteLength;
              rawData = wasm2._malloc(dataByteLength);
              allocs.push(rawData);
              wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
            }
          } else {
            dataByteLength = data.byteLength;
            rawData = wasm2._malloc(dataByteLength);
            allocs.push(rawData);
            wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
          }
        }
      }
      const stack = wasm2.stackSave();
      const dimsOffset = wasm2.stackAlloc(4 * dims.length);
      try {
        dims.forEach((d, index2) => wasm2.setValue(dimsOffset + index2 * ptrSize, d, ptrSize === 4 ? "i32" : "i64"));
        const tensor2 = wasm2._OrtCreateTensor(
          tensorDataTypeStringToEnum(dataType),
          rawData,
          dataByteLength,
          dimsOffset,
          dims.length,
          dataLocationStringToEnum(actualLocation)
        );
        if (tensor2 === 0) {
          checkLastError(`Can't create tensor for input/output. session=${sessionId}, index=${index}.`);
        }
        tensorHandles.push(tensor2);
      } finally {
        wasm2.stackRestore(stack);
      }
    };
    run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
      const wasm2 = getInstance();
      const ptrSize = wasm2.PTR_SIZE;
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`cannot run inference. invalid session id: ${sessionId}`);
      }
      const sessionHandle = session[0];
      const inputNamesUTF8Encoded = session[1];
      const outputNamesUTF8Encoded = session[2];
      const ioBindingState = session[3];
      const enableGraphCapture = session[4];
      const inputOutputBound = session[5];
      const inputCount = inputIndices.length;
      const outputCount = outputIndices.length;
      let runOptionsHandle = 0;
      let runOptionsAllocs = [];
      const inputTensorHandles = [];
      const outputTensorHandles = [];
      const inputOutputAllocs = [];
      const preAllocatedOutputs = [];
      const beforeRunStack = wasm2.stackSave();
      const inputValuesOffset = wasm2.stackAlloc(inputCount * ptrSize);
      const inputNamesOffset = wasm2.stackAlloc(inputCount * ptrSize);
      const outputValuesOffset = wasm2.stackAlloc(outputCount * ptrSize);
      const outputNamesOffset = wasm2.stackAlloc(outputCount * ptrSize);
      try {
        [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
        TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");
        for (let i = 0; i < inputCount; i++) {
          await prepareInputOutputTensor(
            inputTensors[i],
            inputTensorHandles,
            inputOutputAllocs,
            sessionId,
            inputNamesUTF8Encoded[inputIndices[i]],
            inputIndices[i],
            enableGraphCapture
          );
        }
        for (let i = 0; i < outputCount; i++) {
          await prepareInputOutputTensor(
            outputTensors[i],
            outputTensorHandles,
            inputOutputAllocs,
            sessionId,
            outputNamesUTF8Encoded[outputIndices[i]],
            inputCount + outputIndices[i],
            enableGraphCapture
          );
        }
        TRACE_EVENT_END("wasm prepareInputOutputTensor");
        for (let i = 0; i < inputCount; i++) {
          wasm2.setValue(inputValuesOffset + i * ptrSize, inputTensorHandles[i], "*");
          wasm2.setValue(inputNamesOffset + i * ptrSize, inputNamesUTF8Encoded[inputIndices[i]], "*");
        }
        for (let i = 0; i < outputCount; i++) {
          wasm2.setValue(outputValuesOffset + i * ptrSize, outputTensorHandles[i], "*");
          wasm2.setValue(outputNamesOffset + i * ptrSize, outputNamesUTF8Encoded[outputIndices[i]], "*");
        }
        if (ioBindingState && !inputOutputBound) {
          const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
          if (inputNamesUTF8Encoded.length !== inputCount) {
            throw new Error(
              `input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`
            );
          }
          TRACE_EVENT_BEGIN("wasm bindInputsOutputs");
          for (let i = 0; i < inputCount; i++) {
            const index = inputIndices[i];
            const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);
            if (errorCode2 !== 0) {
              checkLastError(`Can't bind input[${i}] for session=${sessionId}.`);
            }
          }
          for (let i = 0; i < outputCount; i++) {
            const index = outputIndices[i];
            const location2 = outputTensors[i]?.[3];
            if (location2) {
              preAllocatedOutputs.push(outputTensorHandles[i]);
              const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind pre-allocated output[${i}] for session=${sessionId}.`);
              }
            } else {
              const errorCode2 = wasm2._OrtBindOutput(
                handle,
                outputNamesUTF8Encoded[index],
                0,
                outputPreferredLocationsEncoded[index]
              );
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
              }
            }
          }
          TRACE_EVENT_END("wasm bindInputsOutputs");
          activeSessions.set(sessionId, [
            sessionHandle,
            inputNamesUTF8Encoded,
            outputNamesUTF8Encoded,
            ioBindingState,
            enableGraphCapture,
            true
          ]);
        }
        wasm2.jsepOnRunStart?.(sessionHandle);
        wasm2.webnnOnRunStart?.(sessionHandle);
        let errorCode;
        if (ioBindingState) {
          errorCode = await wasm2._OrtRunWithBinding(
            sessionHandle,
            ioBindingState.handle,
            outputCount,
            outputValuesOffset,
            runOptionsHandle
          );
        } else {
          errorCode = await wasm2._OrtRun(
            sessionHandle,
            inputNamesOffset,
            inputValuesOffset,
            inputCount,
            outputNamesOffset,
            outputCount,
            outputValuesOffset,
            runOptionsHandle
          );
        }
        if (errorCode !== 0) {
          checkLastError("failed to call OrtRun().");
        }
        const output = [];
        const outputPromises = [];
        TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");
        for (let i = 0; i < outputCount; i++) {
          const tensor = Number(wasm2.getValue(outputValuesOffset + i * ptrSize, "*"));
          if (tensor === outputTensorHandles[i] || preAllocatedOutputs.includes(outputTensorHandles[i])) {
            output.push(outputTensors[i]);
            if (tensor !== outputTensorHandles[i]) {
              if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                checkLastError("Can't release tensor.");
              }
            }
            continue;
          }
          const beforeGetTensorDataStack = wasm2.stackSave();
          const tensorDataOffset = wasm2.stackAlloc(4 * ptrSize);
          let keepOutputTensor = false;
          let type, dataOffset = 0;
          try {
            const errorCode2 = wasm2._OrtGetTensorData(
              tensor,
              tensorDataOffset,
              tensorDataOffset + ptrSize,
              tensorDataOffset + 2 * ptrSize,
              tensorDataOffset + 3 * ptrSize
            );
            if (errorCode2 !== 0) {
              checkLastError(`Can't access output tensor data on index ${i}.`);
            }
            const valueType = ptrSize === 4 ? "i32" : "i64";
            const dataType = Number(wasm2.getValue(tensorDataOffset, valueType));
            dataOffset = wasm2.getValue(tensorDataOffset + ptrSize, "*");
            const dimsOffset = wasm2.getValue(tensorDataOffset + ptrSize * 2, "*");
            const dimsLength = Number(wasm2.getValue(tensorDataOffset + ptrSize * 3, valueType));
            const dims = [];
            for (let i2 = 0; i2 < dimsLength; i2++) {
              dims.push(Number(wasm2.getValue(dimsOffset + i2 * ptrSize, valueType)));
            }
            if (wasm2._OrtFree(dimsOffset) !== 0) {
              checkLastError("Can't free memory for tensor dims.");
            }
            const size = dims.reduce((a, b) => a * b, 1);
            type = tensorDataTypeEnumToString(dataType);
            const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
            if (type === "string") {
              if (preferredLocation === "gpu-buffer" || preferredLocation === "ml-tensor") {
                throw new Error("String tensor is not supported on GPU.");
              }
              const stringData = [];
              for (let i2 = 0; i2 < size; i2++) {
                const offset = wasm2.getValue(dataOffset + i2 * ptrSize, "*");
                const nextOffset = wasm2.getValue(dataOffset + (i2 + 1) * ptrSize, "*");
                const maxBytesToRead = i2 === size - 1 ? void 0 : nextOffset - offset;
                stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
              }
              output.push([type, dims, stringData, "cpu"]);
            } else {
              if (preferredLocation === "gpu-buffer" && size > 0) {
                const getBuffer = true ? wasm2.webgpuGetBuffer : wasm2.jsepGetBuffer;
                if (!getBuffer) {
                  throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                }
                const gpuBuffer = getBuffer(dataOffset);
                const bufferSize = calculateTensorSizeInBytes(dataType, size);
                if (bufferSize === void 0 || !isGpuBufferSupportedType(type)) {
                  throw new Error(`Unsupported data type: ${type}`);
                }
                keepOutputTensor = true;
                if (true) {
                  wasm2.webgpuRegisterBuffer(gpuBuffer, sessionId, dataOffset);
                  const downloadDataFunction = wasm2.webgpuCreateDownloader(gpuBuffer, bufferSize, sessionId);
                  output.push([
                    type,
                    dims,
                    {
                      gpuBuffer,
                      download: async () => {
                        const arrayBuffer = await downloadDataFunction();
                        const data = new (tensorTypeToTypedArrayConstructor(type))(arrayBuffer);
                        return data;
                      },
                      dispose: () => {
                        if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                          checkLastError("Can't release tensor.");
                        }
                      }
                    },
                    "gpu-buffer"
                  ]);
                } else {
                  output.push([
                    type,
                    dims,
                    {
                      gpuBuffer,
                      download: wasm2.jsepCreateDownloader(gpuBuffer, bufferSize, type),
                      dispose: () => {
                        if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                          checkLastError("Can't release tensor.");
                        }
                      }
                    },
                    "gpu-buffer"
                  ]);
                }
              } else if (preferredLocation === "ml-tensor" && size > 0) {
                const ensureTensor = wasm2.webnnEnsureTensor;
                const isGraphInputOutputTypeSupported = wasm2.webnnIsGraphInputOutputTypeSupported;
                if (!ensureTensor || !isGraphInputOutputTypeSupported) {
                  throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                }
                const tensorSize = calculateTensorSizeInBytes(dataType, size);
                if (tensorSize === void 0 || !isMLTensorSupportedType(type)) {
                  throw new Error(`Unsupported data type: ${type}`);
                }
                if (!isGraphInputOutputTypeSupported(sessionId, type, false)) {
                  throw new Error(
                    `preferredLocation "ml-tensor" for ${type} output is not supported by current WebNN Context.`
                  );
                }
                const mlTensor = await ensureTensor(sessionId, dataOffset, dataType, dims, false);
                keepOutputTensor = true;
                output.push([
                  type,
                  dims,
                  {
                    mlTensor,
                    download: wasm2.webnnCreateMLTensorDownloader(dataOffset, type),
                    dispose: () => {
                      wasm2.webnnReleaseTensorId(dataOffset);
                      wasm2._OrtReleaseTensor(tensor);
                    }
                  },
                  "ml-tensor"
                ]);
              } else if (preferredLocation === "ml-tensor-cpu-output" && size > 0) {
                const data = wasm2.webnnCreateMLTensorDownloader(dataOffset, type)();
                const index = output.length;
                keepOutputTensor = true;
                outputPromises.push(
                  (async () => {
                    const result = [index, await data];
                    wasm2.webnnReleaseTensorId(dataOffset);
                    wasm2._OrtReleaseTensor(tensor);
                    return result;
                  })()
                );
                output.push([type, dims, [], "cpu"]);
              } else {
                const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                const data = new typedArrayConstructor(size);
                new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(
                  wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength)
                );
                output.push([type, dims, data, "cpu"]);
              }
            }
          } finally {
            wasm2.stackRestore(beforeGetTensorDataStack);
            if (type === "string" && dataOffset) {
              wasm2._free(dataOffset);
            }
            if (!keepOutputTensor) {
              wasm2._OrtReleaseTensor(tensor);
            }
          }
        }
        if (ioBindingState && !enableGraphCapture) {
          if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
            checkLastError("Can't clear bound outputs.");
          }
          activeSessions.set(sessionId, [
            sessionHandle,
            inputNamesUTF8Encoded,
            outputNamesUTF8Encoded,
            ioBindingState,
            enableGraphCapture,
            false
          ]);
        }
        for (const [index, data] of await Promise.all(outputPromises)) {
          output[index][2] = data;
        }
        TRACE_EVENT_END("wasm ProcessOutputTensor");
        return output;
      } finally {
        wasm2.webnnOnRunEnd?.(sessionHandle);
        wasm2.stackRestore(beforeRunStack);
        if (true) {
          inputTensors.forEach((t) => {
            if (t && t[3] === "gpu-buffer") {
              wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
            }
          });
          outputTensors.forEach((t) => {
            if (t && t[3] === "gpu-buffer") {
              wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
            }
          });
        }
        inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
        outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
        inputOutputAllocs.forEach((p) => wasm2._free(p));
        if (runOptionsHandle !== 0) {
          wasm2._OrtReleaseRunOptions(runOptionsHandle);
        }
        runOptionsAllocs.forEach((p) => wasm2._free(p));
      }
    };
    endProfiling = (sessionId) => {
      const wasm2 = getInstance();
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error("invalid session id");
      }
      const sessionHandle = session[0];
      const profileFileName = wasm2._OrtEndProfiling(sessionHandle);
      if (profileFileName === 0) {
        checkLastError("Can't get an profile file name.");
      }
      wasm2._OrtFree(profileFileName);
    };
    extractTransferableBuffers = (tensors) => {
      const buffers = [];
      for (const tensor of tensors) {
        const data = tensor[2];
        if (!Array.isArray(data) && "buffer" in data) {
          buffers.push(data.buffer);
        }
      }
      return buffers;
    };
  }
});

// web/lib/wasm/proxy-wrapper.ts
var isProxy, proxyWorker, initializing2, initialized2, aborted2, temporaryObjectUrl, initWasmCallbacks, queuedCallbacks, enqueueCallbacks, ensureWorker, onProxyWorkerMessage, initializeWebAssemblyAndOrtRuntime, initializeOrtEp, copyFromExternalBuffer2, createSession2, releaseSession2, run2, endProfiling2;
var init_proxy_wrapper = __esm({
  "web/lib/wasm/proxy-wrapper.ts"() {
    "use strict";
    init_esm();
    init_wasm_core_impl();
    init_wasm_factory();
    init_wasm_utils_import();
    isProxy = () => !!env2.wasm.proxy && typeof document !== "undefined";
    initializing2 = false;
    initialized2 = false;
    aborted2 = false;
    queuedCallbacks = /* @__PURE__ */ new Map();
    enqueueCallbacks = (type, callbacks) => {
      const queue = queuedCallbacks.get(type);
      if (queue) {
        queue.push(callbacks);
      } else {
        queuedCallbacks.set(type, [callbacks]);
      }
    };
    ensureWorker = () => {
      if (initializing2 || !initialized2 || aborted2 || !proxyWorker) {
        throw new Error("worker not ready");
      }
    };
    onProxyWorkerMessage = (ev) => {
      switch (ev.data.type) {
        case "init-wasm":
          initializing2 = false;
          if (ev.data.err) {
            aborted2 = true;
            initWasmCallbacks[1](ev.data.err);
          } else {
            initialized2 = true;
            initWasmCallbacks[0]();
          }
          if (temporaryObjectUrl) {
            URL.revokeObjectURL(temporaryObjectUrl);
            temporaryObjectUrl = void 0;
          }
          break;
        case "init-ep":
        case "copy-from":
        case "create":
        case "release":
        case "run":
        case "end-profiling": {
          const callbacks = queuedCallbacks.get(ev.data.type);
          if (ev.data.err) {
            callbacks.shift()[1](ev.data.err);
          } else {
            callbacks.shift()[0](ev.data.out);
          }
          break;
        }
        default:
      }
    };
    initializeWebAssemblyAndOrtRuntime = async () => {
      if (initialized2) {
        return;
      }
      if (initializing2) {
        throw new Error("multiple calls to 'initWasm()' detected.");
      }
      if (aborted2) {
        throw new Error("previous call to 'initWasm()' failed.");
      }
      initializing2 = true;
      if (isProxy()) {
        return new Promise((resolve, reject) => {
          proxyWorker?.terminate();
          void importProxyWorker().then(([objectUrl, worker]) => {
            try {
              proxyWorker = worker;
              proxyWorker.onerror = (ev) => reject(ev);
              proxyWorker.onmessage = onProxyWorkerMessage;
              initWasmCallbacks = [resolve, reject];
              const message = { type: "init-wasm", in: env2 };
              if (!message.in.wasm.wasmPaths && objectUrl) {
                const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
                if (inferredWasmPathPrefix) {
                  message.in.wasm.wasmPaths = inferredWasmPathPrefix;
                }
              }
              if (false) {
                message.in.wasm.wasmPaths = {
                  wasm: false ? new URL("ort-wasm-simd-threaded.jsep.wasm", import.meta.url).href : false ? new URL("ort-wasm-simd-threaded.jspi.wasm", import.meta.url).href : true ? new URL("ort-wasm-simd-threaded.asyncify.wasm", import.meta.url).href : new URL("ort-wasm-simd-threaded.wasm", import.meta.url).href
                };
              }
              proxyWorker.postMessage(message);
              temporaryObjectUrl = objectUrl;
            } catch (e) {
              reject(e);
            }
          }, reject);
        });
      } else {
        try {
          await initializeWebAssembly(env2.wasm);
          await initRuntime(env2);
          initialized2 = true;
        } catch (e) {
          aborted2 = true;
          throw e;
        } finally {
          initializing2 = false;
        }
      }
    };
    initializeOrtEp = async (epName) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("init-ep", [resolve, reject]);
          const message = { type: "init-ep", in: { epName, env: env2 } };
          proxyWorker.postMessage(message);
        });
      } else {
        await initEp(env2, epName);
      }
    };
    copyFromExternalBuffer2 = async (buffer) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("copy-from", [resolve, reject]);
          const message = { type: "copy-from", in: { buffer } };
          proxyWorker.postMessage(message, [buffer.buffer]);
        });
      } else {
        return copyFromExternalBuffer(buffer);
      }
    };
    createSession2 = async (model, options) => {
      if (isProxy()) {
        if (options?.preferredOutputLocation) {
          throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        }
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("create", [resolve, reject]);
          const message = { type: "create", in: { model, options: { ...options } } };
          const transferable = [];
          if (model instanceof Uint8Array) {
            transferable.push(model.buffer);
          }
          proxyWorker.postMessage(message, transferable);
        });
      } else {
        return createSession(model, options);
      }
    };
    releaseSession2 = async (sessionId) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("release", [resolve, reject]);
          const message = { type: "release", in: sessionId };
          proxyWorker.postMessage(message);
        });
      } else {
        releaseSession(sessionId);
      }
    };
    run2 = async (sessionId, inputIndices, inputs, outputIndices, outputs, options) => {
      if (isProxy()) {
        if (inputs.some((t) => t[3] !== "cpu")) {
          throw new Error("input tensor on GPU is not supported for proxy.");
        }
        if (outputs.some((t) => t)) {
          throw new Error("pre-allocated output tensor is not supported for proxy.");
        }
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("run", [resolve, reject]);
          const serializableInputs = inputs;
          const message = {
            type: "run",
            in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options }
          };
          proxyWorker.postMessage(message, extractTransferableBuffers(serializableInputs));
        });
      } else {
        return run(sessionId, inputIndices, inputs, outputIndices, outputs, options);
      }
    };
    endProfiling2 = async (sessionId) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          enqueueCallbacks("end-profiling", [resolve, reject]);
          const message = { type: "end-profiling", in: sessionId };
          proxyWorker.postMessage(message);
        });
      } else {
        endProfiling(sessionId);
      }
    };
  }
});

// web/lib/wasm/session-handler-inference.ts
var encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
var init_session_handler_inference = __esm({
  "web/lib/wasm/session-handler-inference.ts"() {
    "use strict";
    init_esm();
    init_proxy_wrapper();
    init_wasm_common();
    init_wasm_utils_env();
    init_wasm_utils_load_file();
    encodeTensorMetadata = (tensor, getName) => {
      switch (tensor.location) {
        case "cpu":
          return [tensor.type, tensor.dims, tensor.data, "cpu"];
        case "gpu-buffer":
          return [tensor.type, tensor.dims, { gpuBuffer: tensor.gpuBuffer }, "gpu-buffer"];
        case "ml-tensor":
          return [tensor.type, tensor.dims, { mlTensor: tensor.mlTensor }, "ml-tensor"];
        default:
          throw new Error(`invalid data location: ${tensor.location} for ${getName()}`);
      }
    };
    decodeTensorMetadata = (tensor) => {
      switch (tensor[3]) {
        case "cpu":
          return new Tensor2(tensor[0], tensor[2], tensor[1]);
        case "gpu-buffer": {
          const dataType = tensor[0];
          if (!isGpuBufferSupportedType(dataType)) {
            throw new Error(`not supported data type: ${dataType} for deserializing GPU tensor`);
          }
          const { gpuBuffer, download, dispose } = tensor[2];
          return Tensor2.fromGpuBuffer(gpuBuffer, { dataType, dims: tensor[1], download, dispose });
        }
        case "ml-tensor": {
          const dataType = tensor[0];
          if (!isMLTensorSupportedType(dataType)) {
            throw new Error(`not supported data type: ${dataType} for deserializing MLTensor tensor`);
          }
          const { mlTensor, download, dispose } = tensor[2];
          return Tensor2.fromMLTensor(mlTensor, { dataType, dims: tensor[1], download, dispose });
        }
        default:
          throw new Error(`invalid data location: ${tensor[3]}`);
      }
    };
    OnnxruntimeWebAssemblySessionHandler = class {
      async fetchModelAndCopyToWasmMemory(path) {
        return copyFromExternalBuffer2(await loadFile(path));
      }
      async loadModel(pathOrBuffer, options) {
        TRACE_FUNC_BEGIN();
        let model;
        if (typeof pathOrBuffer === "string") {
          if (isNode) {
            model = await loadFile(pathOrBuffer);
          } else {
            model = await this.fetchModelAndCopyToWasmMemory(pathOrBuffer);
          }
        } else {
          model = pathOrBuffer;
        }
        [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await createSession2(
          model,
          options
        );
        TRACE_FUNC_END();
      }
      async dispose() {
        return releaseSession2(this.sessionId);
      }
      async run(feeds, fetches, options) {
        TRACE_FUNC_BEGIN();
        const inputArray = [];
        const inputIndices = [];
        Object.entries(feeds).forEach((kvp) => {
          const name = kvp[0];
          const tensor = kvp[1];
          const index = this.inputNames.indexOf(name);
          if (index === -1) {
            throw new Error(`invalid input '${name}'`);
          }
          inputArray.push(tensor);
          inputIndices.push(index);
        });
        const outputArray = [];
        const outputIndices = [];
        Object.entries(fetches).forEach((kvp) => {
          const name = kvp[0];
          const tensor = kvp[1];
          const index = this.outputNames.indexOf(name);
          if (index === -1) {
            throw new Error(`invalid output '${name}'`);
          }
          outputArray.push(tensor);
          outputIndices.push(index);
        });
        const inputs = inputArray.map(
          (t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`)
        );
        const outputs = outputArray.map(
          (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
        );
        const results = await run2(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
        const resultMap = {};
        for (let i = 0; i < results.length; i++) {
          resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
        }
        TRACE_FUNC_END();
        return resultMap;
      }
      startProfiling() {
      }
      endProfiling() {
        void endProfiling2(this.sessionId);
      }
    };
  }
});

// web/lib/backend-wasm.ts
var backend_wasm_exports = {};
__export(backend_wasm_exports, {
  OnnxruntimeWebAssemblyBackend: () => OnnxruntimeWebAssemblyBackend,
  initializeFlags: () => initializeFlags,
  wasmBackend: () => wasmBackend
});
var initializeFlags, OnnxruntimeWebAssemblyBackend, wasmBackend;
var init_backend_wasm = __esm({
  "web/lib/backend-wasm.ts"() {
    "use strict";
    init_esm();
    init_proxy_wrapper();
    init_session_handler_inference();
    initializeFlags = () => {
      if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
        env2.wasm.initTimeout = 0;
      }
      const simd = env2.wasm.simd;
      if (typeof simd !== "boolean" && simd !== void 0 && simd !== "fixed" && simd !== "relaxed") {
        console.warn(
          `Property "env.wasm.simd" is set to unknown value "${simd}". Reset it to \`false\` and ignore SIMD feature checking.`
        );
        env2.wasm.simd = false;
      }
      if (typeof env2.wasm.proxy !== "boolean") {
        env2.wasm.proxy = false;
      }
      if (typeof env2.wasm.trace !== "boolean") {
        env2.wasm.trace = false;
      }
      if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
        if (typeof self !== "undefined" && !self.crossOriginIsolated) {
          env2.wasm.numThreads = 1;
        } else {
          const numCpuLogicalCores = typeof navigator === "undefined" ? __require("node:os").cpus().length : navigator.hardwareConcurrency;
          env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
        }
      }
    };
    OnnxruntimeWebAssemblyBackend = class {
      /**
       * This function initializes the WebAssembly backend.
       *
       * This function will be called only once for each backend name. It will be called the first time when
       * `ort.InferenceSession.create()` is called with a registered backend name.
       *
       * @param backendName - the registered backend name.
       */
      async init(backendName) {
        initializeFlags();
        await initializeWebAssemblyAndOrtRuntime();
        await initializeOrtEp(backendName);
      }
      async createInferenceSessionHandler(pathOrBuffer, options) {
        const handler = new OnnxruntimeWebAssemblySessionHandler();
        await handler.loadModel(pathOrBuffer, options);
        return handler;
      }
    };
    wasmBackend = new OnnxruntimeWebAssemblyBackend();
  }
});

// web/lib/index.ts
init_esm();
init_esm();
init_esm();

// web/lib/version.ts
var version2 = "1.28.0";

// web/lib/index.ts
var index_default = esm_exports;
if (false) {
  const onnxjsBackend = null.onnxjsBackend;
  registerBackend("webgl", onnxjsBackend, -10);
}
if (false) {
  throw new Error(
    "The current build is specified to enable both JSEP and WebGPU EP. This is not a valid configuration. JSEP and WebGPU EPs cannot be enabled at the same time."
  );
}
if (false) {
  throw new Error(
    "The current build is specified to enable WebNN EP without JSEP or WebGPU EP. This is not a valid configuration. WebNN EP requires either JSEP or WebGPU EP to be enabled."
  );
}
if (true) {
  const wasmBackend2 = (init_backend_wasm(), __toCommonJS(backend_wasm_exports)).wasmBackend;
  if (true) {
    registerBackend("webgpu", wasmBackend2, 5);
  }
  if (true) {
    registerBackend("webnn", wasmBackend2, 5);
  }
  registerBackend("cpu", wasmBackend2, 10);
  registerBackend("wasm", wasmBackend2, 10);
}
Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
export {
  InferenceSession2 as InferenceSession,
  TRACE,
  TRACE_EVENT_BEGIN,
  TRACE_EVENT_END,
  TRACE_FUNC_BEGIN,
  TRACE_FUNC_END,
  Tensor2 as Tensor,
  index_default as default,
  env2 as env,
  registerBackend
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWVudi50cyIsICIuLi9saWIvd2FzbS9wcm94eS13b3JrZXIvbWFpbi50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50cyIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1sb2FkLWZpbGUudHMiLCAiLi4vbGliL3dhc20vanNlcC90ZW5zb3Itdmlldy50cyIsICIuLi9saWIvd2FzbS9qc2VwL2xvZy50cyIsICIuLi9saWIvd2FzbS9qc2VwL3dlYm5uL3RlbnNvci1tYW5hZ2VyLnRzIiwgIi4uL2xpYi93YXNtL2pzZXAvYmFja2VuZC13ZWJubi50cyIsICIuLi9saWIvd2FzbS93YXNtLWNvcmUtaW1wbC50cyIsICIuLi9saWIvd2FzbS9wcm94eS13cmFwcGVyLnRzIiwgIi4uL2xpYi93YXNtL3Nlc3Npb24taGFuZGxlci1pbmZlcmVuY2UudHMiLCAiLi4vbGliL2JhY2tlbmQtd2FzbS50cyIsICIuLi9saWIvaW5kZXgudHMiLCAiLi4vbGliL3ZlcnNpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcblxuaW50ZXJmYWNlIEJhY2tlbmRJbmZvIHtcbiAgYmFja2VuZDogQmFja2VuZDtcbiAgcHJpb3JpdHk6IG51bWJlcjtcblxuICBpbml0UHJvbWlzZT86IFByb21pc2U8dm9pZD47XG4gIGluaXRpYWxpemVkPzogYm9vbGVhbjtcbiAgYWJvcnRlZD86IGJvb2xlYW47XG4gIGVycm9yPzogc3RyaW5nO1xufVxuXG5jb25zdCBiYWNrZW5kczogTWFwPHN0cmluZywgQmFja2VuZEluZm8+ID0gbmV3IE1hcCgpO1xuY29uc3QgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5OiBzdHJpbmdbXSA9IFtdO1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgYmFja2VuZC5cbiAqXG4gKiBAcGFyYW0gbmFtZSAtIHRoZSBuYW1lIGFzIGEga2V5IHRvIGxvb2t1cCBhcyBhbiBleGVjdXRpb24gcHJvdmlkZXIuXG4gKiBAcGFyYW0gYmFja2VuZCAtIHRoZSBiYWNrZW5kIG9iamVjdC5cbiAqIEBwYXJhbSBwcmlvcml0eSAtIGFuIGludGVnZXIgaW5kaWNhdGluZyB0aGUgcHJpb3JpdHkgb2YgdGhlIGJhY2tlbmQuIEhpZ2hlciBudW1iZXIgbWVhbnMgaGlnaGVyIHByaW9yaXR5LiBpZiBwcmlvcml0eVxuICogPCAwLCBpdCB3aWxsIGJlIGNvbnNpZGVyZWQgYXMgYSAnYmV0YScgdmVyc2lvbiBhbmQgd2lsbCBub3QgYmUgdXNlZCBhcyBhIGZhbGxiYWNrIGJhY2tlbmQgYnkgZGVmYXVsdC5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlckJhY2tlbmQgPSAobmFtZTogc3RyaW5nLCBiYWNrZW5kOiBCYWNrZW5kLCBwcmlvcml0eTogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGlmIChiYWNrZW5kICYmIHR5cGVvZiBiYWNrZW5kLmluaXQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2VuZCA9IGJhY2tlbmRzLmdldChuYW1lKTtcbiAgICBpZiAoY3VycmVudEJhY2tlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYmFja2VuZHMuc2V0KG5hbWUsIHsgYmFja2VuZCwgcHJpb3JpdHkgfSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA+IHByaW9yaXR5KSB7XG4gICAgICAvLyBzYW1lIG5hbWUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggYSBoaWdoZXIgcHJpb3JpdHkuIHNraXAgcmVnaXN0ZXJhdGlvbi5cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID09PSBwcmlvcml0eSkge1xuICAgICAgaWYgKGN1cnJlbnRCYWNrZW5kLmJhY2tlbmQgIT09IGJhY2tlbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVnaXN0ZXIgYmFja2VuZCBcIiR7bmFtZX1cIiB1c2luZyBwcmlvcml0eSAke3ByaW9yaXR5fWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcmlvcml0eSA+PSAwKSB7XG4gICAgICBjb25zdCBpID0gYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAxKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJhY2tlbmRzLmdldChiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHlbaV0pIS5wcmlvcml0eSA8PSBwcmlvcml0eSkge1xuICAgICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMCwgbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkucHVzaChuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgdmFsaWQgYmFja2VuZCcpO1xufTtcblxuLyoqXG4gKiBUcnkgdG8gcmVzb2x2ZSBhbmQgaW5pdGlhbGl6ZSBhIGJhY2tlbmQuXG4gKlxuICogQHBhcmFtIGJhY2tlbmROYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGJhY2tlbmQuXG4gKiBAcmV0dXJucyB0aGUgYmFja2VuZCBpbnN0YW5jZSBpZiByZXNvbHZlZCBhbmQgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LCBvciBhbiBlcnJvciBtZXNzYWdlIGlmIGZhaWxlZC5cbiAqL1xuY29uc3QgdHJ5UmVzb2x2ZUFuZEluaXRpYWxpemVCYWNrZW5kID0gYXN5bmMgKGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPEJhY2tlbmQgfCBzdHJpbmc+ID0+IHtcbiAgY29uc3QgYmFja2VuZEluZm8gPSBiYWNrZW5kcy5nZXQoYmFja2VuZE5hbWUpO1xuICBpZiAoIWJhY2tlbmRJbmZvKSB7XG4gICAgcmV0dXJuICdiYWNrZW5kIG5vdCBmb3VuZC4nO1xuICB9XG5cbiAgaWYgKGJhY2tlbmRJbmZvLmluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuIGJhY2tlbmRJbmZvLmJhY2tlbmQ7XG4gIH0gZWxzZSBpZiAoYmFja2VuZEluZm8uYWJvcnRlZCkge1xuICAgIHJldHVybiBiYWNrZW5kSW5mby5lcnJvciE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaXNJbml0aWFsaXppbmcgPSAhIWJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlID0gYmFja2VuZEluZm8uYmFja2VuZC5pbml0KGJhY2tlbmROYW1lKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgICAgYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmJhY2tlbmQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xuICAgICAgICBiYWNrZW5kSW5mby5lcnJvciA9IGAke2V9YDtcbiAgICAgICAgYmFja2VuZEluZm8uYWJvcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYmFja2VuZEluZm8uZXJyb3IhO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBkZWxldGUgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFJlc29sdmUgZXhlY3V0aW9uIHByb3ZpZGVycyBmcm9tIHRoZSBzcGVjaWZpYyBzZXNzaW9uIG9wdGlvbnMuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSB0aGUgc2Vzc2lvbiBvcHRpb25zIG9iamVjdC5cbiAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgYW4gaW5pdGlhbGl6ZWQgYmFja2VuZCBpbnN0YW5jZSBhbmQgYSBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0IHdpdGhcbiAqIGZpbHRlcmVkIEVQIGxpc3QuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMgPSBhc3luYyAoXG4gIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4pOiBQcm9taXNlPFtiYWNrZW5kOiBCYWNrZW5kLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zXT4gPT4ge1xuICAvLyBleHRyYWN0IGJhY2tlbmQgaGludHMgZnJvbSBzZXNzaW9uIG9wdGlvbnNcbiAgY29uc3QgZXBzID0gb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgfHwgW107XG4gIGNvbnN0IGJhY2tlbmRIaW50cyA9IGVwcy5tYXAoKGkpID0+ICh0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKSk7XG4gIGNvbnN0IGJhY2tlbmROYW1lcyA9IGJhY2tlbmRIaW50cy5sZW5ndGggPT09IDAgPyBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkgOiBiYWNrZW5kSGludHM7XG5cbiAgLy8gdHJ5IHRvIHJlc29sdmUgYW5kIGluaXRpYWxpemUgYWxsIHJlcXVlc3RlZCBiYWNrZW5kc1xuICBsZXQgYmFja2VuZDogQmFja2VuZCB8IHVuZGVmaW5lZDtcbiAgY29uc3QgZXJyb3JzID0gW107XG4gIGNvbnN0IGF2YWlsYWJsZUJhY2tlbmROYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IGJhY2tlbmROYW1lIG9mIGJhY2tlbmROYW1lcykge1xuICAgIGNvbnN0IHJlc29sdmVSZXN1bHQgPSBhd2FpdCB0cnlSZXNvbHZlQW5kSW5pdGlhbGl6ZUJhY2tlbmQoYmFja2VuZE5hbWUpO1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZVJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVycm9ycy5wdXNoKHsgbmFtZTogYmFja2VuZE5hbWUsIGVycjogcmVzb2x2ZVJlc3VsdCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFiYWNrZW5kKSB7XG4gICAgICAgIGJhY2tlbmQgPSByZXNvbHZlUmVzdWx0O1xuICAgICAgfVxuICAgICAgaWYgKGJhY2tlbmQgPT09IHJlc29sdmVSZXN1bHQpIHtcbiAgICAgICAgYXZhaWxhYmxlQmFja2VuZE5hbWVzLmFkZChiYWNrZW5kTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgbm8gYmFja2VuZCBpcyBhdmFpbGFibGUsIHRocm93IGVycm9yLlxuICBpZiAoIWJhY2tlbmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIGF2YWlsYWJsZSBiYWNrZW5kIGZvdW5kLiBFUlI6ICR7ZXJyb3JzLm1hcCgoZSkgPT4gYFske2UubmFtZX1dICR7ZS5lcnJ9YCkuam9pbignLCAnKX1gKTtcbiAgfVxuXG4gIC8vIGZvciBlYWNoIGV4cGxpY2l0bHkgcmVxdWVzdGVkIGJhY2tlbmQsIGlmIGl0J3Mgbm90IGF2YWlsYWJsZSwgb3V0cHV0IHdhcm5pbmcgbWVzc2FnZS5cbiAgZm9yIChjb25zdCB7IG5hbWUsIGVyciB9IG9mIGVycm9ycykge1xuICAgIGlmIChiYWNrZW5kSGludHMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGByZW1vdmluZyByZXF1ZXN0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyIFwiJHtuYW1lfVwiIGZyb20gc2Vzc2lvbiBvcHRpb25zIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZTogJHtlcnJ9YCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZmlsdGVyZWRFcHMgPSBlcHMuZmlsdGVyKChpKSA9PiBhdmFpbGFibGVCYWNrZW5kTmFtZXMuaGFzKHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpKTtcblxuICByZXR1cm4gW1xuICAgIGJhY2tlbmQsXG4gICAgbmV3IFByb3h5KG9wdGlvbnMsIHtcbiAgICAgIGdldDogKHRhcmdldCwgcHJvcCkgPT4ge1xuICAgICAgICBpZiAocHJvcCA9PT0gJ2V4ZWN1dGlvblByb3ZpZGVycycpIHtcbiAgICAgICAgICByZXR1cm4gZmlsdGVyZWRFcHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCk7XG4gICAgICB9LFxuICAgIH0pLFxuICBdO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHsgT25ueFZhbHVlIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIHR5cGUgRmVlZHNUeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH07XG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG4gIHR5cGUgUmV0dXJuVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgc2hhcmVkIFNlc3Npb25IYW5kbGVyIGZ1bmN0aW9uYWxpdHlcbiAqXG4gKiBAaWdub3JlXG4gKi9cbmludGVyZmFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xuICByZWFkb25seSBvdXRwdXRNZXRhZGF0YTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW107XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhbiBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgZXh0ZW5kcyBTZXNzaW9uSGFuZGxlciB7XG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIHJ1bihcbiAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLFxuICAgIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmQge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxuICAgKi9cbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihcbiAgICB1cmlPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG59XG5cbmV4cG9ydCB7IHJlZ2lzdGVyQmFja2VuZCB9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMjguMCc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEVudiB9IGZyb20gJy4vZW52LmpzJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24uanMnO1xuXG50eXBlIExvZ0xldmVsVHlwZSA9IEVudlsnbG9nTGV2ZWwnXTtcblxubGV0IGxvZ0xldmVsVmFsdWU6IFJlcXVpcmVkPExvZ0xldmVsVHlwZT4gPSAnd2FybmluZyc7XG5cbmV4cG9ydCBjb25zdCBlbnY6IEVudiA9IHtcbiAgd2FzbToge30sXG4gIHdlYmdsOiB7fSBhcyBFbnYuV2ViR0xGbGFncyxcbiAgd2ViZ3B1OiB7fSBhcyBFbnYuV2ViR3B1RmxhZ3MsXG4gIHZlcnNpb25zOiB7IGNvbW1vbjogdmVyc2lvbiB9LFxuXG4gIHNldCBsb2dMZXZlbCh2YWx1ZTogTG9nTGV2ZWxUeXBlKSB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgWyd2ZXJib3NlJywgJ2luZm8nLCAnd2FybmluZycsICdlcnJvcicsICdmYXRhbCddLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBsb2dnaW5nIGxldmVsOiAke3ZhbHVlfWApO1xuICAgIH1cbiAgICBsb2dMZXZlbFZhbHVlID0gdmFsdWU7XG4gIH0sXG4gIGdldCBsb2dMZXZlbCgpOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+IHtcbiAgICByZXR1cm4gbG9nTGV2ZWxWYWx1ZTtcbiAgfSxcbn07XG5cbi8vIHNldCBwcm9wZXJ0eSAnbG9nTGV2ZWwnIHNvIHRoYXQgdGhleSBjYW4gYmUgY29ycmVjdGx5IHRyYW5zZmVycmVkIHRvIHdvcmtlciBieSBgcG9zdE1lc3NhZ2UoKWAuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LCAnbG9nTGV2ZWwnLCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiBhcyBlbnZJbXBsIH0gZnJvbSAnLi9lbnYtaW1wbC5qcyc7XG5pbXBvcnQgeyBUcnlHZXRHbG9iYWxUeXBlIH0gZnJvbSAnLi90eXBlLWhlbHBlci5qcyc7XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBFbnYge1xuICBleHBvcnQgdHlwZSBXYXNtUGF0aFByZWZpeCA9IHN0cmluZztcbiAgZXhwb3J0IGludGVyZmFjZSBXYXNtRmlsZVBhdGhzIHtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBvdmVycmlkZSBwYXRoIGZvciB0aGUgbWFpbiAud2FzbSBmaWxlLlxuICAgICAqXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgbm90IG1vZGlmaWVkLCB0aGUgZmlsZW5hbWUgb2YgdGhlIC53YXNtIGZpbGUgaXM6XG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtYCBmb3IgZGVmYXVsdCBidWlsZFxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC53YXNtYCBmb3IgSlNFUCBidWlsZCAod2l0aCBXZWJHUFUgYW5kIFdlYk5OKVxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkud2FzbWAgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEFzeW5jaWZ5ICh3aXRoIFdlYk5OKVxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNwaS53YXNtYCBmb3IgV2ViR1BVIGJ1aWxkIHdpdGggSlNQSSBzdXBwb3J0ICh3aXRoIFdlYk5OKVxuICAgICAqL1xuICAgIHdhc20/OiBVUkwgfCBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLm1qcyBmaWxlLlxuICAgICAqXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgbm90IG1vZGlmaWVkLCB0aGUgZmlsZW5hbWUgb2YgdGhlIC5tanMgZmlsZSBpczpcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzYCBmb3IgSlNFUCBidWlsZCAod2l0aCBXZWJHUFUgYW5kIFdlYk5OKVxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkubWpzYCBmb3IgV2ViR1BVIGJ1aWxkIHdpdGggQXN5bmNpZnkgKHdpdGggV2ViTk4pXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc3BpLm1qc2AgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEpTUEkgc3VwcG9ydCAod2l0aCBXZWJOTilcbiAgICAgKi9cbiAgICBtanM/OiBVUkwgfCBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IHR5cGUgV2FzbVByZWZpeE9yRmlsZVBhdGhzID0gV2FzbVBhdGhQcmVmaXggfCBXYXNtRmlsZVBhdGhzO1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcbiAgICAgKiB0byAxLCBubyB3b3JrZXIgdGhyZWFkIHdpbGwgYmUgc3Bhd25lZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIHNldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgU0lNRC5cbiAgICAgKlxuICAgICAqIE9OTlggUnVudGltZSB3aWxsIHBlcmZvcm0gZmVhdHVyZSBkZXRlY3Rpb24gYmFzZWQgb24gdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkuIFNwZWNpZmljYWxseSwgd2hlbiB0aGUgdmFsdWUgaXNcbiAgICAgKiBzZXQgdG86XG4gICAgICogLSBgdW5kZWZpbmVkYCwgYHRydWVgIG9yIGBcImZpeGVkXCJgOiB3aWxsIGNoZWNrIGF2YWlsYWJpbGl0eSBvZiBGaXhlZC13aWR0aCBTSU1ELlxuICAgICAqIC0gYFwicmVsYXhlZFwiYDogd2lsbCBjaGVjayBhdmFpbGFiaWxpdHkgb2YgUmVsYXhlZCBTSU1ELlxuICAgICAqIC0gYGZhbHNlYDogd2lsbCBub3QgcGVyZm9ybSBTSU1EIGZlYXR1cmUgY2hlY2tpbmcuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgZG9lcyBub3QgbWFrZSBPTk5YIFJ1bnRpbWUgdG8gc3dpdGNoIHRvIHRoZSBjb3JyZXNwb25kaW5nIHJ1bnRpbWUgYXV0b21hdGljYWxseS4gVXNlciBuZWVkXG4gICAgICogdG8gc2V0IGB3YXNtUGF0aHNgIG9yIGB3YXNtQmluYXJ5YCBwcm9wZXJ0eSB0byBsb2FkIHRoZSBjb3JyZXNwb25kaW5nIHJ1bnRpbWUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgd2hlbiBXZWJBc3NlbWJseSBTSU1EIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHRydWVgXG4gICAgICovXG4gICAgc2ltZD86IGJvb2xlYW4gfCAnZml4ZWQnIHwgJ3JlbGF4ZWQnO1xuXG4gICAgLyoqXG4gICAgICogc2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSB0cmFjZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBlbnYudHJhY2VgIGluc3RlYWQuIElmIGBlbnYudHJhY2VgIGlzIHNldCwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgdHJhY2U/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCBhIG51bWJlciBzcGVjaWZ5aW5nIHRoZSB0aW1lb3V0IGZvciBpbml0aWFsaXphdGlvbiBvZiBXZWJBc3NlbWJseSBiYWNrZW5kLCBpbiBtaWxsaXNlY29uZHMuIEEgemVyb1xuICAgICAqIHZhbHVlIGluZGljYXRlcyBubyB0aW1lb3V0IGlzIHNldC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgaW5pdFRpbWVvdXQ/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBjdXN0b20gVVJMIHByZWZpeCB0byB0aGUgLndhc20vLm1qcyBmaWxlcywgb3IgYW4gb2JqZWN0IG9mIG92ZXJyaWRlcyBmb3IgYm90aCAud2FzbS8ubWpzIGZpbGUuIFRoZSBvdmVycmlkZVxuICAgICAqIHBhdGggc2hvdWxkIGJlIGFuIGFic29sdXRlIHBhdGguXG4gICAgICovXG4gICAgd2FzbVBhdGhzPzogV2FzbVByZWZpeE9yRmlsZVBhdGhzO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY3VzdG9tIGJ1ZmZlciB3aGljaCBjb250YWlucyB0aGUgV2ViQXNzZW1ibHkgYmluYXJ5LiBJZiB0aGlzIHByb3BlcnR5IGlzIHNldCwgdGhlIGB3YXNtUGF0aHNgIHByb3BlcnR5IHdpbGxcbiAgICAgKiBiZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHdhc21CaW5hcnk/OiBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5O1xuXG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHByb3h5IHRoZSBleGVjdXRpb24gb2YgbWFpbiB0aHJlYWQgdG8gYSB3b3JrZXIgdGhyZWFkLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgcHJveHk/OiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHTEZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBXZWJHTCBDb250ZXh0IElEICh3ZWJnbCBvciB3ZWJnbDIpLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgJ3dlYmdsMidgXG4gICAgICovXG4gICAgY29udGV4dElkPzogJ3dlYmdsJyB8ICd3ZWJnbDInO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgV2ViR0wgcmVuZGVyaW5nIGNvbnRleHQuXG4gICAgICovXG4gICAgcmVhZG9ubHkgY29udGV4dDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIG1heGltdW0gYmF0Y2ggc2l6ZSBmb3IgbWF0bXVsLiAwIG1lYW5zIHRvIGRpc2FibGUgYmF0Y2hpbmcuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIG1hdG11bE1heEJhdGNoU2l6ZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSB0ZXh0dXJlIGNhY2hlIG1vZGUuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnZnVsbCdgXG4gICAgICovXG4gICAgdGV4dHVyZUNhY2hlTW9kZT86ICdpbml0aWFsaXplck9ubHknIHwgJ2Z1bGwnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBhY2tlZCB0ZXh0dXJlIG1vZGVcbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHBhY2s/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciBlbmFibGUgYXN5bmMgZG93bmxvYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBhc3luYz86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhIHtcbiAgICBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgICBkYXRhVHlwZTogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1UHJvZmlsaW5nRGF0YVYxIHtcbiAgICB2ZXJzaW9uOiAxO1xuICAgIGlucHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xuICAgIG91dHB1dHNNZXRhZGF0YTogcmVhZG9ubHkgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGFbXTtcbiAgICBrZXJuZWxJZDogbnVtYmVyO1xuICAgIGtlcm5lbFR5cGU6IHN0cmluZztcbiAgICBrZXJuZWxOYW1lOiBzdHJpbmc7XG4gICAgcHJvZ3JhbU5hbWU6IHN0cmluZztcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBlbmRUaW1lOiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgdHlwZSBXZWJHcHVQcm9maWxpbmdEYXRhID0gV2ViR3B1UHJvZmlsaW5nRGF0YVYxO1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBtb2RlLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpbnN0ZWFkLiBJZiBgZW52LndlYmdwdS5wcm9maWxpbmcubW9kZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmVcbiAgICAgKiBpZ25vcmVkLlxuICAgICAqL1xuICAgIHByb2ZpbGluZ01vZGU/OiAnb2ZmJyB8ICdkZWZhdWx0JztcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgY29uZmlndXJhdGlvbi5cbiAgICAgKi9cbiAgICBwcm9maWxpbmc6IHtcbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICAgKlxuICAgICAgICogQGRlZmF1bHRWYWx1ZSBgJ29mZidgXG4gICAgICAgKi9cbiAgICAgIG1vZGU/OiAnb2ZmJyB8ICdkZWZhdWx0JztcblxuICAgICAgLyoqXG4gICAgICAgKiBTZXQgb3IgZ2V0IGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBhIHByb2ZpbGluZyBkYXRhIGlzIHJlY2VpdmVkLiBJZiBub3Qgc2V0LCB0aGUgcHJvZmlsaW5nIGRhdGEgd2lsbCBiZVxuICAgICAgICogcHJpbnRlZCB0byBjb25zb2xlLlxuICAgICAgICovXG4gICAgICBvbmRhdGE/OiAoZGF0YTogV2ViR3B1UHJvZmlsaW5nRGF0YSkgPT4gdm9pZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBvd2VyIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyBvcHRpb25zIGZvciBgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcigpYC5cbiAgICAgKlxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBDcmVhdGUgeW91ciBvd24gR1BVQWRhcHRlciwgdXNlIGl0IHRvIGNyZWF0ZSBhIEdQVURldmljZSBpbnN0YW5jZSBhbmQgc2V0IHtAbGluayBkZXZpY2V9IHByb3BlcnR5IGlmXG4gICAgICogeW91IHdhbnQgdG8gdXNlIGEgc3BlY2lmaWMgcG93ZXIgcHJlZmVyZW5jZS5cbiAgICAgKi9cbiAgICBwb3dlclByZWZlcmVuY2U/OiAnbG93LXBvd2VyJyB8ICdoaWdoLXBlcmZvcm1hbmNlJztcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBmb3JjZSBmYWxsYmFjayBhZGFwdGVyIGZsYWcuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyBvcHRpb25zIGZvciBgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcigpYC5cbiAgICAgKlxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBDcmVhdGUgeW91ciBvd24gR1BVQWRhcHRlciwgdXNlIGl0IHRvIGNyZWF0ZSBhIEdQVURldmljZSBpbnN0YW5jZSBhbmQgc2V0IHtAbGluayBkZXZpY2V9IHByb3BlcnR5IGlmXG4gICAgICogeW91IHdhbnQgdG8gdXNlIGEgc3BlY2lmaWMgZmFsbGJhY2sgb3B0aW9uLlxuICAgICAqL1xuICAgIGZvcmNlRmFsbGJhY2tBZGFwdGVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBhZGFwdGVyIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyB0aGUgR1BVIGFkYXB0ZXIgZm9yIHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kIHRvIGNyZWF0ZSBHUFUgZGV2aWNlLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBwcm9wZXJ0eSBpcyBub3Qgc2V0LCBpdCB3aWxsIGJlIGF2YWlsYWJsZSB0byBnZXQgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGVcbiAgICAgKiB2YWx1ZSB3aWxsIGJlIHRoZSBHUFUgYWRhcHRlciB0aGF0IGNyZWF0ZWQgYnkgdGhlIHVuZGVybHlpbmcgV2ViR1BVIGJhY2tlbmQuXG4gICAgICpcbiAgICAgKiBXaGVuIHVzZSB3aXRoIFR5cGVTY3JpcHQsIHRoZSB0eXBlIG9mIHRoaXMgcHJvcGVydHkgaXMgYEdQVUFkYXB0ZXJgIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBJdCBpcyBubyBsb25nZXIgcmVjb21tZW5kZWQgdG8gdXNlIHRoaXMgcHJvcGVydHkuIFRoZSBsYXRlc3QgV2ViR1BVIHNwZWMgYWRkcyBgR1BVRGV2aWNlLmFkYXB0ZXJJbmZvYFxuICAgICAqIChodHRwczovL3d3dy53My5vcmcvVFIvd2ViZ3B1LyNkb20tZ3B1ZGV2aWNlLWFkYXB0ZXJpbmZvKSwgd2hpY2ggYWxsb3dzIHRvIGdldCB0aGUgYWRhcHRlciBpbmZvcm1hdGlvbiBmcm9tIHRoZVxuICAgICAqIGRldmljZS4gV2hlbiBpdCdzIGF2YWlsYWJsZSwgdGhlcmUgaXMgbm8gbmVlZCB0byBzZXQvZ2V0IHRoZSB7QGxpbmsgYWRhcHRlcn0gcHJvcGVydHkuXG4gICAgICovXG4gICAgYWRhcHRlcjogVHJ5R2V0R2xvYmFsVHlwZTwnR1BVQWRhcHRlcic+O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIEdQVSBkZXZpY2UgZm9yIFdlYkdQVS5cbiAgICAgKlxuICAgICAqIFRoZXJlIGFyZSAzIHZhbGlkIHNjZW5hcmlvcyBvZiBhY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eTpcbiAgICAgKiAtIFNldCBhIHZhbHVlIGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlIHVzZWQgYnkgdGhlIFdlYkdQVSBiYWNrZW5kXG4gICAgICogdG8gcGVyZm9ybSBjYWxjdWxhdGlvbnMuIElmIHRoZSB2YWx1ZSBpcyBub3QgYSBgR1BVRGV2aWNlYCBvYmplY3QsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgICAqIC0gR2V0IHRoZSB2YWx1ZSBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGlzIHdpbGwgdHJ5IHRvIGNyZWF0ZSBhIG5ldyBHUFVEZXZpY2VcbiAgICAgKiBpbnN0YW5jZS4gUmV0dXJucyBhIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHRvIGEgYEdQVURldmljZWAgb2JqZWN0LlxuICAgICAqIC0gR2V0IHRoZSB2YWx1ZSBhZnRlciB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFJldHVybnMgYSByZXNvbHZlZCBgUHJvbWlzZWAgdG8gdGhlXG4gICAgICogYEdQVURldmljZWAgb2JqZWN0IHVzZWQgYnkgdGhlIFdlYkdQVSBiYWNrZW5kLlxuICAgICAqL1xuICAgIGdldCBkZXZpY2UoKTogUHJvbWlzZTxUcnlHZXRHbG9iYWxUeXBlPCdHUFVEZXZpY2UnPj47XG4gICAgc2V0IGRldmljZSh2YWx1ZTogVHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz4pO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciB2YWxpZGF0ZSBpbnB1dCBjb250ZW50LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgdmFsaWRhdGVJbnB1dENvbnRlbnQ/OiBib29sZWFuO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW52IHtcbiAgLyoqXG4gICAqIHNldCB0aGUgc2V2ZXJpdHkgbGV2ZWwgZm9yIGxvZ2dpbmcuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYCd3YXJuaW5nJ2BcbiAgICovXG4gIGxvZ0xldmVsPzogJ3ZlcmJvc2UnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdmYXRhbCc7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlIHdoZXRoZXIgcnVuIGluIGRlYnVnIG1vZGUuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgKi9cbiAgZGVidWc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBzZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIHRyYWNlLlxuICAgKlxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICovXG4gIHRyYWNlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogR2V0IHZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcGFja2FnZS5cbiAgICovXG4gIHJlYWRvbmx5IHZlcnNpb25zOiB7XG4gICAgcmVhZG9ubHkgY29tbW9uOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgd2ViPzogc3RyaW5nO1xuICAgIHJlYWRvbmx5IG5vZGU/OiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIHJlYWRvbmx5ICdyZWFjdC1uYXRpdmUnPzogc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5XG4gICAqL1xuICByZWFkb25seSB3YXNtOiBFbnYuV2ViQXNzZW1ibHlGbGFncztcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHTFxuICAgKi9cbiAgcmVhZG9ubHkgd2ViZ2w6IEVudi5XZWJHTEZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdQVVxuICAgKi9cbiAgcmVhZG9ubHkgd2ViZ3B1OiBFbnYuV2ViR3B1RmxhZ3M7XG5cbiAgW25hbWU6IHN0cmluZ106IHVua25vd247XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGFzIGEgZ2xvYmFsIHNpbmdsZXRvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudjogRW52ID0gZW52SW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvRGF0YVVSTCgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JUb0RhdGFVUkwgPSAodGVuc29yOiBUZW5zb3IsIG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgY2FudmFzID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpIDogbmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKTtcbiAgY2FudmFzLndpZHRoID0gdGVuc29yLmRpbXNbM107XG4gIGNhbnZhcy5oZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXNcbiAgICB8IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIHwgT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgfCBudWxsO1xuXG4gIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgIC8vIERlZmF1bHQgdmFsdWVzIGZvciBoZWlnaHQgYW5kIHdpZHRoICYgZm9ybWF0XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xuICAgIGlmIChvcHRpb25zPy50ZW5zb3JMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnM/LmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCJztcblxuICAgIGNvbnN0IG5vcm0gPSBvcHRpb25zPy5ub3JtO1xuICAgIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgbGV0IG5vcm1CaWFzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0ubWVhbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtTWVhbiA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIG5vcm0ubWVhbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5tZWFuWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtQmlhcyA9IFswLCAwLCAwLCAwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBub3JtLmJpYXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXNbMF0sIG5vcm0uYmlhc1sxXSwgbm9ybS5iaWFzWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0uYmlhc1szXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLFxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDIsXG4gICAgICBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICAgIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgICBjb25zdCBSID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07IC8vIFIgdmFsdWVcbiAgICAgICAgY29uc3QgRyA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAvLyBHIHZhbHVlXG4gICAgICAgIGNvbnN0IEIgPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgLy8gQiB2YWx1ZVxuICAgICAgICBjb25zdCBBID0gYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcblxuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIFIgKyAnLCcgKyBHICsgJywnICsgQiArICcsJyArIEEgKyAnKSc7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5maWxsUmVjdChqLCBpLCAxLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCd0b0RhdGFVUkwnIGluIGNhbnZhcykge1xuICAgICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b0RhdGFVUkwgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9JbWFnZURhdGEoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVG9JbWFnZURhdGEgPSAodGVuc29yOiBUZW5zb3IsIG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEgPT4ge1xuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPVxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgOiAobmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKS5nZXRDb250ZXh0KCcyZCcpIGFzIE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gIGxldCBpbWFnZTogSW1hZ2VEYXRhO1xuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgY2hhbm5lbHM6IG51bWJlcjtcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzFdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICB9XG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zICE9PSB1bmRlZmluZWQgPyAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQicpIDogJ1JHQic7XG5cbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAyNTVdO1xuICAgICAgICBpZiAobm9ybS5tZWFuWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtQmlhcyA9IFswLCAwLCAwLCAwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBub3JtLmJpYXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXNbMF0sIG5vcm0uYmlhc1sxXSwgbm9ybS5iaWFzWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0uYmlhc1szXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoXG4gICAgICAgIChvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkICYmIGNoYW5uZWxzID09PSA0ICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnUkdCQScpIHx8XG4gICAgICAgIChjaGFubmVscyA9PT0gMyAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRlbnNvciBmb3JtYXQgZG9lc24ndCBtYXRjaCBpbnB1dCB0ZW5zb3IgZGltc1wiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgICBjb25zdCBzdGVwID0gNDtcbiAgICBsZXQgckltYWdlUG9pbnRlciA9IDAsXG4gICAgICBnSW1hZ2VQb2ludGVyID0gMSxcbiAgICAgIGJJbWFnZVBvaW50ZXIgPSAyLFxuICAgICAgYUltYWdlUG9pbnRlciA9IDM7XG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCxcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlLFxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgICAgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAgIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9XG5cbiAgICBpbWFnZSA9IHBpeGVsczJEQ29udGV4dC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG5cbiAgICBmb3IgKFxuICAgICAgbGV0IGkgPSAwO1xuICAgICAgaSA8IGhlaWdodCAqIHdpZHRoO1xuICAgICAgckltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYUltYWdlUG9pbnRlciArPSBzdGVwLCBpKytcbiAgICApIHtcbiAgICAgIGltYWdlLmRhdGFbckltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgLy8gUiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtnSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAvLyBHIHZhbHVlXG4gICAgICBpbWFnZS5kYXRhW2JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtiVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMl0pICogbm9ybU1lYW5bMl07IC8vIEIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbYUltYWdlUG9pbnRlcl0gPVxuICAgICAgICBhVGVuc29yUG9pbnRlciA9PT0gLTEgPyAyNTUgOiAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgLy8gQSB2YWx1ZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxuICByZXR1cm4gaW1hZ2U7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1xuICBPcHRpb25zRGltZW5zaW9ucyxcbiAgT3B0aW9uc0Zvcm1hdCxcbiAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLFxuICBPcHRpb25zVGVuc29yRm9ybWF0LFxuICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxuICBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zLFxuICBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsXG4gIFRlbnNvckZyb21VcmxPcHRpb25zLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuaW50ZXJmYWNlIEJ1ZmZlclRvVGVuc29yT3B0aW9uc1xuICBleHRlbmRzIE9wdGlvbnNEaW1lbnNpb25zLCBPcHRpb25zVGVuc29yTGF5b3V0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSB8IHVuZGVmaW5lZCwgb3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zKTogVGVuc29yID0+IHtcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBidWZmZXIgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBoZWlnaHQgYW5kIHdpZHRoIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOSFdDIFRlbnNvciBsYXlvdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgfVxuXG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHsgbWVhbjogMjU1LCBiaWFzOiAwIH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICB9IGVsc2Uge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcyFbMF0sIG5vcm0uYmlhcyFbMV0sIG5vcm0uYmlhcyFbMl0sIG5vcm0uYmlhcyFbM10gPz8gMF07XG4gIH1cblxuICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0JBJztcbiAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBSR0JBIHNpbmNlIGltYWdlZGF0YSBhbmQgSFRNTEltYWdlRWxlbWVudCB1c2VzIGl0XG5cbiAgY29uc3Qgb3V0cHV0Zm9ybWF0ID1cbiAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsXG4gICAgckltYWdlUG9pbnRlciA9IDAsXG4gICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgYkltYWdlUG9pbnRlciA9IDIsXG4gICAgYUltYWdlUG9pbnRlciA9IDM7XG4gIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgc3RlcCA9IDM7XG4gICAgckltYWdlUG9pbnRlciA9IDA7XG4gICAgZ0ltYWdlUG9pbnRlciA9IDE7XG4gICAgYkltYWdlUG9pbnRlciA9IDI7XG4gICAgYUltYWdlUG9pbnRlciA9IC0xO1xuICB9XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIG91dHB1dCB0ZW5zb3IgZm9ybWF0XG4gIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdCR1InKSB7XG4gICAgYlRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIHJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfVxuXG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCBzdHJpZGU7XG4gICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXBcbiAgKSB7XG4gICAgZmxvYXQzMkRhdGFbclRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW3JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMF0pIC8gbm9ybU1lYW5bMF07XG4gICAgZmxvYXQzMkRhdGFbZ1RlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2dJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMV0pIC8gbm9ybU1lYW5bMV07XG4gICAgZmxvYXQzMkRhdGFbYlRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMl0pIC8gbm9ybU1lYW5bMl07XG4gICAgaWYgKGFUZW5zb3JQb2ludGVyICE9PSAtMSAmJiBhSW1hZ2VQb2ludGVyICE9PSAtMSkge1xuICAgICAgZmxvYXQzMkRhdGFbYVRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2FJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbM10pIC8gbm9ybU1lYW5bM107XG4gICAgfVxuICB9XG5cbiAgLy8gRmxvYXQzMkFycmF5IC0+IG9ydC5UZW5zb3JcbiAgY29uc3Qgb3V0cHV0VGVuc29yID1cbiAgICBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJ1xuICAgICAgPyBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCA0LCBoZWlnaHQsIHdpZHRoXSlcbiAgICAgIDogbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyAoXG4gIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gIG9wdGlvbnM/OlxuICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbik6IFByb21pc2U8VGVuc29yPiA9PiB7XG4gIC8vIGNoZWNraW5nIHRoZSB0eXBlIG9mIGltYWdlIG9iamVjdFxuICBjb25zdCBpc0hUTUxJbWFnZUVsZSA9IHR5cGVvZiBIVE1MSW1hZ2VFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIEltYWdlRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA7XG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGltYWdlID09PSAnc3RyaW5nJztcblxuICBsZXQgZGF0YTogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IE9mZnNjcmVlbkNhbnZhcykgPT4ge1xuICAgIGlmICh0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfSBlbHNlIGlmIChjYW52YXMgaW5zdGFuY2VvZiBPZmZzY3JlZW5DYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XG5cbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgIGxldCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGlucHV0IGNvbmZpZyBmb3JtYXQgbXVzdCBiZSBSR0JBIGZvciBIVE1MSW1hZ2VFbGVtZW50Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcbiAgICAgICAgfVxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgfVxuXG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlRGF0YUVsZSkge1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuZm9ybWF0ID0gJ1JHQkEnO1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG5cbiAgICAgIHRlbXBDYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KHRlbXBDYW52YXMpO1xuXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xuICAgICAgaWYgKCFpbWFnZSB8fCAhY29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgbmV3SW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICAgIG5ld0ltYWdlLnNyYyA9IGltYWdlO1xuICAgICAgbmV3SW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMud2lkdGggPSBuZXdJbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5ld0ltYWdlLmhlaWdodDtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobmV3SW1hZ2UsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgcmVzb2x2ZShidWZmZXJUb1RlbnNvcihpbWcuZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcbiAgfVxuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21UZXh0dXJlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tVGV4dHVyZSA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIC8vIEFsd2F5cyBhc3N1bWUgUkdCQUYzMi4gVE9ETzogc3VwcG9ydCBkaWZmZXJlbnQgdGV4dHVyZSBmb3JtYXRcbiAgY29uc3QgZGltcyA9IFsxLCBoZWlnaHQsIHdpZHRoLCA0XTtcbiAgcmV0dXJuIG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gIGdwdUJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlclR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdncHUtYnVmZmVyJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBncHVCdWZmZXIsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbU1MVGVuc29yKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tTUxUZW5zb3IgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5NTFRlbnNvckRhdGFUeXBlcz4oXG4gIG1sVGVuc29yOiBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlLFxuICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdtbC10ZW5zb3InLCB0eXBlOiBkYXRhVHlwZSA/PyAnZmxvYXQzMicsIG1sVGVuc29yLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICB0eXBlOiBULFxuICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcbiAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuKTogVGVuc29yID0+IG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPVxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcjtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXkgPSBJbnN0YW5jZVR5cGU8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz47XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCA9IG5ldyBNYXA8c3RyaW5nLCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPihbXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXG4gIFsndWludDgnLCBVaW50OEFycmF5XSxcbiAgWydpbnQ4JywgSW50OEFycmF5XSxcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG4gIFsnaW50NCcsIFVpbnQ4QXJyYXldLFxuICBbJ3VpbnQ0JywgVWludDhBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50L0Zsb2F0MTZBcnJheSBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3Jcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQvRmxvYXQxNkFycmF5XG4vLyBwb2x5ZmlsbCBpZiBhdmFpbGFibGUuXG5sZXQgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGNoZWNrVHlwZWRBcnJheSA9ICgpID0+IHtcbiAgaWYgKCFpc1R5cGVkQXJyYXlDaGVja2VkKSB7XG4gICAgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IHRydWU7XG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ0ludDY0QXJyYXkuZnJvbTtcbiAgICBjb25zdCBpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ1VpbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdVaW50NjRBcnJheS5mcm9tO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IEZsb2F0MTZBcnJheSA9IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5O1xuICAgIGNvbnN0IGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb207XG5cbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XG4gICAgfVxuICAgIGlmIChpc0Zsb2F0MTZBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2Zsb2F0MTYnLCBGbG9hdDE2QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoRmxvYXQxNkFycmF5LCAnZmxvYXQxNicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBGbG9hdDE2QXJyYXkgaXMgbm90IGF2YWlsYWJsZSwgdXNlICdVaW50MTZBcnJheScgdG8gc3RvcmUgdGhlIGRhdGEuXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIFVpbnQxNkFycmF5KTtcbiAgICB9XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7XG4gIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcblxuLyoqXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXG4gKlxuICogQHBhcmFtIGRpbXMgdGhlIGRpbXMgYXJyYXkuIE1heSBiZSBhbiBpbGxlZ2FsIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlU2l6ZSA9IChkaW1zOiByZWFkb25seSB1bmtub3duW10pOiBudW1iZXIgPT4ge1xuICBsZXQgc2l6ZSA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRpbSA9IGRpbXNbaV07XG4gICAgaWYgKHR5cGVvZiBkaW0gIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaW0pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgaWYgKGRpbSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgc2l6ZSAqPSBkaW07XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5yZXNoYXBlKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclJlc2hhcGUgPSAodGVuc29yOiBUZW5zb3IsIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yLnR5cGUsIHRlbnNvci5kYXRhLCBkaW1zKTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdjcHUtcGlubmVkJyxcbiAgICAgICAgZGF0YTogdGVuc29yLmRhdGEgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWydkYXRhJ10sXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAndGV4dHVyZScsXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcbiAgICAgICAgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ21sLXRlbnNvcic6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnbWwtdGVuc29yJyxcbiAgICAgICAgbWxUZW5zb3I6IHRlbnNvci5tbFRlbnNvcixcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyB0ZW5zb3JUb0RhdGFVUkwsIHRlbnNvclRvSW1hZ2VEYXRhIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyB9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHtcbiAgdGVuc29yRnJvbUdwdUJ1ZmZlcixcbiAgdGVuc29yRnJvbUltYWdlLFxuICB0ZW5zb3JGcm9tTUxUZW5zb3IsXG4gIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsXG4gIHRlbnNvckZyb21UZXh0dXJlLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xuaW1wb3J0IHtcbiAgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxuICBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zLFxuICBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsXG4gIFRlbnNvckZyb21VcmxPcHRpb25zLFxuICBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7XG4gIGNoZWNrVHlwZWRBcnJheSxcbiAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCxcbiAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCxcbiAgU3VwcG9ydGVkVHlwZWRBcnJheSxcbiAgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyxcbn0gZnJvbSAnLi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcuanMnO1xuaW1wb3J0IHsgY2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZSB9IGZyb20gJy4vdGVuc29yLXV0aWxzLWltcGwuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcblxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xudHlwZSBUZW5zb3JNTFRlbnNvclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlO1xuXG4vKipcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbnNvciBpbXBsZW1lbnRzIFRlbnNvckludGVyZmFjZSB7XG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgdHlwZTogVGVuc29yVHlwZSxcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy4gVHlwZSBpcyBpbmZlcnJlZCBmcm9tIGRhdGEuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJOTiBNTFRlbnNvciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbWwtdGVuc29yJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcblxuICAvKipcbiAgICogaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcmcwOlxuICAgICAgfCBUZW5zb3JUeXBlXG4gICAgICB8IFRlbnNvckRhdGFUeXBlXG4gICAgICB8IFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgICB8IHJlYWRvbmx5IHN0cmluZ1tdXG4gICAgICB8IHJlYWRvbmx5IGJvb2xlYW5bXVxuICAgICAgfCBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc1xuICAgICAgfCBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gICAgYXJnMT86IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGFyZzI/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKSB7XG4gICAgLy8gcGVyZm9ybSBvbmUtdGltZSBjaGVjayBmb3IgQmlnSW50L0Zsb2F0MTZBcnJheSBzdXBwb3J0XG4gICAgY2hlY2tUeXBlZEFycmF5KCk7XG5cbiAgICBsZXQgdHlwZTogVGVuc29yVHlwZTtcbiAgICBsZXQgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdvYmplY3QnICYmICdsb2NhdGlvbicgaW4gYXJnMCkge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBzcGVjaWZpYyBsb2NhdGlvblxuICAgICAgLy9cbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gYXJnMC5sb2NhdGlvbjtcbiAgICAgIHR5cGUgPSBhcmcwLnR5cGU7XG4gICAgICBkaW1zID0gYXJnMC5kaW1zO1xuICAgICAgc3dpdGNoIChhcmcwLmxvY2F0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOiB7XG4gICAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldCh0eXBlKTtcbiAgICAgICAgICBpZiAoIWV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBwaW5uZWQgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKGFyZzAuZGF0YSBpbnN0YW5jZW9mIGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnVmZmVyIHNob3VsZCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gYXJnMC5kYXRhO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHR1cmUnOiB7XG4gICAgICAgICAgaWYgKHR5cGUgIT09ICdmbG9hdDMyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gdGV4dHVyZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gYXJnMC50ZXh0dXJlO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Jvb2wnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NCdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIGdwdSBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gYXJnMC5ncHVCdWZmZXI7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDE2JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDY0JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50OCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50OCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdib29sJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ0JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDQnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBNTFRlbnNvcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1sVGVuc29yRGF0YSA9IGFyZzAubWxUZW5zb3I7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IgY29uc3RydWN0b3I6IHVuc3VwcG9ydGVkIGxvY2F0aW9uICcke3RoaXMuZGF0YUxvY2F0aW9ufSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcbiAgICAgIC8vXG4gICAgICBsZXQgZGF0YTogVGVuc29yRGF0YVR5cGU7XG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMSB8IHR5cGVvZiBhcmcyO1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBhcmcwIGlzIHR5cGUgb3IgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgICAvL1xuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IodHlwZSwgZGF0YSwgLi4uKVxuICAgICAgICAvL1xuICAgICAgICB0eXBlID0gYXJnMDtcbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMjtcbiAgICAgICAgaWYgKGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgc3RyaW5nIHRlbnNvcidzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIGRvbid0IGNoZWNrIHdoZXRoZXIgZXZlcnkgZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgc3RyaW5nOyB0aGlzIGlzIHRvbyBzbG93LiB3ZSBhc3N1bWUgaXQncyBjb3JyZWN0IGFuZFxuICAgICAgICAgIC8vIGVycm9yIHdpbGwgYmUgcG9wdWxhdGVkIGF0IGluZmVyZW5jZVxuICAgICAgICAgIGRhdGEgPSBhcmcxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG51bWVyaWMgdGVuc29yXG4gICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQoYXJnMCk7XG4gICAgICAgICAgaWYgKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0ZW5zb3IgdHlwZTogJHthcmcwfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgICAgIGlmICgoYXJnMCA9PT0gJ2Zsb2F0MTYnICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHx8IGFyZzAgPT09ICd1aW50NCcgfHwgYXJnMCA9PT0gJ2ludDQnKSB7XG4gICAgICAgICAgICAgIC8vIC0gJ2Zsb2F0MTYnOlxuICAgICAgICAgICAgICAvLyAgIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gICBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXG4gICAgICAgICAgICAgIC8vICAgZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxuICAgICAgICAgICAgICAvLyAgIFVpbnQxNkFycmF5LmZyb20oYXJnMSkgd2hpY2ggZ2VuZXJhdGVzIHdyb25nIGRhdGEuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vIC0gJ3VpbnQ0JyBhbmQgJ2ludDQnOlxuICAgICAgICAgICAgICAvLyAgIFVpbnQ4QXJyYXkuZnJvbShhcmcxKSB3aWxsIGdlbmVyYXRlIHdyb25nIGRhdGEgZm9yICd1aW50NCcgYW5kICdpbnQ0JyB0ZW5zb3IuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgYENyZWF0aW5nIGEgJHthcmcwfSB0ZW5zb3IgZnJvbSBudW1iZXIgYXJyYXkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVzZSAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfSBhcyBkYXRhLmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZzAgPT09ICd1aW50NjQnIHx8IGFyZzAgPT09ICdpbnQ2NCcpIHtcbiAgICAgICAgICAgICAgLy8gdXNlICdhcyBhbnknIGhlcmUgYmVjYXVzZTpcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cbiAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTcwMDJcbiAgICAgICAgICAgICAgLy8gMi4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHVuaW9uIHR5cGUgb2YgJyhCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcikuZnJvbSgpJ1xuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxuICAgICAgICAgICAgICAvLyAzLiBwYXJhbWV0ZXJzIG9mICdTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLmZyb20oKScgZG9lcyBub3QgbWF0Y2ggdGhlIHJlcXVpcmVtZW50IG9mIHRoZSB1bmlvblxuICAgICAgICAgICAgICAvLyB0eXBlLlxuXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IGJpZ2ludFtdXCIgaGVyZS5cblxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSwgQmlnSW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIHR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcmcwID09PSAndWludDgnKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBIFVpbnQ4Q2xhbXBlZEFycmF5IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mIHVpbnQ4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcwID09PSAnZmxvYXQxNicgJiYgYXJnMSBpbnN0YW5jZW9mIFVpbnQxNkFycmF5ICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciAhPT0gVWludDE2QXJyYXkpIHtcbiAgICAgICAgICAgIC8vIHdoZW4gRmxvYXQxNkFycmF5IGlzIGF2YWlsYWJsZSBhbmQgZGF0YSBpcyBvZiB0eXBlIFVpbnQxNkFycmF5LlxuICAgICAgICAgICAgLy8gV2UgYWxsb3cgVWludDE2QXJyYXkgdG8gYmUgcGFzc2VkIGluIGFzIGRhdGEgZm9yICdmbG9hdDE2JyB0ZW5zb3IgdW50aWwgRmxvYXQxNkFycmF5IGlzIGdlbmVyYWxseVxuICAgICAgICAgICAgLy8gc3VwcG9ydGVkIGluIEphdmFTY3JpcHQgZW52aXJvbm1lbnQuXG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gbmV3IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5KGFyZzEuYnVmZmVyLCBhcmcxLmJ5dGVPZmZzZXQsIGFyZzEubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICB0eXBlID0gJ3VpbnQ4JztcbiAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGdldCB0ZW5zb3IgdHlwZSBmcm9tIFR5cGVkQXJyYXlcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID0gTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5nZXQoXG4gICAgICAgICAgICBhcmcwLmNvbnN0cnVjdG9yIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobWFwcGVkVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHlwZSA9IG1hcHBlZFR5cGU7XG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0eXBlIGFuZCBkYXRhIGlzIHByb2Nlc3NlZCwgbm93IHByb2Nlc3NpbmcgZGltc1xuICAgICAgaWYgKG1heWJlRGltcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxuICAgICAgICBtYXliZURpbXMgPSBbZGF0YS5sZW5ndGhdO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtYXliZURpbXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBIHRlbnNvcidzIGRpbXMgbXVzdCBiZSBhIG51bWJlciBhcnJheVwiKTtcbiAgICAgIH1cbiAgICAgIGRpbXMgPSBtYXliZURpbXMgYXMgcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gY2hlY2sgb24gZGltc1xuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xuICAgIC8vIGlmIGRhdGEgaXMgb24gQ1BVLCBjaGVjayB3aGV0aGVyIGRhdGEgbGVuZ3RoIG1hdGNoZXMgdGVuc29yIHNpemVcbiAgICBpZiAodGhpcy5jcHVEYXRhICYmIHNpemUgIT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgIGlmICgodHlwZSA9PT0gJ3VpbnQ0JyB8fCB0eXBlID09PSAnaW50NCcpICYmIE1hdGguY2VpbChzaXplIC8gMikgPT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gZm9yICh1KWludDQsIHRoZSBkYXRhIGxlbmd0aCBpcyBoYWxmIG9mIHRoZSB0ZW5zb3Igc2l6ZS4gU28gd2UgY2hlY2sgdGhpcyBzcGVjaWFsIGNhc2Ugd2hlbiBzaXplIGlzIG9kZC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZGltcyA9IGRpbXM7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBmYWN0b3J5XG4gIHN0YXRpYyBhc3luYyBmcm9tSW1hZ2UoXG4gICAgaW1hZ2U6IEltYWdlRGF0YSB8IEhUTUxJbWFnZUVsZW1lbnQgfCBJbWFnZUJpdG1hcCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzpcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc1xuICAgICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUZW5zb3JJbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUltYWdlKGltYWdlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVGV4dHVyZTxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVRleHR1cmUodGV4dHVyZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JHcHVCdWZmZXJUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuICApOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1MVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JEYXRhVHlwZXM+KFxuICAgIG1sVGVuc29yOiBUZW5zb3JNTFRlbnNvclR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbU1MVGVuc29yKG1sVGVuc29yLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUGlubmVkQnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuQ3B1UGlubmVkRGF0YVR5cGVzPihcbiAgICB0eXBlOiBULFxuICAgIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVGVuc29yIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcih0eXBlLCBidWZmZXIsIGRpbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29udmVyc2lvbnNcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVuc29yVG9EYXRhVVJMKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSB7XG4gICAgcmV0dXJuIHRlbnNvclRvSW1hZ2VEYXRhKHRoaXMsIG9wdGlvbnMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHB1YmxpYyBmaWVsZHNcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIHJlYWRvbmx5IHR5cGU6IFRlbnNvclR5cGU7XG4gIHJlYWRvbmx5IHNpemU6IG51bWJlcjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJpdmF0ZSBmaWVsZHNcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGF0YUxvY2F0aW9uOiBUZW5zb3JEYXRhTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgZGF0YSBvbiBDUFUsIGlmIGxvY2F0aW9uIGlzICdjcHUnIG9yICdjcHUtcGlubmVkJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjcHVEYXRhPzogVGVuc29yRGF0YVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyB0ZXh0dXJlIHdoZW4gbG9jYXRpb24gaXMgJ3RleHR1cmUnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdVRleHR1cmVEYXRhPzogVGVuc29yVGV4dHVyZVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyBHUFUgYnVmZmVyIHdoZW4gbG9jYXRpb24gaXMgJ2dwdS1idWZmZXInLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdUJ1ZmZlckRhdGE/OiBUZW5zb3JHcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgV2ViTk4gTUxUZW5zb3Igd2hlbiBsb2NhdGlvbiBpcyAnbWwtdGVuc29yJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBtbFRlbnNvckRhdGE/OiBUZW5zb3JNTFRlbnNvclR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkb3dubG9hZGVyIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZGVyPygpOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPjtcblxuICAvKipcbiAgICogYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZGF0YSBpcyBiZWluZyBkb3dubG9hZGVkIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgaXNEb3dubG9hZGluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkaXNwb3NlciBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRpc3Bvc2VyPygpOiB2b2lkO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9wZXJ0aWVzXG4gIGdldCBkYXRhKCk6IFRlbnNvckRhdGFUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmNwdURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xuICAgICAgICAgICdvciB1c2UgYHRleHR1cmVgIG9yIGBncHVCdWZmZXJgIHByb3BlcnR5IHRvIGFjY2VzcyB0aGUgR1BVIGRhdGEgZGlyZWN0bHkuJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XG4gIH1cblxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XG4gIH1cblxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XG4gIH1cblxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcbiAgfVxuXG4gIGdldCBtbFRlbnNvcigpOiBUZW5zb3JNTFRlbnNvclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMubWxUZW5zb3JEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJOTiBNTFRlbnNvci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWxUZW5zb3JEYXRhO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGhvZHNcblxuICBhc3luYyBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+IHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgc3dpdGNoICh0aGlzLmRhdGFMb2NhdGlvbikge1xuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1sVGVuc29yRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnbm9uZSc7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXG4gIHByaXZhdGUgZW5zdXJlVmFsaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcbiAgICB9XG4gIH1cblxuICByZXNoYXBlKGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNoYXBlIGEgdGVuc29yIHRoYXQgb3ducyBHUFUgcmVzb3VyY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yRmFjdG9yeSB9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckltcGwgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFR5cGVkVGVuc29yVXRpbHMgfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XG5pbXBvcnQgeyBUcnlHZXRHbG9iYWxUeXBlIH0gZnJvbSAnLi90eXBlLWhlbHBlci5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuLyoqXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxuICovXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViTk4gTUxUZW5zb3IgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBpbiBhIFdlYk5OIE1MVGVuc29yLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmV0dXJucyB0aGUgZGF0YSBpbW1lZGlhdGVseS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCBkb3dubG9hZHMgdGhlIGRhdGEgYW5kIHJldHVybnMgdGhlIHByb21pc2UuXG4gICAqXG4gICAqIEBwYXJhbSByZWxlYXNlRGF0YSAtIHdoZXRoZXIgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuIElnbm9yZSBpZiBkYXRhIGlzIGFscmVhZHkgb24gQ1BVLlxuICAgKi9cbiAgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZU1hcFtUXT47XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJlbW92ZSBpdHMgaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuXG4gICAqXG4gICAqIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHRlbnNvciBpcyBjb25zaWRlcmVkIG5vIGxvbmdlciB2YWxpZC4gSXRzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdub25lJy5cbiAgICovXG4gIGRpc3Bvc2UoKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRlbnNvciB7XG4gIGludGVyZmFjZSBEYXRhVHlwZU1hcCB7XG4gICAgZmxvYXQzMjogRmxvYXQzMkFycmF5O1xuICAgIHVpbnQ4OiBVaW50OEFycmF5O1xuICAgIGludDg6IEludDhBcnJheTtcbiAgICB1aW50MTY6IFVpbnQxNkFycmF5O1xuICAgIGludDE2OiBJbnQxNkFycmF5O1xuICAgIGludDMyOiBJbnQzMkFycmF5O1xuICAgIGludDY0OiBCaWdJbnQ2NEFycmF5O1xuICAgIHN0cmluZzogc3RyaW5nW107XG4gICAgYm9vbDogVWludDhBcnJheTtcbiAgICBmbG9hdDE2OiBVaW50MTZBcnJheTsgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcbiAgICB1aW50MzI6IFVpbnQzMkFycmF5O1xuICAgIHVpbnQ2NDogQmlnVWludDY0QXJyYXk7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gICAgdWludDQ6IFVpbnQ4QXJyYXk7XG4gICAgaW50NDogSW50OEFycmF5O1xuICB9XG5cbiAgaW50ZXJmYWNlIEVsZW1lbnRUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBudW1iZXI7XG4gICAgdWludDg6IG51bWJlcjtcbiAgICBpbnQ4OiBudW1iZXI7XG4gICAgdWludDE2OiBudW1iZXI7XG4gICAgaW50MTY6IG51bWJlcjtcbiAgICBpbnQzMjogbnVtYmVyO1xuICAgIGludDY0OiBiaWdpbnQ7XG4gICAgc3RyaW5nOiBzdHJpbmc7XG4gICAgYm9vbDogYm9vbGVhbjtcbiAgICBmbG9hdDE2OiBudW1iZXI7IC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBudW1iZXI7XG4gICAgdWludDMyOiBudW1iZXI7XG4gICAgdWludDY0OiBiaWdpbnQ7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gICAgdWludDQ6IG51bWJlcjtcbiAgICBpbnQ0OiBudW1iZXI7XG4gIH1cblxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XG4gIHR5cGUgRWxlbWVudFR5cGUgPSBFbGVtZW50VHlwZU1hcFtUeXBlXTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZVR5cGUgPSBXZWJHTFRleHR1cmU7XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic7XG5cbiAgdHlwZSBHcHVCdWZmZXJUeXBlRmFsbGJhY2sgPSB7IHNpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJyB9O1xuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J0dQVUJ1ZmZlcicsIEdwdUJ1ZmZlclR5cGVGYWxsYmFjaz47XG5cbiAgdHlwZSBNTFRlbnNvclR5cGVGYWxsYmFjayA9IHsgZGVzdHJveSgpOiB2b2lkIH07XG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJOTiBNTFRlbnNvclxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWNhdGlvbiBmb3IgV2ViTk4ncyBNTFRlbnNvciBpcyBjdXJyZW50bHkgaW4gZmx1eC5cbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J01MVGVuc29yJywgTUxUZW5zb3JUeXBlRmFsbGJhY2s+O1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMicgfCAnZmxvYXQxNicgfCAnaW50MzInIHwgJ2ludDY0JyB8ICd1aW50MzInIHwgJ3VpbnQ4JyB8ICdib29sJztcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3JcbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yRGF0YVR5cGVzID1cbiAgICB8ICdmbG9hdDMyJ1xuICAgIHwgJ2Zsb2F0MTYnXG4gICAgfCAnaW50OCdcbiAgICB8ICd1aW50OCdcbiAgICB8ICdpbnQzMidcbiAgICB8ICd1aW50MzInXG4gICAgfCAnaW50NjQnXG4gICAgfCAndWludDY0J1xuICAgIHwgJ2Jvb2wnXG4gICAgfCAndWludDQnXG4gICAgfCAnaW50NCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZScgfCAnY3B1JyB8ICdjcHUtcGlubmVkJyB8ICd0ZXh0dXJlJyB8ICdncHUtYnVmZmVyJyB8ICdtbC10ZW5zb3InO1xuXG4gIC8qKlxuICAgKiByZXByZXNlbnQgdGhlIGRhdGEgdHlwZSBvZiBhIHRlbnNvclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVHlwZSA9IGtleW9mIERhdGFUeXBlTWFwO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVkVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4gZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VD4sIFR5cGVkVGVuc29yVXRpbHM8VD4ge31cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yIGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFRlbnNvci5UeXBlPiwgVHlwZWRUZW5zb3JVdGlsczxUZW5zb3IuVHlwZT4ge31cblxuLyoqXG4gKiB0eXBlIFRlbnNvckNvbnN0cnVjdG9yIGRlZmluZXMgdGhlIGNvbnN0cnVjdG9ycyBvZiAnVGVuc29yJyB0byBjcmVhdGUgQ1BVIHRlbnNvciBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yQ29uc3RydWN0b3IgZXh0ZW5kcyBUZW5zb3JGYWN0b3J5IHtcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddIHwgcmVhZG9ubHkgc3RyaW5nW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoXG4gICAgdHlwZTogJ2Jvb2wnLFxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnYm9vbCddIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSBhIFVpbnQ4Q2xhbXBlZEFycmF5LCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3ICh0eXBlOiAndWludDgnLCBkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyAndWludDY0JyB8ICdpbnQ2NCc+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBudW1iZXJbXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJyB8ICdib29sJyB8ICd1aW50NjQnIHwgJ2ludDY0Jz4+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjxUPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IHJlYWRvbmx5IHN0cmluZ1tdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEJpZ1VpbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDY0Jz47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiBUZW5zb3IuVHlwZSxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGUgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUZW5zb3I7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRlbnNvciA9IFRlbnNvckltcGwgYXMgVGVuc29yQ29uc3RydWN0b3I7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFID0gKGRldmljZVR5cGU6IHN0cmluZywgbGFiZWw6IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZVN0YW1wKGAke2RldmljZVR5cGV9OjpPUlQ6OiR7bGFiZWx9YCk7XG59O1xuXG5jb25zdCBUUkFDRV9GVU5DID0gKG1zZzogc3RyaW5nLCBleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdCgvXFxyXFxufFxccnxcXG4vZykgfHwgW107XG4gIGxldCBoYXNUcmFjZUZ1bmMgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNUcmFjZUZ1bmMgJiYgIXN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcbiAgICAgIGxldCBsYWJlbCA9IGBGVU5DXyR7bXNnfTo6JHtzdGFja1tpXS50cmltKCkuc3BsaXQoJyAnKVsxXX1gO1xuICAgICAgaWYgKGV4dHJhTXNnKSB7XG4gICAgICAgIGxhYmVsICs9IGA6OiR7ZXh0cmFNc2d9YDtcbiAgICAgIH1cbiAgICAgIFRSQUNFKCdDUFUnLCBsYWJlbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XG4gICAgICBoYXNUcmFjZUZ1bmMgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnRU5EJywgZXh0cmFNc2cpO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9CRUdJTiA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZShgT1JUOjoke2V4dHJhTXNnfWApO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9FTkQgPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLnRpbWVFbmQoYE9SVDo6JHtleHRyYU1zZ31gKTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzIH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVFJBQ0VfRlVOQ19CRUdJTiwgVFJBQ0VfRlVOQ19FTkQsIFRSQUNFX0VWRU5UX0JFR0lOLCBUUkFDRV9FVkVOVF9FTkQgfSBmcm9tICcuL3RyYWNlLmpzJztcblxudHlwZSBTZXNzaW9uT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuU2Vzc2lvbk9wdGlvbnM7XG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJ1bk9wdGlvbnM7XG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmVlZHNUeXBlO1xudHlwZSBGZXRjaGVzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmV0Y2hlc1R5cGU7XG50eXBlIFJldHVyblR5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJldHVyblR5cGU7XG5cbmV4cG9ydCBjbGFzcyBJbmZlcmVuY2VTZXNzaW9uIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW4oZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlIHwgUnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XG4gICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XG4gICAgY29uc3QgZmV0Y2hlczogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9ID0ge307XG4gICAgbGV0IG9wdGlvbnM6IFJ1bk9wdGlvbnMgPSB7fTtcbiAgICAvLyBjaGVjayBpbnB1dHNcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCInZmVlZHMnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBjYW5ub3QgYmUgYSBUZW5zb3JcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlICdmZXRjaGVzJyBvciAnb3B0aW9ucycuXCIpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMgYXJlIHByZXBhcmVkXG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICAgIGJ5dGVMZW5ndGg/OiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICBhcmcwOiBzdHJpbmcgfCBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5LFxuICAgIGFyZzE/OiBTZXNzaW9uT3B0aW9ucyB8IG51bWJlcixcbiAgICBhcmcyPzogbnVtYmVyLFxuICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCdJbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZScpO1xuICAgIC8vIGVpdGhlciBsb2FkIGZyb20gYSBmaWxlIG9yIGJ1ZmZlclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nIHwgVWludDhBcnJheTtcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcbiAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcilcbiAgICApIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XG4gICAgICBsZXQgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInYnl0ZU9mZnNldCcgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYnl0ZU9mZnNldCA+PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZU9mZnNldCcgaXMgb3V0IG9mIHJhbmdlIFswLCAke2J1ZmZlci5ieXRlTGVuZ3RofSkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcbiAgICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVMZW5ndGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGFuIGludGVnZXIuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICB9XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzBdOiBtdXN0IGJlICdwYXRoJyBvciAnYnVmZmVyJy5cIik7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBiYWNrZW5kLCB1cGRhdGUgc2Vzc2lvbiBvcHRpb25zIHdpdGggdmFsaWRhdGVkIEVQcywgYW5kIGNyZWF0ZSBzZXNzaW9uIGhhbmRsZXJcbiAgICBjb25zdCBbYmFja2VuZCwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHNdID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMob3B0aW9ucyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24uY3JlYXRlJyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gbmV3IEluZmVyZW5jZVNlc3Npb24oaGFuZGxlcik7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuc3RhcnRQcm9maWxpbmcoKTtcbiAgfVxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVyLmVuZFByb2ZpbGluZygpO1xuICB9XG5cbiAgZ2V0IGlucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcbiAgfVxuICBnZXQgb3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XG4gIH1cblxuICBnZXQgaW5wdXRNZXRhZGF0YSgpOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlZhbHVlTWV0YWRhdGFbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE1ldGFkYXRhO1xuICB9XG5cbiAgZ2V0IG91dHB1dE1ldGFkYXRhKCk6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuVmFsdWVNZXRhZGF0YVtdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE1ldGFkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcjtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbCB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24taW1wbC5qcyc7XG5pbXBvcnQgeyBPbm54TW9kZWxPcHRpb25zIH0gZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSwgT25ueFZhbHVlRGF0YUxvY2F0aW9uIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB0eXBlIHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVHJ5R2V0R2xvYmFsVHlwZSB9IGZyb20gJy4vdHlwZS1oZWxwZXIuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBpbnB1dC9vdXRwdXQgdHlwZXNcblxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG5cbiAgLyoqXG4gICAqIEEgZmVlZHMgKG1vZGVsIGlucHV0cykgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIEZlZWRzVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2hlcyAobW9kZWwgb3V0cHV0cykgY291bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIC0gT21pdHRlZC4gVXNlIG1vZGVsJ3Mgb3V0cHV0IG5hbWVzIGRlZmluaXRpb24uXG4gICAqIC0gQW4gYXJyYXkgb2Ygc3RyaW5nIGluZGljYXRpbmcgdGhlIG91dHB1dCBuYW1lcy5cbiAgICogLSBBbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBvciBudWxsIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBkaWZmZXJlbnQgZnJvbSBpbnB1dCBhcmd1bWVudCwgaW4gb3V0cHV0LCBPbm54VmFsdWUgaXMgb3B0aW9uYWwuIElmIGFuIE9ubnhWYWx1ZSBpcyBwcmVzZW50IGl0IHdpbGwgYmVcbiAgICogdXNlZCBhcyBhIHByZS1hbGxvY2F0ZWQgdmFsdWUgYnkgdGhlIGluZmVyZW5jZSBlbmdpbmU7IGlmIG9taXR0ZWQsIGluZmVyZW5jZSBlbmdpbmUgd2lsbCBhbGxvY2F0ZSBidWZmZXJcbiAgICogaW50ZXJuYWxseS5cbiAgICovXG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSByZWFkb25seSBzdHJpbmdbXSB8IE51bGxhYmxlT25ueFZhbHVlTWFwVHlwZTtcblxuICAvKipcbiAgICogQSBpbmZlcmVuY2luZyByZXR1cm4gdHlwZSBpcyBhbiBvYmplY3QgdGhhdCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIFJldHVyblR5cGUgPSBPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHNlc3Npb24gb3B0aW9uc1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3Igc2Vzc2lvbiBiZWhhdmlvci5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbk9wdGlvbnMgZXh0ZW5kcyBPbm54TW9kZWxPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEFuIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb24gY2FuIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIGV4ZWN1dGlvbiBwcm92aWRlcixcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxuICAgICAqL1xuICAgIGV4ZWN1dGlvblByb3ZpZGVycz86IHJlYWRvbmx5IEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50cmEgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludGVyT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGZyZWVEaW1lbnNpb25PdmVycmlkZXM/OiB7IHJlYWRvbmx5IFtkaW1lbnNpb25OYW1lOiBzdHJpbmddOiBudW1iZXIgfTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpbWl6YXRpb24gbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbD86ICdkaXNhYmxlZCcgfCAnYmFzaWMnIHwgJ2V4dGVuZGVkJyB8ICdsYXlvdXQnIHwgJ2FsbCc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBDUFUgbWVtb3J5IGFyZW5hLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGVuYWJsZUNwdU1lbUFyZW5hPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIG1lbW9yeSBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGVuYWJsZU1lbVBhdHRlcm4/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogRXhlY3V0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZXhlY3V0aW9uTW9kZT86ICdzZXF1ZW50aWFsJyB8ICdwYXJhbGxlbCc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxuICAgICAqL1xuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIGVuYWJsZVByb2ZpbGluZz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIHByZWZpeCBmb3IgcHJvZmlsaW5nLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgZnV0dXJlIHVzZS5cbiAgICAgKi9cbiAgICBwcm9maWxlRmlsZVByZWZpeD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBJRC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dJZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMCB8IDEgfCAyIHwgMyB8IDQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBzdHJpbmcgYXMgYSBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBmb3IgYWxsIG91dHB1dHMsIG9yIGFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgYVxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR0wgYW5kIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj86IE9ubnhWYWx1ZURhdGFMb2NhdGlvbiB8IHsgcmVhZG9ubHkgW291dHB1dE5hbWU6IHN0cmluZ106IE9ubnhWYWx1ZURhdGFMb2NhdGlvbiB9O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgZ3JhcGggY2FwdHVyZS5cbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHUFUgRVAuXG4gICAgICovXG4gICAgZW5hYmxlR3JhcGhDYXB0dXJlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGNvbmZpZ3VyYXRpb25zIGZvciBhIHNlc3Npb24uIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3Nlc3Npb25fb3B0aW9uc19jb25maWdfa2V5cy5oXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIHNlc3Npb246IHtcbiAgICAgKiAgICAgc2V0X2Rlbm9ybWFsX2FzX3plcm86IFwiMVwiLFxuICAgICAqICAgICBkaXNhYmxlX3ByZXBhY2tpbmc6IFwiMVwiXG4gICAgICogICB9LFxuICAgICAqICAgb3B0aW1pemF0aW9uOiB7XG4gICAgICogICAgIGVuYWJsZV9nZWx1X2FwcHJveGltYXRpb246IFwiMVwiXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjcmVnaW9uIGV4ZWN1dGlvbiBwcm92aWRlcnNcblxuICAvLyBDdXJyZW50bHksIHdlIGhhdmUgdGhlIGZvbGxvd2luZyBiYWNrZW5kcyB0byBzdXBwb3J0IGV4ZWN1dGlvbiBwcm92aWRlcnM6XG4gIC8vIEJhY2tlbmQgTm9kZS5qcyBiaW5kaW5nOiBzdXBwb3J0cyAnY3B1JywgJ2RtbCcgKHdpbjMyKSwgJ2NvcmVtbCcgKG1hY09TKSBhbmQgJ2N1ZGEnIChsaW51eCkuXG4gIC8vIEJhY2tlbmQgV2ViQXNzZW1ibHk6IHN1cHBvcnRzICdjcHUnLCAnd2FzbScsICd3ZWJncHUnIGFuZCAnd2Vibm4nLlxuICAvLyBCYWNrZW5kIE9OTlguanM6IHN1cHBvcnRzICd3ZWJnbCcuXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XG4gICAgY29yZW1sOiBDb3JlTUxFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjcHU6IENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBkbWw6IERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIG5uYXBpOiBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdhc206IFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ3B1OiBXZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJubjogV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBxbm46IFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHhubnBhY2s6IFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgfVxuXG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJOYW1lID0ga2V5b2YgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXA7XG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJDb25maWcgPVxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXBbRXhlY3V0aW9uUHJvdmlkZXJOYW1lXVxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25cbiAgICB8IEV4ZWN1dGlvblByb3ZpZGVyTmFtZVxuICAgIHwgc3RyaW5nO1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjcHUnO1xuICAgIHVzZUFyZW5hPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY3VkYSc7XG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnZG1sJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xuICAgIC8vIFRPRE86IGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd4bm5wYWNrJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJncHUnO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgcHJlZmVycmVkIGxheW91dCB3aGVuIHJ1bm5pbmcgbGF5b3V0IHNlbnNpdGl2ZSBvcGVyYXRvcnMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCAnTkNIVydcbiAgICAgKi9cbiAgICBwcmVmZXJyZWRMYXlvdXQ/OiAnTkNIVycgfCAnTkhXQyc7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgbGlzdCBvZiBub2RlIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIG9uIENQVSBldmVuIHdoZW4gV2ViR1BVIEVQIGlzIHVzZWQuXG4gICAgICovXG4gICAgZm9yY2VDcHVOb2RlTmFtZXM/OiByZWFkb25seSBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIHZhbGlkYXRpb24gbW9kZSBmb3IgV2ViR1BVIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAgICAgKiAtICdkaXNhYmxlZCc6IERpc2FibGUgYWxsIHZhbGlkYXRpb24uXG4gICAgICogV2hlbiB1c2VkIGluIE5vZGUuanMsIGRpc2FibGUgdmFsaWRhdGlvbiBtYXkgY2F1c2UgcHJvY2VzcyBjcmFzaCBpZiBXZWJHUFUgZXJyb3JzIG9jY3VyLiBCZSBjYXV0aW91cyB3aGVuIHVzaW5nXG4gICAgICogdGhpcyBtb2RlLlxuICAgICAqIFdoZW4gdXNlZCBpbiB3ZWIsIHRoaXMgbW9kZSBpcyBlcXVpdmFsZW50IHRvICd3Z3B1T25seScuXG4gICAgICogLSAnd2dwdU9ubHknOiBQZXJmb3JtIFdlYkdQVSBpbnRlcm5hbCB2YWxpZGF0aW9uIG9ubHkuXG4gICAgICogLSAnYmFzaWMnOiBQZXJmb3JtIGJhc2ljIHZhbGlkYXRpb24gaW5jbHVkaW5nIFdlYkdQVSBpbnRlcm5hbCB2YWxpZGF0aW9uLiBUaGlzIGlzIHRoZSBkZWZhdWx0IG1vZGUuXG4gICAgICogLSAnZnVsbCc6IFBlcmZvcm0gZnVsbCB2YWxpZGF0aW9uLiBUaGlzIG1vZGUgbWF5IGhhdmUgcGVyZm9ybWFuY2UgaW1wYWN0LiBVc2UgaXQgZm9yIGRlYnVnZ2luZyBwdXJwb3NlLlxuICAgICAqXG4gICAgICogQGRlZmF1bHQgJ2Jhc2ljJ1xuICAgICAqL1xuICAgIHZhbGlkYXRpb25Nb2RlPzogJ2Rpc2FibGVkJyB8ICd3Z3B1T25seScgfCAnYmFzaWMnIHwgJ2Z1bGwnO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgY2FjaGUgbW9kZSBmb3Igc3RvcmFnZSBidWZmZXJzLlxuICAgICAqIC0gJ2Rpc2FibGVkJzogRGlzYWJsZSBidWZmZXIgY2FjaGUuIEJ1ZmZlcnMgYXJlIGRlc3Ryb3llZCB3aGVuIG5vIGxvbmdlciBpbiB1c2UuXG4gICAgICogLSAnbGF6eVJlbGVhc2UnOiBCdWZmZXJzIGFyZSByZWxlYXNlZCBsYXppbHksIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgcnVuLlxuICAgICAqIC0gJ3NpbXBsZSc6IFJlbGVhc2VkIGJ1ZmZlcnMgYXJlIGNhY2hlZCBhbmQgcmV1c2VkIG9ubHkgZm9yIHJlcXVlc3RzIG9mIHRoZSBleGFjdCBzYW1lIHNpemUuXG4gICAgICogLSAnYnVja2V0JzogUmVsZWFzZWQgYnVmZmVycyBhcmUgY2FjaGVkIGFuZCByZXVzZWQgdXNpbmcgcHJlZGVmaW5lZCBzaXplIGJ1Y2tldHMuIFRoaXMgaXMgdGhlIGRlZmF1bHQgbW9kZS5cbiAgICAgKlxuICAgICAqIEZvciBzdGF0aWMtc2hhcGUgbW9kZWxzLCAnc2ltcGxlJyBtYXkgcmVkdWNlIEdQVSBtZW1vcnkgdXNhZ2UsIGJlY2F1c2UgZXhhY3Qtc2l6ZSBidWZmZXJzIGFyZSByZXVzZWQgYWNyb3NzXG4gICAgICogcnVucyBpbnN0ZWFkIG9mIGFsbG9jYXRpbmcgbmV3IGJ1Y2tldC1zaXplZCBidWZmZXJzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHQgJ2J1Y2tldCdcbiAgICAgKi9cbiAgICBzdG9yYWdlQnVmZmVyQ2FjaGVNb2RlPzogJ2Rpc2FibGVkJyB8ICdsYXp5UmVsZWFzZScgfCAnc2ltcGxlJyB8ICdidWNrZXQnO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgY2FjaGUgbW9kZSBmb3IgdW5pZm9ybSBidWZmZXJzLlxuICAgICAqXG4gICAgICogU2VlIHtAbGluayBzdG9yYWdlQnVmZmVyQ2FjaGVNb2RlfSBmb3IgYSBkZXNjcmlwdGlvbiBvZiB0aGUgYXZhaWxhYmxlIG1vZGVzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHQgJ3NpbXBsZSdcbiAgICAgKi9cbiAgICB1bmlmb3JtQnVmZmVyQ2FjaGVNb2RlPzogJ2Rpc2FibGVkJyB8ICdsYXp5UmVsZWFzZScgfCAnc2ltcGxlJyB8ICdidWNrZXQnO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgY2FjaGUgbW9kZSBmb3IgcXVlcnkgcmVzb2x2ZSBidWZmZXJzLlxuICAgICAqXG4gICAgICogU2VlIHtAbGluayBzdG9yYWdlQnVmZmVyQ2FjaGVNb2RlfSBmb3IgYSBkZXNjcmlwdGlvbiBvZiB0aGUgYXZhaWxhYmxlIG1vZGVzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHQgJ2Rpc2FibGVkJ1xuICAgICAqL1xuICAgIHF1ZXJ5UmVzb2x2ZUJ1ZmZlckNhY2hlTW9kZT86ICdkaXNhYmxlZCcgfCAnbGF6eVJlbGVhc2UnIHwgJ3NpbXBsZScgfCAnYnVja2V0JztcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGNhY2hlIG1vZGUgZm9yIGJ1ZmZlcnMgbm90IGNvdmVyZWQgYnkgdGhlIG90aGVyIGJ1ZmZlciBjYWNoZSBtb2RlIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rIHN0b3JhZ2VCdWZmZXJDYWNoZU1vZGV9IGZvciBhIGRlc2NyaXB0aW9uIG9mIHRoZSBhdmFpbGFibGUgbW9kZXMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCAnZGlzYWJsZWQnXG4gICAgICovXG4gICAgZGVmYXVsdEJ1ZmZlckNhY2hlTW9kZT86ICdkaXNhYmxlZCcgfCAnbGF6eVJlbGVhc2UnIHwgJ3NpbXBsZScgfCAnYnVja2V0JztcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYW4gb3B0aW9uYWwgV2ViR1BVIGRldmljZSB0byBiZSB1c2VkIGJ5IHRoZSBXZWJHUFUgZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgICAqL1xuICAgIGRldmljZT86IFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+O1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBXZWJOTiBvcHRpb25zXG5cbiAgaW50ZXJmYWNlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBjcmVhdGluZyBhIFdlYk5OIE1MQ29udGV4dC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RpY3RkZWYtbWxjb250ZXh0b3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBGcmVlRGltZW5zaW9uQm91bmQge1xuICAgIG1pblNpemU/OiBudW1iZXI7XG4gICAgbWF4U2l6ZTogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkNvbnRleHRPcHRpb25zIHtcbiAgICBkZXZpY2VUeXBlPzogJ2NwdScgfCAnZ3B1JyB8ICducHUnO1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnIHwgJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XG4gICAgZnJlZURpbWVuc2lvbkJvdW5kcz86IHsgcmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IEZyZWVEaW1lbnNpb25Cb3VuZCB9O1xuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIEdyb3VwUXVlcnlBdHRlbnRpb24gKEdRQSkgb3AgdXNlcyBhIHN0YXRlZnVsIGNvbmNhdC1iYXNlZCBLVi1jYWNoZSBzdHJhdGVneTpcbiAgICAgKiBwcmVzZW50X2t2ID0gY29uY2F0KHBhc3Rfa3YsIG5ld19rdikuIFRoZSBjYWNoZSBncm93cyBlYWNoIGRlY29kZSBzdGVwLlxuICAgICAqXG4gICAgICogV2hlbiBmYWxzZSAoZGVmYXVsdCksIEdRQSB1c2VzIGEgc3RhdGVsZXNzIFNjYXR0ZXJORC1iYXNlZCBzdHJhdGVneTogbmV3IHRva2VucyBhcmVcbiAgICAgKiBzY2F0dGVyZWQgaW50byBhIGZpeGVkLXNpemUgcGFzdF9rdiBidWZmZXIgYXQgdGhlIHBvc2l0aW9uIGluZGljYXRlZCBieSBzZXFsZW5zX2suXG4gICAgICogVGhpcyBpcyBzdWl0YWJsZSBmb3IgbW9kZWxzIHRoYXQgbWFuYWdlIHRoZSBLVi1jYWNoZSBleHRlcm5hbGx5IChlLmcuLCB2aWEgSS9PIGJpbmRpbmcpLlxuICAgICAqL1xuICAgIGVuYWJsZUNhdXNhbExNPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciB3aXRob3V0IE1MQ29udGV4dC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2l0aG91dE1MQ29udGV4dCBleHRlbmRzIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lLCBXZWJOTkNvbnRleHRPcHRpb25zIHtcbiAgICBjb250ZXh0PzogbmV2ZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aCBNTENvbnRleHQuXG4gICAqXG4gICAqIFdoZW4gTUxDb250ZXh0IGlzIHByb3ZpZGVkLCB0aGUgZGV2aWNlVHlwZSBpcyBhbHNvIHJlcXVpcmVkIHNvIHRoYXQgdGhlIFdlYk5OIEVQIGNhbiBkZXRlcm1pbmUgdGhlIHByZWZlcnJlZFxuICAgKiBjaGFubmVsIGxheW91dC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RvbS1tbC1jcmVhdGVjb250ZXh0XG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dpdGhNTENvbnRleHRcbiAgICBleHRlbmRzXG4gICAgICBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSxcbiAgICAgIE9taXQ8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPixcbiAgICAgIFJlcXVpcmVkPFBpY2s8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPj4ge1xuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0IHdoaWNoIGlzIGNyZWF0ZWQgZnJvbSBHUFVEZXZpY2UuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dC1ncHVkZXZpY2VcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2ViR3B1IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUge1xuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xuICAgIGdwdURldmljZTogVHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz47XG4gIH1cblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgKi9cbiAgZXhwb3J0IHR5cGUgV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbiA9XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXZWJHcHU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3Fubic7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgUU5OIGJhY2tlbmQgdHlwZS4gRS5nLiwgJ2NwdScgb3IgJ2h0cCcuXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRQYXRoYC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0ICdodHAnXG4gICAgICovXG4gICAgYmFja2VuZFR5cGU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIHBhdGggdG8gdGhlIFFOTiBiYWNrZW5kIGxpYnJhcnkuXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRUeXBlYC5cbiAgICAgKi9cbiAgICBiYWNrZW5kUGF0aD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gZW5hYmxlIEhUUCBGUDE2IHByZWNpc2lvbi5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGVGcDE2UHJlY2lzaW9uPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIC8qKlxuICAgICAqIFRoZSBiaXQgZmxhZ3MgZm9yIENvcmVNTCBleGVjdXRpb24gcHJvdmlkZXIuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX09OTFkgPSAweDAwMVxuICAgICAqIENPUkVNTF9GTEFHX0VOQUJMRV9PTl9TVUJHUkFQSCA9IDB4MDAyXG4gICAgICogQ09SRU1MX0ZMQUdfT05MWV9FTkFCTEVfREVWSUNFX1dJVEhfQU5FID0gMHgwMDRcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0FMTE9XX1NUQVRJQ19JTlBVVF9TSEFQRVMgPSAweDAwOFxuICAgICAqIENPUkVNTF9GTEFHX0NSRUFURV9NTFBST0dSQU0gPSAweDAxMFxuICAgICAqIENPUkVNTF9GTEFHX1VTRV9DUFVfQU5EX0dQVSA9IDB4MDIwXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBTZWUgaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Byb3ZpZGVycy9jb3JlbWwvY29yZW1sX3Byb3ZpZGVyX2ZhY3RvcnkuaCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogVGhpcyBmbGFnIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcpLlxuICAgICAqL1xuICAgIGNvcmVNbEZsYWdzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byB1c2UgQ1BVIG9ubHkgaW4gQ29yZU1MIEVQLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIHVzZUNQVUFuZEdQVT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIGVuYWJsZSBDb3JlTUwgRVAgb24gc3ViZ3JhcGguXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgZW5hYmxlT25TdWJncmFwaD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIG9ubHkgZW5hYmxlIENvcmVNTCBFUCBmb3IgQXBwbGUgZGV2aWNlcyB3aXRoIEFORSAoQXBwbGUgTmV1cmFsIEVuZ2luZSkuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgb25seUVuYWJsZURldmljZVdpdGhBTkU/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgTm5hcGlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnbm5hcGknO1xuICAgIHVzZUZQMTY/OiBib29sZWFuO1xuICAgIHVzZU5DSFc/OiBib29sZWFuO1xuICAgIGNwdURpc2FibGVkPzogYm9vbGVhbjtcbiAgICBjcHVPbmx5PzogYm9vbGVhbjtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcnVuIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIGluZmVyZW5jZSBydW4gYmVoYXZpb3JcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUnVuT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUZXJtaW5hdGUgYWxsIGluY29tcGxldGUgT3J0UnVuIGNhbGxzIGFzIHNvb24gYXMgcG9zc2libGUgaWYgdHJ1ZVxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIHRlcm1pbmF0ZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBIHRhZyBmb3IgdGhlIFJ1bigpIGNhbGxzIHVzaW5nIHRoaXNcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICB0YWc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBzaW5nbGUgcnVuIGNvbmZpZ3VyYXRpb24gZW50cnkuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3J1bl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBtZW1vcnk6IHtcbiAgICAgKiAgICAgZW5hYmxlX21lbW9yeV9hcmVuYV9zaHJpbmthZ2U6IFwiMVwiLFxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gdmFsdWUgbWV0YWRhdGFcblxuICAvKipcbiAgICogVGhlIGNvbW1vbiBwYXJ0IG9mIHRoZSB2YWx1ZSBtZXRhZGF0YSB0eXBlIGZvciBib3RoIHRlbnNvciBhbmQgbm9uLXRlbnNvciB2YWx1ZXMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZhbHVlTWV0YWRhdGFCYXNlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc3BlY2lmaWVkIGlucHV0IG9yIG91dHB1dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgbWV0YWRhdGEgb2YgYSBub24tdGVuc29yIHZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBOb25UZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdGVuc29yIHZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBUZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IHRydWU7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBUZW5zb3IuVHlwZTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNoYXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgc2hhcGUgaXMgbm90IGRlZmluZWQsIHRoZSB2YWx1ZSB3aWxsIGFuIGVtcHR5IGFycmF5LiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgYW4gYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBzaGFwZVxuICAgICAqIG9mIHRoZSB0ZW5zb3IuIEVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgY2FuIGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nLiBJZiB0aGUgZWxlbWVudCBpcyBhIG51bWJlciwgaXQgcmVwcmVzZW50c1xuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGRpbWVuc2lvbiBzaXplLiBJZiB0aGUgZWxlbWVudCBpcyBhIHN0cmluZywgaXQgcmVwcmVzZW50cyBhIHN5bWJvbGljIGRpbWVuc2lvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBzaGFwZTogUmVhZG9ubHlBcnJheTxudW1iZXIgfCBzdHJpbmc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdmFsdWUuXG4gICAqL1xuICBleHBvcnQgdHlwZSBWYWx1ZU1ldGFkYXRhID0gTm9uVGVuc29yVmFsdWVNZXRhZGF0YSB8IFRlbnNvclZhbHVlTWV0YWRhdGE7XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCBtb2RlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvciBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLk91dHB1dFR5cGVgIGZvclxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9maWxpbmdcblxuICAvKipcbiAgICogU3RhcnQgcHJvZmlsaW5nLlxuICAgKi9cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcblxuICAvKipcbiAgICogRW5kIHByb2ZpbGluZy5cbiAgICovXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IGlucHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxuICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgICBieXRlTGVuZ3RoPzogbnVtYmVyLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhIFVpbnQ4QXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBJbmZlcmVuY2VTZXNzaW9uOiBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSA9IEluZmVyZW5jZVNlc3Npb25JbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JMYXlvdXQgfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0RhdGFVcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVyc2lvblV0aWxzIHtcbiAgLyoqXG4gICAqIGNyZWF0ZXMgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGBmb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIEByZXR1cm5zIGEgRGF0YVVSTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjcmVhdGVzIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiBAcmV0dXJucyBhbiBJbWFnZURhdGEgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yLCBUeXBlZFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgSW1hZ2VGb3JtYXQgPSAnUkdCJyB8ICdSR0JBJyB8ICdCR1InIHwgJ1JCRyc7XG5leHBvcnQgdHlwZSBJbWFnZVRlbnNvckxheW91dCA9ICdOSFdDJyB8ICdOQ0hXJztcblxuLy8gdGhlIGZvbGxvd2luZyByZWdpb24gY29udGFpbnMgdHlwZSBkZWZpbml0aW9ucyBmb3IgY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb24uXG5cbi8vICNyZWdpb24gdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb25cblxuLyoqXG4gKiByZXByZXNlbnQgY29tbW9uIHByb3BlcnRpZXMgb2YgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cbiAqL1xuaW50ZXJmYWNlIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZTogVDtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBHUFUgcmVzb3VyY2UuXG4gKi9cbmludGVyZmFjZSBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcbiAgLyoqXG4gICAqIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoZSB0ZW5zb3IgdHJlYXQgdGhlIEdQVSBkYXRhIGFzIGV4dGVybmFsIHJlc291cmNlLlxuICAgKi9cbiAgZG93bmxvYWQ/KCk6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcblxuICAvKipcbiAgICogYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSB0ZW5zb3IgaXMgZGlzcG9zZWQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXG4gICAqL1xuICBkaXNwb3NlPygpOiB2b2lkO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFxuICBUIGV4dGVuZHMgVGVuc29yLkNwdVBpbm5lZERhdGFUeXBlcyA9IFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXMsXG4+IGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdjcHUtcGlubmVkJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnY3B1LXBpbm5lZCc7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBDUFUgcGlubmVkIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXMgPSBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcz5cbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICd0ZXh0dXJlJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAndGV4dHVyZSc7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXMgPSBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPlxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiwgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2dwdS1idWZmZXInLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdncHUtYnVmZmVyJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPSBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+XG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LCBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnbWwtdGVuc29yJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnbWwtdGVuc29yJztcblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgV2ViTk4gTUxUZW5zb3IgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBtbFRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZTtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIG9mIGVhY2ggaW5kaXZpZHVhbCBvcHRpb25zLlxuLy8gdGhlIHRlbnNvciBmYWN0b3J5IGZ1bmN0aW9ucyB1c2UgYSBjb21wb3NpdGlvbiBvZiB0aG9zZSBvcHRpb25zIGFzIHRoZSBwYXJhbWV0ZXIgdHlwZS5cblxuLy8gI3JlZ2lvbiBPcHRpb25zIGZpZWxkc1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNGb3JtYXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgcmVwcmVzZW50ZWQgaW4gUkdCQSBjb2xvciBzcGFjZS5cbiAgICovXG4gIGZvcm1hdD86IEltYWdlRm9ybWF0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JGb3JtYXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogTk9URTogdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBvcHRpb24gJ2Zvcm1hdCcuIFdoaWxlIG9wdGlvbiAnZm9ybWF0JyByZXByZXNlbnRzIHRoZSBvcmlnaW5hbCBpbWFnZSwgJ3RlbnNvckZvcm1hdCdcbiAgICogcmVwcmVzZW50cyB0aGUgdGFyZ2V0IGZvcm1hdCBvZiB0aGUgdGVuc29yLiBBIHRyYW5zcG9zZSB3aWxsIGJlIHBlcmZvcm1lZCBpZiB0aGV5IGFyZSBkaWZmZXJlbnQuXG4gICAqL1xuICB0ZW5zb3JGb3JtYXQ/OiBJbWFnZUZvcm1hdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yRGF0YVR5cGUge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogJ2Zsb2F0MzInIHwgJ3VpbnQ4Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yTGF5b3V0IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgdGVuc29yIGxheW91dCB3aGVuIHJlcHJlc2VudGluZyBkYXRhIG9mIG9uZSBvciBtb3JlIGltYWdlKHMpLlxuICAgKi9cbiAgdGVuc29yTGF5b3V0PzogSW1hZ2VUZW5zb3JMYXlvdXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0RpbWVuc2lvbnMge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBoZWlnaHQgaW4gcGl4ZWxcbiAgICovXG4gIGhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2Ugd2lkdGggaW4gcGl4ZWxcbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgcmVzaXplZCBoZWlnaHQuIElmIG9taXR0ZWQsIG9yaWdpbmFsIGhlaWdodCB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICByZXNpemVkSGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogRGVzY3JpYmVzIHJlc2l6ZWQgd2lkdGggLSBjYW4gYmUgYWNjZXNzZWQgdmlhIHRlbnNvciBkaW1lbnNpb25zIGFzIHdlbGxcbiAgICovXG4gIHJlc2l6ZWRXaWR0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge1xuICAvKipcbiAgICogRGVzY3JpYmVzIG5vcm1hbGl6YXRpb24gcGFyYW1ldGVycyB3aGVuIHByZXByb2Nlc3NpbmcgdGhlIGltYWdlIGFzIG1vZGVsIGlucHV0LlxuICAgKlxuICAgKiBEYXRhIGVsZW1lbnQgYXJlIHJhbmdlZCBmcm9tIDAgdG8gMjU1LlxuICAgKi9cbiAgbm9ybT86IHtcbiAgICAvKipcbiAgICAgKiBUaGUgJ2JpYXMnIHZhbHVlIGZvciBpbWFnZSBub3JtYWxpemF0aW9uLlxuICAgICAqIC0gSWYgb21pdHRlZCwgdXNlIGRlZmF1bHQgdmFsdWUgMC5cbiAgICAgKiAtIElmIGl0J3MgYSBzaW5nbGUgbnVtYmVyLCBhcHBseSB0byBlYWNoIGNoYW5uZWxcbiAgICAgKiAtIElmIGl0J3MgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMsIGFwcGx5IGVsZW1lbnQtd2lzZS4gTnVtYmVyIG9mIGVsZW1lbnRzIG5lZWQgdG8gbWF0Y2ggdGhlIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcbiAgICAgKi9cbiAgICBiaWFzPzogbnVtYmVyIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgLyoqXG4gICAgICogVGhlICdtZWFuJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDI1NS5cbiAgICAgKiAtIElmIGl0J3MgYSBzaW5nbGUgbnVtYmVyLCBhcHBseSB0byBlYWNoIGNoYW5uZWxcbiAgICAgKiAtIElmIGl0J3MgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMsIGFwcGx5IGVsZW1lbnQtd2lzZS4gTnVtYmVyIG9mIGVsZW1lbnRzIG5lZWQgdG8gbWF0Y2ggdGhlIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcbiAgICAgKi9cbiAgICBtZWFuPzogbnVtYmVyIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIH07XG59XG5cbi8vICNlbmRyZWdpb25cblxuLy8gI3JlZ2lvbiBPcHRpb25zIGNvbXBvc2l0aW9uXG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgZXh0ZW5kc1xuICAgIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcbiAgZXh0ZW5kc1xuICAgIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbVVybE9wdGlvbnNcbiAgZXh0ZW5kc1xuICAgIE9wdGlvbnNEaW1lbnNpb25zLFxuICAgIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc1xuICBleHRlbmRzXG4gICAgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPlxuICBleHRlbmRzIFJlcXVpcmVkPE9wdGlvbnNEaW1lbnNpb25zPiwgT3B0aW9uc0Zvcm1hdCwgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4gLyogVE9ETzogYWRkIG1vcmUgKi8ge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cbiAgZXh0ZW5kcyBQaWNrPFRlbnNvciwgJ2RpbXMnPiwgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+XG4gIGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICBkYXRhVHlwZT86IFQ7XG59XG5cbi8vICNlbmRyZWdpb25cblxuLyoqXG4gKiB0eXBlIFRlbnNvckZhY3RvcnkgZGVmaW5lcyB0aGUgZmFjdG9yeSBmdW5jdGlvbnMgb2YgJ1RlbnNvcicgdG8gY3JlYXRlIHRlbnNvciBpbnN0YW5jZXMgZnJvbSBleGlzdGluZyBkYXRhIG9yXG4gKiByZXNvdXJjZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRmFjdG9yeSB7XG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZURhdGEgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZURhdGEgLSB0aGUgSW1hZ2VEYXRhIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEltYWdlRGF0YS5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKFxuICAgIGltYWdlRGF0YTogSW1hZ2VEYXRhLFxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIEhUTUxJbWFnZUVsZW1lbnQgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZUVsZW1lbnQgLSB0aGUgSFRNTEltYWdlRWxlbWVudCBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBIVE1MSW1hZ2VFbGVtZW50LlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UoXG4gICAgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBVUkxcbiAgICpcbiAgICogQHBhcmFtIHVybFNvdXJjZSAtIGEgc3RyaW5nIGFzIGEgVVJMIHRvIHRoZSBpbWFnZSBvciBhIGRhdGEgVVJMIGNvbnRhaW5pbmcgdGhlIGltYWdlIGRhdGEuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBVUkwuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZSh1cmxTb3VyY2U6IHN0cmluZywgb3B0aW9ucz86IFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZUJpdG1hcCBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGJpdG1hcCAtIHRoZSBJbWFnZUJpdG1hcCBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBVUkwuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShcbiAgICBiaXRtYXA6IEltYWdlQml0bWFwLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gICAqXG4gICAqIEBwYXJhbSB0ZXh0dXJlIC0gdGhlIFdlYkdMVGV4dHVyZSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBXZWJHTCB0ZXh0dXJlLlxuICAgKlxuICAgKiBUaGUgb3B0aW9ucyBpbmNsdWRlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIGB3aWR0aGA6IHRoZSB3aWR0aCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXG4gICAqIC0gYGhlaWdodGA6IHRoZSBoZWlnaHQgb2YgdGhlIHRleHR1cmUuIFJlcXVpcmVkLlxuICAgKiAtIGBmb3JtYXRgOiB0aGUgZm9ybWF0IG9mIHRoZSB0ZXh0dXJlLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ1JHQkEnLlxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIEdQVSB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YVxuICAgKiB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3RcbiAgICogbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiBHUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YSB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cbiAgICogVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJz4oXG4gICAgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbiAgKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSB0aGUgR1BVQnVmZmVyIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdQVSBidWZmZXIuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGFcbiAgICogd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0XG4gICAqIG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gR1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGEgd2lsbCBub3QgYmUgZGlzcG9zZWQuXG4gICAqIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tR3B1QnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICBidWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuICApOiBUeXBlZFRlbnNvcjxUPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJOTiBNTFRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gdGVuc29yIC0gdGhlIE1MVGVuc29yIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3IuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSB0aGUgTUxUZW5zb3IgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgTUxUZW5zb3JcbiAgICogZGF0YSB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IHRoZSBXZWJOTiBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuXG4gICAqIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gdGhlIFdlYk5OIE1MVGVuc29yLiBJZiBvbWl0dGVkLCB0aGUgTUxUZW5zb3Igd2lsbFxuICAgKiBub3QgYmUgZGlzcG9zZWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgdGhlIFdlYk5OIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0b1xuICAgKiBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbU1MVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+KFxuICAgIHRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxuICApOiBUeXBlZFRlbnNvcjxUPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBwcmUtYWxsb2NhdGVkIGJ1ZmZlci4gVGhlIGJ1ZmZlciB3aWxsIGJlIHVzZWQgYXMgYSBwaW5uZWQgYnVmZmVyLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIHRoZSB0ZW5zb3IgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gYSBUeXBlZEFycmF5IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGUuXG4gICAqIEBwYXJhbSBkaW1zIC0gc3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPj4oXG4gICAgdHlwZTogVCxcbiAgICBidWZmZXI6IFRlbnNvci5EYXRhVHlwZU1hcFtUXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqIEEgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyBhIGZpbGUncyBVUkwgb3IgcGF0aC5cbiAqXG4gKiBQYXRoIGlzIHZhaWxhYmxlIG9ubHkgaW4gb25ueHJ1bnRpbWUtbm9kZSBvciBvbm54cnVudGltZS13ZWIgcnVubmluZyBpbiBOb2RlLmpzLlxuICovXG5leHBvcnQgdHlwZSBGaWxlVXJsT3JQYXRoID0gc3RyaW5nO1xuXG4vKipcbiAqIEEgQmxvYiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZS5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZUJsb2IgPSBCbG9iO1xuXG4vKipcbiAqIEEgVWludDhBcnJheSwgQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZpbGUgY29udGVudC5cbiAqXG4gKiBXaGVuIGl0IGlzIGFuIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyLCB0aGUgd2hvbGUgYnVmZmVyIGlzIGFzc3VtZWQgdG8gYmUgdGhlIGZpbGUgY29udGVudC5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZURhdGEgPSBVaW50OEFycmF5IHwgQXJyYXlCdWZmZXJMaWtlO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBmaWxlIHRoYXQgY2FuIGJlIGxvYWRlZCBieSB0aGUgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJLlxuICovXG5leHBvcnQgdHlwZSBGaWxlVHlwZSA9IEZpbGVVcmxPclBhdGggfCBGaWxlQmxvYiB8IEZpbGVEYXRhO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBleHRlcm5hbCBkYXRhIGZpbGUuXG4gICAqL1xuICBkYXRhOiBGaWxlVHlwZTtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGZpbGUgcGF0aC5cbiAgICovXG4gIHBhdGg6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cbiAqXG4gKiBXaGVuIHVzaW5nIGEgc3RyaW5nLCBpdCBzaG91bGQgYmUgYSBmaWxlIFVSTCBvciBwYXRoIHRoYXQgaW4gdGhlIHNhbWUgZGlyZWN0b3J5IGFzIHRoZSBtb2RlbCBmaWxlLlxuICovXG5leHBvcnQgdHlwZSBFeHRlcm5hbERhdGFGaWxlVHlwZSA9IEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbiB8IEZpbGVVcmxPclBhdGg7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgbW9kZWwgbG9hZGluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPbm54TW9kZWxPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNwZWNpZnlpbmcgYSBsaXN0IG9mIGZpbGVzIHRoYXQgcmVwcmVzZW50cyB0aGUgZXh0ZXJuYWwgZGF0YS5cbiAgICovXG4gIGV4dGVybmFsRGF0YT86IHJlYWRvbmx5IEV4dGVybmFsRGF0YUZpbGVUeXBlW107XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgTm9uVGVuc29yVHlwZSA9IG5ldmVyO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlIFJlcHJlc2VudHMgYm90aCB0ZW5zb3JzIGFuZCBub24tdGVuc29ycyB2YWx1ZSBmb3IgbW9kZWwncyBpbnB1dHMvb3V0cHV0cy5cbiAqXG4gKiBOT1RFOiBjdXJyZW50bHkgbm90IHN1cHBvcnQgbm9uLXRlbnNvclxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWUgPSBUZW5zb3IgfCBOb25UZW5zb3JUeXBlO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uIHJlcHJlc2VudHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIG9mIGFuIE9ubnhWYWx1ZS5cbiAqL1xuZXhwb3J0IHR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uID0gVGVuc29yLkRhdGFMb2NhdGlvbjtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyoqXG4gKiAjIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSVxuICpcbiAqIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSSBpcyBhIHVuaWZpZWQgQVBJIGZvciBhbGwgSmF2YVNjcmlwdCB1c2FnZXMsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIE5QTSBwYWNrYWdlczpcbiAqXG4gKiAtIFtvbm54cnVudGltZS1ub2RlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1ub2RlKVxuICogLSBbb25ueHJ1bnRpbWUtd2ViXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS13ZWIpXG4gKiAtIFtvbm54cnVudGltZS1yZWFjdC1uYXRpdmVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZSlcbiAqXG4gKiBTZWUgYWxzbzpcbiAqIC0gW0dldCBTdGFydGVkXShodHRwczovL29ubnhydW50aW1lLmFpL2RvY3MvZ2V0LXN0YXJ0ZWQvd2l0aC1qYXZhc2NyaXB0LylcbiAqIC0gW0luZmVyZW5jZSBleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS1pbmZlcmVuY2UtZXhhbXBsZXMvdHJlZS9tYWluL2pzKVxuICpcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vYmFja2VuZC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2Vudi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdGVuc29yLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RyYWNlLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vb25ueC1tb2RlbC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5leHBvcnQgY29uc3QgaXNOb2RlID0gISEodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwid2Vid29ya2VyXCIgLz5cblxuLy9cbi8vICogdHlwZSBoYWNrIGZvciBcIkhUTUxJbWFnZUVsZW1lbnRcIlxuLy9cbi8vIGluIHR5cGVzY3JpcHQsIHRoZSB0eXBlIG9mIFwiSFRNTEltYWdlRWxlbWVudFwiIGlzIGRlZmluZWQgaW4gbGliLmRvbS5kLnRzLCB3aGljaCBpcyBjb25mbGljdCB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cy5cbi8vIHdoZW4gd2UgdXNlIHdlYndvcmtlciwgdGhlIGxpYi53ZWJ3b3JrZXIuZC50cyB3aWxsIGJlIHVzZWQsIHdoaWNoIGRvZXMgbm90IGhhdmUgSFRNTEltYWdlRWxlbWVudCBkZWZpbmVkLlxuLy9cbi8vIHdlIHdpbGwgZ2V0IHRoZSBmb2xsb3dpbmcgZXJyb3JzIGNvbXBsYWluaW5nIHRoYXQgSFRNTEltYWdlRWxlbWVudCBpcyBub3QgZGVmaW5lZDpcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vIC4uL2NvbW1vbi9kaXN0L2Nqcy90ZW5zb3ItZmFjdG9yeS5kLnRzOjE4NzoyOSAtIGVycm9yIFRTMjU1MjogQ2Fubm90IGZpbmQgbmFtZSAnSFRNTEltYWdlRWxlbWVudCcuIERpZCB5b3UgbWVhblxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xuLy9cbi8vIDE4NyAgICAgZnJvbUltYWdlKGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zKTpcbi8vIFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+Pjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5+fn5+fn5+flxuLy9cbi8vIG5vZGVfbW9kdWxlcy9Ad2ViZ3B1L3R5cGVzL2Rpc3QvaW5kZXguZC50czo4Mzo3IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXG4vLyAnSFRNTExJRWxlbWVudCc/XG4vL1xuLy8gODMgICAgIHwgSFRNTEltYWdlRWxlbWVudFxuLy8gICAgICAgICAgfn5+fn5+fn5+fn5+fn5+flxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gYEhUTUxJbWFnZUVsZW1lbnRgIGlzIG9ubHkgdXNlZCBpbiB0eXBlIGRlY2xhcmF0aW9uIGFuZCBub3QgaW4gcmVhbCBjb2RlLiBTbyB3ZSBkZWZpbmUgaXQgYXMgYHVua25vd25gIGhlcmUgdG9cbi8vIGJ5cGFzcyB0aGUgdHlwZSBjaGVjay5cblxuLy9cbi8vICogdHlwZSBoYWNrIGZvciBcImRvY3VtZW50XCJcbi8vXG4vLyBpbiB0eXBlc2NyaXB0LCB0aGUgdHlwZSBvZiBcImRvY3VtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHNvIGl0J3Mgbm90IGF2YWlsYWJsZSBpbiB3ZWJ3b3JrZXIuXG4vL1xuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBkb2N1bWVudCBpcyBub3QgZGVmaW5lZDpcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6MzMgLSBlcnJvciBUUzI1ODQ6IENhbm5vdCBmaW5kIG5hbWUgJ2RvY3VtZW50Jy4gRG8geW91IG5lZWQgdG8gY2hhbmdlIHlvdXIgdGFyZ2V0XG4vLyBsaWJyYXJ5PyBUcnkgY2hhbmdpbmcgdGhlICdsaWInIGNvbXBpbGVyIG9wdGlvbiB0byBpbmNsdWRlICdkb20nLlxuLy9cbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6Nzo2MSAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXG4vL1xuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6Nzo4OCAtIGVycm9yIFRTMjU1MjogQ2Fubm90IGZpbmQgbmFtZSAnSFRNTFNjcmlwdEVsZW1lbnQnLiBEaWQgeW91IG1lYW5cbi8vICdIVE1MTElFbGVtZW50Jz9cbi8vXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5+fn5+fn5+fn5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gYGRvY3VtZW50YCBpcyB1c2VkIHRvIGdldCB0aGUgY3VycmVudCBzY3JpcHQgVVJMLCB3aGljaCBpcyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci4gVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhXG4vLyBcImR1YWxcIiBmaWxlIGZvciBlbnRyaWVzIG9mIGJvdGggd2Vid29ya2VyIGFuZCB0aGUgZXNtIG1vZHVsZS5cbi8vXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHR5cGUgSFRNTEltYWdlRWxlbWVudCA9IHVua25vd247XG4gIHR5cGUgSFRNTFNjcmlwdEVsZW1lbnQgPSB7IHNyYz86IHN0cmluZyB9O1xuICBjb25zdCBkb2N1bWVudDogdW5kZWZpbmVkIHwgeyBjdXJyZW50U2NyaXB0PzogSFRNTFNjcmlwdEVsZW1lbnQgfTtcbn1cblxuLyoqXG4gKiBAc3VtbWFyeVxuICpcbiAqIFRoaXMgZmlsZSBpcyBzZXJ2ZWQgYXMgYSBcImR1YWxcIiBmaWxlIGZvciBib3RoIGVudHJpZXMgb2YgdGhlIGZvbGxvd2luZzpcbiAqIC0gVGhlIHByb3h5IHdvcmtlciBpdHNlbGYuXG4gKiAgIC0gV2hlbiB1c2VkIGFzIGEgd29ya2VyLCBpdCBsaXN0ZW5zIHRvIHRoZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluIHRocmVhZCBhbmQgcGVyZm9ybXMgdGhlIGNvcnJlc3BvbmRpbmcgb3BlcmF0aW9ucy5cbiAqICAgLSBTaG91bGQgYmUgaW1wb3J0ZWQgZGlyZWN0bHkgdXNpbmcgYG5ldyBXb3JrZXIoKWAgaW4gdGhlIG1haW4gdGhyZWFkLlxuICpcbiAqIC0gVGhlIEVTTSBtb2R1bGUgdGhhdCBjcmVhdGVzIHRoZSBwcm94eSB3b3JrZXIgKGFzIGEgd29ya2VyIGxhdW5jaGVyKS5cbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIgbGF1bmNoZXIsIGl0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciBhbmQgcmV0dXJucyBpdC5cbiAqICAgLSBTaG91bGQgYmUgaW1wb3J0ZWQgdXNpbmcgYGltcG9ydCgpYCBpbiB0aGUgbWFpbiB0aHJlYWQsIHdpdGggdGhlIHF1ZXJ5IHBhcmFtZXRlciBgaW1wb3J0PTFgLlxuICpcbiAqIFRoaXMgZmlsZSB3aWxsIGJlIGFsd2F5cyBjb21waWxpbmcgaW50byBFU00gZm9ybWF0LlxuICovXG5cbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1lc3NhZ2UsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhIH0gZnJvbSAnLi4vcHJveHktbWVzc2FnZXMuanMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlU2Vzc2lvbixcbiAgY29weUZyb21FeHRlcm5hbEJ1ZmZlcixcbiAgZW5kUHJvZmlsaW5nLFxuICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyxcbiAgaW5pdEVwLFxuICBpbml0UnVudGltZSxcbiAgcmVsZWFzZVNlc3Npb24sXG4gIHJ1bixcbn0gZnJvbSAnLi4vd2FzbS1jb3JlLWltcGwuanMnO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5IH0gZnJvbSAnLi4vd2FzbS1mYWN0b3J5LmpzJztcbmltcG9ydCB7IHNjcmlwdFNyYyB9IGZyb20gJy4uL3dhc20tdXRpbHMtaW1wb3J0LmpzJztcblxuY29uc3QgV09SS0VSX05BTUUgPSAnb3J0LXdhc20tcHJveHktd29ya2VyJztcbmNvbnN0IGlzUHJveHlXb3JrZXIgPSBnbG9iYWxUaGlzLnNlbGY/Lm5hbWUgPT09IFdPUktFUl9OQU1FO1xuXG5pZiAoaXNQcm94eVdvcmtlcikge1xuICAvLyBXb3JrZXIgdGhyZWFkXG4gIHNlbGYub25tZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8T3J0V2FzbU1lc3NhZ2U+KTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyB0eXBlLCBpbjogbWVzc2FnZSB9ID0gZXYuZGF0YTtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICAgICAgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KG1lc3NhZ2UhLndhc20pLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGluaXRSdW50aW1lKG1lc3NhZ2UhKS50aGVuKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5pdC1lcCc6IHtcbiAgICAgICAgICBjb25zdCB7IGVwTmFtZSwgZW52IH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBpbml0RXAoZW52LCBlcE5hbWUpLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvcHktZnJvbSc6IHtcbiAgICAgICAgICBjb25zdCB7IGJ1ZmZlciB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgY29uc3QgYnVmZmVyRGF0YSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIG91dDogYnVmZmVyRGF0YSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjcmVhdGUnOiB7XG4gICAgICAgICAgY29uc3QgeyBtb2RlbCwgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucykudGhlbihcbiAgICAgICAgICAgIChzZXNzaW9uTWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBvdXQ6IHNlc3Npb25NZXRhZGF0YSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3JlbGVhc2UnOlxuICAgICAgICAgIHJlbGVhc2VTZXNzaW9uKG1lc3NhZ2UhKTtcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3J1bic6IHtcbiAgICAgICAgICBjb25zdCB7IHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnMgfSA9IG1lc3NhZ2UhO1xuICAgICAgICAgIHJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBuZXcgQXJyYXkob3V0cHV0SW5kaWNlcy5sZW5ndGgpLmZpbGwobnVsbCksIG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICAob3V0cHV0cykgPT4ge1xuICAgICAgICAgICAgICBpZiAob3V0cHV0cy5zb21lKChvKSA9PiBvWzNdICE9PSAnY3B1JykpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVycjogJ1Byb3h5IGRvZXMgbm90IHN1cHBvcnQgbm9uLWNwdSB0ZW5zb3IgbG9jYXRpb24uJyB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShcbiAgICAgICAgICAgICAgICAgIHsgdHlwZSwgb3V0OiBvdXRwdXRzIH0sXG4gICAgICAgICAgICAgICAgICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhbLi4uaW5wdXRzLCAuLi5vdXRwdXRzXSBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzpcbiAgICAgICAgICBlbmRQcm9maWxpbmcobWVzc2FnZSEpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQcm94eVdvcmtlclxuICA/IG51bGxcbiAgOiAodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+XG4gICAgICBuZXcgV29ya2VyKHVybE92ZXJyaWRlID8/IHNjcmlwdFNyYyEsIHsgdHlwZTogQlVJTERfREVGUy5JU19FU00gPyAnbW9kdWxlJyA6ICdjbGFzc2ljJywgbmFtZTogV09SS0VSX05BTUUgfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1vZHVsZSB9IGZyb20gJy4vd2FzbS10eXBlcyc7XG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcblxuLyoqXG4gKiBUaGUgb3JpZ2luIG9mIHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICpcbiAqIEluIE5vZGUuanMsIHRoaXMgaXMgdW5kZWZpbmVkLlxuICovXG5jb25zdCBvcmlnaW4gPSBpc05vZGUgfHwgdHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGxvY2F0aW9uLm9yaWdpbjtcblxuLyoqXG4gKiBTb21lIGJ1bmRsZXJzIChlZy4gV2VicGFjaykgd2lsbCByZXdyaXRlIGBpbXBvcnQubWV0YS51cmxgIHRvIGEgZmlsZSBVUkwgYXQgY29tcGlsZSB0aW1lLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIGBpbXBvcnQubWV0YS51cmxgIHN0YXJ0cyB3aXRoIGBmaWxlOmAsIGJ1dCB1c2luZyB0aGUgYD5gIGFuZCBgPGAgb3BlcmF0b3JzIGluc3RlYWQgb2ZcbiAqIGBzdGFydHNXaXRoYCBmdW5jdGlvbiBzbyB0aGF0IGNvZGUgbWluaW1pemVycyBjYW4gcmVtb3ZlIHRoZSBkZWFkIGNvZGUgY29ycmVjdGx5LlxuICpcbiAqIEZvciBleGFtcGxlLCBpZiB3ZSB1c2UgdGVyc2VyIHRvIG1pbmlmeSB0aGUgZm9sbG93aW5nIGNvZGU6XG4gKiBgYGBqc1xuICogaWYgKFwiZmlsZTovL2hhcmQtY29kZWQtZmlsZW5hbWVcIi5zdGFydHNXaXRoKFwiZmlsZTpcIikpIHtcbiAqICAgY29uc29sZS5sb2coMSlcbiAqIH0gZWxzZSB7XG4gKiAgIGNvbnNvbGUubG9nKDIpXG4gKiB9XG4gKlxuICogaWYgKFwiZmlsZTovL2hhcmQtY29kZWQtZmlsZW5hbWVcIiA+IFwiZmlsZTpcIiAmJiBcImZpbGU6Ly9oYXJkLWNvZGVkLWZpbGVuYW1lXCIgPCBcImZpbGU7XCIpIHtcbiAqICAgY29uc29sZS5sb2coMylcbiAqIH0gZWxzZSB7XG4gKiAgIGNvbnNvbGUubG9nKDQpXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBUaGUgbWluaWZpZWQgY29kZSB3aWxsIGJlOlxuICogYGBganNcbiAqIFwiZmlsZTovL2hhcmQtY29kZWQtZmlsZW5hbWVcIi5zdGFydHNXaXRoKFwiZmlsZTpcIik/Y29uc29sZS5sb2coMSk6Y29uc29sZS5sb2coMiksY29uc29sZS5sb2coMyk7XG4gKiBgYGBcbiAqXG4gKiAodXNlIFRlcnNlciA1LjM5LjAgd2l0aCBkZWZhdWx0IG9wdGlvbnMsIGh0dHBzOi8vdHJ5LnRlcnNlci5vcmcvKVxuICpcbiAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGltcG9ydC5tZXRhLnVybCBpcyBoYXJkY29kZWQgYXMgYSBmaWxlIFVSSS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSA9XG4gIEJVSUxEX0RFRlMuSVNfRVNNICYmIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCEgPiAnZmlsZTonICYmIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCEgPCAnZmlsZTsnO1xuXG5jb25zdCBnZXRTY3JpcHRTcmMgPSAoKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgLy8gaWYgTm9kZWpzLCByZXR1cm4gdW5kZWZpbmVkXG4gIGlmIChpc05vZGUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIC8vIGlmIEl0J3MgRVNNLCB1c2UgaW1wb3J0Lm1ldGEudXJsXG4gIGlmIChCVUlMRF9ERUZTLklTX0VTTSkge1xuICAgIC8vIEZvciBFU00sIGlmIHRoZSBpbXBvcnQubWV0YS51cmwgaXMgYSBmaWxlIFVSTCwgdGhpcyB1c3VhbGx5IG1lYW5zIHRoZSBidW5kbGVyIHJld3JpdGVzIGBpbXBvcnQubWV0YS51cmxgIHRvXG4gICAgLy8gdGhlIGZpbGUgcGF0aCBhdCBjb21waWxlIHRpbWUuIEluIHRoaXMgY2FzZSwgdGhpcyBmaWxlIHBhdGggY2Fubm90IGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBydW50aW1lIFVSTC5cbiAgICAvL1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIHRoZSBVUkwgY29uc3RydWN0b3IgbGlrZSB0aGlzOlxuICAgIC8vIGBgYGpzXG4gICAgLy8gbmV3IFVSTCgnYWN0dWFsLWJ1bmRsZS1uYW1lLmpzJywgaW1wb3J0Lm1ldGEudXJsKS5ocmVmXG4gICAgLy8gYGBgXG4gICAgLy8gU28gdGhhdCBidW5kbGVyIGNhbiBwcmVwcm9jZXNzIHRoZSBVUkwgY29ycmVjdGx5LlxuICAgIGlmIChpc0VzbUltcG9ydE1ldGFVcmxIYXJkY29kZWRBc0ZpbGVVcmkpIHtcbiAgICAgIC8vIGlmIHRoZSByZXdyaXR0ZW4gVVJMIGlzIGEgcmVsYXRpdmUgcGF0aCwgd2UgbmVlZCB0byB1c2UgdGhlIG9yaWdpbiB0byByZXNvbHZlIHRoZSBVUkwuXG5cbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgaXMgYSB3b3JrYXJvdW5kIGZvciBWaXRlLlxuICAgICAgLy9cbiAgICAgIC8vIFZpdGUgdXNlcyBhIGJ1bmRsZXIocm9sbHVwL3JvbGxkb3duKSB0aGF0IGRvZXMgbm90IHJld3JpdGUgYGltcG9ydC5tZXRhLnVybGAgdG8gYSBmaWxlIFVSTC4gU28gaW4gdGhlb3J5LCB0aGlzXG4gICAgICAvLyBjb2RlIHBhdGggc2hvdWxkIG5vdCBiZSBleGVjdXRlZCBpbiBWaXRlLiBIb3dldmVyLCB0aGUgYnVuZGxlciBkb2VzIG5vdCBrbm93IGl0IGFuZCBpdCBzdGlsbCB0cnkgdG8gbG9hZCB0aGVcbiAgICAgIC8vIGZvbGxvd2luZyBwYXR0ZXJuOlxuICAgICAgLy8gLSBgcmV0dXJuIG5ldyBVUkwoJ2ZpbGVuYW1lJywgaW1wb3J0Lm1ldGEudXJsKS5ocmVmYFxuICAgICAgLy9cbiAgICAgIC8vIEJ5IHJlcGxhY2luZyB0aGUgcGF0dGVybiBhYm92ZSB3aXRoIHRoZSBmb2xsb3dpbmcgY29kZSwgd2UgY2FuIHNraXAgdGhlIHJlc291cmNlIGxvYWRpbmcgYmVoYXZpb3I6XG4gICAgICAvLyAtIGBjb25zdCBVUkwyID0gVVJMOyByZXR1cm4gbmV3IFVSTDIoJ2ZpbGVuYW1lJywgaW1wb3J0Lm1ldGEudXJsKS5ocmVmO2BcbiAgICAgIC8vXG4gICAgICAvLyBBbmQgaXQgc3RpbGwgd29ya3MgaW4gV2VicGFjay5cbiAgICAgIGNvbnN0IFVSTDIgPSBVUkw7XG4gICAgICByZXR1cm4gbmV3IFVSTChuZXcgVVJMMihCVUlMRF9ERUZTLkJVTkRMRV9GSUxFTkFNRSwgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMKS5ocmVmLCBvcmlnaW4pLmhyZWY7XG4gICAgfVxuXG4gICAgcmV0dXJuIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTDtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICAgPyAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyY1xuICAgIDogLy8gdXNlIGBzZWxmLmxvY2F0aW9uLmhyZWZgIGlmIGF2YWlsYWJsZVxuICAgICAgdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IHNlbGYubG9jYXRpb24/LmhyZWZcbiAgICAgIDogdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBUaGUgY2xhc3NpYyBzY3JpcHQgc291cmNlIFVSTC4gVGhpcyBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZSBpbiBub24gRVNNb2R1bGUgZW52aXJvbm1lbnRzLlxuICpcbiAqIEluIE5vZGUuanMsIHRoaXMgaXMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gZ2V0U2NyaXB0U3JjKCk7XG5cbi8qKlxuICogSW5mZXIgdGhlIHdhc20gcGF0aCBwcmVmaXggZnJvbSB0aGUgc2NyaXB0IHNvdXJjZSBVUkwuXG4gKlxuICogQHJldHVybnMgVGhlIGluZmVycmVkIHdhc20gcGF0aCBwcmVmaXgsIG9yIHVuZGVmaW5lZCBpZiB0aGUgc2NyaXB0IHNvdXJjZSBVUkwgaXMgbm90IGF2YWlsYWJsZSBvciBpcyBhIGJsb2IgVVJMLlxuICovXG5leHBvcnQgY29uc3QgaW5mZXJXYXNtUGF0aFByZWZpeEZyb21TY3JpcHRTcmMgPSAoKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKHNjcmlwdFNyYyAmJiAhc2NyaXB0U3JjLnN0YXJ0c1dpdGgoJ2Jsb2I6JykpIHtcbiAgICByZXR1cm4gc2NyaXB0U3JjLnN1YnN0cmluZygwLCBzY3JpcHRTcmMubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBmaWxlbmFtZSB3aXRoIHByZWZpeCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAqL1xuY29uc3QgaXNTYW1lT3JpZ2luID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgYmFzZVVybCA9IHByZWZpeE92ZXJyaWRlID8/IHNjcmlwdFNyYztcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsID8gbmV3IFVSTChmaWxlbmFtZSwgYmFzZVVybCkgOiBuZXcgVVJMKGZpbGVuYW1lKTtcbiAgICByZXR1cm4gdXJsLm9yaWdpbiA9PT0gb3JpZ2luO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBpbnB1dHMgdG8gYW4gYWJzb2x1dGUgVVJMIHdpdGggdGhlIGdpdmVuIHByZWZpeCBvdmVycmlkZS4gSWYgZmFpbGVkLCByZXR1cm4gdW5kZWZpbmVkLlxuICovXG5jb25zdCBub3JtYWxpemVVcmwgPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgYmFzZVVybCA9IHByZWZpeE92ZXJyaWRlID8/IHNjcmlwdFNyYztcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsID8gbmV3IFVSTChmaWxlbmFtZSwgYmFzZVVybCkgOiBuZXcgVVJMKGZpbGVuYW1lKTtcbiAgICByZXR1cm4gdXJsLmhyZWY7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFsbGJhY2sgVVJMIGlmIGFuIGFic29sdXRlIFVSTCBjYW5ub3QgYmUgY3JlYXRlZCBieSB0aGUgbm9ybWFsaXplVXJsIGZ1bmN0aW9uLlxuICovXG5jb25zdCBmYWxsYmFja1VybCA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4gYCR7cHJlZml4T3ZlcnJpZGUgPz8gJy4vJ30ke2ZpbGVuYW1lfWA7XG5cbi8qKlxuICogVGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdXNlZCB0byBwcmVsb2FkIGEgbW9kdWxlIGZyb20gYSBVUkwuXG4gKlxuICogSWYgdGhlIG9yaWdpbiBvZiB0aGUgd29ya2VyIFVSTCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBvcmlnaW4sIHRoZSB3b3JrZXIgY2Fubm90IGJlIGxvYWRlZCBkaXJlY3RseS5cbiAqIFNlZSBkaXNjdXNzaW9ucyBpbiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3dvcmtlci1sb2FkZXIvaXNzdWVzLzE1NFxuICpcbiAqIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBmZXRjaCB0aGUgd29ya2VyIFVSTCBhbmQgY3JlYXRlIGEgbmV3IEJsb2IgVVJMIHdpdGggdGhlIHNhbWUgb3JpZ2luIGFzIGEgd29ya2Fyb3VuZC5cbiAqXG4gKiBAcGFyYW0gYWJzb2x1dGVVcmwgLSBUaGUgYWJzb2x1dGUgVVJMIHRvIHByZWxvYWQuXG4gKlxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG5ldyBCbG9iIFVSTFxuICovXG5jb25zdCBwcmVsb2FkID0gYXN5bmMgKGFic29sdXRlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFic29sdXRlVXJsLCB7IGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nIH0pO1xuICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbn07XG5cbi8qKlxuICogVGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdXNlZCB0byBkeW5hbWljYWxseSBpbXBvcnQgYSBtb2R1bGUgZnJvbSBhIFVSTC5cbiAqXG4gKiBUaGUgYnVpbGQgc2NyaXB0IGhhcyBzcGVjaWFsIGhhbmRsaW5nIGZvciB0aGlzIGZ1bmN0aW9uIHRvIGVuc3VyZSB0aGF0IHRoZSBVUkwgaXMgbm90IGJ1bmRsZWQgaW50byB0aGUgZmluYWwgb3V0cHV0LlxuICpcbiAqIEBwYXJhbSB1cmwgLSBUaGUgVVJMIHRvIGltcG9ydC5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBkZWZhdWx0IGV4cG9ydCBvZiB0aGUgbW9kdWxlLlxuICovXG5jb25zdCBkeW5hbWljSW1wb3J0RGVmYXVsdCA9IGFzeW5jIDxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4gPT5cbiAgKGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIC8qIEB2aXRlLWlnbm9yZSAqLyB1cmwpKS5kZWZhdWx0O1xuXG4vKipcbiAqIFRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSBpbXBvcnRlZCBmcm9tIHRoZSBwcm94eSB3b3JrZXIgbW9kdWxlLlxuICpcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgV2ViQXNzZW1ibHkgcHJveHkgaXMgbm90IGRpc2FibGVkLlxuICovXG5jb25zdCBjcmVhdGVQcm94eVdvcmtlcjogKCh1cmxPdmVycmlkZT86IHN0cmluZykgPT4gV29ya2VyKSB8IHVuZGVmaW5lZCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gIEJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZID8gdW5kZWZpbmVkIDogcmVxdWlyZSgnLi9wcm94eS13b3JrZXIvbWFpbicpLmRlZmF1bHQ7XG5cbi8qKlxuICogSW1wb3J0IHRoZSBwcm94eSB3b3JrZXIuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBzdGVwczpcbiAqIDEuIElmIGEgcHJlbG9hZCBpcyBuZWVkZWQsIGl0IHdpbGwgcHJlbG9hZCB0aGUgbW9kdWxlIGFuZCByZXR1cm4gdGhlIG9iamVjdCBVUkwuXG4gKiAyLiBVc2UgdGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IHRvIGNyZWF0ZSB0aGUgcHJveHkgd29ya2VyLlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiAyIGVsZW1lbnRzOlxuICogICAgICAgICAgICAtIFRoZSBvYmplY3QgVVJMIG9mIHRoZSBwcmVsb2FkZWQgbW9kdWxlLCBvciB1bmRlZmluZWQgaWYgbm8gcHJlbG9hZCBpcyBuZWVkZWQuXG4gKiAgICAgICAgICAgIC0gVGhlIHByb3h5IHdvcmtlci5cbiAqL1xuZXhwb3J0IGNvbnN0IGltcG9ydFByb3h5V29ya2VyID0gYXN5bmMgKCk6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgV29ya2VyXT4gPT4ge1xuICBpZiAoIXNjcmlwdFNyYykge1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgcHJveHkgd29ya2VyOiBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBzY3JpcHQgc291cmNlIFVSTC4nKTtcbiAgfVxuXG4gIC8vIElmIHRoZSBzY3JpcHQgc291cmNlIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gdXNlIHRoZSBlbWJlZGRlZCBwcm94eSBtb2R1bGUgZGlyZWN0bHkuXG4gIGlmIChpc1NhbWVPcmlnaW4oc2NyaXB0U3JjKSkge1xuICAgIHJldHVybiBbdW5kZWZpbmVkLCBjcmVhdGVQcm94eVdvcmtlciEoKV07XG4gIH1cblxuICAvLyBPdGhlcndpc2UsIG5lZWQgdG8gcHJlbG9hZFxuICBjb25zdCB1cmwgPSBhd2FpdCBwcmVsb2FkKHNjcmlwdFNyYyk7XG4gIHJldHVybiBbdXJsLCBjcmVhdGVQcm94eVdvcmtlciEodXJsKV07XG59O1xuXG4vKipcbiAqIFRoZSBlbWJlZGRlZCBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKlxuICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSBpbiBFU00gYW5kIHdoZW4gZW1iZWRkaW5nIGlzIG5vdCBkaXNhYmxlZC5cbiAqL1xuY29uc3QgZW1iZWRkZWRXYXNtTW9kdWxlOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPiB8IHVuZGVmaW5lZCA9XG4gIEJVSUxEX0RFRlMuSVNfRVNNICYmIEJVSUxEX0RFRlMuRU5BQkxFX0JVTkRMRV9XQVNNX0pTXG4gICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICAgICAgcmVxdWlyZShcbiAgICAgICAgIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQXG4gICAgICAgICAgPyAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJ1xuICAgICAgICAgIDogQlVJTERfREVGUy5FTkFCTEVfSlNQSVxuICAgICAgICAgICAgPyAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzcGkubWpzJ1xuICAgICAgICAgICAgOiAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVVxuICAgICAgICAgICAgICA/ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkubWpzJ1xuICAgICAgICAgICAgICA6ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJyxcbiAgICAgICkuZGVmYXVsdFxuICAgIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEltcG9ydCB0aGUgV2ViQXNzZW1ibHkgbW9kdWxlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gKiAxLiBJZiB0aGUgZW1iZWRkZWQgbW9kdWxlIGV4aXN0cyBhbmQgbm8gY3VzdG9tIFVSTCBpcyBzcGVjaWZpZWQsIHVzZSB0aGUgZW1iZWRkZWQgbW9kdWxlLlxuICogMi4gSWYgYSBwcmVsb2FkIGlzIG5lZWRlZCwgaXQgd2lsbCBwcmVsb2FkIHRoZSBtb2R1bGUgYW5kIHJldHVybiB0aGUgb2JqZWN0IFVSTC5cbiAqIDMuIE90aGVyd2lzZSwgaXQgd2lsbCBwZXJmb3JtIGEgZHluYW1pYyBpbXBvcnQgb2YgdGhlIG1vZHVsZS5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxuICogICAgICAgICAgICAtIFRoZSBkZWZhdWx0IGV4cG9ydCBvZiB0aGUgbW9kdWxlLCB3aGljaCBpcyBhIGZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRXYXNtTW9kdWxlID0gYXN5bmMgKFxuICB1cmxPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBwcmVmaXhPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBpc011bHRpVGhyZWFkZWQ6IGJvb2xlYW4sXG4gIGlzV2FzbU92ZXJyaWRkZW46IGJvb2xlYW4sXG4pOiBQcm9taXNlPFt1bmRlZmluZWQgfCBzdHJpbmcsIEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+XT4gPT4ge1xuICAvL1xuICAvLyBDaGVjayBpZiB3ZSBzaG91bGQgdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUuXG4gIC8vXG5cbiAgLy8gVG8gdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUsIGl0IHNob3VsZCBiZSBhdmFpbGFibGUsIGFuZCBubyBVUkwgb3ZlcnJpZGUgb3IgcHJlZml4IG92ZXJyaWRlIHNob3VsZCBiZSBzcGVjaWZpZWQuXG4gIGxldCB1c2VFbWJlZGRlZE1vZHVsZSA9IGVtYmVkZGVkV2FzbU1vZHVsZSAmJiAhKHVybE92ZXJyaWRlIHx8IHByZWZpeE92ZXJyaWRlKTtcbiAgaWYgKHVzZUVtYmVkZGVkTW9kdWxlKSB7XG4gICAgaWYgKCFzY3JpcHRTcmMpIHtcbiAgICAgIC8vIG5vIFVSTCBpbmZvIGF2YWlsYWJsZS5cbiAgICAgIC8vXG4gICAgICAvLyBOb3RlOiB3aGVuIHRoZSBlbWJlZGRlZCBtb2R1bGUgaXMgYXZhaWxhYmxlLCBpdCBtZWFucyB0aGUgY3VycmVudCBzY3JpcHQgaXMgRVNNLiBVc3VhbGx5LCBpbiBFU00sIHRoZVxuICAgICAgLy8gYGltcG9ydC5tZXRhLnVybGAgaXMgYXZhaWxhYmxlLiBCdXQgaW4gc29tZSBjYXNlcyAoZWcuIENsb3VkZmxhcmUgV29ya2VycyksIHRoZSB2YWx1ZSBvZiBgaW1wb3J0Lm1ldGEudXJsYFxuICAgICAgLy8gY2FuIGJlIGBudWxsYCBvciBgdW5kZWZpbmVkYC4gSW4gdGhpcyBjYXNlLCB3ZSBjYW4gb25seSBsb2FkIHRoZSBlbWJlZGRlZCBtb2R1bGUgd2hlbjpcbiAgICAgIC8vXG4gICAgICAvLyAxLiBUaGUgV2ViQXNzZW1ibHkgbW9kdWxlIGJpbmFyeSBpcyBvdmVycmlkZGVuOlxuICAgICAgLy8gICAgYGBganNcbiAgICAgIC8vICAgIGVudi53YXNtLndhc21QYXRocyA9IHVuZGVmaW5lZDsgIC8vIG9yIG5vdCBzcGVjaWZpZWRcbiAgICAgIC8vICAgIGVudi53YXNtLndhc21CaW5hcnkgPSAvKiBhIFVpbnQ4QXJyYXkgY29udGFpbmluZyB0aGUgV2ViQXNzZW1ibHkgYmluYXJ5ICovO1xuICAgICAgLy8gICAgYGBgXG4gICAgICAvL1xuICAgICAgLy8gMi4gVGhlIFwiLndhc21cIiBvbmx5IGlzIG92ZXJyaWRkZW4uXG4gICAgICAvLyAgICBgYGBqc1xuICAgICAgLy8gICAgZW52Lndhc20ud2FzbVBhdGhzID0geyB3YXNtOiAvKiBVUkwgb2YgdGhlIC53YXNtIGZpbGUgKi8gfTtcbiAgICAgIC8vICAgIGBgYFxuICAgICAgLy9cbiAgICAgIGlmIChpc1dhc21PdmVycmlkZGVuICYmICFpc011bHRpVGhyZWFkZWQpIHtcbiAgICAgICAgdXNlRW1iZWRkZWRNb2R1bGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZGV0ZXJtaW5lIHRoZSBzY3JpcHQgc291cmNlIFVSTC4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgdGhlIHNjcmlwdCBzb3VyY2UgaXMgYXZhaWxhYmxlLCB3ZSBjYW4gY2hlY2sgaWYgaXQgaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gICAgICAvLyBBbHNvIHVzZSB0aGUgZW1iZWRkZWQgbW9kdWxlIHdoZW4gd2FzbUJpbmFyeSBpcyBwcm92aWRlZCBhbmQgc2luZ2xlLXRocmVhZGVkIChlZy4gQmxvYiBVUkwgd29ya2Vyc1xuICAgICAgLy8gd2hlcmUgaXNTYW1lT3JpZ2luIGZhaWxzIGJ1dCBubyBmaWxlIHJlc29sdXRpb24gb3Igd29ya2VyIHNwYXduaW5nIGlzIG5lZWRlZCkuXG4gICAgICB1c2VFbWJlZGRlZE1vZHVsZSA9IGlzU2FtZU9yaWdpbihzY3JpcHRTcmMpIHx8IChpc1dhc21PdmVycmlkZGVuICYmICFpc011bHRpVGhyZWFkZWQpO1xuICAgIH1cbiAgfVxuICBpZiAodXNlRW1iZWRkZWRNb2R1bGUpIHtcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgZW1iZWRkZWRXYXNtTW9kdWxlIV07XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgd2FzbU1vZHVsZUZpbGVuYW1lID0gIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQXG4gICAgICA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJ1xuICAgICAgOiBCVUlMRF9ERUZTLkVOQUJMRV9KU1BJXG4gICAgICAgID8gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNwaS5tanMnXG4gICAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcbiAgICAgICAgICA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lm1qcydcbiAgICAgICAgICA6ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qcyc7XG4gICAgY29uc3Qgd2FzbU1vZHVsZVVybCA9IHVybE92ZXJyaWRlID8/IG5vcm1hbGl6ZVVybCh3YXNtTW9kdWxlRmlsZW5hbWUsIHByZWZpeE92ZXJyaWRlKTtcbiAgICAvLyBuZWVkIHRvIHByZWxvYWQgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICAgIC8vIDEuIG5vdCBpbiBOb2RlLmpzLlxuICAgIC8vICAgIC0gTm9kZS5qcyBkb2VzIG5vdCBoYXZlIHRoZSBzYW1lIG9yaWdpbiBwb2xpY3kgZm9yIGNyZWF0aW5nIHdvcmtlcnMuXG4gICAgLy8gMi4gbXVsdGktdGhyZWFkZWQgaXMgZW5hYmxlZC5cbiAgICAvLyAgICAtIElmIG11bHRpLXRocmVhZGVkIGlzIGRpc2FibGVkLCBubyB3b3JrZXIgd2lsbCBiZSBjcmVhdGVkLiBTbyB3ZSBkb24ndCBuZWVkIHRvIHByZWxvYWQgdGhlIG1vZHVsZS5cbiAgICAvLyAzLiB0aGUgYWJzb2x1dGUgVVJMIGlzIGF2YWlsYWJsZS5cbiAgICAvLyAgICAtIElmIHRoZSBhYnNvbHV0ZSBVUkwgaXMgZmFpbGVkIHRvIGJlIGNyZWF0ZWQsIHRoZSBvcmlnaW4gY2Fubm90IGJlIGRldGVybWluZWQuIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBub3RcbiAgICAvLyAgICBwcmVsb2FkIHRoZSBtb2R1bGUuXG4gICAgLy8gNC4gdGhlIHdvcmtlciBVUkwgaXMgbm90IGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICAgIC8vICAgIC0gSWYgdGhlIHdvcmtlciBVUkwgaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4sIHdlIGNhbiBjcmVhdGUgdGhlIHdvcmtlciBkaXJlY3RseS5cbiAgICBjb25zdCBuZWVkUHJlbG9hZCA9ICFpc05vZGUgJiYgaXNNdWx0aVRocmVhZGVkICYmIHdhc21Nb2R1bGVVcmwgJiYgIWlzU2FtZU9yaWdpbih3YXNtTW9kdWxlVXJsLCBwcmVmaXhPdmVycmlkZSk7XG4gICAgY29uc3QgdXJsID0gbmVlZFByZWxvYWRcbiAgICAgID8gYXdhaXQgcHJlbG9hZCh3YXNtTW9kdWxlVXJsKVxuICAgICAgOiAod2FzbU1vZHVsZVVybCA/PyBmYWxsYmFja1VybCh3YXNtTW9kdWxlRmlsZW5hbWUsIHByZWZpeE92ZXJyaWRlKSk7XG4gICAgcmV0dXJuIFtuZWVkUHJlbG9hZCA/IHVybCA6IHVuZGVmaW5lZCwgYXdhaXQgZHluYW1pY0ltcG9ydERlZmF1bHQ8RW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT4+KHVybCldO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBFbnYgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgdHlwZSB7IE9ydFdhc21Nb2R1bGUgfSBmcm9tICcuL3dhc20tdHlwZXMnO1xuaW1wb3J0IHsgaW1wb3J0V2FzbU1vZHVsZSwgaW5mZXJXYXNtUGF0aFByZWZpeEZyb21TY3JpcHRTcmMgfSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcblxubGV0IHdhc206IE9ydFdhc21Nb2R1bGUgfCB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5cbmNvbnN0IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIC8vIElmICdTaGFyZWRBcnJheUJ1ZmZlcicgaXMgbm90IGF2YWlsYWJsZSwgV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdCB3b3JrLlxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgdHJhbnNmZXJhYmlsaXR5IG9mIFNBQnMgKGZvciBicm93c2Vycy4gbmVlZGVkIGZvciBGaXJlZm94KVxuICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFtc2cvbW96aWxsYS5kZXYucGxhdGZvcm0vSUhrQlpsSEVUcEEvZHdzTU5jaFdFUUFKXG4gICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5ldyBNZXNzYWdlQ2hhbm5lbCgpLnBvcnQxLnBvc3RNZXNzYWdlKG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigxKSk7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgdGhyZWFkcyBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIHRocmVhZGVkIGluc3RydWN0aW9ucy5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXG4gICAgICBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDUsIDQsIDEsIDMsIDEsIDEsIDEwLCAxMSwgMSwgOSwgMCwgNjUsIDAsIDI1NCwgMTYsXG4gICAgICAgIDIsIDAsIDI2LCAxMSxcbiAgICAgIF0pLFxuICAgICk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgaXNTaW1kU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBTSU1EIGluc3RydWN0aW9ucy5cblxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XG4gICAgLy9cbiAgICAvLyAobW9kdWxlXG4gICAgLy8gICAodHlwZSAkdDAgKGZ1bmMpKVxuICAgIC8vICAgKGZ1bmMgJGYwICh0eXBlICR0MClcbiAgICAvLyAgICAgKGRyb3BcbiAgICAvLyAgICAgICAoaTMyeDQuZG90X2kxNng4X3NcbiAgICAvLyAgICAgICAgIChpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxuICAgIC8vICAgICAgICAgKHYxMjguY29uc3QgaTMyeDQgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCkpKSkpXG5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXG4gICAgICBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDEwLCAzMCwgMSwgMjgsIDAsIDY1LCAwLCAyNTMsIDE1LCAyNTMsIDEyLCAwLCAwLCAwLFxuICAgICAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAyNTMsIDE4NiwgMSwgMjYsIDExLFxuICAgICAgXSksXG4gICAgKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBpc1JlbGF4ZWRTaW1kU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFJlbGF4ZWQgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIFJlbGF4ZWQgU0lNRCBpbnN0cnVjdGlvbnMuXG5cbiAgICAvLyBUaGUgYmluYXJ5IGRhdGEgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIGJ5IHdhdDJ3YXNtOlxuICAgIC8vIChtb2R1bGVcbiAgICAvLyAgIChmdW5jIChyZXN1bHQgdjEyOClcbiAgICAvLyAgICAgIGkzMi5jb25zdCAxXG4gICAgLy8gICAgICBpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgaTMyLmNvbnN0IDJcbiAgICAvLyAgICAgIGk4eDE2LnNwbGF0XG4gICAgLy8gICAgICBpMzIuY29uc3QgM1xuICAgIC8vICAgICAgaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgIGkzMng0LnJlbGF4ZWRfZG90X2k4eDE2X2k3eDE2X2FkZF9zXG4gICAgLy8gICApXG4gICAgLy8gIClcbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXG4gICAgICBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNSwgMSwgOTYsIDAsIDEsIDEyMywgMywgMiwgMSwgMCwgMTAsIDE5LCAxLCAxNywgMCwgNjUsIDEsIDI1MywgMTUsIDY1LCAyLCAyNTMsXG4gICAgICAgIDE1LCA2NSwgMywgMjUzLCAxNSwgMjUzLCAxNDcsIDIsIDExLFxuICAgICAgXSksXG4gICAgKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5ID0gYXN5bmMgKGZsYWdzOiBFbnYuV2ViQXNzZW1ibHlGbGFncyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRpYWxpemluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm11bHRpcGxlIGNhbGxzIHRvICdpbml0aWFsaXplV2ViQXNzZW1ibHkoKScgZGV0ZWN0ZWQuXCIpO1xuICB9XG4gIGlmIChhYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicHJldmlvdXMgY2FsbCB0byAnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KCknIGZhaWxlZC5cIik7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIC8vIHdhc20gZmxhZ3MgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgY29uc3QgdGltZW91dCA9IGZsYWdzLmluaXRUaW1lb3V0ITtcbiAgbGV0IG51bVRocmVhZHMgPSBmbGFncy5udW1UaHJlYWRzITtcblxuICAvLyBlbnN1cmUgU0lNRCBpcyBzdXBwb3J0ZWRcbiAgaWYgKGZsYWdzLnNpbWQgPT09IGZhbHNlKSB7XG4gICAgLy8gc2tpcCBTSU1EIGZlYXR1cmUgY2hlY2tpbmcgYXMgaXQgaXMgZGlzYWJsZWQgZXhwbGljaXRseSBieSB1c2VyXG4gIH0gZWxzZSBpZiAoZmxhZ3Muc2ltZCA9PT0gJ3JlbGF4ZWQnKSB7XG4gICAgLy8gY2hlY2sgaWYgcmVsYXhlZCBTSU1EIGlzIHN1cHBvcnRlZFxuICAgIGlmICghaXNSZWxheGVkU2ltZFN1cHBvcnRlZCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbGF4ZWQgV2ViQXNzZW1ibHkgU0lNRCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LicpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghaXNTaW1kU3VwcG9ydGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IFNJTUQgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4nKTtcbiAgfVxuXG4gIGlmIChCVUlMRF9ERUZTLkVOQUJMRV9KU1BJKSB7XG4gICAgaWYgKCEoJ1N1c3BlbmRpbmcnIGluIFdlYkFzc2VtYmx5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBKU1BJIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2sgaWYgbXVsdGktdGhyZWFkaW5nIGlzIHN1cHBvcnRlZFxuICBjb25zdCBtdWx0aVRocmVhZFN1cHBvcnRlZCA9IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcbiAgaWYgKG51bVRocmVhZHMgPiAxICYmICFtdWx0aVRocmVhZFN1cHBvcnRlZCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ2Vudi53YXNtLm51bVRocmVhZHMgaXMgc2V0IHRvICcgK1xuICAgICAgICAgIG51bVRocmVhZHMgK1xuICAgICAgICAgICcsIGJ1dCB0aGlzIHdpbGwgbm90IHdvcmsgdW5sZXNzIHlvdSBlbmFibGUgY3Jvc3NPcmlnaW5Jc29sYXRlZCBtb2RlLiAnICtcbiAgICAgICAgICAnU2VlIGh0dHBzOi8vd2ViLmRldi9jcm9zcy1vcmlnaW4taXNvbGF0aW9uLWd1aWRlLyBmb3IgbW9yZSBpbmZvLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1dlYkFzc2VtYmx5IG11bHRpLXRocmVhZGluZyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LiAnICsgJ0ZhbGxpbmcgYmFjayB0byBzaW5nbGUtdGhyZWFkaW5nLicsXG4gICAgKTtcblxuICAgIC8vIHNldCBmbGFncy5udW1UaHJlYWRzIHRvIDEgc28gdGhhdCBPcnRJbml0KCkgd2lsbCBub3QgY3JlYXRlIGEgZ2xvYmFsIHRocmVhZCBwb29sLlxuICAgIGZsYWdzLm51bVRocmVhZHMgPSBudW1UaHJlYWRzID0gMTtcbiAgfVxuXG4gIGNvbnN0IHdhc21QYXRocyA9IGZsYWdzLndhc21QYXRocztcbiAgY29uc3Qgd2FzbVByZWZpeE92ZXJyaWRlID0gdHlwZW9mIHdhc21QYXRocyA9PT0gJ3N0cmluZycgPyB3YXNtUGF0aHMgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ubWpzO1xuICBjb25zdCBtanNQYXRoT3ZlcnJpZGUgPSAobWpzUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IG1qc1BhdGhPdmVycmlkZUZsYWc7XG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGVGbGFnID0gKHdhc21QYXRocyBhcyBFbnYuV2FzbUZpbGVQYXRocyk/Lndhc207XG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGUgPSAod2FzbVBhdGhPdmVycmlkZUZsYWcgYXMgVVJMKT8uaHJlZiA/PyB3YXNtUGF0aE92ZXJyaWRlRmxhZztcbiAgY29uc3Qgd2FzbUJpbmFyeU92ZXJyaWRlID0gZmxhZ3Mud2FzbUJpbmFyeTtcblxuICBjb25zdCBbb2JqZWN0VXJsLCBvcnRXYXNtRmFjdG9yeV0gPSBhd2FpdCBpbXBvcnRXYXNtTW9kdWxlKFxuICAgIG1qc1BhdGhPdmVycmlkZSxcbiAgICB3YXNtUHJlZml4T3ZlcnJpZGUsXG4gICAgbnVtVGhyZWFkcyA+IDEsXG4gICAgISF3YXNtQmluYXJ5T3ZlcnJpZGUgfHwgISF3YXNtUGF0aE92ZXJyaWRlLFxuICApO1xuXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcblxuICBjb25zdCB0YXNrczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXTtcblxuICAvLyBwcm9taXNlIGZvciB0aW1lb3V0XG4gIGlmICh0aW1lb3V0ID4gMCkge1xuICAgIHRhc2tzLnB1c2goXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLy8gcHJvbWlzZSBmb3IgbW9kdWxlIGluaXRpYWxpemF0aW9uXG4gIHRhc2tzLnB1c2goXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY29uZmlnOiBQYXJ0aWFsPE9ydFdhc21Nb2R1bGU+ID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiB0aHJlYWRzLiBXZWJBc3NlbWJseSB3aWxsIGNyZWF0ZSAoTW9kdWxlLm51bVRocmVhZHMgLSAxKSB3b3JrZXJzLiBJZiBpdCBpcyAxLCBubyB3b3JrZXIgd2lsbCBiZVxuICAgICAgICAgKiBjcmVhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgbnVtVGhyZWFkcyxcbiAgICAgIH07XG5cbiAgICAgIGlmICh3YXNtQmluYXJ5T3ZlcnJpZGUpIHtcbiAgICAgICAgLy8gU2V0IGEgY3VzdG9tIGJ1ZmZlciB3aGljaCBjb250YWlucyB0aGUgV2ViQXNzZW1ibHkgYmluYXJ5LiBUaGlzIHdpbGwgc2tpcCB0aGUgd2FzbSBmaWxlIGZldGNoaW5nLlxuICAgICAgICBjb25maWcud2FzbUJpbmFyeSA9IHdhc21CaW5hcnlPdmVycmlkZSBhcyBBcnJheUJ1ZmZlcjtcblxuICAgICAgICAvLyBPZmZlciBhbiBpbXBsZW1lbnRhdGlvbiBvZiBsb2NhdGVGaWxlKCkgdGhhdCByZXR1cm5zIHRoZSBmaWxlIG5hbWUgZGlyZWN0bHkuIFRoaXMgaGVscHMgdG8gYXZvaWQgYW4gZXJyb3JcbiAgICAgICAgLy8gdGhyb3duIGxhdGVyIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIHdoZW4gYGltcG9ydC5tZXRhLnVybGAgaXMgYSBibG9iIFVSTDpcbiAgICAgICAgLy8gYGBgXG4gICAgICAgIC8vICAgcmV0dXJuIG5ldyBVUkwoXCJvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbVwiLCBpbXBvcnQubWV0YS51cmwpLmhyZWY7XG4gICAgICAgIC8vIGBgYFxuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gZmlsZU5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHdhc21QYXRoT3ZlcnJpZGUgfHwgd2FzbVByZWZpeE92ZXJyaWRlKSB7XG4gICAgICAgIC8vIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gbG9jYXRlIHRoZSBXZWJBc3NlbWJseSBmaWxlLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW5jZSBFbXNjcmlwdGVuIDMuMS41OCwgdGhpcyBmdW5jdGlvbiBpcyBvbmx5IGNhbGxlZCBmb3IgdGhlIC53YXNtIGZpbGUuXG4gICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiB3YXNtUGF0aE92ZXJyaWRlID8/IHdhc21QcmVmaXhPdmVycmlkZSArIGZpbGVOYW1lO1xuICAgICAgfSBlbHNlIGlmIChtanNQYXRoT3ZlcnJpZGUgJiYgbWpzUGF0aE92ZXJyaWRlLmluZGV4T2YoJ2Jsb2I6JykgIT09IDApIHtcbiAgICAgICAgLy8gaWYgbWpzIHBhdGggaXMgc3BlY2lmaWVkLCB1c2UgaXQgYXMgdGhlIGJhc2UgcGF0aCBmb3IgdGhlIC53YXNtIGZpbGUuXG4gICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiBuZXcgVVJMKGZpbGVOYW1lLCBtanNQYXRoT3ZlcnJpZGUpLmhyZWY7XG4gICAgICB9IGVsc2UgaWYgKG9iamVjdFVybCkge1xuICAgICAgICBjb25zdCBpbmZlcnJlZFdhc21QYXRoUHJlZml4ID0gaW5mZXJXYXNtUGF0aFByZWZpeEZyb21TY3JpcHRTcmMoKTtcbiAgICAgICAgaWYgKGluZmVycmVkV2FzbVBhdGhQcmVmaXgpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgd2FzbSBtb2R1bGUgaXMgcHJlbG9hZGVkLCB1c2UgdGhlIGluZmVycmVkIHdhc20gcGF0aCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cbiAgICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gaW5mZXJyZWRXYXNtUGF0aFByZWZpeCArIGZpbGVOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9ydFdhc21GYWN0b3J5KGNvbmZpZykudGhlbihcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIChtb2R1bGUpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgaWYgKG9iamVjdFVybCkge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcbiAgICAgICAgKHdoYXQpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3Qod2hhdCk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pLFxuICApO1xuXG4gIGF3YWl0IFByb21pc2UucmFjZSh0YXNrcyk7XG5cbiAgaWYgKGlzVGltZW91dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV2ViQXNzZW1ibHkgYmFja2VuZCBpbml0aWFsaXppbmcgZmFpbGVkIGR1ZSB0byB0aW1lb3V0OiAke3RpbWVvdXR9bXNgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgd2FzbSkge1xuICAgIHJldHVybiB3YXNtO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3QgaW5pdGlhbGl6ZWQgeWV0LicpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc3Bvc2UgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XG4gICAgLy8gVE9ETzogY3VycmVudGx5IFwiUFRocmVhZC50ZXJtaW5hdGVBbGxUaHJlYWRzKClcIiBpcyBub3QgZXhwb3NlZCBpbiB0aGUgd2FzbSBtb2R1bGUuXG4gICAgLy8gICAgICAgQW5kIHRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBjYWxsZWQgYnkgYW55IGNvZGUuXG4gICAgLy8gICAgICAgSWYgaXQgaXMgbmVlZGVkIGluIHRoZSBmdXR1cmUsIHdlIHNob3VsZCBleHBvc2UgaXQgaW4gdGhlIHdhc20gbW9kdWxlIGFuZCB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lLlxuXG4gICAgLy8gd2FzbT8uUFRocmVhZD8udGVybWluYXRlQWxsVGhyZWFkcygpO1xuICAgIHdhc20gPSB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIGFib3J0ZWQgPSB0cnVlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xuICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKGRhdGFMZW5ndGgpO1xuICB3YXNtLnN0cmluZ1RvVVRGOChkYXRhLCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XG5cbiAgcmV0dXJuIGRhdGFPZmZzZXQ7XG59O1xuXG5pbnRlcmZhY2UgRXh0cmFPcHRpb25zSGFuZGxlciB7XG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9IChcbiAgb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIHByZWZpeDogc3RyaW5nLFxuICBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcbiAgaGFuZGxlcjogRXh0cmFPcHRpb25zSGFuZGxlcixcbik6IHZvaWQgPT4ge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgIGlmIChzZWVuLmhhcyhvcHRpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgaW4gb3B0aW9ucycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWVuLmFkZChvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCBuYW1lID0gcHJlZml4ID8gcHJlZml4ICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBuYW1lICsgJy4nLCBzZWVuLCBoYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaGFuZGxlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlID8gJzEnIDogJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBoYW5kbGUgZXh0cmEgY29uZmlnIHR5cGU6ICR7dHlwZW9mIHZhbHVlfWApO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIGNoZWNrIHdlYiBhc3NlbWJseSBBUEkncyBsYXN0IGVycm9yIGFuZCB0aHJvdyBlcnJvciBpZiBhbnkgZXJyb3Igb2NjdXJyZWQuXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxuICovXG5leHBvcnQgY29uc3QgY2hlY2tMYXN0RXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwdHJTaXplID0gd2FzbS5QVFJfU0laRTtcbiAgICBjb25zdCBwYXJhbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xuICAgIHdhc20uX09ydEdldExhc3RFcnJvcihwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIHB0clNpemUpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IE51bWJlcih3YXNtLmdldFZhbHVlKHBhcmFtc09mZnNldCwgcHRyU2l6ZSA9PT0gNCA/ICdpMzInIDogJ2k2NCcpKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VQb2ludGVyID0gd2FzbS5nZXRWYWx1ZShwYXJhbXNPZmZzZXQgKyBwdHJTaXplLCAnKicpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVBvaW50ZXIgPyB3YXNtLlVURjhUb1N0cmluZyhlcnJvck1lc3NhZ2VQb2ludGVyKSA6ICcnO1xuICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfSBFUlJPUl9DT0RFOiAke2Vycm9yQ29kZX0sIEVSUk9SX01FU1NBR0U6ICR7ZXJyb3JNZXNzYWdlfWApO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9ucyB9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzZXRSdW5PcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBydW5PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnM/LmxvZ1NldmVyaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID0gMjsgLy8gRGVmYXVsdCB0byB3YXJuaW5nXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8XG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwpIHx8XG4gICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8XG4gICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPiA0XG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID0gMDsgLy8gRGVmYXVsdCB0byAwXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMudGVybWluYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHRhZ0RhdGFPZmZzZXQgPSAwO1xuICAgIGlmIChvcHRpb25zPy50YWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCEsXG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISxcbiAgICAgICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLFxuICAgICAgdGFnRGF0YU9mZnNldCxcbiAgICApO1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBydW4gb3B0aW9ucy5cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHJ1biBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB0eXBlIHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9ucyB9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmNvbnN0IGdldEdyYXBoT3B0aW16YXRpb25MZXZlbCA9IChncmFwaE9wdGltaXphdGlvbkxldmVsOiBzdHJpbmcgfCB1bmtub3duKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChncmFwaE9wdGltaXphdGlvbkxldmVsKSB7XG4gICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnZXh0ZW5kZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gOTk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEV4ZWN1dGlvbk1vZGUgPSAoZXhlY3V0aW9uTW9kZTogJ3NlcXVlbnRpYWwnIHwgJ3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZXhlY3V0aW9uTW9kZSkge1xuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZXhlY3V0aW9uIG1vZGU6ICR7ZXhlY3V0aW9uTW9kZX1gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcbiAgICBvcHRpb25zLmV4dHJhID0ge307XG4gIH1cbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcbiAgICBvcHRpb25zLmV4dHJhLnNlc3Npb24gPSB7fTtcbiAgfVxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGlmICghc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXG4gIGlmIChcbiAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxuICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLnNvbWUoKGVwKSA9PiAodHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZSkgPT09ICd3ZWJncHUnKVxuICApIHtcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kU2Vzc2lvbkNvbmZpZyA9IChzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xuICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAke2tleX0gLSAke3ZhbHVlfS5gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRXBPcHRpb24gPSAoZXBPcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPiwga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiB2b2lkID0+IHtcbiAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhrZXksIGFsbG9jcyk7XG4gIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWx1ZSwgYWxsb2NzKTtcbiAgZXBPcHRpb25zLnB1c2goW2tleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldF0pO1xufTtcblxuY29uc3Qgc2VyaWFsaXplV2ViTk5GcmVlRGltZW5zaW9uQm91bmRzID0gKFxuICBib3VuZHM6IEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9uc1snZnJlZURpbWVuc2lvbkJvdW5kcyddLFxuKTogc3RyaW5nID0+IHtcbiAgaWYgKCFib3VuZHMpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBzZXJpYWxpemVkRW50cmllczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBbbmFtZSwgYm91bmRdIG9mIE9iamVjdC5lbnRyaWVzKGJvdW5kcykpIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTk4gZnJlZURpbWVuc2lvbkJvdW5kcyBkaW1lbnNpb24gbmFtZSBtdXN0IG5vdCBiZSBlbXB0eS4nKTtcbiAgICB9XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJzonKSB8fCBuYW1lLmluY2x1ZGVzKCc7JykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgV2ViTk4gZnJlZURpbWVuc2lvbkJvdW5kcyBkaW1lbnNpb24gbmFtZSBtdXN0IG5vdCBpbmNsdWRlICc6JyBvciAnOyc6ICR7bmFtZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBtaW5TaXplID0gYm91bmQ/Lm1pblNpemUgPz8gMTtcbiAgICBjb25zdCBtYXhTaXplID0gYm91bmQ/Lm1heFNpemU7XG5cbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobWluU2l6ZSkgfHwgbWluU2l6ZSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgV2ViTk4gZnJlZURpbWVuc2lvbkJvdW5kcyBtaW5TaXplIG11c3QgYmUgYW4gaW50ZWdlciA+PSAxIGZvciBkaW1lbnNpb246ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG1heFNpemUpIHx8IG1heFNpemUgPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYk5OIGZyZWVEaW1lbnNpb25Cb3VuZHMgbWF4U2l6ZSBtdXN0IGJlIGFuIGludGVnZXIgPj0gMSBmb3IgZGltZW5zaW9uOiAke25hbWV9YCk7XG4gICAgfVxuICAgIGlmIChtYXhTaXplIDwgbWluU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXZWJOTiBmcmVlRGltZW5zaW9uQm91bmRzIG1heFNpemUgbXVzdCBiZSA+PSBtaW5TaXplIGZvciBkaW1lbnNpb246ICR7bmFtZX1gKTtcbiAgICB9XG5cbiAgICBzZXJpYWxpemVkRW50cmllcy5wdXNoKGAke25hbWV9OiR7bWluU2l6ZX06JHttYXhTaXplfWApO1xuICB9XG5cbiAgcmV0dXJuIHNlcmlhbGl6ZWRFbnRyaWVzLmpvaW4oJzsnKTtcbn07XG5cbmNvbnN0IHNldEV4ZWN1dGlvblByb3ZpZGVycyA9IGFzeW5jIChcbiAgc2Vzc2lvbk9wdGlvbnNIYW5kbGU6IG51bWJlcixcbiAgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4gIGFsbG9jczogbnVtYmVyW10sXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgZXhlY3V0aW9uUHJvdmlkZXJzID0gc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzITtcbiAgZm9yIChjb25zdCBlcCBvZiBleGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICBsZXQgZXBOYW1lID0gdHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZTtcbiAgICBjb25zdCBlcE9wdGlvbnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+ID0gW107XG5cbiAgICAvLyBjaGVjayBFUCBuYW1lXG4gICAgc3dpdGNoIChlcE5hbWUpIHtcbiAgICAgIGNhc2UgJ3dlYm5uJzpcbiAgICAgICAgZXBOYW1lID0gJ1dFQk5OJztcbiAgICAgICAgLy8gRGlzYWJsZSBRRFEgZnVzaW9uIHNvIERRL1Egbm9kZXMgYXJlIHByZXNlcnZlZCBhcyBpbmRpdmlkdWFsIG9wcyBmb3IgV2ViTk4gRVAuXG4gICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdzZXNzaW9uLmRpc2FibGVfcXVhbnRfcWRxJywgJzEnLCBhbGxvY3MpO1xuICAgICAgICAvLyBGb3JjaWJseSBwcmV2ZW50IGNvbnN0YW50IGZvbGRpbmcgZnJvbSByZXBsYWNpbmcgRFEgbm9kZXMgd2l0aCBjb25zdGFudHMuXG4gICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdzZXNzaW9uLmRpc2FibGVfcWRxX2NvbnN0YW50X2ZvbGRpbmcnLCAnMScsIGFsbG9jcyk7XG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIC8vIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcbiAgICAgICAgICBjb25zdCBmcmVlRGltZW5zaW9uQm91bmRzID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5mcmVlRGltZW5zaW9uQm91bmRzO1xuICAgICAgICAgIGlmIChkZXZpY2VUeXBlKSB7XG4gICAgICAgICAgICBhcHBlbmRTZXNzaW9uQ29uZmlnKHNlc3Npb25PcHRpb25zSGFuZGxlLCAnZGV2aWNlVHlwZScsIGRldmljZVR5cGUsIGFsbG9jcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmcmVlRGltZW5zaW9uQm91bmRzKSB7XG4gICAgICAgICAgICBjb25zdCBzZXJpYWxpemVkQm91bmRzID0gc2VyaWFsaXplV2ViTk5GcmVlRGltZW5zaW9uQm91bmRzKGZyZWVEaW1lbnNpb25Cb3VuZHMpO1xuICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWRCb3VuZHMpIHtcbiAgICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAnRnJlZURpbWVuc2lvbkJvdW5kcycsIHNlcmlhbGl6ZWRCb3VuZHMsIGFsbG9jcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGVuYWJsZUNhdXNhbExNOiBzZWxlY3RzIGJldHdlZW4gY29uY2F0LWJhc2VkIChzdGF0ZWZ1bCkgdnMgU2NhdHRlck5ELWJhc2VkIChzdGF0ZWxlc3MpXG4gICAgICAgICAgLy8gS1YtY2FjaGUgc3RyYXRlZ3kgaW4gdGhlIEdyb3VwUXVlcnlBdHRlbnRpb24gb3AgYnVpbGRlci5cbiAgICAgICAgICBjb25zdCBlbmFibGVDYXVzYWxMTSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZW5hYmxlQ2F1c2FsTE07XG4gICAgICAgICAgaWYgKGVuYWJsZUNhdXNhbExNKSB7XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdlbmFibGVDYXVzYWxMTScsICd0cnVlJywgYWxsb2NzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3ZWJncHUnOlxuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgICBlcE5hbWUgPSAnV2ViR1BVJztcbiAgICAgICAgICBsZXQgY3VzdG9tRGV2aWNlOiBHUFVEZXZpY2UgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG5cbiAgICAgICAgICAgIC8vIHNldCBjdXN0b20gR1BVIGRldmljZVxuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMuZGV2aWNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgR1BVRGV2aWNlICE9PSAndW5kZWZpbmVkJyAmJiB3ZWJncHVPcHRpb25zLmRldmljZSBpbnN0YW5jZW9mIEdQVURldmljZSkge1xuICAgICAgICAgICAgICAgIGN1c3RvbURldmljZSA9IHdlYmdwdU9wdGlvbnMuZGV2aWNlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgZGV2aWNlIHNldCBpbiBXZWJHUFUgRVAgb3B0aW9ucy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgZ3JhcGggY2FwdHVyZSBvcHRpb24gZnJvbSBzZXNzaW9uIG9wdGlvbnNcbiAgICAgICAgICAgIGNvbnN0IHsgZW5hYmxlR3JhcGhDYXB0dXJlIH0gPSBzZXNzaW9uT3B0aW9ucztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5hYmxlR3JhcGhDYXB0dXJlID09PSAnYm9vbGVhbicgJiYgZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ2VuYWJsZUdyYXBoQ2FwdHVyZScsICcxJywgYWxsb2NzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IGxheW91dCBvcHRpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ3ByZWZlcnJlZExheW91dCcsIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0LCBhbGxvY3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgZm9yY2UgQ1BVIGZhbGxiYWNrIG5vZGVzXG4gICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucy5mb3JjZUNwdU5vZGVOYW1lcykge1xuICAgICAgICAgICAgICBjb25zdCBuYW1lcyA9IEFycmF5LmlzQXJyYXkod2ViZ3B1T3B0aW9ucy5mb3JjZUNwdU5vZGVOYW1lcylcbiAgICAgICAgICAgICAgICA/IHdlYmdwdU9wdGlvbnMuZm9yY2VDcHVOb2RlTmFtZXNcbiAgICAgICAgICAgICAgICA6IFt3ZWJncHVPcHRpb25zLmZvcmNlQ3B1Tm9kZU5hbWVzXTtcblxuICAgICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdmb3JjZUNwdU5vZGVOYW1lcycsIG5hbWVzLmpvaW4oJ1xcbicpLCBhbGxvY3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdmFsaWRhdGlvbiBtb2RlXG4gICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucy52YWxpZGF0aW9uTW9kZSkge1xuICAgICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICd2YWxpZGF0aW9uTW9kZScsIHdlYmdwdU9wdGlvbnMudmFsaWRhdGlvbk1vZGUsIGFsbG9jcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCBidWZmZXIgY2FjaGUgbW9kZXNcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFtcbiAgICAgICAgICAgICAgJ3N0b3JhZ2VCdWZmZXJDYWNoZU1vZGUnLFxuICAgICAgICAgICAgICAndW5pZm9ybUJ1ZmZlckNhY2hlTW9kZScsXG4gICAgICAgICAgICAgICdxdWVyeVJlc29sdmVCdWZmZXJDYWNoZU1vZGUnLFxuICAgICAgICAgICAgICAnZGVmYXVsdEJ1ZmZlckNhY2hlTW9kZScsXG4gICAgICAgICAgICBdIGFzIGNvbnN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vZGUgPSB3ZWJncHVPcHRpb25zW2tleV07XG4gICAgICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGUgIT09ICdkaXNhYmxlZCcgJiYgbW9kZSAhPT0gJ2xhenlSZWxlYXNlJyAmJiBtb2RlICE9PSAnc2ltcGxlJyAmJiBtb2RlICE9PSAnYnVja2V0Jykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2tleX0gbXVzdCBiZSBvbmUgb2YgJ2Rpc2FibGVkJywgJ2xhenlSZWxlYXNlJywgJ3NpbXBsZScgb3IgJ2J1Y2tldCc6ICR7bW9kZX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCBrZXksIG1vZGUsIGFsbG9jcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpbmZvID0gZ2V0SW5zdGFuY2UoKS53ZWJncHVSZWdpc3RlckRldmljZSEoY3VzdG9tRGV2aWNlKTtcbiAgICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgY29uc3QgW2RldmljZUlkLCBpbnN0YW5jZUhhbmRsZSwgZGV2aWNlSGFuZGxlXSA9IGluZm87XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdkZXZpY2VJZCcsIGRldmljZUlkLnRvU3RyaW5nKCksIGFsbG9jcyk7XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICd3ZWJncHVJbnN0YW5jZScsIGluc3RhbmNlSGFuZGxlLnRvU3RyaW5nKCksIGFsbG9jcyk7XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICd3ZWJncHVEZXZpY2UnLCBkZXZpY2VIYW5kbGUudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXBOYW1lID0gJ0pTJztcbiAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucz8ucHJlZmVycmVkTGF5b3V0KSB7XG4gICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05DSFcnICYmIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkhXQycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdwcmVmZXJyZWRMYXlvdXQnLCB3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3YXNtJzpcbiAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZXBOYW1lRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhlcE5hbWUsIGFsbG9jcyk7XG4gICAgY29uc3QgZXBPcHRpb25zQ291bnQgPSBlcE9wdGlvbnMubGVuZ3RoO1xuICAgIGxldCBrZXlzT2Zmc2V0ID0gMDtcbiAgICBsZXQgdmFsdWVzT2Zmc2V0ID0gMDtcbiAgICBpZiAoZXBPcHRpb25zQ291bnQgPiAwKSB7XG4gICAgICBrZXlzT2Zmc2V0ID0gZ2V0SW5zdGFuY2UoKS5fbWFsbG9jKGVwT3B0aW9uc0NvdW50ICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSk7XG4gICAgICBhbGxvY3MucHVzaChrZXlzT2Zmc2V0KTtcbiAgICAgIHZhbHVlc09mZnNldCA9IGdldEluc3RhbmNlKCkuX21hbGxvYyhlcE9wdGlvbnNDb3VudCAqIGdldEluc3RhbmNlKCkuUFRSX1NJWkUpO1xuICAgICAgYWxsb2NzLnB1c2godmFsdWVzT2Zmc2V0KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXBPcHRpb25zQ291bnQ7IGkrKykge1xuICAgICAgICBnZXRJbnN0YW5jZSgpLnNldFZhbHVlKGtleXNPZmZzZXQgKyBpICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSwgZXBPcHRpb25zW2ldWzBdLCAnKicpO1xuICAgICAgICBnZXRJbnN0YW5jZSgpLnNldFZhbHVlKHZhbHVlc09mZnNldCArIGkgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFLCBlcE9wdGlvbnNbaV1bMV0sICcqJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChhd2FpdCBnZXRJbnN0YW5jZSgpLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcihcbiAgICAgICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUsXG4gICAgICAgIGVwTmFtZURhdGFPZmZzZXQsXG4gICAgICAgIGtleXNPZmZzZXQsXG4gICAgICAgIHZhbHVlc09mZnNldCxcbiAgICAgICAgZXBPcHRpb25zQ291bnQsXG4gICAgICApKSAhPT0gMFxuICAgICkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFwcGVuZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfS5gKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRTZXNzaW9uT3B0aW9ucyA9IGFzeW5jIChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8W251bWJlciwgbnVtYmVyW11dPiA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBhcHBlbmREZWZhdWx0T3B0aW9ucyhzZXNzaW9uT3B0aW9ucyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBncmFwaE9wdGltaXphdGlvbkxldmVsID0gZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsKHNlc3Npb25PcHRpb25zLmdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPz8gJ2FsbCcpO1xuICAgIGNvbnN0IGV4ZWN1dGlvbk1vZGUgPSBnZXRFeGVjdXRpb25Nb2RlKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvbk1vZGUgPz8gJ3NlcXVlbnRpYWwnKTtcbiAgICBjb25zdCBsb2dJZERhdGFPZmZzZXQgPVxuICAgICAgdHlwZW9mIHNlc3Npb25PcHRpb25zLmxvZ0lkID09PSAnc3RyaW5nJyA/IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5sb2dJZCwgYWxsb2NzKSA6IDA7XG5cbiAgICBjb25zdCBsb2dTZXZlcml0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA/PyAyOyAvLyBEZWZhdWx0IHRvIDIgLSB3YXJuaW5nXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1NldmVyaXR5TGV2ZWwpIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7IC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKVxuICAgICAgICA6IDA7XG5cbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxuICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCxcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sXG4gICAgICBleGVjdXRpb25Nb2RlLFxuICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsXG4gICAgICAwLFxuICAgICAgbG9nSWREYXRhT2Zmc2V0LFxuICAgICAgbG9nU2V2ZXJpdHlMZXZlbCxcbiAgICAgIGxvZ1ZlcmJvc2l0eUxldmVsLFxuICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCxcbiAgICApO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICBhd2FpdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGVuYWJsZUdyYXBoQ2FwdHVyZSBtdXN0IGJlIGEgYm9vbGVhbiB2YWx1ZTogJHtzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmV9YCk7XG4gICAgICB9XG4gICAgICBhcHBlbmRTZXNzaW9uQ29uZmlnKFxuICAgICAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSxcbiAgICAgICAgJ2VuYWJsZUdyYXBoQ2FwdHVyZScsXG4gICAgICAgIHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZS50b1N0cmluZygpLFxuICAgICAgICBhbGxvY3MsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBhcHBlbmRTZXNzaW9uQ29uZmlnKHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXksIHZhbHVlLCBhbGxvY3MpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHNlc3Npb24gb3B0aW9ucy5cIik7XG4gICAgICB9XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2LFxuXG4gIC8vIDQtYml0IGRhdGEtdHlwZXNcbiAgdWludDQgPSAyMSxcbiAgaW50NCA9IDIyLFxufVxuXG4vKipcbiAqIE1hcCBzdHJpbmcgdGVuc29yIGRhdGEgdG8gZW51bSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50ODtcbiAgICBjYXNlICdib29sJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5ib29sO1xuICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQxNjtcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MzI7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQxNjtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5zdHJpbmc7XG4gICAgY2FzZSAnaW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDY0O1xuICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xuICAgIGNhc2UgJ2ludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDQ7XG4gICAgY2FzZSAndWludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ0O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGVudW0gdmFsdWUgdG8gc3RyaW5nIHRlbnNvciBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyA9ICh0eXBlUHJvdG86IERhdGFUeXBlKTogVGVuc29yLlR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGVQcm90bykge1xuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcbiAgICAgIHJldHVybiAnaW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50ODpcbiAgICAgIHJldHVybiAndWludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUuYm9vbDpcbiAgICAgIHJldHVybiAnYm9vbCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcbiAgICAgIHJldHVybiAnaW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDE2OlxuICAgICAgcmV0dXJuICd1aW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MzI6XG4gICAgICByZXR1cm4gJ2ludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcbiAgICAgIHJldHVybiAndWludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0MTY6XG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQ6XG4gICAgICByZXR1cm4gJ2Zsb2F0MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxuICAgICAgcmV0dXJuICdmbG9hdDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnN0cmluZzpcbiAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICBjYXNlIERhdGFUeXBlLmludDY0OlxuICAgICAgcmV0dXJuICdpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XG4gICAgICByZXR1cm4gJ3VpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ0OlxuICAgICAgcmV0dXJuICdpbnQ0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ0OlxuICAgICAgcmV0dXJuICd1aW50NCc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZVByb3RvfWApO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCB0ZW5zb3Igc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlIGFuZCBkaW1lbnNpb25zXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMgPSAoXG4gIGRhdGVUeXBlOiBudW1iZXIsXG4gIGRpbXNPclNpemU6IHJlYWRvbmx5IG51bWJlcltdIHwgbnVtYmVyLFxuKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgZWxlbWVudFNpemUgPSBbXG4gICAgLTEsIC8vIHVuZGVmaW5lZCA9IDBcbiAgICA0LCAvLyBmbG9hdCA9IDFcbiAgICAxLCAvLyB1aW50OCA9IDJcbiAgICAxLCAvLyBpbnQ4ID0gM1xuICAgIDIsIC8vIHVpbnQxNiA9IDRcbiAgICAyLCAvLyBpbnQxNiA9IDVcbiAgICA0LCAvLyBpbnQzMiA9IDZcbiAgICA4LCAvLyBpbnQ2NCA9IDdcbiAgICAtMSwgLy8gc3RyaW5nID0gOFxuICAgIDEsIC8vIGJvb2wgPSA5XG4gICAgMiwgLy8gZmxvYXQxNiA9IDEwXG4gICAgOCwgLy8gZG91YmxlID0gMTFcbiAgICA0LCAvLyB1aW50MzIgPSAxMlxuICAgIDgsIC8vIHVpbnQ2NCA9IDEzXG4gICAgLTEsIC8vIGNvbXBsZXg2NCA9IDE0XG4gICAgLTEsIC8vIGNvbXBsZXgxMjggPSAxNVxuICAgIC0xLCAvLyBiZmxvYXQxNiA9IDE2XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTiA9IDE3XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTlVaID0gMThcbiAgICAtMSwgLy8gRkxPQVQ4RTVNMiA9IDE5XG4gICAgLTEsIC8vIEZMT0FUOEU1TTJGTlVaID0gMjBcbiAgICAwLjUsIC8vIHVpbnQ0ID0gMjFcbiAgICAwLjUsIC8vIGludDQgPSAyMlxuICBdW2RhdGVUeXBlXTtcblxuICBjb25zdCBzaXplID0gdHlwZW9mIGRpbXNPclNpemUgPT09ICdudW1iZXInID8gZGltc09yU2l6ZSA6IGRpbXNPclNpemUucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gIHJldHVybiBlbGVtZW50U2l6ZSA+IDAgPyBNYXRoLmNlaWwoc2l6ZSAqIGVsZW1lbnRTaXplKSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKFxuICB0eXBlOiBUZW5zb3IuVHlwZSxcbik6XG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQ4QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAvLyBGbG9hdDE2IHRlbnNvciBkYXRhIGlzIHN0b3JlZCBhcyByYXcgMTYtYml0IHZhbHVlcy4gUHJlZmVyIGEgbmF0aXZlIG9yIHBvbHlmaWxsZWQgRmxvYXQxNkFycmF5IHdoZW5cbiAgICAgIC8vIGF2YWlsYWJsZSBzbyBjYWxsZXJzIGNhbiB3b3JrIHdpdGggZmxvYXQxNiB2YWx1ZXMgZGlyZWN0bHk7IG90aGVyd2lzZSBmYWxsIGJhY2sgdG8gVWludDE2QXJyYXkgc3RvcmFnZS5cbiAgICAgIHJldHVybiB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyA/IChGbG9hdDE2QXJyYXkgYXMgdW5rbm93biBhcyBVaW50MTZBcnJheUNvbnN0cnVjdG9yKSA6IFVpbnQxNkFycmF5O1xuICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheTtcbiAgICBjYXNlICd1aW50OCc6XG4gICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBJbnQ4QXJyYXk7XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICBjYXNlICdpbnQxNic6XG4gICAgICByZXR1cm4gSW50MTZBcnJheTtcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gSW50MzJBcnJheTtcbiAgICBjYXNlICdib29sJzpcbiAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgcmV0dXJuIEZsb2F0NjRBcnJheTtcbiAgICBjYXNlICd1aW50MzInOlxuICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xuICAgIGNhc2UgJ2ludDY0JzpcbiAgICAgIHJldHVybiBCaWdJbnQ2NEFycmF5O1xuICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICByZXR1cm4gQmlnVWludDY0QXJyYXk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZTogJHt0eXBlfWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgbG9nIGxldmVsIHRvIGludGVnZXIgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGxvZ0xldmVsU3RyaW5nVG9FbnVtID0gKGxvZ0xldmVsPzogJ3ZlcmJvc2UnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdmYXRhbCcpOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvZ0xldmVsKSB7XG4gICAgY2FzZSAndmVyYm9zZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdpbmZvJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnZmF0YWwnOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHtsb2dMZXZlbH1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0ZW5zb3IgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgR1BVIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0+XG4gIHR5cGUgPT09ICdmbG9hdDMyJyB8fFxuICB0eXBlID09PSAnZmxvYXQxNicgfHxcbiAgdHlwZSA9PT0gJ2ludDMyJyB8fFxuICB0eXBlID09PSAnaW50NjQnIHx8XG4gIHR5cGUgPT09ICd1aW50MzInIHx8XG4gIHR5cGUgPT09ICd1aW50OCcgfHxcbiAgdHlwZSA9PT0gJ2Jvb2wnIHx8XG4gIHR5cGUgPT09ICd1aW50NCcgfHxcbiAgdHlwZSA9PT0gJ2ludDQnO1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBXZWJOTiBNTFRlbnNvclxuICovXG5leHBvcnQgY29uc3QgaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUgPSAodHlwZTogVGVuc29yLlR5cGUpOiB0eXBlIGlzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcyA9PlxuICB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8XG4gIHR5cGUgPT09ICdpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ2ludDY0JyB8fFxuICB0eXBlID09PSAndWludDMyJyB8fFxuICB0eXBlID09PSAndWludDY0JyB8fFxuICB0eXBlID09PSAnaW50OCcgfHxcbiAgdHlwZSA9PT0gJ3VpbnQ4JyB8fFxuICB0eXBlID09PSAnYm9vbCcgfHxcbiAgdHlwZSA9PT0gJ3VpbnQ0JyB8fFxuICB0eXBlID09PSAnaW50NCc7XG5cbi8qKlxuICogTWFwIHN0cmluZyBkYXRhIGxvY2F0aW9uIHRvIGludGVnZXIgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSA9IChsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbik6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICBjYXNlICdub25lJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gNDtcbiAgICBjYXNlICdtbC10ZW5zb3InOlxuICAgICAgcmV0dXJuIDU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSBsb2NhdGlvbjogJHtsb2NhdGlvbn1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgaW50ZWdlciBkYXRhIGxvY2F0aW9uIHRvIHN0cmluZyB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uRW51bVRvU3RyaW5nID0gKGxvY2F0aW9uOiBudW1iZXIpOiBUZW5zb3IuRGF0YUxvY2F0aW9uIHwgdW5kZWZpbmVkID0+XG4gIChbJ25vbmUnLCAnY3B1JywgJ2NwdS1waW5uZWQnLCAndGV4dHVyZScsICdncHUtYnVmZmVyJywgJ21sLXRlbnNvciddIGFzIGNvbnN0KVtsb2NhdGlvbl07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuXG4vKipcbiAqIExvYWQgYSBmaWxlIGludG8gYSBVaW50OEFycmF5LlxuICpcbiAqIEBwYXJhbSBmaWxlIC0gdGhlIGZpbGUgdG8gbG9hZC4gQ2FuIGJlIGEgVVJML3BhdGgsIGEgQmxvYiwgYW4gQXJyYXlCdWZmZXIsIG9yIGEgVWludDhBcnJheS5cbiAqIEByZXR1cm5zIGEgVWludDhBcnJheSBjb250YWluaW5nIHRoZSBmaWxlIGRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZSA9IGFzeW5jIChmaWxlOiBzdHJpbmcgfCBCbG9iIHwgQXJyYXlCdWZmZXJMaWtlIHwgVWludDhBcnJheSk6IFByb21pc2U8VWludDhBcnJheT4gPT4ge1xuICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgLy8gbG9hZCBmaWxlIGludG8gQXJyYXlCdWZmZXIgaW4gTm9kZS5qc1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyByZWFkRmlsZSB9ID0gcmVxdWlyZSgnbm9kZTpmcy9wcm9taXNlcycpO1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgcmVhZEZpbGUoZmlsZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZS5jb2RlID09PSAnRVJSX0ZTX0ZJTEVfVE9PX0xBUkdFJykge1xuICAgICAgICAgIC8vIGZpbGUgaXMgdG9vIGxhcmdlLCB1c2UgZnMuY3JlYXRlUmVhZFN0cmVhbSBpbnN0ZWFkXG4gICAgICAgICAgY29uc3QgeyBjcmVhdGVSZWFkU3RyZWFtIH0gPSByZXF1aXJlKCdub2RlOmZzJyk7XG4gICAgICAgICAgY29uc3Qgc3RyZWFtID0gY3JlYXRlUmVhZFN0cmVhbShmaWxlKTtcbiAgICAgICAgICBjb25zdCBjaHVua3M6IFVpbnQ4QXJyYXlbXSA9IFtdO1xuICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtKSB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIGJyb3dzZXJzXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGUpO1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIGV4dGVybmFsIGRhdGEgZmlsZTogJHtmaWxlfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udGVudExlbmd0aEhlYWRlciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LUxlbmd0aCcpO1xuICAgICAgY29uc3QgZmlsZVNpemUgPSBjb250ZW50TGVuZ3RoSGVhZGVyID8gcGFyc2VJbnQoY29udGVudExlbmd0aEhlYWRlciwgMTApIDogMDtcbiAgICAgIGlmIChmaWxlU2l6ZSA8IDEwNzM3NDE4MjQgLyogMUdCICovKSB7XG4gICAgICAgIC8vIHdoZW4gQ29udGVudC1MZW5ndGggaGVhZGVyIGlzIG5vdCBzZXQsIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGZpbGUgc2l6ZS4gV2UgYXNzdW1lIGl0IGlzIHNtYWxsIGVub3VnaCB0b1xuICAgICAgICAvLyBsb2FkIGludG8gbWVtb3J5LlxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIHN0cmVhbSBpbnN0ZWFkXG4gICAgICAgIGlmICghcmVzcG9uc2UuYm9keSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbGVkIHRvIGxvYWQgZXh0ZXJuYWwgZGF0YSBmaWxlOiAke2ZpbGV9LCBubyByZXNwb25zZSBib2R5LmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG5cbiAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyB0cnkgdG8gY3JlYXRlIEFycmF5QnVmZmVyIGRpcmVjdGx5XG4gICAgICAgICAgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGZpbGVTaXplKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUmFuZ2VFcnJvcikge1xuICAgICAgICAgICAgLy8gdXNlIFdlYkFzc2VtYmx5IE1lbW9yeSB0byBhbGxvY2F0ZSBsYXJnZXIgQXJyYXlCdWZmZXJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKGZpbGVTaXplIC8gNjU1MzYpO1xuICAgICAgICAgICAgYnVmZmVyID0gbmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7IGluaXRpYWw6IHBhZ2VzLCBtYXhpbXVtOiBwYWdlcyB9KS5idWZmZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgY2h1bmtTaXplKTtcbiAgICAgICAgICBjaHVuay5zZXQodmFsdWUpO1xuICAgICAgICAgIG9mZnNldCArPSBjaHVua1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgMCwgZmlsZVNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgQmxvYikge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCkpO1xuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGZpbGUpO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IgfSBmcm9tICcuLi93YXNtLWNvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3ID0gKFxuICBkYXRhQnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgdHlwZTogVGVuc29yLlR5cGUsXG4pOlxuICB8IEludDMyQXJyYXlcbiAgfCBVaW50MzJBcnJheVxuICB8IEJpZ0ludDY0QXJyYXlcbiAgfCBCaWdVaW50NjRBcnJheVxuICB8IFVpbnQ4QXJyYXlcbiAgfCBGbG9hdDMyQXJyYXlcbiAgfCBGbG9hdDY0QXJyYXlcbiAgfCBJbnQ4QXJyYXlcbiAgfCBJbnQxNkFycmF5XG4gIHwgVWludDE2QXJyYXkgPT4gbmV3ICh0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IodHlwZSkpKGRhdGFCdWZmZXIpO1xuXG4vKipcbiAqIGEgVGVuc29yVmlldyBkb2VzIG5vdCBvd24gdGhlIGRhdGEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVmlldyB7XG4gIHJlYWRvbmx5IGRhdGE6IG51bWJlcjtcbiAgcmVhZG9ubHkgZGF0YVR5cGU6IG51bWJlcjtcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIGdldCBhIEZsb2F0MTZBcnJheSBkYXRhIHZpZXcgb2YgdGhlIHRlbnNvciBkYXRhLiB0ZW5zb3IgZGF0YSBtdXN0IGJlIG9uIENQVS5cbiAgICovXG4gIGdldFVpbnQxNkFycmF5KCk6IFVpbnQxNkFycmF5O1xuXG4gIC8qKlxuICAgKiBnZXQgYSBGbG9hdDMyQXJyYXkgZGF0YSB2aWV3IG9mIHRoZSB0ZW5zb3IgZGF0YS4gdGVuc29yIGRhdGEgbXVzdCBiZSBvbiBDUFUuXG4gICAqL1xuICBnZXRGbG9hdDMyQXJyYXkoKTogRmxvYXQzMkFycmF5O1xuXG4gIC8qKlxuICAgKiBnZXQgYSBCaWdJbnQ2NEFycmF5IGRhdGEgdmlldyBvZiB0aGUgdGVuc29yIGRhdGEuIHRlbnNvciBkYXRhIG11c3QgYmUgb24gQ1BVLlxuICAgKi9cbiAgZ2V0QmlnSW50NjRBcnJheSgpOiBCaWdJbnQ2NEFycmF5O1xuXG4gIC8qKlxuICAgKiBnZXQgYSBJbnQzMkFycmF5IGRhdGEgdmlldyBvZiB0aGUgdGVuc29yIGRhdGEuIHRlbnNvciBkYXRhIG11c3QgYmUgb24gQ1BVLlxuICAgKi9cbiAgZ2V0SW50MzJBcnJheSgpOiBJbnQzMkFycmF5O1xuXG4gIC8qKlxuICAgKiBnZXQgYSBVaW50MTZBcnJheSBkYXRhIHZpZXcgb2YgdGhlIHRlbnNvciBkYXRhLiB0ZW5zb3IgZGF0YSBtdXN0IGJlIG9uIENQVS5cbiAgICovXG4gIGdldFVpbnQxNkFycmF5KCk6IFVpbnQxNkFycmF5O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSBuZXcgdGVuc29yIHZpZXcgd2l0aCB0aGUgc2FtZSBkYXRhIGJ1dCBkaWZmZXJlbnQgZGltZW5zaW9ucy5cbiAgICovXG4gIHJlc2hhcGUobmV3RGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3JWaWV3O1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBFbnYgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBsb2dMZXZlbFN0cmluZ1RvRW51bSB9IGZyb20gJy4uL3dhc20tY29tbW9uJztcblxudHlwZSBMb2dMZXZlbCA9IE5vbk51bGxhYmxlPEVudlsnbG9nTGV2ZWwnXT47XG50eXBlIE1lc3NhZ2VTdHJpbmcgPSBzdHJpbmc7XG50eXBlIE1lc3NhZ2VGdW5jdGlvbiA9ICgpID0+IHN0cmluZztcbnR5cGUgTWVzc2FnZSA9IE1lc3NhZ2VTdHJpbmcgfCBNZXNzYWdlRnVuY3Rpb247XG5cbmNvbnN0IGxvZ0xldmVsUHJlZml4ID0gWydWJywgJ0knLCAnVycsICdFJywgJ0YnXTtcblxuY29uc3QgZG9Mb2cgPSAobGV2ZWw6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUubG9nKGBbJHtsb2dMZXZlbFByZWZpeFtsZXZlbF19LCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfV0ke21lc3NhZ2V9YCk7XG59O1xuXG5sZXQgY29uZmlnTG9nTGV2ZWw6IExvZ0xldmVsIHwgdW5kZWZpbmVkO1xubGV0IGRlYnVnOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgY29uc3QgY29uZmlndXJlTG9nZ2VyID0gKCRjb25maWdMb2dMZXZlbDogTG9nTGV2ZWwsICRkZWJ1ZzogYm9vbGVhbik6IHZvaWQgPT4ge1xuICBjb25maWdMb2dMZXZlbCA9ICRjb25maWdMb2dMZXZlbDtcbiAgZGVidWcgPSAkZGVidWc7XG59O1xuXG4vKipcbiAqIEEgc2ltcGxlIGxvZ2dpbmcgdXRpbGl0eSB0byBsb2cgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBMT0cgPSAobG9nTGV2ZWw6IExvZ0xldmVsLCBtc2c6IE1lc3NhZ2UpOiB2b2lkID0+IHtcbiAgY29uc3QgbWVzc2FnZUxldmVsID0gbG9nTGV2ZWxTdHJpbmdUb0VudW0obG9nTGV2ZWwpO1xuICBjb25zdCBjb25maWdMZXZlbCA9IGxvZ0xldmVsU3RyaW5nVG9FbnVtKGNvbmZpZ0xvZ0xldmVsKTtcbiAgaWYgKG1lc3NhZ2VMZXZlbCA+PSBjb25maWdMZXZlbCkge1xuICAgIGRvTG9nKG1lc3NhZ2VMZXZlbCwgdHlwZW9mIG1zZyA9PT0gJ2Z1bmN0aW9uJyA/IG1zZygpIDogbXNnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBIHNpbXBsZSBsb2dnaW5nIHV0aWxpdHkgdG8gbG9nIG1lc3NhZ2VzIHRvIHRoZSBjb25zb2xlLiBPbmx5IGxvZ3Mgd2hlbiBkZWJ1ZyBpcyBlbmFibGVkLlxuICovXG5leHBvcnQgY29uc3QgTE9HX0RFQlVHOiB0eXBlb2YgTE9HID0gKC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIExPRz4pID0+IHtcbiAgaWYgKGRlYnVnKSB7XG4gICAgTE9HKC4uLmFyZ3MpO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBXZWJOTkJhY2tlbmQgfSBmcm9tICcuLi9iYWNrZW5kLXdlYm5uJztcbmltcG9ydCB7IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciB9IGZyb20gJy4uLy4uL3dhc20tY29tbW9uJztcbmltcG9ydCB7IExPR19ERUJVRyB9IGZyb20gJy4uL2xvZyc7XG5cbi8vIFdlYk5OIEFQSSBjdXJyZW50bHkgZG9lcyBub3QgaGF2ZSBhIFR5cGVTY3JpcHQgZGVmaW5pdGlvbiBmaWxlLiBUaGlzIGZpbGUgaXMgYSB3b3JrYXJvdW5kIHdpdGggdHlwZXMgZ2VuZXJhdGVkIGZyb21cbi8vIFdlYk5OIEFQSSBzcGVjaWZpY2F0aW9uLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYm1hY2hpbmVsZWFybmluZy93ZWJubi9pc3N1ZXMvNjc3XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwid2Vibm4uZC50c1wiIC8+XG5cbi8qKlxuICogTWFwIGZyb20gTUxPcGVyYW5kRGF0YVR5cGUgdG8gc2l6ZSBpbiBiaXRzLiBVc2luZyBiaXRzIGluc3RlYWQgb2YgYnl0ZXMgdG8gYXZvaWQgcG9zc2libGUgcHJlY2lzaW9uIGxvc3Mgb24gaW50NCBhbmQgdWludDQuXG4gKi9cbmNvbnN0IHdlYm5uRGF0YVR5cGVUb1NpemUgPSBuZXcgTWFwPE1MT3BlcmFuZERhdGFUeXBlLCBudW1iZXI+KFtcbiAgWydmbG9hdDMyJywgMzJdLFxuICBbJ2Zsb2F0MTYnLCAxNl0sXG4gIFsnaW50MzInLCAzMl0sXG4gIFsndWludDMyJywgMzJdLFxuICBbJ2ludDY0JywgNjRdLFxuICBbJ3VpbnQ2NCcsIDY0XSxcbiAgWydpbnQ4JywgOF0sXG4gIFsndWludDgnLCA4XSxcbiAgWydpbnQ0JywgNF0sXG4gIFsndWludDQnLCA0XSxcbl0pO1xuXG4vLyBDb252ZXJ0IGludGVnZXIgZGF0YSB0byBhbiBJbnQzMkFycmF5IGJ1ZmZlci5cbi8vIFN1cHBvcnRzIGNvbnZlcnNpb24gZnJvbSBpbnQ2NCwgdWludDY0LCB1aW50MzIsIGludDggYW5kIHVpbnQ4IHRvIGludDMyLlxuZXhwb3J0IGNvbnN0IGNvbnZlcnREYXRhVG9JbnQzMiA9IChkYXRhOiBVaW50OEFycmF5LCBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUpOiBVaW50OEFycmF5ID0+IHtcbiAgaWYgKGRhdGFUeXBlID09PSAnaW50MzInKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCBkYXRhVHlwZVNpemUgPSB3ZWJubkRhdGFUeXBlVG9TaXplLmdldChkYXRhVHlwZSk7XG4gIGlmICghZGF0YVR5cGVTaXplKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZWJOTiBiYWNrZW5kIGRvZXMgbm90IHN1cHBvcnQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfWApO1xuICB9XG4gIGNvbnN0IGJ5dGVzUGVyRWxlbWVudCA9IGRhdGFUeXBlU2l6ZSAvIDg7XG4gIC8vIE1ha2Ugc3VyZSB0aGUgZGF0YSBsZW5ndGggaXMgYSBtdWx0aXBsZSBvZiB0aGUgZGF0YSB0eXBlIHNpemUuXG4gIGlmIChkYXRhLmJ5dGVMZW5ndGggJSBieXRlc1BlckVsZW1lbnQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgVWludDhBcnJheSBsZW5ndGggLSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgJHtieXRlc1BlckVsZW1lbnR9LmApO1xuICB9XG5cbiAgLy8gQ29udmVydCBVaW50OEFycmF5IHRvIG9yaWdpbmFsIHR5cGVkIGFycmF5LlxuICBjb25zdCBudW1FbGVtZW50cyA9IGRhdGEuYnl0ZUxlbmd0aCAvIGJ5dGVzUGVyRWxlbWVudDtcbiAgY29uc3Qgb3JpZ2luYWxBcnJheSA9IG5ldyAodGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yKGRhdGFUeXBlKSkoXG4gICAgZGF0YS5idWZmZXIgYXMgQXJyYXlCdWZmZXIsXG4gICAgZGF0YS5ieXRlT2Zmc2V0LFxuICAgIG51bUVsZW1lbnRzLFxuICApO1xuXG4gIHN3aXRjaCAoZGF0YVR5cGUpIHtcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgY2FzZSAndWludDY0Jzoge1xuICAgICAgLy8gQ29udmVydCBvcmlnaW5hbCB0eXBlZCBhcnJheSB0byBJbnQzMkFycmF5LlxuICAgICAgY29uc3QgaW50MzJBcnJheSA9IG5ldyBJbnQzMkFycmF5KG51bUVsZW1lbnRzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRWxlbWVudHM7IGkrKykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsQXJyYXlbaV07XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIG92ZXJmbG93LlxuICAgICAgICBpZiAodmFsdWUgPiAyMTQ3NDgzNjQ3biB8fCB2YWx1ZSA8IC0yMTQ3NDgzNjQ4bikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBjb252ZXJ0IGludDY0IGRhdGEgdG8gaW50MzIgLSB2YWx1ZSBvdXQgb2YgcmFuZ2UuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbnQzMkFycmF5W2ldID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGludDMyQXJyYXkuYnVmZmVyKTtcbiAgICB9XG4gICAgY2FzZSAnaW50OCc6XG4gICAgY2FzZSAndWludDgnOlxuICAgIGNhc2UgJ3VpbnQzMic6IHtcbiAgICAgIC8vIENoZWNrIGZvciBvdmVyZmxvdy5cbiAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3VpbnQzMicpIHtcbiAgICAgICAgaWYgKG9yaWdpbmFsQXJyYXkuc29tZSgodmFsdWUpID0+IHZhbHVlID4gMjE0NzQ4MzY0NykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgY29udmVydCB1aW50MzIgZGF0YSB0byBpbnQzMiAtIHZhbHVlIG91dCBvZiByYW5nZS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQ29udmVydCBvcmlnaW5hbCB0eXBlZCBhcnJheSB0byBJbnQzMkFycmF5LlxuICAgICAgY29uc3QgaW50MzJBcnJheSA9IEludDMyQXJyYXkuZnJvbShvcmlnaW5hbEFycmF5LCBOdW1iZXIpO1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGludDMyQXJyYXkuYnVmZmVyKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSBjb252ZXJzaW9uIGZyb20gJHtkYXRhVHlwZX0gdG8gJ2ludDMyJ2ApO1xuICB9XG59O1xuXG4vLyBDb252ZXJ0IEludDMyQXJyYXkgZGF0YSB0byBvcmlnaW5hbCBpbnRlZ2VyIGRhdGEgYnVmZmVyLlxuLy8gU3VwcG9ydHMgY29udmVyc2lvbiBmcm9tIGludDMyIHRvIGludDY0LCB1aW50NjQsIHVpbnQzMiwgaW50OCBhbmQgdWludDguXG5leHBvcnQgY29uc3QgY29udmVydEludDMyVG9EYXRhID0gKGRhdGE6IFVpbnQ4QXJyYXksIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSk6IFVpbnQ4QXJyYXkgPT4ge1xuICBpZiAoZGF0YVR5cGUgPT09ICdpbnQzMicpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSB0aGUgZGF0YSBsZW5ndGggaXMgYSBtdWx0aXBsZSBvZiA0IGJ5dGVzIChJbnQzMkFycmF5KS5cbiAgaWYgKGRhdGEuYnl0ZUxlbmd0aCAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVWludDhBcnJheSBsZW5ndGggLSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCAoaW50MzIpLicpO1xuICB9XG5cbiAgLy8gQ29udmVydCBVaW50OEFycmF5IHRvIEludDMyQXJyYXkuXG4gIGNvbnN0IG51bUVsZW1lbnRzID0gZGF0YS5ieXRlTGVuZ3RoIC8gNDtcbiAgY29uc3QgaW50MzJBcnJheSA9IG5ldyBJbnQzMkFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIG51bUVsZW1lbnRzKTtcblxuICBzd2l0Y2ggKGRhdGFUeXBlKSB7XG4gICAgY2FzZSAnaW50NjQnOiB7XG4gICAgICBjb25zdCBiaWdJbnQ2NEFycmF5ID0gQmlnSW50NjRBcnJheS5mcm9tKGludDMyQXJyYXksIEJpZ0ludCk7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYmlnSW50NjRBcnJheS5idWZmZXIpO1xuICAgIH1cbiAgICBjYXNlICd1aW50NjQnOiB7XG4gICAgICBpZiAoaW50MzJBcnJheS5zb21lKCh2YWx1ZSkgPT4gdmFsdWUgPCAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgY29udmVydCBpbnQzMiBkYXRhIHRvIHVpbjY0IC0gbmVnYXRpdmUgdmFsdWUgZm91bmQuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBiaWdVaW50NjRBcnJheSA9IEJpZ1VpbnQ2NEFycmF5LmZyb20oaW50MzJBcnJheSwgQmlnSW50KTtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShiaWdVaW50NjRBcnJheS5idWZmZXIpO1xuICAgIH1cbiAgICBjYXNlICdpbnQ4Jzoge1xuICAgICAgaWYgKGludDMyQXJyYXkuc29tZSgodmFsdWUpID0+IHZhbHVlIDwgLTEyOCB8fCB2YWx1ZSA+IDEyNykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGNvbnZlcnQgaW50MzIgZGF0YSB0byBpbnQ4IC0gdmFsdWUgb3V0IG9mIHJhbmdlLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW50OEFycmF5ID0gSW50OEFycmF5LmZyb20oaW50MzJBcnJheSwgTnVtYmVyKTtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShpbnQ4QXJyYXkuYnVmZmVyKTtcbiAgICB9XG4gICAgY2FzZSAndWludDgnOiB7XG4gICAgICBpZiAoaW50MzJBcnJheS5zb21lKCh2YWx1ZSkgPT4gdmFsdWUgPCAwIHx8IHZhbHVlID4gMjU1KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgY29udmVydCBpbnQzMiBkYXRhIHRvIHVpbnQ4IC0gdmFsdWUgb3V0IG9mIHJhbmdlLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShpbnQzMkFycmF5LCBOdW1iZXIpO1xuICAgIH1cbiAgICBjYXNlICd1aW50MzInOiB7XG4gICAgICBpZiAoaW50MzJBcnJheS5zb21lKCh2YWx1ZSkgPT4gdmFsdWUgPCAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgY29udmVydCBpbnQzMiBkYXRhIHRvIHVpbnQzMiAtIG5lZ2F0aXZlIHZhbHVlIGZvdW5kLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgdWludDMyQXJyYXkgPSBVaW50MzJBcnJheS5mcm9tKGludDMyQXJyYXksIE51bWJlcik7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodWludDMyQXJyYXkuYnVmZmVyKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSBjb252ZXJzaW9uIGZyb20gJ2ludDMyJyB0byAke2RhdGFUeXBlfWApO1xuICB9XG59O1xuXG5leHBvcnQgdHlwZSBUZW5zb3JJZCA9IG51bWJlcjtcblxuLyoqXG4gKiBNYW5hZ2VzIFRlbnNvcklkIHRvIE1MVGVuc29yIG1hcHBpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yTWFuYWdlciB7XG4gIC8qKlxuICAgKiBSZXNlcnZlIGEgbmV3IFRlbnNvcklkLlxuICAgKi9cbiAgcmVzZXJ2ZVRlbnNvcklkKCk6IFRlbnNvcklkO1xuICAvKipcbiAgICogUmVsZWFzZSBhIFRlbnNvcklkLlxuICAgKi9cbiAgcmVsZWFzZVRlbnNvcklkKHRlbnNvcklkOiBUZW5zb3JJZCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBFbnN1cmUgYSBNTFRlbnNvciBpcyBjcmVhdGVkIGZvciB0aGUgVGVuc29ySWQuXG4gICAqL1xuICBlbnN1cmVUZW5zb3IoXG4gICAgc2Vzc2lvbklkOiBudW1iZXIsXG4gICAgdGVuc29ySWQ6IFRlbnNvcklkLFxuICAgIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSxcbiAgICBzaGFwZTogcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgY29weU9sZDogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxNTFRlbnNvcj47XG4gIC8qKlxuICAgKiBVcGxvYWQgZGF0YSB0byBhIE1MVGVuc29yLlxuICAgKi9cbiAgdXBsb2FkKHRlbnNvcklkOiBUZW5zb3JJZCwgZGF0YTogVWludDhBcnJheSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBEb3dubG9hZCBkYXRhIGZyb20gYSBNTFRlbnNvci5cbiAgICovXG4gIGRvd25sb2FkKHRlbnNvcklkOiBUZW5zb3JJZCk6IFByb21pc2U8QXJyYXlCdWZmZXI+O1xuICBkb3dubG9hZCh0ZW5zb3JJZDogVGVuc29ySWQsIGRzdFRlbnNvcjogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPHVuZGVmaW5lZD47XG4gIC8qKlxuICAgKiBSZWxlYXNlIGFsbCB0ZW5zb3JzIGZvciBhIGdpdmVuIHNlc3Npb24uXG4gICAqL1xuICByZWxlYXNlVGVuc29yc0ZvclNlc3Npb24oc2Vzc2lvbjogbnVtYmVyKTogdm9pZDtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGV4dGVybmFsbHkgY3JlYXRlZCBNTFRlbnNvciB3aXRoIGEgZ2l2ZW4gc2Vzc2lvbiBpZCBhbmQgcmV0dXJuIGEgVGVuc29ySWQuXG4gICAqL1xuICByZWdpc3RlclRlbnNvcihzZXNzaW9uSWQ6IG51bWJlciwgbWxUZW5zb3I6IE1MVGVuc29yLCBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUsIHNoYXBlOiBudW1iZXJbXSk6IFRlbnNvcklkO1xufVxuXG5sZXQgdGVuc29yR3VpZCA9IDE7XG5jb25zdCBjcmVhdGVOZXdUZW5zb3JJZCA9ICgpOiBUZW5zb3JJZCA9PiB0ZW5zb3JHdWlkKys7XG5cbi8qKlxuICogTWFwIGZyb20gZGF0YSB0eXBlIHRvIGZhbGxiYWNrIGRhdGEgdHlwZS5cbiAqIFdoZW4gdGhlIGNvbnRleHQgZG9lcyBub3Qgc3VwcG9ydCB0aGUgb3JpZ2luYWwgZGF0YSB0eXBlLCB1c2UgZmFsbGJhY2sgZGF0YSB0eXBlIGFzIHdvcmthcm91bmQuXG4gKiBOb3RlOiBDdXJyZW50bHksIHdlIG9ubHkgc3VwcG9ydCBmYWxsYmFjayB0byBpbnQzMiBmb3IgY2VydGFpbiBpbnRlZ2VyIGRhdGEgdHlwZXMuXG4gKi9cbmNvbnN0IHdlYm5uRGF0YVR5cGVUb0ZhbGxiYWNrID0gbmV3IE1hcDxNTE9wZXJhbmREYXRhVHlwZSwgTUxPcGVyYW5kRGF0YVR5cGU+KFtcbiAgWydpbnQ4JywgJ2ludDMyJ10sXG4gIFsndWludDgnLCAnaW50MzInXSxcbiAgWyd1aW50MzInLCAnaW50MzInXSxcbiAgWydpbnQ2NCcsICdpbnQzMiddLFxuXSk7XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBieXRlIGxlbmd0aCBvZiBhIHRlbnNvciB3aXRoIHRoZSBnaXZlbiBkYXRhIHR5cGUgYW5kIHNoYXBlLlxuICovXG5jb25zdCBjYWxjdWxhdGVCeXRlTGVuZ3RoID0gKGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSwgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdKTogbnVtYmVyID0+IHtcbiAgY29uc3QgZGF0YVR5cGVTaXplID0gd2Vibm5EYXRhVHlwZVRvU2l6ZS5nZXQoZGF0YVR5cGUpO1xuICBpZiAoIWRhdGFUeXBlU2l6ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV2ViTk4gYmFja2VuZCBkb2VzIG5vdCBzdXBwb3J0IGRhdGEgdHlwZTogJHtkYXRhVHlwZX1gKTtcbiAgfVxuICByZXR1cm4gc2hhcGUubGVuZ3RoID4gMCA/IE1hdGguY2VpbCgoc2hhcGUucmVkdWNlKChhLCBiKSA9PiBhICogYikgKiBkYXRhVHlwZVNpemUpIC8gOCkgOiAwO1xufTtcblxuLyoqXG4gKiBUZW5zb3JXcmFwcGVyIHdyYXBzIGFuIE1MVGVuc29yIGFuZCBwcm92aWRlcyBhIHdheSB0byB0cmFjayB0aGUgbGFzdCBzZXNzaW9uIHRoYXQgdXNlZCBpdC5cbiAqL1xuY2xhc3MgVGVuc29yV3JhcHBlciB7XG4gIC8vIFRoZSBpZCBvZiB0aGUgbGFzdCBzZXNzaW9uIHRoYXQgdXNlZCB0aGlzIHRlbnNvci5cbiAgcHVibGljIHNlc3Npb25JZDogbnVtYmVyO1xuICAvLyBUaGlzIGZsYWcgaXMgdXNlZCB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBkYXRhIGhhcyBiZWVuIGNvbnZlcnRlZCB0byBmYWxsYmFjayBkYXRhIHR5cGUuXG4gIHB1YmxpYyBpc0RhdGFDb252ZXJ0ZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIG1sQ29udGV4dDogTUxDb250ZXh0O1xuICBwcml2YXRlIG1sVGVuc29yOiBNTFRlbnNvcjtcbiAgcHJpdmF0ZSBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGU7XG4gIC8vIEZhbGxiYWNrIGRhdGEgdHlwZSB0byB1c2Ugd2hlbiB0aGUgY29udGV4dCBkb2VzIG5vdCBzdXBwb3J0IHRoZSBvcmlnaW5hbCBkYXRhIHR5cGUuXG4gIHByaXZhdGUgZmFsbGJhY2tEYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgdGVuc29yU2hhcGU6IHJlYWRvbmx5IG51bWJlcltdO1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0b3I6IHtcbiAgICBzZXNzaW9uSWQ6IG51bWJlcjtcbiAgICBjb250ZXh0OiBNTENvbnRleHQ7XG4gICAgdGVuc29yOiBNTFRlbnNvcjtcbiAgICBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGU7XG4gICAgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdO1xuICAgIGZhbGxiYWNrRGF0YVR5cGU/OiBNTE9wZXJhbmREYXRhVHlwZTtcbiAgfSkge1xuICAgIGNvbnN0IHsgc2Vzc2lvbklkLCBjb250ZXh0LCB0ZW5zb3IsIGRhdGFUeXBlLCBzaGFwZSwgZmFsbGJhY2tEYXRhVHlwZSB9ID0gZGVzY3JpcHRvcjtcbiAgICB0aGlzLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICB0aGlzLm1sQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5tbFRlbnNvciA9IHRlbnNvcjtcbiAgICB0aGlzLmRhdGFUeXBlID0gZGF0YVR5cGU7XG4gICAgdGhpcy50ZW5zb3JTaGFwZSA9IHNoYXBlO1xuICAgIHRoaXMuZmFsbGJhY2tEYXRhVHlwZSA9IGZhbGxiYWNrRGF0YVR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRlbnNvcigpOiBNTFRlbnNvciB7XG4gICAgcmV0dXJuIHRoaXMubWxUZW5zb3I7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogTUxPcGVyYW5kRGF0YVR5cGUge1xuICAgIHJldHVybiB0aGlzLmRhdGFUeXBlO1xuICB9XG5cbiAgcHVibGljIGdldCBmYWxsYmFja1R5cGUoKTogTUxPcGVyYW5kRGF0YVR5cGUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmZhbGxiYWNrRGF0YVR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYXBlKCk6IHJlYWRvbmx5IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy50ZW5zb3JTaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYnl0ZUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjYWxjdWxhdGVCeXRlTGVuZ3RoKHRoaXMuZGF0YVR5cGUsIHRoaXMudGVuc29yU2hhcGUpO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gJ1tXZWJOTl0gVGVuc29yV3JhcHBlci5kZXN0cm95Jyk7XG4gICAgdGhpcy5tbFRlbnNvci5kZXN0cm95KCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGUoZGF0YTogVWludDhBcnJheSk6IHZvaWQge1xuICAgIHRoaXMubWxDb250ZXh0LndyaXRlVGVuc29yKHRoaXMubWxUZW5zb3IsIGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlYWQoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj47XG4gIHB1YmxpYyBhc3luYyByZWFkKGRzdEJ1ZmZlcj86IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcnJheUJ1ZmZlciB8IHVuZGVmaW5lZD47XG4gIHB1YmxpYyBhc3luYyByZWFkKGRzdEJ1ZmZlcj86IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcnJheUJ1ZmZlciB8IHVuZGVmaW5lZD4ge1xuICAgIGlmICh0aGlzLmZhbGxiYWNrRGF0YVR5cGUpIHtcbiAgICAgIC8vIFRoaXMgdGVuc29yIGhhcyBiZWVuIGZhbGxiYWNrIHRvIGludDMyIGFzIHdvcmthcm91bmQsIHdlIG5lZWQgdG8gcmVhZCBpdCBhcyBpdHMgb3JpZ2luYWwgaW50ZWdlciBkYXRhIHR5cGUuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5tbENvbnRleHQucmVhZFRlbnNvcih0aGlzLm1sVGVuc29yKTtcbiAgICAgIGNvbnN0IG9yaWdpbmFsRGF0YSA9IGNvbnZlcnRJbnQzMlRvRGF0YShuZXcgVWludDhBcnJheShkYXRhKSwgdGhpcy5kYXRhVHlwZSk7XG5cbiAgICAgIGlmIChkc3RCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0QnVmZmVyID1cbiAgICAgICAgICBkc3RCdWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlclxuICAgICAgICAgICAgPyBuZXcgVWludDhBcnJheShkc3RCdWZmZXIpXG4gICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KGRzdEJ1ZmZlci5idWZmZXIsIGRzdEJ1ZmZlci5ieXRlT2Zmc2V0LCBkc3RCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIHRhcmdldEJ1ZmZlci5zZXQob3JpZ2luYWxEYXRhKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShvcmlnaW5hbERhdGEpLmJ1ZmZlcjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRzdEJ1ZmZlciA/IHRoaXMubWxDb250ZXh0LnJlYWRUZW5zb3IodGhpcy5tbFRlbnNvciwgZHN0QnVmZmVyKSA6IHRoaXMubWxDb250ZXh0LnJlYWRUZW5zb3IodGhpcy5tbFRlbnNvcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNhblJldXNlVGVuc29yKGNvbnRleHQ6IE1MQ29udGV4dCwgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlLCBzaGFwZTogcmVhZG9ubHkgbnVtYmVyW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5tbENvbnRleHQgPT09IGNvbnRleHQgJiZcbiAgICAgIHRoaXMuZGF0YVR5cGUgPT09IGRhdGFUeXBlICYmXG4gICAgICB0aGlzLnRlbnNvclNoYXBlLmxlbmd0aCA9PT0gc2hhcGUubGVuZ3RoICYmXG4gICAgICB0aGlzLnRlbnNvclNoYXBlLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBzaGFwZVtpXSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHNldElzRGF0YUNvbnZlcnRlZChpc0NvbnZlcnRlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNEYXRhQ29udmVydGVkID0gaXNDb252ZXJ0ZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBUZW5zb3JUcmFja2VyIHRyYWNrcyB0aGUgTUxUZW5zb3IgYW5kIHBlbmRpbmcgdXBsb2FkIGRhdGEuXG4gKlxuICogV2UgbmVlZCB0byB0cmFjayB0aGUgTUxUZW5zb3IgYW5kIHBlbmRpbmcgdXBsb2FkIGRhdGEgYmVjYXVzZSB3ZSBkZWxheSB0aGUgY3JlYXRpb24gb2YgTUxUZW5zb3IgdW50aWxcbiAqIHdlIGtub3cgdGhlIGRhdGEgdHlwZSBhbmQgc2hhcGUuIFRoaXMgaXMgYmVjYXVzZSBXZWJOTiBvbmx5IHN1cHBvcnQgY3JlYXRpbmcgTUxUZW5zb3JzIHdpdGggZGF0YVR5cGVzIGFuZCBzaGFwZS5cbiAqL1xuY2xhc3MgVGVuc29ySWRUcmFja2VyIHtcbiAgcHJpdmF0ZSBhY3RpdmVVcGxvYWQ/OiBVaW50OEFycmF5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdGVuc29yTWFuYWdlcjogVGVuc29yTWFuYWdlckltcGwsXG4gICAgcHJpdmF0ZSB3cmFwcGVyPzogVGVuc29yV3JhcHBlcixcbiAgKSB7fVxuXG4gIHB1YmxpYyBnZXQgdGVuc29yV3JhcHBlcigpOiBUZW5zb3JXcmFwcGVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVyO1xuICB9XG5cbiAgcHVibGljIHJlbGVhc2VUZW5zb3IoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGVuc29yV3JhcHBlcikge1xuICAgICAgdGhpcy50ZW5zb3JNYW5hZ2VyLnJlbGVhc2VUZW5zb3IodGhpcy50ZW5zb3JXcmFwcGVyKTtcbiAgICAgIHRoaXMud3JhcHBlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZW5zdXJlVGVuc29yKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxuICAgIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSxcbiAgICBzaGFwZTogcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgY29weU9sZDogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxNTFRlbnNvcj4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnRlbnNvck1hbmFnZXIuZ2V0TUxDb250ZXh0KHNlc3Npb25JZCk7XG4gICAgY29uc3Qgb3BMaW1pdHMgPSB0aGlzLnRlbnNvck1hbmFnZXIuZ2V0TUxPcFN1cHBvcnRMaW1pdHMoc2Vzc2lvbklkKTtcbiAgICBsZXQgZmFsbGJhY2tEYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUgfCB1bmRlZmluZWQ7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGNvbnRleHQgc3VwcG9ydHMgdGhlIGRhdGEgdHlwZS4gSWYgbm90LCB0cnkgdG8gdXNlIHRoZSBmYWxsYmFjayBkYXRhIHR5cGUuXG4gICAgaWYgKCFvcExpbWl0cz8uaW5wdXQuZGF0YVR5cGVzLmluY2x1ZGVzKGRhdGFUeXBlKSkge1xuICAgICAgZmFsbGJhY2tEYXRhVHlwZSA9IHdlYm5uRGF0YVR5cGVUb0ZhbGxiYWNrLmdldChkYXRhVHlwZSk7XG4gICAgICBpZiAoIWZhbGxiYWNrRGF0YVR5cGUgfHwgb3BMaW1pdHM/LmlucHV0LmRhdGFUeXBlcy5pbmNsdWRlcyhmYWxsYmFja0RhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYk5OIGJhY2tlbmQgZG9lcyBub3Qgc3VwcG9ydCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9YCk7XG4gICAgICB9XG4gICAgICBMT0dfREVCVUcoXG4gICAgICAgICd2ZXJib3NlJyxcbiAgICAgICAgKCkgPT4gYFtXZWJOTl0gVGVuc29ySWRUcmFja2VyLmVuc3VyZVRlbnNvcjogZmFsbGJhY2sgZGF0YVR5cGUgZnJvbSAke2RhdGFUeXBlfSB0byAke2ZhbGxiYWNrRGF0YVR5cGV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMud3JhcHBlcikge1xuICAgICAgaWYgKHRoaXMud3JhcHBlci5jYW5SZXVzZVRlbnNvcihjb250ZXh0LCBkYXRhVHlwZSwgc2hhcGUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZXIudGVuc29yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvcHlPbGQpIHtcbiAgICAgICAgICBpZiAodGhpcy53cmFwcGVyLmJ5dGVMZW5ndGggIT09IGNhbGN1bGF0ZUJ5dGVMZW5ndGgoZGF0YVR5cGUsIHNoYXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY29weSBkYXRhIHRvIHRlbnNvciB3aXRoIGRpZmZlcmVudCBzaXplLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFjdGl2ZVVwbG9hZCA9IG5ldyBVaW50OEFycmF5KGF3YWl0IHRoaXMud3JhcHBlci5yZWFkKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVuc29yTWFuYWdlci5yZWxlYXNlVGVuc29yKHRoaXMud3JhcHBlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICBjb25zdCB1c2FnZSA9IHR5cGVvZiBNTFRlbnNvclVzYWdlID09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTUxUZW5zb3JVc2FnZS5SRUFEIHwgTUxUZW5zb3JVc2FnZS5XUklURTtcbiAgICB0aGlzLndyYXBwZXIgPSBhd2FpdCB0aGlzLnRlbnNvck1hbmFnZXIuZ2V0Q2FjaGVkVGVuc29yKFxuICAgICAgc2Vzc2lvbklkLFxuICAgICAgZGF0YVR5cGUsXG4gICAgICBzaGFwZSxcbiAgICAgIHVzYWdlLFxuICAgICAgdHJ1ZSxcbiAgICAgIHRydWUsXG4gICAgICBmYWxsYmFja0RhdGFUeXBlLFxuICAgICk7XG5cbiAgICBpZiAoY29weU9sZCAmJiB0aGlzLmFjdGl2ZVVwbG9hZCkge1xuICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBjb252ZXJ0IHRoZSBvcmlnaW5hbCBpbnRlZ2VyIGRhdGEgdG8gaW50MzIsXG4gICAgICAvLyBiZWNhdXNlIGl0IGhhcyBiZWVuIGNvbnZlcnRlZCB3aGVuIGl0IHdhcyB1cGxvYWRlZC5cbiAgICAgIHRoaXMud3JhcHBlci53cml0ZSh0aGlzLmFjdGl2ZVVwbG9hZCk7XG4gICAgICB0aGlzLmFjdGl2ZVVwbG9hZCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53cmFwcGVyLnRlbnNvcjtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoZGF0YTogVWludDhBcnJheSk6IHZvaWQge1xuICAgIGxldCBuZXdEYXRhID0gZGF0YTtcbiAgICBpZiAodGhpcy53cmFwcGVyKSB7XG4gICAgICBpZiAodGhpcy53cmFwcGVyLmZhbGxiYWNrVHlwZSkge1xuICAgICAgICBpZiAodGhpcy53cmFwcGVyLmZhbGxiYWNrVHlwZSA9PT0gJ2ludDMyJykge1xuICAgICAgICAgIC8vIENvbnZlcnQgb3JpZ2luYWwgaW50ZWdlciBkYXRhIHRvIGludDMyLlxuICAgICAgICAgIG5ld0RhdGEgPSBjb252ZXJ0RGF0YVRvSW50MzIoZGF0YSwgdGhpcy53cmFwcGVyLnR5cGUpO1xuICAgICAgICAgIHRoaXMud3JhcHBlci5zZXRJc0RhdGFDb252ZXJ0ZWQodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBmYWxsYmFjayBkYXRhIHR5cGU6ICR7dGhpcy53cmFwcGVyLmZhbGxiYWNrVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgZGF0YSBzaXplIG1hdGNoZXMgdGhlIHRlbnNvciBzaXplLlxuICAgICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCA9PT0gdGhpcy53cmFwcGVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgLy8gV3JpdGUgdGhlIG5ld0RhdGEgdG8gdGhlIHRlbnNvci5cbiAgICAgICAgdGhpcy53cmFwcGVyLndyaXRlKG5ld0RhdGEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMT0dfREVCVUcoJ3ZlcmJvc2UnLCAoKSA9PiAnRGF0YSBzaXplIGRvZXMgbm90IG1hdGNoIHRlbnNvciBzaXplLiBSZWxlYXNpbmcgdGVuc29yLicpO1xuICAgICAgICB0aGlzLnJlbGVhc2VUZW5zb3IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmVVcGxvYWQpIHtcbiAgICAgIHRoaXMuYWN0aXZlVXBsb2FkLnNldChuZXdEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVVcGxvYWQgPSBuZXcgVWludDhBcnJheShuZXdEYXRhKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWQoZHN0QnVmZmVyPzogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPEFycmF5QnVmZmVyIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKHRoaXMuYWN0aXZlVXBsb2FkKSB7XG4gICAgICAvLyBJZiB0aGlzLmFjdGl2ZVVwbG9hZCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gaW50MzIsIHdlIG5lZWQgdG8gY29udmVydCBpdCBiYWNrIHRvIG9yaWdpbmFsIGludGVnZXIgZGF0YSB0eXBlLlxuICAgICAgY29uc3QgZHN0RGF0YSA9IHRoaXMud3JhcHBlcj8uaXNEYXRhQ29udmVydGVkXG4gICAgICAgID8gY29udmVydEludDMyVG9EYXRhKHRoaXMuYWN0aXZlVXBsb2FkLCB0aGlzLndyYXBwZXI/LnR5cGUpXG4gICAgICAgIDogdGhpcy5hY3RpdmVVcGxvYWQ7XG5cbiAgICAgIGlmIChkc3RCdWZmZXIpIHtcbiAgICAgICAgaWYgKGRzdEJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZHN0QnVmZmVyKS5zZXQoZHN0RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZHN0QnVmZmVyLmJ1ZmZlciwgZHN0QnVmZmVyLmJ5dGVPZmZzZXQsIGRzdEJ1ZmZlci5ieXRlTGVuZ3RoKS5zZXQoZHN0RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRzdERhdGEuYnVmZmVyIGFzIEFycmF5QnVmZmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMud3JhcHBlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgaGFzIG5vdCBiZWVuIGNyZWF0ZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFkc3RCdWZmZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLndyYXBwZXIucmVhZCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53cmFwcGVyLnJlYWQoZHN0QnVmZmVyKTtcbiAgfVxufVxuXG5jbGFzcyBUZW5zb3JNYW5hZ2VySW1wbCBpbXBsZW1lbnRzIFRlbnNvck1hbmFnZXIge1xuICBwcml2YXRlIHRlbnNvclRyYWNrZXJzQnlJZDogTWFwPFRlbnNvcklkLCBUZW5zb3JJZFRyYWNrZXI+ID0gbmV3IE1hcCgpO1xuICBwcml2YXRlIGZyZWVUZW5zb3JzOiBUZW5zb3JXcmFwcGVyW10gPSBbXTtcbiAgcHJpdmF0ZSBleHRlcm5hbFRlbnNvcnM6IFNldDxUZW5zb3JXcmFwcGVyPiA9IG5ldyBTZXQoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFdlYk5OQmFja2VuZCkge31cblxuICBwdWJsaWMgZ2V0TUxDb250ZXh0KHNlc3Npb25JZDogbnVtYmVyKTogTUxDb250ZXh0IHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5iYWNrZW5kLmdldE1MQ29udGV4dChzZXNzaW9uSWQpO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNTENvbnRleHQgbm90IGZvdW5kIGZvciBzZXNzaW9uLicpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNTE9wU3VwcG9ydExpbWl0cyhzZXNzaW9uSWQ6IG51bWJlcik6IE1MT3BTdXBwb3J0TGltaXRzIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmdldE1MT3BTdXBwb3J0TGltaXRzKHNlc3Npb25JZCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXJ2ZVRlbnNvcklkKCk6IFRlbnNvcklkIHtcbiAgICBjb25zdCB0ZW5zb3JJZCA9IGNyZWF0ZU5ld1RlbnNvcklkKCk7XG4gICAgdGhpcy50ZW5zb3JUcmFja2Vyc0J5SWQuc2V0KHRlbnNvcklkLCBuZXcgVGVuc29ySWRUcmFja2VyKHRoaXMpKTtcbiAgICByZXR1cm4gdGVuc29ySWQ7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZVRlbnNvcklkKHRlbnNvcklkOiBUZW5zb3JJZCk6IHZvaWQge1xuICAgIGNvbnN0IHRlbnNvclRyYWNrZXIgPSB0aGlzLnRlbnNvclRyYWNrZXJzQnlJZC5nZXQodGVuc29ySWQpO1xuICAgIGlmICghdGVuc29yVHJhY2tlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRlbnNvclRyYWNrZXJzQnlJZC5kZWxldGUodGVuc29ySWQpO1xuICAgIGlmICh0ZW5zb3JUcmFja2VyLnRlbnNvcldyYXBwZXIpIHtcbiAgICAgIHRoaXMucmVsZWFzZVRlbnNvcih0ZW5zb3JUcmFja2VyLnRlbnNvcldyYXBwZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBlbnN1cmVUZW5zb3IoXG4gICAgc2Vzc2lvbklkOiBudW1iZXIsXG4gICAgdGVuc29ySWQ6IFRlbnNvcklkLFxuICAgIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSxcbiAgICBzaGFwZTogbnVtYmVyW10sXG4gICAgY29weU9sZDogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxNTFRlbnNvcj4ge1xuICAgIExPR19ERUJVRyhcbiAgICAgICd2ZXJib3NlJyxcbiAgICAgICgpID0+XG4gICAgICAgIGBbV2ViTk5dIFRlbnNvck1hbmFnZXIuZW5zdXJlVGVuc29yIHt0ZW5zb3JJZDogJHt0ZW5zb3JJZH0sIGRhdGFUeXBlOiAke1xuICAgICAgICAgIGRhdGFUeXBlXG4gICAgICAgIH0sIHNoYXBlOiAke3NoYXBlfSwgY29weU9sZDogJHtjb3B5T2xkfX1gLFxuICAgICk7XG4gICAgY29uc3QgdGVuc29yID0gdGhpcy50ZW5zb3JUcmFja2Vyc0J5SWQuZ2V0KHRlbnNvcklkKTtcbiAgICBpZiAoIXRlbnNvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3Igbm90IGZvdW5kLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGVuc29yLmVuc3VyZVRlbnNvcihzZXNzaW9uSWQsIGRhdGFUeXBlLCBzaGFwZSwgY29weU9sZCk7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKHRlbnNvcklkOiBUZW5zb3JJZCwgZGF0YTogVWludDhBcnJheSk6IHZvaWQge1xuICAgIGNvbnN0IHRlbnNvciA9IHRoaXMudGVuc29yVHJhY2tlcnNCeUlkLmdldCh0ZW5zb3JJZCk7XG4gICAgaWYgKCF0ZW5zb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgdGVuc29yLnVwbG9hZChkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZCh0ZW5zb3JJZDogVGVuc29ySWQpOiBQcm9taXNlPEFycmF5QnVmZmVyPjtcbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKHRlbnNvcklkOiBUZW5zb3JJZCwgZHN0QnVmZmVyOiBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlcik6IFByb21pc2U8dW5kZWZpbmVkPjtcbiAgYXN5bmMgZG93bmxvYWQodGVuc29ySWQ6IFRlbnNvcklkLCBkc3RCdWZmZXI/OiBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlcik6IFByb21pc2U8QXJyYXlCdWZmZXIgfCB1bmRlZmluZWQ+IHtcbiAgICBMT0dfREVCVUcoXG4gICAgICAndmVyYm9zZScsXG4gICAgICAoKSA9PiBgW1dlYk5OXSBUZW5zb3JNYW5hZ2VyLmRvd25sb2FkIHt0ZW5zb3JJZDogJHt0ZW5zb3JJZH0sIGRzdEJ1ZmZlcjogJHtkc3RCdWZmZXI/LmJ5dGVMZW5ndGh9fWAsXG4gICAgKTtcbiAgICBjb25zdCB0ZW5zb3JUcmFja2VyID0gdGhpcy50ZW5zb3JUcmFja2Vyc0J5SWQuZ2V0KHRlbnNvcklkKTtcbiAgICBpZiAoIXRlbnNvclRyYWNrZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbnNvclRyYWNrZXIuZG93bmxvYWQoZHN0QnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlVGVuc29yc0ZvclNlc3Npb24oc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0aGlzLmZyZWVUZW5zb3JzKSB7XG4gICAgICBpZiAodGVuc29yLnNlc3Npb25JZCA9PT0gc2Vzc2lvbklkKSB7XG4gICAgICAgIHRlbnNvci5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZnJlZVRlbnNvcnMgPSB0aGlzLmZyZWVUZW5zb3JzLmZpbHRlcigodGVuc29yKSA9PiB0ZW5zb3Iuc2Vzc2lvbklkICE9PSBzZXNzaW9uSWQpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVGVuc29yKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxuICAgIG1sVGVuc29yOiBNTFRlbnNvcixcbiAgICBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUsXG4gICAgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUZW5zb3JJZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0TUxDb250ZXh0KHNlc3Npb25JZCk7XG4gICAgY29uc3QgdGVuc29ySWQgPSBjcmVhdGVOZXdUZW5zb3JJZCgpO1xuICAgIC8vIERlZmF1bHRpbmcgdG8gUkVBRCB8IFdSSVRFIGlmIHVzYWdlIGlzIG5vdCBwcm92aWRlZC5cbiAgICBjb25zdCB3cmFwcGVyID0gbmV3IFRlbnNvcldyYXBwZXIoe1xuICAgICAgc2Vzc2lvbklkLFxuICAgICAgY29udGV4dCxcbiAgICAgIHRlbnNvcjogbWxUZW5zb3IsXG4gICAgICBkYXRhVHlwZSxcbiAgICAgIHNoYXBlLFxuICAgIH0pO1xuICAgIHRoaXMudGVuc29yVHJhY2tlcnNCeUlkLnNldCh0ZW5zb3JJZCwgbmV3IFRlbnNvcklkVHJhY2tlcih0aGlzLCB3cmFwcGVyKSk7XG4gICAgdGhpcy5leHRlcm5hbFRlbnNvcnMuYWRkKHdyYXBwZXIpO1xuICAgIHJldHVybiB0ZW5zb3JJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgb3IgY3JlYXRlIGFuIE1MVGVuc29yIHdpdGggdGhlIGdpdmVuIGRhdGEgdHlwZSBhbmQgc2hhcGUuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q2FjaGVkVGVuc29yKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxuICAgIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSxcbiAgICBzaGFwZTogcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgdXNhZ2U6IE1MVGVuc29yVXNhZ2VGbGFncyB8IHVuZGVmaW5lZCxcbiAgICB3cml0YWJsZTogYm9vbGVhbixcbiAgICByZWFkYWJsZTogYm9vbGVhbixcbiAgICBmYWxsYmFja0RhdGFUeXBlPzogTUxPcGVyYW5kRGF0YVR5cGUsXG4gICk6IFByb21pc2U8VGVuc29yV3JhcHBlcj4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldE1MQ29udGV4dChzZXNzaW9uSWQpO1xuICAgIGZvciAoY29uc3QgW2luZGV4LCB0ZW5zb3JdIG9mIHRoaXMuZnJlZVRlbnNvcnMuZW50cmllcygpKSB7XG4gICAgICBpZiAodGVuc29yLmNhblJldXNlVGVuc29yKGNvbnRleHQsIGRhdGFUeXBlLCBzaGFwZSkpIHtcbiAgICAgICAgTE9HX0RFQlVHKFxuICAgICAgICAgICd2ZXJib3NlJyxcbiAgICAgICAgICAoKSA9PlxuICAgICAgICAgICAgYFtXZWJOTl0gUmV1c2luZyB0ZW5zb3Ige2RhdGFUeXBlOiAke2RhdGFUeXBlfSwgJHtcbiAgICAgICAgICAgICAgZmFsbGJhY2tEYXRhVHlwZSA/IGBmYWxsYmFja0RhdGFUeXBlOiAke2ZhbGxiYWNrRGF0YVR5cGV9LGAgOiAnJ1xuICAgICAgICAgICAgfSBzaGFwZTogJHtzaGFwZX1gLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5mcmVlVGVuc29ycy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgICAgICB3cmFwcGVyLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgICB9XG4gICAgfVxuICAgIExPR19ERUJVRyhcbiAgICAgICd2ZXJib3NlJyxcbiAgICAgICgpID0+XG4gICAgICAgIGBbV2ViTk5dIE1MQ29udGV4dC5jcmVhdGVUZW5zb3Ige2RhdGFUeXBlOiAke2RhdGFUeXBlfSwgJHtcbiAgICAgICAgICBmYWxsYmFja0RhdGFUeXBlID8gYGZhbGxiYWNrRGF0YVR5cGU6ICR7ZmFsbGJhY2tEYXRhVHlwZX0sYCA6ICcnXG4gICAgICAgIH0gc2hhcGU6ICR7c2hhcGV9fWAsXG4gICAgKTtcbiAgICBjb25zdCB0ZW5zb3IgPSBhd2FpdCBjb250ZXh0LmNyZWF0ZVRlbnNvcih7XG4gICAgICBkYXRhVHlwZTogZmFsbGJhY2tEYXRhVHlwZSA/PyBkYXRhVHlwZSwgLy8gSWYgZmFsbGJhY2sgZGF0YSB0eXBlIGlzIHByb3ZpZGVkLCB1c2UgaXQuXG4gICAgICBzaGFwZSxcbiAgICAgIGRpbWVuc2lvbnM6IHNoYXBlLFxuICAgICAgdXNhZ2UsXG4gICAgICB3cml0YWJsZSxcbiAgICAgIHJlYWRhYmxlLFxuICAgIH0pO1xuICAgIHJldHVybiBuZXcgVGVuc29yV3JhcHBlcih7IHNlc3Npb25JZCwgY29udGV4dCwgdGVuc29yLCBkYXRhVHlwZSwgc2hhcGUsIGZhbGxiYWNrRGF0YVR5cGUgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVsZWFzZSB0ZW5zb3IgZm9yIHJldXNlIHVubGVzcyBleHRlcm5hbC5cbiAgICovXG4gIHB1YmxpYyByZWxlYXNlVGVuc29yKHRlbnNvcldyYXBwZXI6IFRlbnNvcldyYXBwZXIpIHtcbiAgICBpZiAodGhpcy5leHRlcm5hbFRlbnNvcnMuaGFzKHRlbnNvcldyYXBwZXIpKSB7XG4gICAgICB0aGlzLmV4dGVybmFsVGVuc29ycy5kZWxldGUodGVuc29yV3JhcHBlcik7XG4gICAgfVxuICAgIHRoaXMuZnJlZVRlbnNvcnMucHVzaCh0ZW5zb3JXcmFwcGVyKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVGVuc29yTWFuYWdlciA9ICguLi5hcmdzOiBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8dHlwZW9mIFRlbnNvck1hbmFnZXJJbXBsPik6IFRlbnNvck1hbmFnZXIgPT5cbiAgbmV3IFRlbnNvck1hbmFnZXJJbXBsKC4uLmFyZ3MpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBXZWJOTiBBUEkgY3VycmVudGx5IGRvZXMgbm90IGhhdmUgYSBUeXBlU2NyaXB0IGRlZmluaXRpb24gZmlsZS4gVGhpcyBmaWxlIGlzIGEgd29ya2Fyb3VuZCB3aXRoIHR5cGVzIGdlbmVyYXRlZCBmcm9tXG4vLyBXZWJOTiBBUEkgc3BlY2lmaWNhdGlvbi5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJtYWNoaW5lbGVhcm5pbmcvd2Vibm4vaXNzdWVzLzY3N1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIndlYm5uL3dlYm5uLmQudHNcIiAvPlxuXG5pbXBvcnQgeyBFbnYsIFRlbnNvciB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7IERhdGFUeXBlLCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSB9IGZyb20gJy4uL3dhc20tY29tbW9uJztcbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi4vd2FzbS1mYWN0b3J5JztcblxuaW1wb3J0IHsgY3JlYXRlVmlldyB9IGZyb20gJy4vdGVuc29yLXZpZXcnO1xuaW1wb3J0IHsgVGVuc29ySWQsIGNyZWF0ZVRlbnNvck1hbmFnZXIsIGNvbnZlcnREYXRhVG9JbnQzMiB9IGZyb20gJy4vd2Vibm4vdGVuc29yLW1hbmFnZXInO1xuaW1wb3J0IHsgY29uZmlndXJlTG9nZ2VyLCBMT0dfREVCVUcgfSBmcm9tICcuL2xvZyc7XG5cbi8qXG4gKiBUZW5zb3JQcm90bzo6ZGF0YV90eXBlIHRvIFdlYk5OIE9wZXJhbmRUeXBlIG1hcHBpbmcuXG4gKi9cbmNvbnN0IG9ubnhEYXRhVHlwZVRvV2Vibm5EYXRhVHlwZSA9IG5ldyBNYXA8RGF0YVR5cGUsIE1MT3BlcmFuZERhdGFUeXBlPihbXG4gIFtEYXRhVHlwZS5mbG9hdCwgJ2Zsb2F0MzInXSxcbiAgW0RhdGFUeXBlLmZsb2F0MTYsICdmbG9hdDE2J10sXG4gIFtEYXRhVHlwZS5pbnQzMiwgJ2ludDMyJ10sXG4gIFtEYXRhVHlwZS51aW50MzIsICd1aW50MzInXSxcbiAgW0RhdGFUeXBlLmludDY0LCAnaW50NjQnXSxcbiAgW0RhdGFUeXBlLnVpbnQ2NCwgJ3VpbnQ2NCddLFxuICBbRGF0YVR5cGUuaW50NCwgJ2ludDQnXSxcbiAgW0RhdGFUeXBlLnVpbnQ0LCAndWludDQnXSxcbiAgW0RhdGFUeXBlLmludDgsICdpbnQ4J10sXG4gIFtEYXRhVHlwZS51aW50OCwgJ3VpbnQ4J10sXG4gIFtEYXRhVHlwZS5ib29sLCAndWludDgnXSxcbl0pO1xuXG50eXBlIE1MQ29udGV4dEVudHJ5ID0ge1xuICBncHVEZXZpY2U/OiBHUFVEZXZpY2U7XG4gIG9wdGlvbnM/OiBNTENvbnRleHRPcHRpb25zO1xuICBtbENvbnRleHQ6IE1MQ29udGV4dDtcbn07XG5cbmNvbnN0IGNvbXBhcmVNTENvbnRleHRPcHRpb25zID0gKGE/OiBNTENvbnRleHRPcHRpb25zLCBiPzogTUxDb250ZXh0T3B0aW9ucyk6IGJvb2xlYW4gPT4ge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChhID09PSB1bmRlZmluZWQgfHwgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGFLZXlzID0gT2JqZWN0LmtleXMoYSkuc29ydCgpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgY29uc3QgYktleXMgPSBPYmplY3Qua2V5cyhiKS5zb3J0KCkgYXMgQXJyYXk8a2V5b2YgdHlwZW9mIGI+O1xuICByZXR1cm4gYUtleXMubGVuZ3RoID09PSBiS2V5cy5sZW5ndGggJiYgYUtleXMuZXZlcnkoKGtleSwgaW5kZXgpID0+IGtleSA9PT0gYktleXNbaW5kZXhdICYmIGFba2V5XSA9PT0gYltrZXldKTtcbn07XG5cbi8qKlxuICogV2ViTk4gYmFja2VuZCBpbXBsZW1lbnRhdGlvbi4gVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIE1MVGVuc29ycyBjcmVhdGVkIGJ5IHRoZSBiYWNrZW5kIGFuZCBrZWVwIHRyYWNrXG4gKiBvZiB0aGUgY3VycmVudCBNTENvbnRleHQgYmVpbmcgdXNlZCBieSB0aGUgc2Vzc2lvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJOTkJhY2tlbmQge1xuICAvKipcbiAgICogVGVuc29yIG1hbmFnZXJzIGZvciBlYWNoIHNlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIHRlbnNvck1hbmFnZXIgPSBjcmVhdGVUZW5zb3JNYW5hZ2VyKHRoaXMpO1xuICAvKipcbiAgICogTWFwcyBmcm9tIHNlc3Npb24gaWQgdG8gTUxDb250ZXh0cy5cbiAgICovXG4gIHByaXZhdGUgbWxDb250ZXh0QnlTZXNzaW9uSWQgPSBuZXcgTWFwPG51bWJlciwgTUxDb250ZXh0PigpO1xuICAvKipcbiAgICogTWFwcyBmcm9tIE1MQ29udGV4dCB0byBzZXNzaW9uIGlkcy5cbiAgICovXG4gIHByaXZhdGUgc2Vzc2lvbklkc0J5TUxDb250ZXh0ID0gbmV3IE1hcDxNTENvbnRleHQsIFNldDxudW1iZXI+PigpO1xuICAvKipcbiAgICogQ2FjaGUgb2YgTUxDb250ZXh0cy5cbiAgICovXG4gIHByaXZhdGUgbWxDb250ZXh0Q2FjaGU6IE1MQ29udGV4dEVudHJ5W10gPSBbXTtcbiAgLyoqXG4gICAqIEN1cnJlbnQgc2Vzc2lvbiBpZC5cbiAgICovXG4gIHByaXZhdGUgYWN0aXZlU2Vzc2lvbklkPzogbnVtYmVyO1xuICAvKipcbiAgICogTWFwcyBmcm9tIHNlc3Npb24gaWQgdG8gbGlzdCBvZiBncmFwaCBpbnB1dHMuXG4gICAqL1xuICBwcml2YXRlIHNlc3Npb25HcmFwaElucHV0czogTWFwPG51bWJlciwgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuICAvKipcbiAgICogTWFwcyBmcm9tIHNlc3Npb24gaWQgdG8gbGlzdCBvZiBncmFwaCBvdXRwdXRzLlxuICAgKi9cbiAgcHJpdmF0ZSBzZXNzaW9uR3JhcGhPdXRwdXRzOiBNYXA8bnVtYmVyLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG4gIC8qKlxuICAgKiBUZW1wb3JhcnkgZ3JhcGggaW5wdXRzIGZvciB0aGUgY3VycmVudCBzZXNzaW9uLlxuICAgKiBUaGVzZSBpbnB1dHMgd2lsbCBiZSByZWdpc3RlcmVkIHdoZW4gdGhlIHNlc3Npb24gaXMgY3JlYXRlZC5cbiAgICovXG4gIHByaXZhdGUgdGVtcG9yYXJ5R3JhcGhJbnB1dHM6IHN0cmluZ1tdID0gW107XG4gIC8qKlxuICAgKiBUZW1wb3JhcnkgZ3JhcGggb3V0cHV0cyBmb3IgdGhlIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICogVGhlc2Ugb3V0cHV0cyB3aWxsIGJlIHJlZ2lzdGVyZWQgd2hlbiB0aGUgc2Vzc2lvbiBpcyBjcmVhdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSB0ZW1wb3JhcnlHcmFwaE91dHB1dHM6IHN0cmluZ1tdID0gW107XG4gIC8qKlxuICAgKiBUZW1wb3JhcnkgdGVuc29ycyBmb3IgdGhlIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICovXG4gIHByaXZhdGUgdGVtcG9yYXJ5U2Vzc2lvblRlbnNvcklkczogTWFwPG51bWJlciwgVGVuc29ySWRbXT4gPSBuZXcgTWFwKCk7XG4gIC8qKlxuICAgKiBNYXBzIGZyb20gc2Vzc2lvbiBpZCB0byBNTE9wU3VwcG9ydExpbWl0cy5cbiAgICovXG4gIHByaXZhdGUgbWxPcFN1cHBvcnRMaW1pdHNCeVNlc3Npb25JZCA9IG5ldyBNYXA8bnVtYmVyLCBNTE9wU3VwcG9ydExpbWl0cz4oKTtcblxuICBjb25zdHJ1Y3RvcihlbnY6IEVudikge1xuICAgIGNvbmZpZ3VyZUxvZ2dlcihlbnYubG9nTGV2ZWwhLCAhIWVudi5kZWJ1Zyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRTZXNzaW9uSWQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmVTZXNzaW9uSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc2Vzc2lvbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hY3RpdmVTZXNzaW9uSWQ7XG4gIH1cblxuICBwdWJsaWMgb25SdW5TdGFydChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQge1xuICAgIExPR19ERUJVRygndmVyYm9zZScsICgpID0+IGBbV2ViTk5dIG9uUnVuU3RhcnQge3Nlc3Npb25JZDogJHtzZXNzaW9uSWR9fWApO1xuICAgIHRoaXMuYWN0aXZlU2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICB9XG5cbiAgcHVibGljIG9uUnVuRW5kKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCB7XG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gb25SdW5FbmQge3Nlc3Npb25JZDogJHtzZXNzaW9uSWR9fWApO1xuICAgIGNvbnN0IHRlbnNvcklkcyA9IHRoaXMudGVtcG9yYXJ5U2Vzc2lvblRlbnNvcklkcy5nZXQoc2Vzc2lvbklkKTtcbiAgICBpZiAoIXRlbnNvcklkcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHRlbnNvcklkIG9mIHRlbnNvcklkcykge1xuICAgICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gcmVsZWFzaW5nIHRlbXBvcmFyeSB0ZW5zb3Ige3RlbnNvcklkOiAke3RlbnNvcklkfX1gKTtcbiAgICAgIHRoaXMudGVuc29yTWFuYWdlci5yZWxlYXNlVGVuc29ySWQodGVuc29ySWQpO1xuICAgIH1cbiAgICB0aGlzLnRlbXBvcmFyeVNlc3Npb25UZW5zb3JJZHMuZGVsZXRlKHNlc3Npb25JZCk7XG4gICAgdGhpcy5hY3RpdmVTZXNzaW9uSWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3JlYXRlTUxDb250ZXh0KG9wdGlvbnNPckRldmljZT86IE1MQ29udGV4dE9wdGlvbnMgfCBHUFVEZXZpY2UpOiBQcm9taXNlPE1MQ29udGV4dD4ge1xuICAgIGlmIChvcHRpb25zT3JEZXZpY2UgaW5zdGFuY2VvZiBHUFVEZXZpY2UpIHtcbiAgICAgIGNvbnN0IG1sQ29udGV4dEluZGV4ID0gdGhpcy5tbENvbnRleHRDYWNoZS5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5ncHVEZXZpY2UgPT09IG9wdGlvbnNPckRldmljZSk7XG4gICAgICBpZiAobWxDb250ZXh0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1sQ29udGV4dENhY2hlW21sQ29udGV4dEluZGV4XS5tbENvbnRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtbENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dChvcHRpb25zT3JEZXZpY2UpO1xuICAgICAgICB0aGlzLm1sQ29udGV4dENhY2hlLnB1c2goeyBncHVEZXZpY2U6IG9wdGlvbnNPckRldmljZSwgbWxDb250ZXh0IH0pO1xuICAgICAgICByZXR1cm4gbWxDb250ZXh0O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9uc09yRGV2aWNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IG1sQ29udGV4dEluZGV4ID0gdGhpcy5tbENvbnRleHRDYWNoZS5maW5kSW5kZXgoXG4gICAgICAgIChlbnRyeSkgPT4gZW50cnkub3B0aW9ucyA9PT0gdW5kZWZpbmVkICYmIGVudHJ5LmdwdURldmljZSA9PT0gdW5kZWZpbmVkLFxuICAgICAgKTtcbiAgICAgIGlmIChtbENvbnRleHRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWxDb250ZXh0Q2FjaGVbbWxDb250ZXh0SW5kZXhdLm1sQ29udGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1sQ29udGV4dCA9IGF3YWl0IG5hdmlnYXRvci5tbC5jcmVhdGVDb250ZXh0KCk7XG4gICAgICAgIHRoaXMubWxDb250ZXh0Q2FjaGUucHVzaCh7IG1sQ29udGV4dCB9KTtcbiAgICAgICAgcmV0dXJuIG1sQ29udGV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtbENvbnRleHRJbmRleCA9IHRoaXMubWxDb250ZXh0Q2FjaGUuZmluZEluZGV4KChlbnRyeSkgPT5cbiAgICAgIGNvbXBhcmVNTENvbnRleHRPcHRpb25zKGVudHJ5Lm9wdGlvbnMsIG9wdGlvbnNPckRldmljZSksXG4gICAgKTtcbiAgICBpZiAobWxDb250ZXh0SW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5tbENvbnRleHRDYWNoZVttbENvbnRleHRJbmRleF0ubWxDb250ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtbENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dChvcHRpb25zT3JEZXZpY2UpO1xuICAgICAgdGhpcy5tbENvbnRleHRDYWNoZS5wdXNoKHsgb3B0aW9uczogb3B0aW9uc09yRGV2aWNlLCBtbENvbnRleHQgfSk7XG4gICAgICByZXR1cm4gbWxDb250ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck1MQ29udGV4dChzZXNzaW9uSWQ6IG51bWJlciwgbWxDb250ZXh0OiBNTENvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLm1sQ29udGV4dEJ5U2Vzc2lvbklkLnNldChzZXNzaW9uSWQsIG1sQ29udGV4dCk7XG4gICAgbGV0IHNlc3Npb25JZHMgPSB0aGlzLnNlc3Npb25JZHNCeU1MQ29udGV4dC5nZXQobWxDb250ZXh0KTtcbiAgICBpZiAoIXNlc3Npb25JZHMpIHtcbiAgICAgIHNlc3Npb25JZHMgPSBuZXcgU2V0KCk7XG4gICAgICB0aGlzLnNlc3Npb25JZHNCeU1MQ29udGV4dC5zZXQobWxDb250ZXh0LCBzZXNzaW9uSWRzKTtcbiAgICB9XG4gICAgc2Vzc2lvbklkcy5hZGQoc2Vzc2lvbklkKTtcblxuICAgIGlmICghdGhpcy5tbE9wU3VwcG9ydExpbWl0c0J5U2Vzc2lvbklkLmhhcyhzZXNzaW9uSWQpKSB7XG4gICAgICB0aGlzLm1sT3BTdXBwb3J0TGltaXRzQnlTZXNzaW9uSWQuc2V0KHNlc3Npb25JZCwgbWxDb250ZXh0Lm9wU3VwcG9ydExpbWl0cygpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50ZW1wb3JhcnlHcmFwaElucHV0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlc3Npb25HcmFwaElucHV0cy5zZXQoc2Vzc2lvbklkLCB0aGlzLnRlbXBvcmFyeUdyYXBoSW5wdXRzKTtcbiAgICAgIHRoaXMudGVtcG9yYXJ5R3JhcGhJbnB1dHMgPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMudGVtcG9yYXJ5R3JhcGhPdXRwdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2Vzc2lvbkdyYXBoT3V0cHV0cy5zZXQoc2Vzc2lvbklkLCB0aGlzLnRlbXBvcmFyeUdyYXBoT3V0cHV0cyk7XG4gICAgICB0aGlzLnRlbXBvcmFyeUdyYXBoT3V0cHV0cyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXNzaW9uR3JhcGhJbnB1dHMuZGVsZXRlKHNlc3Npb25JZCk7XG4gICAgdGhpcy5zZXNzaW9uR3JhcGhPdXRwdXRzLmRlbGV0ZShzZXNzaW9uSWQpO1xuICAgIGNvbnN0IG1sQ29udGV4dCA9IHRoaXMubWxDb250ZXh0QnlTZXNzaW9uSWQuZ2V0KHNlc3Npb25JZCkhO1xuICAgIGlmICghbWxDb250ZXh0KSB7XG4gICAgICAvLyBDdXJyZW50IHNlc3Npb24gaXMgbm90IGEgV2ViTk4gc2Vzc2lvbi5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50ZW5zb3JNYW5hZ2VyLnJlbGVhc2VUZW5zb3JzRm9yU2Vzc2lvbihzZXNzaW9uSWQpO1xuICAgIHRoaXMubWxDb250ZXh0QnlTZXNzaW9uSWQuZGVsZXRlKHNlc3Npb25JZCk7XG4gICAgdGhpcy5tbE9wU3VwcG9ydExpbWl0c0J5U2Vzc2lvbklkLmRlbGV0ZShzZXNzaW9uSWQpO1xuICAgIGNvbnN0IHNlc3Npb25JZHMgPSB0aGlzLnNlc3Npb25JZHNCeU1MQ29udGV4dC5nZXQobWxDb250ZXh0KSE7XG4gICAgc2Vzc2lvbklkcy5kZWxldGUoc2Vzc2lvbklkKTtcbiAgICBpZiAoc2Vzc2lvbklkcy5zaXplID09PSAwKSB7XG4gICAgICB0aGlzLnNlc3Npb25JZHNCeU1MQ29udGV4dC5kZWxldGUobWxDb250ZXh0KTtcbiAgICAgIGNvbnN0IG1sQ29udGV4dEluZGV4ID0gdGhpcy5tbENvbnRleHRDYWNoZS5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5tbENvbnRleHQgPT09IG1sQ29udGV4dCk7XG4gICAgICBpZiAobWxDb250ZXh0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMubWxDb250ZXh0Q2FjaGUuc3BsaWNlKG1sQ29udGV4dEluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TUxDb250ZXh0KHNlc3Npb25JZDogbnVtYmVyKTogTUxDb250ZXh0IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5tbENvbnRleHRCeVNlc3Npb25JZC5nZXQoc2Vzc2lvbklkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNTE9wU3VwcG9ydExpbWl0cyhzZXNzaW9uSWQ6IG51bWJlcik6IE1MT3BTdXBwb3J0TGltaXRzIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5tbE9wU3VwcG9ydExpbWl0c0J5U2Vzc2lvbklkLmdldChzZXNzaW9uSWQpO1xuICB9XG5cbiAgcHVibGljIHJlc2VydmVUZW5zb3JJZCgpOiBUZW5zb3JJZCB7XG4gICAgcmV0dXJuIHRoaXMudGVuc29yTWFuYWdlci5yZXNlcnZlVGVuc29ySWQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWxlYXNlVGVuc29ySWQodGVuc29ySWQ6IFRlbnNvcklkKTogdm9pZCB7XG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gcmVsZWFzZVRlbnNvcklkIHt0ZW5zb3JJZDogJHt0ZW5zb3JJZH19YCk7XG4gICAgdGhpcy50ZW5zb3JNYW5hZ2VyLnJlbGVhc2VUZW5zb3JJZCh0ZW5zb3JJZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZW5zdXJlVGVuc29yKFxuICAgIHNlc3Npb25JZDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIHRlbnNvcklkOiBUZW5zb3JJZCxcbiAgICBvbm54RGF0YVR5cGU6IERhdGFUeXBlLFxuICAgIGRpbWVuc2lvbnM6IG51bWJlcltdLFxuICAgIGNvcHlPbGQ6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8TUxUZW5zb3I+IHtcbiAgICBjb25zdCB3ZWJubkRhdGFUeXBlID0gb25ueERhdGFUeXBlVG9XZWJubkRhdGFUeXBlLmdldChvbm54RGF0YVR5cGUpO1xuICAgIGlmICghd2Vibm5EYXRhVHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBPTk5YIGRhdGEgdHlwZTogJHtvbm54RGF0YVR5cGV9YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRlbnNvck1hbmFnZXIuZW5zdXJlVGVuc29yKFxuICAgICAgc2Vzc2lvbklkID8/IHRoaXMuY3VycmVudFNlc3Npb25JZCxcbiAgICAgIHRlbnNvcklkLFxuICAgICAgd2Vibm5EYXRhVHlwZSxcbiAgICAgIGRpbWVuc2lvbnMsXG4gICAgICBjb3B5T2xkLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3JlYXRlVGVtcG9yYXJ5VGVuc29yKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxuICAgIG9ubnhEYXRhVHlwZTogRGF0YVR5cGUsXG4gICAgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBQcm9taXNlPFRlbnNvcklkPiB7XG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gY3JlYXRlVGVtcG9yYXJ5VGVuc29yIHtvbm54RGF0YVR5cGU6ICR7b25ueERhdGFUeXBlfSwgc2hhcGU6ICR7c2hhcGV9fWApO1xuICAgIGNvbnN0IGRhdGFUeXBlID0gb25ueERhdGFUeXBlVG9XZWJubkRhdGFUeXBlLmdldChvbm54RGF0YVR5cGUpO1xuICAgIGlmICghZGF0YVR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT05OWCBkYXRhIHR5cGU6ICR7b25ueERhdGFUeXBlfWApO1xuICAgIH1cbiAgICBjb25zdCB0ZW5zb3JJZCA9IHRoaXMudGVuc29yTWFuYWdlci5yZXNlcnZlVGVuc29ySWQoKTtcbiAgICBhd2FpdCB0aGlzLnRlbnNvck1hbmFnZXIuZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgdGVuc29ySWQsIGRhdGFUeXBlLCBzaGFwZSwgZmFsc2UpO1xuICAgIGNvbnN0IHRlbnNvcklkcyA9IHRoaXMudGVtcG9yYXJ5U2Vzc2lvblRlbnNvcklkcy5nZXQoc2Vzc2lvbklkKTtcbiAgICBpZiAoIXRlbnNvcklkcykge1xuICAgICAgdGhpcy50ZW1wb3JhcnlTZXNzaW9uVGVuc29ySWRzLnNldChzZXNzaW9uSWQsIFt0ZW5zb3JJZF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW5zb3JJZHMucHVzaCh0ZW5zb3JJZCk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JJZDtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWRUZW5zb3IodGVuc29ySWQ6IFRlbnNvcklkLCBkYXRhOiBVaW50OEFycmF5KTogdm9pZCB7XG4gICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gICAgaWYgKCF3YXNtLnNob3VsZFRyYW5zZmVyVG9NTFRlbnNvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gdXBsb2FkIHRvIGEgTUxUZW5zb3Igd2hpbGUgc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yIGlzIGZhbHNlJyk7XG4gICAgfVxuICAgIExPR19ERUJVRygndmVyYm9zZScsICgpID0+IGBbV2ViTk5dIHVwbG9hZFRlbnNvciB7dGVuc29ySWQ6ICR7dGVuc29ySWR9LCBkYXRhOiAke2RhdGEuYnl0ZUxlbmd0aH19YCk7XG4gICAgdGhpcy50ZW5zb3JNYW5hZ2VyLnVwbG9hZCh0ZW5zb3JJZCwgZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWRUZW5zb3IodGVuc29ySWQ6IFRlbnNvcklkLCBkc3RCdWZmZXI6IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTx1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy50ZW5zb3JNYW5hZ2VyLmRvd25sb2FkKHRlbnNvcklkLCBkc3RCdWZmZXIpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZU1MVGVuc29yRG93bmxvYWRlcih0ZW5zb3JJZDogVGVuc29ySWQsIHR5cGU6IFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcyk6ICgpID0+IFByb21pc2U8VGVuc29yLkRhdGFUeXBlPiB7XG4gICAgcmV0dXJuIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnRlbnNvck1hbmFnZXIuZG93bmxvYWQodGVuc29ySWQpO1xuICAgICAgcmV0dXJuIGNyZWF0ZVZpZXcoZGF0YSwgdHlwZSk7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck1MVGVuc29yKHNlc3Npb25JZDogbnVtYmVyLCB0ZW5zb3I6IE1MVGVuc29yLCBvbm54RGF0YVR5cGU6IERhdGFUeXBlLCBkaW1lbnNpb25zOiBudW1iZXJbXSk6IFRlbnNvcklkIHtcbiAgICBjb25zdCB3ZWJubkRhdGFUeXBlID0gb25ueERhdGFUeXBlVG9XZWJubkRhdGFUeXBlLmdldChvbm54RGF0YVR5cGUpO1xuICAgIGlmICghd2Vibm5EYXRhVHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBPTk5YIGRhdGEgdHlwZTogJHtvbm54RGF0YVR5cGV9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB0aGlzLnRlbnNvck1hbmFnZXIucmVnaXN0ZXJUZW5zb3Ioc2Vzc2lvbklkLCB0ZW5zb3IsIHdlYm5uRGF0YVR5cGUsIGRpbWVuc2lvbnMpO1xuICAgIExPR19ERUJVRyhcbiAgICAgICd2ZXJib3NlJyxcbiAgICAgICgpID0+XG4gICAgICAgIGBbV2ViTk5dIHJlZ2lzdGVyTUxUZW5zb3Ige3RlbnNvcjogJHt0ZW5zb3J9LCBkYXRhVHlwZTogJHt3ZWJubkRhdGFUeXBlfSwgZGltZW5zaW9uczogJHtcbiAgICAgICAgICBkaW1lbnNpb25zXG4gICAgICAgIH19IC0+IHt0ZW5zb3JJZDogJHtpZH19YCxcbiAgICApO1xuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8vIFJlZ2lzdGVyIGEgV2ViTk4gQ29uc3RhbnQgb3BlcmFuZCBmcm9tIGV4dGVybmFsIGRhdGEuXG4gIHB1YmxpYyByZWdpc3Rlck1MQ29uc3RhbnQoXG4gICAgZXh0ZXJuYWxGaWxlUGF0aDogc3RyaW5nLFxuICAgIGRhdGFPZmZzZXQ6IG51bWJlcixcbiAgICBkYXRhTGVuZ3RoOiBudW1iZXIsXG4gICAgYnVpbGRlcjogTUxHcmFwaEJ1aWxkZXIsXG4gICAgZGVzYzogTUxPcGVyYW5kRGVzY3JpcHRvcixcbiAgICBtb3VudGVkRmlsZXM6IE1hcDxzdHJpbmcsIFVpbnQ4QXJyYXk+IHwgdW5kZWZpbmVkLFxuICAgIHNob3VsZENvbnZlcnRJbnQ2NFRvSW50MzIgPSBmYWxzZSxcbiAgKTogTUxPcGVyYW5kIHtcbiAgICAvLyBJZiBhdmFpbGFibGUsIFwiTW9kdWxlLk1vdW50ZWRGaWxlc1wiIGlzIGEgTWFwIGZvciBhbGwgcHJlbG9hZGVkIGZpbGVzLlxuICAgIGlmICghbW91bnRlZEZpbGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4dGVybmFsIG1vdW50ZWQgZmlsZXMgYXJlIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgfVxuXG4gICAgbGV0IGZpbGVQYXRoID0gZXh0ZXJuYWxGaWxlUGF0aDtcbiAgICBpZiAoZXh0ZXJuYWxGaWxlUGF0aC5zdGFydHNXaXRoKCcuLycpKSB7XG4gICAgICBmaWxlUGF0aCA9IGV4dGVybmFsRmlsZVBhdGguc3Vic3RyaW5nKDIpO1xuICAgIH1cbiAgICBjb25zdCBmaWxlRGF0YSA9IG1vdW50ZWRGaWxlcy5nZXQoZmlsZVBhdGgpO1xuICAgIGlmICghZmlsZURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSB3aXRoIG5hbWUgJHtmaWxlUGF0aH0gbm90IGZvdW5kIGluIHByZWxvYWRlZCBmaWxlcy5gKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YU9mZnNldCArIGRhdGFMZW5ndGggPiBmaWxlRGF0YS5ieXRlTGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dCBvZiBib3VuZHM6IGRhdGEgb2Zmc2V0IGFuZCBsZW5ndGggZXhjZWVkIHRoZSBleHRlcm5hbCBmaWxlIGRhdGEgc2l6ZS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBidWZmZXIgPSBmaWxlRGF0YS5zbGljZShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YUxlbmd0aCkuYnVmZmVyO1xuICAgIGxldCBidWZmZXJWaWV3OiBBcnJheUJ1ZmZlclZpZXc7XG4gICAgc3dpdGNoIChkZXNjLmRhdGFUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgYnVmZmVyVmlldyA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmbG9hdDE2JzpcbiAgICAgICAgYnVmZmVyVmlldyA9IHR5cGVvZiBGbG9hdDE2QXJyYXkgIT09ICd1bmRlZmluZWQnID8gbmV3IEZsb2F0MTZBcnJheShidWZmZXIpIDogbmV3IFVpbnQxNkFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW50MzInOlxuICAgICAgICBidWZmZXJWaWV3ID0gbmV3IEludDMyQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1aW50MzInOlxuICAgICAgICBidWZmZXJWaWV3ID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW50NjQnOlxuICAgICAgICBpZiAoc2hvdWxkQ29udmVydEludDY0VG9JbnQzMikge1xuICAgICAgICAgIC8vIEludDY0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgY3VycmVudCBjb250ZXh0LCB1c2UgaW50MzIgaW5zdGVhZC5cbiAgICAgICAgICBjb25zdCBpbnQzMkJ1ZmZlciA9IGNvbnZlcnREYXRhVG9JbnQzMihuZXcgVWludDhBcnJheShidWZmZXIpLCAnaW50NjQnKTtcbiAgICAgICAgICBidWZmZXJWaWV3ID0gbmV3IEludDMyQXJyYXkoaW50MzJCdWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICBkZXNjLmRhdGFUeXBlID0gJ2ludDMyJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWZmZXJWaWV3ID0gbmV3IEJpZ0ludDY0QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICAgIGJ1ZmZlclZpZXcgPSBuZXcgQmlnVWludDY0QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnQ4JzpcbiAgICAgICAgYnVmZmVyVmlldyA9IG5ldyBJbnQ4QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnQ0JzpcbiAgICAgIGNhc2UgJ3VpbnQ0JzpcbiAgICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgICAgYnVmZmVyVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7ZGVzYy5kYXRhVHlwZX0gaW4gY3JlYXRpbmcgV2ViTk4gQ29uc3RhbnQgZnJvbSBleHRlcm5hbCBkYXRhLmApO1xuICAgIH1cblxuICAgIExPR19ERUJVRyhcbiAgICAgICd2ZXJib3NlJyxcbiAgICAgICgpID0+XG4gICAgICAgIGBbV2ViTk5dIHJlZ2lzdGVyTUxDb25zdGFudCB7ZGF0YVR5cGU6ICR7ZGVzYy5kYXRhVHlwZX0sIHNoYXBlOiAke2Rlc2Muc2hhcGV9fX0gJHtcbiAgICAgICAgICBzaG91bGRDb252ZXJ0SW50NjRUb0ludDMyID8gJyhOb3RlOiBpdCB3YXMgaW50NjQgZGF0YSB0eXBlIGFuZCByZWdpc3RlcmVkIHRvIGludDMyIGFzIHdvcmthcm91bmQpJyA6ICcnXG4gICAgICAgIH1gLFxuICAgICk7XG5cbiAgICByZXR1cm4gYnVpbGRlci5jb25zdGFudChkZXNjLCBidWZmZXJWaWV3KTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckdyYXBoSW5wdXQoaW5wdXROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRlbXBvcmFyeUdyYXBoSW5wdXRzLnB1c2goaW5wdXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckdyYXBoT3V0cHV0KG91dHB1dE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGVtcG9yYXJ5R3JhcGhPdXRwdXRzLnB1c2gob3V0cHV0TmFtZSk7XG4gIH1cblxuICBwdWJsaWMgaXNHcmFwaElucHV0KHNlc3Npb25JZDogbnVtYmVyLCBpbnB1dE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlucHV0TmFtZXMgPSB0aGlzLnNlc3Npb25HcmFwaElucHV0cy5nZXQoc2Vzc2lvbklkKTtcbiAgICBpZiAoIWlucHV0TmFtZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0TmFtZXMuaW5jbHVkZXMoaW5wdXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0dyYXBoT3V0cHV0KHNlc3Npb25JZDogbnVtYmVyLCBvdXRwdXROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBvdXRwdXROYW1lcyA9IHRoaXMuc2Vzc2lvbkdyYXBoT3V0cHV0cy5nZXQoc2Vzc2lvbklkKTtcbiAgICBpZiAoIW91dHB1dE5hbWVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXROYW1lcy5pbmNsdWRlcyhvdXRwdXROYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkKHNlc3Npb25JZDogbnVtYmVyLCB0eXBlOiBUZW5zb3IuVHlwZSwgaXNJbnB1dCA9IHRydWUpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRhVHlwZSA9IG9ubnhEYXRhVHlwZVRvV2Vibm5EYXRhVHlwZS5nZXQodGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0odHlwZSkpO1xuICAgIGNvbnN0IG9wTGltaXRzID0gdGhpcy5tbE9wU3VwcG9ydExpbWl0c0J5U2Vzc2lvbklkLmdldChzZXNzaW9uSWQpO1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhVHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNJbnB1dCkge1xuICAgICAgcmV0dXJuICEhb3BMaW1pdHM/LmlucHV0LmRhdGFUeXBlcy5pbmNsdWRlcyhkYXRhVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhIW9wTGltaXRzPy5vdXRwdXQuZGF0YVR5cGVzLmluY2x1ZGVzKGRhdGFUeXBlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZmx1c2goKTogdm9pZCB7XG4gICAgLy8gVW5saWtlIHRoZSBXZWJHUFUgYmFja2VuZCwgdGhlIFdlYk5OIGJhY2tlbmQgZG9lcyBub3QgbmVlZCB0byBmbHVzaCBhbnkgcGVuZGluZyBvcGVyYXRpb25zLlxuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFdlYk5OIEFQSSBjdXJyZW50bHkgZG9lcyBub3QgaGF2ZSBhIFR5cGVTY3JpcHQgZGVmaW5pdGlvbiBmaWxlLiBUaGlzIGZpbGUgaXMgYSB3b3JrYXJvdW5kIHdpdGggdHlwZXMgZ2VuZXJhdGVkIGZyb21cbi8vIFdlYk5OIEFQSSBzcGVjaWZpY2F0aW9uLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYm1hY2hpbmVsZWFybmluZy93ZWJubi9pc3N1ZXMvNjc3XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianNlcC93ZWJubi93ZWJubi5kLnRzXCIgLz5cblxuaW1wb3J0IHsgRW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3IsIFRSQUNFX0VWRU5UX0JFR0lOLCBUUkFDRV9FVkVOVF9FTkQgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1xuICBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcbiAgVGVuc29yTWV0YWRhdGEsXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHsgc2V0UnVuT3B0aW9ucyB9IGZyb20gJy4vcnVuLW9wdGlvbnMnO1xuaW1wb3J0IHsgc2V0U2Vzc2lvbk9wdGlvbnMgfSBmcm9tICcuL3Nlc3Npb24tb3B0aW9ucyc7XG5pbXBvcnQge1xuICBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyxcbiAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtLFxuICBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsXG4gIGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlLFxuICBsb2dMZXZlbFN0cmluZ1RvRW51bSxcbiAgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsXG4gIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtLFxuICB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IsXG59IGZyb20gJy4vd2FzbS1jb21tb24nO1xuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcbmltcG9ydCB7IGxvYWRGaWxlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWxvYWQtZmlsZSc7XG5cbi8vICNyZWdpb24gSW5pdGlhbGl6YXRpb25zXG5cbi8qKlxuICogVGhlcmUgYXJlIDQgZGlmZmVyZW50IFwiaW5pdGlhbGl6YXRpb25cIiBzdGVwcyBmb3IgT1JULiBUaGV5IGhhcHBlbiBpbiBkaWZmZXJlbnQgcGxhY2VzIGFuZCBkaWZmZXJlbnQgdGltZS5cbiAqXG4gKiAxLiBKYXZhU2NyaXB0IGluaXRpYWxpemF0aW9uIGZvciBvbm54cnVudGltZS1jb21tb24gYW5kIG9ubnhydW50aW1lLXdlYi5cbiAqICAgIFRoaXMgaXMgdGhlIGZpcnN0IGluaXRpYWxpemF0aW9uIHN0ZXAuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGNhbGxzIG9ubnhydW50aW1lLWNvbW1vbidzIHJlZ2lzdGVyQmFja2VuZCgpXG4gKiBmdW5jdGlvbiBtdWx0aXBsZSB0aW1lcyB0byByZWdpc3RlciBhbGwgdGhlIGF2YWlsYWJsZSBiYWNrZW5kcy4gVGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uIGlzIHZlcnkgZmFzdC4gSXQgb25seVxuICogcmVnaXN0ZXJzIHRoZSBiYWNrZW5kIG5hbWUgd2l0aCB0aGUgdW5pbml0aWFsaXplZCBiYWNrZW5kIG9iamVjdC4gTm8gaGVhdnkgaW5pdGlhbGl6YXRpb24gaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXG4gKiAgICBSZWZlciB0byB3ZWIvbGliL2luZGV4LnRzIGZvciB0aGUgYmFja2VuZCByZWdpc3RyYXRpb24uXG4gKlxuICogMi4gV2ViQXNzZW1ibHkgYXJ0aWZhY3QgaW5pdGlhbGl6YXRpb24uXG4gKiAgICBUaGlzIGhhcHBlbnMgd2hlbiBhbnkgcmVnaXN0ZXJlZCB3YXNtIGJhY2tlbmQgaXMgdXNlZCBmb3IgdGhlIGZpcnN0IHRpbWUgKGllLiBgb3J0LkluZmVyZW5jZVNlc3Npb24uY3JlYXRlKClgIGlzXG4gKiBjYWxsZWQpLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxuICogICAgIC0gY3JlYXRlIGEgcHJveHkgd29ya2VyIGFuZCBtYWtlIHN1cmUgdGhlIHByb3h5IHdvcmtlciBpcyByZWFkeSB0byByZWNlaXZlIG1lc3NhZ2VzLCBpZiBwcm94eSBpcyBlbmFibGVkLlxuICogICAgIC0gcGVyZm9ybSBmZWF0dXJlIGRldGVjdGlvbiwgbG9jYXRlIGNvcnJlY3QgV2ViQXNzZW1ibHkgYXJ0aWZhY3QgcGF0aCBhbmQgY2FsbCB0aGUgRW1zY3JpcHRlbiBnZW5lcmF0ZWRcbiAqIEphdmFTY3JpcHQgY29kZSB0byBpbml0aWFsaXplIHRoZSBXZWJBc3NlbWJseSBydW50aW1lLlxuICogICAgICAgICAtIGlmIHByb3h5IGlzIGVuYWJsZWQsIHRoaXMgc3RlcCBoYXBwZW5zIGluIHRoZSBwcm94eSB3b3JrZXIgdXNpbmcgbWVzc2FnZSAnaW5pdC13YXNtJy5cbiAqICAgICAgICAgLSBkb3dubG9hZGluZyB0aGUgJ29ydC13YXNtey4uLn0ud2FzbScgZmlsZSBpcyBkb25lIGluIHRoaXMgc3RlcC5cbiAqICAgICAgICAgLSBpZiBtdWx0aS10aHJlYWQgaXMgZW5hYmxlZCwgb25lIG9yIG1vcmUgd2Vid29ya2VyIHdpbGwgYmUgY3JlYXRlZCB0byBpbml0aWFsaXplIHRoZSBQVGhyZWFkIHRocmVhZHBvb2wuXG4gKlxuICogMy4gT1JUIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIGFmdGVyIHN0ZXAgMi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgcGVyZm9ybXMgT05OWCBSdW50aW1lIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxuICogRnVuY3Rpb24gYF9PcnRJbml0KClgIGlzIGNhbGxlZCBpbiB0aGlzIHN0ZXAuXG4gKiAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtb3J0Jy5cbiAqICAgICAtIGxvZ2dpbmcgbGV2ZWwgKG9ydC5lbnYubG9nTGV2ZWwpIGFuZCB0aHJlYWQgbnVtYmVyIChvcnQuZW52Lndhc20ubnVtVGhyZWFkcykgYXJlIHNldCBpbiB0aGlzIHN0ZXAuXG4gKlxuICogNC4gU2Vzc2lvbiBpbml0aWFsaXphdGlvbi5cbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDMgc3RlcHMgKHRoZXkgb25seSBjYWxsZWQgb25jZSksXG4gKiB0aGlzIHN0ZXAgd2lsbCBiZSBkb25lIGZvciBlYWNoIHNlc3Npb24uIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlIGZvbGxvd2luZ3M6XG4gKiAgICBJZiB0aGUgcGFyYW1ldGVyIGlzIGEgVVJMOlxuICogICAgLSBkb3dubG9hZCB0aGUgbW9kZWwgZGF0YSBmcm9tIHRoZSBVUkwuXG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcbiAqICAgIC0gZGVyZWZlcmVuY2UgdGhlIG1vZGVsIGJ1ZmZlci4gVGhpcyBzdGVwIGFsbG93cyB0aGUgb3JpZ2luYWwgQXJyYXlCdWZmZXIgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcbiAqXG4gKiAgICBJZiB0aGUgcGFyYW1ldGVyIGlzIGEgVWludDhBcnJheSBvYmplY3Q6XG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcbiAqICAgIC0gY2FsbCBgX09ydENyZWF0ZVNlc3Npb24oKWAgdG8gY3JlYXRlIHRoZSBzZXNzaW9uLiAocHJveHk6ICdjcmVhdGUnKVxuICpcbiAqXG4gKi9cblxuLyoqXG4gKiBpbml0aWFsaXplIE9SVCBlbnZpcm9ubWVudC5cbiAqXG4gKiBAcGFyYW0gbnVtVGhyZWFkcyBTZXRHbG9iYWxJbnRyYU9wTnVtVGhyZWFkcyhudW1UaHJlYWRzKVxuICogQHBhcmFtIGxvZ2dpbmdMZXZlbCBDcmVhdGVFbnYoc3RhdGljX2Nhc3Q8T3J0TG9nZ2luZ0xldmVsPihsb2dnaW5nX2xldmVsKSlcbiAqL1xuY29uc3QgaW5pdE9ydCA9IChudW1UaHJlYWRzOiBudW1iZXIsIGxvZ2dpbmdMZXZlbDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IGVycm9yQ29kZSA9IGdldEluc3RhbmNlKCkuX09ydEluaXQobnVtVGhyZWFkcywgbG9nZ2luZ0xldmVsKTtcbiAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBvbm54cnVudGltZS5cIik7XG4gIH1cbn07XG5cbi8qKlxuICogaW5pdGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jIChlbnY6IEVudik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAvLyBpbml0IE9SVFxuICBpbml0T3J0KGVudi53YXNtLm51bVRocmVhZHMhLCBsb2dMZXZlbFN0cmluZ1RvRW51bShlbnYubG9nTGV2ZWwpKTtcbn07XG5cbi8qKlxuICogcGVyZm9ybSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvbi5cbiAqXG4gKiBAcGFyYW0gZW52XG4gKiBAcGFyYW0gZXBOYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0RXAgPSBhc3luYyAoZW52OiBFbnYsIGVwTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXRpYWxpemUgQVNZTkNJRlkgc3VwcG9ydFxuICBnZXRJbnN0YW5jZSgpLmFzeW5jSW5pdD8uKCk7XG5cbiAgLy8gcGVyZm9ybSBXZWJHUFUgYXZhaWxhYmlsaXR5IGNoZWNrICggZWl0aGVyIEpTRVAgb3IgV2ViR1BVIEVQIClcbiAgbGV0IHdlYmdwdUFkYXB0ZXI6IEdQVUFkYXB0ZXIgfCBudWxsID0gZW52LndlYmdwdS5hZGFwdGVyO1xuICBpZiAoZXBOYW1lID09PSAnd2ViZ3B1Jykge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHUFUgaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgfVxuICAgIGlmICghd2ViZ3B1QWRhcHRlcikge1xuICAgICAgLy8gaWYgYWRhcHRlciBpcyBub3Qgc2V0LCByZXF1ZXN0IGEgbmV3IGFkYXB0ZXIuXG4gICAgICBjb25zdCBwb3dlclByZWZlcmVuY2UgPSBlbnYud2ViZ3B1LnBvd2VyUHJlZmVyZW5jZTtcbiAgICAgIGlmIChwb3dlclByZWZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiBwb3dlclByZWZlcmVuY2UgIT09ICdsb3ctcG93ZXInICYmIHBvd2VyUHJlZmVyZW5jZSAhPT0gJ2hpZ2gtcGVyZm9ybWFuY2UnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3dlclByZWZlcmVuY2Ugc2V0dGluZzogXCIke3Bvd2VyUHJlZmVyZW5jZX1cImApO1xuICAgICAgfVxuICAgICAgY29uc3QgZm9yY2VGYWxsYmFja0FkYXB0ZXIgPSBlbnYud2ViZ3B1LmZvcmNlRmFsbGJhY2tBZGFwdGVyO1xuICAgICAgaWYgKGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZvcmNlRmFsbGJhY2tBZGFwdGVyIHNldHRpbmc6IFwiJHtmb3JjZUZhbGxiYWNrQWRhcHRlcn1cImApO1xuICAgICAgfVxuICAgICAgd2ViZ3B1QWRhcHRlciA9IGF3YWl0IG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoeyBwb3dlclByZWZlcmVuY2UsIGZvcmNlRmFsbGJhY2tBZGFwdGVyIH0pO1xuICAgICAgaWYgKCF3ZWJncHVBZGFwdGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnRmFpbGVkIHRvIGdldCBHUFUgYWRhcHRlci4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBuZWVkIHRvIGVuYWJsZSBmbGFnIFwiLS1lbmFibGUtdW5zYWZlLXdlYmdwdVwiIGlmIHlvdSBhcmUgdXNpbmcgQ2hyb21lLicsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGFkYXB0ZXIgaXMgc2V0LCB2YWxpZGF0ZSBpdC5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHdlYmdwdUFkYXB0ZXIubGltaXRzICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5mZWF0dXJlcyAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgdHlwZW9mIHdlYmdwdUFkYXB0ZXIucmVxdWVzdERldmljZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgYWRhcHRlciBzZXQgaW4gYGVudi53ZWJncHUuYWRhcHRlcmAuIEl0IG11c3QgYmUgYSBHUFVBZGFwdGVyIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBwZXJmb3JtIFdlYk5OIGF2YWlsYWJpbGl0eSBjaGVjayAoIGVpdGhlciBKU0VQIG9yIFdlYk5OIEVQIClcbiAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhKG5hdmlnYXRvciBhcyB1bmtub3duIGFzIHsgbWw6IHVua25vd24gfSkubWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTk4gaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XG5cbiAgICBpZiAoZXBOYW1lID09PSAnd2ViZ3B1Jykge1xuICAgICAgYXdhaXQgaW5pdEpzZXAoJ3dlYmdwdScsIGdldEluc3RhbmNlKCksIGVudiwgd2ViZ3B1QWRhcHRlcik7XG4gICAgfVxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJubicpIHtcbiAgICAgIGF3YWl0IGluaXRKc2VwKCd3ZWJubicsIGdldEluc3RhbmNlKCksIGVudik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiBlcE5hbWUgPT09ICd3ZWJncHUnKSB7XG4gICAgICBnZXRJbnN0YW5jZSgpLndlYmdwdUluaXQhKChkZXZpY2UpID0+IHtcbiAgICAgICAgZW52LndlYmdwdS5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4gJiYgZXBOYW1lID09PSAnd2Vibm4nKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICAgICAgY29uc3QgYmFja2VuZCA9IG5ldyAocmVxdWlyZSgnLi9qc2VwL2JhY2tlbmQtd2Vibm4nKS5XZWJOTkJhY2tlbmQpKGVudik7XG4gICAgICBnZXRJbnN0YW5jZSgpLndlYm5uSW5pdCEoW1xuICAgICAgICBiYWNrZW5kLFxuICAgICAgICAvLyB3ZWJublJlc2VydmVUZW5zb3JJZFxuICAgICAgICAoKSA9PiBiYWNrZW5kLnJlc2VydmVUZW5zb3JJZCgpLFxuICAgICAgICAvLyB3ZWJublJlbGVhc2VUZW5zb3JJZCxcbiAgICAgICAgKHRlbnNvcklkOiBudW1iZXIpID0+IGJhY2tlbmQucmVsZWFzZVRlbnNvcklkKHRlbnNvcklkKSxcbiAgICAgICAgLy8gd2Vibm5FbnN1cmVUZW5zb3JcbiAgICAgICAgYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyIHwgdW5kZWZpbmVkLCB0ZW5zb3JJZDogbnVtYmVyLCBvbm54RGF0YVR5cGU6IG51bWJlciwgc2hhcGU6IG51bWJlcltdLCBjb3B5T2xkKSA9PlxuICAgICAgICAgIGJhY2tlbmQuZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgdGVuc29ySWQsIG9ubnhEYXRhVHlwZSwgc2hhcGUsIGNvcHlPbGQpLFxuICAgICAgICAvLyB3ZWJublVwbG9hZFRlbnNvclxuICAgICAgICAodGVuc29ySWQ6IG51bWJlciwgZGF0YTogVWludDhBcnJheSkgPT4ge1xuICAgICAgICAgIGJhY2tlbmQudXBsb2FkVGVuc29yKHRlbnNvcklkLCBkYXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2Vibm5Eb3dubG9hZFRlbnNvclxuICAgICAgICBhc3luYyAodGVuc29ySWQ6IG51bWJlciwgZHN0QnVmZmVyOiBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlcikgPT5cbiAgICAgICAgICBiYWNrZW5kLmRvd25sb2FkVGVuc29yKHRlbnNvcklkLCBkc3RCdWZmZXIpLFxuICAgICAgICAvLyB3ZWJublJlZ2lzdGVyTUxDb250ZXh0XG4gICAgICAgIChzZXNzaW9uSWQ6IG51bWJlciwgbWxDb250ZXh0OiBNTENvbnRleHQpID0+IGJhY2tlbmQucmVnaXN0ZXJNTENvbnRleHQoc2Vzc2lvbklkLCBtbENvbnRleHQpLFxuICAgICAgICAvLyB3ZWJubkVuYWJsZVRyYWNlRXZlbnRcbiAgICAgICAgISFlbnYudHJhY2UsXG4gICAgICBdKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vICNlbmRyZWdpb24gSW5pdGlhbGl6YXRpb25zXG5cbi8qKlxuICogdmFsaWQgZGF0YSBsb2NhdGlvbnMgZm9yIGlucHV0L291dHB1dCB0ZW5zb3JzLlxuICovXG50eXBlIFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0ID1cbiAgfCAnY3B1J1xuICB8ICdjcHUtcGlubmVkJ1xuICB8ICdncHUtYnVmZmVyJ1xuICB8ICdtbC10ZW5zb3InXG4gIC8vIFVzZSAnbWwtdGVuc29yJyBkdXJpbmcgaW5mZXJlbmNlLCBidXQgb3V0cHV0IGEgdGVuc29yIGxvY2F0ZWQgb24gdGhlIENQVS5cbiAgfCAnbWwtdGVuc29yLWNwdS1vdXRwdXQnO1xuXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xuICAvKipcbiAgICogdGhlIGhhbmRsZSBvZiBJTyBiaW5kaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICpcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJywgJ21sLXRlbnNvcicuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IHJlYWRvbmx5IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W107XG5cbiAgLyoqXG4gICAqIGVudW0gdmFsdWUgb2YgdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogcmVhZG9ubHkgbnVtYmVyW107XG59O1xuXG4vKipcbiAqICB0dXBsZSBlbGVtZW50cyBhcmU6IEluZmVyZW5jZVNlc3Npb24gSUQ7IGlucHV0TmFtZXNVVEY4RW5jb2RlZDsgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDsgYmluZGluZ1N0YXRlXG4gKi9cbnR5cGUgU2Vzc2lvbk1ldGFkYXRhID0gW1xuICBpbmZlcmVuY2VTZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5wdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXG4gIGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGUgfCBudWxsLFxuICBlbmFibGVHcmFwaENhcHR1cmU6IGJvb2xlYW4sXG4gIGlucHV0T3V0cHV0Qm91bmQ6IGJvb2xlYW4sXG5dO1xuXG5jb25zdCBhY3RpdmVTZXNzaW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBTZXNzaW9uTWV0YWRhdGE+KCk7XG5cbi8qKlxuICogZ2V0IHRoZSBpbnB1dC9vdXRwdXQgY291bnQgb2YgdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0gc2Vzc2lvbkhhbmRsZSB0aGUgaGFuZGxlIHJlcHJlc2VudGluZyB0aGUgc2Vzc2lvbi4gc2hvdWxkIGJlIG5vbi16ZXJvLlxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXG4gKi9cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dENvdW50ID0gKHNlc3Npb25IYW5kbGU6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIHB0clNpemUpO1xuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LlwiKTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnO1xuICAgIHJldHVybiBbTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCwgdHlwZSkpLCBOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgdHlwZSkpXTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dE1ldGFkYXRhID0gKFxuICBzZXNzaW9uSGFuZGxlOiBudW1iZXIsXG4gIGluZGV4OiBudW1iZXIsXG4pOiBbbmFtZU9mZnNldDogbnVtYmVyLCBlbGVtZW50VHlwZTogbnVtYmVyLCBkaW1zPzogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICBsZXQgbWV0YWRhdGFPZmZzZXQgPSAwO1xuICB0cnkge1xuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaW5kZXgsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBwdHJTaXplKTtcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBzZXNzaW9uIGlucHV0L291dHB1dCBtZXRhZGF0YS5cIik7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0LCAnKicpKTtcbiAgICBtZXRhZGF0YU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyBwdHJTaXplLCAnKicpKTtcbiAgICAvLyBnZXQgZWxlbWVudCB0eXBlXG4gICAgY29uc3QgZWxlbWVudFR5cGUgPSB3YXNtLkhFQVAzMlttZXRhZGF0YU9mZnNldCAvIDRdO1xuICAgIGlmIChlbGVtZW50VHlwZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtuYW1lT2Zmc2V0LCAwXTsgLy8gbm9uLXRlbnNvclxuICAgIH1cblxuICAgIC8vIGdldCBkaW1zIGNvdW50XG4gICAgY29uc3QgZGltc0NvdW50ID0gd2FzbS5IRUFQVTMyW21ldGFkYXRhT2Zmc2V0IC8gNCArIDFdO1xuICAgIC8vIGdldCBkaW1zXG4gICAgY29uc3QgZGltczogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0NvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHN5bWJvbGljRGltTmFtZU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKG1ldGFkYXRhT2Zmc2V0ICsgOCArIGkgKiBwdHJTaXplLCAnKicpKTtcbiAgICAgIGRpbXMucHVzaChcbiAgICAgICAgc3ltYm9saWNEaW1OYW1lT2Zmc2V0ICE9PSAwXG4gICAgICAgICAgPyB3YXNtLlVURjhUb1N0cmluZyhzeW1ib2xpY0RpbU5hbWVPZmZzZXQpXG4gICAgICAgICAgOiBOdW1iZXIod2FzbS5nZXRWYWx1ZShtZXRhZGF0YU9mZnNldCArIDggKyAoaSArIGRpbXNDb3VudCkgKiBwdHJTaXplLCAnKicpKSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBbbmFtZU9mZnNldCwgZWxlbWVudFR5cGUsIGRpbXNdO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgICBpZiAobWV0YWRhdGFPZmZzZXQgIT09IDApIHtcbiAgICAgIHdhc20uX09ydEZyZWUobWV0YWRhdGFPZmZzZXQpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBhbGxvY2F0ZSB0aGUgbWVtb3J5IGFuZCBtZW1jcHkgdGhlIGV4dGVybmFsIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWwgLSB0aGUgZXh0ZXJuYWwgYnVmZmVyIGNvbnRhaW5pbmcgdGhlIG1vZGVsIGRhdGEuIE11c3Qgbm90IGJlIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSAobW9kZWw6IFVpbnQ4QXJyYXkpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IG1vZGVsRGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhtb2RlbC5ieXRlTGVuZ3RoKTtcbiAgaWYgKG1vZGVsRGF0YU9mZnNldCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi4gZmFpbGVkIHRvIGFsbG9jYXRlIGEgYnVmZmVyIG9mIHNpemUgJHttb2RlbC5ieXRlTGVuZ3RofS5gKTtcbiAgfVxuICB3YXNtLkhFQVBVOC5zZXQobW9kZWwsIG1vZGVsRGF0YU9mZnNldCk7XG4gIHJldHVybiBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbC5ieXRlTGVuZ3RoXTtcbn07XG5cbi8qKlxuICogY3JlYXRlIGFuIGluZmVyZW5jZSBzZXNzaW9uIGZyb20gYSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWxEYXRhIC0gZWl0aGVyIGEgVWludDhBcnJheSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RlbCBkYXRhLCBvciBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGVcbiAqICAgICBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqIEBwYXJhbSBvcHRpb25zIGFuIG9wdGlvbmFsIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIDMtZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyBbc2Vzc2lvbiBoYW5kbGUsIGlucHV0IG5hbWVzLCBvdXRwdXQgbmFtZXNdXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMgKFxuICBtb2RlbERhdGE6IFVpbnQ4QXJyYXkgfCBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4pOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICBsZXQgbW9kZWxEYXRhT2Zmc2V0OiBudW1iZXIsIG1vZGVsRGF0YUxlbmd0aDogbnVtYmVyO1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbERhdGEpKSB7XG4gICAgLy8gaWYgbW9kZWwgZGF0YSBpcyBhbiBhcnJheSwgaXQgbXVzdCBiZSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YVxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBtb2RlbERhdGE7XG4gIH0gZWxzZSBpZiAobW9kZWxEYXRhLmJ1ZmZlciA9PT0gd2FzbS5IRUFQVTguYnVmZmVyKSB7XG4gICAgLy8gaWYgbW9kZWwgZGF0YSB1c2VzIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgaXQuXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IFttb2RlbERhdGEuYnl0ZU9mZnNldCwgbW9kZWxEYXRhLmJ5dGVMZW5ndGhdO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwgY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLlxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKG1vZGVsRGF0YSk7XG4gIH1cblxuICBsZXQgc2Vzc2lvbkhhbmRsZSA9IDA7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xuICBsZXQgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuXG4gIHRyeSB7XG4gICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gYXdhaXQgc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0ZXJuYWxEYXRhICYmIHdhc20ubW91bnRFeHRlcm5hbERhdGEpIHtcbiAgICAgIGNvbnN0IGxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIG9wdGlvbnMuZXh0ZXJuYWxEYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5wYXRoO1xuICAgICAgICBsb2FkaW5nUHJvbWlzZXMucHVzaChcbiAgICAgICAgICBsb2FkRmlsZSh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5kYXRhKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKHBhdGgsIGRhdGEpO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyB3YWl0IGZvciBhbGwgZXh0ZXJuYWwgZGF0YSBmaWxlcyB0byBiZSBsb2FkZWRcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGxvYWRpbmdQcm9taXNlcyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm92aWRlciBvZiBvcHRpb25zPy5leGVjdXRpb25Qcm92aWRlcnMgPz8gW10pIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHR5cGVvZiBwcm92aWRlciA9PT0gJ3N0cmluZycgPyBwcm92aWRlciA6IHByb3ZpZGVyLm5hbWU7XG4gICAgICBpZiAocHJvdmlkZXJOYW1lID09PSAnd2Vibm4nKSB7XG4gICAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvdmlkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gcHJvdmlkZXIgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZ3B1RGV2aWNlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OT3B0aW9uc1dlYkdwdSk/LmdwdURldmljZTtcbiAgICAgICAgICBjb25zdCBkZXZpY2VUeXBlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5kZXZpY2VUeXBlO1xuICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gY29udGV4dCBhcyBNTENvbnRleHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChncHVEZXZpY2UpIHtcbiAgICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0IShncHVEZXZpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gYXdhaXQgd2FzbS53ZWJubkNyZWF0ZU1MQ29udGV4dCEoeyBkZXZpY2VUeXBlLCBwb3dlclByZWZlcmVuY2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0ISgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlc3Npb25IYW5kbGUgPSBhd2FpdCB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgd2FzbS53ZWJncHVPbkNyZWF0ZVNlc3Npb24/LihzZXNzaW9uSGFuZGxlKTtcbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLlwiKTtcbiAgICB9XG5cbiAgICB3YXNtLmpzZXBPbkNyZWF0ZVNlc3Npb24/LigpO1xuXG4gICAgLy8gY2xlYXIgY3VycmVudCBNTENvbnRleHQgYWZ0ZXIgc2Vzc2lvbiBjcmVhdGlvblxuICAgIGlmICh3YXNtLmN1cnJlbnRDb250ZXh0KSB7XG4gICAgICB3YXNtLndlYm5uUmVnaXN0ZXJNTENvbnRleHQhKHNlc3Npb25IYW5kbGUsIHdhc20uY3VycmVudENvbnRleHQpO1xuICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICBjb25zdCBlbmFibGVHcmFwaENhcHR1cmUgPSAhIW9wdGlvbnM/LmVuYWJsZUdyYXBoQ2FwdHVyZTtcblxuICAgIGNvbnN0IGlucHV0TmFtZXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXROYW1lcyA9IFtdO1xuICAgIGNvbnN0IGlucHV0TWV0YWRhdGE6IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdID0gW107XG4gICAgY29uc3Qgb3V0cHV0TWV0YWRhdGE6IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdID0gW107XG4gICAgY29uc3Qgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgc2hhcGVdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICBpZiAobmFtZU9mZnNldCA9PT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBpbnB1dCBuYW1lLlwiKTtcbiAgICAgIH1cbiAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWVPZmZzZXQpO1xuICAgICAgY29uc3QgbmFtZSA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWVPZmZzZXQpO1xuICAgICAgaW5wdXROYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgaW5wdXRNZXRhZGF0YS5wdXNoKFxuICAgICAgICBlbGVtZW50VHlwZSA9PT0gMFxuICAgICAgICAgID8geyBuYW1lLCBpc1RlbnNvcjogZmFsc2UgfVxuICAgICAgICAgIDogeyBuYW1lLCBpc1RlbnNvcjogdHJ1ZSwgdHlwZTogdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcoZWxlbWVudFR5cGUpLCBzaGFwZTogc2hhcGUhIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgc2hhcGVdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaSArIGlucHV0Q291bnQpO1xuICAgICAgaWYgKG5hbWVPZmZzZXQgPT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgYW4gb3V0cHV0IG5hbWUuXCIpO1xuICAgICAgfVxuICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWVPZmZzZXQpO1xuICAgICAgY29uc3QgbmFtZVN0cmluZyA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWVPZmZzZXQpO1xuICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcbiAgICAgIG91dHB1dE1ldGFkYXRhLnB1c2goXG4gICAgICAgIGVsZW1lbnRUeXBlID09PSAwXG4gICAgICAgICAgPyB7IG5hbWU6IG5hbWVTdHJpbmcsIGlzVGVuc29yOiBmYWxzZSB9XG4gICAgICAgICAgOiB7IG5hbWU6IG5hbWVTdHJpbmcsIGlzVGVuc29yOiB0cnVlLCB0eXBlOiB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhlbGVtZW50VHlwZSksIHNoYXBlOiBzaGFwZSEgfSxcbiAgICAgICk7XG5cbiAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2goJ2dwdS1idWZmZXInKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9XG4gICAgICAgICAgdHlwZW9mIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBvcHRpb25zLnByZWZlcnJlZE91dHB1dExvY2F0aW9uXG4gICAgICAgICAgICA6IChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnKTtcbiAgICAgICAgY29uc3QgaXNHcmFwaE91dHB1dCA9IHdhc20ud2Vibm5Jc0dyYXBoT3V0cHV0O1xuICAgICAgICBpZiAobG9jYXRpb24gPT09ICdjcHUnICYmIGlzR3JhcGhPdXRwdXQgJiYgaXNHcmFwaE91dHB1dChzZXNzaW9uSGFuZGxlLCBuYW1lU3RyaW5nKSkge1xuICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKCdtbC10ZW5zb3ItY3B1LW91dHB1dCcpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInICYmIGxvY2F0aW9uICE9PSAnbWwtdGVuc29yJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS4gT25seSAnZ3B1LWJ1ZmZlcicgbG9jYXRpb24gaXMgc3VwcG9ydGVkIHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZXJyZWQgdG8gYmUgb24gR1BVLlxuICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkgJiZcbiAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5zb21lKChsKSA9PiBsID09PSAnZ3B1LWJ1ZmZlcicgfHwgbCA9PT0gJ21sLXRlbnNvcicgfHwgbCA9PT0gJ21sLXRlbnNvci1jcHUtb3V0cHV0JylcbiAgICApIHtcbiAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIElPIGJpbmRpbmcuXCIpO1xuICAgICAgfVxuXG4gICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc1xuICAgICAgICAgIC8vICdtbC10ZW5zb3ItY3B1LW91dHB1dCcgaXMgdHJlYXRlZCBhcyAnbWwtdGVuc29yJyBmb3IgdGhlIHB1cnBvc2Ugb2YgSU8gYmluZGluZy5cbiAgICAgICAgICAubWFwKChsKSA9PiAobCA9PT0gJ21sLXRlbnNvci1jcHUtb3V0cHV0JyA/ICdtbC10ZW5zb3InIDogbCkpXG4gICAgICAgICAgLm1hcCgobCkgPT4gZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGwpKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtcbiAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgYmluZGluZ1N0YXRlLFxuICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgZmFsc2UsXG4gICAgXSk7XG4gICAgcmV0dXJuIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzLCBvdXRwdXROYW1lcywgaW5wdXRNZXRhZGF0YSwgb3V0cHV0TWV0YWRhdGFdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcblxuICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgIT09IDApIHtcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdIYW5kbGUpICE9PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSAhPT0gMCkge1xuICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VTZXNzaW9uKHNlc3Npb25IYW5kbGUpICE9PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLl9mcmVlKG1vZGVsRGF0YU9mZnNldCk7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKSAhPT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2Ugc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG5cbiAgICAvLyB1bm1vdW50IGV4dGVybmFsIGRhdGEgaWYgbmVjZXNzYXJ5XG4gICAgd2FzbS51bm1vdW50RXh0ZXJuYWxEYXRhPy4oKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlbGVhc2Ugc2Vzc2lvbi4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlXSA9IHNlc3Npb247XG5cbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSkge1xuICAgICAgaWYgKHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjbGVhciBib3VuZCBvdXRwdXRzLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ1N0YXRlLmhhbmRsZSkgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcbiAgICB9XG4gIH1cblxuICB3YXNtLmpzZXBPblJlbGVhc2VTZXNzaW9uPy4oc2Vzc2lvbklkKTtcbiAgd2FzbS53ZWJubk9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xuICB3YXNtLndlYmdwdU9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xuXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKChidWYpID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSkgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2Ugc2Vzc2lvbi5cIik7XG4gIH1cbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yID0gYXN5bmMgKFxuICB0ZW5zb3I6IFRlbnNvck1ldGFkYXRhIHwgbnVsbCxcbiAgdGVuc29ySGFuZGxlczogbnVtYmVyW10sXG4gIGFsbG9jczogbnVtYmVyW10sXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICB0ZW5zb3JOYW1lVVRGOEVuY29kZWQ6IG51bWJlcixcbiAgaW5kZXg6IG51bWJlcixcbiAgZW5hYmxlR3JhcGhDYXB0dXJlID0gZmFsc2UsXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCF0ZW5zb3IpIHtcbiAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuXG4gIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICBjb25zdCBkaW1zID0gdGVuc29yWzFdO1xuICBjb25zdCBsb2NhdGlvbiA9IHRlbnNvclszXTtcbiAgbGV0IGFjdHVhbExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgbGV0IHJhd0RhdGE6IG51bWJlcjtcbiAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgaWYgKGRhdGFUeXBlID09PSAnc3RyaW5nJyAmJiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyB8fCBsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICB9XG5cbiAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEV4dGVybmFsIGJ1ZmZlciBtdXN0IGJlIHByb3ZpZGVkIGZvciBpbnB1dC9vdXRwdXQgaW5kZXggJHtpbmRleH0gd2hlbiBlbmFibGVHcmFwaENhcHR1cmUgaXMgdHJ1ZS5gLFxuICAgICk7XG4gIH1cblxuICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHRlbnNvclsyXS5ncHVCdWZmZXI7XG4gICAgZGF0YUJ5dGVMZW5ndGggPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyh0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIGRpbXMpITtcblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgY29uc3QgcmVnaXN0ZXJCdWZmZXIgPSB3YXNtLndlYmdwdVJlZ2lzdGVyQnVmZmVyO1xuICAgICAgaWYgKCFyZWdpc3RlckJ1ZmZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xuICAgICAgfVxuXG4gICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoZ3B1QnVmZmVyLCBzZXNzaW9uSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyO1xuICAgICAgaWYgKCFyZWdpc3RlckJ1ZmZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xuICAgICAgfVxuICAgICAgcmF3RGF0YSA9IHJlZ2lzdGVyQnVmZmVyKHNlc3Npb25JZCwgaW5kZXgsIGdwdUJ1ZmZlciwgZGF0YUJ5dGVMZW5ndGgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcbiAgICBjb25zdCBtbFRlbnNvciA9IHRlbnNvclsyXS5tbFRlbnNvcjtcbiAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcykhO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJNTFRlbnNvciA9IHdhc20ud2Vibm5SZWdpc3Rlck1MVGVuc29yO1xuICAgIGlmICghcmVnaXN0ZXJNTFRlbnNvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJtbC10ZW5zb3JcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViTk4uJyk7XG4gICAgfVxuICAgIHJhd0RhdGEgPSByZWdpc3Rlck1MVGVuc29yKHNlc3Npb25JZCwgbWxUZW5zb3IsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICBkYXRhQnl0ZUxlbmd0aCA9IHB0clNpemUgKiBkYXRhLmxlbmd0aDtcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHRlbnNvciBkYXRhIGF0IGluZGV4ICR7aX0gaXMgbm90IGEgc3RyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5zZXRWYWx1ZShyYXdEYXRhICsgaSAqIHB0clNpemUsIGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpLCAnKicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpc0dyYXBoSW5wdXQgPSB3YXNtLndlYm5uSXNHcmFwaElucHV0O1xuICAgICAgY29uc3QgaXNHcmFwaE91dHB1dCA9IHdhc20ud2Vibm5Jc0dyYXBoT3V0cHV0O1xuICAgICAgaWYgKGRhdGFUeXBlICE9PSAnc3RyaW5nJyAmJiBpc0dyYXBoSW5wdXQgJiYgaXNHcmFwaE91dHB1dCkge1xuICAgICAgICBjb25zdCB0ZW5zb3JOYW1lID0gd2FzbS5VVEY4VG9TdHJpbmcodGVuc29yTmFtZVVURjhFbmNvZGVkKTtcbiAgICAgICAgLy8gUHJvbW90ZSB0aGUgdGVuc29yIHRvICdtbC10ZW5zb3InIGlmIGl0IGlzIGEgZ3JhcGggaW5wdXQuXG4gICAgICAgIGlmIChpc0dyYXBoSW5wdXQoc2Vzc2lvbklkLCB0ZW5zb3JOYW1lKSB8fCBpc0dyYXBoT3V0cHV0KHNlc3Npb25JZCwgdGVuc29yTmFtZSkpIHtcbiAgICAgICAgICBjb25zdCBkYXRhVHlwZUVudW0gPSB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSk7XG4gICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZUVudW0sIGRpbXMpITtcbiAgICAgICAgICBhY3R1YWxMb2NhdGlvbiA9ICdtbC10ZW5zb3InO1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZVRlbXBvcmFyeVRlbnNvciA9IHdhc20ud2Vibm5DcmVhdGVUZW1wb3JhcnlUZW5zb3I7XG4gICAgICAgICAgY29uc3QgdXBsb2FkVGVuc29yID0gd2FzbS53ZWJublVwbG9hZFRlbnNvcjtcbiAgICAgICAgICBpZiAoIWNyZWF0ZVRlbXBvcmFyeVRlbnNvciB8fCAhdXBsb2FkVGVuc29yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGVuc29ySWQgPSBhd2FpdCBjcmVhdGVUZW1wb3JhcnlUZW5zb3Ioc2Vzc2lvbklkLCBkYXRhVHlwZUVudW0sIGRpbXMpO1xuICAgICAgICAgIHVwbG9hZFRlbnNvcih0ZW5zb3JJZCwgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKSk7XG4gICAgICAgICAgcmF3RGF0YSA9IHRlbnNvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcbiAgdHJ5IHtcbiAgICBkaW1zLmZvckVhY2goKGQsIGluZGV4KSA9PiB3YXNtLnNldFZhbHVlKGRpbXNPZmZzZXQgKyBpbmRleCAqIHB0clNpemUsIGQsIHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnKSk7XG4gICAgY29uc3QgdGVuc29yID0gd2FzbS5fT3J0Q3JlYXRlVGVuc29yKFxuICAgICAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLFxuICAgICAgcmF3RGF0YSxcbiAgICAgIGRhdGFCeXRlTGVuZ3RoLFxuICAgICAgZGltc09mZnNldCxcbiAgICAgIGRpbXMubGVuZ3RoLFxuICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGFjdHVhbExvY2F0aW9uKSxcbiAgICApO1xuICAgIGlmICh0ZW5zb3IgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcbiAgICB9XG4gICAgdGVuc29ySGFuZGxlcy5wdXNoKHRlbnNvcik7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxuICovXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMgKFxuICBzZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgaW5wdXRUZW5zb3JzOiBUZW5zb3JNZXRhZGF0YVtdLFxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGEgfCBudWxsPixcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBwdHJTaXplID0gd2FzbS5QVFJfU0laRTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBydW4gaW5mZXJlbmNlLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xuICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBzZXNzaW9uWzFdO1xuICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsyXTtcbiAgY29uc3QgaW9CaW5kaW5nU3RhdGUgPSBzZXNzaW9uWzNdO1xuICBjb25zdCBlbmFibGVHcmFwaENhcHR1cmUgPSBzZXNzaW9uWzRdO1xuICBjb25zdCBpbnB1dE91dHB1dEJvdW5kID0gc2Vzc2lvbls1XTtcblxuICBjb25zdCBpbnB1dENvdW50ID0gaW5wdXRJbmRpY2VzLmxlbmd0aDtcbiAgY29uc3Qgb3V0cHV0Q291bnQgPSBvdXRwdXRJbmRpY2VzLmxlbmd0aDtcblxuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGlucHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3Qgb3V0cHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdID0gW107XG4gIGNvbnN0IHByZUFsbG9jYXRlZE91dHB1dHM6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgYmVmb3JlUnVuU3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICBjb25zdCBpbnB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogcHRyU2l6ZSk7XG4gIGNvbnN0IGlucHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIHB0clNpemUpO1xuICBjb25zdCBvdXRwdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiBwdHJTaXplKTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiBwdHJTaXplKTtcblxuICB0cnkge1xuICAgIFtydW5PcHRpb25zSGFuZGxlLCBydW5PcHRpb25zQWxsb2NzXSA9IHNldFJ1bk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBUUkFDRV9FVkVOVF9CRUdJTignd2FzbSBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3InKTtcbiAgICAvLyBjcmVhdGUgaW5wdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBhd2FpdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgIGlucHV0VGVuc29yc1tpXSxcbiAgICAgICAgaW5wdXRUZW5zb3JIYW5kbGVzLFxuICAgICAgICBpbnB1dE91dHB1dEFsbG9jcyxcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXSxcbiAgICAgICAgaW5wdXRJbmRpY2VzW2ldLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgYXdhaXQgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICBvdXRwdXRUZW5zb3JzW2ldLFxuICAgICAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLFxuICAgICAgICBpbnB1dE91dHB1dEFsbG9jcyxcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dLFxuICAgICAgICBpbnB1dENvdW50ICsgb3V0cHV0SW5kaWNlc1tpXSxcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgKTtcbiAgICB9XG4gICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIHdhc20uc2V0VmFsdWUoaW5wdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldLCAnKicpO1xuICAgICAgd2FzbS5zZXRWYWx1ZShpbnB1dE5hbWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbnB1dEluZGljZXNbaV1dLCAnKicpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIHdhc20uc2V0VmFsdWUob3V0cHV0VmFsdWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sICcqJyk7XG4gICAgICB3YXNtLnNldFZhbHVlKG91dHB1dE5hbWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV0sICcqJyk7XG4gICAgfVxuXG4gICAgaWYgKCghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpICYmIGlvQmluZGluZ1N0YXRlICYmICFpbnB1dE91dHB1dEJvdW5kKSB7XG4gICAgICBjb25zdCB7IGhhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkIH0gPSBpb0JpbmRpbmdTdGF0ZTtcblxuICAgICAgaWYgKGlucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGggIT09IGlucHV0Q291bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBpbnB1dCBjb3VudCBmcm9tIGZlZWRzICgke2lucHV0Q291bnR9KSBpcyBleHBlY3RlZCB0byBiZSBhbHdheXMgZXF1YWwgdG8gbW9kZWwncyBpbnB1dCBjb3VudCAoJHtpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RofSkuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ3dhc20gYmluZElucHV0c091dHB1dHMnKTtcbiAgICAgIC8vIHByb2Nlc3MgaW5wdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGlucHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0QmluZElucHV0KGhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIGlucHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIHByZS1hbGxvY2F0ZWQgb3V0cHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBvdXRwdXRUZW5zb3JzW2ldPy5bM107IC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXG5cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQsIHN0b3JlIGFuZCBiaW5kIHRoZSB0ZW5zb3IuXG4gICAgICAgICAgcHJlQWxsb2NhdGVkT3V0cHV0cy5wdXNoKG91dHB1dFRlbnNvckhhbmRsZXNbaV0pO1xuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgMCk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgcHJlLWFsbG9jYXRlZCBvdXRwdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuIHJlc2V0IHByZWZlcnJlZCBsb2NhdGlvbi5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KFxuICAgICAgICAgICAgaGFuZGxlLFxuICAgICAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFRSQUNFX0VWRU5UX0VORCgnd2FzbSBiaW5kSW5wdXRzT3V0cHV0cycpO1xuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICAgIHRydWUsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICB3YXNtLmpzZXBPblJ1blN0YXJ0Py4oc2Vzc2lvbkhhbmRsZSk7XG4gICAgd2FzbS53ZWJubk9uUnVuU3RhcnQ/LihzZXNzaW9uSGFuZGxlKTtcblxuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcbiAgICBpZiAoKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkgJiYgaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bldpdGhCaW5kaW5nKFxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpb0JpbmRpbmdTdGF0ZS5oYW5kbGUsXG4gICAgICAgIG91dHB1dENvdW50LFxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXG4gICAgICAgIHJ1bk9wdGlvbnNIYW5kbGUsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW4oXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICAgIGlucHV0TmFtZXNPZmZzZXQsXG4gICAgICAgIGlucHV0VmFsdWVzT2Zmc2V0LFxuICAgICAgICBpbnB1dENvdW50LFxuICAgICAgICBvdXRwdXROYW1lc09mZnNldCxcbiAgICAgICAgb3V0cHV0Q291bnQsXG4gICAgICAgIG91dHB1dFZhbHVlc09mZnNldCxcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ2ZhaWxlZCB0byBjYWxsIE9ydFJ1bigpLicpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dHB1dDogVGVuc29yTWV0YWRhdGFbXSA9IFtdO1xuICAgIGNvbnN0IG91dHB1dFByb21pc2VzOiBBcnJheTxQcm9taXNlPFtudW1iZXIsIFRlbnNvci5EYXRhVHlwZV0+PiA9IFtdO1xuXG4gICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ3dhc20gUHJvY2Vzc091dHB1dFRlbnNvcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdGVuc29yID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUob3V0cHV0VmFsdWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsICcqJykpO1xuICAgICAgLy8gVE9ETzogcmV2aXNpdCB0aGlzIHBhcnQgdG8gZW5zdXJlIGl0IHdvcmtzIGZvciBXZWJHUFUgd2hlbiBib3RoIHByZS1hbGxvY2F0ZWQgb3V0cHV0cyBhbmRcbiAgICAgIC8vIHByZWZlcnJlZCBsb2NhdGlvbiBhcmUgc3BlY2lmaWVkLlxuICAgICAgLy8gQ2VydGFpbiBwcmUtYWxsb2NhdGVkIHRlbnNvcnMgbWF5IGFscmVhZHkgYmUgYm91bmQgaW4gdGhlIElPIGJpbmRpbmcuIGUuZy4gdGhlIFdlYk5OIGJhY2tlbmRcbiAgICAgIC8vIGFsd2F5cyBiaW5kcyBpdHMgdGVuc29yIHRvICdtbC10ZW5zb3InLiBJbiBzdWNoIGNhc2VzLCB0aGUgdGVuc29yIElEIG1pZ2h0IGNoYW5nZSBhZnRlciBiaW5kaW5nLFxuICAgICAgLy8gYnV0IGNvcHlpbmcgZGF0YSBmb3IgdGhlc2UgdGVuc29ycyBzaG91bGQgc3RpbGwgYmUgYXZvaWRlZC5cbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0gfHwgcHJlQWxsb2NhdGVkT3V0cHV0cy5pbmNsdWRlcyhvdXRwdXRUZW5zb3JIYW5kbGVzW2ldKSkge1xuICAgICAgICAvLyBvdXRwdXQgdGVuc29yIGlzIHByZS1hbGxvY2F0ZWQuIG5vIG5lZWQgdG8gY29weSBkYXRhLlxuICAgICAgICBvdXRwdXQucHVzaChvdXRwdXRUZW5zb3JzW2ldISk7XG4gICAgICAgIGlmICh0ZW5zb3IgIT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgICAvLyByZWxlYXNlIHJlZHVuZGFudCB0ZW5zb3IgZWFybGllci5cbiAgICAgICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2UgdGVuc29yLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJlZm9yZUdldFRlbnNvckRhdGFTdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gICAgICAvLyBzdGFjayBhbGxvY2F0ZSA0IHBvaW50ZXIgdmFsdWVcbiAgICAgIGNvbnN0IHRlbnNvckRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIHB0clNpemUpO1xuXG4gICAgICBsZXQga2VlcE91dHB1dFRlbnNvciA9IGZhbHNlO1xuICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlIHwgdW5kZWZpbmVkLFxuICAgICAgICBkYXRhT2Zmc2V0ID0gMDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXG4gICAgICAgICAgdGVuc29yLFxuICAgICAgICAgIHRlbnNvckRhdGFPZmZzZXQsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIHB0clNpemUsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDIgKiBwdHJTaXplLFxuXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDMgKiBwdHJTaXplLFxuICAgICAgICApO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JztcbiAgICAgICAgY29uc3QgZGF0YVR5cGUgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0LCB2YWx1ZVR5cGUpKTtcbiAgICAgICAgZGF0YU9mZnNldCA9IHdhc20uZ2V0VmFsdWUodGVuc29yRGF0YU9mZnNldCArIHB0clNpemUsICcqJyk7XG4gICAgICAgIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLmdldFZhbHVlKHRlbnNvckRhdGFPZmZzZXQgKyBwdHJTaXplICogMiwgJyonKTtcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IE51bWJlcih3YXNtLmdldFZhbHVlKHRlbnNvckRhdGFPZmZzZXQgKyBwdHJTaXplICogMywgdmFsdWVUeXBlKSk7XG4gICAgICAgIGNvbnN0IGRpbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkaW1zLnB1c2goTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGltc09mZnNldCArIGkgKiBwdHJTaXplLCB2YWx1ZVR5cGUpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdhc20uX09ydEZyZWUoZGltc09mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGZyZWUgbWVtb3J5IGZvciB0ZW5zb3IgZGltcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2l6ZSA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkTG9jYXRpb24gPSBpb0JpbmRpbmdTdGF0ZT8ub3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW291dHB1dEluZGljZXNbaV1dO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInIHx8IHByZWZlcnJlZExvY2F0aW9uID09PSAnbWwtdGVuc29yJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzdHJpbmdEYXRhOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyBpICogcHRyU2l6ZSwgJyonKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRPZmZzZXQgPSB3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyAoaSArIDEpICogcHRyU2l6ZSwgJyonKTtcbiAgICAgICAgICAgIGNvbnN0IG1heEJ5dGVzVG9SZWFkID0gaSA9PT0gc2l6ZSAtIDEgPyB1bmRlZmluZWQgOiBuZXh0T2Zmc2V0IC0gb2Zmc2V0O1xuICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgYSBjZXJ0YWluIG91dHB1dCdzIHByZWZlcnJlZCBsb2NhdGlvbiBpcyBHUFUgYnV0IHRoZSB0ZW5zb3IgaXMgZW1wdHksIHdlIHN0aWxsIG5lZWQgdG8gY3JlYXRlIGEgQ1BVXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdldEJ1ZmZlciA9ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVID8gd2FzbS53ZWJncHVHZXRCdWZmZXIgOiB3YXNtLmpzZXBHZXRCdWZmZXI7XG4gICAgICAgICAgICBpZiAoIWdldEJ1ZmZlcikge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZWZlcnJlZExvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSBnZXRCdWZmZXIoZGF0YU9mZnNldCk7XG4gICAgICAgICAgICBjb25zdCBidWZmZXJTaXplID0gY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMoZGF0YVR5cGUsIHNpemUpO1xuICAgICAgICAgICAgaWYgKGJ1ZmZlclNpemUgPT09IHVuZGVmaW5lZCB8fCAhaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgICAgICB3YXNtLndlYmdwdVJlZ2lzdGVyQnVmZmVyIShncHVCdWZmZXIsIHNlc3Npb25JZCwgZGF0YU9mZnNldCk7XG4gICAgICAgICAgICAgIGNvbnN0IGRvd25sb2FkRGF0YUZ1bmN0aW9uID0gd2FzbS53ZWJncHVDcmVhdGVEb3dubG9hZGVyIShncHVCdWZmZXIsIGJ1ZmZlclNpemUsIHNlc3Npb25JZCk7XG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIGRpbXMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZ3B1QnVmZmVyLFxuICAgICAgICAgICAgICAgICAgZG93bmxvYWQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBkb3dubG9hZERhdGFGdW5jdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3ICh0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IodHlwZSEpKShhcnJheUJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhIGFzIFRlbnNvci5EYXRhVHlwZU1hcFtUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzXTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcikgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2UgdGVuc29yLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdncHUtYnVmZmVyJyxcbiAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBkaW1zLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGdwdUJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLmpzZXBDcmVhdGVEb3dubG9hZGVyIShncHVCdWZmZXIsIGJ1ZmZlclNpemUsIHR5cGUpLFxuICAgICAgICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHRlbnNvci5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZ3B1LWJ1ZmZlcicsXG4gICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdtbC10ZW5zb3InICYmIHNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBlbnN1cmVUZW5zb3IgPSB3YXNtLndlYm5uRW5zdXJlVGVuc29yO1xuICAgICAgICAgICAgY29uc3QgaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCA9IHdhc20ud2Vibm5Jc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkO1xuICAgICAgICAgICAgaWYgKCFlbnN1cmVUZW5zb3IgfHwgIWlzR3JhcGhJbnB1dE91dHB1dFR5cGVTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmVmZXJyZWRMb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRlbnNvclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XG4gICAgICAgICAgICBpZiAodGVuc29yU2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc01MVGVuc29yU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkKHNlc3Npb25JZCwgdHlwZSwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgcHJlZmVycmVkTG9jYXRpb24gXCJtbC10ZW5zb3JcIiBmb3IgJHt0eXBlfSBvdXRwdXQgaXMgbm90IHN1cHBvcnRlZCBieSBjdXJyZW50IFdlYk5OIENvbnRleHQuYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgdGhlIGdyYXBoIGhhcyBiZWVuIHBhcnRpdGlvbmVkLCB0aGUgb3V0cHV0IHRlbnNvciBtYXkgaGF2ZSBub3QgYmVlbiBjcmVhdGVkLiBGb3IgdGhpcyByZWFzb24sIHdlIHVzZVxuICAgICAgICAgICAgLy8gZW5zdXJlVGVuc29yIHRvIGdldC9jcmVhdGUgdGhlIE1MVGVuc29yLiBJbiB3aGljaCBjYXNlLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgdGhlIGRhdGEgaWYgYSBuZXcgdGVuc29yXG4gICAgICAgICAgICAvLyBoYXMgYmVlbiBjcmVhdGVkLlxuICAgICAgICAgICAgY29uc3QgbWxUZW5zb3IgPSBhd2FpdCBlbnN1cmVUZW5zb3Ioc2Vzc2lvbklkLCBkYXRhT2Zmc2V0LCBkYXRhVHlwZSwgZGltcywgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cbiAgICAgICAgICAgIGtlZXBPdXRwdXRUZW5zb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgIGRpbXMsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtbFRlbnNvcixcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS53ZWJubkNyZWF0ZU1MVGVuc29yRG93bmxvYWRlciEoZGF0YU9mZnNldCwgdHlwZSksXG4gICAgICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgd2FzbS53ZWJublJlbGVhc2VUZW5zb3JJZCEoZGF0YU9mZnNldCk7XG4gICAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJ21sLXRlbnNvcicsXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnICYmIHNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gd2FzbS53ZWJubkNyZWF0ZU1MVGVuc29yRG93bmxvYWRlciEoZGF0YU9mZnNldCwgdHlwZSBhcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMpKCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IG91dHB1dC5sZW5ndGg7XG4gICAgICAgICAgICAvLyBEZWxheSB0aGUgZGF0YSBkb3dubG9hZCBhbmQgcmVsZWFzaW5nIHRoZSB0ZW5zb3IgdW50aWwgd2UgY2FuIHdhaXQgZm9yIGFsbCBvdXRwdXQgdGVuc29ycyB0byBiZSBkb3dubG9hZGVkLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG4gICAgICAgICAgICBvdXRwdXRQcm9taXNlcy5wdXNoKFxuICAgICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogW251bWJlciwgVGVuc29yLkRhdGFUeXBlXSA9IFtpbmRleCwgYXdhaXQgZGF0YV07XG4gICAgICAgICAgICAgICAgd2FzbS53ZWJublJlbGVhc2VUZW5zb3JJZCEoZGF0YU9mZnNldCk7XG4gICAgICAgICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIFtdLCAnY3B1J10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IodHlwZSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IHR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzaXplKTtcbiAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aCkuc2V0KFxuICAgICAgICAgICAgICB3YXNtLkhFQVBVOC5zdWJhcnJheShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YS5ieXRlTGVuZ3RoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgZGF0YSwgJ2NwdSddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZUdldFRlbnNvckRhdGFTdGFjayk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XG4gICAgICAgICAgd2FzbS5fZnJlZShkYXRhT2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWtlZXBPdXRwdXRUZW5zb3IpIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW9CaW5kaW5nU3RhdGUgJiYgIWVuYWJsZUdyYXBoQ2FwdHVyZSkge1xuICAgICAgaWYgKHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjbGVhciBib3VuZCBvdXRwdXRzLlwiKTtcbiAgICAgIH1cbiAgICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSWQsIFtcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgICBpb0JpbmRpbmdTdGF0ZSxcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgICBmYWxzZSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICAvLyBXYWl0IGZvciBhbGwgb3V0cHV0IHRlbnNvciBkYXRhIHRvIGJlIGRvd25sb2FkZWQuXG4gICAgZm9yIChjb25zdCBbaW5kZXgsIGRhdGFdIG9mIGF3YWl0IFByb21pc2UuYWxsKG91dHB1dFByb21pc2VzKSkge1xuICAgICAgb3V0cHV0W2luZGV4XVsyXSA9IGRhdGE7XG4gICAgfVxuICAgIFRSQUNFX0VWRU5UX0VORCgnd2FzbSBQcm9jZXNzT3V0cHV0VGVuc29yJyk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLndlYm5uT25SdW5FbmQ/LihzZXNzaW9uSGFuZGxlKTtcblxuICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZVJ1blN0YWNrKTtcblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgaW5wdXRUZW5zb3JzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKHQgJiYgdFszXSA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgd2FzbS53ZWJncHVVbnJlZ2lzdGVyQnVmZmVyISh0WzJdLmdwdUJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3V0cHV0VGVuc29ycy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgIGlmICh0ICYmIHRbM10gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgIHdhc20ud2ViZ3B1VW5yZWdpc3RlckJ1ZmZlciEodFsyXS5ncHVCdWZmZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2goKHYpID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIG91dHB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCgodikgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgaW5wdXRPdXRwdXRBbGxvY3MuZm9yRWFjaCgocCkgPT4gd2FzbS5fZnJlZShwKSk7XG5cbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaCgocCkgPT4gd2FzbS5fZnJlZShwKSk7XG4gIH1cbn07XG5cbi8qKlxuICogZW5kIHByb2ZpbGluZ1xuICovXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XG5cbiAgLy8gcHJvZmlsZSBmaWxlIG5hbWUgaXMgbm90IHVzZWQgeWV0LCBidXQgaXQgbXVzdCBiZSBmcmVlZC5cbiAgY29uc3QgcHJvZmlsZUZpbGVOYW1lID0gd2FzbS5fT3J0RW5kUHJvZmlsaW5nKHNlc3Npb25IYW5kbGUpO1xuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgYW4gcHJvZmlsZSBmaWxlIG5hbWUuXCIpO1xuICB9XG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xuICBjb25zdCBidWZmZXJzOiBBcnJheUJ1ZmZlckxpa2VbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0ZW5zb3JzKSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgJ2J1ZmZlcicgaW4gZGF0YSkge1xuICAgICAgYnVmZmVycy5wdXNoKGRhdGEuYnVmZmVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcnM7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYsIEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1xuICBPcnRXYXNtTWVzc2FnZSxcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcbiAgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsXG4gIFRlbnNvck1ldGFkYXRhLFxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi93YXNtLWNvcmUtaW1wbCc7XG5pbXBvcnQgeyBpbml0aWFsaXplV2ViQXNzZW1ibHkgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge1xuICBpbXBvcnRQcm94eVdvcmtlcixcbiAgaW5mZXJXYXNtUGF0aFByZWZpeEZyb21TY3JpcHRTcmMsXG4gIGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSxcbn0gZnJvbSAnLi93YXNtLXV0aWxzLWltcG9ydCc7XG5cbmNvbnN0IGlzUHJveHkgPSAoKTogYm9vbGVhbiA9PiAhIWVudi53YXNtLnByb3h5ICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5sZXQgcHJveHlXb3JrZXI6IFdvcmtlciB8IHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcbmxldCB0ZW1wb3JhcnlPYmplY3RVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxudHlwZSBQcm9taXNlQ2FsbGJhY2tzPFQgPSB2b2lkPiA9IFtyZXNvbHZlOiAocmVzdWx0OiBUKSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb246IHVua25vd24pID0+IHZvaWRdO1xubGV0IGluaXRXYXNtQ2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzO1xuY29uc3QgcXVldWVkQ2FsbGJhY2tzOiBNYXA8T3J0V2FzbU1lc3NhZ2VbJ3R5cGUnXSwgQXJyYXk8UHJvbWlzZUNhbGxiYWNrczx1bmtub3duPj4+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBlbnF1ZXVlQ2FsbGJhY2tzID0gKHR5cGU6IE9ydFdhc21NZXNzYWdlWyd0eXBlJ10sIGNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrczx1bmtub3duPik6IHZvaWQgPT4ge1xuICBjb25zdCBxdWV1ZSA9IHF1ZXVlZENhbGxiYWNrcy5nZXQodHlwZSk7XG4gIGlmIChxdWV1ZSkge1xuICAgIHF1ZXVlLnB1c2goY2FsbGJhY2tzKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZWRDYWxsYmFja3Muc2V0KHR5cGUsIFtjYWxsYmFja3NdKTtcbiAgfVxufTtcblxuY29uc3QgZW5zdXJlV29ya2VyID0gKCk6IHZvaWQgPT4ge1xuICBpZiAoaW5pdGlhbGl6aW5nIHx8ICFpbml0aWFsaXplZCB8fCBhYm9ydGVkIHx8ICFwcm94eVdvcmtlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignd29ya2VyIG5vdCByZWFkeScpO1xuICB9XG59O1xuXG5jb25zdCBvblByb3h5V29ya2VyTWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xuICBzd2l0Y2ggKGV2LmRhdGEudHlwZSkge1xuICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1swXSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBvcmFyeU9iamVjdFVybCkge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRlbXBvcmFyeU9iamVjdFVybCk7XG4gICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2luaXQtZXAnOlxuICAgIGNhc2UgJ2NvcHktZnJvbSc6XG4gICAgY2FzZSAnY3JlYXRlJzpcbiAgICBjYXNlICdyZWxlYXNlJzpcbiAgICBjYXNlICdydW4nOlxuICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOiB7XG4gICAgICBjb25zdCBjYWxsYmFja3MgPSBxdWV1ZWRDYWxsYmFja3MuZ2V0KGV2LmRhdGEudHlwZSkhO1xuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMF0oZXYuZGF0YS5vdXQhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbml0aWFsaXppbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdWx0aXBsZSBjYWxscyB0byAnaW5pdFdhc20oKScgZGV0ZWN0ZWQuXCIpO1xuICB9XG4gIGlmIChhYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicHJldmlvdXMgY2FsbCB0byAnaW5pdFdhc20oKScgZmFpbGVkLlwiKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xuXG4gICAgICB2b2lkIGltcG9ydFByb3h5V29ya2VyKCkudGhlbigoW29iamVjdFVybCwgd29ya2VyXSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb3h5V29ya2VyID0gd29ya2VyO1xuICAgICAgICAgIHByb3h5V29ya2VyLm9uZXJyb3IgPSAoZXY6IEVycm9yRXZlbnQpID0+IHJlamVjdChldik7XG4gICAgICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XG4gICAgICAgICAgaW5pdFdhc21DYWxsYmFja3MgPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2luaXQtd2FzbScsIGluOiBlbnYgfTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBwcm94eSB3b3JrZXIgaXMgbG9hZGVkIGZyb20gYSBibG9iIFVSTCwgd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlIHBhdGggaW5mb3JtYXRpb24gaXMgbm90IGxvc3QuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyB3aGVuIGBlbnYud2FzbS53YXNtUGF0aHNgIGlzIG5vdCBzZXQsIHdlIG5lZWQgdG8gcGFzcyB0aGUgcGF0aCBpbmZvcm1hdGlvbiB0byB0aGUgd29ya2VyLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KUyAmJiAhbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgJiYgb2JqZWN0VXJsKSB7XG4gICAgICAgICAgICAvLyBmb3IgYSBidWlsZCBub3QgYnVuZGxlZCB0aGUgd2FzbSBKUywgd2UgbmVlZCB0byBwYXNzIHRoZSBwYXRoIHByZWZpeCB0byB0aGUgd29ya2VyLlxuICAgICAgICAgICAgLy8gdGhlIHBhdGggcHJlZml4IHdpbGwgYmUgdXNlZCB0byByZXNvbHZlIHRoZSBwYXRoIHRvIGJvdGggdGhlIHdhc20gSlMgYW5kIHRoZSB3YXNtIGZpbGUuXG4gICAgICAgICAgICBjb25zdCBpbmZlcnJlZFdhc21QYXRoUHJlZml4ID0gaW5mZXJXYXNtUGF0aFByZWZpeEZyb21TY3JpcHRTcmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZlcnJlZFdhc21QYXRoUHJlZml4KSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UuaW4hLndhc20ud2FzbVBhdGhzID0gaW5mZXJyZWRXYXNtUGF0aFByZWZpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBCVUlMRF9ERUZTLklTX0VTTSAmJlxuICAgICAgICAgICAgQlVJTERfREVGUy5FTkFCTEVfQlVORExFX1dBU01fSlMgJiZcbiAgICAgICAgICAgICFtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyAmJlxuICAgICAgICAgICAgKG9iamVjdFVybCB8fCBpc0VzbUltcG9ydE1ldGFVcmxIYXJkY29kZWRBc0ZpbGVVcmkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBmb3IgYSBidWlsZCBidW5kbGVkIHRoZSB3YXNtIEpTLCBpZiBlaXRoZXIgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGlzIG1ldDpcbiAgICAgICAgICAgIC8vIC0gdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMXG4gICAgICAgICAgICAvLyAtIGBpbXBvcnQubWV0YS51cmxgIGlzIGEgZmlsZSBVUkwsIGl0IG1lYW5zIGl0IGlzIG92ZXJ3cml0dGVuIGJ5IHRoZSBidW5kbGVyLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGluIGVpdGhlciBjYXNlLCB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBsb3N0LCB3ZSBuZWVkIHRvIHBhc3MgdGhlIHBhdGggb2YgdGhlIC53YXNtIGZpbGUgdG8gdGhlIHdvcmtlci5cbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdXNlIHRoZSBidW5kbGVyIHByZWZlcnJlZCBVUkwgZm9ybWF0OlxuICAgICAgICAgICAgLy8gbmV3IFVSTCgnZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICAgICAgICAvLyBzbyB0aGF0IHRoZSBidW5kbGVyIGNhbiBoYW5kbGUgdGhlIGZpbGUgdXNpbmcgY29ycmVzcG9uZGluZyBsb2FkZXJzLlxuICAgICAgICAgICAgbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgPSB7XG4gICAgICAgICAgICAgIHdhc206ICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxuICAgICAgICAgICAgICAgID8gbmV3IFVSTCgnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWZcbiAgICAgICAgICAgICAgICA6IEJVSUxEX0RFRlMuRU5BQkxFX0pTUElcbiAgICAgICAgICAgICAgICAgID8gbmV3IFVSTCgnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc3BpLndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWZcbiAgICAgICAgICAgICAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWZcbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWYsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcm94eVdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICB0ZW1wb3JhcnlPYmplY3RVcmwgPSBvYmplY3RVcmw7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseShlbnYud2FzbSk7XG4gICAgICBhd2FpdCBjb3JlLmluaXRSdW50aW1lKGVudik7XG4gICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB0aHJvdyBlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplT3J0RXAgPSBhc3luYyAoZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnaW5pdC1lcCcsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnaW5pdC1lcCcsIGluOiB7IGVwTmFtZSwgZW52IH0gfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBjb3JlLmluaXRFcChlbnYsIGVwTmFtZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyID0gYXN5bmMgKGJ1ZmZlcjogVWludDhBcnJheSk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2NvcHktZnJvbScsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnY29weS1mcm9tJywgaW46IHsgYnVmZmVyIH0gfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBbYnVmZmVyLmJ1ZmZlcl0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLmNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb24gPSBhc3luYyAoXG4gIG1vZGVsOiBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciB8IFVpbnQ4QXJyYXksXG4gIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuKTogUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICAvLyBjaGVjayB1bnN1cHBvcnRlZCBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nlc3Npb24gb3B0aW9uIFwicHJlZmVycmVkT3V0cHV0TG9jYXRpb25cIiBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY3JlYXRlJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdjcmVhdGUnLCBpbjogeyBtb2RlbCwgb3B0aW9uczogeyAuLi5vcHRpb25zIH0gfSB9O1xuICAgICAgY29uc3QgdHJhbnNmZXJhYmxlOiBUcmFuc2ZlcmFibGVbXSA9IFtdO1xuICAgICAgaWYgKG1vZGVsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICB0cmFuc2ZlcmFibGUucHVzaChtb2RlbC5idWZmZXIpO1xuICAgICAgfVxuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRyYW5zZmVyYWJsZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IGFzeW5jIChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdyZWxlYXNlJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdyZWxlYXNlJywgaW46IHNlc3Npb25JZCB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvcmUucmVsZWFzZVNlc3Npb24oc2Vzc2lvbklkKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jIChcbiAgc2Vzc2lvbklkOiBudW1iZXIsXG4gIGlucHV0SW5kaWNlczogbnVtYmVyW10sXG4gIGlucHV0czogVGVuc29yTWV0YWRhdGFbXSxcbiAgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXG4gIG91dHB1dHM6IEFycmF5PFRlbnNvck1ldGFkYXRhIHwgbnVsbD4sXG4gIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbik6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIC8vIGNoZWNrIGlucHV0cyBsb2NhdGlvblxuICAgIGlmIChpbnB1dHMuc29tZSgodCkgPT4gdFszXSAhPT0gJ2NwdScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lucHV0IHRlbnNvciBvbiBHUFUgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIG91dHB1dHMgbG9jYXRpb25cbiAgICBpZiAob3V0cHV0cy5zb21lKCh0KSA9PiB0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmUtYWxsb2NhdGVkIG91dHB1dCB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdydW4nLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBzZXJpYWxpemFibGVJbnB1dHMgPSBpbnB1dHMgYXMgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXTsgLy8gZXZlcnkgaW5wdXQgaXMgb24gQ1BVLlxuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7XG4gICAgICAgIHR5cGU6ICdydW4nLFxuICAgICAgICBpbjogeyBzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzOiBzZXJpYWxpemFibGVJbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnMgfSxcbiAgICAgIH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgY29yZS5leHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhzZXJpYWxpemFibGVJbnB1dHMpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5ydW4oc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlbmRQcm9maWxpbmcgPSBhc3luYyAoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnZW5kLXByb2ZpbGluZycsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnZW5kLXByb2ZpbGluZycsIGluOiBzZXNzaW9uSWQgfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLmVuZFByb2ZpbGluZyhzZXNzaW9uSWQpO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1xuICBJbmZlcmVuY2VTZXNzaW9uLFxuICBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcixcbiAgU2Vzc2lvbkhhbmRsZXIsXG4gIFRlbnNvcixcbiAgVFJBQ0VfRlVOQ19CRUdJTixcbiAgVFJBQ0VfRlVOQ19FTkQsXG59IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLCBUZW5zb3JNZXRhZGF0YSB9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHsgY29weUZyb21FeHRlcm5hbEJ1ZmZlciwgY3JlYXRlU2Vzc2lvbiwgZW5kUHJvZmlsaW5nLCByZWxlYXNlU2Vzc2lvbiwgcnVuIH0gZnJvbSAnLi9wcm94eS13cmFwcGVyJztcbmltcG9ydCB7IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSwgaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUgfSBmcm9tICcuL3dhc20tY29tbW9uJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuaW1wb3J0IHsgbG9hZEZpbGUgfSBmcm9tICcuL3dhc20tdXRpbHMtbG9hZC1maWxlJztcblxuZXhwb3J0IGNvbnN0IGVuY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yLCBnZXROYW1lOiAoKSA9PiBzdHJpbmcpOiBUZW5zb3JNZXRhZGF0YSA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB0ZW5zb3IuZGF0YSwgJ2NwdSddO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHsgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyIH0sICdncHUtYnVmZmVyJ107XG4gICAgY2FzZSAnbWwtdGVuc29yJzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB7IG1sVGVuc29yOiB0ZW5zb3IubWxUZW5zb3IgfSwgJ21sLXRlbnNvciddO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3IubG9jYXRpb259IGZvciAke2dldE5hbWUoKX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yTWV0YWRhdGEpOiBUZW5zb3IgPT4ge1xuICBzd2l0Y2ggKHRlbnNvclszXSkge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3JbMF0sIHRlbnNvclsyXSwgdGVuc29yWzFdKTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gICAgICBpZiAoIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgR1BVIHRlbnNvcmApO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBncHVCdWZmZXIsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSB0ZW5zb3JbMl07XG4gICAgICByZXR1cm4gVGVuc29yLmZyb21HcHVCdWZmZXIoZ3B1QnVmZmVyLCB7IGRhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xuICAgIH1cbiAgICBjYXNlICdtbC10ZW5zb3InOiB7XG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgIGlmICghaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUoZGF0YVR5cGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbm90IHN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9IGZvciBkZXNlcmlhbGl6aW5nIE1MVGVuc29yIHRlbnNvcmApO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBtbFRlbnNvciwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IHRlbnNvclsyXTtcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbU1MVGVuc29yKG1sVGVuc29yLCB7IGRhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgbG9jYXRpb246ICR7dGVuc29yWzNdfWApO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIge1xuICBwcml2YXRlIHNlc3Npb25JZDogbnVtYmVyO1xuXG4gIGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIGlucHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xuICBvdXRwdXRNZXRhZGF0YTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW107XG5cbiAgYXN5bmMgZmV0Y2hNb2RlbEFuZENvcHlUb1dhc21NZW1vcnkocGF0aDogc3RyaW5nKTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4ge1xuICAgIC8vIGZldGNoIG1vZGVsIGZyb20gdXJsIGFuZCBtb3ZlIHRvIHdhc20gaGVhcC5cbiAgICByZXR1cm4gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihhd2FpdCBsb2FkRmlsZShwYXRoKSk7XG4gIH1cblxuICBhc3luYyBsb2FkTW9kZWwocGF0aE9yQnVmZmVyOiBzdHJpbmcgfCBVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBsZXQgbW9kZWw6IFBhcmFtZXRlcnM8dHlwZW9mIGNyZWF0ZVNlc3Npb24+WzBdO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JCdWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgIC8vIG5vZGVcbiAgICAgICAgbW9kZWwgPSBhd2FpdCBsb2FkRmlsZShwYXRoT3JCdWZmZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlclxuICAgICAgICAvLyBmZXRjaCBtb2RlbCBhbmQgY29weSB0byB3YXNtIGhlYXAuXG4gICAgICAgIG1vZGVsID0gYXdhaXQgdGhpcy5mZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoT3JCdWZmZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlbCA9IHBhdGhPckJ1ZmZlcjtcbiAgICB9XG5cbiAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lcywgdGhpcy5pbnB1dE1ldGFkYXRhLCB0aGlzLm91dHB1dE1ldGFkYXRhXSA9IGF3YWl0IGNyZWF0ZVNlc3Npb24oXG4gICAgICBtb2RlbCxcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICB9XG5cbiAgYXN5bmMgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gcmVsZWFzZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xuICB9XG5cbiAgYXN5bmMgcnVuKFxuICAgIGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsXG4gICAgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsXG4gICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuICApOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+IHtcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XG4gICAgY29uc3QgaW5wdXRBcnJheTogVGVuc29yW10gPSBbXTtcbiAgICBjb25zdCBpbnB1dEluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgT2JqZWN0LmVudHJpZXMoZmVlZHMpLmZvckVhY2goKGt2cCkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbnB1dE5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbnB1dCAnJHtuYW1lfSdgKTtcbiAgICAgIH1cbiAgICAgIGlucHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xuICAgICAgaW5wdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3V0cHV0QXJyYXk6IEFycmF5PFRlbnNvciB8IG51bGw+ID0gW107XG4gICAgY29uc3Qgb3V0cHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZXRjaGVzKS5mb3JFYWNoKChrdnApID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XG4gICAgICBjb25zdCB0ZW5zb3IgPSBrdnBbMV07XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIG91dHB1dCAnJHtuYW1lfSdgKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dEFycmF5LnB1c2godGVuc29yKTtcbiAgICAgIG91dHB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBpbnB1dHMgPSBpbnB1dEFycmF5Lm1hcCgodCwgaSkgPT5cbiAgICAgIGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBpbnB1dCBcIiR7dGhpcy5pbnB1dE5hbWVzW2lucHV0SW5kaWNlc1tpXV19XCJgKSxcbiAgICApO1xuICAgIGNvbnN0IG91dHB1dHMgPSBvdXRwdXRBcnJheS5tYXAoKHQsIGkpID0+XG4gICAgICB0ID8gZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYG91dHB1dCBcIiR7dGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXX1cImApIDogbnVsbCxcbiAgICApO1xuXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHJ1bih0aGlzLnNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG91dHB1dHMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgcmVzdWx0TWFwOiBTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRNYXBbdGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXV0gPSBvdXRwdXRBcnJheVtpXSA/PyBkZWNvZGVUZW5zb3JNZXRhZGF0YShyZXN1bHRzW2ldKTtcbiAgICB9XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gcmVzdWx0TWFwO1xuICB9XG5cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHByb2ZpbGluZ1xuICB9XG5cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHZvaWQgZW5kUHJvZmlsaW5nKHRoaXMuc2Vzc2lvbklkKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBCYWNrZW5kLCBlbnYsIEluZmVyZW5jZVNlc3Npb24sIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgaW5pdGlhbGl6ZU9ydEVwLCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lIH0gZnJvbSAnLi93YXNtL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHsgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyIH0gZnJvbSAnLi93YXNtL3Nlc3Npb24taGFuZGxlci1pbmZlcmVuY2UnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYWxsIGZsYWdzIGZvciBXZWJBc3NlbWJseS5cbiAqXG4gKiBUaG9zZSBmbGFncyBhcmUgYWNjZXNzaWJsZSBmcm9tIGBvcnQuZW52Lndhc21gLiBVc2VycyBhcmUgYWxsb3cgdG8gc2V0IHRob3NlIGZsYWdzIGJlZm9yZSB0aGUgZmlyc3QgaW5mZXJlbmNlIHNlc3Npb25cbiAqIGJlaW5nIGNyZWF0ZWQsIHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplRmxhZ3MgPSAoKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2YgZW52Lndhc20uaW5pdFRpbWVvdXQgIT09ICdudW1iZXInIHx8IGVudi53YXNtLmluaXRUaW1lb3V0IDwgMCkge1xuICAgIGVudi53YXNtLmluaXRUaW1lb3V0ID0gMDtcbiAgfVxuXG4gIGNvbnN0IHNpbWQgPSBlbnYud2FzbS5zaW1kO1xuICBpZiAodHlwZW9mIHNpbWQgIT09ICdib29sZWFuJyAmJiBzaW1kICE9PSB1bmRlZmluZWQgJiYgc2ltZCAhPT0gJ2ZpeGVkJyAmJiBzaW1kICE9PSAncmVsYXhlZCcpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBQcm9wZXJ0eSBcImVudi53YXNtLnNpbWRcIiBpcyBzZXQgdG8gdW5rbm93biB2YWx1ZSBcIiR7c2ltZH1cIi4gUmVzZXQgaXQgdG8gXFxgZmFsc2VcXGAgYW5kIGlnbm9yZSBTSU1EIGZlYXR1cmUgY2hlY2tpbmcuYCxcbiAgICApO1xuICAgIGVudi53YXNtLnNpbWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20ucHJveHkgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnByb3h5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLnRyYWNlICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS50cmFjZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5udW1UaHJlYWRzICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihlbnYud2FzbS5udW1UaHJlYWRzKSB8fCBlbnYud2FzbS5udW1UaHJlYWRzIDw9IDApIHtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGxvZ2ljIG9ubHkgYXBwbGllcyB3aGVuIGBvcnQuZW52Lndhc20ubnVtVGhyZWFkc2AgaXMgbm90IHNldCBieSB1c2VyLiBXZSB3aWxsIGFsd2F5cyBob25vciB1c2VyJ3NcbiAgICAvLyBzZXR0aW5nIGlmIGl0IGlzIHByb3ZpZGVkLlxuXG4gICAgLy8gQnJvd3Nlcjogd2hlbiBjcm9zc09yaWdpbklzb2xhdGVkIGlzIGZhbHNlLCBTaGFyZWRBcnJheUJ1ZmZlciBpcyBub3QgYXZhaWxhYmxlIHNvIFdlYkFzc2VtYmx5IHRocmVhZHMgd2lsbCBub3RcbiAgICAvLyB3b3JrLiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgc2V0IG51bVRocmVhZHMgdG8gMS5cbiAgICAvL1xuICAgIC8vIFRoZXJlIGlzIGFuIGV4Y2VwdGlvbjogd2hlbiB0aGUgYnJvd3NlciBpcyBjb25maWd1cmVkIHRvIGZvcmNlLWVuYWJsZSBTaGFyZWRBcnJheUJ1ZmZlciAoZS5nLiBDaHJvbXVpbSB3aXRoXG4gICAgLy8gLS1lbmFibGUtZmVhdHVyZXM9U2hhcmVkQXJyYXlCdWZmZXIpLCBpdCBpcyBwb3NzaWJsZSB0aGF0IGBzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWRgIGlzIGZhbHNlIGFuZFxuICAgIC8vIFNoYXJlZEFycmF5QnVmZmVyIGlzIGF2YWlsYWJsZSBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIGlzIHVzdWFsbHkgZm9yIHRlc3RpbmcuIEluIHRoaXMgY2FzZSwgIHdlIHdpbGwgc3RpbGwgc2V0XG4gICAgLy8gbnVtVGhyZWFkcyB0byAxIGhlcmUuIElmIHdlIHdhbnQgdG8gZW5hYmxlIG11bHRpLXRocmVhZGluZyBpbiB0ZXN0LCB3ZSBzaG91bGQgc2V0IGBvcnQuZW52Lndhc20ubnVtVGhyZWFkc2AgdG8gYVxuICAgIC8vIHZhbHVlIGdyZWF0ZXIgdGhhbiAxLlxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG51bUNwdUxvZ2ljYWxDb3JlcyA9XG4gICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnbm9kZTpvcycpLmNwdXMoKS5sZW5ndGggOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeTtcbiAgICAgIGVudi53YXNtLm51bVRocmVhZHMgPSBNYXRoLm1pbig0LCBNYXRoLmNlaWwoKG51bUNwdUxvZ2ljYWxDb3JlcyB8fCAxKSAvIDIpKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCBpbXBsZW1lbnRzIEJhY2tlbmQge1xuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgV2ViQXNzZW1ibHkgYmFja2VuZC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbmx5IG9uY2UgZm9yIGVhY2ggYmFja2VuZCBuYW1lLiBJdCB3aWxsIGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB3aGVuXG4gICAqIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkIHdpdGggYSByZWdpc3RlcmVkIGJhY2tlbmQgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIGJhY2tlbmROYW1lIC0gdGhlIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKi9cbiAgYXN5bmMgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gcG9wdWxhdGUgd2FzbSBmbGFnc1xuICAgIGluaXRpYWxpemVGbGFncygpO1xuXG4gICAgLy8gaW5pdCB3YXNtXG4gICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSgpO1xuXG4gICAgLy8gcGVyZm9ybWUgRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb25cbiAgICBhd2FpdCBpbml0aWFsaXplT3J0RXAoYmFja2VuZE5hbWUpO1xuICB9XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxuICAgIGJ1ZmZlcjogVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGFzeW5jIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxuICAgIHBhdGhPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyKCk7XG4gICAgYXdhaXQgaGFuZGxlci5sb2FkTW9kZWwocGF0aE9yQnVmZmVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gaGFuZGxlcjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgd2FzbUJhY2tlbmQgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseUJhY2tlbmQoKTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xuXG4vLyBXZSB1c2UgXCJyZXF1aXJlXCIgaW5zdGVhZCBvZiBcImltcG9ydFwiIGhlcmUgYmVjYXVzZSBpbXBvcnQgc3RhdGVtZW50IG11c3QgYmUgcHV0IGluIHRvcCBsZXZlbC4gT3VyIGN1cnJlbnQgY29kZSBkb2VzXG4vLyBub3QgYWxsb3cgYnVuZGxlciB0byB0cmVlLXNoYWtpbmcgY29kZSBhcyBleHBlY3RlZCBiZWNhdXNlIHNvbWUgY29kZXMgYXJlIHRyZWF0ZWQgYXMgaGF2aW5nIHNpZGUgZWZmZWN0cy5cbi8vIFNvIHdlIGltcG9ydCBjb2RlIGluc2lkZSB0aGUgaWYtY2xhdXNlIHRvIGFsbG93IGJ1bmRsZXIgcmVtb3ZlIHRoZSBjb2RlIHNhZmVseS5cblxuZXhwb3J0ICogZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmltcG9ydCAqIGFzIG9ydCBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuZXhwb3J0IGRlZmF1bHQgb3J0O1xuXG5pbXBvcnQgeyByZWdpc3RlckJhY2tlbmQsIGVudiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR0wpIHtcbiAgY29uc3Qgb25ueGpzQmFja2VuZCA9IHJlcXVpcmUoJy4vYmFja2VuZC1vbm54anMnKS5vbm54anNCYWNrZW5kO1xuICByZWdpc3RlckJhY2tlbmQoJ3dlYmdsJywgb25ueGpzQmFja2VuZCwgLTEwKTtcbn1cblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ1RoZSBjdXJyZW50IGJ1aWxkIGlzIHNwZWNpZmllZCB0byBlbmFibGUgYm90aCBKU0VQIGFuZCBXZWJHUFUgRVAuIFRoaXMgaXMgbm90IGEgdmFsaWQgY29uZmlndXJhdGlvbi4gJyArXG4gICAgICAnSlNFUCBhbmQgV2ViR1BVIEVQcyBjYW5ub3QgYmUgZW5hYmxlZCBhdCB0aGUgc2FtZSB0aW1lLicsXG4gICk7XG59XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQk5OICYmIEJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmIEJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdUaGUgY3VycmVudCBidWlsZCBpcyBzcGVjaWZpZWQgdG8gZW5hYmxlIFdlYk5OIEVQIHdpdGhvdXQgSlNFUCBvciBXZWJHUFUgRVAuIFRoaXMgaXMgbm90IGEgdmFsaWQgY29uZmlndXJhdGlvbi4gJyArXG4gICAgICAnV2ViTk4gRVAgcmVxdWlyZXMgZWl0aGVyIEpTRVAgb3IgV2ViR1BVIEVQIHRvIGJlIGVuYWJsZWQuJyxcbiAgKTtcbn1cblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTSkge1xuICBjb25zdCB3YXNtQmFja2VuZCA9IHJlcXVpcmUoJy4vYmFja2VuZC13YXNtJykud2FzbUJhY2tlbmQ7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICByZWdpc3RlckJhY2tlbmQoJ3dlYmdwdScsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJOTikge1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2Vibm4nLCB3YXNtQmFja2VuZCwgNSk7XG4gIH1cbiAgcmVnaXN0ZXJCYWNrZW5kKCdjcHUnLCB3YXNtQmFja2VuZCwgMTApO1xuICByZWdpc3RlckJhY2tlbmQoJ3dhc20nLCB3YXNtQmFja2VuZCwgMTApO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LnZlcnNpb25zLCAnd2ViJywgeyB2YWx1ZTogdmVyc2lvbiwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMjguMCc7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBZ0JNLFVBQ0EsMEJBWU8saUJBd0NQLGdDQXdDTztBQTdHYjs7O0FBZ0JBLElBQU0sV0FBcUMsb0JBQUksSUFBRztBQUNsRCxJQUFNLDJCQUFxQyxDQUFBO0FBWXBDLElBQU0sa0JBQWtCLENBQUMsTUFBYyxTQUFrQixhQUEwQjtBQUN4RixVQUFJLFdBQVcsT0FBTyxRQUFRLFNBQVMsY0FBYyxPQUFPLFFBQVEsa0NBQWtDLFlBQVk7QUFDaEgsY0FBTSxpQkFBaUIsU0FBUyxJQUFJLElBQUk7QUFDeEMsWUFBSSxtQkFBbUIsUUFBVztBQUNoQyxtQkFBUyxJQUFJLE1BQU0sRUFBRSxTQUFTLFNBQVEsQ0FBRTtRQUMxQyxXQUFXLGVBQWUsV0FBVyxVQUFVO0FBRTdDO1FBQ0YsV0FBVyxlQUFlLGFBQWEsVUFBVTtBQUMvQyxjQUFJLGVBQWUsWUFBWSxTQUFTO0FBQ3RDLGtCQUFNLElBQUksTUFBTSw0QkFBNEIsSUFBSSxvQkFBb0IsUUFBUSxFQUFFO1VBQ2hGO1FBQ0Y7QUFFQSxZQUFJLFlBQVksR0FBRztBQUNqQixnQkFBTSxJQUFJLHlCQUF5QixRQUFRLElBQUk7QUFDL0MsY0FBSSxNQUFNLElBQUk7QUFDWixxQ0FBeUIsT0FBTyxHQUFHLENBQUM7VUFDdEM7QUFFQSxtQkFBU0EsS0FBSSxHQUFHQSxLQUFJLHlCQUF5QixRQUFRQSxNQUFLO0FBQ3hELGdCQUFJLFNBQVMsSUFBSSx5QkFBeUJBLEVBQUMsQ0FBQyxFQUFHLFlBQVksVUFBVTtBQUNuRSx1Q0FBeUIsT0FBT0EsSUFBRyxHQUFHLElBQUk7QUFDMUM7WUFDRjtVQUNGO0FBQ0EsbUNBQXlCLEtBQUssSUFBSTtRQUNwQztBQUNBO01BQ0Y7QUFFQSxZQUFNLElBQUksVUFBVSxxQkFBcUI7SUFDM0M7QUFRQSxJQUFNLGlD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RztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQzdHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUs7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxVQUMxRCxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsUUFBUTtBQUNOLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUVBLElBQU0seUJBQXlCLE1BQWU7QUFDNUMsVUFBSTtBQWdCRixlQUFPLFlBQVk7QUFBQSxVQUNqQixJQUFJLFdBQVc7QUFBQSxZQUNiO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFLO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFDMUc7QUFBQSxZQUFJO0FBQUEs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Q3JGLFFBQU0sSUFBSTtBQUFBLElBQ1I7QUFBQSxFQUVGO0FBQ0Y7QUFFQSxJQUFJLE1BQTBCO0FBQzVCLFFBQU1DLGVBQWMsMERBQTBCO0FBQzlDLE1BQWdDLE1BQTRCO0FBQzFELG9CQUFnQixVQUFVQSxjQUFhLENBQUM7QUFBQSxFQUMxQztBQUNBLE1BQUksTUFBMkI7QUFDN0Isb0JBQWdCLFNBQVNBLGNBQWEsQ0FBQztBQUFBLEVBQ3pDO0FBQ0Esa0JBQWdCLE9BQU9BLGNBQWEsRUFBRTtBQUN0QyxrQkFBZ0IsUUFBUUEsY0FBYSxFQUFFO0FBQ3pDO0FBRUEsT0FBTyxlQUFlQyxLQUFJLFVBQVUsT0FBTyxFQUFFLE9BQU9DLFVBQVMsWUFBWSxLQUFLLENBQUM7IiwKICAibmFtZXMiOiBbImkiLCAiZW52IiwgIkZsb2F0MTZBcnJheSIsICJUZW5zb3IiLCAiVGVuc29yIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiZW52IiwgImVudiIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJsb2NhdGlvbiIsICJ0ZW5zb3IiLCAiZW52IiwgIm1sQ29udGV4dEluZGV4IiwgIndhc20iLCAiZW52IiwgIndhc20iLCAibG9jYXRpb24iLCAiaW5kZXgiLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImluaXRpYWxpemluZyIsICJpbml0aWFsaXplZCIsICJhYm9ydGVkIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJUZW5zb3IiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgInZlcnNpb24iLCAid2FzbUJhY2tlbmQiLCAiZW52IiwgInZlcnNpb24iXQp9Cg==
