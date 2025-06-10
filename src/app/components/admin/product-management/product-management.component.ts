import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;
  showAddForm = false;
  editingProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initForm();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageUrl: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      isActive: [true]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      
      if (this.editingProduct) {
        this.productService.updateProduct({
          ...formValue,
          id: this.editingProduct.id
        });
      } else {
        this.productService.addProduct(formValue);
      }
      
      this.cancelEdit();
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.showAddForm = false;
    this.productForm.patchValue(product);
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProduct(id);
    }
  }

  cancelEdit(): void {
    this.showAddForm = false;
    this.editingProduct = null;
    this.productForm.reset();
    this.productForm.patchValue({ isActive: true });
  }
}