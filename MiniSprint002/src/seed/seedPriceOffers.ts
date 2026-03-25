import { Hotel, PriceOffer } from "../models";

function getOfferByRating(rating: number | null): {
    Cheap: boolean;
    Budget: boolean;
    Standard: boolean;
    Premium: boolean;
    Luxury: boolean;
} {
    switch (Math.round(rating ?? 0)) {
        case 1:
            return {
                Cheap: true,
                Budget: false,
                Standard: false,
                Premium: false,
                Luxury: false,
            };
        case 2:
            return {
                Cheap: true,
                Budget: true,
                Standard: false,
                Premium: false,
                Luxury: false,
            };
        case 3:
            return {
                Cheap: false,
                Budget: true,
                Standard: true,
                Premium: false,
                Luxury: false,
            };
        case 4:
            return {
                Cheap: false,
                Budget: false,
                Standard: true,
                Premium: true,
                Luxury: false,
            };
        case 5:
            return {
                Cheap: false,
                Budget: false,
                Standard: false,
                Premium: true,
                Luxury: true,
            };
        default:
            return {
                Cheap: true,
                Budget: true,
                Standard: true,
                Premium: true,
                Luxury: true,
            };
    }
}

export async function seedPriceOffers() {
    const hotels = await Hotel.findAll({
        attributes: ["GlobalPropertyID", "SabrePropertyRating"],
    });
    console.log(`Seeding price offers for ${hotels.length} hotels...`);

    let inserted = 0;
    let skipped = 0;

    for (const hotel of hotels) {
        const offer = getOfferByRating(hotel.SabrePropertyRating);

        try {
            await PriceOffer.create({
                HotelID: hotel.GlobalPropertyID,
                ...offer,
            });
            inserted++;
        } catch (err) {
            skipped++;
        }
    }

    console.log(`${inserted} price offers inserted, ${skipped} skipped`);
}
