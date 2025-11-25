# 🚀 URL del Proyecto en Vercel

👉 https://numeros-romanos-tiziana-ochoa.vercel.app/

# Conversor de Números Romanos – API

API sencilla en Node.js que convierte números arábigos a romanos y romanos a arábigos, cumpliendo validaciones estrictas del sistema numérico romano.

# ✅ Requisitos previos

* Node.js 18 o superior
* Cuenta en Vercel
* Acceso al repositorio en GitHub (opcional si usas despliegue continuo)

# 🧩 Instalación local

* Clonar el repositorio y ubicarse en la raíz
* Instalar dependencias:
```
npm install
```
* Levantar el servidor local:
```
npm start
```
* Consumir los endpoints:
```
GET /a2r?arabic=123
GET /r2a?roman=CXXIII
```
# 🌍 Endpoints disponibles
* 🔹 Convertir arábigo → romano
```
GET /a2r?arabic=NUMERO
```
✅ Ejemplo:
```
/a2r?arabic=2025
```
✅ Respuesta:
```
{ "roman": "MMXXV" }
```
* 🔹 Convertir romano → arábigo
```
GET /r2a?roman=VALOR
```
✅ Ejemplo:
```
/r2a?roman=XLII
```
✅ Respuesta:
```
{ "arabic": 42 }
```
# 🧪 Validaciones implementadas

La API:
* Rechaza símbolos inválidos (A, 12ABC)
* Detecta sustracciones prohibidas (IL, VX, IC)
* Detecta repeticiones incorrectas (IIII, VV)
* Solo acepta números 1 a 3999
* Devuelve 400 ante errores
* Habilita CORS para uso externo

# 🚀 Despliegue en Vercel

Cada despliegue se realiza manualmente desde la terminal con:
```
vercel
vercel --prod
```
Esto genera automáticamente tu URL de producción.
La carpeta .vercel/ no debe subirse al repositorio

# 📂 Estructura del proyecto
```
numeros-romanos-TizianaOchoa
/api
 └── index.js
/test
└── romanos.test.js
romanos.js
package.json
package-lock.json
vercel.json
README.md
```
#🔧 Scripts útiles
```
npm start   → inicia el servidor
```
(No se requieren pruebas automáticas en este proyecto)

#📌 Personalización

* Si deseas cambiar las rutas, edítalas en api/index.js

**Variables de entorno pueden agregarse en:**
```
vercel env add
```
# 👩‍💻 Autora
Tiziana Ochoa
