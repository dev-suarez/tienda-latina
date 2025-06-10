import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>(this.getInitialProducts());
  public products$ = this.productsSubject.asObservable();

  private getInitialProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Arepa Harina P.A.N.',
        description: 'Harina de maíz precocida para hacer arepas tradicionales venezolanas',
        price: 25,
        imageUrl: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 50,
        category: 'Harinas y Granos',
        isActive: true
      },
      {
        id: 2,
        name: 'Frijoles Negros Goya',
        description: 'Frijoles negros enlatados, perfectos para la cocina latina',
        price: 12,
        imageUrl: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 30,
        category: 'Enlatados',
        isActive: true
      },
      {
        id: 3,
        name: 'Salsa Valentina',
        description: 'Salsa picante mexicana tradicional, perfecta para cualquier comida',
        price: 18,
        imageUrl: 'https://images.pexels.com/photos/4198832/pexels-photo-4198832.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 25,
        category: 'Salsas y Condimentos',
        isActive: true
      },
      {
        id: 4,
        name: 'Café Bustelo',
        description: 'Café molido cubano de sabor intenso y aromático',
        price: 35,
        imageUrl: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 20,
        category: 'Bebidas',
        isActive: true
      },
      {
        id: 5,
        name: 'Queso Fresco',
        description: 'Queso fresco latino ideal para arepas, pupusas y más',
        price: 28,
        imageUrl: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 15,
        category: 'Lácteos',
        isActive: true
      },
      {
        id: 6,
        name: 'Plátanos Maduros',
        description: 'Plátanos maduros perfectos para freír o hacer tajadas',
        price: 15,
        imageUrl: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 40,
        category: 'Frutas y Vegetales',
        isActive: true
      },
      {
        id: 7,
        name: 'Maseca Harina de Maíz',
        description: 'Harina de maíz para tortillas y tamales mexicanos',
        price: 22,
        imageUrl: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 35,
        category: 'Harinas y Granos',
        isActive: true
      },
      {
        id: 8,
        name: 'Dulce de Leche Havanna',
        description: 'Auténtico dulce de leche argentino, cremoso y delicioso',
        price: 32,
        imageUrl: 'https://images.pexels.com/photos/4198832/pexels-photo-4198832.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 18,
        category: 'Dulces y Postres',
        isActive: true
      }
    ];
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getActiveProducts(): Observable<Product[]> {
    return new BehaviorSubject(this.productsSubject.value.filter(p => p.isActive && p.stock > 0)).asObservable();
  }

  getProductById(id: number): Product | undefined {
    return this.productsSubject.value.find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const products = this.productsSubject.value;
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct: Product = { ...product, id: newId };
    this.productsSubject.next([...products, newProduct]);
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.productsSubject.value;
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.productsSubject.next([...products]);
    }
  }

  deleteProduct(id: number): void {
    const products = this.productsSubject.value.filter(p => p.id !== id);
    this.productsSubject.next(products);
  }

  updateStock(productId: number, newStock: number): void {
    const products = this.productsSubject.value;
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
      this.productsSubject.next([...products]);
    }
  }
}