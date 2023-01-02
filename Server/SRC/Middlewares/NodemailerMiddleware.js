const {Env} = require('../Config/config')
const { Logger } = require('../Utils/Logger')
const Nodemailer = require('nodemailer')
const {TotalCalculator} = require('../Utils/Calculator')
const {TrackingCodeGenerator} = require('../Utils/TrackingCodeGenerator')

const transporter = Nodemailer.createTransport({
    host: 'smtp.ethereal.email',  
    port: 587,
    auth: {
        user: Env.NODEMAILER_EMAIL,
        pass: Env.NODEMAILER_PASSWORD,
    }
})

const sendEmail = async (clientForm, cart) => {  
    try {
        const purchaseDetail = cart.forEach(product => {
            `
                <li>
                    Producto: ${product.productName}\n
                    Cantidad: ${product.productQuantity}\n
                    Subtotal: $${product.productQuantity * product.productPrice}
                </li>
            `
        })
        const purchaseTotal = TotalCalculator(cart)
        const trackingCode = TrackingCodeGenerator(10)
        const purchaseEmailContent = {
            from: 'RAW',
            to: clientForm.email,
            subject: "Tu resumen de compra",
            text: "Hola! Tu compra fue procesada correctamente. Te adjuntamos una copia de los datos. Muchas gracias!! :)",    
            html: `
                <main>
                    <h1>TU RESUMEN DE COMPRA</h1>
                    <p>
                        Hola! Tu compra fue procesada correctamente.
                        Te adjuntamos una copia de los datos. 
                        Muchas gracias!! :)
                    </p>
                    <h2>Cliente:</h2>
                    <br>
                    <ul>
                        <li><b>Nombre: </b>${clientForm.name}</li>
                        <li><b>Apellido: </b>${clientForm.surname}</li>
                        <li><b>Email: </b>${clientForm.email}</li>
                        <li><b>Dirección: </b>${clientForm.adress}</li>
                        <li><b>Localidad: </b>${clientForm.locality}</li>
                        <li><b>Provincia: </b>${clientForm.province}</li>
                        <li><b>Código Postal: </b>${clientForm.postCode}</li>
                        <li><b>Teléfono: </b>${clientForm.phoneNumber}</li>
                    </ul>
                    <hr>
                    <h2>Detalle:</h2>
                    <ul>
                        ${purchaseDetail}
                    </ul>
                    <h3>TOTAL: $${purchaseTotal}</h3>
                    <h3>Código de seguimiento<h3>
                    <p>${trackingCode}</p>
                </main>
            `
        }
        await transporter.sendMail(purchaseEmailContent);     
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
}

module.exports = {sendEmail}
