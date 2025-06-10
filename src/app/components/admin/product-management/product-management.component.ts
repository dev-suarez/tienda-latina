import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="product-management">
      <div class="management-header">
        <h2>Gestión de Productos</h2>
        <button class="btn-primary" (click)="showAddForm = !showAddForm">
          {{ showAddForm ? 'Cancelar' : '+ Agregar Producto' }}
        </button>
      </div>
      
      <!-- Add/Edit Product Form -->
      <div class="product-form" *ngIf="showAddForm || editingProduct">
        <h3>{{ editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto' }}</h3>
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Nombre del Producto *</label>
              <input type="text" id="name" formControlName="name" />
              <div class="error" *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched">
                El nombre es obligatorio
              </div>
            </div>
            
            <div class="form-group">
              <label for="price">Precio (₪) *</label>
              <input type="number" id="price" formControlName="price" min="0" step="0.01" />
              <div class="error" *ngIf="productForm.get('price')?.invalid && productForm.get('price')?.touched">
                El precio debe ser mayor a 0
              </div>
            </div>
            
            <div class="form-group">
              <label for="stock">Stock *</label>
              <input type="number" id="stock" formControlName="stock" min="0" />
              <div class="error" *ngIf="productForm.get('stock')?.invalid && productForm.get('stock')?.touched">
                El stock debe ser mayor o igual a 0
              </div>
            </div>
            
            <div class="form-group">
              <label for="category">Categoría *</label>
              <select id="category" formControlName="category">
                <option value="">Seleccionar categoría</option>
                <option value="Harinas y Granos">Harinas y Granos</option>
                <option value="Enlatados">Enlatados</option>
                <option value="Salsas y Condimentos">Salsas y Condimentos</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Frutas y Vegetales">Frutas y Vegetales</option>
                <option value="Dulces y Postres">Dulces y Postres</option>
                <option value="Carnes y Embutidos">Carnes y Embutidos</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="description">Descripción *</label>
            <textarea id="description" formControlName="description" rows="3"></textarea>
            <div class="error" *ngIf="productForm.get('description')?.invalid && productForm.get('description')?.touched">
              La descripción es obligatoria
            </div>
          </div>
          
          <div class="form-group">
            <label for="imageUrl">URL de la Imagen *</label>
            <input type="url" id="imageUrl" formControlName="imageUrl" />
            <div class="error" *ngIf="productForm.get('imageUrl')?.invalid && productForm.get('imageUrl')?.touched">
              URL de imagen válida es obligatoria
            </div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="isActive" />
              <span>Producto activo</span>
            </label>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="cancelEdit()">
              Cancelar
            </button>
            <button type="submit" class="btn-primary" [disabled]="productForm.invalid">
              {{ editingProduct ? 'Actualizar' : 'Agregar' }} Producto
            </button>
          </div>
        </form>
      </div>
      
      <!-- Products List -->
      <div class="products-list">
        <div class="list-header">
          <h3>Lista de Productos ({{ products.length }})</h3>
        </div>
        
        <div class="products-table">
          <div class="table-header">
            <div class="col-image">Imagen</div>
            <div class="col-name">Nombre</div>
            <div class="col-price">Precio</div>
            <div class="col-stock">Stock</div>
            <div class="col-status">Estado</div>
            <div class="col-actions">Acciones</div>
          </div>
          
          <div class="table-row" *ngFor="let product of products">
            <div class="col-image">
              <img [src]="product.imageUrl" [alt]="product.name" />
            </div>
            <div class="col-name">
              <strong>{{ product.name }}</strong>
              <p>{{ product.category }}</p>
            </div>
            <div class="col-price">₪{{ product.price }}</div>
            <div class="col-stock" [class.low-stock]="product.stock <= 5">
              {{ product.stock }}
            </div>
            <div class="col-status">
              <span class="status-badge" [class.active]="product.isActive">
                {{ product.isActive ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
            <div class="col-actions">
              <button class="btn-edit" (click)="editProduct(product)">✏️</button>
              <button class="btn-delete" (click)="deleteProduct(product.id)">🗑️</button>
            </div>
          </div>
        </div>
        
        <div class="empty-state" *ngIf="products.length === 0">
          <p>No hay productos registrados</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-management {
      padding: 24px;
    }

    .management-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .management-header h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
    }

    .btn-primary {
      background: #DC2626;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .btn-primary:hover {
      background: #B91C1C;
    }

    .btn-primary:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #374151;
      border: 2px solid #E5E7EB;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      border-color: #D1D5DB;
      background: #F9FAFB;
    }

    .product-form {
      background: #F9FAFB;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 32px;
    }

    .product-form h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 20px 0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 4px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      font-size: 14px;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #DC2626;
    }

    .checkbox-label {
      display: flex !important;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .checkbox-label input {
      width: auto !important;
    }

    .error {
      color: #DC2626;
      font-size: 12px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .list-header {
      margin-bottom: 16px;
    }

    .list-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
    }

    .products-table {
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      overflow: hidden;
    }

    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 60px 1fr 80px 60px 80px 100px;
      gap: 12px;
      align-items: center;
      padding: 12px;
    }

    .table-header {
      background: #F3F4F6;
      font-weight: 600;
      color: #374151;
      font-size: 12px;
      text-transform: uppercase;
    }

    .table-row {
      border-top: 1px solid #E5E7EB;
    }

    .table-row:hover {
      background: #F9FAFB;
    }

    .col-image img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 6px;
    }

    .col-name strong {
      display: block;
      font-size: 14px;
      color: #1F2937;
    }

    .col-name p {
      font-size: 12px;
      color: #6B7280;
      margin: 2px 0 0 0;
    }

    .col-price {
      font-weight: 600;
      color: #059669;
    }

    .col-stock {
      font-weight: 600;
    }

    .col-stock.low-stock {
      color: #DC2626;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      background: #FEE2E2;
      color: #DC2626;
    }

    .status-badge.active {
      background: #D1FAE5;
      color: #059669;
    }

    .col-actions {
      display: flex;
      gap: 8px;
    }

    .btn-edit,
    .btn-delete {
      background: none;
      border: none;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s ease;
    }

    .btn-edit:hover {
      background: #EFF6FF;
    }

    .btn-delete:hover {
      background: #FEE2E2;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #6B7280;
    }

    @media (max-width: 768px) {
      .management-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }
      
      .table-header,
      .table-row {
        grid-template-columns: 1fr;
        gap: 8px;
      }
      
      .col-image,
      .col-actions {
        justify-self: center;
      }
    }
  `]
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