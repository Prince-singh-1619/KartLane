const addToCartModel = require("../../models/cartProduct")

const addToCartControler = async(req, res) =>{
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({productId})
        if(isProductAvailable){
            return res.json({
                message: "Item already exists in cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data: saveProduct,
            message: "Product added successfully",
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartControler