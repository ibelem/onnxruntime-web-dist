/*!
 * ONNX Runtime Web v1.17.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";
var ort = (() => {
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
          var f = moduleArg, aa, m;
          f.ready = new Promise((a, b) => {
            aa = a;
            m = b;
          });
          var ba = Object.assign({}, f), ca = "./this.program", da = "object" == typeof window, q = "function" == typeof importScripts, ea = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, t = "", fa, w, x;
          if (ea) {
            var fs = (init_fs(), __toCommonJS(fs_exports)), ha = (init_path(), __toCommonJS(path_exports));
            t = q ? ha.dirname(t) + "/" : __dirname + "/";
            fa = (a, b) => {
              a = a.startsWith("file://") ? new URL(a) : ha.normalize(a);
              return fs.readFileSync(a, b ? void 0 : "utf8");
            };
            x = (a) => {
              a = fa(a, true);
              a.buffer || (a = new Uint8Array(a));
              return a;
            };
            w = (a, b, c, d = true) => {
              a = a.startsWith("file://") ? new URL(a) : ha.normalize(a);
              fs.readFile(a, d ? void 0 : "utf8", (e, h) => {
                e ? c(e) : b(d ? h.buffer : h);
              });
            };
            !f.thisProgram && 1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/"));
            process.argv.slice(2);
            f.inspect = () => "[Emscripten Module object]";
          } else if (da || q)
            q ? t = self.location.href : "undefined" != typeof document && document.currentScript && (t = document.currentScript.src), _scriptDir && (t = _scriptDir), 0 !== t.indexOf("blob:") ? t = t.substr(0, t.replace(/[?#].*/, "").lastIndexOf("/") + 1) : t = "", fa = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, false);
              b.send(null);
              return b.responseText;
            }, q && (x = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, false);
              b.responseType = "arraybuffer";
              b.send(null);
              return new Uint8Array(b.response);
            }), w = (a, b, c) => {
              var d = new XMLHttpRequest();
              d.open("GET", a, true);
              d.responseType = "arraybuffer";
              d.onload = () => {
                200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
              };
              d.onerror = c;
              d.send(null);
            };
          var ia = f.print || console.log.bind(console), z = f.printErr || console.error.bind(console);
          Object.assign(f, ba);
          ba = null;
          f.thisProgram && (ca = f.thisProgram);
          var A;
          f.wasmBinary && (A = f.wasmBinary);
          var noExitRuntime = f.noExitRuntime || true;
          "object" != typeof WebAssembly && ja("no native wasm support detected");
          var B, C, ka = false, D, E, G, H, J, K, la, ma, na, oa;
          function pa() {
            var a = B.buffer;
            f.HEAP8 = D = new Int8Array(a);
            f.HEAP16 = G = new Int16Array(a);
            f.HEAP32 = J = new Int32Array(a);
            f.HEAPU8 = E = new Uint8Array(a);
            f.HEAPU16 = H = new Uint16Array(a);
            f.HEAPU32 = K = new Uint32Array(a);
            f.HEAPF32 = la = new Float32Array(a);
            f.HEAPF64 = oa = new Float64Array(a);
            f.HEAP64 = ma = new BigInt64Array(a);
            f.HEAPU64 = na = new BigUint64Array(a);
          }
          var qa = [], ra = [], sa = [];
          function ta() {
            var a = f.preRun.shift();
            qa.unshift(a);
          }
          var L = 0, ua = null, M = null;
          function ja(a) {
            if (f.onAbort)
              f.onAbort(a);
            a = "Aborted(" + a + ")";
            z(a);
            ka = true;
            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
            m(a);
            throw a;
          }
          function va(a) {
            return a.startsWith("data:application/octet-stream;base64,");
          }
          var N;
          N = "ort-wasm.wasm";
          if (!va(N)) {
            var wa = N;
            N = f.locateFile ? f.locateFile(wa, t) : t + wa;
          }
          function xa(a) {
            if (a == N && A)
              return new Uint8Array(A);
            if (x)
              return x(a);
            throw "both async and sync fetching of the wasm failed";
          }
          function ya(a) {
            if (!A && (da || q)) {
              if ("function" == typeof fetch && !a.startsWith("file://"))
                return fetch(a, { credentials: "same-origin" }).then((b) => {
                  if (!b.ok)
                    throw "failed to load wasm binary file at '" + a + "'";
                  return b.arrayBuffer();
                }).catch(() => xa(a));
              if (w)
                return new Promise((b, c) => {
                  w(a, (d) => b(new Uint8Array(d)), c);
                });
            }
            return Promise.resolve().then(() => xa(a));
          }
          function za(a, b, c) {
            return ya(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
              z("failed to asynchronously prepare wasm: " + d);
              ja(d);
            });
          }
          function Aa(a, b) {
            var c = N;
            return A || "function" != typeof WebAssembly.instantiateStreaming || va(c) || c.startsWith("file://") || ea || "function" != typeof fetch ? za(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
              z("wasm streaming compile failed: " + e);
              z("falling back to ArrayBuffer instantiation");
              return za(c, a, b);
            }));
          }
          var Ba = (a) => {
            for (; 0 < a.length; )
              a.shift()(f);
          };
          function Ca(a) {
            this.Va = a - 24;
            this.fb = function(b) {
              K[this.Va + 4 >> 2] = b;
            };
            this.eb = function(b) {
              K[this.Va + 8 >> 2] = b;
            };
            this.Za = function(b, c) {
              this.$a();
              this.fb(b);
              this.eb(c);
            };
            this.$a = function() {
              K[this.Va + 16 >> 2] = 0;
            };
          }
          var Da = 0, Ea = 0, Fa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, O = (a, b, c) => {
            var d = b + c;
            for (c = b; a[c] && !(c >= d); )
              ++c;
            if (16 < c - b && a.buffer && Fa)
              return Fa.decode(a.subarray(b, c));
            for (d = ""; b < c; ) {
              var e = a[b++];
              if (e & 128) {
                var h = a[b++] & 63;
                if (192 == (e & 224))
                  d += String.fromCharCode((e & 31) << 6 | h);
                else {
                  var l = a[b++] & 63;
                  e = 224 == (e & 240) ? (e & 15) << 12 | h << 6 | l : (e & 7) << 18 | h << 12 | l << 6 | a[b++] & 63;
                  65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
                }
              } else
                d += String.fromCharCode(e);
            }
            return d;
          }, P = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
            }
            return b;
          }, Q = (a, b, c, d) => {
            if (!(0 < d))
              return 0;
            var e = c;
            d = c + d - 1;
            for (var h = 0; h < a.length; ++h) {
              var l = a.charCodeAt(h);
              if (55296 <= l && 57343 >= l) {
                var k = a.charCodeAt(++h);
                l = 65536 + ((l & 1023) << 10) | k & 1023;
              }
              if (127 >= l) {
                if (c >= d)
                  break;
                b[c++] = l;
              } else {
                if (2047 >= l) {
                  if (c + 1 >= d)
                    break;
                  b[c++] = 192 | l >> 6;
                } else {
                  if (65535 >= l) {
                    if (c + 2 >= d)
                      break;
                    b[c++] = 224 | l >> 12;
                  } else {
                    if (c + 3 >= d)
                      break;
                    b[c++] = 240 | l >> 18;
                    b[c++] = 128 | l >> 12 & 63;
                  }
                  b[c++] = 128 | l >> 6 & 63;
                }
                b[c++] = 128 | l & 63;
              }
            }
            b[c] = 0;
            return c - e;
          };
          function Ga(a) {
            if (null === a)
              return "null";
            var b = typeof a;
            return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
          }
          var Ha = void 0;
          function R(a) {
            for (var b = ""; E[a]; )
              b += Ha[E[a++]];
            return b;
          }
          var Ia = {}, Ja = {}, Ka = {}, La = void 0;
          function S(a) {
            throw new La(a);
          }
          function Ma(a, b, c = {}) {
            var d = b.name;
            a || S(`type "${d}" must have a positive integer typeid pointer`);
            if (Ja.hasOwnProperty(a)) {
              if (c.gb)
                return;
              S(`Cannot register type '${d}' twice`);
            }
            Ja[a] = b;
            delete Ka[a];
            Ia.hasOwnProperty(a) && (b = Ia[a], delete Ia[a], b.forEach((e) => e()));
          }
          function T(a, b, c = {}) {
            if (!("argPackAdvance" in b))
              throw new TypeError("registerType registeredInstance requires argPackAdvance");
            Ma(a, b, c);
          }
          function Na(a, b, c) {
            switch (b) {
              case 0:
                return c ? function(d) {
                  return D[d];
                } : function(d) {
                  return E[d];
                };
              case 1:
                return c ? function(d) {
                  return G[d >> 1];
                } : function(d) {
                  return H[d >> 1];
                };
              case 2:
                return c ? function(d) {
                  return J[d >> 2];
                } : function(d) {
                  return K[d >> 2];
                };
              case 3:
                return c ? function(d) {
                  return ma[d >> 3];
                } : function(d) {
                  return na[d >> 3];
                };
              default:
                throw new TypeError("Unknown integer type: " + a);
            }
          }
          function Oa(a) {
            switch (a) {
              case 1:
                return 0;
              case 2:
                return 1;
              case 4:
                return 2;
              case 8:
                return 3;
              default:
                throw new TypeError(`Unknown type size: ${a}`);
            }
          }
          function Pa() {
            this.Sa = [void 0];
            this.bb = [];
          }
          var U = new Pa();
          function Qa(a) {
            a >= U.Va && 0 === --U.get(a).cb && U.$a(a);
          }
          var V = (a) => {
            a || S("Cannot use deleted val. handle = " + a);
            return U.get(a).value;
          }, W = (a) => {
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
                return U.Za({ cb: 1, value: a });
            }
          };
          function Ra(a) {
            return this.fromWireType(J[a >> 2]);
          }
          function Sa(a, b) {
            switch (b) {
              case 2:
                return function(c) {
                  return this.fromWireType(la[c >> 2]);
                };
              case 3:
                return function(c) {
                  return this.fromWireType(oa[c >> 3]);
                };
              default:
                throw new TypeError("Unknown float type: " + a);
            }
          }
          var Ta = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Ua = (a, b) => {
            var c = a >> 1;
            for (var d = c + b / 2; !(c >= d) && H[c]; )
              ++c;
            c <<= 1;
            if (32 < c - a && Ta)
              return Ta.decode(E.subarray(a, c));
            c = "";
            for (d = 0; !(d >= b / 2); ++d) {
              var e = G[a + 2 * d >> 1];
              if (0 == e)
                break;
              c += String.fromCharCode(e);
            }
            return c;
          }, Va = (a, b, c) => {
            void 0 === c && (c = 2147483647);
            if (2 > c)
              return 0;
            c -= 2;
            var d = b;
            c = c < 2 * a.length ? c / 2 : a.length;
            for (var e = 0; e < c; ++e)
              G[b >> 1] = a.charCodeAt(e), b += 2;
            G[b >> 1] = 0;
            return b - d;
          }, Wa = (a) => 2 * a.length, Xa = (a, b) => {
            for (var c = 0, d = ""; !(c >= b / 4); ) {
              var e = J[a + 4 * c >> 2];
              if (0 == e)
                break;
              ++c;
              65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
            }
            return d;
          }, Ya = (a, b, c) => {
            void 0 === c && (c = 2147483647);
            if (4 > c)
              return 0;
            var d = b;
            c = d + c - 4;
            for (var e = 0; e < a.length; ++e) {
              var h = a.charCodeAt(e);
              if (55296 <= h && 57343 >= h) {
                var l = a.charCodeAt(++e);
                h = 65536 + ((h & 1023) << 10) | l & 1023;
              }
              J[b >> 2] = h;
              b += 4;
              if (b + 4 > c)
                break;
            }
            J[b >> 2] = 0;
            return b - d;
          }, Za = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              55296 <= d && 57343 >= d && ++c;
              b += 4;
            }
            return b;
          };
          function $a(a, b) {
            var c = Ja[a];
            if (void 0 === c) {
              a = ab(a);
              var d = R(a);
              X(a);
              S(b + " has unknown type " + d);
            }
            return c;
          }
          var bb = {};
          function cb(a) {
            var b = bb[a];
            return void 0 === b ? R(a) : b;
          }
          var eb = [];
          function fb() {
            return "object" == typeof globalThis ? globalThis : Function("return this")();
          }
          function gb(a) {
            var b = eb.length;
            eb.push(a);
            return b;
          }
          function hb(a, b) {
            for (var c = Array(a), d = 0; d < a; ++d)
              c[d] = $a(K[b + 4 * d >> 2], "parameter " + d);
            return c;
          }
          function ib(a) {
            if (void 0 === a)
              return "_unknown";
            a = a.replace(/[^a-zA-Z0-9_]/g, "$");
            var b = a.charCodeAt(0);
            return 48 <= b && 57 >= b ? `_${a}` : a;
          }
          var jb = [];
          function kb(a, b) {
            a = ib(a);
            return { [a]: function() {
              return b.apply(this, arguments);
            } }[a];
          }
          function lb(a) {
            var b = Function;
            if (!(b instanceof Function))
              throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
            var c = kb(b.name || "unknownFunctionName", function() {
            });
            c.prototype = b.prototype;
            c = new c();
            a = b.apply(c, a);
            return a instanceof Object ? a : c;
          }
          function mb(a) {
            for (var b = "", c = 0; c < a; ++c)
              b += (0 !== c ? ", " : "") + "arg" + c;
            var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
            for (c = 0; c < a; ++c)
              d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
            return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n"))($a, f, W, () => K);
          }
          var nb = {};
          function Y(a) {
            return -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
          }
          var Z = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), ob = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], pb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], rb = (a) => {
            var b = P(a) + 1, c = qb(b);
            c && Q(a, E, c, b);
            return c;
          }, sb = {}, ub = () => {
            if (!tb) {
              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: ca || "./this.program" }, b;
              for (b in sb)
                void 0 === sb[b] ? delete a[b] : a[b] = sb[b];
              var c = [];
              for (b in a)
                c.push(`${b}=${a[b]}`);
              tb = c;
            }
            return tb;
          }, tb, vb = [null, [], []], wb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], xb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          function yb(a) {
            var b = Array(P(a) + 1);
            Q(a, b, 0, b.length);
            return b;
          }
          for (var zb = (a, b, c, d) => {
            function e(g, r, u) {
              for (g = "number" == typeof g ? g.toString() : g || ""; g.length < r; )
                g = u[0] + g;
              return g;
            }
            function h(g, r) {
              return e(g, r, "0");
            }
            function l(g, r) {
              function u(db) {
                return 0 > db ? -1 : 0 < db ? 1 : 0;
              }
              var I;
              0 === (I = u(g.getFullYear() - r.getFullYear())) && 0 === (I = u(g.getMonth() - r.getMonth())) && (I = u(g.getDate() - r.getDate()));
              return I;
            }
            function k(g) {
              switch (g.getDay()) {
                case 0:
                  return new Date(g.getFullYear() - 1, 11, 29);
                case 1:
                  return g;
                case 2:
                  return new Date(g.getFullYear(), 0, 3);
                case 3:
                  return new Date(
                    g.getFullYear(),
                    0,
                    2
                  );
                case 4:
                  return new Date(g.getFullYear(), 0, 1);
                case 5:
                  return new Date(g.getFullYear() - 1, 11, 31);
                case 6:
                  return new Date(g.getFullYear() - 1, 11, 30);
              }
            }
            function n(g) {
              var r = g.Ta;
              for (g = new Date(new Date(g.Ua + 1900, 0, 1).getTime()); 0 < r; ) {
                var u = g.getMonth(), I = (Z(g.getFullYear()) ? wb : xb)[u];
                if (r > I - g.getDate())
                  r -= I - g.getDate() + 1, g.setDate(1), 11 > u ? g.setMonth(u + 1) : (g.setMonth(0), g.setFullYear(g.getFullYear() + 1));
                else {
                  g.setDate(g.getDate() + r);
                  break;
                }
              }
              u = new Date(g.getFullYear() + 1, 0, 4);
              r = k(new Date(
                g.getFullYear(),
                0,
                4
              ));
              u = k(u);
              return 0 >= l(r, g) ? 0 >= l(u, g) ? g.getFullYear() + 1 : g.getFullYear() : g.getFullYear() - 1;
            }
            var p = J[d + 40 >> 2];
            d = { kb: J[d >> 2], jb: J[d + 4 >> 2], Xa: J[d + 8 >> 2], ab: J[d + 12 >> 2], Ya: J[d + 16 >> 2], Ua: J[d + 20 >> 2], Oa: J[d + 24 >> 2], Ta: J[d + 28 >> 2], mb: J[d + 32 >> 2], ib: J[d + 36 >> 2], lb: p ? p ? O(E, p) : "" : "" };
            c = c ? O(E, c) : "";
            p = {
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
            for (var v in p)
              c = c.replace(new RegExp(v, "g"), p[v]);
            var y = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), F = "January February March April May June July August September October November December".split(" ");
            p = { "%a": (g) => y[g.Oa].substring(0, 3), "%A": (g) => y[g.Oa], "%b": (g) => F[g.Ya].substring(0, 3), "%B": (g) => F[g.Ya], "%C": (g) => h((g.Ua + 1900) / 100 | 0, 2), "%d": (g) => h(g.ab, 2), "%e": (g) => e(g.ab, 2, " "), "%g": (g) => n(g).toString().substring(2), "%G": (g) => n(g), "%H": (g) => h(g.Xa, 2), "%I": (g) => {
              g = g.Xa;
              0 == g ? g = 12 : 12 < g && (g -= 12);
              return h(g, 2);
            }, "%j": (g) => {
              for (var r = 0, u = 0; u <= g.Ya - 1; r += (Z(g.Ua + 1900) ? wb : xb)[u++])
                ;
              return h(g.ab + r, 3);
            }, "%m": (g) => h(g.Ya + 1, 2), "%M": (g) => h(g.jb, 2), "%n": () => "\n", "%p": (g) => 0 <= g.Xa && 12 > g.Xa ? "AM" : "PM", "%S": (g) => h(g.kb, 2), "%t": () => "	", "%u": (g) => g.Oa || 7, "%U": (g) => h(Math.floor((g.Ta + 7 - g.Oa) / 7), 2), "%V": (g) => {
              var r = Math.floor((g.Ta + 7 - (g.Oa + 6) % 7) / 7);
              2 >= (g.Oa + 371 - g.Ta - 2) % 7 && r++;
              if (r)
                53 == r && (u = (g.Oa + 371 - g.Ta) % 7, 4 == u || 3 == u && Z(g.Ua) || (r = 1));
              else {
                r = 52;
                var u = (g.Oa + 7 - g.Ta - 1) % 7;
                (4 == u || 5 == u && Z(g.Ua % 400 - 1)) && r++;
              }
              return h(r, 2);
            }, "%w": (g) => g.Oa, "%W": (g) => h(Math.floor((g.Ta + 7 - (g.Oa + 6) % 7) / 7), 2), "%y": (g) => (g.Ua + 1900).toString().substring(2), "%Y": (g) => g.Ua + 1900, "%z": (g) => {
              g = g.ib;
              var r = 0 <= g;
              g = Math.abs(g) / 60;
              return (r ? "+" : "-") + String("0000" + (g / 60 * 100 + g % 60)).slice(-4);
            }, "%Z": (g) => g.lb, "%%": () => "%" };
            c = c.replace(/%%/g, "\0\0");
            for (v in p)
              c.includes(v) && (c = c.replace(new RegExp(v, "g"), p[v](d)));
            c = c.replace(/\0\0/g, "%");
            v = yb(c);
            if (v.length > b)
              return 0;
            D.set(v, a);
            return v.length - 1;
          }, Ab = Array(256), Bb = 0; 256 > Bb; ++Bb)
            Ab[Bb] = String.fromCharCode(Bb);
          Ha = Ab;
          La = f.BindingError = class extends Error {
            constructor(a) {
              super(a);
              this.name = "BindingError";
            }
          };
          f.InternalError = class extends Error {
            constructor(a) {
              super(a);
              this.name = "InternalError";
            }
          };
          Object.assign(Pa.prototype, { get(a) {
            return this.Sa[a];
          }, has(a) {
            return void 0 !== this.Sa[a];
          }, Za(a) {
            var b = this.bb.pop() || this.Sa.length;
            this.Sa[b] = a;
            return b;
          }, $a(a) {
            this.Sa[a] = void 0;
            this.bb.push(a);
          } });
          U.Sa.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
          U.Va = U.Sa.length;
          f.count_emval_handles = function() {
            for (var a = 0, b = U.Va; b < U.Sa.length; ++b)
              void 0 !== U.Sa[b] && ++a;
            return a;
          };
          var Cb = {
            a: function(a, b, c) {
              new Ca(a).Za(b, c);
              Da = a;
              Ea++;
              throw Da;
            },
            v: function() {
              return 0;
            },
            ba: () => {
            },
            N: () => {
            },
            P: () => {
            },
            H: function() {
              return 0;
            },
            $: () => {
            },
            V: () => {
            },
            _: () => {
            },
            A: function() {
            },
            O: () => {
            },
            L: () => {
            },
            aa: () => {
            },
            M: () => {
            },
            D: function(a, b, c, d, e) {
              b = R(b);
              c = Oa(c);
              var h = -1 != b.indexOf("u");
              h && (e = (1n << 64n) - 1n);
              T(a, { name: b, fromWireType: function(l) {
                return l;
              }, toWireType: function(l, k) {
                if ("bigint" != typeof k && "number" != typeof k)
                  throw new TypeError(`Cannot convert "${Ga(k)}" to ${this.name}`);
                if (k < d || k > e)
                  throw new TypeError(`Passing a number "${Ga(k)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
                return k;
              }, argPackAdvance: 8, readValueFromPointer: Na(b, c, !h), Wa: null });
            },
            ea: function(a, b, c, d, e) {
              var h = Oa(c);
              b = R(b);
              T(a, { name: b, fromWireType: function(l) {
                return !!l;
              }, toWireType: function(l, k) {
                return k ? d : e;
              }, argPackAdvance: 8, readValueFromPointer: function(l) {
                if (1 === c)
                  var k = D;
                else if (2 === c)
                  k = G;
                else if (4 === c)
                  k = J;
                else
                  throw new TypeError("Unknown boolean type size: " + b);
                return this.fromWireType(k[l >> h]);
              }, Wa: null });
            },
            da: function(a, b) {
              b = R(b);
              T(a, { name: b, fromWireType: function(c) {
                var d = V(c);
                Qa(c);
                return d;
              }, toWireType: function(c, d) {
                return W(d);
              }, argPackAdvance: 8, readValueFromPointer: Ra, Wa: null });
            },
            C: function(a, b, c) {
              c = Oa(c);
              b = R(b);
              T(a, { name: b, fromWireType: function(d) {
                return d;
              }, toWireType: function(d, e) {
                return e;
              }, argPackAdvance: 8, readValueFromPointer: Sa(b, c), Wa: null });
            },
            p: function(a, b, c, d, e) {
              b = R(b);
              -1 === e && (e = 4294967295);
              e = Oa(c);
              var h = (k) => k;
              if (0 === d) {
                var l = 32 - 8 * c;
                h = (k) => k << l >>> l;
              }
              c = b.includes("unsigned") ? function(k, n) {
                return n >>> 0;
              } : function(k, n) {
                return n;
              };
              T(a, { name: b, fromWireType: h, toWireType: c, argPackAdvance: 8, readValueFromPointer: Na(
                b,
                e,
                0 !== d
              ), Wa: null });
            },
            l: function(a, b, c) {
              function d(h) {
                h >>= 2;
                var l = K;
                return new e(l.buffer, l[h + 1], l[h]);
              }
              var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
              c = R(c);
              T(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { gb: true });
            },
            E: function(a, b) {
              b = R(b);
              var c = "std::string" === b;
              T(a, { name: b, fromWireType: function(d) {
                var e = K[d >> 2], h = d + 4;
                if (c)
                  for (var l = h, k = 0; k <= e; ++k) {
                    var n = h + k;
                    if (k == e || 0 == E[n]) {
                      l = l ? O(E, l, n - l) : "";
                      if (void 0 === p)
                        var p = l;
                      else
                        p += String.fromCharCode(0), p += l;
                      l = n + 1;
                    }
                  }
                else {
                  p = Array(e);
                  for (k = 0; k < e; ++k)
                    p[k] = String.fromCharCode(E[h + k]);
                  p = p.join("");
                }
                X(d);
                return p;
              }, toWireType: function(d, e) {
                e instanceof ArrayBuffer && (e = new Uint8Array(e));
                var h = "string" == typeof e;
                h || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || S("Cannot pass non-string to std::string");
                var l = c && h ? P(e) : e.length;
                var k = qb(4 + l + 1), n = k + 4;
                K[k >> 2] = l;
                if (c && h)
                  Q(e, E, n, l + 1);
                else if (h)
                  for (h = 0; h < l; ++h) {
                    var p = e.charCodeAt(h);
                    255 < p && (X(n), S("String has UTF-16 code units that do not fit in 8 bits"));
                    E[n + h] = p;
                  }
                else
                  for (h = 0; h < l; ++h)
                    E[n + h] = e[h];
                null !== d && d.push(X, k);
                return k;
              }, argPackAdvance: 8, readValueFromPointer: Ra, Wa: function(d) {
                X(d);
              } });
            },
            x: function(a, b, c) {
              c = R(c);
              if (2 === b) {
                var d = Ua;
                var e = Va;
                var h = Wa;
                var l = () => H;
                var k = 1;
              } else
                4 === b && (d = Xa, e = Ya, h = Za, l = () => K, k = 2);
              T(a, { name: c, fromWireType: function(n) {
                for (var p = K[n >> 2], v = l(), y, F = n + 4, g = 0; g <= p; ++g) {
                  var r = n + 4 + g * b;
                  if (g == p || 0 == v[r >> k])
                    F = d(F, r - F), void 0 === y ? y = F : (y += String.fromCharCode(0), y += F), F = r + b;
                }
                X(n);
                return y;
              }, toWireType: function(n, p) {
                "string" != typeof p && S(`Cannot pass non-string to C++ string type ${c}`);
                var v = h(p), y = qb(4 + v + b);
                K[y >> 2] = v >> k;
                e(p, y + 4, v + b);
                null !== n && n.push(X, y);
                return y;
              }, argPackAdvance: 8, readValueFromPointer: Ra, Wa: function(n) {
                X(n);
              } });
            },
            fa: function(a, b) {
              b = R(b);
              T(a, { hb: true, name: b, argPackAdvance: 0, fromWireType: function() {
              }, toWireType: function() {
              } });
            },
            ca: () => true,
            o: function(a, b, c) {
              a = V(a);
              b = $a(b, "emval::as");
              var d = [], e = W(d);
              K[c >> 2] = e;
              return b.toWireType(d, a);
            },
            h: function(a, b, c, d, e) {
              a = eb[a];
              b = V(b);
              c = cb(c);
              var h = [];
              K[d >> 2] = W(h);
              return a(b, c, h, e);
            },
            r: function(a, b, c, d) {
              a = eb[a];
              b = V(b);
              c = cb(c);
              a(b, c, null, d);
            },
            b: Qa,
            F: function(a, b) {
              a = V(a);
              b = V(b);
              return a == b;
            },
            u: function(a) {
              if (0 === a)
                return W(fb());
              a = cb(a);
              return W(fb()[a]);
            },
            g: function(a, b) {
              var c = hb(a, b), d = c[0];
              b = d.name + "_$" + c.slice(1).map(function(v) {
                return v.name;
              }).join("_") + "$";
              var e = jb[b];
              if (void 0 !== e)
                return e;
              e = ["retType"];
              for (var h = [d], l = "", k = 0; k < a - 1; ++k)
                l += (0 !== k ? ", " : "") + "arg" + k, e.push("argType" + k), h.push(c[1 + k]);
              var n = "return function " + ib("methodCaller_" + b) + "(handle, name, destructors, args) {\n", p = 0;
              for (k = 0; k < a - 1; ++k)
                n += "    var arg" + k + " = argType" + k + ".readValueFromPointer(args" + (p ? "+" + p : "") + ");\n", p += c[k + 1].argPackAdvance;
              n += "    var rv = handle[name](" + l + ");\n";
              for (k = 0; k < a - 1; ++k)
                c[k + 1].deleteObject && (n += "    argType" + k + ".deleteObject(arg" + k + ");\n");
              d.hb || (n += "    return retType.toWireType(destructors, rv);\n");
              e.push(n + "};\n");
              a = lb(e).apply(null, h);
              e = gb(a);
              return jb[b] = e;
            },
            q: function(a, b) {
              a = V(a);
              b = V(b);
              return W(a[b]);
            },
            c: function(a) {
              4 < a && (U.get(a).cb += 1);
            },
            G: function(a, b, c, d) {
              a = V(a);
              var e = nb[b];
              e || (e = mb(b), nb[b] = e);
              return e(a, c, d);
            },
            s: function() {
              return W([]);
            },
            k: function(a) {
              a = V(a);
              for (var b = Array(a.length), c = 0; c < a.length; c++)
                b[c] = a[c];
              return W(b);
            },
            d: function(a) {
              return W(cb(a));
            },
            j: function() {
              return W({});
            },
            f: function(a) {
              for (var b = V(a); b.length; ) {
                var c = b.pop();
                b.pop()(c);
              }
              Qa(a);
            },
            i: function(a, b, c) {
              a = V(a);
              b = V(b);
              c = V(c);
              a[b] = c;
            },
            e: function(a, b) {
              a = $a(a, "_emval_take_value");
              a = a.readValueFromPointer(b);
              return W(a);
            },
            S: function(a, b) {
              a = Y(a);
              b = Y(b);
              a = new Date(1e3 * a);
              J[b >> 2] = a.getUTCSeconds();
              J[b + 4 >> 2] = a.getUTCMinutes();
              J[b + 8 >> 2] = a.getUTCHours();
              J[b + 12 >> 2] = a.getUTCDate();
              J[b + 16 >> 2] = a.getUTCMonth();
              J[b + 20 >> 2] = a.getUTCFullYear() - 1900;
              J[b + 24 >> 2] = a.getUTCDay();
              J[b + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
            },
            T: function(a, b) {
              a = Y(a);
              b = Y(b);
              a = new Date(1e3 * a);
              J[b >> 2] = a.getSeconds();
              J[b + 4 >> 2] = a.getMinutes();
              J[b + 8 >> 2] = a.getHours();
              J[b + 12 >> 2] = a.getDate();
              J[b + 16 >> 2] = a.getMonth();
              J[b + 20 >> 2] = a.getFullYear() - 1900;
              J[b + 24 >> 2] = a.getDay();
              J[b + 28 >> 2] = (Z(a.getFullYear()) ? ob : pb)[a.getMonth()] + a.getDate() - 1 | 0;
              J[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
              var c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset(), d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
              J[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
            },
            U: function(a) {
              a = Y(a);
              var b = new Date(J[a + 20 >> 2] + 1900, J[a + 16 >> 2], J[a + 12 >> 2], J[a + 8 >> 2], J[a + 4 >> 2], J[a >> 2], 0), c = J[a + 32 >> 2], d = b.getTimezoneOffset(), e = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), h = new Date(
                b.getFullYear(),
                0,
                1
              ).getTimezoneOffset(), l = Math.min(h, e);
              0 > c ? J[a + 32 >> 2] = Number(e != h && l == d) : 0 < c != (l == d) && (e = Math.max(h, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? l : e) - d)));
              J[a + 24 >> 2] = b.getDay();
              J[a + 28 >> 2] = (Z(b.getFullYear()) ? ob : pb)[b.getMonth()] + b.getDate() - 1 | 0;
              J[a >> 2] = b.getSeconds();
              J[a + 4 >> 2] = b.getMinutes();
              J[a + 8 >> 2] = b.getHours();
              J[a + 12 >> 2] = b.getDate();
              J[a + 16 >> 2] = b.getMonth();
              J[a + 20 >> 2] = b.getYear();
              return BigInt(b.getTime() / 1e3);
            },
            Q: function() {
              return -52;
            },
            R: function() {
            },
            J: (a, b, c) => {
              function d(n) {
                return (n = n.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? n[1] : "GMT";
              }
              var e = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(e, 0, 1), l = new Date(e, 6, 1);
              e = h.getTimezoneOffset();
              var k = l.getTimezoneOffset();
              K[a >> 2] = 60 * Math.max(e, k);
              J[b >> 2] = Number(e != k);
              a = d(h);
              b = d(l);
              a = rb(a);
              b = rb(b);
              k < e ? (K[c >> 2] = a, K[c + 4 >> 2] = b) : (K[c >> 2] = b, K[c + 4 >> 2] = a);
            },
            t: () => {
              ja("");
            },
            B: function() {
              return Date.now();
            },
            K: () => 2147483648,
            n: () => performance.now(),
            Z: (a, b, c) => E.copyWithin(a, b, b + c),
            I: (a) => {
              var b = E.length;
              a >>>= 0;
              if (2147483648 < a)
                return false;
              for (var c = 1; 4 >= c; c *= 2) {
                var d = b * (1 + 0.2 / c);
                d = Math.min(d, a + 100663296);
                var e = Math;
                d = Math.max(a, d);
                a: {
                  e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - B.buffer.byteLength + 65535 >>> 16;
                  try {
                    B.grow(e);
                    pa();
                    var h = 1;
                    break a;
                  } catch (l) {
                  }
                  h = void 0;
                }
                if (h)
                  return true;
              }
              return false;
            },
            X: (a, b) => {
              var c = 0;
              ub().forEach(function(d, e) {
                var h = b + c;
                e = K[a + 4 * e >> 2] = h;
                for (h = 0; h < d.length; ++h)
                  D[e++ >> 0] = d.charCodeAt(h);
                D[e >> 0] = 0;
                c += d.length + 1;
              });
              return 0;
            },
            Y: (a, b) => {
              var c = ub();
              K[a >> 2] = c.length;
              var d = 0;
              c.forEach(function(e) {
                d += e.length + 1;
              });
              K[b >> 2] = d;
              return 0;
            },
            w: () => 52,
            z: () => 52,
            W: function() {
              return 70;
            },
            y: (a, b, c, d) => {
              for (var e = 0, h = 0; h < c; h++) {
                var l = K[b >> 2], k = K[b + 4 >> 2];
                b += 8;
                for (var n = 0; n < k; n++) {
                  var p = E[l + n], v = vb[a];
                  0 === p || 10 === p ? ((1 === a ? ia : z)(O(v, 0)), v.length = 0) : v.push(p);
                }
                e += k;
              }
              K[d >> 2] = e;
              return 0;
            },
            ga: zb,
            m: (a, b, c, d) => zb(a, b, c, d)
          };
          (function() {
            function a(c) {
              C = c = c.exports;
              B = C.ha;
              pa();
              ra.unshift(C.ia);
              L--;
              f.monitorRunDependencies && f.monitorRunDependencies(L);
              if (0 == L && (null !== ua && (clearInterval(ua), ua = null), M)) {
                var d = M;
                M = null;
                d();
              }
              return c;
            }
            var b = { a: Cb };
            L++;
            f.monitorRunDependencies && f.monitorRunDependencies(L);
            if (f.instantiateWasm)
              try {
                return f.instantiateWasm(b, a);
              } catch (c) {
                z("Module.instantiateWasm callback failed with error: " + c), m(c);
              }
            Aa(b, function(c) {
              a(c.instance);
            }).catch(m);
            return {};
          })();
          f._OrtInit = (a, b) => (f._OrtInit = C.ja)(a, b);
          f._OrtGetLastError = (a, b) => (f._OrtGetLastError = C.ka)(a, b);
          f._OrtCreateSessionOptions = (a, b, c, d, e, h, l, k, n, p) => (f._OrtCreateSessionOptions = C.la)(a, b, c, d, e, h, l, k, n, p);
          f._OrtAppendExecutionProvider = (a, b) => (f._OrtAppendExecutionProvider = C.ma)(a, b);
          f._OrtAddFreeDimensionOverride = (a, b, c) => (f._OrtAddFreeDimensionOverride = C.na)(a, b, c);
          f._OrtAddSessionConfigEntry = (a, b, c) => (f._OrtAddSessionConfigEntry = C.oa)(a, b, c);
          f._OrtReleaseSessionOptions = (a) => (f._OrtReleaseSessionOptions = C.pa)(a);
          f._OrtCreateSession = (a, b, c) => (f._OrtCreateSession = C.qa)(a, b, c);
          f._OrtReleaseSession = (a) => (f._OrtReleaseSession = C.ra)(a);
          f._OrtGetInputOutputCount = (a, b, c) => (f._OrtGetInputOutputCount = C.sa)(a, b, c);
          f._OrtGetInputName = (a, b) => (f._OrtGetInputName = C.ta)(a, b);
          f._OrtGetOutputName = (a, b) => (f._OrtGetOutputName = C.ua)(a, b);
          f._OrtFree = (a) => (f._OrtFree = C.va)(a);
          f._OrtCreateTensor = (a, b, c, d, e, h) => (f._OrtCreateTensor = C.wa)(a, b, c, d, e, h);
          f._OrtGetTensorData = (a, b, c, d, e) => (f._OrtGetTensorData = C.xa)(a, b, c, d, e);
          f._OrtReleaseTensor = (a) => (f._OrtReleaseTensor = C.ya)(a);
          f._OrtCreateRunOptions = (a, b, c, d) => (f._OrtCreateRunOptions = C.za)(a, b, c, d);
          f._OrtAddRunConfigEntry = (a, b, c) => (f._OrtAddRunConfigEntry = C.Aa)(a, b, c);
          f._OrtReleaseRunOptions = (a) => (f._OrtReleaseRunOptions = C.Ba)(a);
          f._OrtCreateBinding = (a) => (f._OrtCreateBinding = C.Ca)(a);
          f._OrtBindInput = (a, b, c) => (f._OrtBindInput = C.Da)(a, b, c);
          f._OrtBindOutput = (a, b, c, d) => (f._OrtBindOutput = C.Ea)(a, b, c, d);
          f._OrtClearBoundOutputs = (a) => (f._OrtClearBoundOutputs = C.Fa)(a);
          f._OrtReleaseBinding = (a) => (f._OrtReleaseBinding = C.Ga)(a);
          f._OrtRunWithBinding = (a, b, c, d, e) => (f._OrtRunWithBinding = C.Ha)(a, b, c, d, e);
          f._OrtRun = (a, b, c, d, e, h, l, k) => (f._OrtRun = C.Ia)(a, b, c, d, e, h, l, k);
          f._OrtEndProfiling = (a) => (f._OrtEndProfiling = C.Ja)(a);
          var qb = f._malloc = (a) => (qb = f._malloc = C.Ka)(a), X = f._free = (a) => (X = f._free = C.La)(a), ab = (a) => (ab = C.Ma)(a);
          f.__embind_initialize_bindings = () => (f.__embind_initialize_bindings = C.Na)();
          var Db = () => (Db = C.Pa)(), Eb = (a) => (Eb = C.Qa)(a), Fb = (a) => (Fb = C.Ra)(a);
          f.stackAlloc = Fb;
          f.stackSave = Db;
          f.stackRestore = Eb;
          f.UTF8ToString = (a, b) => a ? O(E, a, b) : "";
          f.stringToUTF8 = (a, b, c) => Q(a, E, b, c);
          f.lengthBytesUTF8 = P;
          var Gb;
          M = function Hb() {
            Gb || Ib();
            Gb || (M = Hb);
          };
          function Ib() {
            function a() {
              if (!Gb && (Gb = true, f.calledRun = true, !ka)) {
                Ba(ra);
                aa(f);
                if (f.onRuntimeInitialized)
                  f.onRuntimeInitialized();
                if (f.postRun)
                  for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length; ) {
                    var b = f.postRun.shift();
                    sa.unshift(b);
                  }
                Ba(sa);
              }
            }
            if (!(0 < L)) {
              if (f.preRun)
                for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length; )
                  ta();
              Ba(qa);
              0 < L || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
                setTimeout(function() {
                  f.setStatus("");
                }, 1);
                a();
              }, 1)) : a());
            }
          }
          if (f.preInit)
            for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length; )
              f.preInit.pop()();
          Ib();
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
          function e() {
            m.buffer != n.buffer && p();
            return n;
          }
          function t() {
            m.buffer != n.buffer && p();
            return aa;
          }
          function v() {
            m.buffer != n.buffer && p();
            return ba;
          }
          function ca() {
            m.buffer != n.buffer && p();
            return da;
          }
          function w() {
            m.buffer != n.buffer && p();
            return ea;
          }
          function z() {
            m.buffer != n.buffer && p();
            return fa;
          }
          function ha() {
            m.buffer != n.buffer && p();
            return ia;
          }
          var A = moduleArg, ja, ka;
          A.ready = new Promise((a, b) => {
            ja = a;
            ka = b;
          });
          var la = Object.assign({}, A), ma = "./this.program", C = (a, b) => {
            throw b;
          }, na = "object" == typeof window, D = "function" == typeof importScripts, E = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, F = A.ENVIRONMENT_IS_PTHREAD || false, G = "";
          function oa(a) {
            return A.locateFile ? A.locateFile(a, G) : G + a;
          }
          var pa, qa, ra;
          if (E) {
            var fs = (init_fs(), __toCommonJS(fs_exports)), sa = (init_path(), __toCommonJS(path_exports));
            G = D ? sa.dirname(G) + "/" : __dirname + "/";
            pa = (b, c) => {
              b = b.startsWith("file://") ? new URL(b) : sa.normalize(b);
              return fs.readFileSync(b, c ? void 0 : "utf8");
            };
            ra = (b) => {
              b = pa(b, true);
              b.buffer || (b = new Uint8Array(b));
              return b;
            };
            qa = (b, c, d, f = true) => {
              b = b.startsWith("file://") ? new URL(b) : sa.normalize(b);
              fs.readFile(b, f ? void 0 : "utf8", (g, k) => {
                g ? d(g) : c(f ? k.buffer : k);
              });
            };
            !A.thisProgram && 1 < process.argv.length && (ma = process.argv[1].replace(/\\/g, "/"));
            process.argv.slice(2);
            C = (b, c) => {
              process.exitCode = b;
              throw c;
            };
            A.inspect = () => "[Emscripten Module object]";
            let a;
            try {
              a = require_worker_threads();
            } catch (b) {
              throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'), b;
            }
            global.Worker = a.Worker;
          } else if (na || D)
            D ? G = self.location.href : "undefined" != typeof document && document.currentScript && (G = document.currentScript.src), typeof _scriptDir !== "undefined" && _scriptDir && (G = _scriptDir), 0 !== G.indexOf("blob:") ? G = G.substr(0, G.replace(/[?#].*/, "").lastIndexOf("/") + 1) : G = "", E || (pa = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, false);
              b.send(null);
              return b.responseText;
            }, D && (ra = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, false);
              b.responseType = "arraybuffer";
              b.send(null);
              return new Uint8Array(b.response);
            }), qa = (a, b, c) => {
              var d = new XMLHttpRequest();
              d.open("GET", a, true);
              d.responseType = "arraybuffer";
              d.onload = () => {
                200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
              };
              d.onerror = c;
              d.send(null);
            });
          E && "undefined" == typeof performance && (global.performance = require_perf_hooks().performance);
          var ta = console.log.bind(console), ua = console.error.bind(console);
          E && (ta = (...a) => fs.writeSync(1, a.join(" ") + "\n"), ua = (...a) => fs.writeSync(2, a.join(" ") + "\n"));
          var va = A.print || ta, H = A.printErr || ua;
          Object.assign(A, la);
          la = null;
          A.thisProgram && (ma = A.thisProgram);
          A.quit && (C = A.quit);
          var I;
          A.wasmBinary && (I = A.wasmBinary);
          var noExitRuntime = A.noExitRuntime || true;
          "object" != typeof WebAssembly && wa("no native wasm support detected");
          var m, J, xa, ya = false, K, n, aa, ba, da, ea, fa, za, L, Aa, ia;
          function p() {
            var a = m.buffer;
            A.HEAP8 = n = new Int8Array(a);
            A.HEAP16 = ba = new Int16Array(a);
            A.HEAP32 = ea = new Int32Array(a);
            A.HEAPU8 = aa = new Uint8Array(a);
            A.HEAPU16 = da = new Uint16Array(a);
            A.HEAPU32 = fa = new Uint32Array(a);
            A.HEAPF32 = za = new Float32Array(a);
            A.HEAPF64 = ia = new Float64Array(a);
            A.HEAP64 = L = new BigInt64Array(a);
            A.HEAPU64 = Aa = new BigUint64Array(a);
          }
          var Ba = A.INITIAL_MEMORY || 16777216;
          5242880 <= Ba || wa("INITIAL_MEMORY should be larger than STACK_SIZE, was " + Ba + "! (STACK_SIZE=5242880)");
          if (F)
            m = A.wasmMemory;
          else if (A.wasmMemory)
            m = A.wasmMemory;
          else if (m = new WebAssembly.Memory({ initial: Ba / 65536, maximum: 32768, shared: true }), !(m.buffer instanceof SharedArrayBuffer))
            throw H("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), E && H("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");
          p();
          Ba = m.buffer.byteLength;
          var Ca, Da = [], Ea = [], Fa = [], Ga = 0;
          function Ha() {
            return noExitRuntime || 0 < Ga;
          }
          var M = 0, Ia = null, Ja = null;
          function Ka() {
            M++;
            A.monitorRunDependencies && A.monitorRunDependencies(M);
          }
          function La() {
            M--;
            A.monitorRunDependencies && A.monitorRunDependencies(M);
            if (0 == M && (null !== Ia && (clearInterval(Ia), Ia = null), Ja)) {
              var a = Ja;
              Ja = null;
              a();
            }
          }
          function wa(a) {
            if (A.onAbort)
              A.onAbort(a);
            a = "Aborted(" + a + ")";
            H(a);
            ya = true;
            K = 1;
            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
            ka(a);
            throw a;
          }
          function Ma(a) {
            return a.startsWith("data:application/octet-stream;base64,");
          }
          var O;
          O = "ort-wasm-threaded.wasm";
          Ma(O) || (O = oa(O));
          function Na(a) {
            if (a == O && I)
              return new Uint8Array(I);
            if (ra)
              return ra(a);
            throw "both async and sync fetching of the wasm failed";
          }
          function Oa(a) {
            if (!I && (na || D)) {
              if ("function" == typeof fetch && !a.startsWith("file://"))
                return fetch(a, { credentials: "same-origin" }).then((b) => {
                  if (!b.ok)
                    throw "failed to load wasm binary file at '" + a + "'";
                  return b.arrayBuffer();
                }).catch(() => Na(a));
              if (qa)
                return new Promise((b, c) => {
                  qa(a, (d) => b(new Uint8Array(d)), c);
                });
            }
            return Promise.resolve().then(() => Na(a));
          }
          function Pa(a, b, c) {
            return Oa(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
              H("failed to asynchronously prepare wasm: " + d);
              wa(d);
            });
          }
          function Qa(a, b) {
            var c = O;
            return I || "function" != typeof WebAssembly.instantiateStreaming || Ma(c) || c.startsWith("file://") || E || "function" != typeof fetch ? Pa(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(f) {
              H("wasm streaming compile failed: " + f);
              H("falling back to ArrayBuffer instantiation");
              return Pa(c, a, b);
            }));
          }
          function Ra(a) {
            this.name = "ExitStatus";
            this.message = `Program terminated with exit(${a})`;
            this.status = a;
          }
          function Sa(a) {
            a.terminate();
            a.onmessage = () => {
            };
          }
          function Ta(a) {
            (a = P.kb[a]) || wa();
            P.Qb(a);
          }
          function Ua(a) {
            var b = P.Hb();
            if (!b)
              return 6;
            P.ob.push(b);
            P.kb[a.nb] = b;
            b.nb = a.nb;
            var c = { cmd: "run", start_routine: a.Rb, arg: a.Gb, pthread_ptr: a.nb };
            E && b.unref();
            b.postMessage(c, a.Xb);
            return 0;
          }
          var Va = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Wa = (a, b, c) => {
            var d = b + c;
            for (c = b; a[c] && !(c >= d); )
              ++c;
            if (16 < c - b && a.buffer && Va)
              return Va.decode(a.buffer instanceof SharedArrayBuffer ? a.slice(b, c) : a.subarray(b, c));
            for (d = ""; b < c; ) {
              var f = a[b++];
              if (f & 128) {
                var g = a[b++] & 63;
                if (192 == (f & 224))
                  d += String.fromCharCode((f & 31) << 6 | g);
                else {
                  var k = a[b++] & 63;
                  f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | k : (f & 7) << 18 | g << 12 | k << 6 | a[b++] & 63;
                  65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
                }
              } else
                d += String.fromCharCode(f);
            }
            return d;
          }, Xa = (a, b) => a ? Wa(t(), a, b) : "";
          function Ya(a) {
            if (F)
              return Q(1, 1, a);
            K = a;
            if (!Ha()) {
              P.Sb();
              if (A.onExit)
                A.onExit(a);
              ya = true;
            }
            C(a, new Ra(a));
          }
          var $a = (a) => {
            K = a;
            if (F)
              throw Za(a), "unwind";
            Ya(a);
          }, P = {
            rb: [],
            ob: [],
            Eb: [],
            kb: {},
            wb: function() {
              F ? P.Kb() : P.Jb();
            },
            Jb: function() {
              Da.unshift(() => {
                Ka();
                P.Mb(() => La());
              });
            },
            Kb: function() {
              P.receiveObjectTransfer = P.Pb;
              P.threadInitTLS = P.Db;
              P.setExitStatus = P.Cb;
              noExitRuntime = false;
            },
            Cb: function(a) {
              K = a;
            },
            bc: ["$terminateWorker"],
            Sb: function() {
              for (var a of P.ob)
                Sa(a);
              for (a of P.rb)
                Sa(a);
              P.rb = [];
              P.ob = [];
              P.kb = [];
            },
            Qb: function(a) {
              var b = a.nb;
              delete P.kb[b];
              P.rb.push(a);
              P.ob.splice(P.ob.indexOf(a), 1);
              a.nb = 0;
              ab(b);
            },
            Pb: function() {
            },
            Db: function() {
              P.Eb.forEach((a) => a());
            },
            Nb: (a) => new Promise((b) => {
              a.onmessage = (g) => {
                g = g.data;
                var k = g.cmd;
                if (g.targetThread && g.targetThread != bb()) {
                  var l = P.kb[g.ac];
                  l ? l.postMessage(g, g.transferList) : H('Internal error! Worker sent a message "' + k + '" to target pthread ' + g.targetThread + ", but that thread no longer exists!");
                } else if ("checkMailbox" === k)
                  cb();
                else if ("spawnThread" === k)
                  Ua(g);
                else if ("cleanupThread" === k)
                  Ta(g.thread);
                else if ("killThread" === k)
                  g = g.thread, k = P.kb[g], delete P.kb[g], Sa(k), ab(g), P.ob.splice(
                    P.ob.indexOf(k),
                    1
                  ), k.nb = 0;
                else if ("cancelThread" === k)
                  P.kb[g.thread].postMessage({ cmd: "cancel" });
                else if ("loaded" === k)
                  a.loaded = true, b(a);
                else if ("alert" === k)
                  alert("Thread " + g.threadId + ": " + g.text);
                else if ("setimmediate" === g.target)
                  a.postMessage(g);
                else if ("callHandler" === k)
                  A[g.handler](...g.args);
                else
                  k && H("worker sent an unknown command " + k);
              };
              a.onerror = (g) => {
                H("worker sent an error! " + g.filename + ":" + g.lineno + ": " + g.message);
                throw g;
              };
              E && (a.on("message", function(g) {
                a.onmessage({ data: g });
              }), a.on("error", function(g) {
                a.onerror(g);
              }));
              var c = [], d = ["onExit", "onAbort", "print", "printErr"], f;
              for (f of d)
                A.hasOwnProperty(f) && c.push(f);
              a.postMessage({ cmd: "load", handlers: c, urlOrBlob: A.mainScriptUrlOrBlob || _scriptDir, wasmMemory: m, wasmModule: xa });
            }),
            Mb: function(a) {
              a();
            },
            Fb: function() {
              var a = oa("ort-wasm-threaded.worker.js");
              a = new Worker(a);
              P.rb.push(a);
            },
            Hb: function() {
              0 == P.rb.length && (P.Fb(), P.Nb(P.rb[0]));
              return P.rb.pop();
            }
          };
          A.PThread = P;
          var db = (a) => {
            for (; 0 < a.length; )
              a.shift()(A);
          };
          A.establishStackSpace = function() {
            var a = bb(), b = w()[a + 52 >> 2];
            a = w()[a + 56 >> 2];
            eb(b, b - a);
            fb(b);
          };
          function Za(a) {
            if (F)
              return Q(2, 0, a);
            $a(a);
          }
          var gb = [];
          A.invokeEntryPoint = function(a, b) {
            var c = gb[a];
            c || (a >= gb.length && (gb.length = a + 1), gb[a] = c = Ca.get(a));
            a = c(b);
            Ha() ? P.Cb(a) : hb(a);
          };
          function ib(a) {
            this.tb = a - 24;
            this.Ob = function(b) {
              z()[this.tb + 4 >> 2] = b;
            };
            this.yb = function(b) {
              z()[this.tb + 8 >> 2] = b;
            };
            this.wb = function(b, c) {
              this.xb();
              this.Ob(b);
              this.yb(c);
            };
            this.xb = function() {
              z()[this.tb + 16 >> 2] = 0;
            };
          }
          var jb = 0, kb = 0;
          function lb(a, b, c, d) {
            return F ? Q(3, 1, a, b, c, d) : mb(a, b, c, d);
          }
          function mb(a, b, c, d) {
            if ("undefined" == typeof SharedArrayBuffer)
              return H("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
            var f = [];
            if (F && 0 === f.length)
              return lb(a, b, c, d);
            a = { Rb: c, nb: a, Gb: d, Xb: f };
            return F ? (a.Zb = "spawnThread", postMessage(a, f), 0) : Ua(a);
          }
          function nb(a, b, c) {
            return F ? Q(4, 1, a, b, c) : 0;
          }
          function ob(a, b) {
            if (F)
              return Q(5, 1, a, b);
          }
          var pb = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
            }
            return b;
          }, qb = (a, b, c, d) => {
            if (!(0 < d))
              return 0;
            var f = c;
            d = c + d - 1;
            for (var g = 0; g < a.length; ++g) {
              var k = a.charCodeAt(g);
              if (55296 <= k && 57343 >= k) {
                var l = a.charCodeAt(++g);
                k = 65536 + ((k & 1023) << 10) | l & 1023;
              }
              if (127 >= k) {
                if (c >= d)
                  break;
                b[c++] = k;
              } else {
                if (2047 >= k) {
                  if (c + 1 >= d)
                    break;
                  b[c++] = 192 | k >> 6;
                } else {
                  if (65535 >= k) {
                    if (c + 2 >= d)
                      break;
                    b[c++] = 224 | k >> 12;
                  } else {
                    if (c + 3 >= d)
                      break;
                    b[c++] = 240 | k >> 18;
                    b[c++] = 128 | k >> 12 & 63;
                  }
                  b[c++] = 128 | k >> 6 & 63;
                }
                b[c++] = 128 | k & 63;
              }
            }
            b[c] = 0;
            return c - f;
          }, rb = (a, b, c) => qb(a, t(), b, c);
          function sb(a, b) {
            if (F)
              return Q(6, 1, a, b);
          }
          function tb(a, b, c) {
            if (F)
              return Q(7, 1, a, b, c);
          }
          function ub(a, b, c) {
            return F ? Q(8, 1, a, b, c) : 0;
          }
          function vb(a, b) {
            if (F)
              return Q(9, 1, a, b);
          }
          function wb(a, b, c) {
            if (F)
              return Q(10, 1, a, b, c);
          }
          function xb(a, b, c, d) {
            if (F)
              return Q(11, 1, a, b, c, d);
          }
          function yb(a, b, c, d) {
            if (F)
              return Q(12, 1, a, b, c, d);
          }
          function zb(a, b, c, d) {
            if (F)
              return Q(13, 1, a, b, c, d);
          }
          function Ab(a) {
            if (F)
              return Q(14, 1, a);
          }
          function Bb(a, b) {
            if (F)
              return Q(15, 1, a, b);
          }
          function Cb(a, b, c) {
            if (F)
              return Q(16, 1, a, b, c);
          }
          function Db(a) {
            if (null === a)
              return "null";
            var b = typeof a;
            return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
          }
          var Eb = void 0;
          function S(a) {
            for (var b = ""; t()[a]; )
              b += Eb[t()[a++]];
            return b;
          }
          var Fb = {}, Gb = {}, Hb = {}, Ib = void 0;
          function T(a) {
            throw new Ib(a);
          }
          function Jb(a, b, c = {}) {
            var d = b.name;
            a || T(`type "${d}" must have a positive integer typeid pointer`);
            if (Gb.hasOwnProperty(a)) {
              if (c.Ib)
                return;
              T(`Cannot register type '${d}' twice`);
            }
            Gb[a] = b;
            delete Hb[a];
            Fb.hasOwnProperty(a) && (b = Fb[a], delete Fb[a], b.forEach((f) => f()));
          }
          function U(a, b, c = {}) {
            if (!("argPackAdvance" in b))
              throw new TypeError("registerType registeredInstance requires argPackAdvance");
            Jb(a, b, c);
          }
          function Kb(a, b, c) {
            switch (b) {
              case 0:
                return c ? function(d) {
                  return e()[d];
                } : function(d) {
                  return t()[d];
                };
              case 1:
                return c ? function(d) {
                  return v()[d >> 1];
                } : function(d) {
                  return ca()[d >> 1];
                };
              case 2:
                return c ? function(d) {
                  return w()[d >> 2];
                } : function(d) {
                  return z()[d >> 2];
                };
              case 3:
                return c ? function(d) {
                  return L[d >> 3];
                } : function(d) {
                  return Aa[d >> 3];
                };
              default:
                throw new TypeError("Unknown integer type: " + a);
            }
          }
          function Lb(a) {
            switch (a) {
              case 1:
                return 0;
              case 2:
                return 1;
              case 4:
                return 2;
              case 8:
                return 3;
              default:
                throw new TypeError(`Unknown type size: ${a}`);
            }
          }
          function Mb() {
            this.mb = [void 0];
            this.Ab = [];
          }
          var V = new Mb();
          function Nb(a) {
            a >= V.tb && 0 === --V.get(a).Bb && V.yb(a);
          }
          var W = (a) => {
            a || T("Cannot use deleted val. handle = " + a);
            return V.get(a).value;
          }, X = (a) => {
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
                return V.xb({ Bb: 1, value: a });
            }
          };
          function Ob(a) {
            return this.fromWireType(w()[a >> 2]);
          }
          function Pb(a, b) {
            switch (b) {
              case 2:
                return function(c) {
                  var d = this.fromWireType;
                  m.buffer != n.buffer && p();
                  return d.call(this, za[c >> 2]);
                };
              case 3:
                return function(c) {
                  return this.fromWireType(ha()[c >> 3]);
                };
              default:
                throw new TypeError("Unknown float type: " + a);
            }
          }
          var Qb = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Rb = (a, b) => {
            var c = a >> 1;
            for (var d = c + b / 2; !(c >= d) && ca()[c]; )
              ++c;
            c <<= 1;
            if (32 < c - a && Qb)
              return Qb.decode(t().slice(a, c));
            c = "";
            for (d = 0; !(d >= b / 2); ++d) {
              var f = v()[a + 2 * d >> 1];
              if (0 == f)
                break;
              c += String.fromCharCode(f);
            }
            return c;
          }, Sb = (a, b, c) => {
            void 0 === c && (c = 2147483647);
            if (2 > c)
              return 0;
            c -= 2;
            var d = b;
            c = c < 2 * a.length ? c / 2 : a.length;
            for (var f = 0; f < c; ++f) {
              var g = a.charCodeAt(f);
              v()[b >> 1] = g;
              b += 2;
            }
            v()[b >> 1] = 0;
            return b - d;
          }, Tb = (a) => 2 * a.length, Ub = (a, b) => {
            for (var c = 0, d = ""; !(c >= b / 4); ) {
              var f = w()[a + 4 * c >> 2];
              if (0 == f)
                break;
              ++c;
              65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);
            }
            return d;
          }, Vb = (a, b, c) => {
            void 0 === c && (c = 2147483647);
            if (4 > c)
              return 0;
            var d = b;
            c = d + c - 4;
            for (var f = 0; f < a.length; ++f) {
              var g = a.charCodeAt(f);
              if (55296 <= g && 57343 >= g) {
                var k = a.charCodeAt(++f);
                g = 65536 + ((g & 1023) << 10) | k & 1023;
              }
              w()[b >> 2] = g;
              b += 4;
              if (b + 4 > c)
                break;
            }
            w()[b >> 2] = 0;
            return b - d;
          }, Wb = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              55296 <= d && 57343 >= d && ++c;
              b += 4;
            }
            return b;
          }, Xb = (a) => {
            if (!ya)
              try {
                if (a(), !Ha())
                  try {
                    F ? hb(K) : $a(K);
                  } catch (b) {
                    b instanceof Ra || "unwind" == b || C(1, b);
                  }
              } catch (b) {
                b instanceof Ra || "unwind" == b || C(1, b);
              }
          };
          function Yb(a) {
            "function" === typeof Atomics.Yb && (Atomics.Yb(w(), a >> 2, a).value.then(cb), a += 128, Atomics.store(w(), a >> 2, 1));
          }
          A.__emscripten_thread_mailbox_await = Yb;
          function cb() {
            var a = bb();
            a && (Yb(a), Xb(() => Zb()));
          }
          A.checkMailbox = cb;
          function $b(a, b) {
            var c = Gb[a];
            if (void 0 === c) {
              a = ac(a);
              var d = S(a);
              Y(a);
              T(b + " has unknown type " + d);
            }
            return c;
          }
          var bc = {};
          function cc(a) {
            var b = bc[a];
            return void 0 === b ? S(a) : b;
          }
          var dc = [];
          function ec() {
            return "object" == typeof globalThis ? globalThis : Function("return this")();
          }
          function fc(a) {
            var b = dc.length;
            dc.push(a);
            return b;
          }
          function gc(a, b) {
            for (var c = Array(a), d = 0; d < a; ++d)
              c[d] = $b(z()[b + 4 * d >> 2], "parameter " + d);
            return c;
          }
          function hc(a) {
            if (void 0 === a)
              return "_unknown";
            a = a.replace(/[^a-zA-Z0-9_]/g, "$");
            var b = a.charCodeAt(0);
            return 48 <= b && 57 >= b ? `_${a}` : a;
          }
          var ic = [];
          function jc(a, b) {
            a = hc(a);
            return { [a]: function() {
              return b.apply(this, arguments);
            } }[a];
          }
          function kc(a) {
            var b = Function;
            if (!(b instanceof Function))
              throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
            var c = jc(b.name || "unknownFunctionName", function() {
            });
            c.prototype = b.prototype;
            c = new c();
            a = b.apply(c, a);
            return a instanceof Object ? a : c;
          }
          function lc(a) {
            for (var b = "", c = 0; c < a; ++c)
              b += (0 !== c ? ", " : "") + "arg" + c;
            var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
            for (c = 0; c < a; ++c)
              d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter " + c + "');\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\nargs += argType" + c + "['argPackAdvance'];\nargTypes += 4;\n";
            return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\nreturn valueToHandle(obj);\n}\n"))($b, A, X, () => z());
          }
          var mc = {};
          function nc(a) {
            return -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
          }
          var Z = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), oc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], pc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
          function rc(a, b, c, d, f, g, k) {
            return F ? Q(17, 1, a, b, c, d, f, g, k) : -52;
          }
          function sc(a, b, c, d, f, g) {
            if (F)
              return Q(18, 1, a, b, c, d, f, g);
          }
          var uc = (a) => {
            var b = pb(a) + 1, c = tc(b);
            c && rb(a, c, b);
            return c;
          }, wc = (a) => {
            var b = vc();
            a = a();
            fb(b);
            return a;
          };
          function Q(a, b) {
            var c = arguments.length - 2, d = arguments;
            return wc(() => {
              for (var f = 2 * c, g = xc(8 * f), k = g >> 3, l = 0; l < c; l++) {
                var q = d[2 + l];
                "bigint" == typeof q ? (L[k + 2 * l] = 1n, L[k + 2 * l + 1] = q) : (L[k + 2 * l] = 0n, ha()[k + 2 * l + 1] = q);
              }
              return yc(a, f, g, b);
            });
          }
          var zc = [], Ac = {}, Cc = () => {
            if (!Bc) {
              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: ma || "./this.program" }, b;
              for (b in Ac)
                void 0 === Ac[b] ? delete a[b] : a[b] = Ac[b];
              var c = [];
              for (b in a)
                c.push(`${b}=${a[b]}`);
              Bc = c;
            }
            return Bc;
          }, Bc;
          function Dc(a, b) {
            if (F)
              return Q(19, 1, a, b);
            var c = 0;
            Cc().forEach(function(d, f) {
              var g = b + c;
              f = z()[a + 4 * f >> 2] = g;
              for (g = 0; g < d.length; ++g)
                e()[f++ >> 0] = d.charCodeAt(g);
              e()[f >> 0] = 0;
              c += d.length + 1;
            });
            return 0;
          }
          function Ec(a, b) {
            if (F)
              return Q(20, 1, a, b);
            var c = Cc();
            z()[a >> 2] = c.length;
            var d = 0;
            c.forEach(function(f) {
              d += f.length + 1;
            });
            z()[b >> 2] = d;
            return 0;
          }
          function Fc(a) {
            return F ? Q(21, 1, a) : 52;
          }
          function Gc(a, b, c, d) {
            return F ? Q(22, 1, a, b, c, d) : 52;
          }
          function Hc(a, b, c, d) {
            return F ? Q(23, 1, a, b, c, d) : 70;
          }
          var Ic = [null, [], []];
          function Jc(a, b, c, d) {
            if (F)
              return Q(24, 1, a, b, c, d);
            for (var f = 0, g = 0; g < c; g++) {
              var k = z()[b >> 2], l = z()[b + 4 >> 2];
              b += 8;
              for (var q = 0; q < l; q++) {
                var r = t()[k + q], x = Ic[a];
                0 === r || 10 === r ? ((1 === a ? va : H)(Wa(x, 0)), x.length = 0) : x.push(r);
              }
              f += l;
            }
            z()[d >> 2] = f;
            return 0;
          }
          var Kc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Lc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          function Mc(a) {
            var b = Array(pb(a) + 1);
            qb(a, b, 0, b.length);
            return b;
          }
          var Nc = (a, b) => {
            e().set(a, b);
          }, Oc = (a, b, c, d) => {
            function f(h, u, y) {
              for (h = "number" == typeof h ? h.toString() : h || ""; h.length < u; )
                h = y[0] + h;
              return h;
            }
            function g(h, u) {
              return f(h, u, "0");
            }
            function k(h, u) {
              function y(qc) {
                return 0 > qc ? -1 : 0 < qc ? 1 : 0;
              }
              var R;
              0 === (R = y(h.getFullYear() - u.getFullYear())) && 0 === (R = y(h.getMonth() - u.getMonth())) && (R = y(h.getDate() - u.getDate()));
              return R;
            }
            function l(h) {
              switch (h.getDay()) {
                case 0:
                  return new Date(h.getFullYear() - 1, 11, 29);
                case 1:
                  return h;
                case 2:
                  return new Date(h.getFullYear(), 0, 3);
                case 3:
                  return new Date(
                    h.getFullYear(),
                    0,
                    2
                  );
                case 4:
                  return new Date(h.getFullYear(), 0, 1);
                case 5:
                  return new Date(h.getFullYear() - 1, 11, 31);
                case 6:
                  return new Date(h.getFullYear() - 1, 11, 30);
              }
            }
            function q(h) {
              var u = h.pb;
              for (h = new Date(new Date(h.qb + 1900, 0, 1).getTime()); 0 < u; ) {
                var y = h.getMonth(), R = (Z(h.getFullYear()) ? Kc : Lc)[y];
                if (u > R - h.getDate())
                  u -= R - h.getDate() + 1, h.setDate(1), 11 > y ? h.setMonth(y + 1) : (h.setMonth(0), h.setFullYear(h.getFullYear() + 1));
                else {
                  h.setDate(h.getDate() + u);
                  break;
                }
              }
              y = new Date(h.getFullYear() + 1, 0, 4);
              u = l(new Date(
                h.getFullYear(),
                0,
                4
              ));
              y = l(y);
              return 0 >= k(u, h) ? 0 >= k(y, h) ? h.getFullYear() + 1 : h.getFullYear() : h.getFullYear() - 1;
            }
            var r = w()[d + 40 >> 2];
            d = { Vb: w()[d >> 2], Ub: w()[d + 4 >> 2], ub: w()[d + 8 >> 2], zb: w()[d + 12 >> 2], vb: w()[d + 16 >> 2], qb: w()[d + 20 >> 2], lb: w()[d + 24 >> 2], pb: w()[d + 28 >> 2], cc: w()[d + 32 >> 2], Tb: w()[d + 36 >> 2], Wb: r ? Xa(r) : "" };
            c = Xa(c);
            r = {
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
            for (var x in r)
              c = c.replace(new RegExp(x, "g"), r[x]);
            var B = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), N = "January February March April May June July August September October November December".split(" ");
            r = { "%a": (h) => B[h.lb].substring(0, 3), "%A": (h) => B[h.lb], "%b": (h) => N[h.vb].substring(0, 3), "%B": (h) => N[h.vb], "%C": (h) => g((h.qb + 1900) / 100 | 0, 2), "%d": (h) => g(h.zb, 2), "%e": (h) => f(h.zb, 2, " "), "%g": (h) => q(h).toString().substring(2), "%G": (h) => q(h), "%H": (h) => g(h.ub, 2), "%I": (h) => {
              h = h.ub;
              0 == h ? h = 12 : 12 < h && (h -= 12);
              return g(h, 2);
            }, "%j": (h) => {
              for (var u = 0, y = 0; y <= h.vb - 1; u += (Z(h.qb + 1900) ? Kc : Lc)[y++])
                ;
              return g(h.zb + u, 3);
            }, "%m": (h) => g(h.vb + 1, 2), "%M": (h) => g(h.Ub, 2), "%n": () => "\n", "%p": (h) => 0 <= h.ub && 12 > h.ub ? "AM" : "PM", "%S": (h) => g(h.Vb, 2), "%t": () => "	", "%u": (h) => h.lb || 7, "%U": (h) => g(Math.floor((h.pb + 7 - h.lb) / 7), 2), "%V": (h) => {
              var u = Math.floor((h.pb + 7 - (h.lb + 6) % 7) / 7);
              2 >= (h.lb + 371 - h.pb - 2) % 7 && u++;
              if (u)
                53 == u && (y = (h.lb + 371 - h.pb) % 7, 4 == y || 3 == y && Z(h.qb) || (u = 1));
              else {
                u = 52;
                var y = (h.lb + 7 - h.pb - 1) % 7;
                (4 == y || 5 == y && Z(h.qb % 400 - 1)) && u++;
              }
              return g(u, 2);
            }, "%w": (h) => h.lb, "%W": (h) => g(Math.floor((h.pb + 7 - (h.lb + 6) % 7) / 7), 2), "%y": (h) => (h.qb + 1900).toString().substring(2), "%Y": (h) => h.qb + 1900, "%z": (h) => {
              h = h.Tb;
              var u = 0 <= h;
              h = Math.abs(h) / 60;
              return (u ? "+" : "-") + String("0000" + (h / 60 * 100 + h % 60)).slice(-4);
            }, "%Z": (h) => h.Wb, "%%": () => "%" };
            c = c.replace(/%%/g, "\0\0");
            for (x in r)
              c.includes(x) && (c = c.replace(new RegExp(x, "g"), r[x](d)));
            c = c.replace(/\0\0/g, "%");
            x = Mc(c);
            if (x.length > b)
              return 0;
            Nc(x, a);
            return x.length - 1;
          };
          P.wb();
          for (var Pc = Array(256), Qc = 0; 256 > Qc; ++Qc)
            Pc[Qc] = String.fromCharCode(Qc);
          Eb = Pc;
          Ib = A.BindingError = class extends Error {
            constructor(a) {
              super(a);
              this.name = "BindingError";
            }
          };
          A.InternalError = class extends Error {
            constructor(a) {
              super(a);
              this.name = "InternalError";
            }
          };
          Object.assign(Mb.prototype, { get(a) {
            return this.mb[a];
          }, has(a) {
            return void 0 !== this.mb[a];
          }, xb(a) {
            var b = this.Ab.pop() || this.mb.length;
            this.mb[b] = a;
            return b;
          }, yb(a) {
            this.mb[a] = void 0;
            this.Ab.push(a);
          } });
          V.mb.push({ value: void 0 }, { value: null }, { value: true }, { value: false });
          V.tb = V.mb.length;
          A.count_emval_handles = function() {
            for (var a = 0, b = V.tb; b < V.mb.length; ++b)
              void 0 !== V.mb[b] && ++a;
            return a;
          };
          var Rc = [null, Ya, Za, lb, nb, ob, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, rc, sc, Dc, Ec, Fc, Gc, Hc, Jc], Tc = {
            b: function(a, b, c) {
              new ib(a).wb(b, c);
              jb = a;
              kb++;
              throw jb;
            },
            fa: function(a) {
              Sc(a, !D, 1, !na, 131072, false);
              P.Db();
            },
            D: function(a) {
              F ? postMessage({ cmd: "cleanupThread", thread: a }) : Ta(a);
            },
            W: mb,
            y: nb,
            la: ob,
            S: sb,
            U: tb,
            L: ub,
            ja: vb,
            aa: wb,
            ia: xb,
            F: yb,
            T: zb,
            Q: Ab,
            ka: Bb,
            R: Cb,
            I: function(a, b, c, d, f) {
              b = S(b);
              c = Lb(c);
              var g = -1 != b.indexOf("u");
              g && (f = (1n << 64n) - 1n);
              U(a, { name: b, fromWireType: function(k) {
                return k;
              }, toWireType: function(k, l) {
                if ("bigint" != typeof l && "number" != typeof l)
                  throw new TypeError(`Cannot convert "${Db(l)}" to ${this.name}`);
                if (l < d || l > f)
                  throw new TypeError(`Passing a number "${Db(l)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${f}]!`);
                return l;
              }, argPackAdvance: 8, readValueFromPointer: Kb(b, c, !g), sb: null });
            },
            ra: function(a, b, c, d, f) {
              var g = Lb(c);
              b = S(b);
              U(a, { name: b, fromWireType: function(k) {
                return !!k;
              }, toWireType: function(k, l) {
                return l ? d : f;
              }, argPackAdvance: 8, readValueFromPointer: function(k) {
                if (1 === c)
                  var l = e();
                else if (2 === c)
                  l = v();
                else if (4 === c)
                  l = w();
                else
                  throw new TypeError("Unknown boolean type size: " + b);
                return this.fromWireType(l[k >> g]);
              }, sb: null });
            },
            qa: function(a, b) {
              b = S(b);
              U(a, { name: b, fromWireType: function(c) {
                var d = W(c);
                Nb(c);
                return d;
              }, toWireType: function(c, d) {
                return X(d);
              }, argPackAdvance: 8, readValueFromPointer: Ob, sb: null });
            },
            H: function(a, b, c) {
              c = Lb(c);
              b = S(b);
              U(a, { name: b, fromWireType: function(d) {
                return d;
              }, toWireType: function(d, f) {
                return f;
              }, argPackAdvance: 8, readValueFromPointer: Pb(b, c), sb: null });
            },
            t: function(a, b, c, d, f) {
              b = S(b);
              -1 === f && (f = 4294967295);
              f = Lb(c);
              var g = (l) => l;
              if (0 === d) {
                var k = 32 - 8 * c;
                g = (l) => l << k >>> k;
              }
              c = b.includes("unsigned") ? function(l, q) {
                return q >>> 0;
              } : function(l, q) {
                return q;
              };
              U(a, { name: b, fromWireType: g, toWireType: c, argPackAdvance: 8, readValueFromPointer: Kb(b, f, 0 !== d), sb: null });
            },
            m: function(a, b, c) {
              function d(g) {
                g >>= 2;
                var k = z();
                return new f(k.buffer, k[g + 1], k[g]);
              }
              var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];
              c = S(c);
              U(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { Ib: true });
            },
            J: function(a, b) {
              b = S(b);
              var c = "std::string" === b;
              U(a, { name: b, fromWireType: function(d) {
                var f = z()[d >> 2], g = d + 4;
                if (c)
                  for (var k = g, l = 0; l <= f; ++l) {
                    var q = g + l;
                    if (l == f || 0 == t()[q]) {
                      k = Xa(k, q - k);
                      if (void 0 === r)
                        var r = k;
                      else
                        r += String.fromCharCode(0), r += k;
                      k = q + 1;
                    }
                  }
                else {
                  r = Array(f);
                  for (l = 0; l < f; ++l)
                    r[l] = String.fromCharCode(t()[g + l]);
                  r = r.join("");
                }
                Y(d);
                return r;
              }, toWireType: function(d, f) {
                f instanceof ArrayBuffer && (f = new Uint8Array(f));
                var g = "string" == typeof f;
                g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || T("Cannot pass non-string to std::string");
                var k = c && g ? pb(f) : f.length;
                var l = tc(4 + k + 1), q = l + 4;
                z()[l >> 2] = k;
                if (c && g)
                  rb(f, q, k + 1);
                else if (g)
                  for (g = 0; g < k; ++g) {
                    var r = f.charCodeAt(g);
                    255 < r && (Y(q), T("String has UTF-16 code units that do not fit in 8 bits"));
                    t()[q + g] = r;
                  }
                else
                  for (g = 0; g < k; ++g)
                    t()[q + g] = f[g];
                null !== d && d.push(Y, l);
                return l;
              }, argPackAdvance: 8, readValueFromPointer: Ob, sb: function(d) {
                Y(d);
              } });
            },
            A: function(a, b, c) {
              c = S(c);
              if (2 === b) {
                var d = Rb;
                var f = Sb;
                var g = Tb;
                var k = () => ca();
                var l = 1;
              } else
                4 === b && (d = Ub, f = Vb, g = Wb, k = () => z(), l = 2);
              U(a, {
                name: c,
                fromWireType: function(q) {
                  for (var r = z()[q >> 2], x = k(), B, N = q + 4, h = 0; h <= r; ++h) {
                    var u = q + 4 + h * b;
                    if (h == r || 0 == x[u >> l])
                      N = d(N, u - N), void 0 === B ? B = N : (B += String.fromCharCode(0), B += N), N = u + b;
                  }
                  Y(q);
                  return B;
                },
                toWireType: function(q, r) {
                  "string" != typeof r && T(`Cannot pass non-string to C++ string type ${c}`);
                  var x = g(r), B = tc(4 + x + b);
                  z()[B >> 2] = x >> l;
                  f(r, B + 4, x + b);
                  null !== q && q.push(Y, B);
                  return B;
                },
                argPackAdvance: 8,
                readValueFromPointer: Ob,
                sb: function(q) {
                  Y(q);
                }
              });
            },
            sa: function(a, b) {
              b = S(b);
              U(a, { Lb: true, name: b, argPackAdvance: 0, fromWireType: function() {
              }, toWireType: function() {
              } });
            },
            oa: () => true,
            O: function(a, b) {
              a == b ? setTimeout(() => cb()) : F ? postMessage({ targetThread: a, cmd: "checkMailbox" }) : (a = P.kb[a]) && a.postMessage({ cmd: "checkMailbox" });
            },
            da: function() {
              return -1;
            },
            ea: Yb,
            na: function(a) {
              E && P.kb[a].ref();
            },
            s: function(a, b, c) {
              a = W(a);
              b = $b(b, "emval::as");
              var d = [], f = X(d);
              z()[c >> 2] = f;
              return b.toWireType(d, a);
            },
            i: function(a, b, c, d, f) {
              a = dc[a];
              b = W(b);
              c = cc(c);
              var g = [];
              z()[d >> 2] = X(g);
              return a(b, c, g, f);
            },
            u: function(a, b, c, d) {
              a = dc[a];
              b = W(b);
              c = cc(c);
              a(b, c, null, d);
            },
            c: Nb,
            K: function(a, b) {
              a = W(a);
              b = W(b);
              return a == b;
            },
            o: function(a) {
              if (0 === a)
                return X(ec());
              a = cc(a);
              return X(ec()[a]);
            },
            h: function(a, b) {
              var c = gc(a, b), d = c[0];
              b = d.name + "_$" + c.slice(1).map(function(x) {
                return x.name;
              }).join("_") + "$";
              var f = ic[b];
              if (void 0 !== f)
                return f;
              f = ["retType"];
              for (var g = [d], k = "", l = 0; l < a - 1; ++l)
                k += (0 !== l ? ", " : "") + "arg" + l, f.push("argType" + l), g.push(c[1 + l]);
              var q = "return function " + hc("methodCaller_" + b) + "(handle, name, destructors, args) {\n", r = 0;
              for (l = 0; l < a - 1; ++l)
                q += "    var arg" + l + " = argType" + l + ".readValueFromPointer(args" + (r ? "+" + r : "") + ");\n", r += c[l + 1].argPackAdvance;
              q += "    var rv = handle[name](" + k + ");\n";
              for (l = 0; l < a - 1; ++l)
                c[l + 1].deleteObject && (q += "    argType" + l + ".deleteObject(arg" + l + ");\n");
              d.Lb || (q += "    return retType.toWireType(destructors, rv);\n");
              f.push(q + "};\n");
              a = kc(f).apply(null, g);
              f = fc(a);
              return ic[b] = f;
            },
            r: function(a, b) {
              a = W(a);
              b = W(b);
              return X(a[b]);
            },
            d: function(a) {
              4 < a && (V.get(a).Bb += 1);
            },
            x: function(a, b, c, d) {
              a = W(a);
              var f = mc[b];
              f || (f = lc(b), mc[b] = f);
              return f(a, c, d);
            },
            v: function() {
              return X([]);
            },
            l: function(a) {
              a = W(a);
              for (var b = Array(a.length), c = 0; c < a.length; c++)
                b[c] = a[c];
              return X(b);
            },
            e: function(a) {
              return X(cc(a));
            },
            k: function() {
              return X({});
            },
            g: function(a) {
              for (var b = W(a); b.length; ) {
                var c = b.pop();
                b.pop()(c);
              }
              Nb(a);
            },
            j: function(a, b, c) {
              a = W(a);
              b = W(b);
              c = W(c);
              a[b] = c;
            },
            f: function(a, b) {
              a = $b(a, "_emval_take_value");
              a = a.readValueFromPointer(b);
              return X(a);
            },
            Z: function(a, b) {
              a = nc(a);
              b = nc(b);
              a = new Date(1e3 * a);
              w()[b >> 2] = a.getUTCSeconds();
              w()[b + 4 >> 2] = a.getUTCMinutes();
              w()[b + 8 >> 2] = a.getUTCHours();
              w()[b + 12 >> 2] = a.getUTCDate();
              w()[b + 16 >> 2] = a.getUTCMonth();
              w()[b + 20 >> 2] = a.getUTCFullYear() - 1900;
              w()[b + 24 >> 2] = a.getUTCDay();
              a = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
              w()[b + 28 >> 2] = a;
            },
            _: function(a, b) {
              a = nc(a);
              b = nc(b);
              a = new Date(1e3 * a);
              w()[b >> 2] = a.getSeconds();
              w()[b + 4 >> 2] = a.getMinutes();
              w()[b + 8 >> 2] = a.getHours();
              w()[b + 12 >> 2] = a.getDate();
              w()[b + 16 >> 2] = a.getMonth();
              w()[b + 20 >> 2] = a.getFullYear() - 1900;
              w()[b + 24 >> 2] = a.getDay();
              var c = (Z(a.getFullYear()) ? oc : pc)[a.getMonth()] + a.getDate() - 1 | 0;
              w()[b + 28 >> 2] = c;
              w()[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
              c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
              var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
              a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
              w()[b + 32 >> 2] = a;
            },
            $: function(a) {
              a = nc(a);
              var b = new Date(w()[a + 20 >> 2] + 1900, w()[a + 16 >> 2], w()[a + 12 >> 2], w()[a + 8 >> 2], w()[a + 4 >> 2], w()[a >> 2], 0), c = w()[a + 32 >> 2], d = b.getTimezoneOffset(), f = new Date(
                b.getFullYear(),
                6,
                1
              ).getTimezoneOffset(), g = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), k = Math.min(g, f);
              0 > c ? w()[a + 32 >> 2] = Number(f != g && k == d) : 0 < c != (k == d) && (f = Math.max(g, f), b.setTime(b.getTime() + 6e4 * ((0 < c ? k : f) - d)));
              w()[a + 24 >> 2] = b.getDay();
              c = (Z(b.getFullYear()) ? oc : pc)[b.getMonth()] + b.getDate() - 1 | 0;
              w()[a + 28 >> 2] = c;
              w()[a >> 2] = b.getSeconds();
              w()[a + 4 >> 2] = b.getMinutes();
              w()[a + 8 >> 2] = b.getHours();
              w()[a + 12 >> 2] = b.getDate();
              w()[a + 16 >> 2] = b.getMonth();
              w()[a + 20 >> 2] = b.getYear();
              return BigInt(b.getTime() / 1e3);
            },
            X: rc,
            Y: sc,
            N: (a, b, c) => {
              function d(r) {
                return (r = r.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? r[1] : "GMT";
              }
              var f = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(f, 0, 1), k = new Date(f, 6, 1);
              f = g.getTimezoneOffset();
              var l = k.getTimezoneOffset(), q = Math.max(f, l);
              z()[a >> 2] = 60 * q;
              w()[b >> 2] = Number(f != l);
              a = d(g);
              b = d(k);
              a = uc(a);
              b = uc(b);
              l < f ? (z()[c >> 2] = a, z()[c + 4 >> 2] = b) : (z()[c >> 2] = b, z()[c + 4 >> 2] = a);
            },
            n: () => {
              wa("");
            },
            E: function() {
            },
            G: function() {
              return Date.now();
            },
            ma: () => {
              Ga += 1;
              throw "unwind";
            },
            P: () => 2147483648,
            q: () => performance.timeOrigin + performance.now(),
            w: function() {
              return E ? (init_os(), __toCommonJS(os_exports)).cpus().length : navigator.hardwareConcurrency;
            },
            ca: function(a, b, c, d) {
              P.$b = b;
              c /= 2;
              zc.length = c;
              b = d >> 3;
              for (d = 0; d < c; d++)
                zc[d] = L[b + 2 * d] ? L[b + 2 * d + 1] : ha()[b + 2 * d + 1];
              return Rc[a].apply(null, zc);
            },
            M: (a) => {
              var b = t().length;
              a >>>= 0;
              if (a <= b || 2147483648 < a)
                return false;
              for (var c = 1; 4 >= c; c *= 2) {
                var d = b * (1 + 0.2 / c);
                d = Math.min(d, a + 100663296);
                var f = Math;
                d = Math.max(a, d);
                a: {
                  f = f.min.call(f, 2147483648, d + (65536 - d % 65536) % 65536) - m.buffer.byteLength + 65535 >>> 16;
                  try {
                    m.grow(f);
                    p();
                    var g = 1;
                    break a;
                  } catch (k) {
                  }
                  g = void 0;
                }
                if (g)
                  return true;
              }
              return false;
            },
            ga: Dc,
            ha: Ec,
            V: $a,
            z: Fc,
            C: Gc,
            ba: Hc,
            B: Jc,
            a: m || A.wasmMemory,
            pa: Oc,
            p: (a, b, c, d) => Oc(a, b, c, d)
          };
          (function() {
            function a(c, d) {
              J = c = c.exports;
              P.Eb.push(J.Ya);
              Ca = J.$a;
              Ea.unshift(J.ta);
              xa = d;
              La();
              return c;
            }
            var b = { a: Tc };
            Ka();
            if (A.instantiateWasm)
              try {
                return A.instantiateWasm(b, a);
              } catch (c) {
                H("Module.instantiateWasm callback failed with error: " + c), ka(c);
              }
            Qa(b, function(c) {
              a(c.instance, c.module);
            }).catch(ka);
            return {};
          })();
          A._OrtInit = (a, b) => (A._OrtInit = J.ua)(a, b);
          A._OrtGetLastError = (a, b) => (A._OrtGetLastError = J.va)(a, b);
          A._OrtCreateSessionOptions = (a, b, c, d, f, g, k, l, q, r) => (A._OrtCreateSessionOptions = J.wa)(a, b, c, d, f, g, k, l, q, r);
          A._OrtAppendExecutionProvider = (a, b) => (A._OrtAppendExecutionProvider = J.xa)(a, b);
          A._OrtAddFreeDimensionOverride = (a, b, c) => (A._OrtAddFreeDimensionOverride = J.ya)(a, b, c);
          A._OrtAddSessionConfigEntry = (a, b, c) => (A._OrtAddSessionConfigEntry = J.za)(a, b, c);
          A._OrtReleaseSessionOptions = (a) => (A._OrtReleaseSessionOptions = J.Aa)(a);
          A._OrtCreateSession = (a, b, c) => (A._OrtCreateSession = J.Ba)(a, b, c);
          A._OrtReleaseSession = (a) => (A._OrtReleaseSession = J.Ca)(a);
          A._OrtGetInputOutputCount = (a, b, c) => (A._OrtGetInputOutputCount = J.Da)(a, b, c);
          A._OrtGetInputName = (a, b) => (A._OrtGetInputName = J.Ea)(a, b);
          A._OrtGetOutputName = (a, b) => (A._OrtGetOutputName = J.Fa)(a, b);
          A._OrtFree = (a) => (A._OrtFree = J.Ga)(a);
          A._OrtCreateTensor = (a, b, c, d, f, g) => (A._OrtCreateTensor = J.Ha)(a, b, c, d, f, g);
          A._OrtGetTensorData = (a, b, c, d, f) => (A._OrtGetTensorData = J.Ia)(a, b, c, d, f);
          A._OrtReleaseTensor = (a) => (A._OrtReleaseTensor = J.Ja)(a);
          A._OrtCreateRunOptions = (a, b, c, d) => (A._OrtCreateRunOptions = J.Ka)(a, b, c, d);
          A._OrtAddRunConfigEntry = (a, b, c) => (A._OrtAddRunConfigEntry = J.La)(a, b, c);
          A._OrtReleaseRunOptions = (a) => (A._OrtReleaseRunOptions = J.Ma)(a);
          A._OrtCreateBinding = (a) => (A._OrtCreateBinding = J.Na)(a);
          A._OrtBindInput = (a, b, c) => (A._OrtBindInput = J.Oa)(a, b, c);
          A._OrtBindOutput = (a, b, c, d) => (A._OrtBindOutput = J.Pa)(a, b, c, d);
          A._OrtClearBoundOutputs = (a) => (A._OrtClearBoundOutputs = J.Qa)(a);
          A._OrtReleaseBinding = (a) => (A._OrtReleaseBinding = J.Ra)(a);
          A._OrtRunWithBinding = (a, b, c, d, f) => (A._OrtRunWithBinding = J.Sa)(a, b, c, d, f);
          A._OrtRun = (a, b, c, d, f, g, k, l) => (A._OrtRun = J.Ta)(a, b, c, d, f, g, k, l);
          A._OrtEndProfiling = (a) => (A._OrtEndProfiling = J.Ua)(a);
          var bb = A._pthread_self = () => (bb = A._pthread_self = J.Va)(), tc = A._malloc = (a) => (tc = A._malloc = J.Wa)(a), Y = A._free = (a) => (Y = A._free = J.Xa)(a);
          A.__emscripten_tls_init = () => (A.__emscripten_tls_init = J.Ya)();
          var ac = (a) => (ac = J.Za)(a);
          A.__embind_initialize_bindings = () => (A.__embind_initialize_bindings = J._a)();
          var Sc = A.__emscripten_thread_init = (a, b, c, d, f, g) => (Sc = A.__emscripten_thread_init = J.ab)(a, b, c, d, f, g);
          A.__emscripten_thread_crashed = () => (A.__emscripten_thread_crashed = J.bb)();
          var yc = (a, b, c, d) => (yc = J.cb)(a, b, c, d), ab = (a) => (ab = J.db)(a), hb = A.__emscripten_thread_exit = (a) => (hb = A.__emscripten_thread_exit = J.eb)(a), Zb = A.__emscripten_check_mailbox = () => (Zb = A.__emscripten_check_mailbox = J.fb)(), eb = (a, b) => (eb = J.gb)(a, b), vc = () => (vc = J.hb)(), fb = (a) => (fb = J.ib)(a), xc = (a) => (xc = J.jb)(a);
          A.keepRuntimeAlive = Ha;
          A.wasmMemory = m;
          A.stackAlloc = xc;
          A.stackSave = vc;
          A.stackRestore = fb;
          A.UTF8ToString = Xa;
          A.stringToUTF8 = rb;
          A.lengthBytesUTF8 = pb;
          A.ExitStatus = Ra;
          A.PThread = P;
          var Uc;
          Ja = function Vc() {
            Uc || Wc();
            Uc || (Ja = Vc);
          };
          function Wc() {
            function a() {
              if (!Uc && (Uc = true, A.calledRun = true, !ya)) {
                F || db(Ea);
                ja(A);
                if (A.onRuntimeInitialized)
                  A.onRuntimeInitialized();
                if (!F) {
                  if (A.postRun)
                    for ("function" == typeof A.postRun && (A.postRun = [A.postRun]); A.postRun.length; ) {
                      var b = A.postRun.shift();
                      Fa.unshift(b);
                    }
                  db(Fa);
                }
              }
            }
            if (!(0 < M))
              if (F)
                ja(A), F || db(Ea), startWorker(A);
              else {
                if (A.preRun)
                  for ("function" == typeof A.preRun && (A.preRun = [A.preRun]); A.preRun.length; )
                    Da.unshift(A.preRun.shift());
                db(Da);
                0 < M || (A.setStatus ? (A.setStatus("Running..."), setTimeout(function() {
                  setTimeout(
                    function() {
                      A.setStatus("");
                    },
                    1
                  );
                  a();
                }, 1)) : a());
              }
          }
          if (A.preInit)
            for ("function" == typeof A.preInit && (A.preInit = [A.preInit]); 0 < A.preInit.length; )
              A.preInit.pop()();
          Wc();
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
      module.exports = '"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:f=>(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f),postMessage:msg=>parentPort.postMessage(msg),performance:global.performance||{now:Date.now}})}var initializedJS=false;function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"\\n");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var module=Module["wasmModule"];Module["wasmModule"]=null;var instance=new WebAssembly.Instance(module,info);return receiveInstance(instance)};self.onunhandledrejection=e=>{throw e.reason??e};function handleMessage(e){try{if(e.data.cmd==="load"){let messageQueue=[];self.onmessage=e=>messageQueue.push(e);self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"});for(let msg of messageQueue){handleMessage(msg)}self.onmessage=handleMessage};Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=(...args)=>{postMessage({cmd:"callHandler",handler:handler,args:args})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,/*isMainBrowserThread=*/0,/*isMainRuntimeThread=*/0,/*canBlock=*/1);Module["__emscripten_thread_mailbox_await"](e.data.pthread_ptr);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){Module["__embind_initialize_bindings"]();initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){throw ex}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="checkMailbox"){if(initializedJS){Module["checkMailbox"]()}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}}self.onmessage=handleMessage;\n';
    }
  });

  // web/lib/wasm/wasm-factory.ts
  var ortWasmFactory, ortWasmFactoryThreaded, wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, getWasmFileName, initializeWebAssembly, getInstance;
  var init_wasm_factory = __esm({
    "web/lib/wasm/wasm-factory.ts"() {
      "use strict";
      init_node_path();
      ortWasmFactory = true ? require_ort_wasm() : null;
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
        if (useThreads) {
          return useSimd ? "ort-wasm-simd-threaded.wasm" : "ort-wasm-threaded.wasm";
        } else {
          return useSimd ? "ort-wasm-simd.wasm" : "ort-wasm.wasm";
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
      module.exports = '/*!\n * ONNX Runtime Web v1.17.0\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Licensed under the MIT License.\n */\n"use strict";\n(() => {\n  var __defProp = Object.defineProperty;\n  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;\n  var __getOwnPropNames = Object.getOwnPropertyNames;\n  var __hasOwnProp = Object.prototype.hasOwnProperty;\n  var __esm = (fn, res) => function __init() {\n    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;\n  };\n  var __commonJS = (cb, mod) => function __require() {\n    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;\n  };\n  var __export = (target, all) => {\n    for (var name in all)\n      __defProp(target, name, { get: all[name], enumerable: true });\n  };\n  var __copyProps = (to, from, except, desc) => {\n    if (from && typeof from === "object" || typeof from === "function") {\n      for (let key of __getOwnPropNames(from))\n        if (!__hasOwnProp.call(to, key) && key !== except)\n          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n    }\n    return to;\n  };\n  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);\n\n  // nodejs-ignore:fs\n  var fs_exports = {};\n  __export(fs_exports, {\n    readFile: () => readFile\n  });\n  var readFile;\n  var init_fs = __esm({\n    "nodejs-ignore:fs"() {\n      readFile = void 0;\n    }\n  });\n\n  // nodejs-ignore:path\n  var path_exports = {};\n  __export(path_exports, {\n    join: () => join2\n  });\n  var join2;\n  var init_path = __esm({\n    "nodejs-ignore:path"() {\n      join2 = void 0;\n    }\n  });\n\n  // web/lib/wasm/binding/ort-wasm.js\n  var require_ort_wasm = __commonJS({\n    "web/lib/wasm/binding/ort-wasm.js"(exports, module) {\n      "use strict";\n      var ortWasm = (() => {\n        var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;\n        if (typeof __filename !== "undefined")\n          _scriptDir = _scriptDir || __filename;\n        return function(moduleArg = {}) {\n          var f = moduleArg, aa, m;\n          f.ready = new Promise((a, b) => {\n            aa = a;\n            m = b;\n          });\n          var ba = Object.assign({}, f), ca = "./this.program", da = "object" == typeof window, q = "function" == typeof importScripts, ea = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, t = "", fa, w, x;\n          if (ea) {\n            var fs = (init_fs(), __toCommonJS(fs_exports)), ha = (init_path(), __toCommonJS(path_exports));\n            t = q ? ha.dirname(t) + "/" : __dirname + "/";\n            fa = (a, b) => {\n              a = a.startsWith("file://") ? new URL(a) : ha.normalize(a);\n              return fs.readFileSync(a, b ? void 0 : "utf8");\n            };\n            x = (a) => {\n              a = fa(a, true);\n              a.buffer || (a = new Uint8Array(a));\n              return a;\n            };\n            w = (a, b, c, d = true) => {\n              a = a.startsWith("file://") ? new URL(a) : ha.normalize(a);\n              fs.readFile(a, d ? void 0 : "utf8", (e, h) => {\n                e ? c(e) : b(d ? h.buffer : h);\n              });\n            };\n            !f.thisProgram && 1 < process.argv.length && (ca = process.argv[1].replace(/\\\\/g, "/"));\n            process.argv.slice(2);\n            f.inspect = () => "[Emscripten Module object]";\n          } else if (da || q)\n            q ? t = self.location.href : "undefined" != typeof document && document.currentScript && (t = document.currentScript.src), _scriptDir && (t = _scriptDir), 0 !== t.indexOf("blob:") ? t = t.substr(0, t.replace(/[?#].*/, "").lastIndexOf("/") + 1) : t = "", fa = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.send(null);\n              return b.responseText;\n            }, q && (x = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.responseType = "arraybuffer";\n              b.send(null);\n              return new Uint8Array(b.response);\n            }), w = (a, b, c) => {\n              var d = new XMLHttpRequest();\n              d.open("GET", a, true);\n              d.responseType = "arraybuffer";\n              d.onload = () => {\n                200 == d.status || 0 == d.status && d.response ? b(d.response) : c();\n              };\n              d.onerror = c;\n              d.send(null);\n            };\n          var ia = f.print || console.log.bind(console), z = f.printErr || console.error.bind(console);\n          Object.assign(f, ba);\n          ba = null;\n          f.thisProgram && (ca = f.thisProgram);\n          var A;\n          f.wasmBinary && (A = f.wasmBinary);\n          var noExitRuntime = f.noExitRuntime || true;\n          "object" != typeof WebAssembly && ja("no native wasm support detected");\n          var B, C, ka = false, D, E, G, H, J, K, la, ma, na, oa;\n          function pa() {\n            var a = B.buffer;\n            f.HEAP8 = D = new Int8Array(a);\n            f.HEAP16 = G = new Int16Array(a);\n            f.HEAP32 = J = new Int32Array(a);\n            f.HEAPU8 = E = new Uint8Array(a);\n            f.HEAPU16 = H = new Uint16Array(a);\n            f.HEAPU32 = K = new Uint32Array(a);\n            f.HEAPF32 = la = new Float32Array(a);\n            f.HEAPF64 = oa = new Float64Array(a);\n            f.HEAP64 = ma = new BigInt64Array(a);\n            f.HEAPU64 = na = new BigUint64Array(a);\n          }\n          var qa = [], ra = [], sa = [];\n          function ta() {\n            var a = f.preRun.shift();\n            qa.unshift(a);\n          }\n          var L = 0, ua = null, M = null;\n          function ja(a) {\n            if (f.onAbort)\n              f.onAbort(a);\n            a = "Aborted(" + a + ")";\n            z(a);\n            ka = true;\n            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");\n            m(a);\n            throw a;\n          }\n          function va(a) {\n            return a.startsWith("data:application/octet-stream;base64,");\n          }\n          var N;\n          N = "ort-wasm.wasm";\n          if (!va(N)) {\n            var wa = N;\n            N = f.locateFile ? f.locateFile(wa, t) : t + wa;\n          }\n          function xa(a) {\n            if (a == N && A)\n              return new Uint8Array(A);\n            if (x)\n              return x(a);\n            throw "both async and sync fetching of the wasm failed";\n          }\n          function ya(a) {\n            if (!A && (da || q)) {\n              if ("function" == typeof fetch && !a.startsWith("file://"))\n                return fetch(a, { credentials: "same-origin" }).then((b) => {\n                  if (!b.ok)\n                    throw "failed to load wasm binary file at \'" + a + "\'";\n                  return b.arrayBuffer();\n                }).catch(() => xa(a));\n              if (w)\n                return new Promise((b, c) => {\n                  w(a, (d) => b(new Uint8Array(d)), c);\n                });\n            }\n            return Promise.resolve().then(() => xa(a));\n          }\n          function za(a, b, c) {\n            return ya(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {\n              z("failed to asynchronously prepare wasm: " + d);\n              ja(d);\n            });\n          }\n          function Aa(a, b) {\n            var c = N;\n            return A || "function" != typeof WebAssembly.instantiateStreaming || va(c) || c.startsWith("file://") || ea || "function" != typeof fetch ? za(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {\n              z("wasm streaming compile failed: " + e);\n              z("falling back to ArrayBuffer instantiation");\n              return za(c, a, b);\n            }));\n          }\n          var Ba = (a) => {\n            for (; 0 < a.length; )\n              a.shift()(f);\n          };\n          function Ca(a) {\n            this.Va = a - 24;\n            this.fb = function(b) {\n              K[this.Va + 4 >> 2] = b;\n            };\n            this.eb = function(b) {\n              K[this.Va + 8 >> 2] = b;\n            };\n            this.Za = function(b, c) {\n              this.$a();\n              this.fb(b);\n              this.eb(c);\n            };\n            this.$a = function() {\n              K[this.Va + 16 >> 2] = 0;\n            };\n          }\n          var Da = 0, Ea = 0, Fa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, O = (a, b, c) => {\n            var d = b + c;\n            for (c = b; a[c] && !(c >= d); )\n              ++c;\n            if (16 < c - b && a.buffer && Fa)\n              return Fa.decode(a.subarray(b, c));\n            for (d = ""; b < c; ) {\n              var e = a[b++];\n              if (e & 128) {\n                var h = a[b++] & 63;\n                if (192 == (e & 224))\n                  d += String.fromCharCode((e & 31) << 6 | h);\n                else {\n                  var l = a[b++] & 63;\n                  e = 224 == (e & 240) ? (e & 15) << 12 | h << 6 | l : (e & 7) << 18 | h << 12 | l << 6 | a[b++] & 63;\n                  65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));\n                }\n              } else\n                d += String.fromCharCode(e);\n            }\n            return d;\n          }, P = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var d = a.charCodeAt(c);\n              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;\n            }\n            return b;\n          }, Q = (a, b, c, d) => {\n            if (!(0 < d))\n              return 0;\n            var e = c;\n            d = c + d - 1;\n            for (var h = 0; h < a.length; ++h) {\n              var l = a.charCodeAt(h);\n              if (55296 <= l && 57343 >= l) {\n                var k = a.charCodeAt(++h);\n                l = 65536 + ((l & 1023) << 10) | k & 1023;\n              }\n              if (127 >= l) {\n                if (c >= d)\n                  break;\n                b[c++] = l;\n              } else {\n                if (2047 >= l) {\n                  if (c + 1 >= d)\n                    break;\n                  b[c++] = 192 | l >> 6;\n                } else {\n                  if (65535 >= l) {\n                    if (c + 2 >= d)\n                      break;\n                    b[c++] = 224 | l >> 12;\n                  } else {\n                    if (c + 3 >= d)\n                      break;\n                    b[c++] = 240 | l >> 18;\n                    b[c++] = 128 | l >> 12 & 63;\n                  }\n                  b[c++] = 128 | l >> 6 & 63;\n                }\n                b[c++] = 128 | l & 63;\n              }\n            }\n            b[c] = 0;\n            return c - e;\n          };\n          function Ga(a) {\n            if (null === a)\n              return "null";\n            var b = typeof a;\n            return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;\n          }\n          var Ha = void 0;\n          function R(a) {\n            for (var b = ""; E[a]; )\n              b += Ha[E[a++]];\n            return b;\n          }\n          var Ia = {}, Ja = {}, Ka = {}, La = void 0;\n          function S(a) {\n            throw new La(a);\n          }\n          function Ma(a, b, c = {}) {\n            var d = b.name;\n            a || S(`type "${d}" must have a positive integer typeid pointer`);\n            if (Ja.hasOwnProperty(a)) {\n              if (c.gb)\n                return;\n              S(`Cannot register type \'${d}\' twice`);\n            }\n            Ja[a] = b;\n            delete Ka[a];\n            Ia.hasOwnProperty(a) && (b = Ia[a], delete Ia[a], b.forEach((e) => e()));\n          }\n          function T(a, b, c = {}) {\n            if (!("argPackAdvance" in b))\n              throw new TypeError("registerType registeredInstance requires argPackAdvance");\n            Ma(a, b, c);\n          }\n          function Na(a, b, c) {\n            switch (b) {\n              case 0:\n                return c ? function(d) {\n                  return D[d];\n                } : function(d) {\n                  return E[d];\n                };\n              case 1:\n                return c ? function(d) {\n                  return G[d >> 1];\n                } : function(d) {\n                  return H[d >> 1];\n                };\n              case 2:\n                return c ? function(d) {\n                  return J[d >> 2];\n                } : function(d) {\n                  return K[d >> 2];\n                };\n              case 3:\n                return c ? function(d) {\n                  return ma[d >> 3];\n                } : function(d) {\n                  return na[d >> 3];\n                };\n              default:\n                throw new TypeError("Unknown integer type: " + a);\n            }\n          }\n          function Oa(a) {\n            switch (a) {\n              case 1:\n                return 0;\n              case 2:\n                return 1;\n              case 4:\n                return 2;\n              case 8:\n                return 3;\n              default:\n                throw new TypeError(`Unknown type size: ${a}`);\n            }\n          }\n          function Pa() {\n            this.Sa = [void 0];\n            this.bb = [];\n          }\n          var U = new Pa();\n          function Qa(a) {\n            a >= U.Va && 0 === --U.get(a).cb && U.$a(a);\n          }\n          var V = (a) => {\n            a || S("Cannot use deleted val. handle = " + a);\n            return U.get(a).value;\n          }, W = (a) => {\n            switch (a) {\n              case void 0:\n                return 1;\n              case null:\n                return 2;\n              case true:\n                return 3;\n              case false:\n                return 4;\n              default:\n                return U.Za({ cb: 1, value: a });\n            }\n          };\n          function Ra(a) {\n            return this.fromWireType(J[a >> 2]);\n          }\n          function Sa(a, b) {\n            switch (b) {\n              case 2:\n                return function(c) {\n                  return this.fromWireType(la[c >> 2]);\n                };\n              case 3:\n                return function(c) {\n                  return this.fromWireType(oa[c >> 3]);\n                };\n              default:\n                throw new TypeError("Unknown float type: " + a);\n            }\n          }\n          var Ta = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Ua = (a, b) => {\n            var c = a >> 1;\n            for (var d = c + b / 2; !(c >= d) && H[c]; )\n              ++c;\n            c <<= 1;\n            if (32 < c - a && Ta)\n              return Ta.decode(E.subarray(a, c));\n            c = "";\n            for (d = 0; !(d >= b / 2); ++d) {\n              var e = G[a + 2 * d >> 1];\n              if (0 == e)\n                break;\n              c += String.fromCharCode(e);\n            }\n            return c;\n          }, Va = (a, b, c) => {\n            void 0 === c && (c = 2147483647);\n            if (2 > c)\n              return 0;\n            c -= 2;\n            var d = b;\n            c = c < 2 * a.length ? c / 2 : a.length;\n            for (var e = 0; e < c; ++e)\n              G[b >> 1] = a.charCodeAt(e), b += 2;\n            G[b >> 1] = 0;\n            return b - d;\n          }, Wa = (a) => 2 * a.length, Xa = (a, b) => {\n            for (var c = 0, d = ""; !(c >= b / 4); ) {\n              var e = J[a + 4 * c >> 2];\n              if (0 == e)\n                break;\n              ++c;\n              65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);\n            }\n            return d;\n          }, Ya = (a, b, c) => {\n            void 0 === c && (c = 2147483647);\n            if (4 > c)\n              return 0;\n            var d = b;\n            c = d + c - 4;\n            for (var e = 0; e < a.length; ++e) {\n              var h = a.charCodeAt(e);\n              if (55296 <= h && 57343 >= h) {\n                var l = a.charCodeAt(++e);\n                h = 65536 + ((h & 1023) << 10) | l & 1023;\n              }\n              J[b >> 2] = h;\n              b += 4;\n              if (b + 4 > c)\n                break;\n            }\n            J[b >> 2] = 0;\n            return b - d;\n          }, Za = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var d = a.charCodeAt(c);\n              55296 <= d && 57343 >= d && ++c;\n              b += 4;\n            }\n            return b;\n          };\n          function $a(a, b) {\n            var c = Ja[a];\n            if (void 0 === c) {\n              a = ab(a);\n              var d = R(a);\n              X(a);\n              S(b + " has unknown type " + d);\n            }\n            return c;\n          }\n          var bb = {};\n          function cb(a) {\n            var b = bb[a];\n            return void 0 === b ? R(a) : b;\n          }\n          var eb = [];\n          function fb() {\n            return "object" == typeof globalThis ? globalThis : Function("return this")();\n          }\n          function gb(a) {\n            var b = eb.length;\n            eb.push(a);\n            return b;\n          }\n          function hb(a, b) {\n            for (var c = Array(a), d = 0; d < a; ++d)\n              c[d] = $a(K[b + 4 * d >> 2], "parameter " + d);\n            return c;\n          }\n          function ib(a) {\n            if (void 0 === a)\n              return "_unknown";\n            a = a.replace(/[^a-zA-Z0-9_]/g, "$");\n            var b = a.charCodeAt(0);\n            return 48 <= b && 57 >= b ? `_${a}` : a;\n          }\n          var jb = [];\n          function kb(a, b) {\n            a = ib(a);\n            return { [a]: function() {\n              return b.apply(this, arguments);\n            } }[a];\n          }\n          function lb(a) {\n            var b = Function;\n            if (!(b instanceof Function))\n              throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);\n            var c = kb(b.name || "unknownFunctionName", function() {\n            });\n            c.prototype = b.prototype;\n            c = new c();\n            a = b.apply(c, a);\n            return a instanceof Object ? a : c;\n          }\n          function mb(a) {\n            for (var b = "", c = 0; c < a; ++c)\n              b += (0 !== c ? ", " : "") + "arg" + c;\n            var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\\n  var HEAPU32 = getMemory();\\n";\n            for (c = 0; c < a; ++c)\n              d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>2)], \'parameter " + c + "\');\\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\\nargs += argType" + c + "[\'argPackAdvance\'];\\nargTypes += 4;\\n";\n            return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\\nreturn valueToHandle(obj);\\n}\\n"))($a, f, W, () => K);\n          }\n          var nb = {};\n          function Y(a) {\n            return -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);\n          }\n          var Z = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), ob = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], pb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], rb = (a) => {\n            var b = P(a) + 1, c = qb(b);\n            c && Q(a, E, c, b);\n            return c;\n          }, sb = {}, ub = () => {\n            if (!tb) {\n              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: ca || "./this.program" }, b;\n              for (b in sb)\n                void 0 === sb[b] ? delete a[b] : a[b] = sb[b];\n              var c = [];\n              for (b in a)\n                c.push(`${b}=${a[b]}`);\n              tb = c;\n            }\n            return tb;\n          }, tb, vb = [null, [], []], wb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], xb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];\n          function yb(a) {\n            var b = Array(P(a) + 1);\n            Q(a, b, 0, b.length);\n            return b;\n          }\n          for (var zb = (a, b, c, d) => {\n            function e(g, r, u) {\n              for (g = "number" == typeof g ? g.toString() : g || ""; g.length < r; )\n                g = u[0] + g;\n              return g;\n            }\n            function h(g, r) {\n              return e(g, r, "0");\n            }\n            function l(g, r) {\n              function u(db) {\n                return 0 > db ? -1 : 0 < db ? 1 : 0;\n              }\n              var I;\n              0 === (I = u(g.getFullYear() - r.getFullYear())) && 0 === (I = u(g.getMonth() - r.getMonth())) && (I = u(g.getDate() - r.getDate()));\n              return I;\n            }\n            function k(g) {\n              switch (g.getDay()) {\n                case 0:\n                  return new Date(g.getFullYear() - 1, 11, 29);\n                case 1:\n                  return g;\n                case 2:\n                  return new Date(g.getFullYear(), 0, 3);\n                case 3:\n                  return new Date(\n                    g.getFullYear(),\n                    0,\n                    2\n                  );\n                case 4:\n                  return new Date(g.getFullYear(), 0, 1);\n                case 5:\n                  return new Date(g.getFullYear() - 1, 11, 31);\n                case 6:\n                  return new Date(g.getFullYear() - 1, 11, 30);\n              }\n            }\n            function n(g) {\n              var r = g.Ta;\n              for (g = new Date(new Date(g.Ua + 1900, 0, 1).getTime()); 0 < r; ) {\n                var u = g.getMonth(), I = (Z(g.getFullYear()) ? wb : xb)[u];\n                if (r > I - g.getDate())\n                  r -= I - g.getDate() + 1, g.setDate(1), 11 > u ? g.setMonth(u + 1) : (g.setMonth(0), g.setFullYear(g.getFullYear() + 1));\n                else {\n                  g.setDate(g.getDate() + r);\n                  break;\n                }\n              }\n              u = new Date(g.getFullYear() + 1, 0, 4);\n              r = k(new Date(\n                g.getFullYear(),\n                0,\n                4\n              ));\n              u = k(u);\n              return 0 >= l(r, g) ? 0 >= l(u, g) ? g.getFullYear() + 1 : g.getFullYear() : g.getFullYear() - 1;\n            }\n            var p = J[d + 40 >> 2];\n            d = { kb: J[d >> 2], jb: J[d + 4 >> 2], Xa: J[d + 8 >> 2], ab: J[d + 12 >> 2], Ya: J[d + 16 >> 2], Ua: J[d + 20 >> 2], Oa: J[d + 24 >> 2], Ta: J[d + 28 >> 2], mb: J[d + 32 >> 2], ib: J[d + 36 >> 2], lb: p ? p ? O(E, p) : "" : "" };\n            c = c ? O(E, c) : "";\n            p = {\n              "%c": "%a %b %d %H:%M:%S %Y",\n              "%D": "%m/%d/%y",\n              "%F": "%Y-%m-%d",\n              "%h": "%b",\n              "%r": "%I:%M:%S %p",\n              "%R": "%H:%M",\n              "%T": "%H:%M:%S",\n              "%x": "%m/%d/%y",\n              "%X": "%H:%M:%S",\n              "%Ec": "%c",\n              "%EC": "%C",\n              "%Ex": "%m/%d/%y",\n              "%EX": "%H:%M:%S",\n              "%Ey": "%y",\n              "%EY": "%Y",\n              "%Od": "%d",\n              "%Oe": "%e",\n              "%OH": "%H",\n              "%OI": "%I",\n              "%Om": "%m",\n              "%OM": "%M",\n              "%OS": "%S",\n              "%Ou": "%u",\n              "%OU": "%U",\n              "%OV": "%V",\n              "%Ow": "%w",\n              "%OW": "%W",\n              "%Oy": "%y"\n            };\n            for (var v in p)\n              c = c.replace(new RegExp(v, "g"), p[v]);\n            var y = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), F = "January February March April May June July August September October November December".split(" ");\n            p = { "%a": (g) => y[g.Oa].substring(0, 3), "%A": (g) => y[g.Oa], "%b": (g) => F[g.Ya].substring(0, 3), "%B": (g) => F[g.Ya], "%C": (g) => h((g.Ua + 1900) / 100 | 0, 2), "%d": (g) => h(g.ab, 2), "%e": (g) => e(g.ab, 2, " "), "%g": (g) => n(g).toString().substring(2), "%G": (g) => n(g), "%H": (g) => h(g.Xa, 2), "%I": (g) => {\n              g = g.Xa;\n              0 == g ? g = 12 : 12 < g && (g -= 12);\n              return h(g, 2);\n            }, "%j": (g) => {\n              for (var r = 0, u = 0; u <= g.Ya - 1; r += (Z(g.Ua + 1900) ? wb : xb)[u++])\n                ;\n              return h(g.ab + r, 3);\n            }, "%m": (g) => h(g.Ya + 1, 2), "%M": (g) => h(g.jb, 2), "%n": () => "\\n", "%p": (g) => 0 <= g.Xa && 12 > g.Xa ? "AM" : "PM", "%S": (g) => h(g.kb, 2), "%t": () => "	", "%u": (g) => g.Oa || 7, "%U": (g) => h(Math.floor((g.Ta + 7 - g.Oa) / 7), 2), "%V": (g) => {\n              var r = Math.floor((g.Ta + 7 - (g.Oa + 6) % 7) / 7);\n              2 >= (g.Oa + 371 - g.Ta - 2) % 7 && r++;\n              if (r)\n                53 == r && (u = (g.Oa + 371 - g.Ta) % 7, 4 == u || 3 == u && Z(g.Ua) || (r = 1));\n              else {\n                r = 52;\n                var u = (g.Oa + 7 - g.Ta - 1) % 7;\n                (4 == u || 5 == u && Z(g.Ua % 400 - 1)) && r++;\n              }\n              return h(r, 2);\n            }, "%w": (g) => g.Oa, "%W": (g) => h(Math.floor((g.Ta + 7 - (g.Oa + 6) % 7) / 7), 2), "%y": (g) => (g.Ua + 1900).toString().substring(2), "%Y": (g) => g.Ua + 1900, "%z": (g) => {\n              g = g.ib;\n              var r = 0 <= g;\n              g = Math.abs(g) / 60;\n              return (r ? "+" : "-") + String("0000" + (g / 60 * 100 + g % 60)).slice(-4);\n            }, "%Z": (g) => g.lb, "%%": () => "%" };\n            c = c.replace(/%%/g, "\\0\\0");\n            for (v in p)\n              c.includes(v) && (c = c.replace(new RegExp(v, "g"), p[v](d)));\n            c = c.replace(/\\0\\0/g, "%");\n            v = yb(c);\n            if (v.length > b)\n              return 0;\n            D.set(v, a);\n            return v.length - 1;\n          }, Ab = Array(256), Bb = 0; 256 > Bb; ++Bb)\n            Ab[Bb] = String.fromCharCode(Bb);\n          Ha = Ab;\n          La = f.BindingError = class extends Error {\n            constructor(a) {\n              super(a);\n              this.name = "BindingError";\n            }\n          };\n          f.InternalError = class extends Error {\n            constructor(a) {\n              super(a);\n              this.name = "InternalError";\n            }\n          };\n          Object.assign(Pa.prototype, { get(a) {\n            return this.Sa[a];\n          }, has(a) {\n            return void 0 !== this.Sa[a];\n          }, Za(a) {\n            var b = this.bb.pop() || this.Sa.length;\n            this.Sa[b] = a;\n            return b;\n          }, $a(a) {\n            this.Sa[a] = void 0;\n            this.bb.push(a);\n          } });\n          U.Sa.push({ value: void 0 }, { value: null }, { value: true }, { value: false });\n          U.Va = U.Sa.length;\n          f.count_emval_handles = function() {\n            for (var a = 0, b = U.Va; b < U.Sa.length; ++b)\n              void 0 !== U.Sa[b] && ++a;\n            return a;\n          };\n          var Cb = {\n            a: function(a, b, c) {\n              new Ca(a).Za(b, c);\n              Da = a;\n              Ea++;\n              throw Da;\n            },\n            v: function() {\n              return 0;\n            },\n            ba: () => {\n            },\n            N: () => {\n            },\n            P: () => {\n            },\n            H: function() {\n              return 0;\n            },\n            $: () => {\n            },\n            V: () => {\n            },\n            _: () => {\n            },\n            A: function() {\n            },\n            O: () => {\n            },\n            L: () => {\n            },\n            aa: () => {\n            },\n            M: () => {\n            },\n            D: function(a, b, c, d, e) {\n              b = R(b);\n              c = Oa(c);\n              var h = -1 != b.indexOf("u");\n              h && (e = (1n << 64n) - 1n);\n              T(a, { name: b, fromWireType: function(l) {\n                return l;\n              }, toWireType: function(l, k) {\n                if ("bigint" != typeof k && "number" != typeof k)\n                  throw new TypeError(`Cannot convert "${Ga(k)}" to ${this.name}`);\n                if (k < d || k > e)\n                  throw new TypeError(`Passing a number "${Ga(k)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);\n                return k;\n              }, argPackAdvance: 8, readValueFromPointer: Na(b, c, !h), Wa: null });\n            },\n            ea: function(a, b, c, d, e) {\n              var h = Oa(c);\n              b = R(b);\n              T(a, { name: b, fromWireType: function(l) {\n                return !!l;\n              }, toWireType: function(l, k) {\n                return k ? d : e;\n              }, argPackAdvance: 8, readValueFromPointer: function(l) {\n                if (1 === c)\n                  var k = D;\n                else if (2 === c)\n                  k = G;\n                else if (4 === c)\n                  k = J;\n                else\n                  throw new TypeError("Unknown boolean type size: " + b);\n                return this.fromWireType(k[l >> h]);\n              }, Wa: null });\n            },\n            da: function(a, b) {\n              b = R(b);\n              T(a, { name: b, fromWireType: function(c) {\n                var d = V(c);\n                Qa(c);\n                return d;\n              }, toWireType: function(c, d) {\n                return W(d);\n              }, argPackAdvance: 8, readValueFromPointer: Ra, Wa: null });\n            },\n            C: function(a, b, c) {\n              c = Oa(c);\n              b = R(b);\n              T(a, { name: b, fromWireType: function(d) {\n                return d;\n              }, toWireType: function(d, e) {\n                return e;\n              }, argPackAdvance: 8, readValueFromPointer: Sa(b, c), Wa: null });\n            },\n            p: function(a, b, c, d, e) {\n              b = R(b);\n              -1 === e && (e = 4294967295);\n              e = Oa(c);\n              var h = (k) => k;\n              if (0 === d) {\n                var l = 32 - 8 * c;\n                h = (k) => k << l >>> l;\n              }\n              c = b.includes("unsigned") ? function(k, n) {\n                return n >>> 0;\n              } : function(k, n) {\n                return n;\n              };\n              T(a, { name: b, fromWireType: h, toWireType: c, argPackAdvance: 8, readValueFromPointer: Na(\n                b,\n                e,\n                0 !== d\n              ), Wa: null });\n            },\n            l: function(a, b, c) {\n              function d(h) {\n                h >>= 2;\n                var l = K;\n                return new e(l.buffer, l[h + 1], l[h]);\n              }\n              var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];\n              c = R(c);\n              T(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { gb: true });\n            },\n            E: function(a, b) {\n              b = R(b);\n              var c = "std::string" === b;\n              T(a, { name: b, fromWireType: function(d) {\n                var e = K[d >> 2], h = d + 4;\n                if (c)\n                  for (var l = h, k = 0; k <= e; ++k) {\n                    var n = h + k;\n                    if (k == e || 0 == E[n]) {\n                      l = l ? O(E, l, n - l) : "";\n                      if (void 0 === p)\n                        var p = l;\n                      else\n                        p += String.fromCharCode(0), p += l;\n                      l = n + 1;\n                    }\n                  }\n                else {\n                  p = Array(e);\n                  for (k = 0; k < e; ++k)\n                    p[k] = String.fromCharCode(E[h + k]);\n                  p = p.join("");\n                }\n                X(d);\n                return p;\n              }, toWireType: function(d, e) {\n                e instanceof ArrayBuffer && (e = new Uint8Array(e));\n                var h = "string" == typeof e;\n                h || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || S("Cannot pass non-string to std::string");\n                var l = c && h ? P(e) : e.length;\n                var k = qb(4 + l + 1), n = k + 4;\n                K[k >> 2] = l;\n                if (c && h)\n                  Q(e, E, n, l + 1);\n                else if (h)\n                  for (h = 0; h < l; ++h) {\n                    var p = e.charCodeAt(h);\n                    255 < p && (X(n), S("String has UTF-16 code units that do not fit in 8 bits"));\n                    E[n + h] = p;\n                  }\n                else\n                  for (h = 0; h < l; ++h)\n                    E[n + h] = e[h];\n                null !== d && d.push(X, k);\n                return k;\n              }, argPackAdvance: 8, readValueFromPointer: Ra, Wa: function(d) {\n                X(d);\n              } });\n            },\n            x: function(a, b, c) {\n              c = R(c);\n              if (2 === b) {\n                var d = Ua;\n                var e = Va;\n                var h = Wa;\n                var l = () => H;\n                var k = 1;\n              } else\n                4 === b && (d = Xa, e = Ya, h = Za, l = () => K, k = 2);\n              T(a, { name: c, fromWireType: function(n) {\n                for (var p = K[n >> 2], v = l(), y, F = n + 4, g = 0; g <= p; ++g) {\n                  var r = n + 4 + g * b;\n                  if (g == p || 0 == v[r >> k])\n                    F = d(F, r - F), void 0 === y ? y = F : (y += String.fromCharCode(0), y += F), F = r + b;\n                }\n                X(n);\n                return y;\n              }, toWireType: function(n, p) {\n                "string" != typeof p && S(`Cannot pass non-string to C++ string type ${c}`);\n                var v = h(p), y = qb(4 + v + b);\n                K[y >> 2] = v >> k;\n                e(p, y + 4, v + b);\n                null !== n && n.push(X, y);\n                return y;\n              }, argPackAdvance: 8, readValueFromPointer: Ra, Wa: function(n) {\n                X(n);\n              } });\n            },\n            fa: function(a, b) {\n              b = R(b);\n              T(a, { hb: true, name: b, argPackAdvance: 0, fromWireType: function() {\n              }, toWireType: function() {\n              } });\n            },\n            ca: () => true,\n            o: function(a, b, c) {\n              a = V(a);\n              b = $a(b, "emval::as");\n              var d = [], e = W(d);\n              K[c >> 2] = e;\n              return b.toWireType(d, a);\n            },\n            h: function(a, b, c, d, e) {\n              a = eb[a];\n              b = V(b);\n              c = cb(c);\n              var h = [];\n              K[d >> 2] = W(h);\n              return a(b, c, h, e);\n            },\n            r: function(a, b, c, d) {\n              a = eb[a];\n              b = V(b);\n              c = cb(c);\n              a(b, c, null, d);\n            },\n            b: Qa,\n            F: function(a, b) {\n              a = V(a);\n              b = V(b);\n              return a == b;\n            },\n            u: function(a) {\n              if (0 === a)\n                return W(fb());\n              a = cb(a);\n              return W(fb()[a]);\n            },\n            g: function(a, b) {\n              var c = hb(a, b), d = c[0];\n              b = d.name + "_$" + c.slice(1).map(function(v) {\n                return v.name;\n              }).join("_") + "$";\n              var e = jb[b];\n              if (void 0 !== e)\n                return e;\n              e = ["retType"];\n              for (var h = [d], l = "", k = 0; k < a - 1; ++k)\n                l += (0 !== k ? ", " : "") + "arg" + k, e.push("argType" + k), h.push(c[1 + k]);\n              var n = "return function " + ib("methodCaller_" + b) + "(handle, name, destructors, args) {\\n", p = 0;\n              for (k = 0; k < a - 1; ++k)\n                n += "    var arg" + k + " = argType" + k + ".readValueFromPointer(args" + (p ? "+" + p : "") + ");\\n", p += c[k + 1].argPackAdvance;\n              n += "    var rv = handle[name](" + l + ");\\n";\n              for (k = 0; k < a - 1; ++k)\n                c[k + 1].deleteObject && (n += "    argType" + k + ".deleteObject(arg" + k + ");\\n");\n              d.hb || (n += "    return retType.toWireType(destructors, rv);\\n");\n              e.push(n + "};\\n");\n              a = lb(e).apply(null, h);\n              e = gb(a);\n              return jb[b] = e;\n            },\n            q: function(a, b) {\n              a = V(a);\n              b = V(b);\n              return W(a[b]);\n            },\n            c: function(a) {\n              4 < a && (U.get(a).cb += 1);\n            },\n            G: function(a, b, c, d) {\n              a = V(a);\n              var e = nb[b];\n              e || (e = mb(b), nb[b] = e);\n              return e(a, c, d);\n            },\n            s: function() {\n              return W([]);\n            },\n            k: function(a) {\n              a = V(a);\n              for (var b = Array(a.length), c = 0; c < a.length; c++)\n                b[c] = a[c];\n              return W(b);\n            },\n            d: function(a) {\n              return W(cb(a));\n            },\n            j: function() {\n              return W({});\n            },\n            f: function(a) {\n              for (var b = V(a); b.length; ) {\n                var c = b.pop();\n                b.pop()(c);\n              }\n              Qa(a);\n            },\n            i: function(a, b, c) {\n              a = V(a);\n              b = V(b);\n              c = V(c);\n              a[b] = c;\n            },\n            e: function(a, b) {\n              a = $a(a, "_emval_take_value");\n              a = a.readValueFromPointer(b);\n              return W(a);\n            },\n            S: function(a, b) {\n              a = Y(a);\n              b = Y(b);\n              a = new Date(1e3 * a);\n              J[b >> 2] = a.getUTCSeconds();\n              J[b + 4 >> 2] = a.getUTCMinutes();\n              J[b + 8 >> 2] = a.getUTCHours();\n              J[b + 12 >> 2] = a.getUTCDate();\n              J[b + 16 >> 2] = a.getUTCMonth();\n              J[b + 20 >> 2] = a.getUTCFullYear() - 1900;\n              J[b + 24 >> 2] = a.getUTCDay();\n              J[b + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;\n            },\n            T: function(a, b) {\n              a = Y(a);\n              b = Y(b);\n              a = new Date(1e3 * a);\n              J[b >> 2] = a.getSeconds();\n              J[b + 4 >> 2] = a.getMinutes();\n              J[b + 8 >> 2] = a.getHours();\n              J[b + 12 >> 2] = a.getDate();\n              J[b + 16 >> 2] = a.getMonth();\n              J[b + 20 >> 2] = a.getFullYear() - 1900;\n              J[b + 24 >> 2] = a.getDay();\n              J[b + 28 >> 2] = (Z(a.getFullYear()) ? ob : pb)[a.getMonth()] + a.getDate() - 1 | 0;\n              J[b + 36 >> 2] = -(60 * a.getTimezoneOffset());\n              var c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset(), d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();\n              J[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;\n            },\n            U: function(a) {\n              a = Y(a);\n              var b = new Date(J[a + 20 >> 2] + 1900, J[a + 16 >> 2], J[a + 12 >> 2], J[a + 8 >> 2], J[a + 4 >> 2], J[a >> 2], 0), c = J[a + 32 >> 2], d = b.getTimezoneOffset(), e = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), h = new Date(\n                b.getFullYear(),\n                0,\n                1\n              ).getTimezoneOffset(), l = Math.min(h, e);\n              0 > c ? J[a + 32 >> 2] = Number(e != h && l == d) : 0 < c != (l == d) && (e = Math.max(h, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? l : e) - d)));\n              J[a + 24 >> 2] = b.getDay();\n              J[a + 28 >> 2] = (Z(b.getFullYear()) ? ob : pb)[b.getMonth()] + b.getDate() - 1 | 0;\n              J[a >> 2] = b.getSeconds();\n              J[a + 4 >> 2] = b.getMinutes();\n              J[a + 8 >> 2] = b.getHours();\n              J[a + 12 >> 2] = b.getDate();\n              J[a + 16 >> 2] = b.getMonth();\n              J[a + 20 >> 2] = b.getYear();\n              return BigInt(b.getTime() / 1e3);\n            },\n            Q: function() {\n              return -52;\n            },\n            R: function() {\n            },\n            J: (a, b, c) => {\n              function d(n) {\n                return (n = n.toTimeString().match(/\\(([A-Za-z ]+)\\)$/)) ? n[1] : "GMT";\n              }\n              var e = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(e, 0, 1), l = new Date(e, 6, 1);\n              e = h.getTimezoneOffset();\n              var k = l.getTimezoneOffset();\n              K[a >> 2] = 60 * Math.max(e, k);\n              J[b >> 2] = Number(e != k);\n              a = d(h);\n              b = d(l);\n              a = rb(a);\n              b = rb(b);\n              k < e ? (K[c >> 2] = a, K[c + 4 >> 2] = b) : (K[c >> 2] = b, K[c + 4 >> 2] = a);\n            },\n            t: () => {\n              ja("");\n            },\n            B: function() {\n              return Date.now();\n            },\n            K: () => 2147483648,\n            n: () => performance.now(),\n            Z: (a, b, c) => E.copyWithin(a, b, b + c),\n            I: (a) => {\n              var b = E.length;\n              a >>>= 0;\n              if (2147483648 < a)\n                return false;\n              for (var c = 1; 4 >= c; c *= 2) {\n                var d = b * (1 + 0.2 / c);\n                d = Math.min(d, a + 100663296);\n                var e = Math;\n                d = Math.max(a, d);\n                a: {\n                  e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - B.buffer.byteLength + 65535 >>> 16;\n                  try {\n                    B.grow(e);\n                    pa();\n                    var h = 1;\n                    break a;\n                  } catch (l) {\n                  }\n                  h = void 0;\n                }\n                if (h)\n                  return true;\n              }\n              return false;\n            },\n            X: (a, b) => {\n              var c = 0;\n              ub().forEach(function(d, e) {\n                var h = b + c;\n                e = K[a + 4 * e >> 2] = h;\n                for (h = 0; h < d.length; ++h)\n                  D[e++ >> 0] = d.charCodeAt(h);\n                D[e >> 0] = 0;\n                c += d.length + 1;\n              });\n              return 0;\n            },\n            Y: (a, b) => {\n              var c = ub();\n              K[a >> 2] = c.length;\n              var d = 0;\n              c.forEach(function(e) {\n                d += e.length + 1;\n              });\n              K[b >> 2] = d;\n              return 0;\n            },\n            w: () => 52,\n            z: () => 52,\n            W: function() {\n              return 70;\n            },\n            y: (a, b, c, d) => {\n              for (var e = 0, h = 0; h < c; h++) {\n                var l = K[b >> 2], k = K[b + 4 >> 2];\n                b += 8;\n                for (var n = 0; n < k; n++) {\n                  var p = E[l + n], v = vb[a];\n                  0 === p || 10 === p ? ((1 === a ? ia : z)(O(v, 0)), v.length = 0) : v.push(p);\n                }\n                e += k;\n              }\n              K[d >> 2] = e;\n              return 0;\n            },\n            ga: zb,\n            m: (a, b, c, d) => zb(a, b, c, d)\n          };\n          (function() {\n            function a(c) {\n              C = c = c.exports;\n              B = C.ha;\n              pa();\n              ra.unshift(C.ia);\n              L--;\n              f.monitorRunDependencies && f.monitorRunDependencies(L);\n              if (0 == L && (null !== ua && (clearInterval(ua), ua = null), M)) {\n                var d = M;\n                M = null;\n                d();\n              }\n              return c;\n            }\n            var b = { a: Cb };\n            L++;\n            f.monitorRunDependencies && f.monitorRunDependencies(L);\n            if (f.instantiateWasm)\n              try {\n                return f.instantiateWasm(b, a);\n              } catch (c) {\n                z("Module.instantiateWasm callback failed with error: " + c), m(c);\n              }\n            Aa(b, function(c) {\n              a(c.instance);\n            }).catch(m);\n            return {};\n          })();\n          f._OrtInit = (a, b) => (f._OrtInit = C.ja)(a, b);\n          f._OrtGetLastError = (a, b) => (f._OrtGetLastError = C.ka)(a, b);\n          f._OrtCreateSessionOptions = (a, b, c, d, e, h, l, k, n, p) => (f._OrtCreateSessionOptions = C.la)(a, b, c, d, e, h, l, k, n, p);\n          f._OrtAppendExecutionProvider = (a, b) => (f._OrtAppendExecutionProvider = C.ma)(a, b);\n          f._OrtAddFreeDimensionOverride = (a, b, c) => (f._OrtAddFreeDimensionOverride = C.na)(a, b, c);\n          f._OrtAddSessionConfigEntry = (a, b, c) => (f._OrtAddSessionConfigEntry = C.oa)(a, b, c);\n          f._OrtReleaseSessionOptions = (a) => (f._OrtReleaseSessionOptions = C.pa)(a);\n          f._OrtCreateSession = (a, b, c) => (f._OrtCreateSession = C.qa)(a, b, c);\n          f._OrtReleaseSession = (a) => (f._OrtReleaseSession = C.ra)(a);\n          f._OrtGetInputOutputCount = (a, b, c) => (f._OrtGetInputOutputCount = C.sa)(a, b, c);\n          f._OrtGetInputName = (a, b) => (f._OrtGetInputName = C.ta)(a, b);\n          f._OrtGetOutputName = (a, b) => (f._OrtGetOutputName = C.ua)(a, b);\n          f._OrtFree = (a) => (f._OrtFree = C.va)(a);\n          f._OrtCreateTensor = (a, b, c, d, e, h) => (f._OrtCreateTensor = C.wa)(a, b, c, d, e, h);\n          f._OrtGetTensorData = (a, b, c, d, e) => (f._OrtGetTensorData = C.xa)(a, b, c, d, e);\n          f._OrtReleaseTensor = (a) => (f._OrtReleaseTensor = C.ya)(a);\n          f._OrtCreateRunOptions = (a, b, c, d) => (f._OrtCreateRunOptions = C.za)(a, b, c, d);\n          f._OrtAddRunConfigEntry = (a, b, c) => (f._OrtAddRunConfigEntry = C.Aa)(a, b, c);\n          f._OrtReleaseRunOptions = (a) => (f._OrtReleaseRunOptions = C.Ba)(a);\n          f._OrtCreateBinding = (a) => (f._OrtCreateBinding = C.Ca)(a);\n          f._OrtBindInput = (a, b, c) => (f._OrtBindInput = C.Da)(a, b, c);\n          f._OrtBindOutput = (a, b, c, d) => (f._OrtBindOutput = C.Ea)(a, b, c, d);\n          f._OrtClearBoundOutputs = (a) => (f._OrtClearBoundOutputs = C.Fa)(a);\n          f._OrtReleaseBinding = (a) => (f._OrtReleaseBinding = C.Ga)(a);\n          f._OrtRunWithBinding = (a, b, c, d, e) => (f._OrtRunWithBinding = C.Ha)(a, b, c, d, e);\n          f._OrtRun = (a, b, c, d, e, h, l, k) => (f._OrtRun = C.Ia)(a, b, c, d, e, h, l, k);\n          f._OrtEndProfiling = (a) => (f._OrtEndProfiling = C.Ja)(a);\n          var qb = f._malloc = (a) => (qb = f._malloc = C.Ka)(a), X = f._free = (a) => (X = f._free = C.La)(a), ab = (a) => (ab = C.Ma)(a);\n          f.__embind_initialize_bindings = () => (f.__embind_initialize_bindings = C.Na)();\n          var Db = () => (Db = C.Pa)(), Eb = (a) => (Eb = C.Qa)(a), Fb = (a) => (Fb = C.Ra)(a);\n          f.stackAlloc = Fb;\n          f.stackSave = Db;\n          f.stackRestore = Eb;\n          f.UTF8ToString = (a, b) => a ? O(E, a, b) : "";\n          f.stringToUTF8 = (a, b, c) => Q(a, E, b, c);\n          f.lengthBytesUTF8 = P;\n          var Gb;\n          M = function Hb() {\n            Gb || Ib();\n            Gb || (M = Hb);\n          };\n          function Ib() {\n            function a() {\n              if (!Gb && (Gb = true, f.calledRun = true, !ka)) {\n                Ba(ra);\n                aa(f);\n                if (f.onRuntimeInitialized)\n                  f.onRuntimeInitialized();\n                if (f.postRun)\n                  for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length; ) {\n                    var b = f.postRun.shift();\n                    sa.unshift(b);\n                  }\n                Ba(sa);\n              }\n            }\n            if (!(0 < L)) {\n              if (f.preRun)\n                for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length; )\n                  ta();\n              Ba(qa);\n              0 < L || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {\n                setTimeout(function() {\n                  f.setStatus("");\n                }, 1);\n                a();\n              }, 1)) : a());\n            }\n          }\n          if (f.preInit)\n            for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length; )\n              f.preInit.pop()();\n          Ib();\n          return moduleArg.ready;\n        };\n      })();\n      if (typeof exports === "object" && typeof module === "object")\n        module.exports = ortWasm;\n      else if (typeof define === "function" && define["amd"])\n        define([], () => ortWasm);\n    }\n  });\n\n  // nodejs-ignore:worker_threads\n  var require_worker_threads = __commonJS({\n    "nodejs-ignore:worker_threads"() {\n    }\n  });\n\n  // nodejs-ignore:perf_hooks\n  var require_perf_hooks = __commonJS({\n    "nodejs-ignore:perf_hooks"() {\n    }\n  });\n\n  // nodejs-ignore:os\n  var os_exports = {};\n  __export(os_exports, {\n    cpus: () => cpus\n  });\n  var cpus;\n  var init_os = __esm({\n    "nodejs-ignore:os"() {\n      cpus = void 0;\n    }\n  });\n\n  // web/lib/wasm/binding/ort-wasm-threaded.js\n  var require_ort_wasm_threaded = __commonJS({\n    "web/lib/wasm/binding/ort-wasm-threaded.js"(exports, module) {\n      "use strict";\n      var ortWasmThreaded = (() => {\n        var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;\n        if (typeof __filename !== "undefined")\n          _scriptDir = _scriptDir || __filename;\n        return function(moduleArg = {}) {\n          function e() {\n            m.buffer != n.buffer && p();\n            return n;\n          }\n          function t() {\n            m.buffer != n.buffer && p();\n            return aa;\n          }\n          function v() {\n            m.buffer != n.buffer && p();\n            return ba;\n          }\n          function ca() {\n            m.buffer != n.buffer && p();\n            return da;\n          }\n          function w() {\n            m.buffer != n.buffer && p();\n            return ea;\n          }\n          function z() {\n            m.buffer != n.buffer && p();\n            return fa;\n          }\n          function ha() {\n            m.buffer != n.buffer && p();\n            return ia;\n          }\n          var A = moduleArg, ja, ka;\n          A.ready = new Promise((a, b) => {\n            ja = a;\n            ka = b;\n          });\n          var la = Object.assign({}, A), ma = "./this.program", C = (a, b) => {\n            throw b;\n          }, na = "object" == typeof window, D = "function" == typeof importScripts, E = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, F = A.ENVIRONMENT_IS_PTHREAD || false, G = "";\n          function oa(a) {\n            return A.locateFile ? A.locateFile(a, G) : G + a;\n          }\n          var pa, qa, ra;\n          if (E) {\n            var fs = (init_fs(), __toCommonJS(fs_exports)), sa = (init_path(), __toCommonJS(path_exports));\n            G = D ? sa.dirname(G) + "/" : __dirname + "/";\n            pa = (b, c) => {\n              b = b.startsWith("file://") ? new URL(b) : sa.normalize(b);\n              return fs.readFileSync(b, c ? void 0 : "utf8");\n            };\n            ra = (b) => {\n              b = pa(b, true);\n              b.buffer || (b = new Uint8Array(b));\n              return b;\n            };\n            qa = (b, c, d, f = true) => {\n              b = b.startsWith("file://") ? new URL(b) : sa.normalize(b);\n              fs.readFile(b, f ? void 0 : "utf8", (g, k) => {\n                g ? d(g) : c(f ? k.buffer : k);\n              });\n            };\n            !A.thisProgram && 1 < process.argv.length && (ma = process.argv[1].replace(/\\\\/g, "/"));\n            process.argv.slice(2);\n            C = (b, c) => {\n              process.exitCode = b;\n              throw c;\n            };\n            A.inspect = () => "[Emscripten Module object]";\n            let a;\n            try {\n              a = require_worker_threads();\n            } catch (b) {\n              throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'), b;\n            }\n            global.Worker = a.Worker;\n          } else if (na || D)\n            D ? G = self.location.href : "undefined" != typeof document && document.currentScript && (G = document.currentScript.src), typeof _scriptDir !== "undefined" && _scriptDir && (G = _scriptDir), 0 !== G.indexOf("blob:") ? G = G.substr(0, G.replace(/[?#].*/, "").lastIndexOf("/") + 1) : G = "", E || (pa = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.send(null);\n              return b.responseText;\n            }, D && (ra = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.responseType = "arraybuffer";\n              b.send(null);\n              return new Uint8Array(b.response);\n            }), qa = (a, b, c) => {\n              var d = new XMLHttpRequest();\n              d.open("GET", a, true);\n              d.responseType = "arraybuffer";\n              d.onload = () => {\n                200 == d.status || 0 == d.status && d.response ? b(d.response) : c();\n              };\n              d.onerror = c;\n              d.send(null);\n            });\n          E && "undefined" == typeof performance && (global.performance = require_perf_hooks().performance);\n          var ta = console.log.bind(console), ua = console.error.bind(console);\n          E && (ta = (...a) => fs.writeSync(1, a.join(" ") + "\\n"), ua = (...a) => fs.writeSync(2, a.join(" ") + "\\n"));\n          var va = A.print || ta, H = A.printErr || ua;\n          Object.assign(A, la);\n          la = null;\n          A.thisProgram && (ma = A.thisProgram);\n          A.quit && (C = A.quit);\n          var I;\n          A.wasmBinary && (I = A.wasmBinary);\n          var noExitRuntime = A.noExitRuntime || true;\n          "object" != typeof WebAssembly && wa("no native wasm support detected");\n          var m, J, xa, ya = false, K, n, aa, ba, da, ea, fa, za, L, Aa, ia;\n          function p() {\n            var a = m.buffer;\n            A.HEAP8 = n = new Int8Array(a);\n            A.HEAP16 = ba = new Int16Array(a);\n            A.HEAP32 = ea = new Int32Array(a);\n            A.HEAPU8 = aa = new Uint8Array(a);\n            A.HEAPU16 = da = new Uint16Array(a);\n            A.HEAPU32 = fa = new Uint32Array(a);\n            A.HEAPF32 = za = new Float32Array(a);\n            A.HEAPF64 = ia = new Float64Array(a);\n            A.HEAP64 = L = new BigInt64Array(a);\n            A.HEAPU64 = Aa = new BigUint64Array(a);\n          }\n          var Ba = A.INITIAL_MEMORY || 16777216;\n          5242880 <= Ba || wa("INITIAL_MEMORY should be larger than STACK_SIZE, was " + Ba + "! (STACK_SIZE=5242880)");\n          if (F)\n            m = A.wasmMemory;\n          else if (A.wasmMemory)\n            m = A.wasmMemory;\n          else if (m = new WebAssembly.Memory({ initial: Ba / 65536, maximum: 32768, shared: true }), !(m.buffer instanceof SharedArrayBuffer))\n            throw H("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), E && H("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");\n          p();\n          Ba = m.buffer.byteLength;\n          var Ca, Da = [], Ea = [], Fa = [], Ga = 0;\n          function Ha() {\n            return noExitRuntime || 0 < Ga;\n          }\n          var M = 0, Ia = null, Ja = null;\n          function Ka() {\n            M++;\n            A.monitorRunDependencies && A.monitorRunDependencies(M);\n          }\n          function La() {\n            M--;\n            A.monitorRunDependencies && A.monitorRunDependencies(M);\n            if (0 == M && (null !== Ia && (clearInterval(Ia), Ia = null), Ja)) {\n              var a = Ja;\n              Ja = null;\n              a();\n            }\n          }\n          function wa(a) {\n            if (A.onAbort)\n              A.onAbort(a);\n            a = "Aborted(" + a + ")";\n            H(a);\n            ya = true;\n            K = 1;\n            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");\n            ka(a);\n            throw a;\n          }\n          function Ma(a) {\n            return a.startsWith("data:application/octet-stream;base64,");\n          }\n          var O;\n          O = "ort-wasm-threaded.wasm";\n          Ma(O) || (O = oa(O));\n          function Na(a) {\n            if (a == O && I)\n              return new Uint8Array(I);\n            if (ra)\n              return ra(a);\n            throw "both async and sync fetching of the wasm failed";\n          }\n          function Oa(a) {\n            if (!I && (na || D)) {\n              if ("function" == typeof fetch && !a.startsWith("file://"))\n                return fetch(a, { credentials: "same-origin" }).then((b) => {\n                  if (!b.ok)\n                    throw "failed to load wasm binary file at \'" + a + "\'";\n                  return b.arrayBuffer();\n                }).catch(() => Na(a));\n              if (qa)\n                return new Promise((b, c) => {\n                  qa(a, (d) => b(new Uint8Array(d)), c);\n                });\n            }\n            return Promise.resolve().then(() => Na(a));\n          }\n          function Pa(a, b, c) {\n            return Oa(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {\n              H("failed to asynchronously prepare wasm: " + d);\n              wa(d);\n            });\n          }\n          function Qa(a, b) {\n            var c = O;\n            return I || "function" != typeof WebAssembly.instantiateStreaming || Ma(c) || c.startsWith("file://") || E || "function" != typeof fetch ? Pa(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(f) {\n              H("wasm streaming compile failed: " + f);\n              H("falling back to ArrayBuffer instantiation");\n              return Pa(c, a, b);\n            }));\n          }\n          function Ra(a) {\n            this.name = "ExitStatus";\n            this.message = `Program terminated with exit(${a})`;\n            this.status = a;\n          }\n          function Sa(a) {\n            a.terminate();\n            a.onmessage = () => {\n            };\n          }\n          function Ta(a) {\n            (a = P.kb[a]) || wa();\n            P.Qb(a);\n          }\n          function Ua(a) {\n            var b = P.Hb();\n            if (!b)\n              return 6;\n            P.ob.push(b);\n            P.kb[a.nb] = b;\n            b.nb = a.nb;\n            var c = { cmd: "run", start_routine: a.Rb, arg: a.Gb, pthread_ptr: a.nb };\n            E && b.unref();\n            b.postMessage(c, a.Xb);\n            return 0;\n          }\n          var Va = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Wa = (a, b, c) => {\n            var d = b + c;\n            for (c = b; a[c] && !(c >= d); )\n              ++c;\n            if (16 < c - b && a.buffer && Va)\n              return Va.decode(a.buffer instanceof SharedArrayBuffer ? a.slice(b, c) : a.subarray(b, c));\n            for (d = ""; b < c; ) {\n              var f = a[b++];\n              if (f & 128) {\n                var g = a[b++] & 63;\n                if (192 == (f & 224))\n                  d += String.fromCharCode((f & 31) << 6 | g);\n                else {\n                  var k = a[b++] & 63;\n                  f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | k : (f & 7) << 18 | g << 12 | k << 6 | a[b++] & 63;\n                  65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));\n                }\n              } else\n                d += String.fromCharCode(f);\n            }\n            return d;\n          }, Xa = (a, b) => a ? Wa(t(), a, b) : "";\n          function Ya(a) {\n            if (F)\n              return Q(1, 1, a);\n            K = a;\n            if (!Ha()) {\n              P.Sb();\n              if (A.onExit)\n                A.onExit(a);\n              ya = true;\n            }\n            C(a, new Ra(a));\n          }\n          var $a = (a) => {\n            K = a;\n            if (F)\n              throw Za(a), "unwind";\n            Ya(a);\n          }, P = {\n            rb: [],\n            ob: [],\n            Eb: [],\n            kb: {},\n            wb: function() {\n              F ? P.Kb() : P.Jb();\n            },\n            Jb: function() {\n              Da.unshift(() => {\n                Ka();\n                P.Mb(() => La());\n              });\n            },\n            Kb: function() {\n              P.receiveObjectTransfer = P.Pb;\n              P.threadInitTLS = P.Db;\n              P.setExitStatus = P.Cb;\n              noExitRuntime = false;\n            },\n            Cb: function(a) {\n              K = a;\n            },\n            bc: ["$terminateWorker"],\n            Sb: function() {\n              for (var a of P.ob)\n                Sa(a);\n              for (a of P.rb)\n                Sa(a);\n              P.rb = [];\n              P.ob = [];\n              P.kb = [];\n            },\n            Qb: function(a) {\n              var b = a.nb;\n              delete P.kb[b];\n              P.rb.push(a);\n              P.ob.splice(P.ob.indexOf(a), 1);\n              a.nb = 0;\n              ab(b);\n            },\n            Pb: function() {\n            },\n            Db: function() {\n              P.Eb.forEach((a) => a());\n            },\n            Nb: (a) => new Promise((b) => {\n              a.onmessage = (g) => {\n                g = g.data;\n                var k = g.cmd;\n                if (g.targetThread && g.targetThread != bb()) {\n                  var l = P.kb[g.ac];\n                  l ? l.postMessage(g, g.transferList) : H(\'Internal error! Worker sent a message "\' + k + \'" to target pthread \' + g.targetThread + ", but that thread no longer exists!");\n                } else if ("checkMailbox" === k)\n                  cb();\n                else if ("spawnThread" === k)\n                  Ua(g);\n                else if ("cleanupThread" === k)\n                  Ta(g.thread);\n                else if ("killThread" === k)\n                  g = g.thread, k = P.kb[g], delete P.kb[g], Sa(k), ab(g), P.ob.splice(\n                    P.ob.indexOf(k),\n                    1\n                  ), k.nb = 0;\n                else if ("cancelThread" === k)\n                  P.kb[g.thread].postMessage({ cmd: "cancel" });\n                else if ("loaded" === k)\n                  a.loaded = true, b(a);\n                else if ("alert" === k)\n                  alert("Thread " + g.threadId + ": " + g.text);\n                else if ("setimmediate" === g.target)\n                  a.postMessage(g);\n                else if ("callHandler" === k)\n                  A[g.handler](...g.args);\n                else\n                  k && H("worker sent an unknown command " + k);\n              };\n              a.onerror = (g) => {\n                H("worker sent an error! " + g.filename + ":" + g.lineno + ": " + g.message);\n                throw g;\n              };\n              E && (a.on("message", function(g) {\n                a.onmessage({ data: g });\n              }), a.on("error", function(g) {\n                a.onerror(g);\n              }));\n              var c = [], d = ["onExit", "onAbort", "print", "printErr"], f;\n              for (f of d)\n                A.hasOwnProperty(f) && c.push(f);\n              a.postMessage({ cmd: "load", handlers: c, urlOrBlob: A.mainScriptUrlOrBlob || _scriptDir, wasmMemory: m, wasmModule: xa });\n            }),\n            Mb: function(a) {\n              a();\n            },\n            Fb: function() {\n              var a = oa("ort-wasm-threaded.worker.js");\n              a = new Worker(a);\n              P.rb.push(a);\n            },\n            Hb: function() {\n              0 == P.rb.length && (P.Fb(), P.Nb(P.rb[0]));\n              return P.rb.pop();\n            }\n          };\n          A.PThread = P;\n          var db = (a) => {\n            for (; 0 < a.length; )\n              a.shift()(A);\n          };\n          A.establishStackSpace = function() {\n            var a = bb(), b = w()[a + 52 >> 2];\n            a = w()[a + 56 >> 2];\n            eb(b, b - a);\n            fb(b);\n          };\n          function Za(a) {\n            if (F)\n              return Q(2, 0, a);\n            $a(a);\n          }\n          var gb = [];\n          A.invokeEntryPoint = function(a, b) {\n            var c = gb[a];\n            c || (a >= gb.length && (gb.length = a + 1), gb[a] = c = Ca.get(a));\n            a = c(b);\n            Ha() ? P.Cb(a) : hb(a);\n          };\n          function ib(a) {\n            this.tb = a - 24;\n            this.Ob = function(b) {\n              z()[this.tb + 4 >> 2] = b;\n            };\n            this.yb = function(b) {\n              z()[this.tb + 8 >> 2] = b;\n            };\n            this.wb = function(b, c) {\n              this.xb();\n              this.Ob(b);\n              this.yb(c);\n            };\n            this.xb = function() {\n              z()[this.tb + 16 >> 2] = 0;\n            };\n          }\n          var jb = 0, kb = 0;\n          function lb(a, b, c, d) {\n            return F ? Q(3, 1, a, b, c, d) : mb(a, b, c, d);\n          }\n          function mb(a, b, c, d) {\n            if ("undefined" == typeof SharedArrayBuffer)\n              return H("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;\n            var f = [];\n            if (F && 0 === f.length)\n              return lb(a, b, c, d);\n            a = { Rb: c, nb: a, Gb: d, Xb: f };\n            return F ? (a.Zb = "spawnThread", postMessage(a, f), 0) : Ua(a);\n          }\n          function nb(a, b, c) {\n            return F ? Q(4, 1, a, b, c) : 0;\n          }\n          function ob(a, b) {\n            if (F)\n              return Q(5, 1, a, b);\n          }\n          var pb = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var d = a.charCodeAt(c);\n              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;\n            }\n            return b;\n          }, qb = (a, b, c, d) => {\n            if (!(0 < d))\n              return 0;\n            var f = c;\n            d = c + d - 1;\n            for (var g = 0; g < a.length; ++g) {\n              var k = a.charCodeAt(g);\n              if (55296 <= k && 57343 >= k) {\n                var l = a.charCodeAt(++g);\n                k = 65536 + ((k & 1023) << 10) | l & 1023;\n              }\n              if (127 >= k) {\n                if (c >= d)\n                  break;\n                b[c++] = k;\n              } else {\n                if (2047 >= k) {\n                  if (c + 1 >= d)\n                    break;\n                  b[c++] = 192 | k >> 6;\n                } else {\n                  if (65535 >= k) {\n                    if (c + 2 >= d)\n                      break;\n                    b[c++] = 224 | k >> 12;\n                  } else {\n                    if (c + 3 >= d)\n                      break;\n                    b[c++] = 240 | k >> 18;\n                    b[c++] = 128 | k >> 12 & 63;\n                  }\n                  b[c++] = 128 | k >> 6 & 63;\n                }\n                b[c++] = 128 | k & 63;\n              }\n            }\n            b[c] = 0;\n            return c - f;\n          }, rb = (a, b, c) => qb(a, t(), b, c);\n          function sb(a, b) {\n            if (F)\n              return Q(6, 1, a, b);\n          }\n          function tb(a, b, c) {\n            if (F)\n              return Q(7, 1, a, b, c);\n          }\n          function ub(a, b, c) {\n            return F ? Q(8, 1, a, b, c) : 0;\n          }\n          function vb(a, b) {\n            if (F)\n              return Q(9, 1, a, b);\n          }\n          function wb(a, b, c) {\n            if (F)\n              return Q(10, 1, a, b, c);\n          }\n          function xb(a, b, c, d) {\n            if (F)\n              return Q(11, 1, a, b, c, d);\n          }\n          function yb(a, b, c, d) {\n            if (F)\n              return Q(12, 1, a, b, c, d);\n          }\n          function zb(a, b, c, d) {\n            if (F)\n              return Q(13, 1, a, b, c, d);\n          }\n          function Ab(a) {\n            if (F)\n              return Q(14, 1, a);\n          }\n          function Bb(a, b) {\n            if (F)\n              return Q(15, 1, a, b);\n          }\n          function Cb(a, b, c) {\n            if (F)\n              return Q(16, 1, a, b, c);\n          }\n          function Db(a) {\n            if (null === a)\n              return "null";\n            var b = typeof a;\n            return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;\n          }\n          var Eb = void 0;\n          function S(a) {\n            for (var b = ""; t()[a]; )\n              b += Eb[t()[a++]];\n            return b;\n          }\n          var Fb = {}, Gb = {}, Hb = {}, Ib = void 0;\n          function T(a) {\n            throw new Ib(a);\n          }\n          function Jb(a, b, c = {}) {\n            var d = b.name;\n            a || T(`type "${d}" must have a positive integer typeid pointer`);\n            if (Gb.hasOwnProperty(a)) {\n              if (c.Ib)\n                return;\n              T(`Cannot register type \'${d}\' twice`);\n            }\n            Gb[a] = b;\n            delete Hb[a];\n            Fb.hasOwnProperty(a) && (b = Fb[a], delete Fb[a], b.forEach((f) => f()));\n          }\n          function U(a, b, c = {}) {\n            if (!("argPackAdvance" in b))\n              throw new TypeError("registerType registeredInstance requires argPackAdvance");\n            Jb(a, b, c);\n          }\n          function Kb(a, b, c) {\n            switch (b) {\n              case 0:\n                return c ? function(d) {\n                  return e()[d];\n                } : function(d) {\n                  return t()[d];\n                };\n              case 1:\n                return c ? function(d) {\n                  return v()[d >> 1];\n                } : function(d) {\n                  return ca()[d >> 1];\n                };\n              case 2:\n                return c ? function(d) {\n                  return w()[d >> 2];\n                } : function(d) {\n                  return z()[d >> 2];\n                };\n              case 3:\n                return c ? function(d) {\n                  return L[d >> 3];\n                } : function(d) {\n                  return Aa[d >> 3];\n                };\n              default:\n                throw new TypeError("Unknown integer type: " + a);\n            }\n          }\n          function Lb(a) {\n            switch (a) {\n              case 1:\n                return 0;\n              case 2:\n                return 1;\n              case 4:\n                return 2;\n              case 8:\n                return 3;\n              default:\n                throw new TypeError(`Unknown type size: ${a}`);\n            }\n          }\n          function Mb() {\n            this.mb = [void 0];\n            this.Ab = [];\n          }\n          var V = new Mb();\n          function Nb(a) {\n            a >= V.tb && 0 === --V.get(a).Bb && V.yb(a);\n          }\n          var W = (a) => {\n            a || T("Cannot use deleted val. handle = " + a);\n            return V.get(a).value;\n          }, X = (a) => {\n            switch (a) {\n              case void 0:\n                return 1;\n              case null:\n                return 2;\n              case true:\n                return 3;\n              case false:\n                return 4;\n              default:\n                return V.xb({ Bb: 1, value: a });\n            }\n          };\n          function Ob(a) {\n            return this.fromWireType(w()[a >> 2]);\n          }\n          function Pb(a, b) {\n            switch (b) {\n              case 2:\n                return function(c) {\n                  var d = this.fromWireType;\n                  m.buffer != n.buffer && p();\n                  return d.call(this, za[c >> 2]);\n                };\n              case 3:\n                return function(c) {\n                  return this.fromWireType(ha()[c >> 3]);\n                };\n              default:\n                throw new TypeError("Unknown float type: " + a);\n            }\n          }\n          var Qb = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Rb = (a, b) => {\n            var c = a >> 1;\n            for (var d = c + b / 2; !(c >= d) && ca()[c]; )\n              ++c;\n            c <<= 1;\n            if (32 < c - a && Qb)\n              return Qb.decode(t().slice(a, c));\n            c = "";\n            for (d = 0; !(d >= b / 2); ++d) {\n              var f = v()[a + 2 * d >> 1];\n              if (0 == f)\n                break;\n              c += String.fromCharCode(f);\n            }\n            return c;\n          }, Sb = (a, b, c) => {\n            void 0 === c && (c = 2147483647);\n            if (2 > c)\n              return 0;\n            c -= 2;\n            var d = b;\n            c = c < 2 * a.length ? c / 2 : a.length;\n            for (var f = 0; f < c; ++f) {\n              var g = a.charCodeAt(f);\n              v()[b >> 1] = g;\n              b += 2;\n            }\n            v()[b >> 1] = 0;\n            return b - d;\n          }, Tb = (a) => 2 * a.length, Ub = (a, b) => {\n            for (var c = 0, d = ""; !(c >= b / 4); ) {\n              var f = w()[a + 4 * c >> 2];\n              if (0 == f)\n                break;\n              ++c;\n              65536 <= f ? (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : d += String.fromCharCode(f);\n            }\n            return d;\n          }, Vb = (a, b, c) => {\n            void 0 === c && (c = 2147483647);\n            if (4 > c)\n              return 0;\n            var d = b;\n            c = d + c - 4;\n            for (var f = 0; f < a.length; ++f) {\n              var g = a.charCodeAt(f);\n              if (55296 <= g && 57343 >= g) {\n                var k = a.charCodeAt(++f);\n                g = 65536 + ((g & 1023) << 10) | k & 1023;\n              }\n              w()[b >> 2] = g;\n              b += 4;\n              if (b + 4 > c)\n                break;\n            }\n            w()[b >> 2] = 0;\n            return b - d;\n          }, Wb = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var d = a.charCodeAt(c);\n              55296 <= d && 57343 >= d && ++c;\n              b += 4;\n            }\n            return b;\n          }, Xb = (a) => {\n            if (!ya)\n              try {\n                if (a(), !Ha())\n                  try {\n                    F ? hb(K) : $a(K);\n                  } catch (b) {\n                    b instanceof Ra || "unwind" == b || C(1, b);\n                  }\n              } catch (b) {\n                b instanceof Ra || "unwind" == b || C(1, b);\n              }\n          };\n          function Yb(a) {\n            "function" === typeof Atomics.Yb && (Atomics.Yb(w(), a >> 2, a).value.then(cb), a += 128, Atomics.store(w(), a >> 2, 1));\n          }\n          A.__emscripten_thread_mailbox_await = Yb;\n          function cb() {\n            var a = bb();\n            a && (Yb(a), Xb(() => Zb()));\n          }\n          A.checkMailbox = cb;\n          function $b(a, b) {\n            var c = Gb[a];\n            if (void 0 === c) {\n              a = ac(a);\n              var d = S(a);\n              Y(a);\n              T(b + " has unknown type " + d);\n            }\n            return c;\n          }\n          var bc = {};\n          function cc(a) {\n            var b = bc[a];\n            return void 0 === b ? S(a) : b;\n          }\n          var dc = [];\n          function ec() {\n            return "object" == typeof globalThis ? globalThis : Function("return this")();\n          }\n          function fc(a) {\n            var b = dc.length;\n            dc.push(a);\n            return b;\n          }\n          function gc(a, b) {\n            for (var c = Array(a), d = 0; d < a; ++d)\n              c[d] = $b(z()[b + 4 * d >> 2], "parameter " + d);\n            return c;\n          }\n          function hc(a) {\n            if (void 0 === a)\n              return "_unknown";\n            a = a.replace(/[^a-zA-Z0-9_]/g, "$");\n            var b = a.charCodeAt(0);\n            return 48 <= b && 57 >= b ? `_${a}` : a;\n          }\n          var ic = [];\n          function jc(a, b) {\n            a = hc(a);\n            return { [a]: function() {\n              return b.apply(this, arguments);\n            } }[a];\n          }\n          function kc(a) {\n            var b = Function;\n            if (!(b instanceof Function))\n              throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);\n            var c = jc(b.name || "unknownFunctionName", function() {\n            });\n            c.prototype = b.prototype;\n            c = new c();\n            a = b.apply(c, a);\n            return a instanceof Object ? a : c;\n          }\n          function lc(a) {\n            for (var b = "", c = 0; c < a; ++c)\n              b += (0 !== c ? ", " : "") + "arg" + c;\n            var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\\n  var HEAPU32 = getMemory();\\n";\n            for (c = 0; c < a; ++c)\n              d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>2)], \'parameter " + c + "\');\\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\\nargs += argType" + c + "[\'argPackAdvance\'];\\nargTypes += 4;\\n";\n            return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\\nreturn valueToHandle(obj);\\n}\\n"))($b, A, X, () => z());\n          }\n          var mc = {};\n          function nc(a) {\n            return -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);\n          }\n          var Z = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), oc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], pc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];\n          function rc(a, b, c, d, f, g, k) {\n            return F ? Q(17, 1, a, b, c, d, f, g, k) : -52;\n          }\n          function sc(a, b, c, d, f, g) {\n            if (F)\n              return Q(18, 1, a, b, c, d, f, g);\n          }\n          var uc = (a) => {\n            var b = pb(a) + 1, c = tc(b);\n            c && rb(a, c, b);\n            return c;\n          }, wc = (a) => {\n            var b = vc();\n            a = a();\n            fb(b);\n            return a;\n          };\n          function Q(a, b) {\n            var c = arguments.length - 2, d = arguments;\n            return wc(() => {\n              for (var f = 2 * c, g = xc(8 * f), k = g >> 3, l = 0; l < c; l++) {\n                var q = d[2 + l];\n                "bigint" == typeof q ? (L[k + 2 * l] = 1n, L[k + 2 * l + 1] = q) : (L[k + 2 * l] = 0n, ha()[k + 2 * l + 1] = q);\n              }\n              return yc(a, f, g, b);\n            });\n          }\n          var zc = [], Ac = {}, Cc = () => {\n            if (!Bc) {\n              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: ma || "./this.program" }, b;\n              for (b in Ac)\n                void 0 === Ac[b] ? delete a[b] : a[b] = Ac[b];\n              var c = [];\n              for (b in a)\n                c.push(`${b}=${a[b]}`);\n              Bc = c;\n            }\n            return Bc;\n          }, Bc;\n          function Dc(a, b) {\n            if (F)\n              return Q(19, 1, a, b);\n            var c = 0;\n            Cc().forEach(function(d, f) {\n              var g = b + c;\n              f = z()[a + 4 * f >> 2] = g;\n              for (g = 0; g < d.length; ++g)\n                e()[f++ >> 0] = d.charCodeAt(g);\n              e()[f >> 0] = 0;\n              c += d.length + 1;\n            });\n            return 0;\n          }\n          function Ec(a, b) {\n            if (F)\n              return Q(20, 1, a, b);\n            var c = Cc();\n            z()[a >> 2] = c.length;\n            var d = 0;\n            c.forEach(function(f) {\n              d += f.length + 1;\n            });\n            z()[b >> 2] = d;\n            return 0;\n          }\n          function Fc(a) {\n            return F ? Q(21, 1, a) : 52;\n          }\n          function Gc(a, b, c, d) {\n            return F ? Q(22, 1, a, b, c, d) : 52;\n          }\n          function Hc(a, b, c, d) {\n            return F ? Q(23, 1, a, b, c, d) : 70;\n          }\n          var Ic = [null, [], []];\n          function Jc(a, b, c, d) {\n            if (F)\n              return Q(24, 1, a, b, c, d);\n            for (var f = 0, g = 0; g < c; g++) {\n              var k = z()[b >> 2], l = z()[b + 4 >> 2];\n              b += 8;\n              for (var q = 0; q < l; q++) {\n                var r = t()[k + q], x = Ic[a];\n                0 === r || 10 === r ? ((1 === a ? va : H)(Wa(x, 0)), x.length = 0) : x.push(r);\n              }\n              f += l;\n            }\n            z()[d >> 2] = f;\n            return 0;\n          }\n          var Kc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Lc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];\n          function Mc(a) {\n            var b = Array(pb(a) + 1);\n            qb(a, b, 0, b.length);\n            return b;\n          }\n          var Nc = (a, b) => {\n            e().set(a, b);\n          }, Oc = (a, b, c, d) => {\n            function f(h, u, y) {\n              for (h = "number" == typeof h ? h.toString() : h || ""; h.length < u; )\n                h = y[0] + h;\n              return h;\n            }\n            function g(h, u) {\n              return f(h, u, "0");\n            }\n            function k(h, u) {\n              function y(qc) {\n                return 0 > qc ? -1 : 0 < qc ? 1 : 0;\n              }\n              var R;\n              0 === (R = y(h.getFullYear() - u.getFullYear())) && 0 === (R = y(h.getMonth() - u.getMonth())) && (R = y(h.getDate() - u.getDate()));\n              return R;\n            }\n            function l(h) {\n              switch (h.getDay()) {\n                case 0:\n                  return new Date(h.getFullYear() - 1, 11, 29);\n                case 1:\n                  return h;\n                case 2:\n                  return new Date(h.getFullYear(), 0, 3);\n                case 3:\n                  return new Date(\n                    h.getFullYear(),\n                    0,\n                    2\n                  );\n                case 4:\n                  return new Date(h.getFullYear(), 0, 1);\n                case 5:\n                  return new Date(h.getFullYear() - 1, 11, 31);\n                case 6:\n                  return new Date(h.getFullYear() - 1, 11, 30);\n              }\n            }\n            function q(h) {\n              var u = h.pb;\n              for (h = new Date(new Date(h.qb + 1900, 0, 1).getTime()); 0 < u; ) {\n                var y = h.getMonth(), R = (Z(h.getFullYear()) ? Kc : Lc)[y];\n                if (u > R - h.getDate())\n                  u -= R - h.getDate() + 1, h.setDate(1), 11 > y ? h.setMonth(y + 1) : (h.setMonth(0), h.setFullYear(h.getFullYear() + 1));\n                else {\n                  h.setDate(h.getDate() + u);\n                  break;\n                }\n              }\n              y = new Date(h.getFullYear() + 1, 0, 4);\n              u = l(new Date(\n                h.getFullYear(),\n                0,\n                4\n              ));\n              y = l(y);\n              return 0 >= k(u, h) ? 0 >= k(y, h) ? h.getFullYear() + 1 : h.getFullYear() : h.getFullYear() - 1;\n            }\n            var r = w()[d + 40 >> 2];\n            d = { Vb: w()[d >> 2], Ub: w()[d + 4 >> 2], ub: w()[d + 8 >> 2], zb: w()[d + 12 >> 2], vb: w()[d + 16 >> 2], qb: w()[d + 20 >> 2], lb: w()[d + 24 >> 2], pb: w()[d + 28 >> 2], cc: w()[d + 32 >> 2], Tb: w()[d + 36 >> 2], Wb: r ? Xa(r) : "" };\n            c = Xa(c);\n            r = {\n              "%c": "%a %b %d %H:%M:%S %Y",\n              "%D": "%m/%d/%y",\n              "%F": "%Y-%m-%d",\n              "%h": "%b",\n              "%r": "%I:%M:%S %p",\n              "%R": "%H:%M",\n              "%T": "%H:%M:%S",\n              "%x": "%m/%d/%y",\n              "%X": "%H:%M:%S",\n              "%Ec": "%c",\n              "%EC": "%C",\n              "%Ex": "%m/%d/%y",\n              "%EX": "%H:%M:%S",\n              "%Ey": "%y",\n              "%EY": "%Y",\n              "%Od": "%d",\n              "%Oe": "%e",\n              "%OH": "%H",\n              "%OI": "%I",\n              "%Om": "%m",\n              "%OM": "%M",\n              "%OS": "%S",\n              "%Ou": "%u",\n              "%OU": "%U",\n              "%OV": "%V",\n              "%Ow": "%w",\n              "%OW": "%W",\n              "%Oy": "%y"\n            };\n            for (var x in r)\n              c = c.replace(new RegExp(x, "g"), r[x]);\n            var B = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), N = "January February March April May June July August September October November December".split(" ");\n            r = { "%a": (h) => B[h.lb].substring(0, 3), "%A": (h) => B[h.lb], "%b": (h) => N[h.vb].substring(0, 3), "%B": (h) => N[h.vb], "%C": (h) => g((h.qb + 1900) / 100 | 0, 2), "%d": (h) => g(h.zb, 2), "%e": (h) => f(h.zb, 2, " "), "%g": (h) => q(h).toString().substring(2), "%G": (h) => q(h), "%H": (h) => g(h.ub, 2), "%I": (h) => {\n              h = h.ub;\n              0 == h ? h = 12 : 12 < h && (h -= 12);\n              return g(h, 2);\n            }, "%j": (h) => {\n              for (var u = 0, y = 0; y <= h.vb - 1; u += (Z(h.qb + 1900) ? Kc : Lc)[y++])\n                ;\n              return g(h.zb + u, 3);\n            }, "%m": (h) => g(h.vb + 1, 2), "%M": (h) => g(h.Ub, 2), "%n": () => "\\n", "%p": (h) => 0 <= h.ub && 12 > h.ub ? "AM" : "PM", "%S": (h) => g(h.Vb, 2), "%t": () => "	", "%u": (h) => h.lb || 7, "%U": (h) => g(Math.floor((h.pb + 7 - h.lb) / 7), 2), "%V": (h) => {\n              var u = Math.floor((h.pb + 7 - (h.lb + 6) % 7) / 7);\n              2 >= (h.lb + 371 - h.pb - 2) % 7 && u++;\n              if (u)\n                53 == u && (y = (h.lb + 371 - h.pb) % 7, 4 == y || 3 == y && Z(h.qb) || (u = 1));\n              else {\n                u = 52;\n                var y = (h.lb + 7 - h.pb - 1) % 7;\n                (4 == y || 5 == y && Z(h.qb % 400 - 1)) && u++;\n              }\n              return g(u, 2);\n            }, "%w": (h) => h.lb, "%W": (h) => g(Math.floor((h.pb + 7 - (h.lb + 6) % 7) / 7), 2), "%y": (h) => (h.qb + 1900).toString().substring(2), "%Y": (h) => h.qb + 1900, "%z": (h) => {\n              h = h.Tb;\n              var u = 0 <= h;\n              h = Math.abs(h) / 60;\n              return (u ? "+" : "-") + String("0000" + (h / 60 * 100 + h % 60)).slice(-4);\n            }, "%Z": (h) => h.Wb, "%%": () => "%" };\n            c = c.replace(/%%/g, "\\0\\0");\n            for (x in r)\n              c.includes(x) && (c = c.replace(new RegExp(x, "g"), r[x](d)));\n            c = c.replace(/\\0\\0/g, "%");\n            x = Mc(c);\n            if (x.length > b)\n              return 0;\n            Nc(x, a);\n            return x.length - 1;\n          };\n          P.wb();\n          for (var Pc = Array(256), Qc = 0; 256 > Qc; ++Qc)\n            Pc[Qc] = String.fromCharCode(Qc);\n          Eb = Pc;\n          Ib = A.BindingError = class extends Error {\n            constructor(a) {\n              super(a);\n              this.name = "BindingError";\n            }\n          };\n          A.InternalError = class extends Error {\n            constructor(a) {\n              super(a);\n              this.name = "InternalError";\n            }\n          };\n          Object.assign(Mb.prototype, { get(a) {\n            return this.mb[a];\n          }, has(a) {\n            return void 0 !== this.mb[a];\n          }, xb(a) {\n            var b = this.Ab.pop() || this.mb.length;\n            this.mb[b] = a;\n            return b;\n          }, yb(a) {\n            this.mb[a] = void 0;\n            this.Ab.push(a);\n          } });\n          V.mb.push({ value: void 0 }, { value: null }, { value: true }, { value: false });\n          V.tb = V.mb.length;\n          A.count_emval_handles = function() {\n            for (var a = 0, b = V.tb; b < V.mb.length; ++b)\n              void 0 !== V.mb[b] && ++a;\n            return a;\n          };\n          var Rc = [null, Ya, Za, lb, nb, ob, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, rc, sc, Dc, Ec, Fc, Gc, Hc, Jc], Tc = {\n            b: function(a, b, c) {\n              new ib(a).wb(b, c);\n              jb = a;\n              kb++;\n              throw jb;\n            },\n            fa: function(a) {\n              Sc(a, !D, 1, !na, 131072, false);\n              P.Db();\n            },\n            D: function(a) {\n              F ? postMessage({ cmd: "cleanupThread", thread: a }) : Ta(a);\n            },\n            W: mb,\n            y: nb,\n            la: ob,\n            S: sb,\n            U: tb,\n            L: ub,\n            ja: vb,\n            aa: wb,\n            ia: xb,\n            F: yb,\n            T: zb,\n            Q: Ab,\n            ka: Bb,\n            R: Cb,\n            I: function(a, b, c, d, f) {\n              b = S(b);\n              c = Lb(c);\n              var g = -1 != b.indexOf("u");\n              g && (f = (1n << 64n) - 1n);\n              U(a, { name: b, fromWireType: function(k) {\n                return k;\n              }, toWireType: function(k, l) {\n                if ("bigint" != typeof l && "number" != typeof l)\n                  throw new TypeError(`Cannot convert "${Db(l)}" to ${this.name}`);\n                if (l < d || l > f)\n                  throw new TypeError(`Passing a number "${Db(l)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${f}]!`);\n                return l;\n              }, argPackAdvance: 8, readValueFromPointer: Kb(b, c, !g), sb: null });\n            },\n            ra: function(a, b, c, d, f) {\n              var g = Lb(c);\n              b = S(b);\n              U(a, { name: b, fromWireType: function(k) {\n                return !!k;\n              }, toWireType: function(k, l) {\n                return l ? d : f;\n              }, argPackAdvance: 8, readValueFromPointer: function(k) {\n                if (1 === c)\n                  var l = e();\n                else if (2 === c)\n                  l = v();\n                else if (4 === c)\n                  l = w();\n                else\n                  throw new TypeError("Unknown boolean type size: " + b);\n                return this.fromWireType(l[k >> g]);\n              }, sb: null });\n            },\n            qa: function(a, b) {\n              b = S(b);\n              U(a, { name: b, fromWireType: function(c) {\n                var d = W(c);\n                Nb(c);\n                return d;\n              }, toWireType: function(c, d) {\n                return X(d);\n              }, argPackAdvance: 8, readValueFromPointer: Ob, sb: null });\n            },\n            H: function(a, b, c) {\n              c = Lb(c);\n              b = S(b);\n              U(a, { name: b, fromWireType: function(d) {\n                return d;\n              }, toWireType: function(d, f) {\n                return f;\n              }, argPackAdvance: 8, readValueFromPointer: Pb(b, c), sb: null });\n            },\n            t: function(a, b, c, d, f) {\n              b = S(b);\n              -1 === f && (f = 4294967295);\n              f = Lb(c);\n              var g = (l) => l;\n              if (0 === d) {\n                var k = 32 - 8 * c;\n                g = (l) => l << k >>> k;\n              }\n              c = b.includes("unsigned") ? function(l, q) {\n                return q >>> 0;\n              } : function(l, q) {\n                return q;\n              };\n              U(a, { name: b, fromWireType: g, toWireType: c, argPackAdvance: 8, readValueFromPointer: Kb(b, f, 0 !== d), sb: null });\n            },\n            m: function(a, b, c) {\n              function d(g) {\n                g >>= 2;\n                var k = z();\n                return new f(k.buffer, k[g + 1], k[g]);\n              }\n              var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];\n              c = S(c);\n              U(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { Ib: true });\n            },\n            J: function(a, b) {\n              b = S(b);\n              var c = "std::string" === b;\n              U(a, { name: b, fromWireType: function(d) {\n                var f = z()[d >> 2], g = d + 4;\n                if (c)\n                  for (var k = g, l = 0; l <= f; ++l) {\n                    var q = g + l;\n                    if (l == f || 0 == t()[q]) {\n                      k = Xa(k, q - k);\n                      if (void 0 === r)\n                        var r = k;\n                      else\n                        r += String.fromCharCode(0), r += k;\n                      k = q + 1;\n                    }\n                  }\n                else {\n                  r = Array(f);\n                  for (l = 0; l < f; ++l)\n                    r[l] = String.fromCharCode(t()[g + l]);\n                  r = r.join("");\n                }\n                Y(d);\n                return r;\n              }, toWireType: function(d, f) {\n                f instanceof ArrayBuffer && (f = new Uint8Array(f));\n                var g = "string" == typeof f;\n                g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || T("Cannot pass non-string to std::string");\n                var k = c && g ? pb(f) : f.length;\n                var l = tc(4 + k + 1), q = l + 4;\n                z()[l >> 2] = k;\n                if (c && g)\n                  rb(f, q, k + 1);\n                else if (g)\n                  for (g = 0; g < k; ++g) {\n                    var r = f.charCodeAt(g);\n                    255 < r && (Y(q), T("String has UTF-16 code units that do not fit in 8 bits"));\n                    t()[q + g] = r;\n                  }\n                else\n                  for (g = 0; g < k; ++g)\n                    t()[q + g] = f[g];\n                null !== d && d.push(Y, l);\n                return l;\n              }, argPackAdvance: 8, readValueFromPointer: Ob, sb: function(d) {\n                Y(d);\n              } });\n            },\n            A: function(a, b, c) {\n              c = S(c);\n              if (2 === b) {\n                var d = Rb;\n                var f = Sb;\n                var g = Tb;\n                var k = () => ca();\n                var l = 1;\n              } else\n                4 === b && (d = Ub, f = Vb, g = Wb, k = () => z(), l = 2);\n              U(a, {\n                name: c,\n                fromWireType: function(q) {\n                  for (var r = z()[q >> 2], x = k(), B, N = q + 4, h = 0; h <= r; ++h) {\n                    var u = q + 4 + h * b;\n                    if (h == r || 0 == x[u >> l])\n                      N = d(N, u - N), void 0 === B ? B = N : (B += String.fromCharCode(0), B += N), N = u + b;\n                  }\n                  Y(q);\n                  return B;\n                },\n                toWireType: function(q, r) {\n                  "string" != typeof r && T(`Cannot pass non-string to C++ string type ${c}`);\n                  var x = g(r), B = tc(4 + x + b);\n                  z()[B >> 2] = x >> l;\n                  f(r, B + 4, x + b);\n                  null !== q && q.push(Y, B);\n                  return B;\n                },\n                argPackAdvance: 8,\n                readValueFromPointer: Ob,\n                sb: function(q) {\n                  Y(q);\n                }\n              });\n            },\n            sa: function(a, b) {\n              b = S(b);\n              U(a, { Lb: true, name: b, argPackAdvance: 0, fromWireType: function() {\n              }, toWireType: function() {\n              } });\n            },\n            oa: () => true,\n            O: function(a, b) {\n              a == b ? setTimeout(() => cb()) : F ? postMessage({ targetThread: a, cmd: "checkMailbox" }) : (a = P.kb[a]) && a.postMessage({ cmd: "checkMailbox" });\n            },\n            da: function() {\n              return -1;\n            },\n            ea: Yb,\n            na: function(a) {\n              E && P.kb[a].ref();\n            },\n            s: function(a, b, c) {\n              a = W(a);\n              b = $b(b, "emval::as");\n              var d = [], f = X(d);\n              z()[c >> 2] = f;\n              return b.toWireType(d, a);\n            },\n            i: function(a, b, c, d, f) {\n              a = dc[a];\n              b = W(b);\n              c = cc(c);\n              var g = [];\n              z()[d >> 2] = X(g);\n              return a(b, c, g, f);\n            },\n            u: function(a, b, c, d) {\n              a = dc[a];\n              b = W(b);\n              c = cc(c);\n              a(b, c, null, d);\n            },\n            c: Nb,\n            K: function(a, b) {\n              a = W(a);\n              b = W(b);\n              return a == b;\n            },\n            o: function(a) {\n              if (0 === a)\n                return X(ec());\n              a = cc(a);\n              return X(ec()[a]);\n            },\n            h: function(a, b) {\n              var c = gc(a, b), d = c[0];\n              b = d.name + "_$" + c.slice(1).map(function(x) {\n                return x.name;\n              }).join("_") + "$";\n              var f = ic[b];\n              if (void 0 !== f)\n                return f;\n              f = ["retType"];\n              for (var g = [d], k = "", l = 0; l < a - 1; ++l)\n                k += (0 !== l ? ", " : "") + "arg" + l, f.push("argType" + l), g.push(c[1 + l]);\n              var q = "return function " + hc("methodCaller_" + b) + "(handle, name, destructors, args) {\\n", r = 0;\n              for (l = 0; l < a - 1; ++l)\n                q += "    var arg" + l + " = argType" + l + ".readValueFromPointer(args" + (r ? "+" + r : "") + ");\\n", r += c[l + 1].argPackAdvance;\n              q += "    var rv = handle[name](" + k + ");\\n";\n              for (l = 0; l < a - 1; ++l)\n                c[l + 1].deleteObject && (q += "    argType" + l + ".deleteObject(arg" + l + ");\\n");\n              d.Lb || (q += "    return retType.toWireType(destructors, rv);\\n");\n              f.push(q + "};\\n");\n              a = kc(f).apply(null, g);\n              f = fc(a);\n              return ic[b] = f;\n            },\n            r: function(a, b) {\n              a = W(a);\n              b = W(b);\n              return X(a[b]);\n            },\n            d: function(a) {\n              4 < a && (V.get(a).Bb += 1);\n            },\n            x: function(a, b, c, d) {\n              a = W(a);\n              var f = mc[b];\n              f || (f = lc(b), mc[b] = f);\n              return f(a, c, d);\n            },\n            v: function() {\n              return X([]);\n            },\n            l: function(a) {\n              a = W(a);\n              for (var b = Array(a.length), c = 0; c < a.length; c++)\n                b[c] = a[c];\n              return X(b);\n            },\n            e: function(a) {\n              return X(cc(a));\n            },\n            k: function() {\n              return X({});\n            },\n            g: function(a) {\n              for (var b = W(a); b.length; ) {\n                var c = b.pop();\n                b.pop()(c);\n              }\n              Nb(a);\n            },\n            j: function(a, b, c) {\n              a = W(a);\n              b = W(b);\n              c = W(c);\n              a[b] = c;\n            },\n            f: function(a, b) {\n              a = $b(a, "_emval_take_value");\n              a = a.readValueFromPointer(b);\n              return X(a);\n            },\n            Z: function(a, b) {\n              a = nc(a);\n              b = nc(b);\n              a = new Date(1e3 * a);\n              w()[b >> 2] = a.getUTCSeconds();\n              w()[b + 4 >> 2] = a.getUTCMinutes();\n              w()[b + 8 >> 2] = a.getUTCHours();\n              w()[b + 12 >> 2] = a.getUTCDate();\n              w()[b + 16 >> 2] = a.getUTCMonth();\n              w()[b + 20 >> 2] = a.getUTCFullYear() - 1900;\n              w()[b + 24 >> 2] = a.getUTCDay();\n              a = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;\n              w()[b + 28 >> 2] = a;\n            },\n            _: function(a, b) {\n              a = nc(a);\n              b = nc(b);\n              a = new Date(1e3 * a);\n              w()[b >> 2] = a.getSeconds();\n              w()[b + 4 >> 2] = a.getMinutes();\n              w()[b + 8 >> 2] = a.getHours();\n              w()[b + 12 >> 2] = a.getDate();\n              w()[b + 16 >> 2] = a.getMonth();\n              w()[b + 20 >> 2] = a.getFullYear() - 1900;\n              w()[b + 24 >> 2] = a.getDay();\n              var c = (Z(a.getFullYear()) ? oc : pc)[a.getMonth()] + a.getDate() - 1 | 0;\n              w()[b + 28 >> 2] = c;\n              w()[b + 36 >> 2] = -(60 * a.getTimezoneOffset());\n              c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();\n              var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();\n              a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;\n              w()[b + 32 >> 2] = a;\n            },\n            $: function(a) {\n              a = nc(a);\n              var b = new Date(w()[a + 20 >> 2] + 1900, w()[a + 16 >> 2], w()[a + 12 >> 2], w()[a + 8 >> 2], w()[a + 4 >> 2], w()[a >> 2], 0), c = w()[a + 32 >> 2], d = b.getTimezoneOffset(), f = new Date(\n                b.getFullYear(),\n                6,\n                1\n              ).getTimezoneOffset(), g = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), k = Math.min(g, f);\n              0 > c ? w()[a + 32 >> 2] = Number(f != g && k == d) : 0 < c != (k == d) && (f = Math.max(g, f), b.setTime(b.getTime() + 6e4 * ((0 < c ? k : f) - d)));\n              w()[a + 24 >> 2] = b.getDay();\n              c = (Z(b.getFullYear()) ? oc : pc)[b.getMonth()] + b.getDate() - 1 | 0;\n              w()[a + 28 >> 2] = c;\n              w()[a >> 2] = b.getSeconds();\n              w()[a + 4 >> 2] = b.getMinutes();\n              w()[a + 8 >> 2] = b.getHours();\n              w()[a + 12 >> 2] = b.getDate();\n              w()[a + 16 >> 2] = b.getMonth();\n              w()[a + 20 >> 2] = b.getYear();\n              return BigInt(b.getTime() / 1e3);\n            },\n            X: rc,\n            Y: sc,\n            N: (a, b, c) => {\n              function d(r) {\n                return (r = r.toTimeString().match(/\\(([A-Za-z ]+)\\)$/)) ? r[1] : "GMT";\n              }\n              var f = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(f, 0, 1), k = new Date(f, 6, 1);\n              f = g.getTimezoneOffset();\n              var l = k.getTimezoneOffset(), q = Math.max(f, l);\n              z()[a >> 2] = 60 * q;\n              w()[b >> 2] = Number(f != l);\n              a = d(g);\n              b = d(k);\n              a = uc(a);\n              b = uc(b);\n              l < f ? (z()[c >> 2] = a, z()[c + 4 >> 2] = b) : (z()[c >> 2] = b, z()[c + 4 >> 2] = a);\n            },\n            n: () => {\n              wa("");\n            },\n            E: function() {\n            },\n            G: function() {\n              return Date.now();\n            },\n            ma: () => {\n              Ga += 1;\n              throw "unwind";\n            },\n            P: () => 2147483648,\n            q: () => performance.timeOrigin + performance.now(),\n            w: function() {\n              return E ? (init_os(), __toCommonJS(os_exports)).cpus().length : navigator.hardwareConcurrency;\n            },\n            ca: function(a, b, c, d) {\n              P.$b = b;\n              c /= 2;\n              zc.length = c;\n              b = d >> 3;\n              for (d = 0; d < c; d++)\n                zc[d] = L[b + 2 * d] ? L[b + 2 * d + 1] : ha()[b + 2 * d + 1];\n              return Rc[a].apply(null, zc);\n            },\n            M: (a) => {\n              var b = t().length;\n              a >>>= 0;\n              if (a <= b || 2147483648 < a)\n                return false;\n              for (var c = 1; 4 >= c; c *= 2) {\n                var d = b * (1 + 0.2 / c);\n                d = Math.min(d, a + 100663296);\n                var f = Math;\n                d = Math.max(a, d);\n                a: {\n                  f = f.min.call(f, 2147483648, d + (65536 - d % 65536) % 65536) - m.buffer.byteLength + 65535 >>> 16;\n                  try {\n                    m.grow(f);\n                    p();\n                    var g = 1;\n                    break a;\n                  } catch (k) {\n                  }\n                  g = void 0;\n                }\n                if (g)\n                  return true;\n              }\n              return false;\n            },\n            ga: Dc,\n            ha: Ec,\n            V: $a,\n            z: Fc,\n            C: Gc,\n            ba: Hc,\n            B: Jc,\n            a: m || A.wasmMemory,\n            pa: Oc,\n            p: (a, b, c, d) => Oc(a, b, c, d)\n          };\n          (function() {\n            function a(c, d) {\n              J = c = c.exports;\n              P.Eb.push(J.Ya);\n              Ca = J.$a;\n              Ea.unshift(J.ta);\n              xa = d;\n              La();\n              return c;\n            }\n            var b = { a: Tc };\n            Ka();\n            if (A.instantiateWasm)\n              try {\n                return A.instantiateWasm(b, a);\n              } catch (c) {\n                H("Module.instantiateWasm callback failed with error: " + c), ka(c);\n              }\n            Qa(b, function(c) {\n              a(c.instance, c.module);\n            }).catch(ka);\n            return {};\n          })();\n          A._OrtInit = (a, b) => (A._OrtInit = J.ua)(a, b);\n          A._OrtGetLastError = (a, b) => (A._OrtGetLastError = J.va)(a, b);\n          A._OrtCreateSessionOptions = (a, b, c, d, f, g, k, l, q, r) => (A._OrtCreateSessionOptions = J.wa)(a, b, c, d, f, g, k, l, q, r);\n          A._OrtAppendExecutionProvider = (a, b) => (A._OrtAppendExecutionProvider = J.xa)(a, b);\n          A._OrtAddFreeDimensionOverride = (a, b, c) => (A._OrtAddFreeDimensionOverride = J.ya)(a, b, c);\n          A._OrtAddSessionConfigEntry = (a, b, c) => (A._OrtAddSessionConfigEntry = J.za)(a, b, c);\n          A._OrtReleaseSessionOptions = (a) => (A._OrtReleaseSessionOptions = J.Aa)(a);\n          A._OrtCreateSession = (a, b, c) => (A._OrtCreateSession = J.Ba)(a, b, c);\n          A._OrtReleaseSession = (a) => (A._OrtReleaseSession = J.Ca)(a);\n          A._OrtGetInputOutputCount = (a, b, c) => (A._OrtGetInputOutputCount = J.Da)(a, b, c);\n          A._OrtGetInputName = (a, b) => (A._OrtGetInputName = J.Ea)(a, b);\n          A._OrtGetOutputName = (a, b) => (A._OrtGetOutputName = J.Fa)(a, b);\n          A._OrtFree = (a) => (A._OrtFree = J.Ga)(a);\n          A._OrtCreateTensor = (a, b, c, d, f, g) => (A._OrtCreateTensor = J.Ha)(a, b, c, d, f, g);\n          A._OrtGetTensorData = (a, b, c, d, f) => (A._OrtGetTensorData = J.Ia)(a, b, c, d, f);\n          A._OrtReleaseTensor = (a) => (A._OrtReleaseTensor = J.Ja)(a);\n          A._OrtCreateRunOptions = (a, b, c, d) => (A._OrtCreateRunOptions = J.Ka)(a, b, c, d);\n          A._OrtAddRunConfigEntry = (a, b, c) => (A._OrtAddRunConfigEntry = J.La)(a, b, c);\n          A._OrtReleaseRunOptions = (a) => (A._OrtReleaseRunOptions = J.Ma)(a);\n          A._OrtCreateBinding = (a) => (A._OrtCreateBinding = J.Na)(a);\n          A._OrtBindInput = (a, b, c) => (A._OrtBindInput = J.Oa)(a, b, c);\n          A._OrtBindOutput = (a, b, c, d) => (A._OrtBindOutput = J.Pa)(a, b, c, d);\n          A._OrtClearBoundOutputs = (a) => (A._OrtClearBoundOutputs = J.Qa)(a);\n          A._OrtReleaseBinding = (a) => (A._OrtReleaseBinding = J.Ra)(a);\n          A._OrtRunWithBinding = (a, b, c, d, f) => (A._OrtRunWithBinding = J.Sa)(a, b, c, d, f);\n          A._OrtRun = (a, b, c, d, f, g, k, l) => (A._OrtRun = J.Ta)(a, b, c, d, f, g, k, l);\n          A._OrtEndProfiling = (a) => (A._OrtEndProfiling = J.Ua)(a);\n          var bb = A._pthread_self = () => (bb = A._pthread_self = J.Va)(), tc = A._malloc = (a) => (tc = A._malloc = J.Wa)(a), Y = A._free = (a) => (Y = A._free = J.Xa)(a);\n          A.__emscripten_tls_init = () => (A.__emscripten_tls_init = J.Ya)();\n          var ac = (a) => (ac = J.Za)(a);\n          A.__embind_initialize_bindings = () => (A.__embind_initialize_bindings = J._a)();\n          var Sc = A.__emscripten_thread_init = (a, b, c, d, f, g) => (Sc = A.__emscripten_thread_init = J.ab)(a, b, c, d, f, g);\n          A.__emscripten_thread_crashed = () => (A.__emscripten_thread_crashed = J.bb)();\n          var yc = (a, b, c, d) => (yc = J.cb)(a, b, c, d), ab = (a) => (ab = J.db)(a), hb = A.__emscripten_thread_exit = (a) => (hb = A.__emscripten_thread_exit = J.eb)(a), Zb = A.__emscripten_check_mailbox = () => (Zb = A.__emscripten_check_mailbox = J.fb)(), eb = (a, b) => (eb = J.gb)(a, b), vc = () => (vc = J.hb)(), fb = (a) => (fb = J.ib)(a), xc = (a) => (xc = J.jb)(a);\n          A.keepRuntimeAlive = Ha;\n          A.wasmMemory = m;\n          A.stackAlloc = xc;\n          A.stackSave = vc;\n          A.stackRestore = fb;\n          A.UTF8ToString = Xa;\n          A.stringToUTF8 = rb;\n          A.lengthBytesUTF8 = pb;\n          A.ExitStatus = Ra;\n          A.PThread = P;\n          var Uc;\n          Ja = function Vc() {\n            Uc || Wc();\n            Uc || (Ja = Vc);\n          };\n          function Wc() {\n            function a() {\n              if (!Uc && (Uc = true, A.calledRun = true, !ya)) {\n                F || db(Ea);\n                ja(A);\n                if (A.onRuntimeInitialized)\n                  A.onRuntimeInitialized();\n                if (!F) {\n                  if (A.postRun)\n                    for ("function" == typeof A.postRun && (A.postRun = [A.postRun]); A.postRun.length; ) {\n                      var b = A.postRun.shift();\n                      Fa.unshift(b);\n                    }\n                  db(Fa);\n                }\n              }\n            }\n            if (!(0 < M))\n              if (F)\n                ja(A), F || db(Ea), startWorker(A);\n              else {\n                if (A.preRun)\n                  for ("function" == typeof A.preRun && (A.preRun = [A.preRun]); A.preRun.length; )\n                    Da.unshift(A.preRun.shift());\n                db(Da);\n                0 < M || (A.setStatus ? (A.setStatus("Running..."), setTimeout(function() {\n                  setTimeout(\n                    function() {\n                      A.setStatus("");\n                    },\n                    1\n                  );\n                  a();\n                }, 1)) : a());\n              }\n          }\n          if (A.preInit)\n            for ("function" == typeof A.preInit && (A.preInit = [A.preInit]); 0 < A.preInit.length; )\n              A.preInit.pop()();\n          Wc();\n          return moduleArg.ready;\n        };\n      })();\n      if (typeof exports === "object" && typeof module === "object")\n        module.exports = ortWasmThreaded;\n      else if (typeof define === "function" && define["amd"])\n        define([], () => ortWasmThreaded);\n    }\n  });\n\n  // web/lib/wasm/binding/ort-wasm-threaded.worker.js\n  var require_ort_wasm_threaded_worker = __commonJS({\n    "web/lib/wasm/binding/ort-wasm-threaded.worker.js"(exports, module) {\n      module.exports = \'"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:f=>(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f),postMessage:msg=>parentPort.postMessage(msg),performance:global.performance||{now:Date.now}})}var initializedJS=false;function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"\\\\n");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var module=Module["wasmModule"];Module["wasmModule"]=null;var instance=new WebAssembly.Instance(module,info);return receiveInstance(instance)};self.onunhandledrejection=e=>{throw e.reason??e};function handleMessage(e){try{if(e.data.cmd==="load"){let messageQueue=[];self.onmessage=e=>messageQueue.push(e);self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"});for(let msg of messageQueue){handleMessage(msg)}self.onmessage=handleMessage};Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=(...args)=>{postMessage({cmd:"callHandler",handler:handler,args:args})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,/*isMainBrowserThread=*/0,/*isMainRuntimeThread=*/0,/*canBlock=*/1);Module["__emscripten_thread_mailbox_await"](e.data.pthread_ptr);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){Module["__embind_initialize_bindings"]();initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){throw ex}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="checkMailbox"){if(initializedJS){Module["checkMailbox"]()}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}}self.onmessage=handleMessage;\\n\';\n    }\n  });\n\n  // nodejs-ignore:node:path\n  var join = void 0;\n\n  // web/lib/wasm/wasm-factory.ts\n  var ortWasmFactory = true ? require_ort_wasm() : null;\n  var ortWasmFactoryThreaded = true ? true ? require_ort_wasm_threaded() : null : ortWasmFactory;\n  var wasm;\n  var initialized = false;\n  var initializing = false;\n  var aborted = false;\n  var isMultiThreadSupported = () => {\n    try {\n      if (typeof SharedArrayBuffer === "undefined") {\n        return false;\n      }\n      if (typeof MessageChannel !== "undefined") {\n        new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));\n      }\n      return WebAssembly.validate(new Uint8Array([\n        0,\n        97,\n        115,\n        109,\n        1,\n        0,\n        0,\n        0,\n        1,\n        4,\n        1,\n        96,\n        0,\n        0,\n        3,\n        2,\n        1,\n        0,\n        5,\n        4,\n        1,\n        3,\n        1,\n        1,\n        10,\n        11,\n        1,\n        9,\n        0,\n        65,\n        0,\n        254,\n        16,\n        2,\n        0,\n        26,\n        11\n      ]));\n    } catch (e) {\n      return false;\n    }\n  };\n  var isSimdSupported = () => {\n    try {\n      return WebAssembly.validate(new Uint8Array([\n        0,\n        97,\n        115,\n        109,\n        1,\n        0,\n        0,\n        0,\n        1,\n        4,\n        1,\n        96,\n        0,\n        0,\n        3,\n        2,\n        1,\n        0,\n        10,\n        30,\n        1,\n        28,\n        0,\n        65,\n        0,\n        253,\n        15,\n        253,\n        12,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        253,\n        186,\n        1,\n        26,\n        11\n      ]));\n    } catch (e) {\n      return false;\n    }\n  };\n  var getWasmFileName = (useSimd, useThreads) => {\n    if (useThreads) {\n      return useSimd ? "ort-wasm-simd-threaded.wasm" : "ort-wasm-threaded.wasm";\n    } else {\n      return useSimd ? "ort-wasm-simd.wasm" : "ort-wasm.wasm";\n    }\n  };\n  var initializeWebAssembly = async (flags) => {\n    if (initialized) {\n      return Promise.resolve();\n    }\n    if (initializing) {\n      throw new Error("multiple calls to \'initializeWebAssembly()\' detected.");\n    }\n    if (aborted) {\n      throw new Error("previous call to \'initializeWebAssembly()\' failed.");\n    }\n    initializing = true;\n    const timeout = flags.initTimeout;\n    const numThreads = flags.numThreads;\n    const simd = flags.simd;\n    const useThreads = numThreads > 1 && isMultiThreadSupported();\n    const useSimd = simd && isSimdSupported();\n    const wasmPaths = flags.wasmPaths;\n    const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;\n    const wasmFileName = getWasmFileName(useSimd, useThreads);\n    const wasmPathOverride = typeof wasmPaths === "object" ? wasmPaths[wasmFileName] : void 0;\n    let isTimeout = false;\n    const tasks = [];\n    if (timeout > 0) {\n      tasks.push(new Promise((resolve) => {\n        setTimeout(() => {\n          isTimeout = true;\n          resolve();\n        }, timeout);\n      }));\n    }\n    tasks.push(new Promise((resolve, reject) => {\n      const factory = useThreads ? ortWasmFactoryThreaded : ortWasmFactory;\n      const config = {\n        locateFile: (fileName, scriptDirectory) => {\n          if (useThreads && fileName.endsWith(".worker.js") && typeof Blob !== "undefined") {\n            return URL.createObjectURL(new Blob(\n              [\n                // This require() function is handled by esbuild plugin to load file content as string.\n                // eslint-disable-next-line @typescript-eslint/no-require-imports\n                require_ort_wasm_threaded_worker()\n              ],\n              { type: "text/javascript" }\n            ));\n          }\n          if (fileName.endsWith(".wasm")) {\n            if (wasmPathOverride) {\n              return wasmPathOverride;\n            }\n            const prefix = wasmPrefixOverride ?? scriptDirectory;\n            if (false) {\n              if (wasmFileName === "ort-wasm-simd.wasm") {\n                return prefix + "ort-wasm-simd.jsep.wasm";\n              } else if (wasmFileName === "ort-wasm-simd-threaded.wasm") {\n                return prefix + "ort-wasm-simd-threaded.jsep.wasm";\n              }\n            }\n            return prefix + wasmFileName;\n          }\n          return scriptDirectory + fileName;\n        }\n      };\n      if (useThreads) {\n        if (typeof Blob === "undefined") {\n          config.mainScriptUrlOrBlob = join(__dirname, "ort-wasm-threaded.js");\n        } else {\n          const scriptSourceCode = `var ortWasmThreaded=${factory.toString()};`;\n          config.mainScriptUrlOrBlob = new Blob([scriptSourceCode], { type: "text/javascript" });\n        }\n      }\n      factory(config).then(\n        // wasm module initialized successfully\n        (module) => {\n          initializing = false;\n          initialized = true;\n          wasm = module;\n          resolve();\n        },\n        // wasm module failed to initialize\n        (what) => {\n          initializing = false;\n          aborted = true;\n          reject(what);\n        }\n      );\n    }));\n    await Promise.race(tasks);\n    if (isTimeout) {\n      throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);\n    }\n  };\n  var getInstance = () => {\n    if (initialized && wasm) {\n      return wasm;\n    }\n    throw new Error("WebAssembly is not initialized yet.");\n  };\n\n  // web/lib/wasm/wasm-utils.ts\n  var allocWasmString = (data, allocs) => {\n    const wasm2 = getInstance();\n    const dataLength = wasm2.lengthBytesUTF8(data) + 1;\n    const dataOffset = wasm2._malloc(dataLength);\n    wasm2.stringToUTF8(data, dataOffset, dataLength);\n    allocs.push(dataOffset);\n    return dataOffset;\n  };\n  var iterateExtraOptions = (options, prefix, seen, handler) => {\n    if (typeof options == "object" && options !== null) {\n      if (seen.has(options)) {\n        throw new Error("Circular reference in options");\n      } else {\n        seen.add(options);\n      }\n    }\n    Object.entries(options).forEach(([key, value]) => {\n      const name = prefix ? prefix + key : key;\n      if (typeof value === "object") {\n        iterateExtraOptions(value, name + ".", seen, handler);\n      } else if (typeof value === "string" || typeof value === "number") {\n        handler(name, value.toString());\n      } else if (typeof value === "boolean") {\n        handler(name, value ? "1" : "0");\n      } else {\n        throw new Error(`Can\'t handle extra config type: ${typeof value}`);\n      }\n    });\n  };\n  var checkLastError = (message) => {\n    const wasm2 = getInstance();\n    const stack = wasm2.stackSave();\n    try {\n      const paramsOffset = wasm2.stackAlloc(8);\n      wasm2._OrtGetLastError(paramsOffset, paramsOffset + 4);\n      const errorCode = wasm2.HEAP32[paramsOffset / 4];\n      const errorMessagePointer = wasm2.HEAPU32[paramsOffset / 4 + 1];\n      const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";\n      throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);\n    } finally {\n      wasm2.stackRestore(stack);\n    }\n  };\n\n  // web/lib/wasm/run-options.ts\n  var setRunOptions = (options) => {\n    const wasm2 = getInstance();\n    let runOptionsHandle = 0;\n    const allocs = [];\n    const runOptions = options || {};\n    try {\n      if (options?.logSeverityLevel === void 0) {\n        runOptions.logSeverityLevel = 2;\n      } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {\n        throw new Error(`log serverity level is not valid: ${options.logSeverityLevel}`);\n      }\n      if (options?.logVerbosityLevel === void 0) {\n        runOptions.logVerbosityLevel = 0;\n      } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {\n        throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);\n      }\n      if (options?.terminate === void 0) {\n        runOptions.terminate = false;\n      }\n      let tagDataOffset = 0;\n      if (options?.tag !== void 0) {\n        tagDataOffset = allocWasmString(options.tag, allocs);\n      }\n      runOptionsHandle = wasm2._OrtCreateRunOptions(\n        runOptions.logSeverityLevel,\n        runOptions.logVerbosityLevel,\n        !!runOptions.terminate,\n        tagDataOffset\n      );\n      if (runOptionsHandle === 0) {\n        checkLastError("Can\'t create run options.");\n      }\n      if (options?.extra !== void 0) {\n        iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {\n          const keyDataOffset = allocWasmString(key, allocs);\n          const valueDataOffset = allocWasmString(value, allocs);\n          if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n            checkLastError(`Can\'t set a run config entry: ${key} - ${value}.`);\n          }\n        });\n      }\n      return [runOptionsHandle, allocs];\n    } catch (e) {\n      if (runOptionsHandle !== 0) {\n        wasm2._OrtReleaseRunOptions(runOptionsHandle);\n      }\n      allocs.forEach((alloc) => wasm2._free(alloc));\n      throw e;\n    }\n  };\n\n  // web/lib/wasm/session-options.ts\n  var getGraphOptimzationLevel = (graphOptimizationLevel) => {\n    switch (graphOptimizationLevel) {\n      case "disabled":\n        return 0;\n      case "basic":\n        return 1;\n      case "extended":\n        return 2;\n      case "all":\n        return 99;\n      default:\n        throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);\n    }\n  };\n  var getExecutionMode = (executionMode) => {\n    switch (executionMode) {\n      case "sequential":\n        return 0;\n      case "parallel":\n        return 1;\n      default:\n        throw new Error(`unsupported execution mode: ${executionMode}`);\n    }\n  };\n  var appendDefaultOptions = (options) => {\n    if (!options.extra) {\n      options.extra = {};\n    }\n    if (!options.extra.session) {\n      options.extra.session = {};\n    }\n    const session = options.extra.session;\n    if (!session.use_ort_model_bytes_directly) {\n      session.use_ort_model_bytes_directly = "1";\n    }\n    if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {\n      options.enableMemPattern = false;\n    }\n  };\n  var setExecutionProviders = (sessionOptionsHandle, executionProviders, allocs) => {\n    for (const ep of executionProviders) {\n      let epName = typeof ep === "string" ? ep : ep.name;\n      switch (epName) {\n        case "xnnpack":\n          epName = "XNNPACK";\n          break;\n        case "webnn":\n          epName = "WEBNN";\n          if (typeof ep !== "string") {\n            const webnnOptions = ep;\n            if (webnnOptions?.deviceType) {\n              const keyDataOffset = allocWasmString("deviceType", allocs);\n              const valueDataOffset = allocWasmString(webnnOptions.deviceType, allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(`Can\'t set a session config entry: \'deviceType\' - ${webnnOptions.deviceType}.`);\n              }\n            }\n            if (webnnOptions?.powerPreference) {\n              const keyDataOffset = allocWasmString("powerPreference", allocs);\n              const valueDataOffset = allocWasmString(webnnOptions.powerPreference, allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(\n                  `Can\'t set a session config entry: \'powerPreference\' - ${webnnOptions.powerPreference}.`\n                );\n              }\n            }\n          }\n          break;\n        case "webgpu":\n          epName = "JS";\n          if (typeof ep !== "string") {\n            const webgpuOptions = ep;\n            if (webgpuOptions?.preferredLayout) {\n              if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {\n                throw new Error(`preferredLayout must be either \'NCHW\' or \'NHWC\': ${webgpuOptions.preferredLayout}`);\n              }\n              const keyDataOffset = allocWasmString("preferredLayout", allocs);\n              const valueDataOffset = allocWasmString(webgpuOptions.preferredLayout, allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(\n                  `Can\'t set a session config entry: \'preferredLayout\' - ${webgpuOptions.preferredLayout}.`\n                );\n              }\n            }\n          }\n          break;\n        case "wasm":\n        case "cpu":\n          continue;\n        default:\n          throw new Error(`not supported execution provider: ${epName}`);\n      }\n      const epNameDataOffset = allocWasmString(epName, allocs);\n      if (getInstance()._OrtAppendExecutionProvider(sessionOptionsHandle, epNameDataOffset) !== 0) {\n        checkLastError(`Can\'t append execution provider: ${epName}.`);\n      }\n    }\n  };\n  var setSessionOptions = (options) => {\n    const wasm2 = getInstance();\n    let sessionOptionsHandle = 0;\n    const allocs = [];\n    const sessionOptions = options || {};\n    appendDefaultOptions(sessionOptions);\n    try {\n      const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");\n      const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");\n      const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;\n      const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;\n      if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {\n        throw new Error(`log serverity level is not valid: ${logSeverityLevel}`);\n      }\n      const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;\n      if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {\n        throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);\n      }\n      const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;\n      sessionOptionsHandle = wasm2._OrtCreateSessionOptions(\n        graphOptimizationLevel,\n        !!sessionOptions.enableCpuMemArena,\n        !!sessionOptions.enableMemPattern,\n        executionMode,\n        !!sessionOptions.enableProfiling,\n        0,\n        logIdDataOffset,\n        logSeverityLevel,\n        logVerbosityLevel,\n        optimizedModelFilePathOffset\n      );\n      if (sessionOptionsHandle === 0) {\n        checkLastError("Can\'t create session options.");\n      }\n      if (sessionOptions.executionProviders) {\n        setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);\n      }\n      if (sessionOptions.freeDimensionOverrides) {\n        for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {\n          if (typeof name !== "string") {\n            throw new Error(`free dimension override name must be a string: ${name}`);\n          }\n          if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {\n            throw new Error(`free dimension override value must be a non-negative integer: ${value}`);\n          }\n          const nameOffset = allocWasmString(name, allocs);\n          if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {\n            checkLastError(`Can\'t set a free dimension override: ${name} - ${value}.`);\n          }\n        }\n      }\n      if (sessionOptions.extra !== void 0) {\n        iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {\n          const keyDataOffset = allocWasmString(key, allocs);\n          const valueDataOffset = allocWasmString(value, allocs);\n          if (wasm2._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n            checkLastError(`Can\'t set a session config entry: ${key} - ${value}.`);\n          }\n        });\n      }\n      return [sessionOptionsHandle, allocs];\n    } catch (e) {\n      if (sessionOptionsHandle !== 0) {\n        wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);\n      }\n      allocs.forEach((alloc) => wasm2._free(alloc));\n      throw e;\n    }\n  };\n\n  // web/lib/wasm/wasm-common.ts\n  var tensorDataTypeStringToEnum = (type) => {\n    switch (type) {\n      case "int8":\n        return 3 /* int8 */;\n      case "uint8":\n        return 2 /* uint8 */;\n      case "bool":\n        return 9 /* bool */;\n      case "int16":\n        return 5 /* int16 */;\n      case "uint16":\n        return 4 /* uint16 */;\n      case "int32":\n        return 6 /* int32 */;\n      case "uint32":\n        return 12 /* uint32 */;\n      case "float16":\n        return 10 /* float16 */;\n      case "float32":\n        return 1 /* float */;\n      case "float64":\n        return 11 /* double */;\n      case "string":\n        return 8 /* string */;\n      case "int64":\n        return 7 /* int64 */;\n      case "uint64":\n        return 13 /* uint64 */;\n      default:\n        throw new Error(`unsupported data type: ${type}`);\n    }\n  };\n  var tensorDataTypeEnumToString = (typeProto) => {\n    switch (typeProto) {\n      case 3 /* int8 */:\n        return "int8";\n      case 2 /* uint8 */:\n        return "uint8";\n      case 9 /* bool */:\n        return "bool";\n      case 5 /* int16 */:\n        return "int16";\n      case 4 /* uint16 */:\n        return "uint16";\n      case 6 /* int32 */:\n        return "int32";\n      case 12 /* uint32 */:\n        return "uint32";\n      case 10 /* float16 */:\n        return "float16";\n      case 1 /* float */:\n        return "float32";\n      case 11 /* double */:\n        return "float64";\n      case 8 /* string */:\n        return "string";\n      case 7 /* int64 */:\n        return "int64";\n      case 13 /* uint64 */:\n        return "uint64";\n      default:\n        throw new Error(`unsupported data type: ${typeProto}`);\n    }\n  };\n  var getTensorElementSize = (dateType) => [void 0, 4, 1, 1, 2, 2, 4, 8, void 0, 1, 2, 8, 4, 8, void 0, void 0, void 0][dateType];\n  var tensorTypeToTypedArrayConstructor = (type) => {\n    switch (type) {\n      case "float16":\n        return Uint16Array;\n      case "float32":\n        return Float32Array;\n      case "uint8":\n        return Uint8Array;\n      case "int8":\n        return Int8Array;\n      case "uint16":\n        return Uint16Array;\n      case "int16":\n        return Int16Array;\n      case "int32":\n        return Int32Array;\n      case "bool":\n        return Uint8Array;\n      case "float64":\n        return Float64Array;\n      case "uint32":\n        return Uint32Array;\n      case "int64":\n        return BigInt64Array;\n      case "uint64":\n        return BigUint64Array;\n      default:\n        throw new Error(`unsupported type: ${type}`);\n    }\n  };\n  var logLevelStringToEnum = (logLevel) => {\n    switch (logLevel) {\n      case "verbose":\n        return 0;\n      case "info":\n        return 1;\n      case "warning":\n        return 2;\n      case "error":\n        return 3;\n      case "fatal":\n        return 4;\n      default:\n        throw new Error(`unsupported logging level: ${logLevel}`);\n    }\n  };\n  var isGpuBufferSupportedType = (type) => type === "float32" || type === "int32" || type === "int64" || type === "bool" || type === "float16" || type === "uint32";\n  var dataLocationStringToEnum = (location) => {\n    switch (location) {\n      case "none":\n        return 0;\n      case "cpu":\n        return 1;\n      case "cpu-pinned":\n        return 2;\n      case "texture":\n        return 3;\n      case "gpu-buffer":\n        return 4;\n      default:\n        throw new Error(`unsupported data location: ${location}`);\n    }\n  };\n\n  // web/lib/wasm/wasm-core-impl.ts\n  var getSessionInputOutputCount = (sessionHandle) => {\n    const wasm2 = getInstance();\n    const stack = wasm2.stackSave();\n    try {\n      const dataOffset = wasm2.stackAlloc(8);\n      const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + 4);\n      if (errorCode !== 0) {\n        checkLastError("Can\'t get session input/output count.");\n      }\n      return [wasm2.HEAP32[dataOffset / 4], wasm2.HEAP32[dataOffset / 4 + 1]];\n    } finally {\n      wasm2.stackRestore(stack);\n    }\n  };\n  var initOrt = (numThreads, loggingLevel) => {\n    const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);\n    if (errorCode !== 0) {\n      checkLastError("Can\'t initialize onnxruntime.");\n    }\n  };\n  var initRuntime = async (env) => {\n    initOrt(env.wasm.numThreads, logLevelStringToEnum(env.logLevel));\n    if (false) {\n      const initJsep = null.init;\n      await initJsep(getInstance(), env);\n    }\n  };\n  var activeSessions = /* @__PURE__ */ new Map();\n  var createSessionAllocate = (model) => {\n    const wasm2 = getInstance();\n    const modelDataOffset = wasm2._malloc(model.byteLength);\n    if (modelDataOffset === 0) {\n      throw new Error(`Can\'t create a session. failed to allocate a buffer of size ${model.byteLength}.`);\n    }\n    wasm2.HEAPU8.set(model, modelDataOffset);\n    return [modelDataOffset, model.byteLength];\n  };\n  var createSessionFinalize = (modelData, options) => {\n    const wasm2 = getInstance();\n    let sessionHandle = 0;\n    let sessionOptionsHandle = 0;\n    let ioBindingHandle = 0;\n    let allocs = [];\n    const inputNamesUTF8Encoded = [];\n    const outputNamesUTF8Encoded = [];\n    try {\n      [sessionOptionsHandle, allocs] = setSessionOptions(options);\n      sessionHandle = wasm2._OrtCreateSession(modelData[0], modelData[1], sessionOptionsHandle);\n      if (sessionHandle === 0) {\n        checkLastError("Can\'t create a session.");\n      }\n      const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);\n      const inputNames = [];\n      const outputNames = [];\n      const outputPreferredLocations = [];\n      for (let i = 0; i < inputCount; i++) {\n        const name = wasm2._OrtGetInputName(sessionHandle, i);\n        if (name === 0) {\n          checkLastError("Can\'t get an input name.");\n        }\n        inputNamesUTF8Encoded.push(name);\n        inputNames.push(wasm2.UTF8ToString(name));\n      }\n      for (let i = 0; i < outputCount; i++) {\n        const name = wasm2._OrtGetOutputName(sessionHandle, i);\n        if (name === 0) {\n          checkLastError("Can\'t get an output name.");\n        }\n        outputNamesUTF8Encoded.push(name);\n        const nameString = wasm2.UTF8ToString(name);\n        outputNames.push(nameString);\n        if (false) {\n          const location = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";\n          if (location !== "cpu" && location !== "cpu-pinned" && location !== "gpu-buffer") {\n            throw new Error(`Not supported preferred output location: ${location}.`);\n          }\n          outputPreferredLocations.push(location);\n        }\n      }\n      let bindingState = null;\n      if (false) {\n        ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);\n        if (ioBindingHandle === 0) {\n          checkLastError("Can\'t create IO binding.");\n        }\n        bindingState = {\n          handle: ioBindingHandle,\n          outputPreferredLocations,\n          outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => dataLocationStringToEnum(l))\n        };\n      }\n      activeSessions.set(sessionHandle, [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, bindingState]);\n      return [sessionHandle, inputNames, outputNames];\n    } catch (e) {\n      inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n      outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n      if (ioBindingHandle !== 0) {\n        wasm2._OrtReleaseBinding(ioBindingHandle);\n      }\n      if (sessionHandle !== 0) {\n        wasm2._OrtReleaseSession(sessionHandle);\n      }\n      throw e;\n    } finally {\n      wasm2._free(modelData[0]);\n      if (sessionOptionsHandle !== 0) {\n        wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);\n      }\n      allocs.forEach((alloc) => wasm2._free(alloc));\n    }\n  };\n  var createSession = (model, options) => {\n    const modelData = createSessionAllocate(model);\n    return createSessionFinalize(modelData, options);\n  };\n  var releaseSession = (sessionId) => {\n    const wasm2 = getInstance();\n    const session = activeSessions.get(sessionId);\n    if (!session) {\n      throw new Error(`cannot release session. invalid session id: ${sessionId}`);\n    }\n    const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;\n    if (ioBindingState) {\n      wasm2._OrtReleaseBinding(ioBindingState.handle);\n    }\n    wasm2.jsepUnregisterBuffers?.(sessionId);\n    inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n    outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n    wasm2._OrtReleaseSession(sessionHandle);\n    activeSessions.delete(sessionId);\n  };\n  var prepareInputOutputTensor = (tensor, tensorHandles, allocs, sessionId, index) => {\n    if (!tensor) {\n      tensorHandles.push(0);\n      return;\n    }\n    const wasm2 = getInstance();\n    const dataType = tensor[0];\n    const dims = tensor[1];\n    const location = tensor[3];\n    let rawData;\n    let dataByteLength;\n    if (dataType === "string" && location === "gpu-buffer") {\n      throw new Error("String tensor is not supported on GPU.");\n    }\n    if (location === "gpu-buffer") {\n      const gpuBuffer = tensor[2].gpuBuffer;\n      const elementSizeInBytes = getTensorElementSize(tensorDataTypeStringToEnum(dataType));\n      dataByteLength = dims.reduce((a, b) => a * b, 1) * elementSizeInBytes;\n      rawData = wasm2.jsepRegisterBuffer(sessionId, index, gpuBuffer, dataByteLength);\n    } else {\n      const data = tensor[2];\n      if (Array.isArray(data)) {\n        dataByteLength = 4 * data.length;\n        rawData = wasm2._malloc(dataByteLength);\n        allocs.push(rawData);\n        let dataIndex = rawData / 4;\n        for (let i = 0; i < data.length; i++) {\n          if (typeof data[i] !== "string") {\n            throw new TypeError(`tensor data at index ${i} is not a string`);\n          }\n          wasm2.HEAPU32[dataIndex++] = allocWasmString(data[i], allocs);\n        }\n      } else {\n        dataByteLength = data.byteLength;\n        rawData = wasm2._malloc(dataByteLength);\n        allocs.push(rawData);\n        wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);\n      }\n    }\n    const stack = wasm2.stackSave();\n    const dimsOffset = wasm2.stackAlloc(4 * dims.length);\n    try {\n      let dimIndex = dimsOffset / 4;\n      dims.forEach((d) => wasm2.HEAP32[dimIndex++] = d);\n      const tensor2 = wasm2._OrtCreateTensor(\n        tensorDataTypeStringToEnum(dataType),\n        rawData,\n        dataByteLength,\n        dimsOffset,\n        dims.length,\n        dataLocationStringToEnum(location)\n      );\n      if (tensor2 === 0) {\n        checkLastError(`Can\'t create tensor for input/output. session=${sessionId}, index=${index}.`);\n      }\n      tensorHandles.push(tensor2);\n    } finally {\n      wasm2.stackRestore(stack);\n    }\n  };\n  var run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {\n    const wasm2 = getInstance();\n    const session = activeSessions.get(sessionId);\n    if (!session) {\n      throw new Error(`cannot run inference. invalid session id: ${sessionId}`);\n    }\n    const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;\n    const inputCount = inputIndices.length;\n    const outputCount = outputIndices.length;\n    let runOptionsHandle = 0;\n    let runOptionsAllocs = [];\n    const inputTensorHandles = [];\n    const outputTensorHandles = [];\n    const inputOutputAllocs = [];\n    const beforeRunStack = wasm2.stackSave();\n    const inputValuesOffset = wasm2.stackAlloc(inputCount * 4);\n    const inputNamesOffset = wasm2.stackAlloc(inputCount * 4);\n    const outputValuesOffset = wasm2.stackAlloc(outputCount * 4);\n    const outputNamesOffset = wasm2.stackAlloc(outputCount * 4);\n    try {\n      [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);\n      for (let i = 0; i < inputCount; i++) {\n        prepareInputOutputTensor(inputTensors[i], inputTensorHandles, inputOutputAllocs, sessionId, inputIndices[i]);\n      }\n      for (let i = 0; i < outputCount; i++) {\n        prepareInputOutputTensor(\n          outputTensors[i],\n          outputTensorHandles,\n          inputOutputAllocs,\n          sessionId,\n          inputCount + outputIndices[i]\n        );\n      }\n      let inputValuesIndex = inputValuesOffset / 4;\n      let inputNamesIndex = inputNamesOffset / 4;\n      let outputValuesIndex = outputValuesOffset / 4;\n      let outputNamesIndex = outputNamesOffset / 4;\n      for (let i = 0; i < inputCount; i++) {\n        wasm2.HEAPU32[inputValuesIndex++] = inputTensorHandles[i];\n        wasm2.HEAPU32[inputNamesIndex++] = inputNamesUTF8Encoded[inputIndices[i]];\n      }\n      for (let i = 0; i < outputCount; i++) {\n        wasm2.HEAPU32[outputValuesIndex++] = outputTensorHandles[i];\n        wasm2.HEAPU32[outputNamesIndex++] = outputNamesUTF8Encoded[outputIndices[i]];\n      }\n      if (false) {\n        const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;\n        if (inputNamesUTF8Encoded.length !== inputCount) {\n          throw new Error(`input count from feeds (${inputCount}) is expected to be always equal to model\'s input count (${inputNamesUTF8Encoded.length}).`);\n        }\n        for (let i = 0; i < inputCount; i++) {\n          const index = inputIndices[i];\n          const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);\n          if (errorCode2 !== 0) {\n            checkLastError(`Can\'t bind input[${i}] for session=${sessionId}.`);\n          }\n        }\n        for (let i = 0; i < outputCount; i++) {\n          const index = outputIndices[i];\n          const location = outputTensors[i]?.[3];\n          if (location) {\n            const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);\n            if (errorCode2 !== 0) {\n              checkLastError(`Can\'t bind pre-allocated output[${i}] for session=${sessionId}.`);\n            }\n          } else {\n            const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], 0, outputPreferredLocationsEncoded[index]);\n            if (errorCode2 !== 0) {\n              checkLastError(`Can\'t bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);\n            }\n          }\n        }\n      }\n      let errorCode;\n      if (false) {\n        errorCode = await wasm2._OrtRunWithBinding(\n          sessionHandle,\n          ioBindingState.handle,\n          outputCount,\n          outputValuesOffset,\n          runOptionsHandle\n        );\n      } else {\n        errorCode = await wasm2._OrtRun(\n          sessionHandle,\n          inputNamesOffset,\n          inputValuesOffset,\n          inputCount,\n          outputNamesOffset,\n          outputCount,\n          outputValuesOffset,\n          runOptionsHandle\n        );\n      }\n      if (errorCode !== 0) {\n        checkLastError("failed to call OrtRun().");\n      }\n      const output = [];\n      for (let i = 0; i < outputCount; i++) {\n        const tensor = wasm2.HEAPU32[outputValuesOffset / 4 + i];\n        if (tensor === outputTensorHandles[i]) {\n          output.push(outputTensors[i]);\n          continue;\n        }\n        const beforeGetTensorDataStack = wasm2.stackSave();\n        const tensorDataOffset = wasm2.stackAlloc(4 * 4);\n        let keepOutputTensor = false;\n        let type, dataOffset = 0;\n        try {\n          const errorCode2 = wasm2._OrtGetTensorData(\n            tensor,\n            tensorDataOffset,\n            tensorDataOffset + 4,\n            tensorDataOffset + 8,\n            tensorDataOffset + 12\n          );\n          if (errorCode2 !== 0) {\n            checkLastError(`Can\'t access output tensor data on index ${i}.`);\n          }\n          let tensorDataIndex = tensorDataOffset / 4;\n          const dataType = wasm2.HEAPU32[tensorDataIndex++];\n          dataOffset = wasm2.HEAPU32[tensorDataIndex++];\n          const dimsOffset = wasm2.HEAPU32[tensorDataIndex++];\n          const dimsLength = wasm2.HEAPU32[tensorDataIndex++];\n          const dims = [];\n          for (let i2 = 0; i2 < dimsLength; i2++) {\n            dims.push(wasm2.HEAPU32[dimsOffset / 4 + i2]);\n          }\n          wasm2._OrtFree(dimsOffset);\n          const size = dims.reduce((a, b) => a * b, 1);\n          type = tensorDataTypeEnumToString(dataType);\n          const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];\n          if (type === "string") {\n            if (preferredLocation === "gpu-buffer") {\n              throw new Error("String tensor is not supported on GPU.");\n            }\n            const stringData = [];\n            let dataIndex = dataOffset / 4;\n            for (let i2 = 0; i2 < size; i2++) {\n              const offset = wasm2.HEAPU32[dataIndex++];\n              const maxBytesToRead = i2 === size - 1 ? void 0 : wasm2.HEAPU32[dataIndex] - offset;\n              stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));\n            }\n            output.push([type, dims, stringData, "cpu"]);\n          } else {\n            if (preferredLocation === "gpu-buffer" && size > 0) {\n              const gpuBuffer = wasm2.jsepGetBuffer(dataOffset);\n              const elementSize = getTensorElementSize(dataType);\n              if (elementSize === void 0 || !isGpuBufferSupportedType(type)) {\n                throw new Error(`Unsupported data type: ${type}`);\n              }\n              keepOutputTensor = true;\n              output.push([\n                type,\n                dims,\n                {\n                  gpuBuffer,\n                  download: wasm2.jsepCreateDownloader(gpuBuffer, size * elementSize, type),\n                  dispose: () => {\n                    wasm2._OrtReleaseTensor(tensor);\n                  }\n                },\n                "gpu-buffer"\n              ]);\n            } else {\n              const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);\n              const data = new typedArrayConstructor(size);\n              new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength));\n              output.push([type, dims, data, "cpu"]);\n            }\n          }\n        } finally {\n          wasm2.stackRestore(beforeGetTensorDataStack);\n          if (type === "string" && dataOffset) {\n            wasm2._free(dataOffset);\n          }\n          if (!keepOutputTensor) {\n            wasm2._OrtReleaseTensor(tensor);\n          }\n        }\n      }\n      if (ioBindingState) {\n        wasm2._OrtClearBoundOutputs(ioBindingState.handle);\n      }\n      return output;\n    } finally {\n      wasm2.stackRestore(beforeRunStack);\n      inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));\n      outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));\n      inputOutputAllocs.forEach((p) => wasm2._free(p));\n      if (runOptionsHandle !== 0) {\n        wasm2._OrtReleaseRunOptions(runOptionsHandle);\n      }\n      runOptionsAllocs.forEach((p) => wasm2._free(p));\n    }\n  };\n  var endProfiling = (sessionId) => {\n    const wasm2 = getInstance();\n    const session = activeSessions.get(sessionId);\n    if (!session) {\n      throw new Error("invalid session id");\n    }\n    const sessionHandle = session[0];\n    const profileFileName = wasm2._OrtEndProfiling(sessionHandle);\n    if (profileFileName === 0) {\n      checkLastError("Can\'t get an profile file name.");\n    }\n    wasm2._OrtFree(profileFileName);\n  };\n  var extractTransferableBuffers = (tensors) => {\n    const buffers = [];\n    for (const tensor of tensors) {\n      const data = tensor[2];\n      if (!Array.isArray(data) && "buffer" in data) {\n        buffers.push(data.buffer);\n      }\n    }\n    return buffers;\n  };\n\n  // web/lib/wasm/proxy-worker/main.ts\n  self.onmessage = (ev) => {\n    switch (ev.data.type) {\n      case "init-wasm":\n        try {\n          initializeWebAssembly(ev.data.in).then(\n            () => postMessage({ type: "init-wasm" }),\n            (err) => postMessage({ type: "init-wasm", err })\n          );\n        } catch (err) {\n          postMessage({ type: "init-wasm", err });\n        }\n        break;\n      case "init-ort":\n        try {\n          initRuntime(ev.data.in).then(() => postMessage({ type: "init-ort" }), (err) => postMessage({\n            type: "init-ort",\n            err\n          }));\n        } catch (err) {\n          postMessage({ type: "init-ort", err });\n        }\n        break;\n      case "create_allocate":\n        try {\n          const { model } = ev.data.in;\n          const modeldata = createSessionAllocate(model);\n          postMessage({ type: "create_allocate", out: modeldata });\n        } catch (err) {\n          postMessage({ type: "create_allocate", err });\n        }\n        break;\n      case "create_finalize":\n        try {\n          const { modeldata, options } = ev.data.in;\n          const sessionMetadata = createSessionFinalize(modeldata, options);\n          postMessage({ type: "create_finalize", out: sessionMetadata });\n        } catch (err) {\n          postMessage({ type: "create_finalize", err });\n        }\n        break;\n      case "create":\n        try {\n          const { model, options } = ev.data.in;\n          const sessionMetadata = createSession(model, options);\n          postMessage({ type: "create", out: sessionMetadata });\n        } catch (err) {\n          postMessage({ type: "create", err });\n        }\n        break;\n      case "release":\n        try {\n          const handler = ev.data.in;\n          releaseSession(handler);\n          postMessage({ type: "release" });\n        } catch (err) {\n          postMessage({ type: "release", err });\n        }\n        break;\n      case "run":\n        try {\n          const { sessionId, inputIndices, inputs, outputIndices, options } = ev.data.in;\n          run(sessionId, inputIndices, inputs, outputIndices, options).then(\n            (outputs) => {\n              postMessage({ type: "run", out: outputs }, extractTransferableBuffers(outputs));\n            },\n            (err) => {\n              postMessage({ type: "run", err });\n            }\n          );\n        } catch (err) {\n          postMessage({ type: "run", err });\n        }\n        break;\n      case "end-profiling":\n        try {\n          const handler = ev.data.in;\n          endProfiling(handler);\n          postMessage({ type: "end-profiling" });\n        } catch (err) {\n          postMessage({ type: "end-profiling", err });\n        }\n        break;\n      default:\n    }\n  };\n})();\n//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZWpzLWlnbm9yZTpmcyIsICJub2RlanMtaWdub3JlOnBhdGgiLCAiLi4vbGliL3dhc20vYmluZGluZy9vcnQtd2FzbS5qcyIsICJub2RlanMtaWdub3JlOndvcmtlcl90aHJlYWRzIiwgIm5vZGVqcy1pZ25vcmU6cGVyZl9ob29rcyIsICJub2RlanMtaWdub3JlOm9zIiwgIi4uL2xpYi93YXNtL2JpbmRpbmcvb3J0LXdhc20tdGhyZWFkZWQuanMiLCAiLi4vbGliL3dhc20vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZC53b3JrZXIuanMiLCAibm9kZWpzLWlnbm9yZTpub2RlOnBhdGgiLCAiLi4vbGliL3dhc20vd2FzbS1mYWN0b3J5LnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMudHMiLCAiLi4vbGliL3dhc20vcnVuLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1vcHRpb25zLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29tbW9uLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29yZS1pbXBsLnRzIiwgIi4uL2xpYi93YXNtL3Byb3h5LXdvcmtlci9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY29uc3QgcmVhZEZpbGUgPSB1bmRlZmluZWQ7IiwgImV4cG9ydCBjb25zdCBqb2luID0gdW5kZWZpbmVkOyIsICJcbnZhciBvcnRXYXNtID0gKCgpID0+IHtcbiAgdmFyIF9zY3JpcHREaXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgPyBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYyA6IHVuZGVmaW5lZDtcbiAgaWYgKHR5cGVvZiBfX2ZpbGVuYW1lICE9PSAndW5kZWZpbmVkJykgX3NjcmlwdERpciA9IF9zY3JpcHREaXIgfHwgX19maWxlbmFtZTtcbiAgcmV0dXJuIChcbmZ1bmN0aW9uKG1vZHVsZUFyZyA9IHt9KSB7XG5cbnZhciBmPW1vZHVsZUFyZyxhYSxtO2YucmVhZHk9bmV3IFByb21pc2UoKGEsYik9PnthYT1hO209Yn0pO3ZhciBiYT1PYmplY3QuYXNzaWduKHt9LGYpLGNhPVwiLi90aGlzLnByb2dyYW1cIixkYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93LHE9XCJmdW5jdGlvblwiPT10eXBlb2YgaW1wb3J0U2NyaXB0cyxlYT1cIm9iamVjdFwiPT10eXBlb2YgcHJvY2VzcyYmXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MudmVyc2lvbnMmJlwic3RyaW5nXCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUsdD1cIlwiLGZhLHcseDtcbmlmKGVhKXt2YXIgZnM9cmVxdWlyZShcImZzXCIpLGhhPXJlcXVpcmUoXCJwYXRoXCIpO3Q9cT9oYS5kaXJuYW1lKHQpK1wiL1wiOl9fZGlybmFtZStcIi9cIjtmYT0oYSxiKT0+e2E9YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKT9uZXcgVVJMKGEpOmhhLm5vcm1hbGl6ZShhKTtyZXR1cm4gZnMucmVhZEZpbGVTeW5jKGEsYj92b2lkIDA6XCJ1dGY4XCIpfTt4PWE9PnthPWZhKGEsITApO2EuYnVmZmVyfHwoYT1uZXcgVWludDhBcnJheShhKSk7cmV0dXJuIGF9O3c9KGEsYixjLGQ9ITApPT57YT1hLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYSk6aGEubm9ybWFsaXplKGEpO2ZzLnJlYWRGaWxlKGEsZD92b2lkIDA6XCJ1dGY4XCIsKGUsaCk9PntlP2MoZSk6YihkP2guYnVmZmVyOmgpfSl9OyFmLnRoaXNQcm9ncmFtJiYxPHByb2Nlc3MuYXJndi5sZW5ndGgmJihjYT1wcm9jZXNzLmFyZ3ZbMV0ucmVwbGFjZSgvXFxcXC9nLFwiL1wiKSk7cHJvY2Vzcy5hcmd2LnNsaWNlKDIpO2YuaW5zcGVjdD0oKT0+XCJbRW1zY3JpcHRlbiBNb2R1bGUgb2JqZWN0XVwifWVsc2UgaWYoZGF8fFxucSlxP3Q9c2VsZi5sb2NhdGlvbi5ocmVmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCYmZG9jdW1lbnQuY3VycmVudFNjcmlwdCYmKHQ9ZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMpLF9zY3JpcHREaXImJih0PV9zY3JpcHREaXIpLDAhPT10LmluZGV4T2YoXCJibG9iOlwiKT90PXQuc3Vic3RyKDAsdC5yZXBsYWNlKC9bPyNdLiovLFwiXCIpLmxhc3RJbmRleE9mKFwiL1wiKSsxKTp0PVwiXCIsZmE9YT0+e3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJHRVRcIixhLCExKTtiLnNlbmQobnVsbCk7cmV0dXJuIGIucmVzcG9uc2VUZXh0fSxxJiYoeD1hPT57dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2IucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIjtiLnNlbmQobnVsbCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGIucmVzcG9uc2UpfSksdz0oYSxiLGMpPT57dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEsITApO2QucmVzcG9uc2VUeXBlPVxuXCJhcnJheWJ1ZmZlclwiO2Qub25sb2FkPSgpPT57MjAwPT1kLnN0YXR1c3x8MD09ZC5zdGF0dXMmJmQucmVzcG9uc2U/YihkLnJlc3BvbnNlKTpjKCl9O2Qub25lcnJvcj1jO2Quc2VuZChudWxsKX07dmFyIGlhPWYucHJpbnR8fGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSksej1mLnByaW50RXJyfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihmLGJhKTtiYT1udWxsO2YudGhpc1Byb2dyYW0mJihjYT1mLnRoaXNQcm9ncmFtKTt2YXIgQTtmLndhc21CaW5hcnkmJihBPWYud2FzbUJpbmFyeSk7dmFyIG5vRXhpdFJ1bnRpbWU9Zi5ub0V4aXRSdW50aW1lfHwhMDtcIm9iamVjdFwiIT10eXBlb2YgV2ViQXNzZW1ibHkmJmphKFwibm8gbmF0aXZlIHdhc20gc3VwcG9ydCBkZXRlY3RlZFwiKTt2YXIgQixDLGthPSExLEQsRSxHLEgsSixLLGxhLG1hLG5hLG9hO1xuZnVuY3Rpb24gcGEoKXt2YXIgYT1CLmJ1ZmZlcjtmLkhFQVA4PUQ9bmV3IEludDhBcnJheShhKTtmLkhFQVAxNj1HPW5ldyBJbnQxNkFycmF5KGEpO2YuSEVBUDMyPUo9bmV3IEludDMyQXJyYXkoYSk7Zi5IRUFQVTg9RT1uZXcgVWludDhBcnJheShhKTtmLkhFQVBVMTY9SD1uZXcgVWludDE2QXJyYXkoYSk7Zi5IRUFQVTMyPUs9bmV3IFVpbnQzMkFycmF5KGEpO2YuSEVBUEYzMj1sYT1uZXcgRmxvYXQzMkFycmF5KGEpO2YuSEVBUEY2ND1vYT1uZXcgRmxvYXQ2NEFycmF5KGEpO2YuSEVBUDY0PW1hPW5ldyBCaWdJbnQ2NEFycmF5KGEpO2YuSEVBUFU2ND1uYT1uZXcgQmlnVWludDY0QXJyYXkoYSl9dmFyIHFhPVtdLHJhPVtdLHNhPVtdO2Z1bmN0aW9uIHRhKCl7dmFyIGE9Zi5wcmVSdW4uc2hpZnQoKTtxYS51bnNoaWZ0KGEpfXZhciBMPTAsdWE9bnVsbCxNPW51bGw7XG5mdW5jdGlvbiBqYShhKXtpZihmLm9uQWJvcnQpZi5vbkFib3J0KGEpO2E9XCJBYm9ydGVkKFwiK2ErXCIpXCI7eihhKTtrYT0hMDthPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3IoYStcIi4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby5cIik7bShhKTt0aHJvdyBhO31mdW5jdGlvbiB2YShhKXtyZXR1cm4gYS5zdGFydHNXaXRoKFwiZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LFwiKX12YXIgTjtOPVwib3J0LXdhc20ud2FzbVwiO2lmKCF2YShOKSl7dmFyIHdhPU47Tj1mLmxvY2F0ZUZpbGU/Zi5sb2NhdGVGaWxlKHdhLHQpOnQrd2F9ZnVuY3Rpb24geGEoYSl7aWYoYT09TiYmQSlyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoQSk7aWYoeClyZXR1cm4geChhKTt0aHJvd1wiYm90aCBhc3luYyBhbmQgc3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWRcIjt9XG5mdW5jdGlvbiB5YShhKXtpZighQSYmKGRhfHxxKSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZmV0Y2gmJiFhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXJldHVybiBmZXRjaChhLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGI9PntpZighYi5vayl0aHJvd1wiZmFpbGVkIHRvIGxvYWQgd2FzbSBiaW5hcnkgZmlsZSBhdCAnXCIrYStcIidcIjtyZXR1cm4gYi5hcnJheUJ1ZmZlcigpfSkuY2F0Y2goKCk9PnhhKGEpKTtpZih3KXJldHVybiBuZXcgUHJvbWlzZSgoYixjKT0+e3coYSxkPT5iKG5ldyBVaW50OEFycmF5KGQpKSxjKX0pfXJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT54YShhKSl9ZnVuY3Rpb24gemEoYSxiLGMpe3JldHVybiB5YShhKS50aGVuKGQ9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGQsYikpLnRoZW4oZD0+ZCkudGhlbihjLGQ9Pnt6KFwiZmFpbGVkIHRvIGFzeW5jaHJvbm91c2x5IHByZXBhcmUgd2FzbTogXCIrZCk7amEoZCl9KX1cbmZ1bmN0aW9uIEFhKGEsYil7dmFyIGM9TjtyZXR1cm4gQXx8XCJmdW5jdGlvblwiIT10eXBlb2YgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmd8fHZhKGMpfHxjLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpfHxlYXx8XCJmdW5jdGlvblwiIT10eXBlb2YgZmV0Y2g/emEoYyxhLGIpOmZldGNoKGMse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pLnRoZW4oZD0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcoZCxhKS50aGVuKGIsZnVuY3Rpb24oZSl7eihcIndhc20gc3RyZWFtaW5nIGNvbXBpbGUgZmFpbGVkOiBcIitlKTt6KFwiZmFsbGluZyBiYWNrIHRvIEFycmF5QnVmZmVyIGluc3RhbnRpYXRpb25cIik7cmV0dXJuIHphKGMsYSxiKX0pKX12YXIgQmE9YT0+e2Zvcig7MDxhLmxlbmd0aDspYS5zaGlmdCgpKGYpfTtcbmZ1bmN0aW9uIENhKGEpe3RoaXMuVmE9YS0yNDt0aGlzLmZiPWZ1bmN0aW9uKGIpe0tbdGhpcy5WYSs0Pj4yXT1ifTt0aGlzLmViPWZ1bmN0aW9uKGIpe0tbdGhpcy5WYSs4Pj4yXT1ifTt0aGlzLlphPWZ1bmN0aW9uKGIsYyl7dGhpcy4kYSgpO3RoaXMuZmIoYik7dGhpcy5lYihjKX07dGhpcy4kYT1mdW5jdGlvbigpe0tbdGhpcy5WYSsxNj4+Ml09MH19XG52YXIgRGE9MCxFYT0wLEZhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoXCJ1dGY4XCIpOnZvaWQgMCxPPShhLGIsYyk9Pnt2YXIgZD1iK2M7Zm9yKGM9YjthW2NdJiYhKGM+PWQpOykrK2M7aWYoMTY8Yy1iJiZhLmJ1ZmZlciYmRmEpcmV0dXJuIEZhLmRlY29kZShhLnN1YmFycmF5KGIsYykpO2ZvcihkPVwiXCI7YjxjOyl7dmFyIGU9YVtiKytdO2lmKGUmMTI4KXt2YXIgaD1hW2IrK10mNjM7aWYoMTkyPT0oZSYyMjQpKWQrPVN0cmluZy5mcm9tQ2hhckNvZGUoKGUmMzEpPDw2fGgpO2Vsc2V7dmFyIGw9YVtiKytdJjYzO2U9MjI0PT0oZSYyNDApPyhlJjE1KTw8MTJ8aDw8NnxsOihlJjcpPDwxOHxoPDwxMnxsPDw2fGFbYisrXSY2Mzs2NTUzNj5lP2QrPVN0cmluZy5mcm9tQ2hhckNvZGUoZSk6KGUtPTY1NTM2LGQrPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8ZT4+MTAsNTYzMjB8ZSYxMDIzKSl9fWVsc2UgZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKX1yZXR1cm4gZH0sXG5QPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTsxMjc+PWQ/YisrOjIwNDc+PWQ/Yis9Mjo1NTI5Njw9ZCYmNTczNDM+PWQ/KGIrPTQsKytjKTpiKz0zfXJldHVybiBifSxRPShhLGIsYyxkKT0+e2lmKCEoMDxkKSlyZXR1cm4gMDt2YXIgZT1jO2Q9YytkLTE7Zm9yKHZhciBoPTA7aDxhLmxlbmd0aDsrK2gpe3ZhciBsPWEuY2hhckNvZGVBdChoKTtpZig1NTI5Njw9bCYmNTczNDM+PWwpe3ZhciBrPWEuY2hhckNvZGVBdCgrK2gpO2w9NjU1MzYrKChsJjEwMjMpPDwxMCl8ayYxMDIzfWlmKDEyNz49bCl7aWYoYz49ZClicmVhaztiW2MrK109bH1lbHNle2lmKDIwNDc+PWwpe2lmKGMrMT49ZClicmVhaztiW2MrK109MTkyfGw+PjZ9ZWxzZXtpZig2NTUzNT49bCl7aWYoYysyPj1kKWJyZWFrO2JbYysrXT0yMjR8bD4+MTJ9ZWxzZXtpZihjKzM+PWQpYnJlYWs7YltjKytdPTI0MHxsPj4xODtiW2MrK109MTI4fGw+PjEyJjYzfWJbYysrXT1cbjEyOHxsPj42JjYzfWJbYysrXT0xMjh8bCY2M319YltjXT0wO3JldHVybiBjLWV9O2Z1bmN0aW9uIEdhKGEpe2lmKG51bGw9PT1hKXJldHVyblwibnVsbFwiO3ZhciBiPXR5cGVvZiBhO3JldHVyblwib2JqZWN0XCI9PT1ifHxcImFycmF5XCI9PT1ifHxcImZ1bmN0aW9uXCI9PT1iP2EudG9TdHJpbmcoKTpcIlwiK2F9dmFyIEhhPXZvaWQgMDtmdW5jdGlvbiBSKGEpe2Zvcih2YXIgYj1cIlwiO0VbYV07KWIrPUhhW0VbYSsrXV07cmV0dXJuIGJ9dmFyIElhPXt9LEphPXt9LEthPXt9LExhPXZvaWQgMDtmdW5jdGlvbiBTKGEpe3Rocm93IG5ldyBMYShhKTt9XG5mdW5jdGlvbiBNYShhLGIsYz17fSl7dmFyIGQ9Yi5uYW1lO2F8fFMoYHR5cGUgXCIke2R9XCIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO2lmKEphLmhhc093blByb3BlcnR5KGEpKXtpZihjLmdiKXJldHVybjtTKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtkfScgdHdpY2VgKX1KYVthXT1iO2RlbGV0ZSBLYVthXTtJYS5oYXNPd25Qcm9wZXJ0eShhKSYmKGI9SWFbYV0sZGVsZXRlIElhW2FdLGIuZm9yRWFjaChlPT5lKCkpKX1mdW5jdGlvbiBUKGEsYixjPXt9KXtpZighKFwiYXJnUGFja0FkdmFuY2VcImluIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlXCIpO01hKGEsYixjKX1cbmZ1bmN0aW9uIE5hKGEsYixjKXtzd2l0Y2goYil7Y2FzZSAwOnJldHVybiBjP2Z1bmN0aW9uKGQpe3JldHVybiBEW2RdfTpmdW5jdGlvbihkKXtyZXR1cm4gRVtkXX07Y2FzZSAxOnJldHVybiBjP2Z1bmN0aW9uKGQpe3JldHVybiBHW2Q+PjFdfTpmdW5jdGlvbihkKXtyZXR1cm4gSFtkPj4xXX07Y2FzZSAyOnJldHVybiBjP2Z1bmN0aW9uKGQpe3JldHVybiBKW2Q+PjJdfTpmdW5jdGlvbihkKXtyZXR1cm4gS1tkPj4yXX07Y2FzZSAzOnJldHVybiBjP2Z1bmN0aW9uKGQpe3JldHVybiBtYVtkPj4zXX06ZnVuY3Rpb24oZCl7cmV0dXJuIG5hW2Q+PjNdfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmtub3duIGludGVnZXIgdHlwZTogXCIrYSk7fX1cbmZ1bmN0aW9uIE9hKGEpe3N3aXRjaChhKXtjYXNlIDE6cmV0dXJuIDA7Y2FzZSAyOnJldHVybiAxO2Nhc2UgNDpyZXR1cm4gMjtjYXNlIDg6cmV0dXJuIDM7ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmtub3duIHR5cGUgc2l6ZTogJHthfWApO319ZnVuY3Rpb24gUGEoKXt0aGlzLlNhPVt2b2lkIDBdO3RoaXMuYmI9W119dmFyIFU9bmV3IFBhO2Z1bmN0aW9uIFFhKGEpe2E+PVUuVmEmJjA9PT0tLVUuZ2V0KGEpLmNiJiZVLiRhKGEpfXZhciBWPWE9PnthfHxTKFwiQ2Fubm90IHVzZSBkZWxldGVkIHZhbC4gaGFuZGxlID0gXCIrYSk7cmV0dXJuIFUuZ2V0KGEpLnZhbHVlfSxXPWE9Pntzd2l0Y2goYSl7Y2FzZSB2b2lkIDA6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UgITA6cmV0dXJuIDM7Y2FzZSAhMTpyZXR1cm4gNDtkZWZhdWx0OnJldHVybiBVLlphKHtjYjoxLHZhbHVlOmF9KX19O1xuZnVuY3Rpb24gUmEoYSl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKEpbYT4+Ml0pfWZ1bmN0aW9uIFNhKGEsYil7c3dpdGNoKGIpe2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24oYyl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKGxhW2M+PjJdKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUob2FbYz4+M10pfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmtub3duIGZsb2F0IHR5cGU6IFwiK2EpO319XG52YXIgVGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFRleHREZWNvZGVyP25ldyBUZXh0RGVjb2RlcihcInV0Zi0xNmxlXCIpOnZvaWQgMCxVYT0oYSxiKT0+e3ZhciBjPWE+PjE7Zm9yKHZhciBkPWMrYi8yOyEoYz49ZCkmJkhbY107KSsrYztjPDw9MTtpZigzMjxjLWEmJlRhKXJldHVybiBUYS5kZWNvZGUoRS5zdWJhcnJheShhLGMpKTtjPVwiXCI7Zm9yKGQ9MDshKGQ+PWIvMik7KytkKXt2YXIgZT1HW2ErMipkPj4xXTtpZigwPT1lKWJyZWFrO2MrPVN0cmluZy5mcm9tQ2hhckNvZGUoZSl9cmV0dXJuIGN9LFZhPShhLGIsYyk9Pnt2b2lkIDA9PT1jJiYoYz0yMTQ3NDgzNjQ3KTtpZigyPmMpcmV0dXJuIDA7Yy09Mjt2YXIgZD1iO2M9YzwyKmEubGVuZ3RoP2MvMjphLmxlbmd0aDtmb3IodmFyIGU9MDtlPGM7KytlKUdbYj4+MV09YS5jaGFyQ29kZUF0KGUpLGIrPTI7R1tiPj4xXT0wO3JldHVybiBiLWR9LFdhPWE9PjIqYS5sZW5ndGgsWGE9KGEsYik9Pntmb3IodmFyIGM9MCxkPVwiXCI7IShjPj1iL1xuNCk7KXt2YXIgZT1KW2ErNCpjPj4yXTtpZigwPT1lKWJyZWFrOysrYzs2NTUzNjw9ZT8oZS09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxlPj4xMCw1NjMyMHxlJjEwMjMpKTpkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBkfSxZYT0oYSxiLGMpPT57dm9pZCAwPT09YyYmKGM9MjE0NzQ4MzY0Nyk7aWYoND5jKXJldHVybiAwO3ZhciBkPWI7Yz1kK2MtNDtmb3IodmFyIGU9MDtlPGEubGVuZ3RoOysrZSl7dmFyIGg9YS5jaGFyQ29kZUF0KGUpO2lmKDU1Mjk2PD1oJiY1NzM0Mz49aCl7dmFyIGw9YS5jaGFyQ29kZUF0KCsrZSk7aD02NTUzNisoKGgmMTAyMyk8PDEwKXxsJjEwMjN9SltiPj4yXT1oO2IrPTQ7aWYoYis0PmMpYnJlYWt9SltiPj4yXT0wO3JldHVybiBiLWR9LFphPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTs1NTI5Njw9ZCYmNTczNDM+PWQmJisrYztiKz00fXJldHVybiBifTtcbmZ1bmN0aW9uICRhKGEsYil7dmFyIGM9SmFbYV07aWYodm9pZCAwPT09Yyl7YT1hYihhKTt2YXIgZD1SKGEpO1goYSk7UyhiK1wiIGhhcyB1bmtub3duIHR5cGUgXCIrZCl9cmV0dXJuIGN9dmFyIGJiPXt9O2Z1bmN0aW9uIGNiKGEpe3ZhciBiPWJiW2FdO3JldHVybiB2b2lkIDA9PT1iP1IoYSk6Yn12YXIgZWI9W107ZnVuY3Rpb24gZmIoKXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKX1mdW5jdGlvbiBnYihhKXt2YXIgYj1lYi5sZW5ndGg7ZWIucHVzaChhKTtyZXR1cm4gYn1mdW5jdGlvbiBoYihhLGIpe2Zvcih2YXIgYz1BcnJheShhKSxkPTA7ZDxhOysrZCljW2RdPSRhKEtbYis0KmQ+PjJdLFwicGFyYW1ldGVyIFwiK2QpO3JldHVybiBjfVxuZnVuY3Rpb24gaWIoYSl7aWYodm9pZCAwPT09YSlyZXR1cm5cIl91bmtub3duXCI7YT1hLnJlcGxhY2UoL1teYS16QS1aMC05X10vZyxcIiRcIik7dmFyIGI9YS5jaGFyQ29kZUF0KDApO3JldHVybiA0ODw9YiYmNTc+PWI/YF8ke2F9YDphfXZhciBqYj1bXTtmdW5jdGlvbiBrYihhLGIpe2E9aWIoYSk7cmV0dXJue1thXTpmdW5jdGlvbigpe3JldHVybiBiLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19W2FdfVxuZnVuY3Rpb24gbGIoYSl7dmFyIGI9RnVuY3Rpb247aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoYG5ld18gY2FsbGVkIHdpdGggY29uc3RydWN0b3IgdHlwZSAke3R5cGVvZiBifSB3aGljaCBpcyBub3QgYSBmdW5jdGlvbmApO3ZhciBjPWtiKGIubmFtZXx8XCJ1bmtub3duRnVuY3Rpb25OYW1lXCIsZnVuY3Rpb24oKXt9KTtjLnByb3RvdHlwZT1iLnByb3RvdHlwZTtjPW5ldyBjO2E9Yi5hcHBseShjLGEpO3JldHVybiBhIGluc3RhbmNlb2YgT2JqZWN0P2E6Y31cbmZ1bmN0aW9uIG1iKGEpe2Zvcih2YXIgYj1cIlwiLGM9MDtjPGE7KytjKWIrPSgwIT09Yz9cIiwgXCI6XCJcIikrXCJhcmdcIitjO3ZhciBkPVwicmV0dXJuIGZ1bmN0aW9uIGVtdmFsX2FsbG9jYXRvcl9cIithK1wiKGNvbnN0cnVjdG9yLCBhcmdUeXBlcywgYXJncykge1xcbiAgdmFyIEhFQVBVMzIgPSBnZXRNZW1vcnkoKTtcXG5cIjtmb3IoYz0wO2M8YTsrK2MpZCs9XCJ2YXIgYXJnVHlwZVwiK2MrXCIgPSByZXF1aXJlUmVnaXN0ZXJlZFR5cGUoSEVBUFUzMlsoKGFyZ1R5cGVzKT4+MildLCAncGFyYW1ldGVyIFwiK2MrXCInKTtcXG52YXIgYXJnXCIrYytcIiA9IGFyZ1R5cGVcIitjK1wiLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGFyZ3MpO1xcbmFyZ3MgKz0gYXJnVHlwZVwiK2MrXCJbJ2FyZ1BhY2tBZHZhbmNlJ107XFxuYXJnVHlwZXMgKz0gNDtcXG5cIjtyZXR1cm4obmV3IEZ1bmN0aW9uKFwicmVxdWlyZVJlZ2lzdGVyZWRUeXBlXCIsXCJNb2R1bGVcIixcInZhbHVlVG9IYW5kbGVcIixcImdldE1lbW9yeVwiLGQrKFwidmFyIG9iaiA9IG5ldyBjb25zdHJ1Y3RvcihcIitcbmIrXCIpO1xcbnJldHVybiB2YWx1ZVRvSGFuZGxlKG9iaik7XFxufVxcblwiKSkpKCRhLGYsVywoKT0+Syl9dmFyIG5iPXt9O2Z1bmN0aW9uIFkoYSl7cmV0dXJuLTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSl9XG52YXIgWj1hPT4wPT09YSU0JiYoMCE9PWElMTAwfHwwPT09YSU0MDApLG9iPVswLDMxLDYwLDkxLDEyMSwxNTIsMTgyLDIxMywyNDQsMjc0LDMwNSwzMzVdLHBiPVswLDMxLDU5LDkwLDEyMCwxNTEsMTgxLDIxMiwyNDMsMjczLDMwNCwzMzRdLHJiPWE9Pnt2YXIgYj1QKGEpKzEsYz1xYihiKTtjJiZRKGEsRSxjLGIpO3JldHVybiBjfSxzYj17fSx1Yj0oKT0+e2lmKCF0Yil7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFwiX1wiKStcIi5VVEYtOFwiLF86Y2F8fFwiLi90aGlzLnByb2dyYW1cIn0sYjtmb3IoYiBpbiBzYil2b2lkIDA9PT1zYltiXT9kZWxldGUgYVtiXTphW2JdPXNiW2JdO3ZhciBjPVtdO2ZvcihiIGluIGEpYy5wdXNoKGAke2J9PSR7YVtiXX1gKTtcbnRiPWN9cmV0dXJuIHRifSx0Yix2Yj1bbnVsbCxbXSxbXV0sd2I9WzMxLDI5LDMxLDMwLDMxLDMwLDMxLDMxLDMwLDMxLDMwLDMxXSx4Yj1bMzEsMjgsMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdO2Z1bmN0aW9uIHliKGEpe3ZhciBiPUFycmF5KFAoYSkrMSk7UShhLGIsMCxiLmxlbmd0aCk7cmV0dXJuIGJ9XG5mb3IodmFyIHpiPShhLGIsYyxkKT0+e2Z1bmN0aW9uIGUoZyxyLHUpe2ZvcihnPVwibnVtYmVyXCI9PXR5cGVvZiBnP2cudG9TdHJpbmcoKTpnfHxcIlwiO2cubGVuZ3RoPHI7KWc9dVswXStnO3JldHVybiBnfWZ1bmN0aW9uIGgoZyxyKXtyZXR1cm4gZShnLHIsXCIwXCIpfWZ1bmN0aW9uIGwoZyxyKXtmdW5jdGlvbiB1KGRiKXtyZXR1cm4gMD5kYj8tMTowPGRiPzE6MH12YXIgSTswPT09KEk9dShnLmdldEZ1bGxZZWFyKCktci5nZXRGdWxsWWVhcigpKSkmJjA9PT0oST11KGcuZ2V0TW9udGgoKS1yLmdldE1vbnRoKCkpKSYmKEk9dShnLmdldERhdGUoKS1yLmdldERhdGUoKSkpO3JldHVybiBJfWZ1bmN0aW9uIGsoZyl7c3dpdGNoKGcuZ2V0RGF5KCkpe2Nhc2UgMDpyZXR1cm4gbmV3IERhdGUoZy5nZXRGdWxsWWVhcigpLTEsMTEsMjkpO2Nhc2UgMTpyZXR1cm4gZztjYXNlIDI6cmV0dXJuIG5ldyBEYXRlKGcuZ2V0RnVsbFllYXIoKSwwLDMpO2Nhc2UgMzpyZXR1cm4gbmV3IERhdGUoZy5nZXRGdWxsWWVhcigpLFxuMCwyKTtjYXNlIDQ6cmV0dXJuIG5ldyBEYXRlKGcuZ2V0RnVsbFllYXIoKSwwLDEpO2Nhc2UgNTpyZXR1cm4gbmV3IERhdGUoZy5nZXRGdWxsWWVhcigpLTEsMTEsMzEpO2Nhc2UgNjpyZXR1cm4gbmV3IERhdGUoZy5nZXRGdWxsWWVhcigpLTEsMTEsMzApfX1mdW5jdGlvbiBuKGcpe3ZhciByPWcuVGE7Zm9yKGc9bmV3IERhdGUoKG5ldyBEYXRlKGcuVWErMTkwMCwwLDEpKS5nZXRUaW1lKCkpOzA8cjspe3ZhciB1PWcuZ2V0TW9udGgoKSxJPShaKGcuZ2V0RnVsbFllYXIoKSk/d2I6eGIpW3VdO2lmKHI+SS1nLmdldERhdGUoKSlyLT1JLWcuZ2V0RGF0ZSgpKzEsZy5zZXREYXRlKDEpLDExPnU/Zy5zZXRNb250aCh1KzEpOihnLnNldE1vbnRoKDApLGcuc2V0RnVsbFllYXIoZy5nZXRGdWxsWWVhcigpKzEpKTtlbHNle2cuc2V0RGF0ZShnLmdldERhdGUoKStyKTticmVha319dT1uZXcgRGF0ZShnLmdldEZ1bGxZZWFyKCkrMSwwLDQpO3I9ayhuZXcgRGF0ZShnLmdldEZ1bGxZZWFyKCksXG4wLDQpKTt1PWsodSk7cmV0dXJuIDA+PWwocixnKT8wPj1sKHUsZyk/Zy5nZXRGdWxsWWVhcigpKzE6Zy5nZXRGdWxsWWVhcigpOmcuZ2V0RnVsbFllYXIoKS0xfXZhciBwPUpbZCs0MD4+Ml07ZD17a2I6SltkPj4yXSxqYjpKW2QrND4+Ml0sWGE6SltkKzg+PjJdLGFiOkpbZCsxMj4+Ml0sWWE6SltkKzE2Pj4yXSxVYTpKW2QrMjA+PjJdLE9hOkpbZCsyND4+Ml0sVGE6SltkKzI4Pj4yXSxtYjpKW2QrMzI+PjJdLGliOkpbZCszNj4+Ml0sbGI6cD9wP08oRSxwKTpcIlwiOlwiXCJ9O2M9Yz9PKEUsYyk6XCJcIjtwPXtcIiVjXCI6XCIlYSAlYiAlZCAlSDolTTolUyAlWVwiLFwiJURcIjpcIiVtLyVkLyV5XCIsXCIlRlwiOlwiJVktJW0tJWRcIixcIiVoXCI6XCIlYlwiLFwiJXJcIjpcIiVJOiVNOiVTICVwXCIsXCIlUlwiOlwiJUg6JU1cIixcIiVUXCI6XCIlSDolTTolU1wiLFwiJXhcIjpcIiVtLyVkLyV5XCIsXCIlWFwiOlwiJUg6JU06JVNcIixcIiVFY1wiOlwiJWNcIixcIiVFQ1wiOlwiJUNcIixcIiVFeFwiOlwiJW0vJWQvJXlcIixcIiVFWFwiOlwiJUg6JU06JVNcIixcIiVFeVwiOlwiJXlcIixcblwiJUVZXCI6XCIlWVwiLFwiJU9kXCI6XCIlZFwiLFwiJU9lXCI6XCIlZVwiLFwiJU9IXCI6XCIlSFwiLFwiJU9JXCI6XCIlSVwiLFwiJU9tXCI6XCIlbVwiLFwiJU9NXCI6XCIlTVwiLFwiJU9TXCI6XCIlU1wiLFwiJU91XCI6XCIldVwiLFwiJU9VXCI6XCIlVVwiLFwiJU9WXCI6XCIlVlwiLFwiJU93XCI6XCIld1wiLFwiJU9XXCI6XCIlV1wiLFwiJU95XCI6XCIleVwifTtmb3IodmFyIHYgaW4gcCljPWMucmVwbGFjZShuZXcgUmVnRXhwKHYsXCJnXCIpLHBbdl0pO3ZhciB5PVwiU3VuZGF5IE1vbmRheSBUdWVzZGF5IFdlZG5lc2RheSBUaHVyc2RheSBGcmlkYXkgU2F0dXJkYXlcIi5zcGxpdChcIiBcIiksRj1cIkphbnVhcnkgRmVicnVhcnkgTWFyY2ggQXByaWwgTWF5IEp1bmUgSnVseSBBdWd1c3QgU2VwdGVtYmVyIE9jdG9iZXIgTm92ZW1iZXIgRGVjZW1iZXJcIi5zcGxpdChcIiBcIik7cD17XCIlYVwiOmc9PnlbZy5PYV0uc3Vic3RyaW5nKDAsMyksXCIlQVwiOmc9PnlbZy5PYV0sXCIlYlwiOmc9PkZbZy5ZYV0uc3Vic3RyaW5nKDAsMyksXCIlQlwiOmc9PkZbZy5ZYV0sXCIlQ1wiOmc9PmgoKGcuVWErMTkwMCkvXG4xMDB8MCwyKSxcIiVkXCI6Zz0+aChnLmFiLDIpLFwiJWVcIjpnPT5lKGcuYWIsMixcIiBcIiksXCIlZ1wiOmc9Pm4oZykudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiksXCIlR1wiOmc9Pm4oZyksXCIlSFwiOmc9PmgoZy5YYSwyKSxcIiVJXCI6Zz0+e2c9Zy5YYTswPT1nP2c9MTI6MTI8ZyYmKGctPTEyKTtyZXR1cm4gaChnLDIpfSxcIiVqXCI6Zz0+e2Zvcih2YXIgcj0wLHU9MDt1PD1nLllhLTE7cis9KFooZy5VYSsxOTAwKT93Yjp4YilbdSsrXSk7cmV0dXJuIGgoZy5hYityLDMpfSxcIiVtXCI6Zz0+aChnLllhKzEsMiksXCIlTVwiOmc9PmgoZy5qYiwyKSxcIiVuXCI6KCk9PlwiXFxuXCIsXCIlcFwiOmc9PjA8PWcuWGEmJjEyPmcuWGE/XCJBTVwiOlwiUE1cIixcIiVTXCI6Zz0+aChnLmtiLDIpLFwiJXRcIjooKT0+XCJcXHRcIixcIiV1XCI6Zz0+Zy5PYXx8NyxcIiVVXCI6Zz0+aChNYXRoLmZsb29yKChnLlRhKzctZy5PYSkvNyksMiksXCIlVlwiOmc9Pnt2YXIgcj1NYXRoLmZsb29yKChnLlRhKzctKGcuT2ErNiklNykvNyk7Mj49KGcuT2ErMzcxLWcuVGEtMiklXG43JiZyKys7aWYocik1Mz09ciYmKHU9KGcuT2ErMzcxLWcuVGEpJTcsND09dXx8Mz09dSYmWihnLlVhKXx8KHI9MSkpO2Vsc2V7cj01Mjt2YXIgdT0oZy5PYSs3LWcuVGEtMSklNzsoND09dXx8NT09dSYmWihnLlVhJTQwMC0xKSkmJnIrK31yZXR1cm4gaChyLDIpfSxcIiV3XCI6Zz0+Zy5PYSxcIiVXXCI6Zz0+aChNYXRoLmZsb29yKChnLlRhKzctKGcuT2ErNiklNykvNyksMiksXCIleVwiOmc9PihnLlVhKzE5MDApLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJVlcIjpnPT5nLlVhKzE5MDAsXCIlelwiOmc9PntnPWcuaWI7dmFyIHI9MDw9ZztnPU1hdGguYWJzKGcpLzYwO3JldHVybihyP1wiK1wiOlwiLVwiKStTdHJpbmcoXCIwMDAwXCIrKGcvNjAqMTAwK2clNjApKS5zbGljZSgtNCl9LFwiJVpcIjpnPT5nLmxiLFwiJSVcIjooKT0+XCIlXCJ9O2M9Yy5yZXBsYWNlKC8lJS9nLFwiXFx4MDBcXHgwMFwiKTtmb3IodiBpbiBwKWMuaW5jbHVkZXModikmJihjPWMucmVwbGFjZShuZXcgUmVnRXhwKHYsXCJnXCIpLHBbdl0oZCkpKTtjPVxuYy5yZXBsYWNlKC9cXDBcXDAvZyxcIiVcIik7dj15YihjKTtpZih2Lmxlbmd0aD5iKXJldHVybiAwO0Quc2V0KHYsYSk7cmV0dXJuIHYubGVuZ3RoLTF9LEFiPUFycmF5KDI1NiksQmI9MDsyNTY+QmI7KytCYilBYltCYl09U3RyaW5nLmZyb21DaGFyQ29kZShCYik7SGE9QWI7TGE9Zi5CaW5kaW5nRXJyb3I9Y2xhc3MgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihhKXtzdXBlcihhKTt0aGlzLm5hbWU9XCJCaW5kaW5nRXJyb3JcIn19O2YuSW50ZXJuYWxFcnJvcj1jbGFzcyBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKGEpe3N1cGVyKGEpO3RoaXMubmFtZT1cIkludGVybmFsRXJyb3JcIn19O1xuT2JqZWN0LmFzc2lnbihQYS5wcm90b3R5cGUse2dldChhKXtyZXR1cm4gdGhpcy5TYVthXX0saGFzKGEpe3JldHVybiB2b2lkIDAhPT10aGlzLlNhW2FdfSxaYShhKXt2YXIgYj10aGlzLmJiLnBvcCgpfHx0aGlzLlNhLmxlbmd0aDt0aGlzLlNhW2JdPWE7cmV0dXJuIGJ9LCRhKGEpe3RoaXMuU2FbYV09dm9pZCAwO3RoaXMuYmIucHVzaChhKX19KTtVLlNhLnB1c2goe3ZhbHVlOnZvaWQgMH0se3ZhbHVlOm51bGx9LHt2YWx1ZTohMH0se3ZhbHVlOiExfSk7VS5WYT1VLlNhLmxlbmd0aDtmLmNvdW50X2VtdmFsX2hhbmRsZXM9ZnVuY3Rpb24oKXtmb3IodmFyIGE9MCxiPVUuVmE7YjxVLlNhLmxlbmd0aDsrK2Ipdm9pZCAwIT09VS5TYVtiXSYmKythO3JldHVybiBhfTtcbnZhciBDYj17YTpmdW5jdGlvbihhLGIsYyl7KG5ldyBDYShhKSkuWmEoYixjKTtEYT1hO0VhKys7dGhyb3cgRGE7fSx2OmZ1bmN0aW9uKCl7cmV0dXJuIDB9LGJhOigpPT57fSxOOigpPT57fSxQOigpPT57fSxIOmZ1bmN0aW9uKCl7cmV0dXJuIDB9LCQ6KCk9Pnt9LFY6KCk9Pnt9LF86KCk9Pnt9LEE6ZnVuY3Rpb24oKXt9LE86KCk9Pnt9LEw6KCk9Pnt9LGFhOigpPT57fSxNOigpPT57fSxEOmZ1bmN0aW9uKGEsYixjLGQsZSl7Yj1SKGIpO2M9T2EoYyk7dmFyIGg9LTEhPWIuaW5kZXhPZihcInVcIik7aCYmKGU9KDFuPDw2NG4pLTFuKTtUKGEse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24obCl7cmV0dXJuIGx9LHRvV2lyZVR5cGU6ZnVuY3Rpb24obCxrKXtpZihcImJpZ2ludFwiIT10eXBlb2YgayYmXCJudW1iZXJcIiE9dHlwZW9mIGspdGhyb3cgbmV3IFR5cGVFcnJvcihgQ2Fubm90IGNvbnZlcnQgXCIke0dhKGspfVwiIHRvICR7dGhpcy5uYW1lfWApO2lmKGs8ZHx8az5lKXRocm93IG5ldyBUeXBlRXJyb3IoYFBhc3NpbmcgYSBudW1iZXIgXCIke0dhKGspfVwiIGZyb20gSlMgc2lkZSB0byBDL0MrKyBzaWRlIHRvIGFuIGFyZ3VtZW50IG9mIHR5cGUgXCIke2J9XCIsIHdoaWNoIGlzIG91dHNpZGUgdGhlIHZhbGlkIHJhbmdlIFske2R9LCAke2V9XSFgKTtcbnJldHVybiBrfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOk5hKGIsYywhaCksV2E6bnVsbH0pfSxlYTpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBoPU9hKGMpO2I9UihiKTtUKGEse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24obCl7cmV0dXJuISFsfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGwsayl7cmV0dXJuIGs/ZDplfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGwpe2lmKDE9PT1jKXZhciBrPUQ7ZWxzZSBpZigyPT09YylrPUc7ZWxzZSBpZig0PT09YylrPUo7ZWxzZSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5rbm93biBib29sZWFuIHR5cGUgc2l6ZTogXCIrYik7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKGtbbD4+aF0pfSxXYTpudWxsfSl9LGRhOmZ1bmN0aW9uKGEsYil7Yj1SKGIpO1QoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpmdW5jdGlvbihjKXt2YXIgZD1WKGMpO1FhKGMpO3JldHVybiBkfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGMsXG5kKXtyZXR1cm4gVyhkKX0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpSYSxXYTpudWxsfSl9LEM6ZnVuY3Rpb24oYSxiLGMpe2M9T2EoYyk7Yj1SKGIpO1QoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpmdW5jdGlvbihkKXtyZXR1cm4gZH0sdG9XaXJlVHlwZTpmdW5jdGlvbihkLGUpe3JldHVybiBlfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlNhKGIsYyksV2E6bnVsbH0pfSxwOmZ1bmN0aW9uKGEsYixjLGQsZSl7Yj1SKGIpOy0xPT09ZSYmKGU9NDI5NDk2NzI5NSk7ZT1PYShjKTt2YXIgaD1rPT5rO2lmKDA9PT1kKXt2YXIgbD0zMi04KmM7aD1rPT5rPDxsPj4+bH1jPWIuaW5jbHVkZXMoXCJ1bnNpZ25lZFwiKT9mdW5jdGlvbihrLG4pe3JldHVybiBuPj4+MH06ZnVuY3Rpb24oayxuKXtyZXR1cm4gbn07VChhLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmgsdG9XaXJlVHlwZTpjLGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6TmEoYixcbmUsMCE9PWQpLFdhOm51bGx9KX0sbDpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChoKXtoPj49Mjt2YXIgbD1LO3JldHVybiBuZXcgZShsLmJ1ZmZlcixsW2grMV0sbFtoXSl9dmFyIGU9W0ludDhBcnJheSxVaW50OEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5LEJpZ0ludDY0QXJyYXksQmlnVWludDY0QXJyYXldW2JdO2M9UihjKTtUKGEse25hbWU6Yyxmcm9tV2lyZVR5cGU6ZCxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmR9LHtnYjohMH0pfSxFOmZ1bmN0aW9uKGEsYil7Yj1SKGIpO3ZhciBjPVwic3RkOjpzdHJpbmdcIj09PWI7VChhLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmZ1bmN0aW9uKGQpe3ZhciBlPUtbZD4+Ml0saD1kKzQ7aWYoYylmb3IodmFyIGw9aCxrPTA7azw9ZTsrK2spe3ZhciBuPWgraztpZihrPT1lfHwwPT1FW25dKXtsPWw/TyhFLGwsbi1sKTpcIlwiO2lmKHZvaWQgMD09PVxucCl2YXIgcD1sO2Vsc2UgcCs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxwKz1sO2w9bisxfX1lbHNle3A9QXJyYXkoZSk7Zm9yKGs9MDtrPGU7KytrKXBba109U3RyaW5nLmZyb21DaGFyQ29kZShFW2gra10pO3A9cC5qb2luKFwiXCIpfVgoZCk7cmV0dXJuIHB9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZCxlKXtlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXImJihlPW5ldyBVaW50OEFycmF5KGUpKTt2YXIgaD1cInN0cmluZ1wiPT10eXBlb2YgZTtofHxlIGluc3RhbmNlb2YgVWludDhBcnJheXx8ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHxlIGluc3RhbmNlb2YgSW50OEFycmF5fHxTKFwiQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBzdGQ6OnN0cmluZ1wiKTt2YXIgbD1jJiZoP1AoZSk6ZS5sZW5ndGg7dmFyIGs9cWIoNCtsKzEpLG49ays0O0tbaz4+Ml09bDtpZihjJiZoKVEoZSxFLG4sbCsxKTtlbHNlIGlmKGgpZm9yKGg9MDtoPGw7KytoKXt2YXIgcD1lLmNoYXJDb2RlQXQoaCk7MjU1PFxucCYmKFgobiksUyhcIlN0cmluZyBoYXMgVVRGLTE2IGNvZGUgdW5pdHMgdGhhdCBkbyBub3QgZml0IGluIDggYml0c1wiKSk7RVtuK2hdPXB9ZWxzZSBmb3IoaD0wO2g8bDsrK2gpRVtuK2hdPWVbaF07bnVsbCE9PWQmJmQucHVzaChYLGspO3JldHVybiBrfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlJhLFdhOmZ1bmN0aW9uKGQpe1goZCl9fSl9LHg6ZnVuY3Rpb24oYSxiLGMpe2M9UihjKTtpZigyPT09Yil7dmFyIGQ9VWE7dmFyIGU9VmE7dmFyIGg9V2E7dmFyIGw9KCk9Pkg7dmFyIGs9MX1lbHNlIDQ9PT1iJiYoZD1YYSxlPVlhLGg9WmEsbD0oKT0+SyxrPTIpO1QoYSx7bmFtZTpjLGZyb21XaXJlVHlwZTpmdW5jdGlvbihuKXtmb3IodmFyIHA9S1tuPj4yXSx2PWwoKSx5LEY9bis0LGc9MDtnPD1wOysrZyl7dmFyIHI9bis0K2cqYjtpZihnPT1wfHwwPT12W3I+PmtdKUY9ZChGLHItRiksdm9pZCAwPT09eT95PUY6KHkrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCksXG55Kz1GKSxGPXIrYn1YKG4pO3JldHVybiB5fSx0b1dpcmVUeXBlOmZ1bmN0aW9uKG4scCl7XCJzdHJpbmdcIiE9dHlwZW9mIHAmJlMoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7Y31gKTt2YXIgdj1oKHApLHk9cWIoNCt2K2IpO0tbeT4+Ml09dj4+aztlKHAseSs0LHYrYik7bnVsbCE9PW4mJm4ucHVzaChYLHkpO3JldHVybiB5fSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlJhLFdhOmZ1bmN0aW9uKG4pe1gobil9fSl9LGZhOmZ1bmN0aW9uKGEsYil7Yj1SKGIpO1QoYSx7aGI6ITAsbmFtZTpiLGFyZ1BhY2tBZHZhbmNlOjAsZnJvbVdpcmVUeXBlOmZ1bmN0aW9uKCl7fSx0b1dpcmVUeXBlOmZ1bmN0aW9uKCl7fX0pfSxjYTooKT0+ITAsbzpmdW5jdGlvbihhLGIsYyl7YT1WKGEpO2I9JGEoYixcImVtdmFsOjphc1wiKTt2YXIgZD1bXSxlPVcoZCk7S1tjPj4yXT1lO3JldHVybiBiLnRvV2lyZVR5cGUoZCxhKX0saDpmdW5jdGlvbihhLFxuYixjLGQsZSl7YT1lYlthXTtiPVYoYik7Yz1jYihjKTt2YXIgaD1bXTtLW2Q+PjJdPVcoaCk7cmV0dXJuIGEoYixjLGgsZSl9LHI6ZnVuY3Rpb24oYSxiLGMsZCl7YT1lYlthXTtiPVYoYik7Yz1jYihjKTthKGIsYyxudWxsLGQpfSxiOlFhLEY6ZnVuY3Rpb24oYSxiKXthPVYoYSk7Yj1WKGIpO3JldHVybiBhPT1ifSx1OmZ1bmN0aW9uKGEpe2lmKDA9PT1hKXJldHVybiBXKGZiKCkpO2E9Y2IoYSk7cmV0dXJuIFcoZmIoKVthXSl9LGc6ZnVuY3Rpb24oYSxiKXt2YXIgYz1oYihhLGIpLGQ9Y1swXTtiPWQubmFtZStcIl8kXCIrYy5zbGljZSgxKS5tYXAoZnVuY3Rpb24odil7cmV0dXJuIHYubmFtZX0pLmpvaW4oXCJfXCIpK1wiJFwiO3ZhciBlPWpiW2JdO2lmKHZvaWQgMCE9PWUpcmV0dXJuIGU7ZT1bXCJyZXRUeXBlXCJdO2Zvcih2YXIgaD1bZF0sbD1cIlwiLGs9MDtrPGEtMTsrK2spbCs9KDAhPT1rP1wiLCBcIjpcIlwiKStcImFyZ1wiK2ssZS5wdXNoKFwiYXJnVHlwZVwiK2spLGgucHVzaChjWzEra10pO3ZhciBuPVxuXCJyZXR1cm4gZnVuY3Rpb24gXCIraWIoXCJtZXRob2RDYWxsZXJfXCIrYikrXCIoaGFuZGxlLCBuYW1lLCBkZXN0cnVjdG9ycywgYXJncykge1xcblwiLHA9MDtmb3Ioaz0wO2s8YS0xOysrayluKz1cIiAgICB2YXIgYXJnXCIraytcIiA9IGFyZ1R5cGVcIitrK1wiLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGFyZ3NcIisocD9cIitcIitwOlwiXCIpK1wiKTtcXG5cIixwKz1jW2srMV0uYXJnUGFja0FkdmFuY2U7bis9XCIgICAgdmFyIHJ2ID0gaGFuZGxlW25hbWVdKFwiK2wrXCIpO1xcblwiO2ZvcihrPTA7azxhLTE7KytrKWNbaysxXS5kZWxldGVPYmplY3QmJihuKz1cIiAgICBhcmdUeXBlXCIraytcIi5kZWxldGVPYmplY3QoYXJnXCIraytcIik7XFxuXCIpO2QuaGJ8fChuKz1cIiAgICByZXR1cm4gcmV0VHlwZS50b1dpcmVUeXBlKGRlc3RydWN0b3JzLCBydik7XFxuXCIpO2UucHVzaChuK1wifTtcXG5cIik7YT1sYihlKS5hcHBseShudWxsLGgpO2U9Z2IoYSk7cmV0dXJuIGpiW2JdPWV9LHE6ZnVuY3Rpb24oYSxiKXthPVYoYSk7Yj1WKGIpO3JldHVybiBXKGFbYl0pfSxcbmM6ZnVuY3Rpb24oYSl7NDxhJiYoVS5nZXQoYSkuY2IrPTEpfSxHOmZ1bmN0aW9uKGEsYixjLGQpe2E9VihhKTt2YXIgZT1uYltiXTtlfHwoZT1tYihiKSxuYltiXT1lKTtyZXR1cm4gZShhLGMsZCl9LHM6ZnVuY3Rpb24oKXtyZXR1cm4gVyhbXSl9LGs6ZnVuY3Rpb24oYSl7YT1WKGEpO2Zvcih2YXIgYj1BcnJheShhLmxlbmd0aCksYz0wO2M8YS5sZW5ndGg7YysrKWJbY109YVtjXTtyZXR1cm4gVyhiKX0sZDpmdW5jdGlvbihhKXtyZXR1cm4gVyhjYihhKSl9LGo6ZnVuY3Rpb24oKXtyZXR1cm4gVyh7fSl9LGY6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVYoYSk7Yi5sZW5ndGg7KXt2YXIgYz1iLnBvcCgpO2IucG9wKCkoYyl9UWEoYSl9LGk6ZnVuY3Rpb24oYSxiLGMpe2E9VihhKTtiPVYoYik7Yz1WKGMpO2FbYl09Y30sZTpmdW5jdGlvbihhLGIpe2E9JGEoYSxcIl9lbXZhbF90YWtlX3ZhbHVlXCIpO2E9YS5yZWFkVmFsdWVGcm9tUG9pbnRlcihiKTtyZXR1cm4gVyhhKX0sUzpmdW5jdGlvbihhLFxuYil7YT1ZKGEpO2I9WShiKTthPW5ldyBEYXRlKDFFMyphKTtKW2I+PjJdPWEuZ2V0VVRDU2Vjb25kcygpO0pbYis0Pj4yXT1hLmdldFVUQ01pbnV0ZXMoKTtKW2IrOD4+Ml09YS5nZXRVVENIb3VycygpO0pbYisxMj4+Ml09YS5nZXRVVENEYXRlKCk7SltiKzE2Pj4yXT1hLmdldFVUQ01vbnRoKCk7SltiKzIwPj4yXT1hLmdldFVUQ0Z1bGxZZWFyKCktMTkwMDtKW2IrMjQ+PjJdPWEuZ2V0VVRDRGF5KCk7SltiKzI4Pj4yXT0oYS5nZXRUaW1lKCktRGF0ZS5VVEMoYS5nZXRVVENGdWxsWWVhcigpLDAsMSwwLDAsMCwwKSkvODY0RTV8MH0sVDpmdW5jdGlvbihhLGIpe2E9WShhKTtiPVkoYik7YT1uZXcgRGF0ZSgxRTMqYSk7SltiPj4yXT1hLmdldFNlY29uZHMoKTtKW2IrND4+Ml09YS5nZXRNaW51dGVzKCk7SltiKzg+PjJdPWEuZ2V0SG91cnMoKTtKW2IrMTI+PjJdPWEuZ2V0RGF0ZSgpO0pbYisxNj4+Ml09YS5nZXRNb250aCgpO0pbYisyMD4+Ml09YS5nZXRGdWxsWWVhcigpLTE5MDA7XG5KW2IrMjQ+PjJdPWEuZ2V0RGF5KCk7SltiKzI4Pj4yXT0oWihhLmdldEZ1bGxZZWFyKCkpP29iOnBiKVthLmdldE1vbnRoKCldK2EuZ2V0RGF0ZSgpLTF8MDtKW2IrMzY+PjJdPS0oNjAqYS5nZXRUaW1lem9uZU9mZnNldCgpKTt2YXIgYz0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksZD0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7SltiKzMyPj4yXT0oYyE9ZCYmYS5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihkLGMpKXwwfSxVOmZ1bmN0aW9uKGEpe2E9WShhKTt2YXIgYj1uZXcgRGF0ZShKW2ErMjA+PjJdKzE5MDAsSlthKzE2Pj4yXSxKW2ErMTI+PjJdLEpbYSs4Pj4yXSxKW2ErND4+Ml0sSlthPj4yXSwwKSxjPUpbYSszMj4+Ml0sZD1iLmdldFRpbWV6b25lT2Zmc2V0KCksZT0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksaD0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLFxuMCwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKSxsPU1hdGgubWluKGgsZSk7MD5jP0pbYSszMj4+Ml09TnVtYmVyKGUhPWgmJmw9PWQpOjA8YyE9KGw9PWQpJiYoZT1NYXRoLm1heChoLGUpLGIuc2V0VGltZShiLmdldFRpbWUoKSs2RTQqKCgwPGM/bDplKS1kKSkpO0pbYSsyND4+Ml09Yi5nZXREYXkoKTtKW2ErMjg+PjJdPShaKGIuZ2V0RnVsbFllYXIoKSk/b2I6cGIpW2IuZ2V0TW9udGgoKV0rYi5nZXREYXRlKCktMXwwO0pbYT4+Ml09Yi5nZXRTZWNvbmRzKCk7SlthKzQ+PjJdPWIuZ2V0TWludXRlcygpO0pbYSs4Pj4yXT1iLmdldEhvdXJzKCk7SlthKzEyPj4yXT1iLmdldERhdGUoKTtKW2ErMTY+PjJdPWIuZ2V0TW9udGgoKTtKW2ErMjA+PjJdPWIuZ2V0WWVhcigpO3JldHVybiBCaWdJbnQoYi5nZXRUaW1lKCkvMUUzKX0sUTpmdW5jdGlvbigpe3JldHVybi01Mn0sUjpmdW5jdGlvbigpe30sSjooYSxiLGMpPT57ZnVuY3Rpb24gZChuKXtyZXR1cm4obj1uLnRvVGltZVN0cmluZygpLm1hdGNoKC9cXCgoW0EtWmEteiBdKylcXCkkLykpP1xublsxXTpcIkdNVFwifXZhciBlPShuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKSxoPW5ldyBEYXRlKGUsMCwxKSxsPW5ldyBEYXRlKGUsNiwxKTtlPWguZ2V0VGltZXpvbmVPZmZzZXQoKTt2YXIgaz1sLmdldFRpbWV6b25lT2Zmc2V0KCk7S1thPj4yXT02MCpNYXRoLm1heChlLGspO0pbYj4+Ml09TnVtYmVyKGUhPWspO2E9ZChoKTtiPWQobCk7YT1yYihhKTtiPXJiKGIpO2s8ZT8oS1tjPj4yXT1hLEtbYys0Pj4yXT1iKTooS1tjPj4yXT1iLEtbYys0Pj4yXT1hKX0sdDooKT0+e2phKFwiXCIpfSxCOmZ1bmN0aW9uKCl7cmV0dXJuIERhdGUubm93KCl9LEs6KCk9PjIxNDc0ODM2NDgsbjooKT0+cGVyZm9ybWFuY2Uubm93KCksWjooYSxiLGMpPT5FLmNvcHlXaXRoaW4oYSxiLGIrYyksSTphPT57dmFyIGI9RS5sZW5ndGg7YT4+Pj0wO2lmKDIxNDc0ODM2NDg8YSlyZXR1cm4hMTtmb3IodmFyIGM9MTs0Pj1jO2MqPTIpe3ZhciBkPWIqKDErLjIvYyk7ZD1NYXRoLm1pbihkLGErMTAwNjYzMjk2KTt2YXIgZT1cbk1hdGg7ZD1NYXRoLm1heChhLGQpO2E6e2U9ZS5taW4uY2FsbChlLDIxNDc0ODM2NDgsZCsoNjU1MzYtZCU2NTUzNiklNjU1MzYpLUIuYnVmZmVyLmJ5dGVMZW5ndGgrNjU1MzU+Pj4xNjt0cnl7Qi5ncm93KGUpO3BhKCk7dmFyIGg9MTticmVhayBhfWNhdGNoKGwpe31oPXZvaWQgMH1pZihoKXJldHVybiEwfXJldHVybiExfSxYOihhLGIpPT57dmFyIGM9MDt1YigpLmZvckVhY2goZnVuY3Rpb24oZCxlKXt2YXIgaD1iK2M7ZT1LW2ErNCplPj4yXT1oO2ZvcihoPTA7aDxkLmxlbmd0aDsrK2gpRFtlKys+PjBdPWQuY2hhckNvZGVBdChoKTtEW2U+PjBdPTA7Yys9ZC5sZW5ndGgrMX0pO3JldHVybiAwfSxZOihhLGIpPT57dmFyIGM9dWIoKTtLW2E+PjJdPWMubGVuZ3RoO3ZhciBkPTA7Yy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2QrPWUubGVuZ3RoKzF9KTtLW2I+PjJdPWQ7cmV0dXJuIDB9LHc6KCk9PjUyLHo6KCk9PjUyLFc6ZnVuY3Rpb24oKXtyZXR1cm4gNzB9LHk6KGEsYixjLGQpPT57Zm9yKHZhciBlPVxuMCxoPTA7aDxjO2grKyl7dmFyIGw9S1tiPj4yXSxrPUtbYis0Pj4yXTtiKz04O2Zvcih2YXIgbj0wO248aztuKyspe3ZhciBwPUVbbCtuXSx2PXZiW2FdOzA9PT1wfHwxMD09PXA/KCgxPT09YT9pYTp6KShPKHYsMCkpLHYubGVuZ3RoPTApOnYucHVzaChwKX1lKz1rfUtbZD4+Ml09ZTtyZXR1cm4gMH0sZ2E6emIsbTooYSxiLGMsZCk9PnpiKGEsYixjLGQpfTtcbihmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYyl7Qz1jPWMuZXhwb3J0cztCPUMuaGE7cGEoKTtyYS51bnNoaWZ0KEMuaWEpO0wtLTtmLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMmJmYubW9uaXRvclJ1bkRlcGVuZGVuY2llcyhMKTtpZigwPT1MJiYobnVsbCE9PXVhJiYoY2xlYXJJbnRlcnZhbCh1YSksdWE9bnVsbCksTSkpe3ZhciBkPU07TT1udWxsO2QoKX1yZXR1cm4gY312YXIgYj17YTpDYn07TCsrO2YubW9uaXRvclJ1bkRlcGVuZGVuY2llcyYmZi5tb25pdG9yUnVuRGVwZW5kZW5jaWVzKEwpO2lmKGYuaW5zdGFudGlhdGVXYXNtKXRyeXtyZXR1cm4gZi5pbnN0YW50aWF0ZVdhc20oYixhKX1jYXRjaChjKXt6KFwiTW9kdWxlLmluc3RhbnRpYXRlV2FzbSBjYWxsYmFjayBmYWlsZWQgd2l0aCBlcnJvcjogXCIrYyksbShjKX1BYShiLGZ1bmN0aW9uKGMpe2EoYy5pbnN0YW5jZSl9KS5jYXRjaChtKTtyZXR1cm57fX0pKCk7Zi5fT3J0SW5pdD0oYSxiKT0+KGYuX09ydEluaXQ9Qy5qYSkoYSxiKTtcbmYuX09ydEdldExhc3RFcnJvcj0oYSxiKT0+KGYuX09ydEdldExhc3RFcnJvcj1DLmthKShhLGIpO2YuX09ydENyZWF0ZVNlc3Npb25PcHRpb25zPShhLGIsYyxkLGUsaCxsLGssbixwKT0+KGYuX09ydENyZWF0ZVNlc3Npb25PcHRpb25zPUMubGEpKGEsYixjLGQsZSxoLGwsayxuLHApO2YuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyPShhLGIpPT4oZi5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXI9Qy5tYSkoYSxiKTtmLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9KGEsYixjKT0+KGYuX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZT1DLm5hKShhLGIsYyk7Zi5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihmLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9Qy5vYSkoYSxiLGMpO2YuX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucz1hPT4oZi5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPUMucGEpKGEpO1xuZi5fT3J0Q3JlYXRlU2Vzc2lvbj0oYSxiLGMpPT4oZi5fT3J0Q3JlYXRlU2Vzc2lvbj1DLnFhKShhLGIsYyk7Zi5fT3J0UmVsZWFzZVNlc3Npb249YT0+KGYuX09ydFJlbGVhc2VTZXNzaW9uPUMucmEpKGEpO2YuX09ydEdldElucHV0T3V0cHV0Q291bnQ9KGEsYixjKT0+KGYuX09ydEdldElucHV0T3V0cHV0Q291bnQ9Qy5zYSkoYSxiLGMpO2YuX09ydEdldElucHV0TmFtZT0oYSxiKT0+KGYuX09ydEdldElucHV0TmFtZT1DLnRhKShhLGIpO2YuX09ydEdldE91dHB1dE5hbWU9KGEsYik9PihmLl9PcnRHZXRPdXRwdXROYW1lPUMudWEpKGEsYik7Zi5fT3J0RnJlZT1hPT4oZi5fT3J0RnJlZT1DLnZhKShhKTtmLl9PcnRDcmVhdGVUZW5zb3I9KGEsYixjLGQsZSxoKT0+KGYuX09ydENyZWF0ZVRlbnNvcj1DLndhKShhLGIsYyxkLGUsaCk7Zi5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZCxlKT0+KGYuX09ydEdldFRlbnNvckRhdGE9Qy54YSkoYSxiLGMsZCxlKTtcbmYuX09ydFJlbGVhc2VUZW5zb3I9YT0+KGYuX09ydFJlbGVhc2VUZW5zb3I9Qy55YSkoYSk7Zi5fT3J0Q3JlYXRlUnVuT3B0aW9ucz0oYSxiLGMsZCk9PihmLl9PcnRDcmVhdGVSdW5PcHRpb25zPUMuemEpKGEsYixjLGQpO2YuX09ydEFkZFJ1bkNvbmZpZ0VudHJ5PShhLGIsYyk9PihmLl9PcnRBZGRSdW5Db25maWdFbnRyeT1DLkFhKShhLGIsYyk7Zi5fT3J0UmVsZWFzZVJ1bk9wdGlvbnM9YT0+KGYuX09ydFJlbGVhc2VSdW5PcHRpb25zPUMuQmEpKGEpO2YuX09ydENyZWF0ZUJpbmRpbmc9YT0+KGYuX09ydENyZWF0ZUJpbmRpbmc9Qy5DYSkoYSk7Zi5fT3J0QmluZElucHV0PShhLGIsYyk9PihmLl9PcnRCaW5kSW5wdXQ9Qy5EYSkoYSxiLGMpO2YuX09ydEJpbmRPdXRwdXQ9KGEsYixjLGQpPT4oZi5fT3J0QmluZE91dHB1dD1DLkVhKShhLGIsYyxkKTtmLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4oZi5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9Qy5GYSkoYSk7XG5mLl9PcnRSZWxlYXNlQmluZGluZz1hPT4oZi5fT3J0UmVsZWFzZUJpbmRpbmc9Qy5HYSkoYSk7Zi5fT3J0UnVuV2l0aEJpbmRpbmc9KGEsYixjLGQsZSk9PihmLl9PcnRSdW5XaXRoQmluZGluZz1DLkhhKShhLGIsYyxkLGUpO2YuX09ydFJ1bj0oYSxiLGMsZCxlLGgsbCxrKT0+KGYuX09ydFJ1bj1DLklhKShhLGIsYyxkLGUsaCxsLGspO2YuX09ydEVuZFByb2ZpbGluZz1hPT4oZi5fT3J0RW5kUHJvZmlsaW5nPUMuSmEpKGEpO3ZhciBxYj1mLl9tYWxsb2M9YT0+KHFiPWYuX21hbGxvYz1DLkthKShhKSxYPWYuX2ZyZWU9YT0+KFg9Zi5fZnJlZT1DLkxhKShhKSxhYj1hPT4oYWI9Qy5NYSkoYSk7Zi5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPSgpPT4oZi5fX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPUMuTmEpKCk7dmFyIERiPSgpPT4oRGI9Qy5QYSkoKSxFYj1hPT4oRWI9Qy5RYSkoYSksRmI9YT0+KEZiPUMuUmEpKGEpO2Yuc3RhY2tBbGxvYz1GYjtcbmYuc3RhY2tTYXZlPURiO2Yuc3RhY2tSZXN0b3JlPUViO2YuVVRGOFRvU3RyaW5nPShhLGIpPT5hP08oRSxhLGIpOlwiXCI7Zi5zdHJpbmdUb1VURjg9KGEsYixjKT0+UShhLEUsYixjKTtmLmxlbmd0aEJ5dGVzVVRGOD1QO3ZhciBHYjtNPWZ1bmN0aW9uIEhiKCl7R2J8fEliKCk7R2J8fChNPUhiKX07XG5mdW5jdGlvbiBJYigpe2Z1bmN0aW9uIGEoKXtpZighR2ImJihHYj0hMCxmLmNhbGxlZFJ1bj0hMCwha2EpKXtCYShyYSk7YWEoZik7aWYoZi5vblJ1bnRpbWVJbml0aWFsaXplZClmLm9uUnVudGltZUluaXRpYWxpemVkKCk7aWYoZi5wb3N0UnVuKWZvcihcImZ1bmN0aW9uXCI9PXR5cGVvZiBmLnBvc3RSdW4mJihmLnBvc3RSdW49W2YucG9zdFJ1bl0pO2YucG9zdFJ1bi5sZW5ndGg7KXt2YXIgYj1mLnBvc3RSdW4uc2hpZnQoKTtzYS51bnNoaWZ0KGIpfUJhKHNhKX19aWYoISgwPEwpKXtpZihmLnByZVJ1bilmb3IoXCJmdW5jdGlvblwiPT10eXBlb2YgZi5wcmVSdW4mJihmLnByZVJ1bj1bZi5wcmVSdW5dKTtmLnByZVJ1bi5sZW5ndGg7KXRhKCk7QmEocWEpOzA8THx8KGYuc2V0U3RhdHVzPyhmLnNldFN0YXR1cyhcIlJ1bm5pbmcuLi5cIiksc2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtmLnNldFN0YXR1cyhcIlwiKX0sMSk7YSgpfSwxKSk6YSgpKX19XG5pZihmLnByZUluaXQpZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIGYucHJlSW5pdCYmKGYucHJlSW5pdD1bZi5wcmVJbml0XSk7MDxmLnByZUluaXQubGVuZ3RoOylmLnByZUluaXQucG9wKCkoKTtJYigpO1xuXG5cbiAgcmV0dXJuIG1vZHVsZUFyZy5yZWFkeVxufVxuXG4pO1xufSkoKTtcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG4gIG1vZHVsZS5leHBvcnRzID0gb3J0V2FzbTtcbmVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSlcbiAgZGVmaW5lKFtdLCAoKSA9PiBvcnRXYXNtKTtcbiIsICIiLCAiIiwgImV4cG9ydCBjb25zdCBjcHVzID0gdW5kZWZpbmVkOyIsICJcbnZhciBvcnRXYXNtVGhyZWFkZWQgPSAoKCkgPT4ge1xuICB2YXIgX3NjcmlwdERpciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjIDogdW5kZWZpbmVkO1xuICBpZiAodHlwZW9mIF9fZmlsZW5hbWUgIT09ICd1bmRlZmluZWQnKSBfc2NyaXB0RGlyID0gX3NjcmlwdERpciB8fCBfX2ZpbGVuYW1lO1xuICByZXR1cm4gKFxuZnVuY3Rpb24obW9kdWxlQXJnID0ge30pIHtcblxuZnVuY3Rpb24gZSgpe20uYnVmZmVyIT1uLmJ1ZmZlciYmcCgpO3JldHVybiBufWZ1bmN0aW9uIHQoKXttLmJ1ZmZlciE9bi5idWZmZXImJnAoKTtyZXR1cm4gYWF9ZnVuY3Rpb24gdigpe20uYnVmZmVyIT1uLmJ1ZmZlciYmcCgpO3JldHVybiBiYX1mdW5jdGlvbiBjYSgpe20uYnVmZmVyIT1uLmJ1ZmZlciYmcCgpO3JldHVybiBkYX1mdW5jdGlvbiB3KCl7bS5idWZmZXIhPW4uYnVmZmVyJiZwKCk7cmV0dXJuIGVhfWZ1bmN0aW9uIHooKXttLmJ1ZmZlciE9bi5idWZmZXImJnAoKTtyZXR1cm4gZmF9ZnVuY3Rpb24gaGEoKXttLmJ1ZmZlciE9bi5idWZmZXImJnAoKTtyZXR1cm4gaWF9dmFyIEE9bW9kdWxlQXJnLGphLGthO0EucmVhZHk9bmV3IFByb21pc2UoKGEsYik9PntqYT1hO2thPWJ9KTtcbnZhciBsYT1PYmplY3QuYXNzaWduKHt9LEEpLG1hPVwiLi90aGlzLnByb2dyYW1cIixDPShhLGIpPT57dGhyb3cgYjt9LG5hPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3csRD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpbXBvcnRTY3JpcHRzLEU9XCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MmJlwib2JqZWN0XCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zJiZcInN0cmluZ1wiPT10eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLEY9QS5FTlZJUk9OTUVOVF9JU19QVEhSRUFEfHwhMSxHPVwiXCI7ZnVuY3Rpb24gb2EoYSl7cmV0dXJuIEEubG9jYXRlRmlsZT9BLmxvY2F0ZUZpbGUoYSxHKTpHK2F9dmFyIHBhLHFhLHJhO1xuaWYoRSl7dmFyIGZzPXJlcXVpcmUoXCJmc1wiKSxzYT1yZXF1aXJlKFwicGF0aFwiKTtHPUQ/c2EuZGlybmFtZShHKStcIi9cIjpfX2Rpcm5hbWUrXCIvXCI7cGE9KGIsYyk9PntiPWIuc3RhcnRzV2l0aChcImZpbGU6Ly9cIik/bmV3IFVSTChiKTpzYS5ub3JtYWxpemUoYik7cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhiLGM/dm9pZCAwOlwidXRmOFwiKX07cmE9Yj0+e2I9cGEoYiwhMCk7Yi5idWZmZXJ8fChiPW5ldyBVaW50OEFycmF5KGIpKTtyZXR1cm4gYn07cWE9KGIsYyxkLGY9ITApPT57Yj1iLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYik6c2Eubm9ybWFsaXplKGIpO2ZzLnJlYWRGaWxlKGIsZj92b2lkIDA6XCJ1dGY4XCIsKGcsayk9PntnP2QoZyk6YyhmP2suYnVmZmVyOmspfSl9OyFBLnRoaXNQcm9ncmFtJiYxPHByb2Nlc3MuYXJndi5sZW5ndGgmJihtYT1wcm9jZXNzLmFyZ3ZbMV0ucmVwbGFjZSgvXFxcXC9nLFwiL1wiKSk7cHJvY2Vzcy5hcmd2LnNsaWNlKDIpO0M9KGIsYyk9Pntwcm9jZXNzLmV4aXRDb2RlPVxuYjt0aHJvdyBjO307QS5pbnNwZWN0PSgpPT5cIltFbXNjcmlwdGVuIE1vZHVsZSBvYmplY3RdXCI7bGV0IGE7dHJ5e2E9cmVxdWlyZShcIndvcmtlcl90aHJlYWRzXCIpfWNhdGNoKGIpe3Rocm93IGNvbnNvbGUuZXJyb3IoJ1RoZSBcIndvcmtlcl90aHJlYWRzXCIgbW9kdWxlIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBub2RlLmpzIGJ1aWxkIC0gcGVyaGFwcyBhIG5ld2VyIHZlcnNpb24gaXMgbmVlZGVkPycpLGI7fWdsb2JhbC5Xb3JrZXI9YS5Xb3JrZXJ9ZWxzZSBpZihuYXx8RClEP0c9c2VsZi5sb2NhdGlvbi5ocmVmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCYmZG9jdW1lbnQuY3VycmVudFNjcmlwdCYmKEc9ZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMpLCh0eXBlb2YgX3NjcmlwdERpciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBfc2NyaXB0RGlyKSYmKEc9X3NjcmlwdERpciksMCE9PUcuaW5kZXhPZihcImJsb2I6XCIpP0c9Ry5zdWJzdHIoMCxHLnJlcGxhY2UoL1s/I10uKi8sXCJcIikubGFzdEluZGV4T2YoXCIvXCIpKzEpOkc9XCJcIixFfHwocGE9YT0+e3ZhciBiPVxubmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2Iuc2VuZChudWxsKTtyZXR1cm4gYi5yZXNwb25zZVRleHR9LEQmJihyYT1hPT57dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2IucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIjtiLnNlbmQobnVsbCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGIucmVzcG9uc2UpfSkscWE9KGEsYixjKT0+e3ZhciBkPW5ldyBYTUxIdHRwUmVxdWVzdDtkLm9wZW4oXCJHRVRcIixhLCEwKTtkLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCI7ZC5vbmxvYWQ9KCk9PnsyMDA9PWQuc3RhdHVzfHwwPT1kLnN0YXR1cyYmZC5yZXNwb25zZT9iKGQucmVzcG9uc2UpOmMoKX07ZC5vbmVycm9yPWM7ZC5zZW5kKG51bGwpfSk7RSYmXCJ1bmRlZmluZWRcIj09dHlwZW9mIHBlcmZvcm1hbmNlJiYoZ2xvYmFsLnBlcmZvcm1hbmNlPXJlcXVpcmUoXCJwZXJmX2hvb2tzXCIpLnBlcmZvcm1hbmNlKTtcbnZhciB0YT1jb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLHVhPWNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKTtFJiYodGE9KC4uLmEpPT5mcy53cml0ZVN5bmMoMSxhLmpvaW4oXCIgXCIpK1wiXFxuXCIpLHVhPSguLi5hKT0+ZnMud3JpdGVTeW5jKDIsYS5qb2luKFwiIFwiKStcIlxcblwiKSk7dmFyIHZhPUEucHJpbnR8fHRhLEg9QS5wcmludEVycnx8dWE7T2JqZWN0LmFzc2lnbihBLGxhKTtsYT1udWxsO0EudGhpc1Byb2dyYW0mJihtYT1BLnRoaXNQcm9ncmFtKTtBLnF1aXQmJihDPUEucXVpdCk7dmFyIEk7QS53YXNtQmluYXJ5JiYoST1BLndhc21CaW5hcnkpO3ZhciBub0V4aXRSdW50aW1lPUEubm9FeGl0UnVudGltZXx8ITA7XCJvYmplY3RcIiE9dHlwZW9mIFdlYkFzc2VtYmx5JiZ3YShcIm5vIG5hdGl2ZSB3YXNtIHN1cHBvcnQgZGV0ZWN0ZWRcIik7dmFyIG0sSix4YSx5YT0hMSxLLG4sYWEsYmEsZGEsZWEsZmEsemEsTCxBYSxpYTtcbmZ1bmN0aW9uIHAoKXt2YXIgYT1tLmJ1ZmZlcjtBLkhFQVA4PW49bmV3IEludDhBcnJheShhKTtBLkhFQVAxNj1iYT1uZXcgSW50MTZBcnJheShhKTtBLkhFQVAzMj1lYT1uZXcgSW50MzJBcnJheShhKTtBLkhFQVBVOD1hYT1uZXcgVWludDhBcnJheShhKTtBLkhFQVBVMTY9ZGE9bmV3IFVpbnQxNkFycmF5KGEpO0EuSEVBUFUzMj1mYT1uZXcgVWludDMyQXJyYXkoYSk7QS5IRUFQRjMyPXphPW5ldyBGbG9hdDMyQXJyYXkoYSk7QS5IRUFQRjY0PWlhPW5ldyBGbG9hdDY0QXJyYXkoYSk7QS5IRUFQNjQ9TD1uZXcgQmlnSW50NjRBcnJheShhKTtBLkhFQVBVNjQ9QWE9bmV3IEJpZ1VpbnQ2NEFycmF5KGEpfXZhciBCYT1BLklOSVRJQUxfTUVNT1JZfHwxNjc3NzIxNjs1MjQyODgwPD1CYXx8d2EoXCJJTklUSUFMX01FTU9SWSBzaG91bGQgYmUgbGFyZ2VyIHRoYW4gU1RBQ0tfU0laRSwgd2FzIFwiK0JhK1wiISAoU1RBQ0tfU0laRT01MjQyODgwKVwiKTtcbmlmKEYpbT1BLndhc21NZW1vcnk7ZWxzZSBpZihBLndhc21NZW1vcnkpbT1BLndhc21NZW1vcnk7ZWxzZSBpZihtPW5ldyBXZWJBc3NlbWJseS5NZW1vcnkoe2luaXRpYWw6QmEvNjU1MzYsbWF4aW11bTozMjc2OCxzaGFyZWQ6ITB9KSwhKG0uYnVmZmVyIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpKXRocm93IEgoXCJyZXF1ZXN0ZWQgYSBzaGFyZWQgV2ViQXNzZW1ibHkuTWVtb3J5IGJ1dCB0aGUgcmV0dXJuZWQgYnVmZmVyIGlzIG5vdCBhIFNoYXJlZEFycmF5QnVmZmVyLCBpbmRpY2F0aW5nIHRoYXQgd2hpbGUgdGhlIGJyb3dzZXIgaGFzIFNoYXJlZEFycmF5QnVmZmVyIGl0IGRvZXMgbm90IGhhdmUgV2ViQXNzZW1ibHkgdGhyZWFkcyBzdXBwb3J0IC0geW91IG1heSBuZWVkIHRvIHNldCBhIGZsYWdcIiksRSYmSChcIihvbiBub2RlIHlvdSBtYXkgbmVlZDogLS1leHBlcmltZW50YWwtd2FzbS10aHJlYWRzIC0tZXhwZXJpbWVudGFsLXdhc20tYnVsay1tZW1vcnkgYW5kL29yIHJlY2VudCB2ZXJzaW9uKVwiKSxcbkVycm9yKFwiYmFkIG1lbW9yeVwiKTtwKCk7QmE9bS5idWZmZXIuYnl0ZUxlbmd0aDt2YXIgQ2EsRGE9W10sRWE9W10sRmE9W10sR2E9MDtmdW5jdGlvbiBIYSgpe3JldHVybiBub0V4aXRSdW50aW1lfHwwPEdhfXZhciBNPTAsSWE9bnVsbCxKYT1udWxsO2Z1bmN0aW9uIEthKCl7TSsrO0EubW9uaXRvclJ1bkRlcGVuZGVuY2llcyYmQS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzKE0pfWZ1bmN0aW9uIExhKCl7TS0tO0EubW9uaXRvclJ1bkRlcGVuZGVuY2llcyYmQS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzKE0pO2lmKDA9PU0mJihudWxsIT09SWEmJihjbGVhckludGVydmFsKElhKSxJYT1udWxsKSxKYSkpe3ZhciBhPUphO0phPW51bGw7YSgpfX1cbmZ1bmN0aW9uIHdhKGEpe2lmKEEub25BYm9ydClBLm9uQWJvcnQoYSk7YT1cIkFib3J0ZWQoXCIrYStcIilcIjtIKGEpO3lhPSEwO0s9MTthPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3IoYStcIi4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby5cIik7a2EoYSk7dGhyb3cgYTt9ZnVuY3Rpb24gTWEoYSl7cmV0dXJuIGEuc3RhcnRzV2l0aChcImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxcIil9dmFyIE87Tz1cIm9ydC13YXNtLXRocmVhZGVkLndhc21cIjtNYShPKXx8KE89b2EoTykpO2Z1bmN0aW9uIE5hKGEpe2lmKGE9PU8mJkkpcmV0dXJuIG5ldyBVaW50OEFycmF5KEkpO2lmKHJhKXJldHVybiByYShhKTt0aHJvd1wiYm90aCBhc3luYyBhbmQgc3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWRcIjt9XG5mdW5jdGlvbiBPYShhKXtpZighSSYmKG5hfHxEKSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZmV0Y2gmJiFhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXJldHVybiBmZXRjaChhLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGI9PntpZighYi5vayl0aHJvd1wiZmFpbGVkIHRvIGxvYWQgd2FzbSBiaW5hcnkgZmlsZSBhdCAnXCIrYStcIidcIjtyZXR1cm4gYi5hcnJheUJ1ZmZlcigpfSkuY2F0Y2goKCk9Pk5hKGEpKTtpZihxYSlyZXR1cm4gbmV3IFByb21pc2UoKGIsYyk9PntxYShhLGQ9PmIobmV3IFVpbnQ4QXJyYXkoZCkpLGMpfSl9cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9Pk5hKGEpKX1mdW5jdGlvbiBQYShhLGIsYyl7cmV0dXJuIE9hKGEpLnRoZW4oZD0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZCxiKSkudGhlbihkPT5kKS50aGVuKGMsZD0+e0goXCJmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiBcIitkKTt3YShkKX0pfVxuZnVuY3Rpb24gUWEoYSxiKXt2YXIgYz1PO3JldHVybiBJfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZ3x8TWEoYyl8fGMuc3RhcnRzV2l0aChcImZpbGU6Ly9cIil8fEV8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIGZldGNoP1BhKGMsYSxiKTpmZXRjaChjLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGQ9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKGQsYSkudGhlbihiLGZ1bmN0aW9uKGYpe0goXCJ3YXNtIHN0cmVhbWluZyBjb21waWxlIGZhaWxlZDogXCIrZik7SChcImZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uXCIpO3JldHVybiBQYShjLGEsYil9KSl9ZnVuY3Rpb24gUmEoYSl7dGhpcy5uYW1lPVwiRXhpdFN0YXR1c1wiO3RoaXMubWVzc2FnZT1gUHJvZ3JhbSB0ZXJtaW5hdGVkIHdpdGggZXhpdCgke2F9KWA7dGhpcy5zdGF0dXM9YX1cbmZ1bmN0aW9uIFNhKGEpe2EudGVybWluYXRlKCk7YS5vbm1lc3NhZ2U9KCk9Pnt9fWZ1bmN0aW9uIFRhKGEpeyhhPVAua2JbYV0pfHx3YSgpO1AuUWIoYSl9ZnVuY3Rpb24gVWEoYSl7dmFyIGI9UC5IYigpO2lmKCFiKXJldHVybiA2O1Aub2IucHVzaChiKTtQLmtiW2EubmJdPWI7Yi5uYj1hLm5iO3ZhciBjPXtjbWQ6XCJydW5cIixzdGFydF9yb3V0aW5lOmEuUmIsYXJnOmEuR2IscHRocmVhZF9wdHI6YS5uYn07RSYmYi51bnJlZigpO2IucG9zdE1lc3NhZ2UoYyxhLlhiKTtyZXR1cm4gMH1cbnZhciBWYT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVGV4dERlY29kZXI/bmV3IFRleHREZWNvZGVyKFwidXRmOFwiKTp2b2lkIDAsV2E9KGEsYixjKT0+e3ZhciBkPWIrYztmb3IoYz1iO2FbY10mJiEoYz49ZCk7KSsrYztpZigxNjxjLWImJmEuYnVmZmVyJiZWYSlyZXR1cm4gVmEuZGVjb2RlKGEuYnVmZmVyIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXI/YS5zbGljZShiLGMpOmEuc3ViYXJyYXkoYixjKSk7Zm9yKGQ9XCJcIjtiPGM7KXt2YXIgZj1hW2IrK107aWYoZiYxMjgpe3ZhciBnPWFbYisrXSY2MztpZigxOTI9PShmJjIyNCkpZCs9U3RyaW5nLmZyb21DaGFyQ29kZSgoZiYzMSk8PDZ8Zyk7ZWxzZXt2YXIgaz1hW2IrK10mNjM7Zj0yMjQ9PShmJjI0MCk/KGYmMTUpPDwxMnxnPDw2fGs6KGYmNyk8PDE4fGc8PDEyfGs8PDZ8YVtiKytdJjYzOzY1NTM2PmY/ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShmKTooZi09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxmPj4xMCw1NjMyMHxcbmYmMTAyMykpfX1lbHNlIGQrPVN0cmluZy5mcm9tQ2hhckNvZGUoZil9cmV0dXJuIGR9LFhhPShhLGIpPT5hP1dhKHQoKSxhLGIpOlwiXCI7ZnVuY3Rpb24gWWEoYSl7aWYoRilyZXR1cm4gUSgxLDEsYSk7Sz1hO2lmKCFIYSgpKXtQLlNiKCk7aWYoQS5vbkV4aXQpQS5vbkV4aXQoYSk7eWE9ITB9QyhhLG5ldyBSYShhKSl9XG52YXIgJGE9YT0+e0s9YTtpZihGKXRocm93IFphKGEpLFwidW53aW5kXCI7WWEoYSl9LFA9e3JiOltdLG9iOltdLEViOltdLGtiOnt9LHdiOmZ1bmN0aW9uKCl7Rj9QLktiKCk6UC5KYigpfSxKYjpmdW5jdGlvbigpe0RhLnVuc2hpZnQoKCk9PntLYSgpO1AuTWIoKCk9PkxhKCkpfSl9LEtiOmZ1bmN0aW9uKCl7UC5yZWNlaXZlT2JqZWN0VHJhbnNmZXI9UC5QYjtQLnRocmVhZEluaXRUTFM9UC5EYjtQLnNldEV4aXRTdGF0dXM9UC5DYjtub0V4aXRSdW50aW1lPSExfSxDYjpmdW5jdGlvbihhKXtLPWF9LGJjOltcIiR0ZXJtaW5hdGVXb3JrZXJcIl0sU2I6ZnVuY3Rpb24oKXtmb3IodmFyIGEgb2YgUC5vYilTYShhKTtmb3IoYSBvZiBQLnJiKVNhKGEpO1AucmI9W107UC5vYj1bXTtQLmtiPVtdfSxRYjpmdW5jdGlvbihhKXt2YXIgYj1hLm5iO2RlbGV0ZSBQLmtiW2JdO1AucmIucHVzaChhKTtQLm9iLnNwbGljZShQLm9iLmluZGV4T2YoYSksMSk7YS5uYj0wO2FiKGIpfSxQYjpmdW5jdGlvbigpe30sXG5EYjpmdW5jdGlvbigpe1AuRWIuZm9yRWFjaChhPT5hKCkpfSxOYjphPT5uZXcgUHJvbWlzZShiPT57YS5vbm1lc3NhZ2U9Zz0+e2c9Zy5kYXRhO3ZhciBrPWcuY21kO2lmKGcudGFyZ2V0VGhyZWFkJiZnLnRhcmdldFRocmVhZCE9YmIoKSl7dmFyIGw9UC5rYltnLmFjXTtsP2wucG9zdE1lc3NhZ2UoZyxnLnRyYW5zZmVyTGlzdCk6SCgnSW50ZXJuYWwgZXJyb3IhIFdvcmtlciBzZW50IGEgbWVzc2FnZSBcIicraysnXCIgdG8gdGFyZ2V0IHB0aHJlYWQgJytnLnRhcmdldFRocmVhZCtcIiwgYnV0IHRoYXQgdGhyZWFkIG5vIGxvbmdlciBleGlzdHMhXCIpfWVsc2UgaWYoXCJjaGVja01haWxib3hcIj09PWspY2IoKTtlbHNlIGlmKFwic3Bhd25UaHJlYWRcIj09PWspVWEoZyk7ZWxzZSBpZihcImNsZWFudXBUaHJlYWRcIj09PWspVGEoZy50aHJlYWQpO2Vsc2UgaWYoXCJraWxsVGhyZWFkXCI9PT1rKWc9Zy50aHJlYWQsaz1QLmtiW2ddLGRlbGV0ZSBQLmtiW2ddLFNhKGspLGFiKGcpLFAub2Iuc3BsaWNlKFAub2IuaW5kZXhPZihrKSxcbjEpLGsubmI9MDtlbHNlIGlmKFwiY2FuY2VsVGhyZWFkXCI9PT1rKVAua2JbZy50aHJlYWRdLnBvc3RNZXNzYWdlKHtjbWQ6XCJjYW5jZWxcIn0pO2Vsc2UgaWYoXCJsb2FkZWRcIj09PWspYS5sb2FkZWQ9ITAsYihhKTtlbHNlIGlmKFwiYWxlcnRcIj09PWspYWxlcnQoXCJUaHJlYWQgXCIrZy50aHJlYWRJZCtcIjogXCIrZy50ZXh0KTtlbHNlIGlmKFwic2V0aW1tZWRpYXRlXCI9PT1nLnRhcmdldClhLnBvc3RNZXNzYWdlKGcpO2Vsc2UgaWYoXCJjYWxsSGFuZGxlclwiPT09aylBW2cuaGFuZGxlcl0oLi4uZy5hcmdzKTtlbHNlIGsmJkgoXCJ3b3JrZXIgc2VudCBhbiB1bmtub3duIGNvbW1hbmQgXCIrayl9O2Eub25lcnJvcj1nPT57SChcIndvcmtlciBzZW50IGFuIGVycm9yISBcIitnLmZpbGVuYW1lK1wiOlwiK2cubGluZW5vK1wiOiBcIitnLm1lc3NhZ2UpO3Rocm93IGc7fTtFJiYoYS5vbihcIm1lc3NhZ2VcIixmdW5jdGlvbihnKXthLm9ubWVzc2FnZSh7ZGF0YTpnfSl9KSxhLm9uKFwiZXJyb3JcIixmdW5jdGlvbihnKXthLm9uZXJyb3IoZyl9KSk7XG52YXIgYz1bXSxkPVtcIm9uRXhpdFwiLFwib25BYm9ydFwiLFwicHJpbnRcIixcInByaW50RXJyXCJdLGY7Zm9yKGYgb2YgZClBLmhhc093blByb3BlcnR5KGYpJiZjLnB1c2goZik7YS5wb3N0TWVzc2FnZSh7Y21kOlwibG9hZFwiLGhhbmRsZXJzOmMsdXJsT3JCbG9iOkEubWFpblNjcmlwdFVybE9yQmxvYnx8X3NjcmlwdERpcix3YXNtTWVtb3J5Om0sd2FzbU1vZHVsZTp4YX0pfSksTWI6ZnVuY3Rpb24oYSl7YSgpfSxGYjpmdW5jdGlvbigpe3ZhciBhPW9hKFwib3J0LXdhc20tdGhyZWFkZWQud29ya2VyLmpzXCIpO2E9bmV3IFdvcmtlcihhKTtQLnJiLnB1c2goYSl9LEhiOmZ1bmN0aW9uKCl7MD09UC5yYi5sZW5ndGgmJihQLkZiKCksUC5OYihQLnJiWzBdKSk7cmV0dXJuIFAucmIucG9wKCl9fTtBLlBUaHJlYWQ9UDt2YXIgZGI9YT0+e2Zvcig7MDxhLmxlbmd0aDspYS5zaGlmdCgpKEEpfTtcbkEuZXN0YWJsaXNoU3RhY2tTcGFjZT1mdW5jdGlvbigpe3ZhciBhPWJiKCksYj13KClbYSs1Mj4+Ml07YT13KClbYSs1Nj4+Ml07ZWIoYixiLWEpO2ZiKGIpfTtmdW5jdGlvbiBaYShhKXtpZihGKXJldHVybiBRKDIsMCxhKTskYShhKX12YXIgZ2I9W107QS5pbnZva2VFbnRyeVBvaW50PWZ1bmN0aW9uKGEsYil7dmFyIGM9Z2JbYV07Y3x8KGE+PWdiLmxlbmd0aCYmKGdiLmxlbmd0aD1hKzEpLGdiW2FdPWM9Q2EuZ2V0KGEpKTthPWMoYik7SGEoKT9QLkNiKGEpOmhiKGEpfTtmdW5jdGlvbiBpYihhKXt0aGlzLnRiPWEtMjQ7dGhpcy5PYj1mdW5jdGlvbihiKXt6KClbdGhpcy50Yis0Pj4yXT1ifTt0aGlzLnliPWZ1bmN0aW9uKGIpe3ooKVt0aGlzLnRiKzg+PjJdPWJ9O3RoaXMud2I9ZnVuY3Rpb24oYixjKXt0aGlzLnhiKCk7dGhpcy5PYihiKTt0aGlzLnliKGMpfTt0aGlzLnhiPWZ1bmN0aW9uKCl7eigpW3RoaXMudGIrMTY+PjJdPTB9fXZhciBqYj0wLGtiPTA7XG5mdW5jdGlvbiBsYihhLGIsYyxkKXtyZXR1cm4gRj9RKDMsMSxhLGIsYyxkKTptYihhLGIsYyxkKX1mdW5jdGlvbiBtYihhLGIsYyxkKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIpcmV0dXJuIEgoXCJDdXJyZW50IGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgU2hhcmVkQXJyYXlCdWZmZXIsIHB0aHJlYWRzIGFyZSBub3QgYXZhaWxhYmxlIVwiKSw2O3ZhciBmPVtdO2lmKEYmJjA9PT1mLmxlbmd0aClyZXR1cm4gbGIoYSxiLGMsZCk7YT17UmI6YyxuYjphLEdiOmQsWGI6Zn07cmV0dXJuIEY/KGEuWmI9XCJzcGF3blRocmVhZFwiLHBvc3RNZXNzYWdlKGEsZiksMCk6VWEoYSl9ZnVuY3Rpb24gbmIoYSxiLGMpe3JldHVybiBGP1EoNCwxLGEsYixjKTowfWZ1bmN0aW9uIG9iKGEsYil7aWYoRilyZXR1cm4gUSg1LDEsYSxiKX1cbnZhciBwYj1hPT57Zm9yKHZhciBiPTAsYz0wO2M8YS5sZW5ndGg7KytjKXt2YXIgZD1hLmNoYXJDb2RlQXQoYyk7MTI3Pj1kP2IrKzoyMDQ3Pj1kP2IrPTI6NTUyOTY8PWQmJjU3MzQzPj1kPyhiKz00LCsrYyk6Yis9M31yZXR1cm4gYn0scWI9KGEsYixjLGQpPT57aWYoISgwPGQpKXJldHVybiAwO3ZhciBmPWM7ZD1jK2QtMTtmb3IodmFyIGc9MDtnPGEubGVuZ3RoOysrZyl7dmFyIGs9YS5jaGFyQ29kZUF0KGcpO2lmKDU1Mjk2PD1rJiY1NzM0Mz49ayl7dmFyIGw9YS5jaGFyQ29kZUF0KCsrZyk7az02NTUzNisoKGsmMTAyMyk8PDEwKXxsJjEwMjN9aWYoMTI3Pj1rKXtpZihjPj1kKWJyZWFrO2JbYysrXT1rfWVsc2V7aWYoMjA0Nz49ayl7aWYoYysxPj1kKWJyZWFrO2JbYysrXT0xOTJ8az4+Nn1lbHNle2lmKDY1NTM1Pj1rKXtpZihjKzI+PWQpYnJlYWs7YltjKytdPTIyNHxrPj4xMn1lbHNle2lmKGMrMz49ZClicmVhaztiW2MrK109MjQwfGs+PjE4O2JbYysrXT0xMjh8az4+MTImNjN9YltjKytdPVxuMTI4fGs+PjYmNjN9YltjKytdPTEyOHxrJjYzfX1iW2NdPTA7cmV0dXJuIGMtZn0scmI9KGEsYixjKT0+cWIoYSx0KCksYixjKTtmdW5jdGlvbiBzYihhLGIpe2lmKEYpcmV0dXJuIFEoNiwxLGEsYil9ZnVuY3Rpb24gdGIoYSxiLGMpe2lmKEYpcmV0dXJuIFEoNywxLGEsYixjKX1mdW5jdGlvbiB1YihhLGIsYyl7cmV0dXJuIEY/USg4LDEsYSxiLGMpOjB9ZnVuY3Rpb24gdmIoYSxiKXtpZihGKXJldHVybiBRKDksMSxhLGIpfWZ1bmN0aW9uIHdiKGEsYixjKXtpZihGKXJldHVybiBRKDEwLDEsYSxiLGMpfWZ1bmN0aW9uIHhiKGEsYixjLGQpe2lmKEYpcmV0dXJuIFEoMTEsMSxhLGIsYyxkKX1mdW5jdGlvbiB5YihhLGIsYyxkKXtpZihGKXJldHVybiBRKDEyLDEsYSxiLGMsZCl9ZnVuY3Rpb24gemIoYSxiLGMsZCl7aWYoRilyZXR1cm4gUSgxMywxLGEsYixjLGQpfWZ1bmN0aW9uIEFiKGEpe2lmKEYpcmV0dXJuIFEoMTQsMSxhKX1cbmZ1bmN0aW9uIEJiKGEsYil7aWYoRilyZXR1cm4gUSgxNSwxLGEsYil9ZnVuY3Rpb24gQ2IoYSxiLGMpe2lmKEYpcmV0dXJuIFEoMTYsMSxhLGIsYyl9ZnVuY3Rpb24gRGIoYSl7aWYobnVsbD09PWEpcmV0dXJuXCJudWxsXCI7dmFyIGI9dHlwZW9mIGE7cmV0dXJuXCJvYmplY3RcIj09PWJ8fFwiYXJyYXlcIj09PWJ8fFwiZnVuY3Rpb25cIj09PWI/YS50b1N0cmluZygpOlwiXCIrYX12YXIgRWI9dm9pZCAwO2Z1bmN0aW9uIFMoYSl7Zm9yKHZhciBiPVwiXCI7dCgpW2FdOyliKz1FYlt0KClbYSsrXV07cmV0dXJuIGJ9dmFyIEZiPXt9LEdiPXt9LEhiPXt9LEliPXZvaWQgMDtmdW5jdGlvbiBUKGEpe3Rocm93IG5ldyBJYihhKTt9XG5mdW5jdGlvbiBKYihhLGIsYz17fSl7dmFyIGQ9Yi5uYW1lO2F8fFQoYHR5cGUgXCIke2R9XCIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcmApO2lmKEdiLmhhc093blByb3BlcnR5KGEpKXtpZihjLkliKXJldHVybjtUKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtkfScgdHdpY2VgKX1HYlthXT1iO2RlbGV0ZSBIYlthXTtGYi5oYXNPd25Qcm9wZXJ0eShhKSYmKGI9RmJbYV0sZGVsZXRlIEZiW2FdLGIuZm9yRWFjaChmPT5mKCkpKX1mdW5jdGlvbiBVKGEsYixjPXt9KXtpZighKFwiYXJnUGFja0FkdmFuY2VcImluIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlXCIpO0piKGEsYixjKX1cbmZ1bmN0aW9uIEtiKGEsYixjKXtzd2l0Y2goYil7Y2FzZSAwOnJldHVybiBjP2Z1bmN0aW9uKGQpe3JldHVybiBlKClbZF19OmZ1bmN0aW9uKGQpe3JldHVybiB0KClbZF19O2Nhc2UgMTpyZXR1cm4gYz9mdW5jdGlvbihkKXtyZXR1cm4gdigpW2Q+PjFdfTpmdW5jdGlvbihkKXtyZXR1cm4gY2EoKVtkPj4xXX07Y2FzZSAyOnJldHVybiBjP2Z1bmN0aW9uKGQpe3JldHVybiB3KClbZD4+Ml19OmZ1bmN0aW9uKGQpe3JldHVybiB6KClbZD4+Ml19O2Nhc2UgMzpyZXR1cm4gYz9mdW5jdGlvbihkKXtyZXR1cm4gTFtkPj4zXX06ZnVuY3Rpb24oZCl7cmV0dXJuIEFhW2Q+PjNdfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmtub3duIGludGVnZXIgdHlwZTogXCIrYSk7fX1cbmZ1bmN0aW9uIExiKGEpe3N3aXRjaChhKXtjYXNlIDE6cmV0dXJuIDA7Y2FzZSAyOnJldHVybiAxO2Nhc2UgNDpyZXR1cm4gMjtjYXNlIDg6cmV0dXJuIDM7ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmtub3duIHR5cGUgc2l6ZTogJHthfWApO319ZnVuY3Rpb24gTWIoKXt0aGlzLm1iPVt2b2lkIDBdO3RoaXMuQWI9W119dmFyIFY9bmV3IE1iO2Z1bmN0aW9uIE5iKGEpe2E+PVYudGImJjA9PT0tLVYuZ2V0KGEpLkJiJiZWLnliKGEpfXZhciBXPWE9PnthfHxUKFwiQ2Fubm90IHVzZSBkZWxldGVkIHZhbC4gaGFuZGxlID0gXCIrYSk7cmV0dXJuIFYuZ2V0KGEpLnZhbHVlfSxYPWE9Pntzd2l0Y2goYSl7Y2FzZSB2b2lkIDA6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UgITA6cmV0dXJuIDM7Y2FzZSAhMTpyZXR1cm4gNDtkZWZhdWx0OnJldHVybiBWLnhiKHtCYjoxLHZhbHVlOmF9KX19O1xuZnVuY3Rpb24gT2IoYSl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKHcoKVthPj4yXSl9ZnVuY3Rpb24gUGIoYSxiKXtzd2l0Y2goYil7Y2FzZSAyOnJldHVybiBmdW5jdGlvbihjKXt2YXIgZD10aGlzLmZyb21XaXJlVHlwZTttLmJ1ZmZlciE9bi5idWZmZXImJnAoKTtyZXR1cm4gZC5jYWxsKHRoaXMsemFbYz4+Ml0pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShoYSgpW2M+PjNdKX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5rbm93biBmbG9hdCB0eXBlOiBcIithKTt9fVxudmFyIFFiPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoXCJ1dGYtMTZsZVwiKTp2b2lkIDAsUmI9KGEsYik9Pnt2YXIgYz1hPj4xO2Zvcih2YXIgZD1jK2IvMjshKGM+PWQpJiZjYSgpW2NdOykrK2M7Yzw8PTE7aWYoMzI8Yy1hJiZRYilyZXR1cm4gUWIuZGVjb2RlKHQoKS5zbGljZShhLGMpKTtjPVwiXCI7Zm9yKGQ9MDshKGQ+PWIvMik7KytkKXt2YXIgZj12KClbYSsyKmQ+PjFdO2lmKDA9PWYpYnJlYWs7Yys9U3RyaW5nLmZyb21DaGFyQ29kZShmKX1yZXR1cm4gY30sU2I9KGEsYixjKT0+e3ZvaWQgMD09PWMmJihjPTIxNDc0ODM2NDcpO2lmKDI+YylyZXR1cm4gMDtjLT0yO3ZhciBkPWI7Yz1jPDIqYS5sZW5ndGg/Yy8yOmEubGVuZ3RoO2Zvcih2YXIgZj0wO2Y8YzsrK2Ype3ZhciBnPWEuY2hhckNvZGVBdChmKTt2KClbYj4+MV09ZztiKz0yfXYoKVtiPj4xXT0wO3JldHVybiBiLWR9LFRiPWE9PjIqYS5sZW5ndGgsVWI9KGEsYik9Pntmb3IodmFyIGM9XG4wLGQ9XCJcIjshKGM+PWIvNCk7KXt2YXIgZj13KClbYSs0KmM+PjJdO2lmKDA9PWYpYnJlYWs7KytjOzY1NTM2PD1mPyhmLT02NTUzNixkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGY+PjEwLDU2MzIwfGYmMTAyMykpOmQrPVN0cmluZy5mcm9tQ2hhckNvZGUoZil9cmV0dXJuIGR9LFZiPShhLGIsYyk9Pnt2b2lkIDA9PT1jJiYoYz0yMTQ3NDgzNjQ3KTtpZig0PmMpcmV0dXJuIDA7dmFyIGQ9YjtjPWQrYy00O2Zvcih2YXIgZj0wO2Y8YS5sZW5ndGg7KytmKXt2YXIgZz1hLmNoYXJDb2RlQXQoZik7aWYoNTUyOTY8PWcmJjU3MzQzPj1nKXt2YXIgaz1hLmNoYXJDb2RlQXQoKytmKTtnPTY1NTM2KygoZyYxMDIzKTw8MTApfGsmMTAyM313KClbYj4+Ml09ZztiKz00O2lmKGIrND5jKWJyZWFrfXcoKVtiPj4yXT0wO3JldHVybiBiLWR9LFdiPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTs1NTI5Njw9ZCYmNTczNDM+PWQmJisrYztcbmIrPTR9cmV0dXJuIGJ9LFhiPWE9PntpZigheWEpdHJ5e2lmKGEoKSwhSGEoKSl0cnl7Rj9oYihLKTokYShLKX1jYXRjaChiKXtiIGluc3RhbmNlb2YgUmF8fFwidW53aW5kXCI9PWJ8fEMoMSxiKX19Y2F0Y2goYil7YiBpbnN0YW5jZW9mIFJhfHxcInVud2luZFwiPT1ifHxDKDEsYil9fTtmdW5jdGlvbiBZYihhKXtcImZ1bmN0aW9uXCI9PT10eXBlb2YgQXRvbWljcy5ZYiYmKEF0b21pY3MuWWIodygpLGE+PjIsYSkudmFsdWUudGhlbihjYiksYSs9MTI4LEF0b21pY3Muc3RvcmUodygpLGE+PjIsMSkpfUEuX19lbXNjcmlwdGVuX3RocmVhZF9tYWlsYm94X2F3YWl0PVliO2Z1bmN0aW9uIGNiKCl7dmFyIGE9YmIoKTthJiYoWWIoYSksWGIoKCk9PlpiKCkpKX1BLmNoZWNrTWFpbGJveD1jYjtmdW5jdGlvbiAkYihhLGIpe3ZhciBjPUdiW2FdO2lmKHZvaWQgMD09PWMpe2E9YWMoYSk7dmFyIGQ9UyhhKTtZKGEpO1QoYitcIiBoYXMgdW5rbm93biB0eXBlIFwiK2QpfXJldHVybiBjfXZhciBiYz17fTtcbmZ1bmN0aW9uIGNjKGEpe3ZhciBiPWJjW2FdO3JldHVybiB2b2lkIDA9PT1iP1MoYSk6Yn12YXIgZGM9W107ZnVuY3Rpb24gZWMoKXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKX1mdW5jdGlvbiBmYyhhKXt2YXIgYj1kYy5sZW5ndGg7ZGMucHVzaChhKTtyZXR1cm4gYn1mdW5jdGlvbiBnYyhhLGIpe2Zvcih2YXIgYz1BcnJheShhKSxkPTA7ZDxhOysrZCljW2RdPSRiKHooKVtiKzQqZD4+Ml0sXCJwYXJhbWV0ZXIgXCIrZCk7cmV0dXJuIGN9ZnVuY3Rpb24gaGMoYSl7aWYodm9pZCAwPT09YSlyZXR1cm5cIl91bmtub3duXCI7YT1hLnJlcGxhY2UoL1teYS16QS1aMC05X10vZyxcIiRcIik7dmFyIGI9YS5jaGFyQ29kZUF0KDApO3JldHVybiA0ODw9YiYmNTc+PWI/YF8ke2F9YDphfXZhciBpYz1bXTtcbmZ1bmN0aW9uIGpjKGEsYil7YT1oYyhhKTtyZXR1cm57W2FdOmZ1bmN0aW9uKCl7cmV0dXJuIGIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1bYV19ZnVuY3Rpb24ga2MoYSl7dmFyIGI9RnVuY3Rpb247aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoYG5ld18gY2FsbGVkIHdpdGggY29uc3RydWN0b3IgdHlwZSAke3R5cGVvZiBifSB3aGljaCBpcyBub3QgYSBmdW5jdGlvbmApO3ZhciBjPWpjKGIubmFtZXx8XCJ1bmtub3duRnVuY3Rpb25OYW1lXCIsZnVuY3Rpb24oKXt9KTtjLnByb3RvdHlwZT1iLnByb3RvdHlwZTtjPW5ldyBjO2E9Yi5hcHBseShjLGEpO3JldHVybiBhIGluc3RhbmNlb2YgT2JqZWN0P2E6Y31cbmZ1bmN0aW9uIGxjKGEpe2Zvcih2YXIgYj1cIlwiLGM9MDtjPGE7KytjKWIrPSgwIT09Yz9cIiwgXCI6XCJcIikrXCJhcmdcIitjO3ZhciBkPVwicmV0dXJuIGZ1bmN0aW9uIGVtdmFsX2FsbG9jYXRvcl9cIithK1wiKGNvbnN0cnVjdG9yLCBhcmdUeXBlcywgYXJncykge1xcbiAgdmFyIEhFQVBVMzIgPSBnZXRNZW1vcnkoKTtcXG5cIjtmb3IoYz0wO2M8YTsrK2MpZCs9XCJ2YXIgYXJnVHlwZVwiK2MrXCIgPSByZXF1aXJlUmVnaXN0ZXJlZFR5cGUoSEVBUFUzMlsoKGFyZ1R5cGVzKT4+MildLCAncGFyYW1ldGVyIFwiK2MrXCInKTtcXG52YXIgYXJnXCIrYytcIiA9IGFyZ1R5cGVcIitjK1wiLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGFyZ3MpO1xcbmFyZ3MgKz0gYXJnVHlwZVwiK2MrXCJbJ2FyZ1BhY2tBZHZhbmNlJ107XFxuYXJnVHlwZXMgKz0gNDtcXG5cIjtyZXR1cm4obmV3IEZ1bmN0aW9uKFwicmVxdWlyZVJlZ2lzdGVyZWRUeXBlXCIsXCJNb2R1bGVcIixcInZhbHVlVG9IYW5kbGVcIixcImdldE1lbW9yeVwiLGQrKFwidmFyIG9iaiA9IG5ldyBjb25zdHJ1Y3RvcihcIitcbmIrXCIpO1xcbnJldHVybiB2YWx1ZVRvSGFuZGxlKG9iaik7XFxufVxcblwiKSkpKCRiLEEsWCwoKT0+eigpKX12YXIgbWM9e307ZnVuY3Rpb24gbmMoYSl7cmV0dXJuLTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSl9dmFyIFo9YT0+MD09PWElNCYmKDAhPT1hJTEwMHx8MD09PWElNDAwKSxvYz1bMCwzMSw2MCw5MSwxMjEsMTUyLDE4MiwyMTMsMjQ0LDI3NCwzMDUsMzM1XSxwYz1bMCwzMSw1OSw5MCwxMjAsMTUxLDE4MSwyMTIsMjQzLDI3MywzMDQsMzM0XTtmdW5jdGlvbiByYyhhLGIsYyxkLGYsZyxrKXtyZXR1cm4gRj9RKDE3LDEsYSxiLGMsZCxmLGcsayk6LTUyfWZ1bmN0aW9uIHNjKGEsYixjLGQsZixnKXtpZihGKXJldHVybiBRKDE4LDEsYSxiLGMsZCxmLGcpfXZhciB1Yz1hPT57dmFyIGI9cGIoYSkrMSxjPXRjKGIpO2MmJnJiKGEsYyxiKTtyZXR1cm4gY30sd2M9YT0+e3ZhciBiPXZjKCk7YT1hKCk7ZmIoYik7cmV0dXJuIGF9O1xuZnVuY3Rpb24gUShhLGIpe3ZhciBjPWFyZ3VtZW50cy5sZW5ndGgtMixkPWFyZ3VtZW50cztyZXR1cm4gd2MoKCk9Pntmb3IodmFyIGY9MipjLGc9eGMoOCpmKSxrPWc+PjMsbD0wO2w8YztsKyspe3ZhciBxPWRbMitsXTtcImJpZ2ludFwiPT10eXBlb2YgcT8oTFtrKzIqbF09MW4sTFtrKzIqbCsxXT1xKTooTFtrKzIqbF09MG4saGEoKVtrKzIqbCsxXT1xKX1yZXR1cm4geWMoYSxmLGcsYil9KX1cbnZhciB6Yz1bXSxBYz17fSxDYz0oKT0+e2lmKCFCYyl7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFwiX1wiKStcIi5VVEYtOFwiLF86bWF8fFwiLi90aGlzLnByb2dyYW1cIn0sYjtmb3IoYiBpbiBBYyl2b2lkIDA9PT1BY1tiXT9kZWxldGUgYVtiXTphW2JdPUFjW2JdO3ZhciBjPVtdO2ZvcihiIGluIGEpYy5wdXNoKGAke2J9PSR7YVtiXX1gKTtCYz1jfXJldHVybiBCY30sQmM7XG5mdW5jdGlvbiBEYyhhLGIpe2lmKEYpcmV0dXJuIFEoMTksMSxhLGIpO3ZhciBjPTA7Q2MoKS5mb3JFYWNoKGZ1bmN0aW9uKGQsZil7dmFyIGc9YitjO2Y9eigpW2ErNCpmPj4yXT1nO2ZvcihnPTA7ZzxkLmxlbmd0aDsrK2cpZSgpW2YrKz4+MF09ZC5jaGFyQ29kZUF0KGcpO2UoKVtmPj4wXT0wO2MrPWQubGVuZ3RoKzF9KTtyZXR1cm4gMH1mdW5jdGlvbiBFYyhhLGIpe2lmKEYpcmV0dXJuIFEoMjAsMSxhLGIpO3ZhciBjPUNjKCk7eigpW2E+PjJdPWMubGVuZ3RoO3ZhciBkPTA7Yy5mb3JFYWNoKGZ1bmN0aW9uKGYpe2QrPWYubGVuZ3RoKzF9KTt6KClbYj4+Ml09ZDtyZXR1cm4gMH1mdW5jdGlvbiBGYyhhKXtyZXR1cm4gRj9RKDIxLDEsYSk6NTJ9ZnVuY3Rpb24gR2MoYSxiLGMsZCl7cmV0dXJuIEY/USgyMiwxLGEsYixjLGQpOjUyfWZ1bmN0aW9uIEhjKGEsYixjLGQpe3JldHVybiBGP1EoMjMsMSxhLGIsYyxkKTo3MH12YXIgSWM9W251bGwsW10sW11dO1xuZnVuY3Rpb24gSmMoYSxiLGMsZCl7aWYoRilyZXR1cm4gUSgyNCwxLGEsYixjLGQpO2Zvcih2YXIgZj0wLGc9MDtnPGM7ZysrKXt2YXIgaz16KClbYj4+Ml0sbD16KClbYis0Pj4yXTtiKz04O2Zvcih2YXIgcT0wO3E8bDtxKyspe3ZhciByPXQoKVtrK3FdLHg9SWNbYV07MD09PXJ8fDEwPT09cj8oKDE9PT1hP3ZhOkgpKFdhKHgsMCkpLHgubGVuZ3RoPTApOngucHVzaChyKX1mKz1sfXooKVtkPj4yXT1mO3JldHVybiAwfXZhciBLYz1bMzEsMjksMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdLExjPVszMSwyOCwzMSwzMCwzMSwzMCwzMSwzMSwzMCwzMSwzMCwzMV07ZnVuY3Rpb24gTWMoYSl7dmFyIGI9QXJyYXkocGIoYSkrMSk7cWIoYSxiLDAsYi5sZW5ndGgpO3JldHVybiBifVxudmFyIE5jPShhLGIpPT57ZSgpLnNldChhLGIpfSxPYz0oYSxiLGMsZCk9PntmdW5jdGlvbiBmKGgsdSx5KXtmb3IoaD1cIm51bWJlclwiPT10eXBlb2YgaD9oLnRvU3RyaW5nKCk6aHx8XCJcIjtoLmxlbmd0aDx1OyloPXlbMF0raDtyZXR1cm4gaH1mdW5jdGlvbiBnKGgsdSl7cmV0dXJuIGYoaCx1LFwiMFwiKX1mdW5jdGlvbiBrKGgsdSl7ZnVuY3Rpb24geShxYyl7cmV0dXJuIDA+cWM/LTE6MDxxYz8xOjB9dmFyIFI7MD09PShSPXkoaC5nZXRGdWxsWWVhcigpLXUuZ2V0RnVsbFllYXIoKSkpJiYwPT09KFI9eShoLmdldE1vbnRoKCktdS5nZXRNb250aCgpKSkmJihSPXkoaC5nZXREYXRlKCktdS5nZXREYXRlKCkpKTtyZXR1cm4gUn1mdW5jdGlvbiBsKGgpe3N3aXRjaChoLmdldERheSgpKXtjYXNlIDA6cmV0dXJuIG5ldyBEYXRlKGguZ2V0RnVsbFllYXIoKS0xLDExLDI5KTtjYXNlIDE6cmV0dXJuIGg7Y2FzZSAyOnJldHVybiBuZXcgRGF0ZShoLmdldEZ1bGxZZWFyKCksMCwzKTtjYXNlIDM6cmV0dXJuIG5ldyBEYXRlKGguZ2V0RnVsbFllYXIoKSxcbjAsMik7Y2FzZSA0OnJldHVybiBuZXcgRGF0ZShoLmdldEZ1bGxZZWFyKCksMCwxKTtjYXNlIDU6cmV0dXJuIG5ldyBEYXRlKGguZ2V0RnVsbFllYXIoKS0xLDExLDMxKTtjYXNlIDY6cmV0dXJuIG5ldyBEYXRlKGguZ2V0RnVsbFllYXIoKS0xLDExLDMwKX19ZnVuY3Rpb24gcShoKXt2YXIgdT1oLnBiO2ZvcihoPW5ldyBEYXRlKChuZXcgRGF0ZShoLnFiKzE5MDAsMCwxKSkuZ2V0VGltZSgpKTswPHU7KXt2YXIgeT1oLmdldE1vbnRoKCksUj0oWihoLmdldEZ1bGxZZWFyKCkpP0tjOkxjKVt5XTtpZih1PlItaC5nZXREYXRlKCkpdS09Ui1oLmdldERhdGUoKSsxLGguc2V0RGF0ZSgxKSwxMT55P2guc2V0TW9udGgoeSsxKTooaC5zZXRNb250aCgwKSxoLnNldEZ1bGxZZWFyKGguZ2V0RnVsbFllYXIoKSsxKSk7ZWxzZXtoLnNldERhdGUoaC5nZXREYXRlKCkrdSk7YnJlYWt9fXk9bmV3IERhdGUoaC5nZXRGdWxsWWVhcigpKzEsMCw0KTt1PWwobmV3IERhdGUoaC5nZXRGdWxsWWVhcigpLFxuMCw0KSk7eT1sKHkpO3JldHVybiAwPj1rKHUsaCk/MD49ayh5LGgpP2guZ2V0RnVsbFllYXIoKSsxOmguZ2V0RnVsbFllYXIoKTpoLmdldEZ1bGxZZWFyKCktMX12YXIgcj13KClbZCs0MD4+Ml07ZD17VmI6dygpW2Q+PjJdLFViOncoKVtkKzQ+PjJdLHViOncoKVtkKzg+PjJdLHpiOncoKVtkKzEyPj4yXSx2Yjp3KClbZCsxNj4+Ml0scWI6dygpW2QrMjA+PjJdLGxiOncoKVtkKzI0Pj4yXSxwYjp3KClbZCsyOD4+Ml0sY2M6dygpW2QrMzI+PjJdLFRiOncoKVtkKzM2Pj4yXSxXYjpyP1hhKHIpOlwiXCJ9O2M9WGEoYyk7cj17XCIlY1wiOlwiJWEgJWIgJWQgJUg6JU06JVMgJVlcIixcIiVEXCI6XCIlbS8lZC8leVwiLFwiJUZcIjpcIiVZLSVtLSVkXCIsXCIlaFwiOlwiJWJcIixcIiVyXCI6XCIlSTolTTolUyAlcFwiLFwiJVJcIjpcIiVIOiVNXCIsXCIlVFwiOlwiJUg6JU06JVNcIixcIiV4XCI6XCIlbS8lZC8leVwiLFwiJVhcIjpcIiVIOiVNOiVTXCIsXCIlRWNcIjpcIiVjXCIsXCIlRUNcIjpcIiVDXCIsXCIlRXhcIjpcIiVtLyVkLyV5XCIsXCIlRVhcIjpcIiVIOiVNOiVTXCIsXG5cIiVFeVwiOlwiJXlcIixcIiVFWVwiOlwiJVlcIixcIiVPZFwiOlwiJWRcIixcIiVPZVwiOlwiJWVcIixcIiVPSFwiOlwiJUhcIixcIiVPSVwiOlwiJUlcIixcIiVPbVwiOlwiJW1cIixcIiVPTVwiOlwiJU1cIixcIiVPU1wiOlwiJVNcIixcIiVPdVwiOlwiJXVcIixcIiVPVVwiOlwiJVVcIixcIiVPVlwiOlwiJVZcIixcIiVPd1wiOlwiJXdcIixcIiVPV1wiOlwiJVdcIixcIiVPeVwiOlwiJXlcIn07Zm9yKHZhciB4IGluIHIpYz1jLnJlcGxhY2UobmV3IFJlZ0V4cCh4LFwiZ1wiKSxyW3hdKTt2YXIgQj1cIlN1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5XCIuc3BsaXQoXCIgXCIpLE49XCJKYW51YXJ5IEZlYnJ1YXJ5IE1hcmNoIEFwcmlsIE1heSBKdW5lIEp1bHkgQXVndXN0IFNlcHRlbWJlciBPY3RvYmVyIE5vdmVtYmVyIERlY2VtYmVyXCIuc3BsaXQoXCIgXCIpO3I9e1wiJWFcIjpoPT5CW2gubGJdLnN1YnN0cmluZygwLDMpLFwiJUFcIjpoPT5CW2gubGJdLFwiJWJcIjpoPT5OW2gudmJdLnN1YnN0cmluZygwLDMpLFwiJUJcIjpoPT5OW2gudmJdLFwiJUNcIjpoPT5nKChoLnFiK1xuMTkwMCkvMTAwfDAsMiksXCIlZFwiOmg9PmcoaC56YiwyKSxcIiVlXCI6aD0+ZihoLnpiLDIsXCIgXCIpLFwiJWdcIjpoPT5xKGgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJUdcIjpoPT5xKGgpLFwiJUhcIjpoPT5nKGgudWIsMiksXCIlSVwiOmg9PntoPWgudWI7MD09aD9oPTEyOjEyPGgmJihoLT0xMik7cmV0dXJuIGcoaCwyKX0sXCIlalwiOmg9Pntmb3IodmFyIHU9MCx5PTA7eTw9aC52Yi0xO3UrPShaKGgucWIrMTkwMCk/S2M6TGMpW3krK10pO3JldHVybiBnKGguemIrdSwzKX0sXCIlbVwiOmg9PmcoaC52YisxLDIpLFwiJU1cIjpoPT5nKGguVWIsMiksXCIlblwiOigpPT5cIlxcblwiLFwiJXBcIjpoPT4wPD1oLnViJiYxMj5oLnViP1wiQU1cIjpcIlBNXCIsXCIlU1wiOmg9PmcoaC5WYiwyKSxcIiV0XCI6KCk9PlwiXFx0XCIsXCIldVwiOmg9PmgubGJ8fDcsXCIlVVwiOmg9PmcoTWF0aC5mbG9vcigoaC5wYis3LWgubGIpLzcpLDIpLFwiJVZcIjpoPT57dmFyIHU9TWF0aC5mbG9vcigoaC5wYis3LShoLmxiKzYpJTcpLzcpOzI+PShoLmxiKzM3MS1cbmgucGItMiklNyYmdSsrO2lmKHUpNTM9PXUmJih5PShoLmxiKzM3MS1oLnBiKSU3LDQ9PXl8fDM9PXkmJlooaC5xYil8fCh1PTEpKTtlbHNle3U9NTI7dmFyIHk9KGgubGIrNy1oLnBiLTEpJTc7KDQ9PXl8fDU9PXkmJlooaC5xYiU0MDAtMSkpJiZ1Kyt9cmV0dXJuIGcodSwyKX0sXCIld1wiOmg9PmgubGIsXCIlV1wiOmg9PmcoTWF0aC5mbG9vcigoaC5wYis3LShoLmxiKzYpJTcpLzcpLDIpLFwiJXlcIjpoPT4oaC5xYisxOTAwKS50b1N0cmluZygpLnN1YnN0cmluZygyKSxcIiVZXCI6aD0+aC5xYisxOTAwLFwiJXpcIjpoPT57aD1oLlRiO3ZhciB1PTA8PWg7aD1NYXRoLmFicyhoKS82MDtyZXR1cm4odT9cIitcIjpcIi1cIikrU3RyaW5nKFwiMDAwMFwiKyhoLzYwKjEwMCtoJTYwKSkuc2xpY2UoLTQpfSxcIiVaXCI6aD0+aC5XYixcIiUlXCI6KCk9PlwiJVwifTtjPWMucmVwbGFjZSgvJSUvZyxcIlxceDAwXFx4MDBcIik7Zm9yKHggaW4gciljLmluY2x1ZGVzKHgpJiYoYz1jLnJlcGxhY2UobmV3IFJlZ0V4cCh4LFwiZ1wiKSxyW3hdKGQpKSk7XG5jPWMucmVwbGFjZSgvXFwwXFwwL2csXCIlXCIpO3g9TWMoYyk7aWYoeC5sZW5ndGg+YilyZXR1cm4gMDtOYyh4LGEpO3JldHVybiB4Lmxlbmd0aC0xfTtQLndiKCk7Zm9yKHZhciBQYz1BcnJheSgyNTYpLFFjPTA7MjU2PlFjOysrUWMpUGNbUWNdPVN0cmluZy5mcm9tQ2hhckNvZGUoUWMpO0ViPVBjO0liPUEuQmluZGluZ0Vycm9yPWNsYXNzIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoYSl7c3VwZXIoYSk7dGhpcy5uYW1lPVwiQmluZGluZ0Vycm9yXCJ9fTtBLkludGVybmFsRXJyb3I9Y2xhc3MgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihhKXtzdXBlcihhKTt0aGlzLm5hbWU9XCJJbnRlcm5hbEVycm9yXCJ9fTtcbk9iamVjdC5hc3NpZ24oTWIucHJvdG90eXBlLHtnZXQoYSl7cmV0dXJuIHRoaXMubWJbYV19LGhhcyhhKXtyZXR1cm4gdm9pZCAwIT09dGhpcy5tYlthXX0seGIoYSl7dmFyIGI9dGhpcy5BYi5wb3AoKXx8dGhpcy5tYi5sZW5ndGg7dGhpcy5tYltiXT1hO3JldHVybiBifSx5YihhKXt0aGlzLm1iW2FdPXZvaWQgMDt0aGlzLkFiLnB1c2goYSl9fSk7Vi5tYi5wdXNoKHt2YWx1ZTp2b2lkIDB9LHt2YWx1ZTpudWxsfSx7dmFsdWU6ITB9LHt2YWx1ZTohMX0pO1YudGI9Vi5tYi5sZW5ndGg7QS5jb3VudF9lbXZhbF9oYW5kbGVzPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPTAsYj1WLnRiO2I8Vi5tYi5sZW5ndGg7KytiKXZvaWQgMCE9PVYubWJbYl0mJisrYTtyZXR1cm4gYX07XG52YXIgUmM9W251bGwsWWEsWmEsbGIsbmIsb2Isc2IsdGIsdWIsdmIsd2IseGIseWIsemIsQWIsQmIsQ2IscmMsc2MsRGMsRWMsRmMsR2MsSGMsSmNdLFRjPXtiOmZ1bmN0aW9uKGEsYixjKXsobmV3IGliKGEpKS53YihiLGMpO2piPWE7a2IrKzt0aHJvdyBqYjt9LGZhOmZ1bmN0aW9uKGEpe1NjKGEsIUQsMSwhbmEsMTMxMDcyLCExKTtQLkRiKCl9LEQ6ZnVuY3Rpb24oYSl7Rj9wb3N0TWVzc2FnZSh7Y21kOlwiY2xlYW51cFRocmVhZFwiLHRocmVhZDphfSk6VGEoYSl9LFc6bWIseTpuYixsYTpvYixTOnNiLFU6dGIsTDp1YixqYTp2YixhYTp3YixpYTp4YixGOnliLFQ6emIsUTpBYixrYTpCYixSOkNiLEk6ZnVuY3Rpb24oYSxiLGMsZCxmKXtiPVMoYik7Yz1MYihjKTt2YXIgZz0tMSE9Yi5pbmRleE9mKFwidVwiKTtnJiYoZj0oMW48PDY0biktMW4pO1UoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpmdW5jdGlvbihrKXtyZXR1cm4ga30sdG9XaXJlVHlwZTpmdW5jdGlvbihrLGwpe2lmKFwiYmlnaW50XCIhPVxudHlwZW9mIGwmJlwibnVtYmVyXCIhPXR5cGVvZiBsKXRocm93IG5ldyBUeXBlRXJyb3IoYENhbm5vdCBjb252ZXJ0IFwiJHtEYihsKX1cIiB0byAke3RoaXMubmFtZX1gKTtpZihsPGR8fGw+Zil0aHJvdyBuZXcgVHlwZUVycm9yKGBQYXNzaW5nIGEgbnVtYmVyIFwiJHtEYihsKX1cIiBmcm9tIEpTIHNpZGUgdG8gQy9DKysgc2lkZSB0byBhbiBhcmd1bWVudCBvZiB0eXBlIFwiJHtifVwiLCB3aGljaCBpcyBvdXRzaWRlIHRoZSB2YWxpZCByYW5nZSBbJHtkfSwgJHtmfV0hYCk7cmV0dXJuIGx9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6S2IoYixjLCFnKSxzYjpudWxsfSl9LHJhOmZ1bmN0aW9uKGEsYixjLGQsZil7dmFyIGc9TGIoYyk7Yj1TKGIpO1UoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpmdW5jdGlvbihrKXtyZXR1cm4hIWt9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oayxsKXtyZXR1cm4gbD9kOmZ9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6ZnVuY3Rpb24oayl7aWYoMT09PVxuYyl2YXIgbD1lKCk7ZWxzZSBpZigyPT09YylsPXYoKTtlbHNlIGlmKDQ9PT1jKWw9dygpO2Vsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gYm9vbGVhbiB0eXBlIHNpemU6IFwiK2IpO3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShsW2s+PmddKX0sc2I6bnVsbH0pfSxxYTpmdW5jdGlvbihhLGIpe2I9UyhiKTtVKGEse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oYyl7dmFyIGQ9VyhjKTtOYihjKTtyZXR1cm4gZH0sdG9XaXJlVHlwZTpmdW5jdGlvbihjLGQpe3JldHVybiBYKGQpfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOk9iLHNiOm51bGx9KX0sSDpmdW5jdGlvbihhLGIsYyl7Yz1MYihjKTtiPVMoYik7VShhLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmZ1bmN0aW9uKGQpe3JldHVybiBkfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGQsZil7cmV0dXJuIGZ9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6UGIoYixjKSxzYjpudWxsfSl9LFxudDpmdW5jdGlvbihhLGIsYyxkLGYpe2I9UyhiKTstMT09PWYmJihmPTQyOTQ5NjcyOTUpO2Y9TGIoYyk7dmFyIGc9bD0+bDtpZigwPT09ZCl7dmFyIGs9MzItOCpjO2c9bD0+bDw8az4+Pmt9Yz1iLmluY2x1ZGVzKFwidW5zaWduZWRcIik/ZnVuY3Rpb24obCxxKXtyZXR1cm4gcT4+PjB9OmZ1bmN0aW9uKGwscSl7cmV0dXJuIHF9O1UoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpnLHRvV2lyZVR5cGU6YyxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOktiKGIsZiwwIT09ZCksc2I6bnVsbH0pfSxtOmZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGcpe2c+Pj0yO3ZhciBrPXooKTtyZXR1cm4gbmV3IGYoay5idWZmZXIsa1tnKzFdLGtbZ10pfXZhciBmPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheSxCaWdJbnQ2NEFycmF5LEJpZ1VpbnQ2NEFycmF5XVtiXTtcbmM9UyhjKTtVKGEse25hbWU6Yyxmcm9tV2lyZVR5cGU6ZCxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmR9LHtJYjohMH0pfSxKOmZ1bmN0aW9uKGEsYil7Yj1TKGIpO3ZhciBjPVwic3RkOjpzdHJpbmdcIj09PWI7VShhLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmZ1bmN0aW9uKGQpe3ZhciBmPXooKVtkPj4yXSxnPWQrNDtpZihjKWZvcih2YXIgaz1nLGw9MDtsPD1mOysrbCl7dmFyIHE9ZytsO2lmKGw9PWZ8fDA9PXQoKVtxXSl7az1YYShrLHEtayk7aWYodm9pZCAwPT09cil2YXIgcj1rO2Vsc2Ugcis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxyKz1rO2s9cSsxfX1lbHNle3I9QXJyYXkoZik7Zm9yKGw9MDtsPGY7KytsKXJbbF09U3RyaW5nLmZyb21DaGFyQ29kZSh0KClbZytsXSk7cj1yLmpvaW4oXCJcIil9WShkKTtyZXR1cm4gcn0sdG9XaXJlVHlwZTpmdW5jdGlvbihkLGYpe2YgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciYmKGY9bmV3IFVpbnQ4QXJyYXkoZikpO3ZhciBnPVxuXCJzdHJpbmdcIj09dHlwZW9mIGY7Z3x8ZiBpbnN0YW5jZW9mIFVpbnQ4QXJyYXl8fGYgaW5zdGFuY2VvZiBVaW50OENsYW1wZWRBcnJheXx8ZiBpbnN0YW5jZW9mIEludDhBcnJheXx8VChcIkNhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gc3RkOjpzdHJpbmdcIik7dmFyIGs9YyYmZz9wYihmKTpmLmxlbmd0aDt2YXIgbD10Yyg0K2srMSkscT1sKzQ7eigpW2w+PjJdPWs7aWYoYyYmZylyYihmLHEsaysxKTtlbHNlIGlmKGcpZm9yKGc9MDtnPGs7KytnKXt2YXIgcj1mLmNoYXJDb2RlQXQoZyk7MjU1PHImJihZKHEpLFQoXCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHNcIikpO3QoKVtxK2ddPXJ9ZWxzZSBmb3IoZz0wO2c8azsrK2cpdCgpW3ErZ109ZltnXTtudWxsIT09ZCYmZC5wdXNoKFksbCk7cmV0dXJuIGx9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6T2Isc2I6ZnVuY3Rpb24oZCl7WShkKX19KX0sQTpmdW5jdGlvbihhLFxuYixjKXtjPVMoYyk7aWYoMj09PWIpe3ZhciBkPVJiO3ZhciBmPVNiO3ZhciBnPVRiO3ZhciBrPSgpPT5jYSgpO3ZhciBsPTF9ZWxzZSA0PT09YiYmKGQ9VWIsZj1WYixnPVdiLGs9KCk9PnooKSxsPTIpO1UoYSx7bmFtZTpjLGZyb21XaXJlVHlwZTpmdW5jdGlvbihxKXtmb3IodmFyIHI9eigpW3E+PjJdLHg9aygpLEIsTj1xKzQsaD0wO2g8PXI7KytoKXt2YXIgdT1xKzQraCpiO2lmKGg9PXJ8fDA9PXhbdT4+bF0pTj1kKE4sdS1OKSx2b2lkIDA9PT1CP0I9TjooQis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxCKz1OKSxOPXUrYn1ZKHEpO3JldHVybiBCfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKHEscil7XCJzdHJpbmdcIiE9dHlwZW9mIHImJlQoYENhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICR7Y31gKTt2YXIgeD1nKHIpLEI9dGMoNCt4K2IpO3ooKVtCPj4yXT14Pj5sO2YocixCKzQseCtiKTtudWxsIT09cSYmcS5wdXNoKFksQik7cmV0dXJuIEJ9LGFyZ1BhY2tBZHZhbmNlOjgsXG5yZWFkVmFsdWVGcm9tUG9pbnRlcjpPYixzYjpmdW5jdGlvbihxKXtZKHEpfX0pfSxzYTpmdW5jdGlvbihhLGIpe2I9UyhiKTtVKGEse0xiOiEwLG5hbWU6YixhcmdQYWNrQWR2YW5jZTowLGZyb21XaXJlVHlwZTpmdW5jdGlvbigpe30sdG9XaXJlVHlwZTpmdW5jdGlvbigpe319KX0sb2E6KCk9PiEwLE86ZnVuY3Rpb24oYSxiKXthPT1iP3NldFRpbWVvdXQoKCk9PmNiKCkpOkY/cG9zdE1lc3NhZ2Uoe3RhcmdldFRocmVhZDphLGNtZDpcImNoZWNrTWFpbGJveFwifSk6KGE9UC5rYlthXSkmJmEucG9zdE1lc3NhZ2Uoe2NtZDpcImNoZWNrTWFpbGJveFwifSl9LGRhOmZ1bmN0aW9uKCl7cmV0dXJuLTF9LGVhOlliLG5hOmZ1bmN0aW9uKGEpe0UmJlAua2JbYV0ucmVmKCl9LHM6ZnVuY3Rpb24oYSxiLGMpe2E9VyhhKTtiPSRiKGIsXCJlbXZhbDo6YXNcIik7dmFyIGQ9W10sZj1YKGQpO3ooKVtjPj4yXT1mO3JldHVybiBiLnRvV2lyZVR5cGUoZCxhKX0saTpmdW5jdGlvbihhLGIsYyxkLGYpe2E9ZGNbYV07XG5iPVcoYik7Yz1jYyhjKTt2YXIgZz1bXTt6KClbZD4+Ml09WChnKTtyZXR1cm4gYShiLGMsZyxmKX0sdTpmdW5jdGlvbihhLGIsYyxkKXthPWRjW2FdO2I9VyhiKTtjPWNjKGMpO2EoYixjLG51bGwsZCl9LGM6TmIsSzpmdW5jdGlvbihhLGIpe2E9VyhhKTtiPVcoYik7cmV0dXJuIGE9PWJ9LG86ZnVuY3Rpb24oYSl7aWYoMD09PWEpcmV0dXJuIFgoZWMoKSk7YT1jYyhhKTtyZXR1cm4gWChlYygpW2FdKX0saDpmdW5jdGlvbihhLGIpe3ZhciBjPWdjKGEsYiksZD1jWzBdO2I9ZC5uYW1lK1wiXyRcIitjLnNsaWNlKDEpLm1hcChmdW5jdGlvbih4KXtyZXR1cm4geC5uYW1lfSkuam9pbihcIl9cIikrXCIkXCI7dmFyIGY9aWNbYl07aWYodm9pZCAwIT09ZilyZXR1cm4gZjtmPVtcInJldFR5cGVcIl07Zm9yKHZhciBnPVtkXSxrPVwiXCIsbD0wO2w8YS0xOysrbClrKz0oMCE9PWw/XCIsIFwiOlwiXCIpK1wiYXJnXCIrbCxmLnB1c2goXCJhcmdUeXBlXCIrbCksZy5wdXNoKGNbMStsXSk7dmFyIHE9XCJyZXR1cm4gZnVuY3Rpb24gXCIrXG5oYyhcIm1ldGhvZENhbGxlcl9cIitiKStcIihoYW5kbGUsIG5hbWUsIGRlc3RydWN0b3JzLCBhcmdzKSB7XFxuXCIscj0wO2ZvcihsPTA7bDxhLTE7KytsKXErPVwiICAgIHZhciBhcmdcIitsK1wiID0gYXJnVHlwZVwiK2wrXCIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJnc1wiKyhyP1wiK1wiK3I6XCJcIikrXCIpO1xcblwiLHIrPWNbbCsxXS5hcmdQYWNrQWR2YW5jZTtxKz1cIiAgICB2YXIgcnYgPSBoYW5kbGVbbmFtZV0oXCIraytcIik7XFxuXCI7Zm9yKGw9MDtsPGEtMTsrK2wpY1tsKzFdLmRlbGV0ZU9iamVjdCYmKHErPVwiICAgIGFyZ1R5cGVcIitsK1wiLmRlbGV0ZU9iamVjdChhcmdcIitsK1wiKTtcXG5cIik7ZC5MYnx8KHErPVwiICAgIHJldHVybiByZXRUeXBlLnRvV2lyZVR5cGUoZGVzdHJ1Y3RvcnMsIHJ2KTtcXG5cIik7Zi5wdXNoKHErXCJ9O1xcblwiKTthPWtjKGYpLmFwcGx5KG51bGwsZyk7Zj1mYyhhKTtyZXR1cm4gaWNbYl09Zn0scjpmdW5jdGlvbihhLGIpe2E9VyhhKTtiPVcoYik7cmV0dXJuIFgoYVtiXSl9LGQ6ZnVuY3Rpb24oYSl7NDxcbmEmJihWLmdldChhKS5CYis9MSl9LHg6ZnVuY3Rpb24oYSxiLGMsZCl7YT1XKGEpO3ZhciBmPW1jW2JdO2Z8fChmPWxjKGIpLG1jW2JdPWYpO3JldHVybiBmKGEsYyxkKX0sdjpmdW5jdGlvbigpe3JldHVybiBYKFtdKX0sbDpmdW5jdGlvbihhKXthPVcoYSk7Zm9yKHZhciBiPUFycmF5KGEubGVuZ3RoKSxjPTA7YzxhLmxlbmd0aDtjKyspYltjXT1hW2NdO3JldHVybiBYKGIpfSxlOmZ1bmN0aW9uKGEpe3JldHVybiBYKGNjKGEpKX0sazpmdW5jdGlvbigpe3JldHVybiBYKHt9KX0sZzpmdW5jdGlvbihhKXtmb3IodmFyIGI9VyhhKTtiLmxlbmd0aDspe3ZhciBjPWIucG9wKCk7Yi5wb3AoKShjKX1OYihhKX0sajpmdW5jdGlvbihhLGIsYyl7YT1XKGEpO2I9VyhiKTtjPVcoYyk7YVtiXT1jfSxmOmZ1bmN0aW9uKGEsYil7YT0kYihhLFwiX2VtdmFsX3Rha2VfdmFsdWVcIik7YT1hLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGIpO3JldHVybiBYKGEpfSxaOmZ1bmN0aW9uKGEsYil7YT1uYyhhKTtiPVxubmMoYik7YT1uZXcgRGF0ZSgxRTMqYSk7dygpW2I+PjJdPWEuZ2V0VVRDU2Vjb25kcygpO3coKVtiKzQ+PjJdPWEuZ2V0VVRDTWludXRlcygpO3coKVtiKzg+PjJdPWEuZ2V0VVRDSG91cnMoKTt3KClbYisxMj4+Ml09YS5nZXRVVENEYXRlKCk7dygpW2IrMTY+PjJdPWEuZ2V0VVRDTW9udGgoKTt3KClbYisyMD4+Ml09YS5nZXRVVENGdWxsWWVhcigpLTE5MDA7dygpW2IrMjQ+PjJdPWEuZ2V0VVRDRGF5KCk7YT0oYS5nZXRUaW1lKCktRGF0ZS5VVEMoYS5nZXRVVENGdWxsWWVhcigpLDAsMSwwLDAsMCwwKSkvODY0RTV8MDt3KClbYisyOD4+Ml09YX0sXzpmdW5jdGlvbihhLGIpe2E9bmMoYSk7Yj1uYyhiKTthPW5ldyBEYXRlKDFFMyphKTt3KClbYj4+Ml09YS5nZXRTZWNvbmRzKCk7dygpW2IrND4+Ml09YS5nZXRNaW51dGVzKCk7dygpW2IrOD4+Ml09YS5nZXRIb3VycygpO3coKVtiKzEyPj4yXT1hLmdldERhdGUoKTt3KClbYisxNj4+Ml09YS5nZXRNb250aCgpO3coKVtiKzIwPj4yXT1cbmEuZ2V0RnVsbFllYXIoKS0xOTAwO3coKVtiKzI0Pj4yXT1hLmdldERheSgpO3ZhciBjPShaKGEuZ2V0RnVsbFllYXIoKSk/b2M6cGMpW2EuZ2V0TW9udGgoKV0rYS5nZXREYXRlKCktMXwwO3coKVtiKzI4Pj4yXT1jO3coKVtiKzM2Pj4yXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7Yz0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGQ9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO2E9KGMhPWQmJmEuZ2V0VGltZXpvbmVPZmZzZXQoKT09TWF0aC5taW4oZCxjKSl8MDt3KClbYiszMj4+Ml09YX0sJDpmdW5jdGlvbihhKXthPW5jKGEpO3ZhciBiPW5ldyBEYXRlKHcoKVthKzIwPj4yXSsxOTAwLHcoKVthKzE2Pj4yXSx3KClbYSsxMj4+Ml0sdygpW2ErOD4+Ml0sdygpW2ErND4+Ml0sdygpW2E+PjJdLDApLGM9dygpW2ErMzI+PjJdLGQ9Yi5nZXRUaW1lem9uZU9mZnNldCgpLGY9KG5ldyBEYXRlKGIuZ2V0RnVsbFllYXIoKSxcbjYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksZz0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksaz1NYXRoLm1pbihnLGYpOzA+Yz93KClbYSszMj4+Ml09TnVtYmVyKGYhPWcmJms9PWQpOjA8YyE9KGs9PWQpJiYoZj1NYXRoLm1heChnLGYpLGIuc2V0VGltZShiLmdldFRpbWUoKSs2RTQqKCgwPGM/azpmKS1kKSkpO3coKVthKzI0Pj4yXT1iLmdldERheSgpO2M9KFooYi5nZXRGdWxsWWVhcigpKT9vYzpwYylbYi5nZXRNb250aCgpXStiLmdldERhdGUoKS0xfDA7dygpW2ErMjg+PjJdPWM7dygpW2E+PjJdPWIuZ2V0U2Vjb25kcygpO3coKVthKzQ+PjJdPWIuZ2V0TWludXRlcygpO3coKVthKzg+PjJdPWIuZ2V0SG91cnMoKTt3KClbYSsxMj4+Ml09Yi5nZXREYXRlKCk7dygpW2ErMTY+PjJdPWIuZ2V0TW9udGgoKTt3KClbYSsyMD4+Ml09Yi5nZXRZZWFyKCk7cmV0dXJuIEJpZ0ludChiLmdldFRpbWUoKS8xRTMpfSxYOnJjLFk6c2MsTjooYSxcbmIsYyk9PntmdW5jdGlvbiBkKHIpe3JldHVybihyPXIudG9UaW1lU3RyaW5nKCkubWF0Y2goL1xcKChbQS1aYS16IF0rKVxcKSQvKSk/clsxXTpcIkdNVFwifXZhciBmPShuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKSxnPW5ldyBEYXRlKGYsMCwxKSxrPW5ldyBEYXRlKGYsNiwxKTtmPWcuZ2V0VGltZXpvbmVPZmZzZXQoKTt2YXIgbD1rLmdldFRpbWV6b25lT2Zmc2V0KCkscT1NYXRoLm1heChmLGwpO3ooKVthPj4yXT02MCpxO3coKVtiPj4yXT1OdW1iZXIoZiE9bCk7YT1kKGcpO2I9ZChrKTthPXVjKGEpO2I9dWMoYik7bDxmPyh6KClbYz4+Ml09YSx6KClbYys0Pj4yXT1iKTooeigpW2M+PjJdPWIseigpW2MrND4+Ml09YSl9LG46KCk9Pnt3YShcIlwiKX0sRTpmdW5jdGlvbigpe30sRzpmdW5jdGlvbigpe3JldHVybiBEYXRlLm5vdygpfSxtYTooKT0+e0dhKz0xO3Rocm93XCJ1bndpbmRcIjt9LFA6KCk9PjIxNDc0ODM2NDgscTooKT0+cGVyZm9ybWFuY2UudGltZU9yaWdpbitwZXJmb3JtYW5jZS5ub3coKSxcbnc6ZnVuY3Rpb24oKXtyZXR1cm4gRT9yZXF1aXJlKFwib3NcIikuY3B1cygpLmxlbmd0aDpuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeX0sY2E6ZnVuY3Rpb24oYSxiLGMsZCl7UC4kYj1iO2MvPTI7emMubGVuZ3RoPWM7Yj1kPj4zO2ZvcihkPTA7ZDxjO2QrKyl6Y1tkXT1MW2IrMipkXT9MW2IrMipkKzFdOmhhKClbYisyKmQrMV07cmV0dXJuIFJjW2FdLmFwcGx5KG51bGwsemMpfSxNOmE9Pnt2YXIgYj10KCkubGVuZ3RoO2E+Pj49MDtpZihhPD1ifHwyMTQ3NDgzNjQ4PGEpcmV0dXJuITE7Zm9yKHZhciBjPTE7ND49YztjKj0yKXt2YXIgZD1iKigxKy4yL2MpO2Q9TWF0aC5taW4oZCxhKzEwMDY2MzI5Nik7dmFyIGY9TWF0aDtkPU1hdGgubWF4KGEsZCk7YTp7Zj1mLm1pbi5jYWxsKGYsMjE0NzQ4MzY0OCxkKyg2NTUzNi1kJTY1NTM2KSU2NTUzNiktbS5idWZmZXIuYnl0ZUxlbmd0aCs2NTUzNT4+PjE2O3RyeXttLmdyb3coZik7cCgpO3ZhciBnPTE7YnJlYWsgYX1jYXRjaChrKXt9Zz1cbnZvaWQgMH1pZihnKXJldHVybiEwfXJldHVybiExfSxnYTpEYyxoYTpFYyxWOiRhLHo6RmMsQzpHYyxiYTpIYyxCOkpjLGE6bXx8QS53YXNtTWVtb3J5LHBhOk9jLHA6KGEsYixjLGQpPT5PYyhhLGIsYyxkKX07KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShjLGQpe0o9Yz1jLmV4cG9ydHM7UC5FYi5wdXNoKEouWWEpO0NhPUouJGE7RWEudW5zaGlmdChKLnRhKTt4YT1kO0xhKCk7cmV0dXJuIGN9dmFyIGI9e2E6VGN9O0thKCk7aWYoQS5pbnN0YW50aWF0ZVdhc20pdHJ5e3JldHVybiBBLmluc3RhbnRpYXRlV2FzbShiLGEpfWNhdGNoKGMpe0goXCJNb2R1bGUuaW5zdGFudGlhdGVXYXNtIGNhbGxiYWNrIGZhaWxlZCB3aXRoIGVycm9yOiBcIitjKSxrYShjKX1RYShiLGZ1bmN0aW9uKGMpe2EoYy5pbnN0YW5jZSxjLm1vZHVsZSl9KS5jYXRjaChrYSk7cmV0dXJue319KSgpO0EuX09ydEluaXQ9KGEsYik9PihBLl9PcnRJbml0PUoudWEpKGEsYik7XG5BLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihBLl9PcnRHZXRMYXN0RXJyb3I9Si52YSkoYSxiKTtBLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz0oYSxiLGMsZCxmLGcsayxsLHEscik9PihBLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz1KLndhKShhLGIsYyxkLGYsZyxrLGwscSxyKTtBLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcj0oYSxiKT0+KEEuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyPUoueGEpKGEsYik7QS5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlPShhLGIsYyk9PihBLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9Si55YSkoYSxiLGMpO0EuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeT0oYSxiLGMpPT4oQS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PUouemEpKGEsYixjKTtBLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnM9YT0+KEEuX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucz1KLkFhKShhKTtcbkEuX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KEEuX09ydENyZWF0ZVNlc3Npb249Si5CYSkoYSxiLGMpO0EuX09ydFJlbGVhc2VTZXNzaW9uPWE9PihBLl9PcnRSZWxlYXNlU2Vzc2lvbj1KLkNhKShhKTtBLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PShhLGIsYyk9PihBLl9PcnRHZXRJbnB1dE91dHB1dENvdW50PUouRGEpKGEsYixjKTtBLl9PcnRHZXRJbnB1dE5hbWU9KGEsYik9PihBLl9PcnRHZXRJbnB1dE5hbWU9Si5FYSkoYSxiKTtBLl9PcnRHZXRPdXRwdXROYW1lPShhLGIpPT4oQS5fT3J0R2V0T3V0cHV0TmFtZT1KLkZhKShhLGIpO0EuX09ydEZyZWU9YT0+KEEuX09ydEZyZWU9Si5HYSkoYSk7QS5fT3J0Q3JlYXRlVGVuc29yPShhLGIsYyxkLGYsZyk9PihBLl9PcnRDcmVhdGVUZW5zb3I9Si5IYSkoYSxiLGMsZCxmLGcpO0EuX09ydEdldFRlbnNvckRhdGE9KGEsYixjLGQsZik9PihBLl9PcnRHZXRUZW5zb3JEYXRhPUouSWEpKGEsYixjLGQsZik7XG5BLl9PcnRSZWxlYXNlVGVuc29yPWE9PihBLl9PcnRSZWxlYXNlVGVuc29yPUouSmEpKGEpO0EuX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGQpPT4oQS5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1KLkthKShhLGIsYyxkKTtBLl9PcnRBZGRSdW5Db25maWdFbnRyeT0oYSxiLGMpPT4oQS5fT3J0QWRkUnVuQ29uZmlnRW50cnk9Si5MYSkoYSxiLGMpO0EuX09ydFJlbGVhc2VSdW5PcHRpb25zPWE9PihBLl9PcnRSZWxlYXNlUnVuT3B0aW9ucz1KLk1hKShhKTtBLl9PcnRDcmVhdGVCaW5kaW5nPWE9PihBLl9PcnRDcmVhdGVCaW5kaW5nPUouTmEpKGEpO0EuX09ydEJpbmRJbnB1dD0oYSxiLGMpPT4oQS5fT3J0QmluZElucHV0PUouT2EpKGEsYixjKTtBLl9PcnRCaW5kT3V0cHV0PShhLGIsYyxkKT0+KEEuX09ydEJpbmRPdXRwdXQ9Si5QYSkoYSxiLGMsZCk7QS5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9YT0+KEEuX09ydENsZWFyQm91bmRPdXRwdXRzPUouUWEpKGEpO1xuQS5fT3J0UmVsZWFzZUJpbmRpbmc9YT0+KEEuX09ydFJlbGVhc2VCaW5kaW5nPUouUmEpKGEpO0EuX09ydFJ1bldpdGhCaW5kaW5nPShhLGIsYyxkLGYpPT4oQS5fT3J0UnVuV2l0aEJpbmRpbmc9Si5TYSkoYSxiLGMsZCxmKTtBLl9PcnRSdW49KGEsYixjLGQsZixnLGssbCk9PihBLl9PcnRSdW49Si5UYSkoYSxiLGMsZCxmLGcsayxsKTtBLl9PcnRFbmRQcm9maWxpbmc9YT0+KEEuX09ydEVuZFByb2ZpbGluZz1KLlVhKShhKTt2YXIgYmI9QS5fcHRocmVhZF9zZWxmPSgpPT4oYmI9QS5fcHRocmVhZF9zZWxmPUouVmEpKCksdGM9QS5fbWFsbG9jPWE9Pih0Yz1BLl9tYWxsb2M9Si5XYSkoYSksWT1BLl9mcmVlPWE9PihZPUEuX2ZyZWU9Si5YYSkoYSk7QS5fX2Vtc2NyaXB0ZW5fdGxzX2luaXQ9KCk9PihBLl9fZW1zY3JpcHRlbl90bHNfaW5pdD1KLllhKSgpO3ZhciBhYz1hPT4oYWM9Si5aYSkoYSk7XG5BLl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3M9KCk9PihBLl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3M9Si5fYSkoKTt2YXIgU2M9QS5fX2Vtc2NyaXB0ZW5fdGhyZWFkX2luaXQ9KGEsYixjLGQsZixnKT0+KFNjPUEuX19lbXNjcmlwdGVuX3RocmVhZF9pbml0PUouYWIpKGEsYixjLGQsZixnKTtBLl9fZW1zY3JpcHRlbl90aHJlYWRfY3Jhc2hlZD0oKT0+KEEuX19lbXNjcmlwdGVuX3RocmVhZF9jcmFzaGVkPUouYmIpKCk7XG52YXIgeWM9KGEsYixjLGQpPT4oeWM9Si5jYikoYSxiLGMsZCksYWI9YT0+KGFiPUouZGIpKGEpLGhiPUEuX19lbXNjcmlwdGVuX3RocmVhZF9leGl0PWE9PihoYj1BLl9fZW1zY3JpcHRlbl90aHJlYWRfZXhpdD1KLmViKShhKSxaYj1BLl9fZW1zY3JpcHRlbl9jaGVja19tYWlsYm94PSgpPT4oWmI9QS5fX2Vtc2NyaXB0ZW5fY2hlY2tfbWFpbGJveD1KLmZiKSgpLGViPShhLGIpPT4oZWI9Si5nYikoYSxiKSx2Yz0oKT0+KHZjPUouaGIpKCksZmI9YT0+KGZiPUouaWIpKGEpLHhjPWE9Pih4Yz1KLmpiKShhKTtBLmtlZXBSdW50aW1lQWxpdmU9SGE7QS53YXNtTWVtb3J5PW07QS5zdGFja0FsbG9jPXhjO0Euc3RhY2tTYXZlPXZjO0Euc3RhY2tSZXN0b3JlPWZiO0EuVVRGOFRvU3RyaW5nPVhhO0Euc3RyaW5nVG9VVEY4PXJiO0EubGVuZ3RoQnl0ZXNVVEY4PXBiO0EuRXhpdFN0YXR1cz1SYTtBLlBUaHJlYWQ9UDt2YXIgVWM7SmE9ZnVuY3Rpb24gVmMoKXtVY3x8V2MoKTtVY3x8KEphPVZjKX07XG5mdW5jdGlvbiBXYygpe2Z1bmN0aW9uIGEoKXtpZighVWMmJihVYz0hMCxBLmNhbGxlZFJ1bj0hMCwheWEpKXtGfHxkYihFYSk7amEoQSk7aWYoQS5vblJ1bnRpbWVJbml0aWFsaXplZClBLm9uUnVudGltZUluaXRpYWxpemVkKCk7aWYoIUYpe2lmKEEucG9zdFJ1bilmb3IoXCJmdW5jdGlvblwiPT10eXBlb2YgQS5wb3N0UnVuJiYoQS5wb3N0UnVuPVtBLnBvc3RSdW5dKTtBLnBvc3RSdW4ubGVuZ3RoOyl7dmFyIGI9QS5wb3N0UnVuLnNoaWZ0KCk7RmEudW5zaGlmdChiKX1kYihGYSl9fX1pZighKDA8TSkpaWYoRilqYShBKSxGfHxkYihFYSksc3RhcnRXb3JrZXIoQSk7ZWxzZXtpZihBLnByZVJ1bilmb3IoXCJmdW5jdGlvblwiPT10eXBlb2YgQS5wcmVSdW4mJihBLnByZVJ1bj1bQS5wcmVSdW5dKTtBLnByZVJ1bi5sZW5ndGg7KURhLnVuc2hpZnQoQS5wcmVSdW4uc2hpZnQoKSk7ZGIoRGEpOzA8TXx8KEEuc2V0U3RhdHVzPyhBLnNldFN0YXR1cyhcIlJ1bm5pbmcuLi5cIiksc2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtBLnNldFN0YXR1cyhcIlwiKX0sXG4xKTthKCl9LDEpKTphKCkpfX1pZihBLnByZUluaXQpZm9yKFwiZnVuY3Rpb25cIj09dHlwZW9mIEEucHJlSW5pdCYmKEEucHJlSW5pdD1bQS5wcmVJbml0XSk7MDxBLnByZUluaXQubGVuZ3RoOylBLnByZUluaXQucG9wKCkoKTtXYygpO1xuXG5cbiAgcmV0dXJuIG1vZHVsZUFyZy5yZWFkeVxufVxuXG4pO1xufSkoKTtcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG4gIG1vZHVsZS5leHBvcnRzID0gb3J0V2FzbVRocmVhZGVkO1xuZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKVxuICBkZWZpbmUoW10sICgpID0+IG9ydFdhc21UaHJlYWRlZCk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7dmFyIE1vZHVsZT17fTt2YXIgRU5WSVJPTk1FTlRfSVNfTk9ERT10eXBlb2YgcHJvY2Vzcz09XCJvYmplY3RcIiYmdHlwZW9mIHByb2Nlc3MudmVyc2lvbnM9PVwib2JqZWN0XCImJnR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGU9PVwic3RyaW5nXCI7aWYoRU5WSVJPTk1FTlRfSVNfTk9ERSl7dmFyIG5vZGVXb3JrZXJUaHJlYWRzPXJlcXVpcmUoXCJ3b3JrZXJfdGhyZWFkc1wiKTt2YXIgcGFyZW50UG9ydD1ub2RlV29ya2VyVGhyZWFkcy5wYXJlbnRQb3J0O3BhcmVudFBvcnQub24oXCJtZXNzYWdlXCIsZGF0YT0+b25tZXNzYWdlKHtkYXRhOmRhdGF9KSk7dmFyIGZzPXJlcXVpcmUoXCJmc1wiKTtPYmplY3QuYXNzaWduKGdsb2JhbCx7c2VsZjpnbG9iYWwscmVxdWlyZTpyZXF1aXJlLE1vZHVsZTpNb2R1bGUsbG9jYXRpb246e2hyZWY6X19maWxlbmFtZX0sV29ya2VyOm5vZGVXb3JrZXJUaHJlYWRzLldvcmtlcixpbXBvcnRTY3JpcHRzOmY9PigwLGV2YWwpKGZzLnJlYWRGaWxlU3luYyhmLFwidXRmOFwiKStcIi8vIyBzb3VyY2VVUkw9XCIrZikscG9zdE1lc3NhZ2U6bXNnPT5wYXJlbnRQb3J0LnBvc3RNZXNzYWdlKG1zZykscGVyZm9ybWFuY2U6Z2xvYmFsLnBlcmZvcm1hbmNlfHx7bm93OkRhdGUubm93fX0pfXZhciBpbml0aWFsaXplZEpTPWZhbHNlO2Z1bmN0aW9uIHRocmVhZFByaW50RXJyKCl7dmFyIHRleHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKFwiIFwiKTtpZihFTlZJUk9OTUVOVF9JU19OT0RFKXtmcy53cml0ZVN5bmMoMix0ZXh0K1wiXFxuXCIpO3JldHVybn1jb25zb2xlLmVycm9yKHRleHQpfWZ1bmN0aW9uIHRocmVhZEFsZXJ0KCl7dmFyIHRleHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKFwiIFwiKTtwb3N0TWVzc2FnZSh7Y21kOlwiYWxlcnRcIix0ZXh0OnRleHQsdGhyZWFkSWQ6TW9kdWxlW1wiX3B0aHJlYWRfc2VsZlwiXSgpfSl9dmFyIGVycj10aHJlYWRQcmludEVycjtzZWxmLmFsZXJ0PXRocmVhZEFsZXJ0O01vZHVsZVtcImluc3RhbnRpYXRlV2FzbVwiXT0oaW5mbyxyZWNlaXZlSW5zdGFuY2UpPT57dmFyIG1vZHVsZT1Nb2R1bGVbXCJ3YXNtTW9kdWxlXCJdO01vZHVsZVtcIndhc21Nb2R1bGVcIl09bnVsbDt2YXIgaW5zdGFuY2U9bmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG1vZHVsZSxpbmZvKTtyZXR1cm4gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlKX07c2VsZi5vbnVuaGFuZGxlZHJlamVjdGlvbj1lPT57dGhyb3cgZS5yZWFzb24/P2V9O2Z1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZSl7dHJ5e2lmKGUuZGF0YS5jbWQ9PT1cImxvYWRcIil7bGV0IG1lc3NhZ2VRdWV1ZT1bXTtzZWxmLm9ubWVzc2FnZT1lPT5tZXNzYWdlUXVldWUucHVzaChlKTtzZWxmLnN0YXJ0V29ya2VyPWluc3RhbmNlPT57TW9kdWxlPWluc3RhbmNlO3Bvc3RNZXNzYWdlKHtcImNtZFwiOlwibG9hZGVkXCJ9KTtmb3IobGV0IG1zZyBvZiBtZXNzYWdlUXVldWUpe2hhbmRsZU1lc3NhZ2UobXNnKX1zZWxmLm9ubWVzc2FnZT1oYW5kbGVNZXNzYWdlfTtNb2R1bGVbXCJ3YXNtTW9kdWxlXCJdPWUuZGF0YS53YXNtTW9kdWxlO2Zvcihjb25zdCBoYW5kbGVyIG9mIGUuZGF0YS5oYW5kbGVycyl7TW9kdWxlW2hhbmRsZXJdPSguLi5hcmdzKT0+e3Bvc3RNZXNzYWdlKHtjbWQ6XCJjYWxsSGFuZGxlclwiLGhhbmRsZXI6aGFuZGxlcixhcmdzOmFyZ3N9KX19TW9kdWxlW1wid2FzbU1lbW9yeVwiXT1lLmRhdGEud2FzbU1lbW9yeTtNb2R1bGVbXCJidWZmZXJcIl09TW9kdWxlW1wid2FzbU1lbW9yeVwiXS5idWZmZXI7TW9kdWxlW1wiRU5WSVJPTk1FTlRfSVNfUFRIUkVBRFwiXT10cnVlO2lmKHR5cGVvZiBlLmRhdGEudXJsT3JCbG9iPT1cInN0cmluZ1wiKXtpbXBvcnRTY3JpcHRzKGUuZGF0YS51cmxPckJsb2IpfWVsc2V7dmFyIG9iamVjdFVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKGUuZGF0YS51cmxPckJsb2IpO2ltcG9ydFNjcmlwdHMob2JqZWN0VXJsKTtVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCl9b3J0V2FzbVRocmVhZGVkKE1vZHVsZSl9ZWxzZSBpZihlLmRhdGEuY21kPT09XCJydW5cIil7TW9kdWxlW1wiX19lbXNjcmlwdGVuX3RocmVhZF9pbml0XCJdKGUuZGF0YS5wdGhyZWFkX3B0ciwvKmlzTWFpbkJyb3dzZXJUaHJlYWQ9Ki8wLC8qaXNNYWluUnVudGltZVRocmVhZD0qLzAsLypjYW5CbG9jaz0qLzEpO01vZHVsZVtcIl9fZW1zY3JpcHRlbl90aHJlYWRfbWFpbGJveF9hd2FpdFwiXShlLmRhdGEucHRocmVhZF9wdHIpO01vZHVsZVtcImVzdGFibGlzaFN0YWNrU3BhY2VcIl0oKTtNb2R1bGVbXCJQVGhyZWFkXCJdLnJlY2VpdmVPYmplY3RUcmFuc2ZlcihlLmRhdGEpO01vZHVsZVtcIlBUaHJlYWRcIl0udGhyZWFkSW5pdFRMUygpO2lmKCFpbml0aWFsaXplZEpTKXtNb2R1bGVbXCJfX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzXCJdKCk7aW5pdGlhbGl6ZWRKUz10cnVlfXRyeXtNb2R1bGVbXCJpbnZva2VFbnRyeVBvaW50XCJdKGUuZGF0YS5zdGFydF9yb3V0aW5lLGUuZGF0YS5hcmcpfWNhdGNoKGV4KXtpZihleCE9XCJ1bndpbmRcIil7dGhyb3cgZXh9fX1lbHNlIGlmKGUuZGF0YS5jbWQ9PT1cImNhbmNlbFwiKXtpZihNb2R1bGVbXCJfcHRocmVhZF9zZWxmXCJdKCkpe01vZHVsZVtcIl9fZW1zY3JpcHRlbl90aHJlYWRfZXhpdFwiXSgtMSl9fWVsc2UgaWYoZS5kYXRhLnRhcmdldD09PVwic2V0aW1tZWRpYXRlXCIpe31lbHNlIGlmKGUuZGF0YS5jbWQ9PT1cImNoZWNrTWFpbGJveFwiKXtpZihpbml0aWFsaXplZEpTKXtNb2R1bGVbXCJjaGVja01haWxib3hcIl0oKX19ZWxzZSBpZihlLmRhdGEuY21kKXtlcnIoXCJ3b3JrZXIuanMgcmVjZWl2ZWQgdW5rbm93biBjb21tYW5kIFwiK2UuZGF0YS5jbWQpO2VycihlLmRhdGEpfX1jYXRjaChleCl7aWYoTW9kdWxlW1wiX19lbXNjcmlwdGVuX3RocmVhZF9jcmFzaGVkXCJdKXtNb2R1bGVbXCJfX2Vtc2NyaXB0ZW5fdGhyZWFkX2NyYXNoZWRcIl0oKX10aHJvdyBleH19c2VsZi5vbm1lc3NhZ2U9aGFuZGxlTWVzc2FnZTtcbiIsICJleHBvcnQgY29uc3Qgam9pbiA9IHVuZGVmaW5lZDsiLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7RW52fSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge09ydFdhc21Nb2R1bGV9IGZyb20gJy4vYmluZGluZy9vcnQtd2FzbSc7XG5pbXBvcnQge09ydFdhc21UaHJlYWRlZE1vZHVsZX0gZnJvbSAnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xuY29uc3Qgb3J0V2FzbUZhY3Rvcnk6IEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+ID1cbiAgICBCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVID8gcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLmpzJykgOiByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tc2ltZC5qc2VwLmpzJyk7XG5cbmNvbnN0IG9ydFdhc21GYWN0b3J5VGhyZWFkZWQ6IEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+ID0gIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1RIUkVBRCA/XG4gICAgKEJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgPyByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tdGhyZWFkZWQuanMnKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLmpzJykpIDpcbiAgICBvcnRXYXNtRmFjdG9yeTtcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xuXG5sZXQgd2FzbTogT3J0V2FzbU1vZHVsZXx1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5cbmNvbnN0IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gSWYgJ1NoYXJlZEFycmF5QnVmZmVyJyBpcyBub3QgYXZhaWxhYmxlLCBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90IHdvcmsuXG4gICAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciB0cmFuc2ZlcmFiaWxpdHkgb2YgU0FCcyAoZm9yIGJyb3dzZXJzLiBuZWVkZWQgZm9yIEZpcmVmb3gpXG4gICAgLy8gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIW1zZy9tb3ppbGxhLmRldi5wbGF0Zm9ybS9JSGtCWmxIRVRwQS9kd3NNTmNoV0VRQUpcbiAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEucG9zdE1lc3NhZ2UobmV3IFNoYXJlZEFycmF5QnVmZmVyKDEpKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSB0aHJlYWRzIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhyZWFkZWQgaW5zdHJ1Y3Rpb25zLlxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsICAwLCAgMCwgMSwgNCwgMSwgIDk2LCAwLCAgIDAsICAzLCAyLCAxLCAgMCwgNSxcbiAgICAgIDQsIDEsICAzLCAgIDEsICAgMSwgMTAsIDExLCAxLCA5LCAwLCA2NSwgMCwgIDI1NCwgMTYsIDIsIDAsIDI2LCAxMVxuICAgIF0pKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgaXNTaW1kU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBTSU1EIGluc3RydWN0aW9ucy5cblxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XG4gICAgLy9cbiAgICAvLyAobW9kdWxlXG4gICAgLy8gICAodHlwZSAkdDAgKGZ1bmMpKVxuICAgIC8vICAgKGZ1bmMgJGYwICh0eXBlICR0MClcbiAgICAvLyAgICAgKGRyb3BcbiAgICAvLyAgICAgICAoaTMyeDQuZG90X2kxNng4X3NcbiAgICAvLyAgICAgICAgIChpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxuICAgIC8vICAgICAgICAgKHYxMjguY29uc3QgaTMyeDQgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCkpKSkpXG5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMCwgICA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsICAgMjgsICAwLCA2NSwgMCxcbiAgICAgIDI1MywgMTUsIDI1MywgMTIsICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDAsICAyNTMsIDE4NiwgMSwgMjYsIDExXG4gICAgXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBnZXRXYXNtRmlsZU5hbWUgPSAodXNlU2ltZDogYm9vbGVhbiwgdXNlVGhyZWFkczogYm9vbGVhbikgPT4ge1xuICBpZiAodXNlVGhyZWFkcykge1xuICAgIHJldHVybiB1c2VTaW1kID8gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScgOiAnb3J0LXdhc20tdGhyZWFkZWQud2FzbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVzZVNpbWQgPyAnb3J0LXdhc20tc2ltZC53YXNtJyA6ICdvcnQtd2FzbS53YXNtJztcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseSA9IGFzeW5jKGZsYWdzOiBFbnYuV2ViQXNzZW1ibHlGbGFncyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRpYWxpemluZykge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVsdGlwbGUgY2FsbHMgdG8gXFwnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KClcXCcgZGV0ZWN0ZWQuJyk7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIGNhbGwgdG8gXFwnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KClcXCcgZmFpbGVkLicpO1xuICB9XG5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAvLyB3YXNtIGZsYWdzIGFyZSBhbHJlYWR5IGluaXRpYWxpemVkXG4gIGNvbnN0IHRpbWVvdXQgPSBmbGFncy5pbml0VGltZW91dCE7XG4gIGNvbnN0IG51bVRocmVhZHMgPSBmbGFncy5udW1UaHJlYWRzITtcbiAgY29uc3Qgc2ltZCA9IGZsYWdzLnNpbWQhO1xuXG4gIGNvbnN0IHVzZVRocmVhZHMgPSBudW1UaHJlYWRzID4gMSAmJiBpc011bHRpVGhyZWFkU3VwcG9ydGVkKCk7XG4gIGNvbnN0IHVzZVNpbWQgPSBzaW1kICYmIGlzU2ltZFN1cHBvcnRlZCgpO1xuXG4gIGNvbnN0IHdhc21QYXRocyA9IGZsYWdzLndhc21QYXRocztcbiAgY29uc3Qgd2FzbVByZWZpeE92ZXJyaWRlID0gdHlwZW9mIHdhc21QYXRocyA9PT0gJ3N0cmluZycgPyB3YXNtUGF0aHMgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHdhc21GaWxlTmFtZSA9IGdldFdhc21GaWxlTmFtZSh1c2VTaW1kLCB1c2VUaHJlYWRzKTtcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZSA9IHR5cGVvZiB3YXNtUGF0aHMgPT09ICdvYmplY3QnID8gd2FzbVBhdGhzW3dhc21GaWxlTmFtZV0gOiB1bmRlZmluZWQ7XG5cbiAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuXG4gIGNvbnN0IHRhc2tzOiBBcnJheTxQcm9taXNlPHZvaWQ+PiA9IFtdO1xuXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgdGFza3MucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8vIHByb21pc2UgZm9yIG1vZHVsZSBpbml0aWFsaXphdGlvblxuICB0YXNrcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdXNlVGhyZWFkcyA/IG9ydFdhc21GYWN0b3J5VGhyZWFkZWQgOiBvcnRXYXNtRmFjdG9yeTtcbiAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XG4gICAgICBsb2NhdGVGaWxlOiAoZmlsZU5hbWU6IHN0cmluZywgc2NyaXB0RGlyZWN0b3J5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9USFJFQUQgJiYgdXNlVGhyZWFkcyAmJiBmaWxlTmFtZS5lbmRzV2l0aCgnLndvcmtlci5qcycpICYmXG4gICAgICAgICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZSgpIGZ1bmN0aW9uIGlzIGhhbmRsZWQgYnkgZXNidWlsZCBwbHVnaW4gdG8gbG9hZCBmaWxlIGNvbnRlbnQgYXMgc3RyaW5nLlxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzXG4gICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkLndvcmtlci5qcycpXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWxlTmFtZS5lbmRzV2l0aCgnLndhc20nKSkge1xuICAgICAgICAgIGlmICh3YXNtUGF0aE92ZXJyaWRlKSB7XG4gICAgICAgICAgICByZXR1cm4gd2FzbVBhdGhPdmVycmlkZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcmVmaXggPSB3YXNtUHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0RGlyZWN0b3J5O1xuXG4gICAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICAgICAgICBpZiAod2FzbUZpbGVOYW1lID09PSAnb3J0LXdhc20tc2ltZC53YXNtJykge1xuICAgICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgJ29ydC13YXNtLXNpbWQuanNlcC53YXNtJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2FzbUZpbGVOYW1lID09PSAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJykge1xuICAgICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC53YXNtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgd2FzbUZpbGVOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNjcmlwdERpcmVjdG9yeSArIGZpbGVOYW1lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1RIUkVBRCAmJiB1c2VUaHJlYWRzKSB7XG4gICAgICBpZiAodHlwZW9mIEJsb2IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbmZpZy5tYWluU2NyaXB0VXJsT3JCbG9iID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ29ydC13YXNtLXRocmVhZGVkLmpzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY3JpcHRTb3VyY2VDb2RlID0gYHZhciBvcnRXYXNtVGhyZWFkZWQ9JHtmYWN0b3J5LnRvU3RyaW5nKCl9O2A7XG4gICAgICAgIGNvbmZpZy5tYWluU2NyaXB0VXJsT3JCbG9iID0gbmV3IEJsb2IoW3NjcmlwdFNvdXJjZUNvZGVdLCB7dHlwZTogJ3RleHQvamF2YXNjcmlwdCd9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmYWN0b3J5KGNvbmZpZykudGhlbihcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIG1vZHVsZSA9PiB7XG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgIHdhc20gPSBtb2R1bGU7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBmYWlsZWQgdG8gaW5pdGlhbGl6ZVxuICAgICAgICAod2hhdCkgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCh3aGF0KTtcbiAgICAgICAgfSk7XG4gIH0pKTtcblxuICBhd2FpdCBQcm9taXNlLnJhY2UodGFza3MpO1xuXG4gIGlmIChpc1RpbWVvdXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYkFzc2VtYmx5IGJhY2tlbmQgaW5pdGlhbGl6aW5nIGZhaWxlZCBkdWUgdG8gdGltZW91dDogJHt0aW1lb3V0fW1zYCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbnN0YW5jZSA9ICgpOiBPcnRXYXNtTW9kdWxlID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmIHdhc20pIHtcbiAgICByZXR1cm4gd2FzbTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgaXMgbm90IGluaXRpYWxpemVkIHlldC4nKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkaXNwb3NlID0gKCk6IHZvaWQgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgIWluaXRpYWxpemluZyAmJiAhYWJvcnRlZCkge1xuICAgIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgICAod2FzbSBhcyBPcnRXYXNtVGhyZWFkZWRNb2R1bGUpLlBUaHJlYWQ/LnRlcm1pbmF0ZUFsbFRocmVhZHMoKTtcbiAgICB3YXNtID0gdW5kZWZpbmVkO1xuXG4gICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgYWxsb2NXYXNtU3RyaW5nID0gKGRhdGE6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IGRhdGFMZW5ndGggPSB3YXNtLmxlbmd0aEJ5dGVzVVRGOChkYXRhKSArIDE7XG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XG4gIHdhc20uc3RyaW5nVG9VVEY4KGRhdGEsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xuICBhbGxvY3MucHVzaChkYXRhT2Zmc2V0KTtcblxuICByZXR1cm4gZGF0YU9mZnNldDtcbn07XG5cbmludGVyZmFjZSBFeHRyYU9wdGlvbnNIYW5kbGVyIHtcbiAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpdGVyYXRlRXh0cmFPcHRpb25zID1cbiAgICAob3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHByZWZpeDogc3RyaW5nLCBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcbiAgICAgaGFuZGxlcjogRXh0cmFPcHRpb25zSGFuZGxlcik6IHZvaWQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnICYmIG9wdGlvbnMgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgaW4gb3B0aW9ucycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gKHByZWZpeCkgPyBwcmVmaXggKyBrZXkgOiBrZXk7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgbmFtZSArICcuJywgc2VlbiwgaGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgaGFuZGxlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIGhhbmRsZXIobmFtZSwgKHZhbHVlKSA/ICcxJyA6ICcwJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBoYW5kbGUgZXh0cmEgY29uZmlnIHR5cGU6ICR7dHlwZW9mIHZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4vKipcbiAqIGNoZWNrIHdlYiBhc3NlbWJseSBBUEkncyBsYXN0IGVycm9yIGFuZCB0aHJvdyBlcnJvciBpZiBhbnkgZXJyb3Igb2NjdXJyZWQuXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxuICovXG5leHBvcnQgY29uc3QgY2hlY2tMYXN0RXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJhbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgd2FzbS5fT3J0R2V0TGFzdEVycm9yKHBhcmFtc09mZnNldCwgcGFyYW1zT2Zmc2V0ICsgNCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5IRUFQMzJbcGFyYW1zT2Zmc2V0IC8gNF07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uSEVBUFUzMltwYXJhbXNPZmZzZXQgLyA0ICsgMV07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlUG9pbnRlciA/IHdhc20uVVRGOFRvU3RyaW5nKGVycm9yTWVzc2FnZVBvaW50ZXIpIDogJyc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9uc30gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAgLy8gRGVmYXVsdCB0byB3YXJuaW5nXG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dTZXZlcml0eUxldmVsKSB8fFxuICAgICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID0gMDsgIC8vIERlZmF1bHQgdG8gMFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyB2ZXJib3NpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke29wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LnRlcm1pbmF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLnRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxldCB0YWdEYXRhT2Zmc2V0ID0gMDtcbiAgICBpZiAob3B0aW9ucz8udGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhZ0RhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcob3B0aW9ucy50YWcsIGFsbG9jcyk7XG4gICAgfVxuXG4gICAgcnVuT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVJ1bk9wdGlvbnMoXG4gICAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCEsIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwhLCAhIXJ1bk9wdGlvbnMudGVybWluYXRlISwgdGFnRGF0YU9mZnNldCk7XG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBydW4gb3B0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhvcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG5cbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFJ1bkNvbmZpZ0VudHJ5KHJ1bk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgcnVuIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbcnVuT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goYWxsb2MgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5jb25zdCBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwgPSAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbDogc3RyaW5nfHVua25vd24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwpIHtcbiAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdleHRlbmRlZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICdhbGwnOlxuICAgICAgcmV0dXJuIDk5O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGdyYXBoIG9wdGltaXphdGlvbiBsZXZlbDogJHtncmFwaE9wdGltaXphdGlvbkxldmVsfWApO1xuICB9XG59O1xuXG5jb25zdCBnZXRFeGVjdXRpb25Nb2RlID0gKGV4ZWN1dGlvbk1vZGU6ICdzZXF1ZW50aWFsJ3wncGFyYWxsZWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChleGVjdXRpb25Nb2RlKSB7XG4gICAgY2FzZSAnc2VxdWVudGlhbCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdwYXJhbGxlbCc6XG4gICAgICByZXR1cm4gMTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBleGVjdXRpb24gbW9kZTogJHtleGVjdXRpb25Nb2RlfWApO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmREZWZhdWx0T3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogdm9pZCA9PiB7XG4gIGlmICghb3B0aW9ucy5leHRyYSkge1xuICAgIG9wdGlvbnMuZXh0cmEgPSB7fTtcbiAgfVxuICBpZiAoIW9wdGlvbnMuZXh0cmEuc2Vzc2lvbikge1xuICAgIG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiA9IHt9O1xuICB9XG4gIGNvbnN0IHNlc3Npb24gPSBvcHRpb25zLmV4dHJhLnNlc3Npb24gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgaWYgKCFzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5ID0gJzEnO1xuICB9XG5cbiAgLy8gaWYgdXNpbmcgSlNFUCB3aXRoIFdlYkdQVSwgYWx3YXlzIGRpc2FibGUgbWVtb3J5IHBhdHRlcm5cbiAgaWYgKG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzICYmXG4gICAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycy5zb21lKGVwID0+ICh0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lKSA9PT0gJ3dlYmdwdScpKSB7XG4gICAgb3B0aW9ucy5lbmFibGVNZW1QYXR0ZXJuID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHNldEV4ZWN1dGlvblByb3ZpZGVycyA9XG4gICAgKHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsIGV4ZWN1dGlvblByb3ZpZGVyczogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5FeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdLFxuICAgICBhbGxvY3M6IG51bWJlcltdKTogdm9pZCA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgICAgICBsZXQgZXBOYW1lID0gdHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZTtcblxuICAgICAgICAvLyBjaGVjayBFUCBuYW1lXG4gICAgICAgIHN3aXRjaCAoZXBOYW1lKSB7XG4gICAgICAgICAgY2FzZSAneG5ucGFjayc6XG4gICAgICAgICAgICBlcE5hbWUgPSAnWE5OUEFDSyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3ZWJubic6XG4gICAgICAgICAgICBlcE5hbWUgPSAnV0VCTk4nO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgICAgICBpZiAod2Vibm5PcHRpb25zPy5kZXZpY2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZGV2aWNlVHlwZScsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYm5uT3B0aW9ucy5kZXZpY2VUeXBlLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ2RldmljZVR5cGUnIC0gJHt3ZWJubk9wdGlvbnMuZGV2aWNlVHlwZX0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh3ZWJubk9wdGlvbnM/LnBvd2VyUHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ3Bvd2VyUHJlZmVyZW5jZScsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYm5uT3B0aW9ucy5wb3dlclByZWZlcmVuY2UsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncG93ZXJQcmVmZXJlbmNlJyAtICR7d2Vibm5PcHRpb25zLnBvd2VyUHJlZmVyZW5jZX0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3ZWJncHUnOlxuICAgICAgICAgICAgZXBOYW1lID0gJ0pTJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucz8ucHJlZmVycmVkTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcmVmZXJyZWRMYXlvdXQgbXVzdCBiZSBlaXRoZXIgJ05DSFcnIG9yICdOSFdDJzogJHt3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncHJlZmVycmVkTGF5b3V0JywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncHJlZmVycmVkTGF5b3V0JyAtICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2FzbSc6XG4gICAgICAgICAgY2FzZSAnY3B1JzpcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVwTmFtZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoZXBOYW1lLCBhbGxvY3MpO1xuICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXIoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGVwTmFtZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFwcGVuZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBjb25zdCBzZXRTZXNzaW9uT3B0aW9ucyA9IChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBhcHBlbmREZWZhdWx0T3B0aW9ucyhzZXNzaW9uT3B0aW9ucyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBncmFwaE9wdGltaXphdGlvbkxldmVsID0gZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsKHNlc3Npb25PcHRpb25zLmdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPz8gJ2FsbCcpO1xuICAgIGNvbnN0IGV4ZWN1dGlvbk1vZGUgPSBnZXRFeGVjdXRpb25Nb2RlKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvbk1vZGUgPz8gJ3NlcXVlbnRpYWwnKTtcbiAgICBjb25zdCBsb2dJZERhdGFPZmZzZXQgPVxuICAgICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcblxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7ICAvLyBEZWZhdWx0IHRvIDIgLSB3YXJuaW5nXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1NldmVyaXR5TGV2ZWwpIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXJ2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9nVmVyYm9zaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA/PyAwOyAgLy8gRGVmYXVsdCB0byAwIC0gdmVyYm9zZVxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dWZXJib3NpdHlMZXZlbCkgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPCAwIHx8IGxvZ1ZlcmJvc2l0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0ID0gdHlwZW9mIHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGggPT09ICdzdHJpbmcnID9cbiAgICAgICAgYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGgsIGFsbG9jcykgOlxuICAgICAgICAwO1xuXG4gICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucyhcbiAgICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCwgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVDcHVNZW1BcmVuYSwgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVNZW1QYXR0ZXJuLCBleGVjdXRpb25Nb2RlLFxuICAgICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZVByb2ZpbGluZywgMCwgbG9nSWREYXRhT2Zmc2V0LCBsb2dTZXZlcml0eUxldmVsLCBsb2dWZXJib3NpdHlMZXZlbCxcbiAgICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCk7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLicpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgIHNldEV4ZWN1dGlvblByb3ZpZGVycyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2XG59XG5cbi8qKlxuICogTWFwIHN0cmluZyB0ZW5zb3IgZGF0YSB0byBlbnVtIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSA9ICh0eXBlOiBzdHJpbmcpOiBEYXRhVHlwZSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ludDgnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDg7XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ4O1xuICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmJvb2w7XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDE2O1xuICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDE2O1xuICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQzMjtcbiAgICBjYXNlICd1aW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQzMjtcbiAgICBjYXNlICdmbG9hdDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDE2O1xuICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0O1xuICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmRvdWJsZTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnN0cmluZztcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50NjQ7XG4gICAgY2FzZSAndWludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50NjQ7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgZW51bSB2YWx1ZSB0byBzdHJpbmcgdGVuc29yIGRhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nID0gKHR5cGVQcm90bzogRGF0YVR5cGUpOiBUZW5zb3IuVHlwZSA9PiB7XG4gIHN3aXRjaCAodHlwZVByb3RvKSB7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ4OlxuICAgICAgcmV0dXJuICdpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ4OlxuICAgICAgcmV0dXJuICd1aW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS5ib29sOlxuICAgICAgcmV0dXJuICdib29sJztcbiAgICBjYXNlIERhdGFUeXBlLmludDE2OlxuICAgICAgcmV0dXJuICdpbnQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MTY6XG4gICAgICByZXR1cm4gJ3VpbnQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQzMjpcbiAgICAgIHJldHVybiAnaW50MzInO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDMyOlxuICAgICAgcmV0dXJuICd1aW50MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQxNjpcbiAgICAgIHJldHVybiAnZmxvYXQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDpcbiAgICAgIHJldHVybiAnZmxvYXQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5kb3VibGU6XG4gICAgICByZXR1cm4gJ2Zsb2F0NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUuc3RyaW5nOlxuICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50NjQ6XG4gICAgICByZXR1cm4gJ2ludDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ2NDpcbiAgICAgIHJldHVybiAndWludDY0JztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlUHJvdG99YCk7XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IHRlbnNvciBlbGVtZW50IHNpemUgaW4gYnl0ZXMgYnkgdGhlIGdpdmVuIGRhdGEgdHlwZVxuICogQHJldHVybnMgc2l6ZSBpbiBpbnRlZ2VyIG9yIHVuZGVmaW5lZCBpZiB0aGUgZGF0YSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRlbnNvckVsZW1lbnRTaXplID0gKGRhdGVUeXBlOiBudW1iZXIpOiBudW1iZXJ8XG4gICAgdW5kZWZpbmVkID0+IFt1bmRlZmluZWQsIDQsIDEsIDEsIDIsIDIsIDQsIDgsIHVuZGVmaW5lZCwgMSwgMiwgOCwgNCwgOCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1bZGF0ZVR5cGVdO1xuXG4vKipcbiAqIGdldCB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciBieSB0aGUgZ2l2ZW4gdGVuc29yIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFxuICAgIFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IgPT4ge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheTtcbiAgICAgICAgY2FzZSAndWludDgnOlxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICBjYXNlICdpbnQ4JzpcbiAgICAgICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgICAgICBjYXNlICd1aW50MTYnOlxuICAgICAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnaW50MTYnOlxuICAgICAgICAgIHJldHVybiBJbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdpbnQzMic6XG4gICAgICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xuICAgICAgICBjYXNlICd1aW50MzInOlxuICAgICAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnaW50NjQnOlxuICAgICAgICAgIHJldHVybiBCaWdJbnQ2NEFycmF5O1xuICAgICAgICBjYXNlICd1aW50NjQnOlxuICAgICAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgbG9nIGxldmVsIHRvIGludGVnZXIgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGxvZ0xldmVsU3RyaW5nVG9FbnVtID0gKGxvZ0xldmVsPzogJ3ZlcmJvc2UnfCdpbmZvJ3wnd2FybmluZyd8J2Vycm9yJ3wnZmF0YWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2ZhdGFsJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9PiB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgICB0eXBlID09PSAnaW50MzInIHx8IHR5cGUgPT09ICdpbnQ2NCcgfHwgdHlwZSA9PT0gJ2Jvb2wnIHx8IHR5cGUgPT09ICdmbG9hdDE2JyB8fCB0eXBlID09PSAndWludDMyJztcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtID0gKGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbnx1bmRlZmluZWQgPT5cbiAgICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlciddIGFzIGNvbnN0KVtsb2NhdGlvbl07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7U2VyaWFsaXphYmxlTW9kZWxkYXRhLCBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhLCBUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQge3NldFJ1bk9wdGlvbnN9IGZyb20gJy4vcnVuLW9wdGlvbnMnO1xuaW1wb3J0IHtzZXRTZXNzaW9uT3B0aW9uc30gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xuaW1wb3J0IHtkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0sIGdldFRlbnNvckVsZW1lbnRTaXplLCBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsIGxvZ0xldmVsU3RyaW5nVG9FbnVtLCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZywgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0sIHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcn0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3J9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbi8qKlxuICogZ2V0IHRoZSBpbnB1dC9vdXRwdXQgY291bnQgb2YgdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0gc2Vzc2lvbkhhbmRsZSB0aGUgaGFuZGxlIHJlcHJlc2VudGluZyB0aGUgc2Vzc2lvbi4gc2hvdWxkIGJlIG5vbi16ZXJvLlxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXG4gKi9cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dENvdW50ID0gKHNlc3Npb25IYW5kbGU6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlLCBkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgNCk7XG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LicpO1xuICAgIH1cbiAgICByZXR1cm4gW3dhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0XSwgd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDQgKyAxXV07XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBpbml0aWFsaXplIG9ubnhydW50aW1lLicpO1xuICB9XG59O1xuXG4vKipcbiAqIGludGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXQgT1JUXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgIC8vIGluaXQgSlNFUCBpZiBhdmFpbGFibGVcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XG4gICAgYXdhaXQgaW5pdEpzZXAoZ2V0SW5zdGFuY2UoKSwgZW52KTtcbiAgfVxufTtcblxuLyoqXG4gKiB2YWxpZCBkYXRhIGxvY2F0aW9ucyBmb3IgaW5wdXQvb3V0cHV0IHRlbnNvcnMuXG4gKi9cbnR5cGUgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXQgPSAnY3B1J3wnY3B1LXBpbm5lZCd8J2dwdS1idWZmZXInO1xuXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xuICAvKipcbiAgICogdGhlIGhhbmRsZSBvZiBJTyBiaW5kaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICpcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJy5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogcmVhZG9ubHkgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXTtcblxuICAvKipcbiAgICogZW51bSB2YWx1ZSBvZiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiByZWFkb25seSBudW1iZXJbXTtcbn07XG5cbi8qKlxuICogIHR1cGxlIGVsZW1lbnRzIGFyZTogSW5mZXJlbmNlU2Vzc2lvbiBJRDsgaW5wdXROYW1lc1VURjhFbmNvZGVkOyBvdXRwdXROYW1lc1VURjhFbmNvZGVkOyBiaW5kaW5nU3RhdGVcbiAqL1xudHlwZSBTZXNzaW9uTWV0YWRhdGEgPSBbXG4gIGluZmVyZW5jZVNlc3Npb25JZDogbnVtYmVyLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZXxudWxsXG5dO1xuXG5jb25zdCBhY3RpdmVTZXNzaW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBTZXNzaW9uTWV0YWRhdGE+KCk7XG5cbi8qKlxuICogYWxsb2NhdGUgdGhlIG1lbW9yeSBhbmQgbWVtY3B5IHRoZSBtb2RlbCBieXRlcywgcHJlcGFyaW5nIGZvciBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBJbmZlcmVuY2VTZXNzaW9uLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb25BbGxvY2F0ZSA9IChtb2RlbDogVWludDhBcnJheSk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgbW9kZWxEYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKG1vZGVsLmJ5dGVMZW5ndGgpO1xuICBpZiAobW9kZWxEYXRhT2Zmc2V0ID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLiBmYWlsZWQgdG8gYWxsb2NhdGUgYSBidWZmZXIgb2Ygc2l6ZSAke21vZGVsLmJ5dGVMZW5ndGh9LmApO1xuICB9XG4gIHdhc20uSEVBUFU4LnNldChtb2RlbCwgbW9kZWxEYXRhT2Zmc2V0KTtcbiAgcmV0dXJuIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsLmJ5dGVMZW5ndGhdO1xufTtcblxuLyoqXG4gKiBjcmVhdGUgYW4gaW5mZXJlbmNlIHNlc3Npb24gdXNpbmcgdGhlIHByZXBhcmVkIGJ1ZmZlciBjb250YWluaW5nIHRoZSBtb2RlbCBkYXRhLlxuICogQHBhcmFtIG1vZGVsRGF0YSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YSBidWZmZXIuXG4gKiBAcGFyYW0gb3B0aW9ucyBhbiBvcHRpb25hbCBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSAzLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgW3Nlc3Npb24gaGFuZGxlLCBpbnB1dCBuYW1lcywgb3V0cHV0IG5hbWVzXVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbkZpbmFsaXplID1cbiAgICAobW9kZWxEYXRhOiBTZXJpYWxpemFibGVNb2RlbGRhdGEsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gICAgICBsZXQgc2Vzc2lvbkhhbmRsZSA9IDA7XG4gICAgICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICAgICAgbGV0IGlvQmluZGluZ0hhbmRsZSA9IDA7XG4gICAgICBsZXQgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XG4gICAgICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gW107XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXSA9IHNldFNlc3Npb25PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlc3Npb25IYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YVswXSwgbW9kZWxEYXRhWzFdLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgICAgIGlmIChzZXNzaW9uSGFuZGxlID09PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIGEgc2Vzc2lvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IFtpbnB1dENvdW50LCBvdXRwdXRDb3VudF0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlKTtcblxuICAgICAgICBjb25zdCBpbnB1dE5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG91dHB1dE5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRJbnB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICAgICAgaWYgKG5hbWUgPT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBpbnB1dCBuYW1lLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgICAgICBpbnB1dE5hbWVzLnB1c2god2FzbS5VVEY4VG9TdHJpbmcobmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRPdXRwdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgICAgIGlmIChuYW1lID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gb3V0cHV0IG5hbWUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZSk7XG4gICAgICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcblxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICBvcHRpb25zLnByZWZlcnJlZE91dHB1dExvY2F0aW9uIDpcbiAgICAgICAgICAgICAgICBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAnY3B1JyAmJiBsb2NhdGlvbiAhPT0gJ2NwdS1waW5uZWQnICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVzZSBJTyBiaW5kaW5nIG9ubHkgd2hlbiBhdCBsZWFzdCBvbmUgb3V0cHV0IGlzIHByZWZmZXJlZCB0byBiZSBvbiBHUFUuXG4gICAgICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUobCA9PiBsID09PSAnZ3B1LWJ1ZmZlcicpKSB7XG4gICAgICAgICAgaW9CaW5kaW5nSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlQmluZGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgICAgICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgSU8gYmluZGluZy4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgICAgICBoYW5kbGU6IGlvQmluZGluZ0hhbmRsZSxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5tYXAobCA9PiBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obCkpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVTZXNzaW9ucy5zZXQoc2Vzc2lvbkhhbmRsZSwgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgYmluZGluZ1N0YXRlXSk7XG4gICAgICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXNdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuXG4gICAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdIYW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlc3Npb25IYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fZnJlZShtb2RlbERhdGFbMF0pO1xuICAgICAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgICAgICB9XG4gICAgICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICAgIH1cbiAgICB9O1xuXG5cbi8qKlxuICogY3JlYXRlIGFuIGluc3RhbmNlIG9mIEluZmVyZW5jZVNlc3Npb24uXG4gKiBAcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgSW5mZXJlbmNlU2Vzc2lvbi4gMC12YWx1ZSBoYW5kbGUgZm9yIGZhaWx1cmUuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID1cbiAgICAobW9kZWw6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsRGF0YTogU2VyaWFsaXphYmxlTW9kZWxkYXRhID0gY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKG1vZGVsKTtcbiAgICAgIHJldHVybiBjcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxEYXRhLCBvcHRpb25zKTtcbiAgICB9O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVsZWFzZSBzZXNzaW9uLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlXSA9IHNlc3Npb247XG5cbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKTtcbiAgfVxuXG4gIHdhc20uanNlcFVucmVnaXN0ZXJCdWZmZXJzPy4oc2Vzc2lvbklkKTtcblxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5jb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPVxuICAgICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhfG51bGwsIHRlbnNvckhhbmRsZXM6IG51bWJlcltdLCBhbGxvY3M6IG51bWJlcltdLCBzZXNzaW9uSWQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6XG4gICAgICAgIHZvaWQgPT4ge1xuICAgICAgICAgIGlmICghdGVuc29yKSB7XG4gICAgICAgICAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgICAgICBjb25zdCBkaW1zID0gdGVuc29yWzFdO1xuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGVuc29yWzNdO1xuXG4gICAgICAgICAgbGV0IHJhd0RhdGE6IG51bWJlcjtcbiAgICAgICAgICBsZXQgZGF0YUJ5dGVMZW5ndGg6IG51bWJlcjtcblxuICAgICAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgbG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSB0ZW5zb3JbMl0uZ3B1QnVmZmVyIGFzIEdQVUJ1ZmZlcjtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplSW5CeXRlcyA9IGdldFRlbnNvckVsZW1lbnRTaXplKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSkhO1xuICAgICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpICogZWxlbWVudFNpemVJbkJ5dGVzO1xuICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyKHNlc3Npb25JZCwgaW5kZXgsIGdwdUJ1ZmZlciwgZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gNCAqIGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgICAgIGxldCBkYXRhSW5kZXggPSByYXdEYXRhIC8gNDtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXSA9IGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gICAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogZGltcy5sZW5ndGgpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGltSW5kZXggPSBkaW1zT2Zmc2V0IC8gNDtcbiAgICAgICAgICAgIGRpbXMuZm9yRWFjaChkID0+IHdhc20uSEVBUDMyW2RpbUluZGV4KytdID0gZCk7XG4gICAgICAgICAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXG4gICAgICAgICAgICAgICAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCByYXdEYXRhLCBkYXRhQnl0ZUxlbmd0aCwgZGltc09mZnNldCwgZGltcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGxvY2F0aW9uKSk7XG4gICAgICAgICAgICBpZiAodGVuc29yID09PSAwKSB7XG4gICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbnNvckhhbmRsZXMucHVzaCh0ZW5zb3IpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4vKipcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxuICovXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMoXG4gICAgc2Vzc2lvbklkOiBudW1iZXIsIGlucHV0SW5kaWNlczogbnVtYmVyW10sIGlucHV0VGVuc29yczogVGVuc29yTWV0YWRhdGFbXSwgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXG4gICAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBydW4gaW5mZXJlbmNlLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlXSA9IHNlc3Npb247XG5cbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XG5cbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBpbnB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG5cbiAgdHJ5IHtcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKGlucHV0VGVuc29yc1tpXSwgaW5wdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgc2Vzc2lvbklkLCBpbnB1dEluZGljZXNbaV0pO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICAgIG91dHB1dFRlbnNvcnNbaV0sIG91dHB1dFRlbnNvckhhbmRsZXMsIGlucHV0T3V0cHV0QWxsb2NzLCBzZXNzaW9uSWQsIGlucHV0Q291bnQgKyBvdXRwdXRJbmRpY2VzW2ldKTtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRWYWx1ZXNJbmRleCA9IGlucHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgaW5wdXROYW1lc0luZGV4ID0gaW5wdXROYW1lc09mZnNldCAvIDQ7XG4gICAgbGV0IG91dHB1dFZhbHVlc0luZGV4ID0gb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0TmFtZXNJbmRleCA9IG91dHB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0VmFsdWVzSW5kZXgrK10gPSBpbnB1dFRlbnNvckhhbmRsZXNbaV07XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXROYW1lc0luZGV4KytdID0gaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV07XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc0luZGV4KytdID0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltvdXRwdXROYW1lc0luZGV4KytdID0gb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtvdXRwdXRJbmRpY2VzW2ldXTtcbiAgICB9XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIGNvbnN0IHtoYW5kbGUsIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucywgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZH0gPSBpb0JpbmRpbmdTdGF0ZTtcblxuICAgICAgaWYgKGlucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGggIT09IGlucHV0Q291bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCBjb3VudCBmcm9tIGZlZWRzICgke1xuICAgICAgICAgICAgaW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBpbnB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5wdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRCaW5kSW5wdXQoaGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0pO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgaW5wdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgcHJlLWFsbG9jYXRlZCBvdXRwdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBvdXRwdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG91dHB1dFRlbnNvcnNbaV0/LlszXTsgIC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXG5cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQuIGJpbmQgdGhlIHRlbnNvci5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sIDApO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIHByZS1hbGxvY2F0ZWQgb3V0cHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLiByZXNldCBwcmVmZXJyZWQgbG9jYXRpb24uXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID1cbiAgICAgICAgICAgICAgd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCAwLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkW2luZGV4XSk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgb3V0cHV0WyR7aX1dIHRvICR7b3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW2ldfSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGVycm9yQ29kZTogbnVtYmVyO1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpb0JpbmRpbmdTdGF0ZS5oYW5kbGUsIG91dHB1dENvdW50LCBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW4oXG4gICAgICAgICAgc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc09mZnNldCwgaW5wdXRWYWx1ZXNPZmZzZXQsIGlucHV0Q291bnQsIG91dHB1dE5hbWVzT2Zmc2V0LCBvdXRwdXRDb3VudCxcbiAgICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cblxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdGVuc29yID0gd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc09mZnNldCAvIDQgKyBpXTtcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cbiAgICAgICAgb3V0cHV0LnB1c2gob3V0cHV0VGVuc29yc1tpXSEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogNCk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGV8dW5kZWZpbmVkLCBkYXRhT2Zmc2V0ID0gMDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXG4gICAgICAgICAgICB0ZW5zb3IsIHRlbnNvckRhdGFPZmZzZXQsIHRlbnNvckRhdGFPZmZzZXQgKyA0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgOCwgdGVuc29yRGF0YU9mZnNldCArIDEyKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhY2Nlc3Mgb3V0cHV0IHRlbnNvciBkYXRhIG9uIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRlbnNvckRhdGFJbmRleCA9IHRlbnNvckRhdGFPZmZzZXQgLyA0O1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGRhdGFPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkaW1zLnB1c2god2FzbS5IRUFQVTMyW2RpbXNPZmZzZXQgLyA0ICsgaV0pO1xuICAgICAgICB9XG4gICAgICAgIHdhc20uX09ydEZyZWUoZGltc09mZnNldCk7XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkTG9jYXRpb24gPSBpb0JpbmRpbmdTdGF0ZT8ub3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW291dHB1dEluZGljZXNbaV1dO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgbGV0IGRhdGFJbmRleCA9IGRhdGFPZmZzZXQgLyA0O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IHdhc20uSEVBUFUzMltkYXRhSW5kZXhdIC0gb2Zmc2V0O1xuICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgYSBjZXJ0YWluIG91dHB1dCdzIHByZWZlcnJlZCBsb2NhdGlvbiBpcyBHUFUgYnV0IHRoZSB0ZW5zb3IgaXMgZW1wdHksIHdlIHN0aWxsIG5lZWQgdG8gY3JlYXRlIGEgQ1BVXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHdhc20uanNlcEdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplID0gZ2V0VGVuc29yRWxlbWVudFNpemUoZGF0YVR5cGUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRTaXplID09PSB1bmRlZmluZWQgfHwgIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cbiAgICAgICAgICAgIGtlZXBPdXRwdXRUZW5zb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgIHR5cGUsIGRpbXMsIHtcbiAgICAgICAgICAgICAgICBncHVCdWZmZXIsXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIoZ3B1QnVmZmVyLCBzaXplICogZWxlbWVudFNpemUsIHR5cGUpLFxuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdncHUtYnVmZmVyJ1xuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5zZXQod2FzbS5IRUFQVTguc3ViYXJyYXkoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIGRhdGEsICdjcHUnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2spO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgZGF0YU9mZnNldCkge1xuICAgICAgICAgIHdhc20uX2ZyZWUoZGF0YU9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZWVwT3V0cHV0VGVuc29yKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBpbnB1dE91dHB1dEFsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XG5cbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xuICB9XG59O1xuXG4vKipcbiAqIGVuZCBwcm9maWxpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc2Vzc2lvbiBpZCcpO1xuICB9XG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xuXG4gIC8vIHByb2ZpbGUgZmlsZSBuYW1lIGlzIG5vdCB1c2VkIHlldCwgYnV0IGl0IG11c3QgYmUgZnJlZWQuXG4gIGNvbnN0IHByb2ZpbGVGaWxlTmFtZSA9IHdhc20uX09ydEVuZFByb2ZpbGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgaWYgKHByb2ZpbGVGaWxlTmFtZSA9PT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS4nKTtcbiAgfVxuICB3YXNtLl9PcnRGcmVlKHByb2ZpbGVGaWxlTmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMgPSAodGVuc29yczogcmVhZG9ubHkgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXSk6IEFycmF5QnVmZmVyTGlrZVtdID0+IHtcbiAgY29uc3QgYnVmZmVyczogQXJyYXlCdWZmZXJMaWtlW10gPSBbXTtcbiAgZm9yIChjb25zdCB0ZW5zb3Igb2YgdGVuc29ycykge1xuICAgIGNvbnN0IGRhdGEgPSB0ZW5zb3JbMl07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpICYmICdidWZmZXInIGluIGRhdGEpIHtcbiAgICAgIGJ1ZmZlcnMucHVzaChkYXRhLmJ1ZmZlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBidWZmZXJzO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwid2Vid29ya2VyXCIgLz5cblxuaW1wb3J0IHtPcnRXYXNtTWVzc2FnZX0gZnJvbSAnLi4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHtjcmVhdGVTZXNzaW9uLCBjcmVhdGVTZXNzaW9uQWxsb2NhdGUsIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZSwgZW5kUHJvZmlsaW5nLCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycywgaW5pdFJ1bnRpbWUsIHJlbGVhc2VTZXNzaW9uLCBydW59IGZyb20gJy4uL3dhc20tY29yZS1pbXBsJztcbmltcG9ydCB7aW5pdGlhbGl6ZVdlYkFzc2VtYmx5fSBmcm9tICcuLi93YXNtLWZhY3RvcnknO1xuXG5zZWxmLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xuICBzd2l0Y2ggKGV2LmRhdGEudHlwZSkge1xuICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICB0cnkge1xuICAgICAgICBpbml0aWFsaXplV2ViQXNzZW1ibHkoZXYuZGF0YS5pbilcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICgpID0+IHBvc3RNZXNzYWdlKHt0eXBlOiAnaW5pdC13YXNtJ30gYXMgT3J0V2FzbU1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtd2FzbScsIGVycn0gYXMgT3J0V2FzbU1lc3NhZ2UpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtd2FzbScsIGVycn0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5pdC1vcnQnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgaW5pdFJ1bnRpbWUoZXYuZGF0YS5pbikudGhlbigoKSA9PiBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtb3J0J30gYXMgT3J0V2FzbU1lc3NhZ2UpLCBlcnIgPT4gcG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2luaXQtb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgT3J0V2FzbU1lc3NhZ2UpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtb3J0JywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGVfYWxsb2NhdGUnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge21vZGVsfSA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBjb25zdCBtb2RlbGRhdGEgPSBjcmVhdGVTZXNzaW9uQWxsb2NhdGUobW9kZWwpO1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2NyZWF0ZV9hbGxvY2F0ZScsIG91dDogbW9kZWxkYXRhfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdjcmVhdGVfYWxsb2NhdGUnLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NyZWF0ZV9maW5hbGl6ZSc6XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7bW9kZWxkYXRhLCBvcHRpb25zfSA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBjb25zdCBzZXNzaW9uTWV0YWRhdGEgPSBjcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdjcmVhdGVfZmluYWxpemUnLCBvdXQ6IHNlc3Npb25NZXRhZGF0YX0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAnY3JlYXRlX2ZpbmFsaXplJywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGUnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge21vZGVsLCBvcHRpb25zfSA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBjb25zdCBzZXNzaW9uTWV0YWRhdGEgPSBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdjcmVhdGUnLCBvdXQ6IHNlc3Npb25NZXRhZGF0YX0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAnY3JlYXRlJywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWxlYXNlJzpcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBldi5kYXRhLmluITtcbiAgICAgICAgcmVsZWFzZVNlc3Npb24oaGFuZGxlcik7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAncmVsZWFzZSd9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ3JlbGVhc2UnLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3J1bic6XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7c2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9uc30gPSBldi5kYXRhLmluITtcbiAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICBvdXRwdXRzID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAncnVuJywgb3V0OiBvdXRwdXRzfSBhcyBPcnRXYXNtTWVzc2FnZSwgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMob3V0cHV0cykpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAncnVuJywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdydW4nLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBlbmRQcm9maWxpbmcoaGFuZGxlcik7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAnZW5kLXByb2ZpbGluZyd9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2VuZC1wcm9maWxpbmcnLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBYTtBQUFiO0FBQUE7QUFBTyxNQUFNLFdBQVc7QUFBQTtBQUFBOzs7QUNBeEI7QUFBQTtBQUFBLGdCQUFBQTtBQUFBO0FBQUEsTUFBYUE7QUFBYjtBQUFBO0FBQU8sTUFBTUEsUUFBTztBQUFBO0FBQUE7OztBQ0FwQjtBQUFBO0FBQUE7QUFDQSxVQUFJLFdBQVcsTUFBTTtBQUNuQixZQUFJLGFBQWEsT0FBTyxhQUFhLGVBQWUsU0FBUyxnQkFBZ0IsU0FBUyxjQUFjLE1BQU07QUFDMUcsWUFBSSxPQUFPLGVBQWU7QUFBYSx1QkFBYSxjQUFjO0FBQ2xFLGVBQ0YsU0FBUyxZQUFZLENBQUMsR0FBRztBQUV6QixjQUFJLElBQUUsV0FBVSxJQUFHO0FBQUUsWUFBRSxRQUFNLElBQUksUUFBUSxDQUFDLEdBQUUsTUFBSTtBQUFDLGlCQUFHO0FBQUUsZ0JBQUU7QUFBQSxVQUFDLENBQUM7QUFBRSxjQUFJLEtBQUcsT0FBTyxPQUFPLENBQUMsR0FBRSxDQUFDLEdBQUUsS0FBRyxrQkFBaUIsS0FBRyxZQUFV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RyxJQUFFLEVBQUUsU0FBUyxJQUFFLENBQUMsS0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksSUFBRSxDQUFDO0FBQUEscUJBQU87QUFBQyxvQkFBRSxRQUFRLEVBQUUsUUFBUSxJQUFFLENBQUM7QUFBRTtBQUFBLGdCQUFLO0FBQUEsY0FBQztBQUFDLGtCQUFFLElBQUksS0FBSyxFQUFFLFlBQVksSUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLGtCQUFFLEVBQUUsSUFBSTtBQUFBLGdCQUFLLEVBQUUsWUFBWTtBQUFBLGdCQUNuZjtBQUFBLGdCQUFFO0FBQUEsY0FBQyxDQUFDO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUscUJBQU8sS0FBRyxFQUFFLEdBQUUsQ0FBQyxJQUFFLEtBQUcsRUFBRSxHQUFFLENBQUMsSUFBRSxFQUFFLFlBQVksSUFBRSxJQUFFLEVBQUUsWUFBWSxJQUFFLEVBQUUsWUFBWSxJQUFFO0FBQUEsWUFBQztBQUFDLGdCQUFJLElBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQztBQUFFLGdCQUFFLEVBQUMsSUFBRyxFQUFFLEtBQUcsQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLEtBQUcsQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLEtBQUcsQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsSUFBRSxJQUFFLEVBQUUsR0FBRSxDQUFDLElBQUUsS0FBRyxHQUFFO0FBQUUsZ0JBQUUsSUFBRSxFQUFFLEdBQUUsQ0FBQyxJQUFFO0FBQUcsZ0JBQUU7QUFBQSxjQUFDLE1BQUs7QUFBQSxjQUF1QixNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBSyxNQUFLO0FBQUEsY0FBYyxNQUFLO0FBQUEsY0FBUSxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FDamYsT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLFlBQUk7QUFBRSxxQkFBUSxLQUFLO0FBQUUsa0JBQUUsRUFBRSxRQUFRLElBQUksT0FBTyxHQUFFLEdBQUcsR0FBRSxFQUFFLENBQUMsQ0FBQztBQUFFLGdCQUFJLElBQUUsMkRBQTJELE1BQU0sR0FBRyxHQUFFLElBQUUsd0ZBQXdGLE1BQU0sR0FBRztBQUFFLGdCQUFFLEVBQUMsTUFBSyxPQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxHQUFFLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLE1BQUssT0FBRyxHQUFHLEVBQUUsS0FBRyxRQUNoZixNQUFJLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRyxHQUFFLE1BQUssT0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsa0JBQUUsRUFBRTtBQUFHLG1CQUFHLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSSxLQUFHO0FBQUkscUJBQU8sRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsdUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsS0FBRyxHQUFFLE1BQUksRUFBRSxFQUFFLEtBQUcsSUFBSSxJQUFFLEtBQUcsSUFBSSxHQUFHO0FBQUU7QUFBQyxxQkFBTyxFQUFFLEVBQUUsS0FBRyxHQUFFLENBQUM7QUFBQSxZQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxLQUFHLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxNQUFJLE1BQUssTUFBSyxPQUFHLEtBQUcsRUFBRSxNQUFJLEtBQUcsRUFBRSxLQUFHLE9BQUssTUFBSyxNQUFLLE9BQUcsRUFBRSxFQUFFLElBQUcsQ0FBQyxHQUFFLE1BQUssTUFBSSxLQUFLLE1BQUssT0FBRyxFQUFFLE1BQUksR0FBRSxNQUFLLE9BQUcsRUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFHLElBQUUsRUFBRSxNQUFJLENBQUMsR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsa0JBQUksSUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFHLEtBQUcsRUFBRSxLQUFHLEtBQUcsS0FBRyxDQUFDO0FBQUUsb0JBQUksRUFBRSxLQUFHLE1BQUksRUFBRSxLQUFHLEtBQ3BmLEtBQUc7QUFBSSxrQkFBRztBQUFFLHNCQUFJLE1BQUksS0FBRyxFQUFFLEtBQUcsTUFBSSxFQUFFLE1BQUksR0FBRSxLQUFHLEtBQUcsS0FBRyxLQUFHLEVBQUUsRUFBRSxFQUFFLE1BQUksSUFBRTtBQUFBLG1CQUFRO0FBQUMsb0JBQUU7QUFBRyxvQkFBSSxLQUFHLEVBQUUsS0FBRyxJQUFFLEVBQUUsS0FBRyxLQUFHO0FBQUUsaUJBQUMsS0FBRyxLQUFHLEtBQUcsS0FBRyxFQUFFLEVBQUUsS0FBRyxNQUFJLENBQUMsTUFBSTtBQUFBLGNBQUc7QUFBQyxxQkFBTyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxJQUFHLE1BQUssT0FBRyxFQUFFLEtBQUssT0FBTyxFQUFFLEtBQUcsS0FBRyxFQUFFLEtBQUcsS0FBRyxLQUFHLENBQUMsR0FBRSxDQUFDLEdBQUUsTUFBSyxRQUFJLEVBQUUsS0FBRyxNQUFNLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxLQUFHLE1BQUssTUFBSyxPQUFHO0FBQUMsa0JBQUUsRUFBRTtBQUFHLGtCQUFJLElBQUUsS0FBRztBQUFFLGtCQUFFLEtBQUssSUFBSSxDQUFDLElBQUU7QUFBRyxzQkFBTyxJQUFFLE1BQUksT0FBSyxPQUFPLFVBQVEsSUFBRSxLQUFHLE1BQUksSUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQUEsWUFBQyxHQUFFLE1BQUssT0FBRyxFQUFFLElBQUcsTUFBSyxNQUFJLElBQUc7QUFBRSxnQkFBRSxFQUFFLFFBQVEsT0FBTSxNQUFVO0FBQUUsaUJBQUksS0FBSztBQUFFLGdCQUFFLFNBQVMsQ0FBQyxNQUFJLElBQUUsRUFBRSxRQUFRLElBQUksT0FBTyxHQUFFLEdBQUcsR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFBRyxnQkFDcGYsRUFBRSxRQUFRLFNBQVEsR0FBRztBQUFFLGdCQUFFLEdBQUcsQ0FBQztBQUFFLGdCQUFHLEVBQUUsU0FBTztBQUFFLHFCQUFPO0FBQUUsY0FBRSxJQUFJLEdBQUUsQ0FBQztBQUFFLG1CQUFPLEVBQUUsU0FBTztBQUFBLFVBQUMsR0FBRSxLQUFHLE1BQU0sR0FBRyxHQUFFLEtBQUcsR0FBRSxNQUFJLElBQUcsRUFBRTtBQUFHLGVBQUcsRUFBRSxJQUFFLE9BQU8sYUFBYSxFQUFFO0FBQUUsZUFBRztBQUFHLGVBQUcsRUFBRSxlQUFhLGNBQWMsTUFBSztBQUFB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QUFFLE1BQUksR0FBRyxHQUFFLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFHO0FBQUUscUJBQU8sRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxtQkFBTyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLElBQUU7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUc7QUFBRSxxQkFBTyxFQUFFLElBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUc7QUFBRSxxQkFBTyxFQUFFLElBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFHO0FBQUUscUJBQU8sRUFBRSxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsSUFBRyxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQ3JkLG1CQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsZ0JB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QUFBRywyQkFBUyxHQUFHLENBQUMsSUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLEdBQUcsQ0FBQztBQUFFLGtCQUFJLElBQUUsQ0FBQztBQUFFLG1CQUFJLEtBQUs7QUFBRSxrQkFBRSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFBRSxtQkFBRztBQUFBLFlBQUM7QUFBQyxtQkFBTztBQUFBLFVBQUUsR0FBRTtBQUN0VyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFHO0FBQUUscUJBQU8sRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0FBQUUsZ0JBQUksSUFBRTtBQUFFLGVBQUcsRUFBRSxRQUFRLFNBQVMsR0FBRSxHQUFFO0FBQUMsa0JBQUksSUFBRSxJQUFFO0FBQUUsa0JBQUUsRUFBRSxFQUFFLElBQUUsSUFBRSxLQUFHLENBQUMsSUFBRTtBQUFFLG1CQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFO0FBQUUsa0JBQUUsRUFBRSxPQUFLLENBQUMsSUFBRSxFQUFFLFdBQVcsQ0FBQztBQUFFLGdCQUFFLEVBQUUsS0FBRyxDQUFDLElBQUU7QUFBRSxtQkFBRyxFQUFFLFNBQU87QUFBQSxZQUFDLENBQUM7QUFBRSxtQkFBTztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFHO0FBQUUscUJBQU8sRUFBRSxJQUFHLEdBQUUsR0FBRSxDQUFDO0FBQUUsZ0JBQUksSUFBRSxHQUFHO0FBQUUsY0FBRSxFQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUU7QUFBTyxnQkFBSSxJQUFFO0FBQUUsY0FBRSxRQUFRLFNBQVMsR0FBRTtBQUFDLG1CQUFHLEVBQUUsU0FBTztBQUFBLFlBQUMsQ0FBQztBQUFFLGNBQUUsRUFBRSxLQUFHLENBQUMsSUFBRTtBQUFFLG1CQUFPO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRTtBQUFDLG1CQUFPLElBQUUsRUFBRSxJQUFHLEdBQUUsQ0FBQyxJQUFFO0FBQUEsVUFB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LENBQUM7QUFBRSxrQkFBRSxFQUFFLENBQUM7QUFBRSxxQkFBTyxLQUFHLEVBQUUsR0FBRSxDQUFDLElBQUUsS0FBRyxFQUFFLEdBQUUsQ0FBQyxJQUFFLEVBQUUsWUFBWSxJQUFFLElBQUUsRUFBRSxZQUFZLElBQUUsRUFBRSxZQUFZLElBQUU7QUFBQSxZQUFDO0FBQUMsZ0JBQUksSUFBRSxFQUFFLEVBQUUsSUFBRSxNQUFJLENBQUM7QUFBRSxnQkFBRSxFQUFDLElBQUcsRUFBRSxFQUFFLEtBQUcsQ0FBQyxHQUFFLElBQUcsRUFBRSxFQUFFLElBQUUsS0FBRyxDQUFDLEdBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRSxLQUFHLENBQUMsR0FBRSxJQUFHLEVBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxFQUFFLElBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRSxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxFQUFFLElBQUUsTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRSxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUcsSUFBRSxHQUFHLENBQUMsSUFBRSxHQUFFO0FBQUUsZ0JBQUUsR0FBRyxDQUFDO0FBQUUsZ0JBQUU7QUFBQSxjQUFDLE1BQUs7QUFBQSxjQUF1QixNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBSyxNQUFLO0FBQUEsY0FBYyxNQUFLO0FBQUEsY0FBUSxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FDMWUsT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLFlBQUk7QUFBRSxxQkFBUSxLQUFLO0FBQUUsa0JBQUUsRUFBRSxRQUFRLElBQUksT0FBTyxHQUFFLEdBQUcsR0FBRSxFQUFFLENBQUMsQ0FBQztBQUFFLGdCQUFJLElBQUUsMkRBQTJELE1BQU0sR0FBRyxHQUFFLElBQUUsd0ZBQXdGLE1BQU0sR0FBRztBQUFFLGdCQUFFLEVBQUMsTUFBSyxPQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxHQUFFLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLE1BQUssT0FBRyxHQUFHLEVBQUUsS0FDeGYsUUFBTSxNQUFJLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRyxHQUFFLE1BQUssT0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsa0JBQUUsRUFBRTtBQUFHLG1CQUFHLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSSxLQUFHO0FBQUkscUJBQU8sRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsdUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsS0FBRyxHQUFFLE1BQUksRUFBRSxFQUFFLEtBQUcsSUFBSSxJQUFFLEtBQUcsSUFB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LENBQUM7QUFBRSxnQkFBRSxFQUFFLEtBQUcsQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLGdCQUFFLEVBQUUsSUFBRSxLQUFHLENBQUMsSUFBRSxFQUFFLFdBQVc7QUFBRSxnQkFBRSxFQUFFLElBQUUsS0FBRyxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQyxJQUFFLEVBQUUsUUFBUTtBQUFFLGdCQUFFLEVBQUUsSUFBRSxNQUFJLENBQUMsSUFBRSxFQUFFLFNBQVM7QUFBRSxnQkFBRSxFQUFFLElBQUUsTUFBSSxDQUFDLElBQ3JmLEVBQUUsWUFBWSxJQUFFO0FBQUssZ0JBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQyxJQUFFLEVBQUUsT0FBTztBQUFFLGtCQUFJLEtBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxJQUFFLEtBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFFLEVBQUUsUUFBUSxJQUFFLElBQUU7QUFBRSxnQkFBRSxFQUFFLElBQUUsTUFBSSxDQUFDLElBQUU7QUFBRSxnQkFBRSxFQUFFLElBQUUsTUFBSSxDQUFDLElBQUUsRUFBRSxLQUFHLEVBQUUsa0JBQWtCO0FBQUcsa0JBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQjtBQUFFLGtCQUFJLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQjtBQUFFLG1CQUFHLEtBQUcsS0FBRyxFQUFFLGtCQUFrQixLQUFHLEtBQUssSUFBSSxHQUFFLENBQUMsS0FBRztBQUFFLGdCQUFFLEVBQUUsSUFBRSxNQUFJLENBQUMsSUFBRTtBQUFBLFlBQUM7QUFBQSxZQUFFLEdBQUUsU0FBUyxHQUFFO0FBQUMsa0JBQUUsR0FBRyxDQUFDO0FBQUUsa0JBQUksSUFBRSxJQUFJLEtBQUssRUFBRSxFQUFFLElBQUUsTUFBSSxDQUFDLElBQUUsTUFBSyxFQUFFLEVBQUUsSUFBRSxNQUFJLENBQUMsR0FBRSxFQUFFLEVBQUUsSUFBRSxNQUFJ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O0FBQUEsUUFBSTtBQUFBLFFBQUc7QUFBQSxRQUNuRTtBQUFBLFFBQUc7QUFBQSxRQUFJO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFHO0FBQUEsUUFBSTtBQUFBLFFBQUk7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFJO0FBQUEsUUFBSTtBQUFBLFFBQUs7QUFBQSxRQUFJO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFJO0FBQUEsTUFDbEUsQ0FBQyxDQUFDO0FBQUEsSUFDSixTQUFTLEdBQUc7QUFDVixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxNQUFNLGtCQUFrQixNQUFlO0FBQ3JDLFFBQUk7QUFlRixhQUFPLFlBQVksU0FBUyxJQUFJLFdBQVc7QUFBQSxRQUN6QztBQUFBLFFBQUs7QUFBQSxRQUFJO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBSTtBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUk7QUFBQSxRQUFJO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFHO0FBQUEsUUFBSTtBQUFBLFFBQ3ZGO0FBQUEsUUFBSztBQUFBLFFBQUk7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFJO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBRztBQUFBLFFBQUc7QUFBQSxRQUFHO0FBQUEsUUFBSTtBQUFBLFFBQUk7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUc7QUFBQSxRQUFJO0FBQUEsTUFDekYsQ0FBQyxDQUFDO0FBQUEsSUFDSixTQUFTLEdBQUc7QUFDVixhQUFPO0FBQUEsSUFDVDtB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QUN0RSxTQUFTLEtBQUs7QUFDWixzQkFBWSxFQUFDLE1BQU0sVUFBVSxJQUFHLENBQW1CO0FBQUEsUUFDckQ7QUFDQTtBQUFBLE1BQ0YsS0FBSztBQUNILFlBQUk7QUFDRixnQkFBTSxVQUFVLEdBQUcsS0FBSztBQUN4Qix5QkFBZSxPQUFPO0FBQ3RCLHNCQUFZLEVBQUMsTUFBTSxVQUFTLENBQW1CO0FBQUEsUUFDakQsU0FBUyxLQUFLO0FBQ1osc0JBQVksRUFBQyxNQUFNLFdBQVcsSUFBRyxDQUFtQjtBQUFBLFFBQ3REO0FBQ0E7QUFBQSxNQUNGLEtBQUs7QUFDSCxZQUFJO0FBQ0YsZ0JBQU0sRUFBQyxXQUFXLGNBQWMsUUFBUSxlQUFlLFFBQU8sSUFBSSxHQUFHLEtBQUs7QUFDMUUsY0FBSSxXQUFXLGNBQWMsUUFBUSxlQUFlLE9BQU8sRUFDdEQ7QUFBQSxZQUNHLGFBQVc7QUFDVCwwQkFBWSxFQUFDLE1BQU0sT0FBTyxLQUFLLFFBQU8sR0FBcUIsMkJBQTJCLE9BQU8sQ0FBQztBQUFBLFlBQ2hHO0FBQUEsWUFDQSxTQUFPO0FBQ0wsMEJBQVksRUFBQyxNQUFNLE9BQU8sSUFBRyxDQUFtQjtBQUFBLFlBQ2xEO0FBQUEsVUFBQztBQUFBLFFBQ1gsU0FBUyxLQUFLO0FBQ1osc0JBQVksRUFBQyxNQUFNLE9BQU8sSUFBRyxDQUFtQjtBQUFBLFFBQ2xEO0FBQ0E7QUFBQSxNQUNGLEtBQUs7QUFDSCxZQUFJO0FBQ0YsZ0JBQU0sVUFBVSxHQUFHLEtBQUs7QUFDeEIsdUJBQWEsT0FBTztBQUNwQixzQkFBWSxFQUFDLE1BQU0sZ0JBQWUsQ0FBbUI7QUFBQSxRQUN2RCxTQUFTLEtBQUs7QUFDWixzQkFBWSxFQUFDLE1BQU0saUJBQWlCLElBQUcsQ0FBbUI7QUFBQSxRQUM1RDtBQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGOyIsCiAgIm5hbWVzIjogWyJqb2luIiwgIndhc20iLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIl0KfQo=\n';
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
  var backend_wasm_exports = {};
  __export(backend_wasm_exports, {
    initializeFlags: () => initializeFlags,
    wasmBackend: () => wasmBackend
  });
  var initializeFlags, OnnxruntimeWebAssemblyBackend, wasmBackend;
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
      wasmBackend = new OnnxruntimeWebAssemblyBackend();
    }
  });

  // web/lib/index.ts
  var lib_exports = {};
  __export(lib_exports, {
    InferenceSession: () => InferenceSession2,
    Tensor: () => Tensor2,
    TrainingSession: () => TrainingSession2,
    env: () => env2,
    registerBackend: () => registerBackend
  });
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
    const wasmBackend2 = (init_backend_wasm(), __toCommonJS(backend_wasm_exports)).wasmBackend;
    if (false) {
      registerBackend("webgpu", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
    registerBackend("xnnpack", wasmBackend2, 9);
    registerBackend("webnn", wasmBackend2, 9);
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(lib_exports);
})();