import { inject, injectable } from 'inversify';
import chunk from 'lodash.chunk';
import { action, makeAutoObservable } from 'mobx';
import { Image, ProductOption, Variant } from 'swell-js';
import { uploadFile } from '~/state/gateways/files';
import { ProductStore } from '~/state/product-store';
import { ProductStockStatus } from '~/types/model';
import { Product } from '~/types/swell.types';
import { getImageDimensions } from '~/utils/get-image-dimensions';
import { Injectables } from '~/utils/inversifyJS/injectables';
import {
  createPresenterContext,
  createPresenterContextHook,
} from '~/utils/inversifyJS/presenter-context';
import { useDependency } from '~/utils/inversifyJS/use-dependency';
import { ToastThemedStore } from '../toast-themed/toast-themed.store';

@injectable()
export class ProductFormPresenter {
  constructor(
    @inject(Symbol.for(Injectables.ProductStore)) private productStore: ProductStore,
    @inject(Symbol.for(Injectables.ToastThemedStore)) private toastStore: ToastThemedStore
  ) {
    makeAutoObservable(this, {
      setProduct: action,
      setProductDescription: action,
      setProductName: action,
      setProductOptions: action,
      setProductSKU: action,
      setProductStatus: action,
      setProductStockVariants: action,
      setUploadedImages: action,
      handleRemoveImage: action,
    });
  }

  private _product?: Product;

  get product() {
    return this._product;
  }

  setProduct = (product: Product) => {
    this._product = product;

    this.setUploadedImages(product.images ?? []);
    this.setProductOptions(product.options ?? []);
    this.setProductStockVariants(product.variants.results);
  };

  get heroImage() {
    return this.uploadedImages?.[0];
  }

  get remainingImages() {
    return chunk(this.uploadedImages.slice(1), 2);
  }

  private _productName?: string;

  get productName() {
    return this._productName ?? this.product?.name;
  }

  setProductName = (name: string) => {
    this._productName = name;
  };

  private _productDescription?: string;

  get productDescription() {
    return this._productDescription;
  }

  setProductDescription = (description: string) => {
    this._productDescription = description;
  };

  private _productSKU?: string;

  get productSKU() {
    return this._productSKU ?? this.product?.sku;
  }

  setProductSKU = (value: string) => {
    this._productSKU = value;
  };

  private _productStatus?: ProductStockStatus;

  get productStatus() {
    if (this._productStatus) {
      return this._productStatus;
    }

    const stockStatus = this.product?.content?.stockStatus;
    if (stockStatus !== null && stockStatus !== undefined) {
      return stockStatus;
    }
  }

  setProductStatus = (status: ProductStockStatus) => {
    this._productStatus = status;
  };

  private _productOptions: ProductOption[] = [];

  get productOptions() {
    return this._productOptions;
  }

  setProductOptions = (options: ProductOption[]) => {
    this._productOptions = options;
  };

  private _productStockVariants: Variant[] = [];

  get productStockVariants() {
    return this._productStockVariants;
  }

  setProductStockVariants = (variants: Variant[]) => {
    this._productStockVariants = variants;
  };

  get isSavingProduct() {
    return this.productStore.isSavingProduct;
  }

  handleImageSelected = (imageUrl: string) => {
    this.uploadImage(imageUrl);
  };

  handleRemoveImage = (imageToRemove: Image) => {
    const filteredImages = this.uploadedImages.filter(
      (image) => imageToRemove?.file?.url !== image.file?.url
    );
    this.setUploadedImages(filteredImages);
  };

  uploadImage = async (fileUrlBase64: string) => {
    try {
      const result = await uploadFile(fileUrlBase64);

      // We don't get image dimensions when uploading base64 images,
      // so we have to retrieve them by loading the image into the Image
      // object and extracting the width and height values.

      const imageDimensions = await getImageDimensions(result.url);
      this.addUploadedImage({ file: { ...result, ...imageDimensions } });
    } catch (err) {
      this.toastStore.show(
        'Upload Error',
        (err as Error).message ?? 'There was a problem uploading your image',
        true
      );
    }
  };

  private _uploadedImages: Image[] = [];

  get uploadedImages() {
    return this._uploadedImages;
  }

  addUploadedImage = (image: Image) => {
    this._uploadedImages.push(image);
  };

  setUploadedImages = (images: Image[]) => {
    this._uploadedImages = [...images];
  };

  save = () => {
    this.productStore.saveProduct({
      productId: this.product?.id,
      input: {
        active: true,
        stockTracking: true,
        name: this.productName,
        sku: this.productSKU,
        images: this.uploadedImages,
        options: this.productOptions,
        // @ts-expect-error saveProduct takes the GET type, not the update type, so this mismatches
        variants: this.productStockVariants,
        description: this.productDescription,
        content: {
          stockStatus: this.productStatus,
        },
      },
    });
  };
}

export const useProductFormPresenter = () =>
  useDependency<ProductFormPresenter>(Symbol.for(Injectables.ProductFormPresenter));

export const ProductFormPresenterContext = createPresenterContext<ProductFormPresenter>();

export const useProductFormPresenterContext = createPresenterContextHook(
  ProductFormPresenterContext,
  'ProductFormPresenter'
);
