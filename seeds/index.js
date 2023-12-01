const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require("../models/campground");

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany();
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            author: '653f604c512ef5d526e41fc5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            images: [
                {
                    url: 'https://res.cloudinary.com/dk3tnyi8p/image/upload/v1701285547/YelpCamp/tgr6pyelzmb42s0dtkra.jpg',
                    filename: 'YelpCamp/tgr6pyelzmb42s0dtkra'
                },
                {
                    url: 'https://res.cloudinary.com/dk3tnyi8p/image/upload/v1701285553/YelpCamp/m1f1htpgkywp4syxuqxf.jpg',
                    filename: 'YelpCamp/m1f1htpgkywp4syxuqxf'
                },
                {
                    url: 'https://res.cloudinary.com/dk3tnyi8p/image/upload/v1701285553/YelpCamp/rodilht1avtgtnnmvf6b.png',
                    filename: 'YelpCamp/rodilht1avtgtnnmvf6b'
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero ad fuga voluptas in vel culpa sit ab quisquam inventore dicta perferendis esse, debitis voluptates maxime voluptatum consectetur expedita illo.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})