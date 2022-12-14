Archivos del Proyecto:

* = carpeta

envexample.txt (ejemplo de variables de entorno)
package.json
package-lock.json
*config
    config.js (módulo de variables de entorno)
*DB
    *Archivo
        *Container
            archivoContainer.js (clase ContenedorArchivo, métodos de productos y carritos)
        *DAO
            *Cart
                archivoCartDAO.js (extiende de clase ContenedorArchivo)
            *Product
                archivoProductDAO.js (extiende de clase ContenedorArchivo)
    *Firebase
        *Config
            firebaseKeys.json (claves de firebase)
        *Container
            firebaseContainer.js (clase ContenedorFirebase, métodos de productos y carritos)
        *DAO
            *Cart
                firebaseCartDAO.js (extiende de clase ContenedorFirebase)
            *Product
                firebaseProductDAO.js (extiende de clase ContenedorFirebase)
    *Memoria
        *Container
            memoriaContainer.js (clase ContenedorMemoria, métodos de productos y carritos)
        *DAO
            *Cart
                memoriaCartDAO.js (extiende de clase ContenedorMemoria)
            *Product
                memoriaProductDAO.js (extiende de clase ContenedorMemoria)
    *MongoDB
        *Config
            configMongo.js (configuración de mongoose)
        *Container
            mongoDBContainer.js (clase ContenedorMongoDB, métodos de productos y carritos)
        *DAO
            *Cart
                mongoDBCartDAO.js (extiende de clase ContenedorMongoDB)
            *Product
                mongoDBProductDAO.js (extiende de clase ContenedorMongoDB)
        *Models
            mongooseSchemas.js (configuración de formato de datos para cargar en mongo)
*logs
    error.log (registro de mensajes de nivel error con log4js)
    warn.log (registro de mensajes de nivel warning con log4js)
*middlewares
    authentication.js (autenticación para rutas rutas privadas)
    expressJson.js (configuración de express JSON)
    expressStatic.js (configuración de express Static)
    expressURLEncoded.js (configuración de express URL encoded)
    google.js (configuración de Google oauth para Passport)
    gzip.js (compresión gzip)
    passport.js (configuración de passport)
    session.js (configuración de session)
*public
    style.css (estilos de las vistas)
    *views (html templates)
        *partials
            footer.ejs (pie de página)
            navbar.ejs (menú de navegación)
        cart.ejs (carrito de compras)
        chat.ejs (chat)
        form.ejs (formulario de carga/modificación/eliminación de productos)
        gallery.ejs (galería de productos)
        home.ejs (inicio)
        login.ejs (página de inicio de sesión)
        login-error.ejs (página de error de inicio de sesión)
        not-found.ejs (página 404 no encontradp)
        product.ejs (página de detalle de producto)
        register.ejs (página de registro de nuevo usuario)
        register-error.ejs (página de error de registro de usuario)
        user-home.ejs (página de inicio de usuario)
*routes
    archivoRouter.js (rutas de productos y carrito, exporta a routerIndex si la variable de entorno PERS=ARCHIVO)
    firebaseRouter.js (rutas de productos y carrito, exporta a routerIndex si la variable de entorno PERS=FIREBASE)
    homeRouter.js (ruta get de home del user, exporta a routerIndex)
    loginRouter.js (rutas get y post de login, exporta a routerIndex)
    logoutRouter.js (ruta post de user, exporta a routerIndex)
    memoriaRouter.js (rutas de productos y carrito, exporta a routerIndex si la variable de entorno PERS=MEMORIA)
    mongoDBRouter.js (rutas de productos y carrito, exporta a routerIndex si la variable de entorno PERS=MONGODB)
    registerRouter.js (rutas get y post de register, exporta a routerIndex)
    routerIndex.js (índice de todas las rutas)
*Screenshots (capturas de terminal Gitbash con Heroku)
*SRC
    server.js (configuración del servidor)
*utils
    logger.js (configuración de loggers con log4js)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

*Variables de entorno .env (no incluido, ver envexample.txt)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

*Este listado de productos se copió de mi proyecto del curso de React. Para usar con los formularios
/de la plantilla 'form.ejs'.

[    
    {
        "displayOrder": 1,
        "productCode": "3kFG8BWsTw",
        "stock": 20,
        "name": "Shampoo Sólido Cabello Graso",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "graso",
        "function": "limpieza",
        "zeroWaste": "SI",
        "price": 450,
        "presentation": "50gr",
        "thumbnail": "../../Images/shampoo-solido-cabello-graso",
        "detailThumbnail": "../../Images/shampoo-solido-graso-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 2,
        "productCode": "LTnyn3CToZ",
        "stock": 20,
        "name": "Shampoo Sólido Cabello Seco", 
        "productType": "productoCapilar", 
        "skinType": "no disponible", 
        "hairType": "seco",
        "function": "limpieza",
        "zeroWaste": "SI",
        "price": 450, 
        "presentation": "50gr",
        "thumbnail": "../../Images/shampoo-solido-cabello-seco",
        "detailThumbnail": "../../Images/shampoo-solido-seco-grande",
        "description": "Si tu pelo tiene tendencia a ser muy seco, quebradizo o con frizz o si fue sometido a tratamientos agresivos como tinturas, decoloraciones o uso constante de la planchita, nuestro shampoo con aceite de almendras dulces, formulado con mayor porcentaje de aceite y agregado de elastina ayudará a mantenerlo fuerte e hidratado. Con aroma a jazmín, rosas y benjuí.",
        "instructions": "Frotá la pastilla entre tus manos o sobre el cabello mojado hasta generar la cantidad de espuma deseada. Masajeá el cuero cabelludo durante algunos minutos y luego enjuagá. Si tu cabello es muy seco, dejar algo de producto ayudará a mantenerlo hidratado. No olvides colocar el shampoo en un lugar seco después de usarlo para maximizar su duración.",
        "inci": "SCI (Sodium Cocoyl Isethionate), Hidrolato de Rosas (Rosa Damascena Flower Water), Aceite de Almendras Dulces (Prunus Amygdalus Dulcis Oil), Manteca de Karité (Butyrospermum Parkii Butter), Elastina Hidrolizada (Hydrolized Elastin, Phenoxyethanol / Ethylhexylglycerin), Proteína de Seda Hidrolizada (Hydrolized Silk Protein, Phenoxyethanol / Ethylhexylglycerin), Geogard®221 (Dehydroacetic Acid, Benzyl Alcohol), Vitamina E (Tocopherol Acetate), AE de Ylang Ylang (Cananga Odorata Oil), Esencia de Sándalo."
    },

    {
        "displayOrder": 3,
        "productCode": "PnPYi9dFYm",
        "stock": 20,
        "name": "Acondicionador Sólido para Todo Tipo de Cabello",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "todos",
        "function": "limpieza",
        "zeroWaste": "SI",
        "price": 500,
        "presentation": "50gr",
        "thumbnail": "../../Images/acondicionador-solido-todo-tipo-cabello",
        "detailThumbnail": "../../Images/acondicionador-solido-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 4,
        "productCode": "RzA437Z23R",
        "stock": 15,
        "name": "Aceite Capilar de Jojoba", 
        "productType": "productoCapilar", 
        "skinType": "no disponible", 
        "hairType": "graso", 
        "function": "nutrición", 
        "zeroWaste": "NO",
        "price": 700, 
        "presentation": "60ml",
        "thumbnail": "../../Images/aceite-capilar-jojoba",
        "detailThumbnail": "../../Images/aceite-jojoba-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 5,
        "productCode": "acbZ5iyULk",
        "stock": 15,
        "name": "Aceite Capilar de Almendras Dulces",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "todos",
        "function": "nutrición",
        "zeroWaste": "NO",
        "price": 500,
        "presentation": "60ml",
        "thumbnail": "../../Images/aceite-capilar-almendras-dulces",
        "detailThumbnail": "../../Images/aceite-almendras-dulces-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 6,
        "productCode": "mBwmCKYqbY",
        "stock": 15,
        "name": "Blend de Aceites Capilares Palta y Coco",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "seco",
        "function": "nutrición",
        "zeroWaste": "NO",
        "price": 600,
        "presentation": "60ml",
        "thumbnail": "../../Images/aceite-capilar-palta-coco",
        "detailThumbnail": "../../Images/aceite-palta-coco-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 7,
        "productCode": "tMgUvwAqEf",
        "stock": 15,
        "name": "Blend de Aceites para el Cabello",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "todos",
        "function": "nutrición",
        "zeroWaste": "NO",
        "price": 700,
        "presentation": "60ml",
        "thumbnail": "../../Images/blend-aceite-capilar",
        "detailThumbnail": "../../Images/blend-aceites-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 8,
        "productCode": "4xxbHggYDC",
        "stock": 20,
        "name": "Limpiador Facial Sólido Pieles Grasas",
        "productType": "productoFacial",
        "skinType": "grasa",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "SI",
        "price": 400,
        "presentation": "50gr",
        "thumbnail": "../../Images/limpiador-facial-solido-piel-grasa",
        "detailThumbnail": "../../Images/limpiador-facial-solido-pieles-grasas-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 9,
        "productCode": "LfVaebZkGD",
        "stock": 20,
        "name": "Limpiador Facial Sólido Pieles Secas",
        "productType": "productoFacial",
        "skinType": "seca",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "SI",
        "price": 400,
        "presentation": "50gr",
        "thumbnail": "../../Images/limpiador-facial-solido-piel-seca",
        "detailThumbnail": "../../Images/limpiador-facial-solido-pieles-secas-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 10,
        "productCode": "QQHnatDcZf",
        "stock": 20,
        "name": "Limpiador Facial Sólido Pieles Sensibles",
        "productType": "productoFacial",
        "skinType": "sensible",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "SI",
        "price": 400,
        "presentation": "50gr",
        "thumbnail": "../../Images/limpiador-facial-solido-piel-sensible",
        "detailThumbnail": "../../Images/limpiador-facial-solido-pieles-sensibles-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 11,
        "productCode": "TuQouYzegg",
        "stock": 15,
        "name": "Limpiador Facial Pieles Normales",
        "productType":"productoFacial",
        "skinType": "todos",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "NO",
        "price": 800,
        "presentation": "125ml",
        "thumbnail": "../../Images/limpiador-facial-piel-normal",
        "detailThumbnail": "../../Images/limpiador-facial-pieles-normales-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 12,
        "productCode": "bg8jjTeA9t",
        "stock": 30,
        "name": "Agua de Rosas",
        "productType": "productoFacial",
        "skinType": "todos",
        "hairType": "no disponible",
        "function": "hidratación",
        "zeroWaste": "NO",
        "price": 600,
        "presentation": "60ml",
        "thumbnail": "../../Images/agua-floral-rosas",
        "detailThumbnail": "../../Images/agua-rosas-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 13,
        "productCode": "nYWCCDbn8x",
        "stock": 30,
        "name": "Agua de Lavanda",
        "productType": "productoFacial",
        "skinType": "grasa",
        "hairType": "no disponible",
        "function": "hidratación",
        "zeroWaste": "NO",
        "price": 600,
        "presentation": "60ml",
        "thumbnail": "../../Images/agua-floral-lavanda",
        "detailThumbnail": "../../Images/agua-lavanda-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 14,
        "productCode": "6JwiDD6gWd",
        "stock": 10,
        "name": "Sérum Facial con Vitamina C",
        "productType": "productoFacial",
        "skinType": "todos",
        "hairType": "no disponible",
        "function": "nutrición",
        "zeroWaste": "NO",
        "price": 600,
        "presentation": "15cc",
        "thumbnail": "../../Images/serum-facial-vitamina-c",
        "detailThumbnail": "../../Images/serum-facial-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 15,
        "productCode": "MB48Aoawy6",
        "stock": 25,
        "name": "Body Lotion Pieles Grasas",
        "productType": "productoCorporal",
        "skinType": "grasa",
        "hairType": "no disponible",
        "function": "hidratación",
        "zeroWaste": "NO",
        "price": 1000,
        "presentation": "250cc",
        "thumbnail": "../../Images/body-lotion-pieles-grasas",
        "detailThumbnail": "../../Images/body-lotion-piel-grasa-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 16,
        "productCode": "QScPsHfScw",
        "stock": 25,
        "name": "Body Lotion Pieles Secas",
        "productType": "productoCorporal",
        "skinType": "seca",
        "hairType": "no disponible",
        "function": "hidratación",
        "zeroWaste": "NO",
        "price": 1000,
        "presentation": "250cc",
        "thumbnail": "../../Images/body-lotion-pieles-secas",
        "detailThumbnail": "../../Images/body-lotion-piel-seca-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 17,
        "productCode": "UBgR2ZEHVE",
        "stock": 25,
        "name": "Body Lotion Pieles Maduras",
        "productType": "productoCorporal",
        "skinType": "madura",
        "hairType": "no disponible",
        "function": "hidratación",
        "zeroWaste": "NO",
        "price": 1000,
        "presentation": "250cc",
        "thumbnail": "../../Images/body-lotion-pieles-maduras",
        "detailThumbnail": "../../Images/body-lotion-piel-madura-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 18,
        "productCode": "f9m8GsdPjc",
        "stock": 20,
        "name": "Arcilla Verde",
        "productType": "productoFacial",
        "skinType": "grasa",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "NO",
        "price": 550,
        "presentation": "50gr",
        "thumbnail": "../../Images/arcilla-facial-verde",
        "detailThumbnail": "../../Images/arcilla-verde-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 19,
        "productCode": "pCMUztwhaA",
        "stock": 20,
        "name": "Arcilla Blanca",
        "productType": "productoFacial",
        "skinType": "todos",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "NO",
        "price": 550,
        "presentation": "50gr",
        "thumbnail": "../../Images/arcilla-facial-blanca",
        "detailThumbnail": "../../Images/arcilla-blanca-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 20,
        "productCode": "Hru2H984q8",
        "stock": 20,
        "name": "Arcilla Roja",
        "productType": "productoFacial",
        "skinType": "seca",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "NO",
        "price": 550,
        "presentation": "50gr",
        "thumbnail": "../../Images/arcilla-facial-roja",
        "detailThumbnail": "../../Images/arcilla-roja-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 21,
        "productCode": "NgKaZZmUdZ",
        "stock": 20,
        "name": "Arcilla Detox",
        "productType": "productoFacial",
        "skinType": "todos",
        "hairType": "no disponible",
        "function": "limpieza",
        "zeroWaste": "NO",
        "price": 600,
        "presentation": "50gr",
        "thumbnail": "../../Images/arcilla-facial-detox",
        "detailThumbnail": "../../Images/arcilla-detox-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 22,
        "productCode": "RWjkeWwz7j",
        "stock": 40,
        "name": "Cofia de Seda",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "todos",
        "function": "otros",
        "zeroWaste": "SI",
        "price": 500,
        "presentation": "x 1",
        "thumbnail": "../../Images/cofia-seda-antifrizz",
        "detailThumbnail": "../../Images/cofia-seda-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    },

    {
        "displayOrder": 23,
        "productCode": "WfQtEoUP2z",
        "stock": 50,
        "name": "Sujetador de Cabello de Seda",
        "productType": "productoCapilar",
        "skinType": "no disponible",
        "hairType": "todos",
        "function": "otros",
        "zeroWaste": "SI",
        "price": 200,
        "presentation": "x 1",
        "thumbnail": "../../Images/sujetador-seda-antifrizz",
        "detailThumbnail": "../../Images/sujetador-seda-grande",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesqu eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
        "instructions": "Lorem ipsum dolor sit amet, consectetue adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputa.",
        "inci": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus."
    }
]