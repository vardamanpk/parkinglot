const ParkingLot = require('./ParkingLot');
const FeeModelFactory = require('./FeeModelFactory');

describe('Small motorcycle/scooter parking lot', () => {
    let parkingLot;
    beforeAll(() => {
        parkingLot = new ParkingLot()
        parkingLot.setFeeModel(FeeModelFactory.getFeeModel('MALL'))
        parkingLot.setSpots('Motorcycles/Scooters', 2)
    });
    test('should return correct ticket/receipt details', () => {
        const ticket1 = parkingLot.park('Motorcycle')
        expect(ticket1).toMatchObject({ticketNumber: 1, spotNumber: 1})
        expect(ticket1.entryTime).toBeInstanceOf(Date)

        const ticket2 = parkingLot.park('Scooter')
        expect(ticket2).toMatchObject({ticketNumber: 2, spotNumber: 2})
        expect(ticket2.entryTime).toBeInstanceOf(Date)

        let result = parkingLot.park('Scooter')
        expect(result).toBe('No space available')

        result = parkingLot.unpark(ticket2)
        expect(result).toMatchObject({receiptNumber: 'R-001', spotNumber: 2})
        expect(result.entryTime).toBeInstanceOf(Date)
        expect(result.exitTime).toBeInstanceOf(Date)

        const ticket3 = parkingLot.park('Scooter')
        expect(ticket3).toMatchObject({ticketNumber: 3, spotNumber: 2})
        expect(ticket3.entryTime).toBeInstanceOf(Date)

        result = parkingLot.unpark(ticket1)
        expect(result).toMatchObject({receiptNumber: 'R-002', spotNumber: 1})
        expect(result.entryTime).toBeInstanceOf(Date)
        expect(result.exitTime).toBeInstanceOf(Date)
    });

})

describe('Mall parking lot', () => {
    let parkingLot
    beforeAll(() => {
        parkingLot = new ParkingLot()
        parkingLot.setFeeModel(FeeModelFactory.getFeeModel('MALL'))
        parkingLot.setSpots('Motorcycles/Scooters', 100)
        parkingLot.setSpots('Cars/SUVs', 80)
        parkingLot.setSpots('Buses/Trucks', 10)

    });
    test('should return no space available', () => {
        for (let i = 0; i < 10; i++) {
            parkingLot.park('Bus')
        }
        expect(parkingLot.park('Bus')).toBe('No space available')
    });
})

describe('Stadium parking lot', () => {
    let parkingLot
    beforeAll(() => {
        parkingLot = new ParkingLot()
        parkingLot.setFeeModel(FeeModelFactory.getFeeModel('STADIUM'))
        parkingLot.setSpots('Motorcycles/Scooters', 1000)
        parkingLot.setSpots('Cars/SUVs', 1500)

    });
    test('should return fee in receipt', () => {
        const ticket1 = parkingLot.park('Car')
        const receipt1 = parkingLot.unpark(ticket1)
        expect(receipt1.fees).toBe(60)
    });
})
