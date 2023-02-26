class ParkingLot {
    constructor() {
        this.feeModel = null
        this.spots = {}
        this.filledSpots = {}
        this.ticketNumber = 0
        this.receiptNumber = 0
    }
    setFeeModel(feeModel) {
        this.feeModel = feeModel
    }
    setSpots(spotType, count) {
        this.spots[spotType] = count
        this.filledSpots[spotType] = 0
    }

    getSpotType(vehicleType) {
        if (vehicleType === 'Motorcycle' || vehicleType === 'Scooter') {
            return 'Motorcycles/Scooters'
        } else if (vehicleType === 'Car' || vehicleType === 'SUV') {
            return 'Cars/SUVs'
        } else if (vehicleType === 'Bus' || vehicleType === 'Truck') {
            return 'Buses/Trucks'
        }
    }
    /**
     * @param {string} vehicleType
     * @returns {object} ticket or 'No space available'
     */
    park(vehicleType) {
        const spotType = this.getSpotType(vehicleType)
        if (this.spots[spotType] > 0) {
            this.ticketNumber ++
            this.spots[spotType]--
            return {
                vehicleType,
                ticketNumber: this.ticketNumber,
                spotNumber: ++ this.filledSpots[spotType],
                entryTime: new Date()
            }
        } else {
            return 'No space available'
        }
    }
    /**
     * @param {object} ticket
     * @returns {object} receipt
     * ticket is of format {vehicleType, ticketNumber, spotNumber, entryTime}
     * receipt is of format {receiptNumber, spotNumber, entryTime, fees, exitTime}
    */
    unpark(ticket) {
        const spotType = this.getSpotType(ticket.vehicleType)
        this.receiptNumber ++
        this.spots[spotType]++
        this.filledSpots[spotType]--
        return {
            receiptNumber: `R-${
                this.receiptNumber.toString().padStart(3, '0')
            }`,
            spotNumber: ticket.spotNumber,
            entryTime: ticket.entryTime,
            fees: this.feeModel.getFee(ticket.vehicleType, ticket.entryTime, new Date()),
            exitTime: new Date()
        }
    }
}

module.exports = ParkingLot;
