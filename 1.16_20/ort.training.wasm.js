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

  // web/lib/wasm/binding/ort-training-wasm-simd.js
  var require_ort_training_wasm_simd = __commonJS({
    "web/lib/wasm/binding/ort-training-wasm-simd.js"(exports, module) {
      "use strict";
      var ortWasm = (() => {
        var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
        if (typeof __filename !== "undefined")
          _scriptDir = _scriptDir || __filename;
        return function(moduleArg = {}) {
          var d = moduleArg, k, l;
          d.ready = new Promise((a, b) => {
            k = a;
            l = b;
          });
          var r = Object.assign({}, d), v = "./this.program", aa = "object" == typeof window, x = "function" == typeof importScripts, ba = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, y = "", A, B, C;
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
            !d.thisProgram && 1 < process.argv.length && (v = process.argv[1].replace(/\\/g, "/"));
            process.argv.slice(2);
            d.inspect = () => "[Emscripten Module object]";
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
          var ca = d.print || console.log.bind(console), E = d.printErr || console.error.bind(console);
          Object.assign(d, r);
          r = null;
          d.thisProgram && (v = d.thisProgram);
          var F;
          d.wasmBinary && (F = d.wasmBinary);
          var noExitRuntime = d.noExitRuntime || true;
          "object" != typeof WebAssembly && G("no native wasm support detected");
          var H, I, da = false, J, K, L, M;
          function ea() {
            var a = H.buffer;
            d.HEAP8 = J = new Int8Array(a);
            d.HEAP16 = new Int16Array(a);
            d.HEAP32 = L = new Int32Array(a);
            d.HEAPU8 = K = new Uint8Array(a);
            d.HEAPU16 = new Uint16Array(a);
            d.HEAPU32 = M = new Uint32Array(a);
            d.HEAPF32 = new Float32Array(a);
            d.HEAPF64 = new Float64Array(a);
          }
          var fa = [], ha = [], ia = [];
          function ja() {
            var a = d.preRun.shift();
            fa.unshift(a);
          }
          var N = 0, O = null, P = null;
          function G(a) {
            if (d.onAbort)
              d.onAbort(a);
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
          Q = "ort-training-wasm-simd.wasm";
          if (!ka(Q)) {
            var la = Q;
            Q = d.locateFile ? d.locateFile(la, y) : y + la;
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
              a.shift()(d);
          };
          function qa(a) {
            this.Ha = a - 24;
            this.La = function(b) {
              M[this.Ha + 4 >> 2 >>> 0] = b;
            };
            this.Ka = function(b) {
              M[this.Ha + 8 >> 2 >>> 0] = b;
            };
            this.Ia = function(b, c) {
              this.Ja();
              this.La(b);
              this.Ka(c);
            };
            this.Ja = function() {
              M[this.Ha + 16 >> 2 >>> 0] = 0;
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
                var q = a.charCodeAt(++h);
                m = 65536 + ((m & 1023) << 10) | q & 1023;
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
            function g(e, n, p) {
              for (e = "number" == typeof e ? e.toString() : e || ""; e.length < n; )
                e = p[0] + e;
              return e;
            }
            function h(e, n) {
              return g(e, n, "0");
            }
            function m(e, n) {
              function p(xa) {
                return 0 > xa ? -1 : 0 < xa ? 1 : 0;
              }
              var z;
              0 === (z = p(e.getFullYear() - n.getFullYear())) && 0 === (z = p(e.getMonth() - n.getMonth())) && (z = p(e.getDate() - n.getDate()));
              return z;
            }
            function q(e) {
              switch (e.getDay()) {
                case 0:
                  return new Date(e.getFullYear() - 1, 11, 29);
                case 1:
                  return e;
                case 2:
                  return new Date(e.getFullYear(), 0, 3);
                case 3:
                  return new Date(
                    e.getFullYear(),
                    0,
                    2
                  );
                case 4:
                  return new Date(e.getFullYear(), 0, 1);
                case 5:
                  return new Date(e.getFullYear() - 1, 11, 31);
                case 6:
                  return new Date(e.getFullYear() - 1, 11, 30);
              }
            }
            function w(e) {
              var n = e.Ca;
              for (e = new Date(new Date(e.Da + 1900, 0, 1).getTime()); 0 < n; ) {
                var p = e.getMonth(), z = (W(e.getFullYear()) ? Ea : Fa)[p];
                if (n > z - e.getDate())
                  n -= z - e.getDate() + 1, e.setDate(1), 11 > p ? e.setMonth(p + 1) : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));
                else {
                  e.setDate(e.getDate() + n);
                  break;
                }
              }
              p = new Date(e.getFullYear() + 1, 0, 4);
              n = q(new Date(
                e.getFullYear(),
                0,
                4
              ));
              p = q(p);
              return 0 >= m(n, e) ? 0 >= m(p, e) ? e.getFullYear() + 1 : e.getFullYear() : e.getFullYear() - 1;
            }
            a >>>= 0;
            b >>>= 0;
            c >>>= 0;
            f >>>= 0;
            var t = L[f + 40 >> 2 >>> 0];
            f = { Oa: L[f >> 2 >>> 0], Na: L[f + 4 >> 2 >>> 0], Ea: L[f + 8 >> 2 >>> 0], Ga: L[f + 12 >> 2 >>> 0], Fa: L[f + 16 >> 2 >>> 0], Da: L[f + 20 >> 2 >>> 0], xa: L[f + 24 >> 2 >>> 0], Ca: L[f + 28 >> 2 >>> 0], Qa: L[f + 32 >> 2 >>> 0], Ma: L[f + 36 >> 2 >>> 0], Pa: t ? T(t) : "" };
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
            t = { "%a": (e) => ya[e.xa].substring(0, 3), "%A": (e) => ya[e.xa], "%b": (e) => za[e.Fa].substring(0, 3), "%B": (e) => za[e.Fa], "%C": (e) => h((e.Da + 1900) / 100 | 0, 2), "%d": (e) => h(e.Ga, 2), "%e": (e) => g(e.Ga, 2, " "), "%g": (e) => w(e).toString().substring(2), "%G": (e) => w(e), "%H": (e) => h(e.Ea, 2), "%I": (e) => {
              e = e.Ea;
              0 == e ? e = 12 : 12 < e && (e -= 12);
              return h(e, 2);
            }, "%j": (e) => {
              for (var n = 0, p = 0; p <= e.Fa - 1; n += (W(e.Da + 1900) ? Ea : Fa)[p++])
                ;
              return h(e.Ga + n, 3);
            }, "%m": (e) => h(e.Fa + 1, 2), "%M": (e) => h(e.Na, 2), "%n": () => "\n", "%p": (e) => 0 <= e.Ea && 12 > e.Ea ? "AM" : "PM", "%S": (e) => h(e.Oa, 2), "%t": () => "	", "%u": (e) => e.xa || 7, "%U": (e) => h(Math.floor((e.Ca + 7 - e.xa) / 7), 2), "%V": (e) => {
              var n = Math.floor((e.Ca + 7 - (e.xa + 6) % 7) / 7);
              2 >= (e.xa + 371 - e.Ca - 2) % 7 && n++;
              if (n)
                53 == n && (p = (e.xa + 371 - e.Ca) % 7, 4 == p || 3 == p && W(e.Da) || (n = 1));
              else {
                n = 52;
                var p = (e.xa + 7 - e.Ca - 1) % 7;
                (4 == p || 5 == p && W(e.Da % 400 - 1)) && n++;
              }
              return h(n, 2);
            }, "%w": (e) => e.xa, "%W": (e) => h(Math.floor((e.Ca + 7 - (e.xa + 6) % 7) / 7), 2), "%y": (e) => (e.Da + 1900).toString().substring(2), "%Y": (e) => e.Da + 1900, "%z": (e) => {
              e = e.Ma;
              var n = 0 <= e;
              e = Math.abs(e) / 60;
              return (n ? "+" : "-") + String("0000" + (e / 60 * 100 + e % 60)).slice(-4);
            }, "%Z": (e) => e.Pa, "%%": () => "%" };
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
              new qa(a).Ia(b >>> 0, c >>> 0);
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
              var q = m.getTimezoneOffset();
              M[a >>> 0 >> 2 >>> 0] = 60 * Math.max(g, q);
              L[b >>> 0 >> 2 >>> 0] = Number(g != q);
              a = f(h);
              b = f(m);
              a = Ba(a);
              b = Ba(b);
              q < g ? (M[c >> 2 >>> 0] = a, M[c + 4 >> 2 >>> 0] = b) : (M[c >> 2 >>> 0] = b, M[c + 4 >> 2 >>> 0] = a);
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
                var m = M[b >> 2 >>> 0], q = M[b + 4 >> 2 >>> 0];
                b += 8;
                for (var w = 0; w < q; w++) {
                  var t = K[m + w >>> 0], u = Da[a];
                  0 === t || 10 === t ? ((1 === a ? ca : E)(ua(u, 0)), u.length = 0) : u.push(t);
                }
                g += q;
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
              d.monitorRunDependencies && d.monitorRunDependencies(N);
              if (0 == N && (null !== O && (clearInterval(O), O = null), P)) {
                var f = P;
                P = null;
                f();
              }
              return c;
            }
            var b = { a: Ja };
            N++;
            d.monitorRunDependencies && d.monitorRunDependencies(N);
            if (d.instantiateWasm)
              try {
                return d.instantiateWasm(b, a);
              } catch (c) {
                E("Module.instantiateWasm callback failed with error: " + c), l(c);
              }
            pa(b, function(c) {
              a(c.instance);
            }).catch(l);
            return {};
          })();
          d._OrtInit = (a, b) => (d._OrtInit = I.L)(a, b);
          d._OrtGetLastError = (a, b) => (d._OrtGetLastError = I.M)(a, b);
          d._OrtCreateSessionOptions = (a, b, c, f, g, h, m, q, w, t) => (d._OrtCreateSessionOptions = I.N)(a, b, c, f, g, h, m, q, w, t);
          d._OrtAppendExecutionProvider = (a, b) => (d._OrtAppendExecutionProvider = I.O)(a, b);
          d._OrtAddFreeDimensionOverride = (a, b, c) => (d._OrtAddFreeDimensionOverride = I.P)(a, b, c);
          d._OrtAddSessionConfigEntry = (a, b, c) => (d._OrtAddSessionConfigEntry = I.Q)(a, b, c);
          d._OrtReleaseSessionOptions = (a) => (d._OrtReleaseSessionOptions = I.R)(a);
          d._OrtCreateSession = (a, b, c) => (d._OrtCreateSession = I.S)(a, b, c);
          d._OrtReleaseSession = (a) => (d._OrtReleaseSession = I.T)(a);
          d._OrtGetInputOutputCount = (a, b, c) => (d._OrtGetInputOutputCount = I.U)(a, b, c);
          d._OrtGetInputName = (a, b) => (d._OrtGetInputName = I.V)(a, b);
          d._OrtGetOutputName = (a, b) => (d._OrtGetOutputName = I.W)(a, b);
          d._OrtFree = (a) => (d._OrtFree = I.X)(a);
          d._OrtCreateTensor = (a, b, c, f, g, h) => (d._OrtCreateTensor = I.Y)(a, b, c, f, g, h);
          d._OrtGetTensorData = (a, b, c, f, g) => (d._OrtGetTensorData = I.Z)(a, b, c, f, g);
          d._OrtReleaseTensor = (a) => (d._OrtReleaseTensor = I._)(a);
          d._OrtCreateRunOptions = (a, b, c, f) => (d._OrtCreateRunOptions = I.$)(a, b, c, f);
          d._OrtAddRunConfigEntry = (a, b, c) => (d._OrtAddRunConfigEntry = I.aa)(a, b, c);
          d._OrtReleaseRunOptions = (a) => (d._OrtReleaseRunOptions = I.ba)(a);
          d._OrtCreateBinding = (a) => (d._OrtCreateBinding = I.ca)(a);
          d._OrtBindInput = (a, b, c) => (d._OrtBindInput = I.da)(a, b, c);
          d._OrtBindOutput = (a, b, c, f) => (d._OrtBindOutput = I.ea)(a, b, c, f);
          d._OrtClearBoundOutputs = (a) => (d._OrtClearBoundOutputs = I.fa)(a);
          d._OrtReleaseBinding = (a) => (d._OrtReleaseBinding = I.ga)(a);
          d._OrtRunWithBinding = (a, b, c, f, g) => (d._OrtRunWithBinding = I.ha)(a, b, c, f, g);
          d._OrtRun = (a, b, c, f, g, h, m, q) => (d._OrtRun = I.ia)(a, b, c, f, g, h, m, q);
          d._OrtEndProfiling = (a) => (d._OrtEndProfiling = I.ja)(a);
          d._OrtTrainingLoadCheckpoint = (a, b) => (d._OrtTrainingLoadCheckpoint = I.ka)(a, b);
          d._OrtTrainingReleaseCheckpoint = (a) => (d._OrtTrainingReleaseCheckpoint = I.la)(a);
          d._OrtTrainingCreateSession = (a, b, c, f, g, h, m, q) => (d._OrtTrainingCreateSession = I.ma)(a, b, c, f, g, h, m, q);
          d._OrtTrainingLazyResetGrad = (a) => (d._OrtTrainingLazyResetGrad = I.na)(a);
          d._OrtTrainingRunTrainStep = (a, b, c, f, g, h) => (d._OrtTrainingRunTrainStep = I.oa)(a, b, c, f, g, h);
          d._OrtTrainingOptimizerStep = (a, b) => (d._OrtTrainingOptimizerStep = I.pa)(a, b);
          d._OrtTrainingEvalStep = (a, b, c, f, g, h) => (d._OrtTrainingEvalStep = I.qa)(a, b, c, f, g, h);
          d._OrtTrainingGetParametersSize = (a, b, c) => (d._OrtTrainingGetParametersSize = I.ra)(a, b, c);
          d._OrtTrainingCopyParametersToBuffer = (a, b, c, f) => (d._OrtTrainingCopyParametersToBuffer = I.sa)(a, b, c, f);
          d._OrtTrainingCopyParametersFromBuffer = (a, b, c, f) => (d._OrtTrainingCopyParametersFromBuffer = I.ta)(a, b, c, f);
          d._OrtTrainingReleaseSession = (a) => (d._OrtTrainingReleaseSession = I.ua)(a);
          var Aa = d._malloc = (a) => (Aa = d._malloc = I.va)(a);
          d._free = (a) => (d._free = I.wa)(a);
          var Ia = (a) => (Ia = I.ya)(a), La = () => (La = I.za)(), Ma = (a) => (Ma = I.Aa)(a), Na = (a) => (Na = I.Ba)(a);
          function Ka(a) {
            a = Object.assign({}, a);
            var b = (f) => () => f() >>> 0, c = (f) => (g) => f(g) >>> 0;
            a.__errno_location = b(a.__errno_location);
            a.malloc = c(a.malloc);
            a.stackSave = b(a.stackSave);
            a.stackAlloc = c(a.stackAlloc);
            return a;
          }
          d.stackAlloc = Na;
          d.stackSave = La;
          d.stackRestore = Ma;
          d.UTF8ToString = T;
          d.stringToUTF8 = (a, b, c) => V(a, K, b, c);
          d.lengthBytesUTF8 = U;
          var Z;
          P = function Oa() {
            Z || Pa();
            Z || (P = Oa);
          };
          function Pa() {
            function a() {
              if (!Z && (Z = true, d.calledRun = true, !da)) {
                S(ha);
                k(d);
                if (d.onRuntimeInitialized)
                  d.onRuntimeInitialized();
                if (d.postRun)
                  for ("function" == typeof d.postRun && (d.postRun = [d.postRun]); d.postRun.length; ) {
                    var b = d.postRun.shift();
                    ia.unshift(b);
                  }
                S(ia);
              }
            }
            if (!(0 < N)) {
              if (d.preRun)
                for ("function" == typeof d.preRun && (d.preRun = [d.preRun]); d.preRun.length; )
                  ja();
              S(fa);
              0 < N || (d.setStatus ? (d.setStatus("Running..."), setTimeout(function() {
                setTimeout(function() {
                  d.setStatus("");
                }, 1);
                a();
              }, 1)) : a());
            }
          }
          if (d.preInit)
            for ("function" == typeof d.preInit && (d.preInit = [d.preInit]); 0 < d.preInit.length; )
              d.preInit.pop()();
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
      if (true) {
        ortWasmFactory = require_ort_training_wasm_simd();
      } else {
        ortWasmFactory = true ? null : null;
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
          if (true) {
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
      module.exports = '/*!\n * ONNX Runtime Web v1.17.0\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Licensed under the MIT License.\n */\n"use strict";\n(() => {\n  var __defProp = Object.defineProperty;\n  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;\n  var __getOwnPropNames = Object.getOwnPropertyNames;\n  var __hasOwnProp = Object.prototype.hasOwnProperty;\n  var __esm = (fn, res) => function __init() {\n    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;\n  };\n  var __commonJS = (cb, mod) => function __require() {\n    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;\n  };\n  var __export = (target, all) => {\n    for (var name in all)\n      __defProp(target, name, { get: all[name], enumerable: true });\n  };\n  var __copyProps = (to, from, except, desc) => {\n    if (from && typeof from === "object" || typeof from === "function") {\n      for (let key of __getOwnPropNames(from))\n        if (!__hasOwnProp.call(to, key) && key !== except)\n          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n    }\n    return to;\n  };\n  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);\n\n  // nodejs-ignore:fs\n  var fs_exports = {};\n  __export(fs_exports, {\n    readFile: () => readFile\n  });\n  var readFile;\n  var init_fs = __esm({\n    "nodejs-ignore:fs"() {\n      readFile = void 0;\n    }\n  });\n\n  // nodejs-ignore:path\n  var path_exports = {};\n  __export(path_exports, {\n    join: () => join2\n  });\n  var join2;\n  var init_path = __esm({\n    "nodejs-ignore:path"() {\n      join2 = void 0;\n    }\n  });\n\n  // web/lib/wasm/binding/ort-training-wasm-simd.js\n  var require_ort_training_wasm_simd = __commonJS({\n    "web/lib/wasm/binding/ort-training-wasm-simd.js"(exports, module) {\n      "use strict";\n      var ortWasm = (() => {\n        var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;\n        if (typeof __filename !== "undefined")\n          _scriptDir = _scriptDir || __filename;\n        return function(moduleArg = {}) {\n          var d = moduleArg, k, l;\n          d.ready = new Promise((a, b) => {\n            k = a;\n            l = b;\n          });\n          var r = Object.assign({}, d), v = "./this.program", aa = "object" == typeof window, x = "function" == typeof importScripts, ba = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, y = "", A, B, C;\n          if (ba) {\n            var fs = (init_fs(), __toCommonJS(fs_exports)), D = (init_path(), __toCommonJS(path_exports));\n            y = x ? D.dirname(y) + "/" : __dirname + "/";\n            A = (a, b) => {\n              a = a.startsWith("file://") ? new URL(a) : D.normalize(a);\n              return fs.readFileSync(a, b ? void 0 : "utf8");\n            };\n            C = (a) => {\n              a = A(a, true);\n              a.buffer || (a = new Uint8Array(a));\n              return a;\n            };\n            B = (a, b, c, f = true) => {\n              a = a.startsWith("file://") ? new URL(a) : D.normalize(a);\n              fs.readFile(a, f ? void 0 : "utf8", (g, h) => {\n                g ? c(g) : b(f ? h.buffer : h);\n              });\n            };\n            !d.thisProgram && 1 < process.argv.length && (v = process.argv[1].replace(/\\\\/g, "/"));\n            process.argv.slice(2);\n            d.inspect = () => "[Emscripten Module object]";\n          } else if (aa || x)\n            x ? y = self.location.href : "undefined" != typeof document && document.currentScript && (y = document.currentScript.src), _scriptDir && (y = _scriptDir), 0 !== y.indexOf("blob:") ? y = y.substr(0, y.replace(/[?#].*/, "").lastIndexOf("/") + 1) : y = "", A = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.send(null);\n              return b.responseText;\n            }, x && (C = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.responseType = "arraybuffer";\n              b.send(null);\n              return new Uint8Array(b.response);\n            }), B = (a, b, c) => {\n              var f = new XMLHttpRequest();\n              f.open("GET", a, true);\n              f.responseType = "arraybuffer";\n              f.onload = () => {\n                200 == f.status || 0 == f.status && f.response ? b(f.response) : c();\n              };\n              f.onerror = c;\n              f.send(null);\n            };\n          var ca = d.print || console.log.bind(console), E = d.printErr || console.error.bind(console);\n          Object.assign(d, r);\n          r = null;\n          d.thisProgram && (v = d.thisProgram);\n          var F;\n          d.wasmBinary && (F = d.wasmBinary);\n          var noExitRuntime = d.noExitRuntime || true;\n          "object" != typeof WebAssembly && G("no native wasm support detected");\n          var H, I, da = false, J, K, L, M;\n          function ea() {\n            var a = H.buffer;\n            d.HEAP8 = J = new Int8Array(a);\n            d.HEAP16 = new Int16Array(a);\n            d.HEAP32 = L = new Int32Array(a);\n            d.HEAPU8 = K = new Uint8Array(a);\n            d.HEAPU16 = new Uint16Array(a);\n            d.HEAPU32 = M = new Uint32Array(a);\n            d.HEAPF32 = new Float32Array(a);\n            d.HEAPF64 = new Float64Array(a);\n          }\n          var fa = [], ha = [], ia = [];\n          function ja() {\n            var a = d.preRun.shift();\n            fa.unshift(a);\n          }\n          var N = 0, O = null, P = null;\n          function G(a) {\n            if (d.onAbort)\n              d.onAbort(a);\n            a = "Aborted(" + a + ")";\n            E(a);\n            da = true;\n            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");\n            l(a);\n            throw a;\n          }\n          function ka(a) {\n            return a.startsWith("data:application/octet-stream;base64,");\n          }\n          var Q;\n          Q = "ort-training-wasm-simd.wasm";\n          if (!ka(Q)) {\n            var la = Q;\n            Q = d.locateFile ? d.locateFile(la, y) : y + la;\n          }\n          function ma(a) {\n            if (a == Q && F)\n              return new Uint8Array(F);\n            if (C)\n              return C(a);\n            throw "both async and sync fetching of the wasm failed";\n          }\n          function na(a) {\n            if (!F && (aa || x)) {\n              if ("function" == typeof fetch && !a.startsWith("file://"))\n                return fetch(a, { credentials: "same-origin" }).then((b) => {\n                  if (!b.ok)\n                    throw "failed to load wasm binary file at \'" + a + "\'";\n                  return b.arrayBuffer();\n                }).catch(() => ma(a));\n              if (B)\n                return new Promise((b, c) => {\n                  B(a, (f) => b(new Uint8Array(f)), c);\n                });\n            }\n            return Promise.resolve().then(() => ma(a));\n          }\n          function oa(a, b, c) {\n            return na(a).then((f) => WebAssembly.instantiate(f, b)).then((f) => f).then(c, (f) => {\n              E("failed to asynchronously prepare wasm: " + f);\n              G(f);\n            });\n          }\n          function pa(a, b) {\n            var c = Q;\n            return F || "function" != typeof WebAssembly.instantiateStreaming || ka(c) || c.startsWith("file://") || ba || "function" != typeof fetch ? oa(c, a, b) : fetch(c, { credentials: "same-origin" }).then((f) => WebAssembly.instantiateStreaming(f, a).then(b, function(g) {\n              E("wasm streaming compile failed: " + g);\n              E("falling back to ArrayBuffer instantiation");\n              return oa(c, a, b);\n            }));\n          }\n          var R, S = (a) => {\n            for (; 0 < a.length; )\n              a.shift()(d);\n          };\n          function qa(a) {\n            this.Ha = a - 24;\n            this.La = function(b) {\n              M[this.Ha + 4 >> 2 >>> 0] = b;\n            };\n            this.Ka = function(b) {\n              M[this.Ha + 8 >> 2 >>> 0] = b;\n            };\n            this.Ia = function(b, c) {\n              this.Ja();\n              this.La(b);\n              this.Ka(c);\n            };\n            this.Ja = function() {\n              M[this.Ha + 16 >> 2 >>> 0] = 0;\n            };\n          }\n          var ra = 0, sa = 0, ta = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, ua = (a, b, c) => {\n            b >>>= 0;\n            var f = b + c;\n            for (c = b; a[c] && !(c >= f); )\n              ++c;\n            if (16 < c - b && a.buffer && ta)\n              return ta.decode(a.subarray(b, c));\n            for (f = ""; b < c; ) {\n              var g = a[b++];\n              if (g & 128) {\n                var h = a[b++] & 63;\n                if (192 == (g & 224))\n                  f += String.fromCharCode((g & 31) << 6 | h);\n                else {\n                  var m = a[b++] & 63;\n                  g = 224 == (g & 240) ? (g & 15) << 12 | h << 6 | m : (g & 7) << 18 | h << 12 | m << 6 | a[b++] & 63;\n                  65536 > g ? f += String.fromCharCode(g) : (g -= 65536, f += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023));\n                }\n              } else\n                f += String.fromCharCode(g);\n            }\n            return f;\n          }, T = (a, b) => (a >>>= 0) ? ua(K, a, b) : "", U = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var f = a.charCodeAt(c);\n              127 >= f ? b++ : 2047 >= f ? b += 2 : 55296 <= f && 57343 >= f ? (b += 4, ++c) : b += 3;\n            }\n            return b;\n          }, V = (a, b, c, f) => {\n            c >>>= 0;\n            if (!(0 < f))\n              return 0;\n            var g = c;\n            f = c + f - 1;\n            for (var h = 0; h < a.length; ++h) {\n              var m = a.charCodeAt(h);\n              if (55296 <= m && 57343 >= m) {\n                var q = a.charCodeAt(++h);\n                m = 65536 + ((m & 1023) << 10) | q & 1023;\n              }\n              if (127 >= m) {\n                if (c >= f)\n                  break;\n                b[c++ >>> 0] = m;\n              } else {\n                if (2047 >= m) {\n                  if (c + 1 >= f)\n                    break;\n                  b[c++ >>> 0] = 192 | m >> 6;\n                } else {\n                  if (65535 >= m) {\n                    if (c + 2 >= f)\n                      break;\n                    b[c++ >>> 0] = 224 | m >> 12;\n                  } else {\n                    if (c + 3 >= f)\n                      break;\n                    b[c++ >>> 0] = 240 | m >> 18;\n                    b[c++ >>> 0] = 128 | m >> 12 & 63;\n                  }\n                  b[c++ >>> 0] = 128 | m >> 6 & 63;\n                }\n                b[c++ >>> 0] = 128 | m & 63;\n              }\n            }\n            b[c >>> 0] = 0;\n            return c - g;\n          }, W = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), va = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], wa = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ba = (a) => {\n            var b = U(a) + 1, c = Aa(b);\n            c && V(a, K, c, b);\n            return c;\n          }, X = {}, Ca = () => {\n            if (!Y) {\n              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace(\n                "-",\n                "_"\n              ) + ".UTF-8", _: v || "./this.program" }, b;\n              for (b in X)\n                void 0 === X[b] ? delete a[b] : a[b] = X[b];\n              var c = [];\n              for (b in a)\n                c.push(`${b}=${a[b]}`);\n              Y = c;\n            }\n            return Y;\n          }, Y, Da = [null, [], []], Ea = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Fa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];\n          function Ga(a) {\n            var b = Array(U(a) + 1);\n            V(a, b, 0, b.length);\n            return b;\n          }\n          function Ha(a, b, c, f) {\n            function g(e, n, p) {\n              for (e = "number" == typeof e ? e.toString() : e || ""; e.length < n; )\n                e = p[0] + e;\n              return e;\n            }\n            function h(e, n) {\n              return g(e, n, "0");\n            }\n            function m(e, n) {\n              function p(xa) {\n                return 0 > xa ? -1 : 0 < xa ? 1 : 0;\n              }\n              var z;\n              0 === (z = p(e.getFullYear() - n.getFullYear())) && 0 === (z = p(e.getMonth() - n.getMonth())) && (z = p(e.getDate() - n.getDate()));\n              return z;\n            }\n            function q(e) {\n              switch (e.getDay()) {\n                case 0:\n                  return new Date(e.getFullYear() - 1, 11, 29);\n                case 1:\n                  return e;\n                case 2:\n                  return new Date(e.getFullYear(), 0, 3);\n                case 3:\n                  return new Date(\n                    e.getFullYear(),\n                    0,\n                    2\n                  );\n                case 4:\n                  return new Date(e.getFullYear(), 0, 1);\n                case 5:\n                  return new Date(e.getFullYear() - 1, 11, 31);\n                case 6:\n                  return new Date(e.getFullYear() - 1, 11, 30);\n              }\n            }\n            function w(e) {\n              var n = e.Ca;\n              for (e = new Date(new Date(e.Da + 1900, 0, 1).getTime()); 0 < n; ) {\n                var p = e.getMonth(), z = (W(e.getFullYear()) ? Ea : Fa)[p];\n                if (n > z - e.getDate())\n                  n -= z - e.getDate() + 1, e.setDate(1), 11 > p ? e.setMonth(p + 1) : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));\n                else {\n                  e.setDate(e.getDate() + n);\n                  break;\n                }\n              }\n              p = new Date(e.getFullYear() + 1, 0, 4);\n              n = q(new Date(\n                e.getFullYear(),\n                0,\n                4\n              ));\n              p = q(p);\n              return 0 >= m(n, e) ? 0 >= m(p, e) ? e.getFullYear() + 1 : e.getFullYear() : e.getFullYear() - 1;\n            }\n            a >>>= 0;\n            b >>>= 0;\n            c >>>= 0;\n            f >>>= 0;\n            var t = L[f + 40 >> 2 >>> 0];\n            f = { Oa: L[f >> 2 >>> 0], Na: L[f + 4 >> 2 >>> 0], Ea: L[f + 8 >> 2 >>> 0], Ga: L[f + 12 >> 2 >>> 0], Fa: L[f + 16 >> 2 >>> 0], Da: L[f + 20 >> 2 >>> 0], xa: L[f + 24 >> 2 >>> 0], Ca: L[f + 28 >> 2 >>> 0], Qa: L[f + 32 >> 2 >>> 0], Ma: L[f + 36 >> 2 >>> 0], Pa: t ? T(t) : "" };\n            c = T(c);\n            t = {\n              "%c": "%a %b %d %H:%M:%S %Y",\n              "%D": "%m/%d/%y",\n              "%F": "%Y-%m-%d",\n              "%h": "%b",\n              "%r": "%I:%M:%S %p",\n              "%R": "%H:%M",\n              "%T": "%H:%M:%S",\n              "%x": "%m/%d/%y",\n              "%X": "%H:%M:%S",\n              "%Ec": "%c",\n              "%EC": "%C",\n              "%Ex": "%m/%d/%y",\n              "%EX": "%H:%M:%S",\n              "%Ey": "%y",\n              "%EY": "%Y",\n              "%Od": "%d",\n              "%Oe": "%e",\n              "%OH": "%H",\n              "%OI": "%I",\n              "%Om": "%m",\n              "%OM": "%M",\n              "%OS": "%S",\n              "%Ou": "%u",\n              "%OU": "%U",\n              "%OV": "%V",\n              "%Ow": "%w",\n              "%OW": "%W",\n              "%Oy": "%y"\n            };\n            for (var u in t)\n              c = c.replace(new RegExp(u, "g"), t[u]);\n            var ya = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), za = "January February March April May June July August September October November December".split(" ");\n            t = { "%a": (e) => ya[e.xa].substring(0, 3), "%A": (e) => ya[e.xa], "%b": (e) => za[e.Fa].substring(0, 3), "%B": (e) => za[e.Fa], "%C": (e) => h((e.Da + 1900) / 100 | 0, 2), "%d": (e) => h(e.Ga, 2), "%e": (e) => g(e.Ga, 2, " "), "%g": (e) => w(e).toString().substring(2), "%G": (e) => w(e), "%H": (e) => h(e.Ea, 2), "%I": (e) => {\n              e = e.Ea;\n              0 == e ? e = 12 : 12 < e && (e -= 12);\n              return h(e, 2);\n            }, "%j": (e) => {\n              for (var n = 0, p = 0; p <= e.Fa - 1; n += (W(e.Da + 1900) ? Ea : Fa)[p++])\n                ;\n              return h(e.Ga + n, 3);\n            }, "%m": (e) => h(e.Fa + 1, 2), "%M": (e) => h(e.Na, 2), "%n": () => "\\n", "%p": (e) => 0 <= e.Ea && 12 > e.Ea ? "AM" : "PM", "%S": (e) => h(e.Oa, 2), "%t": () => "	", "%u": (e) => e.xa || 7, "%U": (e) => h(Math.floor((e.Ca + 7 - e.xa) / 7), 2), "%V": (e) => {\n              var n = Math.floor((e.Ca + 7 - (e.xa + 6) % 7) / 7);\n              2 >= (e.xa + 371 - e.Ca - 2) % 7 && n++;\n              if (n)\n                53 == n && (p = (e.xa + 371 - e.Ca) % 7, 4 == p || 3 == p && W(e.Da) || (n = 1));\n              else {\n                n = 52;\n                var p = (e.xa + 7 - e.Ca - 1) % 7;\n                (4 == p || 5 == p && W(e.Da % 400 - 1)) && n++;\n              }\n              return h(n, 2);\n            }, "%w": (e) => e.xa, "%W": (e) => h(Math.floor((e.Ca + 7 - (e.xa + 6) % 7) / 7), 2), "%y": (e) => (e.Da + 1900).toString().substring(2), "%Y": (e) => e.Da + 1900, "%z": (e) => {\n              e = e.Ma;\n              var n = 0 <= e;\n              e = Math.abs(e) / 60;\n              return (n ? "+" : "-") + String("0000" + (e / 60 * 100 + e % 60)).slice(-4);\n            }, "%Z": (e) => e.Pa, "%%": () => "%" };\n            c = c.replace(/%%/g, "\\0\\0");\n            for (u in t)\n              c.includes(u) && (c = c.replace(new RegExp(u, "g"), t[u](f)));\n            c = c.replace(/\\0\\0/g, "%");\n            u = Ga(c);\n            if (u.length > b)\n              return 0;\n            J.set(u, a >>> 0);\n            return u.length - 1;\n          }\n          var Ja = {\n            a: function(a, b, c) {\n              a >>>= 0;\n              new qa(a).Ia(b >>> 0, c >>> 0);\n              ra = a;\n              sa++;\n              throw ra;\n            },\n            e: function() {\n              return 0;\n            },\n            H: function() {\n            },\n            x: function() {\n            },\n            z: function() {\n            },\n            k: function() {\n              return 0;\n            },\n            F: function() {\n            },\n            B: function() {\n            },\n            E: function() {\n            },\n            g: function() {\n            },\n            y: function() {\n            },\n            v: function() {\n            },\n            G: function() {\n            },\n            w: function() {\n            },\n            l: () => true,\n            o: function(a, b, c) {\n              a = b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN;\n              c >>>= 0;\n              a = new Date(1e3 * a);\n              L[c >> 2 >>> 0] = a.getUTCSeconds();\n              L[c + 4 >> 2 >>> 0] = a.getUTCMinutes();\n              L[c + 8 >> 2 >>> 0] = a.getUTCHours();\n              L[c + 12 >> 2 >>> 0] = a.getUTCDate();\n              L[c + 16 >> 2 >>> 0] = a.getUTCMonth();\n              L[c + 20 >> 2 >>> 0] = a.getUTCFullYear() - 1900;\n              L[c + 24 >> 2 >>> 0] = a.getUTCDay();\n              L[c + 28 >> 2 >>> 0] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;\n            },\n            p: function(a, b, c) {\n              a = b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN;\n              c >>>= 0;\n              a = new Date(1e3 * a);\n              L[c >> 2 >>> 0] = a.getSeconds();\n              L[c + 4 >> 2 >>> 0] = a.getMinutes();\n              L[c + 8 >> 2 >>> 0] = a.getHours();\n              L[c + 12 >> 2 >>> 0] = a.getDate();\n              L[c + 16 >> 2 >>> 0] = a.getMonth();\n              L[c + 20 >> 2 >>> 0] = a.getFullYear() - 1900;\n              L[c + 24 >> 2 >>> 0] = a.getDay();\n              L[c + 28 >> 2 >>> 0] = (W(a.getFullYear()) ? va : wa)[a.getMonth()] + a.getDate() - 1 | 0;\n              L[c + 36 >> 2 >>> 0] = -(60 * a.getTimezoneOffset());\n              b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();\n              var f = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();\n              L[c + 32 >> 2 >>> 0] = (b != f && a.getTimezoneOffset() == Math.min(f, b)) | 0;\n            },\n            q: function(a) {\n              a >>>= 0;\n              var b = new Date(L[a + 20 >> 2 >>> 0] + 1900, L[a + 16 >> 2 >>> 0], L[a + 12 >> 2 >>> 0], L[a + 8 >> 2 >>> 0], L[a + 4 >> 2 >>> 0], L[a >> 2 >>> 0], 0), c = L[a + 32 >> 2 >>> 0], f = b.getTimezoneOffset(), g = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(), h = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), m = Math.min(h, g);\n              0 > c ? L[a + 32 >> 2 >>> 0] = Number(g != h && m == f) : 0 < c != (m == f) && (g = Math.max(h, g), b.setTime(b.getTime() + 6e4 * ((0 < c ? m : g) - f)));\n              L[a + 24 >> 2 >>> 0] = b.getDay();\n              L[a + 28 >> 2 >>> 0] = (W(b.getFullYear()) ? va : wa)[b.getMonth()] + b.getDate() - 1 | 0;\n              L[a >> 2 >>> 0] = b.getSeconds();\n              L[a + 4 >> 2 >>> 0] = b.getMinutes();\n              L[a + 8 >> 2 >>> 0] = b.getHours();\n              L[a + 12 >> 2 >>> 0] = b.getDate();\n              L[a + 16 >> 2 >>> 0] = b.getMonth();\n              L[a + 20 >> 2 >>> 0] = b.getYear();\n              a = b.getTime() / 1e3;\n              return Ia((R = a, 1 <= +Math.abs(R) ? 0 < R ? +Math.floor(R / 4294967296) >>> 0 : ~~+Math.ceil((R - +(~~R >>> 0)) / 4294967296) >>> 0 : 0)), a >>> 0;\n            },\n            m: function() {\n              return -52;\n            },\n            n: function() {\n            },\n            t: function(a, b, c) {\n              function f(w) {\n                return (w = w.toTimeString().match(/\\(([A-Za-z ]+)\\)$/)) ? w[1] : "GMT";\n              }\n              c >>>= 0;\n              var g = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(g, 0, 1), m = new Date(g, 6, 1);\n              g = h.getTimezoneOffset();\n              var q = m.getTimezoneOffset();\n              M[a >>> 0 >> 2 >>> 0] = 60 * Math.max(g, q);\n              L[b >>> 0 >> 2 >>> 0] = Number(g != q);\n              a = f(h);\n              b = f(m);\n              a = Ba(a);\n              b = Ba(b);\n              q < g ? (M[c >> 2 >>> 0] = a, M[c + 4 >> 2 >>> 0] = b) : (M[c >> 2 >>> 0] = b, M[c + 4 >> 2 >>> 0] = a);\n            },\n            d: () => {\n              G("");\n            },\n            h: function() {\n              return Date.now();\n            },\n            u: function() {\n              return 4294901760;\n            },\n            b: () => performance.now(),\n            I: function(a, b, c) {\n              b >>>= 0;\n              return K.copyWithin(a >>> 0 >>> 0, b >>> 0, b + (c >>> 0) >>> 0);\n            },\n            s: function(a) {\n              a >>>= 0;\n              var b = K.length;\n              if (4294901760 < a)\n                return false;\n              for (var c = 1; 4 >= c; c *= 2) {\n                var f = b * (1 + 0.2 / c);\n                f = Math.min(f, a + 100663296);\n                var g = Math;\n                f = Math.max(a, f);\n                a: {\n                  g = g.min.call(g, 4294901760, f + (65536 - f % 65536) % 65536) - H.buffer.byteLength + 65535 >>> 16;\n                  try {\n                    H.grow(g);\n                    ea();\n                    var h = 1;\n                    break a;\n                  } catch (m) {\n                  }\n                  h = void 0;\n                }\n                if (h)\n                  return true;\n              }\n              return false;\n            },\n            C: function(a, b) {\n              a >>>= 0;\n              b >>>= 0;\n              var c = 0;\n              Ca().forEach(function(f, g) {\n                var h = b + c;\n                g = M[a + 4 * g >> 2 >>> 0] = h;\n                for (h = 0; h < f.length; ++h)\n                  J[g++ >> 0 >>> 0] = f.charCodeAt(h);\n                J[g >> 0 >>> 0] = 0;\n                c += f.length + 1;\n              });\n              return 0;\n            },\n            D: function(a, b) {\n              a >>>= 0;\n              b >>>= 0;\n              var c = Ca();\n              M[a >> 2 >>> 0] = c.length;\n              var f = 0;\n              c.forEach(function(g) {\n                f += g.length + 1;\n              });\n              M[b >> 2 >>> 0] = f;\n              return 0;\n            },\n            f: () => 52,\n            j: function() {\n              return 52;\n            },\n            r: function() {\n              return 70;\n            },\n            i: function(a, b, c, f) {\n              b >>>= 0;\n              c >>>= 0;\n              f >>>= 0;\n              for (var g = 0, h = 0; h < c; h++) {\n                var m = M[b >> 2 >>> 0], q = M[b + 4 >> 2 >>> 0];\n                b += 8;\n                for (var w = 0; w < q; w++) {\n                  var t = K[m + w >>> 0], u = Da[a];\n                  0 === t || 10 === t ? ((1 === a ? ca : E)(ua(u, 0)), u.length = 0) : u.push(t);\n                }\n                g += q;\n              }\n              M[f >> 2 >>> 0] = g;\n              return 0;\n            },\n            A: Ha,\n            c: function(a, b, c, f) {\n              return Ha(a >>> 0, b >>> 0, c >>> 0, f >>> 0);\n            }\n          };\n          (function() {\n            function a(c) {\n              c = c.exports;\n              I = c = Ka(c);\n              H = I.J;\n              ea();\n              ha.unshift(I.K);\n              N--;\n              d.monitorRunDependencies && d.monitorRunDependencies(N);\n              if (0 == N && (null !== O && (clearInterval(O), O = null), P)) {\n                var f = P;\n                P = null;\n                f();\n              }\n              return c;\n            }\n            var b = { a: Ja };\n            N++;\n            d.monitorRunDependencies && d.monitorRunDependencies(N);\n            if (d.instantiateWasm)\n              try {\n                return d.instantiateWasm(b, a);\n              } catch (c) {\n                E("Module.instantiateWasm callback failed with error: " + c), l(c);\n              }\n            pa(b, function(c) {\n              a(c.instance);\n            }).catch(l);\n            return {};\n          })();\n          d._OrtInit = (a, b) => (d._OrtInit = I.L)(a, b);\n          d._OrtGetLastError = (a, b) => (d._OrtGetLastError = I.M)(a, b);\n          d._OrtCreateSessionOptions = (a, b, c, f, g, h, m, q, w, t) => (d._OrtCreateSessionOptions = I.N)(a, b, c, f, g, h, m, q, w, t);\n          d._OrtAppendExecutionProvider = (a, b) => (d._OrtAppendExecutionProvider = I.O)(a, b);\n          d._OrtAddFreeDimensionOverride = (a, b, c) => (d._OrtAddFreeDimensionOverride = I.P)(a, b, c);\n          d._OrtAddSessionConfigEntry = (a, b, c) => (d._OrtAddSessionConfigEntry = I.Q)(a, b, c);\n          d._OrtReleaseSessionOptions = (a) => (d._OrtReleaseSessionOptions = I.R)(a);\n          d._OrtCreateSession = (a, b, c) => (d._OrtCreateSession = I.S)(a, b, c);\n          d._OrtReleaseSession = (a) => (d._OrtReleaseSession = I.T)(a);\n          d._OrtGetInputOutputCount = (a, b, c) => (d._OrtGetInputOutputCount = I.U)(a, b, c);\n          d._OrtGetInputName = (a, b) => (d._OrtGetInputName = I.V)(a, b);\n          d._OrtGetOutputName = (a, b) => (d._OrtGetOutputName = I.W)(a, b);\n          d._OrtFree = (a) => (d._OrtFree = I.X)(a);\n          d._OrtCreateTensor = (a, b, c, f, g, h) => (d._OrtCreateTensor = I.Y)(a, b, c, f, g, h);\n          d._OrtGetTensorData = (a, b, c, f, g) => (d._OrtGetTensorData = I.Z)(a, b, c, f, g);\n          d._OrtReleaseTensor = (a) => (d._OrtReleaseTensor = I._)(a);\n          d._OrtCreateRunOptions = (a, b, c, f) => (d._OrtCreateRunOptions = I.$)(a, b, c, f);\n          d._OrtAddRunConfigEntry = (a, b, c) => (d._OrtAddRunConfigEntry = I.aa)(a, b, c);\n          d._OrtReleaseRunOptions = (a) => (d._OrtReleaseRunOptions = I.ba)(a);\n          d._OrtCreateBinding = (a) => (d._OrtCreateBinding = I.ca)(a);\n          d._OrtBindInput = (a, b, c) => (d._OrtBindInput = I.da)(a, b, c);\n          d._OrtBindOutput = (a, b, c, f) => (d._OrtBindOutput = I.ea)(a, b, c, f);\n          d._OrtClearBoundOutputs = (a) => (d._OrtClearBoundOutputs = I.fa)(a);\n          d._OrtReleaseBinding = (a) => (d._OrtReleaseBinding = I.ga)(a);\n          d._OrtRunWithBinding = (a, b, c, f, g) => (d._OrtRunWithBinding = I.ha)(a, b, c, f, g);\n          d._OrtRun = (a, b, c, f, g, h, m, q) => (d._OrtRun = I.ia)(a, b, c, f, g, h, m, q);\n          d._OrtEndProfiling = (a) => (d._OrtEndProfiling = I.ja)(a);\n          d._OrtTrainingLoadCheckpoint = (a, b) => (d._OrtTrainingLoadCheckpoint = I.ka)(a, b);\n          d._OrtTrainingReleaseCheckpoint = (a) => (d._OrtTrainingReleaseCheckpoint = I.la)(a);\n          d._OrtTrainingCreateSession = (a, b, c, f, g, h, m, q) => (d._OrtTrainingCreateSession = I.ma)(a, b, c, f, g, h, m, q);\n          d._OrtTrainingLazyResetGrad = (a) => (d._OrtTrainingLazyResetGrad = I.na)(a);\n          d._OrtTrainingRunTrainStep = (a, b, c, f, g, h) => (d._OrtTrainingRunTrainStep = I.oa)(a, b, c, f, g, h);\n          d._OrtTrainingOptimizerStep = (a, b) => (d._OrtTrainingOptimizerStep = I.pa)(a, b);\n          d._OrtTrainingEvalStep = (a, b, c, f, g, h) => (d._OrtTrainingEvalStep = I.qa)(a, b, c, f, g, h);\n          d._OrtTrainingGetParametersSize = (a, b, c) => (d._OrtTrainingGetParametersSize = I.ra)(a, b, c);\n          d._OrtTrainingCopyParametersToBuffer = (a, b, c, f) => (d._OrtTrainingCopyParametersToBuffer = I.sa)(a, b, c, f);\n          d._OrtTrainingCopyParametersFromBuffer = (a, b, c, f) => (d._OrtTrainingCopyParametersFromBuffer = I.ta)(a, b, c, f);\n          d._OrtTrainingReleaseSession = (a) => (d._OrtTrainingReleaseSession = I.ua)(a);\n          var Aa = d._malloc = (a) => (Aa = d._malloc = I.va)(a);\n          d._free = (a) => (d._free = I.wa)(a);\n          var Ia = (a) => (Ia = I.ya)(a), La = () => (La = I.za)(), Ma = (a) => (Ma = I.Aa)(a), Na = (a) => (Na = I.Ba)(a);\n          function Ka(a) {\n            a = Object.assign({}, a);\n            var b = (f) => () => f() >>> 0, c = (f) => (g) => f(g) >>> 0;\n            a.__errno_location = b(a.__errno_location);\n            a.malloc = c(a.malloc);\n            a.stackSave = b(a.stackSave);\n            a.stackAlloc = c(a.stackAlloc);\n            return a;\n          }\n          d.stackAlloc = Na;\n          d.stackSave = La;\n          d.stackRestore = Ma;\n          d.UTF8ToString = T;\n          d.stringToUTF8 = (a, b, c) => V(a, K, b, c);\n          d.lengthBytesUTF8 = U;\n          var Z;\n          P = function Oa() {\n            Z || Pa();\n            Z || (P = Oa);\n          };\n          function Pa() {\n            function a() {\n              if (!Z && (Z = true, d.calledRun = true, !da)) {\n                S(ha);\n                k(d);\n                if (d.onRuntimeInitialized)\n                  d.onRuntimeInitialized();\n                if (d.postRun)\n                  for ("function" == typeof d.postRun && (d.postRun = [d.postRun]); d.postRun.length; ) {\n                    var b = d.postRun.shift();\n                    ia.unshift(b);\n                  }\n                S(ia);\n              }\n            }\n            if (!(0 < N)) {\n              if (d.preRun)\n                for ("function" == typeof d.preRun && (d.preRun = [d.preRun]); d.preRun.length; )\n                  ja();\n              S(fa);\n              0 < N || (d.setStatus ? (d.setStatus("Running..."), setTimeout(function() {\n                setTimeout(function() {\n                  d.setStatus("");\n                }, 1);\n                a();\n              }, 1)) : a());\n            }\n          }\n          if (d.preInit)\n            for ("function" == typeof d.preInit && (d.preInit = [d.preInit]); 0 < d.preInit.length; )\n              d.preInit.pop()();\n          Pa();\n          return moduleArg.ready;\n        };\n      })();\n      if (typeof exports === "object" && typeof module === "object")\n        module.exports = ortWasm;\n      else if (typeof define === "function" && define["amd"])\n        define([], () => ortWasm);\n    }\n  });\n\n  // nodejs-ignore:worker_threads\n  var require_worker_threads = __commonJS({\n    "nodejs-ignore:worker_threads"() {\n    }\n  });\n\n  // nodejs-ignore:perf_hooks\n  var require_perf_hooks = __commonJS({\n    "nodejs-ignore:perf_hooks"() {\n    }\n  });\n\n  // nodejs-ignore:os\n  var os_exports = {};\n  __export(os_exports, {\n    cpus: () => cpus\n  });\n  var cpus;\n  var init_os = __esm({\n    "nodejs-ignore:os"() {\n      cpus = void 0;\n    }\n  });\n\n  // web/lib/wasm/binding/ort-wasm-threaded.js\n  var require_ort_wasm_threaded = __commonJS({\n    "web/lib/wasm/binding/ort-wasm-threaded.js"(exports, module) {\n      "use strict";\n      var ortWasmThreaded = (() => {\n        var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;\n        if (typeof __filename !== "undefined")\n          _scriptDir = _scriptDir || __filename;\n        return function(moduleArg = {}) {\n          function p() {\n            q.buffer != r.buffer && t();\n            return r;\n          }\n          function x() {\n            q.buffer != r.buffer && t();\n            return ba;\n          }\n          function ca() {\n            q.buffer != r.buffer && t();\n            return da;\n          }\n          function ea() {\n            q.buffer != r.buffer && t();\n            return fa;\n          }\n          function A() {\n            q.buffer != r.buffer && t();\n            return ha;\n          }\n          function B() {\n            q.buffer != r.buffer && t();\n            return ia;\n          }\n          function ja() {\n            q.buffer != r.buffer && t();\n            return ka;\n          }\n          var C = moduleArg, la, ma;\n          C.ready = new Promise((a, b) => {\n            la = a;\n            ma = b;\n          });\n          var na = Object.assign({}, C), oa = "./this.program", pa = (a, b) => {\n            throw b;\n          }, qa = "object" == typeof window, ra = "function" == typeof importScripts, F = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, G = C.ENVIRONMENT_IS_PTHREAD || false, H = "";\n          function sa(a) {\n            return C.locateFile ? C.locateFile(a, H) : H + a;\n          }\n          var ta, ua, va;\n          if (F) {\n            var fs = (init_fs(), __toCommonJS(fs_exports)), wa = (init_path(), __toCommonJS(path_exports));\n            H = ra ? wa.dirname(H) + "/" : __dirname + "/";\n            ta = (b, c) => {\n              b = b.startsWith("file://") ? new URL(b) : wa.normalize(b);\n              return fs.readFileSync(b, c ? void 0 : "utf8");\n            };\n            va = (b) => {\n              b = ta(b, true);\n              b.buffer || (b = new Uint8Array(b));\n              return b;\n            };\n            ua = (b, c, d, e = true) => {\n              b = b.startsWith("file://") ? new URL(b) : wa.normalize(b);\n              fs.readFile(b, e ? void 0 : "utf8", (f, g) => {\n                f ? d(f) : c(e ? g.buffer : g);\n              });\n            };\n            !C.thisProgram && 1 < process.argv.length && (oa = process.argv[1].replace(/\\\\/g, "/"));\n            process.argv.slice(2);\n            pa = (b, c) => {\n              process.exitCode = b;\n              throw c;\n            };\n            C.inspect = () => "[Emscripten Module object]";\n            let a;\n            try {\n              a = require_worker_threads();\n            } catch (b) {\n              throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'), b;\n            }\n            global.Worker = a.Worker;\n          } else if (qa || ra)\n            ra ? H = self.location.href : "undefined" != typeof document && document.currentScript && (H = document.currentScript.src), typeof _scriptDir !== "undefined" && _scriptDir && (H = _scriptDir), 0 !== H.indexOf("blob:") ? H = H.substr(0, H.replace(/[?#].*/, "").lastIndexOf("/") + 1) : H = "", F || (ta = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.send(null);\n              return b.responseText;\n            }, ra && (va = (a) => {\n              var b = new XMLHttpRequest();\n              b.open("GET", a, false);\n              b.responseType = "arraybuffer";\n              b.send(null);\n              return new Uint8Array(b.response);\n            }), ua = (a, b, c) => {\n              var d = new XMLHttpRequest();\n              d.open("GET", a, true);\n              d.responseType = "arraybuffer";\n              d.onload = () => {\n                200 == d.status || 0 == d.status && d.response ? b(d.response) : c();\n              };\n              d.onerror = c;\n              d.send(null);\n            });\n          F && "undefined" == typeof performance && (global.performance = require_perf_hooks().performance);\n          var xa = console.log.bind(console), ya = console.error.bind(console);\n          F && (xa = (...a) => fs.writeSync(1, a.join(" ") + "\\n"), ya = (...a) => fs.writeSync(2, a.join(" ") + "\\n"));\n          var za = xa, L = ya;\n          Object.assign(C, na);\n          na = null;\n          var noExitRuntime = true;\n          "object" != typeof WebAssembly && Aa("no native wasm support detected");\n          var q, Ba, Ca = false, Da, r, ba, da, fa, ha, ia, Ea, Fa, Ga, ka;\n          function t() {\n            var a = q.buffer;\n            C.HEAP8 = r = new Int8Array(a);\n            C.HEAP16 = da = new Int16Array(a);\n            C.HEAPU8 = ba = new Uint8Array(a);\n            C.HEAPU16 = fa = new Uint16Array(a);\n            C.HEAP32 = ha = new Int32Array(a);\n            C.HEAPU32 = ia = new Uint32Array(a);\n            C.HEAPF32 = Ea = new Float32Array(a);\n            C.HEAPF64 = ka = new Float64Array(a);\n            C.HEAP64 = Fa = new BigInt64Array(a);\n            C.HEAPU64 = Ga = new BigUint64Array(a);\n          }\n          var Ha = 16777216;\n          5242880 <= Ha || Aa("INITIAL_MEMORY should be larger than STACK_SIZE, was " + Ha + "! (STACK_SIZE=5242880)");\n          if (G)\n            q = C.wasmMemory;\n          else if (q = new WebAssembly.Memory({ initial: Ha / 65536, maximum: 65536, shared: true }), !(q.buffer instanceof SharedArrayBuffer))\n            throw L("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), F && L("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");\n          t();\n          Ha = q.buffer.byteLength;\n          var Ia = [], Ja = [], Ka = [], La = 0;\n          function Ma() {\n            return noExitRuntime || 0 < La;\n          }\n          var Na = 0, Oa = null, Pa = null;\n          function Qa() {\n            Na--;\n            if (0 == Na && (null !== Oa && (clearInterval(Oa), Oa = null), Pa)) {\n              var a = Pa;\n              Pa = null;\n              a();\n            }\n          }\n          function Aa(a) {\n            a = "Aborted(" + a + ")";\n            L(a);\n            Ca = true;\n            Da = 1;\n            a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");\n            ma(a);\n            throw a;\n          }\n          function Ra(a) {\n            return a.startsWith("data:application/octet-stream;base64,");\n          }\n          var Sa;\n          Sa = "ort-wasm-threaded.wasm";\n          Ra(Sa) || (Sa = sa(Sa));\n          function Ta(a) {\n            if (va)\n              return va(a);\n            throw "both async and sync fetching of the wasm failed";\n          }\n          function Ua(a) {\n            if (qa || ra) {\n              if ("function" == typeof fetch && !a.startsWith("file://"))\n                return fetch(a, { credentials: "same-origin" }).then((b) => {\n                  if (!b.ok)\n                    throw "failed to load wasm binary file at \'" + a + "\'";\n                  return b.arrayBuffer();\n                }).catch(() => Ta(a));\n              if (ua)\n                return new Promise((b, c) => {\n                  ua(a, (d) => b(new Uint8Array(d)), c);\n                });\n            }\n            return Promise.resolve().then(() => Ta(a));\n          }\n          function Va(a, b, c) {\n            return Ua(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {\n              L(`failed to asynchronously prepare wasm: ${d}`);\n              Aa(d);\n            });\n          }\n          function Wa(a, b) {\n            var c = Sa;\n            return "function" != typeof WebAssembly.instantiateStreaming || Ra(c) || c.startsWith("file://") || F || "function" != typeof fetch ? Va(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {\n              L(`wasm streaming compile failed: ${e}`);\n              L("falling back to ArrayBuffer instantiation");\n              return Va(c, a, b);\n            }));\n          }\n          function Xa(a) {\n            this.name = "ExitStatus";\n            this.message = `Program terminated with exit(${a})`;\n            this.status = a;\n          }\n          var Ya = (a) => {\n            a.terminate();\n            a.onmessage = () => {\n            };\n          }, Za = (a) => {\n            if (0 == M.Qe.length) {\n              var b = sa("ort-wasm-threaded.worker.js");\n              b = new Worker(b);\n              M.Qe.push(b);\n              M.sf(M.Qe[0]);\n            }\n            b = M.Qe.pop();\n            if (!b)\n              return 6;\n            M.Ne.push(b);\n            M.Je[a.Me] = b;\n            b.Me = a.Me;\n            var c = { cmd: "run", start_routine: a.uf, arg: a.mf, pthread_ptr: a.Me };\n            F && b.unref();\n            b.postMessage(c, a.Af);\n            return 0;\n          }, $a = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, ab = (a, b, c) => {\n            b >>>= 0;\n            var d = b + c;\n            for (c = b; a[c] && !(c >= d); )\n              ++c;\n            if (16 < c - b && a.buffer && $a)\n              return $a.decode(a.buffer instanceof SharedArrayBuffer ? a.slice(b, c) : a.subarray(b, c));\n            for (d = ""; b < c; ) {\n              var e = a[b++];\n              if (e & 128) {\n                var f = a[b++] & 63;\n                if (192 == (e & 224))\n                  d += String.fromCharCode((e & 31) << 6 | f);\n                else {\n                  var g = a[b++] & 63;\n                  e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;\n                  65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));\n                }\n              } else\n                d += String.fromCharCode(e);\n            }\n            return d;\n          }, bb = (a, b) => (a >>>= 0) ? ab(x(), a, b) : "";\n          function cb(a) {\n            if (G)\n              return N(0, 1, a);\n            Da = a;\n            Ma() || (M.vf(), Ca = true);\n            pa(a, new Xa(a));\n          }\n          var eb = (a) => {\n            Da = a;\n            if (G)\n              throw db(a), "unwind";\n            cb(a);\n          };\n          function gb() {\n            Ia.unshift(() => {\n              Na++;\n              Qa();\n            });\n          }\n          var M = { Qe: [], Ne: [], ff: [], Je: {}, Xe() {\n            G ? (M.receiveObjectTransfer = M.tf, M.threadInitTLS = M.ef, M.setExitStatus = M.bf, noExitRuntime = false) : gb();\n          }, bf: (a) => {\n            Da = a;\n          }, Df: ["$terminateWorker"], vf: () => {\n            for (var a of M.Ne)\n              Ya(a);\n            for (a of M.Qe)\n              Ya(a);\n            M.Qe = [];\n            M.Ne = [];\n            M.Je = [];\n          }, af: (a) => {\n            var b = a.Me;\n            delete M.Je[b];\n            M.Qe.push(a);\n            M.Ne.splice(M.Ne.indexOf(a), 1);\n            a.Me = 0;\n            hb(b);\n          }, tf() {\n          }, ef() {\n            M.ff.forEach((a) => a());\n          }, sf: (a) => new Promise((b) => {\n            a.onmessage = (f) => {\n              f = f.data;\n              var g = f.cmd;\n              if (f.targetThread && f.targetThread != ib()) {\n                var h = M.Je[f.targetThread];\n                h ? h.postMessage(f, f.transferList) : L(`Internal error! Worker sent a message "${g}" to target pthread ${f.targetThread}, but that thread no longer exists!`);\n              } else if ("checkMailbox" === g)\n                jb();\n              else if ("spawnThread" === g)\n                Za(f);\n              else if ("cleanupThread" === g)\n                (f = M.Je[f.thread]) || Aa(), M.af(f);\n              else if ("killThread" === g)\n                f = f.thread, g = M.Je[f], delete M.Je[f], Ya(g), hb(f), M.Ne.splice(M.Ne.indexOf(g), 1), g.Me = 0;\n              else if ("cancelThread" === g)\n                M.Je[f.thread].postMessage({ cmd: "cancel" });\n              else if ("loaded" === g)\n                a.loaded = true, b(a);\n              else if ("alert" === g)\n                alert(`Thread ${f.threadId}: ${f.text}`);\n              else if ("setimmediate" === f.target)\n                a.postMessage(f);\n              else if ("callHandler" === g)\n                C[f.handler](...f.args);\n              else\n                g && L(`worker sent an unknown command ${g}`);\n            };\n            a.onerror = (f) => {\n              L(`${"worker sent an error!"} ${f.filename}:${f.lineno}: ${f.message}`);\n              throw f;\n            };\n            F && (a.on("message", (f) => a.onmessage({ data: f })), a.on("error", (f) => a.onerror(f)));\n            var c = [], d = [], e;\n            for (e of d)\n              C.hasOwnProperty(e) && c.push(e);\n            a.postMessage({\n              cmd: "load",\n              handlers: c,\n              urlOrBlob: C.mainScriptUrlOrBlob || _scriptDir,\n              wasmMemory: q,\n              wasmModule: Ba\n            });\n          }) };\n          C.PThread = M;\n          var kb = (a) => {\n            for (; 0 < a.length; )\n              a.shift()(C);\n          };\n          C.establishStackSpace = () => {\n            var a = ib(), b = B()[a + 52 >>> 2 >>> 0];\n            a = B()[a + 56 >>> 2 >>> 0];\n            lb(b, b - a);\n            O(b);\n          };\n          function db(a) {\n            if (G)\n              return N(1, 0, a);\n            eb(a);\n          }\n          var mb = [], nb, P = (a) => {\n            var b = mb[a];\n            b || (a >= mb.length && (mb.length = a + 1), mb[a] = b = nb.get(a));\n            return b;\n          };\n          C.invokeEntryPoint = (a, b) => {\n            a = P(a)(b);\n            Ma() ? M.bf(a) : ob(a);\n          };\n          var pb = [], qb = 0, Q = 0;\n          function rb(a) {\n            this.Se = a;\n            this.Ie = a - 24;\n            this.lf = function(b) {\n              B()[this.Ie + 4 >>> 2 >>> 0] = b;\n            };\n            this.Te = function() {\n              return B()[this.Ie + 4 >>> 2 >>> 0];\n            };\n            this.kf = function(b) {\n              B()[this.Ie + 8 >>> 2 >>> 0] = b;\n            };\n            this.cf = function(b) {\n              b = b ? 1 : 0;\n              p()[this.Ie + 12 >>> 0 >>> 0] = b;\n            };\n            this.hf = function() {\n              return 0 != p()[this.Ie + 12 >>> 0 >>> 0];\n            };\n            this.df = function(b) {\n              b = b ? 1 : 0;\n              p()[this.Ie + 13 >>> 0 >>> 0] = b;\n            };\n            this.pf = function() {\n              return 0 != p()[this.Ie + 13 >>> 0 >>> 0];\n            };\n            this.Xe = function(b, c) {\n              this.Ue(0);\n              this.lf(b);\n              this.kf(c);\n            };\n            this.Ue = function(b) {\n              B()[this.Ie + 16 >>> 2 >>> 0] = b;\n            };\n            this.gf = function() {\n              return B()[this.Ie + 16 >>> 2 >>> 0];\n            };\n            this.jf = function() {\n              if (sb(this.Te()))\n                return B()[this.Se >>> 2 >>> 0];\n              var b = this.gf();\n              return 0 !== b ? b : this.Se;\n            };\n          }\n          var vb = (a) => {\n            var b = Q;\n            if (!b)\n              return tb(0), 0;\n            var c = new rb(b);\n            c.Ue(b);\n            var d = c.Te();\n            if (!d)\n              return tb(0), b;\n            for (var e in a) {\n              var f = a[e];\n              if (0 === f || f === d)\n                break;\n              if (ub(f, d, c.Ie + 16))\n                return tb(f), b;\n            }\n            tb(d);\n            return b;\n          };\n          function wb(a, b, c, d) {\n            return G ? N(2, 1, a, b, c, d) : xb(a, b, c, d);\n          }\n          function xb(a, b, c, d) {\n            a >>>= 0;\n            b >>>= 0;\n            c >>>= 0;\n            d >>>= 0;\n            if ("undefined" == typeof SharedArrayBuffer)\n              return L("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;\n            var e = [];\n            if (G && 0 === e.length)\n              return wb(a, b, c, d);\n            a = { uf: c, Me: a, mf: d, Af: e };\n            return G ? (a.Cf = "spawnThread", postMessage(a, e), 0) : Za(a);\n          }\n          function yb(a, b, c) {\n            return G ? N(3, 1, a, b, c) : 0;\n          }\n          function zb(a, b) {\n            if (G)\n              return N(4, 1, a, b);\n          }\n          var Ab = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var d = a.charCodeAt(c);\n              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;\n            }\n            return b;\n          }, Bb = (a, b, c, d) => {\n            c >>>= 0;\n            if (!(0 < d))\n              return 0;\n            var e = c;\n            d = c + d - 1;\n            for (var f = 0; f < a.length; ++f) {\n              var g = a.charCodeAt(f);\n              if (55296 <= g && 57343 >= g) {\n                var h = a.charCodeAt(++f);\n                g = 65536 + ((g & 1023) << 10) | h & 1023;\n              }\n              if (127 >= g) {\n                if (c >= d)\n                  break;\n                b[c++ >>> 0] = g;\n              } else {\n                if (2047 >= g) {\n                  if (c + 1 >= d)\n                    break;\n                  b[c++ >>> 0] = 192 | g >> 6;\n                } else {\n                  if (65535 >= g) {\n                    if (c + 2 >= d)\n                      break;\n                    b[c++ >>> 0] = 224 | g >> 12;\n                  } else {\n                    if (c + 3 >= d)\n                      break;\n                    b[c++ >>> 0] = 240 | g >> 18;\n                    b[c++ >>> 0] = 128 | g >> 12 & 63;\n                  }\n                  b[c++ >>> 0] = 128 | g >> 6 & 63;\n                }\n                b[c++ >>> 0] = 128 | g & 63;\n              }\n            }\n            b[c >>> 0] = 0;\n            return c - e;\n          }, Cb = (a, b, c) => Bb(a, x(), b, c);\n          function Db(a, b) {\n            if (G)\n              return N(5, 1, a, b);\n          }\n          function Eb(a, b, c) {\n            if (G)\n              return N(6, 1, a, b, c);\n          }\n          function Fb(a, b, c) {\n            return G ? N(7, 1, a, b, c) : 0;\n          }\n          function Gb(a, b) {\n            if (G)\n              return N(8, 1, a, b);\n          }\n          function Hb(a, b, c) {\n            if (G)\n              return N(9, 1, a, b, c);\n          }\n          function Ib(a, b, c, d) {\n            if (G)\n              return N(10, 1, a, b, c, d);\n          }\n          function Jb(a, b, c, d) {\n            if (G)\n              return N(11, 1, a, b, c, d);\n          }\n          function Kb(a, b, c, d) {\n            if (G)\n              return N(12, 1, a, b, c, d);\n          }\n          function Lb(a) {\n            if (G)\n              return N(13, 1, a);\n          }\n          function Mb(a, b) {\n            if (G)\n              return N(14, 1, a, b);\n          }\n          function Nb(a, b, c) {\n            if (G)\n              return N(15, 1, a, b, c);\n          }\n          var Ob = (a) => {\n            if (null === a)\n              return "null";\n            var b = typeof a;\n            return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;\n          }, Pb, R = (a) => {\n            for (var b = ""; x()[a >>> 0]; )\n              b += Pb[x()[a++ >>> 0]];\n            return b;\n          }, Qb = {}, Rb = {}, Sb = {}, Tb;\n          function Ub(a, b, c = {}) {\n            var d = b.name;\n            if (!a)\n              throw new Tb(`type "${d}" must have a positive integer typeid pointer`);\n            if (Rb.hasOwnProperty(a)) {\n              if (c.qf)\n                return;\n              throw new Tb(`Cannot register type \'${d}\' twice`);\n            }\n            Rb[a] = b;\n            delete Sb[a];\n            Qb.hasOwnProperty(a) && (b = Qb[a], delete Qb[a], b.forEach((e) => e()));\n          }\n          function S(a, b, c = {}) {\n            if (!("argPackAdvance" in b))\n              throw new TypeError("registerType registeredInstance requires argPackAdvance");\n            Ub(a, b, c);\n          }\n          var Vb = (a, b, c) => {\n            switch (b) {\n              case 1:\n                return c ? (d) => p()[d >>> 0 >>> 0] : (d) => x()[d >>> 0 >>> 0];\n              case 2:\n                return c ? (d) => ca()[d >>> 1 >>> 0] : (d) => ea()[d >>> 1 >>> 0];\n              case 4:\n                return c ? (d) => A()[d >>> 2 >>> 0] : (d) => B()[d >>> 2 >>> 0];\n              case 8:\n                return c ? (d) => Fa[d >>> 3] : (d) => Ga[d >>> 3];\n              default:\n                throw new TypeError(`invalid integer width (${b}): ${a}`);\n            }\n          };\n          function Wb() {\n            this.Le = [void 0];\n            this.Ze = [];\n          }\n          var T = new Wb();\n          function Xb(a) {\n            a >>>= 0;\n            a >= T.Ie && 0 === --T.get(a).$e && T.Ue(a);\n          }\n          var U = (a) => {\n            if (!a)\n              throw new Tb("Cannot use deleted val. handle = " + a);\n            return T.get(a).value;\n          }, V = (a) => {\n            switch (a) {\n              case void 0:\n                return 1;\n              case null:\n                return 2;\n              case true:\n                return 3;\n              case false:\n                return 4;\n              default:\n                return T.Te({ $e: 1, value: a });\n            }\n          };\n          function Yb(a) {\n            return this.fromWireType(A()[a >>> 2 >>> 0]);\n          }\n          var Zb = (a, b) => {\n            switch (b) {\n              case 4:\n                return function(c) {\n                  var d = this.fromWireType;\n                  q.buffer != r.buffer && t();\n                  return d.call(this, Ea[c >>> 2 >>> 0]);\n                };\n              case 8:\n                return function(c) {\n                  return this.fromWireType(ja()[c >>> 3 >>> 0]);\n                };\n              default:\n                throw new TypeError(`invalid float width (${b}): ${a}`);\n            }\n          };\n          function $b(a) {\n            return this.fromWireType(B()[a >>> 2 >>> 0]);\n          }\n          var ac = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, bc = (a, b) => {\n            var c = a >> 1;\n            for (var d = c + b / 2; !(c >= d) && ea()[c >>> 0]; )\n              ++c;\n            c <<= 1;\n            if (32 < c - a && ac)\n              return ac.decode(x().slice(a, c));\n            c = "";\n            for (d = 0; !(d >= b / 2); ++d) {\n              var e = ca()[a + 2 * d >>> 1 >>> 0];\n              if (0 == e)\n                break;\n              c += String.fromCharCode(e);\n            }\n            return c;\n          }, cc = (a, b, c) => {\n            void 0 === c && (c = 2147483647);\n            if (2 > c)\n              return 0;\n            c -= 2;\n            var d = b;\n            c = c < 2 * a.length ? c / 2 : a.length;\n            for (var e = 0; e < c; ++e) {\n              var f = a.charCodeAt(e);\n              ca()[b >>> 1 >>> 0] = f;\n              b += 2;\n            }\n            ca()[b >>> 1 >>> 0] = 0;\n            return b - d;\n          }, dc = (a) => 2 * a.length, ec = (a, b) => {\n            for (var c = 0, d = ""; !(c >= b / 4); ) {\n              var e = A()[a + 4 * c >>> 2 >>> 0];\n              if (0 == e)\n                break;\n              ++c;\n              65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);\n            }\n            return d;\n          }, fc = (a, b, c) => {\n            b >>>= 0;\n            void 0 === c && (c = 2147483647);\n            if (4 > c)\n              return 0;\n            var d = b;\n            c = d + c - 4;\n            for (var e = 0; e < a.length; ++e) {\n              var f = a.charCodeAt(e);\n              if (55296 <= f && 57343 >= f) {\n                var g = a.charCodeAt(++e);\n                f = 65536 + ((f & 1023) << 10) | g & 1023;\n              }\n              A()[b >>> 2 >>> 0] = f;\n              b += 4;\n              if (b + 4 > c)\n                break;\n            }\n            A()[b >>> 2 >>> 0] = 0;\n            return b - d;\n          }, gc = (a) => {\n            for (var b = 0, c = 0; c < a.length; ++c) {\n              var d = a.charCodeAt(c);\n              55296 <= d && 57343 >= d && ++c;\n              b += 4;\n            }\n            return b;\n          }, hc = (a) => {\n            if (!Ca)\n              try {\n                if (a(), !Ma())\n                  try {\n                    G ? ob(Da) : eb(Da);\n                  } catch (b) {\n                    b instanceof Xa || "unwind" == b || pa(1, b);\n                  }\n              } catch (b) {\n                b instanceof Xa || "unwind" == b || pa(1, b);\n              }\n          };\n          function ic(a) {\n            a >>>= 0;\n            "function" === typeof Atomics.Bf && (Atomics.Bf(A(), a >>> 2, a).value.then(jb), a += 128, Atomics.store(A(), a >>> 2, 1));\n          }\n          C.__emscripten_thread_mailbox_await = ic;\n          var jb = () => {\n            var a = ib();\n            a && (ic(a), hc(() => jc()));\n          };\n          C.checkMailbox = jb;\n          var kc = (a) => {\n            var b = W();\n            a = a();\n            O(b);\n            return a;\n          };\n          function N(a, b) {\n            var c = arguments.length - 2, d = arguments;\n            return kc(() => {\n              for (var e = 2 * c, f = lc(8 * e), g = f >>> 3, h = 0; h < c; h++) {\n                var k = d[2 + h];\n                "bigint" == typeof k ? (Fa[g + 2 * h] = 1n, Fa[g + 2 * h + 1] = k) : (Fa[g + 2 * h] = 0n, ja()[g + 2 * h + 1 >>> 0] = k);\n              }\n              return mc(a, e, f, b);\n            });\n          }\n          var nc = [], pc = (a, b) => {\n            var c = Rb[a];\n            if (void 0 === c)\n              throw a = oc(a), c = R(a), X(a), new Tb(b + " has unknown type " + c);\n            return c;\n          }, qc = {}, rc = (a) => {\n            var b = qc[a];\n            return void 0 === b ? R(a) : b;\n          }, sc = [], tc = () => "object" == typeof globalThis ? globalThis : Function("return this")(), uc = (a) => {\n            var b = sc.length;\n            sc.push(a);\n            return b;\n          }, vc = (a, b) => {\n            for (var c = Array(a), d = 0; d < a; ++d)\n              c[d] = pc(B()[b + 4 * d >>> 2 >>> 0], "parameter " + d);\n            return c;\n          }, wc = (a) => {\n            if (void 0 === a)\n              return "_unknown";\n            a = a.replace(/[^a-zA-Z0-9_]/g, "$");\n            var b = a.charCodeAt(0);\n            return 48 <= b && 57 >= b ? `_${a}` : a;\n          }, xc = {};\n          function yc(a, b) {\n            a = wc(a);\n            return { [a]: function() {\n              return b.apply(this, arguments);\n            } }[a];\n          }\n          function zc(a) {\n            var b = Function;\n            if (!(b instanceof Function))\n              throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);\n            var c = yc(b.name || "unknownFunctionName", function() {\n            });\n            c.prototype = b.prototype;\n            c = new c();\n            a = b.apply(c, a);\n            return a instanceof Object ? a : c;\n          }\n          var Ac = (a) => {\n            for (var b = "", c = 0; c < a; ++c)\n              b += (0 !== c ? ", " : "") + "arg" + c;\n            var d = "return function emval_allocator_" + a + "(constructor, argTypes, args) {\\n  var HEAPU32 = getMemory();\\n";\n            for (c = 0; c < a; ++c)\n              d += "var argType" + c + " = requireRegisteredType(HEAPU32[((argTypes)>>>2)], \'parameter " + c + "\');\\nvar arg" + c + " = argType" + c + ".readValueFromPointer(args);\\nargs += argType" + c + "[\'argPackAdvance\'];\\nargTypes += 4;\\n";\n            return new Function("requireRegisteredType", "Module", "valueToHandle", "getMemory", d + ("var obj = new constructor(" + b + ");\\nreturn valueToHandle(obj);\\n}\\n"))(pc, C, V, () => B());\n          }, Bc = {}, Cc = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), Dc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Ec = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];\n          function Fc(a, b, c, d, e, f, g) {\n            return G ? N(16, 1, a, b, c, d, e, f, g) : -52;\n          }\n          function Gc(a, b, c, d, e, f) {\n            if (G)\n              return N(17, 1, a, b, c, d, e, f);\n          }\n          var Ic = (a) => {\n            var b = Ab(a) + 1, c = Hc(b);\n            c && Cb(a, c, b);\n            return c;\n          }, Jc = {}, Lc = () => {\n            if (!Kc) {\n              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: oa || "./this.program" }, b;\n              for (b in Jc)\n                void 0 === Jc[b] ? delete a[b] : a[b] = Jc[b];\n              var c = [];\n              for (b in a)\n                c.push(`${b}=${a[b]}`);\n              Kc = c;\n            }\n            return Kc;\n          }, Kc;\n          function Mc(a, b) {\n            if (G)\n              return N(18, 1, a, b);\n            a >>>= 0;\n            b >>>= 0;\n            var c = 0;\n            Lc().forEach((d, e) => {\n              var f = b + c;\n              e = B()[a + 4 * e >>> 2 >>> 0] = f;\n              for (f = 0; f < d.length; ++f)\n                p()[e++ >>> 0 >>> 0] = d.charCodeAt(f);\n              p()[e >>> 0 >>> 0] = 0;\n              c += d.length + 1;\n            });\n            return 0;\n          }\n          function Nc(a, b) {\n            if (G)\n              return N(19, 1, a, b);\n            a >>>= 0;\n            b >>>= 0;\n            var c = Lc();\n            B()[a >>> 2 >>> 0] = c.length;\n            var d = 0;\n            c.forEach((e) => d += e.length + 1);\n            B()[b >>> 2 >>> 0] = d;\n            return 0;\n          }\n          function Oc(a) {\n            return G ? N(20, 1, a) : 52;\n          }\n          function Pc(a, b, c, d) {\n            return G ? N(21, 1, a, b, c, d) : 52;\n          }\n          function Qc(a, b, c, d) {\n            return G ? N(22, 1, a, b, c, d) : 70;\n          }\n          var Rc = [null, [], []];\n          function Sc(a, b, c, d) {\n            if (G)\n              return N(23, 1, a, b, c, d);\n            b >>>= 0;\n            c >>>= 0;\n            d >>>= 0;\n            for (var e = 0, f = 0; f < c; f++) {\n              var g = B()[b >>> 2 >>> 0], h = B()[b + 4 >>> 2 >>> 0];\n              b += 8;\n              for (var k = 0; k < h; k++) {\n                var l = x()[g + k >>> 0], n = Rc[a];\n                0 === l || 10 === l ? ((1 === a ? za : L)(ab(n, 0)), n.length = 0) : n.push(l);\n              }\n              e += h;\n            }\n            B()[d >>> 2 >>> 0] = e;\n            return 0;\n          }\n          var Tc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Uc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];\n          function Vc(a) {\n            var b = Array(Ab(a) + 1);\n            Bb(a, b, 0, b.length);\n            return b;\n          }\n          var Wc = (a, b) => {\n            p().set(a, b >>> 0);\n          };\n          function Xc(a, b, c, d) {\n            function e(m, w, y) {\n              for (m = "number" == typeof m ? m.toString() : m || ""; m.length < w; )\n                m = y[0] + m;\n              return m;\n            }\n            function f(m, w) {\n              return e(m, w, "0");\n            }\n            function g(m, w) {\n              function y(D) {\n                return 0 > D ? -1 : 0 < D ? 1 : 0;\n              }\n              var z;\n              0 === (z = y(m.getFullYear() - w.getFullYear())) && 0 === (z = y(m.getMonth() - w.getMonth())) && (z = y(m.getDate() - w.getDate()));\n              return z;\n            }\n            function h(m) {\n              switch (m.getDay()) {\n                case 0:\n                  return new Date(m.getFullYear() - 1, 11, 29);\n                case 1:\n                  return m;\n                case 2:\n                  return new Date(m.getFullYear(), 0, 3);\n                case 3:\n                  return new Date(\n                    m.getFullYear(),\n                    0,\n                    2\n                  );\n                case 4:\n                  return new Date(m.getFullYear(), 0, 1);\n                case 5:\n                  return new Date(m.getFullYear() - 1, 11, 31);\n                case 6:\n                  return new Date(m.getFullYear() - 1, 11, 30);\n              }\n            }\n            function k(m) {\n              var w = m.Oe;\n              for (m = new Date(new Date(m.Pe + 1900, 0, 1).getTime()); 0 < w; ) {\n                var y = m.getMonth(), z = (Cc(m.getFullYear()) ? Tc : Uc)[y];\n                if (w > z - m.getDate())\n                  w -= z - m.getDate() + 1, m.setDate(1), 11 > y ? m.setMonth(y + 1) : (m.setMonth(0), m.setFullYear(m.getFullYear() + 1));\n                else {\n                  m.setDate(m.getDate() + w);\n                  break;\n                }\n              }\n              y = new Date(m.getFullYear() + 1, 0, 4);\n              w = h(new Date(\n                m.getFullYear(),\n                0,\n                4\n              ));\n              y = h(y);\n              return 0 >= g(w, m) ? 0 >= g(y, m) ? m.getFullYear() + 1 : m.getFullYear() : m.getFullYear() - 1;\n            }\n            a >>>= 0;\n            b >>>= 0;\n            c >>>= 0;\n            d >>>= 0;\n            var l = B()[d + 40 >>> 2 >>> 0];\n            d = { yf: A()[d >>> 2 >>> 0], xf: A()[d + 4 >>> 2 >>> 0], Ve: A()[d + 8 >>> 2 >>> 0], Ye: A()[d + 12 >>> 2 >>> 0], We: A()[d + 16 >>> 2 >>> 0], Pe: A()[d + 20 >>> 2 >>> 0], Ke: A()[d + 24 >>> 2 >>> 0], Oe: A()[d + 28 >>> 2 >>> 0], Ef: A()[d + 32 >>> 2 >>> 0], wf: A()[d + 36 >>> 2 >>> 0], zf: l ? bb(l) : "" };\n            c = bb(c);\n            l = {\n              "%c": "%a %b %d %H:%M:%S %Y",\n              "%D": "%m/%d/%y",\n              "%F": "%Y-%m-%d",\n              "%h": "%b",\n              "%r": "%I:%M:%S %p",\n              "%R": "%H:%M",\n              "%T": "%H:%M:%S",\n              "%x": "%m/%d/%y",\n              "%X": "%H:%M:%S",\n              "%Ec": "%c",\n              "%EC": "%C",\n              "%Ex": "%m/%d/%y",\n              "%EX": "%H:%M:%S",\n              "%Ey": "%y",\n              "%EY": "%Y",\n              "%Od": "%d",\n              "%Oe": "%e",\n              "%OH": "%H",\n              "%OI": "%I",\n              "%Om": "%m",\n              "%OM": "%M",\n              "%OS": "%S",\n              "%Ou": "%u",\n              "%OU": "%U",\n              "%OV": "%V",\n              "%Ow": "%w",\n              "%OW": "%W",\n              "%Oy": "%y"\n            };\n            for (var n in l)\n              c = c.replace(new RegExp(n, "g"), l[n]);\n            var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), v = "January February March April May June July August September October November December".split(" ");\n            l = { "%a": (m) => u[m.Ke].substring(0, 3), "%A": (m) => u[m.Ke], "%b": (m) => v[m.We].substring(0, 3), "%B": (m) => v[m.We], "%C": (m) => f((m.Pe + 1900) / 100 | 0, 2), "%d": (m) => f(m.Ye, 2), "%e": (m) => e(m.Ye, 2, " "), "%g": (m) => k(m).toString().substring(2), "%G": (m) => k(m), "%H": (m) => f(m.Ve, 2), "%I": (m) => {\n              m = m.Ve;\n              0 == m ? m = 12 : 12 < m && (m -= 12);\n              return f(m, 2);\n            }, "%j": (m) => {\n              for (var w = 0, y = 0; y <= m.We - 1; w += (Cc(m.Pe + 1900) ? Tc : Uc)[y++])\n                ;\n              return f(m.Ye + w, 3);\n            }, "%m": (m) => f(m.We + 1, 2), "%M": (m) => f(m.xf, 2), "%n": () => "\\n", "%p": (m) => 0 <= m.Ve && 12 > m.Ve ? "AM" : "PM", "%S": (m) => f(m.yf, 2), "%t": () => "	", "%u": (m) => m.Ke || 7, "%U": (m) => f(Math.floor((m.Oe + 7 - m.Ke) / 7), 2), "%V": (m) => {\n              var w = Math.floor((m.Oe + 7 - (m.Ke + 6) % 7) / 7);\n              2 >= (m.Ke + 371 - m.Oe - 2) % 7 && w++;\n              if (w)\n                53 == w && (y = (m.Ke + 371 - m.Oe) % 7, 4 == y || 3 == y && Cc(m.Pe) || (w = 1));\n              else {\n                w = 52;\n                var y = (m.Ke + 7 - m.Oe - 1) % 7;\n                (4 == y || 5 == y && Cc(m.Pe % 400 - 1)) && w++;\n              }\n              return f(w, 2);\n            }, "%w": (m) => m.Ke, "%W": (m) => f(Math.floor((m.Oe + 7 - (m.Ke + 6) % 7) / 7), 2), "%y": (m) => (m.Pe + 1900).toString().substring(2), "%Y": (m) => m.Pe + 1900, "%z": (m) => {\n              m = m.wf;\n              var w = 0 <= m;\n              m = Math.abs(m) / 60;\n              return (w ? "+" : "-") + String("0000" + (m / 60 * 100 + m % 60)).slice(-4);\n            }, "%Z": (m) => m.zf, "%%": () => "%" };\n            c = c.replace(/%%/g, "\\0\\0");\n            for (n in l)\n              c.includes(n) && (c = c.replace(new RegExp(n, "g"), l[n](d)));\n            c = c.replace(/\\0\\0/g, "%");\n            n = Vc(c);\n            if (n.length > b)\n              return 0;\n            Wc(n, a);\n            return n.length - 1;\n          }\n          M.Xe();\n          for (var Yc = Array(256), Zc = 0; 256 > Zc; ++Zc)\n            Yc[Zc] = String.fromCharCode(Zc);\n          Pb = Yc;\n          Tb = C.BindingError = class extends Error {\n            constructor(a) {\n              super(a);\n              this.name = "BindingError";\n            }\n          };\n          C.InternalError = class extends Error {\n            constructor(a) {\n              super(a);\n              this.name = "InternalError";\n            }\n          };\n          Object.assign(Wb.prototype, { get(a) {\n            return this.Le[a];\n          }, has(a) {\n            return void 0 !== this.Le[a];\n          }, Te(a) {\n            var b = this.Ze.pop() || this.Le.length;\n            this.Le[b] = a;\n            return b;\n          }, Ue(a) {\n            this.Le[a] = void 0;\n            this.Ze.push(a);\n          } });\n          T.Le.push({ value: void 0 }, { value: null }, { value: true }, { value: false });\n          T.Ie = T.Le.length;\n          C.count_emval_handles = () => {\n            for (var a = 0, b = T.Ie; b < T.Le.length; ++b)\n              void 0 !== T.Le[b] && ++a;\n            return a;\n          };\n          var $c = [cb, db, wb, yb, zb, Db, Eb, Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Fc, Gc, Mc, Nc, Oc, Pc, Qc, Sc], rg = {\n            u: function(a) {\n              a = new rb(a >>> 0);\n              a.hf() || (a.cf(true), qb--);\n              a.df(false);\n              pb.push(a);\n              ad(a.Se);\n              return a.jf();\n            },\n            M: () => {\n              Y(0, 0);\n              var a = pb.pop();\n              bd(a.Se);\n              Q = 0;\n            },\n            b: function() {\n              return vb([]);\n            },\n            n: function(a) {\n              return vb([a >>> 0]);\n            },\n            y: function(a, b) {\n              return vb([a >>> 0, b >>> 0]);\n            },\n            q: function(a, b, c) {\n              return vb([a >>> 0, b >>> 0, c >>> 0]);\n            },\n            zb: () => {\n              var a = pb.pop();\n              a || Aa("no exception to throw");\n              var b = a.Se;\n              a.pf() || (pb.push(a), a.df(true), a.cf(false), qb++);\n              Q = b;\n              throw Q;\n            },\n            t: function(a, b, c) {\n              a >>>= 0;\n              new rb(a).Xe(b >>> 0, c >>> 0);\n              Q = a;\n              qb++;\n              throw Q;\n            },\n            Sa: () => qb,\n            Wc: function(a) {\n              cd(a >>> 0, !ra, 1, !qa, 131072, false);\n              M.ef();\n            },\n            Ub: function(a) {\n              a >>>= 0;\n              G ? postMessage({ cmd: "cleanupThread", thread: a }) : ((a = M.Je[a]) || Aa(), M.af(a));\n            },\n            Mc: xb,\n            i: function(a) {\n              Q || (Q = a >>> 0);\n              throw Q;\n            },\n            Ab: yb,\n            ad: zb,\n            Hc: Db,\n            Jc: Eb,\n            Ac: Fb,\n            _c: Gb,\n            Tc: Hb,\n            Zc: Ib,\n            Wb: Jb,\n            Ic: Kb,\n            Fc: Lb,\n            $c: Mb,\n            Gc: Nb,\n            Zb: function(a, b, c, d, e) {\n              a >>>= 0;\n              b >>>= 0;\n              c >>>= 0;\n              b = R(b);\n              var f = -1 != b.indexOf("u");\n              f && (e = (1n << 64n) - 1n);\n              S(a, { name: b, fromWireType: (g) => g, toWireType: function(g, h) {\n                if ("bigint" != typeof h && "number" != typeof h)\n                  throw new TypeError(`Cannot convert "${Ob(h)}" to ${this.name}`);\n                if (h < d || h > e)\n                  throw new TypeError(`Passing a number "${Ob(h)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);\n                return h;\n              }, argPackAdvance: 8, readValueFromPointer: Vb(b, c, !f), Re: null });\n            },\n            hd: function(a, b, c, d) {\n              a >>>= 0;\n              b = R(b >>> 0);\n              S(a, { name: b, fromWireType: function(e) {\n                return !!e;\n              }, toWireType: function(e, f) {\n                return f ? c : d;\n              }, argPackAdvance: 8, readValueFromPointer: function(e) {\n                return this.fromWireType(x()[e >>> 0]);\n              }, Re: null });\n            },\n            ed: function(a, b) {\n              a >>>= 0;\n              b = R(b >>> 0);\n              S(a, { name: b, fromWireType: (c) => {\n                var d = U(c);\n                Xb(c);\n                return d;\n              }, toWireType: (c, d) => V(d), argPackAdvance: 8, readValueFromPointer: Yb, Re: null });\n            },\n            Yb: function(a, b, c) {\n              a >>>= 0;\n              c >>>= 0;\n              b = R(b >>> 0);\n              S(a, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: Zb(b, c), Re: null });\n            },\n            wa: function(a, b, c, d, e) {\n              a >>>= 0;\n              c >>>= 0;\n              b = R(b >>> 0);\n              -1 === e && (e = 4294967295);\n              e = (h) => h;\n              if (0 === d) {\n                var f = 32 - 8 * c;\n                e = (h) => h << f >>> f;\n              }\n              var g = b.includes("unsigned") ? function(h, k) {\n                return k >>> 0;\n              } : function(h, k) {\n                return k;\n              };\n              S(a, { name: b, fromWireType: e, toWireType: g, argPackAdvance: 8, readValueFromPointer: Vb(b, c, 0 !== d), Re: null });\n            },\n            _: function(a, b, c) {\n              function d(f) {\n                var g = B()[f >>> 2 >>> 0];\n                f = B()[f + 4 >>> 2 >>> 0];\n                return new e(p().buffer, f, g);\n              }\n              a >>>= 0;\n              var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][b];\n              c = R(c >>> 0);\n              S(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { qf: true });\n            },\n            _b: function(a, b) {\n              a >>>= 0;\n              b = R(b >>> 0);\n              var c = "std::string" === b;\n              S(a, { name: b, fromWireType: function(d) {\n                var e = B()[d >>> 2 >>> 0], f = d + 4;\n                if (c)\n                  for (var g = f, h = 0; h <= e; ++h) {\n                    var k = f + h;\n                    if (h == e || 0 == x()[k >>> 0]) {\n                      g = bb(g, k - g);\n                      if (void 0 === l)\n                        var l = g;\n                      else\n                        l += String.fromCharCode(0), l += g;\n                      g = k + 1;\n                    }\n                  }\n                else {\n                  l = Array(e);\n                  for (h = 0; h < e; ++h)\n                    l[h] = String.fromCharCode(x()[f + h >>> 0]);\n                  l = l.join("");\n                }\n                X(d);\n                return l;\n              }, toWireType: function(d, e) {\n                e instanceof ArrayBuffer && (e = new Uint8Array(e));\n                var f = "string" == typeof e;\n                if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array))\n                  throw new Tb("Cannot pass non-string to std::string");\n                var g = c && f ? Ab(e) : e.length;\n                var h = Hc(4 + g + 1), k = h + 4;\n                B()[h >>> 2 >>> 0] = g;\n                if (c && f)\n                  Cb(e, k, g + 1);\n                else if (f)\n                  for (f = 0; f < g; ++f) {\n                    var l = e.charCodeAt(f);\n                    if (255 < l)\n                      throw X(k), new Tb("String has UTF-16 code units that do not fit in 8 bits");\n                    x()[k + f >>> 0] = l;\n                  }\n                else\n                  for (f = 0; f < g; ++f)\n                    x()[k + f >>> 0] = e[f];\n                null !== d && d.push(X, h);\n                return h;\n              }, argPackAdvance: 8, readValueFromPointer: $b, Re(d) {\n                X(d);\n              } });\n            },\n            Cb: function(a, b, c) {\n              a >>>= 0;\n              b >>>= 0;\n              c >>>= 0;\n              c = R(c);\n              if (2 === b) {\n                var d = bc;\n                var e = cc;\n                var f = dc;\n                var g = () => ea();\n                var h = 1;\n              } else\n                4 === b && (d = ec, e = fc, f = gc, g = () => B(), h = 2);\n              S(a, { name: c, fromWireType: (k) => {\n                for (var l = B()[k >>> 2 >>> 0], n = g(), u, v = k + 4, m = 0; m <= l; ++m) {\n                  var w = k + 4 + m * b;\n                  if (m == l || 0 == n[w >>> h])\n                    v = d(v, w - v), void 0 === u ? u = v : (u += String.fromCharCode(0), u += v), v = w + b;\n                }\n                X(k);\n                return u;\n              }, toWireType: (k, l) => {\n                if ("string" != typeof l)\n                  throw new Tb(`Cannot pass non-string to C++ string type ${c}`);\n                var n = f(l), u = Hc(4 + n + b);\n                B()[u >>> 2] = n >> h;\n                e(l, u + 4, n + b);\n                null !== k && k.push(X, u);\n                return u;\n              }, argPackAdvance: 8, readValueFromPointer: Yb, Re(k) {\n                X(k);\n              } });\n            },\n            kd: function(a, b) {\n              a >>>= 0;\n              b = R(b >>> 0);\n              S(a, {\n                rf: true,\n                name: b,\n                argPackAdvance: 0,\n                fromWireType: () => {\n                },\n                toWireType: () => {\n                }\n              });\n            },\n            dd: () => true,\n            Dc: function(a, b) {\n              a >>>= 0;\n              a == b >>> 0 ? setTimeout(() => jb()) : G ? postMessage({ targetThread: a, cmd: "checkMailbox" }) : (a = M.Je[a]) && a.postMessage({ cmd: "checkMailbox" });\n            },\n            Nc: function(a, b, c, d) {\n              b >>>= 0;\n              c /= 2;\n              nc.length = c;\n              d = d >>> 0 >>> 3;\n              for (var e = 0; e < c; e++)\n                nc[e] = Fa[d + 2 * e] ? Fa[d + 2 * e + 1] : ja()[d + 2 * e + 1 >>> 0];\n              a = $c[a];\n              M.nf = b;\n              b = a.apply(null, nc);\n              M.nf = 0;\n              return b;\n            },\n            Vc: ic,\n            cd: function(a) {\n              F && M.Je[a >>> 0].ref();\n            },\n            xd: function(a, b, c) {\n              b >>>= 0;\n              c >>>= 0;\n              a = U(a >>> 0);\n              b = pc(b, "emval::as");\n              var d = [], e = V(d);\n              B()[c >>> 2 >>> 0] = e;\n              return b.toWireType(d, a);\n            },\n            la: function(a, b, c, d, e) {\n              c >>>= 0;\n              d >>>= 0;\n              e >>>= 0;\n              a = sc[a >>> 0];\n              b = U(b >>> 0);\n              c = rc(c);\n              var f = [];\n              B()[d >>> 2 >>> 0] = V(f);\n              return a(b, c, f, e);\n            },\n            Fd: function(a, b, c, d) {\n              c >>>= 0;\n              d >>>= 0;\n              a = sc[a >>> 0];\n              b = U(b >>> 0);\n              c = rc(c);\n              a(b, c, null, d);\n            },\n            zc: Xb,\n            yd: function(a, b) {\n              b >>>= 0;\n              a = U(a >>> 0);\n              b = U(b);\n              return a == b;\n            },\n            Jd: function(a) {\n              a >>>= 0;\n              if (0 === a)\n                return V(tc());\n              a = rc(a);\n              return V(tc()[a]);\n            },\n            ma: function(a, b) {\n              var c = vc(a, b >>> 0), d = c[0];\n              b = d.name + "_$" + c.slice(1).map(function(n) {\n                return n.name;\n              }).join("_") + "$";\n              var e = xc[b];\n              if (void 0 !== e)\n                return e;\n              e = ["retType"];\n              for (var f = [d], g = "", h = 0; h < a - 1; ++h)\n                g += (0 !== h ? ", " : "") + "arg" + h, e.push("argType" + h), f.push(c[1 + h]);\n              var k = "return function " + wc("methodCaller_" + b) + "(handle, name, destructors, args) {\\n", l = 0;\n              for (h = 0; h < a - 1; ++h)\n                k += "    var arg" + h + " = argType" + h + ".readValueFromPointer(args" + (l ? "+" + l : "") + ");\\n", l += c[h + 1].argPackAdvance;\n              k += "    var rv = handle[name](" + g + ");\\n";\n              for (h = 0; h < a - 1; ++h)\n                c[h + 1].deleteObject && (k += "    argType" + h + ".deleteObject(arg" + h + ");\\n");\n              d.rf || (k += "    return retType.toWireType(destructors, rv);\\n");\n              e.push(k + "};\\n");\n              a = zc(e).apply(null, f);\n              e = uc(a);\n              return xc[b] = e;\n            },\n            Hd: function(a, b) {\n              b >>>= 0;\n              a = U(a >>> 0);\n              b = U(b);\n              return V(a[b]);\n            },\n            Q: function(a) {\n              a >>>= 0;\n              4 < a && (T.get(a).$e += 1);\n            },\n            Bd: function(a, b, c, d) {\n              c >>>= 0;\n              d >>>= 0;\n              a = U(a >>> 0);\n              var e = Bc[b];\n              e || (e = Ac(b), Bc[b] = e);\n              return e(a, c, d);\n            },\n            rd: function() {\n              return V([]);\n            },\n            td: function(a) {\n              a = U(a >>> 0);\n              for (var b = Array(a.length), c = 0; c < a.length; c++)\n                b[c] = a[c];\n              return V(b);\n            },\n            X: function(a) {\n              return V(rc(a >>> 0));\n            },\n            Ra: function() {\n              return V({});\n            },\n            Cd: function(a) {\n              a >>>= 0;\n              for (var b = U(a); b.length; ) {\n                var c = b.pop();\n                b.pop()(c);\n              }\n              Xb(a);\n            },\n            Ad: function(a, b, c) {\n              b >>>= 0;\n              c >>>= 0;\n              a = U(a >>> 0);\n              b = U(b);\n              c = U(c);\n              a[b] = c;\n            },\n            bb: function(a, b) {\n              b >>>= 0;\n              a = pc(a >>> 0, "_emval_take_value");\n              a = a.readValueFromPointer(b);\n              return V(a);\n            },\n            Qc: function(a, b) {\n              a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);\n              b >>>= 0;\n              a = new Date(1e3 * a);\n              A()[b >>> 2 >>> 0] = a.getUTCSeconds();\n              A()[b + 4 >>> 2 >>> 0] = a.getUTCMinutes();\n              A()[b + 8 >>> 2 >>> 0] = a.getUTCHours();\n              A()[b + 12 >>> 2 >>> 0] = a.getUTCDate();\n              A()[b + 16 >>> 2 >>> 0] = a.getUTCMonth();\n              A()[b + 20 >>> 2 >>> 0] = a.getUTCFullYear() - 1900;\n              A()[b + 24 >>> 2 >>> 0] = a.getUTCDay();\n              a = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;\n              A()[b + 28 >>> 2 >>> 0] = a;\n            },\n            Rc: function(a, b) {\n              a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);\n              b >>>= 0;\n              a = new Date(1e3 * a);\n              A()[b >>> 2 >>> 0] = a.getSeconds();\n              A()[b + 4 >>> 2 >>> 0] = a.getMinutes();\n              A()[b + 8 >>> 2 >>> 0] = a.getHours();\n              A()[b + 12 >>> 2 >>> 0] = a.getDate();\n              A()[b + 16 >>> 2 >>> 0] = a.getMonth();\n              A()[b + 20 >>> 2 >>> 0] = a.getFullYear() - 1900;\n              A()[b + 24 >>> 2 >>> 0] = a.getDay();\n              var c = (Cc(a.getFullYear()) ? Dc : Ec)[a.getMonth()] + a.getDate() - 1 | 0;\n              A()[b + 28 >>> 2 >>> 0] = c;\n              A()[b + 36 >>> 2 >>> 0] = -(60 * a.getTimezoneOffset());\n              c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();\n              var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();\n              a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;\n              A()[b + 32 >>> 2 >>> 0] = a;\n            },\n            Sc: function(a) {\n              a >>>= 0;\n              var b = new Date(A()[a + 20 >>> 2 >>> 0] + 1900, A()[a + 16 >>> 2 >>> 0], A()[a + 12 >>> 2 >>> 0], A()[a + 8 >>> 2 >>> 0], A()[a + 4 >>> 2 >>> 0], A()[a >>> 2 >>> 0], 0), c = A()[a + 32 >>> 2 >>> 0], d = b.getTimezoneOffset(), e = new Date(\n                b.getFullYear(),\n                6,\n                1\n              ).getTimezoneOffset(), f = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(), g = Math.min(f, e);\n              0 > c ? A()[a + 32 >>> 2 >>> 0] = Number(e != f && g == d) : 0 < c != (g == d) && (e = Math.max(f, e), b.setTime(b.getTime() + 6e4 * ((0 < c ? g : e) - d)));\n              A()[a + 24 >>> 2 >>> 0] = b.getDay();\n              c = (Cc(b.getFullYear()) ? Dc : Ec)[b.getMonth()] + b.getDate() - 1 | 0;\n              A()[a + 28 >>> 2 >>> 0] = c;\n              A()[a >>> 2 >>> 0] = b.getSeconds();\n              A()[a + 4 >>> 2 >>> 0] = b.getMinutes();\n              A()[a + 8 >>> 2 >>> 0] = b.getHours();\n              A()[a + 12 >>> 2 >>> 0] = b.getDate();\n              A()[a + 16 >>> 2 >>> 0] = b.getMonth();\n              A()[a + 20 >>> 2 >>> 0] = b.getYear();\n              return BigInt(b.getTime() / 1e3);\n            },\n            Oc: Fc,\n            Pc: Gc,\n            Cc: function(a, b, c) {\n              function d(l) {\n                return (l = l.toTimeString().match(/\\(([A-Za-z ]+)\\)$/)) ? l[1] : "GMT";\n              }\n              a >>>= 0;\n              b >>>= 0;\n              c >>>= 0;\n              var e = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(e, 0, 1), g = new Date(e, 6, 1);\n              e = f.getTimezoneOffset();\n              var h = g.getTimezoneOffset(), k = Math.max(e, h);\n              B()[a >>> 2 >>> 0] = 60 * k;\n              A()[b >>> 2 >>> 0] = Number(e != h);\n              a = d(f);\n              b = d(g);\n              a = Ic(a);\n              b = Ic(b);\n              h < e ? (B()[c >>> 2 >>> 0] = a, B()[c + 4 >>> 2 >>> 0] = b) : (B()[c >>> 2 >>> 0] = b, B()[c + 4 >>> 2 >>> 0] = a);\n            },\n            aa: () => {\n              Aa("");\n            },\n            Vb: () => {\n            },\n            Xb: () => Date.now(),\n            bd: () => {\n              La += 1;\n              throw "unwind";\n            },\n            Ec: function() {\n              return 4294901760;\n            },\n            va: () => performance.timeOrigin + performance.now(),\n            jb: () => F ? (init_os(), __toCommonJS(os_exports)).cpus().length : navigator.hardwareConcurrency,\n            Bc: function(a) {\n              a >>>= 0;\n              var b = x().length;\n              if (a <= b || 4294901760 < a)\n                return false;\n              for (var c = 1; 4 >= c; c *= 2) {\n                var d = b * (1 + 0.2 / c);\n                d = Math.min(d, a + 100663296);\n                var e = Math;\n                d = Math.max(a, d);\n                a: {\n                  e = (e.min.call(e, 4294901760, d + (65536 - d % 65536) % 65536) - q.buffer.byteLength + 65535) / 65536;\n                  try {\n                    q.grow(e);\n                    t();\n                    var f = 1;\n                    break a;\n                  } catch (g) {\n                  }\n                  f = void 0;\n                }\n                if (f)\n                  return true;\n              }\n              return false;\n            },\n            Xc: Mc,\n            Yc: Nc,\n            Lc: eb,\n            Bb: Oc,\n            Tb: Pc,\n            Uc: Qc,\n            Sb: Sc,\n            ib: dd,\n            fd: ed,\n            sa: fd,\n            G: gd,\n            pa: hd,\n            ga: jd,\n            gd: kd,\n            nd: ld,\n            N: md,\n            z: nd,\n            c: od,\n            dc: pd,\n            ya: qd,\n            g: rd,\n            Eb: sd,\n            d: td,\n            Y: ud,\n            j: vd,\n            id: wd,\n            k: xd,\n            r: yd,\n            s: zd,\n            p: Ad,\n            Aa: Bd,\n            Va: Cd,\n            ia: Dd,\n            Pb: Ed,\n            $a: Fd,\n            Ib: Gd,\n            nb: Hd,\n            ic: Id,\n            xc: Jd,\n            fc: Kd,\n            gc: Ld,\n            $b: Md,\n            ka: Nd,\n            yb: Od,\n            Ba: Pd,\n            Db: Qd,\n            da: Rd,\n            hc: Sd,\n            Pa: Td,\n            F: Ud,\n            L: Vd,\n            Gb: Wd,\n            sd: Xd,\n            oa: Yd,\n            O: Zd,\n            $: $d,\n            V: ae,\n            A: be,\n            Fb: ce,\n            ec: de,\n            C: ee,\n            Hb: fe,\n            qd: ge,\n            Qa: he,\n            eb: ie,\n            jc: je,\n            ac: ke,\n            Mb: le,\n            P: me,\n            H: ne,\n            D: oe,\n            ld: pe,\n            lb: qe,\n            R: re,\n            e: se,\n            Xa: te,\n            l: ue,\n            xa: ve,\n            Wa: we,\n            vb: xe,\n            h: ye,\n            yc: ze,\n            ca: Ae,\n            fb: Be,\n            za: Ce,\n            mb: De,\n            gb: Ee,\n            f: Fe,\n            vc: Ge,\n            ud: He,\n            o: Ie,\n            sc: Je,\n            m: Ke,\n            wc: Le,\n            rc: Me,\n            wd: Ne,\n            w: Oe,\n            Na: Pe,\n            tb: Qe,\n            Ma: Re,\n            Kb: Se,\n            B: Te,\n            E: Ue,\n            W: Ve,\n            Ua: We,\n            oc: Xe,\n            Dd: Ye,\n            ub: Ze,\n            ua: $e,\n            ja: af,\n            S: bf,\n            ab: cf,\n            Ha: df,\n            Gd: ef,\n            kb: ff,\n            Da: gf,\n            lc: hf,\n            Ca: jf,\n            Ea: kf,\n            jd: lf,\n            Ed: mf,\n            na: nf,\n            vd: of,\n            Ia: pf,\n            Ga: qf,\n            qc: rf,\n            Fa: sf,\n            Ja: tf,\n            pb: uf,\n            ha: vf,\n            ta: wf,\n            kc: xf,\n            pc: yf,\n            Jb: zf,\n            Za: Af,\n            fa: Bf,\n            Rb: Cf,\n            pd: Df,\n            U: Ef,\n            wb: Ff,\n            db: Gf,\n            Ta: Hf,\n            hb: If,\n            J: Jf,\n            T: Kf,\n            xb: Lf,\n            od: Mf,\n            uc: Nf,\n            ba: Of,\n            ob: Pf,\n            ra: Qf,\n            nc: Rf,\n            bc: Sf,\n            Id: Tf,\n            x: Uf,\n            cb: Vf,\n            zd: Wf,\n            Nb: Xf,\n            mc: Yf,\n            Kd: Zf,\n            Ob: $f,\n            Lb: ag,\n            _a: bg,\n            Qb: cg,\n            Ka: dg,\n            cc: eg,\n            Z: fg,\n            tc: gg,\n            K: hg,\n            md: ig,\n            Ya: jg,\n            qa: kg,\n            I: lg,\n            rb: mg,\n            La: ng,\n            Oa: og,\n            qb: pg,\n            sb: qg,\n            v: function(a) {\n              return a >>> 0;\n            },\n            a: q || C.wasmMemory,\n            Kc: Xc,\n            ea: function(a, b, c, d) {\n              return Xc(a >>> 0, b >>> 0, c >>> 0, d >>> 0);\n            }\n          }, Z = function() {\n            var a = { a: rg };\n            Na++;\n            Wa(a, function(b) {\n              var c = b.module;\n              Z = b.instance.exports;\n              Z = sg();\n              M.ff.push(Z.oe);\n              nb = Z.re;\n              Ja.unshift(Z.Ld);\n              Ba = c;\n              Qa();\n            }).catch(ma);\n            return {};\n          }();\n          C._OrtInit = (a, b) => (C._OrtInit = Z.Md)(a, b);\n          C._OrtGetLastError = (a, b) => (C._OrtGetLastError = Z.Nd)(a, b);\n          C._OrtCreateSessionOptions = (a, b, c, d, e, f, g, h, k, l) => (C._OrtCreateSessionOptions = Z.Od)(a, b, c, d, e, f, g, h, k, l);\n          C._OrtAppendExecutionProvider = (a, b) => (C._OrtAppendExecutionProvider = Z.Pd)(a, b);\n          C._OrtAddFreeDimensionOverride = (a, b, c) => (C._OrtAddFreeDimensionOverride = Z.Qd)(a, b, c);\n          C._OrtAddSessionConfigEntry = (a, b, c) => (C._OrtAddSessionConfigEntry = Z.Rd)(a, b, c);\n          C._OrtReleaseSessionOptions = (a) => (C._OrtReleaseSessionOptions = Z.Sd)(a);\n          C._OrtCreateSession = (a, b, c) => (C._OrtCreateSession = Z.Td)(a, b, c);\n          C._OrtReleaseSession = (a) => (C._OrtReleaseSession = Z.Ud)(a);\n          C._OrtGetInputOutputCount = (a, b, c) => (C._OrtGetInputOutputCount = Z.Vd)(a, b, c);\n          C._OrtGetInputName = (a, b) => (C._OrtGetInputName = Z.Wd)(a, b);\n          C._OrtGetOutputName = (a, b) => (C._OrtGetOutputName = Z.Xd)(a, b);\n          C._OrtFree = (a) => (C._OrtFree = Z.Yd)(a);\n          C._OrtCreateTensor = (a, b, c, d, e, f) => (C._OrtCreateTensor = Z.Zd)(a, b, c, d, e, f);\n          C._OrtGetTensorData = (a, b, c, d, e) => (C._OrtGetTensorData = Z._d)(a, b, c, d, e);\n          C._OrtReleaseTensor = (a) => (C._OrtReleaseTensor = Z.$d)(a);\n          C._OrtCreateRunOptions = (a, b, c, d) => (C._OrtCreateRunOptions = Z.ae)(a, b, c, d);\n          C._OrtAddRunConfigEntry = (a, b, c) => (C._OrtAddRunConfigEntry = Z.be)(a, b, c);\n          C._OrtReleaseRunOptions = (a) => (C._OrtReleaseRunOptions = Z.ce)(a);\n          C._OrtCreateBinding = (a) => (C._OrtCreateBinding = Z.de)(a);\n          C._OrtBindInput = (a, b, c) => (C._OrtBindInput = Z.ee)(a, b, c);\n          C._OrtBindOutput = (a, b, c, d) => (C._OrtBindOutput = Z.fe)(a, b, c, d);\n          C._OrtClearBoundOutputs = (a) => (C._OrtClearBoundOutputs = Z.ge)(a);\n          C._OrtReleaseBinding = (a) => (C._OrtReleaseBinding = Z.he)(a);\n          C._OrtRunWithBinding = (a, b, c, d, e) => (C._OrtRunWithBinding = Z.ie)(a, b, c, d, e);\n          C._OrtRun = (a, b, c, d, e, f, g, h) => (C._OrtRun = Z.je)(a, b, c, d, e, f, g, h);\n          C._OrtEndProfiling = (a) => (C._OrtEndProfiling = Z.ke)(a);\n          var ib = C._pthread_self = () => (ib = C._pthread_self = Z.le)(), Hc = C._malloc = (a) => (Hc = C._malloc = Z.me)(a), X = C._free = (a) => (X = C._free = Z.ne)(a);\n          C.__emscripten_tls_init = () => (C.__emscripten_tls_init = Z.oe)();\n          var oc = (a) => (oc = Z.pe)(a);\n          C.__embind_initialize_bindings = () => (C.__embind_initialize_bindings = Z.qe)();\n          var cd = C.__emscripten_thread_init = (a, b, c, d, e, f) => (cd = C.__emscripten_thread_init = Z.se)(a, b, c, d, e, f);\n          C.__emscripten_thread_crashed = () => (C.__emscripten_thread_crashed = Z.te)();\n          var mc = (a, b, c, d) => (mc = Z.ue)(a, b, c, d), hb = (a) => (hb = Z.ve)(a), ob = C.__emscripten_thread_exit = (a) => (ob = C.__emscripten_thread_exit = Z.we)(a), jc = C.__emscripten_check_mailbox = () => (jc = C.__emscripten_check_mailbox = Z.xe)(), Y = (a, b) => (Y = Z.ye)(a, b), tb = (a) => (tb = Z.ze)(a), lb = (a, b) => (lb = Z.Ae)(a, b), W = () => (W = Z.Be)(), O = (a) => (O = Z.Ce)(a), lc = (a) => (lc = Z.De)(a), bd = (a) => (bd = Z.Ee)(a), ad = (a) => (ad = Z.Fe)(a), ub = (a, b, c) => (ub = Z.Ge)(a, b, c), sb = (a) => (sb = Z.He)(a);\n          function td(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function rd(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function ye(a, b, c) {\n            var d = W();\n            try {\n              P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function od(a, b) {\n            var c = W();\n            try {\n              return P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n            }\n          }\n          function ue(a, b) {\n            var c = W();\n            try {\n              P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n            }\n          }\n          function Ud(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function se(a) {\n            var b = W();\n            try {\n              P(a)();\n            } catch (c) {\n              O(b);\n              if (c !== c + 0)\n                throw c;\n              Y(1, 0);\n            }\n          }\n          function yd(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function xd(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function vd(a, b, c, d, e) {\n            var f = W();\n            try {\n              return P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function Fe(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function Ie(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function nd(a) {\n            var b = W();\n            try {\n              return P(a)();\n            } catch (c) {\n              O(b);\n              if (c !== c + 0)\n                throw c;\n              Y(1, 0);\n            }\n          }\n          function be(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function Uf(a, b, c) {\n            var d = W();\n            try {\n              P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function Ke(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function zd(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function jd(a, b) {\n            var c = W();\n            try {\n              return P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n            }\n          }\n          function me(a, b) {\n            var c = W();\n            try {\n              return P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function dd(a, b) {\n            var c = W();\n            try {\n              return P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n            }\n          }\n          function Ad(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Jf(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function Oe(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Zf(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function Cf(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Te(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function Of(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function Bd(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function Ue(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Od(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function Lf(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Ve(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function ne(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function ze(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function Jd(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Dd(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function cf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {\n            var w = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);\n            } catch (y) {\n              O(w);\n              if (y !== y + 0)\n                throw y;\n              Y(1, 0);\n            }\n          }\n          function Tf(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function Ff(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function Kf(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function xe(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function If(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Ee(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Le(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function jg(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function oe(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function Ge(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function ef(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {\n            var D = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);\n            } catch (E) {\n              O(D);\n              if (E !== E + 0)\n                throw E;\n              Y(1, 0);\n            }\n          }\n          function Nf(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function gg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y) {\n            var z = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y);\n            } catch (D) {\n              O(z);\n              if (D !== D + 0)\n                throw D;\n              Y(1, 0);\n            }\n          }\n          function Bf(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function cg(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Vd(a, b, c, d, e) {\n            var f = W();\n            try {\n              return P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function $d(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {\n            var w = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);\n            } catch (y) {\n              O(w);\n              if (y !== y + 0)\n                throw y;\n              Y(1, 0);\n            }\n          }\n          function hg(a, b) {\n            var c = W();\n            try {\n              P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n            }\n          }\n          function re(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function Zd(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function md(a, b, c, d, e) {\n            var f = W();\n            try {\n              return P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function Ze(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {\n            var y = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);\n            } catch (z) {\n              O(y);\n              if (z !== z + 0)\n                throw z;\n              Y(1, 0);\n            }\n          }\n          function te(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function Je(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Be(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function Me(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function mf(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function Ed(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {\n            var D = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);\n            } catch (E) {\n              O(D);\n              if (E !== E + 0)\n                throw E;\n              Y(1, 0);\n            }\n          }\n          function bf(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function he(a, b) {\n            var c = W();\n            try {\n              return P(a)(b);\n            } catch (d) {\n              O(c);\n              if (d !== d + 0)\n                throw d;\n              Y(1, 0);\n            }\n          }\n          function Fd(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {\n            var J = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);\n            } catch (K) {\n              O(J);\n              if (K !== K + 0)\n                throw K;\n              Y(1, 0);\n            }\n          }\n          function bg(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function Td(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function $e(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function ae(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function wf(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Ye(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {\n            var w = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);\n            } catch (y) {\n              O(w);\n              if (y !== y + 0)\n                throw y;\n              Y(1, 0);\n            }\n          }\n          function og(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D) {\n            var E = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D);\n            } catch (I) {\n              O(E);\n              if (I !== I + 0)\n                throw I;\n              Y(1, 0);\n            }\n          }\n          function Qe(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {\n            var D = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);\n            } catch (E) {\n              O(D);\n              if (E !== E + 0)\n                throw E;\n              Y(1, 0);\n            }\n          }\n          function Pe(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y) {\n            var z = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y);\n            } catch (D) {\n              O(z);\n              if (D !== D + 0)\n                throw D;\n              Y(1, 0);\n            }\n          }\n          function Re(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {\n            var y = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);\n            } catch (z) {\n              O(y);\n              if (z !== z + 0)\n                throw z;\n              Y(1, 0);\n            }\n          }\n          function qg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J) {\n            var K = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J);\n            } catch (aa) {\n              O(K);\n              if (aa !== aa + 0)\n                throw aa;\n              Y(1, 0);\n            }\n          }\n          function ng(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E) {\n            var I = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E);\n            } catch (J) {\n              O(I);\n              if (J !== J + 0)\n                throw J;\n              Y(1, 0);\n            }\n          }\n          function mg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {\n            var D = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);\n            } catch (E) {\n              O(D);\n              if (E !== E + 0)\n                throw E;\n              Y(1, 0);\n            }\n          }\n          function pg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {\n            var J = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);\n            } catch (K) {\n              O(J);\n              if (K !== K + 0)\n                throw K;\n              Y(1, 0);\n            }\n          }\n          function $f(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function Xf(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function fg(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {\n            var y = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);\n            } catch (z) {\n              O(y);\n              if (z !== z + 0)\n                throw z;\n              Y(1, 0);\n            }\n          }\n          function lg(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function kg(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function hd(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Ce(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function le(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function Nd(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function ag(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Ef(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function uf(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function Rd(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function rf(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function yf(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function Qf(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function ie(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function vf(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function dg(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function tf(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function pf(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function Wf(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Xe(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function Gf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {\n            var w = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);\n            } catch (y) {\n              O(w);\n              if (y !== y + 0)\n                throw y;\n              Y(1, 0);\n            }\n          }\n          function Yd(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function df(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {\n            var y = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);\n            } catch (z) {\n              O(y);\n              if (z !== z + 0)\n                throw z;\n              Y(1, 0);\n            }\n          }\n          function qf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {\n            var w = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);\n            } catch (y) {\n              O(w);\n              if (y !== y + 0)\n                throw y;\n              Y(1, 0);\n            }\n          }\n          function nf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w) {\n            var y = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w);\n            } catch (z) {\n              O(y);\n              if (z !== z + 0)\n                throw z;\n              Y(1, 0);\n            }\n          }\n          function we(a, b, c) {\n            var d = W();\n            try {\n              P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function Rf(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Se(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function sf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J, K, aa, vg, wg, xg) {\n            var yg = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J, K, aa, vg, wg, xg);\n            } catch (fb) {\n              O(yg);\n              if (fb !== fb + 0)\n                throw fb;\n              Y(1, 0);\n            }\n          }\n          function Pf(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Hd(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function af(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function De(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function kf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J) {\n            var K = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I, J);\n            } catch (aa) {\n              O(K);\n              if (aa !== aa + 0)\n                throw aa;\n              Y(1, 0);\n            }\n          }\n          function qd(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function Ne(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function Yf(a, b, c, d, e, f, g, h, k, l, n, u, v, m) {\n            var w = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m);\n            } catch (y) {\n              O(w);\n              if (y !== y + 0)\n                throw y;\n              Y(1, 0);\n            }\n          }\n          function zf(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function gf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z) {\n            var D = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z);\n            } catch (E) {\n              O(D);\n              if (E !== E + 0)\n                throw E;\n              Y(1, 0);\n            }\n          }\n          function jf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {\n            var J = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);\n            } catch (K) {\n              O(J);\n              if (K !== K + 0)\n                throw K;\n              Y(1, 0);\n            }\n          }\n          function hf(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E) {\n            var I = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E);\n            } catch (J) {\n              O(I);\n              if (J !== J + 0)\n                throw J;\n              Y(1, 0);\n            }\n          }\n          function of(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function Cd(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function Gd(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I) {\n            var J = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y, z, D, E, I);\n            } catch (K) {\n              O(J);\n              if (K !== K + 0)\n                throw K;\n              Y(1, 0);\n            }\n          }\n          function He(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function We(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function ee(a, b, c, d, e) {\n            var f = W();\n            try {\n              return P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function qe(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function xf(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function fe(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Af(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function je(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Hf(a, b, c, d, e, f, g, h, k) {\n            var l = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k);\n            } catch (n) {\n              O(l);\n              if (n !== n + 0)\n                throw n;\n              Y(1, 0);\n            }\n          }\n          function Ae(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function Pd(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function Vf(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function ud(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Wd(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function Id(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function Sd(a, b, c, d, e, f, g, h) {\n            var k = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h);\n            } catch (l) {\n              O(k);\n              if (l !== l + 0)\n                throw l;\n              Y(1, 0);\n            }\n          }\n          function Ld(a, b, c, d, e, f, g, h, k, l, n) {\n            var u = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n);\n            } catch (v) {\n              O(u);\n              if (v !== v + 0)\n                throw v;\n              Y(1, 0);\n            }\n          }\n          function Xd(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function Kd(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              return P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function de(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function ge(a, b, c, d, e, f, g) {\n            var h = W();\n            try {\n              return P(a)(b, c, d, e, f, g);\n            } catch (k) {\n              O(h);\n              if (k !== k + 0)\n                throw k;\n              Y(1, 0);\n            }\n          }\n          function ce(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function Df(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function Mf(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function pd(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function sd(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function ve(a, b, c, d) {\n            var e = W();\n            try {\n              P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function ld(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function ig(a, b, c, d, e) {\n            var f = W();\n            try {\n              P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function pe(a, b, c, d, e) {\n            var f = W();\n            try {\n              return P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function gd(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function eg(a, b, c, d, e, f, g, h, k, l, n, u, v) {\n            var m = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v);\n            } catch (w) {\n              O(m);\n              if (w !== w + 0)\n                throw w;\n              Y(1, 0);\n            }\n          }\n          function Sf(a, b, c, d, e, f, g, h, k, l) {\n            var n = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l);\n            } catch (u) {\n              O(n);\n              if (u !== u + 0)\n                throw u;\n              Y(1, 0);\n            }\n          }\n          function fd(a, b, c, d) {\n            var e = W();\n            try {\n              return P(a)(b, c, d);\n            } catch (f) {\n              O(e);\n              if (f !== f + 0)\n                throw f;\n              Y(1, 0);\n            }\n          }\n          function lf(a, b, c, d, e, f, g, h, k, l, n, u) {\n            var v = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u);\n            } catch (m) {\n              O(v);\n              if (m !== m + 0)\n                throw m;\n              Y(1, 0);\n            }\n          }\n          function Qd(a, b, c, d, e) {\n            var f = W();\n            try {\n              return P(a)(b, c, d, e);\n            } catch (g) {\n              O(f);\n              if (g !== g + 0)\n                throw g;\n              Y(1, 0);\n            }\n          }\n          function ke(a) {\n            var b = W();\n            try {\n              return P(a)();\n            } catch (c) {\n              O(b);\n              if (c !== c + 0)\n                throw c;\n              Y(1, 0);\n              return 0n;\n            }\n          }\n          function Md(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function wd(a, b, c, d, e, f) {\n            var g = W();\n            try {\n              return P(a)(b, c, d, e, f);\n            } catch (h) {\n              O(g);\n              if (h !== h + 0)\n                throw h;\n              Y(1, 0);\n            }\n          }\n          function ff(a, b, c, d, e, f, g, h, k, l, n, u, v, m, w, y) {\n            var z = W();\n            try {\n              P(a)(b, c, d, e, f, g, h, k, l, n, u, v, m, w, y);\n            } catch (D) {\n              O(z);\n              if (D !== D + 0)\n                throw D;\n              Y(1, 0);\n            }\n          }\n          function kd(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function ed(a, b, c) {\n            var d = W();\n            try {\n              return P(a)(b, c);\n            } catch (e) {\n              O(d);\n              if (e !== e + 0)\n                throw e;\n              Y(1, 0);\n            }\n          }\n          function sg() {\n            var a = Z;\n            a = Object.assign({}, a);\n            var b = (d) => () => d() >>> 0, c = (d) => (e) => d(e) >>> 0;\n            a.__errno_location = b(a.__errno_location);\n            a.le = b(a.le);\n            a.me = c(a.me);\n            a.pe = c(a.pe);\n            a.Be = b(a.Be);\n            a.De = c(a.De);\n            return a;\n          }\n          C.keepRuntimeAlive = Ma;\n          C.wasmMemory = q;\n          C.stackAlloc = lc;\n          C.stackSave = W;\n          C.stackRestore = O;\n          C.UTF8ToString = bb;\n          C.stringToUTF8 = Cb;\n          C.lengthBytesUTF8 = Ab;\n          C.ExitStatus = Xa;\n          C.PThread = M;\n          var tg;\n          Pa = function ug() {\n            tg || zg();\n            tg || (Pa = ug);\n          };\n          function zg() {\n            0 < Na || (G ? (la(C), G || kb(Ja), startWorker(C)) : (kb(Ia), 0 < Na || tg || (tg = true, C.calledRun = true, Ca || (G || kb(Ja), la(C), G || kb(Ka)))));\n          }\n          zg();\n          return moduleArg.ready;\n        };\n      })();\n      if (typeof exports === "object" && typeof module === "object")\n        module.exports = ortWasmThreaded;\n      else if (typeof define === "function" && define["amd"])\n        define([], () => ortWasmThreaded);\n    }\n  });\n\n  // web/lib/wasm/binding/ort-wasm-threaded.worker.js\n  var require_ort_wasm_threaded_worker = __commonJS({\n    "web/lib/wasm/binding/ort-wasm-threaded.worker.js"(exports, module) {\n      module.exports = \'"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:f=>(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f),postMessage:msg=>parentPort.postMessage(msg),performance:global.performance||{now:Date.now}})}var initializedJS=false;function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"\\\\n");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var module=Module["wasmModule"];Module["wasmModule"]=null;var instance=new WebAssembly.Instance(module,info);return receiveInstance(instance)};self.onunhandledrejection=e=>{throw e.reason||e};function handleMessage(e){try{if(e.data.cmd==="load"){let messageQueue=[];self.onmessage=e=>messageQueue.push(e);self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"});for(let msg of messageQueue){handleMessage(msg)}self.onmessage=handleMessage};Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=(...args)=>{postMessage({cmd:"callHandler",handler:handler,args:args})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,/*is_main=*/0,/*is_runtime=*/0,/*can_block=*/1);Module["__emscripten_thread_mailbox_await"](e.data.pthread_ptr);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){Module["__embind_initialize_bindings"]();initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){throw ex}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="checkMailbox"){if(initializedJS){Module["checkMailbox"]()}}else if(e.data.cmd){err(`worker.js received unknown command ${e.data.cmd}`);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}}self.onmessage=handleMessage;\\n\';\n    }\n  });\n\n  // nodejs-ignore:node:path\n  var join = void 0;\n\n  // web/lib/wasm/wasm-factory.ts\n  var ortWasmFactory;\n  if (true) {\n    ortWasmFactory = require_ort_training_wasm_simd();\n  } else {\n    ortWasmFactory = true ? null : null;\n  }\n  var ortWasmFactoryThreaded = true ? true ? require_ort_wasm_threaded() : null : ortWasmFactory;\n  var wasm;\n  var initialized = false;\n  var initializing = false;\n  var aborted = false;\n  var isMultiThreadSupported = () => {\n    try {\n      if (typeof SharedArrayBuffer === "undefined") {\n        return false;\n      }\n      if (typeof MessageChannel !== "undefined") {\n        new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));\n      }\n      return WebAssembly.validate(new Uint8Array([\n        0,\n        97,\n        115,\n        109,\n        1,\n        0,\n        0,\n        0,\n        1,\n        4,\n        1,\n        96,\n        0,\n        0,\n        3,\n        2,\n        1,\n        0,\n        5,\n        4,\n        1,\n        3,\n        1,\n        1,\n        10,\n        11,\n        1,\n        9,\n        0,\n        65,\n        0,\n        254,\n        16,\n        2,\n        0,\n        26,\n        11\n      ]));\n    } catch (e) {\n      return false;\n    }\n  };\n  var isSimdSupported = () => {\n    try {\n      return WebAssembly.validate(new Uint8Array([\n        0,\n        97,\n        115,\n        109,\n        1,\n        0,\n        0,\n        0,\n        1,\n        4,\n        1,\n        96,\n        0,\n        0,\n        3,\n        2,\n        1,\n        0,\n        10,\n        30,\n        1,\n        28,\n        0,\n        65,\n        0,\n        253,\n        15,\n        253,\n        12,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        253,\n        186,\n        1,\n        26,\n        11\n      ]));\n    } catch (e) {\n      return false;\n    }\n  };\n  var getWasmFileName = (useSimd, useThreads) => {\n    if (useSimd) {\n      if (true) {\n        return "ort-training-wasm-simd.wasm";\n      }\n      return useThreads ? "ort-wasm-simd-threaded.wasm" : "ort-wasm-simd.wasm";\n    } else {\n      return useThreads ? "ort-wasm-threaded.wasm" : "ort-wasm.wasm";\n    }\n  };\n  var initializeWebAssembly = async (flags) => {\n    if (initialized) {\n      return Promise.resolve();\n    }\n    if (initializing) {\n      throw new Error("multiple calls to \'initializeWebAssembly()\' detected.");\n    }\n    if (aborted) {\n      throw new Error("previous call to \'initializeWebAssembly()\' failed.");\n    }\n    initializing = true;\n    const timeout = flags.initTimeout;\n    const numThreads = flags.numThreads;\n    const simd = flags.simd;\n    const useThreads = numThreads > 1 && isMultiThreadSupported();\n    const useSimd = simd && isSimdSupported();\n    const wasmPaths = flags.wasmPaths;\n    const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;\n    const wasmFileName = getWasmFileName(useSimd, useThreads);\n    const wasmPathOverride = typeof wasmPaths === "object" ? wasmPaths[wasmFileName] : void 0;\n    let isTimeout = false;\n    const tasks = [];\n    if (timeout > 0) {\n      tasks.push(new Promise((resolve) => {\n        setTimeout(() => {\n          isTimeout = true;\n          resolve();\n        }, timeout);\n      }));\n    }\n    tasks.push(new Promise((resolve, reject) => {\n      const factory = useThreads ? ortWasmFactoryThreaded : ortWasmFactory;\n      const config = {\n        locateFile: (fileName, scriptDirectory) => {\n          if (useThreads && fileName.endsWith(".worker.js") && typeof Blob !== "undefined") {\n            return URL.createObjectURL(new Blob(\n              [\n                // This require() function is handled by esbuild plugin to load file content as string.\n                // eslint-disable-next-line @typescript-eslint/no-require-imports\n                require_ort_wasm_threaded_worker()\n              ],\n              { type: "text/javascript" }\n            ));\n          }\n          if (fileName.endsWith(".wasm")) {\n            if (wasmPathOverride) {\n              return wasmPathOverride;\n            }\n            const prefix = wasmPrefixOverride ?? scriptDirectory;\n            if (false) {\n              if (wasmFileName === "ort-wasm-simd.wasm") {\n                return prefix + "ort-wasm-simd.jsep.wasm";\n              } else if (wasmFileName === "ort-wasm-simd-threaded.wasm") {\n                return prefix + "ort-wasm-simd-threaded.jsep.wasm";\n              }\n            }\n            return prefix + wasmFileName;\n          }\n          return scriptDirectory + fileName;\n        }\n      };\n      if (useThreads) {\n        if (typeof Blob === "undefined") {\n          config.mainScriptUrlOrBlob = join(__dirname, "ort-wasm-threaded.js");\n        } else {\n          const scriptSourceCode = `var ortWasmThreaded=${factory.toString()};`;\n          config.mainScriptUrlOrBlob = new Blob([scriptSourceCode], { type: "text/javascript" });\n        }\n      }\n      factory(config).then(\n        // wasm module initialized successfully\n        (module) => {\n          initializing = false;\n          initialized = true;\n          wasm = module;\n          resolve();\n        },\n        // wasm module failed to initialize\n        (what) => {\n          initializing = false;\n          aborted = true;\n          reject(what);\n        }\n      );\n    }));\n    await Promise.race(tasks);\n    if (isTimeout) {\n      throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);\n    }\n  };\n  var getInstance = () => {\n    if (initialized && wasm) {\n      return wasm;\n    }\n    throw new Error("WebAssembly is not initialized yet.");\n  };\n\n  // web/lib/wasm/wasm-utils.ts\n  var allocWasmString = (data, allocs) => {\n    const wasm2 = getInstance();\n    const dataLength = wasm2.lengthBytesUTF8(data) + 1;\n    const dataOffset = wasm2._malloc(dataLength);\n    wasm2.stringToUTF8(data, dataOffset, dataLength);\n    allocs.push(dataOffset);\n    return dataOffset;\n  };\n  var iterateExtraOptions = (options, prefix, seen, handler) => {\n    if (typeof options == "object" && options !== null) {\n      if (seen.has(options)) {\n        throw new Error("Circular reference in options");\n      } else {\n        seen.add(options);\n      }\n    }\n    Object.entries(options).forEach(([key, value]) => {\n      const name = prefix ? prefix + key : key;\n      if (typeof value === "object") {\n        iterateExtraOptions(value, name + ".", seen, handler);\n      } else if (typeof value === "string" || typeof value === "number") {\n        handler(name, value.toString());\n      } else if (typeof value === "boolean") {\n        handler(name, value ? "1" : "0");\n      } else {\n        throw new Error(`Can\'t handle extra config type: ${typeof value}`);\n      }\n    });\n  };\n  var checkLastError = (message) => {\n    const wasm2 = getInstance();\n    const stack = wasm2.stackSave();\n    try {\n      const paramsOffset = wasm2.stackAlloc(8);\n      wasm2._OrtGetLastError(paramsOffset, paramsOffset + 4);\n      const errorCode = wasm2.HEAP32[paramsOffset / 4];\n      const errorMessagePointer = wasm2.HEAPU32[paramsOffset / 4 + 1];\n      const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";\n      throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);\n    } finally {\n      wasm2.stackRestore(stack);\n    }\n  };\n\n  // web/lib/wasm/run-options.ts\n  var setRunOptions = (options) => {\n    const wasm2 = getInstance();\n    let runOptionsHandle = 0;\n    const allocs = [];\n    const runOptions = options || {};\n    try {\n      if (options?.logSeverityLevel === void 0) {\n        runOptions.logSeverityLevel = 2;\n      } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {\n        throw new Error(`log serverity level is not valid: ${options.logSeverityLevel}`);\n      }\n      if (options?.logVerbosityLevel === void 0) {\n        runOptions.logVerbosityLevel = 0;\n      } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {\n        throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);\n      }\n      if (options?.terminate === void 0) {\n        runOptions.terminate = false;\n      }\n      let tagDataOffset = 0;\n      if (options?.tag !== void 0) {\n        tagDataOffset = allocWasmString(options.tag, allocs);\n      }\n      runOptionsHandle = wasm2._OrtCreateRunOptions(\n        runOptions.logSeverityLevel,\n        runOptions.logVerbosityLevel,\n        !!runOptions.terminate,\n        tagDataOffset\n      );\n      if (runOptionsHandle === 0) {\n        checkLastError("Can\'t create run options.");\n      }\n      if (options?.extra !== void 0) {\n        iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {\n          const keyDataOffset = allocWasmString(key, allocs);\n          const valueDataOffset = allocWasmString(value, allocs);\n          if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n            checkLastError(`Can\'t set a run config entry: ${key} - ${value}.`);\n          }\n        });\n      }\n      return [runOptionsHandle, allocs];\n    } catch (e) {\n      if (runOptionsHandle !== 0) {\n        wasm2._OrtReleaseRunOptions(runOptionsHandle);\n      }\n      allocs.forEach((alloc) => wasm2._free(alloc));\n      throw e;\n    }\n  };\n\n  // web/lib/wasm/session-options.ts\n  var getGraphOptimzationLevel = (graphOptimizationLevel) => {\n    switch (graphOptimizationLevel) {\n      case "disabled":\n        return 0;\n      case "basic":\n        return 1;\n      case "extended":\n        return 2;\n      case "all":\n        return 99;\n      default:\n        throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);\n    }\n  };\n  var getExecutionMode = (executionMode) => {\n    switch (executionMode) {\n      case "sequential":\n        return 0;\n      case "parallel":\n        return 1;\n      default:\n        throw new Error(`unsupported execution mode: ${executionMode}`);\n    }\n  };\n  var appendDefaultOptions = (options) => {\n    if (!options.extra) {\n      options.extra = {};\n    }\n    if (!options.extra.session) {\n      options.extra.session = {};\n    }\n    const session = options.extra.session;\n    if (!session.use_ort_model_bytes_directly) {\n      session.use_ort_model_bytes_directly = "1";\n    }\n    if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {\n      options.enableMemPattern = false;\n    }\n  };\n  var setExecutionProviders = (sessionOptionsHandle, executionProviders, allocs) => {\n    for (const ep of executionProviders) {\n      let epName = typeof ep === "string" ? ep : ep.name;\n      switch (epName) {\n        case "xnnpack":\n          epName = "XNNPACK";\n          break;\n        case "webnn":\n          epName = "WEBNN";\n          if (typeof ep !== "string") {\n            const webnnOptions = ep;\n            if (webnnOptions?.deviceType) {\n              const keyDataOffset = allocWasmString("deviceType", allocs);\n              const valueDataOffset = allocWasmString(webnnOptions.deviceType, allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(`Can\'t set a session config entry: \'deviceType\' - ${webnnOptions.deviceType}.`);\n              }\n            }\n            if (webnnOptions?.numThreads) {\n              let numThreads = webnnOptions.numThreads;\n              if (typeof numThreads != "number" || !Number.isInteger(numThreads) || numThreads < 0) {\n                numThreads = 0;\n              }\n              const keyDataOffset = allocWasmString("numThreads", allocs);\n              const valueDataOffset = allocWasmString(numThreads.toString(), allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(`Can\'t set a session config entry: \'numThreads\' - ${webnnOptions.numThreads}.`);\n              }\n            }\n            if (webnnOptions?.powerPreference) {\n              const keyDataOffset = allocWasmString("powerPreference", allocs);\n              const valueDataOffset = allocWasmString(webnnOptions.powerPreference, allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(\n                  `Can\'t set a session config entry: \'powerPreference\' - ${webnnOptions.powerPreference}.`\n                );\n              }\n            }\n          }\n          break;\n        case "webgpu":\n          epName = "JS";\n          if (typeof ep !== "string") {\n            const webgpuOptions = ep;\n            if (webgpuOptions?.preferredLayout) {\n              if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {\n                throw new Error(`preferredLayout must be either \'NCHW\' or \'NHWC\': ${webgpuOptions.preferredLayout}`);\n              }\n              const keyDataOffset = allocWasmString("preferredLayout", allocs);\n              const valueDataOffset = allocWasmString(webgpuOptions.preferredLayout, allocs);\n              if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n                checkLastError(\n                  `Can\'t set a session config entry: \'preferredLayout\' - ${webgpuOptions.preferredLayout}.`\n                );\n              }\n            }\n          }\n          break;\n        case "wasm":\n        case "cpu":\n          continue;\n        default:\n          throw new Error(`not supported execution provider: ${epName}`);\n      }\n      const epNameDataOffset = allocWasmString(epName, allocs);\n      if (getInstance()._OrtAppendExecutionProvider(sessionOptionsHandle, epNameDataOffset) !== 0) {\n        checkLastError(`Can\'t append execution provider: ${epName}.`);\n      }\n    }\n  };\n  var setSessionOptions = (options) => {\n    const wasm2 = getInstance();\n    let sessionOptionsHandle = 0;\n    const allocs = [];\n    const sessionOptions = options || {};\n    appendDefaultOptions(sessionOptions);\n    try {\n      const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");\n      const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");\n      const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;\n      const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;\n      if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {\n        throw new Error(`log serverity level is not valid: ${logSeverityLevel}`);\n      }\n      const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;\n      if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {\n        throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);\n      }\n      const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;\n      sessionOptionsHandle = wasm2._OrtCreateSessionOptions(\n        graphOptimizationLevel,\n        !!sessionOptions.enableCpuMemArena,\n        !!sessionOptions.enableMemPattern,\n        executionMode,\n        !!sessionOptions.enableProfiling,\n        0,\n        logIdDataOffset,\n        logSeverityLevel,\n        logVerbosityLevel,\n        optimizedModelFilePathOffset\n      );\n      if (sessionOptionsHandle === 0) {\n        checkLastError("Can\'t create session options.");\n      }\n      if (sessionOptions.executionProviders) {\n        setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);\n      }\n      if (sessionOptions.freeDimensionOverrides) {\n        for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {\n          if (typeof name !== "string") {\n            throw new Error(`free dimension override name must be a string: ${name}`);\n          }\n          if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {\n            throw new Error(`free dimension override value must be a non-negative integer: ${value}`);\n          }\n          const nameOffset = allocWasmString(name, allocs);\n          if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {\n            checkLastError(`Can\'t set a free dimension override: ${name} - ${value}.`);\n          }\n        }\n      }\n      if (sessionOptions.extra !== void 0) {\n        iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {\n          const keyDataOffset = allocWasmString(key, allocs);\n          const valueDataOffset = allocWasmString(value, allocs);\n          if (wasm2._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {\n            checkLastError(`Can\'t set a session config entry: ${key} - ${value}.`);\n          }\n        });\n      }\n      return [sessionOptionsHandle, allocs];\n    } catch (e) {\n      if (sessionOptionsHandle !== 0) {\n        wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);\n      }\n      allocs.forEach((alloc) => wasm2._free(alloc));\n      throw e;\n    }\n  };\n\n  // web/lib/wasm/wasm-common.ts\n  var tensorDataTypeStringToEnum = (type) => {\n    switch (type) {\n      case "int8":\n        return 3 /* int8 */;\n      case "uint8":\n        return 2 /* uint8 */;\n      case "bool":\n        return 9 /* bool */;\n      case "int16":\n        return 5 /* int16 */;\n      case "uint16":\n        return 4 /* uint16 */;\n      case "int32":\n        return 6 /* int32 */;\n      case "uint32":\n        return 12 /* uint32 */;\n      case "float16":\n        return 10 /* float16 */;\n      case "float32":\n        return 1 /* float */;\n      case "float64":\n        return 11 /* double */;\n      case "string":\n        return 8 /* string */;\n      case "int64":\n        return 7 /* int64 */;\n      case "uint64":\n        return 13 /* uint64 */;\n      default:\n        throw new Error(`unsupported data type: ${type}`);\n    }\n  };\n  var tensorDataTypeEnumToString = (typeProto) => {\n    switch (typeProto) {\n      case 3 /* int8 */:\n        return "int8";\n      case 2 /* uint8 */:\n        return "uint8";\n      case 9 /* bool */:\n        return "bool";\n      case 5 /* int16 */:\n        return "int16";\n      case 4 /* uint16 */:\n        return "uint16";\n      case 6 /* int32 */:\n        return "int32";\n      case 12 /* uint32 */:\n        return "uint32";\n      case 10 /* float16 */:\n        return "float16";\n      case 1 /* float */:\n        return "float32";\n      case 11 /* double */:\n        return "float64";\n      case 8 /* string */:\n        return "string";\n      case 7 /* int64 */:\n        return "int64";\n      case 13 /* uint64 */:\n        return "uint64";\n      default:\n        throw new Error(`unsupported data type: ${typeProto}`);\n    }\n  };\n  var getTensorElementSize = (dateType) => [void 0, 4, 1, 1, 2, 2, 4, 8, void 0, 1, 2, 8, 4, 8, void 0, void 0, void 0][dateType];\n  var tensorTypeToTypedArrayConstructor = (type) => {\n    switch (type) {\n      case "float16":\n        return Uint16Array;\n      case "float32":\n        return Float32Array;\n      case "uint8":\n        return Uint8Array;\n      case "int8":\n        return Int8Array;\n      case "uint16":\n        return Uint16Array;\n      case "int16":\n        return Int16Array;\n      case "int32":\n        return Int32Array;\n      case "bool":\n        return Uint8Array;\n      case "float64":\n        return Float64Array;\n      case "uint32":\n        return Uint32Array;\n      case "int64":\n        return BigInt64Array;\n      case "uint64":\n        return BigUint64Array;\n      default:\n        throw new Error(`unsupported type: ${type}`);\n    }\n  };\n  var logLevelStringToEnum = (logLevel) => {\n    switch (logLevel) {\n      case "verbose":\n        return 0;\n      case "info":\n        return 1;\n      case "warning":\n        return 2;\n      case "error":\n        return 3;\n      case "fatal":\n        return 4;\n      default:\n        throw new Error(`unsupported logging level: ${logLevel}`);\n    }\n  };\n  var isGpuBufferSupportedType = (type) => type === "float32" || type === "int32" || type === "int64" || type === "bool" || type === "float16" || type === "uint32";\n  var dataLocationStringToEnum = (location) => {\n    switch (location) {\n      case "none":\n        return 0;\n      case "cpu":\n        return 1;\n      case "cpu-pinned":\n        return 2;\n      case "texture":\n        return 3;\n      case "gpu-buffer":\n        return 4;\n      default:\n        throw new Error(`unsupported data location: ${location}`);\n    }\n  };\n\n  // web/lib/wasm/wasm-core-impl.ts\n  var getSessionInputOutputCount = (sessionHandle) => {\n    const wasm2 = getInstance();\n    const stack = wasm2.stackSave();\n    try {\n      const dataOffset = wasm2.stackAlloc(8);\n      const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + 4);\n      if (errorCode !== 0) {\n        checkLastError("Can\'t get session input/output count.");\n      }\n      return [wasm2.HEAP32[dataOffset / 4], wasm2.HEAP32[dataOffset / 4 + 1]];\n    } finally {\n      wasm2.stackRestore(stack);\n    }\n  };\n  var initOrt = (numThreads, loggingLevel) => {\n    const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);\n    if (errorCode !== 0) {\n      checkLastError("Can\'t initialize onnxruntime.");\n    }\n  };\n  var initRuntime = async (env) => {\n    initOrt(env.wasm.numThreads, logLevelStringToEnum(env.logLevel));\n    if (false) {\n      const initJsep = null.init;\n      await initJsep(getInstance(), env);\n    }\n  };\n  var activeSessions = /* @__PURE__ */ new Map();\n  var createSessionAllocate = (model) => {\n    const wasm2 = getInstance();\n    const modelDataOffset = wasm2._malloc(model.byteLength);\n    if (modelDataOffset === 0) {\n      throw new Error(`Can\'t create a session. failed to allocate a buffer of size ${model.byteLength}.`);\n    }\n    wasm2.HEAPU8.set(model, modelDataOffset);\n    return [modelDataOffset, model.byteLength];\n  };\n  var createSessionFinalize = (modelData, options) => {\n    const wasm2 = getInstance();\n    let sessionHandle = 0;\n    let sessionOptionsHandle = 0;\n    let ioBindingHandle = 0;\n    let allocs = [];\n    const inputNamesUTF8Encoded = [];\n    const outputNamesUTF8Encoded = [];\n    try {\n      [sessionOptionsHandle, allocs] = setSessionOptions(options);\n      sessionHandle = wasm2._OrtCreateSession(modelData[0], modelData[1], sessionOptionsHandle);\n      if (sessionHandle === 0) {\n        checkLastError("Can\'t create a session.");\n      }\n      const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);\n      const inputNames = [];\n      const outputNames = [];\n      const outputPreferredLocations = [];\n      for (let i = 0; i < inputCount; i++) {\n        const name = wasm2._OrtGetInputName(sessionHandle, i);\n        if (name === 0) {\n          checkLastError("Can\'t get an input name.");\n        }\n        inputNamesUTF8Encoded.push(name);\n        inputNames.push(wasm2.UTF8ToString(name));\n      }\n      for (let i = 0; i < outputCount; i++) {\n        const name = wasm2._OrtGetOutputName(sessionHandle, i);\n        if (name === 0) {\n          checkLastError("Can\'t get an output name.");\n        }\n        outputNamesUTF8Encoded.push(name);\n        const nameString = wasm2.UTF8ToString(name);\n        outputNames.push(nameString);\n        if (false) {\n          const location = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";\n          if (location !== "cpu" && location !== "cpu-pinned" && location !== "gpu-buffer") {\n            throw new Error(`Not supported preferred output location: ${location}.`);\n          }\n          outputPreferredLocations.push(location);\n        }\n      }\n      let bindingState = null;\n      if (false) {\n        ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);\n        if (ioBindingHandle === 0) {\n          checkLastError("Can\'t create IO binding.");\n        }\n        bindingState = {\n          handle: ioBindingHandle,\n          outputPreferredLocations,\n          outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => dataLocationStringToEnum(l))\n        };\n      }\n      activeSessions.set(sessionHandle, [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, bindingState]);\n      return [sessionHandle, inputNames, outputNames];\n    } catch (e) {\n      inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n      outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n      if (ioBindingHandle !== 0) {\n        wasm2._OrtReleaseBinding(ioBindingHandle);\n      }\n      if (sessionHandle !== 0) {\n        wasm2._OrtReleaseSession(sessionHandle);\n      }\n      throw e;\n    } finally {\n      wasm2._free(modelData[0]);\n      if (sessionOptionsHandle !== 0) {\n        wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);\n      }\n      allocs.forEach((alloc) => wasm2._free(alloc));\n    }\n  };\n  var createSession = (model, options) => {\n    const modelData = createSessionAllocate(model);\n    return createSessionFinalize(modelData, options);\n  };\n  var releaseSession = (sessionId) => {\n    const wasm2 = getInstance();\n    const session = activeSessions.get(sessionId);\n    if (!session) {\n      throw new Error(`cannot release session. invalid session id: ${sessionId}`);\n    }\n    const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;\n    if (ioBindingState) {\n      wasm2._OrtReleaseBinding(ioBindingState.handle);\n    }\n    wasm2.jsepUnregisterBuffers?.(sessionId);\n    inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n    outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));\n    wasm2._OrtReleaseSession(sessionHandle);\n    activeSessions.delete(sessionId);\n  };\n  var prepareInputOutputTensor = (tensor, tensorHandles, allocs, sessionId, index) => {\n    if (!tensor) {\n      tensorHandles.push(0);\n      return;\n    }\n    const wasm2 = getInstance();\n    const dataType = tensor[0];\n    const dims = tensor[1];\n    const location = tensor[3];\n    let rawData;\n    let dataByteLength;\n    if (dataType === "string" && location === "gpu-buffer") {\n      throw new Error("String tensor is not supported on GPU.");\n    }\n    if (location === "gpu-buffer") {\n      const gpuBuffer = tensor[2].gpuBuffer;\n      const elementSizeInBytes = getTensorElementSize(tensorDataTypeStringToEnum(dataType));\n      dataByteLength = dims.reduce((a, b) => a * b, 1) * elementSizeInBytes;\n      rawData = wasm2.jsepRegisterBuffer(sessionId, index, gpuBuffer, dataByteLength);\n    } else {\n      const data = tensor[2];\n      if (Array.isArray(data)) {\n        dataByteLength = 4 * data.length;\n        rawData = wasm2._malloc(dataByteLength);\n        allocs.push(rawData);\n        let dataIndex = rawData / 4;\n        for (let i = 0; i < data.length; i++) {\n          if (typeof data[i] !== "string") {\n            throw new TypeError(`tensor data at index ${i} is not a string`);\n          }\n          wasm2.HEAPU32[dataIndex++] = allocWasmString(data[i], allocs);\n        }\n      } else {\n        dataByteLength = data.byteLength;\n        rawData = wasm2._malloc(dataByteLength);\n        allocs.push(rawData);\n        wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);\n      }\n    }\n    const stack = wasm2.stackSave();\n    const dimsOffset = wasm2.stackAlloc(4 * dims.length);\n    try {\n      let dimIndex = dimsOffset / 4;\n      dims.forEach((d) => wasm2.HEAP32[dimIndex++] = d);\n      const tensor2 = wasm2._OrtCreateTensor(\n        tensorDataTypeStringToEnum(dataType),\n        rawData,\n        dataByteLength,\n        dimsOffset,\n        dims.length,\n        dataLocationStringToEnum(location)\n      );\n      if (tensor2 === 0) {\n        checkLastError(`Can\'t create tensor for input/output. session=${sessionId}, index=${index}.`);\n      }\n      tensorHandles.push(tensor2);\n    } finally {\n      wasm2.stackRestore(stack);\n    }\n  };\n  var run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {\n    const wasm2 = getInstance();\n    const session = activeSessions.get(sessionId);\n    if (!session) {\n      throw new Error(`cannot run inference. invalid session id: ${sessionId}`);\n    }\n    const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState] = session;\n    const inputCount = inputIndices.length;\n    const outputCount = outputIndices.length;\n    let runOptionsHandle = 0;\n    let runOptionsAllocs = [];\n    const inputTensorHandles = [];\n    const outputTensorHandles = [];\n    const inputOutputAllocs = [];\n    const beforeRunStack = wasm2.stackSave();\n    const inputValuesOffset = wasm2.stackAlloc(inputCount * 4);\n    const inputNamesOffset = wasm2.stackAlloc(inputCount * 4);\n    const outputValuesOffset = wasm2.stackAlloc(outputCount * 4);\n    const outputNamesOffset = wasm2.stackAlloc(outputCount * 4);\n    try {\n      [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);\n      for (let i = 0; i < inputCount; i++) {\n        prepareInputOutputTensor(inputTensors[i], inputTensorHandles, inputOutputAllocs, sessionId, inputIndices[i]);\n      }\n      for (let i = 0; i < outputCount; i++) {\n        prepareInputOutputTensor(\n          outputTensors[i],\n          outputTensorHandles,\n          inputOutputAllocs,\n          sessionId,\n          inputCount + outputIndices[i]\n        );\n      }\n      let inputValuesIndex = inputValuesOffset / 4;\n      let inputNamesIndex = inputNamesOffset / 4;\n      let outputValuesIndex = outputValuesOffset / 4;\n      let outputNamesIndex = outputNamesOffset / 4;\n      for (let i = 0; i < inputCount; i++) {\n        wasm2.HEAPU32[inputValuesIndex++] = inputTensorHandles[i];\n        wasm2.HEAPU32[inputNamesIndex++] = inputNamesUTF8Encoded[inputIndices[i]];\n      }\n      for (let i = 0; i < outputCount; i++) {\n        wasm2.HEAPU32[outputValuesIndex++] = outputTensorHandles[i];\n        wasm2.HEAPU32[outputNamesIndex++] = outputNamesUTF8Encoded[outputIndices[i]];\n      }\n      if (false) {\n        const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;\n        if (inputNamesUTF8Encoded.length !== inputCount) {\n          throw new Error(`input count from feeds (${inputCount}) is expected to be always equal to model\'s input count (${inputNamesUTF8Encoded.length}).`);\n        }\n        for (let i = 0; i < inputCount; i++) {\n          const index = inputIndices[i];\n          const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);\n          if (errorCode2 !== 0) {\n            checkLastError(`Can\'t bind input[${i}] for session=${sessionId}.`);\n          }\n        }\n        for (let i = 0; i < outputCount; i++) {\n          const index = outputIndices[i];\n          const location = outputTensors[i]?.[3];\n          if (location) {\n            const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);\n            if (errorCode2 !== 0) {\n              checkLastError(`Can\'t bind pre-allocated output[${i}] for session=${sessionId}.`);\n            }\n          } else {\n            const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], 0, outputPreferredLocationsEncoded[index]);\n            if (errorCode2 !== 0) {\n              checkLastError(`Can\'t bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);\n            }\n          }\n        }\n      }\n      let errorCode;\n      if (false) {\n        errorCode = await wasm2._OrtRunWithBinding(\n          sessionHandle,\n          ioBindingState.handle,\n          outputCount,\n          outputValuesOffset,\n          runOptionsHandle\n        );\n      } else {\n        errorCode = await wasm2._OrtRun(\n          sessionHandle,\n          inputNamesOffset,\n          inputValuesOffset,\n          inputCount,\n          outputNamesOffset,\n          outputCount,\n          outputValuesOffset,\n          runOptionsHandle\n        );\n      }\n      if (errorCode !== 0) {\n        checkLastError("failed to call OrtRun().");\n      }\n      const output = [];\n      for (let i = 0; i < outputCount; i++) {\n        const tensor = wasm2.HEAPU32[outputValuesOffset / 4 + i];\n        if (tensor === outputTensorHandles[i]) {\n          output.push(outputTensors[i]);\n          continue;\n        }\n        const beforeGetTensorDataStack = wasm2.stackSave();\n        const tensorDataOffset = wasm2.stackAlloc(4 * 4);\n        let keepOutputTensor = false;\n        let type, dataOffset = 0;\n        try {\n          const errorCode2 = wasm2._OrtGetTensorData(\n            tensor,\n            tensorDataOffset,\n            tensorDataOffset + 4,\n            tensorDataOffset + 8,\n            tensorDataOffset + 12\n          );\n          if (errorCode2 !== 0) {\n            checkLastError(`Can\'t access output tensor data on index ${i}.`);\n          }\n          let tensorDataIndex = tensorDataOffset / 4;\n          const dataType = wasm2.HEAPU32[tensorDataIndex++];\n          dataOffset = wasm2.HEAPU32[tensorDataIndex++];\n          const dimsOffset = wasm2.HEAPU32[tensorDataIndex++];\n          const dimsLength = wasm2.HEAPU32[tensorDataIndex++];\n          const dims = [];\n          for (let i2 = 0; i2 < dimsLength; i2++) {\n            dims.push(wasm2.HEAPU32[dimsOffset / 4 + i2]);\n          }\n          wasm2._OrtFree(dimsOffset);\n          const size = dims.reduce((a, b) => a * b, 1);\n          type = tensorDataTypeEnumToString(dataType);\n          const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];\n          if (type === "string") {\n            if (preferredLocation === "gpu-buffer") {\n              throw new Error("String tensor is not supported on GPU.");\n            }\n            const stringData = [];\n            let dataIndex = dataOffset / 4;\n            for (let i2 = 0; i2 < size; i2++) {\n              const offset = wasm2.HEAPU32[dataIndex++];\n              const maxBytesToRead = i2 === size - 1 ? void 0 : wasm2.HEAPU32[dataIndex] - offset;\n              stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));\n            }\n            output.push([type, dims, stringData, "cpu"]);\n          } else {\n            if (preferredLocation === "gpu-buffer" && size > 0) {\n              const gpuBuffer = wasm2.jsepGetBuffer(dataOffset);\n              const elementSize = getTensorElementSize(dataType);\n              if (elementSize === void 0 || !isGpuBufferSupportedType(type)) {\n                throw new Error(`Unsupported data type: ${type}`);\n              }\n              keepOutputTensor = true;\n              output.push([\n                type,\n                dims,\n                {\n                  gpuBuffer,\n                  download: wasm2.jsepCreateDownloader(gpuBuffer, size * elementSize, type),\n                  dispose: () => {\n                    wasm2._OrtReleaseTensor(tensor);\n                  }\n                },\n                "gpu-buffer"\n              ]);\n            } else {\n              const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);\n              const data = new typedArrayConstructor(size);\n              new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength));\n              output.push([type, dims, data, "cpu"]);\n            }\n          }\n        } finally {\n          wasm2.stackRestore(beforeGetTensorDataStack);\n          if (type === "string" && dataOffset) {\n            wasm2._free(dataOffset);\n          }\n          if (!keepOutputTensor) {\n            wasm2._OrtReleaseTensor(tensor);\n          }\n        }\n      }\n      if (ioBindingState) {\n        wasm2._OrtClearBoundOutputs(ioBindingState.handle);\n      }\n      return output;\n    } finally {\n      wasm2.stackRestore(beforeRunStack);\n      inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));\n      outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));\n      inputOutputAllocs.forEach((p) => wasm2._free(p));\n      if (runOptionsHandle !== 0) {\n        wasm2._OrtReleaseRunOptions(runOptionsHandle);\n      }\n      runOptionsAllocs.forEach((p) => wasm2._free(p));\n    }\n  };\n  var endProfiling = (sessionId) => {\n    const wasm2 = getInstance();\n    const session = activeSessions.get(sessionId);\n    if (!session) {\n      throw new Error("invalid session id");\n    }\n    const sessionHandle = session[0];\n    const profileFileName = wasm2._OrtEndProfiling(sessionHandle);\n    if (profileFileName === 0) {\n      checkLastError("Can\'t get an profile file name.");\n    }\n    wasm2._OrtFree(profileFileName);\n  };\n  var extractTransferableBuffers = (tensors) => {\n    const buffers = [];\n    for (const tensor of tensors) {\n      const data = tensor[2];\n      if (!Array.isArray(data) && "buffer" in data) {\n        buffers.push(data.buffer);\n      }\n    }\n    return buffers;\n  };\n\n  // web/lib/wasm/proxy-worker/main.ts\n  self.onmessage = (ev) => {\n    switch (ev.data.type) {\n      case "init-wasm":\n        try {\n          initializeWebAssembly(ev.data.in).then(\n            () => postMessage({ type: "init-wasm" }),\n            (err) => postMessage({ type: "init-wasm", err })\n          );\n        } catch (err) {\n          postMessage({ type: "init-wasm", err });\n        }\n        break;\n      case "init-ort":\n        try {\n          initRuntime(ev.data.in).then(() => postMessage({ type: "init-ort" }), (err) => postMessage({\n            type: "init-ort",\n            err\n          }));\n        } catch (err) {\n          postMessage({ type: "init-ort", err });\n        }\n        break;\n      case "create_allocate":\n        try {\n          const { model } = ev.data.in;\n          const modeldata = createSessionAllocate(model);\n          postMessage({ type: "create_allocate", out: modeldata });\n        } catch (err) {\n          postMessage({ type: "create_allocate", err });\n        }\n        break;\n      case "create_finalize":\n        try {\n          const { modeldata, options } = ev.data.in;\n          const sessionMetadata = createSessionFinalize(modeldata, options);\n          postMessage({ type: "create_finalize", out: sessionMetadata });\n        } catch (err) {\n          postMessage({ type: "create_finalize", err });\n        }\n        break;\n      case "create":\n        try {\n          const { model, options } = ev.data.in;\n          const sessionMetadata = createSession(model, options);\n          postMessage({ type: "create", out: sessionMetadata });\n        } catch (err) {\n          postMessage({ type: "create", err });\n        }\n        break;\n      case "release":\n        try {\n          const handler = ev.data.in;\n          releaseSession(handler);\n          postMessage({ type: "release" });\n        } catch (err) {\n          postMessage({ type: "release", err });\n        }\n        break;\n      case "run":\n        try {\n          const { sessionId, inputIndices, inputs, outputIndices, options } = ev.data.in;\n          run(sessionId, inputIndices, inputs, outputIndices, options).then(\n            (outputs) => {\n              postMessage({ type: "run", out: outputs }, extractTransferableBuffers(outputs));\n            },\n            (err) => {\n              postMessage({ type: "run", err });\n            }\n          );\n        } catch (err) {\n          postMessage({ type: "run", err });\n        }\n        break;\n      case "end-profiling":\n        try {\n          const handler = ev.data.in;\n          endProfiling(handler);\n          postMessage({ type: "end-profiling" });\n        } catch (err) {\n          postMessage({ type: "end-profiling", err });\n        }\n        break;\n      default:\n    }\n  };\n})();\n//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZWpzLWlnbm9yZTpmcyIsICJub2RlanMtaWdub3JlOnBhdGgiLCAiLi4vbGliL3dhc20vYmluZGluZy9vcnQtdHJhaW5pbmctd2FzbS1zaW1kLmpzIiwgIm5vZGVqcy1pZ25vcmU6d29ya2VyX3RocmVhZHMiLCAibm9kZWpzLWlnbm9yZTpwZXJmX2hvb2tzIiwgIm5vZGVqcy1pZ25vcmU6b3MiLCAiLi4vbGliL3dhc20vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZC5qcyIsICIuLi9saWIvd2FzbS9iaW5kaW5nL29ydC13YXNtLXRocmVhZGVkLndvcmtlci5qcyIsICJub2RlanMtaWdub3JlOm5vZGU6cGF0aCIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb3JlLWltcGwudHMiLCAiLi4vbGliL3dhc20vcHJveHktd29ya2VyL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBjb25zdCByZWFkRmlsZSA9IHVuZGVmaW5lZDsiLCAiZXhwb3J0IGNvbnN0IGpvaW4gPSB1bmRlZmluZWQ7IiwgIlxudmFyIG9ydFdhc20gPSAoKCkgPT4ge1xuICB2YXIgX3NjcmlwdERpciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjIDogdW5kZWZpbmVkO1xuICBpZiAodHlwZW9mIF9fZmlsZW5hbWUgIT09ICd1bmRlZmluZWQnKSBfc2NyaXB0RGlyID0gX3NjcmlwdERpciB8fCBfX2ZpbGVuYW1lO1xuICByZXR1cm4gKFxuZnVuY3Rpb24obW9kdWxlQXJnID0ge30pIHtcblxudmFyIGQ9bW9kdWxlQXJnLGssbDtkLnJlYWR5PW5ldyBQcm9taXNlKChhLGIpPT57az1hO2w9Yn0pO3ZhciByPU9iamVjdC5hc3NpZ24oe30sZCksdj1cIi4vdGhpcy5wcm9ncmFtXCIsYWE9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyx4PVwiZnVuY3Rpb25cIj09dHlwZW9mIGltcG9ydFNjcmlwdHMsYmE9XCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MmJlwib2JqZWN0XCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zJiZcInN0cmluZ1wiPT10eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLHk9XCJcIixBLEIsQztcbmlmKGJhKXt2YXIgZnM9cmVxdWlyZShcImZzXCIpLEQ9cmVxdWlyZShcInBhdGhcIik7eT14P0QuZGlybmFtZSh5KStcIi9cIjpfX2Rpcm5hbWUrXCIvXCI7QT0oYSxiKT0+e2E9YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKT9uZXcgVVJMKGEpOkQubm9ybWFsaXplKGEpO3JldHVybiBmcy5yZWFkRmlsZVN5bmMoYSxiP3ZvaWQgMDpcInV0ZjhcIil9O0M9YT0+e2E9QShhLCEwKTthLmJ1ZmZlcnx8KGE9bmV3IFVpbnQ4QXJyYXkoYSkpO3JldHVybiBhfTtCPShhLGIsYyxmPSEwKT0+e2E9YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKT9uZXcgVVJMKGEpOkQubm9ybWFsaXplKGEpO2ZzLnJlYWRGaWxlKGEsZj92b2lkIDA6XCJ1dGY4XCIsKGcsaCk9PntnP2MoZyk6YihmP2guYnVmZmVyOmgpfSl9OyFkLnRoaXNQcm9ncmFtJiYxPHByb2Nlc3MuYXJndi5sZW5ndGgmJih2PXByb2Nlc3MuYXJndlsxXS5yZXBsYWNlKC9cXFxcL2csXCIvXCIpKTtwcm9jZXNzLmFyZ3Yuc2xpY2UoMik7ZC5pbnNwZWN0PSgpPT5cIltFbXNjcmlwdGVuIE1vZHVsZSBvYmplY3RdXCJ9ZWxzZSBpZihhYXx8XG54KXg/eT1zZWxmLmxvY2F0aW9uLmhyZWY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50JiZkb2N1bWVudC5jdXJyZW50U2NyaXB0JiYoeT1kb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYyksX3NjcmlwdERpciYmKHk9X3NjcmlwdERpciksMCE9PXkuaW5kZXhPZihcImJsb2I6XCIpP3k9eS5zdWJzdHIoMCx5LnJlcGxhY2UoL1s/I10uKi8sXCJcIikubGFzdEluZGV4T2YoXCIvXCIpKzEpOnk9XCJcIixBPWE9Pnt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiR0VUXCIsYSwhMSk7Yi5zZW5kKG51bGwpO3JldHVybiBiLnJlc3BvbnNlVGV4dH0seCYmKEM9YT0+e3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJHRVRcIixhLCExKTtiLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCI7Yi5zZW5kKG51bGwpO3JldHVybiBuZXcgVWludDhBcnJheShiLnJlc3BvbnNlKX0pLEI9KGEsYixjKT0+e3ZhciBmPW5ldyBYTUxIdHRwUmVxdWVzdDtmLm9wZW4oXCJHRVRcIixhLCEwKTtmLnJlc3BvbnNlVHlwZT1cblwiYXJyYXlidWZmZXJcIjtmLm9ubG9hZD0oKT0+ezIwMD09Zi5zdGF0dXN8fDA9PWYuc3RhdHVzJiZmLnJlc3BvbnNlP2IoZi5yZXNwb25zZSk6YygpfTtmLm9uZXJyb3I9YztmLnNlbmQobnVsbCl9O3ZhciBjYT1kLnByaW50fHxjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLEU9ZC5wcmludEVycnx8Y29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpO09iamVjdC5hc3NpZ24oZCxyKTtyPW51bGw7ZC50aGlzUHJvZ3JhbSYmKHY9ZC50aGlzUHJvZ3JhbSk7dmFyIEY7ZC53YXNtQmluYXJ5JiYoRj1kLndhc21CaW5hcnkpO3ZhciBub0V4aXRSdW50aW1lPWQubm9FeGl0UnVudGltZXx8ITA7XCJvYmplY3RcIiE9dHlwZW9mIFdlYkFzc2VtYmx5JiZHKFwibm8gbmF0aXZlIHdhc20gc3VwcG9ydCBkZXRlY3RlZFwiKTt2YXIgSCxJLGRhPSExLEosSyxMLE07XG5mdW5jdGlvbiBlYSgpe3ZhciBhPUguYnVmZmVyO2QuSEVBUDg9Sj1uZXcgSW50OEFycmF5KGEpO2QuSEVBUDE2PW5ldyBJbnQxNkFycmF5KGEpO2QuSEVBUDMyPUw9bmV3IEludDMyQXJyYXkoYSk7ZC5IRUFQVTg9Sz1uZXcgVWludDhBcnJheShhKTtkLkhFQVBVMTY9bmV3IFVpbnQxNkFycmF5KGEpO2QuSEVBUFUzMj1NPW5ldyBVaW50MzJBcnJheShhKTtkLkhFQVBGMzI9bmV3IEZsb2F0MzJBcnJheShhKTtkLkhFQVBGNjQ9bmV3IEZsb2F0NjRBcnJheShhKX12YXIgZmE9W10saGE9W10saWE9W107ZnVuY3Rpb24gamEoKXt2YXIgYT1kLnByZVJ1bi5zaGlmdCgpO2ZhLnVuc2hpZnQoYSl9dmFyIE49MCxPPW51bGwsUD1udWxsO1xuZnVuY3Rpb24gRyhhKXtpZihkLm9uQWJvcnQpZC5vbkFib3J0KGEpO2E9XCJBYm9ydGVkKFwiK2ErXCIpXCI7RShhKTtkYT0hMDthPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3IoYStcIi4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby5cIik7bChhKTt0aHJvdyBhO31mdW5jdGlvbiBrYShhKXtyZXR1cm4gYS5zdGFydHNXaXRoKFwiZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LFwiKX12YXIgUTtRPVwib3J0LXRyYWluaW5nLXdhc20tc2ltZC53YXNtXCI7aWYoIWthKFEpKXt2YXIgbGE9UTtRPWQubG9jYXRlRmlsZT9kLmxvY2F0ZUZpbGUobGEseSk6eStsYX1mdW5jdGlvbiBtYShhKXtpZihhPT1RJiZGKXJldHVybiBuZXcgVWludDhBcnJheShGKTtpZihDKXJldHVybiBDKGEpO3Rocm93XCJib3RoIGFzeW5jIGFuZCBzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZFwiO31cbmZ1bmN0aW9uIG5hKGEpe2lmKCFGJiYoYWF8fHgpKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBmZXRjaCYmIWEuc3RhcnRzV2l0aChcImZpbGU6Ly9cIikpcmV0dXJuIGZldGNoKGEse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pLnRoZW4oYj0+e2lmKCFiLm9rKXRocm93XCJmYWlsZWQgdG8gbG9hZCB3YXNtIGJpbmFyeSBmaWxlIGF0ICdcIithK1wiJ1wiO3JldHVybiBiLmFycmF5QnVmZmVyKCl9KS5jYXRjaCgoKT0+bWEoYSkpO2lmKEIpcmV0dXJuIG5ldyBQcm9taXNlKChiLGMpPT57QihhLGY9PmIobmV3IFVpbnQ4QXJyYXkoZikpLGMpfSl9cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9Pm1hKGEpKX1mdW5jdGlvbiBvYShhLGIsYyl7cmV0dXJuIG5hKGEpLnRoZW4oZj0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZixiKSkudGhlbihmPT5mKS50aGVuKGMsZj0+e0UoXCJmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiBcIitmKTtHKGYpfSl9XG5mdW5jdGlvbiBwYShhLGIpe3ZhciBjPVE7cmV0dXJuIEZ8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nfHxrYShjKXx8Yy5zdGFydHNXaXRoKFwiZmlsZTovL1wiKXx8YmF8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIGZldGNoP29hKGMsYSxiKTpmZXRjaChjLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGY9PldlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKGYsYSkudGhlbihiLGZ1bmN0aW9uKGcpe0UoXCJ3YXNtIHN0cmVhbWluZyBjb21waWxlIGZhaWxlZDogXCIrZyk7RShcImZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uXCIpO3JldHVybiBvYShjLGEsYil9KSl9dmFyIFIsUz1hPT57Zm9yKDswPGEubGVuZ3RoOylhLnNoaWZ0KCkoZCl9O1xuZnVuY3Rpb24gcWEoYSl7dGhpcy5IYT1hLTI0O3RoaXMuTGE9ZnVuY3Rpb24oYil7TVt0aGlzLkhhKzQ+PjI+Pj4wXT1ifTt0aGlzLkthPWZ1bmN0aW9uKGIpe01bdGhpcy5IYSs4Pj4yPj4+MF09Yn07dGhpcy5JYT1mdW5jdGlvbihiLGMpe3RoaXMuSmEoKTt0aGlzLkxhKGIpO3RoaXMuS2EoYyl9O3RoaXMuSmE9ZnVuY3Rpb24oKXtNW3RoaXMuSGErMTY+PjI+Pj4wXT0wfX1cbnZhciByYT0wLHNhPTAsdGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFRleHREZWNvZGVyP25ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik6dm9pZCAwLHVhPShhLGIsYyk9PntiPj4+PTA7dmFyIGY9YitjO2ZvcihjPWI7YVtjXSYmIShjPj1mKTspKytjO2lmKDE2PGMtYiYmYS5idWZmZXImJnRhKXJldHVybiB0YS5kZWNvZGUoYS5zdWJhcnJheShiLGMpKTtmb3IoZj1cIlwiO2I8Yzspe3ZhciBnPWFbYisrXTtpZihnJjEyOCl7dmFyIGg9YVtiKytdJjYzO2lmKDE5Mj09KGcmMjI0KSlmKz1TdHJpbmcuZnJvbUNoYXJDb2RlKChnJjMxKTw8NnxoKTtlbHNle3ZhciBtPWFbYisrXSY2MztnPTIyND09KGcmMjQwKT8oZyYxNSk8PDEyfGg8PDZ8bTooZyY3KTw8MTh8aDw8MTJ8bTw8NnxhW2IrK10mNjM7NjU1MzY+Zz9mKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGcpOihnLT02NTUzNixmKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGc+PjEwLDU2MzIwfGcmMTAyMykpfX1lbHNlIGYrPVN0cmluZy5mcm9tQ2hhckNvZGUoZyl9cmV0dXJuIGZ9LFxuVD0oYSxiKT0+KGE+Pj49MCk/dWEoSyxhLGIpOlwiXCIsVT1hPT57Zm9yKHZhciBiPTAsYz0wO2M8YS5sZW5ndGg7KytjKXt2YXIgZj1hLmNoYXJDb2RlQXQoYyk7MTI3Pj1mP2IrKzoyMDQ3Pj1mP2IrPTI6NTUyOTY8PWYmJjU3MzQzPj1mPyhiKz00LCsrYyk6Yis9M31yZXR1cm4gYn0sVj0oYSxiLGMsZik9PntjPj4+PTA7aWYoISgwPGYpKXJldHVybiAwO3ZhciBnPWM7Zj1jK2YtMTtmb3IodmFyIGg9MDtoPGEubGVuZ3RoOysraCl7dmFyIG09YS5jaGFyQ29kZUF0KGgpO2lmKDU1Mjk2PD1tJiY1NzM0Mz49bSl7dmFyIHE9YS5jaGFyQ29kZUF0KCsraCk7bT02NTUzNisoKG0mMTAyMyk8PDEwKXxxJjEwMjN9aWYoMTI3Pj1tKXtpZihjPj1mKWJyZWFrO2JbYysrPj4+MF09bX1lbHNle2lmKDIwNDc+PW0pe2lmKGMrMT49ZilicmVhaztiW2MrKz4+PjBdPTE5MnxtPj42fWVsc2V7aWYoNjU1MzU+PW0pe2lmKGMrMj49ZilicmVhaztiW2MrKz4+PjBdPTIyNHxtPj4xMn1lbHNle2lmKGMrMz49XG5mKWJyZWFrO2JbYysrPj4+MF09MjQwfG0+PjE4O2JbYysrPj4+MF09MTI4fG0+PjEyJjYzfWJbYysrPj4+MF09MTI4fG0+PjYmNjN9YltjKys+Pj4wXT0xMjh8bSY2M319YltjPj4+MF09MDtyZXR1cm4gYy1nfSxXPWE9PjA9PT1hJTQmJigwIT09YSUxMDB8fDA9PT1hJTQwMCksdmE9WzAsMzEsNjAsOTEsMTIxLDE1MiwxODIsMjEzLDI0NCwyNzQsMzA1LDMzNV0sd2E9WzAsMzEsNTksOTAsMTIwLDE1MSwxODEsMjEyLDI0MywyNzMsMzA0LDMzNF0sQmE9YT0+e3ZhciBiPVUoYSkrMSxjPUFhKGIpO2MmJlYoYSxLLGMsYik7cmV0dXJuIGN9LFg9e30sQ2E9KCk9PntpZighWSl7dmFyIGE9e1VTRVI6XCJ3ZWJfdXNlclwiLExPR05BTUU6XCJ3ZWJfdXNlclwiLFBBVEg6XCIvXCIsUFdEOlwiL1wiLEhPTUU6XCIvaG9tZS93ZWJfdXNlclwiLExBTkc6KFwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5sYW5ndWFnZXMmJm5hdmlnYXRvci5sYW5ndWFnZXNbMF18fFwiQ1wiKS5yZXBsYWNlKFwiLVwiLFxuXCJfXCIpK1wiLlVURi04XCIsXzp2fHxcIi4vdGhpcy5wcm9ncmFtXCJ9LGI7Zm9yKGIgaW4gWCl2b2lkIDA9PT1YW2JdP2RlbGV0ZSBhW2JdOmFbYl09WFtiXTt2YXIgYz1bXTtmb3IoYiBpbiBhKWMucHVzaChgJHtifT0ke2FbYl19YCk7WT1jfXJldHVybiBZfSxZLERhPVtudWxsLFtdLFtdXSxFYT1bMzEsMjksMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdLEZhPVszMSwyOCwzMSwzMCwzMSwzMCwzMSwzMSwzMCwzMSwzMCwzMV07ZnVuY3Rpb24gR2EoYSl7dmFyIGI9QXJyYXkoVShhKSsxKTtWKGEsYiwwLGIubGVuZ3RoKTtyZXR1cm4gYn1cbmZ1bmN0aW9uIEhhKGEsYixjLGYpe2Z1bmN0aW9uIGcoZSxuLHApe2ZvcihlPVwibnVtYmVyXCI9PXR5cGVvZiBlP2UudG9TdHJpbmcoKTplfHxcIlwiO2UubGVuZ3RoPG47KWU9cFswXStlO3JldHVybiBlfWZ1bmN0aW9uIGgoZSxuKXtyZXR1cm4gZyhlLG4sXCIwXCIpfWZ1bmN0aW9uIG0oZSxuKXtmdW5jdGlvbiBwKHhhKXtyZXR1cm4gMD54YT8tMTowPHhhPzE6MH12YXIgejswPT09KHo9cChlLmdldEZ1bGxZZWFyKCktbi5nZXRGdWxsWWVhcigpKSkmJjA9PT0oej1wKGUuZ2V0TW9udGgoKS1uLmdldE1vbnRoKCkpKSYmKHo9cChlLmdldERhdGUoKS1uLmdldERhdGUoKSkpO3JldHVybiB6fWZ1bmN0aW9uIHEoZSl7c3dpdGNoKGUuZ2V0RGF5KCkpe2Nhc2UgMDpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLTEsMTEsMjkpO2Nhc2UgMTpyZXR1cm4gZTtjYXNlIDI6cmV0dXJuIG5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSwwLDMpO2Nhc2UgMzpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLFxuMCwyKTtjYXNlIDQ6cmV0dXJuIG5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSwwLDEpO2Nhc2UgNTpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLTEsMTEsMzEpO2Nhc2UgNjpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLTEsMTEsMzApfX1mdW5jdGlvbiB3KGUpe3ZhciBuPWUuQ2E7Zm9yKGU9bmV3IERhdGUoKG5ldyBEYXRlKGUuRGErMTkwMCwwLDEpKS5nZXRUaW1lKCkpOzA8bjspe3ZhciBwPWUuZ2V0TW9udGgoKSx6PShXKGUuZ2V0RnVsbFllYXIoKSk/RWE6RmEpW3BdO2lmKG4+ei1lLmdldERhdGUoKSluLT16LWUuZ2V0RGF0ZSgpKzEsZS5zZXREYXRlKDEpLDExPnA/ZS5zZXRNb250aChwKzEpOihlLnNldE1vbnRoKDApLGUuc2V0RnVsbFllYXIoZS5nZXRGdWxsWWVhcigpKzEpKTtlbHNle2Uuc2V0RGF0ZShlLmdldERhdGUoKStuKTticmVha319cD1uZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCkrMSwwLDQpO249cShuZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCksXG4wLDQpKTtwPXEocCk7cmV0dXJuIDA+PW0obixlKT8wPj1tKHAsZSk/ZS5nZXRGdWxsWWVhcigpKzE6ZS5nZXRGdWxsWWVhcigpOmUuZ2V0RnVsbFllYXIoKS0xfWE+Pj49MDtiPj4+PTA7Yz4+Pj0wO2Y+Pj49MDt2YXIgdD1MW2YrNDA+PjI+Pj4wXTtmPXtPYTpMW2Y+PjI+Pj4wXSxOYTpMW2YrND4+Mj4+PjBdLEVhOkxbZis4Pj4yPj4+MF0sR2E6TFtmKzEyPj4yPj4+MF0sRmE6TFtmKzE2Pj4yPj4+MF0sRGE6TFtmKzIwPj4yPj4+MF0seGE6TFtmKzI0Pj4yPj4+MF0sQ2E6TFtmKzI4Pj4yPj4+MF0sUWE6TFtmKzMyPj4yPj4+MF0sTWE6TFtmKzM2Pj4yPj4+MF0sUGE6dD9UKHQpOlwiXCJ9O2M9VChjKTt0PXtcIiVjXCI6XCIlYSAlYiAlZCAlSDolTTolUyAlWVwiLFwiJURcIjpcIiVtLyVkLyV5XCIsXCIlRlwiOlwiJVktJW0tJWRcIixcIiVoXCI6XCIlYlwiLFwiJXJcIjpcIiVJOiVNOiVTICVwXCIsXCIlUlwiOlwiJUg6JU1cIixcIiVUXCI6XCIlSDolTTolU1wiLFwiJXhcIjpcIiVtLyVkLyV5XCIsXCIlWFwiOlwiJUg6JU06JVNcIixcIiVFY1wiOlwiJWNcIixcblwiJUVDXCI6XCIlQ1wiLFwiJUV4XCI6XCIlbS8lZC8leVwiLFwiJUVYXCI6XCIlSDolTTolU1wiLFwiJUV5XCI6XCIleVwiLFwiJUVZXCI6XCIlWVwiLFwiJU9kXCI6XCIlZFwiLFwiJU9lXCI6XCIlZVwiLFwiJU9IXCI6XCIlSFwiLFwiJU9JXCI6XCIlSVwiLFwiJU9tXCI6XCIlbVwiLFwiJU9NXCI6XCIlTVwiLFwiJU9TXCI6XCIlU1wiLFwiJU91XCI6XCIldVwiLFwiJU9VXCI6XCIlVVwiLFwiJU9WXCI6XCIlVlwiLFwiJU93XCI6XCIld1wiLFwiJU9XXCI6XCIlV1wiLFwiJU95XCI6XCIleVwifTtmb3IodmFyIHUgaW4gdCljPWMucmVwbGFjZShuZXcgUmVnRXhwKHUsXCJnXCIpLHRbdV0pO3ZhciB5YT1cIlN1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5XCIuc3BsaXQoXCIgXCIpLHphPVwiSmFudWFyeSBGZWJydWFyeSBNYXJjaCBBcHJpbCBNYXkgSnVuZSBKdWx5IEF1Z3VzdCBTZXB0ZW1iZXIgT2N0b2JlciBOb3ZlbWJlciBEZWNlbWJlclwiLnNwbGl0KFwiIFwiKTt0PXtcIiVhXCI6ZT0+eWFbZS54YV0uc3Vic3RyaW5nKDAsMyksXCIlQVwiOmU9PnlhW2UueGFdLFwiJWJcIjplPT5cbnphW2UuRmFdLnN1YnN0cmluZygwLDMpLFwiJUJcIjplPT56YVtlLkZhXSxcIiVDXCI6ZT0+aCgoZS5EYSsxOTAwKS8xMDB8MCwyKSxcIiVkXCI6ZT0+aChlLkdhLDIpLFwiJWVcIjplPT5nKGUuR2EsMixcIiBcIiksXCIlZ1wiOmU9PncoZSkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiksXCIlR1wiOmU9PncoZSksXCIlSFwiOmU9PmgoZS5FYSwyKSxcIiVJXCI6ZT0+e2U9ZS5FYTswPT1lP2U9MTI6MTI8ZSYmKGUtPTEyKTtyZXR1cm4gaChlLDIpfSxcIiVqXCI6ZT0+e2Zvcih2YXIgbj0wLHA9MDtwPD1lLkZhLTE7bis9KFcoZS5EYSsxOTAwKT9FYTpGYSlbcCsrXSk7cmV0dXJuIGgoZS5HYStuLDMpfSxcIiVtXCI6ZT0+aChlLkZhKzEsMiksXCIlTVwiOmU9PmgoZS5OYSwyKSxcIiVuXCI6KCk9PlwiXFxuXCIsXCIlcFwiOmU9PjA8PWUuRWEmJjEyPmUuRWE/XCJBTVwiOlwiUE1cIixcIiVTXCI6ZT0+aChlLk9hLDIpLFwiJXRcIjooKT0+XCJcXHRcIixcIiV1XCI6ZT0+ZS54YXx8NyxcIiVVXCI6ZT0+aChNYXRoLmZsb29yKChlLkNhKzctZS54YSkvNyksMiksXCIlVlwiOmU9Plxue3ZhciBuPU1hdGguZmxvb3IoKGUuQ2ErNy0oZS54YSs2KSU3KS83KTsyPj0oZS54YSszNzEtZS5DYS0yKSU3JiZuKys7aWYobik1Mz09biYmKHA9KGUueGErMzcxLWUuQ2EpJTcsND09cHx8Mz09cCYmVyhlLkRhKXx8KG49MSkpO2Vsc2V7bj01Mjt2YXIgcD0oZS54YSs3LWUuQ2EtMSklNzsoND09cHx8NT09cCYmVyhlLkRhJTQwMC0xKSkmJm4rK31yZXR1cm4gaChuLDIpfSxcIiV3XCI6ZT0+ZS54YSxcIiVXXCI6ZT0+aChNYXRoLmZsb29yKChlLkNhKzctKGUueGErNiklNykvNyksMiksXCIleVwiOmU9PihlLkRhKzE5MDApLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJVlcIjplPT5lLkRhKzE5MDAsXCIlelwiOmU9PntlPWUuTWE7dmFyIG49MDw9ZTtlPU1hdGguYWJzKGUpLzYwO3JldHVybihuP1wiK1wiOlwiLVwiKStTdHJpbmcoXCIwMDAwXCIrKGUvNjAqMTAwK2UlNjApKS5zbGljZSgtNCl9LFwiJVpcIjplPT5lLlBhLFwiJSVcIjooKT0+XCIlXCJ9O2M9Yy5yZXBsYWNlKC8lJS9nLFwiXFx4MDBcXHgwMFwiKTtmb3IodSBpbiB0KWMuaW5jbHVkZXModSkmJlxuKGM9Yy5yZXBsYWNlKG5ldyBSZWdFeHAodSxcImdcIiksdFt1XShmKSkpO2M9Yy5yZXBsYWNlKC9cXDBcXDAvZyxcIiVcIik7dT1HYShjKTtpZih1Lmxlbmd0aD5iKXJldHVybiAwO0ouc2V0KHUsYT4+PjApO3JldHVybiB1Lmxlbmd0aC0xfVxudmFyIEphPXthOmZ1bmN0aW9uKGEsYixjKXthPj4+PTA7KG5ldyBxYShhKSkuSWEoYj4+PjAsYz4+PjApO3JhPWE7c2ErKzt0aHJvdyByYTt9LGU6ZnVuY3Rpb24oKXtyZXR1cm4gMH0sSDpmdW5jdGlvbigpe30seDpmdW5jdGlvbigpe30sejpmdW5jdGlvbigpe30sazpmdW5jdGlvbigpe3JldHVybiAwfSxGOmZ1bmN0aW9uKCl7fSxCOmZ1bmN0aW9uKCl7fSxFOmZ1bmN0aW9uKCl7fSxnOmZ1bmN0aW9uKCl7fSx5OmZ1bmN0aW9uKCl7fSx2OmZ1bmN0aW9uKCl7fSxHOmZ1bmN0aW9uKCl7fSx3OmZ1bmN0aW9uKCl7fSxsOigpPT4hMCxvOmZ1bmN0aW9uKGEsYixjKXthPWIrMjA5NzE1Mj4+PjA8NDE5NDMwNS0hIWE/KGE+Pj4wKSs0Mjk0OTY3Mjk2KmI6TmFOO2M+Pj49MDthPW5ldyBEYXRlKDFFMyphKTtMW2M+PjI+Pj4wXT1hLmdldFVUQ1NlY29uZHMoKTtMW2MrND4+Mj4+PjBdPWEuZ2V0VVRDTWludXRlcygpO0xbYys4Pj4yPj4+MF09YS5nZXRVVENIb3VycygpO0xbYysxMj4+Mj4+PlxuMF09YS5nZXRVVENEYXRlKCk7TFtjKzE2Pj4yPj4+MF09YS5nZXRVVENNb250aCgpO0xbYysyMD4+Mj4+PjBdPWEuZ2V0VVRDRnVsbFllYXIoKS0xOTAwO0xbYysyND4+Mj4+PjBdPWEuZ2V0VVRDRGF5KCk7TFtjKzI4Pj4yPj4+MF09KGEuZ2V0VGltZSgpLURhdGUuVVRDKGEuZ2V0VVRDRnVsbFllYXIoKSwwLDEsMCwwLDAsMCkpLzg2NEU1fDB9LHA6ZnVuY3Rpb24oYSxiLGMpe2E9YisyMDk3MTUyPj4+MDw0MTk0MzA1LSEhYT8oYT4+PjApKzQyOTQ5NjcyOTYqYjpOYU47Yz4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0xbYz4+Mj4+PjBdPWEuZ2V0U2Vjb25kcygpO0xbYys0Pj4yPj4+MF09YS5nZXRNaW51dGVzKCk7TFtjKzg+PjI+Pj4wXT1hLmdldEhvdXJzKCk7TFtjKzEyPj4yPj4+MF09YS5nZXREYXRlKCk7TFtjKzE2Pj4yPj4+MF09YS5nZXRNb250aCgpO0xbYysyMD4+Mj4+PjBdPWEuZ2V0RnVsbFllYXIoKS0xOTAwO0xbYysyND4+Mj4+PjBdPWEuZ2V0RGF5KCk7TFtjKzI4Pj4yPj4+XG4wXT0oVyhhLmdldEZ1bGxZZWFyKCkpP3ZhOndhKVthLmdldE1vbnRoKCldK2EuZ2V0RGF0ZSgpLTF8MDtMW2MrMzY+PjI+Pj4wXT0tKDYwKmEuZ2V0VGltZXpvbmVPZmZzZXQoKSk7Yj0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGY9KG5ldyBEYXRlKGEuZ2V0RnVsbFllYXIoKSwwLDEpKS5nZXRUaW1lem9uZU9mZnNldCgpO0xbYyszMj4+Mj4+PjBdPShiIT1mJiZhLmdldFRpbWV6b25lT2Zmc2V0KCk9PU1hdGgubWluKGYsYikpfDB9LHE6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPW5ldyBEYXRlKExbYSsyMD4+Mj4+PjBdKzE5MDAsTFthKzE2Pj4yPj4+MF0sTFthKzEyPj4yPj4+MF0sTFthKzg+PjI+Pj4wXSxMW2ErND4+Mj4+PjBdLExbYT4+Mj4+PjBdLDApLGM9TFthKzMyPj4yPj4+MF0sZj1iLmdldFRpbWV6b25lT2Zmc2V0KCksZz0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksXG5oPShuZXcgRGF0ZShiLmdldEZ1bGxZZWFyKCksMCwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKSxtPU1hdGgubWluKGgsZyk7MD5jP0xbYSszMj4+Mj4+PjBdPU51bWJlcihnIT1oJiZtPT1mKTowPGMhPShtPT1mKSYmKGc9TWF0aC5tYXgoaCxnKSxiLnNldFRpbWUoYi5nZXRUaW1lKCkrNkU0KigoMDxjP206ZyktZikpKTtMW2ErMjQ+PjI+Pj4wXT1iLmdldERheSgpO0xbYSsyOD4+Mj4+PjBdPShXKGIuZ2V0RnVsbFllYXIoKSk/dmE6d2EpW2IuZ2V0TW9udGgoKV0rYi5nZXREYXRlKCktMXwwO0xbYT4+Mj4+PjBdPWIuZ2V0U2Vjb25kcygpO0xbYSs0Pj4yPj4+MF09Yi5nZXRNaW51dGVzKCk7TFthKzg+PjI+Pj4wXT1iLmdldEhvdXJzKCk7TFthKzEyPj4yPj4+MF09Yi5nZXREYXRlKCk7TFthKzE2Pj4yPj4+MF09Yi5nZXRNb250aCgpO0xbYSsyMD4+Mj4+PjBdPWIuZ2V0WWVhcigpO2E9Yi5nZXRUaW1lKCkvMUUzO3JldHVybiBJYSgoUj1hLDE8PStNYXRoLmFicyhSKT8wPFI/K01hdGguZmxvb3IoUi9cbjQyOTQ5NjcyOTYpPj4+MDp+fitNYXRoLmNlaWwoKFItKyh+flI+Pj4wKSkvNDI5NDk2NzI5Nik+Pj4wOjApKSxhPj4+MH0sbTpmdW5jdGlvbigpe3JldHVybi01Mn0sbjpmdW5jdGlvbigpe30sdDpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZih3KXtyZXR1cm4odz13LnRvVGltZVN0cmluZygpLm1hdGNoKC9cXCgoW0EtWmEteiBdKylcXCkkLykpP3dbMV06XCJHTVRcIn1jPj4+PTA7dmFyIGc9KG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpLGg9bmV3IERhdGUoZywwLDEpLG09bmV3IERhdGUoZyw2LDEpO2c9aC5nZXRUaW1lem9uZU9mZnNldCgpO3ZhciBxPW0uZ2V0VGltZXpvbmVPZmZzZXQoKTtNW2E+Pj4wPj4yPj4+MF09NjAqTWF0aC5tYXgoZyxxKTtMW2I+Pj4wPj4yPj4+MF09TnVtYmVyKGchPXEpO2E9ZihoKTtiPWYobSk7YT1CYShhKTtiPUJhKGIpO3E8Zz8oTVtjPj4yPj4+MF09YSxNW2MrND4+Mj4+PjBdPWIpOihNW2M+PjI+Pj4wXT1iLE1bYys0Pj4yPj4+MF09YSl9LGQ6KCk9PntHKFwiXCIpfSxcbmg6ZnVuY3Rpb24oKXtyZXR1cm4gRGF0ZS5ub3coKX0sdTpmdW5jdGlvbigpe3JldHVybiA0Mjk0OTAxNzYwfSxiOigpPT5wZXJmb3JtYW5jZS5ub3coKSxJOmZ1bmN0aW9uKGEsYixjKXtiPj4+PTA7cmV0dXJuIEsuY29weVdpdGhpbihhPj4+MD4+PjAsYj4+PjAsYisoYz4+PjApPj4+MCl9LHM6ZnVuY3Rpb24oYSl7YT4+Pj0wO3ZhciBiPUsubGVuZ3RoO2lmKDQyOTQ5MDE3NjA8YSlyZXR1cm4hMTtmb3IodmFyIGM9MTs0Pj1jO2MqPTIpe3ZhciBmPWIqKDErLjIvYyk7Zj1NYXRoLm1pbihmLGErMTAwNjYzMjk2KTt2YXIgZz1NYXRoO2Y9TWF0aC5tYXgoYSxmKTthOntnPWcubWluLmNhbGwoZyw0Mjk0OTAxNzYwLGYrKDY1NTM2LWYlNjU1MzYpJTY1NTM2KS1ILmJ1ZmZlci5ieXRlTGVuZ3RoKzY1NTM1Pj4+MTY7dHJ5e0guZ3JvdyhnKTtlYSgpO3ZhciBoPTE7YnJlYWsgYX1jYXRjaChtKXt9aD12b2lkIDB9aWYoaClyZXR1cm4hMH1yZXR1cm4hMX0sQzpmdW5jdGlvbihhLGIpe2E+Pj49XG4wO2I+Pj49MDt2YXIgYz0wO0NhKCkuZm9yRWFjaChmdW5jdGlvbihmLGcpe3ZhciBoPWIrYztnPU1bYSs0Kmc+PjI+Pj4wXT1oO2ZvcihoPTA7aDxmLmxlbmd0aDsrK2gpSltnKys+PjA+Pj4wXT1mLmNoYXJDb2RlQXQoaCk7SltnPj4wPj4+MF09MDtjKz1mLmxlbmd0aCsxfSk7cmV0dXJuIDB9LEQ6ZnVuY3Rpb24oYSxiKXthPj4+PTA7Yj4+Pj0wO3ZhciBjPUNhKCk7TVthPj4yPj4+MF09Yy5sZW5ndGg7dmFyIGY9MDtjLmZvckVhY2goZnVuY3Rpb24oZyl7Zis9Zy5sZW5ndGgrMX0pO01bYj4+Mj4+PjBdPWY7cmV0dXJuIDB9LGY6KCk9PjUyLGo6ZnVuY3Rpb24oKXtyZXR1cm4gNTJ9LHI6ZnVuY3Rpb24oKXtyZXR1cm4gNzB9LGk6ZnVuY3Rpb24oYSxiLGMsZil7Yj4+Pj0wO2M+Pj49MDtmPj4+PTA7Zm9yKHZhciBnPTAsaD0wO2g8YztoKyspe3ZhciBtPU1bYj4+Mj4+PjBdLHE9TVtiKzQ+PjI+Pj4wXTtiKz04O2Zvcih2YXIgdz0wO3c8cTt3Kyspe3ZhciB0PUtbbSt3Pj4+MF0sdT1cbkRhW2FdOzA9PT10fHwxMD09PXQ/KCgxPT09YT9jYTpFKSh1YSh1LDApKSx1Lmxlbmd0aD0wKTp1LnB1c2godCl9Zys9cX1NW2Y+PjI+Pj4wXT1nO3JldHVybiAwfSxBOkhhLGM6ZnVuY3Rpb24oYSxiLGMsZil7cmV0dXJuIEhhKGE+Pj4wLGI+Pj4wLGM+Pj4wLGY+Pj4wKX19O1xuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShjKXtjPWMuZXhwb3J0cztJPWM9S2EoYyk7SD1JLko7ZWEoKTtoYS51bnNoaWZ0KEkuSyk7Ti0tO2QubW9uaXRvclJ1bkRlcGVuZGVuY2llcyYmZC5tb25pdG9yUnVuRGVwZW5kZW5jaWVzKE4pO2lmKDA9PU4mJihudWxsIT09TyYmKGNsZWFySW50ZXJ2YWwoTyksTz1udWxsKSxQKSl7dmFyIGY9UDtQPW51bGw7ZigpfXJldHVybiBjfXZhciBiPXthOkphfTtOKys7ZC5tb25pdG9yUnVuRGVwZW5kZW5jaWVzJiZkLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMoTik7aWYoZC5pbnN0YW50aWF0ZVdhc20pdHJ5e3JldHVybiBkLmluc3RhbnRpYXRlV2FzbShiLGEpfWNhdGNoKGMpe0UoXCJNb2R1bGUuaW5zdGFudGlhdGVXYXNtIGNhbGxiYWNrIGZhaWxlZCB3aXRoIGVycm9yOiBcIitjKSxsKGMpfXBhKGIsZnVuY3Rpb24oYyl7YShjLmluc3RhbmNlKX0pLmNhdGNoKGwpO3JldHVybnt9fSkoKTtcbmQuX09ydEluaXQ9KGEsYik9PihkLl9PcnRJbml0PUkuTCkoYSxiKTtkLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihkLl9PcnRHZXRMYXN0RXJyb3I9SS5NKShhLGIpO2QuX09ydENyZWF0ZVNlc3Npb25PcHRpb25zPShhLGIsYyxmLGcsaCxtLHEsdyx0KT0+KGQuX09ydENyZWF0ZVNlc3Npb25PcHRpb25zPUkuTikoYSxiLGMsZixnLGgsbSxxLHcsdCk7ZC5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXI9KGEsYik9PihkLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcj1JLk8pKGEsYik7ZC5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlPShhLGIsYyk9PihkLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9SS5QKShhLGIsYyk7ZC5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihkLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9SS5RKShhLGIsYyk7ZC5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPWE9PihkLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnM9SS5SKShhKTtcbmQuX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KGQuX09ydENyZWF0ZVNlc3Npb249SS5TKShhLGIsYyk7ZC5fT3J0UmVsZWFzZVNlc3Npb249YT0+KGQuX09ydFJlbGVhc2VTZXNzaW9uPUkuVCkoYSk7ZC5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudD0oYSxiLGMpPT4oZC5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudD1JLlUpKGEsYixjKTtkLl9PcnRHZXRJbnB1dE5hbWU9KGEsYik9PihkLl9PcnRHZXRJbnB1dE5hbWU9SS5WKShhLGIpO2QuX09ydEdldE91dHB1dE5hbWU9KGEsYik9PihkLl9PcnRHZXRPdXRwdXROYW1lPUkuVykoYSxiKTtkLl9PcnRGcmVlPWE9PihkLl9PcnRGcmVlPUkuWCkoYSk7ZC5fT3J0Q3JlYXRlVGVuc29yPShhLGIsYyxmLGcsaCk9PihkLl9PcnRDcmVhdGVUZW5zb3I9SS5ZKShhLGIsYyxmLGcsaCk7ZC5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZixnKT0+KGQuX09ydEdldFRlbnNvckRhdGE9SS5aKShhLGIsYyxmLGcpO1xuZC5fT3J0UmVsZWFzZVRlbnNvcj1hPT4oZC5fT3J0UmVsZWFzZVRlbnNvcj1JLl8pKGEpO2QuX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGYpPT4oZC5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1JLiQpKGEsYixjLGYpO2QuX09ydEFkZFJ1bkNvbmZpZ0VudHJ5PShhLGIsYyk9PihkLl9PcnRBZGRSdW5Db25maWdFbnRyeT1JLmFhKShhLGIsYyk7ZC5fT3J0UmVsZWFzZVJ1bk9wdGlvbnM9YT0+KGQuX09ydFJlbGVhc2VSdW5PcHRpb25zPUkuYmEpKGEpO2QuX09ydENyZWF0ZUJpbmRpbmc9YT0+KGQuX09ydENyZWF0ZUJpbmRpbmc9SS5jYSkoYSk7ZC5fT3J0QmluZElucHV0PShhLGIsYyk9PihkLl9PcnRCaW5kSW5wdXQ9SS5kYSkoYSxiLGMpO2QuX09ydEJpbmRPdXRwdXQ9KGEsYixjLGYpPT4oZC5fT3J0QmluZE91dHB1dD1JLmVhKShhLGIsYyxmKTtkLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4oZC5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9SS5mYSkoYSk7XG5kLl9PcnRSZWxlYXNlQmluZGluZz1hPT4oZC5fT3J0UmVsZWFzZUJpbmRpbmc9SS5nYSkoYSk7ZC5fT3J0UnVuV2l0aEJpbmRpbmc9KGEsYixjLGYsZyk9PihkLl9PcnRSdW5XaXRoQmluZGluZz1JLmhhKShhLGIsYyxmLGcpO2QuX09ydFJ1bj0oYSxiLGMsZixnLGgsbSxxKT0+KGQuX09ydFJ1bj1JLmlhKShhLGIsYyxmLGcsaCxtLHEpO2QuX09ydEVuZFByb2ZpbGluZz1hPT4oZC5fT3J0RW5kUHJvZmlsaW5nPUkuamEpKGEpO2QuX09ydFRyYWluaW5nTG9hZENoZWNrcG9pbnQ9KGEsYik9PihkLl9PcnRUcmFpbmluZ0xvYWRDaGVja3BvaW50PUkua2EpKGEsYik7ZC5fT3J0VHJhaW5pbmdSZWxlYXNlQ2hlY2twb2ludD1hPT4oZC5fT3J0VHJhaW5pbmdSZWxlYXNlQ2hlY2twb2ludD1JLmxhKShhKTtkLl9PcnRUcmFpbmluZ0NyZWF0ZVNlc3Npb249KGEsYixjLGYsZyxoLG0scSk9PihkLl9PcnRUcmFpbmluZ0NyZWF0ZVNlc3Npb249SS5tYSkoYSxiLGMsZixnLGgsbSxxKTtcbmQuX09ydFRyYWluaW5nTGF6eVJlc2V0R3JhZD1hPT4oZC5fT3J0VHJhaW5pbmdMYXp5UmVzZXRHcmFkPUkubmEpKGEpO2QuX09ydFRyYWluaW5nUnVuVHJhaW5TdGVwPShhLGIsYyxmLGcsaCk9PihkLl9PcnRUcmFpbmluZ1J1blRyYWluU3RlcD1JLm9hKShhLGIsYyxmLGcsaCk7ZC5fT3J0VHJhaW5pbmdPcHRpbWl6ZXJTdGVwPShhLGIpPT4oZC5fT3J0VHJhaW5pbmdPcHRpbWl6ZXJTdGVwPUkucGEpKGEsYik7ZC5fT3J0VHJhaW5pbmdFdmFsU3RlcD0oYSxiLGMsZixnLGgpPT4oZC5fT3J0VHJhaW5pbmdFdmFsU3RlcD1JLnFhKShhLGIsYyxmLGcsaCk7ZC5fT3J0VHJhaW5pbmdHZXRQYXJhbWV0ZXJzU2l6ZT0oYSxiLGMpPT4oZC5fT3J0VHJhaW5pbmdHZXRQYXJhbWV0ZXJzU2l6ZT1JLnJhKShhLGIsYyk7ZC5fT3J0VHJhaW5pbmdDb3B5UGFyYW1ldGVyc1RvQnVmZmVyPShhLGIsYyxmKT0+KGQuX09ydFRyYWluaW5nQ29weVBhcmFtZXRlcnNUb0J1ZmZlcj1JLnNhKShhLGIsYyxmKTtcbmQuX09ydFRyYWluaW5nQ29weVBhcmFtZXRlcnNGcm9tQnVmZmVyPShhLGIsYyxmKT0+KGQuX09ydFRyYWluaW5nQ29weVBhcmFtZXRlcnNGcm9tQnVmZmVyPUkudGEpKGEsYixjLGYpO2QuX09ydFRyYWluaW5nUmVsZWFzZVNlc3Npb249YT0+KGQuX09ydFRyYWluaW5nUmVsZWFzZVNlc3Npb249SS51YSkoYSk7dmFyIEFhPWQuX21hbGxvYz1hPT4oQWE9ZC5fbWFsbG9jPUkudmEpKGEpO2QuX2ZyZWU9YT0+KGQuX2ZyZWU9SS53YSkoYSk7dmFyIElhPWE9PihJYT1JLnlhKShhKSxMYT0oKT0+KExhPUkuemEpKCksTWE9YT0+KE1hPUkuQWEpKGEpLE5hPWE9PihOYT1JLkJhKShhKTtcbmZ1bmN0aW9uIEthKGEpe2E9T2JqZWN0LmFzc2lnbih7fSxhKTt2YXIgYj1mPT4oKT0+ZigpPj4+MCxjPWY9Pmc9PmYoZyk+Pj4wO2EuX19lcnJub19sb2NhdGlvbj1iKGEuX19lcnJub19sb2NhdGlvbik7YS5tYWxsb2M9YyhhLm1hbGxvYyk7YS5zdGFja1NhdmU9YihhLnN0YWNrU2F2ZSk7YS5zdGFja0FsbG9jPWMoYS5zdGFja0FsbG9jKTtyZXR1cm4gYX1kLnN0YWNrQWxsb2M9TmE7ZC5zdGFja1NhdmU9TGE7ZC5zdGFja1Jlc3RvcmU9TWE7ZC5VVEY4VG9TdHJpbmc9VDtkLnN0cmluZ1RvVVRGOD0oYSxiLGMpPT5WKGEsSyxiLGMpO2QubGVuZ3RoQnl0ZXNVVEY4PVU7dmFyIFo7UD1mdW5jdGlvbiBPYSgpe1p8fFBhKCk7Wnx8KFA9T2EpfTtcbmZ1bmN0aW9uIFBhKCl7ZnVuY3Rpb24gYSgpe2lmKCFaJiYoWj0hMCxkLmNhbGxlZFJ1bj0hMCwhZGEpKXtTKGhhKTtrKGQpO2lmKGQub25SdW50aW1lSW5pdGlhbGl6ZWQpZC5vblJ1bnRpbWVJbml0aWFsaXplZCgpO2lmKGQucG9zdFJ1bilmb3IoXCJmdW5jdGlvblwiPT10eXBlb2YgZC5wb3N0UnVuJiYoZC5wb3N0UnVuPVtkLnBvc3RSdW5dKTtkLnBvc3RSdW4ubGVuZ3RoOyl7dmFyIGI9ZC5wb3N0UnVuLnNoaWZ0KCk7aWEudW5zaGlmdChiKX1TKGlhKX19aWYoISgwPE4pKXtpZihkLnByZVJ1bilmb3IoXCJmdW5jdGlvblwiPT10eXBlb2YgZC5wcmVSdW4mJihkLnByZVJ1bj1bZC5wcmVSdW5dKTtkLnByZVJ1bi5sZW5ndGg7KWphKCk7UyhmYSk7MDxOfHwoZC5zZXRTdGF0dXM/KGQuc2V0U3RhdHVzKFwiUnVubmluZy4uLlwiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe2Quc2V0U3RhdHVzKFwiXCIpfSwxKTthKCl9LDEpKTphKCkpfX1cbmlmKGQucHJlSW5pdClmb3IoXCJmdW5jdGlvblwiPT10eXBlb2YgZC5wcmVJbml0JiYoZC5wcmVJbml0PVtkLnByZUluaXRdKTswPGQucHJlSW5pdC5sZW5ndGg7KWQucHJlSW5pdC5wb3AoKSgpO1BhKCk7XG5cblxuICByZXR1cm4gbW9kdWxlQXJnLnJlYWR5XG59XG5cbik7XG59KSgpO1xuaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JylcbiAgbW9kdWxlLmV4cG9ydHMgPSBvcnRXYXNtO1xuZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKVxuICBkZWZpbmUoW10sICgpID0+IG9ydFdhc20pO1xuIiwgIiIsICIiLCAiZXhwb3J0IGNvbnN0IGNwdXMgPSB1bmRlZmluZWQ7IiwgIlxudmFyIG9ydFdhc21UaHJlYWRlZCA9ICgoKSA9PiB7XG4gIHZhciBfc2NyaXB0RGlyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMgOiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgX19maWxlbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIF9zY3JpcHREaXIgPSBfc2NyaXB0RGlyIHx8IF9fZmlsZW5hbWU7XG4gIHJldHVybiAoXG5mdW5jdGlvbihtb2R1bGVBcmcgPSB7fSkge1xuXG5mdW5jdGlvbiBwKCl7cS5idWZmZXIhPXIuYnVmZmVyJiZ0KCk7cmV0dXJuIHJ9ZnVuY3Rpb24geCgpe3EuYnVmZmVyIT1yLmJ1ZmZlciYmdCgpO3JldHVybiBiYX1mdW5jdGlvbiBjYSgpe3EuYnVmZmVyIT1yLmJ1ZmZlciYmdCgpO3JldHVybiBkYX1mdW5jdGlvbiBlYSgpe3EuYnVmZmVyIT1yLmJ1ZmZlciYmdCgpO3JldHVybiBmYX1mdW5jdGlvbiBBKCl7cS5idWZmZXIhPXIuYnVmZmVyJiZ0KCk7cmV0dXJuIGhhfWZ1bmN0aW9uIEIoKXtxLmJ1ZmZlciE9ci5idWZmZXImJnQoKTtyZXR1cm4gaWF9ZnVuY3Rpb24gamEoKXtxLmJ1ZmZlciE9ci5idWZmZXImJnQoKTtyZXR1cm4ga2F9dmFyIEM9bW9kdWxlQXJnLGxhLG1hO0MucmVhZHk9bmV3IFByb21pc2UoKGEsYik9PntsYT1hO21hPWJ9KTtcbnZhciBuYT1PYmplY3QuYXNzaWduKHt9LEMpLG9hPVwiLi90aGlzLnByb2dyYW1cIixwYT0oYSxiKT0+e3Rocm93IGI7fSxxYT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93LHJhPVwiZnVuY3Rpb25cIj09dHlwZW9mIGltcG9ydFNjcmlwdHMsRj1cIm9iamVjdFwiPT10eXBlb2YgcHJvY2VzcyYmXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MudmVyc2lvbnMmJlwic3RyaW5nXCI9PXR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUsRz1DLkVOVklST05NRU5UX0lTX1BUSFJFQUR8fCExLEg9XCJcIjtmdW5jdGlvbiBzYShhKXtyZXR1cm4gQy5sb2NhdGVGaWxlP0MubG9jYXRlRmlsZShhLEgpOkgrYX12YXIgdGEsdWEsdmE7XG5pZihGKXt2YXIgZnM9cmVxdWlyZShcImZzXCIpLHdhPXJlcXVpcmUoXCJwYXRoXCIpO0g9cmE/d2EuZGlybmFtZShIKStcIi9cIjpfX2Rpcm5hbWUrXCIvXCI7dGE9KGIsYyk9PntiPWIuc3RhcnRzV2l0aChcImZpbGU6Ly9cIik/bmV3IFVSTChiKTp3YS5ub3JtYWxpemUoYik7cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhiLGM/dm9pZCAwOlwidXRmOFwiKX07dmE9Yj0+e2I9dGEoYiwhMCk7Yi5idWZmZXJ8fChiPW5ldyBVaW50OEFycmF5KGIpKTtyZXR1cm4gYn07dWE9KGIsYyxkLGU9ITApPT57Yj1iLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpP25ldyBVUkwoYik6d2Eubm9ybWFsaXplKGIpO2ZzLnJlYWRGaWxlKGIsZT92b2lkIDA6XCJ1dGY4XCIsKGYsZyk9PntmP2QoZik6YyhlP2cuYnVmZmVyOmcpfSl9OyFDLnRoaXNQcm9ncmFtJiYxPHByb2Nlc3MuYXJndi5sZW5ndGgmJihvYT1wcm9jZXNzLmFyZ3ZbMV0ucmVwbGFjZSgvXFxcXC9nLFwiL1wiKSk7cHJvY2Vzcy5hcmd2LnNsaWNlKDIpO3BhPShiLGMpPT57cHJvY2Vzcy5leGl0Q29kZT1cbmI7dGhyb3cgYzt9O0MuaW5zcGVjdD0oKT0+XCJbRW1zY3JpcHRlbiBNb2R1bGUgb2JqZWN0XVwiO2xldCBhO3RyeXthPXJlcXVpcmUoXCJ3b3JrZXJfdGhyZWFkc1wiKX1jYXRjaChiKXt0aHJvdyBjb25zb2xlLmVycm9yKCdUaGUgXCJ3b3JrZXJfdGhyZWFkc1wiIG1vZHVsZSBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgbm9kZS5qcyBidWlsZCAtIHBlcmhhcHMgYSBuZXdlciB2ZXJzaW9uIGlzIG5lZWRlZD8nKSxiO31nbG9iYWwuV29ya2VyPWEuV29ya2VyfWVsc2UgaWYocWF8fHJhKXJhP0g9c2VsZi5sb2NhdGlvbi5ocmVmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCYmZG9jdW1lbnQuY3VycmVudFNjcmlwdCYmKEg9ZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMpLCh0eXBlb2YgX3NjcmlwdERpciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBfc2NyaXB0RGlyKSYmKEg9X3NjcmlwdERpciksMCE9PUguaW5kZXhPZihcImJsb2I6XCIpP0g9SC5zdWJzdHIoMCxILnJlcGxhY2UoL1s/I10uKi8sXCJcIikubGFzdEluZGV4T2YoXCIvXCIpKzEpOkg9XCJcIixGfHwodGE9YT0+e3ZhciBiPVxubmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkdFVFwiLGEsITEpO2Iuc2VuZChudWxsKTtyZXR1cm4gYi5yZXNwb25zZVRleHR9LHJhJiYodmE9YT0+e3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJHRVRcIixhLCExKTtiLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCI7Yi5zZW5kKG51bGwpO3JldHVybiBuZXcgVWludDhBcnJheShiLnJlc3BvbnNlKX0pLHVhPShhLGIsYyk9Pnt2YXIgZD1uZXcgWE1MSHR0cFJlcXVlc3Q7ZC5vcGVuKFwiR0VUXCIsYSwhMCk7ZC5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiO2Qub25sb2FkPSgpPT57MjAwPT1kLnN0YXR1c3x8MD09ZC5zdGF0dXMmJmQucmVzcG9uc2U/YihkLnJlc3BvbnNlKTpjKCl9O2Qub25lcnJvcj1jO2Quc2VuZChudWxsKX0pO0YmJlwidW5kZWZpbmVkXCI9PXR5cGVvZiBwZXJmb3JtYW5jZSYmKGdsb2JhbC5wZXJmb3JtYW5jZT1yZXF1aXJlKFwicGVyZl9ob29rc1wiKS5wZXJmb3JtYW5jZSk7XG52YXIgeGE9Y29uc29sZS5sb2cuYmluZChjb25zb2xlKSx5YT1jb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7RiYmKHhhPSguLi5hKT0+ZnMud3JpdGVTeW5jKDEsYS5qb2luKFwiIFwiKStcIlxcblwiKSx5YT0oLi4uYSk9PmZzLndyaXRlU3luYygyLGEuam9pbihcIiBcIikrXCJcXG5cIikpO3ZhciB6YT14YSxMPXlhO09iamVjdC5hc3NpZ24oQyxuYSk7bmE9bnVsbDt2YXIgbm9FeGl0UnVudGltZT0hMDtcIm9iamVjdFwiIT10eXBlb2YgV2ViQXNzZW1ibHkmJkFhKFwibm8gbmF0aXZlIHdhc20gc3VwcG9ydCBkZXRlY3RlZFwiKTt2YXIgcSxCYSxDYT0hMSxEYSxyLGJhLGRhLGZhLGhhLGlhLEVhLEZhLEdhLGthO1xuZnVuY3Rpb24gdCgpe3ZhciBhPXEuYnVmZmVyO0MuSEVBUDg9cj1uZXcgSW50OEFycmF5KGEpO0MuSEVBUDE2PWRhPW5ldyBJbnQxNkFycmF5KGEpO0MuSEVBUFU4PWJhPW5ldyBVaW50OEFycmF5KGEpO0MuSEVBUFUxNj1mYT1uZXcgVWludDE2QXJyYXkoYSk7Qy5IRUFQMzI9aGE9bmV3IEludDMyQXJyYXkoYSk7Qy5IRUFQVTMyPWlhPW5ldyBVaW50MzJBcnJheShhKTtDLkhFQVBGMzI9RWE9bmV3IEZsb2F0MzJBcnJheShhKTtDLkhFQVBGNjQ9a2E9bmV3IEZsb2F0NjRBcnJheShhKTtDLkhFQVA2ND1GYT1uZXcgQmlnSW50NjRBcnJheShhKTtDLkhFQVBVNjQ9R2E9bmV3IEJpZ1VpbnQ2NEFycmF5KGEpfXZhciBIYT0xNjc3NzIxNjs1MjQyODgwPD1IYXx8QWEoXCJJTklUSUFMX01FTU9SWSBzaG91bGQgYmUgbGFyZ2VyIHRoYW4gU1RBQ0tfU0laRSwgd2FzIFwiK0hhK1wiISAoU1RBQ0tfU0laRT01MjQyODgwKVwiKTtcbmlmKEcpcT1DLndhc21NZW1vcnk7ZWxzZSBpZihxPW5ldyBXZWJBc3NlbWJseS5NZW1vcnkoe2luaXRpYWw6SGEvNjU1MzYsbWF4aW11bTo2NTUzNixzaGFyZWQ6ITB9KSwhKHEuYnVmZmVyIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpKXRocm93IEwoXCJyZXF1ZXN0ZWQgYSBzaGFyZWQgV2ViQXNzZW1ibHkuTWVtb3J5IGJ1dCB0aGUgcmV0dXJuZWQgYnVmZmVyIGlzIG5vdCBhIFNoYXJlZEFycmF5QnVmZmVyLCBpbmRpY2F0aW5nIHRoYXQgd2hpbGUgdGhlIGJyb3dzZXIgaGFzIFNoYXJlZEFycmF5QnVmZmVyIGl0IGRvZXMgbm90IGhhdmUgV2ViQXNzZW1ibHkgdGhyZWFkcyBzdXBwb3J0IC0geW91IG1heSBuZWVkIHRvIHNldCBhIGZsYWdcIiksRiYmTChcIihvbiBub2RlIHlvdSBtYXkgbmVlZDogLS1leHBlcmltZW50YWwtd2FzbS10aHJlYWRzIC0tZXhwZXJpbWVudGFsLXdhc20tYnVsay1tZW1vcnkgYW5kL29yIHJlY2VudCB2ZXJzaW9uKVwiKSxFcnJvcihcImJhZCBtZW1vcnlcIik7XG50KCk7SGE9cS5idWZmZXIuYnl0ZUxlbmd0aDt2YXIgSWE9W10sSmE9W10sS2E9W10sTGE9MDtmdW5jdGlvbiBNYSgpe3JldHVybiBub0V4aXRSdW50aW1lfHwwPExhfXZhciBOYT0wLE9hPW51bGwsUGE9bnVsbDtmdW5jdGlvbiBRYSgpe05hLS07aWYoMD09TmEmJihudWxsIT09T2EmJihjbGVhckludGVydmFsKE9hKSxPYT1udWxsKSxQYSkpe3ZhciBhPVBhO1BhPW51bGw7YSgpfX1mdW5jdGlvbiBBYShhKXthPVwiQWJvcnRlZChcIithK1wiKVwiO0woYSk7Q2E9ITA7RGE9MTthPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3IoYStcIi4gQnVpbGQgd2l0aCAtc0FTU0VSVElPTlMgZm9yIG1vcmUgaW5mby5cIik7bWEoYSk7dGhyb3cgYTt9ZnVuY3Rpb24gUmEoYSl7cmV0dXJuIGEuc3RhcnRzV2l0aChcImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxcIil9dmFyIFNhO1NhPVwib3J0LXdhc20tdGhyZWFkZWQud2FzbVwiO1JhKFNhKXx8KFNhPXNhKFNhKSk7XG5mdW5jdGlvbiBUYShhKXtpZih2YSlyZXR1cm4gdmEoYSk7dGhyb3dcImJvdGggYXN5bmMgYW5kIHN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkXCI7fWZ1bmN0aW9uIFVhKGEpe2lmKHFhfHxyYSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZmV0Y2gmJiFhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXJldHVybiBmZXRjaChhLHtjcmVkZW50aWFsczpcInNhbWUtb3JpZ2luXCJ9KS50aGVuKGI9PntpZighYi5vayl0aHJvd1wiZmFpbGVkIHRvIGxvYWQgd2FzbSBiaW5hcnkgZmlsZSBhdCAnXCIrYStcIidcIjtyZXR1cm4gYi5hcnJheUJ1ZmZlcigpfSkuY2F0Y2goKCk9PlRhKGEpKTtpZih1YSlyZXR1cm4gbmV3IFByb21pc2UoKGIsYyk9Pnt1YShhLGQ9PmIobmV3IFVpbnQ4QXJyYXkoZCkpLGMpfSl9cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PlRhKGEpKX1cbmZ1bmN0aW9uIFZhKGEsYixjKXtyZXR1cm4gVWEoYSkudGhlbihkPT5XZWJBc3NlbWJseS5pbnN0YW50aWF0ZShkLGIpKS50aGVuKGQ9PmQpLnRoZW4oYyxkPT57TChgZmFpbGVkIHRvIGFzeW5jaHJvbm91c2x5IHByZXBhcmUgd2FzbTogJHtkfWApO0FhKGQpfSl9XG5mdW5jdGlvbiBXYShhLGIpe3ZhciBjPVNhO3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nfHxSYShjKXx8Yy5zdGFydHNXaXRoKFwiZmlsZTovL1wiKXx8Rnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZmV0Y2g/VmEoYyxhLGIpOmZldGNoKGMse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pLnRoZW4oZD0+V2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcoZCxhKS50aGVuKGIsZnVuY3Rpb24oZSl7TChgd2FzbSBzdHJlYW1pbmcgY29tcGlsZSBmYWlsZWQ6ICR7ZX1gKTtMKFwiZmFsbGluZyBiYWNrIHRvIEFycmF5QnVmZmVyIGluc3RhbnRpYXRpb25cIik7cmV0dXJuIFZhKGMsYSxiKX0pKX1mdW5jdGlvbiBYYShhKXt0aGlzLm5hbWU9XCJFeGl0U3RhdHVzXCI7dGhpcy5tZXNzYWdlPWBQcm9ncmFtIHRlcm1pbmF0ZWQgd2l0aCBleGl0KCR7YX0pYDt0aGlzLnN0YXR1cz1hfVxudmFyIFlhPWE9PnthLnRlcm1pbmF0ZSgpO2Eub25tZXNzYWdlPSgpPT57fX0sWmE9YT0+e2lmKDA9PU0uUWUubGVuZ3RoKXt2YXIgYj1zYShcIm9ydC13YXNtLXRocmVhZGVkLndvcmtlci5qc1wiKTtiPW5ldyBXb3JrZXIoYik7TS5RZS5wdXNoKGIpO00uc2YoTS5RZVswXSl9Yj1NLlFlLnBvcCgpO2lmKCFiKXJldHVybiA2O00uTmUucHVzaChiKTtNLkplW2EuTWVdPWI7Yi5NZT1hLk1lO3ZhciBjPXtjbWQ6XCJydW5cIixzdGFydF9yb3V0aW5lOmEudWYsYXJnOmEubWYscHRocmVhZF9wdHI6YS5NZX07RiYmYi51bnJlZigpO2IucG9zdE1lc3NhZ2UoYyxhLkFmKTtyZXR1cm4gMH0sJGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFRleHREZWNvZGVyP25ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik6dm9pZCAwLGFiPShhLGIsYyk9PntiPj4+PTA7dmFyIGQ9YitjO2ZvcihjPWI7YVtjXSYmIShjPj1kKTspKytjO2lmKDE2PGMtYiYmYS5idWZmZXImJiRhKXJldHVybiAkYS5kZWNvZGUoYS5idWZmZXIgaW5zdGFuY2VvZlxuU2hhcmVkQXJyYXlCdWZmZXI/YS5zbGljZShiLGMpOmEuc3ViYXJyYXkoYixjKSk7Zm9yKGQ9XCJcIjtiPGM7KXt2YXIgZT1hW2IrK107aWYoZSYxMjgpe3ZhciBmPWFbYisrXSY2MztpZigxOTI9PShlJjIyNCkpZCs9U3RyaW5nLmZyb21DaGFyQ29kZSgoZSYzMSk8PDZ8Zik7ZWxzZXt2YXIgZz1hW2IrK10mNjM7ZT0yMjQ9PShlJjI0MCk/KGUmMTUpPDwxMnxmPDw2fGc6KGUmNyk8PDE4fGY8PDEyfGc8PDZ8YVtiKytdJjYzOzY1NTM2PmU/ZCs9U3RyaW5nLmZyb21DaGFyQ29kZShlKTooZS09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxlPj4xMCw1NjMyMHxlJjEwMjMpKX19ZWxzZSBkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBkfSxiYj0oYSxiKT0+KGE+Pj49MCk/YWIoeCgpLGEsYik6XCJcIjtmdW5jdGlvbiBjYihhKXtpZihHKXJldHVybiBOKDAsMSxhKTtEYT1hO01hKCl8fChNLnZmKCksQ2E9ITApO3BhKGEsbmV3IFhhKGEpKX1cbnZhciBlYj1hPT57RGE9YTtpZihHKXRocm93IGRiKGEpLFwidW53aW5kXCI7Y2IoYSl9O2Z1bmN0aW9uIGdiKCl7SWEudW5zaGlmdCgoKT0+e05hKys7UWEoKX0pfVxudmFyIE09e1FlOltdLE5lOltdLGZmOltdLEplOnt9LFhlKCl7Rz8oTS5yZWNlaXZlT2JqZWN0VHJhbnNmZXI9TS50ZixNLnRocmVhZEluaXRUTFM9TS5lZixNLnNldEV4aXRTdGF0dXM9TS5iZixub0V4aXRSdW50aW1lPSExKTpnYigpfSxiZjphPT57RGE9YX0sRGY6W1wiJHRlcm1pbmF0ZVdvcmtlclwiXSx2ZjooKT0+e2Zvcih2YXIgYSBvZiBNLk5lKVlhKGEpO2ZvcihhIG9mIE0uUWUpWWEoYSk7TS5RZT1bXTtNLk5lPVtdO00uSmU9W119LGFmOmE9Pnt2YXIgYj1hLk1lO2RlbGV0ZSBNLkplW2JdO00uUWUucHVzaChhKTtNLk5lLnNwbGljZShNLk5lLmluZGV4T2YoYSksMSk7YS5NZT0wO2hiKGIpfSx0Zigpe30sZWYoKXtNLmZmLmZvckVhY2goYT0+YSgpKX0sc2Y6YT0+bmV3IFByb21pc2UoYj0+e2Eub25tZXNzYWdlPWY9PntmPWYuZGF0YTt2YXIgZz1mLmNtZDtpZihmLnRhcmdldFRocmVhZCYmZi50YXJnZXRUaHJlYWQhPWliKCkpe3ZhciBoPU0uSmVbZi50YXJnZXRUaHJlYWRdO2g/XG5oLnBvc3RNZXNzYWdlKGYsZi50cmFuc2Zlckxpc3QpOkwoYEludGVybmFsIGVycm9yISBXb3JrZXIgc2VudCBhIG1lc3NhZ2UgXCIke2d9XCIgdG8gdGFyZ2V0IHB0aHJlYWQgJHtmLnRhcmdldFRocmVhZH0sIGJ1dCB0aGF0IHRocmVhZCBubyBsb25nZXIgZXhpc3RzIWApfWVsc2UgaWYoXCJjaGVja01haWxib3hcIj09PWcpamIoKTtlbHNlIGlmKFwic3Bhd25UaHJlYWRcIj09PWcpWmEoZik7ZWxzZSBpZihcImNsZWFudXBUaHJlYWRcIj09PWcpKGY9TS5KZVtmLnRocmVhZF0pfHxBYSgpLE0uYWYoZik7ZWxzZSBpZihcImtpbGxUaHJlYWRcIj09PWcpZj1mLnRocmVhZCxnPU0uSmVbZl0sZGVsZXRlIE0uSmVbZl0sWWEoZyksaGIoZiksTS5OZS5zcGxpY2UoTS5OZS5pbmRleE9mKGcpLDEpLGcuTWU9MDtlbHNlIGlmKFwiY2FuY2VsVGhyZWFkXCI9PT1nKU0uSmVbZi50aHJlYWRdLnBvc3RNZXNzYWdlKHtjbWQ6XCJjYW5jZWxcIn0pO2Vsc2UgaWYoXCJsb2FkZWRcIj09PWcpYS5sb2FkZWQ9ITAsYihhKTtlbHNlIGlmKFwiYWxlcnRcIj09PVxuZylhbGVydChgVGhyZWFkICR7Zi50aHJlYWRJZH06ICR7Zi50ZXh0fWApO2Vsc2UgaWYoXCJzZXRpbW1lZGlhdGVcIj09PWYudGFyZ2V0KWEucG9zdE1lc3NhZ2UoZik7ZWxzZSBpZihcImNhbGxIYW5kbGVyXCI9PT1nKUNbZi5oYW5kbGVyXSguLi5mLmFyZ3MpO2Vsc2UgZyYmTChgd29ya2VyIHNlbnQgYW4gdW5rbm93biBjb21tYW5kICR7Z31gKX07YS5vbmVycm9yPWY9PntMKGAke1wid29ya2VyIHNlbnQgYW4gZXJyb3IhXCJ9ICR7Zi5maWxlbmFtZX06JHtmLmxpbmVub306ICR7Zi5tZXNzYWdlfWApO3Rocm93IGY7fTtGJiYoYS5vbihcIm1lc3NhZ2VcIixmPT5hLm9ubWVzc2FnZSh7ZGF0YTpmfSkpLGEub24oXCJlcnJvclwiLGY9PmEub25lcnJvcihmKSkpO3ZhciBjPVtdLGQ9W10sZTtmb3IoZSBvZiBkKUMuaGFzT3duUHJvcGVydHkoZSkmJmMucHVzaChlKTthLnBvc3RNZXNzYWdlKHtjbWQ6XCJsb2FkXCIsaGFuZGxlcnM6Yyx1cmxPckJsb2I6Qy5tYWluU2NyaXB0VXJsT3JCbG9ifHxfc2NyaXB0RGlyLFxud2FzbU1lbW9yeTpxLHdhc21Nb2R1bGU6QmF9KX0pfTtDLlBUaHJlYWQ9TTt2YXIga2I9YT0+e2Zvcig7MDxhLmxlbmd0aDspYS5zaGlmdCgpKEMpfTtDLmVzdGFibGlzaFN0YWNrU3BhY2U9KCk9Pnt2YXIgYT1pYigpLGI9QigpW2ErNTI+Pj4yPj4+MF07YT1CKClbYSs1Nj4+PjI+Pj4wXTtsYihiLGItYSk7TyhiKX07ZnVuY3Rpb24gZGIoYSl7aWYoRylyZXR1cm4gTigxLDAsYSk7ZWIoYSl9dmFyIG1iPVtdLG5iLFA9YT0+e3ZhciBiPW1iW2FdO2J8fChhPj1tYi5sZW5ndGgmJihtYi5sZW5ndGg9YSsxKSxtYlthXT1iPW5iLmdldChhKSk7cmV0dXJuIGJ9O0MuaW52b2tlRW50cnlQb2ludD0oYSxiKT0+e2E9UChhKShiKTtNYSgpP00uYmYoYSk6b2IoYSl9O3ZhciBwYj1bXSxxYj0wLFE9MDtcbmZ1bmN0aW9uIHJiKGEpe3RoaXMuU2U9YTt0aGlzLkllPWEtMjQ7dGhpcy5sZj1mdW5jdGlvbihiKXtCKClbdGhpcy5JZSs0Pj4+Mj4+PjBdPWJ9O3RoaXMuVGU9ZnVuY3Rpb24oKXtyZXR1cm4gQigpW3RoaXMuSWUrND4+PjI+Pj4wXX07dGhpcy5rZj1mdW5jdGlvbihiKXtCKClbdGhpcy5JZSs4Pj4+Mj4+PjBdPWJ9O3RoaXMuY2Y9ZnVuY3Rpb24oYil7Yj1iPzE6MDtwKClbdGhpcy5JZSsxMj4+PjA+Pj4wXT1ifTt0aGlzLmhmPWZ1bmN0aW9uKCl7cmV0dXJuIDAhPXAoKVt0aGlzLkllKzEyPj4+MD4+PjBdfTt0aGlzLmRmPWZ1bmN0aW9uKGIpe2I9Yj8xOjA7cCgpW3RoaXMuSWUrMTM+Pj4wPj4+MF09Yn07dGhpcy5wZj1mdW5jdGlvbigpe3JldHVybiAwIT1wKClbdGhpcy5JZSsxMz4+PjA+Pj4wXX07dGhpcy5YZT1mdW5jdGlvbihiLGMpe3RoaXMuVWUoMCk7dGhpcy5sZihiKTt0aGlzLmtmKGMpfTt0aGlzLlVlPWZ1bmN0aW9uKGIpe0IoKVt0aGlzLkllKzE2Pj4+Mj4+PjBdPWJ9O1xudGhpcy5nZj1mdW5jdGlvbigpe3JldHVybiBCKClbdGhpcy5JZSsxNj4+PjI+Pj4wXX07dGhpcy5qZj1mdW5jdGlvbigpe2lmKHNiKHRoaXMuVGUoKSkpcmV0dXJuIEIoKVt0aGlzLlNlPj4+Mj4+PjBdO3ZhciBiPXRoaXMuZ2YoKTtyZXR1cm4gMCE9PWI/Yjp0aGlzLlNlfX12YXIgdmI9YT0+e3ZhciBiPVE7aWYoIWIpcmV0dXJuIHRiKDApLDA7dmFyIGM9bmV3IHJiKGIpO2MuVWUoYik7dmFyIGQ9Yy5UZSgpO2lmKCFkKXJldHVybiB0YigwKSxiO2Zvcih2YXIgZSBpbiBhKXt2YXIgZj1hW2VdO2lmKDA9PT1mfHxmPT09ZClicmVhaztpZih1YihmLGQsYy5JZSsxNikpcmV0dXJuIHRiKGYpLGJ9dGIoZCk7cmV0dXJuIGJ9O2Z1bmN0aW9uIHdiKGEsYixjLGQpe3JldHVybiBHP04oMiwxLGEsYixjLGQpOnhiKGEsYixjLGQpfVxuZnVuY3Rpb24geGIoYSxiLGMsZCl7YT4+Pj0wO2I+Pj49MDtjPj4+PTA7ZD4+Pj0wO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlcilyZXR1cm4gTChcIkN1cnJlbnQgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBTaGFyZWRBcnJheUJ1ZmZlciwgcHRocmVhZHMgYXJlIG5vdCBhdmFpbGFibGUhXCIpLDY7dmFyIGU9W107aWYoRyYmMD09PWUubGVuZ3RoKXJldHVybiB3YihhLGIsYyxkKTthPXt1ZjpjLE1lOmEsbWY6ZCxBZjplfTtyZXR1cm4gRz8oYS5DZj1cInNwYXduVGhyZWFkXCIscG9zdE1lc3NhZ2UoYSxlKSwwKTpaYShhKX1mdW5jdGlvbiB5YihhLGIsYyl7cmV0dXJuIEc/TigzLDEsYSxiLGMpOjB9ZnVuY3Rpb24gemIoYSxiKXtpZihHKXJldHVybiBOKDQsMSxhLGIpfVxudmFyIEFiPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPWEuY2hhckNvZGVBdChjKTsxMjc+PWQ/YisrOjIwNDc+PWQ/Yis9Mjo1NTI5Njw9ZCYmNTczNDM+PWQ/KGIrPTQsKytjKTpiKz0zfXJldHVybiBifSxCYj0oYSxiLGMsZCk9PntjPj4+PTA7aWYoISgwPGQpKXJldHVybiAwO3ZhciBlPWM7ZD1jK2QtMTtmb3IodmFyIGY9MDtmPGEubGVuZ3RoOysrZil7dmFyIGc9YS5jaGFyQ29kZUF0KGYpO2lmKDU1Mjk2PD1nJiY1NzM0Mz49Zyl7dmFyIGg9YS5jaGFyQ29kZUF0KCsrZik7Zz02NTUzNisoKGcmMTAyMyk8PDEwKXxoJjEwMjN9aWYoMTI3Pj1nKXtpZihjPj1kKWJyZWFrO2JbYysrPj4+MF09Z31lbHNle2lmKDIwNDc+PWcpe2lmKGMrMT49ZClicmVhaztiW2MrKz4+PjBdPTE5MnxnPj42fWVsc2V7aWYoNjU1MzU+PWcpe2lmKGMrMj49ZClicmVhaztiW2MrKz4+PjBdPTIyNHxnPj4xMn1lbHNle2lmKGMrMz49ZClicmVhaztiW2MrKz4+PjBdPTI0MHxnPj5cbjE4O2JbYysrPj4+MF09MTI4fGc+PjEyJjYzfWJbYysrPj4+MF09MTI4fGc+PjYmNjN9YltjKys+Pj4wXT0xMjh8ZyY2M319YltjPj4+MF09MDtyZXR1cm4gYy1lfSxDYj0oYSxiLGMpPT5CYihhLHgoKSxiLGMpO2Z1bmN0aW9uIERiKGEsYil7aWYoRylyZXR1cm4gTig1LDEsYSxiKX1mdW5jdGlvbiBFYihhLGIsYyl7aWYoRylyZXR1cm4gTig2LDEsYSxiLGMpfWZ1bmN0aW9uIEZiKGEsYixjKXtyZXR1cm4gRz9OKDcsMSxhLGIsYyk6MH1mdW5jdGlvbiBHYihhLGIpe2lmKEcpcmV0dXJuIE4oOCwxLGEsYil9ZnVuY3Rpb24gSGIoYSxiLGMpe2lmKEcpcmV0dXJuIE4oOSwxLGEsYixjKX1mdW5jdGlvbiBJYihhLGIsYyxkKXtpZihHKXJldHVybiBOKDEwLDEsYSxiLGMsZCl9ZnVuY3Rpb24gSmIoYSxiLGMsZCl7aWYoRylyZXR1cm4gTigxMSwxLGEsYixjLGQpfWZ1bmN0aW9uIEtiKGEsYixjLGQpe2lmKEcpcmV0dXJuIE4oMTIsMSxhLGIsYyxkKX1cbmZ1bmN0aW9uIExiKGEpe2lmKEcpcmV0dXJuIE4oMTMsMSxhKX1mdW5jdGlvbiBNYihhLGIpe2lmKEcpcmV0dXJuIE4oMTQsMSxhLGIpfWZ1bmN0aW9uIE5iKGEsYixjKXtpZihHKXJldHVybiBOKDE1LDEsYSxiLGMpfXZhciBPYj1hPT57aWYobnVsbD09PWEpcmV0dXJuXCJudWxsXCI7dmFyIGI9dHlwZW9mIGE7cmV0dXJuXCJvYmplY3RcIj09PWJ8fFwiYXJyYXlcIj09PWJ8fFwiZnVuY3Rpb25cIj09PWI/YS50b1N0cmluZygpOlwiXCIrYX0sUGIsUj1hPT57Zm9yKHZhciBiPVwiXCI7eCgpW2E+Pj4wXTspYis9UGJbeCgpW2ErKz4+PjBdXTtyZXR1cm4gYn0sUWI9e30sUmI9e30sU2I9e30sVGI7XG5mdW5jdGlvbiBVYihhLGIsYz17fSl7dmFyIGQ9Yi5uYW1lO2lmKCFhKXRocm93IG5ldyBUYihgdHlwZSBcIiR7ZH1cIiBtdXN0IGhhdmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIHR5cGVpZCBwb2ludGVyYCk7aWYoUmIuaGFzT3duUHJvcGVydHkoYSkpe2lmKGMucWYpcmV0dXJuO3Rocm93IG5ldyBUYihgQ2Fubm90IHJlZ2lzdGVyIHR5cGUgJyR7ZH0nIHR3aWNlYCk7fVJiW2FdPWI7ZGVsZXRlIFNiW2FdO1FiLmhhc093blByb3BlcnR5KGEpJiYoYj1RYlthXSxkZWxldGUgUWJbYV0sYi5mb3JFYWNoKGU9PmUoKSkpfWZ1bmN0aW9uIFMoYSxiLGM9e30pe2lmKCEoXCJhcmdQYWNrQWR2YW5jZVwiaW4gYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlZ2lzdGVyVHlwZSByZWdpc3RlcmVkSW5zdGFuY2UgcmVxdWlyZXMgYXJnUGFja0FkdmFuY2VcIik7VWIoYSxiLGMpfVxudmFyIFZiPShhLGIsYyk9Pntzd2l0Y2goYil7Y2FzZSAxOnJldHVybiBjP2Q9PnAoKVtkPj4+MD4+PjBdOmQ9PngoKVtkPj4+MD4+PjBdO2Nhc2UgMjpyZXR1cm4gYz9kPT5jYSgpW2Q+Pj4xPj4+MF06ZD0+ZWEoKVtkPj4+MT4+PjBdO2Nhc2UgNDpyZXR1cm4gYz9kPT5BKClbZD4+PjI+Pj4wXTpkPT5CKClbZD4+PjI+Pj4wXTtjYXNlIDg6cmV0dXJuIGM/ZD0+RmFbZD4+PjNdOmQ9PkdhW2Q+Pj4zXTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgaW50ZWdlciB3aWR0aCAoJHtifSk6ICR7YX1gKTt9fTtmdW5jdGlvbiBXYigpe3RoaXMuTGU9W3ZvaWQgMF07dGhpcy5aZT1bXX12YXIgVD1uZXcgV2I7ZnVuY3Rpb24gWGIoYSl7YT4+Pj0wO2E+PVQuSWUmJjA9PT0tLVQuZ2V0KGEpLiRlJiZULlVlKGEpfVxudmFyIFU9YT0+e2lmKCFhKXRocm93IG5ldyBUYihcIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9IFwiK2EpO3JldHVybiBULmdldChhKS52YWx1ZX0sVj1hPT57c3dpdGNoKGEpe2Nhc2Ugdm9pZCAwOnJldHVybiAxO2Nhc2UgbnVsbDpyZXR1cm4gMjtjYXNlICEwOnJldHVybiAzO2Nhc2UgITE6cmV0dXJuIDQ7ZGVmYXVsdDpyZXR1cm4gVC5UZSh7JGU6MSx2YWx1ZTphfSl9fTtmdW5jdGlvbiBZYihhKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUoQSgpW2E+Pj4yPj4+MF0pfVxudmFyIFpiPShhLGIpPT57c3dpdGNoKGIpe2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24oYyl7dmFyIGQ9dGhpcy5mcm9tV2lyZVR5cGU7cS5idWZmZXIhPXIuYnVmZmVyJiZ0KCk7cmV0dXJuIGQuY2FsbCh0aGlzLEVhW2M+Pj4yPj4+MF0pfTtjYXNlIDg6cmV0dXJuIGZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZShqYSgpW2M+Pj4zPj4+MF0pfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgZmxvYXQgd2lkdGggKCR7Yn0pOiAke2F9YCk7fX07ZnVuY3Rpb24gJGIoYSl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKEIoKVthPj4+Mj4+PjBdKX1cbnZhciBhYz1cInVuZGVmaW5lZFwiIT10eXBlb2YgVGV4dERlY29kZXI/bmV3IFRleHREZWNvZGVyKFwidXRmLTE2bGVcIik6dm9pZCAwLGJjPShhLGIpPT57dmFyIGM9YT4+MTtmb3IodmFyIGQ9YytiLzI7IShjPj1kKSYmZWEoKVtjPj4+MF07KSsrYztjPDw9MTtpZigzMjxjLWEmJmFjKXJldHVybiBhYy5kZWNvZGUoeCgpLnNsaWNlKGEsYykpO2M9XCJcIjtmb3IoZD0wOyEoZD49Yi8yKTsrK2Qpe3ZhciBlPWNhKClbYSsyKmQ+Pj4xPj4+MF07aWYoMD09ZSlicmVhaztjKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBjfSxjYz0oYSxiLGMpPT57dm9pZCAwPT09YyYmKGM9MjE0NzQ4MzY0Nyk7aWYoMj5jKXJldHVybiAwO2MtPTI7dmFyIGQ9YjtjPWM8MiphLmxlbmd0aD9jLzI6YS5sZW5ndGg7Zm9yKHZhciBlPTA7ZTxjOysrZSl7dmFyIGY9YS5jaGFyQ29kZUF0KGUpO2NhKClbYj4+PjE+Pj4wXT1mO2IrPTJ9Y2EoKVtiPj4+MT4+PjBdPTA7cmV0dXJuIGItZH0sZGM9YT0+MiphLmxlbmd0aCxcbmVjPShhLGIpPT57Zm9yKHZhciBjPTAsZD1cIlwiOyEoYz49Yi80KTspe3ZhciBlPUEoKVthKzQqYz4+PjI+Pj4wXTtpZigwPT1lKWJyZWFrOysrYzs2NTUzNjw9ZT8oZS09NjU1MzYsZCs9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxlPj4xMCw1NjMyMHxlJjEwMjMpKTpkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGUpfXJldHVybiBkfSxmYz0oYSxiLGMpPT57Yj4+Pj0wO3ZvaWQgMD09PWMmJihjPTIxNDc0ODM2NDcpO2lmKDQ+YylyZXR1cm4gMDt2YXIgZD1iO2M9ZCtjLTQ7Zm9yKHZhciBlPTA7ZTxhLmxlbmd0aDsrK2Upe3ZhciBmPWEuY2hhckNvZGVBdChlKTtpZig1NTI5Njw9ZiYmNTczNDM+PWYpe3ZhciBnPWEuY2hhckNvZGVBdCgrK2UpO2Y9NjU1MzYrKChmJjEwMjMpPDwxMCl8ZyYxMDIzfUEoKVtiPj4+Mj4+PjBdPWY7Yis9NDtpZihiKzQ+YylicmVha31BKClbYj4+PjI+Pj4wXT0wO3JldHVybiBiLWR9LGdjPWE9Pntmb3IodmFyIGI9MCxjPTA7YzxhLmxlbmd0aDsrK2Mpe3ZhciBkPVxuYS5jaGFyQ29kZUF0KGMpOzU1Mjk2PD1kJiY1NzM0Mz49ZCYmKytjO2IrPTR9cmV0dXJuIGJ9LGhjPWE9PntpZighQ2EpdHJ5e2lmKGEoKSwhTWEoKSl0cnl7Rz9vYihEYSk6ZWIoRGEpfWNhdGNoKGIpe2IgaW5zdGFuY2VvZiBYYXx8XCJ1bndpbmRcIj09Ynx8cGEoMSxiKX19Y2F0Y2goYil7YiBpbnN0YW5jZW9mIFhhfHxcInVud2luZFwiPT1ifHxwYSgxLGIpfX07ZnVuY3Rpb24gaWMoYSl7YT4+Pj0wO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBBdG9taWNzLkJmJiYoQXRvbWljcy5CZihBKCksYT4+PjIsYSkudmFsdWUudGhlbihqYiksYSs9MTI4LEF0b21pY3Muc3RvcmUoQSgpLGE+Pj4yLDEpKX1DLl9fZW1zY3JpcHRlbl90aHJlYWRfbWFpbGJveF9hd2FpdD1pYzt2YXIgamI9KCk9Pnt2YXIgYT1pYigpO2EmJihpYyhhKSxoYygoKT0+amMoKSkpfTtDLmNoZWNrTWFpbGJveD1qYjt2YXIga2M9YT0+e3ZhciBiPVcoKTthPWEoKTtPKGIpO3JldHVybiBhfTtcbmZ1bmN0aW9uIE4oYSxiKXt2YXIgYz1hcmd1bWVudHMubGVuZ3RoLTIsZD1hcmd1bWVudHM7cmV0dXJuIGtjKCgpPT57Zm9yKHZhciBlPTIqYyxmPWxjKDgqZSksZz1mPj4+MyxoPTA7aDxjO2grKyl7dmFyIGs9ZFsyK2hdO1wiYmlnaW50XCI9PXR5cGVvZiBrPyhGYVtnKzIqaF09MW4sRmFbZysyKmgrMV09ayk6KEZhW2crMipoXT0wbixqYSgpW2crMipoKzE+Pj4wXT1rKX1yZXR1cm4gbWMoYSxlLGYsYil9KX1cbnZhciBuYz1bXSxwYz0oYSxiKT0+e3ZhciBjPVJiW2FdO2lmKHZvaWQgMD09PWMpdGhyb3cgYT1vYyhhKSxjPVIoYSksWChhKSxuZXcgVGIoYitcIiBoYXMgdW5rbm93biB0eXBlIFwiK2MpO3JldHVybiBjfSxxYz17fSxyYz1hPT57dmFyIGI9cWNbYV07cmV0dXJuIHZvaWQgMD09PWI/UihhKTpifSxzYz1bXSx0Yz0oKT0+XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczpGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCksdWM9YT0+e3ZhciBiPXNjLmxlbmd0aDtzYy5wdXNoKGEpO3JldHVybiBifSx2Yz0oYSxiKT0+e2Zvcih2YXIgYz1BcnJheShhKSxkPTA7ZDxhOysrZCljW2RdPXBjKEIoKVtiKzQqZD4+PjI+Pj4wXSxcInBhcmFtZXRlciBcIitkKTtyZXR1cm4gY30sd2M9YT0+e2lmKHZvaWQgMD09PWEpcmV0dXJuXCJfdW5rbm93blwiO2E9YS5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csXCIkXCIpO3ZhciBiPWEuY2hhckNvZGVBdCgwKTtyZXR1cm4gNDg8PWImJjU3Pj1iP2BfJHthfWA6XG5hfSx4Yz17fTtmdW5jdGlvbiB5YyhhLGIpe2E9d2MoYSk7cmV0dXJue1thXTpmdW5jdGlvbigpe3JldHVybiBiLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19W2FdfWZ1bmN0aW9uIHpjKGEpe3ZhciBiPUZ1bmN0aW9uO2lmKCEoYiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSl0aHJvdyBuZXcgVHlwZUVycm9yKGBuZXdfIGNhbGxlZCB3aXRoIGNvbnN0cnVjdG9yIHR5cGUgJHt0eXBlb2YgYn0gd2hpY2ggaXMgbm90IGEgZnVuY3Rpb25gKTt2YXIgYz15YyhiLm5hbWV8fFwidW5rbm93bkZ1bmN0aW9uTmFtZVwiLGZ1bmN0aW9uKCl7fSk7Yy5wcm90b3R5cGU9Yi5wcm90b3R5cGU7Yz1uZXcgYzthPWIuYXBwbHkoYyxhKTtyZXR1cm4gYSBpbnN0YW5jZW9mIE9iamVjdD9hOmN9XG52YXIgQWM9YT0+e2Zvcih2YXIgYj1cIlwiLGM9MDtjPGE7KytjKWIrPSgwIT09Yz9cIiwgXCI6XCJcIikrXCJhcmdcIitjO3ZhciBkPVwicmV0dXJuIGZ1bmN0aW9uIGVtdmFsX2FsbG9jYXRvcl9cIithK1wiKGNvbnN0cnVjdG9yLCBhcmdUeXBlcywgYXJncykge1xcbiAgdmFyIEhFQVBVMzIgPSBnZXRNZW1vcnkoKTtcXG5cIjtmb3IoYz0wO2M8YTsrK2MpZCs9XCJ2YXIgYXJnVHlwZVwiK2MrXCIgPSByZXF1aXJlUmVnaXN0ZXJlZFR5cGUoSEVBUFUzMlsoKGFyZ1R5cGVzKT4+PjIpXSwgJ3BhcmFtZXRlciBcIitjK1wiJyk7XFxudmFyIGFyZ1wiK2MrXCIgPSBhcmdUeXBlXCIrYytcIi5yZWFkVmFsdWVGcm9tUG9pbnRlcihhcmdzKTtcXG5hcmdzICs9IGFyZ1R5cGVcIitjK1wiWydhcmdQYWNrQWR2YW5jZSddO1xcbmFyZ1R5cGVzICs9IDQ7XFxuXCI7cmV0dXJuKG5ldyBGdW5jdGlvbihcInJlcXVpcmVSZWdpc3RlcmVkVHlwZVwiLFwiTW9kdWxlXCIsXCJ2YWx1ZVRvSGFuZGxlXCIsXCJnZXRNZW1vcnlcIixkKyhcInZhciBvYmogPSBuZXcgY29uc3RydWN0b3IoXCIrXG5iK1wiKTtcXG5yZXR1cm4gdmFsdWVUb0hhbmRsZShvYmopO1xcbn1cXG5cIikpKShwYyxDLFYsKCk9PkIoKSl9LEJjPXt9LENjPWE9PjA9PT1hJTQmJigwIT09YSUxMDB8fDA9PT1hJTQwMCksRGM9WzAsMzEsNjAsOTEsMTIxLDE1MiwxODIsMjEzLDI0NCwyNzQsMzA1LDMzNV0sRWM9WzAsMzEsNTksOTAsMTIwLDE1MSwxODEsMjEyLDI0MywyNzMsMzA0LDMzNF07ZnVuY3Rpb24gRmMoYSxiLGMsZCxlLGYsZyl7cmV0dXJuIEc/TigxNiwxLGEsYixjLGQsZSxmLGcpOi01Mn1mdW5jdGlvbiBHYyhhLGIsYyxkLGUsZil7aWYoRylyZXR1cm4gTigxNywxLGEsYixjLGQsZSxmKX1cbnZhciBJYz1hPT57dmFyIGI9QWIoYSkrMSxjPUhjKGIpO2MmJkNiKGEsYyxiKTtyZXR1cm4gY30sSmM9e30sTGM9KCk9PntpZighS2Mpe3ZhciBhPXtVU0VSOlwid2ViX3VzZXJcIixMT0dOQU1FOlwid2ViX3VzZXJcIixQQVRIOlwiL1wiLFBXRDpcIi9cIixIT01FOlwiL2hvbWUvd2ViX3VzZXJcIixMQU5HOihcIm9iamVjdFwiPT10eXBlb2YgbmF2aWdhdG9yJiZuYXZpZ2F0b3IubGFuZ3VhZ2VzJiZuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdfHxcIkNcIikucmVwbGFjZShcIi1cIixcIl9cIikrXCIuVVRGLThcIixfOm9hfHxcIi4vdGhpcy5wcm9ncmFtXCJ9LGI7Zm9yKGIgaW4gSmMpdm9pZCAwPT09SmNbYl0/ZGVsZXRlIGFbYl06YVtiXT1KY1tiXTt2YXIgYz1bXTtmb3IoYiBpbiBhKWMucHVzaChgJHtifT0ke2FbYl19YCk7S2M9Y31yZXR1cm4gS2N9LEtjO1xuZnVuY3Rpb24gTWMoYSxiKXtpZihHKXJldHVybiBOKDE4LDEsYSxiKTthPj4+PTA7Yj4+Pj0wO3ZhciBjPTA7TGMoKS5mb3JFYWNoKChkLGUpPT57dmFyIGY9YitjO2U9QigpW2ErNCplPj4+Mj4+PjBdPWY7Zm9yKGY9MDtmPGQubGVuZ3RoOysrZilwKClbZSsrPj4+MD4+PjBdPWQuY2hhckNvZGVBdChmKTtwKClbZT4+PjA+Pj4wXT0wO2MrPWQubGVuZ3RoKzF9KTtyZXR1cm4gMH1mdW5jdGlvbiBOYyhhLGIpe2lmKEcpcmV0dXJuIE4oMTksMSxhLGIpO2E+Pj49MDtiPj4+PTA7dmFyIGM9TGMoKTtCKClbYT4+PjI+Pj4wXT1jLmxlbmd0aDt2YXIgZD0wO2MuZm9yRWFjaChlPT5kKz1lLmxlbmd0aCsxKTtCKClbYj4+PjI+Pj4wXT1kO3JldHVybiAwfWZ1bmN0aW9uIE9jKGEpe3JldHVybiBHP04oMjAsMSxhKTo1Mn1mdW5jdGlvbiBQYyhhLGIsYyxkKXtyZXR1cm4gRz9OKDIxLDEsYSxiLGMsZCk6NTJ9XG5mdW5jdGlvbiBRYyhhLGIsYyxkKXtyZXR1cm4gRz9OKDIyLDEsYSxiLGMsZCk6NzB9dmFyIFJjPVtudWxsLFtdLFtdXTtmdW5jdGlvbiBTYyhhLGIsYyxkKXtpZihHKXJldHVybiBOKDIzLDEsYSxiLGMsZCk7Yj4+Pj0wO2M+Pj49MDtkPj4+PTA7Zm9yKHZhciBlPTAsZj0wO2Y8YztmKyspe3ZhciBnPUIoKVtiPj4+Mj4+PjBdLGg9QigpW2IrND4+PjI+Pj4wXTtiKz04O2Zvcih2YXIgaz0wO2s8aDtrKyspe3ZhciBsPXgoKVtnK2s+Pj4wXSxuPVJjW2FdOzA9PT1sfHwxMD09PWw/KCgxPT09YT96YTpMKShhYihuLDApKSxuLmxlbmd0aD0wKTpuLnB1c2gobCl9ZSs9aH1CKClbZD4+PjI+Pj4wXT1lO3JldHVybiAwfXZhciBUYz1bMzEsMjksMzEsMzAsMzEsMzAsMzEsMzEsMzAsMzEsMzAsMzFdLFVjPVszMSwyOCwzMSwzMCwzMSwzMCwzMSwzMSwzMCwzMSwzMCwzMV07ZnVuY3Rpb24gVmMoYSl7dmFyIGI9QXJyYXkoQWIoYSkrMSk7QmIoYSxiLDAsYi5sZW5ndGgpO3JldHVybiBifVxudmFyIFdjPShhLGIpPT57cCgpLnNldChhLGI+Pj4wKX07XG5mdW5jdGlvbiBYYyhhLGIsYyxkKXtmdW5jdGlvbiBlKG0sdyx5KXtmb3IobT1cIm51bWJlclwiPT10eXBlb2YgbT9tLnRvU3RyaW5nKCk6bXx8XCJcIjttLmxlbmd0aDx3OyltPXlbMF0rbTtyZXR1cm4gbX1mdW5jdGlvbiBmKG0sdyl7cmV0dXJuIGUobSx3LFwiMFwiKX1mdW5jdGlvbiBnKG0sdyl7ZnVuY3Rpb24geShEKXtyZXR1cm4gMD5EPy0xOjA8RD8xOjB9dmFyIHo7MD09PSh6PXkobS5nZXRGdWxsWWVhcigpLXcuZ2V0RnVsbFllYXIoKSkpJiYwPT09KHo9eShtLmdldE1vbnRoKCktdy5nZXRNb250aCgpKSkmJih6PXkobS5nZXREYXRlKCktdy5nZXREYXRlKCkpKTtyZXR1cm4gen1mdW5jdGlvbiBoKG0pe3N3aXRjaChtLmdldERheSgpKXtjYXNlIDA6cmV0dXJuIG5ldyBEYXRlKG0uZ2V0RnVsbFllYXIoKS0xLDExLDI5KTtjYXNlIDE6cmV0dXJuIG07Y2FzZSAyOnJldHVybiBuZXcgRGF0ZShtLmdldEZ1bGxZZWFyKCksMCwzKTtjYXNlIDM6cmV0dXJuIG5ldyBEYXRlKG0uZ2V0RnVsbFllYXIoKSxcbjAsMik7Y2FzZSA0OnJldHVybiBuZXcgRGF0ZShtLmdldEZ1bGxZZWFyKCksMCwxKTtjYXNlIDU6cmV0dXJuIG5ldyBEYXRlKG0uZ2V0RnVsbFllYXIoKS0xLDExLDMxKTtjYXNlIDY6cmV0dXJuIG5ldyBEYXRlKG0uZ2V0RnVsbFllYXIoKS0xLDExLDMwKX19ZnVuY3Rpb24gayhtKXt2YXIgdz1tLk9lO2ZvcihtPW5ldyBEYXRlKChuZXcgRGF0ZShtLlBlKzE5MDAsMCwxKSkuZ2V0VGltZSgpKTswPHc7KXt2YXIgeT1tLmdldE1vbnRoKCksej0oQ2MobS5nZXRGdWxsWWVhcigpKT9UYzpVYylbeV07aWYodz56LW0uZ2V0RGF0ZSgpKXctPXotbS5nZXREYXRlKCkrMSxtLnNldERhdGUoMSksMTE+eT9tLnNldE1vbnRoKHkrMSk6KG0uc2V0TW9udGgoMCksbS5zZXRGdWxsWWVhcihtLmdldEZ1bGxZZWFyKCkrMSkpO2Vsc2V7bS5zZXREYXRlKG0uZ2V0RGF0ZSgpK3cpO2JyZWFrfX15PW5ldyBEYXRlKG0uZ2V0RnVsbFllYXIoKSsxLDAsNCk7dz1oKG5ldyBEYXRlKG0uZ2V0RnVsbFllYXIoKSxcbjAsNCkpO3k9aCh5KTtyZXR1cm4gMD49Zyh3LG0pPzA+PWcoeSxtKT9tLmdldEZ1bGxZZWFyKCkrMTptLmdldEZ1bGxZZWFyKCk6bS5nZXRGdWxsWWVhcigpLTF9YT4+Pj0wO2I+Pj49MDtjPj4+PTA7ZD4+Pj0wO3ZhciBsPUIoKVtkKzQwPj4+Mj4+PjBdO2Q9e3lmOkEoKVtkPj4+Mj4+PjBdLHhmOkEoKVtkKzQ+Pj4yPj4+MF0sVmU6QSgpW2QrOD4+PjI+Pj4wXSxZZTpBKClbZCsxMj4+PjI+Pj4wXSxXZTpBKClbZCsxNj4+PjI+Pj4wXSxQZTpBKClbZCsyMD4+PjI+Pj4wXSxLZTpBKClbZCsyND4+PjI+Pj4wXSxPZTpBKClbZCsyOD4+PjI+Pj4wXSxFZjpBKClbZCszMj4+PjI+Pj4wXSx3ZjpBKClbZCszNj4+PjI+Pj4wXSx6ZjpsP2JiKGwpOlwiXCJ9O2M9YmIoYyk7bD17XCIlY1wiOlwiJWEgJWIgJWQgJUg6JU06JVMgJVlcIixcIiVEXCI6XCIlbS8lZC8leVwiLFwiJUZcIjpcIiVZLSVtLSVkXCIsXCIlaFwiOlwiJWJcIixcIiVyXCI6XCIlSTolTTolUyAlcFwiLFwiJVJcIjpcIiVIOiVNXCIsXCIlVFwiOlwiJUg6JU06JVNcIixcIiV4XCI6XCIlbS8lZC8leVwiLFxuXCIlWFwiOlwiJUg6JU06JVNcIixcIiVFY1wiOlwiJWNcIixcIiVFQ1wiOlwiJUNcIixcIiVFeFwiOlwiJW0vJWQvJXlcIixcIiVFWFwiOlwiJUg6JU06JVNcIixcIiVFeVwiOlwiJXlcIixcIiVFWVwiOlwiJVlcIixcIiVPZFwiOlwiJWRcIixcIiVPZVwiOlwiJWVcIixcIiVPSFwiOlwiJUhcIixcIiVPSVwiOlwiJUlcIixcIiVPbVwiOlwiJW1cIixcIiVPTVwiOlwiJU1cIixcIiVPU1wiOlwiJVNcIixcIiVPdVwiOlwiJXVcIixcIiVPVVwiOlwiJVVcIixcIiVPVlwiOlwiJVZcIixcIiVPd1wiOlwiJXdcIixcIiVPV1wiOlwiJVdcIixcIiVPeVwiOlwiJXlcIn07Zm9yKHZhciBuIGluIGwpYz1jLnJlcGxhY2UobmV3IFJlZ0V4cChuLFwiZ1wiKSxsW25dKTt2YXIgdT1cIlN1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5XCIuc3BsaXQoXCIgXCIpLHY9XCJKYW51YXJ5IEZlYnJ1YXJ5IE1hcmNoIEFwcmlsIE1heSBKdW5lIEp1bHkgQXVndXN0IFNlcHRlbWJlciBPY3RvYmVyIE5vdmVtYmVyIERlY2VtYmVyXCIuc3BsaXQoXCIgXCIpO2w9e1wiJWFcIjptPT51W20uS2VdLnN1YnN0cmluZygwLDMpLFwiJUFcIjptPT5cbnVbbS5LZV0sXCIlYlwiOm09PnZbbS5XZV0uc3Vic3RyaW5nKDAsMyksXCIlQlwiOm09PnZbbS5XZV0sXCIlQ1wiOm09PmYoKG0uUGUrMTkwMCkvMTAwfDAsMiksXCIlZFwiOm09PmYobS5ZZSwyKSxcIiVlXCI6bT0+ZShtLlllLDIsXCIgXCIpLFwiJWdcIjptPT5rKG0pLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFwiJUdcIjptPT5rKG0pLFwiJUhcIjptPT5mKG0uVmUsMiksXCIlSVwiOm09PnttPW0uVmU7MD09bT9tPTEyOjEyPG0mJihtLT0xMik7cmV0dXJuIGYobSwyKX0sXCIlalwiOm09Pntmb3IodmFyIHc9MCx5PTA7eTw9bS5XZS0xO3crPShDYyhtLlBlKzE5MDApP1RjOlVjKVt5KytdKTtyZXR1cm4gZihtLlllK3csMyl9LFwiJW1cIjptPT5mKG0uV2UrMSwyKSxcIiVNXCI6bT0+ZihtLnhmLDIpLFwiJW5cIjooKT0+XCJcXG5cIixcIiVwXCI6bT0+MDw9bS5WZSYmMTI+bS5WZT9cIkFNXCI6XCJQTVwiLFwiJVNcIjptPT5mKG0ueWYsMiksXCIldFwiOigpPT5cIlxcdFwiLFwiJXVcIjptPT5tLktlfHw3LFwiJVVcIjptPT5mKE1hdGguZmxvb3IoKG0uT2UrNy1tLktlKS9cbjcpLDIpLFwiJVZcIjptPT57dmFyIHc9TWF0aC5mbG9vcigobS5PZSs3LShtLktlKzYpJTcpLzcpOzI+PShtLktlKzM3MS1tLk9lLTIpJTcmJncrKztpZih3KTUzPT13JiYoeT0obS5LZSszNzEtbS5PZSklNyw0PT15fHwzPT15JiZDYyhtLlBlKXx8KHc9MSkpO2Vsc2V7dz01Mjt2YXIgeT0obS5LZSs3LW0uT2UtMSklNzsoND09eXx8NT09eSYmQ2MobS5QZSU0MDAtMSkpJiZ3Kyt9cmV0dXJuIGYodywyKX0sXCIld1wiOm09Pm0uS2UsXCIlV1wiOm09PmYoTWF0aC5mbG9vcigobS5PZSs3LShtLktlKzYpJTcpLzcpLDIpLFwiJXlcIjptPT4obS5QZSsxOTAwKS50b1N0cmluZygpLnN1YnN0cmluZygyKSxcIiVZXCI6bT0+bS5QZSsxOTAwLFwiJXpcIjptPT57bT1tLndmO3ZhciB3PTA8PW07bT1NYXRoLmFicyhtKS82MDtyZXR1cm4odz9cIitcIjpcIi1cIikrU3RyaW5nKFwiMDAwMFwiKyhtLzYwKjEwMCttJTYwKSkuc2xpY2UoLTQpfSxcIiVaXCI6bT0+bS56ZixcIiUlXCI6KCk9PlwiJVwifTtjPWMucmVwbGFjZSgvJSUvZyxcIlxceDAwXFx4MDBcIik7XG5mb3IobiBpbiBsKWMuaW5jbHVkZXMobikmJihjPWMucmVwbGFjZShuZXcgUmVnRXhwKG4sXCJnXCIpLGxbbl0oZCkpKTtjPWMucmVwbGFjZSgvXFwwXFwwL2csXCIlXCIpO249VmMoYyk7aWYobi5sZW5ndGg+YilyZXR1cm4gMDtXYyhuLGEpO3JldHVybiBuLmxlbmd0aC0xfU0uWGUoKTtmb3IodmFyIFljPUFycmF5KDI1NiksWmM9MDsyNTY+WmM7KytaYylZY1taY109U3RyaW5nLmZyb21DaGFyQ29kZShaYyk7UGI9WWM7VGI9Qy5CaW5kaW5nRXJyb3I9Y2xhc3MgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihhKXtzdXBlcihhKTt0aGlzLm5hbWU9XCJCaW5kaW5nRXJyb3JcIn19O0MuSW50ZXJuYWxFcnJvcj1jbGFzcyBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKGEpe3N1cGVyKGEpO3RoaXMubmFtZT1cIkludGVybmFsRXJyb3JcIn19O1xuT2JqZWN0LmFzc2lnbihXYi5wcm90b3R5cGUse2dldChhKXtyZXR1cm4gdGhpcy5MZVthXX0saGFzKGEpe3JldHVybiB2b2lkIDAhPT10aGlzLkxlW2FdfSxUZShhKXt2YXIgYj10aGlzLlplLnBvcCgpfHx0aGlzLkxlLmxlbmd0aDt0aGlzLkxlW2JdPWE7cmV0dXJuIGJ9LFVlKGEpe3RoaXMuTGVbYV09dm9pZCAwO3RoaXMuWmUucHVzaChhKX19KTtULkxlLnB1c2goe3ZhbHVlOnZvaWQgMH0se3ZhbHVlOm51bGx9LHt2YWx1ZTohMH0se3ZhbHVlOiExfSk7VC5JZT1ULkxlLmxlbmd0aDtDLmNvdW50X2VtdmFsX2hhbmRsZXM9KCk9Pntmb3IodmFyIGE9MCxiPVQuSWU7YjxULkxlLmxlbmd0aDsrK2Ipdm9pZCAwIT09VC5MZVtiXSYmKythO3JldHVybiBhfTtcbnZhciAkYz1bY2IsZGIsd2IseWIsemIsRGIsRWIsRmIsR2IsSGIsSWIsSmIsS2IsTGIsTWIsTmIsRmMsR2MsTWMsTmMsT2MsUGMsUWMsU2NdLHJnPXt1OmZ1bmN0aW9uKGEpe2E9bmV3IHJiKGE+Pj4wKTthLmhmKCl8fChhLmNmKCEwKSxxYi0tKTthLmRmKCExKTtwYi5wdXNoKGEpO2FkKGEuU2UpO3JldHVybiBhLmpmKCl9LE06KCk9PntZKDAsMCk7dmFyIGE9cGIucG9wKCk7YmQoYS5TZSk7UT0wfSxiOmZ1bmN0aW9uKCl7cmV0dXJuIHZiKFtdKX0sbjpmdW5jdGlvbihhKXtyZXR1cm4gdmIoW2E+Pj4wXSl9LHk6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdmIoW2E+Pj4wLGI+Pj4wXSl9LHE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB2YihbYT4+PjAsYj4+PjAsYz4+PjBdKX0semI6KCk9Pnt2YXIgYT1wYi5wb3AoKTthfHxBYShcIm5vIGV4Y2VwdGlvbiB0byB0aHJvd1wiKTt2YXIgYj1hLlNlO2EucGYoKXx8KHBiLnB1c2goYSksYS5kZighMCksYS5jZighMSkscWIrKyk7UT1iO3Rocm93IFE7XG59LHQ6ZnVuY3Rpb24oYSxiLGMpe2E+Pj49MDsobmV3IHJiKGEpKS5YZShiPj4+MCxjPj4+MCk7UT1hO3FiKys7dGhyb3cgUTt9LFNhOigpPT5xYixXYzpmdW5jdGlvbihhKXtjZChhPj4+MCwhcmEsMSwhcWEsMTMxMDcyLCExKTtNLmVmKCl9LFViOmZ1bmN0aW9uKGEpe2E+Pj49MDtHP3Bvc3RNZXNzYWdlKHtjbWQ6XCJjbGVhbnVwVGhyZWFkXCIsdGhyZWFkOmF9KTooKGE9TS5KZVthXSl8fEFhKCksTS5hZihhKSl9LE1jOnhiLGk6ZnVuY3Rpb24oYSl7UXx8KFE9YT4+PjApO3Rocm93IFE7fSxBYjp5YixhZDp6YixIYzpEYixKYzpFYixBYzpGYixfYzpHYixUYzpIYixaYzpJYixXYjpKYixJYzpLYixGYzpMYiwkYzpNYixHYzpOYixaYjpmdW5jdGlvbihhLGIsYyxkLGUpe2E+Pj49MDtiPj4+PTA7Yz4+Pj0wO2I9UihiKTt2YXIgZj0tMSE9Yi5pbmRleE9mKFwidVwiKTtmJiYoZT0oMW48PDY0biktMW4pO1MoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpnPT5nLHRvV2lyZVR5cGU6ZnVuY3Rpb24oZyxcbmgpe2lmKFwiYmlnaW50XCIhPXR5cGVvZiBoJiZcIm51bWJlclwiIT10eXBlb2YgaCl0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW5ub3QgY29udmVydCBcIiR7T2IoaCl9XCIgdG8gJHt0aGlzLm5hbWV9YCk7aWYoaDxkfHxoPmUpdGhyb3cgbmV3IFR5cGVFcnJvcihgUGFzc2luZyBhIG51bWJlciBcIiR7T2IoaCl9XCIgZnJvbSBKUyBzaWRlIHRvIEMvQysrIHNpZGUgdG8gYW4gYXJndW1lbnQgb2YgdHlwZSBcIiR7Yn1cIiwgd2hpY2ggaXMgb3V0c2lkZSB0aGUgdmFsaWQgcmFuZ2UgWyR7ZH0sICR7ZX1dIWApO3JldHVybiBofSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlZiKGIsYywhZiksUmU6bnVsbH0pfSxoZDpmdW5jdGlvbihhLGIsYyxkKXthPj4+PTA7Yj1SKGI+Pj4wKTtTKGEse25hbWU6Yixmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsZil7cmV0dXJuIGY/YzpkfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZSh4KClbZT4+PlxuMF0pfSxSZTpudWxsfSl9LGVkOmZ1bmN0aW9uKGEsYil7YT4+Pj0wO2I9UihiPj4+MCk7UyhhLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmM9Pnt2YXIgZD1VKGMpO1hiKGMpO3JldHVybiBkfSx0b1dpcmVUeXBlOihjLGQpPT5WKGQpLGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6WWIsUmU6bnVsbH0pfSxZYjpmdW5jdGlvbihhLGIsYyl7YT4+Pj0wO2M+Pj49MDtiPVIoYj4+PjApO1MoYSx7bmFtZTpiLGZyb21XaXJlVHlwZTpkPT5kLHRvV2lyZVR5cGU6KGQsZSk9PmUsYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpaYihiLGMpLFJlOm51bGx9KX0sd2E6ZnVuY3Rpb24oYSxiLGMsZCxlKXthPj4+PTA7Yz4+Pj0wO2I9UihiPj4+MCk7LTE9PT1lJiYoZT00Mjk0OTY3Mjk1KTtlPWg9Pmg7aWYoMD09PWQpe3ZhciBmPTMyLTgqYztlPWg9Pmg8PGY+Pj5mfXZhciBnPWIuaW5jbHVkZXMoXCJ1bnNpZ25lZFwiKT9mdW5jdGlvbihoLGspe3JldHVybiBrPj4+XG4wfTpmdW5jdGlvbihoLGspe3JldHVybiBrfTtTKGEse25hbWU6Yixmcm9tV2lyZVR5cGU6ZSx0b1dpcmVUeXBlOmcsYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpWYihiLGMsMCE9PWQpLFJlOm51bGx9KX0sXzpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChmKXt2YXIgZz1CKClbZj4+PjI+Pj4wXTtmPUIoKVtmKzQ+Pj4yPj4+MF07cmV0dXJuIG5ldyBlKHAoKS5idWZmZXIsZixnKX1hPj4+PTA7dmFyIGU9W0ludDhBcnJheSxVaW50OEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5LEJpZ0ludDY0QXJyYXksQmlnVWludDY0QXJyYXldW2JdO2M9UihjPj4+MCk7UyhhLHtuYW1lOmMsZnJvbVdpcmVUeXBlOmQsYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpkfSx7cWY6ITB9KX0sX2I6ZnVuY3Rpb24oYSxiKXthPj4+PTA7Yj1SKGI+Pj4wKTt2YXIgYz1cblwic3RkOjpzdHJpbmdcIj09PWI7UyhhLHtuYW1lOmIsZnJvbVdpcmVUeXBlOmZ1bmN0aW9uKGQpe3ZhciBlPUIoKVtkPj4+Mj4+PjBdLGY9ZCs0O2lmKGMpZm9yKHZhciBnPWYsaD0wO2g8PWU7KytoKXt2YXIgaz1mK2g7aWYoaD09ZXx8MD09eCgpW2s+Pj4wXSl7Zz1iYihnLGstZyk7aWYodm9pZCAwPT09bCl2YXIgbD1nO2Vsc2UgbCs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxsKz1nO2c9aysxfX1lbHNle2w9QXJyYXkoZSk7Zm9yKGg9MDtoPGU7KytoKWxbaF09U3RyaW5nLmZyb21DaGFyQ29kZSh4KClbZitoPj4+MF0pO2w9bC5qb2luKFwiXCIpfVgoZCk7cmV0dXJuIGx9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZCxlKXtlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXImJihlPW5ldyBVaW50OEFycmF5KGUpKTt2YXIgZj1cInN0cmluZ1wiPT10eXBlb2YgZTtpZighKGZ8fGUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHxlIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXl8fGUgaW5zdGFuY2VvZiBJbnQ4QXJyYXkpKXRocm93IG5ldyBUYihcIkNhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gc3RkOjpzdHJpbmdcIik7XG52YXIgZz1jJiZmP0FiKGUpOmUubGVuZ3RoO3ZhciBoPUhjKDQrZysxKSxrPWgrNDtCKClbaD4+PjI+Pj4wXT1nO2lmKGMmJmYpQ2IoZSxrLGcrMSk7ZWxzZSBpZihmKWZvcihmPTA7ZjxnOysrZil7dmFyIGw9ZS5jaGFyQ29kZUF0KGYpO2lmKDI1NTxsKXRocm93IFgoayksbmV3IFRiKFwiU3RyaW5nIGhhcyBVVEYtMTYgY29kZSB1bml0cyB0aGF0IGRvIG5vdCBmaXQgaW4gOCBiaXRzXCIpO3goKVtrK2Y+Pj4wXT1sfWVsc2UgZm9yKGY9MDtmPGc7KytmKXgoKVtrK2Y+Pj4wXT1lW2ZdO251bGwhPT1kJiZkLnB1c2goWCxoKTtyZXR1cm4gaH0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjokYixSZShkKXtYKGQpfX0pfSxDYjpmdW5jdGlvbihhLGIsYyl7YT4+Pj0wO2I+Pj49MDtjPj4+PTA7Yz1SKGMpO2lmKDI9PT1iKXt2YXIgZD1iYzt2YXIgZT1jYzt2YXIgZj1kYzt2YXIgZz0oKT0+ZWEoKTt2YXIgaD0xfWVsc2UgND09PWImJihkPWVjLGU9ZmMsZj1nYyxnPSgpPT5cbkIoKSxoPTIpO1MoYSx7bmFtZTpjLGZyb21XaXJlVHlwZTprPT57Zm9yKHZhciBsPUIoKVtrPj4+Mj4+PjBdLG49ZygpLHUsdj1rKzQsbT0wO208PWw7KyttKXt2YXIgdz1rKzQrbSpiO2lmKG09PWx8fDA9PW5bdz4+PmhdKXY9ZCh2LHctdiksdm9pZCAwPT09dT91PXY6KHUrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCksdSs9diksdj13K2J9WChrKTtyZXR1cm4gdX0sdG9XaXJlVHlwZTooayxsKT0+e2lmKFwic3RyaW5nXCIhPXR5cGVvZiBsKXRocm93IG5ldyBUYihgQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBDKysgc3RyaW5nIHR5cGUgJHtjfWApO3ZhciBuPWYobCksdT1IYyg0K24rYik7QigpW3U+Pj4yXT1uPj5oO2UobCx1KzQsbitiKTtudWxsIT09ayYmay5wdXNoKFgsdSk7cmV0dXJuIHV9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6WWIsUmUoayl7WChrKX19KX0sa2Q6ZnVuY3Rpb24oYSxiKXthPj4+PTA7Yj1SKGI+Pj4wKTtTKGEse3JmOiEwLG5hbWU6YixcbmFyZ1BhY2tBZHZhbmNlOjAsZnJvbVdpcmVUeXBlOigpPT57fSx0b1dpcmVUeXBlOigpPT57fX0pfSxkZDooKT0+ITAsRGM6ZnVuY3Rpb24oYSxiKXthPj4+PTA7YT09Yj4+PjA/c2V0VGltZW91dCgoKT0+amIoKSk6Rz9wb3N0TWVzc2FnZSh7dGFyZ2V0VGhyZWFkOmEsY21kOlwiY2hlY2tNYWlsYm94XCJ9KTooYT1NLkplW2FdKSYmYS5wb3N0TWVzc2FnZSh7Y21kOlwiY2hlY2tNYWlsYm94XCJ9KX0sTmM6ZnVuY3Rpb24oYSxiLGMsZCl7Yj4+Pj0wO2MvPTI7bmMubGVuZ3RoPWM7ZD1kPj4+MD4+PjM7Zm9yKHZhciBlPTA7ZTxjO2UrKyluY1tlXT1GYVtkKzIqZV0/RmFbZCsyKmUrMV06amEoKVtkKzIqZSsxPj4+MF07YT0kY1thXTtNLm5mPWI7Yj1hLmFwcGx5KG51bGwsbmMpO00ubmY9MDtyZXR1cm4gYn0sVmM6aWMsY2Q6ZnVuY3Rpb24oYSl7RiYmTS5KZVthPj4+MF0ucmVmKCl9LHhkOmZ1bmN0aW9uKGEsYixjKXtiPj4+PTA7Yz4+Pj0wO2E9VShhPj4+MCk7Yj1wYyhiLFwiZW12YWw6OmFzXCIpO1xudmFyIGQ9W10sZT1WKGQpO0IoKVtjPj4+Mj4+PjBdPWU7cmV0dXJuIGIudG9XaXJlVHlwZShkLGEpfSxsYTpmdW5jdGlvbihhLGIsYyxkLGUpe2M+Pj49MDtkPj4+PTA7ZT4+Pj0wO2E9c2NbYT4+PjBdO2I9VShiPj4+MCk7Yz1yYyhjKTt2YXIgZj1bXTtCKClbZD4+PjI+Pj4wXT1WKGYpO3JldHVybiBhKGIsYyxmLGUpfSxGZDpmdW5jdGlvbihhLGIsYyxkKXtjPj4+PTA7ZD4+Pj0wO2E9c2NbYT4+PjBdO2I9VShiPj4+MCk7Yz1yYyhjKTthKGIsYyxudWxsLGQpfSx6YzpYYix5ZDpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVUoYT4+PjApO2I9VShiKTtyZXR1cm4gYT09Yn0sSmQ6ZnVuY3Rpb24oYSl7YT4+Pj0wO2lmKDA9PT1hKXJldHVybiBWKHRjKCkpO2E9cmMoYSk7cmV0dXJuIFYodGMoKVthXSl9LG1hOmZ1bmN0aW9uKGEsYil7dmFyIGM9dmMoYSxiPj4+MCksZD1jWzBdO2I9ZC5uYW1lK1wiXyRcIitjLnNsaWNlKDEpLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gbi5uYW1lfSkuam9pbihcIl9cIikrXG5cIiRcIjt2YXIgZT14Y1tiXTtpZih2b2lkIDAhPT1lKXJldHVybiBlO2U9W1wicmV0VHlwZVwiXTtmb3IodmFyIGY9W2RdLGc9XCJcIixoPTA7aDxhLTE7KytoKWcrPSgwIT09aD9cIiwgXCI6XCJcIikrXCJhcmdcIitoLGUucHVzaChcImFyZ1R5cGVcIitoKSxmLnB1c2goY1sxK2hdKTt2YXIgaz1cInJldHVybiBmdW5jdGlvbiBcIit3YyhcIm1ldGhvZENhbGxlcl9cIitiKStcIihoYW5kbGUsIG5hbWUsIGRlc3RydWN0b3JzLCBhcmdzKSB7XFxuXCIsbD0wO2ZvcihoPTA7aDxhLTE7KytoKWsrPVwiICAgIHZhciBhcmdcIitoK1wiID0gYXJnVHlwZVwiK2grXCIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJnc1wiKyhsP1wiK1wiK2w6XCJcIikrXCIpO1xcblwiLGwrPWNbaCsxXS5hcmdQYWNrQWR2YW5jZTtrKz1cIiAgICB2YXIgcnYgPSBoYW5kbGVbbmFtZV0oXCIrZytcIik7XFxuXCI7Zm9yKGg9MDtoPGEtMTsrK2gpY1toKzFdLmRlbGV0ZU9iamVjdCYmKGsrPVwiICAgIGFyZ1R5cGVcIitoK1wiLmRlbGV0ZU9iamVjdChhcmdcIitoK1wiKTtcXG5cIik7ZC5yZnx8XG4oays9XCIgICAgcmV0dXJuIHJldFR5cGUudG9XaXJlVHlwZShkZXN0cnVjdG9ycywgcnYpO1xcblwiKTtlLnB1c2goaytcIn07XFxuXCIpO2E9emMoZSkuYXBwbHkobnVsbCxmKTtlPXVjKGEpO3JldHVybiB4Y1tiXT1lfSxIZDpmdW5jdGlvbihhLGIpe2I+Pj49MDthPVUoYT4+PjApO2I9VShiKTtyZXR1cm4gVihhW2JdKX0sUTpmdW5jdGlvbihhKXthPj4+PTA7NDxhJiYoVC5nZXQoYSkuJGUrPTEpfSxCZDpmdW5jdGlvbihhLGIsYyxkKXtjPj4+PTA7ZD4+Pj0wO2E9VShhPj4+MCk7dmFyIGU9QmNbYl07ZXx8KGU9QWMoYiksQmNbYl09ZSk7cmV0dXJuIGUoYSxjLGQpfSxyZDpmdW5jdGlvbigpe3JldHVybiBWKFtdKX0sdGQ6ZnVuY3Rpb24oYSl7YT1VKGE+Pj4wKTtmb3IodmFyIGI9QXJyYXkoYS5sZW5ndGgpLGM9MDtjPGEubGVuZ3RoO2MrKyliW2NdPWFbY107cmV0dXJuIFYoYil9LFg6ZnVuY3Rpb24oYSl7cmV0dXJuIFYocmMoYT4+PjApKX0sUmE6ZnVuY3Rpb24oKXtyZXR1cm4gVih7fSl9LFxuQ2Q6ZnVuY3Rpb24oYSl7YT4+Pj0wO2Zvcih2YXIgYj1VKGEpO2IubGVuZ3RoOyl7dmFyIGM9Yi5wb3AoKTtiLnBvcCgpKGMpfVhiKGEpfSxBZDpmdW5jdGlvbihhLGIsYyl7Yj4+Pj0wO2M+Pj49MDthPVUoYT4+PjApO2I9VShiKTtjPVUoYyk7YVtiXT1jfSxiYjpmdW5jdGlvbihhLGIpe2I+Pj49MDthPXBjKGE+Pj4wLFwiX2VtdmFsX3Rha2VfdmFsdWVcIik7YT1hLnJlYWRWYWx1ZUZyb21Qb2ludGVyKGIpO3JldHVybiBWKGEpfSxRYzpmdW5jdGlvbihhLGIpe2E9LTkwMDcxOTkyNTQ3NDA5OTI+YXx8OTAwNzE5OTI1NDc0MDk5MjxhP05hTjpOdW1iZXIoYSk7Yj4+Pj0wO2E9bmV3IERhdGUoMUUzKmEpO0EoKVtiPj4+Mj4+PjBdPWEuZ2V0VVRDU2Vjb25kcygpO0EoKVtiKzQ+Pj4yPj4+MF09YS5nZXRVVENNaW51dGVzKCk7QSgpW2IrOD4+PjI+Pj4wXT1hLmdldFVUQ0hvdXJzKCk7QSgpW2IrMTI+Pj4yPj4+MF09YS5nZXRVVENEYXRlKCk7QSgpW2IrMTY+Pj4yPj4+MF09YS5nZXRVVENNb250aCgpO1xuQSgpW2IrMjA+Pj4yPj4+MF09YS5nZXRVVENGdWxsWWVhcigpLTE5MDA7QSgpW2IrMjQ+Pj4yPj4+MF09YS5nZXRVVENEYXkoKTthPShhLmdldFRpbWUoKS1EYXRlLlVUQyhhLmdldFVUQ0Z1bGxZZWFyKCksMCwxLDAsMCwwLDApKS84NjRFNXwwO0EoKVtiKzI4Pj4+Mj4+PjBdPWF9LFJjOmZ1bmN0aW9uKGEsYil7YT0tOTAwNzE5OTI1NDc0MDk5Mj5hfHw5MDA3MTk5MjU0NzQwOTkyPGE/TmFOOk51bWJlcihhKTtiPj4+PTA7YT1uZXcgRGF0ZSgxRTMqYSk7QSgpW2I+Pj4yPj4+MF09YS5nZXRTZWNvbmRzKCk7QSgpW2IrND4+PjI+Pj4wXT1hLmdldE1pbnV0ZXMoKTtBKClbYis4Pj4+Mj4+PjBdPWEuZ2V0SG91cnMoKTtBKClbYisxMj4+PjI+Pj4wXT1hLmdldERhdGUoKTtBKClbYisxNj4+PjI+Pj4wXT1hLmdldE1vbnRoKCk7QSgpW2IrMjA+Pj4yPj4+MF09YS5nZXRGdWxsWWVhcigpLTE5MDA7QSgpW2IrMjQ+Pj4yPj4+MF09YS5nZXREYXkoKTt2YXIgYz0oQ2MoYS5nZXRGdWxsWWVhcigpKT9cbkRjOkVjKVthLmdldE1vbnRoKCldK2EuZ2V0RGF0ZSgpLTF8MDtBKClbYisyOD4+PjI+Pj4wXT1jO0EoKVtiKzM2Pj4+Mj4+PjBdPS0oNjAqYS5nZXRUaW1lem9uZU9mZnNldCgpKTtjPShuZXcgRGF0ZShhLmdldEZ1bGxZZWFyKCksNiwxKSkuZ2V0VGltZXpvbmVPZmZzZXQoKTt2YXIgZD0obmV3IERhdGUoYS5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCk7YT0oYyE9ZCYmYS5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihkLGMpKXwwO0EoKVtiKzMyPj4+Mj4+PjBdPWF9LFNjOmZ1bmN0aW9uKGEpe2E+Pj49MDt2YXIgYj1uZXcgRGF0ZShBKClbYSsyMD4+PjI+Pj4wXSsxOTAwLEEoKVthKzE2Pj4+Mj4+PjBdLEEoKVthKzEyPj4+Mj4+PjBdLEEoKVthKzg+Pj4yPj4+MF0sQSgpW2ErND4+PjI+Pj4wXSxBKClbYT4+PjI+Pj4wXSwwKSxjPUEoKVthKzMyPj4+Mj4+PjBdLGQ9Yi5nZXRUaW1lem9uZU9mZnNldCgpLGU9KG5ldyBEYXRlKGIuZ2V0RnVsbFllYXIoKSxcbjYsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksZj0obmV3IERhdGUoYi5nZXRGdWxsWWVhcigpLDAsMSkpLmdldFRpbWV6b25lT2Zmc2V0KCksZz1NYXRoLm1pbihmLGUpOzA+Yz9BKClbYSszMj4+PjI+Pj4wXT1OdW1iZXIoZSE9ZiYmZz09ZCk6MDxjIT0oZz09ZCkmJihlPU1hdGgubWF4KGYsZSksYi5zZXRUaW1lKGIuZ2V0VGltZSgpKzZFNCooKDA8Yz9nOmUpLWQpKSk7QSgpW2ErMjQ+Pj4yPj4+MF09Yi5nZXREYXkoKTtjPShDYyhiLmdldEZ1bGxZZWFyKCkpP0RjOkVjKVtiLmdldE1vbnRoKCldK2IuZ2V0RGF0ZSgpLTF8MDtBKClbYSsyOD4+PjI+Pj4wXT1jO0EoKVthPj4+Mj4+PjBdPWIuZ2V0U2Vjb25kcygpO0EoKVthKzQ+Pj4yPj4+MF09Yi5nZXRNaW51dGVzKCk7QSgpW2ErOD4+PjI+Pj4wXT1iLmdldEhvdXJzKCk7QSgpW2ErMTI+Pj4yPj4+MF09Yi5nZXREYXRlKCk7QSgpW2ErMTY+Pj4yPj4+MF09Yi5nZXRNb250aCgpO0EoKVthKzIwPj4+Mj4+PjBdPWIuZ2V0WWVhcigpO1xucmV0dXJuIEJpZ0ludChiLmdldFRpbWUoKS8xRTMpfSxPYzpGYyxQYzpHYyxDYzpmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChsKXtyZXR1cm4obD1sLnRvVGltZVN0cmluZygpLm1hdGNoKC9cXCgoW0EtWmEteiBdKylcXCkkLykpP2xbMV06XCJHTVRcIn1hPj4+PTA7Yj4+Pj0wO2M+Pj49MDt2YXIgZT0obmV3IERhdGUpLmdldEZ1bGxZZWFyKCksZj1uZXcgRGF0ZShlLDAsMSksZz1uZXcgRGF0ZShlLDYsMSk7ZT1mLmdldFRpbWV6b25lT2Zmc2V0KCk7dmFyIGg9Zy5nZXRUaW1lem9uZU9mZnNldCgpLGs9TWF0aC5tYXgoZSxoKTtCKClbYT4+PjI+Pj4wXT02MCprO0EoKVtiPj4+Mj4+PjBdPU51bWJlcihlIT1oKTthPWQoZik7Yj1kKGcpO2E9SWMoYSk7Yj1JYyhiKTtoPGU/KEIoKVtjPj4+Mj4+PjBdPWEsQigpW2MrND4+PjI+Pj4wXT1iKTooQigpW2M+Pj4yPj4+MF09YixCKClbYys0Pj4+Mj4+PjBdPWEpfSxhYTooKT0+e0FhKFwiXCIpfSxWYjooKT0+e30sWGI6KCk9PkRhdGUubm93KCksXG5iZDooKT0+e0xhKz0xO3Rocm93XCJ1bndpbmRcIjt9LEVjOmZ1bmN0aW9uKCl7cmV0dXJuIDQyOTQ5MDE3NjB9LHZhOigpPT5wZXJmb3JtYW5jZS50aW1lT3JpZ2luK3BlcmZvcm1hbmNlLm5vdygpLGpiOigpPT5GP3JlcXVpcmUoXCJvc1wiKS5jcHVzKCkubGVuZ3RoOm5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5LEJjOmZ1bmN0aW9uKGEpe2E+Pj49MDt2YXIgYj14KCkubGVuZ3RoO2lmKGE8PWJ8fDQyOTQ5MDE3NjA8YSlyZXR1cm4hMTtmb3IodmFyIGM9MTs0Pj1jO2MqPTIpe3ZhciBkPWIqKDErLjIvYyk7ZD1NYXRoLm1pbihkLGErMTAwNjYzMjk2KTt2YXIgZT1NYXRoO2Q9TWF0aC5tYXgoYSxkKTthOntlPShlLm1pbi5jYWxsKGUsNDI5NDkwMTc2MCxkKyg2NTUzNi1kJTY1NTM2KSU2NTUzNiktcS5idWZmZXIuYnl0ZUxlbmd0aCs2NTUzNSkvNjU1MzY7dHJ5e3EuZ3JvdyhlKTt0KCk7dmFyIGY9MTticmVhayBhfWNhdGNoKGcpe31mPXZvaWQgMH1pZihmKXJldHVybiEwfXJldHVybiExfSxcblhjOk1jLFljOk5jLExjOmViLEJiOk9jLFRiOlBjLFVjOlFjLFNiOlNjLGliOmRkLGZkOmVkLHNhOmZkLEc6Z2QscGE6aGQsZ2E6amQsZ2Q6a2QsbmQ6bGQsTjptZCx6Om5kLGM6b2QsZGM6cGQseWE6cWQsZzpyZCxFYjpzZCxkOnRkLFk6dWQsajp2ZCxpZDp3ZCxrOnhkLHI6eWQsczp6ZCxwOkFkLEFhOkJkLFZhOkNkLGlhOkRkLFBiOkVkLCRhOkZkLEliOkdkLG5iOkhkLGljOklkLHhjOkpkLGZjOktkLGdjOkxkLCRiOk1kLGthOk5kLHliOk9kLEJhOlBkLERiOlFkLGRhOlJkLGhjOlNkLFBhOlRkLEY6VWQsTDpWZCxHYjpXZCxzZDpYZCxvYTpZZCxPOlpkLCQ6JGQsVjphZSxBOmJlLEZiOmNlLGVjOmRlLEM6ZWUsSGI6ZmUscWQ6Z2UsUWE6aGUsZWI6aWUsamM6amUsYWM6a2UsTWI6bGUsUDptZSxIOm5lLEQ6b2UsbGQ6cGUsbGI6cWUsUjpyZSxlOnNlLFhhOnRlLGw6dWUseGE6dmUsV2E6d2UsdmI6eGUsaDp5ZSx5Yzp6ZSxjYTpBZSxmYjpCZSx6YTpDZSxtYjpEZSxnYjpFZSxmOkZlLFxudmM6R2UsdWQ6SGUsbzpJZSxzYzpKZSxtOktlLHdjOkxlLHJjOk1lLHdkOk5lLHc6T2UsTmE6UGUsdGI6UWUsTWE6UmUsS2I6U2UsQjpUZSxFOlVlLFc6VmUsVWE6V2Usb2M6WGUsRGQ6WWUsdWI6WmUsdWE6JGUsamE6YWYsUzpiZixhYjpjZixIYTpkZixHZDplZixrYjpmZixEYTpnZixsYzpoZixDYTpqZixFYTprZixqZDpsZixFZDptZixuYTpuZix2ZDpvZixJYTpwZixHYTpxZixxYzpyZixGYTpzZixKYTp0ZixwYjp1ZixoYTp2Zix0YTp3ZixrYzp4ZixwYzp5ZixKYjp6ZixaYTpBZixmYTpCZixSYjpDZixwZDpEZixVOkVmLHdiOkZmLGRiOkdmLFRhOkhmLGhiOklmLEo6SmYsVDpLZix4YjpMZixvZDpNZix1YzpOZixiYTpPZixvYjpQZixyYTpRZixuYzpSZixiYzpTZixJZDpUZix4OlVmLGNiOlZmLHpkOldmLE5iOlhmLG1jOllmLEtkOlpmLE9iOiRmLExiOmFnLF9hOmJnLFFiOmNnLEthOmRnLGNjOmVnLFo6ZmcsdGM6Z2csSzpoZyxtZDppZyxZYTpqZyxxYTprZyxJOmxnLHJiOm1nLFxuTGE6bmcsT2E6b2cscWI6cGcsc2I6cWcsdjpmdW5jdGlvbihhKXtyZXR1cm4gYT4+PjB9LGE6cXx8Qy53YXNtTWVtb3J5LEtjOlhjLGVhOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiBYYyhhPj4+MCxiPj4+MCxjPj4+MCxkPj4+MCl9fSxaPWZ1bmN0aW9uKCl7dmFyIGE9e2E6cmd9O05hKys7V2EoYSxmdW5jdGlvbihiKXt2YXIgYz1iLm1vZHVsZTtaPWIuaW5zdGFuY2UuZXhwb3J0cztaPXNnKCk7TS5mZi5wdXNoKFoub2UpO25iPVoucmU7SmEudW5zaGlmdChaLkxkKTtCYT1jO1FhKCl9KS5jYXRjaChtYSk7cmV0dXJue319KCk7Qy5fT3J0SW5pdD0oYSxiKT0+KEMuX09ydEluaXQ9Wi5NZCkoYSxiKTtDLl9PcnRHZXRMYXN0RXJyb3I9KGEsYik9PihDLl9PcnRHZXRMYXN0RXJyb3I9Wi5OZCkoYSxiKTtDLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz0oYSxiLGMsZCxlLGYsZyxoLGssbCk9PihDLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucz1aLk9kKShhLGIsYyxkLGUsZixnLGgsayxsKTtcbkMuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyPShhLGIpPT4oQy5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXI9Wi5QZCkoYSxiKTtDLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGU9KGEsYixjKT0+KEMuX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZT1aLlFkKShhLGIsYyk7Qy5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5PShhLGIsYyk9PihDLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnk9Wi5SZCkoYSxiLGMpO0MuX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucz1hPT4oQy5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zPVouU2QpKGEpO0MuX09ydENyZWF0ZVNlc3Npb249KGEsYixjKT0+KEMuX09ydENyZWF0ZVNlc3Npb249Wi5UZCkoYSxiLGMpO0MuX09ydFJlbGVhc2VTZXNzaW9uPWE9PihDLl9PcnRSZWxlYXNlU2Vzc2lvbj1aLlVkKShhKTtcbkMuX09ydEdldElucHV0T3V0cHV0Q291bnQ9KGEsYixjKT0+KEMuX09ydEdldElucHV0T3V0cHV0Q291bnQ9Wi5WZCkoYSxiLGMpO0MuX09ydEdldElucHV0TmFtZT0oYSxiKT0+KEMuX09ydEdldElucHV0TmFtZT1aLldkKShhLGIpO0MuX09ydEdldE91dHB1dE5hbWU9KGEsYik9PihDLl9PcnRHZXRPdXRwdXROYW1lPVouWGQpKGEsYik7Qy5fT3J0RnJlZT1hPT4oQy5fT3J0RnJlZT1aLllkKShhKTtDLl9PcnRDcmVhdGVUZW5zb3I9KGEsYixjLGQsZSxmKT0+KEMuX09ydENyZWF0ZVRlbnNvcj1aLlpkKShhLGIsYyxkLGUsZik7Qy5fT3J0R2V0VGVuc29yRGF0YT0oYSxiLGMsZCxlKT0+KEMuX09ydEdldFRlbnNvckRhdGE9Wi5fZCkoYSxiLGMsZCxlKTtDLl9PcnRSZWxlYXNlVGVuc29yPWE9PihDLl9PcnRSZWxlYXNlVGVuc29yPVouJGQpKGEpO0MuX09ydENyZWF0ZVJ1bk9wdGlvbnM9KGEsYixjLGQpPT4oQy5fT3J0Q3JlYXRlUnVuT3B0aW9ucz1aLmFlKShhLGIsYyxkKTtcbkMuX09ydEFkZFJ1bkNvbmZpZ0VudHJ5PShhLGIsYyk9PihDLl9PcnRBZGRSdW5Db25maWdFbnRyeT1aLmJlKShhLGIsYyk7Qy5fT3J0UmVsZWFzZVJ1bk9wdGlvbnM9YT0+KEMuX09ydFJlbGVhc2VSdW5PcHRpb25zPVouY2UpKGEpO0MuX09ydENyZWF0ZUJpbmRpbmc9YT0+KEMuX09ydENyZWF0ZUJpbmRpbmc9Wi5kZSkoYSk7Qy5fT3J0QmluZElucHV0PShhLGIsYyk9PihDLl9PcnRCaW5kSW5wdXQ9Wi5lZSkoYSxiLGMpO0MuX09ydEJpbmRPdXRwdXQ9KGEsYixjLGQpPT4oQy5fT3J0QmluZE91dHB1dD1aLmZlKShhLGIsYyxkKTtDLl9PcnRDbGVhckJvdW5kT3V0cHV0cz1hPT4oQy5fT3J0Q2xlYXJCb3VuZE91dHB1dHM9Wi5nZSkoYSk7Qy5fT3J0UmVsZWFzZUJpbmRpbmc9YT0+KEMuX09ydFJlbGVhc2VCaW5kaW5nPVouaGUpKGEpO0MuX09ydFJ1bldpdGhCaW5kaW5nPShhLGIsYyxkLGUpPT4oQy5fT3J0UnVuV2l0aEJpbmRpbmc9Wi5pZSkoYSxiLGMsZCxlKTtcbkMuX09ydFJ1bj0oYSxiLGMsZCxlLGYsZyxoKT0+KEMuX09ydFJ1bj1aLmplKShhLGIsYyxkLGUsZixnLGgpO0MuX09ydEVuZFByb2ZpbGluZz1hPT4oQy5fT3J0RW5kUHJvZmlsaW5nPVoua2UpKGEpO3ZhciBpYj1DLl9wdGhyZWFkX3NlbGY9KCk9PihpYj1DLl9wdGhyZWFkX3NlbGY9Wi5sZSkoKSxIYz1DLl9tYWxsb2M9YT0+KEhjPUMuX21hbGxvYz1aLm1lKShhKSxYPUMuX2ZyZWU9YT0+KFg9Qy5fZnJlZT1aLm5lKShhKTtDLl9fZW1zY3JpcHRlbl90bHNfaW5pdD0oKT0+KEMuX19lbXNjcmlwdGVuX3Rsc19pbml0PVoub2UpKCk7dmFyIG9jPWE9PihvYz1aLnBlKShhKTtDLl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3M9KCk9PihDLl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3M9Wi5xZSkoKTt2YXIgY2Q9Qy5fX2Vtc2NyaXB0ZW5fdGhyZWFkX2luaXQ9KGEsYixjLGQsZSxmKT0+KGNkPUMuX19lbXNjcmlwdGVuX3RocmVhZF9pbml0PVouc2UpKGEsYixjLGQsZSxmKTtcbkMuX19lbXNjcmlwdGVuX3RocmVhZF9jcmFzaGVkPSgpPT4oQy5fX2Vtc2NyaXB0ZW5fdGhyZWFkX2NyYXNoZWQ9Wi50ZSkoKTt2YXIgbWM9KGEsYixjLGQpPT4obWM9Wi51ZSkoYSxiLGMsZCksaGI9YT0+KGhiPVoudmUpKGEpLG9iPUMuX19lbXNjcmlwdGVuX3RocmVhZF9leGl0PWE9PihvYj1DLl9fZW1zY3JpcHRlbl90aHJlYWRfZXhpdD1aLndlKShhKSxqYz1DLl9fZW1zY3JpcHRlbl9jaGVja19tYWlsYm94PSgpPT4oamM9Qy5fX2Vtc2NyaXB0ZW5fY2hlY2tfbWFpbGJveD1aLnhlKSgpLFk9KGEsYik9PihZPVoueWUpKGEsYiksdGI9YT0+KHRiPVouemUpKGEpLGxiPShhLGIpPT4obGI9Wi5BZSkoYSxiKSxXPSgpPT4oVz1aLkJlKSgpLE89YT0+KE89Wi5DZSkoYSksbGM9YT0+KGxjPVouRGUpKGEpLGJkPWE9PihiZD1aLkVlKShhKSxhZD1hPT4oYWQ9Wi5GZSkoYSksdWI9KGEsYixjKT0+KHViPVouR2UpKGEsYixjKSxzYj1hPT4oc2I9Wi5IZSkoYSk7XG5mdW5jdGlvbiB0ZChhLGIsYyxkKXt2YXIgZT1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkKX1jYXRjaChmKXtPKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtZKDEsMCl9fWZ1bmN0aW9uIHJkKGEsYixjKXt2YXIgZD1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyl9Y2F0Y2goZSl7TyhkKTtpZihlIT09ZSswKXRocm93IGU7WSgxLDApfX1mdW5jdGlvbiB5ZShhLGIsYyl7dmFyIGQ9VygpO3RyeXtQKGEpKGIsYyl9Y2F0Y2goZSl7TyhkKTtpZihlIT09ZSswKXRocm93IGU7WSgxLDApfX1mdW5jdGlvbiBvZChhLGIpe3ZhciBjPVcoKTt0cnl7cmV0dXJuIFAoYSkoYil9Y2F0Y2goZCl7TyhjKTtpZihkIT09ZCswKXRocm93IGQ7WSgxLDApfX1mdW5jdGlvbiB1ZShhLGIpe3ZhciBjPVcoKTt0cnl7UChhKShiKX1jYXRjaChkKXtPKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtZKDEsMCl9fVxuZnVuY3Rpb24gVWQoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiBzZShhKXt2YXIgYj1XKCk7dHJ5e1AoYSkoKX1jYXRjaChjKXtPKGIpO2lmKGMhPT1jKzApdGhyb3cgYztZKDEsMCl9fWZ1bmN0aW9uIHlkKGEsYixjLGQsZSxmLGcpe3ZhciBoPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe08oaCk7aWYoayE9PWsrMCl0aHJvdyBrO1koMSwwKX19ZnVuY3Rpb24geGQoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtPKGcpO2lmKGghPT1oKzApdGhyb3cgaDtZKDEsMCl9fWZ1bmN0aW9uIHZkKGEsYixjLGQsZSl7dmFyIGY9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlKX1jYXRjaChnKXtPKGYpO2lmKGchPT1nKzApdGhyb3cgZztZKDEsMCl9fVxuZnVuY3Rpb24gRmUoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtQKGEpKGIsYyxkKX1jYXRjaChmKXtPKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtZKDEsMCl9fWZ1bmN0aW9uIEllKGEsYixjLGQsZSl7dmFyIGY9VygpO3RyeXtQKGEpKGIsYyxkLGUpfWNhdGNoKGcpe08oZik7aWYoZyE9PWcrMCl0aHJvdyBnO1koMSwwKX19ZnVuY3Rpb24gbmQoYSl7dmFyIGI9VygpO3RyeXtyZXR1cm4gUChhKSgpfWNhdGNoKGMpe08oYik7aWYoYyE9PWMrMCl0aHJvdyBjO1koMSwwKX19ZnVuY3Rpb24gYmUoYSxiLGMpe3ZhciBkPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjKX1jYXRjaChlKXtPKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtZKDEsMCl9fWZ1bmN0aW9uIFVmKGEsYixjKXt2YXIgZD1XKCk7dHJ5e1AoYSkoYixjKX1jYXRjaChlKXtPKGQpO2lmKGUhPT1lKzApdGhyb3cgZTtZKDEsMCl9fVxuZnVuY3Rpb24gS2UoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7UChhKShiLGMsZCxlLGYpfWNhdGNoKGgpe08oZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1koMSwwKX19ZnVuY3Rpb24gemQoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKGwpe08oayk7aWYobCE9PWwrMCl0aHJvdyBsO1koMSwwKX19ZnVuY3Rpb24gamQoYSxiKXt2YXIgYz1XKCk7dHJ5e3JldHVybiBQKGEpKGIpfWNhdGNoKGQpe08oYyk7aWYoZCE9PWQrMCl0aHJvdyBkO1koMSwwKX19ZnVuY3Rpb24gbWUoYSxiKXt2YXIgYz1XKCk7dHJ5e3JldHVybiBQKGEpKGIpfWNhdGNoKGQpe08oYyk7aWYoZCE9PWQrMCl0aHJvdyBkO1koMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIGRkKGEsYil7dmFyIGM9VygpO3RyeXtyZXR1cm4gUChhKShiKX1jYXRjaChkKXtPKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtZKDEsMCl9fVxuZnVuY3Rpb24gQWQoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBsPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtPKGwpO2lmKG4hPT1uKzApdGhyb3cgbjtZKDEsMCl9fWZ1bmN0aW9uIEpmKGEsYixjLGQpe3ZhciBlPVcoKTt0cnl7UChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiBPZShhLGIsYyxkLGUsZixnKXt2YXIgaD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe08oaCk7aWYoayE9PWsrMCl0aHJvdyBrO1koMSwwKX19ZnVuY3Rpb24gWmYoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtQKGEpKGIsYyxkKX1jYXRjaChmKXtPKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtZKDEsMCl9fWZ1bmN0aW9uIENmKGEsYixjLGQsZSxmLGcpe3ZhciBoPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7TyhoKTtpZihrIT09ayswKXRocm93IGs7WSgxLDApfX1cbmZ1bmN0aW9uIFRlKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKGwpe08oayk7aWYobCE9PWwrMCl0aHJvdyBsO1koMSwwKX19ZnVuY3Rpb24gT2YoYSxiLGMsZCxlKXt2YXIgZj1XKCk7dHJ5e1AoYSkoYixjLGQsZSl9Y2F0Y2goZyl7TyhmKTtpZihnIT09ZyswKXRocm93IGc7WSgxLDApfX1mdW5jdGlvbiBCZChhLGIsYyxkLGUsZixnLGgsayxsKXt2YXIgbj1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnLGgsayxsKX1jYXRjaCh1KXtPKG4pO2lmKHUhPT11KzApdGhyb3cgdTtZKDEsMCl9fWZ1bmN0aW9uIFVlKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtPKGwpO2lmKG4hPT1uKzApdGhyb3cgbjtZKDEsMCl9fVxuZnVuY3Rpb24gT2QoYSxiLGMsZCxlLGYsZyxoLGssbCxuKXt2YXIgdT1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4pfWNhdGNoKHYpe08odSk7aWYodiE9PXYrMCl0aHJvdyB2O1koMSwwKX19ZnVuY3Rpb24gTGYoYSxiLGMsZCxlLGYsZyl7dmFyIGg9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtPKGgpO2lmKGshPT1rKzApdGhyb3cgaztZKDEsMCl9fWZ1bmN0aW9uIFZlKGEsYixjLGQsZSxmLGcsaCxrLGwpe3ZhciBuPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCl9Y2F0Y2godSl7TyhuKTtpZih1IT09dSswKXRocm93IHU7WSgxLDApfX1mdW5jdGlvbiBuZShhLGIsYyl7dmFyIGQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMpfWNhdGNoKGUpe08oZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1koMSwwKTtyZXR1cm4gMG59fVxuZnVuY3Rpb24gemUoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtQKGEpKGIsYyxkKX1jYXRjaChmKXtPKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtZKDEsMCl9fWZ1bmN0aW9uIEpkKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbD1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7TyhsKTtpZihuIT09biswKXRocm93IG47WSgxLDApfX1mdW5jdGlvbiBEZChhLGIsYyxkLGUsZixnLGgsayxsLG4sdSl7dmFyIHY9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUpfWNhdGNoKG0pe08odik7aWYobSE9PW0rMCl0aHJvdyBtO1koMSwwKX19ZnVuY3Rpb24gY2YoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtKXt2YXIgdz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSl9Y2F0Y2goeSl7Tyh3KTtpZih5IT09eSswKXRocm93IHk7WSgxLDApfX1cbmZ1bmN0aW9uIFRmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1KXt2YXIgdj1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1KX1jYXRjaChtKXtPKHYpO2lmKG0hPT1tKzApdGhyb3cgbTtZKDEsMCl9fWZ1bmN0aW9uIEZmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1KXt2YXIgdj1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1KX1jYXRjaChtKXtPKHYpO2lmKG0hPT1tKzApdGhyb3cgbTtZKDEsMCl9fWZ1bmN0aW9uIEtmKGEsYixjLGQsZSl7dmFyIGY9VygpO3RyeXtQKGEpKGIsYyxkLGUpfWNhdGNoKGcpe08oZik7aWYoZyE9PWcrMCl0aHJvdyBnO1koMSwwKX19ZnVuY3Rpb24geGUoYSxiLGMsZCxlLGYsZyl7dmFyIGg9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtPKGgpO2lmKGshPT1rKzApdGhyb3cgaztZKDEsMCl9fVxuZnVuY3Rpb24gSWYoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBsPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe08obCk7aWYobiE9PW4rMCl0aHJvdyBuO1koMSwwKX19ZnVuY3Rpb24gRWUoYSxiLGMsZCxlLGYsZyl7dmFyIGg9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtPKGgpO2lmKGshPT1rKzApdGhyb3cgaztZKDEsMCl9fWZ1bmN0aW9uIExlKGEsYixjLGQsZSxmLGcsaCxrLGwsbil7dmFyIHU9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4pfWNhdGNoKHYpe08odSk7aWYodiE9PXYrMCl0aHJvdyB2O1koMSwwKX19ZnVuY3Rpb24gamcoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobCl7TyhrKTtpZihsIT09bCswKXRocm93IGw7WSgxLDApfX1cbmZ1bmN0aW9uIG9lKGEsYixjLGQpe3ZhciBlPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQpfWNhdGNoKGYpe08oZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1koMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIEdlKGEsYixjLGQsZSl7dmFyIGY9VygpO3RyeXtQKGEpKGIsYyxkLGUpfWNhdGNoKGcpe08oZik7aWYoZyE9PWcrMCl0aHJvdyBnO1koMSwwKX19ZnVuY3Rpb24gZWYoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6KXt2YXIgRD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseil9Y2F0Y2goRSl7TyhEKTtpZihFIT09RSswKXRocm93IEU7WSgxLDApfX1mdW5jdGlvbiBOZihhLGIsYyxkLGUsZixnLGgsayxsLG4pe3ZhciB1PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuKX1jYXRjaCh2KXtPKHUpO2lmKHYhPT12KzApdGhyb3cgdjtZKDEsMCl9fVxuZnVuY3Rpb24gZ2coYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSl7dmFyIHo9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5KX1jYXRjaChEKXtPKHopO2lmKEQhPT1EKzApdGhyb3cgRDtZKDEsMCl9fWZ1bmN0aW9uIEJmKGEsYixjLGQsZSxmKXt2YXIgZz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtPKGcpO2lmKGghPT1oKzApdGhyb3cgaDtZKDEsMCl9fWZ1bmN0aW9uIGNnKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtPKGwpO2lmKG4hPT1uKzApdGhyb3cgbjtZKDEsMCl9fWZ1bmN0aW9uIFZkKGEsYixjLGQsZSl7dmFyIGY9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlKX1jYXRjaChnKXtPKGYpO2lmKGchPT1nKzApdGhyb3cgZztZKDEsMCl9fVxuZnVuY3Rpb24gJGQoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtKXt2YXIgdz1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0pfWNhdGNoKHkpe08odyk7aWYoeSE9PXkrMCl0aHJvdyB5O1koMSwwKX19ZnVuY3Rpb24gaGcoYSxiKXt2YXIgYz1XKCk7dHJ5e1AoYSkoYil9Y2F0Y2goZCl7TyhjKTtpZihkIT09ZCswKXRocm93IGQ7WSgxLDApfX1mdW5jdGlvbiByZShhLGIsYyl7dmFyIGQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMpfWNhdGNoKGUpe08oZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1koMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIFpkKGEsYixjLGQsZSxmLGcsaCxrLGwpe3ZhciBuPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCxrLGwpfWNhdGNoKHUpe08obik7aWYodSE9PXUrMCl0aHJvdyB1O1koMSwwKX19XG5mdW5jdGlvbiBtZChhLGIsYyxkLGUpe3ZhciBmPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSl9Y2F0Y2goZyl7TyhmKTtpZihnIT09ZyswKXRocm93IGc7WSgxLDApfX1mdW5jdGlvbiBaZShhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyl7dmFyIHk9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyl9Y2F0Y2goeil7Tyh5KTtpZih6IT09eiswKXRocm93IHo7WSgxLDApfX1mdW5jdGlvbiB0ZShhLGIsYyxkLGUpe3ZhciBmPVcoKTt0cnl7UChhKShiLGMsZCxlKX1jYXRjaChnKXtPKGYpO2lmKGchPT1nKzApdGhyb3cgZztZKDEsMCl9fWZ1bmN0aW9uIEplKGEsYixjLGQsZSxmLGcpe3ZhciBoPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7TyhoKTtpZihrIT09ayswKXRocm93IGs7WSgxLDApfX1cbmZ1bmN0aW9uIEJlKGEsYixjLGQsZSl7dmFyIGY9VygpO3RyeXtQKGEpKGIsYyxkLGUpfWNhdGNoKGcpe08oZik7aWYoZyE9PWcrMCl0aHJvdyBnO1koMSwwKX19ZnVuY3Rpb24gTWUoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobCl7TyhrKTtpZihsIT09bCswKXRocm93IGw7WSgxLDApfX1mdW5jdGlvbiBtZihhLGIsYyxkLGUsZixnLGgsayxsLG4pe3ZhciB1PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuKX1jYXRjaCh2KXtPKHUpO2lmKHYhPT12KzApdGhyb3cgdjtZKDEsMCl9fWZ1bmN0aW9uIEVkKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseil7dmFyIEQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6KX1jYXRjaChFKXtPKEQpO2lmKEUhPT1FKzApdGhyb3cgRTtZKDEsMCl9fVxuZnVuY3Rpb24gYmYoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdil7dmFyIG09VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2KX1jYXRjaCh3KXtPKG0pO2lmKHchPT13KzApdGhyb3cgdztZKDEsMCl9fWZ1bmN0aW9uIGhlKGEsYil7dmFyIGM9VygpO3RyeXtyZXR1cm4gUChhKShiKX1jYXRjaChkKXtPKGMpO2lmKGQhPT1kKzApdGhyb3cgZDtZKDEsMCl9fWZ1bmN0aW9uIEZkKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseixELEUsSSl7dmFyIEo9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJKX1jYXRjaChLKXtPKEopO2lmKEshPT1LKzApdGhyb3cgSztZKDEsMCl9fWZ1bmN0aW9uIGJnKGEsYixjLGQsZSxmLGcsaCxrLGwpe3ZhciBuPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCl9Y2F0Y2godSl7TyhuKTtpZih1IT09dSswKXRocm93IHU7WSgxLDApfX1cbmZ1bmN0aW9uIFRkKGEsYixjLGQsZSxmLGcpe3ZhciBoPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe08oaCk7aWYoayE9PWsrMCl0aHJvdyBrO1koMSwwKX19ZnVuY3Rpb24gJGUoYSxiLGMsZCxlLGYsZyxoLGssbCxuKXt2YXIgdT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbil9Y2F0Y2godil7Tyh1KTtpZih2IT09diswKXRocm93IHY7WSgxLDApfX1mdW5jdGlvbiBhZShhLGIsYyxkLGUsZil7dmFyIGc9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYpfWNhdGNoKGgpe08oZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1koMSwwKX19ZnVuY3Rpb24gd2YoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7UChhKShiLGMsZCxlLGYpfWNhdGNoKGgpe08oZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1koMSwwKX19XG5mdW5jdGlvbiBZZShhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0pe3ZhciB3PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtKX1jYXRjaCh5KXtPKHcpO2lmKHkhPT15KzApdGhyb3cgeTtZKDEsMCl9fWZ1bmN0aW9uIG9nKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseixEKXt2YXIgRT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseixEKX1jYXRjaChJKXtPKEUpO2lmKEkhPT1JKzApdGhyb3cgSTtZKDEsMCl9fWZ1bmN0aW9uIFFlKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseil7dmFyIEQ9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5LHopfWNhdGNoKEUpe08oRCk7aWYoRSE9PUUrMCl0aHJvdyBFO1koMSwwKX19XG5mdW5jdGlvbiBQZShhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5KXt2YXIgej1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkpfWNhdGNoKEQpe08oeik7aWYoRCE9PUQrMCl0aHJvdyBEO1koMSwwKX19ZnVuY3Rpb24gUmUoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcpe3ZhciB5PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcpfWNhdGNoKHope08oeSk7aWYoeiE9PXorMCl0aHJvdyB6O1koMSwwKX19ZnVuY3Rpb24gcWcoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJLEope3ZhciBLPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJLEopfWNhdGNoKGFhKXtPKEspO2lmKGFhIT09YWErMCl0aHJvdyBhYTtZKDEsMCl9fVxuZnVuY3Rpb24gbmcoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSl7dmFyIEk9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5LHosRCxFKX1jYXRjaChKKXtPKEkpO2lmKEohPT1KKzApdGhyb3cgSjtZKDEsMCl9fWZ1bmN0aW9uIG1nKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseil7dmFyIEQ9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5LHopfWNhdGNoKEUpe08oRCk7aWYoRSE9PUUrMCl0aHJvdyBFO1koMSwwKX19ZnVuY3Rpb24gcGcoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJKXt2YXIgSj1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseixELEUsSSl9Y2F0Y2goSyl7TyhKKTtpZihLIT09SyswKXRocm93IEs7WSgxLDApfX1cbmZ1bmN0aW9uICRmKGEsYixjLGQsZSxmLGcsaCxrLGwpe3ZhciBuPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCl9Y2F0Y2godSl7TyhuKTtpZih1IT09dSswKXRocm93IHU7WSgxLDApfX1mdW5jdGlvbiBYZihhLGIsYyxkLGUsZixnLGgsayxsLG4pe3ZhciB1PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuKX1jYXRjaCh2KXtPKHUpO2lmKHYhPT12KzApdGhyb3cgdjtZKDEsMCl9fWZ1bmN0aW9uIGZnKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3KXt2YXIgeT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3KX1jYXRjaCh6KXtPKHkpO2lmKHohPT16KzApdGhyb3cgejtZKDEsMCl9fWZ1bmN0aW9uIGxnKGEsYixjLGQsZSxmLGcsaCxrLGwpe3ZhciBuPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCl9Y2F0Y2godSl7TyhuKTtpZih1IT09dSswKXRocm93IHU7WSgxLDApfX1cbmZ1bmN0aW9uIGtnKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtPKGwpO2lmKG4hPT1uKzApdGhyb3cgbjtZKDEsMCl9fWZ1bmN0aW9uIGhkKGEsYixjLGQsZSxmLGcpe3ZhciBoPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe08oaCk7aWYoayE9PWsrMCl0aHJvdyBrO1koMSwwKX19ZnVuY3Rpb24gQ2UoYSxiLGMsZCxlKXt2YXIgZj1XKCk7dHJ5e1AoYSkoYixjLGQsZSl9Y2F0Y2goZyl7TyhmKTtpZihnIT09ZyswKXRocm93IGc7WSgxLDApfX1mdW5jdGlvbiBsZShhLGIsYyl7dmFyIGQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMpfWNhdGNoKGUpe08oZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1koMSwwKTtyZXR1cm4gMG59fVxuZnVuY3Rpb24gTmQoYSxiLGMsZCxlLGYsZyl7dmFyIGg9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7TyhoKTtpZihrIT09ayswKXRocm93IGs7WSgxLDApfX1mdW5jdGlvbiBhZyhhLGIsYyxkLGUsZil7dmFyIGc9VygpO3RyeXtQKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7TyhnKTtpZihoIT09aCswKXRocm93IGg7WSgxLDApfX1mdW5jdGlvbiBFZihhLGIsYyxkLGUsZixnLGgsayxsLG4pe3ZhciB1PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuKX1jYXRjaCh2KXtPKHUpO2lmKHYhPT12KzApdGhyb3cgdjtZKDEsMCl9fWZ1bmN0aW9uIHVmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpe3ZhciBtPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdil9Y2F0Y2godyl7TyhtKTtpZih3IT09dyswKXRocm93IHc7WSgxLDApfX1cbmZ1bmN0aW9uIFJkKGEsYixjLGQsZSxmKXt2YXIgZz1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7TyhnKTtpZihoIT09aCswKXRocm93IGg7WSgxLDApfX1mdW5jdGlvbiByZihhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2KXt2YXIgbT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpfWNhdGNoKHcpe08obSk7aWYodyE9PXcrMCl0aHJvdyB3O1koMSwwKX19ZnVuY3Rpb24geWYoYSxiLGMsZCxlLGYsZyxoKXt2YXIgaz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobCl7TyhrKTtpZihsIT09bCswKXRocm93IGw7WSgxLDApfX1mdW5jdGlvbiBRZihhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChsKXtPKGspO2lmKGwhPT1sKzApdGhyb3cgbDtZKDEsMCl9fVxuZnVuY3Rpb24gaWUoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiB2ZihhLGIsYyxkLGUsZixnLGgsayxsKXt2YXIgbj1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwpfWNhdGNoKHUpe08obik7aWYodSE9PXUrMCl0aHJvdyB1O1koMSwwKX19ZnVuY3Rpb24gZGcoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBsPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe08obCk7aWYobiE9PW4rMCl0aHJvdyBuO1koMSwwKX19ZnVuY3Rpb24gdGYoYSxiLGMsZCxlLGYsZyxoLGspe3ZhciBsPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGspfWNhdGNoKG4pe08obCk7aWYobiE9PW4rMCl0aHJvdyBuO1koMSwwKX19XG5mdW5jdGlvbiBwZihhLGIsYyxkLGUsZixnLGgsayxsKXt2YXIgbj1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwpfWNhdGNoKHUpe08obik7aWYodSE9PXUrMCl0aHJvdyB1O1koMSwwKX19ZnVuY3Rpb24gV2YoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7UChhKShiLGMsZCxlLGYpfWNhdGNoKGgpe08oZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1koMSwwKX19ZnVuY3Rpb24gWGUoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUpe3ZhciB2PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUpfWNhdGNoKG0pe08odik7aWYobSE9PW0rMCl0aHJvdyBtO1koMSwwKX19ZnVuY3Rpb24gR2YoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtKXt2YXIgdz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSl9Y2F0Y2goeSl7Tyh3KTtpZih5IT09eSswKXRocm93IHk7WSgxLDApfX1cbmZ1bmN0aW9uIFlkKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyxoKX1jYXRjaChsKXtPKGspO2lmKGwhPT1sKzApdGhyb3cgbDtZKDEsMCl9fWZ1bmN0aW9uIGRmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3KXt2YXIgeT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3KX1jYXRjaCh6KXtPKHkpO2lmKHohPT16KzApdGhyb3cgejtZKDEsMCl9fWZ1bmN0aW9uIHFmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSl7dmFyIHc9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0pfWNhdGNoKHkpe08odyk7aWYoeSE9PXkrMCl0aHJvdyB5O1koMSwwKX19XG5mdW5jdGlvbiBuZihhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyl7dmFyIHk9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyl9Y2F0Y2goeil7Tyh5KTtpZih6IT09eiswKXRocm93IHo7WSgxLDApfX1mdW5jdGlvbiB3ZShhLGIsYyl7dmFyIGQ9VygpO3RyeXtQKGEpKGIsYyl9Y2F0Y2goZSl7TyhkKTtpZihlIT09ZSswKXRocm93IGU7WSgxLDApfX1mdW5jdGlvbiBSZihhLGIsYyxkLGUsZixnLGgsayl7dmFyIGw9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayl9Y2F0Y2gobil7TyhsKTtpZihuIT09biswKXRocm93IG47WSgxLDApfX1mdW5jdGlvbiBTZShhLGIsYyxkLGUsZixnLGgsayxsLG4pe3ZhciB1PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuKX1jYXRjaCh2KXtPKHUpO2lmKHYhPT12KzApdGhyb3cgdjtZKDEsMCl9fVxuZnVuY3Rpb24gc2YoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJLEosSyxhYSx2Zyx3Zyx4Zyl7dmFyIHlnPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJLEosSyxhYSx2Zyx3Zyx4Zyl9Y2F0Y2goZmIpe08oeWcpO2lmKGZiIT09ZmIrMCl0aHJvdyBmYjtZKDEsMCl9fWZ1bmN0aW9uIFBmKGEsYixjLGQsZSxmKXt2YXIgZz1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtPKGcpO2lmKGghPT1oKzApdGhyb3cgaDtZKDEsMCl9fWZ1bmN0aW9uIEhkKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpe3ZhciBtPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpfWNhdGNoKHcpe08obSk7aWYodyE9PXcrMCl0aHJvdyB3O1koMSwwKX19XG5mdW5jdGlvbiBhZihhLGIsYyxkLGUsZixnLGgsayxsLG4sdSl7dmFyIHY9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSl9Y2F0Y2gobSl7Tyh2KTtpZihtIT09bSswKXRocm93IG07WSgxLDApfX1mdW5jdGlvbiBEZShhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2KXt2YXIgbT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpfWNhdGNoKHcpe08obSk7aWYodyE9PXcrMCl0aHJvdyB3O1koMSwwKX19ZnVuY3Rpb24ga2YoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJLEope3ZhciBLPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSxJLEopfWNhdGNoKGFhKXtPKEspO2lmKGFhIT09YWErMCl0aHJvdyBhYTtZKDEsMCl9fWZ1bmN0aW9uIHFkKGEsYixjKXt2YXIgZD1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyl9Y2F0Y2goZSl7TyhkKTtpZihlIT09ZSswKXRocm93IGU7WSgxLDApfX1cbmZ1bmN0aW9uIE5lKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpe3ZhciBtPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdil9Y2F0Y2godyl7TyhtKTtpZih3IT09dyswKXRocm93IHc7WSgxLDApfX1mdW5jdGlvbiBZZihhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0pe3ZhciB3PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtKX1jYXRjaCh5KXtPKHcpO2lmKHkhPT15KzApdGhyb3cgeTtZKDEsMCl9fWZ1bmN0aW9uIHpmKGEsYixjLGQsZSxmLGcsaCl7dmFyIGs9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgpfWNhdGNoKGwpe08oayk7aWYobCE9PWwrMCl0aHJvdyBsO1koMSwwKX19ZnVuY3Rpb24gZ2YoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6KXt2YXIgRD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseil9Y2F0Y2goRSl7TyhEKTtpZihFIT09RSswKXRocm93IEU7WSgxLDApfX1cbmZ1bmN0aW9uIGpmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseixELEUsSSl7dmFyIEo9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5LHosRCxFLEkpfWNhdGNoKEspe08oSik7aWYoSyE9PUsrMCl0aHJvdyBLO1koMSwwKX19ZnVuY3Rpb24gaGYoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSx6LEQsRSl7dmFyIEk9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5LHosRCxFKX1jYXRjaChKKXtPKEkpO2lmKEohPT1KKzApdGhyb3cgSjtZKDEsMCl9fWZ1bmN0aW9uIG9mKGEsYixjLGQsZSxmLGcsaCxrLGwsbil7dmFyIHU9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4pfWNhdGNoKHYpe08odSk7aWYodiE9PXYrMCl0aHJvdyB2O1koMSwwKX19XG5mdW5jdGlvbiBDZChhLGIsYyxkLGUsZixnLGgsayxsLG4pe3ZhciB1PVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCxrLGwsbil9Y2F0Y2godil7Tyh1KTtpZih2IT09diswKXRocm93IHY7WSgxLDApfX1mdW5jdGlvbiBHZChhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2LG0sdyx5LHosRCxFLEkpe3ZhciBKPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkseixELEUsSSl9Y2F0Y2goSyl7TyhKKTtpZihLIT09SyswKXRocm93IEs7WSgxLDApfX1mdW5jdGlvbiBIZShhLGIsYyxkLGUpe3ZhciBmPVcoKTt0cnl7UChhKShiLGMsZCxlKX1jYXRjaChnKXtPKGYpO2lmKGchPT1nKzApdGhyb3cgZztZKDEsMCl9fWZ1bmN0aW9uIFdlKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1KXt2YXIgdj1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1KX1jYXRjaChtKXtPKHYpO2lmKG0hPT1tKzApdGhyb3cgbTtZKDEsMCl9fVxuZnVuY3Rpb24gZWUoYSxiLGMsZCxlKXt2YXIgZj1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUpfWNhdGNoKGcpe08oZik7aWYoZyE9PWcrMCl0aHJvdyBnO1koMSwwKX19ZnVuY3Rpb24gcWUoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApO3JldHVybiAwbn19ZnVuY3Rpb24geGYoYSxiLGMsZCxlLGYsZyl7dmFyIGg9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtPKGgpO2lmKGshPT1rKzApdGhyb3cgaztZKDEsMCl9fWZ1bmN0aW9uIGZlKGEsYixjLGQsZSxmKXt2YXIgZz1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7TyhnKTtpZihoIT09aCswKXRocm93IGg7WSgxLDApfX1mdW5jdGlvbiBBZihhLGIsYyxkLGUpe3ZhciBmPVcoKTt0cnl7UChhKShiLGMsZCxlKX1jYXRjaChnKXtPKGYpO2lmKGchPT1nKzApdGhyb3cgZztZKDEsMCl9fVxuZnVuY3Rpb24gamUoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtPKGcpO2lmKGghPT1oKzApdGhyb3cgaDtZKDEsMCl9fWZ1bmN0aW9uIEhmKGEsYixjLGQsZSxmLGcsaCxrKXt2YXIgbD1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrKX1jYXRjaChuKXtPKGwpO2lmKG4hPT1uKzApdGhyb3cgbjtZKDEsMCl9fWZ1bmN0aW9uIEFlKGEsYixjLGQpe3ZhciBlPVcoKTt0cnl7UChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiBQZChhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobCl7TyhrKTtpZihsIT09bCswKXRocm93IGw7WSgxLDApfX1mdW5jdGlvbiBWZihhLGIsYyxkKXt2YXIgZT1XKCk7dHJ5e1AoYSkoYixjLGQpfWNhdGNoKGYpe08oZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1koMSwwKX19XG5mdW5jdGlvbiB1ZChhLGIsYyxkLGUsZil7dmFyIGc9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYpfWNhdGNoKGgpe08oZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1koMSwwKX19ZnVuY3Rpb24gV2QoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtPKGcpO2lmKGghPT1oKzApdGhyb3cgaDtZKDEsMCl9fWZ1bmN0aW9uIElkKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1KXt2YXIgdj1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSl9Y2F0Y2gobSl7Tyh2KTtpZihtIT09bSswKXRocm93IG07WSgxLDApfX1mdW5jdGlvbiBTZChhLGIsYyxkLGUsZixnLGgpe3ZhciBrPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcsaCl9Y2F0Y2gobCl7TyhrKTtpZihsIT09bCswKXRocm93IGw7WSgxLDApfX1cbmZ1bmN0aW9uIExkKGEsYixjLGQsZSxmLGcsaCxrLGwsbil7dmFyIHU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyxoLGssbCxuKX1jYXRjaCh2KXtPKHUpO2lmKHYhPT12KzApdGhyb3cgdjtZKDEsMCl9fWZ1bmN0aW9uIFhkKGEsYixjLGQsZSxmLGcpe3ZhciBoPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmLGcpfWNhdGNoKGspe08oaCk7aWYoayE9PWsrMCl0aHJvdyBrO1koMSwwKX19ZnVuY3Rpb24gS2QoYSxiLGMsZCxlLGYsZyxoLGssbCxuLHUsdil7dmFyIG09VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdil9Y2F0Y2godyl7TyhtKTtpZih3IT09dyswKXRocm93IHc7WSgxLDApfX1mdW5jdGlvbiBkZShhLGIsYyxkLGUsZixnKXt2YXIgaD1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZixnKX1jYXRjaChrKXtPKGgpO2lmKGshPT1rKzApdGhyb3cgaztZKDEsMCl9fVxuZnVuY3Rpb24gZ2UoYSxiLGMsZCxlLGYsZyl7dmFyIGg9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYsZyl9Y2F0Y2goayl7TyhoKTtpZihrIT09ayswKXRocm93IGs7WSgxLDApfX1mdW5jdGlvbiBjZShhLGIsYyxkKXt2YXIgZT1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkKX1jYXRjaChmKXtPKGUpO2lmKGYhPT1mKzApdGhyb3cgZjtZKDEsMCl9fWZ1bmN0aW9uIERmKGEsYixjLGQsZSxmLGcsaCxrLGwpe3ZhciBuPVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCl9Y2F0Y2godSl7TyhuKTtpZih1IT09dSswKXRocm93IHU7WSgxLDApfX1mdW5jdGlvbiBNZihhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2KXt2YXIgbT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpfWNhdGNoKHcpe08obSk7aWYodyE9PXcrMCl0aHJvdyB3O1koMSwwKX19XG5mdW5jdGlvbiBwZChhLGIsYyl7dmFyIGQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMpfWNhdGNoKGUpe08oZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1koMSwwKX19ZnVuY3Rpb24gc2QoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiB2ZShhLGIsYyxkKXt2YXIgZT1XKCk7dHJ5e1AoYSkoYixjLGQpfWNhdGNoKGYpe08oZSk7aWYoZiE9PWYrMCl0aHJvdyBmO1koMSwwKX19ZnVuY3Rpb24gbGQoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiBpZyhhLGIsYyxkLGUpe3ZhciBmPVcoKTt0cnl7UChhKShiLGMsZCxlKX1jYXRjaChnKXtPKGYpO2lmKGchPT1nKzApdGhyb3cgZztZKDEsMCl9fVxuZnVuY3Rpb24gcGUoYSxiLGMsZCxlKXt2YXIgZj1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUpfWNhdGNoKGcpe08oZik7aWYoZyE9PWcrMCl0aHJvdyBnO1koMSwwKTtyZXR1cm4gMG59fWZ1bmN0aW9uIGdkKGEsYixjLGQsZSxmKXt2YXIgZz1XKCk7dHJ5e3JldHVybiBQKGEpKGIsYyxkLGUsZil9Y2F0Y2goaCl7TyhnKTtpZihoIT09aCswKXRocm93IGg7WSgxLDApfX1mdW5jdGlvbiBlZyhhLGIsYyxkLGUsZixnLGgsayxsLG4sdSx2KXt2YXIgbT1XKCk7dHJ5e1AoYSkoYixjLGQsZSxmLGcsaCxrLGwsbix1LHYpfWNhdGNoKHcpe08obSk7aWYodyE9PXcrMCl0aHJvdyB3O1koMSwwKX19ZnVuY3Rpb24gU2YoYSxiLGMsZCxlLGYsZyxoLGssbCl7dmFyIG49VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsKX1jYXRjaCh1KXtPKG4pO2lmKHUhPT11KzApdGhyb3cgdTtZKDEsMCl9fVxuZnVuY3Rpb24gZmQoYSxiLGMsZCl7dmFyIGU9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCl9Y2F0Y2goZil7TyhlKTtpZihmIT09ZiswKXRocm93IGY7WSgxLDApfX1mdW5jdGlvbiBsZihhLGIsYyxkLGUsZixnLGgsayxsLG4sdSl7dmFyIHY9VygpO3RyeXtQKGEpKGIsYyxkLGUsZixnLGgsayxsLG4sdSl9Y2F0Y2gobSl7Tyh2KTtpZihtIT09bSswKXRocm93IG07WSgxLDApfX1mdW5jdGlvbiBRZChhLGIsYyxkLGUpe3ZhciBmPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSl9Y2F0Y2goZyl7TyhmKTtpZihnIT09ZyswKXRocm93IGc7WSgxLDApfX1mdW5jdGlvbiBrZShhKXt2YXIgYj1XKCk7dHJ5e3JldHVybiBQKGEpKCl9Y2F0Y2goYyl7TyhiKTtpZihjIT09YyswKXRocm93IGM7WSgxLDApO3JldHVybiAwbn19XG5mdW5jdGlvbiBNZChhLGIsYyxkLGUsZil7dmFyIGc9VygpO3RyeXtyZXR1cm4gUChhKShiLGMsZCxlLGYpfWNhdGNoKGgpe08oZyk7aWYoaCE9PWgrMCl0aHJvdyBoO1koMSwwKX19ZnVuY3Rpb24gd2QoYSxiLGMsZCxlLGYpe3ZhciBnPVcoKTt0cnl7cmV0dXJuIFAoYSkoYixjLGQsZSxmKX1jYXRjaChoKXtPKGcpO2lmKGghPT1oKzApdGhyb3cgaDtZKDEsMCl9fWZ1bmN0aW9uIGZmKGEsYixjLGQsZSxmLGcsaCxrLGwsbix1LHYsbSx3LHkpe3ZhciB6PVcoKTt0cnl7UChhKShiLGMsZCxlLGYsZyxoLGssbCxuLHUsdixtLHcseSl9Y2F0Y2goRCl7Tyh6KTtpZihEIT09RCswKXRocm93IEQ7WSgxLDApfX1mdW5jdGlvbiBrZChhLGIsYyl7dmFyIGQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMpfWNhdGNoKGUpe08oZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1koMSwwKX19XG5mdW5jdGlvbiBlZChhLGIsYyl7dmFyIGQ9VygpO3RyeXtyZXR1cm4gUChhKShiLGMpfWNhdGNoKGUpe08oZCk7aWYoZSE9PWUrMCl0aHJvdyBlO1koMSwwKX19ZnVuY3Rpb24gc2coKXt2YXIgYT1aO2E9T2JqZWN0LmFzc2lnbih7fSxhKTt2YXIgYj1kPT4oKT0+ZCgpPj4+MCxjPWQ9PmU9PmQoZSk+Pj4wO2EuX19lcnJub19sb2NhdGlvbj1iKGEuX19lcnJub19sb2NhdGlvbik7YS5sZT1iKGEubGUpO2EubWU9YyhhLm1lKTthLnBlPWMoYS5wZSk7YS5CZT1iKGEuQmUpO2EuRGU9YyhhLkRlKTtyZXR1cm4gYX1DLmtlZXBSdW50aW1lQWxpdmU9TWE7Qy53YXNtTWVtb3J5PXE7Qy5zdGFja0FsbG9jPWxjO0Muc3RhY2tTYXZlPVc7Qy5zdGFja1Jlc3RvcmU9TztDLlVURjhUb1N0cmluZz1iYjtDLnN0cmluZ1RvVVRGOD1DYjtDLmxlbmd0aEJ5dGVzVVRGOD1BYjtDLkV4aXRTdGF0dXM9WGE7Qy5QVGhyZWFkPU07dmFyIHRnO1BhPWZ1bmN0aW9uIHVnKCl7dGd8fHpnKCk7dGd8fChQYT11Zyl9O1xuZnVuY3Rpb24gemcoKXswPE5hfHwoRz8obGEoQyksR3x8a2IoSmEpLHN0YXJ0V29ya2VyKEMpKTooa2IoSWEpLDA8TmF8fHRnfHwodGc9ITAsQy5jYWxsZWRSdW49ITAsQ2F8fChHfHxrYihKYSksbGEoQyksR3x8a2IoS2EpKSkpKX16ZygpO1xuXG5cbiAgcmV0dXJuIG1vZHVsZUFyZy5yZWFkeVxufVxuXG4pO1xufSkoKTtcbmlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG4gIG1vZHVsZS5leHBvcnRzID0gb3J0V2FzbVRocmVhZGVkO1xuZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKVxuICBkZWZpbmUoW10sICgpID0+IG9ydFdhc21UaHJlYWRlZCk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7dmFyIE1vZHVsZT17fTt2YXIgRU5WSVJPTk1FTlRfSVNfTk9ERT10eXBlb2YgcHJvY2Vzcz09XCJvYmplY3RcIiYmdHlwZW9mIHByb2Nlc3MudmVyc2lvbnM9PVwib2JqZWN0XCImJnR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGU9PVwic3RyaW5nXCI7aWYoRU5WSVJPTk1FTlRfSVNfTk9ERSl7dmFyIG5vZGVXb3JrZXJUaHJlYWRzPXJlcXVpcmUoXCJ3b3JrZXJfdGhyZWFkc1wiKTt2YXIgcGFyZW50UG9ydD1ub2RlV29ya2VyVGhyZWFkcy5wYXJlbnRQb3J0O3BhcmVudFBvcnQub24oXCJtZXNzYWdlXCIsZGF0YT0+b25tZXNzYWdlKHtkYXRhOmRhdGF9KSk7dmFyIGZzPXJlcXVpcmUoXCJmc1wiKTtPYmplY3QuYXNzaWduKGdsb2JhbCx7c2VsZjpnbG9iYWwscmVxdWlyZTpyZXF1aXJlLE1vZHVsZTpNb2R1bGUsbG9jYXRpb246e2hyZWY6X19maWxlbmFtZX0sV29ya2VyOm5vZGVXb3JrZXJUaHJlYWRzLldvcmtlcixpbXBvcnRTY3JpcHRzOmY9PigwLGV2YWwpKGZzLnJlYWRGaWxlU3luYyhmLFwidXRmOFwiKStcIi8vIyBzb3VyY2VVUkw9XCIrZikscG9zdE1lc3NhZ2U6bXNnPT5wYXJlbnRQb3J0LnBvc3RNZXNzYWdlKG1zZykscGVyZm9ybWFuY2U6Z2xvYmFsLnBlcmZvcm1hbmNlfHx7bm93OkRhdGUubm93fX0pfXZhciBpbml0aWFsaXplZEpTPWZhbHNlO2Z1bmN0aW9uIHRocmVhZFByaW50RXJyKCl7dmFyIHRleHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKFwiIFwiKTtpZihFTlZJUk9OTUVOVF9JU19OT0RFKXtmcy53cml0ZVN5bmMoMix0ZXh0K1wiXFxuXCIpO3JldHVybn1jb25zb2xlLmVycm9yKHRleHQpfWZ1bmN0aW9uIHRocmVhZEFsZXJ0KCl7dmFyIHRleHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKFwiIFwiKTtwb3N0TWVzc2FnZSh7Y21kOlwiYWxlcnRcIix0ZXh0OnRleHQsdGhyZWFkSWQ6TW9kdWxlW1wiX3B0aHJlYWRfc2VsZlwiXSgpfSl9dmFyIGVycj10aHJlYWRQcmludEVycjtzZWxmLmFsZXJ0PXRocmVhZEFsZXJ0O01vZHVsZVtcImluc3RhbnRpYXRlV2FzbVwiXT0oaW5mbyxyZWNlaXZlSW5zdGFuY2UpPT57dmFyIG1vZHVsZT1Nb2R1bGVbXCJ3YXNtTW9kdWxlXCJdO01vZHVsZVtcIndhc21Nb2R1bGVcIl09bnVsbDt2YXIgaW5zdGFuY2U9bmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG1vZHVsZSxpbmZvKTtyZXR1cm4gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlKX07c2VsZi5vbnVuaGFuZGxlZHJlamVjdGlvbj1lPT57dGhyb3cgZS5yZWFzb258fGV9O2Z1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZSl7dHJ5e2lmKGUuZGF0YS5jbWQ9PT1cImxvYWRcIil7bGV0IG1lc3NhZ2VRdWV1ZT1bXTtzZWxmLm9ubWVzc2FnZT1lPT5tZXNzYWdlUXVldWUucHVzaChlKTtzZWxmLnN0YXJ0V29ya2VyPWluc3RhbmNlPT57TW9kdWxlPWluc3RhbmNlO3Bvc3RNZXNzYWdlKHtcImNtZFwiOlwibG9hZGVkXCJ9KTtmb3IobGV0IG1zZyBvZiBtZXNzYWdlUXVldWUpe2hhbmRsZU1lc3NhZ2UobXNnKX1zZWxmLm9ubWVzc2FnZT1oYW5kbGVNZXNzYWdlfTtNb2R1bGVbXCJ3YXNtTW9kdWxlXCJdPWUuZGF0YS53YXNtTW9kdWxlO2Zvcihjb25zdCBoYW5kbGVyIG9mIGUuZGF0YS5oYW5kbGVycyl7TW9kdWxlW2hhbmRsZXJdPSguLi5hcmdzKT0+e3Bvc3RNZXNzYWdlKHtjbWQ6XCJjYWxsSGFuZGxlclwiLGhhbmRsZXI6aGFuZGxlcixhcmdzOmFyZ3N9KX19TW9kdWxlW1wid2FzbU1lbW9yeVwiXT1lLmRhdGEud2FzbU1lbW9yeTtNb2R1bGVbXCJidWZmZXJcIl09TW9kdWxlW1wid2FzbU1lbW9yeVwiXS5idWZmZXI7TW9kdWxlW1wiRU5WSVJPTk1FTlRfSVNfUFRIUkVBRFwiXT10cnVlO2lmKHR5cGVvZiBlLmRhdGEudXJsT3JCbG9iPT1cInN0cmluZ1wiKXtpbXBvcnRTY3JpcHRzKGUuZGF0YS51cmxPckJsb2IpfWVsc2V7dmFyIG9iamVjdFVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKGUuZGF0YS51cmxPckJsb2IpO2ltcG9ydFNjcmlwdHMob2JqZWN0VXJsKTtVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCl9b3J0V2FzbVRocmVhZGVkKE1vZHVsZSl9ZWxzZSBpZihlLmRhdGEuY21kPT09XCJydW5cIil7TW9kdWxlW1wiX19lbXNjcmlwdGVuX3RocmVhZF9pbml0XCJdKGUuZGF0YS5wdGhyZWFkX3B0ciwvKmlzX21haW49Ki8wLC8qaXNfcnVudGltZT0qLzAsLypjYW5fYmxvY2s9Ki8xKTtNb2R1bGVbXCJfX2Vtc2NyaXB0ZW5fdGhyZWFkX21haWxib3hfYXdhaXRcIl0oZS5kYXRhLnB0aHJlYWRfcHRyKTtNb2R1bGVbXCJlc3RhYmxpc2hTdGFja1NwYWNlXCJdKCk7TW9kdWxlW1wiUFRocmVhZFwiXS5yZWNlaXZlT2JqZWN0VHJhbnNmZXIoZS5kYXRhKTtNb2R1bGVbXCJQVGhyZWFkXCJdLnRocmVhZEluaXRUTFMoKTtpZighaW5pdGlhbGl6ZWRKUyl7TW9kdWxlW1wiX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5nc1wiXSgpO2luaXRpYWxpemVkSlM9dHJ1ZX10cnl7TW9kdWxlW1wiaW52b2tlRW50cnlQb2ludFwiXShlLmRhdGEuc3RhcnRfcm91dGluZSxlLmRhdGEuYXJnKX1jYXRjaChleCl7aWYoZXghPVwidW53aW5kXCIpe3Rocm93IGV4fX19ZWxzZSBpZihlLmRhdGEuY21kPT09XCJjYW5jZWxcIil7aWYoTW9kdWxlW1wiX3B0aHJlYWRfc2VsZlwiXSgpKXtNb2R1bGVbXCJfX2Vtc2NyaXB0ZW5fdGhyZWFkX2V4aXRcIl0oLTEpfX1lbHNlIGlmKGUuZGF0YS50YXJnZXQ9PT1cInNldGltbWVkaWF0ZVwiKXt9ZWxzZSBpZihlLmRhdGEuY21kPT09XCJjaGVja01haWxib3hcIil7aWYoaW5pdGlhbGl6ZWRKUyl7TW9kdWxlW1wiY2hlY2tNYWlsYm94XCJdKCl9fWVsc2UgaWYoZS5kYXRhLmNtZCl7ZXJyKGB3b3JrZXIuanMgcmVjZWl2ZWQgdW5rbm93biBjb21tYW5kICR7ZS5kYXRhLmNtZH1gKTtlcnIoZS5kYXRhKX19Y2F0Y2goZXgpe2lmKE1vZHVsZVtcIl9fZW1zY3JpcHRlbl90aHJlYWRfY3Jhc2hlZFwiXSl7TW9kdWxlW1wiX19lbXNjcmlwdGVuX3RocmVhZF9jcmFzaGVkXCJdKCl9dGhyb3cgZXh9fXNlbGYub25tZXNzYWdlPWhhbmRsZU1lc3NhZ2U7XG4iLCAiZXhwb3J0IGNvbnN0IGpvaW4gPSB1bmRlZmluZWQ7IiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQge0Vudn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtPcnRXYXNtTW9kdWxlfSBmcm9tICcuL2JpbmRpbmcvb3J0LXdhc20nO1xuaW1wb3J0IHtPcnRXYXNtVGhyZWFkZWRNb2R1bGV9IGZyb20gJy4vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cbmxldCBvcnRXYXNtRmFjdG9yeTogRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT47XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HKSB7XG4gIG9ydFdhc21GYWN0b3J5ID0gcmVxdWlyZSgnLi9iaW5kaW5nL29ydC10cmFpbmluZy13YXNtLXNpbWQuanMnKTtcbn0gZWxzZSB7XG4gIG9ydFdhc21GYWN0b3J5ID1cbiAgICAgIEJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgPyByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20uanMnKSA6IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS1zaW1kLmpzZXAuanMnKTtcbn1cblxuY29uc3Qgb3J0V2FzbUZhY3RvcnlUaHJlYWRlZDogRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT4gPSAhQlVJTERfREVGUy5ESVNBQkxFX1dBU01fVEhSRUFEID9cbiAgICAoQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSA/IHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS10aHJlYWRlZC5qcycpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vYmluZGluZy9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAuanMnKSkgOlxuICAgIG9ydFdhc21GYWN0b3J5O1xuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG5cbmxldCB3YXNtOiBPcnRXYXNtTW9kdWxlfHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuY29uc3QgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBJZiAnU2hhcmVkQXJyYXlCdWZmZXInIGlzIG5vdCBhdmFpbGFibGUsIFdlYkFzc2VtYmx5IHRocmVhZHMgd2lsbCBub3Qgd29yay5cbiAgICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRlc3QgZm9yIHRyYW5zZmVyYWJpbGl0eSBvZiBTQUJzIChmb3IgYnJvd3NlcnMuIG5lZWRlZCBmb3IgRmlyZWZveClcbiAgICAvLyBodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2ZvcnVtLyMhbXNnL21vemlsbGEuZGV2LnBsYXRmb3JtL0lIa0JabEhFVHBBL2R3c01OY2hXRVFBSlxuICAgIGlmICh0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBuZXcgTWVzc2FnZUNoYW5uZWwoKS5wb3J0MS5wb3N0TWVzc2FnZShuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMSkpO1xuICAgIH1cblxuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IHRocmVhZHMgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyB0aHJlYWRlZCBpbnN0cnVjdGlvbnMuXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgIDAsICAwLCAxLCA0LCAxLCAgOTYsIDAsICAgMCwgIDMsIDIsIDEsICAwLCA1LFxuICAgICAgNCwgMSwgIDMsICAgMSwgICAxLCAxMCwgMTEsIDEsIDksIDAsIDY1LCAwLCAgMjU0LCAxNiwgMiwgMCwgMjYsIDExXG4gICAgXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBpc1NpbWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIFNJTUQgaW5zdHJ1Y3Rpb25zLlxuXG4gICAgLy8gVGhlIGJpbmFyeSBkYXRhIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSBieSB3YXQyd2FzbTpcbiAgICAvL1xuICAgIC8vIChtb2R1bGVcbiAgICAvLyAgICh0eXBlICR0MCAoZnVuYykpXG4gICAgLy8gICAoZnVuYyAkZjAgKHR5cGUgJHQwKVxuICAgIC8vICAgICAoZHJvcFxuICAgIC8vICAgICAgIChpMzJ4NC5kb3RfaTE2eDhfc1xuICAgIC8vICAgICAgICAgKGk4eDE2LnNwbGF0XG4gICAgLy8gICAgICAgICAgIChpMzIuY29uc3QgMCkpXG4gICAgLy8gICAgICAgICAodjEyOC5jb25zdCBpMzJ4NCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwKSkpKSlcblxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAwLCAgIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDEwLCAzMCwgMSwgICAyOCwgIDAsIDY1LCAwLFxuICAgICAgMjUzLCAxNSwgMjUzLCAxMiwgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgIDI1MywgMTg2LCAxLCAyNiwgMTFcbiAgICBdKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGdldFdhc21GaWxlTmFtZSA9ICh1c2VTaW1kOiBib29sZWFuLCB1c2VUaHJlYWRzOiBib29sZWFuKSA9PiB7XG4gIGlmICh1c2VTaW1kKSB7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcpIHtcbiAgICAgIHJldHVybiAnb3J0LXRyYWluaW5nLXdhc20tc2ltZC53YXNtJztcbiAgICB9XG4gICAgcmV0dXJuIHVzZVRocmVhZHMgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJyA6ICdvcnQtd2FzbS1zaW1kLndhc20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1c2VUaHJlYWRzID8gJ29ydC13YXNtLXRocmVhZGVkLndhc20nIDogJ29ydC13YXNtLndhc20nO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5ID0gYXN5bmMoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdWx0aXBsZSBjYWxscyB0byBcXCdpbml0aWFsaXplV2ViQXNzZW1ibHkoKVxcJyBkZXRlY3RlZC4nKTtcbiAgfVxuICBpZiAoYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgY2FsbCB0byBcXCdpbml0aWFsaXplV2ViQXNzZW1ibHkoKVxcJyBmYWlsZWQuJyk7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIC8vIHdhc20gZmxhZ3MgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgY29uc3QgdGltZW91dCA9IGZsYWdzLmluaXRUaW1lb3V0ITtcbiAgY29uc3QgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xuICBjb25zdCBzaW1kID0gZmxhZ3Muc2ltZCE7XG5cbiAgY29uc3QgdXNlVGhyZWFkcyA9IG51bVRocmVhZHMgPiAxICYmIGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcbiAgY29uc3QgdXNlU2ltZCA9IHNpbWQgJiYgaXNTaW1kU3VwcG9ydGVkKCk7XG5cbiAgY29uc3Qgd2FzbVBhdGhzID0gZmxhZ3Mud2FzbVBhdGhzO1xuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgd2FzbUZpbGVOYW1lID0gZ2V0V2FzbUZpbGVOYW1lKHVzZVNpbWQsIHVzZVRocmVhZHMpO1xuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlID0gdHlwZW9mIHdhc21QYXRocyA9PT0gJ29iamVjdCcgPyB3YXNtUGF0aHNbd2FzbUZpbGVOYW1lXSA6IHVuZGVmaW5lZDtcblxuICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG5cbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XG5cbiAgLy8gcHJvbWlzZSBmb3IgdGltZW91dFxuICBpZiAodGltZW91dCA+IDApIHtcbiAgICB0YXNrcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgfSkpO1xuICB9XG5cbiAgLy8gcHJvbWlzZSBmb3IgbW9kdWxlIGluaXRpYWxpemF0aW9uXG4gIHRhc2tzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB1c2VUaHJlYWRzID8gb3J0V2FzbUZhY3RvcnlUaHJlYWRlZCA6IG9ydFdhc21GYWN0b3J5O1xuICAgIGNvbnN0IGNvbmZpZzogUGFydGlhbDxPcnRXYXNtTW9kdWxlPiA9IHtcbiAgICAgIGxvY2F0ZUZpbGU6IChmaWxlTmFtZTogc3RyaW5nLCBzY3JpcHREaXJlY3Rvcnk6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1RIUkVBRCAmJiB1c2VUaHJlYWRzICYmIGZpbGVOYW1lLmVuZHNXaXRoKCcud29ya2VyLmpzJykgJiZcbiAgICAgICAgICAgIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlKCkgZnVuY3Rpb24gaXMgaGFuZGxlZCBieSBlc2J1aWxkIHBsdWdpbiB0byBsb2FkIGZpbGUgY29udGVudCBhcyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHNcbiAgICAgICAgICAgICAgICByZXF1aXJlKCcuL2JpbmRpbmcvb3J0LXdhc20tdGhyZWFkZWQud29ya2VyLmpzJylcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAge3R5cGU6ICd0ZXh0L2phdmFzY3JpcHQnfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbGVOYW1lLmVuZHNXaXRoKCcud2FzbScpKSB7XG4gICAgICAgICAgaWYgKHdhc21QYXRoT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB3YXNtUGF0aE92ZXJyaWRlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByZWZpeCA9IHdhc21QcmVmaXhPdmVycmlkZSA/PyBzY3JpcHREaXJlY3Rvcnk7XG5cbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgICAgIGlmICh3YXNtRmlsZU5hbWUgPT09ICdvcnQtd2FzbS1zaW1kLndhc20nKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyAnb3J0LXdhc20tc2ltZC5qc2VwLndhc20nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3YXNtRmlsZU5hbWUgPT09ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcmVmaXggKyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLndhc20nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwcmVmaXggKyB3YXNtRmlsZU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2NyaXB0RGlyZWN0b3J5ICsgZmlsZU5hbWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fVEhSRUFEICYmIHVzZVRocmVhZHMpIHtcbiAgICAgIGlmICh0eXBlb2YgQmxvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uZmlnLm1haW5TY3JpcHRVcmxPckJsb2IgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnb3J0LXdhc20tdGhyZWFkZWQuanMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdFNvdXJjZUNvZGUgPSBgdmFyIG9ydFdhc21UaHJlYWRlZD0ke2ZhY3RvcnkudG9TdHJpbmcoKX07YDtcbiAgICAgICAgY29uZmlnLm1haW5TY3JpcHRVcmxPckJsb2IgPSBuZXcgQmxvYihbc2NyaXB0U291cmNlQ29kZV0sIHt0eXBlOiAndGV4dC9qYXZhc2NyaXB0J30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZhY3RvcnkoY29uZmlnKS50aGVuKFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcbiAgICAgICAgbW9kdWxlID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHdhc20gbW9kdWxlIGZhaWxlZCB0byBpbml0aWFsaXplXG4gICAgICAgICh3aGF0KSA9PiB7XG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgICAgcmVqZWN0KHdoYXQpO1xuICAgICAgICB9KTtcbiAgfSkpO1xuXG4gIGF3YWl0IFByb21pc2UucmFjZSh0YXNrcyk7XG5cbiAgaWYgKGlzVGltZW91dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV2ViQXNzZW1ibHkgYmFja2VuZCBpbml0aWFsaXppbmcgZmFpbGVkIGR1ZSB0byB0aW1lb3V0OiAke3RpbWVvdXR9bXNgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgd2FzbSkge1xuICAgIHJldHVybiB3YXNtO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3QgaW5pdGlhbGl6ZWQgeWV0LicpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc3Bvc2UgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XG4gICAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAgICh3YXNtIGFzIE9ydFdhc21UaHJlYWRlZE1vZHVsZSkuUFRocmVhZD8udGVybWluYXRlQWxsVGhyZWFkcygpO1xuICAgIHdhc20gPSB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIGFib3J0ZWQgPSB0cnVlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5cbmV4cG9ydCBjb25zdCBhbGxvY1dhc21TdHJpbmcgPSAoZGF0YTogc3RyaW5nLCBhbGxvY3M6IG51bWJlcltdKTogbnVtYmVyID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3QgZGF0YUxlbmd0aCA9IHdhc20ubGVuZ3RoQnl0ZXNVVEY4KGRhdGEpICsgMTtcbiAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhkYXRhTGVuZ3RoKTtcbiAgd2FzbS5zdHJpbmdUb1VURjgoZGF0YSwgZGF0YU9mZnNldCwgZGF0YUxlbmd0aCk7XG4gIGFsbG9jcy5wdXNoKGRhdGFPZmZzZXQpO1xuXG4gIHJldHVybiBkYXRhT2Zmc2V0O1xufTtcblxuaW50ZXJmYWNlIEV4dHJhT3B0aW9uc0hhbmRsZXIge1xuICAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IGl0ZXJhdGVFeHRyYU9wdGlvbnMgPVxuICAgIChvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgcHJlZml4OiBzdHJpbmcsIHNlZW46IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+LFxuICAgICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyKTogdm9pZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoc2Vlbi5oYXMob3B0aW9ucykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBpbiBvcHRpb25zJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Vlbi5hZGQob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAocHJlZml4KSA/IHByZWZpeCArIGtleSA6IGtleTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBuYW1lICsgJy4nLCBzZWVuLCBoYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgaGFuZGxlcihuYW1lLCAodmFsdWUpID8gJzEnIDogJzAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGhhbmRsZSBleHRyYSBjb25maWcgdHlwZTogJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbi8qKlxuICogY2hlY2sgd2ViIGFzc2VtYmx5IEFQSSdzIGxhc3QgZXJyb3IgYW5kIHRocm93IGVycm9yIGlmIGFueSBlcnJvciBvY2N1cnJlZC5cbiAqIEBwYXJhbSBtZXNzYWdlIGEgbWVzc2FnZSB1c2VkIHdoZW4gYW4gZXJyb3Igb2NjdXJyZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBjaGVja0xhc3RFcnJvciA9IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IHBhcmFtc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg4KTtcbiAgICB3YXNtLl9PcnRHZXRMYXN0RXJyb3IocGFyYW1zT2Zmc2V0LCBwYXJhbXNPZmZzZXQgKyA0KTtcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLkhFQVAzMltwYXJhbXNPZmZzZXQgLyA0XTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VQb2ludGVyID0gd2FzbS5IRUFQVTMyW3BhcmFtc09mZnNldCAvIDQgKyAxXTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2VQb2ludGVyID8gd2FzbS5VVEY4VG9TdHJpbmcoZXJyb3JNZXNzYWdlUG9pbnRlcikgOiAnJztcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bWVzc2FnZX0gRVJST1JfQ09ERTogJHtlcnJvckNvZGV9LCBFUlJPUl9NRVNTQUdFOiAke2Vycm9yTWVzc2FnZX1gKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5leHBvcnQgY29uc3Qgc2V0UnVuT3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJbXV0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgcnVuT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB0cnkge1xuICAgIGlmIChvcHRpb25zPy5sb2dTZXZlcml0eUxldmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA9IDI7ICAvLyBEZWZhdWx0IHRvIHdhcm5pbmdcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwpIHx8XG4gICAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgc2VydmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmxvZ1ZlcmJvc2l0eUxldmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPSAwOyAgLy8gRGVmYXVsdCB0byAwXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMudGVybWluYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHRhZ0RhdGFPZmZzZXQgPSAwO1xuICAgIGlmIChvcHRpb25zPy50YWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcbiAgICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsISwgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCEsICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLCB0YWdEYXRhT2Zmc2V0KTtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIHJ1biBvcHRpb25zLicpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKG9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhrZXksIGFsbG9jcyk7XG4gICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWx1ZSwgYWxsb2NzKTtcblxuICAgICAgICBpZiAod2FzbS5fT3J0QWRkUnVuQ29uZmlnRW50cnkocnVuT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBydW4gY29uZmlnIGVudHJ5OiAke2tleX0gLSAke3ZhbHVlfS5gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtydW5PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnN9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmNvbnN0IGdldEdyYXBoT3B0aW16YXRpb25MZXZlbCA9IChncmFwaE9wdGltaXphdGlvbkxldmVsOiBzdHJpbmd8dW5rbm93bik6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCkge1xuICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2V4dGVuZGVkJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gOTk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEV4ZWN1dGlvbk1vZGUgPSAoZXhlY3V0aW9uTW9kZTogJ3NlcXVlbnRpYWwnfCdwYXJhbGxlbCcpOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGV4ZWN1dGlvbk1vZGUpIHtcbiAgICBjYXNlICdzZXF1ZW50aWFsJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ3BhcmFsbGVsJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGV4ZWN1dGlvbiBtb2RlOiAke2V4ZWN1dGlvbk1vZGV9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGFwcGVuZERlZmF1bHRPcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiB2b2lkID0+IHtcbiAgaWYgKCFvcHRpb25zLmV4dHJhKSB7XG4gICAgb3B0aW9ucy5leHRyYSA9IHt9O1xuICB9XG4gIGlmICghb3B0aW9ucy5leHRyYS5zZXNzaW9uKSB7XG4gICAgb3B0aW9ucy5leHRyYS5zZXNzaW9uID0ge307XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbiA9IG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBpZiAoIXNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkgPSAnMSc7XG4gIH1cblxuICAvLyBpZiB1c2luZyBKU0VQIHdpdGggV2ViR1BVLCBhbHdheXMgZGlzYWJsZSBtZW1vcnkgcGF0dGVyblxuICBpZiAob3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgJiZcbiAgICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLnNvbWUoZXAgPT4gKHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWUpID09PSAnd2ViZ3B1JykpIHtcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID1cbiAgICAoc2Vzc2lvbk9wdGlvbnNIYW5kbGU6IG51bWJlciwgZXhlY3V0aW9uUHJvdmlkZXJzOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLkV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW10sXG4gICAgIGFsbG9jczogbnVtYmVyW10pOiB2b2lkID0+IHtcbiAgICAgIGZvciAoY29uc3QgZXAgb2YgZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xuXG4gICAgICAgIC8vIGNoZWNrIEVQIG5hbWVcbiAgICAgICAgc3dpdGNoIChlcE5hbWUpIHtcbiAgICAgICAgICBjYXNlICd4bm5wYWNrJzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdYTk5QQUNLJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dlYm5uJzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb25zdCB3ZWJubk9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICAgIGlmICh3ZWJubk9wdGlvbnM/LmRldmljZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdkZXZpY2VUeXBlJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2Vibm5PcHRpb25zLmRldmljZVR5cGUsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZGV2aWNlVHlwZScgLSAke3dlYm5uT3B0aW9ucy5kZXZpY2VUeXBlfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHdlYm5uT3B0aW9ucz8ubnVtVGhyZWFkcykge1xuICAgICAgICAgICAgICAgIGxldCBudW1UaHJlYWRzID0gd2Vibm5PcHRpb25zLm51bVRocmVhZHM7XG4gICAgICAgICAgICAgICAgLy8gSnVzdCBpZ25vcmUgaW52YWxpZCB3ZWJubk9wdGlvbnMubnVtVGhyZWFkcy5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bVRocmVhZHMgIT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIobnVtVGhyZWFkcykgfHwgbnVtVGhyZWFkcyA8IDApIHtcbiAgICAgICAgICAgICAgICAgIG51bVRocmVhZHMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdudW1UaHJlYWRzJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobnVtVGhyZWFkcy50b1N0cmluZygpLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ251bVRocmVhZHMnIC0gJHt3ZWJubk9wdGlvbnMubnVtVGhyZWFkc30uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh3ZWJubk9wdGlvbnM/LnBvd2VyUHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ3Bvd2VyUHJlZmVyZW5jZScsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYm5uT3B0aW9ucy5wb3dlclByZWZlcmVuY2UsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncG93ZXJQcmVmZXJlbmNlJyAtICR7d2Vibm5PcHRpb25zLnBvd2VyUHJlZmVyZW5jZX0uYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3ZWJncHUnOlxuICAgICAgICAgICAgZXBOYW1lID0gJ0pTJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucz8ucHJlZmVycmVkTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcmVmZXJyZWRMYXlvdXQgbXVzdCBiZSBlaXRoZXIgJ05DSFcnIG9yICdOSFdDJzogJHt3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncHJlZmVycmVkTGF5b3V0JywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcod2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT1cbiAgICAgICAgICAgICAgICAgICAgMCkge1xuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncHJlZmVycmVkTGF5b3V0JyAtICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2FzbSc6XG4gICAgICAgICAgY2FzZSAnY3B1JzpcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVwTmFtZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoZXBOYW1lLCBhbGxvY3MpO1xuICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXIoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGVwTmFtZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFwcGVuZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBjb25zdCBzZXRTZXNzaW9uT3B0aW9ucyA9IChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBhcHBlbmREZWZhdWx0T3B0aW9ucyhzZXNzaW9uT3B0aW9ucyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBncmFwaE9wdGltaXphdGlvbkxldmVsID0gZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsKHNlc3Npb25PcHRpb25zLmdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPz8gJ2FsbCcpO1xuICAgIGNvbnN0IGV4ZWN1dGlvbk1vZGUgPSBnZXRFeGVjdXRpb25Nb2RlKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvbk1vZGUgPz8gJ3NlcXVlbnRpYWwnKTtcbiAgICBjb25zdCBsb2dJZERhdGFPZmZzZXQgPVxuICAgICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcblxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7ICAvLyBEZWZhdWx0IHRvIDIgLSB3YXJuaW5nXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1NldmVyaXR5TGV2ZWwpIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXJ2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9nVmVyYm9zaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA/PyAwOyAgLy8gRGVmYXVsdCB0byAwIC0gdmVyYm9zZVxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dWZXJib3NpdHlMZXZlbCkgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPCAwIHx8IGxvZ1ZlcmJvc2l0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0ID0gdHlwZW9mIHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGggPT09ICdzdHJpbmcnID9cbiAgICAgICAgYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGgsIGFsbG9jcykgOlxuICAgICAgICAwO1xuXG4gICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uT3B0aW9ucyhcbiAgICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCwgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVDcHVNZW1BcmVuYSwgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVNZW1QYXR0ZXJuLCBleGVjdXRpb25Nb2RlLFxuICAgICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZVByb2ZpbGluZywgMCwgbG9nSWREYXRhT2Zmc2V0LCBsb2dTZXZlcml0eUxldmVsLCBsb2dWZXJib3NpdHlMZXZlbCxcbiAgICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCk7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLicpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgIHNldEV4ZWN1dGlvblByb3ZpZGVycyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2XG59XG5cbi8qKlxuICogTWFwIHN0cmluZyB0ZW5zb3IgZGF0YSB0byBlbnVtIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSA9ICh0eXBlOiBzdHJpbmcpOiBEYXRhVHlwZSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ludDgnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDg7XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ4O1xuICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmJvb2w7XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDE2O1xuICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDE2O1xuICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQzMjtcbiAgICBjYXNlICd1aW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQzMjtcbiAgICBjYXNlICdmbG9hdDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDE2O1xuICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0O1xuICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmRvdWJsZTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnN0cmluZztcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50NjQ7XG4gICAgY2FzZSAndWludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50NjQ7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgZW51bSB2YWx1ZSB0byBzdHJpbmcgdGVuc29yIGRhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nID0gKHR5cGVQcm90bzogRGF0YVR5cGUpOiBUZW5zb3IuVHlwZSA9PiB7XG4gIHN3aXRjaCAodHlwZVByb3RvKSB7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ4OlxuICAgICAgcmV0dXJuICdpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ4OlxuICAgICAgcmV0dXJuICd1aW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS5ib29sOlxuICAgICAgcmV0dXJuICdib29sJztcbiAgICBjYXNlIERhdGFUeXBlLmludDE2OlxuICAgICAgcmV0dXJuICdpbnQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MTY6XG4gICAgICByZXR1cm4gJ3VpbnQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQzMjpcbiAgICAgIHJldHVybiAnaW50MzInO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDMyOlxuICAgICAgcmV0dXJuICd1aW50MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQxNjpcbiAgICAgIHJldHVybiAnZmxvYXQxNic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDpcbiAgICAgIHJldHVybiAnZmxvYXQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5kb3VibGU6XG4gICAgICByZXR1cm4gJ2Zsb2F0NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUuc3RyaW5nOlxuICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50NjQ6XG4gICAgICByZXR1cm4gJ2ludDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ2NDpcbiAgICAgIHJldHVybiAndWludDY0JztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlUHJvdG99YCk7XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IHRlbnNvciBlbGVtZW50IHNpemUgaW4gYnl0ZXMgYnkgdGhlIGdpdmVuIGRhdGEgdHlwZVxuICogQHJldHVybnMgc2l6ZSBpbiBpbnRlZ2VyIG9yIHVuZGVmaW5lZCBpZiB0aGUgZGF0YSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRlbnNvckVsZW1lbnRTaXplID0gKGRhdGVUeXBlOiBudW1iZXIpOiBudW1iZXJ8XG4gICAgdW5kZWZpbmVkID0+IFt1bmRlZmluZWQsIDQsIDEsIDEsIDIsIDIsIDQsIDgsIHVuZGVmaW5lZCwgMSwgMiwgOCwgNCwgOCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1bZGF0ZVR5cGVdO1xuXG4vKipcbiAqIGdldCB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciBieSB0aGUgZ2l2ZW4gdGVuc29yIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFxuICAgIFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IgPT4ge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheTtcbiAgICAgICAgY2FzZSAndWludDgnOlxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICBjYXNlICdpbnQ4JzpcbiAgICAgICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgICAgICBjYXNlICd1aW50MTYnOlxuICAgICAgICAgIHJldHVybiBVaW50MTZBcnJheTtcbiAgICAgICAgY2FzZSAnaW50MTYnOlxuICAgICAgICAgIHJldHVybiBJbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdpbnQzMic6XG4gICAgICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xuICAgICAgICBjYXNlICd1aW50MzInOlxuICAgICAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnaW50NjQnOlxuICAgICAgICAgIHJldHVybiBCaWdJbnQ2NEFycmF5O1xuICAgICAgICBjYXNlICd1aW50NjQnOlxuICAgICAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgIH1cbiAgICB9O1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgbG9nIGxldmVsIHRvIGludGVnZXIgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGxvZ0xldmVsU3RyaW5nVG9FbnVtID0gKGxvZ0xldmVsPzogJ3ZlcmJvc2UnfCdpbmZvJ3wnd2FybmluZyd8J2Vycm9yJ3wnZmF0YWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2ZhdGFsJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9PiB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgICB0eXBlID09PSAnaW50MzInIHx8IHR5cGUgPT09ICdpbnQ2NCcgfHwgdHlwZSA9PT0gJ2Jvb2wnIHx8IHR5cGUgPT09ICdmbG9hdDE2JyB8fCB0eXBlID09PSAndWludDMyJztcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtID0gKGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbnx1bmRlZmluZWQgPT5cbiAgICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlciddIGFzIGNvbnN0KVtsb2NhdGlvbl07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7U2VyaWFsaXphYmxlTW9kZWxkYXRhLCBTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGEsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhLCBUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQge3NldFJ1bk9wdGlvbnN9IGZyb20gJy4vcnVuLW9wdGlvbnMnO1xuaW1wb3J0IHtzZXRTZXNzaW9uT3B0aW9uc30gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xuaW1wb3J0IHtkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0sIGdldFRlbnNvckVsZW1lbnRTaXplLCBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsIGxvZ0xldmVsU3RyaW5nVG9FbnVtLCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZywgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0sIHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcn0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3J9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbi8qKlxuICogZ2V0IHRoZSBpbnB1dC9vdXRwdXQgY291bnQgb2YgdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0gc2Vzc2lvbkhhbmRsZSB0aGUgaGFuZGxlIHJlcHJlc2VudGluZyB0aGUgc2Vzc2lvbi4gc2hvdWxkIGJlIG5vbi16ZXJvLlxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXG4gKi9cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dENvdW50ID0gKHNlc3Npb25IYW5kbGU6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlLCBkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgNCk7XG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LicpO1xuICAgIH1cbiAgICByZXR1cm4gW3dhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0XSwgd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDQgKyAxXV07XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBpbml0aWFsaXplIG9ubnhydW50aW1lLicpO1xuICB9XG59O1xuXG4vKipcbiAqIGludGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXQgT1JUXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgIC8vIGluaXQgSlNFUCBpZiBhdmFpbGFibGVcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XG4gICAgYXdhaXQgaW5pdEpzZXAoZ2V0SW5zdGFuY2UoKSwgZW52KTtcbiAgfVxufTtcblxuLyoqXG4gKiB2YWxpZCBkYXRhIGxvY2F0aW9ucyBmb3IgaW5wdXQvb3V0cHV0IHRlbnNvcnMuXG4gKi9cbnR5cGUgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXQgPSAnY3B1J3wnY3B1LXBpbm5lZCd8J2dwdS1idWZmZXInO1xuXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xuICAvKipcbiAgICogdGhlIGhhbmRsZSBvZiBJTyBiaW5kaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICpcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJy5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogcmVhZG9ubHkgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXTtcblxuICAvKipcbiAgICogZW51bSB2YWx1ZSBvZiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiByZWFkb25seSBudW1iZXJbXTtcbn07XG5cbi8qKlxuICogIHR1cGxlIGVsZW1lbnRzIGFyZTogSW5mZXJlbmNlU2Vzc2lvbiBJRDsgaW5wdXROYW1lc1VURjhFbmNvZGVkOyBvdXRwdXROYW1lc1VURjhFbmNvZGVkOyBiaW5kaW5nU3RhdGVcbiAqL1xudHlwZSBTZXNzaW9uTWV0YWRhdGEgPSBbXG4gIGluZmVyZW5jZVNlc3Npb25JZDogbnVtYmVyLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZXxudWxsXG5dO1xuXG5jb25zdCBhY3RpdmVTZXNzaW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBTZXNzaW9uTWV0YWRhdGE+KCk7XG5cbi8qKlxuICogYWxsb2NhdGUgdGhlIG1lbW9yeSBhbmQgbWVtY3B5IHRoZSBtb2RlbCBieXRlcywgcHJlcGFyaW5nIGZvciBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBJbmZlcmVuY2VTZXNzaW9uLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb25BbGxvY2F0ZSA9IChtb2RlbDogVWludDhBcnJheSk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgbW9kZWxEYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKG1vZGVsLmJ5dGVMZW5ndGgpO1xuICBpZiAobW9kZWxEYXRhT2Zmc2V0ID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLiBmYWlsZWQgdG8gYWxsb2NhdGUgYSBidWZmZXIgb2Ygc2l6ZSAke21vZGVsLmJ5dGVMZW5ndGh9LmApO1xuICB9XG4gIHdhc20uSEVBUFU4LnNldChtb2RlbCwgbW9kZWxEYXRhT2Zmc2V0KTtcbiAgcmV0dXJuIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsLmJ5dGVMZW5ndGhdO1xufTtcblxuLyoqXG4gKiBjcmVhdGUgYW4gaW5mZXJlbmNlIHNlc3Npb24gdXNpbmcgdGhlIHByZXBhcmVkIGJ1ZmZlciBjb250YWluaW5nIHRoZSBtb2RlbCBkYXRhLlxuICogQHBhcmFtIG1vZGVsRGF0YSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YSBidWZmZXIuXG4gKiBAcGFyYW0gb3B0aW9ucyBhbiBvcHRpb25hbCBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSAzLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgW3Nlc3Npb24gaGFuZGxlLCBpbnB1dCBuYW1lcywgb3V0cHV0IG5hbWVzXVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbkZpbmFsaXplID1cbiAgICAobW9kZWxEYXRhOiBTZXJpYWxpemFibGVNb2RlbGRhdGEsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gICAgICBsZXQgc2Vzc2lvbkhhbmRsZSA9IDA7XG4gICAgICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICAgICAgbGV0IGlvQmluZGluZ0hhbmRsZSA9IDA7XG4gICAgICBsZXQgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XG4gICAgICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gW107XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXSA9IHNldFNlc3Npb25PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlc3Npb25IYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YVswXSwgbW9kZWxEYXRhWzFdLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgICAgIGlmIChzZXNzaW9uSGFuZGxlID09PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIGEgc2Vzc2lvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IFtpbnB1dENvdW50LCBvdXRwdXRDb3VudF0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlKTtcblxuICAgICAgICBjb25zdCBpbnB1dE5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG91dHB1dE5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRJbnB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICAgICAgaWYgKG5hbWUgPT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBpbnB1dCBuYW1lLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgICAgICBpbnB1dE5hbWVzLnB1c2god2FzbS5VVEY4VG9TdHJpbmcobmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRPdXRwdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgICAgIGlmIChuYW1lID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gb3V0cHV0IG5hbWUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZSk7XG4gICAgICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcblxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICBvcHRpb25zLnByZWZlcnJlZE91dHB1dExvY2F0aW9uIDpcbiAgICAgICAgICAgICAgICBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAnY3B1JyAmJiBsb2NhdGlvbiAhPT0gJ2NwdS1waW5uZWQnICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVzZSBJTyBiaW5kaW5nIG9ubHkgd2hlbiBhdCBsZWFzdCBvbmUgb3V0cHV0IGlzIHByZWZmZXJlZCB0byBiZSBvbiBHUFUuXG4gICAgICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUobCA9PiBsID09PSAnZ3B1LWJ1ZmZlcicpKSB7XG4gICAgICAgICAgaW9CaW5kaW5nSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlQmluZGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgICAgICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgSU8gYmluZGluZy4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgICAgICBoYW5kbGU6IGlvQmluZGluZ0hhbmRsZSxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5tYXAobCA9PiBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obCkpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVTZXNzaW9ucy5zZXQoc2Vzc2lvbkhhbmRsZSwgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgYmluZGluZ1N0YXRlXSk7XG4gICAgICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXNdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuXG4gICAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdIYW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlc3Npb25IYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fZnJlZShtb2RlbERhdGFbMF0pO1xuICAgICAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgICAgICB9XG4gICAgICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICAgIH1cbiAgICB9O1xuXG5cbi8qKlxuICogY3JlYXRlIGFuIGluc3RhbmNlIG9mIEluZmVyZW5jZVNlc3Npb24uXG4gKiBAcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgSW5mZXJlbmNlU2Vzc2lvbi4gMC12YWx1ZSBoYW5kbGUgZm9yIGZhaWx1cmUuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID1cbiAgICAobW9kZWw6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsRGF0YTogU2VyaWFsaXphYmxlTW9kZWxkYXRhID0gY3JlYXRlU2Vzc2lvbkFsbG9jYXRlKG1vZGVsKTtcbiAgICAgIHJldHVybiBjcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxEYXRhLCBvcHRpb25zKTtcbiAgICB9O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVsZWFzZSBzZXNzaW9uLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlXSA9IHNlc3Npb247XG5cbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKTtcbiAgfVxuXG4gIHdhc20uanNlcFVucmVnaXN0ZXJCdWZmZXJzPy4oc2Vzc2lvbklkKTtcblxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5jb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPVxuICAgICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhfG51bGwsIHRlbnNvckhhbmRsZXM6IG51bWJlcltdLCBhbGxvY3M6IG51bWJlcltdLCBzZXNzaW9uSWQ6IG51bWJlciwgaW5kZXg6IG51bWJlcik6XG4gICAgICAgIHZvaWQgPT4ge1xuICAgICAgICAgIGlmICghdGVuc29yKSB7XG4gICAgICAgICAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgICAgICBjb25zdCBkaW1zID0gdGVuc29yWzFdO1xuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGVuc29yWzNdO1xuXG4gICAgICAgICAgbGV0IHJhd0RhdGE6IG51bWJlcjtcbiAgICAgICAgICBsZXQgZGF0YUJ5dGVMZW5ndGg6IG51bWJlcjtcblxuICAgICAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgbG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSB0ZW5zb3JbMl0uZ3B1QnVmZmVyIGFzIEdQVUJ1ZmZlcjtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplSW5CeXRlcyA9IGdldFRlbnNvckVsZW1lbnRTaXplKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSkhO1xuICAgICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpICogZWxlbWVudFNpemVJbkJ5dGVzO1xuICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyKHNlc3Npb25JZCwgaW5kZXgsIGdwdUJ1ZmZlciwgZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gNCAqIGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgICAgIGxldCBkYXRhSW5kZXggPSByYXdEYXRhIC8gNDtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXSA9IGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gICAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogZGltcy5sZW5ndGgpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGltSW5kZXggPSBkaW1zT2Zmc2V0IC8gNDtcbiAgICAgICAgICAgIGRpbXMuZm9yRWFjaChkID0+IHdhc20uSEVBUDMyW2RpbUluZGV4KytdID0gZCk7XG4gICAgICAgICAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXG4gICAgICAgICAgICAgICAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCByYXdEYXRhLCBkYXRhQnl0ZUxlbmd0aCwgZGltc09mZnNldCwgZGltcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGxvY2F0aW9uKSk7XG4gICAgICAgICAgICBpZiAodGVuc29yID09PSAwKSB7XG4gICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbnNvckhhbmRsZXMucHVzaCh0ZW5zb3IpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4vKipcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxuICovXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMoXG4gICAgc2Vzc2lvbklkOiBudW1iZXIsIGlucHV0SW5kaWNlczogbnVtYmVyW10sIGlucHV0VGVuc29yczogVGVuc29yTWV0YWRhdGFbXSwgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXG4gICAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBydW4gaW5mZXJlbmNlLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlXSA9IHNlc3Npb247XG5cbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XG5cbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBpbnB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG5cbiAgdHJ5IHtcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKGlucHV0VGVuc29yc1tpXSwgaW5wdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgc2Vzc2lvbklkLCBpbnB1dEluZGljZXNbaV0pO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICAgIG91dHB1dFRlbnNvcnNbaV0sIG91dHB1dFRlbnNvckhhbmRsZXMsIGlucHV0T3V0cHV0QWxsb2NzLCBzZXNzaW9uSWQsIGlucHV0Q291bnQgKyBvdXRwdXRJbmRpY2VzW2ldKTtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRWYWx1ZXNJbmRleCA9IGlucHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgaW5wdXROYW1lc0luZGV4ID0gaW5wdXROYW1lc09mZnNldCAvIDQ7XG4gICAgbGV0IG91dHB1dFZhbHVlc0luZGV4ID0gb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0TmFtZXNJbmRleCA9IG91dHB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0VmFsdWVzSW5kZXgrK10gPSBpbnB1dFRlbnNvckhhbmRsZXNbaV07XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXROYW1lc0luZGV4KytdID0gaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV07XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc0luZGV4KytdID0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltvdXRwdXROYW1lc0luZGV4KytdID0gb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtvdXRwdXRJbmRpY2VzW2ldXTtcbiAgICB9XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgaW9CaW5kaW5nU3RhdGUpIHtcbiAgICAgIGNvbnN0IHtoYW5kbGUsIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucywgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZH0gPSBpb0JpbmRpbmdTdGF0ZTtcblxuICAgICAgaWYgKGlucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGggIT09IGlucHV0Q291bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCBjb3VudCBmcm9tIGZlZWRzICgke1xuICAgICAgICAgICAgaW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBpbnB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5wdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRCaW5kSW5wdXQoaGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0pO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgaW5wdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgcHJlLWFsbG9jYXRlZCBvdXRwdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBvdXRwdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG91dHB1dFRlbnNvcnNbaV0/LlszXTsgIC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXG5cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQuIGJpbmQgdGhlIHRlbnNvci5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sIDApO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIHByZS1hbGxvY2F0ZWQgb3V0cHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLiByZXNldCBwcmVmZXJyZWQgbG9jYXRpb24uXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID1cbiAgICAgICAgICAgICAgd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCAwLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkW2luZGV4XSk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgb3V0cHV0WyR7aX1dIHRvICR7b3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW2ldfSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGVycm9yQ29kZTogbnVtYmVyO1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpb0JpbmRpbmdTdGF0ZS5oYW5kbGUsIG91dHB1dENvdW50LCBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW4oXG4gICAgICAgICAgc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc09mZnNldCwgaW5wdXRWYWx1ZXNPZmZzZXQsIGlucHV0Q291bnQsIG91dHB1dE5hbWVzT2Zmc2V0LCBvdXRwdXRDb3VudCxcbiAgICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cblxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdGVuc29yID0gd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc09mZnNldCAvIDQgKyBpXTtcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cbiAgICAgICAgb3V0cHV0LnB1c2gob3V0cHV0VGVuc29yc1tpXSEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogNCk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGV8dW5kZWZpbmVkLCBkYXRhT2Zmc2V0ID0gMDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXG4gICAgICAgICAgICB0ZW5zb3IsIHRlbnNvckRhdGFPZmZzZXQsIHRlbnNvckRhdGFPZmZzZXQgKyA0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgOCwgdGVuc29yRGF0YU9mZnNldCArIDEyKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhY2Nlc3Mgb3V0cHV0IHRlbnNvciBkYXRhIG9uIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRlbnNvckRhdGFJbmRleCA9IHRlbnNvckRhdGFPZmZzZXQgLyA0O1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGRhdGFPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkaW1zLnB1c2god2FzbS5IRUFQVTMyW2RpbXNPZmZzZXQgLyA0ICsgaV0pO1xuICAgICAgICB9XG4gICAgICAgIHdhc20uX09ydEZyZWUoZGltc09mZnNldCk7XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkTG9jYXRpb24gPSBpb0JpbmRpbmdTdGF0ZT8ub3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW291dHB1dEluZGljZXNbaV1dO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgbGV0IGRhdGFJbmRleCA9IGRhdGFPZmZzZXQgLyA0O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IHdhc20uSEVBUFUzMltkYXRhSW5kZXhdIC0gb2Zmc2V0O1xuICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgYSBjZXJ0YWluIG91dHB1dCdzIHByZWZlcnJlZCBsb2NhdGlvbiBpcyBHUFUgYnV0IHRoZSB0ZW5zb3IgaXMgZW1wdHksIHdlIHN0aWxsIG5lZWQgdG8gY3JlYXRlIGEgQ1BVXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHdhc20uanNlcEdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplID0gZ2V0VGVuc29yRWxlbWVudFNpemUoZGF0YVR5cGUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRTaXplID09PSB1bmRlZmluZWQgfHwgIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cbiAgICAgICAgICAgIGtlZXBPdXRwdXRUZW5zb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgIHR5cGUsIGRpbXMsIHtcbiAgICAgICAgICAgICAgICBncHVCdWZmZXIsXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIoZ3B1QnVmZmVyLCBzaXplICogZWxlbWVudFNpemUsIHR5cGUpLFxuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdncHUtYnVmZmVyJ1xuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5zZXQod2FzbS5IRUFQVTguc3ViYXJyYXkoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIGRhdGEsICdjcHUnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2spO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgZGF0YU9mZnNldCkge1xuICAgICAgICAgIHdhc20uX2ZyZWUoZGF0YU9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZWVwT3V0cHV0VGVuc29yKSB7XG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBpbnB1dE91dHB1dEFsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XG5cbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xuICB9XG59O1xuXG4vKipcbiAqIGVuZCBwcm9maWxpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc2Vzc2lvbiBpZCcpO1xuICB9XG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xuXG4gIC8vIHByb2ZpbGUgZmlsZSBuYW1lIGlzIG5vdCB1c2VkIHlldCwgYnV0IGl0IG11c3QgYmUgZnJlZWQuXG4gIGNvbnN0IHByb2ZpbGVGaWxlTmFtZSA9IHdhc20uX09ydEVuZFByb2ZpbGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgaWYgKHByb2ZpbGVGaWxlTmFtZSA9PT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS4nKTtcbiAgfVxuICB3YXNtLl9PcnRGcmVlKHByb2ZpbGVGaWxlTmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMgPSAodGVuc29yczogcmVhZG9ubHkgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXSk6IEFycmF5QnVmZmVyTGlrZVtdID0+IHtcbiAgY29uc3QgYnVmZmVyczogQXJyYXlCdWZmZXJMaWtlW10gPSBbXTtcbiAgZm9yIChjb25zdCB0ZW5zb3Igb2YgdGVuc29ycykge1xuICAgIGNvbnN0IGRhdGEgPSB0ZW5zb3JbMl07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpICYmICdidWZmZXInIGluIGRhdGEpIHtcbiAgICAgIGJ1ZmZlcnMucHVzaChkYXRhLmJ1ZmZlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBidWZmZXJzO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwid2Vid29ya2VyXCIgLz5cblxuaW1wb3J0IHtPcnRXYXNtTWVzc2FnZX0gZnJvbSAnLi4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHtjcmVhdGVTZXNzaW9uLCBjcmVhdGVTZXNzaW9uQWxsb2NhdGUsIGNyZWF0ZVNlc3Npb25GaW5hbGl6ZSwgZW5kUHJvZmlsaW5nLCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycywgaW5pdFJ1bnRpbWUsIHJlbGVhc2VTZXNzaW9uLCBydW59IGZyb20gJy4uL3dhc20tY29yZS1pbXBsJztcbmltcG9ydCB7aW5pdGlhbGl6ZVdlYkFzc2VtYmx5fSBmcm9tICcuLi93YXNtLWZhY3RvcnknO1xuXG5zZWxmLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xuICBzd2l0Y2ggKGV2LmRhdGEudHlwZSkge1xuICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICB0cnkge1xuICAgICAgICBpbml0aWFsaXplV2ViQXNzZW1ibHkoZXYuZGF0YS5pbilcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICgpID0+IHBvc3RNZXNzYWdlKHt0eXBlOiAnaW5pdC13YXNtJ30gYXMgT3J0V2FzbU1lc3NhZ2UpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtd2FzbScsIGVycn0gYXMgT3J0V2FzbU1lc3NhZ2UpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtd2FzbScsIGVycn0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5pdC1vcnQnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgaW5pdFJ1bnRpbWUoZXYuZGF0YS5pbikudGhlbigoKSA9PiBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtb3J0J30gYXMgT3J0V2FzbU1lc3NhZ2UpLCBlcnIgPT4gcG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2luaXQtb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgT3J0V2FzbU1lc3NhZ2UpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2luaXQtb3J0JywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGVfYWxsb2NhdGUnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge21vZGVsfSA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBjb25zdCBtb2RlbGRhdGEgPSBjcmVhdGVTZXNzaW9uQWxsb2NhdGUobW9kZWwpO1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2NyZWF0ZV9hbGxvY2F0ZScsIG91dDogbW9kZWxkYXRhfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdjcmVhdGVfYWxsb2NhdGUnLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NyZWF0ZV9maW5hbGl6ZSc6XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7bW9kZWxkYXRhLCBvcHRpb25zfSA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBjb25zdCBzZXNzaW9uTWV0YWRhdGEgPSBjcmVhdGVTZXNzaW9uRmluYWxpemUobW9kZWxkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdjcmVhdGVfZmluYWxpemUnLCBvdXQ6IHNlc3Npb25NZXRhZGF0YX0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAnY3JlYXRlX2ZpbmFsaXplJywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcmVhdGUnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge21vZGVsLCBvcHRpb25zfSA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBjb25zdCBzZXNzaW9uTWV0YWRhdGEgPSBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdjcmVhdGUnLCBvdXQ6IHNlc3Npb25NZXRhZGF0YX0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAnY3JlYXRlJywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWxlYXNlJzpcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBldi5kYXRhLmluITtcbiAgICAgICAgcmVsZWFzZVNlc3Npb24oaGFuZGxlcik7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAncmVsZWFzZSd9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ3JlbGVhc2UnLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3J1bic6XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7c2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9uc30gPSBldi5kYXRhLmluITtcbiAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICBvdXRwdXRzID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAncnVuJywgb3V0OiBvdXRwdXRzfSBhcyBPcnRXYXNtTWVzc2FnZSwgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMob3V0cHV0cykpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAncnVuJywgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGU6ICdydW4nLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGV2LmRhdGEuaW4hO1xuICAgICAgICBlbmRQcm9maWxpbmcoaGFuZGxlcik7XG4gICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlOiAnZW5kLXByb2ZpbGluZyd9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZTogJ2VuZC1wcm9maWxpbmcnLCBlcnJ9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBYTtBQUFiO0FBQUE7QUFBTyxNQUFNLFdBQVc7QUFBQTtBQUFBOzs7QUNBeEI7QUFBQTtBQUFBLGdCQUFBQTtBQUFBO0FBQUEsTUFBYUE7QUFBYjtBQUFBO0FBQU8sTUFBTUEsUUFBTztBQUFBO0FBQUE7OztBQ0FwQjtBQUFBO0FBQUE7QUFDQSxVQUFJLFdBQVcsTUFBTTtBQUNuQixZQUFJLGFBQWEsT0FBTyxhQUFhLGVBQWUsU0FBUyxnQkFBZ0IsU0FBUyxjQUFjLE1BQU07QUFDMUcsWUFBSSxPQUFPLGVBQWU7QUFBYSx1QkFBYSxjQUFjO0FBQ2xFLGVBQ0YsU0FBUyxZQUFZLENBQUMsR0FBRztBQUV6QixjQUFJLElBQUUsV0FBVSxHQUFFO0FBQUUsWUFBRSxRQUFNLElBQUksUUFBUSxDQUFDLEdBQUUsTUFBSTtBQUFDLGdCQUFFO0FBQUUsZ0JBQUU7QUFBQSxVQUFDLENBQUM7QUFBRSxjQUFJLElBQUUsT0FBTyxPQUFPLENBQUMsR0FBRSxDQUFDLEdBQUUsSUFBRSxrQkFBaUIsS0FBRyxZQUFVLE9BQU8sUUFBTyxJQUFFLGNBQVksT0FBTyxlQUFjLEtBQUcsWUFBVSxPQUFPLFdBQVMsWUFBVSxPQUFPLFFBQVEsWUFBVSxZQUFVLE9BQU8sUUFBUSxTQUFTLE1BQUssSUFBRSxJQUFHLEdBQUUsR0FBRTtBQUNyUixjQUFHLElBQUc7QUFBQyxnQkFBSSxLQUFHLHVDQUFjLElBQUU7QUFBZ0IsZ0JBQUUsSUFBRSxFQUFFLFFBQVEs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QUFFLElBQUUsS0FBRyxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLElBQUcsSUFBRSxFQUFFLENBQUMsSUFBRSxHQUFFO0FBQUUsZ0JBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUU7QUFBQSxjQUFDLE1BQUs7QUFBQSxjQUF1QixNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBSyxNQUFLO0FBQUEsY0FBYyxNQUFLO0FBQUEsY0FBUSxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxNQUFLO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FDbmYsT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQVcsT0FBTTtBQUFBLGNBQVcsT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLGNBQUssT0FBTTtBQUFBLFlBQUk7QUFBRSxxQkFBUSxLQUFLO0FBQUUsa0JBQUUsRUFBRSxRQUFRLElBQUksT0FBTyxHQUFFLEdBQUcsR0FBRSxFQUFFLENBQUMsQ0FBQztBQUFFLGdCQUFJLEtBQUcsMkRBQTJELE1BQU0sR0FBRyxHQUFFLEtBQUcsd0ZBQXdGLE1BQU0sR0FBRztBQUFFLGdCQUFFLEVBQUMsTUFBSyxPQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBVSxHQUFFLENBQUMsR0FBRSxNQUFLLE9BQUcsR0FBRyxFQUFFLEVBQUUsR0FBRSxNQUFLLE9BQ2xmLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBVSxHQUFFLENBQUMsR0FBRSxNQUFLLE9BQUcsR0FBRyxFQUFFLEVBQUUsR0FBRSxNQUFLLE9BQUcsR0FBRyxFQUFFLEtBQUcsUUFBTSxNQUFJLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRyxHQUFFLE1BQUssT0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsa0JBQUUsRUFBRTtBQUFHLG1CQUFHLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSSxLQUFHO0FBQUkscUJBQU8sRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsdUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsS0FBRyxHQUFFLE1BQUksRUFBRSxFQUFFLEtBQUcsSUFBSSxJQUFFLEtBQUcsSUFBSSxHQUFHO0FBQUU7QUFBQyxxQkFBTyxFQUFFLEVBQUUsS0FBRyxHQUFFLENBQUM7QUFBQSxZQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxLQUFHLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxNQUFJLE1BQUssTUFBSyxPQUFHLEtBQUcsRUFBRSxNQUFJLEtBQUcsRUFBRSxLQUFHLE9BQUssTUFBSyxNQUFLLE9BQUcsRUFBRSxFQUFFLElBQUcsQ0FBQyxHQUFFLE1BQUssTUFBSSxLQUFLLE1BQUssT0FBRyxFQUFFLE1BQUksR0FB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QUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsWUFBWSxJQUFFO0FBQUssZ0JBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsT0FBTztBQUFFLGdCQUFFLElBQUUsTUFBSSxNQUNwZixDQUFDLEtBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxJQUFFLEtBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFFLEVBQUUsUUFBUSxJQUFFLElBQUU7QUFBRSxnQkFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxLQUFHLEVBQUUsa0JBQWtCO0FBQUcsa0JBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQjtBQUFFLGtCQUFJLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQjtBQUFFLGdCQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsS0FBRyxLQUFHLEtBQUcsRUFBRSxrQkFBa0IsS0FBRyxLQUFLLElBQUksR0FBRSxDQUFDLEtBQUc7QUFBQSxZQUFDO0FBQUEsWUFBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLHFCQUFLO0FBQUUsa0JBQUksSUFBRSxJQUFJLEtBQUssRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsTUFBSyxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsR0FBRSxFQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsR0FBRSxFQUFFLEtBQUcsTUFBSSxDQUFDLEdBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLGtCQUFrQixHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQixHQUNwZixJQUFHLElBQUksS0FBSyxFQUFFLFlBQVksR0FBRSxHQUFFLENBQUMsRUFBRyxrQkFBa0IsR0FBRSxJQUFFLEtBQUssSUFBSSxHQUFFLENBQUM7QUFBRSxrQkFBRSxJQUFFLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLE9BQU8sS0FBRyxLQUFHLEtBQUcsQ0FBQyxJQUFFLElBQUUsTUFBSSxLQUFHLE9BQUssSUFBRSxLQUFLLElBQUksR0FBRSxDQUFDLEdBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFFLFFBQU0sSUFBRSxJQUFFLElBQUUsS0FBRyxFQUFFO0FBQUcsZ0JBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsT0FBTztBQUFFLGdCQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsS0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLElBQUUsS0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUUsRUFBRSxRQUFRLElBQUUsSUFBRTtBQUFFLGdCQUFFLEtBQUcsTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsZ0JBQUUsSUFBRSxLQUFHLE1BQUksQ0FBQyxJQUFFLEVBQUUsV0FBVztBQUFFLGdCQUFFLElBQUUsS0FBRyxNQUFJLENBQUMsSUFBRSxFQUFFLFNBQVM7QUFBRSxnQkFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxRQUFRO0FBQUUsZ0JBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsU0FBUztBQUFFLGdCQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFFBQVE7QUFBRSxrQkFBRSxFQUFFLFFBQVEsSUFBRTtBQUFJLHFCQUFPLElBQUksSUFBRSxHQUFFLEtBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFFLElBQUUsSUFBRSxDQUFDLEtBQUssTUFBTSxJQUM1ZixVQUFVLE1BQUksSUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sSUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFJLE1BQUksVUFBVSxNQUFJLElBQUUsRUFBRSxHQUFFLE1BQUk7QUFBQSxZQUFDO0FBQUEsWUFBRSxHQUFFLFdBQVU7QUFBQyxxQkFBTTtBQUFBLFlBQUc7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QztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFHO0FBQUUscUJBQU8sRUFBRSxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUc7QUFBRSxxQkFBTyxFQUFFLElBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUM3ZCxtQkFBUyxHQUFHLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsSUFBRyxHQUFFLENBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsSUFBRyxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUc7QUFBRSxxQkFBTyxFQUFFLElBQUcsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxjQUFJLEtBQUcsT0FBRztBQUFDLGdCQUFHLFNBQU87QUFBRSxxQkFBTTtBQUFPLGdCQUFJLElBQUUsT0FBTztBQUFFLG1CQUFNLGFBQVcsS0FBRyxZQUFVLEtBQUcsZUFBYSxJQUFFLEVBQUUsU0FBUyxJQUFFLEtBQUc7QUFBQSxVQUFDLEdBQUUsSUFBRyxJQUFFLE9BQUc7QUFBQyxxQkFBUSxJQUFFLElBQUcsRUFBRSxFQUFFLE1BQUksQ0FBQztBQUFHLG1CQUFHLEdBQUcsRUFBRSxFQUFFLFFBQU0sQ0FBQyxDQUFDO0FBQUUsbUJBQU87QUFBQSxVQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUU7QUFDblUsbUJBQVMsR0FBRyxHQUFFLEdBQUUs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QUFFLEVBQUUsTUFBSSxNQUFJLENBQUMsSUFBRTtBQUFFLG1CQUFPO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRTtBQUFDLG1CQUFPLElBQUUsRUFBRSxJQUFHLEdBQUUsQ0FBQyxJQUFFO0FBQUEsVUFBRTtBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLG1CQUFPLElBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxJQUFFO0FBQUEsVUFBRTtBQUNwYyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxtQkFBTyxJQUFFLEVBQUUsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsSUFBRTtBQUFBLFVBQUU7QUFBQyxjQUFJLEtBQUcsQ0FBQyxNQUFLLENBQUMsR0FBRSxDQUFDLENBQUM7QUFBRSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBRztBQUFFLHFCQUFPLEVBQUUsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxtQkFBSztBQUFFLG1CQUFLO0FBQUUsbUJBQUs7QUFBRSxxQkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJO0FBQUMsa0JBQUksSUFBRSxFQUFFLEVBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDO0FBQUUsbUJBQUc7QUFBRSx1QkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUk7QUFBQyxvQkFBSSxJQUFFLEVBQUUsRUFBRSxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUUsR0FBRyxDQUFDO0FBQUUsc0JBQUksS0FBRyxPQUFLLE1BQUksTUFBSSxJQUFFLEtBQUcsR0FBRyxHQUFHLEdBQUUsQ0FBQyxDQUFDLEdBQUUsRUFBRSxTQUFPLEtBQUcsRUFBRSxLQUFLLENBQUM7QUFBQSxjQUFDO0FBQUMsbUJBQUc7QUFBQSxZQUFDO0FBQUMsY0FBRSxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUU7QUFBRSxtQkFBTztBQUFBLFVBQUM7QUFBQyxjQUFJLEtBQUcsQ0FBQyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsRUFBRSxHQUFFLEtBQUcsQ0FBQyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsRUFBRTtBQUFFLG1CQUFTLEdBQUcsR0FBRTtBQUFDLGdCQUFJLElBQUUsTUFBTSxHQUFHLENBQUMsSUFBRSxDQUFDO0FBQUUsZUFBRyxHQUFFLEdBQUUsR0FBRSxFQUFFLE1BQU07QUFBRSxtQkFBTztBQUFBLFVBQUM7QUFDaGYsY0FBSSxLQUFHLENBQUMsR0FBRSxNQUFJO0FBQUMsY0FBRSxFQUFFLElBQUksR0FBRSxNQUFJLENBQUM7QUFBQSxVQUFDO0FBQy9CLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFTLEVBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxtQkFBSSxJQUFFLFlBQVUsT0FBTyxJQUFFLEVBQUUsU0FBUyxJQUFFLEtBQUcsSUFBRyxFQUFFLFNBQU87QUFBRyxvQkFBRSxFQUFFLENBQUMsSUFBRTtBQUFFLHFCQUFPO0FBQUEsWUFBQztBQUFDLHFCQUFTLEVBQUUsR0FBRSxHQUFFO0FBQUMscUJBQU8sRUFBRSxHQUFFLEdBQUUsR0FBRztBQUFBLFlBQUM7QUFBQyxxQkFBUyxFQUFFLEdBQUUsR0FBRTtBQUFDLHVCQUFTLEVBQUUsR0FBRTtBQUFDLHVCQUFPLElBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxJQUFFO0FBQUEsY0FBQztBQUFDLGtCQUFJO0FBQUUscUJBQUssSUFBRSxFQUFFLEVBQUUsWUFBWSxJQUFFLEVBQUUsWUFBWSxDQUFDLE1BQUksT0FBSyxJQUFFLEVBQUUsRUFBRSxTQUFTLElBQUUsRUFBRSxTQUFTLENBQUMsT0FBSyxJQUFFLEVBQUUsRUFBRSxRQUFRLElBQUUsRUFBRSxRQUFRLENBQUM7QUFBRyxxQkFBTztBQUFBLFlBQUM7QUFBQyxxQkFBUyxFQUFFLEdBQUU7QUFBQyxzQkFBTyxFQUFFLE9BQU8sR0FBRTtBQUFBLGdCQUFDLEtBQUs7QUFBRSx5QkFBTyxJQUFJLEtBQUssRUFBRSxZQUFZLElBQUUsR0FBRSxJQUFHLEVBQUU7QUFBQSxnQkFBRSxLQUFLO0FBQUUseUJBQU87QUFBQSxnQkFBRSxLQUFLO0FBQUUseUJBQU8sSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQztBQUFBLGdCQUFFLEtBQUs7QUFBRSx5QkFBTyxJQUFJO0FBQUEsb0JBQUssRUFBRSxZQUFZO0FBQUEsb0JBQ3pmO0FBQUEsb0JBQUU7QUFBQSxrQkFBQztBQUFBLGdCQUFFLEtBQUs7QUFBRSx5QkFBTyxJQUFJLEtBQUssRUFBRSxZQUFZLEdBQUUsR0FBRSxDQUFDO0FBQUEsZ0JBQUUsS0FBSztBQUFFLHlCQUFPLElBQUksS0FBSyxFQUFFLFlBQVksSUFBRSxHQUFFLElBQUcsRUFBRTtBQUFBLGdCQUFFLEtBQUs7QUFBRSx5QkFBTyxJQUFJLEtBQUssRUFBRSxZQUFZLElBQUUsR0FBRSxJQUFHLEVBQUU7QUFBQSxjQUFDO0FBQUEsWUFBQztBQUFDLHFCQUFTLEVBQUUsR0FBRTtBQUFDLGtCQUFJLElBQUUsRUFBRTtBQUFHLG1CQUFJLElBQUUsSUFBSSxLQUFNLElBQUksS0FBSyxFQUFFLEtBQUcsTUFBSyxHQUFFLENBQUMsRUFBRyxRQUFRLENBQUMsR0FBRSxJQUFFLEtBQUc7QUFBQyxvQkFBSSxJQUFFLEVBQUUsU0FBUyxHQUFFLEtBQUcsR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFFLEtBQUcsSUFBSSxDQUFDO0FBQUUsb0JBQUcsSUFBRSxJQUFFLEVBQUUsUUFBUTtBQUFFLHVCQUFHLElBQUUsRUFBRSxRQUFRLElBQUUsR0FBRSxFQUFFLFFBQVEsQ0FBQyxHQUFFLEtBQUcsSUFBRSxFQUFFLFNBQVMsSUFBRSxDQUFDLEtBQUcsRUFBRSxTQUFTLENBQUMsR0FBRSxFQUFFLFlBQVksRUFBRSxZQUFZLElBQUUsQ0FBQztBQUFBLHFCQUFPO0FBQUMsb0JBQUUsUUFBUSxFQUFFLFFBQVEsSUFBRSxDQUFDO0FBQUU7QUFBQSxnQkFBSztBQUFBLGNBQUM7QUFBQyxrQkFBRSxJQUFJLEtBQUssRUFBRSxZQUFZLElBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxrQkFBRSxFQUFFLElBQUk7QUFBQSxnQkFBSyxFQUFFLFlBQVk7QUFBQSxnQkFDcGY7QUFBQSxnQkFBRTtBQUFBLGNBQUMsQ0FBQztBQUFFLGtCQUFFLEVBQUUsQ0FBQztBQUFFLHFCQUFPLEtBQUcsRUFBRSxHQUFFLENBQUMsSUFBRSxLQUFHLEVBQUUsR0FBRSxDQUFDLElBQUUsRUFBRSxZQUFZLElBQUUsSUFBRSxFQUFFLFlBQVksSUFBRSxFQUFFLFlBQVksSUFBRTtBQUFBLFlBQUM7QUFBQyxtQkFBSztBQUFFLG1CQUFLO0FBQUUsbUJBQUs7QUFBRSxtQkFBSztBQUFFLGdCQUFJLElBQUUsRUFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUM7QUFBRSxnQkFBRSxFQUFDLElBQUcsRUFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsSUFBRyxFQUFFLEVBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxHQUFFLElBQUcsRUFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsR0FBRSxJQUFHLEVBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsSUFBRyxJQUFFLEdBQUcsQ0FBQyxJQUFFLEdBQUU7QUFBRSxnQkFBRSxHQUFHLENBQUM7QUFBRSxnQkFBRTtBQUFBLGNBQUMsTUFBSztBQUFBLGNBQXVCLE1BQUs7QUFBQSxjQUFXLE1BQUs7QUFBQSxjQUFXLE1BQUs7QUFBQSxjQUFLLE1BQUs7QUFBQSxjQUFjLE1BQUs7QUFBQSxjQUFRLE1BQUs7QUFBQSxjQUFXLE1BQUs7QUFBQSxjQUNyZixNQUFLO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FBVyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsY0FBSyxPQUFNO0FBQUEsWUFBSTtBQUFFLHFCQUFRLEtBQUs7QUFBRSxrQkFBRSxFQUFFLFFBQVEsSUFBSSxPQUFPLEdBQUUsR0FBRyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsZ0JBQUksSUFBRSwyREFBMkQsTUFBTSxHQUFHLEdBQUUsSUFBRSx3RkFBd0YsTUFBTSxHQUFHO0FBQUUsZ0JBQUUsRUFBQyxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FDemYsRUFBRSxFQUFFLEVBQUUsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEdBQUUsQ0FBQyxHQUFFLE1BQUssT0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFFLE1BQUssT0FBRyxHQUFHLEVBQUUsS0FBRyxRQUFNLE1BQUksR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLElBQUcsR0FBRSxHQUFHLEdBQUUsTUFBSyxPQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE9BQUc7QUFBQyxrQkFBRSxFQUFFO0FBQUcsbUJBQUcsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUc7QUFBSSxxQkFBTyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsR0FBRSxNQUFLLE9BQUc7QUFBQyx1QkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxLQUFHLEdBQUUsTUFBSSxHQUFHLEVBQUUsS0FBRyxJQUFJLElBQUUsS0FBRyxJQUFJLEdBQUc7QUFBRTtBQUFDLHFCQUFPLEVBQUUsRUFBRSxLQUFHLEdBQUUsQ0FBQztBQUFBLFlBQUMsR0FBRSxNQUFLLE9BQUcsRUFBRSxFQUFFLEtBQUcsR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHLEVBQUUsRUFBRSxJQUFHLENBQUMsR0FBRSxNQUFLLE1BQUksTUFBSyxNQUFLLE9BQUcsS0FBRyxFQUFFLE1BQUksS0FBRyxFQUFFLEtBQUcsT0FBSyxNQUFLLE1BQUssT0FBRyxFQUFFLEVBQUUsSUFBRyxDQUFDLEdBQUUsTUFBSyxNQUFJLEtBQUssTUFBSyxPQUFHLEVBQUUsTUFBSSxHQUFFLE1BQUssT0FBRyxFQUFFLEtBQUssT0FBTyxFQUFFLEtBQUcsSUFBRSxFQUFFLE1BQ3JmLENBQUMsR0FBRSxDQUFDLEdBQUUsTUFBSyxPQUFHO0FBQUMsa0JBQUksSUFBRSxLQUFLLE9BQU8sRUFBRSxLQUFHLEtBQUcsRUFBRSxLQUFHLEtBQUcsS0FBRyxDQUFDO0FBQUUsb0JBQUksRUFBRSxLQUFHLE1BQUksRUFBRSxLQUFHLEtBQUcsS0FBRztBQUFJLGtCQUFHO0FBQUUsc0JBQUksTUFBSSxLQUFHLEVBQUUsS0FBRyxNQUFJLEVBQUUsTUFBSSxHQUFFLEtBQUcsS0FBRyxLQUFHLEtBQUcsR0FBRyxFQUFFLEVBQUUsTUFBSSxJQUFFO0FBQUEsbUJBQVE7QUFBQyxvQkFBRTtBQUFHLG9CQUFJLEtBQUcsRUFBRSxL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LGtCQUFJLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFO0FBQUUscUJBQU8sRUFBRSxXQUFXLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxxQkFBSztBQUFFLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBRSxHQUFHLE1BQUksQ0FBQztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUUsR0FBRyxDQUFDO0FBQUUsa0JBQUksSUFBRSxDQUFDO0FBQUUsZ0JBQUUsRUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLHFCQUFPLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMscUJBQUs7QUFBRSxxQkFBSztBQUFFLGtCQUFFLEdBQUcsTUFBSSxDQUFDO0FBQUUsa0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxrQkFBRSxHQUFHLENBQUM7QUFBRSxnQkFBRSxHQUFFLEdBQUUsTUFBSyxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRztBQUFBLFlBQUcsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUsa0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSxrQkFBRSxFQUFFLENBQUM7QUFBRSxxQkFBTyxLQUFHO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUU7QUFBQyxxQkFBSztBQUFFLGtCQUFHLE1BQUk7QUFBRSx1QkFBTyxFQUFFLEdBQUcsQ0FBQztBQUFFLGtCQUFFLEdBQUcsQ0FBQztBQUFFLHFCQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUU7QUFBQyxrQkFBSSxJQUFFLEdBQUcsR0FBRSxNQUFJLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLGtCQUFFLEVBQUUsT0FBSyxPQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxTQUFTLEdBQUU7QUFBQyx1QkFBTyxFQUFFO0FBQUEsY0FBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQ3hmO0FBQUksa0JBQUksSUFBRSxHQUFHLENBQUM7QUFBRSxrQkFBRyxXQUFTO0FBQUUsdUJBQU87QUFBRSxrQkFBRSxDQUFDLFNBQVM7QUFBRSx1QkFBUSxJQUFFLENBQUMsQ0FBQyxHQUFFLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsRUFBRTtBQUFFLHNCQUFJLE1BQUksSUFBRSxPQUFLLE1BQUksUUFBTSxHQUFFLEVBQUUsS0FBSyxZQUFVLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxJQUFFLENBQUMsQ0FBQztBQUFFLGtCQUFJLElBQUUscUJBQW1CLEdBQUcsa0JBQWdCLENBQUMsSUFBRSx5Q0FBd0MsSUFBRTtBQUFFLG1CQUFJLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUscUJBQUcsZ0JBQWMsSUFBRSxlQUFhLElBQUUsZ0NBQThCLElBQUUsTUFBSSxJQUFFLE1BQUksUUFBTyxLQUFHLEVBQUUsSUFBRSxDQUFDLEVBQUU7QUFBZSxtQkFBRywrQkFBNkIsSUFBRTtBQUFPLG1CQUFJLElBQUUsR0FBRSxJQUFFLElBQUUsR0FBRSxFQUFFO0FBQUUsa0JBQUUsSUFBRSxDQUFDLEVBQUUsaUJBQWUsS0FBRyxnQkFBYyxJQUFFLHNCQUFvQixJQUFFO0FBQVEsZ0JBQUUsT0FDaGYsS0FBRztBQUFxRCxnQkFBRSxLQUFLLElBQUUsTUFBTTtBQUFFLGtCQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sTUFBSyxDQUFDO0FBQUUsa0JBQUUsR0FBRyxDQUFDO0FBQUUscUJBQU8sR0FBRyxDQUFDLElBQUU7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMscUJBQUs7QUFBRSxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGtCQUFFLEVBQUUsQ0FBQztBQUFFLHFCQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLHFCQUFLO0FBQUUsa0JBQUUsTUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLE1BQUk7QUFBQSxZQUFFO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBRSxFQUFFLE1BQUksQ0FBQztBQUFFLGtCQUFJLElBQUUsR0FBRyxDQUFDO0FBQUUsb0JBQUksSUFBRSxHQUFHLENBQUMsR0FBRSxHQUFHLENBQUMsSUFBRTtBQUFHLHFCQUFPLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFdBQVU7QUFBQyxxQkFBTyxFQUFFLENBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFO0FBQUMsa0JBQUUsRUFBRSxNQUFJLENBQUM7QUFBRSx1QkFBUSxJQUFFLE1BQU0sRUFBRSxNQUFNLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPO0FBQUksa0JBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLHFCQUFPLEVBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLEdBQUUsU0FBUyxHQUFFO0FBQUMscUJBQU8sRUFBRSxHQUFHLE1BQUksQ0FBQyxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUMscUJBQU8sRUFBRSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUEsWUFDcmYsSUFBRyxTQUFTLEdBQUU7QUFBQyxxQkFBSztBQUFFLHVCQUFRLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxVQUFRO0FBQUMsb0JBQUksSUFBRSxFQUFFLElBQUk7QUFBRSxrQkFBRSxJQUFJLEVBQUUsQ0FBQztBQUFBLGNBQUM7QUFBQyxpQkFBRyxDQUFDO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMscUJBQUs7QUFBRSxxQkFBSztBQUFFLGtCQUFFLEVBQUUsTUFBSSxDQUFDO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUsa0JBQUUsRUFBRSxDQUFDO0FBQUUsZ0JBQUUsQ0FBQyxJQUFFO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRTtBQUFDLHFCQUFLO0FBQUUsa0JBQUUsR0FBRyxNQUFJLEdBQUUsbUJBQW1CO0FBQUUsa0JBQUUsRUFBRSxxQkFBcUIsQ0FBQztBQUFFLHFCQUFPLEVBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsU0FBUyxHQUFFLEdBQUU7QUFBQyxrQkFBRSxvQkFBa0IsS0FBRyxtQkFBaUIsSUFBRSxNQUFJLE9BQU8sQ0FBQztBQUFFLHFCQUFLO0FBQUUsa0JBQUUsSUFBSSxLQUFLLE1BQUksQ0FBQztBQUFFLGdCQUFFLEVBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLGNBQWM7QUFBRSxnQkFBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLGNBQWM7QUFBRSxnQkFBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxFQUFFLFlBQVk7QUFBRSxnQkFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLFdBQVc7QUFBRSxnQkFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLFlBQVk7QUFDM2YsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxlQUFlLElBQUU7QUFBSyxnQkFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLFVBQVU7QUFBRSxtQkFBRyxFQUFFLFFBQVEsSUFBRSxLQUFLLElBQUksRUFBRSxlQUFlLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsS0FBRyxRQUFNO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUU7QUFBQSxZQUFDO0FBQUEsWUFBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsa0JBQUUsb0JBQWtCLEtBQUcsbUJBQWlCLElBQUUsTUFBSSxPQUFPLENBQUM7QUFBRSxxQkFBSztBQUFFLGtCQUFFLElBQUksS0FBSyxNQUFJLENBQUM7QUFBRSxnQkFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxRQUFRO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxZQUFZLElBQUU7QUFBSyxnQkFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxFQUFFLE9BQU87QUFBRSxrQkFBSSxLQUFHLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFDeGYsS0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUUsRUFBRSxRQUFRLElBQUUsSUFBRTtBQUFFLGdCQUFFLEVBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxLQUFHLEVBQUUsa0JBQWtCO0FBQUcsa0JBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQjtBQUFFLGtCQUFJLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQjtBQUFFLG1CQUFHLEtBQUcsS0FBRyxFQUFFLGtCQUFrQixLQUFHLEtBQUssSUFBSSxHQUFFLENBQUMsS0FBRztBQUFFLGdCQUFFLEVBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFO0FBQUEsWUFBQztBQUFBLFlBQUUsSUFBRyxTQUFTLEdBQUU7QUFBQyxxQkFBSztBQUFFLGtCQUFJLElBQUUsSUFBSSxLQUFLLEVBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsTUFBSyxFQUFFLEVBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxHQUFFLEVBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsRUFBRSxFQUFFLElBQUUsTUFBSSxNQUFJLENBQUMsR0FBRSxFQUFFLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLEVBQUUsRUFBRSxNQUFJLE1BQUksQ0FBQyxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLGtCQUFrQixHQUFFLElBQUcsSUFBSTtBQUFBLGdCQUFLLEVBQUUsWUFBWTtBQUFBLGdCQUN2ZjtBQUFBLGdCQUFFO0FBQUEsY0FBQyxFQUFHLGtCQUFrQixHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFFLEdBQUUsQ0FBQyxFQUFHLGtCQUFrQixHQUFFLElBQUUsS0FBSyxJQUFJLEdBQUUsQ0FBQztBQUFFLGtCQUFFLElBQUUsRUFBRSxFQUFFLElBQUUsT0FBSyxNQUFJLENBQUMsSUFBRSxPQUFPLEtBQUcsS0FBRyxLQUFHLENBQUMsSUFBRSxJQUFFLE1BQUksS0FBRyxPQUFLLElBQUUsS0FBSyxJQUFJLEdBQUUsQ0FBQyxHQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsSUFBRSxRQUFNLElBQUUsSUFBRSxJQUFFLEtBQUcsRUFBRTtBQUFHLGdCQUFFLEVBQUUsSUFBRSxPQUFLLE1BQUksQ0FBQyxJQUFFLEVBQUUsT0FBTztBQUFFLG1CQUFHLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBRSxLQUFHLElBQUksRUFBRSxTQUFTLENBQUMsSUFBRSxFQUFFLFFBQVEsSUFBRSxJQUFFO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUU7QUFBRSxnQkFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxXQUFXO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxRQUFRO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxTQUFTO0FBQUUsZ0JBQUUsRUFBRSxJQUFFLE9BQUssTUFBSSxDQUFDLElBQUUsRUFBRSxRQUFRO0FBQ25mLHFCQUFPLE9BQU8sRUFBRSxRQUFRLElBQUUsR0FBRztBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFHLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLHVCQUFTLEVBQUUsR0FBRTtBQUFDLHdCQUFPLElBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsS0FBRyxFQUFFLENBQUMsSUFBRTtBQUFBLGNBQUs7QUFBQyxxQkFBSztBQUFFLHFCQUFLO0FBQUUscUJBQUs7QUFBRSxrQkFBSSxLQUFHLG9CQUFJLFFBQU0sWUFBWSxHQUFFLElBQUUsSUFBSSxLQUFLLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxJQUFJLEtBQUssR0FBRSxHQUFFLENBQUM7QUFBRSxrQkFBRSxFQUFFLGtCQUFrQjtBQUFFLGtCQUFJLElBQUUsRUFBRSxrQkFBa0IsR0FBRSxJQUFFLEtBQUssSUFBSSxHQUFFLENBQUM7QUFBRSxnQkFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsS0FBRztBQUFFLGdCQUFFLEVBQUUsTUFBSSxNQUFJLENBQUMsSUFBRSxPQUFPLEtBQUcsQ0FBQztBQUFFLGtCQUFFLEVBQUUsQ0FBQztBQUFFLGtCQUFFLEVBQUUsQ0FBQztBQUFFLGtCQUFFLEdBQUcsQ0FBQztBQUFFLGtCQUFFLEdBQUcsQ0FBQztBQUFFLGtCQUFFLEtBQUcsRUFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFLE1BQUksRUFBRSxFQUFFLE1BQUksTUFBSSxDQUFDLElBQUUsR0FBRSxFQUFFLEVBQUUsSUFBRSxNQUFJLE1BQUksQ0FBQyxJQUFFO0FBQUEsWUFBRTtBQUFBLFlBQUUsSUFBRyxNQUFJO0FBQUMsaUJBQUcsRUFBRTtBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsTUFBSTtBQUFBLFlBQUM7QUFBQSxZQUFFLElBQUcsTUFBSSxLQUFLLElBQUk7QUFBQSxZQUNuZixJQUFHLE1BQUk7QUFBQyxvQkFBSTtBQUFFLG9CQUFLO0FBQUEsWUFBUztBQUFBLFlBQUUsSUFBRyxXQUFVO0FBQUMscUJBQU87QUFBQSxZQUFVO0FBQUEsWUFBRSxJQUFHLE1BQUksWUFBWSxhQUFXLFlBQVksSUFBSTtBQUFBLFlBQUUsSUFBRyxNQUFJLElBQUUsc0NBQWMsS0FBSyxFQUFFLFNBQU8sVUFBVTtBQUFBLFlBQW9CLElBQUcsU0FBUyxHQUFFO0FBQUMscUJBQUs7QUFBRSxrQkFBSSxJQUFFLEVBQUUsRUFBRTtBQUFPLGtCQUFHLEtBQUcsS0FBRyxhQUFXO0FBQUUsdUJBQU07QUFBRyx1QkFBUSxJQUFFLEdBQUUsS0FBRyxHQUFFLEtBQUcsR0FBRTtBQUFDLG9CQUFJLElBQUUsS0FBRyxJQUFFLE1BQUc7QUFBRyxvQkFBRSxLQUFLLElBQUksR0FBRSxJQUFFLFNBQVM7QUFBRSxvQkFBSSxJQUFFO0FBQUssb0JBQUUsS0FBSyxJQUFJLEdBQUUsQ0FBQztBQUFFLG1CQUFFO0FBQUMsdUJBQUcsRUFBRSxJQUFJLEtBQUssR0FBRSxZQUFXLEtBQUcsUUFBTSxJQUFFLFNBQU8sS0FBSyxJQUFFLEVBQUUsT0FBTyxhQUFXLFNBQU87QUFBTSxzQkFBRztBQUFDLHNCQUFFLEtBQUssQ0FBQztBQUFFLHNCQUFFO0FBQUUsd0JBQUksSUFBRTtBQUFFLDBCQUFNO0FBQUEsa0JBQUMsU0FBTyxHQUFFO0FBQUEsa0JBQUM7QUFBQyxzQkFBRTtBQUFBLGdCQUFNO0FBQUMsb0JBQUc7QUFBRSx5QkFBTTtBQUFBLGNBQUU7QUFBQyxxQkFBTTtBQUFBLFlBQUU7QUFBQSxZQUN4ZixJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxJQUFHO0FBQUEsWUFBRyxHQUFFO0FBQUEsWUFDbGYsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsSUFBRztBQUFBLFlBQUcsR0FBRTtBQUFBLFlBQUcsSUFBRztBQUFBLFlBQ25mLElBQUc7QUFBQSxZQUFHLElBQUc7QUFBQSxZQUFH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LEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDcGIsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRTtBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDaGUsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUU7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3RiLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDN2QsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMxZSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDdGEsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBRSxxQkFBTztBQUFBLFlBQUU7QUFBQSxVQUFDO0FBQ25iLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN6YyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMvYSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzNhLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDcGMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN0YixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBRSxxQkFBTztBQUFBLFlBQUU7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDbGIsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3RhLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMxYyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDamUsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3JhLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDM1osbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLElBQUc7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsT0FBSyxLQUFHO0FBQUUsc0JBQU07QUFBRyxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUMzYSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN2YixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDdmQsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFDdlosbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDMWIsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ2xiLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN0YSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUN2YyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDbFgsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFB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QUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sSUFBRztBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxPQUFLLEtBQUc7QUFBRSxzQkFBTTtBQUFHLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUM5ZSxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDL2UsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDL1osbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzdlLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUNsZixtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDamYsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQzNiLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUNuZCxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQ3JiLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMsZ0JBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDO0FBQUMsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUM1YyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUUscUJBQU87QUFBQSxZQUFFO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLGdCQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFDL2IsbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxtQkFBUyxHQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxnQkFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxFQUFFO0FBQUUsZ0JBQUc7QUFBQyxxQkFBTyxFQUFFLENBQUMsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUU7QUFBQSxZQUFDLFNBQU8sR0FBRTtBQUFDLGdCQUFFLENBQUM7QUFBRSxrQkFBRyxNQUFJLElBQUU7QUFBRSxzQkFBTTtBQUFFLGdCQUFFLEdBQUUsQ0FBQztBQUFFLHFCQUFPO0FBQUEsWUFBRTtBQUFBLFVBQUM7QUFDdlosbUJBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRTtBQUFFLGdCQUFHO0FBQUMscUJBQU8sRUFBRSxDQUFDLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsWUFBQyxTQUFPLEdBQUU7QUFBQyxnQkFBRSxDQUFDO0FBQUUsa0JBQUcsTUFBSSxJQUFFO0FBQUUsc0JBQU07QUFBRSxnQkFBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLG1CQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxnQkFBSSxJQUFFLEVBQUU7QUFBRSxnQkFBRztBQUFDLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFlBQUMsU0FBTyxHQUFFO0FBQUMsZ0JBQUUsQ0FBQztBQUFFLGtCQUFHLE1BQUksSUFBRTtBQUFFLHNCQUFNO0FBQUUsZ0JBQUUs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LFFBQ3RFLFNBQVMsS0FBSztBQUNaLHNCQUFZLEVBQUMsTUFBTSxVQUFVLElBQUcsQ0FBbUI7QUFBQSxRQUNyRDtBQUNBO0FBQUEsTUFDRixLQUFLO0FBQ0gsWUFBSTtBQUNGLGdCQUFNLFVBQVUsR0FBRyxLQUFLO0FBQ3hCLHlCQUFlLE9BQU87QUFDdEIsc0JBQVksRUFBQyxNQUFNLFVBQVMsQ0FBbUI7QUFBQSxRQUNqRCxTQUFTLEtBQUs7QUFDWixzQkFBWSxFQUFDLE1BQU0sV0FBVyxJQUFHLENBQW1CO0FBQUEsUUFDdEQ7QUFDQTtBQUFBLE1BQ0YsS0FBSztBQUNILFlBQUk7QUFDRixnQkFBTSxFQUFDLFdBQVcsY0FBYyxRQUFRLGVBQWUsUUFBTyxJQUFJLEdBQUcsS0FBSztBQUMxRSxjQUFJLFdBQVcsY0FBYyxRQUFRLGVBQWUsT0FBTyxFQUN0RDtBQUFBLFlBQ0csYUFBVztBQUNULDBCQUFZLEVBQUMsTUFBTSxPQUFPLEtBQUssUUFBTyxHQUFxQiwyQkFBMkIsT0FBTyxDQUFDO0FBQUEsWUFDaEc7QUFBQSxZQUNBLFNBQU87QUFDTCwwQkFBWSxFQUFDLE1BQU0sT0FBTyxJQUFHLENBQW1CO0FBQUEsWUFDbEQ7QUFBQSxVQUFDO0FBQUEsUUFDWCxTQUFTLEtBQUs7QUFDWixzQkFBWSxFQUFDLE1BQU0sT0FBTyxJQUFHLENBQW1CO0FBQUEsUUFDbEQ7QUFDQTtBQUFBLE1BQ0YsS0FBSztBQUNILFlBQUk7QUFDRixnQkFBTSxVQUFVLEdBQUcsS0FBSztBQUN4Qix1QkFBYSxPQUFPO0FBQ3BCLHNCQUFZLEVBQUMsTUFBTSxnQkFBZSxDQUFtQjtBQUFBLFFBQ3ZELFNBQVMsS0FBSztBQUNaLHNCQUFZLEVBQUMsTUFBTSxpQkFBaUIsSUFBRyxDQUFtQjtBQUFBLFFBQzVEO0FBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7IiwKICAibmFtZXMiOiBbImpvaW4iLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJ0ZW5zb3IiLCAiZXJyb3JDb2RlIiwgImkiXQp9Cg==\n';
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

  // web/lib/backend-wasm-training.ts
  var backend_wasm_training_exports = {};
  __export(backend_wasm_training_exports, {
    wasmBackend: () => wasmBackend
  });
  var OnnxruntimeTrainingWebAssemblyBackend, wasmBackend;
  var init_backend_wasm_training = __esm({
    "web/lib/backend-wasm-training.ts"() {
      "use strict";
      init_backend_wasm();
      OnnxruntimeTrainingWebAssemblyBackend = class extends OnnxruntimeWebAssemblyBackend {
        async createTrainingSessionHandler(_checkpointStateUriOrBuffer, _trainModelUriOrBuffer, _evalModelUriOrBuffer, _optimizerModelUriOrBuffer, _options) {
          throw new Error("Method not implemented yet.");
        }
      };
      wasmBackend = new OnnxruntimeTrainingWebAssemblyBackend();
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
    const wasmBackend2 = false ? null.wasmBackend : (init_backend_wasm_training(), __toCommonJS(backend_wasm_training_exports)).wasmBackend;
    if (false) {
      registerBackend("webgpu", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
    if (false) {
      registerBackend("xnnpack", wasmBackend2, 9);
      registerBackend("webnn", wasmBackend2, 9);
    }
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(lib_exports);
})();