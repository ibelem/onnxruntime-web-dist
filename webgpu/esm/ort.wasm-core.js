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

// web/node_modules/onnxruntime-common/dist/esm/backend-impl.js
var backends, backendsSortedByPriority, registerBackend, resolveBackend;
var init_backend_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/backend-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/backend.js
var init_backend = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/backend.js"() {
    init_backend_impl();
  }
});

// web/node_modules/onnxruntime-common/dist/esm/version.js
var version;
var init_version = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/version.js"() {
    version = "1.17.0";
  }
});

// web/node_modules/onnxruntime-common/dist/esm/env-impl.js
var logLevelValue, env;
var init_env_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/env-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/env.js
var env2;
var init_env = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/env.js"() {
    init_env_impl();
    env2 = env;
  }
});

// web/node_modules/onnxruntime-common/dist/esm/tensor-conversion-impl.js
var tensorToDataURL, tensorToImageData;
var init_tensor_conversion_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/tensor-conversion-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/tensor-factory-impl.js
var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromPinnedBuffer;
var init_tensor_factory_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/tensor-factory-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/tensor-impl-type-mapping.js
var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isBigIntChecked, checkBigInt;
var init_tensor_impl_type_mapping = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/tensor-impl-type-mapping.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/tensor-utils-impl.js
var calculateSize, tensorReshape;
var init_tensor_utils_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/tensor-utils-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/tensor-impl.js
var Tensor;
var init_tensor_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/tensor-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/tensor.js
var Tensor2;
var init_tensor = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/tensor.js"() {
    init_tensor_impl();
    Tensor2 = Tensor;
  }
});

// web/node_modules/onnxruntime-common/dist/esm/inference-session-impl.js
var InferenceSession;
var init_inference_session_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/inference-session-impl.js"() {
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

// web/node_modules/onnxruntime-common/dist/esm/inference-session.js
var InferenceSession2;
var init_inference_session = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/inference-session.js"() {
    init_inference_session_impl();
    InferenceSession2 = InferenceSession;
  }
});

// web/node_modules/onnxruntime-common/dist/esm/onnx-value.js
var init_onnx_value = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/onnx-value.js"() {
  }
});

// web/node_modules/onnxruntime-common/dist/esm/training-session-impl.js
var noBackendErrMsg, TrainingSession;
var init_training_session_impl = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/training-session-impl.js"() {
    init_backend_impl();
    init_tensor();
    noBackendErrMsg = "Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.";
    TrainingSession = class _TrainingSession {
      constructor(handler, hasOptimizerModel, hasEvalModel) {
        this.handler = handler;
        this.hasOptimizerModel = hasOptimizerModel;
        this.hasEvalModel = hasEvalModel;
      }
      get trainingInputNames() {
        return this.handler.inputNames;
      }
      get trainingOutputNames() {
        return this.handler.outputNames;
      }
      get evalInputNames() {
        if (this.hasEvalModel) {
          return this.handler.evalInputNames;
        } else {
          throw new Error("This training session has no evalModel loaded.");
        }
      }
      get evalOutputNames() {
        if (this.hasEvalModel) {
          return this.handler.evalOutputNames;
        } else {
          throw new Error("This training session has no evalModel loaded.");
        }
      }
      static async create(trainingOptions, sessionOptions) {
        const evalModel = trainingOptions.evalModel || "";
        const optimizerModel = trainingOptions.optimizerModel || "";
        const options = sessionOptions || {};
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backend = await resolveBackend(backendHints);
        if (backend.createTrainingSessionHandler) {
          const handler = await backend.createTrainingSessionHandler(trainingOptions.checkpointState, trainingOptions.trainModel, evalModel, optimizerModel, options);
          return new _TrainingSession(handler, !!trainingOptions.optimizerModel, !!trainingOptions.evalModel);
        } else {
          throw new Error(noBackendErrMsg);
        }
      }
      /**
       * Helper function for runTrainStep and future runStep methods that handles the type-narrowing conversion from
       * the given parameters to SessionHandler.FetchesType and RunOptions.
       *
       * @param inputNames the feeds object is checked that they contain all input names in the provided list of input
       * names.
       * @param outputNames the fetches object is checked that their keys match up with valid names in the list of output
       * names.
       * @param feeds the required input
       * @param arg1 narrowed & converted into the SessionHandler.FetchesType or RunOptions object
       * @param arg2 optional RunOptions object.
       * @returns
       */
      typeNarrowingForRunStep(inputNames, outputNames, feeds, arg1, arg2) {
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
              if (outputNames.indexOf(name) === -1) {
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
            for (const name of outputNames) {
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
        for (const name of inputNames) {
          if (typeof feeds[name] === "undefined") {
            throw new Error(`input '${name}' is missing in 'feeds'.`);
          }
        }
        if (isFetchesEmpty) {
          for (const name of outputNames) {
            fetches[name] = null;
          }
        }
        return [fetches, options];
      }
      /**
       * Helper method for runTrainStep and any other runStep methods. Takes the ReturnType result from the SessionHandler
       * and changes it into a map of Tensors.
       *
       * @param results
       * @returns
       */
      convertHandlerReturnTypeToMapOfTensors(results) {
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
      async runTrainStep(feeds, arg1, arg2) {
        const [fetches, options] = this.typeNarrowingForRunStep(this.trainingInputNames, this.trainingOutputNames, feeds, arg1, arg2);
        const results = await this.handler.runTrainStep(feeds, fetches, options);
        return this.convertHandlerReturnTypeToMapOfTensors(results);
      }
      async runOptimizerStep(options) {
        if (this.hasOptimizerModel) {
          await this.handler.runOptimizerStep(options || {});
        } else {
          throw new Error("This TrainingSession has no OptimizerModel loaded.");
        }
      }
      async runEvalStep(feeds, arg1, arg2) {
        if (this.hasEvalModel) {
          const [fetches, options] = this.typeNarrowingForRunStep(this.evalInputNames, this.evalOutputNames, feeds, arg1, arg2);
          const results = await this.handler.runEvalStep(feeds, fetches, options);
          return this.convertHandlerReturnTypeToMapOfTensors(results);
        } else {
          throw new Error("This TrainingSession has no EvalModel loaded.");
        }
      }
      async getParametersSize(trainableOnly = true) {
        return this.handler.getParametersSize(trainableOnly);
      }
      async loadParametersBuffer(array, trainableOnly = true) {
        const paramsSize = await this.getParametersSize(trainableOnly);
        if (array.length !== 4 * paramsSize) {
          throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");
        }
        return this.handler.loadParametersBuffer(array, trainableOnly);
      }
      async getContiguousParameters(trainableOnly = true) {
        return this.handler.getContiguousParameters(trainableOnly);
      }
      async release() {
        return this.handler.dispose();
      }
    };
  }
});

// web/node_modules/onnxruntime-common/dist/esm/training-session.js
var TrainingSession2;
var init_training_session = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/training-session.js"() {
    init_training_session_impl();
    TrainingSession2 = TrainingSession;
  }
});

// web/node_modules/onnxruntime-common/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  InferenceSession: () => InferenceSession2,
  Tensor: () => Tensor2,
  TrainingSession: () => TrainingSession2,
  env: () => env2,
  registerBackend: () => registerBackend
});
var init_esm = __esm({
  "web/node_modules/onnxruntime-common/dist/esm/index.js"() {
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
  join: () => join
});
var join;
var init_path = __esm({
  "nodejs-ignore:path"() {
    join = void 0;
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
        var e = moduleArg, k, l;
        e.ready = new Promise((a, b) => {
          k = a;
          l = b;
        });
        var q = Object.assign({}, e), v = "./this.program", aa = "object" == typeof window, x = "function" == typeof importScripts, ba = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, y = "", A, B, C;
        if (ba) {
          var fs = (init_fs(), __toCommonJS(fs_exports)), D = (init_path(), __toCommonJS(path_exports));
          y = x ? D.dirname(y) + "/" : __dirname + "/";
          A = (a, b) => {
            a = a.startsWith("file://") ? new URL(a) : D.normalize(a);
            return fs.readFileSync(a, b ? void 0 : "utf8");
          };
          C = (a) => {
            a = A(a, true);
            a.buffer || (a = new Uint8Array(a));
            return a;
          };
          B = (a, b, c, f = true) => {
            a = a.startsWith("file://") ? new URL(a) : D.normalize(a);
            fs.readFile(a, f ? void 0 : "utf8", (g, h) => {
              g ? c(g) : b(f ? h.buffer : h);
            });
          };
          !e.thisProgram && 1 < process.argv.length && (v = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          e.inspect = () => "[Emscripten Module object]";
        } else if (aa || x)
          x ? y = self.location.href : "undefined" != typeof document && document.currentScript && (y = document.currentScript.src), _scriptDir && (y = _scriptDir), 0 !== y.indexOf("blob:") ? y = y.substr(0, y.replace(/[?#].*/, "").lastIndexOf("/") + 1) : y = "", A = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.send(null);
            return b.responseText;
          }, x && (C = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }), B = (a, b, c) => {
            var f = new XMLHttpRequest();
            f.open("GET", a, true);
            f.responseType = "arraybuffer";
            f.onload = () => {
              200 == f.status || 0 == f.status && f.response ? b(f.response) : c();
            };
            f.onerror = c;
            f.send(null);
          };
        var ca = e.print || console.log.bind(console), E = e.printErr || console.error.bind(console);
        Object.assign(e, q);
        q = null;
        e.thisProgram && (v = e.thisProgram);
        var F;
        e.wasmBinary && (F = e.wasmBinary);
        var noExitRuntime = e.noExitRuntime || true;
        "object" != typeof WebAssembly && G("no native wasm support detected");
        var H, I, da = false, J, K, L, M;
        function ea() {
          var a = H.buffer;
          e.HEAP8 = J = new Int8Array(a);
          e.HEAP16 = new Int16Array(a);
          e.HEAP32 = L = new Int32Array(a);
          e.HEAPU8 = K = new Uint8Array(a);
          e.HEAPU16 = new Uint16Array(a);
          e.HEAPU32 = M = new Uint32Array(a);
          e.HEAPF32 = new Float32Array(a);
          e.HEAPF64 = new Float64Array(a);
        }
        var fa = [], ha = [], ia = [];
        function ja() {
          var a = e.preRun.shift();
          fa.unshift(a);
        }
        var N = 0, O = null, P = null;
        function G(a) {
          if (e.onAbort)
            e.onAbort(a);
          a = "Aborted(" + a + ")";
          E(a);
          da = true;
          a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
          l(a);
          throw a;
        }
        function ka(a) {
          return a.startsWith("data:application/octet-stream;base64,");
        }
        var Q;
        Q = "ort-wasm.wasm";
        if (!ka(Q)) {
          var la = Q;
          Q = e.locateFile ? e.locateFile(la, y) : y + la;
        }
        function ma(a) {
          if (a == Q && F)
            return new Uint8Array(F);
          if (C)
            return C(a);
          throw "both async and sync fetching of the wasm failed";
        }
        function na(a) {
          if (!F && (aa || x)) {
            if ("function" == typeof fetch && !a.startsWith("file://"))
              return fetch(a, { credentials: "same-origin" }).then((b) => {
                if (!b.ok)
                  throw "failed to load wasm binary file at '" + a + "'";
                return b.arrayBuffer();
              }).catch(() => ma(a));
            if (B)
              return new Promise((b, c) => {
                B(a, (f) => b(new Uint8Array(f)), c);
              });
          }
          return Promise.resolve().then(() => ma(a));
        }
        function oa(a, b, c) {
          return na(a).then((f) => WebAssembly.instantiate(f, b)).then((f) => f).then(c, (f) => {
            E("failed to asynchronously prepare wasm: " + f);
            G(f);
          });
        }
        function pa(a, b) {
          var c = Q;
          return F || "function" != typeof WebAssembly.instantiateStreaming || ka(c) || c.startsWith("file://") || ba || "function" != typeof fetch ? oa(c, a, b) : fetch(c, { credentials: "same-origin" }).then((f) => WebAssembly.instantiateStreaming(f, a).then(b, function(g) {
            E("wasm streaming compile failed: " + g);
            E("falling back to ArrayBuffer instantiation");
            return oa(c, a, b);
          }));
        }
        var R, S = (a) => {
          for (; 0 < a.length; )
            a.shift()(e);
        };
        function qa(a) {
          this.va = a - 24;
          this.Ea = function(b) {
            M[this.va + 4 >> 2 >>> 0] = b;
          };
          this.za = function(b) {
            M[this.va + 8 >> 2 >>> 0] = b;
          };
          this.xa = function(b, c) {
            this.ya();
            this.Ea(b);
            this.za(c);
          };
          this.ya = function() {
            M[this.va + 16 >> 2 >>> 0] = 0;
          };
        }
        var ra = 0, sa = 0, ta = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, ua = (a, b, c) => {
          b >>>= 0;
          var f = b + c;
          for (c = b; a[c] && !(c >= f); )
            ++c;
          if (16 < c - b && a.buffer && ta)
            return ta.decode(a.subarray(b, c));
          for (f = ""; b < c; ) {
            var g = a[b++];
            if (g & 128) {
              var h = a[b++] & 63;
              if (192 == (g & 224))
                f += String.fromCharCode((g & 31) << 6 | h);
              else {
                var m = a[b++] & 63;
                g = 224 == (g & 240) ? (g & 15) << 12 | h << 6 | m : (g & 7) << 18 | h << 12 | m << 6 | a[b++] & 63;
                65536 > g ? f += String.fromCharCode(g) : (g -= 65536, f += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023));
              }
            } else
              f += String.fromCharCode(g);
          }
          return f;
        }, T = (a, b) => (a >>>= 0) ? ua(K, a, b) : "", U = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var f = a.charCodeAt(c);
            127 >= f ? b++ : 2047 >= f ? b += 2 : 55296 <= f && 57343 >= f ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, V = (a, b, c, f) => {
          c >>>= 0;
          if (!(0 < f))
            return 0;
          var g = c;
          f = c + f - 1;
          for (var h = 0; h < a.length; ++h) {
            var m = a.charCodeAt(h);
            if (55296 <= m && 57343 >= m) {
              var r = a.charCodeAt(++h);
              m = 65536 + ((m & 1023) << 10) | r & 1023;
            }
            if (127 >= m) {
              if (c >= f)
                break;
              b[c++ >>> 0] = m;
            } else {
              if (2047 >= m) {
                if (c + 1 >= f)
                  break;
                b[c++ >>> 0] = 192 | m >> 6;
              } else {
                if (65535 >= m) {
                  if (c + 2 >= f)
                    break;
                  b[c++ >>> 0] = 224 | m >> 12;
                } else {
                  if (c + 3 >= f)
                    break;
                  b[c++ >>> 0] = 240 | m >> 18;
                  b[c++ >>> 0] = 128 | m >> 12 & 63;
                }
                b[c++ >>> 0] = 128 | m >> 6 & 63;
              }
              b[c++ >>> 0] = 128 | m & 63;
            }
          }
          b[c >>> 0] = 0;
          return c - g;
        }, W = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), va = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], wa = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ba = (a) => {
          var b = U(a) + 1, c = Aa(b);
          c && V(a, K, c, b);
          return c;
        }, X = {}, Ca = () => {
          if (!Y) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace(
              "-",
              "_"
            ) + ".UTF-8", _: v || "./this.program" }, b;
            for (b in X)
              void 0 === X[b] ? delete a[b] : a[b] = X[b];
            var c = [];
            for (b in a)
              c.push(`${b}=${a[b]}`);
            Y = c;
          }
          return Y;
        }, Y, Da = [null, [], []], Ea = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Fa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function Ga(a) {
          var b = Array(U(a) + 1);
          V(a, b, 0, b.length);
          return b;
        }
        function Ha(a, b, c, f) {
          function g(d, n, p) {
            for (d = "number" == typeof d ? d.toString() : d || ""; d.length < n; )
              d = p[0] + d;
            return d;
          }
          function h(d, n) {
            return g(d, n, "0");
          }
          function m(d, n) {
            function p(xa) {
              return 0 > xa ? -1 : 0 < xa ? 1 : 0;
            }
            var z;
            0 === (z = p(d.getFullYear() - n.getFullYear())) && 0 === (z = p(d.getMonth() - n.getMonth())) && (z = p(d.getDate() - n.getDate()));
            return z;
          }
          function r(d) {
            switch (d.getDay()) {
              case 0:
                return new Date(d.getFullYear() - 1, 11, 29);
              case 1:
                return d;
              case 2:
                return new Date(d.getFullYear(), 0, 3);
              case 3:
                return new Date(
                  d.getFullYear(),
                  0,
                  2
                );
              case 4:
                return new Date(d.getFullYear(), 0, 1);
              case 5:
                return new Date(d.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(d.getFullYear() - 1, 11, 30);
            }
          }
          function w(d) {
            var n = d.ra;
            for (d = new Date(new Date(d.sa + 1900, 0, 1).getTime()); 0 < n; ) {
              var p = d.getMonth(), z = (W(d.getFullYear()) ? Ea : Fa)[p];
              if (n > z - d.getDate())
                n -= z - d.getDate() + 1, d.setDate(1), 11 > p ? d.setMonth(p + 1) : (d.setMonth(0), d.setFullYear(d.getFullYear() + 1));
              else {
                d.setDate(d.getDate() + n);
                break;
              }
            }
            p = new Date(d.getFullYear() + 1, 0, 4);
            n = r(new Date(
              d.getFullYear(),
              0,
              4
            ));
            p = r(p);
            return 0 >= m(n, d) ? 0 >= m(p, d) ? d.getFullYear() + 1 : d.getFullYear() : d.getFullYear() - 1;
          }
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          f >>>= 0;
          var t = L[f + 40 >> 2 >>> 0];
          f = { Ca: L[f >> 2 >>> 0], Ba: L[f + 4 >> 2 >>> 0], ta: L[f + 8 >> 2 >>> 0], wa: L[f + 12 >> 2 >>> 0], ua: L[f + 16 >> 2 >>> 0], sa: L[f + 20 >> 2 >>> 0], ma: L[f + 24 >> 2 >>> 0], ra: L[f + 28 >> 2 >>> 0], Fa: L[f + 32 >> 2 >>> 0], Aa: L[f + 36 >> 2 >>> 0], Da: t ? T(t) : "" };
          c = T(c);
          t = {
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
          for (var u in t)
            c = c.replace(new RegExp(u, "g"), t[u]);
          var ya = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), za = "January February March April May June July August September October November December".split(" ");
          t = { "%a": (d) => ya[d.ma].substring(0, 3), "%A": (d) => ya[d.ma], "%b": (d) => za[d.ua].substring(0, 3), "%B": (d) => za[d.ua], "%C": (d) => h((d.sa + 1900) / 100 | 0, 2), "%d": (d) => h(d.wa, 2), "%e": (d) => g(d.wa, 2, " "), "%g": (d) => w(d).toString().substring(2), "%G": (d) => w(d), "%H": (d) => h(d.ta, 2), "%I": (d) => {
            d = d.ta;
            0 == d ? d = 12 : 12 < d && (d -= 12);
            return h(d, 2);
          }, "%j": (d) => {
            for (var n = 0, p = 0; p <= d.ua - 1; n += (W(d.sa + 1900) ? Ea : Fa)[p++])
              ;
            return h(d.wa + n, 3);
          }, "%m": (d) => h(d.ua + 1, 2), "%M": (d) => h(d.Ba, 2), "%n": () => "\n", "%p": (d) => 0 <= d.ta && 12 > d.ta ? "AM" : "PM", "%S": (d) => h(d.Ca, 2), "%t": () => "	", "%u": (d) => d.ma || 7, "%U": (d) => h(Math.floor((d.ra + 7 - d.ma) / 7), 2), "%V": (d) => {
            var n = Math.floor((d.ra + 7 - (d.ma + 6) % 7) / 7);
            2 >= (d.ma + 371 - d.ra - 2) % 7 && n++;
            if (n)
              53 == n && (p = (d.ma + 371 - d.ra) % 7, 4 == p || 3 == p && W(d.sa) || (n = 1));
            else {
              n = 52;
              var p = (d.ma + 7 - d.ra - 1) % 7;
              (4 == p || 5 == p && W(d.sa % 400 - 1)) && n++;
            }
            return h(n, 2);
          }, "%w": (d) => d.ma, "%W": (d) => h(Math.floor((d.ra + 7 - (d.ma + 6) % 7) / 7), 2), "%y": (d) => (d.sa + 1900).toString().substring(2), "%Y": (d) => d.sa + 1900, "%z": (d) => {
            d = d.Aa;
            var n = 0 <= d;
            d = Math.abs(d) / 60;
            return (n ? "+" : "-") + String("0000" + (d / 60 * 100 + d % 60)).slice(-4);
          }, "%Z": (d) => d.Da, "%%": () => "%" };
          c = c.replace(/%%/g, "\0\0");
          for (u in t)
            c.includes(u) && (c = c.replace(new RegExp(u, "g"), t[u](f)));
          c = c.replace(/\0\0/g, "%");
          u = Ga(c);
          if (u.length > b)
            return 0;
          J.set(u, a >>> 0);
          return u.length - 1;
        }
        var Ja = {
          a: function(a, b, c) {
            a >>>= 0;
            new qa(a).xa(b >>> 0, c >>> 0);
            ra = a;
            sa++;
            throw ra;
          },
          e: function() {
            return 0;
          },
          H: function() {
          },
          x: function() {
          },
          z: function() {
          },
          k: function() {
            return 0;
          },
          F: function() {
          },
          B: function() {
          },
          E: function() {
          },
          g: function() {
          },
          y: function() {
          },
          v: function() {
          },
          G: function() {
          },
          w: function() {
          },
          l: () => true,
          o: function(a, b, c) {
            a = b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN;
            c >>>= 0;
            a = new Date(1e3 * a);
            L[c >> 2 >>> 0] = a.getUTCSeconds();
            L[c + 4 >> 2 >>> 0] = a.getUTCMinutes();
            L[c + 8 >> 2 >>> 0] = a.getUTCHours();
            L[c + 12 >> 2 >>> 0] = a.getUTCDate();
            L[c + 16 >> 2 >>> 0] = a.getUTCMonth();
            L[c + 20 >> 2 >>> 0] = a.getUTCFullYear() - 1900;
            L[c + 24 >> 2 >>> 0] = a.getUTCDay();
            L[c + 28 >> 2 >>> 0] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
          },
          p: function(a, b, c) {
            a = b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN;
            c >>>= 0;
            a = new Date(1e3 * a);
            L[c >> 2 >>> 0] = a.getSeconds();
            L[c + 4 >> 2 >>> 0] = a.getMinutes();
            L[c + 8 >> 2 >>> 0] = a.getHours();
            L[c + 12 >> 2 >>> 0] = a.getDate();
            L[c + 16 >> 2 >>> 0] = a.getMonth();
            L[c + 20 >> 2 >>> 0] = a.getFullYear() - 1900;
            L[c + 24 >> 2 >>> 0] = a.getDay();
            L[c + 28 >> 2 >>> 0] = (W(a.getFullYear()) ? va : wa)[a.getMonth()] + a.getDate() - 1 | 0;
            L[c + 36 >> 2 >>> 0] = -(60 * a.getTimezoneOffset());
            b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var f = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            L[c + 32 >> 2 >>> 0] = (b != f && a.getTimezoneOffset() == Math.min(f, b)) | 0;
          },
          q: function(a) {
            a >>>= 0;
            var b = new Date(L[a + 20 >> 2 >>> 0] + 1900, L[a + 16 >> 2 >>> 0], L[a + 12 >> 2 >>> 0], L[a + 8 >> 2 >>> 0], L[a + 4 >> 2 >>> 0], L[a >> 2 >>> 0], 0), c = L[a + 32 >> 2 >>> 0], f = b.getTimezoneOffset(), g = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), h = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), m = Math.min(h, g);
            0 > c ? L[a + 32 >> 2 >>> 0] = Number(g != h && m == f) : 0 < c != (m == f) && (g = Math.max(h, g), b.setTime(b.getTime() + 6e4 * ((0 < c ? m : g) - f)));
            L[a + 24 >> 2 >>> 0] = b.getDay();
            L[a + 28 >> 2 >>> 0] = (W(b.getFullYear()) ? va : wa)[b.getMonth()] + b.getDate() - 1 | 0;
            L[a >> 2 >>> 0] = b.getSeconds();
            L[a + 4 >> 2 >>> 0] = b.getMinutes();
            L[a + 8 >> 2 >>> 0] = b.getHours();
            L[a + 12 >> 2 >>> 0] = b.getDate();
            L[a + 16 >> 2 >>> 0] = b.getMonth();
            L[a + 20 >> 2 >>> 0] = b.getYear();
            a = b.getTime() / 1e3;
            return Ia((R = a, 1 <= +Math.abs(R) ? 0 < R ? +Math.floor(R / 4294967296) >>> 0 : ~~+Math.ceil((R - +(~~R >>> 0)) / 4294967296) >>> 0 : 0)), a >>> 0;
          },
          m: function() {
            return -52;
          },
          n: function() {
          },
          t: function(a, b, c) {
            function f(w) {
              return (w = w.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? w[1] : "GMT";
            }
            c >>>= 0;
            var g = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(g, 0, 1), m = new Date(g, 6, 1);
            g = h.getTimezoneOffset();
            var r = m.getTimezoneOffset();
            M[a >>> 0 >> 2 >>> 0] = 60 * Math.max(g, r);
            L[b >>> 0 >> 2 >>> 0] = Number(g != r);
            a = f(h);
            b = f(m);
            a = Ba(a);
            b = Ba(b);
            r < g ? (M[c >> 2 >>> 0] = a, M[c + 4 >> 2 >>> 0] = b) : (M[c >> 2 >>> 0] = b, M[c + 4 >> 2 >>> 0] = a);
          },
          d: () => {
            G("");
          },
          h: function() {
            return Date.now();
          },
          u: function() {
            return 4294901760;
          },
          b: () => performance.now(),
          I: function(a, b, c) {
            b >>>= 0;
            return K.copyWithin(a >>> 0 >>> 0, b >>> 0, b + (c >>> 0) >>> 0);
          },
          s: function(a) {
            a >>>= 0;
            var b = K.length;
            if (4294901760 < a)
              return false;
            for (var c = 1; 4 >= c; c *= 2) {
              var f = b * (1 + 0.2 / c);
              f = Math.min(f, a + 100663296);
              var g = Math;
              f = Math.max(a, f);
              a: {
                g = g.min.call(g, 4294901760, f + (65536 - f % 65536) % 65536) - H.buffer.byteLength + 65535 >>> 16;
                try {
                  H.grow(g);
                  ea();
                  var h = 1;
                  break a;
                } catch (m) {
                }
                h = void 0;
              }
              if (h)
                return true;
            }
            return false;
          },
          C: function(a, b) {
            a >>>= 0;
            b >>>= 0;
            var c = 0;
            Ca().forEach(function(f, g) {
              var h = b + c;
              g = M[a + 4 * g >> 2 >>> 0] = h;
              for (h = 0; h < f.length; ++h)
                J[g++ >> 0 >>> 0] = f.charCodeAt(h);
              J[g >> 0 >>> 0] = 0;
              c += f.length + 1;
            });
            return 0;
          },
          D: function(a, b) {
            a >>>= 0;
            b >>>= 0;
            var c = Ca();
            M[a >> 2 >>> 0] = c.length;
            var f = 0;
            c.forEach(function(g) {
              f += g.length + 1;
            });
            M[b >> 2 >>> 0] = f;
            return 0;
          },
          f: () => 52,
          j: function() {
            return 52;
          },
          r: function() {
            return 70;
          },
          i: function(a, b, c, f) {
            b >>>= 0;
            c >>>= 0;
            f >>>= 0;
            for (var g = 0, h = 0; h < c; h++) {
              var m = M[b >> 2 >>> 0], r = M[b + 4 >> 2 >>> 0];
              b += 8;
              for (var w = 0; w < r; w++) {
                var t = K[m + w >>> 0], u = Da[a];
                0 === t || 10 === t ? ((1 === a ? ca : E)(ua(u, 0)), u.length = 0) : u.push(t);
              }
              g += r;
            }
            M[f >> 2 >>> 0] = g;
            return 0;
          },
          A: Ha,
          c: function(a, b, c, f) {
            return Ha(a >>> 0, b >>> 0, c >>> 0, f >>> 0);
          }
        };
        (function() {
          function a(c) {
            c = c.exports;
            I = c = Ka(c);
            H = I.J;
            ea();
            ha.unshift(I.K);
            N--;
            e.monitorRunDependencies && e.monitorRunDependencies(N);
            if (0 == N && (null !== O && (clearInterval(O), O = null), P)) {
              var f = P;
              P = null;
              f();
            }
            return c;
          }
          var b = { a: Ja };
          N++;
          e.monitorRunDependencies && e.monitorRunDependencies(N);
          if (e.instantiateWasm)
            try {
              return e.instantiateWasm(b, a);
            } catch (c) {
              E("Module.instantiateWasm callback failed with error: " + c), l(c);
            }
          pa(b, function(c) {
            a(c.instance);
          }).catch(l);
          return {};
        })();
        e._OrtInit = (a, b) => (e._OrtInit = I.L)(a, b);
        e._OrtGetLastError = (a, b) => (e._OrtGetLastError = I.M)(a, b);
        e._OrtCreateSessionOptions = (a, b, c, f, g, h, m, r, w, t) => (e._OrtCreateSessionOptions = I.N)(a, b, c, f, g, h, m, r, w, t);
        e._OrtAppendExecutionProvider = (a, b) => (e._OrtAppendExecutionProvider = I.O)(a, b);
        e._OrtAddFreeDimensionOverride = (a, b, c) => (e._OrtAddFreeDimensionOverride = I.P)(a, b, c);
        e._OrtAddSessionConfigEntry = (a, b, c) => (e._OrtAddSessionConfigEntry = I.Q)(a, b, c);
        e._OrtReleaseSessionOptions = (a) => (e._OrtReleaseSessionOptions = I.R)(a);
        e._OrtCreateSession = (a, b, c) => (e._OrtCreateSession = I.S)(a, b, c);
        e._OrtReleaseSession = (a) => (e._OrtReleaseSession = I.T)(a);
        e._OrtGetInputOutputCount = (a, b, c) => (e._OrtGetInputOutputCount = I.U)(a, b, c);
        e._OrtGetInputName = (a, b) => (e._OrtGetInputName = I.V)(a, b);
        e._OrtGetOutputName = (a, b) => (e._OrtGetOutputName = I.W)(a, b);
        e._OrtFree = (a) => (e._OrtFree = I.X)(a);
        e._OrtCreateTensor = (a, b, c, f, g, h) => (e._OrtCreateTensor = I.Y)(a, b, c, f, g, h);
        e._OrtGetTensorData = (a, b, c, f, g) => (e._OrtGetTensorData = I.Z)(a, b, c, f, g);
        e._OrtReleaseTensor = (a) => (e._OrtReleaseTensor = I._)(a);
        e._OrtCreateRunOptions = (a, b, c, f) => (e._OrtCreateRunOptions = I.$)(a, b, c, f);
        e._OrtAddRunConfigEntry = (a, b, c) => (e._OrtAddRunConfigEntry = I.aa)(a, b, c);
        e._OrtReleaseRunOptions = (a) => (e._OrtReleaseRunOptions = I.ba)(a);
        e._OrtCreateBinding = (a) => (e._OrtCreateBinding = I.ca)(a);
        e._OrtBindInput = (a, b, c) => (e._OrtBindInput = I.da)(a, b, c);
        e._OrtBindOutput = (a, b, c, f) => (e._OrtBindOutput = I.ea)(a, b, c, f);
        e._OrtClearBoundOutputs = (a) => (e._OrtClearBoundOutputs = I.fa)(a);
        e._OrtReleaseBinding = (a) => (e._OrtReleaseBinding = I.ga)(a);
        e._OrtRunWithBinding = (a, b, c, f, g) => (e._OrtRunWithBinding = I.ha)(a, b, c, f, g);
        e._OrtRun = (a, b, c, f, g, h, m, r) => (e._OrtRun = I.ia)(a, b, c, f, g, h, m, r);
        e._OrtEndProfiling = (a) => (e._OrtEndProfiling = I.ja)(a);
        var Aa = e._malloc = (a) => (Aa = e._malloc = I.ka)(a);
        e._free = (a) => (e._free = I.la)(a);
        var Ia = (a) => (Ia = I.na)(a), La = () => (La = I.oa)(), Ma = (a) => (Ma = I.pa)(a), Na = (a) => (Na = I.qa)(a);
        function Ka(a) {
          a = Object.assign({}, a);
          var b = (f) => () => f() >>> 0, c = (f) => (g) => f(g) >>> 0;
          a.__errno_location = b(a.__errno_location);
          a.malloc = c(a.malloc);
          a.stackSave = b(a.stackSave);
          a.stackAlloc = c(a.stackAlloc);
          return a;
        }
        e.stackAlloc = Na;
        e.stackSave = La;
        e.stackRestore = Ma;
        e.UTF8ToString = T;
        e.stringToUTF8 = (a, b, c) => V(a, K, b, c);
        e.lengthBytesUTF8 = U;
        var Z;
        P = function Oa() {
          Z || Pa();
          Z || (P = Oa);
        };
        function Pa() {
          function a() {
            if (!Z && (Z = true, e.calledRun = true, !da)) {
              S(ha);
              k(e);
              if (e.onRuntimeInitialized)
                e.onRuntimeInitialized();
              if (e.postRun)
                for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; ) {
                  var b = e.postRun.shift();
                  ia.unshift(b);
                }
              S(ia);
            }
          }
          if (!(0 < N)) {
            if (e.preRun)
              for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; )
                ja();
            S(fa);
            0 < N || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                e.setStatus("");
              }, 1);
              a();
            }, 1)) : a());
          }
        }
        if (e.preInit)
          for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length; )
            e.preInit.pop()();
        Pa();
        return moduleArg.ready;
      };
    })();
    if (typeof exports === "object" && typeof module === "object")
      module.exports = ortWasm;
    else if (typeof define === "function" && define["amd"])
      define([], () => ortWasm);
  }
});

// web/lib/wasm/wasm-factory.ts
var ortWasmFactory, ortWasmFactoryThreaded, wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, getWasmFileName, initializeWebAssembly, getInstance;
var init_wasm_factory = __esm({
  "web/lib/wasm/wasm-factory.ts"() {
    "use strict";
    if (false) {
      ortWasmFactory = null;
    } else {
      ortWasmFactory = true ? require_ort_wasm() : null;
    }
    ortWasmFactoryThreaded = false ? true ? null : null : ortWasmFactory;
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
            if (false) {
              return URL.createObjectURL(new Blob(
                [
                  // This require() function is handled by esbuild plugin to load file content as string.
                  // eslint-disable-next-line @typescript-eslint/no-require-imports
                  null
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
        if (false) {
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
var ortEnvInitialized, getSessionInputOutputCount, initOrt, initRuntime, activeSessions, isOrtEnvInitialized, createSessionAllocate, createSessionFinalize, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling;
var init_wasm_core_impl = __esm({
  "web/lib/wasm/wasm-core-impl.ts"() {
    "use strict";
    init_run_options();
    init_session_options();
    init_wasm_common();
    init_wasm_factory();
    init_wasm_utils();
    ortEnvInitialized = false;
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
      ortEnvInitialized = true;
    };
    activeSessions = /* @__PURE__ */ new Map();
    isOrtEnvInitialized = () => ortEnvInitialized;
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
  }
});

// web/lib/wasm/proxy-wrapper.ts
var scriptSrc, initializeWebAssemblyInstance, initializeRuntime, createSessionAllocate2, createSessionFinalize2, createSession2, releaseSession2, run2, endProfiling2, isOrtEnvInitialized2;
var init_proxy_wrapper = __esm({
  "web/lib/wasm/proxy-wrapper.ts"() {
    "use strict";
    init_esm();
    init_wasm_core_impl();
    init_wasm_factory();
    scriptSrc = typeof document !== "undefined" ? document?.currentScript?.src : void 0;
    initializeWebAssemblyInstance = async () => {
      if (false) {
        if (initialized) {
          return;
        }
        if (initializing) {
          throw new Error("multiple calls to 'initWasm()' detected.");
        }
        if (aborted) {
          throw new Error("previous call to 'initWasm()' failed.");
        }
        initializing = true;
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
              null
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
      if (false) {
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
      if (false) {
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
      if (false) {
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
      if (false) {
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
      if (false) {
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
      if (false) {
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
      if (false) {
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
    isOrtEnvInitialized2 = async () => {
      if (false) {
        ensureWorker();
        return new Promise((resolve, reject) => {
          isOrtEnvInitializedCallbacks.push([resolve, reject]);
          const message = { type: "is-ort-env-initialized" };
          proxyWorker.postMessage(message);
        });
      } else {
        return isOrtEnvInitialized();
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

// web/lib/wasm/session-handler-inference.ts
var runtimeInitializationPromise, encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
var init_session_handler_inference = __esm({
  "web/lib/wasm/session-handler-inference.ts"() {
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
        if (!await isOrtEnvInitialized2()) {
          if (!runtimeInitializationPromise) {
            runtimeInitializationPromise = initializeRuntime(env2);
          }
          await runtimeInitializationPromise;
          runtimeInitializationPromise = void 0;
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
    init_session_handler_inference();
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
init_esm();

// web/lib/version.ts
var version2 = "1.17.0";

// web/lib/index.ts
var lib_default = esm_exports;
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
  lib_default as default,
  env2 as env,
  registerBackend
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL29ubnhydW50aW1lLWNvbW1vbi9saWIvYmFja2VuZC1pbXBsLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9vbm54cnVudGltZS1jb21tb24vbGliL2JhY2tlbmQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL29ubnhydW50aW1lLWNvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi9lbnYtaW1wbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi9lbnYudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL29ubnhydW50aW1lLWNvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi90ZW5zb3ItZmFjdG9yeS1pbXBsLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9vbm54cnVudGltZS1jb21tb24vbGliL3RlbnNvci1pbXBsLXR5cGUtbWFwcGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi90ZW5zb3ItaW1wbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi90ZW5zb3IudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL29ubnhydW50aW1lLWNvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24taW1wbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi9vbm54LXZhbHVlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9vbm54cnVudGltZS1jb21tb24vbGliL3RyYWluaW5nLXNlc3Npb24taW1wbC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvb25ueHJ1bnRpbWUtY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9vbm54cnVudGltZS1jb21tb24vbGliL2luZGV4LnRzIiwgIm5vZGVqcy1pZ25vcmU6bm9kZTpvcyIsICJub2RlanMtaWdub3JlOmZzIiwgIm5vZGVqcy1pZ25vcmU6cGF0aCIsICIuLi8uLi9saWIvd2FzbS9iaW5kaW5nL29ydC13YXNtLmpzIiwgIi4uLy4uL2xpYi93YXNtL3dhc20tZmFjdG9yeS50cyIsICIuLi8uLi9saWIvd2FzbS93YXNtLXV0aWxzLnRzIiwgIi4uLy4uL2xpYi93YXNtL3J1bi1vcHRpb25zLnRzIiwgIi4uLy4uL2xpYi93YXNtL3Nlc3Npb24tb3B0aW9ucy50cyIsICIuLi8uLi9saWIvd2FzbS93YXNtLWNvbW1vbi50cyIsICIuLi8uLi9saWIvd2FzbS93YXNtLWNvcmUtaW1wbC50cyIsICIuLi8uLi9saWIvd2FzbS9wcm94eS13cmFwcGVyLnRzIiwgIm5vZGVqcy1pZ25vcmU6bm9kZTpmcy9wcm9taXNlcyIsICIuLi8uLi9saWIvd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlLnRzIiwgIi4uLy4uL2xpYi9iYWNrZW5kLXdhc20udHMiLCAiLi4vLi4vbGliL2JhY2tlbmQtd2FzbS1pbmZlcmVuY2UudHMiLCAiLi4vLi4vbGliL2luZGV4LnRzIiwgIi4uLy4uL2xpYi92ZXJzaW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuXG5pbnRlcmZhY2UgQmFja2VuZEluZm8ge1xuICBiYWNrZW5kOiBCYWNrZW5kO1xuICBwcmlvcml0eTogbnVtYmVyO1xuXG4gIGluaXRQcm9taXNlPzogUHJvbWlzZTx2b2lkPjtcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xuICBhYm9ydGVkPzogYm9vbGVhbjtcbn1cblxuY29uc3QgYmFja2VuZHM6IE1hcDxzdHJpbmcsIEJhY2tlbmRJbmZvPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eTogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIGJhY2tlbmQuXG4gKlxuICogQHBhcmFtIG5hbWUgLSB0aGUgbmFtZSBhcyBhIGtleSB0byBsb29rdXAgYXMgYW4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICogQHBhcmFtIGJhY2tlbmQgLSB0aGUgYmFja2VuZCBvYmplY3QuXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcbiAqIDwgMCwgaXQgd2lsbCBiZSBjb25zaWRlcmVkIGFzIGEgJ2JldGEnIHZlcnNpb24gYW5kIHdpbGwgbm90IGJlIHVzZWQgYXMgYSBmYWxsYmFjayBiYWNrZW5kIGJ5IGRlZmF1bHQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJCYWNrZW5kID0gKG5hbWU6IHN0cmluZywgYmFja2VuZDogQmFja2VuZCwgcHJpb3JpdHk6IG51bWJlcik6IHZvaWQgPT4ge1xuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tlbmQgPSBiYWNrZW5kcy5nZXQobmFtZSk7XG4gICAgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7YmFja2VuZCwgcHJpb3JpdHl9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID4gcHJpb3JpdHkpIHtcbiAgICAgIC8vIHNhbWUgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhIGhpZ2hlciBwcmlvcml0eS4gc2tpcCByZWdpc3RlcmF0aW9uLlxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPT09IHByaW9yaXR5KSB7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQuYmFja2VuZCAhPT0gYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWdpc3RlciBiYWNrZW5kIFwiJHtuYW1lfVwiIHVzaW5nIHByaW9yaXR5ICR7cHJpb3JpdHl9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByaW9yaXR5ID49IDApIHtcbiAgICAgIGNvbnN0IGkgPSBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYmFja2VuZHMuZ2V0KGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eVtpXSkhLnByaW9yaXR5IDw9IHByaW9yaXR5KSB7XG4gICAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAwLCBuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5wdXNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSB2YWxpZCBiYWNrZW5kJyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgYmFja2VuZCBieSBzcGVjaWZpZWQgaGludHMuXG4gKlxuICogQHBhcmFtIGJhY2tlbmRIaW50cyAtIGEgbGlzdCBvZiBleGVjdXRpb24gcHJvdmlkZXIgbmFtZXMgdG8gbG9va3VwLiBJZiBvbWl0dGVkIHVzZSByZWdpc3RlcmVkIGJhY2tlbmRzIGFzIGxpc3QuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYmFja2VuZC5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlQmFja2VuZCA9IGFzeW5jKGJhY2tlbmRIaW50czogcmVhZG9ubHkgc3RyaW5nW10pOiBQcm9taXNlPEJhY2tlbmQ+ID0+IHtcbiAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcbiAgY29uc3QgZXJyb3JzID0gW107XG4gIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XG4gICAgY29uc3QgYmFja2VuZEluZm8gPSBiYWNrZW5kcy5nZXQoYmFja2VuZE5hbWUpO1xuICAgIGlmIChiYWNrZW5kSW5mbykge1xuICAgICAgaWYgKGJhY2tlbmRJbmZvLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICAgICAgfSBlbHNlIGlmIChiYWNrZW5kSW5mby5hYm9ydGVkKSB7XG4gICAgICAgIGNvbnRpbnVlOyAgLy8gY3VycmVudCBiYWNrZW5kIGlzIHVuYXZhaWxhYmxlOyB0cnkgbmV4dFxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0luaXRpYWxpemluZyA9ICEhYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgICAgYmFja2VuZEluZm8uaW5pdFByb21pc2UgPSBiYWNrZW5kSW5mby5iYWNrZW5kLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICAgICAgYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtuYW1lOiBiYWNrZW5kTmFtZSwgZXJyOiBlfSk7XG4gICAgICAgIH1cbiAgICAgICAgYmFja2VuZEluZm8uYWJvcnRlZCA9IHRydWU7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkZWxldGUgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBubyBhdmFpbGFibGUgYmFja2VuZCBmb3VuZC4gRVJSOiAke2Vycm9ycy5tYXAoZSA9PiBgWyR7ZS5uYW1lfV0gJHtlLmVycn1gKS5qb2luKCcsICcpfWApO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7T25ueFZhbHVlfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHtUcmFpbmluZ1Nlc3Npb259IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgU2Vzc2lvbkhhbmRsZXIge1xuICB0eXBlIEZlZWRzVHlwZSA9IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfTtcbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbH07XG4gIHR5cGUgUmV0dXJuVHlwZSA9IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHNoYXJlZCBTZXNzaW9uSGFuZGxlciBmdW5jdGlvbmFsaXR5XG4gKlxuICogQGlnbm9yZVxuICovXG5pbnRlcmZhY2UgU2Vzc2lvbkhhbmRsZXIge1xuICBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD47XG5cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBoYW5kbGVyIGluc3RhbmNlIG9mIGFuIGluZmVyZW5jZSBzZXNzaW9uLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciBleHRlbmRzIFNlc3Npb25IYW5kbGVyIHtcbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XG5cbiAgcnVuKGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxuICAgICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBoYW5kbGVyIGluc3RhbmNlIG9mIGEgdHJhaW5pbmcgaW5mZXJlbmNlIHNlc3Npb24uXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkhhbmRsZXIgZXh0ZW5kcyBTZXNzaW9uSGFuZGxlciB7XG4gIHJlYWRvbmx5IGV2YWxJbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgZXZhbE91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgcnVuRXZhbFN0ZXAoXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG5cbiAgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPjtcbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+O1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxPbm54VmFsdWU+O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGJhY2tlbmQgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBtb2RlbCBpbmZlcmVuY2luZy5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQmFja2VuZCB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiYWNrZW5kIGFzeW5jaHJvbm91c2x5LiBTaG91bGQgdGhyb3cgd2hlbiBmYWlsZWQuXG4gICAqL1xuICBpbml0KCk6IFByb21pc2U8dm9pZD47XG5cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIodXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcblxuICBjcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyP1xuICAgICAgKGNoZWNrcG9pbnRTdGF0ZVVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXIsIHRyYWluTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyLFxuICAgICAgIGV2YWxNb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXIsIG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcixcbiAgICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb25IYW5kbGVyPjtcbn1cblxuZXhwb3J0IHtyZWdpc3RlckJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMTcuMCc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52fSBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5cbnR5cGUgTG9nTGV2ZWxUeXBlID0gRW52Wydsb2dMZXZlbCddO1xuXG5sZXQgbG9nTGV2ZWxWYWx1ZTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiA9ICd3YXJuaW5nJztcblxuZXhwb3J0IGNvbnN0IGVudjogRW52ID0ge1xuICB3YXNtOiB7fSBhcyBFbnYuV2ViQXNzZW1ibHlGbGFncyxcbiAgd2ViZ2w6IHt9IGFzIEVudi5XZWJHTEZsYWdzLFxuICB3ZWJncHU6IHt9IGFzIEVudi5XZWJHcHVGbGFncyxcbiAgdmVyc2lvbnM6IHtjb21tb246IHZlcnNpb259LFxuXG4gIHNldCBsb2dMZXZlbCh2YWx1ZTogTG9nTGV2ZWxUeXBlKSB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgWyd2ZXJib3NlJywgJ2luZm8nLCAnd2FybmluZycsICdlcnJvcicsICdmYXRhbCddLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBsb2dnaW5nIGxldmVsOiAke3ZhbHVlfWApO1xuICAgIH1cbiAgICBsb2dMZXZlbFZhbHVlID0gdmFsdWU7XG4gIH0sXG4gIGdldCBsb2dMZXZlbCgpOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+IHtcbiAgICByZXR1cm4gbG9nTGV2ZWxWYWx1ZTtcbiAgfSxcbn07XG5cbi8vIHNldCBwcm9wZXJ0eSAnbG9nTGV2ZWwnIHNvIHRoYXQgdGhleSBjYW4gYmUgY29ycmVjdGx5IHRyYW5zZmVycmVkIHRvIHdvcmtlciBieSBgcG9zdE1lc3NhZ2UoKWAuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LCAnbG9nTGV2ZWwnLCB7ZW51bWVyYWJsZTogdHJ1ZX0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2VudiBhcyBlbnZJbXBsfSBmcm9tICcuL2Vudi1pbXBsLmpzJztcblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEVudiB7XG4gIGV4cG9ydCB0eXBlIFdhc21QcmVmaXhPckZpbGVQYXRocyA9IHN0cmluZ3x7XG4gICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG4gICAgJ29ydC13YXNtLndhc20nPzogc3RyaW5nO1xuICAgICdvcnQtd2FzbS10aHJlYWRlZC53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXdhc20tc2ltZC53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXRyYWluaW5nLXdhc20tc2ltZC53YXNtJz86IHN0cmluZztcbiAgICAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJz86IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuICB9O1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcbiAgICAgKiB0byAxLCBubyB3b3JrZXIgdGhyZWFkIHdpbGwgYmUgc3Bhd25lZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgU0lNRC4gSWYgc2V0IHRvIGZhbHNlLCBTSU1EIHdpbGwgYmUgZm9yY2VseSBkaXNhYmxlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdHJ1ZWBcbiAgICAgKi9cbiAgICBzaW1kPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBudW1iZXIgc3BlY2lmeWluZyB0aGUgdGltZW91dCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgV2ViQXNzZW1ibHkgYmFja2VuZCwgaW4gbWlsbGlzZWNvbmRzLiBBIHplcm9cbiAgICAgKiB2YWx1ZSBpbmRpY2F0ZXMgbm8gdGltZW91dCBpcyBzZXQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxuICAgICAqL1xuICAgIGluaXRUaW1lb3V0PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY3VzdG9tIFVSTCBwcmVmaXggdG8gdGhlIC53YXNtIGZpbGVzIG9yIGEgc2V0IG9mIG92ZXJyaWRlcyBmb3IgZWFjaCAud2FzbSBmaWxlLiBUaGUgb3ZlcnJpZGUgcGF0aCBzaG91bGQgYmVcbiAgICAgKiBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqL1xuICAgIHdhc21QYXRocz86IFdhc21QcmVmaXhPckZpbGVQYXRocztcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBwcm94eSB0aGUgZXhlY3V0aW9uIG9mIG1haW4gdGhyZWFkIHRvIGEgd29ya2VyIHRocmVhZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHByb3h5PzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgV2ViR0wgQ29udGV4dCBJRCAod2ViZ2wgb3Igd2ViZ2wyKS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCd3ZWJnbDInYFxuICAgICAqL1xuICAgIGNvbnRleHRJZD86ICd3ZWJnbCd8J3dlYmdsMic7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcbiAgICAgKi9cbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seSd8J2Z1bGwnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBhY2tlZCB0ZXh0dXJlIG1vZGVcbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHBhY2s/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgd2hldGhlciBlbmFibGUgYXN5bmMgZG93bmxvYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBhc3luYz86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cbiAgICAgKi9cbiAgICBwcm9maWxpbmdNb2RlPzogJ29mZid8J2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGV2aWNlIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBXaGVuIHVzZSB3aXRoIFR5cGVTY3JpcHQsIHRoZSB0eXBlIG9mIHRoaXMgcHJvcGVydHkgaXMgYEdQVURldmljZWAgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKiBVc2UgYGNvbnN0IGRldmljZSA9IGVudi53ZWJncHUuZGV2aWNlIGFzIEdQVURldmljZTtgIGluIFR5cGVTY3JpcHQgdG8gYWNjZXNzIHRoaXMgcHJvcGVydHkgd2l0aCBjb3JyZWN0IHR5cGUuXG4gICAgICpcbiAgICAgKiBzZWUgY29tbWVudHMgb24ge0BsaW5rIEdwdUJ1ZmZlclR5cGV9IGZvciBtb3JlIGRldGFpbHMgYWJvdXQgd2h5IG5vdCB1c2UgdHlwZXMgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKi9cbiAgICByZWFkb25seSBkZXZpY2U6IHVua25vd247XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIHZhbGlkYXRlIGlucHV0IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB2YWxpZGF0ZUlucHV0Q29udGVudD86IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xuICAvKipcbiAgICogc2V0IHRoZSBzZXZlcml0eSBsZXZlbCBmb3IgbG9nZ2luZy5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgJ3dhcm5pbmcnYFxuICAgKi9cbiAgbG9nTGV2ZWw/OiAndmVyYm9zZSd8J2luZm8nfCd3YXJuaW5nJ3wnZXJyb3InfCdmYXRhbCc7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZSB3aGV0aGVyIHJ1biBpbiBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogR2V0IHZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcGFja2FnZS5cbiAgICovXG4gIHJlYWRvbmx5IHZlcnNpb25zOiB7XG4gICAgcmVhZG9ubHkgY29tbW9uOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgd2ViPzogc3RyaW5nO1xuICAgIHJlYWRvbmx5IG5vZGU/OiBzdHJpbmc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIHJlYWRvbmx5ICdyZWFjdC1uYXRpdmUnPzogc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5XG4gICAqL1xuICByZWFkb25seSB3YXNtOiBFbnYuV2ViQXNzZW1ibHlGbGFncztcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHTFxuICAgKi9cbiAgcmVhZG9ubHkgd2ViZ2w6IEVudi5XZWJHTEZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdQVVxuICAgKi9cbiAgcmVhZG9ubHkgd2ViZ3B1OiBFbnYuV2ViR3B1RmxhZ3M7XG5cbiAgW25hbWU6IHN0cmluZ106IHVua25vd247XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGFzIGEgZ2xvYmFsIHNpbmdsZXRvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudjogRW52ID0gZW52SW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9EYXRhVVJMKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvRGF0YVVSTCA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLndpZHRoID0gdGVuc29yLmRpbXNbM107XG4gIGNhbnZhcy5oZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2UgeyAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucz8uZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0uYmlhcykgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXNbMF0sIG5vcm0uYmlhc1sxXSwgbm9ybS5iaWFzWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0uYmlhc1szXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcbiAgICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICAgIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgICBjb25zdCBSID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07ICAvLyBSIHZhbHVlXG4gICAgICAgIGNvbnN0IEcgPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgIC8vIEcgdmFsdWVcbiAgICAgICAgY29uc3QgQiA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAgLy8gQiB2YWx1ZVxuICAgICAgICBjb25zdCBBID0gYVRlbnNvclBvaW50ZXIgPT09IC0xID9cbiAgICAgICAgICAgIDI1NSA6XG4gICAgICAgICAgICAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgIC8vIEEgdmFsdWVcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXN0cmljdC1wbHVzLW9wZXJhbmRzXG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgnICsgUiArICcsJyArIEcgKyAnLCcgKyBCICsgJywnICsgQSArICcpJztcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxSZWN0KGosIGksIDEsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICB9XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci50b0ltYWdlRGF0YSgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JUb0ltYWdlRGF0YSA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSA9PiB7XG4gIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyk7XG4gIGxldCBpbWFnZTogSW1hZ2VEYXRhO1xuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgY2hhbm5lbHM6IG51bWJlcjtcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzFdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2UgeyAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICB9XG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zICE9PSB1bmRlZmluZWQgPyAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQicpIDogJ1JHQic7XG5cbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDI1NV07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgJiYgKGNoYW5uZWxzID09PSA0ICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnUkdCQScpIHx8XG4gICAgICAgICAgKGNoYW5uZWxzID09PSAzICYmIChvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgZm9ybWF0IGRvZXNuXFwndCBtYXRjaCBpbnB1dCB0ZW5zb3IgZGltcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGNvbnN0IHN0ZXAgPSA0O1xuICAgIGxldCBySW1hZ2VQb2ludGVyID0gMCwgZ0ltYWdlUG9pbnRlciA9IDEsIGJJbWFnZVBvaW50ZXIgPSAyLCBhSW1hZ2VQb2ludGVyID0gMztcbiAgICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICAgIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH1cblxuICAgIGltYWdlID0gcGl4ZWxzMkRDb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0ICogd2lkdGg7XG4gICAgICAgICBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGdJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGkrKykge1xuICAgICAgaW1hZ2UuZGF0YVtySW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAgLy8gUiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtnSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAgLy8gQiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVthSW1hZ2VQb2ludGVyXSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/XG4gICAgICAgICAgMjU1IDpcbiAgICAgICAgICAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgIC8vIEEgdmFsdWVcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxuICByZXR1cm4gaW1hZ2U7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge09wdGlvbnNEaW1lbnNpb25zLCBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JGb3JtYXQsIE9wdGlvbnNUZW5zb3JMYXlvdXQsIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsIFRlbnNvckZyb21UZXh0dXJlT3B0aW9ucywgVGVuc29yRnJvbVVybE9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucywgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQsIG9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyk6IFRlbnNvciA9PiB7XG4gIGlmIChidWZmZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgYnVmZmVyIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLmhlaWdodCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMud2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaGVpZ2h0IGFuZCB3aWR0aCBtdXN0IGJlIGRlZmluZWQnKTtcbiAgfVxuICBpZiAob3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgIHRocm93IG5ldyBFcnJvcignTkhXQyBUZW5zb3IgbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XG4gIH1cblxuICBjb25zdCB7aGVpZ2h0LCB3aWR0aH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IG5vcm0gPSBvcHRpb25zLm5vcm0gPz8ge21lYW46IDI1NSwgYmlhczogMH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICB9IGVsc2Uge1xuICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiFbMF0sIG5vcm0ubWVhbiFbMV0sIG5vcm0ubWVhbiFbMl0sIG5vcm0ubWVhbiFbM10gPz8gMjU1XTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgKG5vcm0uYmlhcykgPT09ICdudW1iZXInKSB7XG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMhWzBdLCBub3JtLmJpYXMhWzFdLCBub3JtLmJpYXMhWzJdLCBub3JtLmJpYXMhWzNdID8/IDBdO1xuICB9XG5cbiAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCQSc7XG4gIC8vIGRlZmF1bHQgdmFsdWUgaXMgUkdCQSBzaW5jZSBpbWFnZWRhdGEgYW5kIEhUTUxJbWFnZUVsZW1lbnQgdXNlcyBpdFxuXG4gIGNvbnN0IG91dHB1dGZvcm1hdCA9XG4gICAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsIHJJbWFnZVBvaW50ZXIgPSAwLCBnSW1hZ2VQb2ludGVyID0gMSwgYkltYWdlUG9pbnRlciA9IDIsIGFJbWFnZVBvaW50ZXIgPSAzO1xuICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgIHN0ZXAgPSAzO1xuICAgIHJJbWFnZVBvaW50ZXIgPSAwO1xuICAgIGdJbWFnZVBvaW50ZXIgPSAxO1xuICAgIGJJbWFnZVBvaW50ZXIgPSAyO1xuICAgIGFJbWFnZVBvaW50ZXIgPSAtMTtcbiAgfVxuXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBvdXRwdXQgdGVuc29yIGZvcm1hdFxuICBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnQkdSJykge1xuICAgIGJUZW5zb3JQb2ludGVyID0gMDtcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICByVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmlkZTtcbiAgICAgICBpKyssIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCkge1xuICAgIGZsb2F0MzJEYXRhW3JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltySW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzBdKSAvIG5vcm1NZWFuWzBdO1xuICAgIGZsb2F0MzJEYXRhW2dUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltnSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzFdKSAvIG5vcm1NZWFuWzFdO1xuICAgIGZsb2F0MzJEYXRhW2JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltiSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzJdKSAvIG5vcm1NZWFuWzJdO1xuICAgIGlmIChhVGVuc29yUG9pbnRlciAhPT0gLTEgJiYgYUltYWdlUG9pbnRlciAhPT0gLTEpIHtcbiAgICAgIGZsb2F0MzJEYXRhW2FUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlclthSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzNdKSAvIG5vcm1NZWFuWzNdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZsb2F0MzJBcnJheSAtPiBvcnQuVGVuc29yXG4gIGNvbnN0IG91dHB1dFRlbnNvciA9IG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnID8gbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgNCwgaGVpZ2h0LCB3aWR0aF0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCAzLCBoZWlnaHQsIHdpZHRoXSk7XG4gIHJldHVybiBvdXRwdXRUZW5zb3I7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tSW1hZ2UoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21JbWFnZSA9IGFzeW5jKFxuICAgIGltYWdlOiBJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxJbWFnZUJpdG1hcHxzdHJpbmcsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XG4gICAgVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFRlbnNvcj4gPT4ge1xuICAvLyBjaGVja2luZyB0aGUgdHlwZSBvZiBpbWFnZSBvYmplY3RcbiAgY29uc3QgaXNIVE1MSW1hZ2VFbGUgPSB0eXBlb2YgKEhUTUxJbWFnZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIChJbWFnZURhdGEpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YTtcbiAgY29uc3QgaXNJbWFnZUJpdG1hcCA9IHR5cGVvZiAoSW1hZ2VCaXRtYXApICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlQml0bWFwO1xuICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZyc7XG5cbiAgbGV0IGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5fHVuZGVmaW5lZDtcbiAgbGV0IGJ1ZmZlclRvVGVuc29yT3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucyA/PyB7fTtcblxuICAvLyBmaWxsaW5nIGFuZCBjaGVja2luZyBpbWFnZSBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgaWYgKGlzSFRNTEltYWdlRWxlKSB7XG4gICAgLy8gSFRNTEltYWdlRWxlbWVudCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBpcyBSR0JBIGJ5IGRlZmF1bHRcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIGlmIChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBpbnB1dCBjb25maWcgZm9ybWF0IG11c3QgYmUgUkdCQSBmb3IgSFRNTEltYWdlRWxlbWVudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cblxuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNJbWFnZURhdGFFbGUpIHtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcbiAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmZvcm1hdCA9ICdSR0JBJztcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICB0ZW1wQ2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBjb25zdCB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1N0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGlmICghaW1hZ2UgfHwgIWNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIG5ld0ltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG4gICAgICBuZXdJbWFnZS5zcmMgPSBpbWFnZTtcbiAgICAgIG5ld0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbmV3SW1hZ2Uud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdJbWFnZS5oZWlnaHQ7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKG5ld0ltYWdlLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBpbWcgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHJlc29sdmUoYnVmZmVyVG9UZW5zb3IoaW1nLmRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xuICB9XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tVGV4dHVyZSgpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVRleHR1cmUgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkb3dubG9hZCwgZGlzcG9zZX0gPSBvcHRpb25zO1xuICAvLyBBbHdheXMgYXNzdW1lIFJHQkFGMzIuIFRPRE86IHN1cHBvcnQgZGlmZmVyZW50IHRleHR1cmUgZm9ybWF0XG4gIGNvbnN0IGRpbXMgPSBbMSwgaGVpZ2h0LCB3aWR0aCwgNF07XG4gIHJldHVybiBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlfSk7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tR3B1QnVmZmVyKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tR3B1QnVmZmVyID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICBncHVCdWZmZXI6IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHtkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9ID0gb3B0aW9ucztcbiAgcmV0dXJuIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsIHR5cGU6IGRhdGFUeXBlID8/ICdmbG9hdDMyJywgZ3B1QnVmZmVyLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZX0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbVBpbm5lZEJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXG4gICAgdHlwZTogVCwgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciA9PlxuICAgIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnY3B1LXBpbm5lZCcsIHR5cGUsIGRhdGE6IGJ1ZmZlciwgZGltczogZGltcyA/PyBbYnVmZmVyLmxlbmd0aF19KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyA9IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3I7XG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRUeXBlZEFycmF5ID0gSW5zdGFuY2VUeXBlPFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+O1xuXG4vLyBhIHJ1bnRpbWUgbWFwIHRoYXQgbWFwcyB0eXBlIHN0cmluZyB0byBUeXBlZEFycmF5IGNvbnN0cnVjdG9yLiBTaG91bGQgbWF0Y2ggVGVuc29yLkRhdGFUeXBlTWFwLlxuZXhwb3J0IGNvbnN0IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgPSBuZXcgTWFwPHN0cmluZywgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz4oW1xuICBbJ2Zsb2F0MzInLCBGbG9hdDMyQXJyYXldLFxuICBbJ3VpbnQ4JywgVWludDhBcnJheV0sXG4gIFsnaW50OCcsIEludDhBcnJheV0sXG4gIFsndWludDE2JywgVWludDE2QXJyYXldLFxuICBbJ2Zsb2F0MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50IGNoZWNraW5nLiBUaGlzIGFsbG93cyBsYXp5IGluaXRpYWxpemF0aW9uIGZvclxuLy8gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCBhbmQgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCwgd2hpY2ggYWxsb3dzIEJpZ0ludCBwb2x5ZmlsbFxuLy8gaWYgYXZhaWxhYmxlLlxubGV0IGlzQmlnSW50Q2hlY2tlZCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGNoZWNrQmlnSW50ID0gKCkgPT4ge1xuICBpZiAoIWlzQmlnSW50Q2hlY2tlZCkge1xuICAgIGlzQmlnSW50Q2hlY2tlZCA9IHRydWU7XG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBCaWdJbnQ2NEFycmF5LmZyb20gPT09ICdmdW5jdGlvbic7XG4gICAgY29uc3QgaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSA9XG4gICAgICAgIHR5cGVvZiBCaWdVaW50NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEJpZ1VpbnQ2NEFycmF5LmZyb20gPT09ICdmdW5jdGlvbic7XG5cbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XG4gICAgfVxuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0NwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycywgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcblxuLyoqXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXG4gKlxuICogQHBhcmFtIGRpbXMgdGhlIGRpbXMgYXJyYXkuIE1heSBiZSBhbiBpbGxlZ2FsIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlU2l6ZSA9IChkaW1zOiByZWFkb25seSB1bmtub3duW10pOiBudW1iZXIgPT4ge1xuICBsZXQgc2l6ZSA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRpbSA9IGRpbXNbaV07XG4gICAgaWYgKHR5cGVvZiBkaW0gIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaW0pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgaWYgKGRpbSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgc2l6ZSAqPSBkaW07XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5yZXNoYXBlKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclJlc2hhcGUgPSAodGVuc29yOiBUZW5zb3IsIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yLnR5cGUsIHRlbnNvci5kYXRhLCBkaW1zKTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdjcHUtcGlubmVkJyxcbiAgICAgICAgZGF0YTogdGVuc29yLmRhdGEgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWydkYXRhJ10sXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAndGV4dHVyZScsXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcbiAgICAgICAgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge3RlbnNvclRvRGF0YVVSTCwgdGVuc29yVG9JbWFnZURhdGF9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24taW1wbC5qcyc7XG5pbXBvcnQge1RlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9uc30gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5pbXBvcnQge3RlbnNvckZyb21HcHVCdWZmZXIsIHRlbnNvckZyb21JbWFnZSwgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlciwgdGVuc29yRnJvbVRleHR1cmV9IGZyb20gJy4vdGVuc29yLWZhY3RvcnktaW1wbC5qcyc7XG5pbXBvcnQge0NwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycywgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucywgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLCBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsIFRlbnNvckZyb21VcmxPcHRpb25zLCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7Y2hlY2tCaWdJbnQsIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAsIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIFN1cHBvcnRlZFR5cGVkQXJyYXksIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnN9IGZyb20gJy4vdGVuc29yLWltcGwtdHlwZS1tYXBwaW5nLmpzJztcbmltcG9ydCB7Y2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZX0gZnJvbSAnLi90ZW5zb3ItdXRpbHMtaW1wbC5qcyc7XG5pbXBvcnQge1RlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2V9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcblxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xuXG4vKipcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbnNvciBpbXBsZW1lbnRzIFRlbnNvckludGVyZmFjZSB7XG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICB0eXBlOiBUZW5zb3JUeXBlLCBkYXRhOiBUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBib29sZWFuW10sXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IENQVSB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuIFR5cGUgaXMgaW5mZXJyZWQgZnJvbSBkYXRhLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZGF0YTogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYXJnMDogVGVuc29yVHlwZXxUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBib29sZWFuW118Q3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzfFxuICAgICAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc3xHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gICAgICBhcmcxPzogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdLCBhcmcyPzogcmVhZG9ubHkgbnVtYmVyW10pIHtcbiAgICAvLyBwZXJmb3JtIG9uZS10aW1lIGNoZWNrIGZvciBCaWdJbnQgc3VwcG9ydFxuICAgIGNoZWNrQmlnSW50KCk7XG5cbiAgICBsZXQgdHlwZTogVGVuc29yVHlwZTtcbiAgICBsZXQgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdvYmplY3QnICYmICdsb2NhdGlvbicgaW4gYXJnMCkge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBzcGVjaWZpYyBsb2NhdGlvblxuICAgICAgLy9cbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gYXJnMC5sb2NhdGlvbjtcbiAgICAgIHR5cGUgPSBhcmcwLnR5cGU7XG4gICAgICBkaW1zID0gYXJnMC5kaW1zO1xuICAgICAgc3dpdGNoIChhcmcwLmxvY2F0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOiB7XG4gICAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldCh0eXBlKTtcbiAgICAgICAgICBpZiAoIWV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBwaW5uZWQgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKGFyZzAuZGF0YSBpbnN0YW5jZW9mIGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnVmZmVyIHNob3VsZCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gYXJnMC5kYXRhO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHR1cmUnOiB7XG4gICAgICAgICAgaWYgKHR5cGUgIT09ICdmbG9hdDMyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gdGV4dHVyZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gYXJnMC50ZXh0dXJlO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgICAgIGlmICgodHlwZSAhPT0gJ2Zsb2F0MzInICYmIHR5cGUgIT09ICdmbG9hdDE2JyAmJiB0eXBlICE9PSAnaW50MzInICYmIHR5cGUgIT09ICdpbnQ2NCcgJiYgdHlwZSAhPT0gJ3VpbnQzMicgJiZcbiAgICAgICAgICAgICAgIHR5cGUgIT09ICdib29sJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIGdwdSBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gYXJnMC5ncHVCdWZmZXI7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IgY29uc3RydWN0b3I6IHVuc3VwcG9ydGVkIGxvY2F0aW9uICcke3RoaXMuZGF0YUxvY2F0aW9ufSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcbiAgICAgIC8vXG4gICAgICBsZXQgZGF0YTogVGVuc29yRGF0YVR5cGU7XG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMXx0eXBlb2YgYXJnMjtcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgYXJnMCBpcyB0eXBlIG9yIGRhdGFcbiAgICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKHR5cGUsIGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgdHlwZSA9IGFyZzA7XG4gICAgICAgIG1heWJlRGltcyA9IGFyZzI7XG4gICAgICAgIGlmIChhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIHN0cmluZyB0ZW5zb3JcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Egc3RyaW5nIHRlbnNvclxcJ3MgZGF0YSBtdXN0IGJlIGEgc3RyaW5nIGFycmF5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSBkb24ndCBjaGVjayB3aGV0aGVyIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIGFycmF5IGlzIHN0cmluZzsgdGhpcyBpcyB0b28gc2xvdy4gd2UgYXNzdW1lIGl0J3MgY29ycmVjdCBhbmRcbiAgICAgICAgICAvLyBlcnJvciB3aWxsIGJlIHBvcHVsYXRlZCBhdCBpbmZlcmVuY2VcbiAgICAgICAgICBkYXRhID0gYXJnMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBudW1lcmljIHRlbnNvclxuICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KGFyZzApO1xuICAgICAgICAgIGlmICh0eXBlZEFycmF5Q29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdGVuc29yIHR5cGU6ICR7YXJnMH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgICAgICBpZiAoYXJnMCA9PT0gJ2Zsb2F0MTYnKSB7XG4gICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGhlcmUgYmVjYXVzZSB3aGVuIHVzZXIgdHJ5IHRvIHVzZSBudW1iZXIgYXJyYXkgYXMgZGF0YSxcbiAgICAgICAgICAgICAgLy8gZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxuICAgICAgICAgICAgICAvLyBVaW50MTZBcnJheS5mcm9tKGFyZzEpIHdoaWNoIGdlbmVyYXRlcyB3cm9uZyBkYXRhLlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgJ0NyZWF0aW5nIGEgZmxvYXQxNiB0ZW5zb3IgZnJvbSBudW1iZXIgYXJyYXkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVzZSBVaW50MTZBcnJheSBhcyBkYXRhLicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmcwID09PSAndWludDY0JyB8fCBhcmcwID09PSAnaW50NjQnKSB7XG4gICAgICAgICAgICAgIC8vIHVzZSAnYXMgYW55JyBoZXJlIGJlY2F1c2U6XG4gICAgICAgICAgICAgIC8vIDEuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB0eXBlIG9mICdBcnJheS5pc0FycmF5KCknIGRvZXMgbm90IHdvcmsgd2l0aCByZWFkb25seSBhcnJheXMuXG4gICAgICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzE3MDAyXG4gICAgICAgICAgICAgIC8vIDIuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB1bmlvbiB0eXBlIG9mICcoQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IpLmZyb20oKSdcbiAgICAgICAgICAgICAgLy8gZG9lcyBub3QgYWNjZXB0IHBhcmFtZXRlciBtYXBGbi5cbiAgICAgICAgICAgICAgLy8gMy4gcGFyYW1ldGVycyBvZiAnU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycy5mcm9tKCknIGRvZXMgbm90IG1hdGNoIHRoZSByZXF1aXJlbWVudCBvZiB0aGUgdW5pb25cbiAgICAgICAgICAgICAgLy8gdHlwZS5cblxuICAgICAgICAgICAgICAvLyBhc3N1bWUgJ2FyZzEnIGlzIG9mIHR5cGUgXCJyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBiaWdpbnRbXVwiIGhlcmUuXG5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEsIEJpZ0ludCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBhc3N1bWUgJ2FyZzEnIGlzIG9mIHR5cGUgXCJyZWFkb25seSBudW1iZXJbXVwiIGhlcmUuXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGFyZzEgaW5zdGFuY2VvZiB0eXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGRhdGEgPSBhcmcxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBICR7dHlwZX0gdGVuc29yJ3MgZGF0YSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlZEFycmF5Q29uc3RydWN0b3J9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL1xuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IoZGF0YSwgLi4uKVxuICAgICAgICAvL1xuICAgICAgICBtYXliZURpbXMgPSBhcmcxO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcwKSkge1xuICAgICAgICAgIC8vIG9ubHkgYm9vbGVhbltdIGFuZCBzdHJpbmdbXSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICBpZiAoYXJnMC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RlbnNvciB0eXBlIGNhbm5vdCBiZSBpbmZlcnJlZCBmcm9tIGFuIGVtcHR5IGFycmF5LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBmaXJzdEVsZW1lbnRUeXBlID0gdHlwZW9mIGFyZzBbMF07XG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudFR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0eXBlID0gJ3N0cmluZyc7XG4gICAgICAgICAgICBkYXRhID0gYXJnMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0RWxlbWVudFR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdHlwZSA9ICdib29sJztcbiAgICAgICAgICAgIC8vICdhcmcwJyBpcyBvZiB0eXBlICdib29sZWFuW10nLiBVaW50OEFycmF5LmZyb20oYm9vbGVhbltdKSBhY3R1YWxseSB3b3JrcywgYnV0IHR5cGVzY3JpcHQgdGhpbmtzIHRoaXMgaXNcbiAgICAgICAgICAgIC8vIHdyb25nIHR5cGUuIFdlIHVzZSAnYXMgYW55JyB0byBtYWtlIGl0IGhhcHB5LlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMCBhcyBhbnlbXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgZWxlbWVudCB0eXBlIG9mIGRhdGEgYXJyYXk6ICR7Zmlyc3RFbGVtZW50VHlwZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGdldCB0ZW5zb3IgdHlwZSBmcm9tIFR5cGVkQXJyYXlcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID1cbiAgICAgICAgICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5nZXQoYXJnMC5jb25zdHJ1Y3RvciBhcyBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzKTtcbiAgICAgICAgICBpZiAobWFwcGVkVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHlwZSA9IG1hcHBlZFR5cGU7XG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0eXBlIGFuZCBkYXRhIGlzIHByb2Nlc3NlZCwgbm93IHByb2Nlc3NpbmcgZGltc1xuICAgICAgaWYgKG1heWJlRGltcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxuICAgICAgICBtYXliZURpbXMgPSBbZGF0YS5sZW5ndGhdO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtYXliZURpbXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgdGVuc29yXFwncyBkaW1zIG11c3QgYmUgYSBudW1iZXIgYXJyYXknKTtcbiAgICAgIH1cbiAgICAgIGRpbXMgPSBtYXliZURpbXMgYXMgcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gY2hlY2sgb24gZGltc1xuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xuICAgIC8vIGlmIGRhdGEgaXMgb24gQ1BVLCBjaGVjayB3aGV0aGVyIGRhdGEgbGVuZ3RoIG1hdGNoZXMgdGVuc29yIHNpemVcbiAgICBpZiAodGhpcy5jcHVEYXRhICYmIHNpemUgIT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZGltcyA9IGRpbXM7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBmYWN0b3J5XG4gIHN0YXRpYyBhc3luYyBmcm9tSW1hZ2UoXG4gICAgICBpbWFnZTogSW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SW1hZ2VCaXRtYXB8c3RyaW5nLFxuICAgICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XG4gICAgICBUZW5zb3JGcm9tVXJsT3B0aW9ucyk6IFByb21pc2U8VGVuc29ySW50ZXJmYWNlPiB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21JbWFnZShpbWFnZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4pOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tVGV4dHVyZSh0ZXh0dXJlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tR3B1QnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICAgIGdwdUJ1ZmZlcjogVGVuc29yR3B1QnVmZmVyVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4pOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXG4gICAgICB0eXBlOiBULCBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcih0eXBlLCBidWZmZXIsIGRpbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29udmVyc2lvbnNcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVuc29yVG9EYXRhVVJMKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSB7XG4gICAgcmV0dXJuIHRlbnNvclRvSW1hZ2VEYXRhKHRoaXMsIG9wdGlvbnMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHB1YmxpYyBmaWVsZHNcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIHJlYWRvbmx5IHR5cGU6IFRlbnNvclR5cGU7XG4gIHJlYWRvbmx5IHNpemU6IG51bWJlcjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJpdmF0ZSBmaWVsZHNcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGF0YUxvY2F0aW9uOiBUZW5zb3JEYXRhTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgZGF0YSBvbiBDUFUsIGlmIGxvY2F0aW9uIGlzICdjcHUnIG9yICdjcHUtcGlubmVkJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjcHVEYXRhPzogVGVuc29yRGF0YVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyB0ZXh0dXJlIHdoZW4gbG9jYXRpb24gaXMgJ3RleHR1cmUnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdVRleHR1cmVEYXRhPzogVGVuc29yVGV4dHVyZVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyBHUFUgYnVmZmVyIHdoZW4gbG9jYXRpb24gaXMgJ2dwdS1idWZmZXInLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdUJ1ZmZlckRhdGE/OiBUZW5zb3JHcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZG93bmxvYWRlciBmdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRlcj8oKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT47XG5cbiAgLyoqXG4gICAqIGEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGRhdGEgaXMgYmVpbmcgZG93bmxvYWRlZCBmcm9tIEdQVSB0byBDUFUuXG4gICAqL1xuICBwcml2YXRlIGlzRG93bmxvYWRpbmc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZGlzcG9zZXIgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdW5kZXJseWluZyBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBkaXNwb3Nlcj8oKTogdm9pZDtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJvcGVydGllc1xuICBnZXQgZGF0YSgpOiBUZW5zb3JEYXRhVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5jcHVEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xuICAgICAgICAgICdvciB1c2UgYHRleHR1cmVgIG9yIGBncHVCdWZmZXJgIHByb3BlcnR5IHRvIGFjY2VzcyB0aGUgR1BVIGRhdGEgZGlyZWN0bHkuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XG4gIH1cblxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XG4gIH1cblxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XG4gIH1cblxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBtZXRob2RzXG5cbiAgYXN5bmMgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPiB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIHN3aXRjaCAodGhpcy5kYXRhTG9jYXRpb24pIHtcbiAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBnZXQgZGF0YSBmcm9tIGxvY2F0aW9uOiAke3RoaXMuZGF0YUxvY2F0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNwb3Nlcikge1xuICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5jcHVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdub25lJztcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHRlbnNvciB1dGlsaXRpZXNcbiAgcHJpdmF0ZSBlbnN1cmVWYWxpZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhTG9jYXRpb24gPT09ICdub25lJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGVuc29yIGlzIGRpc3Bvc2VkLicpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2hhcGUoZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAodGhpcy5kb3dubG9hZGVyIHx8IHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlc2hhcGUgYSB0ZW5zb3IgdGhhdCBvd25zIEdQVSByZXNvdXJjZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbnNvclJlc2hhcGUodGhpcywgZGltcyk7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvckZhY3Rvcnl9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW1wbH0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XG5pbXBvcnQge1R5cGVkVGVuc29yVXRpbHN9IGZyb20gJy4vdGVuc29yLXV0aWxzLmpzJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZGVjbGFyZSAqL1xuXG4vKipcbiAqIHJlcHJlc2VudCBhIGJhc2ljIHRlbnNvciB3aXRoIHNwZWNpZmllZCBkaW1lbnNpb25zIGFuZCBkYXRhIHR5cGUuXG4gKi9cbmludGVyZmFjZSBUeXBlZFRlbnNvckJhc2U8VCBleHRlbmRzIFRlbnNvci5UeXBlPiB7XG4gIC8qKlxuICAgKiBHZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICAvKipcbiAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IHR5cGU6IFQ7XG4gIC8qKlxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBDUFUgKGVnLiBpdCdzIGluIHRoZSBmb3JtIG9mIFdlYkdMIHRleHR1cmUgb3IgV2ViR1BVIGJ1ZmZlciksIHRocm93IGVycm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdO1xuICAvKipcbiAgICogR2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uO1xuICAvKipcbiAgICogR2V0IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gR1BVIGFzIFdlYkdMIHRleHR1cmUsIHRocm93IGVycm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlO1xuICAvKipcbiAgICogR2V0IHRoZSBXZWJHUFUgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gR1BVIGFzIFdlYkdQVSBidWZmZXIsIHRocm93IGVycm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgZ3B1QnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZTtcblxuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJldHVybnMgdGhlIGRhdGEgaW1tZWRpYXRlbHkuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgZG93bmxvYWRzIHRoZSBkYXRhIGFuZCByZXR1cm5zIHRoZSBwcm9taXNlLlxuICAgKlxuICAgKiBAcGFyYW0gcmVsZWFzZURhdGEgLSB3aGV0aGVyIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLiBJZ25vcmUgaWYgZGF0YSBpcyBhbHJlYWR5IG9uIENQVS5cbiAgICovXG4gIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZW1vdmUgaXRzIGludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBkYXRhLlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLlxuICAgKlxuICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHRoZSB0ZW5zb3IgaXMgY29uc2lkZXJlZCBubyBsb25nZXIgdmFsaWQuIEl0cyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbm9uZScuXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBUZW5zb3Ige1xuICBpbnRlcmZhY2UgRGF0YVR5cGVNYXAge1xuICAgIGZsb2F0MzI6IEZsb2F0MzJBcnJheTtcbiAgICB1aW50ODogVWludDhBcnJheTtcbiAgICBpbnQ4OiBJbnQ4QXJyYXk7XG4gICAgdWludDE2OiBVaW50MTZBcnJheTtcbiAgICBpbnQxNjogSW50MTZBcnJheTtcbiAgICBpbnQzMjogSW50MzJBcnJheTtcbiAgICBpbnQ2NDogQmlnSW50NjRBcnJheTtcbiAgICBzdHJpbmc6IHN0cmluZ1tdO1xuICAgIGJvb2w6IFVpbnQ4QXJyYXk7XG4gICAgZmxvYXQxNjogVWludDE2QXJyYXk7ICAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXG4gICAgZmxvYXQ2NDogRmxvYXQ2NEFycmF5O1xuICAgIHVpbnQzMjogVWludDMyQXJyYXk7XG4gICAgdWludDY0OiBCaWdVaW50NjRBcnJheTtcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcbiAgfVxuXG4gIGludGVyZmFjZSBFbGVtZW50VHlwZU1hcCB7XG4gICAgZmxvYXQzMjogbnVtYmVyO1xuICAgIHVpbnQ4OiBudW1iZXI7XG4gICAgaW50ODogbnVtYmVyO1xuICAgIHVpbnQxNjogbnVtYmVyO1xuICAgIGludDE2OiBudW1iZXI7XG4gICAgaW50MzI6IG51bWJlcjtcbiAgICBpbnQ2NDogYmlnaW50O1xuICAgIHN0cmluZzogc3RyaW5nO1xuICAgIGJvb2w6IGJvb2xlYW47XG4gICAgZmxvYXQxNjogbnVtYmVyOyAgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IG51bWJlcjtcbiAgICB1aW50MzI6IG51bWJlcjtcbiAgICB1aW50NjQ6IGJpZ2ludDtcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcbiAgfVxuXG4gIHR5cGUgRGF0YVR5cGUgPSBEYXRhVHlwZU1hcFtUeXBlXTtcbiAgdHlwZSBFbGVtZW50VHlwZSA9IEVsZW1lbnRUeXBlTWFwW1R5cGVdO1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgQ3B1UGlubmVkRGF0YVR5cGVzID0gRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJHTCB0ZXh0dXJlXG4gICAqL1xuICBleHBvcnQgdHlwZSBUZXh0dXJlVHlwZSA9IFdlYkdMVGV4dHVyZTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJztcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxuICAgKlxuICAgKiBUaGUgcmVhc29uIHdoeSB3ZSBkb24ndCB1c2UgdHlwZSBcIkdQVUJ1ZmZlclwiIGRlZmluZWQgaW4gd2ViZ3B1LmQudHMgZnJvbSBAd2ViZ3B1L3R5cGVzIGlzIGJlY2F1c2UgXCJAd2ViZ3B1L3R5cGVzXCJcbiAgICogcmVxdWlyZXMgXCJAdHlwZXMvZG9tLXdlYmNvZGVjc1wiIGFzIHBlZXIgZGVwZW5kZW5jeSB3aGVuIHVzaW5nIFR5cGVTY3JpcHQgPCB2NS4xIGFuZCBpdHMgdmVyc2lvbiBuZWVkIHRvIGJlIGNob3NlblxuICAgKiBjYXJlZnVsbHkgYWNjb3JkaW5nIHRvIHRoZSBUeXBlU2NyaXB0IHZlcnNpb24gYmVpbmcgdXNlZC4gVGhpcyBtZWFucyBzbyBmYXIgdGhlcmUgaXMgbm90IGEgd2F5IHRvIGtlZXAgZXZlcnlcbiAgICogVHlwZVNjcmlwdCB2ZXJzaW9uIGhhcHB5LiBJdCB0dXJucyBvdXQgdGhhdCB3ZSB3aWxsIGVhc2lseSBicm9rZSB1c2VycyBvbiBzb21lIFR5cGVTY3JpcHQgdmVyc2lvbi5cbiAgICpcbiAgICogZm9yIG1vcmUgaW5mbyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dwdXdlYi90eXBlcy9pc3N1ZXMvMTI3XG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJUeXBlID0ge3NpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJ307XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIEdwdUJ1ZmZlckRhdGFUeXBlcyA9ICdmbG9hdDMyJ3wnZmxvYXQxNid8J2ludDMyJ3wnaW50NjQnfCd1aW50MzInfCdib29sJztcblxuICAvKipcbiAgICogcmVwcmVzZW50IHdoZXJlIHRoZSB0ZW5zb3IgZGF0YSBpcyBzdG9yZWRcbiAgICovXG4gIGV4cG9ydCB0eXBlIERhdGFMb2NhdGlvbiA9ICdub25lJ3wnY3B1J3wnY3B1LXBpbm5lZCd8J3RleHR1cmUnfCdncHUtYnVmZmVyJztcblxuICAvKipcbiAgICogcmVwcmVzZW50IHRoZSBkYXRhIHR5cGUgb2YgYSB0ZW5zb3JcbiAgICovXG4gIGV4cG9ydCB0eXBlIFR5cGUgPSBrZXlvZiBEYXRhVHlwZU1hcDtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlZFRlbnNvcjxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFQ+LCBUeXBlZFRlbnNvclV0aWxzPFQ+IHt9XG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvciBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUZW5zb3IuVHlwZT4sIFR5cGVkVGVuc29yVXRpbHM8VGVuc29yLlR5cGU+IHt9XG5cbi8qKlxuICogdHlwZSBUZW5zb3JDb25zdHJ1Y3RvciBkZWZpbmVzIHRoZSBjb25zdHJ1Y3RvcnMgb2YgJ1RlbnNvcicgdG8gY3JlYXRlIENQVSB0ZW5zb3IgaW5zdGFuY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckNvbnN0cnVjdG9yIHtcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KHR5cGU6ICdzdHJpbmcnLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddfHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcodHlwZTogJ2Jvb2wnLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ2Jvb2wnXXxyZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXc8VCBleHRlbmRzICd1aW50NjQnfCdpbnQ2NCc+KFxuICAgICAgdHlwZTogVCwgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdfHJlYWRvbmx5IGJpZ2ludFtdfHJlYWRvbmx5IG51bWJlcltdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8VD47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBudW1lcmljIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldzxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyd8J2Jvb2wnfCd1aW50NjQnfCdpbnQ2NCc+PihcbiAgICAgIHR5cGU6IFQsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXXxyZWFkb25seSBudW1iZXJbXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8VD47XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBpbmZlciBlbGVtZW50IHR5cGVzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogSW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50OCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVWludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVWludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MTYnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQxNic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogSW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBCaWdJbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50NjQnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiByZWFkb25seSBzdHJpbmdbXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEZsb2F0NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0NjQnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBVaW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQzMic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEJpZ1VpbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDY0Jz47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KHR5cGU6IFRlbnNvci5UeXBlLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGV8cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYmlnaW50W118cmVhZG9ubHkgYm9vbGVhbltdLFxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRlbnNvciA9IFRlbnNvckltcGwgYXMgKFRlbnNvckNvbnN0cnVjdG9yICYgVGVuc29yRmFjdG9yeSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVzb2x2ZUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZX0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlNlc3Npb25PcHRpb25zO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SdW5PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SZXR1cm5UeXBlO1xuXG5leHBvcnQgY2xhc3MgSW5mZXJlbmNlU2Vzc2lvbiBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgfVxuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIGNvbnN0IGZldGNoZXM6IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfG51bGx9ID0ge307XG4gICAgbGV0IG9wdGlvbnM6IFJ1bk9wdGlvbnMgPSB7fTtcbiAgICAvLyBjaGVjayBpbnB1dHNcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnXFwnZmVlZHNcXCcgbXVzdCBiZSBhbiBvYmplY3QgdGhhdCB1c2UgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLicpO1xuICAgIH1cblxuICAgIGxldCBpc0ZldGNoZXNFbXB0eSA9IHRydWU7XG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG92ZXJyaWRlIGlzIGJlaW5nIHVzZWRcbiAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoYXJnMSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcxIGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgY2Fubm90IGJlIGEgVGVuc29yJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIC8vIG91dHB1dCBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgYXJnMSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgbXVzdCBiZSBhIHN0cmluZyBhcnJheSBvciBhbiBvYmplY3QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogbXVzdCBiZSBcXCdmZXRjaGVzXFwnIG9yIFxcJ29wdGlvbnNcXCcuJyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgYWxsIGlucHV0cyBhcmUgaW4gZmVlZFxuICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmlucHV0TmFtZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgZmVlZHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgJyR7bmFtZX0nIGlzIG1pc3NpbmcgaW4gJ2ZlZWRzJy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBubyBmZXRjaGVzIGlzIHNwZWNpZmllZCwgd2UgdXNlIHRoZSBmdWxsIG91dHB1dCBuYW1lcyBsaXN0XG4gICAgaWYgKGlzRmV0Y2hlc0VtcHR5KSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucyBhcmUgcHJlcGFyZWRcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuKGZlZWRzLCBmZXRjaGVzLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXR1cm5WYWx1ZToge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aD86IG51bWJlciwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlKFxuICAgICAgYXJnMDogc3RyaW5nfEFycmF5QnVmZmVyTGlrZXxVaW50OEFycmF5LCBhcmcxPzogU2Vzc2lvbk9wdGlvbnN8bnVtYmVyLCBhcmcyPzogbnVtYmVyLFxuICAgICAgYXJnMz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgLy8gZWl0aGVyIGxvYWQgZnJvbSBhIGZpbGUgb3IgYnVmZmVyXG4gICAgbGV0IGZpbGVQYXRoT3JVaW50OEFycmF5OiBzdHJpbmd8VWludDhBcnJheTtcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBhcmcwO1xuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcbiAgICAgICAgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYXJnMCBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKSkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXJnMDtcbiAgICAgIGxldCBieXRlT2Zmc2V0ID0gMDtcbiAgICAgIGxldCBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgYnl0ZU9mZnNldCA9IGFyZzE7XG4gICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnYnl0ZU9mZnNldFxcJyBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVPZmZzZXQnIGlzIG91dCBvZiByYW5nZSBbMCwgJHtidWZmZXIuYnl0ZUxlbmd0aH0pLmApO1xuICAgICAgICB9XG4gICAgICAgIGJ5dGVMZW5ndGggPSBhcmcwLmJ5dGVMZW5ndGggLSBieXRlT2Zmc2V0O1xuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzI7XG4gICAgICAgICAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihieXRlTGVuZ3RoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2J5dGVMZW5ndGhcXCcgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdieXRlTGVuZ3RoXFwnIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMF06IG11c3QgYmUgXFwncGF0aFxcJyBvciBcXCdidWZmZXJcXCcuJyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGJhY2tlbmQgaGludHNcbiAgICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcbiAgICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKGkgPT4gdHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSk7XG4gICAgY29uc3QgYmFja2VuZCA9IGF3YWl0IHJlc29sdmVCYWNrZW5kKGJhY2tlbmRIaW50cyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgSW5mZXJlbmNlU2Vzc2lvbihoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlci5zdGFydFByb2ZpbGluZygpO1xuICB9XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuZW5kUHJvZmlsaW5nKCk7XG4gIH1cblxuICBnZXQgaW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCBvdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7T25ueFZhbHVlLCBPbm54VmFsdWVEYXRhTG9jYXRpb259IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEluZmVyZW5jZVNlc3Npb24ge1xuICAvLyAjcmVnaW9uIGlucHV0L291dHB1dCB0eXBlc1xuXG4gIHR5cGUgT25ueFZhbHVlTWFwVHlwZSA9IHtyZWFkb25seSBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7cmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xuXG4gIC8qKlxuICAgKiBBIGZlZWRzIChtb2RlbCBpbnB1dHMpIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBGZWVkc1R5cGUgPSBPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGZldGNoZXMgKG1vZGVsIG91dHB1dHMpIGNvdWxkIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgKlxuICAgKiAtIE9taXR0ZWQuIFVzZSBtb2RlbCdzIG91dHB1dCBuYW1lcyBkZWZpbml0aW9uLlxuICAgKiAtIEFuIGFycmF5IG9mIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBvdXRwdXQgbmFtZXMuXG4gICAqIC0gQW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgb3IgbnVsbCBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQHJlbWFya1xuICAgKiBkaWZmZXJlbnQgZnJvbSBpbnB1dCBhcmd1bWVudCwgaW4gb3V0cHV0LCBPbm54VmFsdWUgaXMgb3B0aW9uYWwuIElmIGFuIE9ubnhWYWx1ZSBpcyBwcmVzZW50IGl0IHdpbGwgYmVcbiAgICogdXNlZCBhcyBhIHByZS1hbGxvY2F0ZWQgdmFsdWUgYnkgdGhlIGluZmVyZW5jZSBlbmdpbmU7IGlmIG9taXR0ZWQsIGluZmVyZW5jZSBlbmdpbmUgd2lsbCBhbGxvY2F0ZSBidWZmZXJcbiAgICogaW50ZXJuYWxseS5cbiAgICovXG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSByZWFkb25seSBzdHJpbmdbXXxOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgaW5mZXJlbmNpbmcgcmV0dXJuIHR5cGUgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBSZXR1cm5UeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBzZXNzaW9uIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIHNlc3Npb24gYmVoYXZpb3IuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEFuIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb24gY2FuIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIGV4ZWN1dGlvbiBwcm92aWRlcixcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxuICAgICAqL1xuICAgIGV4ZWN1dGlvblByb3ZpZGVycz86IHJlYWRvbmx5IEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50cmEgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludGVyT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGZyZWVEaW1lbnNpb25PdmVycmlkZXM/OiB7cmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlcn07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw/OiAnZGlzYWJsZWQnfCdiYXNpYyd8J2V4dGVuZGVkJ3wnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnfCdwYXJhbGxlbCc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxuICAgICAqL1xuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXZXRoZXIgZW5hYmxlIHByb2ZpbGluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXG4gICAgICovXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIElELlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ0lkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwfDF8MnwzfDQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBzdHJpbmcgYXMgYSBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBmb3IgYWxsIG91dHB1dHMsIG9yIGFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgYVxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR0wgYW5kIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj86IE9ubnhWYWx1ZURhdGFMb2NhdGlvbnx7cmVhZG9ubHkgW291dHB1dE5hbWU6IHN0cmluZ106IE9ubnhWYWx1ZURhdGFMb2NhdGlvbn07XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBjb25maWd1cmF0aW9ucyBmb3IgYSBzZXNzaW9uLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cbiAgICAgKiBvbm54cnVudGltZV9zZXNzaW9uX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBzZXNzaW9uOiB7XG4gICAgICogICAgIHNldF9kZW5vcm1hbF9hc196ZXJvOiBcIjFcIixcbiAgICAgKiAgICAgZGlzYWJsZV9wcmVwYWNraW5nOiBcIjFcIlxuICAgICAqICAgfSxcbiAgICAgKiAgIG9wdGltaXphdGlvbjoge1xuICAgICAqICAgICBlbmFibGVfZ2VsdV9hcHByb3hpbWF0aW9uOiBcIjFcIlxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBleGVjdXRpb24gcHJvdmlkZXJzXG5cbiAgLy8gQ3VycmVudGx5LCB3ZSBoYXZlIHRoZSBmb2xsb3dpbmcgYmFja2VuZHMgdG8gc3VwcG9ydCBleGVjdXRpb24gcHJvdmlkZXJzOlxuICAvLyBCYWNrZW5kIE5vZGUuanMgYmluZGluZzogc3VwcG9ydHMgJ2NwdScgYW5kICdjdWRhJy5cbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3hubnBhY2snIGFuZCAnd2Vibm4nLlxuICAvLyBCYWNrZW5kIE9OTlguanM6IHN1cHBvcnRzICd3ZWJnbCcuXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XG4gICAgY3B1OiBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjb3JlbWw6IENvcmVNbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBkbWw6IERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdhc206IFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYmdwdTogV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2Vibm46IFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgbm5hcGk6IE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gIH1cblxuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyTmFtZSA9IGtleW9mIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwO1xuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnID1cbiAgICAgIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwW0V4ZWN1dGlvblByb3ZpZGVyTmFtZV18RXhlY3V0aW9uUHJvdmlkZXJPcHRpb258RXhlY3V0aW9uUHJvdmlkZXJOYW1lfHN0cmluZztcblxuICBleHBvcnQgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY3B1JztcbiAgICB1c2VBcmVuYT86IGJvb2xlYW47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDdWRhRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2N1ZGEnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29yZU1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NvcmVtbCc7XG4gICAgY29yZU1sRmxhZ3M/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnZG1sJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xuICAgIC8vIFRPRE86IGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd4bm5wYWNrJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJncHUnO1xuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJ3wnTkhXQyc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XG4gICAgZGV2aWNlVHlwZT86ICdjcHUnfCdncHUnO1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnfCdsb3ctcG93ZXInfCdoaWdoLXBlcmZvcm1hbmNlJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIGVuYWJsZU9uU3ViZ3JhcGg/OiBib29sZWFuO1xuICAgIG9ubHlFbmFibGVEZXZpY2VXaXRoQU5FPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ25uYXBpJztcbiAgICB1c2VGUDE2PzogYm9vbGVhbjtcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcbiAgICBjcHVEaXNhYmxlZD86IGJvb2xlYW47XG4gICAgY3B1T25seT86IGJvb2xlYW47XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJ1biBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBpbmZlcmVuY2UgcnVuIGJlaGF2aW9yXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJ1bk9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMHwxfDJ8M3w0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRlcm1pbmF0ZSBhbGwgaW5jb21wbGV0ZSBPcnRSdW4gY2FsbHMgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0cnVlXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgdGVybWluYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgdGFnIGZvciB0aGUgUnVuKCkgY2FsbHMgdXNpbmcgdGhpc1xuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIHRhZz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNldCBhIHNpbmdsZSBydW4gY29uZmlndXJhdGlvbiBlbnRyeS4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfcnVuX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIG1lbW9yeToge1xuICAgICAqICAgICBlbmFibGVfbWVtb3J5X2FyZW5hX3Nocmlua2FnZTogXCIxXCIsXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB2YWx1ZSBtZXRhZGF0YVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG4gIGludGVyZmFjZSBWYWx1ZU1ldGFkYXRhIHtcbiAgICAvLyBUQkRcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5PdXRwdXRUeXBlYCBmb3JcbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJlbGVhc2UoKVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlIHRoZSBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgdGhlIHVuZGVybHlpbmcgcmVzb3VyY2VzLlxuICAgKi9cbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb2ZpbGluZ1xuXG4gIC8qKlxuICAgKiBTdGFydCBwcm9maWxpbmcuXG4gICAqL1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFbmQgcHJvZmlsaW5nLlxuICAgKi9cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8vIC8qKlxuICAvLyAgKiBHZXQgaW5wdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IFJlYWRvbmx5QXJyYXk8UmVhZG9ubHk8SW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhPj47XG5cbiAgLy8gLyoqXG4gIC8vICAqIEdldCBvdXRwdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEEgVWludDhBcnJheSByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbnR5cGUgTm9uVGVuc29yVHlwZSA9IG5ldmVyO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlIFJlcHJlc2VudHMgYm90aCB0ZW5zb3JzIGFuZCBub24tdGVuc29ycyB2YWx1ZSBmb3IgbW9kZWwncyBpbnB1dHMvb3V0cHV0cy5cbiAqXG4gKiBOT1RFOiBjdXJyZW50bHkgbm90IHN1cHBvcnQgbm9uLXRlbnNvclxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWUgPSBUZW5zb3J8Tm9uVGVuc29yVHlwZTtcblxuLyoqXG4gKiBUeXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSBvZiBhbiBPbm54VmFsdWUuXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiA9IFRlbnNvci5EYXRhTG9jYXRpb247XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7cmVzb2x2ZUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbmltcG9ydCB7U2Vzc2lvbkhhbmRsZXIsIFRyYWluaW5nU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbnRlcmZhY2UsIFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnN9IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zO1xuXG5jb25zdCBub0JhY2tlbmRFcnJNc2c6IHN0cmluZyA9ICdUcmFpbmluZyBiYWNrZW5kIGNvdWxkIG5vdCBiZSByZXNvbHZlZC4gJyArXG4gICAgJ01ha2Ugc3VyZSB5b3VcXCdyZSB1c2luZyB0aGUgY29ycmVjdCBjb25maWd1cmF0aW9uICYgV2ViQXNzZW1ibHkgZmlsZXMuJztcblxuZXhwb3J0IGNsYXNzIFRyYWluaW5nU2Vzc2lvbiBpbXBsZW1lbnRzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlciwgaGFzT3B0aW1pemVyTW9kZWw6IGJvb2xlYW4sIGhhc0V2YWxNb2RlbDogYm9vbGVhbikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgdGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCA9IGhhc09wdGltaXplck1vZGVsO1xuICAgIHRoaXMuaGFzRXZhbE1vZGVsID0gaGFzRXZhbE1vZGVsO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlcjtcbiAgcHJpdmF0ZSBoYXNPcHRpbWl6ZXJNb2RlbDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoYXNFdmFsTW9kZWw6IGJvb2xlYW47XG5cbiAgZ2V0IHRyYWluaW5nSW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCB0cmFpbmluZ091dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE5hbWVzO1xuICB9XG5cbiAgZ2V0IGV2YWxJbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZXZhbElucHV0TmFtZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmFpbmluZyBzZXNzaW9uIGhhcyBubyBldmFsTW9kZWwgbG9hZGVkLicpO1xuICAgIH1cbiAgfVxuICBnZXQgZXZhbE91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZXZhbE91dHB1dE5hbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdHJhaW5pbmcgc2Vzc2lvbiBoYXMgbm8gZXZhbE1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKHRyYWluaW5nT3B0aW9uczogVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucywgc2Vzc2lvbk9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj4ge1xuICAgIGNvbnN0IGV2YWxNb2RlbDogc3RyaW5nfFVpbnQ4QXJyYXkgPSB0cmFpbmluZ09wdGlvbnMuZXZhbE1vZGVsIHx8ICcnO1xuICAgIGNvbnN0IG9wdGltaXplck1vZGVsOiBzdHJpbmd8VWludDhBcnJheSA9IHRyYWluaW5nT3B0aW9ucy5vcHRpbWl6ZXJNb2RlbCB8fCAnJztcbiAgICBjb25zdCBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyA9IHNlc3Npb25PcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gZ2V0IGJhY2tlbmQgaGludHNcbiAgICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcbiAgICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKGkgPT4gdHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSk7XG4gICAgY29uc3QgYmFja2VuZCA9IGF3YWl0IHJlc29sdmVCYWNrZW5kKGJhY2tlbmRIaW50cyk7XG4gICAgaWYgKGJhY2tlbmQuY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcikge1xuICAgICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcihcbiAgICAgICAgICB0cmFpbmluZ09wdGlvbnMuY2hlY2twb2ludFN0YXRlLCB0cmFpbmluZ09wdGlvbnMudHJhaW5Nb2RlbCwgZXZhbE1vZGVsLCBvcHRpbWl6ZXJNb2RlbCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gbmV3IFRyYWluaW5nU2Vzc2lvbihoYW5kbGVyLCAhIXRyYWluaW5nT3B0aW9ucy5vcHRpbWl6ZXJNb2RlbCwgISF0cmFpbmluZ09wdGlvbnMuZXZhbE1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG5vQmFja2VuZEVyck1zZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgcnVuVHJhaW5TdGVwIGFuZCBmdXR1cmUgcnVuU3RlcCBtZXRob2RzIHRoYXQgaGFuZGxlcyB0aGUgdHlwZS1uYXJyb3dpbmcgY29udmVyc2lvbiBmcm9tXG4gICAqIHRoZSBnaXZlbiBwYXJhbWV0ZXJzIHRvIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlIGFuZCBSdW5PcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXROYW1lcyB0aGUgZmVlZHMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGV5IGNvbnRhaW4gYWxsIGlucHV0IG5hbWVzIGluIHRoZSBwcm92aWRlZCBsaXN0IG9mIGlucHV0XG4gICAqIG5hbWVzLlxuICAgKiBAcGFyYW0gb3V0cHV0TmFtZXMgdGhlIGZldGNoZXMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGVpciBrZXlzIG1hdGNoIHVwIHdpdGggdmFsaWQgbmFtZXMgaW4gdGhlIGxpc3Qgb2Ygb3V0cHV0XG4gICAqIG5hbWVzLlxuICAgKiBAcGFyYW0gZmVlZHMgdGhlIHJlcXVpcmVkIGlucHV0XG4gICAqIEBwYXJhbSBhcmcxIG5hcnJvd2VkICYgY29udmVydGVkIGludG8gdGhlIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlIG9yIFJ1bk9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSBhcmcyIG9wdGlvbmFsIFJ1bk9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgdHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAoXG4gICAgICBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXSwgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdLCBmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucyxcbiAgICAgIGFyZzI/OiBSdW5PcHRpb25zKTogW1Nlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBSdW5PcHRpb25zXSB7XG4gICAgY29uc3QgZmV0Y2hlczoge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV8bnVsbH0gPSB7fTtcbiAgICBsZXQgb3B0aW9uczogUnVuT3B0aW9ucyA9IHt9O1xuICAgIC8vIGNoZWNrIGlucHV0c1xuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdcXCdmZWVkc1xcJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuJyk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYSBUZW5zb3InKTtcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgaWYgKGFyZzEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgLy8gb3V0cHV0IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBtdXN0IGJlIGEgc3RyaW5nIGFycmF5IG9yIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygb3V0cHV0TmFtZXMpIHtcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCB8fCB2IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgXFwnZmV0Y2hlc1xcJyBvciBcXCdvcHRpb25zXFwnLicpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgaW5wdXROYW1lcykge1xuICAgICAgaWYgKHR5cGVvZiBmZWVkc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcbiAgICBpZiAoaXNGZXRjaGVzRW1wdHkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBvdXRwdXROYW1lcykge1xuICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2ZldGNoZXMsIG9wdGlvbnNdO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgZm9yIHJ1blRyYWluU3RlcCBhbmQgYW55IG90aGVyIHJ1blN0ZXAgbWV0aG9kcy4gVGFrZXMgdGhlIFJldHVyblR5cGUgcmVzdWx0IGZyb20gdGhlIFNlc3Npb25IYW5kbGVyXG4gICAqIGFuZCBjaGFuZ2VzIGl0IGludG8gYSBtYXAgb2YgVGVuc29ycy5cbiAgICpcbiAgICogQHBhcmFtIHJlc3VsdHNcbiAgICogQHJldHVybnNcbiAgICovXG4gIGNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHM6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUpOiBSZXR1cm5UeXBlIHtcbiAgICBjb25zdCByZXR1cm5WYWx1ZToge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIGNvbnN0IFtmZXRjaGVzLCBvcHRpb25zXSA9XG4gICAgICAgIHRoaXMudHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAodGhpcy50cmFpbmluZ0lucHV0TmFtZXMsIHRoaXMudHJhaW5pbmdPdXRwdXROYW1lcywgZmVlZHMsIGFyZzEsIGFyZzIpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuVHJhaW5TdGVwKGZlZWRzLCBmZXRjaGVzLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0SGFuZGxlclJldHVyblR5cGVUb01hcE9mVGVuc29ycyhyZXN1bHRzKTtcbiAgfVxuXG4gIGFzeW5jIHJ1bk9wdGltaXplclN0ZXAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCkge1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bk9wdGltaXplclN0ZXAob3B0aW9ucyB8fCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIE9wdGltaXplck1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnN8dW5kZWZpbmVkKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuRXZhbFN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlfFJ1bk9wdGlvbnMsIGFyZzI/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPiB7XG4gICAgaWYgKHRoaXMuaGFzRXZhbE1vZGVsKSB7XG4gICAgICBjb25zdCBbZmV0Y2hlcywgb3B0aW9uc10gPVxuICAgICAgICAgIHRoaXMudHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAodGhpcy5ldmFsSW5wdXROYW1lcywgdGhpcy5ldmFsT3V0cHV0TmFtZXMsIGZlZWRzLCBhcmcxLCBhcmcyKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuRXZhbFN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIEV2YWxNb2RlbCBsb2FkZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seSk7XG4gIH1cblxuICBhc3luYyBsb2FkUGFyYW1ldGVyc0J1ZmZlcihhcnJheTogVWludDhBcnJheSwgdHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJhbXNTaXplID0gYXdhaXQgdGhpcy5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcbiAgICAvLyBjaGVja2luZyB0aGF0IHRoZSBzaXplIG9mIHRoZSBVaW50OEFycmF5IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJ5dGUgbGVuZ3RoIG9mIGEgRmxvYXQzMkFycmF5IG9mIHRoZSBudW1iZXJcbiAgICAvLyBvZiBwYXJhbWV0ZXJzXG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gNCAqIHBhcmFtc1NpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnU2l6ZSBvZiB0aGUgYnVmZmVyIHBhc3NlZCBpbnRvIGxvYWRQYXJhbWV0ZXJzQnVmZmVyIG11c3QgbWF0Y2ggdGhlIG51bWJlciBvZiBwYXJhbWV0ZXJzIGluICcgK1xuICAgICAgICAgICd0aGUgbW9kZWwuIFBsZWFzZSB1c2UgZ2V0UGFyYW1ldGVyc1NpemUgbWV0aG9kIHRvIGNoZWNrLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5LCB0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkgPSB0cnVlKTogUHJvbWlzZTxPbm54VmFsdWU+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkpO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbXBsfSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24taW1wbC5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRyYWluaW5nU2Vzc2lvbiB7XG4gIC8qKlxuICAgKiBFaXRoZXIgVVJJIGZpbGUgcGF0aCAoc3RyaW5nKSBvciBVaW50OEFycmF5IGNvbnRhaW5pbmcgbW9kZWwgb3IgY2hlY2twb2ludCBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHR5cGUgVVJJb3JCdWZmZXIgPSBzdHJpbmd8VWludDhBcnJheTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggdHJhaW5pbmcgc2Vzc2lvbixcbiAqIHdoaWNoIGNvbnRhaW5zIGEgbW9kZWwgdGhhdCBjYW4gYmUgdHJhaW5lZCwgYW5kLCBvcHRpb25hbGx5LFxuICogYW4gZXZhbCBhbmQgb3B0aW1pemVyIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogUnVuIFRyYWluU3RlcCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvclxuICAgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIHRyYWluaW5nLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSB0cmFpbiBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXG4gICAqIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW5zIGEgc2luZ2xlIG9wdGltaXplciBzdGVwLCB3aGljaCBwZXJmb3JtcyB3ZWlnaHQgdXBkYXRlcyBmb3IgdGhlIHRyYWluYWJsZSBwYXJhbWV0ZXJzIHVzaW5nIHRoZSBvcHRpbWl6ZXIgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgb3B0aW1pemluZy5cbiAgICovXG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgZXZhbCBzdGVwLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmdcbiAgIHZhbHVlcy5cbiAgICovXG4gIHJ1bkV2YWxTdGVwKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBmZXRjaGVzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIG91dHB1dC5cbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGV2YWwgc3RlcC5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5FdmFsU3RlcChcbiAgICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29weSBwYXJhbWV0ZXJzXG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgc2l6ZSBvZiBhbGwgcGFyYW1ldGVycyBmb3IgdGhlIHRyYWluaW5nIHN0YXRlLiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBudW1iZXIgb2YgcHJpbWl0aXZlIChkYXRhdHlwZSBvZlxuICAgKiB0aGUgcGFyYW1ldGVycykgZWxlbWVudHMgb2YgYWxsIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSB0cmFpbmluZyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBXaGVuIHNldCB0byB0cnVlLCB0aGUgc2l6ZSBpcyBjYWxjdWxhdGVkIGZvciB0cmFpbmFibGUgcGFyYW1zIG9ubHkuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICovXG4gIGdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj47XG5cbiAgLyoqXG4gICAqIENvcGllcyBwYXJhbWV0ZXIgdmFsdWVzIGZyb20gdGhlIGdpdmVuIGFycmF5IHRvIHRoZSB0cmFpbmluZyBzdGF0ZS4gQ3VycmVudGx5LCBvbmx5IHN1cHBvcnRpbmcgbW9kZWxzIHdpdGhcbiAgICogcGFyYW1ldGVycyBvZiB0eXBlIEZsb2F0MzIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBGbG9hdDMyIGJ1ZmZlciBjb250YWluaW5nIHBhcmFtZXRlcnMgY29udmVydGVkIHRvIGEgVWludDhBcnJheS5cbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBUcnVlIGlmIHRyYWluYWJsZSBwYXJhbWV0ZXJzIG9ubHkgdG8gYmUgbW9kaWZpZWQsIGZhbHNlIG90aGVyd2lzZS4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgKi9cbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgdGhlIG1vZGVsIHBhcmFtZXRlcnMgdG8gYSBjb250aWd1b3VzIGJ1ZmZlci4gVXN1YWxseSB1c2VkIGluIHRoZSBjb250ZXh0IG9mIEZlZGVyYXRlZCBMZWFybmluZy5cbiAgICogQ3VycmVudGx5LCBvbmx5IHN1cHBvcnRpbmcgbW9kZWxzIHdpdGggcGFyYW1ldGVycyBvZiB0eXBlIEZsb2F0MzIuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gV2hlbiBzZXQgdG8gdHJ1ZSwgb25seSB0cmFpbmFibGUgcGFyYW1ldGVycyBhcmUgY29waWVkLiBUcmFpbmFibGUgcGFyYW1ldGVycyBhcmUgcGFyYW1ldGVyc1xuICAgKiBmb3Igd2hpY2ggcmVxdWlyZXNfZ3JhZCBpcyBzZXQgdG8gdHJ1ZS4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIEZsb2F0MzIgT25ueFZhbHVlIG9mIHRoZSByZXF1ZXN0ZWQgcGFyYW1ldGVycy5cbiAgICovXG4gIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPE9ubnhWYWx1ZT47XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJlbGVhc2UoKVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlIHRoZSBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgdGhlIHVuZGVybHlpbmcgcmVzb3VyY2VzLlxuICAgKi9cbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBtZXRhZGF0YVxuXG4gIC8qKlxuICAgKiBHZXQgaW5wdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCB0cmFpbmluZyBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IHRyYWluaW5nSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCB0cmFpbmluZyBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IHRyYWluaW5nT3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXQgaW5wdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBldmFsIG1vZGVsLiBJcyBhbiBlbXB0eSBhcnJheSBpZiBubyBldmFsIG1vZGVsIGlzIGxvYWRlZC5cbiAgICovXG4gIHJlYWRvbmx5IGV2YWxJbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIGV2YWwgbW9kZWwuIElzIGFuIGVtcHR5IGFycmF5IGlmIG5vIGV2YWwgbW9kZWwgaXMgbG9hZGVkLlxuICAgKi9cbiAgcmVhZG9ubHkgZXZhbE91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgb3B0aW9uYWwgcGFyYW1ldGVycyB0aGF0IGNhbiBiZSBwYXNzZWQgaW50byB0aGUgVHJhaW5pbmdTZXNzaW9uRmFjdG9yeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIGEgLmNrcHQgZmlsZSB0aGF0IGNvbnRhaW5zIHRoZSBjaGVja3BvaW50IGZvciB0aGUgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICBjaGVja3BvaW50U3RhdGU6IFRyYWluaW5nU2Vzc2lvbi5VUklvckJ1ZmZlcjtcbiAgLyoqXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCB0cmFpbmluZyBmaWxlLlxuICAgKi9cbiAgdHJhaW5Nb2RlbDogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBvcHRpbWl6ZXIgbW9kZWwgZmlsZS5cbiAgICovXG4gIG9wdGltaXplck1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVSSW9yQnVmZmVyO1xuICAvKipcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBldmFsIG1vZGVsIGZpbGUuXG4gICAqL1xuICBldmFsTW9kZWw/OiBUcmFpbmluZ1Nlc3Npb24uVVJJb3JCdWZmZXI7XG59XG5cbi8qKlxuICogRGVmaW5lcyBtZXRob2Qgb3ZlcmxvYWQgcG9zc2liaWxpdGllcyBmb3IgY3JlYXRpbmcgYSBUcmFpbmluZ1Nlc3Npb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBUcmFpbmluZ1Nlc3Npb24gYW5kIGFzeW5jaHJvbm91c2x5IGxvYWRzIGFueSBtb2RlbHMgcGFzc2VkIGluIHRocm91Z2ggdHJhaW5pbmdPcHRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmluZ09wdGlvbnMgc3BlY2lmeSBtb2RlbHMgYW5kIGNoZWNrcG9pbnRzIHRvIGxvYWQgaW50byB0aGUgVHJhaW5pbmcgU2Vzc2lvblxuICAgKiBAcGFyYW0gc2Vzc2lvbk9wdGlvbnMgc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciB0cmFpbmluZyBzZXNzaW9uIGJlaGF2aW9yXG4gICAqXG4gICAqIEByZXR1cm5zIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIFRyYWluaW5nU2Vzc2lvbiBvYmplY3RcbiAgICovXG4gIGNyZWF0ZSh0cmFpbmluZ09wdGlvbnM6IFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMsIHNlc3Npb25PcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj47XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgVHJhaW5pbmdTZXNzaW9uOiBUcmFpbmluZ1Nlc3Npb25GYWN0b3J5ID0gVHJhaW5pbmdTZXNzaW9uSW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyoqXG4gKiAjIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSVxuICpcbiAqIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSSBpcyBhIHVuaWZpZWQgQVBJIGZvciBhbGwgSmF2YVNjcmlwdCB1c2FnZXMsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIE5QTSBwYWNrYWdlczpcbiAqXG4gKiAtIFtvbm54cnVudGltZS1ub2RlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1ub2RlKVxuICogLSBbb25ueHJ1bnRpbWUtd2ViXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS13ZWIpXG4gKiAtIFtvbm54cnVudGltZS1yZWFjdC1uYXRpdmVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZSlcbiAqXG4gKiBTZWUgYWxzbzpcbiAqIC0gW0dldCBTdGFydGVkXShodHRwczovL29ubnhydW50aW1lLmFpL2RvY3MvZ2V0LXN0YXJ0ZWQvd2l0aC1qYXZhc2NyaXB0Lmh0bWwpXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2JhY2tlbmQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcbiIsICJleHBvcnQgY29uc3QgY3B1cyA9IHVuZGVmaW5lZDsiLCAiZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gdW5kZWZpbmVkOyIsICJleHBvcnQgY29uc3Qgam9pbiA9IHVuZGVmaW5lZDsiLCAiXG52YXIgb3J0V2FzbSA9ICgoKSA9PiB7XG4gIHZhciBfc2NyaXB0RGlyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMgOiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgX19maWxlbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIF9zY3JpcHREaXIgPSBfc2NyaXB0RGlyIHx8IF9fZmlsZW5hbWU7XG4gIHJldHVybiAoXG5mdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkge1xuXG52YXIgZT1tb2R1bGVBcmcsayxsO2UucmVhZHk9bmV3IFByb21pc2UoKGEsYik9PntrPWE7bD1ifSk7dmFyIHE9T2JqZWN0LmFzc2lnbih7fSxlKSx2PVwiLi90aGlzLnByb2dyYW1cIixhYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93LHg9XCJmdW5jdGlvblwiPT10eXBlb2YgaW1wb3J0U2NyaXB0cyxiYT1cIm9iamVjdFwiPT10eXBlb2YgcHJvY2VzcyYmXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MudmVyc2lvbnMmJlwic3RyaW5nXCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUseT1cIlwiLEEsQixDO1xuaWYoYmEpe3ZhciBmcz1yZXF1aXJlKFwiZnNcIiksRD1yZXF1aXJlKFwicGF0aFwiKTt5PXg/RC5kaXJuYW1lKHkpK1wiL1wiOl9fZGlybmFtZStcIi9cIjtBPShhLGIpPT57YT1hLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYSk6RC5ub3JtYWxpemUoYSk7cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhhLGI/dm9pZCAwOlwidXRmOFwiKX07Qz1hPT57YT1BKGEsITApO2EuYnVmZmVyfHwoYT1uZXcgVWludDhBcnJheShhKSk7cmV0dXJuIGF9O0I9KGEsYixjLGY9ITApPT57YT1hLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYSk6RC5ub3JtYWxpemUoYSk7ZnMucmVhZEZpbGUoYSxmP3ZvaWQgMDpcInV0ZjhcIiwoZyxoKT0+e2c/YyhnKTpiKGY/aC5idWZmZXI6aCl9KX07IWUudGhpc1Byb2dyYW0mJjE8cHJvY2Vzcy5hcmd2Lmxlbmd0aCYmKHY9cHJvY2Vzcy5hcmd2WzFdLnJlcGxhY2UoL1xcXFwvZyxcIi9cIikpO3Byb2Nlc3MuYXJndi5zbGljZSgyKTtlLmluc3BlY3Q9KCk9PlwiW0Vtc2NyaXB0ZW4gTW9kdWxlIG9iamVjdF1cIn1lbHNlIGlmKGFhfHxcbngpeD95PXNlbGYubG9jYXRpb24uaHJlZjpcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmN1cnJlbnRTY3JpcHQmJih5PWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjKSxfc2NyaXB0RGlyJiYoeT1fc2NyaXB0RGlyKSwwIT09eS5pbmRleE9mKFwiYmxvYjpcIik/eT15LnN1YnN0cigwLHkucmVwbGFjZSgvWz8jXS4qLyxcIlwiKS5sYXN0SW5kZXhPZihcIi9cIikrMSk6eT1cIlwiLEE9YT0+e3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJHRVRcIixhLCExKTtiLnNlbmQobnVsbCk7cmV0dXJuIGIucmVzcG9uc2VUZXh0fSx4JiYoQz1hPT57dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2IucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIjtiLnNlbmQobnVsbCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGIucmVzcG9uc2UpfSksQj0oYSxiLGMpPT57dmFyIGY9bmV3IFhNTEh0dHBSZXF1ZXN0O2Yub3BlbihcIkdFVFwiLGEsITApO2YucmVzcG9uc2VUeXBlPVxuXCJhcnJheWJ1ZmZlclwiO2Yub25sb2FkPSgpPT57MjAwPT1mLnN0YXR1c3x8MD09Zi5zdGF0dXMmJmYucmVzcG9uc2U/YihmLnJlc3BvbnNlKTpjKCl9O2Yub25lcnJvcj1jO2Yuc2VuZChudWxsKX07dmFyIGNhPWUucHJpbnR8fGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSksRT1lLnByaW50RXJyfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihlLHEpO3E9bnVsbDtlLnRoaXNQcm9ncmFtJiYodj1lLnRoaXNQcm9ncmFtKTt2YXIgRjtlLndhc21CaW5hcnkmJihGPWUud2FzbUJpbmFyeSk7dmFyIG5vRXhpdFJ1bnRpbWU9ZS5ub0V4aXRSdW50aW1lfHwhMDtcIm9iamVjdFwiIT10eXBlb2YgV2ViQXNzZW1ibHkmJkcoXCJubyBuYXRpdmUgd2FzbSBzdXBwb3J0IGRldGVjdGVkXCIpO3ZhciBILEksZGE9ITEsSixLLEwsTTtcbmZ1bmN0aW9uIGVhKCl7dmFyIGE9SC5idWZmZXI7ZS5IRUFQOD1KPW5ldyBJbnQ4QXJyYXkoYSk7ZS5IRUFQMTY9bmV3IEludDE2QXJyYXkoYSk7ZS5IRUFQMzI9TD1uZXcgSW50MzJBcnJheShhKTtlLkhFQVBVOD1LPW5ldyBVaW50OEFycmF5KGEpO2UuSEVBUFUxNj1uZXcgVWludDE2QXJyYXkoYSk7ZS5IRUFQVTMyPU09bmV3IFVpbnQzMkFycmF5KGEpO2UuSEVBUEYzMj1uZXcgRmxvYXQzMkFycmF5KGEpO2UuSEVBUEY2ND1uZXcgRmxvYXQ2NEFycmF5KGEpfXZhciBmYT1bXSxoYT1bXSxpYT1bXTtmdW5jdGlvbiBqYSgpe3ZhciBhPWUucHJlUnVuLnNoaWZ0KCk7ZmEudW5zaGlmdChhKX12YXIgTj0wLE89bnVsbCxQPW51bGw7XG5mdW5jdGlvbiBHKGEpe2lmKGUub25BYm9ydCllLm9uQWJvcnQoYSk7YT1cIkFib3J0ZWQoXCIrYStcIilcIjtFKGEpO2RhPSEwO2E9bmV3IFdlYkFzc2VtYmx5LlJ1bnRpbWVFcnJvcihhK1wiLiBCdWlsZCB3aXRoIC1zQVNTRVJUSU9OUyBmb3IgbW9yZSBpbmZvLlwiKTtsKGEpO3Rocm93IGE7fWZ1bmN0aW9uIGthKGEpe3JldHVybiBhLnN0YXJ0c1dpdGgoXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCIpfXZhciBRO1E9XCJvcnQtd2FzbS53YXNtXCI7aWYoIWthKFEpKXt2YXIgbGE9UTtRPWUubG9jYXRlRmlsZT9lLmxvY2F0ZUZpbGUobGEseSk6eStsYX1mdW5jdGlvbiBtYShhKXtpZihhPT1RJiZGKXJldHVybiBuZXcgVWludDhBcnJheShGKTtpZihDKXJldHVybiBDKGEpO3Rocm93XCJib3RoIGFzeW5jIGFuZCBzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZFwiO31cbmZ1bmN0aW9uIG5hKGEpe2lmKCFGJiYoYWF8fHgpKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBmZXRjaCYmIWEuc3RhcnRzV2l0aChcImZpbGU6Ly9cIikpcmV0dXJuIGZldGNoKGEse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pLnRoZW4oYj0+e2lmKCFiLm9rKXRocm93XCJmYWlsZWQgdG8gbG9hZCB3YXNtIGJpbmFyeSBmaWxlIGF0ICdcIithK1wiJ1wiO3JldHVybiBiLmFycmF5QnVmZmVyKCl9KS5jYXRjaCgoKT0+bWEoYSkpO2lmKEIpcmV0dXJuIG5ldyBQcm9taXNlKChiLGMpPT57QihhLGY9PmIobmV3IFVpbnQ4QXJyYXkoZikpLGMpfSl9cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9Pm1hKGEpKX1mdW5jdGlvbiBvYShhLGIsYyl7cmV0dXJuIG5hKGEpLnRoZW4oZj0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZixiKSkudGhlbihmPT5mKS50aGVuKGMsZj0+e0UoXCJmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiBcIitmKTtHKGYpfSl9XG5mdW5jdGlvbiBwYShhLGIpe3ZhciBjPVE7cmV0dXJuIEZ8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nfHxrYShjKXx8Yy5zdGFydHNXaXRoKFwiZmlsZTovL1wiKXx8YmF8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIGZldGNoP29hKGMsYSxiKTpmZXRjaChjLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGY9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKGYsYSkudGhlbihiLGZ1bmN0aW9uKGcpe0UoXCJ3YXNtIHN0cmVhbWluZyBjb21waWxlIGZhaWxlZDogXCIrZyk7RShcImZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uXCIpO3JldHVybiBvYShjLGEsYil9KSl9dmFyIFIsUz1hPT57Zm9yKDswPGEubGVuZ3RoOylhLnNoaWZ0KCkoZSl9O1xuZnVuY3Rpb24gcWEoYSl7dGhpcy52YT1hLTI0O3RoaXMuRWE9ZnVuY3Rpb24oYil7TVt0aGlzLnZhKzQ+PjI+Pj4wXT1ifTt0aGlzLnphPWZ1bmN0aW9uKGIpe01bdGhpcy52YSs4Pj4yPj4+MF09Yn07dGhpcy54YT1mdW5jdGlvbihiLGMpe3RoaXMueWEoKTt0aGlzLkVhKGIpO3RoaXMuemEoYyl9O3RoaXMueWE9ZnVuY3Rpb24oKXtNW3RoaXMudmErMTY+PjI+Pj4wXT0wfX1cbnZhciByYT0wLHNhPTAsdGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFRleHREZWNvZGVyP25ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik6dm9pZCAwLHVhPShhLGIsYyk9PntiPj4+PTA7dmFyIGY9YitjO2ZvcihjPWI7YVtjXSYmIShjPj1mKTspKytjO2lmKDE2PGMtYiYmYS5idWZmZXImJnRhKXJldHVybiB0YS5kZWNvZGUoYS5zdWJhcnJheShiLGMpKTtmb3IoZj1cIlwiO2I8Yzspe3ZhciBnPWFbYisrXTtpZihnJjEyOCl7dmFyIGg9YVtiKytdJjYzO2lmKDE5Mj09KGcmMjI0KSlmKz1TdHJpbmcuZnJvbUNoYXJDb2RlKChnJjMxKTw8NnxoKTtlbHNle3ZhciBtPWFbYisrXSY2MztnPTIyND09KGcmMjQwKT8oZyYxNSk8PDEyfGg8PDZ8bTooZyY3KTw8MTh8aDw8MTJ8bTw8NnxhW2IrK10mNjM7NjU1MzY+Zz9mKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGcpOihnLT02NTUzNixmKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGc+PjEwLDU2MzIwfGcmMTAyMykpfX1lbHNlIGYrPVN0cmluZy5mcm9tQ2hhckNvZGUoZyl9cmV0dXJuIGZ9LFxuVD0oYSxiKT0+KGE+Pj49MCk/dWEoSyxhLGIpOlwiXCIsVT1hPT57Zm9yKHZhciBiPTAsYz0wO2M8YS5sZW5ndGg7KytjKXt2YXIgZj1hLmNoYXJDb2RlQXQoYyk7MTI3Pj1mP2IrKzoyMDQ3Pj1mP2IrPTI6NTUyOTY8PWYmJjU3MzQzPj1mPyhiKz00LCsrYyk6Yis9M31yZXR1cm4gYn0sVj0oYSxiLGMsZik9PntjPj4+PTA7aWYoISgwPGYpKXJldHVybiAwO3ZhciBnPWM7Zj1jK2YtMTtmb3IodmFyIGg9MDtoPGEubGVuZ3RoOysraCl7dmFyIG09YS5jaGFyQ29kZUF0KGgpO2lmKDU1Mjk2PD1tJiY1NzM0Mz49bSl7dmFyIHI9YS5jaGFyQ29kZUF0KCsraCk7bT02NTUzNisoKG0mMTAyMyk8PDEwKXxyJjEwMjN9aWYoMTI3Pj1tKXtpZihjPj1mKWJyZWFrO2JbYysrPj4+MF09bX1lbHNle2lmKDIwNDc+PW0pe2lmKGMrMT49ZilicmVhaztiW2MrKz4+PjBdPTE5MnxtPj42fWVsc2V7aWYoNjU1MzU+PW0pe2lmKGMrMj49ZilicmVhaztiW2MrKz4+PjBdPTIyNHxtPj4xMn1lbHNle2lmKGMrMz49XG5mKWJyZWFrO2JbYysrPj4+MF09MjQwfG0+PjE4O2JbYysrPj4+MF09MTI4fG0+PjEyJjYzfWJbYysrPj4+MF09MTI4fG0+PjYmNjN9YltjKys+Pj4wXT0xMjh8bSY2M319YltjPj4+MF09MDtyZXR1cm4gYy1nfSxXPWE9PjA9PT1hJTQmJigwIT09YSUxMDB8fDA9PT1hJTQwMCksdmE9WzAsMzEsNjAsOTEsMTIxLDE1MiwxODIsMjEzLDI0NCwyNzQsMzA1LDMzNV0sd2E9WzAsMzEsNTksOTAsMTIwLDE1MSwxODEsMjEyLDI0MywyNzMsMzA0LDMzNF0sQmE9YT0+e3ZhciBiPVUoYSkrMSxjPUFhKGIpO2MmJlYoYSxLLGMsYik7cmV0dXJuIGN9LFg9e30sQ2E9KCk9PntpZighWSl7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFxuXCJfXCIpK1wiLlVURi04XCIsXzp2fHxcIi4vdGhpcy5wcm9ncmFtXCJ9LGI7Zm9yKGIgaW4gWCl2b2lkIDA9PT1YW2JdP2RlbGV0ZSBhW2JdOmFbYl09WFtiXTt2YXIgYz1bXTtmb3IoYiBpbiBhKWMucHVzaChgJHtifT0ke2FbYl19YCk7WT1jfXJldHVybiBZfSxZLERhPVtudWxsLFtdLFtdXSxFYT1bMzEsMjksMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdLEZhPVszMSwyOCwzMSwzMCwzMSwzMCwzMSwzMSwzMCwzMSwzMCwzMV07ZnVuY3Rpb24gR2EoYSl7dmFyIGI9QXJyYXkoVShhKSsxKTtWKGEsYiwwLGIubGVuZ3RoKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIEhhKGEsYixjLGYpe2Z1bmN0aW9uIGcoZCxuLHApe2ZvcihkPVwibnVtYmVyXCI9PXR5cGVvZiBkP2QudG9TdHJpbmcoKTpkfHxcIlwiO2QubGVuZ3RoPG47KWQ9cFswXStkO3JldHVybiBkfWZ1bmN0aW9uIGgoZCxuKXtyZXR1cm4gZyhkLG4sXCIwXCIpfWZ1bmN0aW9uIG0oZCxuKXtmdW5jdGlvbiBwKHhhKXtyZXR1cm4gMD54YT8tMTowPHhhPzE6MH12YXIgejswPT09KHo9cChkLmdldEZ1bGxZZWFyKCktbi5nZXRGdWxsWWVhcigpKSkmJjA9PT0oej1wKGQuZ2V0TW9udGgoKS1uLmdldE1vbnRoKCkpKSYmKHo9cChkLmdldERhdGUoKS1uLmdldERhdGUoKSkpO3JldHVybiB6fWZ1bmN0aW9uIHIoZCl7c3dpdGNoKGQuZ2V0RGF5KCkpe2Nhc2UgMDpyZXR1cm4gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLTEsMTEsMjkpO2Nhc2UgMTpyZXR1cm4gZDtjYXNlIDI6cmV0dXJuIG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwwLDMpO2Nhc2UgMzpyZXR1cm4gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLFxuMCwyKTtjYXNlIDQ6cmV0dXJuIG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwwLDEpO2Nhc2UgNTpyZXR1cm4gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLTEsMTEsMzEpO2Nhc2UgNjpyZXR1cm4gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLTEsMTEsMzApfX1mdW5jdGlvbiB3KGQpe3ZhciBuPWQucmE7Zm9yKGQ9bmV3IERhdGUoKG5ldyBEYXRlKGQuc2ErMTkwMCwwLDEpKS5nZXRUaW1lKCkpOzA8bjspe3ZhciBwPWQuZ2V0TW9udGgoKSx6PShXKGQuZ2V0RnVsbFllYXIoKSk/RWE6RmEpW3BdO2lmKG4+ei1kLmdldERhdGUoKSluLT16LWQuZ2V0RGF0ZSgpKzEsZC5zZXREYXRlKDEpLDExPnA/ZC5zZXRNb250aChwKzEpOihkLnNldE1vbnRoKDApLGQuc2V0RnVsbFllYXIoZC5nZXRGdWxsWWVhcigpKzEpKTtlbHNle2Quc2V0RGF0ZShkLmdldERhdGUoKStuKTticmVha319cD1uZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCkrMSwwLDQpO249cihuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksXG4wLDQpKTtwPXIocCk7cmV0dXJuIDA+PW0obixkKT8wPj1tKHAsZCk/ZC5nZXRGdWxsWWVhcigpKzE6ZC5nZXRGdWxsWWVhcigpOmQuZ2V0RnVsbFllYXIoKS0xfWE+Pj49MDtiPj4+PTA7Yz4+Pj0wO2Y+Pj49MDt2YXIgdD1MW2YrNDA+PjI+Pj4wXTtmPXtDYTpMW2Y+PjI+Pj4wXSxCYTpMW2YrND4+Mj4+PjBdLHRhOkxbZis4Pj4yPj4+MF0sd2E6TFtmKzEyPj4yPj4+MF0sdWE6TFtmKzE2Pj4yPj4+MF0sc2E6TFtmKzIwPj4yPj4+MF0sbWE6TFtmKzI0Pj4yPj4+MF0scmE6TFtmKzI4Pj4yPj4+MF0sRmE6TFtmKzMyPj4yPj4+MF0sQWE6TFtmKzM2Pj4yPj4+MF0sRGE6dD9UKHQpOlwiXCJ9O2M9VChjKTt0PXtcIiVjXCI6XCIlYSAlYiAlZCAlSDolTTolUyAlWVwiLFwiJURcIjpcIiVtLyVkLyV5XCIsXCIlRlwiOlwiJVktJW0tJWRcIixcIiVoXCI6XCIlYlwiLFwiJXJcIjpcIiVJOiVNOiVTICVwXCIsXCIlUlwiOlwiJUg6JU1cIixcIiVUXCI6XCIlSDolTTolU1wiLFwiJXhcIjpcIiVtLyVkLyV5XCIsXCIlWFwiOlwiJUg6JU06JVNcIixcIiVFY1wiOlwiJWNcIixcblwiJUVDXCI6XCIlQ1wiLFwiJUV4XCI6XCIlbS8lZC8leVwiLFwiJUVYXCI6XCIlSDolTTolU1wiLFwiJUV5XCI6XCIleVwiLFwiJUVZXCI6XCIlWVwiLFwiJU9kXCI6XCIlZFwiLFwiJU9lXCI6XCIlZVwiLFwiJU9IXCI6XCIlSFwiLFwiJU9JXCI6XCIlSVwiLFwiJU9tXCI6XCIlbVwiLFwiJU9NXCI6XCIlTVwiLFwiJU9TXCI6XCIlU1wiLFwiJU91XCI6XCIldVwiLFwiJU9VXCI6XCIlVVwiLFwiJU9WXCI6XCIlVlwiLFwiJU93XCI6XCIld1wiLFwiJU9XXCI6XCIlV1wiLFwiJU95XCI6XCIleVwifTtmb3IodmFyIHUgaW4gdCljPWMucmVwbGFjZShuZXcgUmVnRXhwKHUsXCJnXCIpLHRbdV0pO3ZhciB5YT1cIlN1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5XCIuc3BsaXQoXCIgXCIpLHphPVwiSmFudWFyeSBGZWJydWFyeSBNYXJjaCBBcHJpbCBNYXkgSnVuZSBKdWx5IEF1Z3VzdCBTZXB0ZW1iZXIgT2N0b2JlciBOb3ZlbWJlciBEZWNlbWJlclwiLnNwbGl0KFwiIFwiKTt0PXtcIiVhXCI6ZD0+eWFbZC5tYV0uc3Vic3RyaW5nKDAsMyksXCIlQVwiOmQ9PnlhW2QubWFdLFwiJWJcIjpkPT5cbnphW2QudWFdLnN1YnN0cmluZygwLDMpLFwiJUJcIjpkPT56YVtkLnVhXSxcIiVDXCI6ZD0+aCgoZC5zYSsxOTAwKS8xMDB8MCwyKSxcIiVkXCI6ZD0+aChkLndhLDIpLFwiJWVcIjpkPT5nKGQud2EsMixcIiBcIiksXCIlZ1wiOmQ9PncoZCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiksXCIlR1wiOmQ9PncoZCksXCIlSFwiOmQ9PmgoZC50YSwyKSxcIiVJXCI6ZD0+e2Q9ZC50YTswPT1kP2Q9MTI6MTI8ZCYmKGQtPTEyKTtyZXR1cm4gaChkLDIpfSxcIiVqXCI6ZD0+e2Zvcih2YXIgbj0wLHA9MDtwPD1kLnVhLTE7bis9KFcoZC5zYSsxOTAwKT9FYTpGYSlbcCsrXSk7cmV0dXJuIGgoZC53YStuLDMpfSxcIiVtXCI6ZD0+aChkLnVhKzEsMiksXCIlTVwiOmQ9PmgoZC5CYSwyKSxcIiVuXCI6KCk9PlwiXFxuXCIsXCIlcFwiOmQ9PjA8PWQudGEmJjEyPmQudGE/XCJBTVwiOlwiUE1cIixcIiVTXCI6ZD0+aChkLkNhLDIpLFwiJXRcIjooKT0+XCJcXHRcIixcIiV1XCI6ZD0+ZC5tYXx8NyxcIiVVXCI6ZD0+aChNYXRoLmZsb29yKChkLnJhKzctZC5tYSkvNyksMiksXCIlVlwiOmQ9Plxue3ZhciBuPU1hdGguZmxvb3IoKGQucmErNy0oZC5tYSs2KSU3KS83KTsyPj0oZC5tYSszNzEtZC5yYS0yKSU3JiZuKys7aWYobik1Mz09biYmKHA9KGQubWErMzcxLWQucmEpJTcsND09cHx8Mz09cCYmVyhkLnNhKXx8KG49MSkpO2Vsc2V7bj01Mjt2YXIgcD0oZC5tYSs3LWQucmEtMSklNzsoND09cHx8NT09cCYmVyhkLnNhJTQwMC0xKSkmJm4rK31yZXR1cm4gaChuLDIpfSxcIiV3XCI6ZD0+ZC5tYSxcIiVXXCI6ZD0+aChNYXRoLmZsb29yKChkLnJhKzctKGQubWErNiklNykvNyksMiksXCIleVwiOmQ9PihkLnNhKzE5MDApLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJVlcIjpkPT5kLnNhKzE5MDAsXCIlelwiOmQ9PntkPWQuQWE7dmFyIG49MDw9ZDtkPU1hdGguYWJzKGQpLzYwO3JldHVybihuP1wiK1wiOlwiLVwiKStTdHJpbmcoXCIwMDAwXCIrKGQvNjAqMTAwK2QlNjApKS5zbGljZSgtNCl9LFwiJVpcIjpkPT5kLkRhLFwiJSVcIjooKT0+XCIlXCJ9O2M9Yy5yZXBsYWNlKC8lJS9nLFwiXFx4MDBcXHgwMFwiKTtmb3IodSBpbiB0KWMuaW5jbHVkZXModSkmJlxuKGM9Yy5yZXBsYWNlKG5ldyBSZWdFeHAodSxcImdcIiksdFt1XShmKSkpO2M9Yy5yZXBsYWNlKC9cXDBcXDAvZyxcIiVcIik7dT1HYShjKTtpZih1Lmxlbmd0aD5iKXJldHVybiAwO0ouc2V0KHUsYT4+PjApO3JldHVybiB1Lmxlbmd0aC0xfVxudmFyIEphPXthOmZ1bmN0aW9uKGEsYixjKXthPj4+PTA7KG5ldyBxYShhKSkueGEoYj4+PjAsYz4+PjApO3JhPWE7c2ErKzt0aHJvdyByYTt9LGU6ZnVuY3Rpb24oKXtyZXR1cm4gMH0sSDpmdW5jdGlvbigpe30seDpmdW5jdGlvbigpe30sejpmdW5jdGlvbigpe30sazpmdW5jdGlvbigpe3JldHVybiAwfSxGOmZ1bmN0aW9uKCl7fSxCOmZ1bmN0aW9uKCl7fSxFOmZ1bmN0aW9uKCl7fSxnOmZ1bmN0aW9uKCl7fSx5OmZ1bmN0aW9uKCl7fSx2OmZ1bmN0aW9uKCl7fSxHOmZ1bmN0aW9uKCl7fSx3OmZ1bmN0aW9uKCl7fSxsOigpPT4hMCxvOmZ1bmN0aW9uKGEsYixjKXthPWIrMjA5NzE1Mj4+PjA8NDE5NDMwNS0hIWE/KGE+Pj4wKSs0Mjk0OTY3Mjk2KmI6TmFOO2M+Pj49MDthPW5ldyBEYXRlKDFFMyphKTtMW2M+PjI+Pj4wXT1hLmdldFVUQ1NlY29uZHMoKTtMW2MrND4+Mj4+PjBdPWEuZ2V0VVRDTWludXRlcygpO0xbYys4Pj4yPj4+MF09YS5nZXRVVENIb3VycygpO0xbYysxMj4+Mj4+PlxuMF09YS5nZXRVVENEYXRlKCk7TFtjKzE2Pj4yPj4+MF09YS5nZXRVVENNb250aCgpO0xbYysyMD4+Mj4+PjBdPWEuZ2V0VVRDRnVsbFllYXIoKS0xOTAwO0xbYysyND4+Mj4+PjBdPWEuZ2V0VVRDRGF5KCk7TFtjKzI4Pj4yPj4+MF09KGEuZ2V0VGltZSgpLURhdGUuVVRDKGEuZ2V0VVRDRnVsbFllYXIoKSwwLDEsMCwwLDAsMCkpLzg2NEU1fDB9LHA6ZnVuY3Rpb24oYSxiLGMpe2E9YisyMDk3MTUyPj4+MDw0MTk0MzA1LSEhYT8oYT4+PjApKzQyOTQ5NjcyOTYqYjpOYU47Yz4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0xbYz4+Mj4+PjBdPWEuZ2V0U2Vjb25kcygpO0xbYys0Pj4yPj4+MF09YS5nZXRNaW51dGVzKCk7TFtjKzg+PjI+Pj4wXT1hLmdldEhvdXJzKCk7TFtjKzEyPj4yPj4+MF09YS5nZXREYXRlKCk7TFtjKzE2Pj4yPj4+MF09YS5nZXRNb250aCgpO0xbYysyMD4+Mj4+PjBdPWEuZ2V0RnVsbFllYXIoKS0xOTAwO0xbYysyND4+Mj4+PjBdPWEuZ2V0RGF5KCk7TFtjKzI4Pj4yPj4+XG4wXT0oVyhhLmdldEZ1bGxZZWFyKCkpP3ZhOndhKVthLmdldE1vbnRoKCldK2EuZ2V0RGF0ZSgpLTF8MDtMW2MrMzY+PjI+Pj4wXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7Yj0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGY9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO0xbYyszMj4+Mj4+PjBdPShiIT1mJiZhLmdldFRpbWV6b25lT2Zmc2V0KCk9PU1hdGgubWluKGYsYikpfDB9LHE6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPW5ldyBEYXRlKExbYSsyMD4+Mj4+PjBdKzE5MDAsTFthKzE2Pj4yPj4+MF0sTFthKzEyPj4yPj4+MF0sTFthKzg+PjI+Pj4wXSxMW2ErND4+Mj4+PjBdLExbYT4+Mj4+PjBdLDApLGM9TFthKzMyPj4yPj4+MF0sZj1iLmdldFRpbWV6b25lT2Zmc2V0KCksZz0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksXG5oPShuZXcgRGF0ZShiLmdldEZ1bGxZZWFyKCksMCwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKSxtPU1hdGgubWluKGgsZyk7MD5jP0xbYSszMj4+Mj4+PjBdPU51bWJlcihnIT1oJiZtPT1mKTowPGMhPShtPT1mKSYmKGc9TWF0aC5tYXgoaCxnKSxiLnNldFRpbWUoYi5nZXRUaW1lKCkrNkU0KigoMDxjP206ZyktZikpKTtMW2ErMjQ+PjI+Pj4wXT1iLmdldERheSgpO0xbYSsyOD4+Mj4+PjBdPShXKGIuZ2V0RnVsbFllYXIoKSk/dmE6d2EpW2IuZ2V0TW9udGgoKV0rYi5nZXREYXRlKCktMXwwO0xbYT4+Mj4+PjBdPWIuZ2V0U2Vjb25kcygpO0xbYSs0Pj4yPj4+MF09Yi5nZXRNaW51dGVzKCk7TFthKzg+PjI+Pj4wXT1iLmdldEhvdXJzKCk7TFthKzEyPj4yPj4+MF09Yi5nZXREYXRlKCk7TFthKzE2Pj4yPj4+MF09Yi5nZXRNb250aCgpO0xbYSsyMD4+Mj4+PjBdPWIuZ2V0WWVhcigpO2E9Yi5nZXRUaW1lKCkvMUUzO3JldHVybiBJYSgoUj1hLDE8PStNYXRoLmFicyhSKT8wPFI/K01hdGguZmxvb3IoUi9cbjQyOTQ5NjcyOTYpPj4+MDp+fitNYXRoLmNlaWwoKFItKyh+flI+Pj4wKSkvNDI5NDk2NzI5Nik+Pj4wOjApKSxhPj4+MH0sbTpmdW5jdGlvbigpe3JldHVybi01Mn0sbjpmdW5jdGlvbigpe30sdDpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZih3KXtyZXR1cm4odz13LnRvVGltZVN0cmluZygpLm1hdGNoKC9cXCgoW0EtWmEteiBdKylcXCkkLykpP3dbMV06XCJHTVRcIn1jPj4+PTA7dmFyIGc9KG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpLGg9bmV3IERhdGUoZywwLDEpLG09bmV3IERhdGUoZyw2LDEpO2c9aC5nZXRUaW1lem9uZU9mZnNldCgpO3ZhciByPW0uZ2V0VGltZXpvbmVPZmZzZXQoKTtNW2E+Pj4wPj4yPj4+MF09NjAqTWF0aC5tYXgoZyxyKTtMW2I+Pj4wPj4yPj4+MF09TnVtYmVyKGchPXIpO2E9ZihoKTtiPWYobSk7YT1CYShhKTtiPUJhKGIpO3I8Zz8oTVtjPj4yPj4+MF09YSxNW2MrND4+Mj4+PjBdPWIpOihNW2M+PjI+Pj4wXT1iLE1bYys0Pj4yPj4+MF09YSl9LGQ6KCk9PntHKFwiXCIpfSxcbmg6ZnVuY3Rpb24oKXtyZXR1cm4gRGF0ZS5ub3coKX0sdTpmdW5jdGlvbigpe3JldHVybiA0Mjk0OTAxNzYwfSxiOigpPT5wZXJmb3JtYW5jZS5ub3coKSxJOmZ1bmN0aW9uKGEsYixjKXtiPj4+PTA7cmV0dXJuIEsuY29weVdpdGhpbihhPj4+MD4+PjAsYj4+PjAsYisoYz4+PjApPj4+MCl9LHM6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPUsubGVuZ3RoO2lmKDQyOTQ5MDE3NjA8YSlyZXR1cm4hMTtmb3IodmFyIGM9MTs0Pj1jO2MqPTIpe3ZhciBmPWIqKDErLjIvYyk7Zj1NYXRoLm1pbihmLGErMTAwNjYzMjk2KTt2YXIgZz1NYXRoO2Y9TWF0aC5tYXgoYSxmKTthOntnPWcubWluLmNhbGwoZyw0Mjk0OTAxNzYwLGYrKDY1NTM2LWYlNjU1MzYpJTY1NTM2KS1ILmJ1ZmZlci5ieXRlTGVuZ3RoKzY1NTM1Pj4+MTY7dHJ5e0guZ3JvdyhnKTtlYSgpO3ZhciBoPTE7YnJlYWsgYX1jYXRjaChtKXt9aD12b2lkIDB9aWYoaClyZXR1cm4hMH1yZXR1cm4hMX0sQzpmdW5jdGlvbihhLGIpe2E+Pj49XG4wO2I+Pj49MDt2YXIgYz0wO0NhKCkuZm9yRWFjaChmdW5jdGlvbihmLGcpe3ZhciBoPWIrYztnPU1bYSs0Kmc+PjI+Pj4wXT1oO2ZvcihoPTA7aDxmLmxlbmd0aDsrK2gpSltnKys+PjA+Pj4wXT1mLmNoYXJDb2RlQXQoaCk7SltnPj4wPj4+MF09MDtjKz1mLmxlbmd0aCsxfSk7cmV0dXJuIDB9LEQ6ZnVuY3Rpb24oYSxiKXthPj4+PTA7Yj4+Pj0wO3ZhciBjPUNhKCk7TVthPj4yPj4+MF09Yy5sZW5ndGg7dmFyIGY9MDtjLmZvckVhY2goZnVuY3Rpb24oZyl7Zis9Zy5sZW5ndGgrMX0pO01bYj4+Mj4+PjBdPWY7cmV0dXJuIDB9LGY6KCk9PjUyLGo6ZnVuY3Rpb24oKXtyZXR1cm4gNTJ9LHI6ZnVuY3Rpb24oKXtyZXR1cm4gNzB9LGk6ZnVuY3Rpb24oYSxiLGMsZil7Yj4+Pj0wO2M+Pj49MDtmPj4+PTA7Zm9yKHZhciBnPTAsaD0wO2g8YztoKyspe3ZhciBtPU1bYj4+Mj4+PjBdLHI9TVtiKzQ+PjI+Pj4wXTtiKz04O2Zvcih2YXIgdz0wO3c8cjt3Kyspe3ZhciB0PUtbbSt3Pj4+MF0sdT1cbkRhW2FdOzA9PT10fHwxMD09PXQ/KCgxPT09YT9jYTpFKSh1YSh1LDApKSx1Lmxlbmd0aD0wKTp1LnB1c2godCl9Zys9cn1NW2Y+PjI+Pj4wXT1nO3JldHVybiAwfSxBOkhhLGM6ZnVuY3Rpb24oYSxiLGMsZil7cmV0dXJuIEhhKGE+Pj4wLGI+Pj4wLGM+Pj4wLGY+Pj4wKX19O1xuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShjKXtjPWMuZXhwb3J0cztJPWM9S2EoYyk7SD1JLko7ZWEoKTtoYS51bnNoaWZ0KEkuSyk7Ti0tO2UubW9uaXRvclJ1bkRlcGVuZGVuY2llcyYmZS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzKE4pO2lmKDA9PU4mJihudWxsIT09TyYmKGNsZWFySW50ZXJ2YWwoTyksTz1udWxsKSxQKSl7dmFyIGY9UDtQPW51bGw7ZigpfXJldHVybiBjfXZhciBiPXthOkphfTtOKys7ZS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzJiZlLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMoTik7aWYoZS5pbnN0YW50aWF0ZVdhc20pdHJ5e3JldHVybiBlLmluc3RhbnRpYXRlV2FzbShiLGEpfWNhdGNoKGMpe0UoXCJNb2R1bGUuaW5zdGFudGlhdGVXYXNtIGNhbGxiYWNrIGZhaWxlZCB3aXRoIGVycm9yOiBcIitjKSxsKGMpfXBhKGIsZnVuY3Rpb24oYyl7YShjLmluc3RhbmNlKX0pLmNhdGNoKGwpO3JldHVybnt9fSkoKTtcbmUuX09ydEluaXQ9KGEsYik9PihlLl9PcnRJbml0PUkuTCkoYSxiKTtlLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihlLl9PcnRHZXRMYXN0RXJyb3I9SS5NKShhLGIpO2UuX09ydENyZWF0ZVNlc3Npb25PcHRpb25zPShhLGIsYyxmLGcsaCxtLHIsdyx0KT0+KGUuX09ydENyZWF0ZVNlc3Npb25PcHRpb25zPUkuTikoYSxiLGMsZixnLGgsbSxyLHcsdCk7ZS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXI9KGEsYik9PihlLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcj1JLk8pKGEsYik7ZS5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlPShhLGIsYyk9PihlLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9SS5QKShhLGIsYyk7ZS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihlLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9SS5RKShhLGIsYyk7ZS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPWE9PihlLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnM9SS5SKShhKTtcbmUuX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KGUuX09ydENyZWF0ZVNlc3Npb249SS5TKShhLGIsYyk7ZS5fT3J0UmVsZWFzZVNlc3Npb249YT0+KGUuX09ydFJlbGVhc2VTZXNzaW9uPUkuVCkoYSk7ZS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudD0oYSxiLGMpPT4oZS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudD1JLlUpKGEsYixjKTtlLl9PcnRHZXRJbnB1dE5hbWU9KGEsYik9PihlLl9PcnRHZXRJbnB1dE5hbWU9SS5WKShhLGIpO2UuX09ydEdldE91dHB1dE5hbWU9KGEsYik9PihlLl9PcnRHZXRPdXRwdXROYW1lPUkuVykoYSxiKTtlLl9PcnRGcmVlPWE9PihlLl9PcnRGcmVlPUkuWCkoYSk7ZS5fT3J0Q3JlYXRlVGVuc29yPShhLGIsYyxmLGcsaCk9PihlLl9PcnRDcmVhdGVUZW5zb3I9SS5ZKShhLGIsYyxmLGcsaCk7ZS5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZixnKT0+KGUuX09ydEdldFRlbnNvckRhdGE9SS5aKShhLGIsYyxmLGcpO1xuZS5fT3J0UmVsZWFzZVRlbnNvcj1hPT4oZS5fT3J0UmVsZWFzZVRlbnNvcj1JLl8pKGEpO2UuX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGYpPT4oZS5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1JLiQpKGEsYixjLGYpO2UuX09ydEFkZFJ1bkNvbmZpZ0VudHJ5PShhLGIsYyk9PihlLl9PcnRBZGRSdW5Db25maWdFbnRyeT1JLmFhKShhLGIsYyk7ZS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnM9YT0+KGUuX09ydFJlbGVhc2VSdW5PcHRpb25zPUkuYmEpKGEpO2UuX09ydENyZWF0ZUJpbmRpbmc9YT0+KGUuX09ydENyZWF0ZUJpbmRpbmc9SS5jYSkoYSk7ZS5fT3J0QmluZElucHV0PShhLGIsYyk9PihlLl9PcnRCaW5kSW5wdXQ9SS5kYSkoYSxiLGMpO2UuX09ydEJpbmRPdXRwdXQ9KGEsYixjLGYpPT4oZS5fT3J0QmluZE91dHB1dD1JLmVhKShhLGIsYyxmKTtlLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4oZS5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9SS5mYSkoYSk7XG5lLl9PcnRSZWxlYXNlQmluZGluZz1hPT4oZS5fT3J0UmVsZWFzZUJpbmRpbmc9SS5nYSkoYSk7ZS5fT3J0UnVuV2l0aEJpbmRpbmc9KGEsYixjLGYsZyk9PihlLl9PcnRSdW5XaXRoQmluZGluZz1JLmhhKShhLGIsYyxmLGcpO2UuX09ydFJ1bj0oYSxiLGMsZixnLGgsbSxyKT0+KGUuX09ydFJ1bj1JLmlhKShhLGIsYyxmLGcsaCxtLHIpO2UuX09ydEVuZFByb2ZpbGluZz1hPT4oZS5fT3J0RW5kUHJvZmlsaW5nPUkuamEpKGEpO3ZhciBBYT1lLl9tYWxsb2M9YT0+KEFhPWUuX21hbGxvYz1JLmthKShhKTtlLl9mcmVlPWE9PihlLl9mcmVlPUkubGEpKGEpO3ZhciBJYT1hPT4oSWE9SS5uYSkoYSksTGE9KCk9PihMYT1JLm9hKSgpLE1hPWE9PihNYT1JLnBhKShhKSxOYT1hPT4oTmE9SS5xYSkoYSk7XG5mdW5jdGlvbiBLYShhKXthPU9iamVjdC5hc3NpZ24oe30sYSk7dmFyIGI9Zj0+KCk9PmYoKT4+PjAsYz1mPT5nPT5mKGcpPj4+MDthLl9fZXJybm9fbG9jYXRpb249YihhLl9fZXJybm9fbG9jYXRpb24pO2EubWFsbG9jPWMoYS5tYWxsb2MpO2Euc3RhY2tTYXZlPWIoYS5zdGFja1NhdmUpO2Euc3RhY2tBbGxvYz1jKGEuc3RhY2tBbGxvYyk7cmV0dXJuIGF9ZS5zdGFja0FsbG9jPU5hO2Uuc3RhY2tTYXZlPUxhO2Uuc3RhY2tSZXN0b3JlPU1hO2UuVVRGOFRvU3RyaW5nPVQ7ZS5zdHJpbmdUb1VURjg9KGEsYixjKT0+VihhLEssYixjKTtlLmxlbmd0aEJ5dGVzVVRGOD1VO3ZhciBaO1A9ZnVuY3Rpb24gT2EoKXtafHxQYSgpO1p8fChQPU9hKX07XG5mdW5jdGlvbiBQYSgpe2Z1bmN0aW9uIGEoKXtpZighWiYmKFo9ITAsZS5jYWxsZWRSdW49ITAsIWRhKSl7UyhoYSk7ayhlKTtpZihlLm9uUnVudGltZUluaXRpYWxpemVkKWUub25SdW50aW1lSW5pdGlhbGl6ZWQoKTtpZihlLnBvc3RSdW4pZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUucG9zdFJ1biYmKGUucG9zdFJ1bj1bZS5wb3N0UnVuXSk7ZS5wb3N0UnVuLmxlbmd0aDspe3ZhciBiPWUucG9zdFJ1bi5zaGlmdCgpO2lhLnVuc2hpZnQoYil9UyhpYSl9fWlmKCEoMDxOKSl7aWYoZS5wcmVSdW4pZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUucHJlUnVuJiYoZS5wcmVSdW49W2UucHJlUnVuXSk7ZS5wcmVSdW4ubGVuZ3RoOylqYSgpO1MoZmEpOzA8Tnx8KGUuc2V0U3RhdHVzPyhlLnNldFN0YXR1cyhcIlJ1bm5pbmcuLi5cIiksc2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtlLnNldFN0YXR1cyhcIlwiKX0sMSk7YSgpfSwxKSk6YSgpKX19XG5pZihlLnByZUluaXQpZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUucHJlSW5pdCYmKGUucHJlSW5pdD1bZS5wcmVJbml0XSk7MDxlLnByZUluaXQubGVuZ3RoOyllLnByZUluaXQucG9wKCkoKTtQYSgpO1xuXG5cbiAgcmV0dXJuIG1vZHVsZUFyZy5yZWFkeVxufVxuXG4pO1xufSkoKTtcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG4gIG1vZHVsZS5leHBvcnRzID0gb3J0V2FzbTtcbmVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSlcbiAgZGVmaW5lKFtdLCAoKSA9PiBvcnRXYXNtKTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHtFbnZ9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7T3J0V2FzbU1vZHVsZX0gZnJvbSAnLi9iaW5kaW5nL29ydC13YXNtJztcbmltcG9ydCB7T3J0V2FzbVRocmVhZGVkTW9kdWxlfSBmcm9tICcuL2JpbmRpbmcvb3J0LXdhc20tdGhyZWFkZWQnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG5sZXQgb3J0V2FzbUZhY3Rvcnk6IEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+O1xuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORykge1xuICBvcnRXYXNtRmFjdG9yeSA9IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtdHJhaW5pbmctd2FzbS1zaW1kLmpzJyk7XG59IGVsc2Uge1xuICBvcnRXYXNtRmFjdG9yeSA9XG4gICAgICBCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVID8gcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLmpzJykgOiByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tc2ltZC5qc2VwLmpzJyk7XG59XG5cbmNvbnN0IG9ydFdhc21GYWN0b3J5VGhyZWFkZWQ6IEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+ID0gIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1RIUkVBRCA/XG4gICAgKEJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgPyByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tdGhyZWFkZWQuanMnKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLmpzJykpIDpcbiAgICBvcnRXYXNtRmFjdG9yeTtcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xuXG5sZXQgd2FzbTogT3J0V2FzbU1vZHVsZXx1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5cbmNvbnN0IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gSWYgJ1NoYXJlZEFycmF5QnVmZmVyJyBpcyBub3QgYXZhaWxhYmxlLCBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90IHdvcmsuXG4gICAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciB0cmFuc2ZlcmFiaWxpdHkgb2YgU0FCcyAoZm9yIGJyb3dzZXJzLiBuZWVkZWQgZm9yIEZpcmVmb3gpXG4gICAgLy8gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIW1zZy9tb3ppbGxhLmRldi5wbGF0Zm9ybS9JSGtCWmxIRVRwQS9kd3NNTmNoV0VRQUpcbiAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEucG9zdE1lc3NhZ2UobmV3IFNoYXJlZEFycmF5QnVmZmVyKDEpKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSB0aHJlYWRzIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhyZWFkZWQgaW5zdHJ1Y3Rpb25zLlxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsICAwLCAgMCwgMSwgNCwgMSwgIDk2LCAwLCAgIDAsICAzLCAyLCAxLCAgMCwgNSxcbiAgICAgIDQsIDEsICAzLCAgIDEsICAgMSwgMTAsIDExLCAxLCA5LCAwLCA2NSwgMCwgIDI1NCwgMTYsIDIsIDAsIDI2LCAxMVxuICAgIF0pKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgaXNTaW1kU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBTSU1EIGluc3RydWN0aW9ucy5cblxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XG4gICAgLy9cbiAgICAvLyAobW9kdWxlXG4gICAgLy8gICAodHlwZSAkdDAgKGZ1bmMpKVxuICAgIC8vICAgKGZ1bmMgJGYwICh0eXBlICR0MClcbiAgICAvLyAgICAgKGRyb3BcbiAgICAvLyAgICAgICAoaTMyeDQuZG90X2kxNng4X3NcbiAgICAvLyAgICAgICAgIChpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxuICAgIC8vICAgICAgICAgKHYxMjguY29uc3QgaTMyeDQgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCkpKSkpXG5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMCwgICA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsICAgMjgsICAwLCA2NSwgMCxcbiAgICAgIDI1MywgMTUsIDI1MywgMTIsICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDAsICAyNTMsIDE4NiwgMSwgMjYsIDExXG4gICAgXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBnZXRXYXNtRmlsZU5hbWUgPSAodXNlU2ltZDogYm9vbGVhbiwgdXNlVGhyZWFkczogYm9vbGVhbikgPT4ge1xuICBpZiAodXNlU2ltZCkge1xuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HKSB7XG4gICAgICByZXR1cm4gJ29ydC10cmFpbmluZy13YXNtLXNpbWQud2FzbSc7XG4gICAgfVxuICAgIHJldHVybiB1c2VUaHJlYWRzID8gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScgOiAnb3J0LXdhc20tc2ltZC53YXNtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXNlVGhyZWFkcyA/ICdvcnQtd2FzbS10aHJlYWRlZC53YXNtJyA6ICdvcnQtd2FzbS53YXNtJztcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseSA9IGFzeW5jKGZsYWdzOiBFbnYuV2ViQXNzZW1ibHlGbGFncyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRpYWxpemluZykge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVsdGlwbGUgY2FsbHMgdG8gXFwnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KClcXCcgZGV0ZWN0ZWQuJyk7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIGNhbGwgdG8gXFwnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KClcXCcgZmFpbGVkLicpO1xuICB9XG5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAvLyB3YXNtIGZsYWdzIGFyZSBhbHJlYWR5IGluaXRpYWxpemVkXG4gIGNvbnN0IHRpbWVvdXQgPSBmbGFncy5pbml0VGltZW91dCE7XG4gIGNvbnN0IG51bVRocmVhZHMgPSBmbGFncy5udW1UaHJlYWRzITtcbiAgY29uc3Qgc2ltZCA9IGZsYWdzLnNpbWQhO1xuXG4gIGNvbnN0IHVzZVRocmVhZHMgPSBudW1UaHJlYWRzID4gMSAmJiBpc011bHRpVGhyZWFkU3VwcG9ydGVkKCk7XG4gIGNvbnN0IHVzZVNpbWQgPSBzaW1kICYmIGlzU2ltZFN1cHBvcnRlZCgpO1xuXG4gIGNvbnN0IHdhc21QYXRocyA9IGZsYWdzLndhc21QYXRocztcbiAgY29uc3Qgd2FzbVByZWZpeE92ZXJyaWRlID0gdHlwZW9mIHdhc21QYXRocyA9PT0gJ3N0cmluZycgPyB3YXNtUGF0aHMgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHdhc21GaWxlTmFtZSA9IGdldFdhc21GaWxlTmFtZSh1c2VTaW1kLCB1c2VUaHJlYWRzKTtcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZSA9IHR5cGVvZiB3YXNtUGF0aHMgPT09ICdvYmplY3QnID8gd2FzbVBhdGhzW3dhc21GaWxlTmFtZV0gOiB1bmRlZmluZWQ7XG5cbiAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuXG4gIGNvbnN0IHRhc2tzOiBBcnJheTxQcm9taXNlPHZvaWQ+PiA9IFtdO1xuXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgdGFza3MucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8vIHByb21pc2UgZm9yIG1vZHVsZSBpbml0aWFsaXphdGlvblxuICB0YXNrcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdXNlVGhyZWFkcyA/IG9ydFdhc21GYWN0b3J5VGhyZWFkZWQgOiBvcnRXYXNtRmFjdG9yeTtcbiAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XG4gICAgICBsb2NhdGVGaWxlOiAoZmlsZU5hbWU6IHN0cmluZywgc2NyaXB0RGlyZWN0b3J5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9USFJFQUQgJiYgdXNlVGhyZWFkcyAmJiBmaWxlTmFtZS5lbmRzV2l0aCgnLndvcmtlci5qcycpICYmXG4gICAgICAgICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZSgpIGZ1bmN0aW9uIGlzIGhhbmRsZWQgYnkgZXNidWlsZCBwbHVnaW4gdG8gbG9hZCBmaWxlIGNvbnRlbnQgYXMgc3RyaW5nLlxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzXG4gICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkLndvcmtlci5qcycpXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWxlTmFtZS5lbmRzV2l0aCgnLndhc20nKSkge1xuICAgICAgICAgIGlmICh3YXNtUGF0aE92ZXJyaWRlKSB7XG4gICAgICAgICAgICByZXR1cm4gd2FzbVBhdGhPdmVycmlkZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcmVmaXggPSB3YXNtUHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0RGlyZWN0b3J5O1xuXG4gICAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICAgICAgICBpZiAod2FzbUZpbGVOYW1lID09PSAnb3J0LXdhc20tc2ltZC53YXNtJykge1xuICAgICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgJ29ydC13YXNtLXNpbWQuanNlcC53YXNtJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2FzbUZpbGVOYW1lID09PSAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJykge1xuICAgICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC53YXNtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgd2FzbUZpbGVOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNjcmlwdERpcmVjdG9yeSArIGZpbGVOYW1lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1RIUkVBRCAmJiB1c2VUaHJlYWRzKSB7XG4gICAgICBpZiAodHlwZW9mIEJsb2IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbmZpZy5tYWluU2NyaXB0VXJsT3JCbG9iID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ29ydC13YXNtLXRocmVhZGVkLmpzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY3JpcHRTb3VyY2VDb2RlID0gYHZhciBvcnRXYXNtVGhyZWFkZWQ9JHtmYWN0b3J5LnRvU3RyaW5nKCl9O2A7XG4gICAgICAgIGNvbmZpZy5tYWluU2NyaXB0VXJsT3JCbG9iID0gbmV3IEJsb2IoW3NjcmlwdFNvdXJjZUNvZGVdLCB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmYWN0b3J5KGNvbmZpZykudGhlbihcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIG1vZHVsZSA9PiB7XG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgIHdhc20gPSBtb2R1bGU7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBmYWlsZWQgdG8gaW5pdGlhbGl6ZVxuICAgICAgICAod2hhdCkgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCh3aGF0KTtcbiAgICAgICAgfSk7XG4gIH0pKTtcblxuICBhd2FpdCBQcm9taXNlLnJhY2UodGFza3MpO1xuXG4gIGlmIChpc1RpbWVvdXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYkFzc2VtYmx5IGJhY2tlbmQgaW5pdGlhbGl6aW5nIGZhaWxlZCBkdWUgdG8gdGltZW91dDogJHt0aW1lb3V0fW1zYCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbnN0YW5jZSA9ICgpOiBPcnRXYXNtTW9kdWxlID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmIHdhc20pIHtcbiAgICByZXR1cm4gd2FzbTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgaXMgbm90IGluaXRpYWxpemVkIHlldC4nKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNwb3NlID0gKCk6IHZvaWQgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgIWluaXRpYWxpemluZyAmJiAhYWJvcnRlZCkge1xuICAgIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgICAod2FzbSBhcyBPcnRXYXNtVGhyZWFkZWRNb2R1bGUpLlBUaHJlYWQ/LnRlcm1pbmF0ZUFsbFRocmVhZHMoKTtcbiAgICB3YXNtID0gdW5kZWZpbmVkO1xuXG4gICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgYWxsb2NXYXNtU3RyaW5nID0gKGRhdGE6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IGRhdGFMZW5ndGggPSB3YXNtLmxlbmd0aEJ5dGVzVVRGOChkYXRhKSArIDE7XG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XG4gIHdhc20uc3RyaW5nVG9VVEY4KGRhdGEsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xuICBhbGxvY3MucHVzaChkYXRhT2Zmc2V0KTtcblxuICByZXR1cm4gZGF0YU9mZnNldDtcbn07XG5cbmludGVyZmFjZSBFeHRyYU9wdGlvbnNIYW5kbGVyIHtcbiAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpdGVyYXRlRXh0cmFPcHRpb25zID1cbiAgICAob3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHByZWZpeDogc3RyaW5nLCBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcbiAgICAgaGFuZGxlcjogRXh0cmFPcHRpb25zSGFuZGxlcik6IHZvaWQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnICYmIG9wdGlvbnMgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgaW4gb3B0aW9ucycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gKHByZWZpeCkgPyBwcmVmaXggKyBrZXkgOiBrZXk7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgbmFtZSArICcuJywgc2VlbiwgaGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgaGFuZGxlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIGhhbmRsZXIobmFtZSwgKHZhbHVlKSA/ICcxJyA6ICcwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBoYW5kbGUgZXh0cmEgY29uZmlnIHR5cGU6ICR7dHlwZW9mIHZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4vKipcbiAqIGNoZWNrIHdlYiBhc3NlbWJseSBBUEkncyBsYXN0IGVycm9yIGFuZCB0aHJvdyBlcnJvciBpZiBhbnkgZXJyb3Igb2NjdXJyZWQuXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxuICovXG5leHBvcnQgY29uc3QgY2hlY2tMYXN0RXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJhbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgd2FzbS5fT3J0R2V0TGFzdEVycm9yKHBhcmFtc09mZnNldCwgcGFyYW1zT2Zmc2V0ICsgNCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5IRUFQMzJbcGFyYW1zT2Zmc2V0IC8gNF07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uSEVBUFUzMltwYXJhbXNPZmZzZXQgLyA0ICsgMV07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlUG9pbnRlciA/IHdhc20uVVRGOFRvU3RyaW5nKGVycm9yTWVzc2FnZVBvaW50ZXIpIDogJyc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9uc30gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAgLy8gRGVmYXVsdCB0byB3YXJuaW5nXG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dTZXZlcml0eUxldmVsKSB8fFxuICAgICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID0gMDsgIC8vIERlZmF1bHQgdG8gMFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyB2ZXJib3NpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke29wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LnRlcm1pbmF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLnRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxldCB0YWdEYXRhT2Zmc2V0ID0gMDtcbiAgICBpZiAob3B0aW9ucz8udGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhZ0RhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcob3B0aW9ucy50YWcsIGFsbG9jcyk7XG4gICAgfVxuXG4gICAgcnVuT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVJ1bk9wdGlvbnMoXG4gICAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCEsIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwhLCAhIXJ1bk9wdGlvbnMudGVybWluYXRlISwgdGFnRGF0YU9mZnNldCk7XG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBydW4gb3B0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhvcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG5cbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFJ1bkNvbmZpZ0VudHJ5KHJ1bk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgcnVuIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbcnVuT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goYWxsb2MgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5jb25zdCBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwgPSAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbDogc3RyaW5nfHVua25vd24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwpIHtcbiAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdleHRlbmRlZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIDk5O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGdyYXBoIG9wdGltaXphdGlvbiBsZXZlbDogJHtncmFwaE9wdGltaXphdGlvbkxldmVsfWApO1xuICB9XG59O1xuXG5jb25zdCBnZXRFeGVjdXRpb25Nb2RlID0gKGV4ZWN1dGlvbk1vZGU6ICdzZXF1ZW50aWFsJ3wncGFyYWxsZWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChleGVjdXRpb25Nb2RlKSB7XG4gICAgY2FzZSAnc2VxdWVudGlhbCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdwYXJhbGxlbCc6XG4gICAgICByZXR1cm4gMTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBleGVjdXRpb24gbW9kZTogJHtleGVjdXRpb25Nb2RlfWApO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmREZWZhdWx0T3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogdm9pZCA9PiB7XG4gIGlmICghb3B0aW9ucy5leHRyYSkge1xuICAgIG9wdGlvbnMuZXh0cmEgPSB7fTtcbiAgfVxuICBpZiAoIW9wdGlvbnMuZXh0cmEuc2Vzc2lvbikge1xuICAgIG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiA9IHt9O1xuICB9XG4gIGNvbnN0IHNlc3Npb24gPSBvcHRpb25zLmV4dHJhLnNlc3Npb24gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgaWYgKCFzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5ID0gJzEnO1xuICB9XG5cbiAgLy8gaWYgdXNpbmcgSlNFUCB3aXRoIFdlYkdQVSwgYWx3YXlzIGRpc2FibGUgbWVtb3J5IHBhdHRlcm5cbiAgaWYgKG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzICYmXG4gICAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycy5zb21lKGVwID0+ICh0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lKSA9PT0gJ3dlYmdwdScpKSB7XG4gICAgb3B0aW9ucy5lbmFibGVNZW1QYXR0ZXJuID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHNldEV4ZWN1dGlvblByb3ZpZGVycyA9XG4gICAgKHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsIGV4ZWN1dGlvblByb3ZpZGVyczogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5FeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdLFxuICAgICBhbGxvY3M6IG51bWJlcltdKTogdm9pZCA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgICAgICBsZXQgZXBOYW1lID0gdHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZTtcblxuICAgICAgICAvLyBjaGVjayBFUCBuYW1lXG4gICAgICAgIHN3aXRjaCAoZXBOYW1lKSB7XG4gICAgICAgICAgY2FzZSAneG5ucGFjayc6XG4gICAgICAgICAgICBlcE5hbWUgPSAnWE5OUEFDSyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3ZWJubic6XG4gICAgICAgICAgICBlcE5hbWUgPSAnV0VCTk4nO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgICAgICBpZiAod2Vibm5PcHRpb25zPy5kZXZpY2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZGV2aWNlVHlwZScsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYm5uT3B0aW9ucy5kZXZpY2VUeXBlLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ2RldmljZVR5cGUnIC0gJHt3ZWJubk9wdGlvbnMuZGV2aWNlVHlwZX0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh3ZWJubk9wdGlvbnM/Lm51bVRocmVhZHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbnVtVGhyZWFkcyA9IHdlYm5uT3B0aW9ucy5udW1UaHJlYWRzO1xuICAgICAgICAgICAgICAgIC8vIEp1c3QgaWdub3JlIGludmFsaWQgd2Vibm5PcHRpb25zLm51bVRocmVhZHMuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1UaHJlYWRzICE9ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG51bVRocmVhZHMpIHx8IG51bVRocmVhZHMgPCAwKSB7XG4gICAgICAgICAgICAgICAgICBudW1UaHJlYWRzID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnbnVtVGhyZWFkcycsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG51bVRocmVhZHMudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdudW1UaHJlYWRzJyAtICR7d2Vibm5PcHRpb25zLm51bVRocmVhZHN9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAod2Vibm5PcHRpb25zPy5wb3dlclByZWZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdwb3dlclByZWZlcmVuY2UnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJubk9wdGlvbnMucG93ZXJQcmVmZXJlbmNlLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgIGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ3Bvd2VyUHJlZmVyZW5jZScgLSAke3dlYm5uT3B0aW9ucy5wb3dlclByZWZlcmVuY2V9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2ViZ3B1JzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdKUyc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb25zdCB3ZWJncHVPcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnM/LnByZWZlcnJlZExheW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05DSFcnICYmIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkhXQycpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcHJlZmVycmVkTGF5b3V0IG11c3QgYmUgZWl0aGVyICdOQ0hXJyBvciAnTkhXQyc6ICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ3ByZWZlcnJlZExheW91dCcsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0LCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgIGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ3ByZWZlcnJlZExheW91dCcgLSAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dhc20nOlxuICAgICAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyKHNlc3Npb25PcHRpb25zSGFuZGxlLCBlcE5hbWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhcHBlbmQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0U2Vzc2lvbk9wdGlvbnMgPSAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJbXV0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHNlc3Npb25PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgYXBwZW5kRGVmYXVsdE9wdGlvbnMoc2Vzc2lvbk9wdGlvbnMpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA9IGdldEdyYXBoT3B0aW16YXRpb25MZXZlbChzZXNzaW9uT3B0aW9ucy5ncmFwaE9wdGltaXphdGlvbkxldmVsID8/ICdhbGwnKTtcbiAgICBjb25zdCBleGVjdXRpb25Nb2RlID0gZ2V0RXhlY3V0aW9uTW9kZShzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Nb2RlID8/ICdzZXF1ZW50aWFsJyk7XG4gICAgY29uc3QgbG9nSWREYXRhT2Zmc2V0ID1cbiAgICAgICAgdHlwZW9mIHNlc3Npb25PcHRpb25zLmxvZ0lkID09PSAnc3RyaW5nJyA/IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5sb2dJZCwgYWxsb2NzKSA6IDA7XG5cbiAgICBjb25zdCBsb2dTZXZlcml0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA/PyAyOyAgLy8gRGVmYXVsdCB0byAyIC0gd2FybmluZ1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dTZXZlcml0eUxldmVsKSB8fCBsb2dTZXZlcml0eUxldmVsIDwgMCB8fCBsb2dTZXZlcml0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgc2VydmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ1ZlcmJvc2l0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPz8gMDsgIC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCA9IHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoID09PSAnc3RyaW5nJyA/XG4gICAgICAgIGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoLCBhbGxvY3MpIDpcbiAgICAgICAgMDtcblxuICAgIHNlc3Npb25PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbk9wdGlvbnMoXG4gICAgICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwsICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiwgZXhlY3V0aW9uTW9kZSxcbiAgICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsIDAsIGxvZ0lkRGF0YU9mZnNldCwgbG9nU2V2ZXJpdHlMZXZlbCwgbG9nVmVyYm9zaXR5TGV2ZWwsXG4gICAgICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGhPZmZzZXQpO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIHNlc3Npb24gb3B0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlIG5hbWUgbXVzdCBiZSBhIHN0cmluZzogJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlIHZhbHVlIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlcjogJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG5hbWUsIGFsbG9jcyk7XG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGUoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIG5hbWVPZmZzZXQsIHZhbHVlKSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZTogJHtuYW1lfSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMoc2Vzc2lvbk9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhrZXksIGFsbG9jcyk7XG4gICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWx1ZSwgYWxsb2NzKTtcblxuICAgICAgICBpZiAod2FzbS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAke2tleX0gLSAke3ZhbHVlfS5gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goYWxsb2MgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG4vLyBUaGlzIGZpbGUgaW5jbHVkZXMgY29tbW9uIGRlZmluaXRpb25zLiBUaGV5IGRvIE5PVCBoYXZlIGRlcGVuZGVuY3kgb24gdGhlIFdlYkFzc2VtYmx5IGluc3RhbmNlLlxuXG4vKipcbiAqIENvcGllZCBmcm9tIE9OTlggZGVmaW5pdGlvbi4gVXNlIHRoaXMgdG8gZHJvcCBkZXBlbmRlbmN5ICdvbm54X3Byb3RvJyB0byBkZWNyZWFzZSBjb21waWxlZCAuanMgZmlsZSBzaXplLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBEYXRhVHlwZSB7XG4gIHVuZGVmaW5lZCA9IDAsXG4gIGZsb2F0ID0gMSxcbiAgdWludDggPSAyLFxuICBpbnQ4ID0gMyxcbiAgdWludDE2ID0gNCxcbiAgaW50MTYgPSA1LFxuICBpbnQzMiA9IDYsXG4gIGludDY0ID0gNyxcbiAgc3RyaW5nID0gOCxcbiAgYm9vbCA9IDksXG4gIGZsb2F0MTYgPSAxMCxcbiAgZG91YmxlID0gMTEsXG4gIHVpbnQzMiA9IDEyLFxuICB1aW50NjQgPSAxMyxcbiAgY29tcGxleDY0ID0gMTQsXG4gIGNvbXBsZXgxMjggPSAxNSxcbiAgYmZsb2F0MTYgPSAxNlxufVxuXG4vKipcbiAqIE1hcCBzdHJpbmcgdGVuc29yIGRhdGEgdG8gZW51bSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50ODtcbiAgICBjYXNlICdib29sJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5ib29sO1xuICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQxNjtcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MzI7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQxNjtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5zdHJpbmc7XG4gICAgY2FzZSAnaW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDY0O1xuICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGVudW0gdmFsdWUgdG8gc3RyaW5nIHRlbnNvciBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyA9ICh0eXBlUHJvdG86IERhdGFUeXBlKTogVGVuc29yLlR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGVQcm90bykge1xuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcbiAgICAgIHJldHVybiAnaW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50ODpcbiAgICAgIHJldHVybiAndWludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUuYm9vbDpcbiAgICAgIHJldHVybiAnYm9vbCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcbiAgICAgIHJldHVybiAnaW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDE2OlxuICAgICAgcmV0dXJuICd1aW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MzI6XG4gICAgICByZXR1cm4gJ2ludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcbiAgICAgIHJldHVybiAndWludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0MTY6XG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQ6XG4gICAgICByZXR1cm4gJ2Zsb2F0MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxuICAgICAgcmV0dXJuICdmbG9hdDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnN0cmluZzpcbiAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICBjYXNlIERhdGFUeXBlLmludDY0OlxuICAgICAgcmV0dXJuICdpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XG4gICAgICByZXR1cm4gJ3VpbnQ2NCc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZVByb3RvfWApO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCB0ZW5zb3IgZWxlbWVudCBzaXplIGluIGJ5dGVzIGJ5IHRoZSBnaXZlbiBkYXRhIHR5cGVcbiAqIEByZXR1cm5zIHNpemUgaW4gaW50ZWdlciBvciB1bmRlZmluZWQgaWYgdGhlIGRhdGEgdHlwZSBpcyBub3Qgc3VwcG9ydGVkXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUZW5zb3JFbGVtZW50U2l6ZSA9IChkYXRlVHlwZTogbnVtYmVyKTogbnVtYmVyfFxuICAgIHVuZGVmaW5lZCA9PiBbdW5kZWZpbmVkLCA0LCAxLCAxLCAyLCAyLCA0LCA4LCB1bmRlZmluZWQsIDEsIDIsIDgsIDQsIDgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWRdW2RhdGVUeXBlXTtcblxuLyoqXG4gKiBnZXQgdHlwZWQgYXJyYXkgY29uc3RydWN0b3IgYnkgdGhlIGdpdmVuIHRlbnNvciB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IgPSAodHlwZTogVGVuc29yLlR5cGUpOiBGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvcnxVaW50OEFycmF5Q29uc3RydWN0b3J8XG4gICAgSW50OEFycmF5Q29uc3RydWN0b3J8VWludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBVaW50OEFycmF5Q29uc3RydWN0b3J8RmxvYXQ2NEFycmF5Q29uc3RydWN0b3J8VWludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yID0+IHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdmbG9hdDE2JzpcbiAgICAgICAgICByZXR1cm4gVWludDE2QXJyYXk7XG4gICAgICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICAgICAgY2FzZSAnaW50OCc6XG4gICAgICAgICAgcmV0dXJuIEludDhBcnJheTtcbiAgICAgICAgY2FzZSAndWludDE2JzpcbiAgICAgICAgICByZXR1cm4gVWludDE2QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgICAgICByZXR1cm4gSW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnaW50MzInOlxuICAgICAgICAgIHJldHVybiBJbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdib29sJzpcbiAgICAgICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICAgICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEZsb2F0NjRBcnJheTtcbiAgICAgICAgY2FzZSAndWludDMyJzpcbiAgICAgICAgICByZXR1cm4gVWludDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDY0JzpcbiAgICAgICAgICByZXR1cm4gQmlnSW50NjRBcnJheTtcbiAgICAgICAgY2FzZSAndWludDY0JzpcbiAgICAgICAgICByZXR1cm4gQmlnVWludDY0QXJyYXk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCB0eXBlOiAke3R5cGV9YCk7XG4gICAgICB9XG4gICAgfTtcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGxvZyBsZXZlbCB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBsb2dMZXZlbFN0cmluZ1RvRW51bSA9IChsb2dMZXZlbD86ICd2ZXJib3NlJ3wnaW5mbyd8J3dhcm5pbmcnfCdlcnJvcid8J2ZhdGFsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAobG9nTGV2ZWwpIHtcbiAgICBjYXNlICd2ZXJib3NlJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2luZm8nOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnd2FybmluZyc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdmYXRhbCc6XG4gICAgICByZXR1cm4gNDtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBsb2dnaW5nIGxldmVsOiAke2xvZ0xldmVsfWApO1xuICB9XG59O1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBHUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUgPSAodHlwZTogVGVuc29yLlR5cGUpOiB0eXBlIGlzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXMgPT4gdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XG4gICAgdHlwZSA9PT0gJ2ludDMyJyB8fCB0eXBlID09PSAnaW50NjQnIHx8IHR5cGUgPT09ICdib29sJyB8fCB0eXBlID09PSAnZmxvYXQxNicgfHwgdHlwZSA9PT0gJ3VpbnQzMic7XG5cbi8qKlxuICogTWFwIHN0cmluZyBkYXRhIGxvY2F0aW9uIHRvIGludGVnZXIgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSA9IChsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbik6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICBjYXNlICdub25lJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gNDtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIGxvY2F0aW9uOiAke2xvY2F0aW9ufWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBpbnRlZ2VyIGRhdGEgbG9jYXRpb24gdG8gc3RyaW5nIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25FbnVtVG9TdHJpbmcgPSAobG9jYXRpb246IG51bWJlcik6IFRlbnNvci5EYXRhTG9jYXRpb258dW5kZWZpbmVkID0+XG4gICAgKFsnbm9uZScsICdjcHUnLCAnY3B1LXBpbm5lZCcsICd0ZXh0dXJlJywgJ2dwdS1idWZmZXInXSBhcyBjb25zdClbbG9jYXRpb25dO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0VudiwgSW5mZXJlbmNlU2Vzc2lvbiwgVGVuc29yfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1NlcmlhbGl6YWJsZU1vZGVsZGF0YSwgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLCBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHtzZXRSdW5PcHRpb25zfSBmcm9tICcuL3J1bi1vcHRpb25zJztcbmltcG9ydCB7c2V0U2Vzc2lvbk9wdGlvbnN9IGZyb20gJy4vc2Vzc2lvbi1vcHRpb25zJztcbmltcG9ydCB7ZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtLCBnZXRUZW5zb3JFbGVtZW50U2l6ZSwgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLCBsb2dMZXZlbFN0cmluZ1RvRW51bSwgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtLCB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3J9IGZyb20gJy4vd2FzbS1jb21tb24nO1xuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5sZXQgb3J0RW52SW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBnZXQgdGhlIGlucHV0L291dHB1dCBjb3VudCBvZiB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSBzZXNzaW9uSGFuZGxlIHRoZSBoYW5kbGUgcmVwcmVzZW50aW5nIHRoZSBzZXNzaW9uLiBzaG91bGQgYmUgbm9uLXplcm8uXG4gKiBAcmV0dXJucyBhIHR1cGxlIGluY2x1ZGluZyAyIG51bWJlcnMsIHJlcHJlc2VudGluZyB0aGUgaW5wdXQgY291bnQgYW5kIG91dHB1dCBjb3VudC5cbiAqL1xuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQgPSAoc2Vzc2lvbkhhbmRsZTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg4KTtcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRJbnB1dE91dHB1dENvdW50KHNlc3Npb25IYW5kbGUsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyA0KTtcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgc2Vzc2lvbiBpbnB1dC9vdXRwdXQgY291bnQuJyk7XG4gICAgfVxuICAgIHJldHVybiBbd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDRdLCB3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNCArIDFdXTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogaW5pdGlhbGl6ZSBPUlQgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0gbnVtVGhyZWFkcyBTZXRHbG9iYWxJbnRyYU9wTnVtVGhyZWFkcyhudW1UaHJlYWRzKVxuICogQHBhcmFtIGxvZ2dpbmdMZXZlbCBDcmVhdGVFbnYoc3RhdGljX2Nhc3Q8T3J0TG9nZ2luZ0xldmVsPihsb2dnaW5nX2xldmVsKSlcbiAqL1xuY29uc3QgaW5pdE9ydCA9IChudW1UaHJlYWRzOiBudW1iZXIsIGxvZ2dpbmdMZXZlbDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IGVycm9yQ29kZSA9IGdldEluc3RhbmNlKCkuX09ydEluaXQobnVtVGhyZWFkcywgbG9nZ2luZ0xldmVsKTtcbiAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGluaXRpYWxpemUgb25ueHJ1bnRpbWUuJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW50aWFsaXplIHJ1bnRpbWUgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0gZW52IHBhc3NlZCBpbiB0aGUgZW52aXJvbm1lbnQgY29uZmlnIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRSdW50aW1lID0gYXN5bmMoZW52OiBFbnYpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgLy8gaW5pdCBPUlRcbiAgaW5pdE9ydChlbnYud2FzbS5udW1UaHJlYWRzISwgbG9nTGV2ZWxTdHJpbmdUb0VudW0oZW52LmxvZ0xldmVsKSk7XG5cbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgLy8gaW5pdCBKU0VQIGlmIGF2YWlsYWJsZVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICBjb25zdCBpbml0SnNlcCA9IHJlcXVpcmUoJy4vanNlcC9pbml0JykuaW5pdDtcbiAgICBhd2FpdCBpbml0SnNlcChnZXRJbnN0YW5jZSgpLCBlbnYpO1xuICB9XG5cbiAgb3J0RW52SW5pdGlhbGl6ZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiB2YWxpZCBkYXRhIGxvY2F0aW9ucyBmb3IgaW5wdXQvb3V0cHV0IHRlbnNvcnMuXG4gKi9cbnR5cGUgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXQgPSAnY3B1J3wnY3B1LXBpbm5lZCd8J2dwdS1idWZmZXInO1xuXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xuICAvKipcbiAgICogdGhlIGhhbmRsZSBvZiBJTyBiaW5kaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICpcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJy5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogcmVhZG9ubHkgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXTtcblxuICAvKipcbiAgICogZW51bSB2YWx1ZSBvZiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiByZWFkb25seSBudW1iZXJbXTtcbn07XG5cbi8qKlxuICogIHR1cGxlIGVsZW1lbnRzIGFyZTogSW5mZXJlbmNlU2Vzc2lvbiBJRDsgaW5wdXROYW1lc1VURjhFbmNvZGVkOyBvdXRwdXROYW1lc1VURjhFbmNvZGVkOyBiaW5kaW5nU3RhdGVcbiAqL1xudHlwZSBTZXNzaW9uTWV0YWRhdGEgPSBbXG4gIGluZmVyZW5jZVNlc3Npb25JZDogbnVtYmVyLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZXxudWxsXG5dO1xuXG5jb25zdCBhY3RpdmVTZXNzaW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBTZXNzaW9uTWV0YWRhdGE+KCk7XG5cbmV4cG9ydCBjb25zdCBpc09ydEVudkluaXRpYWxpemVkID0gKCk6IGJvb2xlYW4gPT4gb3J0RW52SW5pdGlhbGl6ZWQ7XG5cbi8qKlxuICogYWxsb2NhdGUgdGhlIG1lbW9yeSBhbmQgbWVtY3B5IHRoZSBtb2RlbCBieXRlcywgcHJlcGFyaW5nIGZvciBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBJbmZlcmVuY2VTZXNzaW9uLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb25BbGxvY2F0ZSA9IChtb2RlbDogVWludDhBcnJheSk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgbW9kZWxEYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKG1vZGVsLmJ5dGVMZW5ndGgpO1xuICBpZiAobW9kZWxEYXRhT2Zmc2V0ID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLiBmYWlsZWQgdG8gYWxsb2NhdGUgYSBidWZmZXIgb2Ygc2l6ZSAke21vZGVsLmJ5dGVMZW5ndGh9LmApO1xuICB9XG4gIHdhc20uSEVBUFU4LnNldChtb2RlbCwgbW9kZWxEYXRhT2Zmc2V0KTtcbiAgcmV0dXJuIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsLmJ5dGVMZW5ndGhdO1xufTtcblxuLyoqXG4gKiBjcmVhdGUgYW4gaW5mZXJlbmNlIHNlc3Npb24gdXNpbmcgdGhlIHByZXBhcmVkIGJ1ZmZlciBjb250YWluaW5nIHRoZSBtb2RlbCBkYXRhLlxuICogQHBhcmFtIG1vZGVsRGF0YSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YSBidWZmZXIuXG4gKiBAcGFyYW0gb3B0aW9ucyBhbiBvcHRpb25hbCBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSAzLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgW3Nlc3Npb24gaGFuZGxlLCBpbnB1dCBuYW1lcywgb3V0cHV0IG5hbWVzXVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbkZpbmFsaXplID1cbiAgICAobW9kZWxEYXRhOiBTZXJpYWxpemFibGVNb2RlbGRhdGEsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gICAgICBsZXQgc2Vzc2lvbkhhbmRsZSA9IDA7XG4gICAgICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICAgICAgbGV0IGlvQmluZGluZ0hhbmRsZSA9IDA7XG4gICAgICBsZXQgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XG4gICAgICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gW107XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXSA9IHNldFNlc3Npb25PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlc3Npb25IYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YVswXSwgbW9kZWxEYXRhWzFdLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgICAgIGlmIChzZXNzaW9uSGFuZGxlID09PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIGEgc2Vzc2lvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IFtpbnB1dENvdW50LCBvdXRwdXRDb3VudF0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlKTtcblxuICAgICAgICBjb25zdCBpbnB1dE5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG91dHB1dE5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRJbnB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICAgICAgaWYgKG5hbWUgPT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBpbnB1dCBuYW1lLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgICAgICBpbnB1dE5hbWVzLnB1c2god2FzbS5VVEY4VG9TdHJpbmcobmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRPdXRwdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgICAgIGlmIChuYW1lID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gb3V0cHV0IG5hbWUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZSk7XG4gICAgICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcblxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICBvcHRpb25zLnByZWZlcnJlZE91dHB1dExvY2F0aW9uIDpcbiAgICAgICAgICAgICAgICBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAnY3B1JyAmJiBsb2NhdGlvbiAhPT0gJ2NwdS1waW5uZWQnICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVzZSBJTyBiaW5kaW5nIG9ubHkgd2hlbiBhdCBsZWFzdCBvbmUgb3V0cHV0IGlzIHByZWZmZXJlZCB0byBiZSBvbiBHUFUuXG4gICAgICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUobCA9PiBsID09PSAnZ3B1LWJ1ZmZlcicpKSB7XG4gICAgICAgICAgaW9CaW5kaW5nSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlQmluZGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgICAgICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgSU8gYmluZGluZy4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgICAgICBoYW5kbGU6IGlvQmluZGluZ0hhbmRsZSxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5tYXAobCA9PiBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obCkpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVTZXNzaW9ucy5zZXQoc2Vzc2lvbkhhbmRsZSwgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgYmluZGluZ1N0YXRlXSk7XG4gICAgICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXNdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuXG4gICAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdIYW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlc3Npb25IYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fZnJlZShtb2RlbERhdGFbMF0pO1xuICAgICAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgICAgICB9XG4gICAgICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICAgIH1cbiAgICB9O1xuXG5cbi8qKlxuICogY3JlYXRlIGFuIGluc3RhbmNlIG9mIEluZmVyZW5jZVNlc3Npb24uXG4gKiBAcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgSW5mZXJlbmNlU2Vzc2lvbi4gMC12YWx1ZSBoYW5kbGUgZm9yIGZhaWx1cmUuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID1cbiAgICAobW9kZWw6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsRGF0YTogU2VyaWFsaXphYmxlTW9kZWxkYXRhID0gY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKG1vZGVsKTtcbiAgICAgIHJldHVybiBjcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxEYXRhLCBvcHRpb25zKTtcbiAgICB9O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVsZWFzZSBzZXNzaW9uLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlXSA9IHNlc3Npb247XG5cbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKTtcbiAgfVxuXG4gIHdhc20uanNlcFVucmVnaXN0ZXJCdWZmZXJzPy4oc2Vzc2lvbklkKTtcblxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yID1cbiAgICAodGVuc29yOiBUZW5zb3JNZXRhZGF0YXxudWxsLCB0ZW5zb3JIYW5kbGVzOiBudW1iZXJbXSwgYWxsb2NzOiBudW1iZXJbXSwgc2Vzc2lvbklkOiBudW1iZXIsIGluZGV4OiBudW1iZXIpOlxuICAgICAgICB2b2lkID0+IHtcbiAgICAgICAgICBpZiAoIXRlbnNvcikge1xuICAgICAgICAgICAgdGVuc29ySGFuZGxlcy5wdXNoKDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgICAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gICAgICAgICAgY29uc3QgZGltcyA9IHRlbnNvclsxXTtcbiAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHRlbnNvclszXTtcblxuICAgICAgICAgIGxldCByYXdEYXRhOiBudW1iZXI7XG4gICAgICAgICAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgICAgICAgICBpZiAoZGF0YVR5cGUgPT09ICdzdHJpbmcnICYmIGxvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIG9uIEdQVS4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgY29uc3QgZ3B1QnVmZmVyID0gdGVuc29yWzJdLmdwdUJ1ZmZlciBhcyBHUFVCdWZmZXI7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50U2l6ZUluQnl0ZXMgPSBnZXRUZW5zb3JFbGVtZW50U2l6ZSh0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSkpITtcbiAgICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKSAqIGVsZW1lbnRTaXplSW5CeXRlcztcbiAgICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLmpzZXBSZWdpc3RlckJ1ZmZlcihzZXNzaW9uSWQsIGluZGV4LCBncHVCdWZmZXIsIGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxuICAgICAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IDQgKiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgICAgICBsZXQgZGF0YUluZGV4ID0gcmF3RGF0YSAvIDQ7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtpXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHRlbnNvciBkYXRhIGF0IGluZGV4ICR7aX0gaXMgbm90IGEgc3RyaW5nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdhc20uSEVBUFUzMltkYXRhSW5kZXgrK10gPSBhbGxvY1dhc21TdHJpbmcoZGF0YVtpXSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcbiAgICAgICAgICAgICAgd2FzbS5IRUFQVTguc2V0KG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGFCeXRlTGVuZ3RoKSwgcmF3RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICAgICAgICAgIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRpbUluZGV4ID0gZGltc09mZnNldCAvIDQ7XG4gICAgICAgICAgICBkaW1zLmZvckVhY2goZCA9PiB3YXNtLkhFQVAzMltkaW1JbmRleCsrXSA9IGQpO1xuICAgICAgICAgICAgY29uc3QgdGVuc29yID0gd2FzbS5fT3J0Q3JlYXRlVGVuc29yKFxuICAgICAgICAgICAgICAgIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgcmF3RGF0YSwgZGF0YUJ5dGVMZW5ndGgsIGRpbXNPZmZzZXQsIGRpbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bShsb2NhdGlvbikpO1xuICAgICAgICAgICAgaWYgKHRlbnNvciA9PT0gMCkge1xuICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgY3JlYXRlIHRlbnNvciBmb3IgaW5wdXQvb3V0cHV0LiBzZXNzaW9uPSR7c2Vzc2lvbklkfSwgaW5kZXg9JHtpbmRleH0uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW5zb3JIYW5kbGVzLnB1c2godGVuc29yKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuLyoqXG4gKiBwZXJmb3JtIGluZmVyZW5jZSBydW5cbiAqL1xuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLCBpbnB1dEluZGljZXM6IG51bWJlcltdLCBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICAgIG91dHB1dFRlbnNvcnM6IEFycmF5PFRlbnNvck1ldGFkYXRhfG51bGw+LCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcnVuIGluZmVyZW5jZS4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZV0gPSBzZXNzaW9uO1xuXG4gIGNvbnN0IGlucHV0Q291bnQgPSBpbnB1dEluZGljZXMubGVuZ3RoO1xuICBjb25zdCBvdXRwdXRDb3VudCA9IG91dHB1dEluZGljZXMubGVuZ3RoO1xuXG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgbGV0IHJ1bk9wdGlvbnNBbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgaW5wdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBvdXRwdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBpbnB1dE91dHB1dEFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBiZWZvcmVSdW5TdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGNvbnN0IGlucHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3QgaW5wdXROYW1lc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhvdXRwdXRDb3VudCAqIDQpO1xuICBjb25zdCBvdXRwdXROYW1lc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhvdXRwdXRDb3VudCAqIDQpO1xuXG4gIHRyeSB7XG4gICAgW3J1bk9wdGlvbnNIYW5kbGUsIHJ1bk9wdGlvbnNBbGxvY3NdID0gc2V0UnVuT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIC8vIGNyZWF0ZSBpbnB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihpbnB1dFRlbnNvcnNbaV0sIGlucHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzW2ldKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgb3V0cHV0IHRlbnNvcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcbiAgICAgICAgICBvdXRwdXRUZW5zb3JzW2ldLCBvdXRwdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgc2Vzc2lvbklkLCBpbnB1dENvdW50ICsgb3V0cHV0SW5kaWNlc1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGlucHV0VmFsdWVzSW5kZXggPSBpbnB1dFZhbHVlc09mZnNldCAvIDQ7XG4gICAgbGV0IGlucHV0TmFtZXNJbmRleCA9IGlucHV0TmFtZXNPZmZzZXQgLyA0O1xuICAgIGxldCBvdXRwdXRWYWx1ZXNJbmRleCA9IG91dHB1dFZhbHVlc09mZnNldCAvIDQ7XG4gICAgbGV0IG91dHB1dE5hbWVzSW5kZXggPSBvdXRwdXROYW1lc09mZnNldCAvIDQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIHdhc20uSEVBUFUzMltpbnB1dFZhbHVlc0luZGV4KytdID0gaW5wdXRUZW5zb3JIYW5kbGVzW2ldO1xuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0TmFtZXNJbmRleCsrXSA9IGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbnB1dEluZGljZXNbaV1dO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIHdhc20uSEVBUFUzMltvdXRwdXRWYWx1ZXNJbmRleCsrXSA9IG91dHB1dFRlbnNvckhhbmRsZXNbaV07XG4gICAgICB3YXNtLkhFQVBVMzJbb3V0cHV0TmFtZXNJbmRleCsrXSA9IG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV07XG4gICAgfVxuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBjb25zdCB7aGFuZGxlLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWR9ID0gaW9CaW5kaW5nU3RhdGU7XG5cbiAgICAgIGlmIChpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RoICE9PSBpbnB1dENvdW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgY291bnQgZnJvbSBmZWVkcyAoJHtcbiAgICAgICAgICAgIGlucHV0Q291bnR9KSBpcyBleHBlY3RlZCB0byBiZSBhbHdheXMgZXF1YWwgdG8gbW9kZWwncyBpbnB1dCBjb3VudCAoJHtpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RofSkuYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgaW5wdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGlucHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0QmluZElucHV0KGhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIGlucHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIHByZS1hbGxvY2F0ZWQgb3V0cHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBvdXRwdXRUZW5zb3JzW2ldPy5bM107ICAvLyB1bmRlZmluZWQgbWVhbnMgb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLlxuXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBwcmUtYWxsb2NhdGVkLiBiaW5kIHRoZSB0ZW5zb3IuXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldLCAwKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBwcmUtYWxsb2NhdGVkIG91dHB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC4gcmVzZXQgcHJlZmVycmVkIGxvY2F0aW9uLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9XG4gICAgICAgICAgICAgIHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgMCwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0pO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIG91dHB1dFske2l9XSB0byAke291dHB1dFByZWZlcnJlZExvY2F0aW9uc1tpXX0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiBpb0JpbmRpbmdTdGF0ZSkge1xuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuV2l0aEJpbmRpbmcoXG4gICAgICAgICAgc2Vzc2lvbkhhbmRsZSwgaW9CaW5kaW5nU3RhdGUuaGFuZGxlLCBvdXRwdXRDb3VudCwgb3V0cHV0VmFsdWVzT2Zmc2V0LCBydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuKFxuICAgICAgICAgIHNlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNPZmZzZXQsIGlucHV0VmFsdWVzT2Zmc2V0LCBpbnB1dENvdW50LCBvdXRwdXROYW1lc09mZnNldCwgb3V0cHV0Q291bnQsXG4gICAgICAgICAgb3V0cHV0VmFsdWVzT2Zmc2V0LCBydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignZmFpbGVkIHRvIGNhbGwgT3J0UnVuKCkuJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0OiBUZW5zb3JNZXRhZGF0YVtdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uSEVBUFUzMltvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0ICsgaV07XG4gICAgICBpZiAodGVuc29yID09PSBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldKSB7XG4gICAgICAgIC8vIG91dHB1dCB0ZW5zb3IgaXMgcHJlLWFsbG9jYXRlZC4gbm8gbmVlZCB0byBjb3B5IGRhdGEuXG4gICAgICAgIG91dHB1dC5wdXNoKG91dHB1dFRlbnNvcnNbaV0hKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJlZm9yZUdldFRlbnNvckRhdGFTdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gICAgICAvLyBzdGFjayBhbGxvY2F0ZSA0IHBvaW50ZXIgdmFsdWVcbiAgICAgIGNvbnN0IHRlbnNvckRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIDQpO1xuXG4gICAgICBsZXQga2VlcE91dHB1dFRlbnNvciA9IGZhbHNlO1xuICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlfHVuZGVmaW5lZCwgZGF0YU9mZnNldCA9IDA7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRUZW5zb3JEYXRhKFxuICAgICAgICAgICAgdGVuc29yLCB0ZW5zb3JEYXRhT2Zmc2V0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgNCwgdGVuc29yRGF0YU9mZnNldCArIDgsIHRlbnNvckRhdGFPZmZzZXQgKyAxMik7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYWNjZXNzIG91dHB1dCB0ZW5zb3IgZGF0YSBvbiBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0ZW5zb3JEYXRhSW5kZXggPSB0ZW5zb3JEYXRhT2Zmc2V0IC8gNDtcbiAgICAgICAgY29uc3QgZGF0YVR5cGUgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXNMZW5ndGggPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZGltcy5wdXNoKHdhc20uSEVBUFUzMltkaW1zT2Zmc2V0IC8gNCArIGldKTtcbiAgICAgICAgfVxuICAgICAgICB3YXNtLl9PcnRGcmVlKGRpbXNPZmZzZXQpO1xuXG4gICAgICAgIGNvbnN0IHNpemUgPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xuICAgICAgICB0eXBlID0gdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcoZGF0YVR5cGUpO1xuXG4gICAgICAgIGNvbnN0IHByZWZlcnJlZExvY2F0aW9uID0gaW9CaW5kaW5nU3RhdGU/Lm91dHB1dFByZWZlcnJlZExvY2F0aW9uc1tvdXRwdXRJbmRpY2VzW2ldXTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzdHJpbmdEYXRhOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGxldCBkYXRhSW5kZXggPSBkYXRhT2Zmc2V0IC8gNDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXTtcbiAgICAgICAgICAgIGNvbnN0IG1heEJ5dGVzVG9SZWFkID0gaSA9PT0gc2l6ZSAtIDEgPyB1bmRlZmluZWQgOiB3YXNtLkhFQVBVMzJbZGF0YUluZGV4XSAtIG9mZnNldDtcbiAgICAgICAgICAgIHN0cmluZ0RhdGEucHVzaCh3YXNtLlVURjhUb1N0cmluZyhvZmZzZXQsIG1heEJ5dGVzVG9SZWFkKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBzdHJpbmdEYXRhLCAnY3B1J10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIGEgY2VydGFpbiBvdXRwdXQncyBwcmVmZXJyZWQgbG9jYXRpb24gaXMgR1BVIGJ1dCB0aGUgdGVuc29yIGlzIGVtcHR5LCB3ZSBzdGlsbCBuZWVkIHRvIGNyZWF0ZSBhIENQVVxuICAgICAgICAgIC8vIHRlbnNvciBmb3IgaXQuIFRoZXJlIGlzIG5vIG1hcHBpbmcgR1BVIGJ1ZmZlciBmb3IgYW4gZW1wdHkgdGVuc29yLlxuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInICYmIHNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSB3YXNtLmpzZXBHZXRCdWZmZXIoZGF0YU9mZnNldCk7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50U2l6ZSA9IGdldFRlbnNvckVsZW1lbnRTaXplKGRhdGFUeXBlKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50U2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZG8gbm90IHJlbGVhc2UgdGhlIHRlbnNvciByaWdodCBub3cuIGl0IHdpbGwgYmUgcmVsZWFzZWQgd2hlbiB1c2VyIGNhbGxzIHRlbnNvci5kaXNwb3NlKCkuXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcblxuICAgICAgICAgICAgb3V0cHV0LnB1c2goW1xuICAgICAgICAgICAgICB0eXBlLCBkaW1zLCB7XG4gICAgICAgICAgICAgICAgZ3B1QnVmZmVyLFxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLmpzZXBDcmVhdGVEb3dubG9hZGVyKGdwdUJ1ZmZlciwgc2l6ZSAqIGVsZW1lbnRTaXplLCB0eXBlKSxcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZ3B1LWJ1ZmZlcidcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IodHlwZSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IHR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzaXplKTtcbiAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICAuc2V0KHdhc20uSEVBUFU4LnN1YmFycmF5KGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIGRhdGFPZmZzZXQpIHtcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VlcE91dHB1dFRlbnNvcikge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xuICAgICAgd2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZVJ1blN0YWNrKTtcblxuICAgIGlucHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgaW5wdXRPdXRwdXRBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xuXG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBydW5PcHRpb25zQWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcbiAgfVxufTtcblxuLyoqXG4gKiBlbmQgcHJvZmlsaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBlbmRQcm9maWxpbmcgPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNlc3Npb24gaWQnKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcblxuICAvLyBwcm9maWxlIGZpbGUgbmFtZSBpcyBub3QgdXNlZCB5ZXQsIGJ1dCBpdCBtdXN0IGJlIGZyZWVkLlxuICBjb25zdCBwcm9maWxlRmlsZU5hbWUgPSB3YXNtLl9PcnRFbmRQcm9maWxpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gIGlmIChwcm9maWxlRmlsZU5hbWUgPT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gcHJvZmlsZSBmaWxlIG5hbWUuJyk7XG4gIH1cbiAgd2FzbS5fT3J0RnJlZShwcm9maWxlRmlsZU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzID0gKHRlbnNvcnM6IHJlYWRvbmx5IFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pOiBBcnJheUJ1ZmZlckxpa2VbXSA9PiB7XG4gIGNvbnN0IGJ1ZmZlcnM6IEFycmF5QnVmZmVyTGlrZVtdID0gW107XG4gIGZvciAoY29uc3QgdGVuc29yIG9mIHRlbnNvcnMpIHtcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiAnYnVmZmVyJyBpbiBkYXRhKSB7XG4gICAgICBidWZmZXJzLnB1c2goZGF0YS5idWZmZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnVmZmVycztcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52LCBlbnYsIEluZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7T3J0V2FzbU1lc3NhZ2UsIFNlcmlhbGl6YWJsZU1vZGVsZGF0YSwgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLCBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcbmltcG9ydCB7aW5pdGlhbGl6ZVdlYkFzc2VtYmx5fSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5cbmNvbnN0IGlzUHJveHkgPSAoKTogYm9vbGVhbiA9PiAhIWVudi53YXNtLnByb3h5ICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5sZXQgcHJveHlXb3JrZXI6IFdvcmtlcnx1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5cbi8vIHJlc29sdmU7IHJlamVjdFxudHlwZSBQcm9taXNlQ2FsbGJhY2tzPFQgPSB2b2lkPiA9IFsocmVzdWx0OiBUKSA9PiB2b2lkLCAocmVhc29uOiB1bmtub3duKSA9PiB2b2lkXTtcblxubGV0IGluaXRXYXNtQ2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzO1xubGV0IGluaXRPcnRDYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M7XG5jb25zdCBjcmVhdGVTZXNzaW9uQWxsb2NhdGVDYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8U2VyaWFsaXphYmxlTW9kZWxkYXRhPj4gPSBbXTtcbmNvbnN0IGNyZWF0ZVNlc3Npb25GaW5hbGl6ZUNhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+PiA9IFtdO1xuY29uc3QgY3JlYXRlU2Vzc2lvbkNhbGxiYWNrczogQXJyYXk8UHJvbWlzZUNhbGxiYWNrczxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+PiA9IFtdO1xuY29uc3QgcmVsZWFzZVNlc3Npb25DYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8dm9pZD4+ID0gW107XG5jb25zdCBydW5DYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4+ID0gW107XG5jb25zdCBlbmRQcm9maWxpbmdDYWxsYmFja3M6IEFycmF5PFByb21pc2VDYWxsYmFja3M8dm9pZD4+ID0gW107XG5jb25zdCBpc09ydEVudkluaXRpYWxpemVkQ2FsbGJhY2tzOiBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPGJvb2xlYW4+PiA9IFtdO1xuXG5jb25zdCBlbnN1cmVXb3JrZXIgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXppbmcgfHwgIWluaXRpYWxpemVkIHx8IGFib3J0ZWQgfHwgIXByb3h5V29ya2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b3JrZXIgbm90IHJlYWR5Jyk7XG4gIH1cbn07XG5cbmNvbnN0IG9uUHJveHlXb3JrZXJNZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8T3J0V2FzbU1lc3NhZ2U+KTogdm9pZCA9PiB7XG4gIHN3aXRjaCAoZXYuZGF0YS50eXBlKSB7XG4gICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1sxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzBdKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbml0LW9ydCc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgaW5pdE9ydENhbGxiYWNrc1sxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0T3J0Q2FsbGJhY2tzWzBdKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGVfYWxsb2NhdGUnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGNyZWF0ZVNlc3Npb25BbGxvY2F0ZUNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGVTZXNzaW9uQWxsb2NhdGVDYWxsYmFja3Muc2hpZnQoKSFbMF0oZXYuZGF0YS5vdXQhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NyZWF0ZV9maW5hbGl6ZSc6XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgY3JlYXRlU2Vzc2lvbkZpbmFsaXplQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZUNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjcmVhdGVTZXNzaW9uQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWF0ZVNlc3Npb25DYWxsYmFja3Muc2hpZnQoKSFbMF0oZXYuZGF0YS5vdXQhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlbGVhc2UnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIHJlbGVhc2VTZXNzaW9uQ2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbGVhc2VTZXNzaW9uQ2FsbGJhY2tzLnNoaWZ0KCkhWzBdKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdydW4nOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydW5DYWxsYmFja3Muc2hpZnQoKSFbMF0oZXYuZGF0YS5vdXQhKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGVuZFByb2ZpbGluZ0NhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbmRQcm9maWxpbmdDYWxsYmFja3Muc2hpZnQoKSFbMF0oKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2lzLW9ydC1lbnYtaW5pdGlhbGl6ZWQnOlxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGlzT3J0RW52SW5pdGlhbGl6ZWRDYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNPcnRFbnZJbml0aWFsaXplZENhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgfVxufTtcblxuY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseUluc3RhbmNlID0gYXN5bmMoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbml0aWFsaXppbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbXVsdGlwbGUgY2FsbHMgdG8gXFwnaW5pdFdhc20oKVxcJyBkZXRlY3RlZC4nKTtcbiAgICB9XG4gICAgaWYgKGFib3J0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgY2FsbCB0byBcXCdpbml0V2FzbSgpXFwnIGZhaWxlZC4nKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gICAgLy8gb3ZlcndyaXRlIHdhc20gZmlsZXBhdGhzXG4gICAgaWYgKGVudi53YXNtLndhc21QYXRocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoc2NyaXB0U3JjICYmIHNjcmlwdFNyYy5pbmRleE9mKCdibG9iOicpICE9PSAwKSB7XG4gICAgICAgIGVudi53YXNtLndhc21QYXRocyA9IHNjcmlwdFNyYy5zdWJzdHIoMCwgKyhzY3JpcHRTcmMpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xuXG4gICAgICBjb25zdCB3b3JrZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZSgpIGZ1bmN0aW9uIGlzIGhhbmRsZWQgYnkgZXNidWlsZCBwbHVnaW4gdG8gbG9hZCBmaWxlIGNvbnRlbnQgYXMgc3RyaW5nLlxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHNcbiAgICAgICAgICAgIHJlcXVpcmUoJy4vcHJveHktd29ya2VyL21haW4nKVxuICAgICAgICAgIF0sXG4gICAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSkpO1xuICAgICAgcHJveHlXb3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybCwge25hbWU6ICdvcnQtd2FzbS1wcm94eS13b3JrZXInfSk7XG4gICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xuICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHdvcmtlclVybCk7XG4gICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2luaXQtd2FzbScsIGluIDogZW52Lndhc219O1xuICAgICAgcHJveHlXb3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KGVudi53YXNtKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVSdW50aW1lID0gYXN5bmMoZW52OiBFbnYpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaW5pdE9ydENhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2luaXQtb3J0JywgaW4gOiBlbnZ9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGNvcmUuaW5pdFJ1bnRpbWUoZW52KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb25BbGxvY2F0ZSA9IGFzeW5jKG1vZGVsOiBVaW50OEFycmF5KTogUHJvbWlzZTxTZXJpYWxpemFibGVNb2RlbGRhdGE+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlTW9kZWxkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjcmVhdGVTZXNzaW9uQWxsb2NhdGVDYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnY3JlYXRlX2FsbG9jYXRlJywgaW4gOiB7bW9kZWx9fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBbbW9kZWwuYnVmZmVyXSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKG1vZGVsKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb25GaW5hbGl6ZSA9IGFzeW5jKG1vZGVsZGF0YTogU2VyaWFsaXphYmxlTW9kZWxkYXRhLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcbiAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgICAgIGVuc3VyZVdvcmtlcigpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY3JlYXRlU2Vzc2lvbkZpbmFsaXplQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdjcmVhdGVfZmluYWxpemUnLCBpbiA6IHttb2RlbGRhdGEsIG9wdGlvbnN9fTtcbiAgICAgICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvcmUuY3JlYXRlU2Vzc2lvbkZpbmFsaXplKG1vZGVsZGF0YSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb24gPVxuICAgIGFzeW5jKG1vZGVsOiBVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgdW5zdXBwb3J0ZWQgb3B0aW9uc1xuICAgIGlmIChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXNzaW9uIG9wdGlvbiBcInByZWZlcnJlZE91dHB1dExvY2F0aW9uXCIgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNyZWF0ZVNlc3Npb25DYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnY3JlYXRlJywgaW4gOiB7bW9kZWwsIG9wdGlvbnN9fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBbbW9kZWwuYnVmZmVyXSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IGFzeW5jKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlbGVhc2VTZXNzaW9uQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ3JlbGVhc2UnLCBpbiA6IHNlc3Npb25JZH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5yZWxlYXNlU2Vzc2lvbihzZXNzaW9uSWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMoXG4gICAgc2Vzc2lvbklkOiBudW1iZXIsIGlucHV0SW5kaWNlczogbnVtYmVyW10sIGlucHV0czogVGVuc29yTWV0YWRhdGFbXSwgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXG4gICAgb3V0cHV0czogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIC8vIGNoZWNrIGlucHV0cyBsb2NhdGlvblxuICAgIGlmIChpbnB1dHMuc29tZSh0ID0+IHRbM10gIT09ICdjcHUnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnB1dCB0ZW5zb3Igb24gR1BVIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICAvLyBjaGVjayBvdXRwdXRzIGxvY2F0aW9uXG4gICAgaWYgKG91dHB1dHMuc29tZSh0ID0+IHQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZS1hbGxvY2F0ZWQgb3V0cHV0IHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJ1bkNhbGxiYWNrcy5wdXNoKFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IHNlcmlhbGl6YWJsZUlucHV0cyA9IGlucHV0cyBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdOyAgLy8gZXZlcnkgaW5wdXQgaXMgb24gQ1BVLlxuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPVxuICAgICAgICAgIHt0eXBlOiAncnVuJywgaW4gOiB7c2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0czogc2VyaWFsaXphYmxlSW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvcHRpb25zfX07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgY29yZS5leHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhzZXJpYWxpemFibGVJbnB1dHMpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5ydW4oc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlbmRQcm9maWxpbmcgPSBhc3luYyhzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbmRQcm9maWxpbmdDYWxsYmFja3MucHVzaChbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnZW5kLXByb2ZpbGluZycsIGluIDogc2Vzc2lvbklkfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLmVuZFByb2ZpbGluZyhzZXNzaW9uSWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaXNPcnRFbnZJbml0aWFsaXplZCA9IGFzeW5jKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpc09ydEVudkluaXRpYWxpemVkQ2FsbGJhY2tzLnB1c2goW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2lzLW9ydC1lbnYtaW5pdGlhbGl6ZWQnfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5pc09ydEVudkluaXRpYWxpemVkKCk7XG4gIH1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gdW5kZWZpbmVkOyIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtyZWFkRmlsZX0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5pbXBvcnQge2VudiwgSW5mZXJlbmNlU2Vzc2lvbiwgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIsIFNlc3Npb25IYW5kbGVyLCBUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7U2VyaWFsaXphYmxlTW9kZWxkYXRhLCBUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQge2NyZWF0ZVNlc3Npb24sIGNyZWF0ZVNlc3Npb25BbGxvY2F0ZSwgY3JlYXRlU2Vzc2lvbkZpbmFsaXplLCBlbmRQcm9maWxpbmcsIGluaXRpYWxpemVSdW50aW1lLCBpc09ydEVudkluaXRpYWxpemVkLCByZWxlYXNlU2Vzc2lvbiwgcnVufSBmcm9tICcuL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHtpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGV9IGZyb20gJy4vd2FzbS1jb21tb24nO1xuXG5sZXQgcnVudGltZUluaXRpYWxpemF0aW9uUHJvbWlzZTogUHJvbWlzZTx2b2lkPnx1bmRlZmluZWQ7XG5cbmV4cG9ydCBjb25zdCBlbmNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvciwgZ2V0TmFtZTogKCkgPT4gc3RyaW5nKTogVGVuc29yTWV0YWRhdGEgPT4ge1xuICBzd2l0Y2ggKHRlbnNvci5sb2NhdGlvbikge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgdGVuc29yLmRhdGEsICdjcHUnXTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB7Z3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyfSwgJ2dwdS1idWZmZXInXTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgbG9jYXRpb246ICR7dGVuc29yLmxvY2F0aW9ufSBmb3IgJHtnZXROYW1lKCl9YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3JbM10pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yWzBdLCB0ZW5zb3JbMl0sIHRlbnNvclsxXSk7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgaWYgKCFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUoZGF0YVR5cGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbm90IHN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9IGZvciBkZXNlcmlhbGl6aW5nIEdQVSB0ZW5zb3JgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHtncHVCdWZmZXIsIGRvd25sb2FkLCBkaXNwb3NlfSA9IHRlbnNvclsyXTtcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIHtkYXRhVHlwZSwgZGltczogdGVuc29yWzFdLCBkb3dubG9hZCwgZGlzcG9zZX0pO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgbG9jYXRpb246ICR7dGVuc29yWzNdfWApO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIge1xuICBwcml2YXRlIHNlc3Npb25JZDogbnVtYmVyO1xuXG4gIGlucHV0TmFtZXM6IHN0cmluZ1tdO1xuICBvdXRwdXROYW1lczogc3RyaW5nW107XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VyaWFsaXphYmxlTW9kZWxkYXRhPiB7XG4gICAgLy8gZmV0Y2ggbW9kZWwgZnJvbSB1cmwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLiBUaGUgYXJyYXlidWZmZmVyIHRoYXQgaGVsZCB0aGUgaHR0cFxuICAgIC8vIHJlc3BvbnNlIGlzIGZyZWVkIG9uY2Ugd2UgcmV0dXJuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbGVkIHRvIGxvYWQgbW9kZWw6ICR7cGF0aH1gKTtcbiAgICB9XG4gICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xuICAgIHJldHVybiBjcmVhdGVTZXNzaW9uQWxsb2NhdGUobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghKGF3YWl0IGlzT3J0RW52SW5pdGlhbGl6ZWQoKSkpIHtcbiAgICAgIGlmICghcnVudGltZUluaXRpYWxpemF0aW9uUHJvbWlzZSkge1xuICAgICAgICBydW50aW1lSW5pdGlhbGl6YXRpb25Qcm9taXNlID0gaW5pdGlhbGl6ZVJ1bnRpbWUoZW52KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHJ1bnRpbWVJbml0aWFsaXphdGlvblByb21pc2U7XG4gICAgICBydW50aW1lSW5pdGlhbGl6YXRpb25Qcm9taXNlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcGF0aE9yQnVmZmVyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZSkge1xuICAgICAgICAvLyBub2RlXG4gICAgICAgIGNvbnN0IG1vZGVsID0gYXdhaXQgcmVhZEZpbGUocGF0aE9yQnVmZmVyKTtcbiAgICAgICAgW3RoaXMuc2Vzc2lvbklkLCB0aGlzLmlucHV0TmFtZXMsIHRoaXMub3V0cHV0TmFtZXNdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyXG4gICAgICAgIC8vIGZldGNoIG1vZGVsIGFuZCBtb3ZlIHRvIHdhc20gaGVhcC5cbiAgICAgICAgY29uc3QgbW9kZWxEYXRhOiBTZXJpYWxpemFibGVNb2RlbGRhdGEgPSBhd2FpdCB0aGlzLmNyZWF0ZVNlc3Npb25BbGxvY2F0ZShwYXRoT3JCdWZmZXIpO1xuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlc3Npb25cbiAgICAgICAgW3RoaXMuc2Vzc2lvbklkLCB0aGlzLmlucHV0TmFtZXMsIHRoaXMub3V0cHV0TmFtZXNdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbkZpbmFsaXplKG1vZGVsRGF0YSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzXSA9IGF3YWl0IGNyZWF0ZVNlc3Npb24ocGF0aE9yQnVmZmVyLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiByZWxlYXNlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XG4gIH1cblxuICBhc3luYyBydW4oZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSwgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+IHtcbiAgICBjb25zdCBpbnB1dEFycmF5OiBUZW5zb3JbXSA9IFtdO1xuICAgIGNvbnN0IGlucHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZWVkcykuZm9yRWFjaChrdnAgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbnB1dE5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbnB1dCAnJHtuYW1lfSdgKTtcbiAgICAgIH1cbiAgICAgIGlucHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xuICAgICAgaW5wdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3V0cHV0QXJyYXk6IEFycmF5PFRlbnNvcnxudWxsPiA9IFtdO1xuICAgIGNvbnN0IG91dHB1dEluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgT2JqZWN0LmVudHJpZXMoZmV0Y2hlcykuZm9yRWFjaChrdnAgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3V0cHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgb3V0cHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xuICAgICAgb3V0cHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlucHV0cyA9XG4gICAgICAgIGlucHV0QXJyYXkubWFwKCh0LCBpKSA9PiBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgaW5wdXQgXCIke3RoaXMuaW5wdXROYW1lc1tpbnB1dEluZGljZXNbaV1dfVwiYCkpO1xuICAgIGNvbnN0IG91dHB1dHMgPSBvdXRwdXRBcnJheS5tYXAoXG4gICAgICAgICh0LCBpKSA9PiB0ID8gZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYG91dHB1dCBcIiR7dGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXX1cImApIDogbnVsbCk7XG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCByZXN1bHRNYXA6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdE1hcFt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dXSA9IG91dHB1dEFycmF5W2ldID8/IGRlY29kZVRlbnNvck1ldGFkYXRhKHJlc3VsdHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0TWFwO1xuICB9XG5cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHByb2ZpbGluZ1xuICB9XG5cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHZvaWQgZW5kUHJvZmlsaW5nKHRoaXMuc2Vzc2lvbklkKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2NwdXN9IGZyb20gJ25vZGU6b3MnO1xuaW1wb3J0IHtCYWNrZW5kLCBlbnYsIEluZmVyZW5jZVNlc3Npb24sIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2luaXRpYWxpemVXZWJBc3NlbWJseUluc3RhbmNlfSBmcm9tICcuL3dhc20vcHJveHktd3JhcHBlcic7XG5pbXBvcnQge09ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlcn0gZnJvbSAnLi93YXNtL3Nlc3Npb24taGFuZGxlci1pbmZlcmVuY2UnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYWxsIGZsYWdzIGZvciBXZWJBc3NlbWJseS5cbiAqXG4gKiBUaG9zZSBmbGFncyBhcmUgYWNjZXNzaWJsZSBmcm9tIGBvcnQuZW52Lndhc21gLiBVc2VycyBhcmUgYWxsb3cgdG8gc2V0IHRob3NlIGZsYWdzIGJlZm9yZSB0aGUgZmlyc3QgaW5mZXJlbmNlIHNlc3Npb25cbiAqIGJlaW5nIGNyZWF0ZWQsIHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplRmxhZ3MgPSAoKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2YgZW52Lndhc20uaW5pdFRpbWVvdXQgIT09ICdudW1iZXInIHx8IGVudi53YXNtLmluaXRUaW1lb3V0IDwgMCkge1xuICAgIGVudi53YXNtLmluaXRUaW1lb3V0ID0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20uc2ltZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZW52Lndhc20uc2ltZCA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLnByb3h5ICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS5wcm94eSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5udW1UaHJlYWRzICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihlbnYud2FzbS5udW1UaHJlYWRzKSB8fCBlbnYud2FzbS5udW1UaHJlYWRzIDw9IDApIHtcbiAgICBjb25zdCBudW1DcHVMb2dpY2FsQ29yZXMgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyA/IGNwdXMoKS5sZW5ndGggOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeTtcbiAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gTWF0aC5taW4oNCwgTWF0aC5jZWlsKChudW1DcHVMb2dpY2FsQ29yZXMgfHwgMSkgLyAyKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCBpbXBsZW1lbnRzIEJhY2tlbmQge1xuICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIHBvcHVsYXRlIHdhc20gZmxhZ3NcbiAgICBpbml0aWFsaXplRmxhZ3MoKTtcblxuICAgIC8vIGluaXQgd2FzbVxuICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseUluc3RhbmNlKCk7XG4gIH1cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIocGF0aDogc3RyaW5nLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgYXN5bmMgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIocGF0aE9yQnVmZmVyOiBzdHJpbmd8VWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyKCk7XG4gICAgYXdhaXQgaGFuZGxlci5sb2FkTW9kZWwocGF0aE9yQnVmZmVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7T25ueHJ1bnRpbWVXZWJBc3NlbWJseUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC13YXNtJztcbmV4cG9ydCBjb25zdCB3YXNtQmFja2VuZCA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCgpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG4vLyBXZSB1c2UgXCJyZXF1aXJlXCIgaW5zdGVhZCBvZiBcImltcG9ydFwiIGhlcmUgYmVjYXVzZSBpbXBvcnQgc3RhdGVtZW50IG11c3QgYmUgcHV0IGluIHRvcCBsZXZlbC4gT3VyIGN1cnJlbnQgY29kZSBkb2VzXG4vLyBub3QgYWxsb3cgYnVuZGxlciB0byB0cmVlLXNoYWtpbmcgY29kZSBhcyBleHBlY3RlZCBiZWNhdXNlIHNvbWUgY29kZXMgYXJlIHRyZWF0ZWQgYXMgaGF2aW5nIHNpZGUgZWZmZWN0cy5cbi8vIFNvIHdlIGltcG9ydCBjb2RlIGluc2lkZSB0aGUgaWYtY2xhdXNlIHRvIGFsbG93IGJ1bmRsZXIgcmVtb3ZlIHRoZSBjb2RlIHNhZmVseS5cblxuZXhwb3J0ICogZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmltcG9ydCAqIGFzIG9ydCBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuZXhwb3J0IGRlZmF1bHQgb3J0O1xuXG5pbXBvcnQge3JlZ2lzdGVyQmFja2VuZCwgZW52fSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuL3ZlcnNpb24nO1xuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHTCkge1xuICBjb25zdCBvbm54anNCYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLW9ubnhqcycpLm9ubnhqc0JhY2tlbmQ7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ2wnLCBvbm54anNCYWNrZW5kLCAtMTApO1xufVxuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNKSB7XG4gIGNvbnN0IHdhc21CYWNrZW5kID0gQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HID8gcmVxdWlyZSgnLi9iYWNrZW5kLXdhc20taW5mZXJlbmNlJykud2FzbUJhY2tlbmQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vYmFja2VuZC13YXNtLXRyYWluaW5nJykud2FzbUJhY2tlbmQ7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IuZ3B1KSB7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJncHUnLCB3YXNtQmFja2VuZCwgNSk7XG4gIH1cbiAgcmVnaXN0ZXJCYWNrZW5kKCdjcHUnLCB3YXNtQmFja2VuZCwgMTApO1xuICByZWdpc3RlckJhY2tlbmQoJ3dhc20nLCB3YXNtQmFja2VuZCwgMTApO1xuICBpZiAoQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HKSB7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd4bm5wYWNrJywgd2FzbUJhY2tlbmQsIDkpO1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2Vibm4nLCB3YXNtQmFja2VuZCwgOSk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudi52ZXJzaW9ucywgJ3dlYicsIHt2YWx1ZTogdmVyc2lvbiwgZW51bWVyYWJsZTogdHJ1ZX0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4xNy4wJztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBY00sVUFDQSww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RSxXQUFVO0FBQUEsVUFBQztBQUFBLFVBQUUsR0FBRSxXQUFVO0FBQUEsVUFBQztBQUFBLFVBQUUsR0FBRSxXQUFVO0FBQUEsVUFBQztBQUFBLFVBQUUsR0FBRSxXQUFVO0FBQUEsVUFBQztBQUFBLFVBQUUsR0FBRSxNQUFJO0FBQUEsVUFBRyxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBRSxJQUFFLFlBQVUsSUFBRSxVQUFRLENBQUMsQ0FBQyxLQUFHLE1BQUksS0FBRyxhQUFXLElBQUU7QUFBSSxtQkFBSztBQUFFLGdCQUFFLElBQUksS0FBSyxNQUFJLENBQUM7QUFBRSxjQUFFLEtBQUcsTUFBSSxDQUFDLElBQUUsRUFBRSxjQUFjO0FBQUUsY0FBRSxJQUFFLEtBQUcsTUFBSSxDQUFDLElBQUUsRUFBRSxjQUFjO0FBQUUsY0FBRSxJQUFFLEtBQUcsTUFBSSxDQUFDLElBQUUsRUFBRSxZQUFZO0FBQUUsY0FBRSxJQUFFLE1BQUksTUFDbGYsQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsWUFBWTtBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsZUFBZSxJQUFFO0FBQUssY0FBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxVQUFVO0FBQUUsY0FBRSxJQUFFLE1BQUksTUFBSSxDQUFDLEtBQUcsRUFBRSxRQUFRLElBQUUsS0FBSyxJQUFJLEVBQUUsZUFBZSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEtBQUcsUUFBTTtBQUFBLFVBQUM7QUFBQSxVQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFFLElBQUUsWUFBVSxJQUFFLFVBQVEsQ0FBQyxDQUFDLEtBQUcsTUFBSSxLQUFHLGFBQVcsSUFBRTtBQUFJLG1CQUFLO0FBQUUsZ0JBQUUsSUFBSSxLQUFLLE1BQUksQ0FBQztBQUFFLGNBQUUsS0FBRyxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVc7QUFBRSxjQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVc7QUFBRSxjQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsSUFBRSxFQUFFLFNBQVM7QUFBRSxjQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFFBQVE7QUFBRSxjQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFNBQVM7QUFBRSxjQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFlBQVksSUFBRTtBQUFLLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsT0FBTztBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQ3BmLENBQUMsS0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLElBQUUsS0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUUsRUFBRSxRQUFRLElBQUUsSUFBRTtBQUFFLGNBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsS0FBRyxFQUFFLGtCQUFrQjtBQUFHLGdCQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0I7QUFBRSxnQkFBSSxJQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0I7QUFBRSxjQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsS0FBRyxLQUFHLEtBQUcsRUFBRSxrQkFBa0IsS0FBRyxLQUFLLElBQUksR0FBRSxDQUFDLEtBQUc7QUFBQSxVQUFDO0FBQUEsVUFBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLG1CQUFLO0FBQUUsZ0JBQUksSUFBRSxJQUFJLEtBQUssRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsTUFBSyxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsR0FBRSxFQUFFLEtBQUcsTUFBSSxDQUFDLEdBQUUsQ0FB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cmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgImVudiIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJ3YXNtIiwgImVudiIsICJ0ZW5zb3IiLCAiZXJyb3JDb2RlIiwgImkiLCAiY3JlYXRlU2Vzc2lvbkFsbG9jYXRlIiwgImNyZWF0ZVNlc3Npb25GaW5hbGl6ZSIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiaXNPcnRFbnZJbml0aWFsaXplZCIsICJlbnYiLCAicmVhZEZpbGUiLCAiVGVuc29yIiwgImNyZWF0ZVNlc3Npb25BbGxvY2F0ZSIsICJpc09ydEVudkluaXRpYWxpemVkIiwgImVudiIsICJyZWFkRmlsZSIsICJjcmVhdGVTZXNzaW9uIiwgImNyZWF0ZVNlc3Npb25GaW5hbGl6ZSIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJ2ZXJzaW9uIiwgIndhc21CYWNrZW5kIiwgImVudiIsICJ2ZXJzaW9uIl0KfQo=
