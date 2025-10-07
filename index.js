const express = require("express")
const app = express()

app.use(express.json())

const { initializeDB } = require("./db/db.connect")
const Restaurant = require("./models/restaurant.models")
ß

initializeDB()


async function deletetData(restaurantId) {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(restaurantId)
        return restaurant
    } catch (error) {
        throw error
    }   
        
}

app.delete("/restaurants/:restaurantId", async (req, res) => {
    try {
        const deletedRestaurant = await deletetData(req.params.restaurantId)
        res.status(200).json({message: "Restaurant deleted successfully.", restaurant: deletedRestaurant})
     } catch (error) {
        res.status(500).json({error: "Error while deleting restaurant."})
     }
    
})

async function readAllRestaurants() {
    try {
        const restaurants = await Restaurant.find()
        return restaurants
    } catch (error) {
        console.log(error)
    }
}

app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await readAllRestaurants()
        if (restaurants.length != 0) {
            res.json(restaurants)
        } else {
            res.status(404).json({error: "Restaurant data not found..."})
        }

    } catch (error) {
        res.status(500).json({error: "Error fetching restaurant data..."})
    }
})






const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})