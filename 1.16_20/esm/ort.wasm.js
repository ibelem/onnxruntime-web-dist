/*!
 * ONNX Runtime Web v1.17.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var backends, backendsSortedByPriority, registerBackend, resolveBackend;
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
    resolveBackend = async (backendHints) => {
      const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
      const errors = [];
      for (const backendName of backendNames) {
        const backendInfo = backends.get(backendName);
        if (backendInfo) {
          if (backendInfo.initialized) {
            return backendInfo.backend;
          } else if (backendInfo.aborted) {
            continue;
          }
          const isInitializing = !!backendInfo.initPromise;
          try {
            if (!isInitializing) {
              backendInfo.initPromise = backendInfo.backend.init();
            }
            await backendInfo.initPromise;
            backendInfo.initialized = true;
            return backendInfo.backend;
          } catch (e) {
            if (!isInitializing) {
              errors.push({ name: backendName, err: e });
            }
            backendInfo.aborted = true;
          } finally {
            delete backendInfo.initPromise;
          }
        }
      }
      throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
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
    version = "1.17.0";
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
      const canvas = document.createElement("canvas");
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
        return canvas.toDataURL();
      } else {
        throw new Error("Can not access image data");
      }
    };
    tensorToImageData = (tensor, options) => {
      const pixels2DContext = document.createElement("canvas").getContext("2d");
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
          if (options.format !== void 0 && (channels === 4 && options.format !== "RGBA") || channels === 3 && (options.format !== "RGB" && options.format !== "BGR")) {
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
var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromPinnedBuffer;
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
      if (isHTMLImageEle) {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = canvas.getContext("2d");
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
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = width;
          tempCanvas.height = height;
          const pixels2DContext = tempCanvas.getContext("2d");
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
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const pixels2DContext = canvas.getContext("2d");
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
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
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
    tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
  }
});

// common/dist/esm/tensor-impl-type-mapping.js
var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isBigIntChecked, checkBigInt;
var init_tensor_impl_type_mapping = __esm({
  "common/dist/esm/tensor-impl-type-mapping.js"() {
    "use strict";
    NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
      ["float32", Float32Array],
      ["uint8", Uint8Array],
      ["int8", Int8Array],
      ["uint16", Uint16Array],
      ["float16", Uint16Array],
      ["int16", Int16Array],
      ["int32", Int32Array],
      ["bool", Uint8Array],
      ["float64", Float64Array],
      ["uint32", Uint32Array]
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
    isBigIntChecked = false;
    checkBigInt = () => {
      if (!isBigIntChecked) {
        isBigIntChecked = true;
        const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && typeof BigInt64Array.from === "function";
        const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && typeof BigUint64Array.from === "function";
        if (isBigInt64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
        }
        if (isBigUint64ArrayAvailable) {
          NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
          NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
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
        checkBigInt();
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
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "bool") {
                throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
              }
              this.gpuBufferData = arg0.gpuBuffer;
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
                if (arg0 === "float16") {
                  throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");
                } else if (arg0 === "uint64" || arg0 === "int64") {
                  data = typedArrayConstructor.from(arg1, BigInt);
                } else {
                  data = typedArrayConstructor.from(arg1);
                }
              } else if (arg1 instanceof typedArrayConstructor) {
                data = arg1;
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
          throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
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
      // #endregion
      // #region methods
      async getData(releaseData) {
        this.ensureValid();
        switch (this.dataLocation) {
          case "cpu":
          case "cpu-pinned":
            return this.data;
          case "texture":
          case "gpu-buffer": {
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

// common/dist/esm/inference-session-impl.js
var InferenceSession;
var init_inference_session_impl = __esm({
  "common/dist/esm/inference-session-impl.js"() {
    "use strict";
    init_backend_impl();
    init_tensor();
    InferenceSession = class _InferenceSession {
      constructor(handler) {
        this.handler = handler;
      }
      async run(feeds, arg1, arg2) {
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
        return returnValue;
      }
      async release() {
        return this.handler.dispose();
      }
      static async create(arg0, arg1, arg2, arg3) {
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
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backend = await resolveBackend(backendHints);
        const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, options);
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

// common/dist/esm/onnx-value.js
var init_onnx_value = __esm({
  "common/dist/esm/onnx-value.js"() {
    "use strict";
  }
});

// common/dist/esm/training-session-impl.js
var TrainingSession;
var init_training_session_impl = __esm({
  "common/dist/esm/training-session-impl.js"() {
    "use strict";
    TrainingSession = class {
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
        throw new Error("Method not implemented");
      }
      async loadParametersBuffer(_array, _trainableOnly) {
        throw new Error("Method not implemented.");
      }
      async getContiguousParameters(_trainableOnly) {
        throw new Error("Method not implemented.");
      }
      async runTrainStep(_feeds, _fetches, _options) {
        throw new Error("Method not implemented.");
      }
      async release() {
        return this.handler.dispose();
      }
    };
  }
});

// common/dist/esm/training-session.js
var TrainingSession2;
var init_training_session = __esm({
  "common/dist/esm/training-session.js"() {
    "use strict";
    init_training_session_impl();
    TrainingSession2 = TrainingSession;
  }
});

// common/dist/esm/index.js
var init_esm = __esm({
  "common/dist/esm/index.js"() {
    "use strict";
    init_backend();
    init_env();
    init_inference_session();
    init_tensor();
    init_onnx_value();
    init_training_session();
  }
});

// nodejs-ignore:node:os
var cpus;
var init_node_os = __esm({
  "nodejs-ignore:node:os"() {
    cpus = void 0;
  }
});

// nodejs-ignore:node:path
var join;
var init_node_path = __esm({
  "nodejs-ignore:node:path"() {
    join = void 0;
  }
});

// nodejs-ignore:fs
var fs_exports = {};
__export(fs_exports, {
  readFile: () => readFile
});
var readFile;
var init_fs = __esm({
  "nodejs-ignore:fs"() {
    readFile = void 0;
  }
});

// nodejs-ignore:path
var path_exports = {};
__export(path_exports, {
  join: () => join2
});
var join2;
var init_path = __esm({
  "nodejs-ignore:path"() {
    join2 = void 0;
  }
});

// web/lib/wasm/binding/ort-wasm.js
var require_ort_wasm = __commonJS({
  "web/lib/wasm/binding/ort-wasm.js"(exports, module) {
    "use strict";
    var ortWasm = (() => {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      if (typeof __filename !== "undefined")
        _scriptDir = _scriptDir || __filename;
      return function(moduleArg = {}) {
        var p = moduleArg, aa, ba;
        p.ready = new Promise((a, b) => {
          aa = a;
          ba = b;
        });
        var ca = Object.assign({}, p), da = "./this.program", ea = "object" == typeof window, q = "function" == typeof importScripts, fa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, r = "", ha, ia, ja;
        if (fa) {
          var fs = (init_fs(), __toCommonJS(fs_exports)), ka = (init_path(), __toCommonJS(path_exports));
          r = q ? ka.dirname(r) + "/" : __dirname + "/";
          ha = (a, b) => {
            a = a.startsWith("file://") ? new URL(a) : ka.normalize(a);
            return fs.readFileSync(a, b ? void 0 : "utf8");
          };
          ja = (a) => {
            a = ha(a, true);
            a.buffer || (a = new Uint8Array(a));
            return a;
          };
          ia = (a, b, c, d = true) => {
            a = a.startsWith("file://") ? new URL(a) : ka.normalize(a);
            fs.readFile(a, d ? void 0 : "utf8", (e, f) => {
              e ? c(e) : b(d ? f.buffer : f);
            });
          };
          !p.thisProgram && 1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          p.inspect = () => "[Emscripten Module object]";
        } else if (ea || q)
          q ? r = self.location.href : "undefined" != typeof document && document.currentScript && (r = document.currentScript.src), _scriptDir && (r = _scriptDir), 0 !== r.indexOf("blob:") ? r = r.substr(0, r.replace(/[?#].*/, "").lastIndexOf("/") + 1) : r = "", ha = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.send(null);
            return b.responseText;
          }, q && (ja = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }), ia = (a, b, c) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, true);
            d.responseType = "arraybuffer";
            d.onload = () => {
              200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
            };
            d.onerror = c;
            d.send(null);
          };
        var la = console.log.bind(console), t = console.error.bind(console);
        Object.assign(p, ca);
        ca = null;
        "object" != typeof WebAssembly && ma("no native wasm support detected");
        var na, oa = false, x, A, B, pa, E, I, qa, ra, sa, ta;
        function ua() {
          var a = na.buffer;
          p.HEAP8 = x = new Int8Array(a);
          p.HEAP16 = B = new Int16Array(a);
          p.HEAPU8 = A = new Uint8Array(a);
          p.HEAPU16 = pa = new Uint16Array(a);
          p.HEAP32 = E = new Int32Array(a);
          p.HEAPU32 = I = new Uint32Array(a);
          p.HEAPF32 = qa = new Float32Array(a);
          p.HEAPF64 = ta = new Float64Array(a);
          p.HEAP64 = ra = new BigInt64Array(a);
          p.HEAPU64 = sa = new BigUint64Array(a);
        }
        var va = [], wa = [], xa = [], J = 0, ya = null, K = null;
        function ma(a) {
          a = "Aborted(" + a + ")";
          t(a);
          oa = true;
          a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
          ba(a);
          throw a;
        }
        function za(a) {
          return a.startsWith("data:application/octet-stream;base64,");
        }
        var Aa;
        Aa = "ort-wasm.wasm";
        if (!za(Aa)) {
          var Ba = Aa;
          Aa = p.locateFile ? p.locateFile(Ba, r) : r + Ba;
        }
        function Ca(a) {
          if (ja)
            return ja(a);
          throw "both async and sync fetching of the wasm failed";
        }
        function Da(a) {
          if (ea || q) {
            if ("function" == typeof fetch && !a.startsWith("file://"))
              return fetch(a, { credentials: "same-origin" }).then((b) => {
                if (!b.ok)
                  throw "failed to load wasm binary file at '" + a + "'";
                return b.arrayBuffer();
              }).catch(() => Ca(a));
            if (ia)
              return new Promise((b, c) => {
                ia(a, (d) => b(new Uint8Array(d)), c);
              });
          }
          return Promise.resolve().then(() => Ca(a));
        }
        function Ea(a, b, c) {
          return Da(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
            t(`failed to asynchronously prepare wasm: ${d}`);
            ma(d);
          });
        }
        function Fa(a, b) {
          var c = Aa;
          return "function" != typeof WebAssembly.instantiateStreaming || za(c) || c.startsWith("file://") || fa || "function" != typeof fetch ? Ea(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
            t(`wasm streaming compile failed: ${e}`);
            t("falling back to ArrayBuffer instantiation");
            return Ea(c, a, b);
          }));
        }
        var Ha = [], Ia = 0, L = 0;
        function Ja(a) {
          this.se = a;
          this.me = a - 24;
          this.Oe = function(b) {
            I[this.me + 4 >>> 2 >>> 0] = b;
          };
          this.te = function() {
            return I[this.me + 4 >>> 2 >>> 0];
          };
          this.Je = function(b) {
            I[this.me + 8 >>> 2 >>> 0] = b;
          };
          this.Ae = function(b) {
            x[this.me + 12 >>> 0 >>> 0] = b ? 1 : 0;
          };
          this.Ge = function() {
            return 0 != x[this.me + 12 >>> 0 >>> 0];
          };
          this.Be = function(b) {
            x[this.me + 13 >>> 0 >>> 0] = b ? 1 : 0;
          };
          this.Ce = function() {
            return 0 != x[this.me + 13 >>> 0 >>> 0];
          };
          this.Ie = function(b, c) {
            this.ue(0);
            this.Oe(b);
            this.Je(c);
          };
          this.ue = function(b) {
            I[this.me + 16 >>> 2 >>> 0] = b;
          };
          this.Fe = function() {
            return I[this.me + 16 >>> 2 >>> 0];
          };
          this.He = function() {
            if (Ka(this.te()))
              return I[this.se >>> 2 >>> 0];
            var b = this.Fe();
            return 0 !== b ? b : this.se;
          };
        }
        var Na = (a) => {
          var b = L;
          if (!b)
            return La(0), 0;
          var c = new Ja(b);
          c.ue(b);
          var d = c.te();
          if (!d)
            return La(0), b;
          for (var e in a) {
            var f = a[e];
            if (0 === f || f === d)
              break;
            if (Ma(f, d, c.me + 16))
              return La(f), b;
          }
          La(d);
          return b;
        }, Oa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Pa = (a, b, c) => {
          b >>>= 0;
          var d = b + c;
          for (c = b; a[c] && !(c >= d); )
            ++c;
          if (16 < c - b && a.buffer && Oa)
            return Oa.decode(a.subarray(b, c));
          for (d = ""; b < c; ) {
            var e = a[b++];
            if (e & 128) {
              var f = a[b++] & 63;
              if (192 == (e & 224))
                d += String.fromCharCode((e & 31) << 6 | f);
              else {
                var g = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
              }
            } else
              d += String.fromCharCode(e);
          }
          return d;
        }, Qa = (a, b) => (a >>>= 0) ? Pa(A, a, b) : "", Ra = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, Sa = (a, b, c, d) => {
          c >>>= 0;
          if (!(0 < d))
            return 0;
          var e = c;
          d = c + d - 1;
          for (var f = 0; f < a.length; ++f) {
            var g = a.charCodeAt(f);
            if (55296 <= g && 57343 >= g) {
              var h = a.charCodeAt(++f);
              g = 65536 + ((g & 1023) << 10) | h & 1023;
            }
            if (127 >= g) {
              if (c >= d)
                break;
              b[c++ >>> 0] = g;
            } else {
              if (2047 >= g) {
                if (c + 1 >= d)
                  break;
                b[c++ >>> 0] = 192 | g >> 6;
              } else {
                if (65535 >= g) {
                  if (c + 2 >= d)
                    break;
                  b[c++ >>> 0] = 224 | g >> 12;
                } else {
                  if (c + 3 >= d)
                    break;
                  b[c++ >>> 0] = 240 | g >> 18;
                  b[c++ >>> 0] = 128 | g >> 12 & 63;
                }
                b[c++ >>> 0] = 128 | g >> 6 & 63;
              }
              b[c++ >>> 0] = 128 | g & 63;
            }
          }
          b[c >>> 0] = 0;
          return c - e;
        }, Ta = (a) => {
          if (null === a)
            return "null";
          var b = typeof a;
          return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
        }, Ua, M = (a) => {
          for (var b = ""; A[a >>> 0]; )
            b += Ua[A[a++ >>> 0]];
          return b;
        }, Va = {}, Wa = {}, Xa = {}, N;
        function Ya(a, b, c = {}) {
          var d = b.name;
          if (!a)
            throw new N(`type "${d}" must have a positive integer typeid pointer`);
          if (Wa.hasOwnProperty(a)) {
            if (c.De)
              return;
            throw new N(`Cannot register type '${d}' twice`);
          }
          Wa[a] = b;
          delete Xa[a];
          Va.hasOwnProperty(a) && (b = Va[a], delete Va[a], b.forEach((e) => e()));
        }
        function O(a, b, c = {}) {
          if (!("argPackAdvance" in b))
            throw new TypeError("registerType registeredInstance requires argPackAdvance");
          Ya(a, b, c);
        }
        var Za = (a, b, c) => {
          switch (b) {
            case 1:
              return c ? (d) => x[d >>> 0 >>> 0] : (d) => A[d >>> 0 >>> 0];
            case 2:
              return c ? (d) => B[d >>> 1 >>> 0] : (d) => pa[d >>> 1 >>> 0];
            case 4:
              return c ? (d) => E[d >>> 2 >>> 0] : (d) => I[d >>> 2 >>> 0];
            case 8:
              return c ? (d) => ra[d >>> 3] : (d) => sa[d >>> 3];
            default:
              throw new TypeError(`invalid integer width (${b}): ${a}`);
          }
        };
        function $a() {
          this.oe = [void 0];
          this.ye = [];
        }
        var P = new $a();
        function ab(a) {
          a >>>= 0;
          a >= P.me && 0 === --P.get(a).ze && P.ue(a);
        }
        var Q = (a) => {
          if (!a)
            throw new N("Cannot use deleted val. handle = " + a);
          return P.get(a).value;
        }, R = (a) => {
          switch (a) {
            case void 0:
              return 1;
            case null:
              return 2;
            case true:
              return 3;
            case false:
              return 4;
            default:
              return P.te({ ze: 1, value: a });
          }
        };
        function bb(a) {
          return this.fromWireType(E[a >>> 2 >>> 0]);
        }
        var cb = (a, b) => {
          switch (b) {
            case 4:
              return function(c) {
                return this.fromWireType(qa[c >>> 2 >>> 0]);
              };
            case 8:
              return function(c) {
                return this.fromWireType(ta[c >>> 3 >>> 0]);
              };
            default:
              throw new TypeError(`invalid float width (${b}): ${a}`);
          }
        };
        function db(a) {
          return this.fromWireType(I[a >>> 2 >>> 0]);
        }
        var eb = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, fb = (a, b) => {
          var c = a >> 1;
          for (var d = c + b / 2; !(c >= d) && pa[c >>> 0]; )
            ++c;
          c <<= 1;
          if (32 < c - a && eb)
            return eb.decode(A.subarray(a >>> 0, c >>> 0));
          c = "";
          for (d = 0; !(d >= b / 2); ++d) {
            var e = B[a + 2 * d >>> 1 >>> 0];
            if (0 == e)
              break;
            c += String.fromCharCode(e);
          }
          return c;
        }, gb = (a, b, c) => {
          void 0 === c && (c = 2147483647);
          if (2 > c)
            return 0;
          c -= 2;
          var d = b;
          c = c < 2 * a.length ? c / 2 : a.length;
          for (var e = 0; e < c; ++e)
            B[b >>> 1 >>> 0] = a.charCodeAt(e), b += 2;
          B[b >>> 1 >>> 0] = 0;
          return b - d;
        }, hb = (a) => 2 * a.length, ib = (a, b) => {
          for (var c = 0, d = ""; !(c >= b / 4); ) {
            var e = E[a + 4 * c >>> 2 >>> 0];
            if (0 == e)
              break;
            ++c;
            65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
          }
          return d;
        }, jb = (a, b, c) => {
          b >>>= 0;
          void 0 === c && (c = 2147483647);
          if (4 > c)
            return 0;
          var d = b;
          c = d + c - 4;
          for (var e = 0; e < a.length; ++e) {
            var f = a.charCodeAt(e);
            if (55296 <= f && 57343 >= f) {
              var g = a.charCodeAt(++e);
              f = 65536 + ((f & 1023) << 10) | g & 1023;
            }
            E[b >>> 2 >>> 0] = f;
            b += 4;
            if (b + 4 > c)
              break;
          }
          E[b >>> 2 >>> 0] = 0;
          return b - d;
        }, kb = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            55296 <= d && 57343 >= d && ++c;
            b += 4;
          }
          return b;
        }, mb = (a, b) => {
          var c = Wa[a];
          if (void 0 === c)
            throw a = lb(a), c = M(a), T(a), new N(b + " has unknown type " + c);
          return c;
        }, nb = {}, ob = (a) => {
          var b = nb[a];
          return void 0 === b ? M(a) : b;
        }, pb = [], qb = () => "object" == typeof globalThis ? globalThis : Function("return this")(), rb = (a) => {
          var b = pb.length;
          pb.push(a);
          return b;
        }, sb = (a, b) => {
          for (var c = Array(a), d = 0; d < a; ++d)
            c[d] = mb(I[b + 4 * d >>> 2 >>> 0], "parameter " + d);
          return c;
        }, tb = (a) => {
          if (void 0 === a)
            return "_unknown";
          a = a.replace(/[^a-zA-Z0-9_]/g, "$");
          var b = a.charCodeAt(0);
          return 48 <= b && 57 >= b ? `_${a}` : a;
        }, ub = {};
        function vb(a, b) {
          a = tb(a);
          return { [a]: function() {
            return b.apply(this, arguments);
          } }[a];
        }
        function wb(a) {
          var b = Function;
          if (!(b instanceof Function))
            throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
          var c = vb(b.name || "unknownFunctionName", function() {
          });
          c.prototype = b.prototype;
          c = new c();
          a = b.apply(c, a);
          return a instanceof Object ? a : c;
        }
        var xb = (a) => {
          for (var b = "", c = 0; c < a; ++c)
            b += (0 !== c ? ", " : "") + "arg" + c;
          var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
          for (c = 0; c < a; ++c)
            d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
          return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n"))(mb, p, R, () => I);
        }, yb = {}, U = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), zb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Ab = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Cb = (a) => {
          var b = Ra(a) + 1, c = Bb(b);
          c && Sa(a, A, c, b);
          return c;
        }, Db = {}, Fb = () => {
          if (!Eb) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
            for (b in Db)
              void 0 === Db[b] ? delete a[b] : a[b] = Db[b];
            var c = [];
            for (b in a)
              c.push(`${b}=${a[b]}`);
            Eb = c;
          }
          return Eb;
        }, Eb, Gb = [null, [], []], Hb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ib = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function Jb(a) {
          var b = Array(Ra(a) + 1);
          Sa(a, b, 0, b.length);
          return b;
        }
        function Kb(a, b, c, d) {
          function e(l, w, y) {
            for (l = "number" == typeof l ? l.toString() : l || ""; l.length < w; )
              l = y[0] + l;
            return l;
          }
          function f(l, w) {
            return e(l, w, "0");
          }
          function g(l, w) {
            function y(C) {
              return 0 > C ? -1 : 0 < C ? 1 : 0;
            }
            var z;
            0 === (z = y(l.getFullYear() - w.getFullYear())) && 0 === (z = y(l.getMonth() - w.getMonth())) && (z = y(l.getDate() - w.getDate()));
            return z;
          }
          function h(l) {
            switch (l.getDay()) {
              case 0:
                return new Date(l.getFullYear() - 1, 11, 29);
              case 1:
                return l;
              case 2:
                return new Date(l.getFullYear(), 0, 3);
              case 3:
                return new Date(
                  l.getFullYear(),
                  0,
                  2
                );
              case 4:
                return new Date(l.getFullYear(), 0, 1);
              case 5:
                return new Date(l.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(l.getFullYear() - 1, 11, 30);
            }
          }
          function k(l) {
            var w = l.pe;
            for (l = new Date(new Date(l.qe + 1900, 0, 1).getTime()); 0 < w; ) {
              var y = l.getMonth(), z = (U(l.getFullYear()) ? Hb : Ib)[y];
              if (w > z - l.getDate())
                w -= z - l.getDate() + 1, l.setDate(1), 11 > y ? l.setMonth(y + 1) : (l.setMonth(0), l.setFullYear(l.getFullYear() + 1));
              else {
                l.setDate(l.getDate() + w);
                break;
              }
            }
            y = new Date(l.getFullYear() + 1, 0, 4);
            w = h(new Date(
              l.getFullYear(),
              0,
              4
            ));
            y = h(y);
            return 0 >= g(w, l) ? 0 >= g(y, l) ? l.getFullYear() + 1 : l.getFullYear() : l.getFullYear() - 1;
          }
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          var m = I[d + 40 >>> 2 >>> 0];
          d = { Me: E[d >>> 2 >>> 0], Le: E[d + 4 >>> 2 >>> 0], ve: E[d + 8 >>> 2 >>> 0], xe: E[d + 12 >>> 2 >>> 0], we: E[d + 16 >>> 2 >>> 0], qe: E[d + 20 >>> 2 >>> 0], ne: E[d + 24 >>> 2 >>> 0], pe: E[d + 28 >>> 2 >>> 0], Pe: E[d + 32 >>> 2 >>> 0], Ke: E[d + 36 >>> 2 >>> 0], Ne: m ? Qa(m) : "" };
          c = Qa(c);
          m = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
          };
          for (var n in m)
            c = c.replace(new RegExp(n, "g"), m[n]);
          var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), v = "January February March April May June July August September October November December".split(" ");
          m = { "%a": (l) => u[l.ne].substring(0, 3), "%A": (l) => u[l.ne], "%b": (l) => v[l.we].substring(0, 3), "%B": (l) => v[l.we], "%C": (l) => f((l.qe + 1900) / 100 | 0, 2), "%d": (l) => f(l.xe, 2), "%e": (l) => e(l.xe, 2, " "), "%g": (l) => k(l).toString().substring(2), "%G": (l) => k(l), "%H": (l) => f(l.ve, 2), "%I": (l) => {
            l = l.ve;
            0 == l ? l = 12 : 12 < l && (l -= 12);
            return f(l, 2);
          }, "%j": (l) => {
            for (var w = 0, y = 0; y <= l.we - 1; w += (U(l.qe + 1900) ? Hb : Ib)[y++])
              ;
            return f(l.xe + w, 3);
          }, "%m": (l) => f(l.we + 1, 2), "%M": (l) => f(l.Le, 2), "%n": () => "\n", "%p": (l) => 0 <= l.ve && 12 > l.ve ? "AM" : "PM", "%S": (l) => f(l.Me, 2), "%t": () => "	", "%u": (l) => l.ne || 7, "%U": (l) => f(Math.floor((l.pe + 7 - l.ne) / 7), 2), "%V": (l) => {
            var w = Math.floor((l.pe + 7 - (l.ne + 6) % 7) / 7);
            2 >= (l.ne + 371 - l.pe - 2) % 7 && w++;
            if (w)
              53 == w && (y = (l.ne + 371 - l.pe) % 7, 4 == y || 3 == y && U(l.qe) || (w = 1));
            else {
              w = 52;
              var y = (l.ne + 7 - l.pe - 1) % 7;
              (4 == y || 5 == y && U(l.qe % 400 - 1)) && w++;
            }
            return f(w, 2);
          }, "%w": (l) => l.ne, "%W": (l) => f(Math.floor((l.pe + 7 - (l.ne + 6) % 7) / 7), 2), "%y": (l) => (l.qe + 1900).toString().substring(2), "%Y": (l) => l.qe + 1900, "%z": (l) => {
            l = l.Ke;
            var w = 0 <= l;
            l = Math.abs(l) / 60;
            return (w ? "+" : "-") + String("0000" + (l / 60 * 100 + l % 60)).slice(-4);
          }, "%Z": (l) => l.Ne, "%%": () => "%" };
          c = c.replace(/%%/g, "\0\0");
          for (n in m)
            c.includes(n) && (c = c.replace(new RegExp(n, "g"), m[n](d)));
          c = c.replace(/\0\0/g, "%");
          n = Jb(c);
          if (n.length > b)
            return 0;
          x.set(n, a >>> 0);
          return n.length - 1;
        }
        for (var Lb = [], Mb, V = (a) => {
          var b = Lb[a];
          b || (a >= Lb.length && (Lb.length = a + 1), Lb[a] = b = Mb.get(a));
          return b;
        }, Nb = Array(256), Ob = 0; 256 > Ob; ++Ob)
          Nb[Ob] = String.fromCharCode(Ob);
        Ua = Nb;
        N = p.BindingError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "BindingError";
          }
        };
        p.InternalError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "InternalError";
          }
        };
        Object.assign($a.prototype, { get(a) {
          return this.oe[a];
        }, has(a) {
          return void 0 !== this.oe[a];
        }, te(a) {
          var b = this.ye.pop() || this.oe.length;
          this.oe[b] = a;
          return b;
        }, ue(a) {
          this.oe[a] = void 0;
          this.ye.push(a);
        } });
        P.oe.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
        P.me = P.oe.length;
        p.count_emval_handles = () => {
          for (var a = 0, b = P.me; b < P.oe.length; ++b)
            void 0 !== P.oe[b] && ++a;
          return a;
        };
        var af = {
          u: function(a) {
            a = new Ja(a >>> 0);
            a.Ge() || (a.Ae(true), Ia--);
            a.Be(false);
            Ha.push(a);
            Pb(a.se);
            return a.He();
          },
          L: () => {
            W(0, 0);
            var a = Ha.pop();
            Qb(a.se);
            L = 0;
          },
          a: function() {
            return Na([]);
          },
          l: function(a) {
            return Na([a >>> 0]);
          },
          x: function(a, b) {
            return Na([a >>> 0, b >>> 0]);
          },
          q: function(a, b, c) {
            return Na([a >>> 0, b >>> 0, c >>> 0]);
          },
          yb: () => {
            var a = Ha.pop();
            a || ma("no exception to throw");
            var b = a.se;
            a.Ce() || (Ha.push(a), a.Be(true), a.Ae(false), Ia++);
            L = b;
            throw L;
          },
          t: function(a, b, c) {
            a >>>= 0;
            new Ja(a).Ie(b >>> 0, c >>> 0);
            L = a;
            Ia++;
            throw L;
          },
          Qa: () => Ia,
          h: function(a) {
            L || (L = a >>> 0);
            throw L;
          },
          zb: function() {
            return 0;
          },
          Vc: function() {
          },
          Ec: function() {
          },
          Gc: function() {
          },
          yc: function() {
            return 0;
          },
          Tc: function() {
          },
          Nc: function() {
          },
          Sc: function() {
          },
          Sb: function() {
          },
          Fc: function() {
          },
          Cc: function() {
          },
          Uc: function() {
          },
          Dc: function() {
          },
          Vb: function(a, b, c, d, e) {
            b >>>= 0;
            b = M(b);
            var f = -1 != b.indexOf("u");
            f && (e = (1n << 64n) - 1n);
            O(a >>> 0, { name: b, fromWireType: (g) => g, toWireType: function(g, h) {
              if ("bigint" != typeof h && "number" != typeof h)
                throw new TypeError(`Cannot convert "${Ta(h)}" to ${this.name}`);
              if (h < d || h > e)
                throw new TypeError(`Passing a number "${Ta(h)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
              return h;
            }, argPackAdvance: 8, readValueFromPointer: Za(b, c >>> 0, !f), re: null });
          },
          Yc: function(a, b, c, d) {
            b = M(b >>> 0);
            O(a >>> 0, { name: b, fromWireType: function(e) {
              return !!e;
            }, toWireType: function(e, f) {
              return f ? c : d;
            }, argPackAdvance: 8, readValueFromPointer: function(e) {
              return this.fromWireType(A[e >>> 0]);
            }, re: null });
          },
          Xc: function(a, b) {
            b = M(b >>> 0);
            O(a >>> 0, {
              name: b,
              fromWireType: (c) => {
                var d = Q(c);
                ab(c);
                return d;
              },
              toWireType: (c, d) => R(d),
              argPackAdvance: 8,
              readValueFromPointer: bb,
              re: null
            });
          },
          Ub: function(a, b, c) {
            b = M(b >>> 0);
            O(a >>> 0, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: cb(b, c >>> 0), re: null });
          },
          va: function(a, b, c, d, e) {
            a >>>= 0;
            c >>>= 0;
            b = M(b >>> 0);
            -1 === e && (e = 4294967295);
            e = (h) => h;
            if (0 === d) {
              var f = 32 - 8 * c;
              e = (h) => h << f >>> f;
            }
            var g = b.includes("unsigned") ? function(h, k) {
              return k >>> 0;
            } : function(h, k) {
              return k;
            };
            O(a, {
              name: b,
              fromWireType: e,
              toWireType: g,
              argPackAdvance: 8,
              readValueFromPointer: Za(b, c, 0 !== d),
              re: null
            });
          },
          Z: function(a, b, c) {
            function d(f) {
              return new e(x.buffer, I[f + 4 >>> 2 >>> 0], I[f >>> 2 >>> 0]);
            }
            var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
            c = M(c >>> 0);
            O(a >>> 0, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { De: true });
          },
          Wb: function(a, b) {
            b = M(b >>> 0);
            var c = "std::string" === b;
            O(a >>> 0, { name: b, fromWireType: function(d) {
              var e = I[d >>> 2 >>> 0], f = d + 4;
              if (c)
                for (var g = f, h = 0; h <= e; ++h) {
                  var k = f + h;
                  if (h == e || 0 == A[k >>> 0]) {
                    g = Qa(g, k - g);
                    if (void 0 === m)
                      var m = g;
                    else
                      m += String.fromCharCode(0), m += g;
                    g = k + 1;
                  }
                }
              else {
                m = Array(e);
                for (h = 0; h < e; ++h)
                  m[h] = String.fromCharCode(A[f + h >>> 0]);
                m = m.join("");
              }
              T(d);
              return m;
            }, toWireType: function(d, e) {
              e instanceof ArrayBuffer && (e = new Uint8Array(e));
              var f = "string" == typeof e;
              if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array))
                throw new N("Cannot pass non-string to std::string");
              var g = c && f ? Ra(e) : e.length;
              var h = Bb(4 + g + 1), k = h + 4;
              I[h >>> 2 >>> 0] = g;
              if (c && f)
                Sa(e, A, k, g + 1);
              else if (f)
                for (f = 0; f < g; ++f) {
                  var m = e.charCodeAt(f);
                  if (255 < m)
                    throw T(k), new N("String has UTF-16 code units that do not fit in 8 bits");
                  A[k + f >>> 0] = m;
                }
              else
                for (f = 0; f < g; ++f)
                  A[k + f >>> 0] = e[f];
              null !== d && d.push(T, h);
              return h;
            }, argPackAdvance: 8, readValueFromPointer: db, re(d) {
              T(d);
            } });
          },
          Bb: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            c = M(c);
            if (2 === b) {
              var d = fb;
              var e = gb;
              var f = hb;
              var g = () => pa;
              var h = 1;
            } else
              4 === b && (d = ib, e = jb, f = kb, g = () => I, h = 2);
            O(a >>> 0, { name: c, fromWireType: (k) => {
              for (var m = I[k >>> 2 >>> 0], n = g(), u, v = k + 4, l = 0; l <= m; ++l) {
                var w = k + 4 + l * b;
                if (l == m || 0 == n[w >>> h])
                  v = d(v, w - v), void 0 === u ? u = v : (u += String.fromCharCode(0), u += v), v = w + b;
              }
              T(k);
              return u;
            }, toWireType: (k, m) => {
              if ("string" != typeof m)
                throw new N(`Cannot pass non-string to C++ string type ${c}`);
              var n = f(m), u = Bb(4 + n + b);
              I[u >>> 2] = n >> h;
              e(m, u + 4, n + b);
              null !== k && k.push(T, u);
              return u;
            }, argPackAdvance: 8, readValueFromPointer: bb, re(k) {
              T(k);
            } });
          },
          ad: function(a, b) {
            b = M(b >>> 0);
            O(a >>> 0, { Ee: true, name: b, argPackAdvance: 0, fromWireType: () => {
            }, toWireType: () => {
            } });
          },
          Wc: () => true,
          qd: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            a = Q(a >>> 0);
            b = mb(b, "emval::as");
            var d = [], e = R(d);
            I[c >>> 2 >>> 0] = e;
            return b.toWireType(d, a);
          },
          la: function(a, b, c, d, e) {
            c >>>= 0;
            d >>>= 0;
            e >>>= 0;
            a = pb[a >>> 0];
            b = Q(b >>> 0);
            c = ob(c);
            var f = [];
            I[d >>> 2 >>> 0] = R(f);
            return a(b, c, f, e);
          },
          gd: function(a, b, c, d) {
            c >>>= 0;
            d >>>= 0;
            a = pb[a >>> 0];
            b = Q(b >>> 0);
            c = ob(c);
            a(b, c, null, d);
          },
          xc: ab,
          rd: function(a, b) {
            b >>>= 0;
            a = Q(a >>> 0);
            b = Q(b);
            return a == b;
          },
          wc: function(a) {
            a >>>= 0;
            if (0 === a)
              return R(qb());
            a = ob(a);
            return R(qb()[a]);
          },
          ka: function(a, b) {
            var c = sb(a, b >>> 0), d = c[0];
            b = d.name + "_$" + c.slice(1).map(function(n) {
              return n.name;
            }).join("_") + "$";
            var e = ub[b];
            if (void 0 !== e)
              return e;
            e = ["retType"];
            for (var f = [d], g = "", h = 0; h < a - 1; ++h)
              g += (0 !== h ? ", " : "") + "arg" + h, e.push("argType" + h), f.push(c[1 + h]);
            var k = "return function " + tb("methodCaller_" + b) + "(handle, name, destructors, args) {\n", m = 0;
            for (h = 0; h < a - 1; ++h)
              k += "    var arg" + h + " = argType" + h + ".readValueFromPointer(args" + (m ? "+" + m : "") + ");\n", m += c[h + 1].argPackAdvance;
            k += "    var rv = handle[name](" + g + ");\n";
            for (h = 0; h < a - 1; ++h)
              c[h + 1].deleteObject && (k += "    argType" + h + ".deleteObject(arg" + h + ");\n");
            d.Ee || (k += "    return retType.toWireType(destructors, rv);\n");
            e.push(k + "};\n");
            a = wb(e).apply(null, f);
            e = rb(a);
            return ub[b] = e;
          },
          kd: function(a, b) {
            b >>>= 0;
            a = Q(a >>> 0);
            b = Q(b);
            return R(a[b]);
          },
          P: function(a) {
            a >>>= 0;
            4 < a && (P.get(a).ze += 1);
          },
          sd: function(a, b, c, d) {
            c >>>= 0;
            d >>>= 0;
            a = Q(a >>> 0);
            var e = yb[b];
            e || (e = xb(b), yb[b] = e);
            return e(a, c, d);
          },
          jd: function() {
            return R([]);
          },
          nd: function(a) {
            a = Q(a >>> 0);
            for (var b = Array(a.length), c = 0; c < a.length; c++)
              b[c] = a[c];
            return R(b);
          },
          W: function(a) {
            return R(ob(a >>> 0));
          },
          Pa: function() {
            return R({});
          },
          td: function(a) {
            a >>>= 0;
            for (var b = Q(a); b.length; ) {
              var c = b.pop();
              b.pop()(c);
            }
            ab(a);
          },
          vd: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            a = Q(a >>> 0);
            b = Q(b);
            c = Q(c);
            a[b] = c;
          },
          gb: function(a, b) {
            b >>>= 0;
            a = mb(a >>> 0, "_emval_take_value");
            a = a.readValueFromPointer(b);
            return R(a);
          },
          Kc: function(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            b >>>= 0;
            a = new Date(1e3 * a);
            E[b >>> 2 >>> 0] = a.getUTCSeconds();
            E[b + 4 >>> 2 >>> 0] = a.getUTCMinutes();
            E[b + 8 >>> 2 >>> 0] = a.getUTCHours();
            E[b + 12 >>> 2 >>> 0] = a.getUTCDate();
            E[b + 16 >>> 2 >>> 0] = a.getUTCMonth();
            E[b + 20 >>> 2 >>> 0] = a.getUTCFullYear() - 1900;
            E[b + 24 >>> 2 >>> 0] = a.getUTCDay();
            E[b + 28 >>> 2 >>> 0] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
          },
          Lc: function(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            b >>>= 0;
            a = new Date(1e3 * a);
            E[b >>> 2 >>> 0] = a.getSeconds();
            E[b + 4 >>> 2 >>> 0] = a.getMinutes();
            E[b + 8 >>> 2 >>> 0] = a.getHours();
            E[b + 12 >>> 2 >>> 0] = a.getDate();
            E[b + 16 >>> 2 >>> 0] = a.getMonth();
            E[b + 20 >>> 2 >>> 0] = a.getFullYear() - 1900;
            E[b + 24 >>> 2 >>> 0] = a.getDay();
            E[b + 28 >>> 2 >>> 0] = (U(a.getFullYear()) ? zb : Ab)[a.getMonth()] + a.getDate() - 1 | 0;
            E[b + 36 >>> 2 >>> 0] = -(60 * a.getTimezoneOffset());
            var c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset(), d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            E[b + 32 >>> 2 >>> 0] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
          },
          Mc: function(a) {
            a >>>= 0;
            var b = new Date(E[a + 20 >>> 2 >>> 0] + 1900, E[a + 16 >>> 2 >>> 0], E[a + 12 >>> 2 >>> 0], E[a + 8 >>> 2 >>> 0], E[a + 4 >>> 2 >>> 0], E[a >>> 2 >>> 0], 0), c = E[a + 32 >>> 2 >>> 0], d = b.getTimezoneOffset(), e = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), f = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), g = Math.min(f, e);
            0 > c ? E[a + 32 >>> 2 >>> 0] = Number(e != f && g == d) : 0 < c != (g == d) && (e = Math.max(f, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? g : e) - d)));
            E[a + 24 >>> 2 >>> 0] = b.getDay();
            E[a + 28 >>> 2 >>> 0] = (U(b.getFullYear()) ? zb : Ab)[b.getMonth()] + b.getDate() - 1 | 0;
            E[a >>> 2 >>> 0] = b.getSeconds();
            E[a + 4 >>> 2 >>> 0] = b.getMinutes();
            E[a + 8 >>> 2 >>> 0] = b.getHours();
            E[a + 12 >>> 2 >>> 0] = b.getDate();
            E[a + 16 >>> 2 >>> 0] = b.getMonth();
            E[a + 20 >>> 2 >>> 0] = b.getYear();
            return BigInt(b.getTime() / 1e3);
          },
          Hc: function() {
            return -52;
          },
          Jc: function() {
          },
          Ac: function(a, b, c) {
            function d(k) {
              return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT";
            }
            c >>>= 0;
            var e = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(e, 0, 1), g = new Date(e, 6, 1);
            e = f.getTimezoneOffset();
            var h = g.getTimezoneOffset();
            I[a >>> 0 >>> 2 >>> 0] = 60 * Math.max(e, h);
            E[b >>> 0 >>> 2 >>> 0] = Number(e != h);
            a = d(f);
            b = d(g);
            a = Cb(a);
            b = Cb(b);
            h < e ? (I[c >>> 2 >>> 0] = a, I[c + 4 >>> 2 >>> 0] = b) : (I[c >>> 2 >>> 0] = b, I[c + 4 >>> 2 >>> 0] = a);
          },
          jb: () => {
            ma("");
          },
          Tb: () => Date.now(),
          Bc: function() {
            return 4294901760;
          },
          da: () => performance.now(),
          Rc: function(a, b, c) {
            b >>>= 0;
            return A.copyWithin(a >>> 0 >>> 0, b >>> 0, b + (c >>> 0) >>> 0);
          },
          zc: function(a) {
            a >>>= 0;
            var b = A.length;
            if (4294901760 < a)
              return false;
            for (var c = 1; 4 >= c; c *= 2) {
              var d = b * (1 + 0.2 / c);
              d = Math.min(d, a + 100663296);
              var e = Math;
              d = Math.max(a, d);
              a: {
                e = (e.min.call(e, 4294901760, d + (65536 - d % 65536) % 65536) - na.buffer.byteLength + 65535) / 65536;
                try {
                  na.grow(e);
                  ua();
                  var f = 1;
                  break a;
                } catch (g) {
                }
                f = void 0;
              }
              if (f)
                return true;
            }
            return false;
          },
          Pc: function(a, b) {
            a >>>= 0;
            b >>>= 0;
            var c = 0;
            Fb().forEach((d, e) => {
              var f = b + c;
              e = I[a + 4 * e >>> 2 >>> 0] = f;
              for (f = 0; f < d.length; ++f)
                x[e++ >>> 0 >>> 0] = d.charCodeAt(f);
              x[e >>> 0 >>> 0] = 0;
              c += d.length + 1;
            });
            return 0;
          },
          Qc: function(a, b) {
            a >>>= 0;
            b >>>= 0;
            var c = Fb();
            I[a >>> 2 >>> 0] = c.length;
            var d = 0;
            c.forEach((e) => d += e.length + 1);
            I[b >>> 2 >>> 0] = d;
            return 0;
          },
          Ab: () => 52,
          Rb: function() {
            return 52;
          },
          Oc: function() {
            return 70;
          },
          Qb: function(a, b, c, d) {
            b >>>= 0;
            c >>>= 0;
            d >>>= 0;
            for (var e = 0, f = 0; f < c; f++) {
              var g = I[b >>> 2 >>> 0], h = I[b + 4 >>> 2 >>> 0];
              b += 8;
              for (var k = 0; k < h; k++) {
                var m = A[g + k >>> 0], n = Gb[a];
                0 === m || 10 === m ? ((1 === a ? la : t)(Pa(n, 0)), n.length = 0) : n.push(m);
              }
              e += h;
            }
            I[d >>> 2 >>> 0] = e;
            return 0;
          },
          ib: Rb,
          Zc: Sb,
          ra: Tb,
          E: Ub,
          pa: Vb,
          fa: Wb,
          _c: Xb,
          dd: Yb,
          M: Zb,
          y: $b,
          b: ac,
          $b: bc,
          xa: cc,
          f: dc,
          Db: ec,
          c: fc,
          X: gc,
          i: hc,
          $c: ic,
          j: jc,
          r: kc,
          s: lc,
          o: mc,
          ua: nc,
          Ta: oc,
          ha: pc,
          Ob: qc,
          Za: rc,
          Hb: sc,
          nb: tc,
          ec: uc,
          sc: vc,
          bc: wc,
          cc: xc,
          Xb: yc,
          ja: zc,
          hb: Ac,
          za: Bc,
          Cb: Cc,
          ba: Dc,
          dc: Ec,
          Na: Fc,
          D: Gc,
          K: Hc,
          Fb: Ic,
          id: Jc,
          oa: Kc,
          N: Lc,
          _: Mc,
          U: Nc,
          z: Oc,
          Eb: Pc,
          ac: Qc,
          B: Rc,
          Gb: Sc,
          hd: Tc,
          Oa: Uc,
          bb: Vc,
          fc: Wc,
          Yb: Xc,
          Lb: Yc,
          O: Zc,
          F: $c,
          C: ad,
          bd,
          lb: cd,
          Q: dd,
          e: ed,
          Va: fd,
          k: gd,
          wa: hd,
          Ua: jd,
          ub: kd,
          g: ld,
          tc: md,
          aa: nd,
          cb: od,
          ya: pd,
          mb: qd,
          eb: rd,
          d: sd,
          qc: td,
          ld: ud,
          m: vd,
          nc: wd,
          n: xd,
          rc: yd,
          mc: zd,
          od: Ad,
          p: Bd,
          La: Cd,
          tb: Dd,
          Ka: Ed,
          Jb: Fd,
          A: Gd,
          H: Hd,
          V: Id,
          Sa: Jd,
          jc: Kd,
          db: Ld,
          ta: Md,
          ma: Nd,
          R: Od,
          _a: Pd,
          Fa: Qd,
          kb: Rd,
          Ba: Sd,
          hc: Td,
          Aa: Ud,
          Ca: Vd,
          ud: Wd,
          na: Xd,
          md: Yd,
          Ga: Zd,
          Ea: $d,
          uc: ae,
          lc: be,
          Da: ce,
          Ha: de,
          pb: ee,
          ga: fe,
          sa: ge,
          gc: he,
          kc: ie,
          Ib: je,
          Xa: ke,
          ea: le,
          xb: me,
          fd: ne,
          T: oe,
          vb: pe,
          ab: qe,
          Ra: re,
          fb: se,
          I: te,
          S: ue,
          wb: ve,
          ed: we,
          pc: xe,
          $: ye,
          ob: ze,
          ia: Ae,
          Zb: Be,
          wd: Ce,
          w: De,
          $a: Ee,
          pd: Fe,
          Mb: Ge,
          ic: He,
          vc: Ie,
          Nb: Je,
          Kb: Ke,
          Ya: Le,
          Pb: Me,
          Ia: Ne,
          _b: Oe,
          Y: Pe,
          oc: Qe,
          J: Re,
          cd: Se,
          Wa: Te,
          qa: Ue,
          G: Ve,
          rb: We,
          Ja: Xe,
          Ma: Ye,
          qb: Ze,
          sb: $e,
          v: function(a) {
            return a >>> 0;
          },
          Ic: Kb,
          ca: function(a, b, c, d) {
            return Kb(a >>> 0, b >>> 0, c >>> 0, d >>> 0);
          }
        }, X = function() {
          var a = { a: af };
          J++;
          Fa(a, function(b) {
            X = b.instance.exports;
            X = bf();
            na = X.xd;
            ua();
            Mb = X.ce;
            wa.unshift(X.yd);
            J--;
            0 == J && (null !== ya && (clearInterval(ya), ya = null), K && (b = K, K = null, b()));
          }).catch(ba);
          return {};
        }();
        p._OrtInit = (a, b) => (p._OrtInit = X.zd)(a, b);
        p._OrtGetLastError = (a, b) => (p._OrtGetLastError = X.Ad)(a, b);
        p._OrtCreateSessionOptions = (a, b, c, d, e, f, g, h, k, m) => (p._OrtCreateSessionOptions = X.Bd)(a, b, c, d, e, f, g, h, k, m);
        p._OrtAppendExecutionProvider = (a, b) => (p._OrtAppendExecutionProvider = X.Cd)(a, b);
        p._OrtAddFreeDimensionOverride = (a, b, c) => (p._OrtAddFreeDimensionOverride = X.Dd)(a, b, c);
        p._OrtAddSessionConfigEntry = (a, b, c) => (p._OrtAddSessionConfigEntry = X.Ed)(a, b, c);
        p._OrtReleaseSessionOptions = (a) => (p._OrtReleaseSessionOptions = X.Fd)(a);
        p._OrtCreateSession = (a, b, c) => (p._OrtCreateSession = X.Gd)(a, b, c);
        p._OrtReleaseSession = (a) => (p._OrtReleaseSession = X.Hd)(a);
        p._OrtGetInputOutputCount = (a, b, c) => (p._OrtGetInputOutputCount = X.Id)(a, b, c);
        p._OrtGetInputName = (a, b) => (p._OrtGetInputName = X.Jd)(a, b);
        p._OrtGetOutputName = (a, b) => (p._OrtGetOutputName = X.Kd)(a, b);
        p._OrtFree = (a) => (p._OrtFree = X.Ld)(a);
        p._OrtCreateTensor = (a, b, c, d, e, f) => (p._OrtCreateTensor = X.Md)(a, b, c, d, e, f);
        p._OrtGetTensorData = (a, b, c, d, e) => (p._OrtGetTensorData = X.Nd)(a, b, c, d, e);
        p._OrtReleaseTensor = (a) => (p._OrtReleaseTensor = X.Od)(a);
        p._OrtCreateRunOptions = (a, b, c, d) => (p._OrtCreateRunOptions = X.Pd)(a, b, c, d);
        p._OrtAddRunConfigEntry = (a, b, c) => (p._OrtAddRunConfigEntry = X.Qd)(a, b, c);
        p._OrtReleaseRunOptions = (a) => (p._OrtReleaseRunOptions = X.Rd)(a);
        p._OrtCreateBinding = (a) => (p._OrtCreateBinding = X.Sd)(a);
        p._OrtBindInput = (a, b, c) => (p._OrtBindInput = X.Td)(a, b, c);
        p._OrtBindOutput = (a, b, c, d) => (p._OrtBindOutput = X.Ud)(a, b, c, d);
        p._OrtClearBoundOutputs = (a) => (p._OrtClearBoundOutputs = X.Vd)(a);
        p._OrtReleaseBinding = (a) => (p._OrtReleaseBinding = X.Wd)(a);
        p._OrtRunWithBinding = (a, b, c, d, e) => (p._OrtRunWithBinding = X.Xd)(a, b, c, d, e);
        p._OrtRun = (a, b, c, d, e, f, g, h) => (p._OrtRun = X.Yd)(a, b, c, d, e, f, g, h);
        p._OrtEndProfiling = (a) => (p._OrtEndProfiling = X.Zd)(a);
        var Bb = p._malloc = (a) => (Bb = p._malloc = X._d)(a), T = p._free = (a) => (T = p._free = X.$d)(a), lb = (a) => (lb = X.ae)(a);
        p.__embind_initialize_bindings = () => (p.__embind_initialize_bindings = X.be)();
        var W = (a, b) => (W = X.de)(a, b), La = (a) => (La = X.ee)(a), Y = () => (Y = X.fe)(), Z = (a) => (Z = X.ge)(a), cf = (a) => (cf = X.he)(a), Qb = (a) => (Qb = X.ie)(a), Pb = (a) => (Pb = X.je)(a), Ma = (a, b, c) => (Ma = X.ke)(a, b, c), Ka = (a) => (Ka = X.le)(a);
        function fc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function dc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function ld(a, b, c) {
          var d = Y();
          try {
            V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function ac(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function gd(a, b) {
          var c = Y();
          try {
            V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function Gc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function ed(a) {
          var b = Y();
          try {
            V(a)();
          } catch (c) {
            Z(b);
            if (c !== c + 0)
              throw c;
            W(1, 0);
          }
        }
        function kc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function jc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function hc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function sd(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function vd(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function $b(a) {
          var b = Y();
          try {
            return V(a)();
          } catch (c) {
            Z(b);
            if (c !== c + 0)
              throw c;
            W(1, 0);
          }
        }
        function Oc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function De(a, b, c) {
          var d = Y();
          try {
            V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function xd(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function lc(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Wb(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function Zc(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
            return 0n;
          }
        }
        function Rb(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function mc(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function te(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Bd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Ie(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function me(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Gd(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function ye(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function nc(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Hd(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Ac(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function ve(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function ae(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Id(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function $c(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
            return 0n;
          }
        }
        function md(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function vc(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function pc(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Pd(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function Ce(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function pe(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function ue(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function kd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function se(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function rd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function yd(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Te(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function ad(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
            return 0n;
          }
        }
        function td(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function xe(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Qe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
          var z = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y);
          } catch (C) {
            Z(z);
            if (C !== C + 0)
              throw C;
            W(1, 0);
          }
        }
        function le(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Me(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Hc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Mc(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function Re(a, b) {
          var c = Y();
          try {
            V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function dd(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
            return 0n;
          }
        }
        function Lc(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Zb(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Ld(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function fd(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function wd(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function od(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function zd(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Wd(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function qc(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Od(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Uc(a, b) {
          var c = Y();
          try {
            return V(a)(b);
          } catch (d) {
            Z(c);
            if (d !== d + 0)
              throw d;
            W(1, 0);
          }
        }
        function rc(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function Le(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Fc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Md(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Nc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function ge(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Ye(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C) {
          var D = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C);
          } catch (F) {
            Z(D);
            if (F !== F + 0)
              throw F;
            W(1, 0);
          }
        }
        function Dd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Cd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
          var z = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y);
          } catch (C) {
            Z(z);
            if (C !== C + 0)
              throw C;
            W(1, 0);
          }
        }
        function Ed(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function $e(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G) {
          var H = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G);
          } catch (S) {
            Z(H);
            if (S !== S + 0)
              throw S;
            W(1, 0);
          }
        }
        function Xe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D) {
          var F = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D);
          } catch (G) {
            Z(F);
            if (G !== G + 0)
              throw G;
            W(1, 0);
          }
        }
        function We(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Ze(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function Je(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Ge(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Pe(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function Ve(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Ue(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Vb(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function pd(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Yc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
            return 0n;
          }
        }
        function zc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Ke(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function oe(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function ee(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Dc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function be(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function ie(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Ae(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Vc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function fe(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Ne(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function de(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function Zd(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Fe(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Kd(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function qe(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function Kc(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Qd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function $d(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function Xd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w) {
          var y = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w);
          } catch (z) {
            Z(y);
            if (z !== z + 0)
              throw z;
            W(1, 0);
          }
        }
        function jd(a, b, c) {
          var d = Y();
          try {
            V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function Fd(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function ce(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G, H, S, ff, gf, hf) {
          var jf = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G, H, S, ff, gf, hf);
          } catch (Ga) {
            Z(jf);
            if (Ga !== Ga + 0)
              throw Ga;
            W(1, 0);
          }
        }
        function ze(a, b, c, d, e, f) {
          var g = Y();
          try {
            V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function tc(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Nd(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function qd(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Vd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G) {
          var H = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F, G);
          } catch (S) {
            Z(H);
            if (S !== S + 0)
              throw S;
            W(1, 0);
          }
        }
        function cc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function Ad(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function He(a, b, c, d, e, f, g, h, k, m, n, u, v, l) {
          var w = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l);
          } catch (y) {
            Z(w);
            if (y !== y + 0)
              throw y;
            W(1, 0);
          }
        }
        function je(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Sd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z) {
          var C = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z);
          } catch (D) {
            Z(C);
            if (D !== D + 0)
              throw D;
            W(1, 0);
          }
        }
        function Ud(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function Td(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D) {
          var F = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D);
          } catch (G) {
            Z(F);
            if (G !== G + 0)
              throw G;
            W(1, 0);
          }
        }
        function Yd(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function oc(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function sc(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F) {
          var G = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y, z, C, D, F);
          } catch (H) {
            Z(G);
            if (H !== H + 0)
              throw H;
            W(1, 0);
          }
        }
        function ud(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Jd(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Rc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function cd(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
            return 0n;
          }
        }
        function he(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Sc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function ke(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Wc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function re(a, b, c, d, e, f, g, h, k) {
          var m = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            Z(m);
            if (n !== n + 0)
              throw n;
            W(1, 0);
          }
        }
        function nd(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Bc(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function Ee(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function gc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Ic(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function uc(a, b, c, d, e, f, g, h, k, m, n, u) {
          var v = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u);
          } catch (l) {
            Z(v);
            if (l !== l + 0)
              throw l;
            W(1, 0);
          }
        }
        function Ec(a, b, c, d, e, f, g, h) {
          var k = Y();
          try {
            return V(a)(b, c, d, e, f, g, h);
          } catch (m) {
            Z(k);
            if (m !== m + 0)
              throw m;
            W(1, 0);
          }
        }
        function xc(a, b, c, d, e, f, g, h, k, m, n) {
          var u = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n);
          } catch (v) {
            Z(u);
            if (v !== v + 0)
              throw v;
            W(1, 0);
          }
        }
        function Jc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function wc(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            return V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Qc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Tc(a, b, c, d, e, f, g) {
          var h = Y();
          try {
            return V(a)(b, c, d, e, f, g);
          } catch (k) {
            Z(h);
            if (k !== k + 0)
              throw k;
            W(1, 0);
          }
        }
        function Pc(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function ne(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function we(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function bc(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function ec(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function hd(a, b, c, d) {
          var e = Y();
          try {
            V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Yb(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Se(a, b, c, d, e) {
          var f = Y();
          try {
            V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function bd(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
            return 0n;
          }
        }
        function Ub(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Oe(a, b, c, d, e, f, g, h, k, m, n, u, v) {
          var l = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v);
          } catch (w) {
            Z(l);
            if (w !== w + 0)
              throw w;
            W(1, 0);
          }
        }
        function Be(a, b, c, d, e, f, g, h, k, m) {
          var n = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m);
          } catch (u) {
            Z(n);
            if (u !== u + 0)
              throw u;
            W(1, 0);
          }
        }
        function Tb(a, b, c, d) {
          var e = Y();
          try {
            return V(a)(b, c, d);
          } catch (f) {
            Z(e);
            if (f !== f + 0)
              throw f;
            W(1, 0);
          }
        }
        function Cc(a, b, c, d, e) {
          var f = Y();
          try {
            return V(a)(b, c, d, e);
          } catch (g) {
            Z(f);
            if (g !== g + 0)
              throw g;
            W(1, 0);
          }
        }
        function Xc(a) {
          var b = Y();
          try {
            return V(a)();
          } catch (c) {
            Z(b);
            if (c !== c + 0)
              throw c;
            W(1, 0);
            return 0n;
          }
        }
        function yc(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function ic(a, b, c, d, e, f) {
          var g = Y();
          try {
            return V(a)(b, c, d, e, f);
          } catch (h) {
            Z(g);
            if (h !== h + 0)
              throw h;
            W(1, 0);
          }
        }
        function Rd(a, b, c, d, e, f, g, h, k, m, n, u, v, l, w, y) {
          var z = Y();
          try {
            V(a)(b, c, d, e, f, g, h, k, m, n, u, v, l, w, y);
          } catch (C) {
            Z(z);
            if (C !== C + 0)
              throw C;
            W(1, 0);
          }
        }
        function Xb(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function Sb(a, b, c) {
          var d = Y();
          try {
            return V(a)(b, c);
          } catch (e) {
            Z(d);
            if (e !== e + 0)
              throw e;
            W(1, 0);
          }
        }
        function bf() {
          var a = X;
          a = Object.assign({}, a);
          var b = (d) => () => d() >>> 0, c = (d) => (e) => d(e) >>> 0;
          a.__errno_location = b(a.__errno_location);
          a._d = c(a._d);
          a.ae = c(a.ae);
          a.fe = b(a.fe);
          a.he = c(a.he);
          return a;
        }
        p.stackAlloc = cf;
        p.stackSave = Y;
        p.stackRestore = Z;
        p.UTF8ToString = Qa;
        p.stringToUTF8 = (a, b, c) => Sa(a, A, b, c);
        p.lengthBytesUTF8 = Ra;
        var df;
        K = function ef() {
          df || kf();
          df || (K = ef);
        };
        function kf() {
          if (!(0 < J)) {
            for (; 0 < va.length; )
              va.shift()(p);
            if (!(0 < J || df || (df = true, p.calledRun = true, oa))) {
              for (; 0 < wa.length; )
                wa.shift()(p);
              for (aa(p); 0 < xa.length; )
                xa.shift()(p);
            }
          }
        }
        kf();
        return moduleArg.ready;
      };
    })();
    if (typeof exports === "object" && typeof module === "object")
      module.exports = ortWasm;
    else if (typeof define === "function" && define["amd"])
      define([], () => ortWasm);
  }
});

// nodejs-ignore:worker_threads
var require_worker_threads = __commonJS({
  "nodejs-ignore:worker_threads"() {
  }
});

// nodejs-ignore:perf_hooks
var require_perf_hooks = __commonJS({
  "nodejs-ignore:perf_hooks"() {
  }
});

// nodejs-ignore:os
var os_exports = {};
__export(os_exports, {
  cpus: () => cpus2
});
var cpus2;
var init_os = __esm({
  "nodejs-ignore:os"() {
    cpus2 = void 0;
  }
});

// web/lib/wasm/binding/ort-wasm-threaded.js
var require_ort_wasm_threaded = __commonJS({
  "web/lib/wasm/binding/ort-wasm-threaded.js"(exports, module) {
    "use strict";
    var ortWasmThreaded = (() => {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
      if (typeof __filename !== "undefined")
        _scriptDir = _scriptDir || __filename;
      return function(moduleArg = {}) {
        function p() {
          q.buffer != r.buffer && t();
          return r;
        }
        function x() {
          q.buffer != r.buffer && t();
          return ba;
        }
        function ca() {
          q.buffer != r.buffer && t();
          return da;
        }
        function ea() {
          q.buffer != r.buffer && t();
          return fa;
        }
        function A() {
          q.buffer != r.buffer && t();
          return ha;
        }
        function B() {
          q.buffer != r.buffer && t();
          return ia;
        }
        function ja() {
          q.buffer != r.buffer && t();
          return ka;
        }
        var C = moduleArg, la, ma;
        C.ready = new Promise((a, b) => {
          la = a;
          ma = b;
        });
        var na = Object.assign({}, C), oa = "./this.program", pa = (a, b) => {
          throw b;
        }, qa = "object" == typeof window, ra = "function" == typeof importScripts, F = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, G = C.ENVIRONMENT_IS_PTHREAD || false, H = "";
        function sa(a) {
          return C.locateFile ? C.locateFile(a, H) : H + a;
        }
        var ta, ua, va;
        if (F) {
          var fs = (init_fs(), __toCommonJS(fs_exports)), wa = (init_path(), __toCommonJS(path_exports));
          H = ra ? wa.dirname(H) + "/" : __dirname + "/";
          ta = (b, c) => {
            b = b.startsWith("file://") ? new URL(b) : wa.normalize(b);
            return fs.readFileSync(b, c ? void 0 : "utf8");
          };
          va = (b) => {
            b = ta(b, true);
            b.buffer || (b = new Uint8Array(b));
            return b;
          };
          ua = (b, c, d, e = true) => {
            b = b.startsWith("file://") ? new URL(b) : wa.normalize(b);
            fs.readFile(b, e ? void 0 : "utf8", (f, g) => {
              f ? d(f) : c(e ? g.buffer : g);
            });
          };
          !C.thisProgram && 1 < process.argv.length && (oa = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          pa = (b, c) => {
            process.exitCode = b;
            throw c;
          };
          C.inspect = () => "[Emscripten Module object]";
          let a;
          try {
            a = require_worker_threads();
          } catch (b) {
            throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'), b;
          }
          global.Worker = a.Worker;
        } else if (qa || ra)
          ra ? H = self.location.href : "undefined" != typeof document && document.currentScript && (H = document.currentScript.src), typeof _scriptDir !== "undefined" && _scriptDir && (H = _scriptDir), 0 !== H.indexOf("blob:") ? H = H.substr(0, H.replace(/[?#].*/, "").lastIndexOf("/") + 1) : H = "", F || (ta = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.send(null);
            return b.responseText;
          }, ra && (va = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }), ua = (a, b, c) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, true);
            d.responseType = "arraybuffer";
            d.onload = () => {
              200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
            };
            d.onerror = c;
            d.send(null);
          });
        F && "undefined" == typeof performance && (global.performance = require_perf_hooks().performance);
        var xa = console.log.bind(console), ya = console.error.bind(console);
        F && (xa = (...a) => fs.writeSync(1, a.join(" ") + "\n"), ya = (...a) => fs.writeSync(2, a.join(" ") + "\n"));
        var za = xa, L = ya;
        Object.assign(C, na);
        na = null;
        var noExitRuntime = true;
        "object" != typeof WebAssembly && Aa("no native wasm support detected");
        var q, Ba, Ca = false, Da, r, ba, da, fa, ha, ia, Ea, Fa, Ga, ka;
        function t() {
          var a = q.buffer;
          C.HEAP8 = r = new Int8Array(a);
          C.HEAP16 = da = new Int16Array(a);
          C.HEAPU8 = ba = new Uint8Array(a);
          C.HEAPU16 = fa = new Uint16Array(a);
          C.HEAP32 = ha = new Int32Array(a);
          C.HEAPU32 = ia = new Uint32Array(a);
          C.HEAPF32 = Ea = new Float32Array(a);
          C.HEAPF64 = ka = new Float64Array(a);
          C.HEAP64 = Fa = new BigInt64Array(a);
          C.HEAPU64 = Ga = new BigUint64Array(a);
        }
        var Ha = 16777216;
        5242880 <= Ha || Aa("INITIAL_MEMORY should be larger than STACK_SIZE, was " + Ha + "! (STACK_SIZE=5242880)");
        if (G)
          q = C.wasmMemory;
        else if (q = new WebAssembly.Memory({ initial: Ha / 65536, maximum: 65536, shared: true }), !(q.buffer instanceof SharedArrayBuffer))
          throw L("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), F && L("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");
        t();
        Ha = q.buffer.byteLength;
        var Ia = [], Ja = [], Ka = [], La = 0;
        function Ma() {
          return noExitRuntime || 0 < La;
        }
        var Na = 0, Oa = null, Pa = null;
        function Qa() {
          Na--;
          if (0 == Na && (null !== Oa && (clearInterval(Oa), Oa = null), Pa)) {
            var a = Pa;
            Pa = null;
            a();
          }
        }
        function Aa(a) {
          a = "Aborted(" + a + ")";
          L(a);
          Ca = true;
          Da = 1;
          a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
          ma(a);
          throw a;
        }
        function Ra(a) {
          return a.startsWith("data:application/octet-stream;base64,");
        }
        var Sa;
        Sa = "ort-wasm-threaded.wasm";
        Ra(Sa) || (Sa = sa(Sa));
        function Ta(a) {
          if (va)
            return va(a);
          throw "both async and sync fetching of the wasm failed";
        }
        function Ua(a) {
          if (qa || ra) {
            if ("function" == typeof fetch && !a.startsWith("file://"))
              return fetch(a, { credentials: "same-origin" }).then((b) => {
                if (!b.ok)
                  throw "failed to load wasm binary file at '" + a + "'";
                return b.arrayBuffer();
              }).catch(() => Ta(a));
            if (ua)
              return new Promise((b, c) => {
                ua(a, (d) => b(new Uint8Array(d)), c);
              });
          }
          return Promise.resolve().then(() => Ta(a));
        }
        function Va(a, b, c) {
          return Ua(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
            L(`failed to asynchronously prepare wasm: ${d}`);
            Aa(d);
          });
        }
        function Wa(a, b) {
          var c = Sa;
          return "function" != typeof WebAssembly.instantiateStreaming || Ra(c) || c.startsWith("file://") || F || "function" != typeof fetch ? Va(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
            L(`wasm streaming compile failed: ${e}`);
            L("falling back to ArrayBuffer instantiation");
            return Va(c, a, b);
          }));
        }
        function Xa(a) {
          this.name = "ExitStatus";
          this.message = `Program terminated with exit(${a})`;
          this.status = a;
        }
        var Ya = (a) => {
          a.terminate();
          a.onmessage = () => {
          };
        }, Za = (a) => {
          if (0 == M.Qe.length) {
            var b = sa("ort-wasm-threaded.worker.js");
            b = new Worker(b);
            M.Qe.push(b);
            M.sf(M.Qe[0]);
          }
          b = M.Qe.pop();
          if (!b)
            return 6;
          M.Ne.push(b);
          M.Je[a.Me] = b;
          b.Me = a.Me;
          var c = { cmd: "run", start_routine: a.uf, arg: a.mf, pthread_ptr: a.Me };
          F && b.unref();
          b.postMessage(c, a.Af);
          return 0;
        }, $a = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, ab = (a, b, c) => {
          b >>>= 0;
          var d = b + c;
          for (c = b; a[c] && !(c >= d); )
            ++c;
          if (16 < c - b && a.buffer && $a)
            return $a.decode(a.buffer instanceof SharedArrayBuffer ? a.slice(b, c) : a.subarray(b, c));
          for (d = ""; b < c; ) {
            var e = a[b++];
            if (e & 128) {
              var f = a[b++] & 63;
              if (192 == (e & 224))
                d += String.fromCharCode((e & 31) << 6 | f);
              else {
                var g = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
              }
            } else
              d += String.fromCharCode(e);
          }
          return d;
        }, bb = (a, b) => (a >>>= 0) ? ab(x(), a, b) : "";
        function cb(a) {
          if (G)
            return N(0, 1, a);
          Da = a;
          Ma() || (M.vf(), Ca = true);
          pa(a, new Xa(a));
        }
        var eb = (a) => {
          Da = a;
          if (G)
            throw db(a), "unwind";
          cb(a);
        };
        function gb() {
          Ia.unshift(() => {
            Na++;
            Qa();
          });
        }
        var M = { Qe: [], Ne: [], ff: [], Je: {}, Xe() {
          G ? (M.receiveObjectTransfer = M.tf, M.threadInitTLS = M.ef, M.setExitStatus = M.bf, noExitRuntime = false) : gb();
        }, bf: (a) => {
          Da = a;
        }, Df: ["$terminateWorker"], vf: () => {
          for (var a of M.Ne)
            Ya(a);
          for (a of M.Qe)
            Ya(a);
          M.Qe = [];
          M.Ne = [];
          M.Je = [];
        }, af: (a) => {
          var b = a.Me;
          delete M.Je[b];
          M.Qe.push(a);
          M.Ne.splice(M.Ne.indexOf(a), 1);
          a.Me = 0;
          hb(b);
        }, tf() {
        }, ef() {
          M.ff.forEach((a) => a());
        }, sf: (a) => new Promise((b) => {
          a.onmessage = (f) => {
            f = f.data;
            var g = f.cmd;
            if (f.targetThread && f.targetThread != ib()) {
              var h = M.Je[f.targetThread];
              h ? h.postMessage(f, f.transferList) : L(`Internal error! Worker sent a message "${g}" to target pthread ${f.targetThread}, but that thread no longer exists!`);
            } else if ("checkMailbox" === g)
              jb();
            else if ("spawnThread" === g)
              Za(f);
            else if ("cleanupThread" === g)
              (f = M.Je[f.thread]) || Aa(), M.af(f);
            else if ("killThread" === g)
              f = f.thread, g = M.Je[f], delete M.Je[f], Ya(g), hb(f), M.Ne.splice(M.Ne.indexOf(g), 1), g.Me = 0;
            else if ("cancelThread" === g)
              M.Je[f.thread].postMessage({ cmd: "cancel" });
            else if ("loaded" === g)
              a.loaded = true, b(a);
            else if ("alert" === g)
              alert(`Thread ${f.threadId}: ${f.text}`);
            else if ("setimmediate" === f.target)
              a.postMessage(f);
            else if ("callHandler" === g)
              C[f.handler](...f.args);
            else
              g && L(`worker sent an unknown command ${g}`);
          };
          a.onerror = (f) => {
            L(`${"worker sent an error!"} ${f.filename}:${f.lineno}: ${f.message}`);
            throw f;
          };
          F && (a.on("message", (f) => a.onmessage({ data: f })), a.on("error", (f) => a.onerror(f)));
          var c = [], d = [], e;
          for (e of d)
            C.hasOwnProperty(e) && c.push(e);
          a.postMessage({
            cmd: "load",
            handlers: c,
            urlOrBlob: C.mainScriptUrlOrBlob || _scriptDir,
            wasmMemory: q,
            wasmModule: Ba
          });
        }) };
        C.PThread = M;
        var kb = (a) => {
          for (; 0 < a.length; )
            a.shift()(C);
        };
        C.establishStackSpace = () => {
          var a = ib(), b = B()[a + 52 >>> 2 >>> 0];
          a = B()[a + 56 >>> 2 >>> 0];
          lb(b, b - a);
          O(b);
        };
        function db(a) {
          if (G)
            return N(1, 0, a);
          eb(a);
        }
        var mb = [], nb, P = (a) => {
          var b = mb[a];
          b || (a >= mb.length && (mb.length = a + 1), mb[a] = b = nb.get(a));
          return b;
        };
        C.invokeEntryPoint = (a, b) => {
          a = P(a)(b);
          Ma() ? M.bf(a) : ob(a);
        };
        var pb = [], qb = 0, Q = 0;
        function rb(a) {
          this.Se = a;
          this.Ie = a - 24;
          this.lf = function(b) {
            B()[this.Ie + 4 >>> 2 >>> 0] = b;
          };
          this.Te = function() {
            return B()[this.Ie + 4 >>> 2 >>> 0];
          };
          this.kf = function(b) {
            B()[this.Ie + 8 >>> 2 >>> 0] = b;
          };
          this.cf = function(b) {
            b = b ? 1 : 0;
            p()[this.Ie + 12 >>> 0 >>> 0] = b;
          };
          this.hf = function() {
            return 0 != p()[this.Ie + 12 >>> 0 >>> 0];
          };
          this.df = function(b) {
            b = b ? 1 : 0;
            p()[this.Ie + 13 >>> 0 >>> 0] = b;
          };
          this.pf = function() {
            return 0 != p()[this.Ie + 13 >>> 0 >>> 0];
          };
          this.Xe = function(b, c) {
            this.Ue(0);
            this.lf(b);
            this.kf(c);
          };
          this.Ue = function(b) {
            B()[this.Ie + 16 >>> 2 >>> 0] = b;
          };
          this.gf = function() {
            return B()[this.Ie + 16 >>> 2 >>> 0];
          };
          this.jf = function() {
            if (sb(this.Te()))
              return B()[this.Se >>> 2 >>> 0];
            var b = this.gf();
            return 0 !== b ? b : this.Se;
          };
        }
        var vb = (a) => {
          var b = Q;
          if (!b)
            return tb(0), 0;
          var c = new rb(b);
          c.Ue(b);
          var d = c.Te();
          if (!d)
            return tb(0), b;
          for (var e in a) {
            var f = a[e];
            if (0 === f || f === d)
              break;
            if (ub(f, d, c.Ie + 16))
              return tb(f), b;
          }
          tb(d);
          return b;
        };
        function wb(a, b, c, d) {
          return G ? N(2, 1, a, b, c, d) : xb(a, b, c, d);
        }
        function xb(a, b, c, d) {
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          if ("undefined" == typeof SharedArrayBuffer)
            return L("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
          var e = [];
          if (G && 0 === e.length)
            return wb(a, b, c, d);
          a = { uf: c, Me: a, mf: d, Af: e };
          return G ? (a.Cf = "spawnThread", postMessage(a, e), 0) : Za(a);
        }
        function yb(a, b, c) {
          return G ? N(3, 1, a, b, c) : 0;
        }
        function zb(a, b) {
          if (G)
            return N(4, 1, a, b);
        }
        var Ab = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, Bb = (a, b, c, d) => {
          c >>>= 0;
          if (!(0 < d))
            return 0;
          var e = c;
          d = c + d - 1;
          for (var f = 0; f < a.length; ++f) {
            var g = a.charCodeAt(f);
            if (55296 <= g && 57343 >= g) {
              var h = a.charCodeAt(++f);
              g = 65536 + ((g & 1023) << 10) | h & 1023;
            }
            if (127 >= g) {
              if (c >= d)
                break;
              b[c++ >>> 0] = g;
            } else {
              if (2047 >= g) {
                if (c + 1 >= d)
                  break;
                b[c++ >>> 0] = 192 | g >> 6;
              } else {
                if (65535 >= g) {
                  if (c + 2 >= d)
                    break;
                  b[c++ >>> 0] = 224 | g >> 12;
                } else {
                  if (c + 3 >= d)
                    break;
                  b[c++ >>> 0] = 240 | g >> 18;
                  b[c++ >>> 0] = 128 | g >> 12 & 63;
                }
                b[c++ >>> 0] = 128 | g >> 6 & 63;
              }
              b[c++ >>> 0] = 128 | g & 63;
            }
          }
          b[c >>> 0] = 0;
          return c - e;
        }, Cb = (a, b, c) => Bb(a, x(), b, c);
        function Db(a, b) {
          if (G)
            return N(5, 1, a, b);
        }
        function Eb(a, b, c) {
          if (G)
            return N(6, 1, a, b, c);
        }
        function Fb(a, b, c) {
          return G ? N(7, 1, a, b, c) : 0;
        }
        function Gb(a, b) {
          if (G)
            return N(8, 1, a, b);
        }
        function Hb(a, b, c) {
          if (G)
            return N(9, 1, a, b, c);
        }
        function Ib(a, b, c, d) {
          if (G)
            return N(10, 1, a, b, c, d);
        }
        function Jb(a, b, c, d) {
          if (G)
            return N(11, 1, a, b, c, d);
        }
        function Kb(a, b, c, d) {
          if (G)
            return N(12, 1, a, b, c, d);
        }
        function Lb(a) {
          if (G)
            return N(13, 1, a);
        }
        function Mb(a, b) {
          if (G)
            return N(14, 1, a, b);
        }
        function Nb(a, b, c) {
          if (G)
            return N(15, 1, a, b, c);
        }
        var Ob = (a) => {
          if (null === a)
            return "null";
          var b = typeof a;
          return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
        }, Pb, R = (a) => {
          for (var b = ""; x()[a >>> 0]; )
            b += Pb[x()[a++ >>> 0]];
          return b;
        }, Qb = {}, Rb = {}, Sb = {}, Tb;
        function Ub(a, b, c = {}) {
          var d = b.name;
          if (!a)
            throw new Tb(`type "${d}" must have a positive integer typeid pointer`);
          if (Rb.hasOwnProperty(a)) {
            if (c.qf)
              return;
            throw new Tb(`Cannot register type '${d}' twice`);
          }
          Rb[a] = b;
          delete Sb[a];
          Qb.hasOwnProperty(a) && (b = Qb[a], delete Qb[a], b.forEach((e) => e()));
        }
        function S(a, b, c = {}) {
          if (!("argPackAdvance" in b))
            throw new TypeError("registerType registeredInstance requires argPackAdvance");
          Ub(a, b, c);
        }
        var Vb = (a, b, c) => {
          switch (b) {
            case 1:
              return c ? (d) => p()[d >>> 0 >>> 0] : (d) => x()[d >>> 0 >>> 0];
            case 2:
              return c ? (d) => ca()[d >>> 1 >>> 0] : (d) => ea()[d >>> 1 >>> 0];
            case 4:
              return c ? (d) => A()[d >>> 2 >>> 0] : (d) => B()[d >>> 2 >>> 0];
            case 8:
              return c ? (d) => Fa[d >>> 3] : (d) => Ga[d >>> 3];
            default:
              throw new TypeError(`invalid integer width (${b}): ${a}`);
          }
        };
        function Wb() {
          this.Le = [void 0];
          this.Ze = [];
        }
        var T = new Wb();
        function Xb(a) {
          a >>>= 0;
          a >= T.Ie && 0 === --T.get(a).$e && T.Ue(a);
        }
        var U = (a) => {
          if (!a)
            throw new Tb("Cannot use deleted val. handle = " + a);
          return T.get(a).value;
        }, V = (a) => {
          switch (a) {
            case void 0:
              return 1;
            case null:
              return 2;
            case true:
              return 3;
            case false:
              return 4;
            default:
              return T.Te({ $e: 1, value: a });
          }
        };
        function Yb(a) {
          return this.fromWireType(A()[a >>> 2 >>> 0]);
        }
        var Zb = (a, b) => {
          switch (b) {
            case 4:
              return function(c) {
                var d = this.fromWireType;
                q.buffer != r.buffer && t();
                return d.call(this, Ea[c >>> 2 >>> 0]);
              };
            case 8:
              return function(c) {
                return this.fromWireType(ja()[c >>> 3 >>> 0]);
              };
            default:
              throw new TypeError(`invalid float width (${b}): ${a}`);
          }
        };
        function $b(a) {
          return this.fromWireType(B()[a >>> 2 >>> 0]);
        }
        var ac = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, bc = (a, b) => {
          var c = a >> 1;
          for (var d = c + b / 2; !(c >= d) && ea()[c >>> 0]; )
            ++c;
          c <<= 1;
          if (32 < c - a && ac)
            return ac.decode(x().slice(a, c));
          c = "";
          for (d = 0; !(d >= b / 2); ++d) {
            var e = ca()[a + 2 * d >>> 1 >>> 0];
            if (0 == e)
              break;
            c += String.fromCharCode(e);
          }
          return c;
        }, cc = (a, b, c) => {
          void 0 === c && (c = 2147483647);
          if (2 > c)
            return 0;
          c -= 2;
          var d = b;
          c = c < 2 * a.length ? c / 2 : a.length;
          for (var e = 0; e < c; ++e) {
            var f = a.charCodeAt(e);
            ca()[b >>> 1 >>> 0] = f;
            b += 2;
          }
          ca()[b >>> 1 >>> 0] = 0;
          return b - d;
        }, dc = (a) => 2 * a.length, ec = (a, b) => {
          for (var c = 0, d = ""; !(c >= b / 4); ) {
            var e = A()[a + 4 * c >>> 2 >>> 0];
            if (0 == e)
              break;
            ++c;
            65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
          }
          return d;
        }, fc = (a, b, c) => {
          b >>>= 0;
          void 0 === c && (c = 2147483647);
          if (4 > c)
            return 0;
          var d = b;
          c = d + c - 4;
          for (var e = 0; e < a.length; ++e) {
            var f = a.charCodeAt(e);
            if (55296 <= f && 57343 >= f) {
              var g = a.charCodeAt(++e);
              f = 65536 + ((f & 1023) << 10) | g & 1023;
            }
            A()[b >>> 2 >>> 0] = f;
            b += 4;
            if (b + 4 > c)
              break;
          }
          A()[b >>> 2 >>> 0] = 0;
          return b - d;
        }, gc = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            55296 <= d && 57343 >= d && ++c;
            b += 4;
          }
          return b;
        }, hc = (a) => {
          if (!Ca)
            try {
              if (a(), !Ma())
                try {
                  G ? ob(Da) : eb(Da);
                } catch (b) {
                  b instanceof Xa || "unwind" == b || pa(1, b);
                }
            } catch (b) {
              b instanceof Xa || "unwind" == b || pa(1, b);
            }
        };
        function ic(a) {
          a >>>= 0;
          "function" === typeof Atomics.Bf && (Atomics.Bf(A(), a >>> 2, a).value.then(jb), a += 128, Atomics.store(A(), a >>> 2, 1));
        }
        C.__emscripten_thread_mailbox_await = ic;
        var jb = () => {
          var a = ib();
          a && (ic(a), hc(() => jc()));
        };
        C.checkMailbox = jb;
        var kc = (a) => {
          var b = W();
          a = a();
          O(b);
          return a;
        };
        function N(a, b) {
          var c = arguments.length - 2, d = arguments;
          return kc(() => {
            for (var e = 2 * c, f = lc(8 * e), g = f >>> 3, h = 0; h < c; h++) {
              var k = d[2 + h];
              "bigint" == typeof k ? (Fa[g + 2 * h] = 1n, Fa[g + 2 * h + 1] = k) : (Fa[g + 2 * h] = 0n, ja()[g + 2 * h + 1 >>> 0] = k);
            }
            return mc(a, e, f, b);
          });
        }
        var nc = [], pc = (a, b) => {
          var c = Rb[a];
          if (void 0 === c)
            throw a = oc(a), c = R(a), X(a), new Tb(b + " has unknown type " + c);
          return c;
        }, qc = {}, rc = (a) => {
          var b = qc[a];
          return void 0 === b ? R(a) : b;
        }, sc = [], tc = () => "object" == typeof globalThis ? globalThis : Function("return this")(), uc = (a) => {
          var b = sc.length;
          sc.push(a);
          return b;
        }, vc = (a, b) => {
          for (var c = Array(a), d = 0; d < a; ++d)
            c[d] = pc(B()[b + 4 * d >>> 2 >>> 0], "parameter " + d);
          return c;
        }, wc = (a) => {
          if (void 0 === a)
            return "_unknown";
          a = a.replace(/[^a-zA-Z0-9_]/g, "$");
          var b = a.charCodeAt(0);
          return 48 <= b && 57 >= b ? `_${a}` : a;
        }, xc = {};
        function yc(a, b) {
          a = wc(a);
          return { [a]: function() {
            return b.apply(this, arguments);
          } }[a];
        }
        function zc(a) {
          var b = Function;
          if (!(b instanceof Function))
            throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
          var c = yc(b.name || "unknownFunctionName", function() {
          });
          c.prototype = b.prototype;
          c = new c();
          a = b.apply(c, a);
          return a instanceof Object ? a : c;
        }
        var Ac = (a) => {
          for (var b = "", c = 0; c < a; ++c)
            b += (0 !== c ? ", " : "") + "arg" + c;
          var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
          for (c = 0; c < a; ++c)
            d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
          return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n"))(pc, C, V, () => B());
        }, Bc = {}, Cc = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), Dc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Ec = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        function Fc(a, b, c, d, e, f, g) {
          return G ? N(16, 1, a, b, c, d, e, f, g) : -52;
        }
        function Gc(a, b, c, d, e, f) {
          if (G)
            return N(17, 1, a, b, c, d, e, f);
        }
        var Ic = (a) => {
          var b = Ab(a) + 1, c = Hc(b);
          c && Cb(a, c, b);
          return c;
        }, Jc = {}, Lc = () => {
          if (!Kc) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: oa || "./this.program" }, b;
            for (b in Jc)
              void 0 === Jc[b] ? delete a[b] : a[b] = Jc[b];
            var c = [];
            for (b in a)
              c.push(`${b}=${a[b]}`);
            Kc = c;
          }
          return Kc;
        }, Kc;
        function Mc(a, b) {
          if (G)
            return N(18, 1, a, b);
          a >>>= 0;
          b >>>= 0;
          var c = 0;
          Lc().forEach((d, e) => {
            var f = b + c;
            e = B()[a + 4 * e >>> 2 >>> 0] = f;
            for (f = 0; f < d.length; ++f)
              p()[e++ >>> 0 >>> 0] = d.charCodeAt(f);
            p()[e >>> 0 >>> 0] = 0;
            c += d.length + 1;
          });
          return 0;
        }
        function Nc(a, b) {
          if (G)
            return N(19, 1, a, b);
          a >>>= 0;
          b >>>= 0;
          var c = Lc();
          B()[a >>> 2 >>> 0] = c.length;
          var d = 0;
          c.forEach((e) => d += e.length + 1);
          B()[b >>> 2 >>> 0] = d;
          return 0;
        }
        function Oc(a) {
          return G ? N(20, 1, a) : 52;
        }
        function Pc(a, b, c, d) {
          return G ? N(21, 1, a, b, c, d) : 52;
        }
        function Qc(a, b, c, d) {
          return G ? N(22, 1, a, b, c, d) : 70;
        }
        var Rc = [null, [], []];
        function Sc(a, b, c, d) {
          if (G)
            return N(23, 1, a, b, c, d);
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          for (var e = 0, f = 0; f < c; f++) {
            var g = B()[b >>> 2 >>> 0], h = B()[b + 4 >>> 2 >>> 0];
            b += 8;
            for (var k = 0; k < h; k++) {
              var l = x()[g + k >>> 0], n = Rc[a];
              0 === l || 10 === l ? ((1 === a ? za : L)(ab(n, 0)), n.length = 0) : n.push(l);
            }
            e += h;
          }
          B()[d >>> 2 >>> 0] = e;
          return 0;
        }
        var Tc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Uc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function Vc(a) {
          var b = Array(Ab(a) + 1);
          Bb(a, b, 0, b.length);
          return b;
        }
        var Wc = (a, b) => {
          p().set(a, b >>> 0);
        };
        function Xc(a, b, c, d) {
          function e(m, w, y) {
            for (m = "number" == typeof m ? m.toString() : m || ""; m.length < w; )
              m = y[0] + m;
            return m;
          }
          function f(m, w) {
            return e(m, w, "0");
          }
          function g(m, w) {
            function y(D) {
              return 0 > D ? -1 : 0 < D ? 1 : 0;
            }
            var z;
            0 === (z = y(m.getFullYear() - w.getFullYear())) && 0 === (z = y(m.getMonth() - w.getMonth())) && (z = y(m.getDate() - w.getDate()));
            return z;
          }
          function h(m) {
            switch (m.getDay()) {
              case 0:
                return new Date(m.getFullYear() - 1, 11, 29);
              case 1:
                return m;
              case 2:
                return new Date(m.getFullYear(), 0, 3);
              case 3:
                return new Date(
                  m.getFullYear(),
                  0,
                  2
                );
              case 4:
                return new Date(m.getFullYear(), 0, 1);
              case 5:
                return new Date(m.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(m.getFullYear() - 1, 11, 30);
            }
          }
          function k(m) {
            var w = m.Oe;
            for (m = new Date(new Date(m.Pe + 1900, 0, 1).getTime()); 0 < w; ) {
              var y = m.getMonth(), z = (Cc(m.getFullYear()) ? Tc : Uc)[y];
              if (w > z - m.getDate())
                w -= z - m.getDate() + 1, m.setDate(1), 11 > y ? m.setMonth(y + 1) : (m.setMonth(0), m.setFullYear(m.getFullYear() + 1));
              else {
                m.setDate(m.getDate() + w);
                break;
              }
            }
            y = new Date(m.getFullYear() + 1, 0, 4);
            w = h(new Date(
              m.getFullYear(),
              0,
              4
            ));
            y = h(y);
            return 0 >= g(w, m) ? 0 >= g(y, m) ? m.getFullYear() + 1 : m.getFullYear() : m.getFullYear() - 1;
          }
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          var l = B()[d + 40 >>> 2 >>> 0];
          d = { yf: A()[d >>> 2 >>> 0], xf: A()[d + 4 >>> 2 >>> 0], Ve: A()[d + 8 >>> 2 >>> 0], Ye: A()[d + 12 >>> 2 >>> 0], We: A()[d + 16 >>> 2 >>> 0], Pe: A()[d + 20 >>> 2 >>> 0], Ke: A()[d + 24 >>> 2 >>> 0], Oe: A()[d + 28 >>> 2 >>> 0], Ef: A()[d + 32 >>> 2 >>> 0], wf: A()[d + 36 >>> 2 >>> 0], zf: l ? bb(l) : "" };
          c = bb(c);
          l = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
          };
          for (var n in l)
            c = c.replace(new RegExp(n, "g"), l[n]);
          var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), v = "January February March April May June July August September October November December".split(" ");
          l = { "%a": (m) => u[m.Ke].substring(0, 3), "%A": (m) => u[m.Ke], "%b": (m) => v[m.We].substring(0, 3), "%B": (m) => v[m.We], "%C": (m) => f((m.Pe + 1900) / 100 | 0, 2), "%d": (m) => f(m.Ye, 2), "%e": (m) => e(m.Ye, 2, " "), "%g": (m) => k(m).toString().substring(2), "%G": (m) => k(m), "%H": (m) => f(m.Ve, 2), "%I": (m) => {
            m = m.Ve;
            0 == m ? m = 12 : 12 < m && (m -= 12);
            return f(m, 2);
          }, "%j": (m) => {
            for (var w = 0, y = 0; y <= m.We - 1; w += (Cc(m.Pe + 1900) ? Tc : Uc)[y++])
              ;
            return f(m.Ye + w, 3);
          }, "%m": (m) => f(m.We + 1, 2), "%M": (m) => f(m.xf, 2), "%n": () => "\n", "%p": (m) => 0 <= m.Ve && 12 > m.Ve ? "AM" : "PM", "%S": (m) => f(m.yf, 2), "%t": () => "	", "%u": (m) => m.Ke || 7, "%U": (m) => f(Math.floor((m.Oe + 7 - m.Ke) / 7), 2), "%V": (m) => {
            var w = Math.floor((m.Oe + 7 - (m.Ke + 6) % 7) / 7);
            2 >= (m.Ke + 371 - m.Oe - 2) % 7 && w++;
            if (w)
              53 == w && (y = (m.Ke + 371 - m.Oe) % 7, 4 == y || 3 == y && Cc(m.Pe) || (w = 1));
            else {
              w = 52;
              var y = (m.Ke + 7 - m.Oe - 1) % 7;
              (4 == y || 5 == y && Cc(m.Pe % 400 - 1)) && w++;
            }
            return f(w, 2);
          }, "%w": (m) => m.Ke, "%W": (m) => f(Math.floor((m.Oe + 7 - (m.Ke + 6) % 7) / 7), 2), "%y": (m) => (m.Pe + 1900).toString().substring(2), "%Y": (m) => m.Pe + 1900, "%z": (m) => {
            m = m.wf;
            var w = 0 <= m;
            m = Math.abs(m) / 60;
            return (w ? "+" : "-") + String("0000" + (m / 60 * 100 + m % 60)).slice(-4);
          }, "%Z": (m) => m.zf, "%%": () => "%" };
          c = c.replace(/%%/g, "\0\0");
          for (n in l)
            c.includes(n) && (c = c.replace(new RegExp(n, "g"), l[n](d)));
          c = c.replace(/\0\0/g, "%");
          n = Vc(c);
          if (n.length > b)
            return 0;
          Wc(n, a);
          return n.length - 1;
        }
        M.Xe();
        for (var Yc = Array(256), Zc = 0; 256 > Zc; ++Zc)
          Yc[Zc] = String.fromCharCode(Zc);
        Pb = Yc;
        Tb = C.BindingError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "BindingError";
          }
        };
        C.InternalError = class extends Error {
          constructor(a) {
            super(a);
            this.name = "InternalError";
          }
        };
        Object.assign(Wb.prototype, { get(a) {
          return this.Le[a];
        }, has(a) {
          return void 0 !== this.Le[a];
        }, Te(a) {
          var b = this.Ze.pop() || this.Le.length;
          this.Le[b] = a;
          return b;
        }, Ue(a) {
          this.Le[a] = void 0;
          this.Ze.push(a);
        } });
        T.Le.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
        T.Ie = T.Le.length;
        C.count_emval_handles = () => {
          for (var a = 0, b = T.Ie; b < T.Le.length; ++b)
            void 0 !== T.Le[b] && ++a;
          return a;
        };
        var $c = [cb, db, wb, yb, zb, Db, Eb, Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Fc, Gc, Mc, Nc, Oc, Pc, Qc, Sc], rg = {
          u: function(a) {
            a = new rb(a >>> 0);
            a.hf() || (a.cf(true), qb--);
            a.df(false);
            pb.push(a);
            ad(a.Se);
            return a.jf();
          },
          M: () => {
            Y(0, 0);
            var a = pb.pop();
            bd(a.Se);
            Q = 0;
          },
          b: function() {
            return vb([]);
          },
          n: function(a) {
            return vb([a >>> 0]);
          },
          y: function(a, b) {
            return vb([a >>> 0, b >>> 0]);
          },
          q: function(a, b, c) {
            return vb([a >>> 0, b >>> 0, c >>> 0]);
          },
          zb: () => {
            var a = pb.pop();
            a || Aa("no exception to throw");
            var b = a.Se;
            a.pf() || (pb.push(a), a.df(true), a.cf(false), qb++);
            Q = b;
            throw Q;
          },
          t: function(a, b, c) {
            a >>>= 0;
            new rb(a).Xe(b >>> 0, c >>> 0);
            Q = a;
            qb++;
            throw Q;
          },
          Sa: () => qb,
          Wc: function(a) {
            cd(a >>> 0, !ra, 1, !qa, 131072, false);
            M.ef();
          },
          Ub: function(a) {
            a >>>= 0;
            G ? postMessage({ cmd: "cleanupThread", thread: a }) : ((a = M.Je[a]) || Aa(), M.af(a));
          },
          Mc: xb,
          i: function(a) {
            Q || (Q = a >>> 0);
            throw Q;
          },
          Ab: yb,
          ad: zb,
          Hc: Db,
          Jc: Eb,
          Ac: Fb,
          _c: Gb,
          Tc: Hb,
          Zc: Ib,
          Wb: Jb,
          Ic: Kb,
          Fc: Lb,
          $c: Mb,
          Gc: Nb,
          Zb: function(a, b, c, d, e) {
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            b = R(b);
            var f = -1 != b.indexOf("u");
            f && (e = (1n << 64n) - 1n);
            S(a, { name: b, fromWireType: (g) => g, toWireType: function(g, h) {
              if ("bigint" != typeof h && "number" != typeof h)
                throw new TypeError(`Cannot convert "${Ob(h)}" to ${this.name}`);
              if (h < d || h > e)
                throw new TypeError(`Passing a number "${Ob(h)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
              return h;
            }, argPackAdvance: 8, readValueFromPointer: Vb(b, c, !f), Re: null });
          },
          hd: function(a, b, c, d) {
            a >>>= 0;
            b = R(b >>> 0);
            S(a, { name: b, fromWireType: function(e) {
              return !!e;
            }, toWireType: function(e, f) {
              return f ? c : d;
            }, argPackAdvance: 8, readValueFromPointer: function(e) {
              return this.fromWireType(x()[e >>> 0]);
            }, Re: null });
          },
          ed: function(a, b) {
            a >>>= 0;
            b = R(b >>> 0);
            S(a, { name: b, fromWireType: (c) => {
              var d = U(c);
              Xb(c);
              return d;
            }, toWireType: (c, d) => V(d), argPackAdvance: 8, readValueFromPointer: Yb, Re: null });
          },
          Yb: function(a, b, c) {
            a >>>= 0;
            c >>>= 0;
            b = R(b >>> 0);
            S(a, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: Zb(b, c), Re: null });
          },
          wa: function(a, b, c, d, e) {
            a >>>= 0;
            c >>>= 0;
            b = R(b >>> 0);
            -1 === e && (e = 4294967295);
            e = (h) => h;
            if (0 === d) {
              var f = 32 - 8 * c;
              e = (h) => h << f >>> f;
            }
            var g = b.includes("unsigned") ? function(h, k) {
              return k >>> 0;
            } : function(h, k) {
              return k;
            };
            S(a, { name: b, fromWireType: e, toWireType: g, argPackAdvance: 8, readValueFromPointer: Vb(b, c, 0 !== d), Re: null });
          },
          _: function(a, b, c) {
            function d(f) {
              var g = B()[f >>> 2 >>> 0];
              f = B()[f + 4 >>> 2 >>> 0];
              return new e(p().buffer, f, g);
            }
            a >>>= 0;
            var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
            c = R(c >>> 0);
            S(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { qf: true });
          },
          _b: function(a, b) {
            a >>>= 0;
            b = R(b >>> 0);
            var c = "std::string" === b;
            S(a, { name: b, fromWireType: function(d) {
              var e = B()[d >>> 2 >>> 0], f = d + 4;
              if (c)
                for (var g = f, h = 0; h <= e; ++h) {
                  var k = f + h;
                  if (h == e || 0 == x()[k >>> 0]) {
                    g = bb(g, k - g);
                    if (void 0 === l)
                      var l = g;
                    else
                      l += String.fromCharCode(0), l += g;
                    g = k + 1;
                  }
                }
              else {
                l = Array(e);
                for (h = 0; h < e; ++h)
                  l[h] = String.fromCharCode(x()[f + h >>> 0]);
                l = l.join("");
              }
              X(d);
              return l;
            }, toWireType: function(d, e) {
              e instanceof ArrayBuffer && (e = new Uint8Array(e));
              var f = "string" == typeof e;
              if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array))
                throw new Tb("Cannot pass non-string to std::string");
              var g = c && f ? Ab(e) : e.length;
              var h = Hc(4 + g + 1), k = h + 4;
              B()[h >>> 2 >>> 0] = g;
              if (c && f)
                Cb(e, k, g + 1);
              else if (f)
                for (f = 0; f < g; ++f) {
                  var l = e.charCodeAt(f);
                  if (255 < l)
                    throw X(k), new Tb("String has UTF-16 code units that do not fit in 8 bits");
                  x()[k + f >>> 0] = l;
                }
              else
                for (f = 0; f < g; ++f)
                  x()[k + f >>> 0] = e[f];
              null !== d && d.push(X, h);
              return h;
            }, argPackAdvance: 8, readValueFromPointer: $b, Re(d) {
              X(d);
            } });
          },
          Cb: function(a, b, c) {
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            c = R(c);
            if (2 === b) {
              var d = bc;
              var e = cc;
              var f = dc;
              var g = () => ea();
              var h = 1;
            } else
              4 === b && (d = ec, e = fc, f = gc, g = () => B(), h = 2);
            S(a, { name: c, fromWireType: (k) => {
              for (var l = B()[k >>> 2 >>> 0], n = g(), u, v = k + 4, m = 0; m <= l; ++m) {
                var w = k + 4 + m * b;
                if (m == l || 0 == n[w >>> h])
                  v = d(v, w - v), void 0 === u ? u = v : (u += String.fromCharCode(0), u += v), v = w + b;
              }
              X(k);
              return u;
            }, toWireType: (k, l) => {
              if ("string" != typeof l)
                throw new Tb(`Cannot pass non-string to C++ string type ${c}`);
              var n = f(l), u = Hc(4 + n + b);
              B()[u >>> 2] = n >> h;
              e(l, u + 4, n + b);
              null !== k && k.push(X, u);
              return u;
            }, argPackAdvance: 8, readValueFromPointer: Yb, Re(k) {
              X(k);
            } });
          },
          kd: function(a, b) {
            a >>>= 0;
            b = R(b >>> 0);
            S(a, {
              rf: true,
              name: b,
              argPackAdvance: 0,
              fromWireType: () => {
              },
              toWireType: () => {
              }
            });
          },
          dd: () => true,
          Dc: function(a, b) {
            a >>>= 0;
            a == b >>> 0 ? setTimeout(() => jb()) : G ? postMessage({ targetThread: a, cmd: "checkMailbox" }) : (a = M.Je[a]) && a.postMessage({ cmd: "checkMailbox" });
          },
          Nc: function(a, b, c, d) {
            b >>>= 0;
            c /= 2;
            nc.length = c;
            d = d >>> 0 >>> 3;
            for (var e = 0; e < c; e++)
              nc[e] = Fa[d + 2 * e] ? Fa[d + 2 * e + 1] : ja()[d + 2 * e + 1 >>> 0];
            a = $c[a];
            M.nf = b;
            b = a.apply(null, nc);
            M.nf = 0;
            return b;
          },
          Vc: ic,
          cd: function(a) {
            F && M.Je[a >>> 0].ref();
          },
          xd: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            a = U(a >>> 0);
            b = pc(b, "emval::as");
            var d = [], e = V(d);
            B()[c >>> 2 >>> 0] = e;
            return b.toWireType(d, a);
          },
          la: function(a, b, c, d, e) {
            c >>>= 0;
            d >>>= 0;
            e >>>= 0;
            a = sc[a >>> 0];
            b = U(b >>> 0);
            c = rc(c);
            var f = [];
            B()[d >>> 2 >>> 0] = V(f);
            return a(b, c, f, e);
          },
          Fd: function(a, b, c, d) {
            c >>>= 0;
            d >>>= 0;
            a = sc[a >>> 0];
            b = U(b >>> 0);
            c = rc(c);
            a(b, c, null, d);
          },
          zc: Xb,
          yd: function(a, b) {
            b >>>= 0;
            a = U(a >>> 0);
            b = U(b);
            return a == b;
          },
          Jd: function(a) {
            a >>>= 0;
            if (0 === a)
              return V(tc());
            a = rc(a);
            return V(tc()[a]);
          },
          ma: function(a, b) {
            var c = vc(a, b >>> 0), d = c[0];
            b = d.name + "_$" + c.slice(1).map(function(n) {
              return n.name;
            }).join("_") + "$";
            var e = xc[b];
            if (void 0 !== e)
              return e;
            e = ["retType"];
            for (var f = [d], g = "", h = 0; h < a - 1; ++h)
              g += (0 !== h ? ", " : "") + "arg" + h, e.push("argType" + h), f.push(c[1 + h]);
            var k = "return function " + wc("methodCaller_" + b) + "(handle, name, destructors, args) {\n", l = 0;
            for (h = 0; h < a - 1; ++h)
              k += "    var arg" + h + " = argType" + h + ".readValueFromPointer(args" + (l ? "+" + l : "") + ");\n", l += c[h + 1].argPackAdvance;
            k += "    var rv = handle[name](" + g + ");\n";
            for (h = 0; h < a - 1; ++h)
              c[h + 1].deleteObject && (k += "    argType" + h + ".deleteObject(arg" + h + ");\n");
            d.rf || (k += "    return retType.toWireType(destructors, rv);\n");
            e.push(k + "};\n");
            a = zc(e).apply(null, f);
            e = uc(a);
            return xc[b] = e;
          },
          Hd: function(a, b) {
            b >>>= 0;
            a = U(a >>> 0);
            b = U(b);
            return V(a[b]);
          },
          Q: function(a) {
            a >>>= 0;
            4 < a && (T.get(a).$e += 1);
          },
          Bd: function(a, b, c, d) {
            c >>>= 0;
            d >>>= 0;
            a = U(a >>> 0);
            var e = Bc[b];
            e || (e = Ac(b), Bc[b] = e);
            return e(a, c, d);
          },
          rd: function() {
            return V([]);
          },
          td: function(a) {
            a = U(a >>> 0);
            for (var b = Array(a.length), c = 0; c < a.length; c++)
              b[c] = a[c];
            return V(b);
          },
          X: function(a) {
            return V(rc(a >>> 0));
          },
          Ra: function() {
            return V({});
          },
          Cd: function(a) {
            a >>>= 0;
            for (var b = U(a); b.length; ) {
              var c = b.pop();
              b.pop()(c);
            }
            Xb(a);
          },
          Ad: function(a, b, c) {
            b >>>= 0;
            c >>>= 0;
            a = U(a >>> 0);
            b = U(b);
            c = U(c);
            a[b] = c;
          },
          bb: function(a, b) {
            b >>>= 0;
            a = pc(a >>> 0, "_emval_take_value");
            a = a.readValueFromPointer(b);
            return V(a);
          },
          Qc: function(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            b >>>= 0;
            a = new Date(1e3 * a);
            A()[b >>> 2 >>> 0] = a.getUTCSeconds();
            A()[b + 4 >>> 2 >>> 0] = a.getUTCMinutes();
            A()[b + 8 >>> 2 >>> 0] = a.getUTCHours();
            A()[b + 12 >>> 2 >>> 0] = a.getUTCDate();
            A()[b + 16 >>> 2 >>> 0] = a.getUTCMonth();
            A()[b + 20 >>> 2 >>> 0] = a.getUTCFullYear() - 1900;
            A()[b + 24 >>> 2 >>> 0] = a.getUTCDay();
            a = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
            A()[b + 28 >>> 2 >>> 0] = a;
          },
          Rc: function(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            b >>>= 0;
            a = new Date(1e3 * a);
            A()[b >>> 2 >>> 0] = a.getSeconds();
            A()[b + 4 >>> 2 >>> 0] = a.getMinutes();
            A()[b + 8 >>> 2 >>> 0] = a.getHours();
            A()[b + 12 >>> 2 >>> 0] = a.getDate();
            A()[b + 16 >>> 2 >>> 0] = a.getMonth();
            A()[b + 20 >>> 2 >>> 0] = a.getFullYear() - 1900;
            A()[b + 24 >>> 2 >>> 0] = a.getDay();
            var c = (Cc(a.getFullYear()) ? Dc : Ec)[a.getMonth()] + a.getDate() - 1 | 0;
            A()[b + 28 >>> 2 >>> 0] = c;
            A()[b + 36 >>> 2 >>> 0] = -(60 * a.getTimezoneOffset());
            c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
            A()[b + 32 >>> 2 >>> 0] = a;
          },
          Sc: function(a) {
            a >>>= 0;
            var b = new Date(A()[a + 20 >>> 2 >>> 0] + 1900, A()[a + 16 >>> 2 >>> 0], A()[a + 12 >>> 2 >>> 0], A()[a + 8 >>> 2 >>> 0], A()[a + 4 >>> 2 >>> 0], A()[a >>> 2 >>> 0], 0), c = A()[a + 32 >>> 2 >>> 0], d = b.getTimezoneOffset(), e = new Date(
              b.getFullYear(),
              6,
              1
            ).getTimezoneOffset(), f = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), g = Math.min(f, e);
            0 > c ? A()[a + 32 >>> 2 >>> 0] = Number(e != f && g == d) : 0 < c != (g == d) && (e = Math.max(f, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? g : e) - d)));
            A()[a + 24 >>> 2 >>> 0] = b.getDay();
            c = (Cc(b.getFullYear()) ? Dc : Ec)[b.getMonth()] + b.getDate() - 1 | 0;
            A()[a + 28 >>> 2 >>> 0] = c;
            A()[a >>> 2 >>> 0] = b.getSeconds();
            A()[a + 4 >>> 2 >>> 0] = b.getMinutes();
            A()[a + 8 >>> 2 >>> 0] = b.getHours();
            A()[a + 12 >>> 2 >>> 0] = b.getDate();
            A()[a + 16 >>> 2 >>> 0] = b.getMonth();
            A()[a + 20 >>> 2 >>> 0] = b.getYear();
            return BigInt(b.getTime() / 1e3);
          },
          Oc: Fc,
          Pc: Gc,
          Cc: function(a, b, c) {
            function d(l) {
              return (l = l.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? l[1] : "GMT";
            }
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            var e = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(e, 0, 1), g = new Date(e, 6, 1);
            e = f.getTimezoneOffset();
            var h = g.getTimezoneOffset(), k = Math.max(e, h);
            B()[a >>> 2 >>> 0] = 60 * k;
            A()[b >>> 2 >>> 0] = Number(e != h);
            a = d(f);
            b = d(g);
            a = Ic(a);
            b = Ic(b);
            h < e ? (B()[c >>> 2 >>> 0] = a, B()[c + 4 >>> 2 >>> 0] = b) : (B()[c >>> 2 >>> 0] = b, B()[c + 4 >>> 2 >>> 0] = a);
          },
          aa: () => {
            Aa("");
          },
          Vb: () => {
          },
          Xb: () => Date.now(),
          bd: () => {
            La += 1;
            throw "unwind";
          },
          Ec: function() {
            return 4294901760;
          },
          va: () => performance.timeOrigin + performance.now(),
          jb: () => F ? (init_os(), __toCommonJS(os_exports)).cpus().length : navigator.hardwareConcurrency,
          Bc: function(a) {
            a >>>= 0;
            var b = x().length;
            if (a <= b || 4294901760 < a)
              return false;
            for (var c = 1; 4 >= c; c *= 2) {
              var d = b * (1 + 0.2 / c);
              d = Math.min(d, a + 100663296);
              var e = Math;
              d = Math.max(a, d);
              a: {
                e = (e.min.call(e, 4294901760, d + (65536 - d % 65536) % 65536) - q.buffer.byteLength + 65535) / 65536;
                try {
                  q.grow(e);
                  t();
                  var f = 1;
                  break a;
                } catch (g) {
                }
                f = void 0;
              }
              if (f)
                return true;
            }
            return false;
          },
          Xc: Mc,
          Yc: Nc,
          Lc: eb,
          Bb: Oc,
          Tb: Pc,
          Uc: Qc,
          Sb: Sc,
          ib: dd,
          fd: ed,
          sa: fd,
          G: gd,
          pa: hd,
          ga: jd,
          gd: kd,
          nd: ld,
          N: md,
          z: nd,
          c: od,
          dc: pd,
          ya: qd,
          g: rd,
          Eb: sd,
          d: td,
          Y: ud,
          j: vd,
          id: wd,
          k: xd,
          r: yd,
          s: zd,
          p: Ad,
          Aa: Bd,
          Va: Cd,
          ia: Dd,
          Pb: Ed,
          $a: Fd,
          Ib: Gd,
          nb: Hd,
          ic: Id,
          xc: Jd,
          fc: Kd,
          gc: Ld,
          $b: Md,
          ka: Nd,
          yb: Od,
          Ba: Pd,
          Db: Qd,
          da: Rd,
          hc: Sd,
          Pa: Td,
          F: Ud,
          L: Vd,
          Gb: Wd,
          sd: Xd,
          oa: Yd,
          O: Zd,
          $: $d,
          V: ae,
          A: be,
          Fb: ce,
          ec: de,
          C: ee,
          Hb: fe,
          qd: ge,
          Qa: he,
          eb: ie,
          jc: je,
          ac: ke,
          Mb: le,
          P: me,
          H: ne,
          D: oe,
          ld: pe,
          lb: qe,
          R: re,
          e: se,
          Xa: te,
          l: ue,
          xa: ve,
          Wa: we,
          vb: xe,
          h: ye,
          yc: ze,
          ca: Ae,
          fb: Be,
          za: Ce,
          mb: De,
          gb: Ee,
          f: Fe,
          vc: Ge,
          ud: He,
          o: Ie,
          sc: Je,
          m: Ke,
          wc: Le,
          rc: Me,
          wd: Ne,
          w: Oe,
          Na: Pe,
          tb: Qe,
          Ma: Re,
          Kb: Se,
          B: Te,
          E: Ue,
          W: Ve,
          Ua: We,
          oc: Xe,
          Dd: Ye,
          ub: Ze,
          ua: $e,
          ja: af,
          S: bf,
          ab: cf,
          Ha: df,
          Gd: ef,
          kb: ff,
          Da: gf,
          lc: hf,
          Ca: jf,
          Ea: kf,
          jd: lf,
          Ed: mf,
          na: nf,
          vd: of,
          Ia: pf,
          Ga: qf,
          qc: rf,
          Fa: sf,
          Ja: tf,
          pb: uf,
          ha: vf,
          ta: wf,
          kc: xf,
          pc: yf,
          Jb: zf,
          Za: Af,
          fa: Bf,
          Rb: Cf,
          pd: Df,
          U: Ef,
          wb: Ff,
          db: Gf,
          Ta: Hf,
          hb: If,
          J: Jf,
          T: Kf,
          xb: Lf,
          od: Mf,
          uc: Nf,
          ba: Of,
          ob: Pf,
          ra: Qf,
          nc: Rf,
          bc: Sf,
          Id: Tf,
          x: Uf,
          cb: Vf,
          zd: Wf,
          Nb: Xf,
          mc: Yf,
          Kd: Zf,
          Ob: $f,
          Lb: ag,
          _a: bg,
          Qb: cg,
          Ka: dg,
          cc: eg,
          Z: fg,
          tc: gg,
          K: hg,
          md: ig,
          Ya: jg,
          qa: kg,
          I: lg,
          rb: mg,
          La: ng,
          Oa: og,
          qb: pg,
          sb: qg,
          v: function(a) {
            return a >>> 0;
          },
          a: q || C.wasmMemory,
          Kc: Xc,
          ea: function(a, b, c, d) {
            return Xc(a >>> 0, b >>> 0, c >>> 0, d >>> 0);
          }
        }, Z = function() {
          var a = { a: rg };
          Na++;
          Wa(a, function(b) {
            var c = b.module;
            Z = b.instance.exports;
            Z = sg();
            M.ff.push(Z.oe);
            nb = Z.re;
            Ja.unshift(Z.Ld);
            Ba = c;
            Qa();
          }).catch(ma);
          return {};
        }();
        C._OrtInit = (a, b) => (C._OrtInit = Z.Md)(a, b);
        C._OrtGetLastError = (a, b) => (C._OrtGetLastError = Z.Nd)(a, b);
        C._OrtCreateSessionOptions = (a, b, c, d, e, f, g, h, k, l) => (C._OrtCreateSessionOptions = Z.Od)(a, b, c, d, e, f, g, h, k, l);
        C._OrtAppendExecutionProvider = (a, b) => (C._OrtAppendExecutionProvider = Z.Pd)(a, b);
        C._OrtAddFreeDimensionOverride = (a, b, c) => (C._OrtAddFreeDimensionOverride = Z.Qd)(a, b, c);
        C._OrtAddSessionConfigEntry = (a, b, c) => (C._OrtAddSessionConfigEntry = Z.Rd)(a, b, c);
        C._OrtReleaseSessionOptions = (a) => (C._OrtReleaseSessionOptions = Z.Sd)(a);
        C._OrtCreateSession = (a, b, c) => (C._OrtCreateSession = Z.Td)(a, b, c);
        C._OrtReleaseSession = (a) => (C._OrtReleaseSession = Z.Ud)(a);
        C._OrtGetInputOutputCount = (a, b, c) => (C._OrtGetInputOutputCount = Z.Vd)(a, b, c);
        C._OrtGetInputName = (a, b) => (C._OrtGetInputName = Z.Wd)(a, b);
        C._OrtGetOutputName = (a, b) => (C._OrtGetOutputName = Z.Xd)(a, b);
        C._OrtFree = (a) => (C._OrtFree = Z.Yd)(a);
        C._OrtCreateTensor = (a, b, c, d, e, f) => (C._OrtCreateTensor = Z.Zd)(a, b, c, d, e, f);
        C._OrtGetTensorData = (a, b, c, d, e) => (C._OrtGetTensorData = Z._d)(a, b, c, d, e);
        C._OrtReleaseTensor = (a) => (C._OrtReleaseTensor = Z.$d)(a);
        C._OrtCreateRunOptions = (a, b, c, d) => (C._OrtCreateRunOptions = Z.ae)(a, b, c, d);
        C._OrtAddRunConfigEntry = (a, b, c) => (C._OrtAddRunConfigEntry = Z.be)(a, b, c);
        C._OrtReleaseRunOptions = (a) => (C._OrtReleaseRunOptions = Z.ce)(a);
        C._OrtCreateBinding = (a) => (C._OrtCreateBinding = Z.de)(a);
        C._OrtBindInput = (a, b, c) => (C._OrtBindInput = Z.ee)(a, b, c);
        C._OrtBindOutput = (a, b, c, d) => (C._OrtBindOutput = Z.fe)(a, b, c, d);
        C._OrtClearBoundOutputs = (a) => (C._OrtClearBoundOutputs = Z.ge)(a);
        C._OrtReleaseBinding = (a) => (C._OrtReleaseBinding = Z.he)(a);
        C._OrtRunWithBinding = (a, b, c, d, e) => (C._OrtRunWithBinding = Z.ie)(a, b, c, d, e);
        C._OrtRun = (a, b, c, d, e, f, g, h) => (C._OrtRun = Z.je)(a, b, c, d, e, f, g, h);
        C._OrtEndProfiling = (a) => (C._OrtEndProfiling = Z.ke)(a);
        var ib = C._pthread_self = () => (ib = C._pthread_self = Z.le)(), Hc = C._malloc = (a) => (Hc = C._malloc = Z.me)(a), X = C._free = (a) => (X = C._free = Z.ne)(a);
        C.__emscripten_tls_init = () => (C.__emscripten_tls_init = Z.oe)();
        var oc = (a) => (oc = Z.pe)(a);
        C.__embind_initialize_bindings = () => (C.__embind_initialize_bindings = Z.qe)();
        var cd = C.__emscripten_thread_init = (a, b, c, d, e, f) => (cd = C.__emscripten_thread_init = Z.se)(a, b, c, d, e, f);
        C.__emscripten_thread_crashed = () => (C.__emscripten_thread_crashed = Z.te)();
        var mc = (a, b, c, d) => (mc = Z.ue)(a, b, c, d), hb = (a) => (hb = Z.ve)(a), ob = C.__emscripten_thread_exit = (a) => (ob = C.__emscripten_thread_exit = Z.we)(a), jc = C.__emscripten_check_mailbox = () => (jc = C.__emscripten_check_mailbox = Z.xe)(), Y = (a, b) => (Y = Z.ye)(a, b), tb = (a) => (tb = Z.ze)(a), lb = (a, b) => (lb = Z.Ae)(a, b), W = () => (W = Z.Be)(), O = (a) => (O = Z.Ce)(a), lc = (a) => (lc = Z.De)(a), bd = (a) => (bd = Z.Ee)(a), ad = (a) => (ad = Z.Fe)(a), ub = (a, b, c) => (ub = Z.Ge)(a, b, c), sb = (a) => (sb = Z.He)(a);
        function td(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function rd(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function ye(a, b, c) {
          var d = W();
          try {
            P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function od(a, b) {
          var c = W();
          try {
            return P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
          }
        }
        function ue(a, b) {
          var c = W();
          try {
            P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
          }
        }
        function Ud(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function se(a) {
          var b = W();
          try {
            P(a)();
          } catch (c) {
            O(b);
            if (c !== c + 0)
              throw c;
            Y(1, 0);
          }
        }
        function yd(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function xd(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function vd(a, b, c, d, e) {
          var f = W();
          try {
            return P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function Fe(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function Ie(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function nd(a) {
          var b = W();
          try {
            return P(a)();
          } catch (c) {
            O(b);
            if (c !== c + 0)
              throw c;
            Y(1, 0);
          }
        }
        function be(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function Uf(a, b, c) {
          var d = W();
          try {
            P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function Ke(a, b, c, d, e, f) {
          var g = W();
          try {
            P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function zd(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            return P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function jd(a, b) {
          var c = W();
          try {
            return P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
          }
        }
        function me(a, b) {
          var c = W();
          try {
            return P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
            return 0n;
          }
        }
        function dd(a, b) {
          var c = W();
          try {
            return P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
          }
        }
        function Ad(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Jf(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function Oe(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Zf(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function Cf(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Te(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function Of(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function Bd(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function Ue(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Od(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function Lf(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Ve(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function ne(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
            return 0n;
          }
        }
        function ze(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function Jd(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Dd(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function cf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {
          var w = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);
          } catch (y) {
            O(w);
            if (y !== y + 0)
              throw y;
            Y(1, 0);
          }
        }
        function Tf(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function Ff(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function Kf(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function xe(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function If(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Ee(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Le(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function jg(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function oe(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
            return 0n;
          }
        }
        function Ge(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function ef(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {
          var D = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);
          } catch (E) {
            O(D);
            if (E !== E + 0)
              throw E;
            Y(1, 0);
          }
        }
        function Nf(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function gg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y) {
          var z = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y);
          } catch (D) {
            O(z);
            if (D !== D + 0)
              throw D;
            Y(1, 0);
          }
        }
        function Bf(a, b, c, d, e, f) {
          var g = W();
          try {
            P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function cg(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Vd(a, b, c, d, e) {
          var f = W();
          try {
            return P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function $d(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {
          var w = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);
          } catch (y) {
            O(w);
            if (y !== y + 0)
              throw y;
            Y(1, 0);
          }
        }
        function hg(a, b) {
          var c = W();
          try {
            P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
          }
        }
        function re(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
            return 0n;
          }
        }
        function Zd(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function md(a, b, c, d, e) {
          var f = W();
          try {
            return P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function Ze(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {
          var y = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);
          } catch (z) {
            O(y);
            if (z !== z + 0)
              throw z;
            Y(1, 0);
          }
        }
        function te(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function Je(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Be(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function Me(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function mf(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function Ed(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {
          var D = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);
          } catch (E) {
            O(D);
            if (E !== E + 0)
              throw E;
            Y(1, 0);
          }
        }
        function bf(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function he(a, b) {
          var c = W();
          try {
            return P(a)(b);
          } catch (d) {
            O(c);
            if (d !== d + 0)
              throw d;
            Y(1, 0);
          }
        }
        function Fd(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {
          var J = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);
          } catch (K) {
            O(J);
            if (K !== K + 0)
              throw K;
            Y(1, 0);
          }
        }
        function bg(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function Td(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function $e(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function ae(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function wf(a, b, c, d, e, f) {
          var g = W();
          try {
            P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Ye(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {
          var w = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);
          } catch (y) {
            O(w);
            if (y !== y + 0)
              throw y;
            Y(1, 0);
          }
        }
        function og(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D) {
          var E = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D);
          } catch (I) {
            O(E);
            if (I !== I + 0)
              throw I;
            Y(1, 0);
          }
        }
        function Qe(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {
          var D = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);
          } catch (E) {
            O(D);
            if (E !== E + 0)
              throw E;
            Y(1, 0);
          }
        }
        function Pe(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y) {
          var z = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y);
          } catch (D) {
            O(z);
            if (D !== D + 0)
              throw D;
            Y(1, 0);
          }
        }
        function Re(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {
          var y = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);
          } catch (z) {
            O(y);
            if (z !== z + 0)
              throw z;
            Y(1, 0);
          }
        }
        function qg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J) {
          var K = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J);
          } catch (aa) {
            O(K);
            if (aa !== aa + 0)
              throw aa;
            Y(1, 0);
          }
        }
        function ng(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E) {
          var I = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E);
          } catch (J) {
            O(I);
            if (J !== J + 0)
              throw J;
            Y(1, 0);
          }
        }
        function mg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {
          var D = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);
          } catch (E) {
            O(D);
            if (E !== E + 0)
              throw E;
            Y(1, 0);
          }
        }
        function pg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {
          var J = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);
          } catch (K) {
            O(J);
            if (K !== K + 0)
              throw K;
            Y(1, 0);
          }
        }
        function $f(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function Xf(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function fg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {
          var y = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);
          } catch (z) {
            O(y);
            if (z !== z + 0)
              throw z;
            Y(1, 0);
          }
        }
        function lg(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function kg(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function hd(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Ce(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function le(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
            return 0n;
          }
        }
        function Nd(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function ag(a, b, c, d, e, f) {
          var g = W();
          try {
            P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Ef(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function uf(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function Rd(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function rf(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function yf(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function Qf(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function ie(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function vf(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function dg(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function tf(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function pf(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function Wf(a, b, c, d, e, f) {
          var g = W();
          try {
            P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Xe(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function Gf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {
          var w = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);
          } catch (y) {
            O(w);
            if (y !== y + 0)
              throw y;
            Y(1, 0);
          }
        }
        function Yd(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            return P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function df(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {
          var y = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);
          } catch (z) {
            O(y);
            if (z !== z + 0)
              throw z;
            Y(1, 0);
          }
        }
        function qf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {
          var w = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);
          } catch (y) {
            O(w);
            if (y !== y + 0)
              throw y;
            Y(1, 0);
          }
        }
        function nf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {
          var y = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);
          } catch (z) {
            O(y);
            if (z !== z + 0)
              throw z;
            Y(1, 0);
          }
        }
        function we(a, b, c) {
          var d = W();
          try {
            P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function Rf(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Se(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function sf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J, K, aa, vg, wg, xg) {
          var yg = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J, K, aa, vg, wg, xg);
          } catch (fb) {
            O(yg);
            if (fb !== fb + 0)
              throw fb;
            Y(1, 0);
          }
        }
        function Pf(a, b, c, d, e, f) {
          var g = W();
          try {
            P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Hd(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function af(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function De(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function kf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J) {
          var K = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J);
          } catch (aa) {
            O(K);
            if (aa !== aa + 0)
              throw aa;
            Y(1, 0);
          }
        }
        function qd(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function Ne(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function Yf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {
          var w = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);
          } catch (y) {
            O(w);
            if (y !== y + 0)
              throw y;
            Y(1, 0);
          }
        }
        function zf(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function gf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {
          var D = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);
          } catch (E) {
            O(D);
            if (E !== E + 0)
              throw E;
            Y(1, 0);
          }
        }
        function jf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {
          var J = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);
          } catch (K) {
            O(J);
            if (K !== K + 0)
              throw K;
            Y(1, 0);
          }
        }
        function hf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E) {
          var I = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E);
          } catch (J) {
            O(I);
            if (J !== J + 0)
              throw J;
            Y(1, 0);
          }
        }
        function of(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function Cd(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function Gd(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {
          var J = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);
          } catch (K) {
            O(J);
            if (K !== K + 0)
              throw K;
            Y(1, 0);
          }
        }
        function He(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function We(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function ee(a, b, c, d, e) {
          var f = W();
          try {
            return P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function qe(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
            return 0n;
          }
        }
        function xf(a, b, c, d, e, f, g) {
          var h = W();
          try {
            P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function fe(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Af(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function je(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Hf(a, b, c, d, e, f, g, h, k) {
          var l = W();
          try {
            P(a)(b, c, d, e, f, g, h, k);
          } catch (n) {
            O(l);
            if (n !== n + 0)
              throw n;
            Y(1, 0);
          }
        }
        function Ae(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function Pd(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            return P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function Vf(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function ud(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Wd(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function Id(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function Sd(a, b, c, d, e, f, g, h) {
          var k = W();
          try {
            return P(a)(b, c, d, e, f, g, h);
          } catch (l) {
            O(k);
            if (l !== l + 0)
              throw l;
            Y(1, 0);
          }
        }
        function Ld(a, b, c, d, e, f, g, h, k, l, n) {
          var u = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n);
          } catch (v) {
            O(u);
            if (v !== v + 0)
              throw v;
            Y(1, 0);
          }
        }
        function Xd(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function Kd(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            return P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function de(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function ge(a, b, c, d, e, f, g) {
          var h = W();
          try {
            return P(a)(b, c, d, e, f, g);
          } catch (k) {
            O(h);
            if (k !== k + 0)
              throw k;
            Y(1, 0);
          }
        }
        function ce(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function Df(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function Mf(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function pd(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function sd(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function ve(a, b, c, d) {
          var e = W();
          try {
            P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function ld(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function ig(a, b, c, d, e) {
          var f = W();
          try {
            P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function pe(a, b, c, d, e) {
          var f = W();
          try {
            return P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
            return 0n;
          }
        }
        function gd(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function eg(a, b, c, d, e, f, g, h, k, l, n, u, v) {
          var m = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v);
          } catch (w) {
            O(m);
            if (w !== w + 0)
              throw w;
            Y(1, 0);
          }
        }
        function Sf(a, b, c, d, e, f, g, h, k, l) {
          var n = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l);
          } catch (u) {
            O(n);
            if (u !== u + 0)
              throw u;
            Y(1, 0);
          }
        }
        function fd(a, b, c, d) {
          var e = W();
          try {
            return P(a)(b, c, d);
          } catch (f) {
            O(e);
            if (f !== f + 0)
              throw f;
            Y(1, 0);
          }
        }
        function lf(a, b, c, d, e, f, g, h, k, l, n, u) {
          var v = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u);
          } catch (m) {
            O(v);
            if (m !== m + 0)
              throw m;
            Y(1, 0);
          }
        }
        function Qd(a, b, c, d, e) {
          var f = W();
          try {
            return P(a)(b, c, d, e);
          } catch (g) {
            O(f);
            if (g !== g + 0)
              throw g;
            Y(1, 0);
          }
        }
        function ke(a) {
          var b = W();
          try {
            return P(a)();
          } catch (c) {
            O(b);
            if (c !== c + 0)
              throw c;
            Y(1, 0);
            return 0n;
          }
        }
        function Md(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function wd(a, b, c, d, e, f) {
          var g = W();
          try {
            return P(a)(b, c, d, e, f);
          } catch (h) {
            O(g);
            if (h !== h + 0)
              throw h;
            Y(1, 0);
          }
        }
        function ff(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y) {
          var z = W();
          try {
            P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y);
          } catch (D) {
            O(z);
            if (D !== D + 0)
              throw D;
            Y(1, 0);
          }
        }
        function kd(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function ed(a, b, c) {
          var d = W();
          try {
            return P(a)(b, c);
          } catch (e) {
            O(d);
            if (e !== e + 0)
              throw e;
            Y(1, 0);
          }
        }
        function sg() {
          var a = Z;
          a = Object.assign({}, a);
          var b = (d) => () => d() >>> 0, c = (d) => (e) => d(e) >>> 0;
          a.__errno_location = b(a.__errno_location);
          a.le = b(a.le);
          a.me = c(a.me);
          a.pe = c(a.pe);
          a.Be = b(a.Be);
          a.De = c(a.De);
          return a;
        }
        C.keepRuntimeAlive = Ma;
        C.wasmMemory = q;
        C.stackAlloc = lc;
        C.stackSave = W;
        C.stackRestore = O;
        C.UTF8ToString = bb;
        C.stringToUTF8 = Cb;
        C.lengthBytesUTF8 = Ab;
        C.ExitStatus = Xa;
        C.PThread = M;
        var tg;
        Pa = function ug() {
          tg || zg();
          tg || (Pa = ug);
        };
        function zg() {
          0 < Na || (G ? (la(C), G || kb(Ja), startWorker(C)) : (kb(Ia), 0 < Na || tg || (tg = true, C.calledRun = true, Ca || (G || kb(Ja), la(C), G || kb(Ka)))));
        }
        zg();
        return moduleArg.ready;
      };
    })();
    if (typeof exports === "object" && typeof module === "object")
      module.exports = ortWasmThreaded;
    else if (typeof define === "function" && define["amd"])
      define([], () => ortWasmThreaded);
  }
});

// web/lib/wasm/binding/ort-wasm-threaded.worker.js
var require_ort_wasm_threaded_worker = __commonJS({
  "web/lib/wasm/binding/ort-wasm-threaded.worker.js"(exports, module) {
    module.exports = '"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:f=>(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f),postMessage:msg=>parentPort.postMessage(msg),performance:global.performance||{now:Date.now}})}var initializedJS=false;function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"\\n");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var module=Module["wasmModule"];Module["wasmModule"]=null;var instance=new WebAssembly.Instance(module,info);return receiveInstance(instance)};self.onunhandledrejection=e=>{throw e.reason||e};function handleMessage(e){try{if(e.data.cmd==="load"){let messageQueue=[];self.onmessage=e=>messageQueue.push(e);self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"});for(let msg of messageQueue){handleMessage(msg)}self.onmessage=handleMessage};Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=(...args)=>{postMessage({cmd:"callHandler",handler:handler,args:args})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,/*is_main=*/0,/*is_runtime=*/0,/*can_block=*/1);Module["__emscripten_thread_mailbox_await"](e.data.pthread_ptr);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){Module["__embind_initialize_bindings"]();initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){throw ex}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="checkMailbox"){if(initializedJS){Module["checkMailbox"]()}}else if(e.data.cmd){err(`worker.js received unknown command ${e.data.cmd}`);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}}self.onmessage=handleMessage;\n';
  }
});

// web/lib/wasm/wasm-factory.ts
var ortWasmFactory, ortWasmFactoryThreaded, wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, getWasmFileName, initializeWebAssembly, getInstance;
var init_wasm_factory = __esm({
  "web/lib/wasm/wasm-factory.ts"() {
    "use strict";
    init_node_path();
    if (false) {
      ortWasmFactory = null;
    } else {
      ortWasmFactory = true ? require_ort_wasm() : null;
    }
    ortWasmFactoryThreaded = true ? true ? require_ort_wasm_threaded() : null : ortWasmFactory;
    initialized = false;
    initializing = false;
    aborted = false;
    isMultiThreadSupported = () => {
      try {
        if (typeof SharedArrayBuffer === "undefined") {
          return false;
        }
        if (typeof MessageChannel !== "undefined") {
          new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
        }
        return WebAssembly.validate(new Uint8Array([
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
        ]));
      } catch (e) {
        return false;
      }
    };
    isSimdSupported = () => {
      try {
        return WebAssembly.validate(new Uint8Array([
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
        ]));
      } catch (e) {
        return false;
      }
    };
    getWasmFileName = (useSimd, useThreads) => {
      if (useSimd) {
        if (false) {
          return "ort-training-wasm-simd.wasm";
        }
        return useThreads ? "ort-wasm-simd-threaded.wasm" : "ort-wasm-simd.wasm";
      } else {
        return useThreads ? "ort-wasm-threaded.wasm" : "ort-wasm.wasm";
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
      const numThreads = flags.numThreads;
      const simd = flags.simd;
      const useThreads = numThreads > 1 && isMultiThreadSupported();
      const useSimd = simd && isSimdSupported();
      const wasmPaths = flags.wasmPaths;
      const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;
      const wasmFileName = getWasmFileName(useSimd, useThreads);
      const wasmPathOverride = typeof wasmPaths === "object" ? wasmPaths[wasmFileName] : void 0;
      let isTimeout = false;
      const tasks = [];
      if (timeout > 0) {
        tasks.push(new Promise((resolve) => {
          setTimeout(() => {
            isTimeout = true;
            resolve();
          }, timeout);
        }));
      }
      tasks.push(new Promise((resolve, reject) => {
        const factory = useThreads ? ortWasmFactoryThreaded : ortWasmFactory;
        const config = {
          locateFile: (fileName, scriptDirectory) => {
            if (useThreads && fileName.endsWith(".worker.js") && typeof Blob !== "undefined") {
              return URL.createObjectURL(new Blob(
                [
                  // This require() function is handled by esbuild plugin to load file content as string.
                  // eslint-disable-next-line @typescript-eslint/no-require-imports
                  require_ort_wasm_threaded_worker()
                ],
                { type: "text/javascript" }
              ));
            }
            if (fileName.endsWith(".wasm")) {
              if (wasmPathOverride) {
                return wasmPathOverride;
              }
              const prefix = wasmPrefixOverride ?? scriptDirectory;
              if (false) {
                if (wasmFileName === "ort-wasm-simd.wasm") {
                  return prefix + "ort-wasm-simd.jsep.wasm";
                } else if (wasmFileName === "ort-wasm-simd-threaded.wasm") {
                  return prefix + "ort-wasm-simd-threaded.jsep.wasm";
                }
              }
              return prefix + wasmFileName;
            }
            return scriptDirectory + fileName;
          }
        };
        if (useThreads) {
          if (typeof Blob === "undefined") {
            config.mainScriptUrlOrBlob = join(__dirname, "ort-wasm-threaded.js");
          } else {
            const scriptSourceCode = `var ortWasmThreaded=${factory.toString()};`;
            config.mainScriptUrlOrBlob = new Blob([scriptSourceCode], { type: "text/javascript" });
          }
        }
        factory(config).then(
          // wasm module initialized successfully
          (module) => {
            initializing = false;
            initialized = true;
            wasm = module;
            resolve();
          },
          // wasm module failed to initialize
          (what) => {
            initializing = false;
            aborted = true;
            reject(what);
          }
        );
      }));
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
        const paramsOffset = wasm2.stackAlloc(8);
        wasm2._OrtGetLastError(paramsOffset, paramsOffset + 4);
        const errorCode = wasm2.HEAP32[paramsOffset / 4];
        const errorMessagePointer = wasm2.HEAPU32[paramsOffset / 4 + 1];
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
          throw new Error(`log serverity level is not valid: ${options.logSeverityLevel}`);
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
var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, setExecutionProviders, setSessionOptions;
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
    setExecutionProviders = (sessionOptionsHandle, executionProviders, allocs) => {
      for (const ep of executionProviders) {
        let epName = typeof ep === "string" ? ep : ep.name;
        switch (epName) {
          case "xnnpack":
            epName = "XNNPACK";
            break;
          case "webnn":
            epName = "WEBNN";
            if (typeof ep !== "string") {
              const webnnOptions = ep;
              if (webnnOptions?.deviceType) {
                const keyDataOffset = allocWasmString("deviceType", allocs);
                const valueDataOffset = allocWasmString(webnnOptions.deviceType, allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(`Can't set a session config entry: 'deviceType' - ${webnnOptions.deviceType}.`);
                }
              }
              if (webnnOptions?.numThreads) {
                let numThreads = webnnOptions.numThreads;
                if (typeof numThreads != "number" || !Number.isInteger(numThreads) || numThreads < 0) {
                  numThreads = 0;
                }
                const keyDataOffset = allocWasmString("numThreads", allocs);
                const valueDataOffset = allocWasmString(numThreads.toString(), allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(`Can't set a session config entry: 'numThreads' - ${webnnOptions.numThreads}.`);
                }
              }
              if (webnnOptions?.powerPreference) {
                const keyDataOffset = allocWasmString("powerPreference", allocs);
                const valueDataOffset = allocWasmString(webnnOptions.powerPreference, allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(
                    `Can't set a session config entry: 'powerPreference' - ${webnnOptions.powerPreference}.`
                  );
                }
              }
            }
            break;
          case "webgpu":
            epName = "JS";
            if (typeof ep !== "string") {
              const webgpuOptions = ep;
              if (webgpuOptions?.preferredLayout) {
                if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                  throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                }
                const keyDataOffset = allocWasmString("preferredLayout", allocs);
                const valueDataOffset = allocWasmString(webgpuOptions.preferredLayout, allocs);
                if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                  checkLastError(
                    `Can't set a session config entry: 'preferredLayout' - ${webgpuOptions.preferredLayout}.`
                  );
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
        if (getInstance()._OrtAppendExecutionProvider(sessionOptionsHandle, epNameDataOffset) !== 0) {
          checkLastError(`Can't append execution provider: ${epName}.`);
        }
      }
    };
    setSessionOptions = (options) => {
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
          throw new Error(`log serverity level is not valid: ${logSeverityLevel}`);
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
          setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);
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
            const keyDataOffset = allocWasmString(key, allocs);
            const valueDataOffset = allocWasmString(value, allocs);
            if (wasm2._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
              checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
            }
          });
        }
        return [sessionOptionsHandle, allocs];
      } catch (e) {
        if (sessionOptionsHandle !== 0) {
          wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
        throw e;
      }
    };
  }
});

// web/lib/wasm/wasm-common.ts
var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, getTensorElementSize, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, dataLocationStringToEnum;
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
        default:
          throw new Error(`unsupported data type: ${typeProto}`);
      }
    };
    getTensorElementSize = (dateType) => [void 0, 4, 1, 1, 2, 2, 4, 8, void 0, 1, 2, 8, 4, 8, void 0, void 0, void 0][dateType];
    tensorTypeToTypedArrayConstructor = (type) => {
      switch (type) {
        case "float16":
          return Uint16Array;
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
    isGpuBufferSupportedType = (type) => type === "float32" || type === "int32" || type === "int64" || type === "bool" || type === "float16" || type === "uint32";
    dataLocationStringToEnum = (location) => {
      switch (location) {
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
        default:
          throw new Error(`unsupported data location: ${location}`);
      }
    };
  }
});

// web/lib/wasm/wasm-core-impl.ts
var getSessionInputOutputCount, initOrt, initRuntime, activeSessions, createSessionAllocate, createSessionFinalize, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling, extractTransferableBuffers;
var init_wasm_core_impl = __esm({
  "web/lib/wasm/wasm-core-impl.ts"() {
    "use strict";
    init_run_options();
    init_session_options();
    init_wasm_common();
    init_wasm_factory();
    init_wasm_utils();
    getSessionInputOutputCount = (sessionHandle) => {
      const wasm2 = getInstance();
      const stack = wasm2.stackSave();
      try {
        const dataOffset = wasm2.stackAlloc(8);
        const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + 4);
        if (errorCode !== 0) {
          checkLastError("Can't get session input/output count.");
        }
        return [wasm2.HEAP32[dataOffset / 4], wasm2.HEAP32[dataOffset / 4 + 1]];
      } finally {
        wasm2.stackRestore(stack);
      }
    };
    initOrt = (numThreads, loggingLevel) => {
      const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
      if (errorCode !== 0) {
        checkLastError("Can't initialize onnxruntime.");
      }
    };
    initRuntime = async (env3) => {
      initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
      if (false) {
        const initJsep = null.init;
        await initJsep(getInstance(), env3);
      }
    };
    activeSessions = /* @__PURE__ */ new Map();
    createSessionAllocate = (model) => {
      const wasm2 = getInstance();
      const modelDataOffset = wasm2._malloc(model.byteLength);
      if (modelDataOffset === 0) {
        throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
      }
      wasm2.HEAPU8.set(model, modelDataOffset);
      return [modelDataOffset, model.byteLength];
    };
    createSessionFinalize = (modelData, options) => {
      const wasm2 = getInstance();
      let sessionHandle = 0;
      let sessionOptionsHandle = 0;
      let ioBindingHandle = 0;
      let allocs = [];
      const inputNamesUTF8Encoded = [];
      const outputNamesUTF8Encoded = [];
      try {
        [sessionOptionsHandle, allocs] = setSessionOptions(options);
        sessionHandle = wasm2._OrtCreateSession(modelData[0], modelData[1], sessionOptionsHandle);
        if (sessionHandle === 0) {
          checkLastError("Can't create a session.");
        }
        const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
        const inputNames = [];
        const outputNames = [];
        const outputPreferredLocations = [];
        for (let i = 0; i < inputCount; i++) {
          const name = wasm2._OrtGetInputName(sessionHandle, i);
          if (name === 0) {
            checkLastError("Can't get an input name.");
          }
          inputNamesUTF8Encoded.push(name);
          inputNames.push(wasm2.UTF8ToString(name));
        }
        for (let i = 0; i < outputCount; i++) {
          const name = wasm2._OrtGetOutputName(sessionHandle, i);
          if (name === 0) {
            checkLastError("Can't get an output name.");
          }
          outputNamesUTF8Encoded.push(name);
          const nameString = wasm2.UTF8ToString(name);
          outputNames.push(nameString);
          if (false) {
            const location = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
            if (location !== "cpu" && location !== "cpu-pinned" && location !== "gpu-buffer") {
              throw new Error(`Not supported preferred output location: ${location}.`);
            }
            outputPreferredLocations.push(location);
          }
        }
        let bindingState = null;
        if (false) {
          ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);
          if (ioBindingHandle === 0) {
            checkLastError("Can't create IO binding.");
          }
          bindingState = {
            handle: ioBindingHandle,
            outputPreferredLocations,
            outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => dataLocationStringToEnum(l))
          };
        }
        activeSessions.set(sessionHandle, [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, bindingState]);
        return [sessionHandle, inputNames, outputNames];
      } catch (e) {
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        if (ioBindingHandle !== 0) {
          wasm2._OrtReleaseBinding(ioBindingHandle);
        }
        if (sessionHandle !== 0) {
          wasm2._OrtReleaseSession(sessionHandle);
        }
        throw e;
      } finally {
        wasm2._free(modelData[0]);
        if (sessionOptionsHandle !== 0) {
          wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
        }
        allocs.forEach((alloc) => wasm2._free(alloc));
      }
    };
    createSession = (model, options) => {
      const modelData = createSessionAllocate(model);
      return createSessionFinalize(modelData, options);
    };
    releaseSession = (sessionId) => {
      const wasm2 = getInstance();
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`cannot release session. invalid session id: ${sessionId}`);
      }
      const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;
      if (ioBindingState) {
        wasm2._OrtReleaseBinding(ioBindingState.handle);
      }
      wasm2.jsepUnregisterBuffers?.(sessionId);
      inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
      outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
      wasm2._OrtReleaseSession(sessionHandle);
      activeSessions.delete(sessionId);
    };
    prepareInputOutputTensor = (tensor, tensorHandles, allocs, sessionId, index) => {
      if (!tensor) {
        tensorHandles.push(0);
        return;
      }
      const wasm2 = getInstance();
      const dataType = tensor[0];
      const dims = tensor[1];
      const location = tensor[3];
      let rawData;
      let dataByteLength;
      if (dataType === "string" && location === "gpu-buffer") {
        throw new Error("String tensor is not supported on GPU.");
      }
      if (location === "gpu-buffer") {
        const gpuBuffer = tensor[2].gpuBuffer;
        const elementSizeInBytes = getTensorElementSize(tensorDataTypeStringToEnum(dataType));
        dataByteLength = dims.reduce((a, b) => a * b, 1) * elementSizeInBytes;
        rawData = wasm2.jsepRegisterBuffer(sessionId, index, gpuBuffer, dataByteLength);
      } else {
        const data = tensor[2];
        if (Array.isArray(data)) {
          dataByteLength = 4 * data.length;
          rawData = wasm2._malloc(dataByteLength);
          allocs.push(rawData);
          let dataIndex = rawData / 4;
          for (let i = 0; i < data.length; i++) {
            if (typeof data[i] !== "string") {
              throw new TypeError(`tensor data at index ${i} is not a string`);
            }
            wasm2.HEAPU32[dataIndex++] = allocWasmString(data[i], allocs);
          }
        } else {
          dataByteLength = data.byteLength;
          rawData = wasm2._malloc(dataByteLength);
          allocs.push(rawData);
          wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
        }
      }
      const stack = wasm2.stackSave();
      const dimsOffset = wasm2.stackAlloc(4 * dims.length);
      try {
        let dimIndex = dimsOffset / 4;
        dims.forEach((d) => wasm2.HEAP32[dimIndex++] = d);
        const tensor2 = wasm2._OrtCreateTensor(
          tensorDataTypeStringToEnum(dataType),
          rawData,
          dataByteLength,
          dimsOffset,
          dims.length,
          dataLocationStringToEnum(location)
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
      const session = activeSessions.get(sessionId);
      if (!session) {
        throw new Error(`cannot run inference. invalid session id: ${sessionId}`);
      }
      const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;
      const inputCount = inputIndices.length;
      const outputCount = outputIndices.length;
      let runOptionsHandle = 0;
      let runOptionsAllocs = [];
      const inputTensorHandles = [];
      const outputTensorHandles = [];
      const inputOutputAllocs = [];
      const beforeRunStack = wasm2.stackSave();
      const inputValuesOffset = wasm2.stackAlloc(inputCount * 4);
      const inputNamesOffset = wasm2.stackAlloc(inputCount * 4);
      const outputValuesOffset = wasm2.stackAlloc(outputCount * 4);
      const outputNamesOffset = wasm2.stackAlloc(outputCount * 4);
      try {
        [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
        for (let i = 0; i < inputCount; i++) {
          prepareInputOutputTensor(inputTensors[i], inputTensorHandles, inputOutputAllocs, sessionId, inputIndices[i]);
        }
        for (let i = 0; i < outputCount; i++) {
          prepareInputOutputTensor(
            outputTensors[i],
            outputTensorHandles,
            inputOutputAllocs,
            sessionId,
            inputCount + outputIndices[i]
          );
        }
        let inputValuesIndex = inputValuesOffset / 4;
        let inputNamesIndex = inputNamesOffset / 4;
        let outputValuesIndex = outputValuesOffset / 4;
        let outputNamesIndex = outputNamesOffset / 4;
        for (let i = 0; i < inputCount; i++) {
          wasm2.HEAPU32[inputValuesIndex++] = inputTensorHandles[i];
          wasm2.HEAPU32[inputNamesIndex++] = inputNamesUTF8Encoded[inputIndices[i]];
        }
        for (let i = 0; i < outputCount; i++) {
          wasm2.HEAPU32[outputValuesIndex++] = outputTensorHandles[i];
          wasm2.HEAPU32[outputNamesIndex++] = outputNamesUTF8Encoded[outputIndices[i]];
        }
        if (false) {
          const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
          if (inputNamesUTF8Encoded.length !== inputCount) {
            throw new Error(`input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`);
          }
          for (let i = 0; i < inputCount; i++) {
            const index = inputIndices[i];
            const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);
            if (errorCode2 !== 0) {
              checkLastError(`Can't bind input[${i}] for session=${sessionId}.`);
            }
          }
          for (let i = 0; i < outputCount; i++) {
            const index = outputIndices[i];
            const location = outputTensors[i]?.[3];
            if (location) {
              const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind pre-allocated output[${i}] for session=${sessionId}.`);
              }
            } else {
              const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], 0, outputPreferredLocationsEncoded[index]);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
              }
            }
          }
        }
        let errorCode;
        if (false) {
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
        for (let i = 0; i < outputCount; i++) {
          const tensor = wasm2.HEAPU32[outputValuesOffset / 4 + i];
          if (tensor === outputTensorHandles[i]) {
            output.push(outputTensors[i]);
            continue;
          }
          const beforeGetTensorDataStack = wasm2.stackSave();
          const tensorDataOffset = wasm2.stackAlloc(4 * 4);
          let keepOutputTensor = false;
          let type, dataOffset = 0;
          try {
            const errorCode2 = wasm2._OrtGetTensorData(
              tensor,
              tensorDataOffset,
              tensorDataOffset + 4,
              tensorDataOffset + 8,
              tensorDataOffset + 12
            );
            if (errorCode2 !== 0) {
              checkLastError(`Can't access output tensor data on index ${i}.`);
            }
            let tensorDataIndex = tensorDataOffset / 4;
            const dataType = wasm2.HEAPU32[tensorDataIndex++];
            dataOffset = wasm2.HEAPU32[tensorDataIndex++];
            const dimsOffset = wasm2.HEAPU32[tensorDataIndex++];
            const dimsLength = wasm2.HEAPU32[tensorDataIndex++];
            const dims = [];
            for (let i2 = 0; i2 < dimsLength; i2++) {
              dims.push(wasm2.HEAPU32[dimsOffset / 4 + i2]);
            }
            wasm2._OrtFree(dimsOffset);
            const size = dims.reduce((a, b) => a * b, 1);
            type = tensorDataTypeEnumToString(dataType);
            const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
            if (type === "string") {
              if (preferredLocation === "gpu-buffer") {
                throw new Error("String tensor is not supported on GPU.");
              }
              const stringData = [];
              let dataIndex = dataOffset / 4;
              for (let i2 = 0; i2 < size; i2++) {
                const offset = wasm2.HEAPU32[dataIndex++];
                const maxBytesToRead = i2 === size - 1 ? void 0 : wasm2.HEAPU32[dataIndex] - offset;
                stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
              }
              output.push([type, dims, stringData, "cpu"]);
            } else {
              if (preferredLocation === "gpu-buffer" && size > 0) {
                const gpuBuffer = wasm2.jsepGetBuffer(dataOffset);
                const elementSize = getTensorElementSize(dataType);
                if (elementSize === void 0 || !isGpuBufferSupportedType(type)) {
                  throw new Error(`Unsupported data type: ${type}`);
                }
                keepOutputTensor = true;
                output.push([
                  type,
                  dims,
                  {
                    gpuBuffer,
                    download: wasm2.jsepCreateDownloader(gpuBuffer, size * elementSize, type),
                    dispose: () => {
                      wasm2._OrtReleaseTensor(tensor);
                    }
                  },
                  "gpu-buffer"
                ]);
              } else {
                const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                const data = new typedArrayConstructor(size);
                new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength));
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
        if (ioBindingState) {
          wasm2._OrtClearBoundOutputs(ioBindingState.handle);
        }
        return output;
      } finally {
        wasm2.stackRestore(beforeRunStack);
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

// proxy-worker:./proxy-worker/main
var require_main = __commonJS({
  "proxy-worker:./proxy-worker/main"(exports, module) {
  }
});

// web/lib/wasm/proxy-wrapper.ts
var isProxy, proxyWorker, initializing2, initialized2, aborted2, initWasmCallbacks, initOrtCallbacks, createSessionAllocateCallbacks, createSessionFinalizeCallbacks, createSessionCallbacks, releaseSessionCallbacks, runCallbacks, endProfilingCallbacks, ensureWorker, onProxyWorkerMessage, scriptSrc, initializeWebAssemblyInstance, initializeRuntime, createSessionAllocate2, createSessionFinalize2, createSession2, releaseSession2, run2, endProfiling2;
var init_proxy_wrapper = __esm({
  "web/lib/wasm/proxy-wrapper.ts"() {
    "use strict";
    init_esm();
    init_wasm_core_impl();
    init_wasm_factory();
    isProxy = () => !!env2.wasm.proxy && typeof document !== "undefined";
    initializing2 = false;
    initialized2 = false;
    aborted2 = false;
    createSessionAllocateCallbacks = [];
    createSessionFinalizeCallbacks = [];
    createSessionCallbacks = [];
    releaseSessionCallbacks = [];
    runCallbacks = [];
    endProfilingCallbacks = [];
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
          break;
        case "init-ort":
          if (ev.data.err) {
            initOrtCallbacks[1](ev.data.err);
          } else {
            initOrtCallbacks[0]();
          }
          break;
        case "create_allocate":
          if (ev.data.err) {
            createSessionAllocateCallbacks.shift()[1](ev.data.err);
          } else {
            createSessionAllocateCallbacks.shift()[0](ev.data.out);
          }
          break;
        case "create_finalize":
          if (ev.data.err) {
            createSessionFinalizeCallbacks.shift()[1](ev.data.err);
          } else {
            createSessionFinalizeCallbacks.shift()[0](ev.data.out);
          }
          break;
        case "create":
          if (ev.data.err) {
            createSessionCallbacks.shift()[1](ev.data.err);
          } else {
            createSessionCallbacks.shift()[0](ev.data.out);
          }
          break;
        case "release":
          if (ev.data.err) {
            releaseSessionCallbacks.shift()[1](ev.data.err);
          } else {
            releaseSessionCallbacks.shift()[0]();
          }
          break;
        case "run":
          if (ev.data.err) {
            runCallbacks.shift()[1](ev.data.err);
          } else {
            runCallbacks.shift()[0](ev.data.out);
          }
          break;
        case "end-profiling":
          if (ev.data.err) {
            endProfilingCallbacks.shift()[1](ev.data.err);
          } else {
            endProfilingCallbacks.shift()[0]();
          }
          break;
        default:
      }
    };
    scriptSrc = typeof document !== "undefined" ? document?.currentScript?.src : void 0;
    initializeWebAssemblyInstance = async () => {
      if (isProxy()) {
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
        if (env2.wasm.wasmPaths === void 0) {
          if (scriptSrc && scriptSrc.indexOf("blob:") !== 0) {
            env2.wasm.wasmPaths = scriptSrc.substr(0, +scriptSrc.lastIndexOf("/") + 1);
          }
        }
        return new Promise((resolve, reject) => {
          proxyWorker?.terminate();
          const workerUrl = URL.createObjectURL(new Blob(
            [
              // This require() function is handled by esbuild plugin to load file content as string.
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              require_main()
            ],
            { type: "text/javascript" }
          ));
          proxyWorker = new Worker(workerUrl, { name: "ort-wasm-proxy-worker" });
          proxyWorker.onerror = (ev) => reject(ev);
          proxyWorker.onmessage = onProxyWorkerMessage;
          URL.revokeObjectURL(workerUrl);
          initWasmCallbacks = [resolve, reject];
          const message = { type: "init-wasm", in: env2.wasm };
          proxyWorker.postMessage(message);
        });
      } else {
        return initializeWebAssembly(env2.wasm);
      }
    };
    initializeRuntime = async (env3) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          initOrtCallbacks = [resolve, reject];
          const message = { type: "init-ort", in: env3 };
          proxyWorker.postMessage(message);
        });
      } else {
        await initRuntime(env3);
      }
    };
    createSessionAllocate2 = async (model) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          createSessionAllocateCallbacks.push([resolve, reject]);
          const message = { type: "create_allocate", in: { model } };
          proxyWorker.postMessage(message, [model.buffer]);
        });
      } else {
        return createSessionAllocate(model);
      }
    };
    createSessionFinalize2 = async (modeldata, options) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          createSessionFinalizeCallbacks.push([resolve, reject]);
          const message = { type: "create_finalize", in: { modeldata, options } };
          proxyWorker.postMessage(message);
        });
      } else {
        return createSessionFinalize(modeldata, options);
      }
    };
    createSession2 = async (model, options) => {
      if (isProxy()) {
        if (options?.preferredOutputLocation) {
          throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
        }
        ensureWorker();
        return new Promise((resolve, reject) => {
          createSessionCallbacks.push([resolve, reject]);
          const message = { type: "create", in: { model, options } };
          proxyWorker.postMessage(message, [model.buffer]);
        });
      } else {
        return createSession(model, options);
      }
    };
    releaseSession2 = async (sessionId) => {
      if (isProxy()) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          releaseSessionCallbacks.push([resolve, reject]);
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
          runCallbacks.push([resolve, reject]);
          const serializableInputs = inputs;
          const message = { type: "run", in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options } };
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
          endProfilingCallbacks.push([resolve, reject]);
          const message = { type: "end-profiling", in: sessionId };
          proxyWorker.postMessage(message);
        });
      } else {
        endProfiling(sessionId);
      }
    };
  }
});

// nodejs-ignore:node:fs/promises
var readFile2;
var init_promises = __esm({
  "nodejs-ignore:node:fs/promises"() {
    readFile2 = void 0;
  }
});

// web/lib/wasm/session-handler.ts
var runtimeInitialized, runtimeInitializationPromise, encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
var init_session_handler = __esm({
  "web/lib/wasm/session-handler.ts"() {
    "use strict";
    init_promises();
    init_esm();
    init_proxy_wrapper();
    init_wasm_common();
    encodeTensorMetadata = (tensor, getName) => {
      switch (tensor.location) {
        case "cpu":
          return [tensor.type, tensor.dims, tensor.data, "cpu"];
        case "gpu-buffer":
          return [tensor.type, tensor.dims, { gpuBuffer: tensor.gpuBuffer }, "gpu-buffer"];
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
        default:
          throw new Error(`invalid data location: ${tensor[3]}`);
      }
    };
    OnnxruntimeWebAssemblySessionHandler = class {
      async createSessionAllocate(path) {
        const response = await fetch(path);
        if (response.status !== 200) {
          throw new Error(`failed to load model: ${path}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return createSessionAllocate2(new Uint8Array(arrayBuffer));
      }
      async loadModel(pathOrBuffer, options) {
        if (!runtimeInitialized) {
          if (!runtimeInitializationPromise) {
            runtimeInitializationPromise = initializeRuntime(env2);
          }
          await runtimeInitializationPromise;
          runtimeInitializationPromise = void 0;
          runtimeInitialized = true;
        }
        if (typeof pathOrBuffer === "string") {
          if (typeof process !== "undefined" && process.versions && process.versions.node) {
            const model = await readFile2(pathOrBuffer);
            [this.sessionId, this.inputNames, this.outputNames] = await createSession2(model, options);
          } else {
            const modelData = await this.createSessionAllocate(pathOrBuffer);
            [this.sessionId, this.inputNames, this.outputNames] = await createSessionFinalize2(modelData, options);
          }
        } else {
          [this.sessionId, this.inputNames, this.outputNames] = await createSession2(pathOrBuffer, options);
        }
      }
      async dispose() {
        return releaseSession2(this.sessionId);
      }
      async run(feeds, fetches, options) {
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
        const inputs = inputArray.map((t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`));
        const outputs = outputArray.map(
          (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
        );
        const results = await run2(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
        const resultMap = {};
        for (let i = 0; i < results.length; i++) {
          resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
        }
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
var initializeFlags, OnnxruntimeWebAssemblyBackend;
var init_backend_wasm = __esm({
  "web/lib/backend-wasm.ts"() {
    "use strict";
    init_node_os();
    init_esm();
    init_proxy_wrapper();
    init_session_handler();
    initializeFlags = () => {
      if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
        env2.wasm.initTimeout = 0;
      }
      if (typeof env2.wasm.simd !== "boolean") {
        env2.wasm.simd = true;
      }
      if (typeof env2.wasm.proxy !== "boolean") {
        env2.wasm.proxy = false;
      }
      if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
        const numCpuLogicalCores = typeof navigator === "undefined" ? cpus().length : navigator.hardwareConcurrency;
        env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
      }
    };
    OnnxruntimeWebAssemblyBackend = class {
      async init() {
        initializeFlags();
        await initializeWebAssemblyInstance();
      }
      async createInferenceSessionHandler(pathOrBuffer, options) {
        const handler = new OnnxruntimeWebAssemblySessionHandler();
        await handler.loadModel(pathOrBuffer, options);
        return Promise.resolve(handler);
      }
    };
  }
});

// web/lib/backend-wasm-inference.ts
var backend_wasm_inference_exports = {};
__export(backend_wasm_inference_exports, {
  wasmBackend: () => wasmBackend
});
var wasmBackend;
var init_backend_wasm_inference = __esm({
  "web/lib/backend-wasm-inference.ts"() {
    "use strict";
    init_backend_wasm();
    wasmBackend = new OnnxruntimeWebAssemblyBackend();
  }
});

// web/lib/index.ts
init_esm();
init_esm();

// web/lib/version.ts
var version2 = "1.17.0";

// web/lib/index.ts
if (false) {
  const onnxjsBackend = null.onnxjsBackend;
  registerBackend("webgl", onnxjsBackend, -10);
}
if (true) {
  const wasmBackend2 = true ? (init_backend_wasm_inference(), __toCommonJS(backend_wasm_inference_exports)).wasmBackend : null.wasmBackend;
  if (false) {
    registerBackend("webgpu", wasmBackend2, 5);
  }
  registerBackend("cpu", wasmBackend2, 10);
  registerBackend("wasm", wasmBackend2, 10);
  if (true) {
    registerBackend("xnnpack", wasmBackend2, 9);
    registerBackend("webnn", wasmBackend2, 9);
  }
}
Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
export {
  InferenceSession2 as InferenceSession,
  Tensor2 as Tensor,
  TrainingSession2 as TrainingSession,
  env2 as env,
  registerBackend
};