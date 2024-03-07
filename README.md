#Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``npm install`
5. Ejecutar el comando ``npm run dev`
6. Ejecutar comando de prisma

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el Seed para [crear la base de datos local](localhost:3000/api/seed)

## Nota: Usuario por defecto de la seed
__usuaruio__: pepe@pepe.com
__password__: 123123


# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage

```

```
