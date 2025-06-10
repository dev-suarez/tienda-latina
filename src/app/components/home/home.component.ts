import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1>Sabores de Casa en Israel</h1>
          <p>Encuentra todos los productos latinos que extrañas. Desde arepas hasta dulce de leche, traemos el sabor de Latinoamérica a tu mesa.</p>
          <div class="hero-actions">
            <button class="cta-button" routerLink="/products">
              Ver Productos
            </button>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://images.pexels.com/photos/4198832/pexels-photo-4198832.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Productos Latinos" />
        </div>
      </div>
      
      <div class="features-section">
        <h2>¿Por qué elegir Sabores Latinos?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🌮</div>
            <h3>Productos Auténticos</h3>
            <p>Importamos directamente los mejores productos latinos para mantener el sabor original de casa</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Entrega en Israel</h3>
            <p>Entregamos en todo Israel para que puedas disfrutar de tus productos favoritos sin salir de casa</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💳</div>
            <h3>Pago Fácil</h3>
            <p>Paga con transferencia bancaria o Bit de forma rápida y segura</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏠</div>
            <h3>Sabor de Casa</h3>
            <p>Conecta con tus raíces y comparte el sabor de Latinoamérica con tu familia</p>
          </div>
        </div>
      </div>
      
      <div class="categories-section">
        <h2>Nuestras Categorías</h2>
        <div class="categories-grid">
          <div class="category-card">
            <div class="category-icon">🌽</div>
            <h3>Harinas y Granos</h3>
            <p>Harina P.A.N., Maseca, arroz y más</p>
          </div>
          <div class="category-card">
            <div class="category-icon">🥫</div>
            <h3>Enlatados</h3>
            <p>Frijoles, salsas y conservas</p>
          </div>
          <div class="category-card">
            <div class="category-icon">🌶️</div>
            <h3>Salsas y Condimentos</h3>
            <p>Salsas picantes y especias latinas</p>
          </div>
          <div class="category-card">
            <div class="category-icon">☕</div>
            <h3>Bebidas</h3>
            <p>Café latino, jugos y refrescos</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: calc(100vh - 64px);
    }

    .hero-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .hero-content h1 {
      font-size: 48px;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 16px 0;
      line-height: 1.1;
    }

    .hero-content p {
      font-size: 18px;
      color: #6B7280;
      margin: 0 0 32px 0;
      line-height: 1.6;
    }

    .cta-button {
      background: #DC2626;
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      background: #B91C1C;
      transform: translateY(-2px);
    }

    .hero-image {
      display: flex;
      justify-content: center;
    }

    .hero-image img {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }

    .features-section {
      background: #F9FAFB;
      padding: 80px 20px;
    }

    .features-section h2 {
      font-size: 36px;
      font-weight: 700;
      color: #1F2937;
      text-align: center;
      margin: 0 0 48px 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .feature-card {
      background: white;
      padding: 32px 24px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
    }

    .feature-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .feature-card h3 {
      font-size: 20px;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 12px 0;
    }

    .feature-card p {
      color: #6B7280;
      line-height: 1.6;
      margin: 0;
    }

    .categories-section {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .categories-section h2 {
      font-size: 36px;
      font-weight: 700;
      color: #1F2937;
      text-align: center;
      margin: 0 0 48px 0;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .category-card {
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-2px);
    }

    .category-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    .category-card h3 {
      font-size: 16px;
      font-weight: 600;
      color: #92400E;
      margin: 0 0 8px 0;
    }

    .category-card p {
      color: #A16207;
      font-size: 14px;
      margin: 0;
    }

    @media (max-width: 768px) {
      .hero-section {
        grid-template-columns: 1fr;
        gap: 32px;
        text-align: center;
        padding: 40px 20px;
      }
      
      .hero-content h1 {
        font-size: 36px;
      }
      
      .hero-content p {
        font-size: 16px;
      }
      
      .features-section,
      .categories-section {
        padding: 60px 20px;
      }
      
      .features-section h2,
      .categories-section h2 {
        font-size: 28px;
      }
      
      .features-grid {
        gap: 24px;
      }
    }
  `]
})
export class HomeComponent {}